<script lang="ts">
  import { onMount } from 'svelte';
  
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
  
  // Casus opties
  const casusOpties = [
    { id: 'moeilijk-gesprek', label: 'Moeilijk gesprek' },
    { id: 'team-motiveren', label: 'Team motiveren' },
    { id: 'conflict-oplossen', label: 'Conflict oplossen' }
  ];
  
  // Functie voor het verzenden van berichten naar de OpenAI API
  async function sendToAI(messagesForAPI: any[]) {
    isTyping = true;
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messagesForAPI })
      });
      
      if (!response.ok) {
        throw new Error('API aanroep mislukt');
      }
      
      const data = await response.json();
      return data.message.content;
    } catch (error) {
      console.error('Fout bij het aanroepen van de API:', error);
      return "Sorry, er is iets misgegaan. Probeer het later nog eens.";
    } finally {
      isTyping = false;
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
    const currentInput = userInput;
    userInput = '';
    
    // Bereid berichten voor voor de API
    const messagesForAPI = messages
      .filter(msg => msg.role) // Filter uit berichten zonder role
      .map(msg => ({
        role: msg.role,
        content: msg.text
      }));
    
    // Stuur berichten naar de API
    const botResponse = await sendToAI(messagesForAPI);
    
    // Voeg botbericht toe
    messages = [...messages, { 
      id: Date.now() + 1, 
      sender: 'bot', 
      text: botResponse,
      role: 'assistant'
    }];
  }
  
  // Functie voor het kiezen van een casus
  async function kiesCasus(casus: string) {
    casusGekozen = true;
    
    // Voeg casusbericht toe
    messages = [...messages, { 
      id: Date.now(), 
      sender: 'user', 
      text: `Ik wil het hebben over: ${casus}`,
      role: 'user'
    }];
    
    // Bereid berichten voor voor de API
    const messagesForAPI = [{ 
      role: 'user', 
      content: `Ik wil het hebben over: ${casus}. Stel me vragen volgens het ABC-model om te reflecteren.`
    }];
    
    // Stuur berichten naar de API
    const botResponse = await sendToAI(messagesForAPI);
    
    // Voeg botbericht toe
    messages = [...messages, { 
      id: Date.now() + 1, 
      sender: 'bot', 
      text: botResponse,
      role: 'assistant'
    }];
  }
  
  // Wanneer de component laadt, toon welkomstbericht
  onMount(() => {
    messages = [{ 
      id: 1, 
      sender: 'bot', 
      text: 'Hoi! Fijn dat je er bent. Wat wil je vandaag bespreken?',
      role: 'assistant'
    }];
  });
  
  // Functie voor het afhandelen van Enter-toets
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<div class="flex h-screen flex-col bg-[rgb(191,207,210)] items-center justify-center p-4">
  <!-- Privacy notificatie bovenaan -->
  <div class="bg-[rgb(0,204,156)] text-white px-4 py-2 rounded-md mb-4 text-sm">
    Je gesprekken worden niet opgeslagen, je privacy is veilig.
  </div>

  <!-- Chat Container -->
  <div class="flex h-full w-full max-w-[600px] flex-col rounded-xl bg-white shadow-lg">
    <!-- Header -->
    <header class="rounded-t-xl bg-[rgb(0,61,75)] p-3 text-center">
      <h1 class="font-poppins text-xl font-bold text-white">Easyleader-bot</h1>
    </header>

    <!-- Berichten Area (scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
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
</style> 