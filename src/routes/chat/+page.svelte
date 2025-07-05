<script lang="ts">
  import { onMount, tick } from 'svelte';
  import ProtectedRoute from '$lib/components/Auth/ProtectedRoute.svelte';
  import Sidebar from '$lib/components/ui/sidebar.svelte';
  import SidebarLink from '$lib/components/ui/sidebarlink.svelte';
  import UserMenu from '$lib/components/ui/user-menu.svelte';
  import MobileMenuTrigger from '$lib/components/ui/mobile-menu-trigger.svelte';
  import { sidebarStore } from '$lib/stores/sidebarStore.js';
  import { authUser } from '$lib/stores/authStore.js';
  import { browser } from '$app/environment';
  import { chatStore, selectedQuestionText } from '$lib/stores/chatStore.js';
  import CategoryChipContainer from '$lib/components/chat/CategoryChipContainer.svelte';
  import ChatMessage from '$lib/components/chat/ChatMessage.svelte';
  
  // Voeg viewport meta tag toe voor mobiele apparaten
  if (browser) {
    // Controleer of er al een viewport meta tag is
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (!existingViewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
      document.head.appendChild(meta);
    }
  }
  
  // Haal de open state op voor conditionele styling
  let sidebarOpen: boolean;
  sidebarStore.subscribe(value => {
    sidebarOpen = value.open;
  });
  
  // Haal de user state op voor de UserMenu component
  let currentUser = $authUser;
  
  // Interface voor berichten
  interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    role?: 'user' | 'assistant'; // Voor OpenAI API
  }
  
  // State variabelen
  let userInput = '';
  let messages: Message[] = [];
  let isTyping = false;
  let scrollContainer: HTMLDivElement; // Referentie naar de scrollbare div
  let inputElement: HTMLInputElement; // Referentie naar het input element
  let showInfoModal = false; // State voor info modal
  
  // State voor categorie chips integratie
  let showCategoryChipsDisplay: boolean = false; // Zal geset worden door de store
  let activeCategorySelectedID: string | null = null; // Zal geset worden door de store

  // Definieer de structuur van de store's state voor typering
  interface PageChatStoreValue {
    allCategories: unknown[]; // We gebruiken allCategories hier niet direct, dus unknown is ok
    activeCategoryId: string | null;
    showCategoryPicker: boolean;
    isLoading: boolean;
    error: string | null;
  }

  chatStore.subscribe((value: PageChatStoreValue) => {
    showCategoryChipsDisplay = value.showCategoryPicker;
    activeCategorySelectedID = value.activeCategoryId;
  });

  // Reageer op selectie van een vraag uit de chip container
  $: if (browser && $selectedQuestionText) { 
    userInput = $selectedQuestionText;
    selectedQuestionText.set(null); 
    tick().then(() => {
      sendMessage(); 
    });
  }

  // Functie om naar de bodem van de chat te scrollen
  async function scrollToBottom() {
    await tick(); 
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
  
  // Initialiseer de chat met welkomstbericht
  function initializeChat() {
    messages = [];
    messages = [{ 
      id: Date.now(), 
      sender: 'bot', 
      text: 'Hoi! Fijn dat je er bent. Waarmee kan ik je helpen?',
      role: 'assistant'
    }];
    scrollToBottom();
  }
  
  // Reset de chat naar de initiële toestand
  function resetChat() {
    console.log('Chat wordt gereset');
    userInput = '';
    initializeChat();
  }
  
  // Vereenvoudigde onMount
  onMount(() => {
    initializeChat();
  });
  
  // Functie om de API stream te verwerken en messages bij te werken
  async function processStream(response: Response, botMessageId: number) {
    if (!response.body) {
      throw new Error('Response body is null');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentBotText = '';
    let isFirstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      
      if (isFirstChunk) {
        try {
          // Probeer het eerste chunk te parsen als JSON met model info
          const lines = chunk.split('\n');
          let textContent = '';
          
          for (const line of lines) {
            if (line.trim()) {
              try {
                const modelInfo = JSON.parse(line);
                if (modelInfo.type === 'model') {
                  console.log('OpenAI Model:', modelInfo.model);
                  continue; // Sla deze lijn over
                }
              } catch (e) {
                // Als het geen JSON is, voeg het toe aan textContent
                textContent += line;
              }
            }
          }
          
          if (textContent) {
            currentBotText += textContent;
          }
        } catch (e) {
          // Als het geen JSON is, behandel het als normale tekst
          currentBotText += chunk;
        }
        isFirstChunk = false;
      } else {
        currentBotText += chunk;
      }

      // Update het bot bericht alleen als er daadwerkelijk tekstinhoud is
      if (currentBotText.trim()) {
        messages = messages.map(msg =>
          msg.id === botMessageId ? { ...msg, text: currentBotText, role: 'assistant' } : msg
        );
        scrollToBottom(); 
      }
    }
  }
  
  // Aangepaste sendMessage functie
  async function sendMessage() {
    const textToSend = userInput.trim();
    if (textToSend === '') return;

    const newUserMessage: Message = { 
      id: Date.now(), 
      sender: 'user', 
      text: textToSend,
      role: 'user' 
    };
    messages = [...messages, newUserMessage];
    scrollToBottom();
    
    userInput = '';

    showTypingIndicatorUI();
    const botMessageId = Date.now() + 1; 

    messages = [...messages, {
      id: botMessageId,
      sender: 'bot',
      text: '', 
      role: 'assistant'
    }];
    scrollToBottom();

    const messagesForAPI = messages
      .filter(msg => msg.role)
      .slice(-8) 
      .map(msg => ({
        role: msg.role,
        content: msg.text
      }));
      
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messagesForAPI.slice(0, -1),
          currentCategory: null,  // TODO: implement category detection
          userPreferences: null   // TODO: implement user preferences
        }) 
      });

      if (!response.ok) {
        throw new Error(`API aanroep mislukt: ${response.statusText}`);
      }
      await processStream(response, botMessageId);

    } catch (error) {
      console.error('Fout bij het streamen van de API:', error);
      messages = messages.map(msg =>
        msg.id === botMessageId ? { ...msg, text: "Oeps, Shirley is even de kluts kwijt. Probeer het zo opnieuw!" } : msg
      );
      scrollToBottom();
    } finally {
      removeTypingIndicatorUI();
      await tick();
      inputElement?.focus(); 
    }
  }
  
  // Functie voor het afhandelen van Enter-toets
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !isTyping) {
      sendMessage();
    }
  }

  function showTypingIndicatorUI() {
    isTyping = true;
    scrollToBottom();
  }

  function removeTypingIndicatorUI() {
    isTyping = false;
  }
</script>

<ProtectedRoute>
<!-- Hoofdcontainer: geen min-h-screen meer, alleen flex -->
<div class="flex flex-col sm:flex-row justify-center items-start bg-brand-light-gray text-brand-black">
  <Sidebar on:resetChat={resetChat}>
    <div class="p-4 flex-1 overflow-y-auto bg-brand-beige-light">
      <!-- Logo container voor centreren -->
      <div class="h-12 flex items-center" class:justify-center={!sidebarOpen}>
        <div 
          class="logo w-8 h-8 bg-brand-white rounded-full flex items-center justify-center font-bold text-brand-pink-strong text-lg"
          class:h-10={sidebarOpen}
          class:w-auto={sidebarOpen}
          class:h-8={!sidebarOpen}
          class:w-8={!sidebarOpen}
          class:mx-auto={sidebarOpen}
        >
          S
        </div>
      </div>
      
      <!-- Nieuwe Chat Link (bovenaan?) -->
      <SidebarLink 
        link={{
          label: "Nieuwe Chat", 
          href: "/chat", 
          icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 4v16m8-8H4\" /></svg>`
        }}
        className="mb-2"
      />
      <!-- Originele Links Hersteld -->
      <SidebarLink 
        link={{
          label: "Shirley site",
          href: "https://www.afvallenindeovergang.nl/",
          icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\" /></svg>`,
          target: "_blank"
        }}
      />
      <SidebarLink 
        link={{
          label: "Methode",
          href: "https://www.afvallenindeovergang.nl/shape-methode",
          icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\" /></svg>`,
          target: "_blank"
        }}
      />
      <SidebarLink 
        link={{
          label: "Contact",
          href: "https://www.afvallenindeovergang.nl/contact",
          icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" /></svg>`,
          target: "_blank"
        }}
      />
      <!-- Einde Originele Links -->
    </div>
    <svelte:fragment slot="user">
      {#if currentUser}
        <UserMenu user={currentUser} />
      {/if}
    </svelte:fragment>
  </Sidebar>

  <!-- Mobile Menu Trigger (blijft ongewijzigd voor nu) -->
  <MobileMenuTrigger />

  <!-- Main chat area wordt de chat-container -->
  <div class="chat-container w-full max-w-3xl h-screen md:ml-64 bg-brand-white rounded-none sm:rounded-brand-chat shadow-brand-default flex flex-col overflow-hidden m-0">
    <!-- NIEUWE HEADER TOEGEVOEGD - Aangepast aan Shirley stijl -->
    <div class="chat-header bg-brand-pink-strong p-4 flex items-center gap-3">
      <div class="logo w-8 h-8 bg-brand-white rounded-full flex items-center justify-center font-bold text-brand-pink-strong text-lg">
        S
      </div>
      <h1 class="font-source-sans-pro font-bold text-xl text-brand-white">Shirley in je pocket</h1>
    </div>

    <!-- Chat Berichten Area (scrollable) -->
    <div bind:this={scrollContainer} class="chat-messages flex-1 overflow-y-auto p-6 sm:p-4 space-y-3">
      <!-- HERSTELD: CategoryChipContainer -->
      {#if showCategoryChipsDisplay}
        <div class="mt-1 mb-3">
          <CategoryChipContainer />
        </div>
      {/if}
      
      <!-- Berichten loop -->
      {#each messages as message, i (message.id)}
        <ChatMessage
          message={message.text}
          sender={message.sender}
          showAvatar={message.sender === 'bot' && (i === 0 || messages[i-1].sender !== 'bot')}
        />
      {/each}

      <!-- Typing indicator -->
      {#if isTyping}
        <div class="typing-indicator flex gap-1 p-3 bg-brand-very-light-gray rounded-brand-chat self-start mb-2">
          <div class="typing-dot w-2 h-2 bg-brand-medium-gray rounded-full animate-bounce"></div>
          <div class="typing-dot w-2 h-2 bg-brand-medium-gray rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="typing-dot w-2 h-2 bg-brand-medium-gray rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      {/if}
    </div>

    <!-- Input Area -->
    <div class="chat-input-container p-4 border-t border-brand-light-gray flex gap-3 items-center">
      <input
        type="text"
        bind:value={userInput}
        bind:this={inputElement}
        on:keypress={handleKeyPress}
        placeholder="Typ je vraag hier..."
        class="chat-input flex-1 p-4 border border-gray-300 rounded-lg text-base min-h-[48px] font-roboto focus:outline-none focus:border-brand-pink-strong focus:ring-2 focus:ring-brand-pink-strong/20 transition-colors duration-200"
        disabled={isTyping}
      />
      <button
        on:click={() => sendMessage()}
        class="send-button bg-brand-pink-strong text-brand-white rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-brand-pink-hover disabled:opacity-50"
        aria-label="Verzend bericht"
        disabled={isTyping || userInput.trim() === ''}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  </div>
</div>

<!-- Info Modal -->
{#if showInfoModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base sm:text-lg font-bold text-[rgb(0,61,75)]">Over Shirley in je pocket</h2>
        <button 
          on:click={() => showInfoModal = false}
          class="text-gray-400 hover:text-gray-600"
          aria-label="Sluiten"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-3 sm:space-y-4 text-[rgb(64,110,120)] text-sm sm:text-base">
        <p>Shirley in je pocket helpt je met praktische, no-nonsense coaching rondom voeding, mindset en motivatie tijdens de overgang. Geen gedoe, gewoon doen!</p>
        
        <h3 class="font-bold mt-2">Hoe werkt het?</h3>
        <p>De bot volgt het ABC-model (Activating event, Belief, Consequence) om je te helpen reflecteren:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Wat gebeurde er? (Activating event)</li>
          <li>Welke gedachten had je? (Belief)</li>
          <li>Wat was het gevolg? (Consequence)</li>
        </ul>
        
        <h3 class="font-bold mt-2">Privacy</h3>
        <p>Je gesprekken worden niet opgeslagen en zijn alleen zichtbaar voor jou. De chatbot gebruikt wel de context van het huidige gesprek om je beter te kunnen helpen.</p>
        
        <h3 class="font-bold mt-2">Thema's</h3>
        <p>Je kunt kiezen uit verschillende onderwerpen:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Moeilijke gesprekken voeren</li>
          <li>Team motiveren</li>
          <li>Conflict oplossen</li>
        </ul>
      </div>
      
      <div class="mt-5 sm:mt-6 flex justify-end">
        <button
          on:click={() => showInfoModal = false}
          class="rounded-xl bg-brand-pink-strong px-3 sm:px-4 py-2 font-poppins text-xs sm:text-sm font-medium text-white shadow-md hover:bg-brand-pink-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-pink-strong focus:ring-offset-2"
        >
          Sluiten
        </button>
      </div>
    </div>
  </div>
{/if}
</ProtectedRoute>

<style>
  /* Bounce animatie voor typing indicator */
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  /* Stijlen voor de nieuwe elementen, indien nodig naast Tailwind */
  .chat-header h1 {
    font-family: 'Source Sans Pro', sans-serif;
  }

  /* Typing indicator animaties */
  .typing-dot {
    animation: typingAnimation 1.4s infinite ease-in-out;
  }

  .typing-dot:nth-child(1) { animation-delay: 0s; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingAnimation {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }

  /* Verberg de standaard sidebar op mobiel en pas de chat container aan */
  @media (max-width: 640px) { /* sm breakpoint */
    .chat-container {
      border-radius: 0;
      height: 100vh; /* Volledige viewport hoogte */
      max-width: 100%;
      margin: 0;
    }
    .chat-messages {
      padding: 16px; /* Consistent met HTML voorbeeld */
    }
  }
</style> 