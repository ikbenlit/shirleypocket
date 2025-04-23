<script lang="ts">
  import { goto } from '$app/navigation';
  // Verwijder Firebase imports:
  // import { auth } from '$lib/firebase/client'; 
  // import { signInWithEmailAndPassword } from 'firebase/auth'; 
  import { setUser } from '$lib/stores/userStore.js'; // Importeer setUser (met .js extensie)
  import logoBlue from '$lib/images/EasyLeadership_button_white_edited.avif'; // Placeholder - check path
  import Button from '$lib/components/Button.svelte'; // Assuming Button component exists
  import heroImage from '$lib/images/easyleader-bot-chatinterface-mockup.webp'; // Placeholder for onboarding image

  let email = '';
  let password = '';
  let isLoading = false; // Voor feedback op de knop
  let errorMessage = ''; // Voor foutmeldingen

  async function handleLogin() {
    isLoading = true;
    errorMessage = ''; // Reset error message

    // Simuleer een kleine vertraging voor UX
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const validUsers = {
      'yvette@easyleadership.nl': 'easy123',
      'colin@easyleadership.nl': 'easy123'
    };

    // Check hardcoded credentials
    if (email in validUsers && validUsers[email as keyof typeof validUsers] === password) {
      console.log('Succesvol ingelogd (hardcoded)!');
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
  <title>Inloggen - Easyleader-bot</title>
  <meta name="description" content="Log in om toegang te krijgen tot de Easyleader-bot." />
</svelte:head>

<div class="min-h-screen bg-primary-background">
  <div class="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
    
    <!-- Kolom 1: Login Formulier Sectie (Card Centered) -->
    <div class="lg:col-span-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 bg-white p-8 lg:p-12 rounded-xl shadow-lg">
        <!-- Logo (Optioneel) -->
        <div class="flex justify-center mb-6">
          <img class="h-12 w-auto" src={logoBlue} alt="Easyleadership Logo">
        </div>
        <h2 class="text-center text-2xl font-bold text-primary-dark-blue">
          Welkom terug
        </h2>
        
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
          <div>
            <label for="email-address" class="block text-sm font-medium text-neutral-dark-gray pb-1">E-mailadres</label>
            <input 
              id="email-address" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              autofocus
              bind:value={email}
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-light-gray placeholder-neutral-gray text-neutral-dark-gray focus:outline-none focus:ring-primary-dark-blue focus:border-primary-dark-blue focus:z-10 sm:text-sm" 
              placeholder="yvette@easyleadership.nl or colin@easyleadership.nl">
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-dark-gray pb-1">Wachtwoord</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              bind:value={password}
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-light-gray placeholder-neutral-gray text-neutral-dark-gray focus:outline-none focus:ring-primary-dark-blue focus:border-primary-dark-blue focus:z-10 sm:text-sm" 
              placeholder="Wachtwoord (easy123)">
          </div>
        
          <div class="flex items-center justify-end">
            <div class="text-sm">
              <a href="/wachtwoord-vergeten" class="text-sm font-light text-primary-dark-blue hover:underline">
                Wachtwoord vergeten?
              </a>
            </div>
          </div>
    
          <div>
            <Button type="submit" class="w-full" disabled={isLoading}>
              {#if isLoading}
                Bezig met inloggen...
              {:else}
                Inloggen
              {/if}
            </Button>
          </div>
          
          {#if errorMessage}
            <p class="mt-2 text-center text-sm text-red-600">
              {errorMessage}
            </p>
          {/if}
        </form>
      </div>
    </div>

    <!-- Kolom 2: Informatie & Onboarding Sectie -->
    <div class="hidden lg:block lg:col-span-2 relative bg-primary-dark-blue">
       <!-- Background image/gradient can be applied here -->
      <div class="flex flex-col justify-center items-center h-full p-8 lg:p-12 text-white text-center">
        <!-- Placeholder image -->
        <img 
          src={heroImage} 
          alt="Easyleader-bot chat interface mockup" 
          class="w-full max-w-xs md:max-w-sm mx-auto mb-8 rounded-lg shadow-md"
        />
        <h3 class="text-2xl md:text-3xl font-bold mb-4">
          Jouw Digitale Coach Wacht
        </h3>
        <ul class="space-y-2 text-base md:text-lg font-light max-w-lg mx-auto">
          <li>✓ Krijg direct inzicht met het ABC-model.</li>
          <li>✓ Oefen met lastige gesprekken in een veilige omgeving.</li>
          <li>✓ Toegankelijk 24/7, als aanvulling op je programma.</li>
        </ul>
      </div>
    </div>

  </div>
</div>

<style lang="postcss">
  /* Add any specific styles if needed */
  :global(body) {
    /* Ensure body background doesn't interfere if needed */
  }
</style> 