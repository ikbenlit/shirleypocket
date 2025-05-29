<script lang="ts">
    import { animateOnScroll } from "$lib/actions/animateOnScroll";
    // Eventuele form handling logica komt hier later
</script>

<!-- Try Now Section -->
<section id="try-now" class="py-16 md:py-24 gradient-bg" use:animateOnScroll>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="md:flex">
                <div class="md:w-1/2 p-8 md:p-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-black">
                        Klaar om direct antwoord te krijgen?
                    </h2>
                    <p class="mt-4 text-lg md:text-xl text-gray-text">
                        Log in en start direct met chatten met Shirley in je Pocket.
                    </p>
                    <form class="mt-8 space-y-6">
                        <div>
                            <label for="fullName" class="block text-sm font-medium text-dark-gray">Volledige Naam</label>
                            <input type="text" id="fullName" name="fullName" autocomplete="name" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-strong focus:border-transparent">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-dark-gray">E-mailadres</label>
                            <input type="email" id="email" name="email" autocomplete="email" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-strong focus:border-transparent">
                        </div>
                        <div>
                            <label for="currentProgram" class="block text-sm font-medium text-dark-gray">Huidig S.H.A.P.E. programma</label>
                            <input type="text" id="currentProgram" name="currentProgram" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-strong focus:border-transparent">
                        </div>
                        <div>
                            <a href="/login" class="block w-full text-center bg-pink-strong hover:bg-pink-hover text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg">
                                Chat met Shirley
                            </a>
                        </div>
                    </form>
                    <p class="mt-6 text-sm text-gray-text">
                        Door in te loggen ga je akkoord met onze <a href="/terms" class="underline hover:text-pink-strong">Voorwaarden</a> en <a href="/privacy" class="underline hover:text-pink-strong">Privacybeleid</a>.
                    </p>
                </div>
                <div class="md:w-1/2 bg-pink-extralight p-8 md:p-12 flex flex-col justify-center">
                    <div>
                        <div class="flex items-center mb-6">
                            <svg class="h-8 w-8 text-pink-strong mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v1h1a1 1 0 110 2h-1v1a3 3 0 01-3 3H8a3 3 0 01-3-3V8H4a1 1 0 110-2h1V5zm3-1a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1H8zM8 9a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V9z" clip-rule="evenodd" />
                            </svg>
                            <h3 class="text-2xl font-semibold text-black">Wat Je Krijgt in je Proefperiode</h3>
                        </div>
                        <ul class="space-y-3 text-dark-gray">
                            <li class="flex items-start">
                                <svg class="h-6 w-6 text-pink-strong mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>24/7 toegang tot Shirley's kennis</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-6 w-6 text-pink-strong mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Directe links naar jouw Academy modules</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-6 w-6 text-pink-strong mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Persoonlijke antwoorden in Shirley's stijl</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="h-6 w-6 text-pink-strong mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>7 dagen onbeperkte vragen stellen</span>
                            </li>
                        </ul>
                        <p class="mt-8 text-sm text-gray-text">
                            Sluit je aan bij 10.000+ S.H.A.P.E. deelneemsters die hun overgangsgewicht onder controle hebben.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .gradient-bg {
        /* Gebruik de bestaande gradient of een nieuwe als die er is in de HTML */
        background: linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%); /* Lichte roze gradient als voorbeeld */
    }
</style>
