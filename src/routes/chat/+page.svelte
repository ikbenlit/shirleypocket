<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Sidebar from '$lib/components/ui/sidebar.svelte';
  import SidebarLink from '$lib/components/ui/sidebarlink.svelte';
  import UserMenu from '$lib/components/ui/user-menu.svelte';
  import MobileMenuTrigger from '$lib/components/ui/mobile-menu-trigger.svelte';
  import { userStore } from '../../lib/stores/userStore.js';
  import { sidebarStore } from '$lib/stores/sidebarStore.js';
  import { browser } from '$app/environment';
  // Verwijder de import van het favicon, we gebruiken het direct vanuit static/icons
  // import favicon from '../../assets/favicon.png';
  
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
  
  // State voor de user
  let user = $userStore;
  
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
  let casusGekozen = false;
  let scrollContainer: HTMLDivElement; // Referentie naar de scrollbare div
  let inputElement: HTMLInputElement; // Referentie naar het input element
  let showInfoModal = false; // State voor info modal
  
  // Casus opties
  const casusOpties = [
    { id: 'moeilijk-gesprek', label: 'Moeilijk gesprek' },
    { id: 'team-motiveren', label: 'Team motiveren' },
    { id: 'conflict-oplossen', label: 'Conflict oplossen' }
  ];
  
  // Functie om naar de bodem van de chat te scrollen
  async function scrollToBottom() {
    await tick(); 
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
  
  // Initialiseer de chat met welkomstbericht
  function initializeChat() {
    // Reset state
    casusGekozen = false;
    messages = [];
    
    // Voeg welkomstbericht toe
    messages = [{ 
      id: 1, 
      sender: 'bot', 
      text: 'Hoi! Fijn dat je er bent. Wat wil je vandaag bespreken?',
      role: 'assistant'
    }];
    
    // Scroll naar beneden
    scrollToBottom();
  }
  
  // Reset de chat naar de initiële toestand
  function resetChat() {
    console.log('Chat wordt gereset');
    initializeChat();
  }
  
  // Vereenvoudigde onMount
  onMount(() => {
    initializeChat();
    // Focus op input bij laden (optioneel, kan storend zijn op mobiel)
    // inputElement?.focus();
  });
  
  // Functie om de API stream te verwerken en messages bij te werken
  async function processStream(response: Response, botMessageId: number) {
    if (!response.body) {
      throw new Error('Response body is null');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentBotText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      currentBotText += chunk;

      // Update het bestaande bot bericht in de array
      messages = messages.map(msg =>
        msg.id === botMessageId ? { ...msg, text: currentBotText } : msg
      );
      // Scroll na elke update tijdens het streamen
      scrollToBottom(); 
    }
  }
  
  // Functie voor het verzenden van een bericht
  async function sendMessage() {
    if (userInput.trim() === '') return;
    
    // Voeg gebruikersbericht toe
    const newUserMessage: Message = { 
      id: Date.now(), 
      sender: 'user', 
      text: userInput,
      role: 'user'
    };
    
    messages = [...messages, newUserMessage];
    // Scroll na toevoegen gebruikersbericht
    scrollToBottom(); 
    
    const currentInput = userInput;
    userInput = '';
    
    // Bereid de laatste 7 berichten voor voor de API
    const messagesForAPI = messages
      .filter(msg => msg.role) // Filter uit berichten zonder role
      .slice(-7) // Neem de laatste 7 berichten
      .map(msg => ({
        role: msg.role,
        content: msg.text
      }));
    
    isTyping = true;
    // Maak direct een placeholder bot bericht aan
    const botMessageId = Date.now() + 1;
    messages = [...messages, {
      id: botMessageId,
      sender: 'bot',
      text: '', // Begin met lege tekst
      role: 'assistant'
    }];
    // Scroll na toevoegen placeholder bot bericht
    scrollToBottom(); 

    try {
      // Roep de backend API aan
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesForAPI })
      });

      if (!response.ok) {
        throw new Error(`API aanroep mislukt: ${response.statusText}`);
      }

      // Verwerk de streaming response (scrollen gebeurt nu binnen processStream)
      await processStream(response, botMessageId);

    } catch (error) {
      console.error('Fout bij het streamen van de API:', error);
      // Update het bot bericht met een foutmelding
      messages = messages.map(msg =>
        msg.id === botMessageId ? { ...msg, text: "Sorry, er is iets misgegaan. Probeer het later nog eens." } : msg
      );
       // Scroll na foutmelding update
      scrollToBottom();
    } finally {
      isTyping = false;
      // Zet focus terug op input veld na verzenden
      await tick();
      inputElement?.focus(); 
    }
  }
  
  // Functie voor het kiezen van een casus
  async function kiesCasus(casusLabel: string) {
    const casus = casusOpties.find(o => o.label === casusLabel)?.id || casusLabel;
    console.log('kiesCasus aangeroepen met:', casus, 'Label:', casusLabel);
    
    // Markeer dat een casus is gekozen
    casusGekozen = true;
    
    // Voeg casusbericht toe (als user message)
    const casusMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: `Ik wil het hebben over: ${casusLabel}`,
      role: 'user'
    };
    messages = [...messages, casusMessage];
    
    // Scroll na toevoegen casusbericht
    scrollToBottom();
    
    // Bereid initieel bericht voor API voor
    const initialMessagesForAPI = [{
      role: 'user',
      content: `Ik wil het hebben over: ${casusLabel}. Stel me vragen volgens het ABC-model om te reflecteren.`
    }];

    isTyping = true;
    // Maak direct een placeholder bot bericht aan
    const botMessageId = Date.now() + 1; // Zorg voor unieke ID
    messages = [...messages, {
      id: botMessageId,
      sender: 'bot',
      text: '', // Begin met lege tekst
      role: 'assistant'
    }];
    // Scroll na toevoegen placeholder bot bericht
    scrollToBottom();

    try {
      // Roep de backend API aan
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: initialMessagesForAPI })
      });

      if (!response.ok) {
        throw new Error(`API aanroep mislukt: ${response.statusText}`);
      }

      // Verwerk de streaming response (scrollen gebeurt nu binnen processStream)
      await processStream(response, botMessageId);

    } catch (error) {
      console.error('Fout bij het streamen van de API:', error);
      // Update het bot bericht met een foutmelding
      messages = messages.map(msg =>
        msg.id === botMessageId ? { ...msg, text: "Sorry, er is iets misgegaan met de casus start. Probeer het opnieuw." } : msg
      );
      // Scroll na foutmelding update
      scrollToBottom();
    } finally {
      isTyping = false;
      // Zet focus terug op input veld na casus kiezen
      await tick();
      inputElement?.focus();
    }
  }
  
  // Functie voor het afhandelen van Enter-toets
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<!-- Main container with flex layout -->
<div class="flex h-screen bg-[rgb(191,207,210)]">

  <!-- Mobile Menu Trigger -->
  <MobileMenuTrigger />

  <!-- Sidebar -->
  <Sidebar on:resetChat={resetChat} class="flex-shrink-0">
    <div class="p-4 flex-1 overflow-y-auto">
      <!-- Logo container voor centreren -->
      <div 
         class="h-12 flex items-center"
         class:justify-center={!sidebarOpen} 
      >
        <img 
          src="/icons/favicon.png" 
          alt="Easyleadership Logo" 
          class:h-10={sidebarOpen}
          class:w-auto={sidebarOpen}
          class:h-8={!sidebarOpen}
          class:w-8={!sidebarOpen}
          class:mx-auto={sidebarOpen}
          class="object-contain transition-all duration-300 ease-in-out"
        /> 
      </div>
      
      <!-- Nieuwe Chat Link (bovenaan?) -->
      <SidebarLink 
        link={{
          label: "Nieuwe Chat", 
          href: "/chat", 
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`
        }}
        className="mb-2"
      />

      <!-- Originele Links Hersteld -->
      <SidebarLink 
        link={{
          label: "Landingspagina",
          href: "/",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
        }}
      />
      <SidebarLink 
        link={{
          label: "Easyleadership site",
          href: "https://www.easyleadership.nl/",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>`,
          target: "_blank"
        }}
      />
      <SidebarLink 
        link={{
          label: "Methode",
          href: "https://www.easyleadership.nl/onze-methode",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`,
          target: "_blank"
        }}
      />
      <SidebarLink 
        link={{
          label: "Contact",
          href: "https://www.easyleadership.nl/contact",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
          target: "_blank"
        }}
      />
      <!-- Einde Originele Links -->

    </div>
    <svelte:fragment slot="user">
      <UserMenu {user} />
    </svelte:fragment>
  </Sidebar>

  <!-- Main chat area -->
  <div class="flex-1 flex flex-col overflow-hidden p-2 sm:p-4">
    <!-- Chat Container (met oorspronkelijke achtergrond/schaduw) -->
    <div class="flex flex-1 mx-auto w-full max-w-full sm:max-w-[600px] flex-col rounded-xl bg-white shadow-lg overflow-hidden"> 
      <!-- Berichten Area (scrollable) -->
      <div bind:this={scrollContainer} class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        
        <!-- Privacy melding banner -->
        <div class="flex justify-center mb-2 items-center">
          <div class="rounded-md bg-[rgb(0,204,156)] px-3 py-1">
            <p class="font-poppins text-xs sm:text-sm font-medium text-white">Je gesprekken worden niet opgeslagen</p>
          </div>
        </div>
        
        <!-- Berichten loop met oorspronkelijke styling -->
        {#each messages as message (message.id)}
          {#if message.sender === 'bot'}
            <!-- Bot Bericht -->
            <div class="flex justify-start">
              <div class="max-w-[85%] sm:max-w-[80%] rounded-xl bg-[rgb(0,61,75)] px-3 sm:px-4 py-2">
                <p class="font-poppins text-sm sm:text-base font-medium text-white">{message.text}</p>
              </div>
            </div>
          {:else}
            <!-- Gebruiker Bericht -->
            <div class="flex justify-end">
              <div class="max-w-[85%] sm:max-w-[80%] rounded-xl border border-[rgb(145,194,207)] bg-white px-3 sm:px-4 py-2">
                <p class="font-poppins text-xs sm:text-sm font-medium text-[rgb(64,110,120)]">{message.text}</p>
              </div>
            </div>
          {/if}
        {/each}

        <!-- Typing indicator (oorspronkelijke stijl) -->
        {#if isTyping}
          <div class="flex justify-start">
            <div class="max-w-[85%] sm:max-w-[80%] rounded-xl bg-[rgb(0,61,75)] px-3 sm:px-4 py-2">
              <p class="font-poppins text-sm sm:text-base font-medium text-white">
                <span class="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full mr-1 animate-bounce"></span>
                <span class="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full mr-1 animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
              </p>
            </div>
          </div>
        {/if}

        <!-- Casus Knoppen (oorspronkelijke stijl) -->
        {#if !casusGekozen && messages.length === 1}
          <div class="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            {#each casusOpties as casus}
              <button
                on:click={() => kiesCasus(casus.label)}
                class="min-h-[40px] rounded-xl bg-cta-orange px-3 py-2 font-poppins text-xs sm:text-sm font-medium text-white shadow-md hover:bg-cta-orange-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cta-orange focus:ring-offset-2 w-full sm:w-auto"
                aria-label="Kies het onderwerp: {casus.label}"
              >
                {casus.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Input Area (oorspronkelijke stijl) -->
      <div class="flex items-center border-t border-gray-200 p-2 sm:p-3 bg-white">
        <input
          type="text"
          bind:value={userInput}
          bind:this={inputElement}
          on:keypress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Beschrijf je situatie of vraag..."
          class="min-h-[40px] flex-1 rounded-xl border border-gray-300 p-2 sm:p-3 pr-8 sm:pr-10 text-sm sm:text-base font-poppins focus:border-[rgb(145,194,207)] focus:outline-none focus:ring-2 focus:ring-[rgb(145,194,207)] transition-colors duration-200"
          disabled={isTyping}
        />
        <button
          on:click={sendMessage}
          class="ml-2 sm:ml-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-cta-orange text-white shadow-md hover:bg-cta-orange-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cta-orange focus:ring-offset-2"
          aria-label="Verzend bericht"
          disabled={isTyping || userInput.trim() === ''}
        >
          <!-- Heroicon: paper-airplane (outline) -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Info Modal -->
{#if showInfoModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base sm:text-lg font-bold text-[rgb(0,61,75)]">Over de Easyleader Coachbot</h2>
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
        <p>De Easyleader Coachbot helpt je om te reflecteren op leiderschapssituaties in je werk.</p>
        
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
          class="rounded-xl bg-cta-orange px-3 sm:px-4 py-2 font-poppins text-xs sm:text-sm font-medium text-white shadow-md hover:bg-cta-orange-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cta-orange focus:ring-offset-2"
        >
          Sluiten
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Bounce animatie voor typing indicator */
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
</style> 