<script lang="ts">
  import { goto } from '$app/navigation';
  // Verwijder Firebase imports:
  // import { auth } from '$lib/firebase/client'; 
  // import { signInWithEmailAndPassword } from 'firebase/auth'; 
  import { setUser } from '$lib/stores/userStore.js'; // Importeer setUser (met .js extensie)
  import AvatarBubble from '$lib/components/ui/AvatarBubble.svelte';
  // logoBlue en heroImage worden niet meer direct gebruikt in deze layout.
  // import heroImage from '$lib/images/shirley-bot-hero.png'; 
  // Glow component wordt vervangen door inline stijl of custom CSS class
  // import Glow from '$lib/components/ui/glow.svelte'; 

  let email = '';
  let password = '';
  let isLoading = false; // Voor feedback op de knop
  let errorMessage = ''; // Voor foutmeldingen
  let rememberMe = false; // Toegevoegd voor de checkbox

  async function handleLogin() {
    isLoading = true;
    errorMessage = ''; // Reset error message

    // Simuleer een kleine vertraging voor UX
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const validUsers = {
      'demo@shirleybot.nl': 'welkom123', // Gebaseerd op HTML demo credentials
      'imm.scholten.m3@gmail.com': 'Shape123', // Ilona Scholten
      'adriennelijs@gmail.com': 'Shape123', // Adrienne Lijs
      'barbarameijer1974@gmail.com': 'Shape123', // Barbara Meijer
    };

    // Check hardcoded credentials
    if (email in validUsers && validUsers[email as keyof typeof validUsers] === password) {
      console.log('Succesvol ingelogd!');
      // Update de user store met het e-mailadres
      setUser(email);
      // Redirect naar de chatbot pagina voor POC
      goto('/chat'); 
    } else {
      console.error('Fout bij inloggen: Ongeldige gegevens');
      errorMessage = 'Inloggen mislukt. Controleer je e-mailadres en wachtwoord.';
      isLoading = false; // Stop loading state bij fout
    }

    // isLoading wordt nu alleen false gezet bij een fout, 
    // omdat bij succes de pagina navigeert.
  }
</script>

<svelte:head>
  <title>ShirleyBot - Login</title>
  <meta name="description" content="Log in om toegang te krijgen tot ShirleyBot." />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen flex flex-col md:flex-row">
  <!-- Linkerkant - Login Formulier (md:w-2/5) -->
  <div class="relative w-full md:w-2/5 bg-pink-50 flex items-center justify-center p-8 order-2 md:order-1 overflow-hidden">
    <!-- Soft Pink Blobs for depth -->
    <div class="absolute -top-20 -left-24 w-72 h-72 bg-pink-200 rounded-full opacity-40 filter blur-3xl -z-10 animate-pulse-slow"></div>
    <div class="absolute -bottom-24 -right-20 w-80 h-80 bg-rose-200 rounded-full opacity-30 filter blur-3xl -z-10 animate-pulse-slower"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-20 filter blur-4xl -z-10 animate-pulse-slowest"></div>

    <div class="relative z-10 max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/70">
      <!-- Logo Placeholder -->
      <div class="flex justify-center mb-8">
        <AvatarBubble
          text="Welkom terug, we hebben je gemist!"
          avatarSrc="/images/avatar_shirley.webp"
          avatarSize="large"
          bubbleAlign="center"
          textAlign="center"
          textSize="text-3xl"
          textColor="text-black"
        />
      </div>
      
      <form on:submit|preventDefault={handleLogin} class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-800 mb-2">E-mailadres</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email}
            class="bg-gray-100 border-transparent rounded-xl px-4 py-3 w-full focus:border-[#E91E63] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20 transition-all duration-300 ease-in-out shadow-sm"
            placeholder="naam@voorbeeld.nl" 
            required
          >
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-800 mb-2">Wachtwoord</label>
          <input 
            type="password" 
            id="password" 
            bind:value={password}
            class="bg-gray-100 border-transparent rounded-xl px-4 py-3 w-full focus:border-[#E91E63] focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20 transition-all duration-300 ease-in-out shadow-sm"
            placeholder="••••••••" 
            required
          >
        </div>
        
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              bind:checked={rememberMe}
              class="mr-2 h-4 w-4 accent-[#E91E63]"
            >
            <label for="remember" class="text-sm text-gray-500">Onthouden</label>
          </div>
          <a href="/wachtwoord-vergeten" class="text-sm font-medium text-[#E91E63] hover:underline">Wachtwoord vergeten?</a>
        </div>
        
        <button 
          type="submit" 
          class="w-full font-semibold rounded-xl py-3 text-white transition-all duration-300 ease-in-out disabled:opacity-70 group bg-gradient-to-r from-[#E91E63] to-[#D81B60] hover:from-[#D81B60] hover:to-[#E91E63] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#E91E63]/30 flex items-center justify-center shadow-md"
          disabled={isLoading}
        >
          {#if isLoading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Bezig met inloggen...
          {:else}
            <span>Inloggen</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          {/if}
        </button>
        
        {#if errorMessage}
          <p class="mt-2 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        {/if}

        <div class="text-center">
          <a href="/" class="text-sm text-gray-500 hover:text-gray-800">Terug naar home</a>
        </div>
      </form>

    </div>
  </div>
  
  <!-- Rechterkant - Feature Showcase (md:w-3/5) -->
  <div class="w-full md:w-3/5 text-white p-8 md:p-12 flex items-center relative overflow-hidden order-1 md:order-2" style="background: linear-gradient(135deg, #E91E63 0%, #D81B60 100%);">
    <!-- Glow Effect -->
    <div class="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full hidden md:block -z-1" style="background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);"></div>

    <!-- Floating Hearts Container -->
    <div class="absolute inset-0 w-full h-full overflow-hidden z-0">
      <!-- Heart 1 -->
      <div class="heart absolute bottom-[-50px] text-pink-300" style="left: 10%; animation-duration: 12s; animation-delay: 0s;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Heart 2 -->
      <div class="heart absolute bottom-[-50px] text-pink-200" style="left: 20%; animation-duration: 10s; animation-delay: 2s; opacity: 0.8;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Heart 3 -->
      <div class="heart absolute bottom-[-50px] text-rose-300" style="left: 70%; animation-duration: 15s; animation-delay: 1s;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>
      <!-- Heart 4 -->
      <div class="heart absolute bottom-[-50px] text-pink-300" style="left: 85%; animation-duration: 9s; animation-delay: 3s; opacity: 0.7;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>
       <!-- Heart 5 -->
      <div class="heart absolute bottom-[-50px] text-rose-200" style="left: 45%; animation-duration: 13s; animation-delay: 0.5s;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <div class="relative z-10 max-w-xl mx-auto md:mx-auto flex flex-col items-center justify-center h-full"> <!-- md:mx-auto toegevoegd en flex container voor centreren content -->
      <!-- Smartphone Mockup -->
      <div class="mb-8 md:mb-12 flex justify-center group">
        <div class="w-60 md:w-72 h-[30rem] md:h-[34rem] bg-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-black/30 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300 ease-in-out">
          <div class="bg-white h-full w-full rounded-[2.5rem] overflow-hidden">
            <div class="bg-slate-50 h-full flex flex-col">
              <!-- Chat Header -->
              <div class="bg-slate-100 p-3 flex items-center space-x-2.5 shadow-sm sticky top-0 z-10">
                <div class="w-9 h-9 rounded-full bg-[#E91E63] flex items-center justify-center text-white text-sm font-semibold">SB</div>
                <div>
                  <p class="text-sm font-semibold text-slate-700">ShirleyBot</p>
                  <p class="text-xs text-green-500 flex items-center">
                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1"></span>Online
                  </p>
                </div>
              </div>
              <!-- Chat Messages Area -->
              <div class="flex-grow p-3 space-y-3 overflow-y-auto">
                <div class="text-center my-2">
                  <p class="text-xs text-gray-400 uppercase">Vandaag</p>
                </div>
                
                <!-- Bot message -->
                <div class="flex">
                  <div class="bg-[#E91E63] text-white py-2 px-3.5 rounded-2xl rounded-bl-lg max-w-[75%] shadow-md">
                    <p class="text-sm">Hoi! Ik ben ShirleyBot, jouw persoonlijke coach. Klaar om je doelen te verpletteren vandaag? 💪</p>
                  </div>
                </div>
                
                <!-- User message -->
                <div class="flex justify-end">
                  <div class="bg-slate-200 text-slate-800 py-2 px-3.5 rounded-2xl rounded-br-lg max-w-[75%] shadow-md">
                    <p class="text-sm">Zeker! Ik wil graag een nieuw hardloopschema, maar ik ben een beetje onzeker waar te beginnen.</p>
                  </div>
                </div>
                
                <!-- Bot message -->
                <div class="flex">
                   <div class="bg-[#E91E63] text-white py-2 px-3.5 rounded-2xl rounded-bl-lg max-w-[80%] shadow-md">
                    <p class="text-sm">Geen zorgen, daar help ik je bij! Vertel eens, wat is je huidige ervaring met hardlopen en hoeveel dagen per week zou je willen trainen?</p>
                  </div>
                </div>
                 
                <!-- User message (typing example) -->
                <div class="flex justify-end">
                  <div class="bg-slate-200 text-slate-800 py-2 px-3.5 rounded-2xl rounded-br-lg max-w-[75%] shadow-md">
                    <p class="text-sm italic">Ik ben een beginner, 2-3 dagen zou top zijn!</p>
                  </div>
                </div>

                <!-- Bot typing indicator (simple) -->
                <div class="flex">
                  <div class="text-slate-500 py-2 px-3.5 rounded-2xl rounded-bl-lg max-w-[30%] flex items-center space-x-1">
                    <span class="block w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span class="block w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span class="block w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="text-3xl font-bold mb-4 text-center md:text-left mt-6 md:mt-0">Jouw persoonlijke coach, 24/7 beschikbaar</h2>
      <p class="text-pink-100 mb-8 text-center md:text-left">ShirleyBot helpt je om je gezondheids- en fitnessdoelen te bereiken met persoonlijke begeleiding wanneer jij dat nodig hebt.</p>
      
      <div class="space-y-4 mb-8 w-full max-w-md">
        <div class="flex items-center p-3.5 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl shadow-black/10 border border-white/20">
          <div class="bg-white rounded-full w-7 h-7 flex items-center justify-center mr-3.5 flex-shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#E91E63]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-white text-sm">Persoonlijk advies op basis van jouw doelen</p>
        </div>
        <div class="flex items-center p-3.5 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl shadow-black/10 border border-white/20">
          <div class="bg-white rounded-full w-7 h-7 flex items-center justify-center mr-3.5 flex-shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#E91E63]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-white text-sm">Voortgang bijhouden en inzicht in je resultaten</p>
        </div>
        <div class="flex items-center p-3.5 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl shadow-black/10 border border-white/20">
          <div class="bg-white rounded-full w-7 h-7 flex items-center justify-center mr-3.5 flex-shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#E91E63]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-white text-sm">Dagelijkse motivatie en ondersteuning</p>
        </div>
      </div>
      

    </div>
  </div>
</div>

<style lang="postcss">
  :global(body) {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: #F7F3F0; /* Achtergrondkleur van de HTML pagina */
    /* Overige globale stijlen indien nodig */
  }
  /* Verwijder eventuele bestaande global body background als die interfereert */

  /* Animatie voor de blobs */
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  @keyframes pulse-slower {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.03); }
  }
  @keyframes pulse-slowest {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.02); }
  }

  .animate-pulse-slow {
    animation: pulse-slow 8s infinite ease-in-out;
  }
  .animate-pulse-slower {
    animation: pulse-slower 10s infinite ease-in-out;
  }
  .animate-pulse-slowest {
    animation: pulse-slowest 12s infinite ease-in-out;
  }

  /* Floating hearts animation */
  .heart {
    animation-name: floatHeart;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0;
  }

  @keyframes floatHeart {
    0% {
      transform: translateY(0vh) scale(0.7);
      opacity: 0.6;
    }
    20% {
      opacity: 0.9;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      transform: translateY(-100vh) scale(1.1);
      opacity: 0;
    }
  }
</style> 