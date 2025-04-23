<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Sidebar from '$lib/components/ui/sidebar.svelte';
  import SidebarLink from '$lib/components/ui/sidebarlink.svelte';
  // Verwijder de import van het favicon, we gebruiken het direct vanuit static/icons
  // import favicon from '../../assets/favicon.png';
  
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
  
  // Casus opties
  const casusOpties = [
    { id: 'moeilijk-gesprek', label: 'Moeilijk gesprek' },
    { id: 'team-motiveren', label: 'Team motiveren' },
    { id: 'conflict-oplossen', label: 'Conflict oplossen' }
  ];
  
  // Functie om naar de bodem van de chat te scrollen
  async function scrollToBottom() {
    // Wacht op de volgende DOM update cyclus
    await tick(); 
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
  
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
    }
  }
  
  // Functie voor het kiezen van een casus (ook aangepast voor streaming)
  async function kiesCasus(casus: string) {
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
    }
  }
  
  // Wanneer de component laadt, toon welkomstbericht
  onMount(() => {
    messages = [{ 
      id: 1, 
      sender: 'bot', 
      text: 'Hoi! Fijn dat je er bent. Wat wil je vandaag bespreken?',
      role: 'assistant'
    }];
    // Scroll na het laden van het eerste bericht
    scrollToBottom(); 
  });
  
  // Functie voor het afhandelen van Enter-toets
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<div class="flex h-screen bg-[rgb(191,207,210)]">
  <!-- Sidebar Component -->
  <Sidebar>
    <svelte:fragment slot="desktop">
      <div class="mb-6">
        <div class="mb-4 px-2">
          <!-- Logo in plaats van tekst -->
          <div class="flex items-center justify-center">
            <img src="/icons/favicon.png" alt="EasyLeader logo" class="w-8 h-8 object-contain" />
          </div>
        </div>
        
        <nav class="space-y-1">
          <SidebarLink 
            link={{
              label: "Dashboard",
              href: "/dashboard",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
            }}
          />
          
          <SidebarLink 
            link={{
              label: "Chatbot",
              href: "/chat",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>`
            }}
            className="bg-[rgb(235,245,250)] dark:bg-neutral-700"
          />
          
          <SidebarLink 
            link={{
              label: "Oefeningen",
              href: "/exercises",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`
            }}
          />
          
          <SidebarLink 
            link={{
              label: "Instellingen",
              href: "/settings",
              icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
            }}
          />
        </nav>
      </div>
    </svelte:fragment>
    
    <svelte:fragment slot="mobile">
      <div class="flex flex-col h-full justify-between">
        <div>
          <div class="mb-6 mt-10">
            <!-- Logo in plaats van tekst -->
            <div class="flex items-center justify-center">
              <img src="/icons/favicon.png" alt="EasyLeader logo" class="w-10 h-10 object-contain" />
            </div>
          </div>
          
          <nav class="space-y-4">
            <a href="/dashboard" class="flex items-center text-lg">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              Dashboard
            </a>
            
            <a href="/chat" class="flex items-center text-lg text-[rgb(0,204,156)] font-medium">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              Chatbot
            </a>
            
            <a href="/exercises" class="flex items-center text-lg">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Oefeningen
            </a>
            
            <a href="/settings" class="flex items-center text-lg">
              <span class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Instellingen
            </a>
          </nav>
        </div>
      </div>
    </svelte:fragment>
  </Sidebar>

  <!-- Chat Container (aangepast voor sidebar layout) -->
  <div class="flex flex-1 items-center justify-center p-4 overflow-hidden">
    <!-- Privacy notificatie bovenaan -->
    <div class="flex h-full w-full max-w-[600px] flex-col">
      <div class="bg-[rgb(0,204,156)] text-white px-4 py-2 rounded-md mb-4 text-sm self-center">
        Je gesprekken worden niet opgeslagen, je privacy is veilig.
      </div>

      <!-- Chat Container -->
      <div class="flex flex-1 w-full max-w-[600px] flex-col rounded-xl bg-white shadow-lg">
        <!-- Header -->
        <header class="rounded-t-xl bg-[rgb(0,61,75)] p-3 text-center">
          <h1 class="font-poppins text-xl font-bold text-white">Easyleader-bot</h1>
        </header>

        <!-- Berichten Area (scrollable) -->
        <div bind:this={scrollContainer} class="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
          {#each messages as message (message.id)}
            {#if message.sender === 'bot'}
              <!-- Bot Bericht -->
              <div class="flex justify-start">
                <div class="max-w-[80%] rounded-xl bg-[rgb(0,61,75)] px-4 py-3 animate-fadeIn">
                  <p class="font-poppins text-base font-medium text-white">{message.text}</p>
                </div>
              </div>
            {:else}
              <!-- Gebruiker Bericht -->
              <div class="flex justify-end">
                <div class="max-w-[80%] rounded-xl border border-[rgb(145,194,207)] bg-white px-4 py-3">
                  <p class="font-poppins text-sm font-medium text-[rgb(64,110,120)]">{message.text}</p>
                </div>
              </div>
            {/if}
          {/each}
          
          <!-- Typing indicator -->
          {#if isTyping}
            <div class="flex justify-start">
              <div class="max-w-[80%] rounded-xl bg-[rgb(0,61,75)] px-4 py-2">
                <p class="font-poppins text-base font-medium text-white">
                  <span class="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce"></span>
                  <span class="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce" style="animation-delay: 0.2s"></span>
                  <span class="inline-block w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </p>
              </div>
            </div>
          {/if}
          
          <!-- Casus Knoppen - alleen zichtbaar als geen casus is gekozen en er alleen welkomstbericht is -->
          {#if !casusGekozen && messages.length === 1}
            <div class="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              {#each casusOpties as casus}
                <button 
                  on:click={() => kiesCasus(casus.label)}
                  class="min-h-[44px] rounded-xl bg-cta-orange px-5 py-3 font-poppins text-base font-medium text-white shadow-md hover:bg-[rgb(255,159,51)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,179,71)] focus:ring-offset-2"
                  aria-label="Kies het onderwerp: {casus.label}"
                >
                  {casus.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Input Area -->
        <div class="flex items-center border-t border-gray-200 p-4 md:p-6">
          <input
            type="text"
            bind:value={userInput}
            on:keypress={handleKeyPress}
            placeholder="Beschrijf je situatie of vraag..."
            class="min-h-[44px] flex-1 rounded-xl border border-gray-300 p-4 pr-12 font-poppins text-base focus:border-[rgb(145,194,207)] focus:outline-none focus:ring-2 focus:ring-[rgb(145,194,207)] transition-colors duration-200"
            disabled={isTyping}
          />
          <button
            on:click={sendMessage}
            class="ml-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cta-orange text-white shadow-md hover:bg-[rgb(255,159,51)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(255,179,71)] focus:ring-offset-2"
            aria-label="Verzend bericht"
            disabled={isTyping || userInput.trim() === ''}
          >
            <!-- Heroicon: paper-airplane (outline) -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

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
  
  /* Tailwind fallback classes voor de sidebar/mobile versie */
  .cta-orange {
    @apply bg-[rgb(255,119,0)];
  }
</style> 