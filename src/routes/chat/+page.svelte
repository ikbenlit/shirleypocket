<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Sidebar from '$lib/components/ui/sidebar.svelte';
  import SidebarLink from '$lib/components/ui/sidebarlink.svelte';
  import UserMenu from '$lib/components/ui/user-menu.svelte';
  import { userStore } from '../../lib/stores/userStore.js';
  import { getContext } from 'svelte';
  import { SidebarContextKey, type SidebarContextValue } from '$lib/components/ui/sidebar.svelte';
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
  
  // State voor de user
  let user = $userStore;
  
  // State voor sidebar info
  let sidebarOpen = false;
  
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
  
  // Simpele onMount functie die alleen de sidebar context ophaalt
  onMount(() => {
    // Haal sidebar context op
    try {
      const { sidebarStore } = getContext<SidebarContextValue>(SidebarContextKey);
      const unsubscribe = sidebarStore.subscribe(value => {
        sidebarOpen = value.open;
      });
      
      // Initialiseer de chat
      initializeChat();
      
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up sidebar context:', error);
      // Zorg ervoor dat de chat nog steeds initialiseert, zelfs als er een probleem is met de sidebar
      initializeChat();
    }
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
  
  // Functie voor het kiezen van een casus (ook aangepast voor streaming)
  async function kiesCasus(casus: string) {
    console.log('kiesCasus aangeroepen met:', casus);
    
    // Markeer dat een casus is gekozen
    casusGekozen = true;
    
    // Voeg casusbericht toe (als user message)
    const casusMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: `Ik wil het hebben over: ${casus}`,
      role: 'user'
    };
    messages = [...messages, casusMessage];
    
    // Scroll na toevoegen casusbericht
    scrollToBottom();
    
    // Bereid initieel bericht voor API voor
    const initialMessagesForAPI = [{
      role: 'user',
      content: `Ik wil het hebben over: ${casus}. Stel me vragen volgens het ABC-model om te reflecteren.`
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
      console.error('Fout bij het streamen na casus selectie:', error);
      // Update het bot bericht met een foutmelding
      messages = messages.map(msg =>
        msg.id === botMessageId ? { ...msg, text: "Sorry, er is iets misgegaan bij het starten van de casus." } : msg
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

<div class="flex h-screen bg-[rgb(191,207,210)] overflow-x-hidden">
  <!-- Sidebar Component -->
  <Sidebar>
    <svelte:fragment slot="desktop">
      <div class="mb-6">
        <div class="mb-4 px-2">
          <!-- Logo in plaats van tekst -->
          <div class="flex items-center justify-center">
            <button 
              on:click={resetChat} 
              class="bg-transparent border-0 cursor-pointer"
              aria-label="Reset chat"
            >
              <img src="/icons/favicon.png" alt="EasyLeader logo" class="w-8 h-8 object-contain" />
            </button>
          </div>
        </div>
        
        <nav class="space-y-1">
          <SidebarLink 
            link={{
              label: "Landingspagina",
              href: "/",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
            }}
          />
          
          <SidebarLink 
            link={{
              label: "Easyleadership site",
              href: "https://www.easyleadership.nl/",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>`,
              target: "_blank"
            }}
            className="bg-[rgb(235,245,250)] dark:bg-neutral-700"
          />
          
          <SidebarLink 
            link={{
              label: "Methode",
              href: "https://www.easyleadership.nl/onze-methode",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`,
              target: "_blank"
            }}
          />
          
          <SidebarLink 
            link={{
              label: "Contact",
              href: "https://www.easyleadership.nl/contact",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>`,
              target: "_blank"
            }}
          />
          
          <!-- Informatie knop met dezelfde styling als SidebarLink -->
          <button 
            on:click={() => showInfoModal = true}
            class="w-full flex items-center justify-start gap-2 group/sidebar py-2 text-left bg-transparent border-none cursor-pointer"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            
            <span 
              class="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition-all duration-300 ease-in-out whitespace-pre overflow-hidden"
              style="max-width: {sidebarOpen ? '200px' : '0px'}; opacity: {sidebarOpen ? 1 : 0}; margin-left: {sidebarOpen ? '8px' : '0px'};"
            >
              Over de Coachbot
            </span>
          </button>
        </nav>
      </div>
    </svelte:fragment>
    
    <svelte:fragment slot="user">
      <UserMenu user={user} />
    </svelte:fragment>
    
    <svelte:fragment slot="mobile">
      <div class="flex flex-col h-full justify-between">
        <div>
          <div class="mb-6 mt-10">
            <!-- Logo in plaats van tekst -->
            <div class="flex items-center justify-center">
              <button 
                on:click={resetChat} 
                class="bg-transparent border-0 cursor-pointer"
                aria-label="Reset chat"
              >
                <img src="/icons/favicon.png" alt="EasyLeader logo" class="w-10 h-10 object-contain" />
              </button>
            </div>
          </div>
          
          <nav class="space-y-4">
            <a href="/" class="flex items-center text-lg">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              Landingspagina
            </a>
            
            <a href="https://www.easyleadership.nl/" class="flex items-center text-lg text-[rgb(0,204,156)] font-medium" target="_blank" rel="noopener noreferrer">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              Easyleadership site
            </a>
            
            <a href="https://www.easyleadership.nl/onze-methode" class="flex items-center text-lg" target="_blank" rel="noopener noreferrer">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Methode
            </a>
            
            <a href="https://www.easyleadership.nl/contact" class="flex items-center text-lg" target="_blank" rel="noopener noreferrer">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Contact
            </a>
            
            <!-- Mobiele informatie knop -->
            <button
              on:click={() => showInfoModal = true}
              class="flex items-center text-lg mt-6"
              aria-label="Over de Easyleader Coachbot"
            >
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Over de Coachbot
            </button>
          </nav>
        </div>
        
        <!-- User section for mobile -->
        <div class="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <UserMenu user={user} />
        </div>
      </div>
    </svelte:fragment>
  </Sidebar>

  <!-- Chat Container (aangepast voor sidebar layout) -->
  <div class="flex flex-1 flex-col p-2 sm:p-4 overflow-hidden min-w-0 w-full">
    <!-- Chat Container -->
    <div class="flex flex-1 mx-auto w-full max-w-full sm:max-w-[600px] flex-col rounded-xl bg-white shadow-lg overflow-hidden h-[calc(100vh-120px)] min-h-[300px] max-h-[800px]">
      <!-- Berichten Area (scrollable) -->
      <div bind:this={scrollContainer} class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3" style="height: calc(100% - 60px);">
        <!-- Privacy melding als eerste bericht - apart van berichten array -->
        <div class="flex justify-center mb-1 items-center">
          <div class="rounded-md bg-[rgb(0,204,156)] px-3 py-1 animate-fadeIn">
            <p class="font-poppins text-xs sm:text-sm font-medium text-white">Je gesprekken worden niet opgeslagen</p>
          </div>
        </div>
        
        <!-- Berichten van de chat -->
        {#each messages as message (message.id)}
          {#if message.sender === 'bot'}
            <!-- Bot Bericht -->
            <div class="flex justify-start">
              <div class="max-w-[85%] sm:max-w-[80%] rounded-xl bg-[rgb(0,61,75)] px-3 sm:px-4 py-2 animate-fadeIn">
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
        
        <!-- Typing indicator -->
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
        
        <!-- Casus Knoppen - alleen zichtbaar als geen casus is gekozen en er alleen welkomstbericht is -->
        <pre class="text-xs text-gray-500 hidden"><!-- Debug info: casusGekozen: {casusGekozen}, messages.length: {messages.length} --></pre>
        
        {#if !casusGekozen && messages.length === 1}
          <div class="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            {#each casusOpties as casus}
              <button 
                on:click={() => kiesCasus(casus.label)}
                class="min-h-[40px] rounded-xl bg-[rgb(255,119,0)] px-3 py-2 font-poppins text-xs sm:text-sm font-medium text-white shadow-md hover:bg-[rgb(255,159,51)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,179,71)] focus:ring-offset-2 w-full sm:w-auto"
                aria-label="Kies het onderwerp: {casus.label}"
              >
                {casus.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Input Area - fixed at bottom -->
      <div class="flex items-center border-t border-gray-200 p-2 sm:p-3 bg-white">
        <input
          type="text"
          bind:value={userInput}
          bind:this={inputElement}
          on:keypress={handleKeyPress}
          placeholder="Beschrijf je situatie of vraag..."
          class="min-h-[40px] flex-1 rounded-xl border border-gray-300 p-2 sm:p-3 pr-8 sm:pr-10 text-sm sm:text-base font-poppins focus:border-[rgb(145,194,207)] focus:outline-none focus:ring-2 focus:ring-[rgb(145,194,207)] transition-colors duration-200"
          disabled={isTyping}
        />
        <button
          on:click={sendMessage}
          class="ml-2 sm:ml-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[rgb(255,119,0)] text-white shadow-md hover:bg-[rgb(255,159,51)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,179,71)] focus:ring-offset-2"
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

<!-- Informatie Modal -->
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
          class="rounded-xl bg-[rgb(255,119,0)] px-3 sm:px-4 py-2 font-poppins text-xs sm:text-sm font-medium text-white shadow-md hover:bg-[rgb(255,159,51)] transition-colors"
        >
          Sluiten
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Animaties */
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  
  /* Fix voor mobile viewport hoogte issues */
  :global(html), :global(body) {
    height: 100%;
    position: fixed;
    overflow: hidden;
    width: 100%;
  }
  
  :global(body) {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  @media (min-width: 768px) {
    :global(html), :global(body) {
      position: relative;
      overflow: auto;
    }
  }
</style> 