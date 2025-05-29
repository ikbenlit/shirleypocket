<script lang="ts">
	import { animateOnScroll } from "$lib/actions/animateOnScroll";
</script>

<!-- How It Works Section -->
<section id="how-it-works" class="py-16 md:py-24 bg-pink-extralight" use:animateOnScroll>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-black">Zo Werkt Shirley in je Pocket</h2>
            <p class="mt-4 text-lg md:text-xl text-gray-text max-w-3xl mx-auto">
                Binnen minuten heb je toegang tot je persoonlijke S.H.A.P.E. coach die altijd klaar staat.
            </p>
            <p class="mt-6 text-xl font-semibold text-pink-strong">Van vraag naar antwoord in seconden</p>
        </div>
        <div class="relative">
            <!-- Vertical Line -->
            <div class="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-pink-strong transform -translate-x-1/2"></div>

            <!-- Steps -->
            <div class="space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10">
                <!-- Step 1 -->
                <div class="relative md:flex md:items-start">
                    <div class="md:flex-shrink-0 md:w-1/2 md:pr-8 md:text-right">
                        <div class="w-12 h-12 bg-pink-strong rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto md:mr-0 md:ml-auto mb-4 md:mb-0 shadow-lg">
                            1
                        </div>
                        <h3 class="text-2xl font-semibold text-black mb-2">Stel je Vraag</h3>
                        <p class="text-dark-gray">
                            Type gewoon je vraag zoals je die aan Shirley zou stellen: 'Hoe kom ik aan mijn eiwitten?' of 'Ik heb geen motivatie meer, help!'
                        </p>
                    </div>
                    <div class="hidden md:block md:flex-shrink-0 md:w-1/2 md:pl-8">
                        <!-- Placeholder for potential image or graphic -->
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="relative md:flex md:items-start mt-12 md:mt-0">
                    <div class="hidden md:block md:flex-shrink-0 md:w-1/2 md:pr-8">
                        <!-- Placeholder for potential image or graphic -->
                    </div>
                    <div class="md:flex-shrink-0 md:w-1/2 md:pl-8 md:text-left">
                        <div class="w-12 h-12 bg-pink-strong rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto md:ml-0 md:mr-auto mb-4 md:mb-0 shadow-lg">
                            2
                        </div>
                        <h3 class="text-2xl font-semibold text-black mb-2">Krijg Direct Antwoord</h3>
                        <p class="text-dark-gray">
                            Shirley in je Pocket geeft direct praktisch advies in haar eigen stijl, compleet met verwijzingen naar je programma.
                        </p>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="relative md:flex md:items-start mt-12 md:mt-0">
                    <div class="md:flex-shrink-0 md:w-1/2 md:pr-8 md:text-right">
                        <div class="w-12 h-12 bg-pink-strong rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto md:mr-0 md:ml-auto mb-4 md:mb-0 shadow-lg">
                            3
                        </div>
                        <h3 class="text-2xl font-semibold text-black mb-2">Ga Direct aan de Slag</h3>
                        <p class="text-dark-gray">
                            Met concrete tips en directe links naar je Academy ga je meteen aan de slag. Geen omwegen, gewoon doen!
                        </p>
                    </div>
                    <div class="hidden md:block md:flex-shrink-0 md:w-1/2 md:pl-8">
                        <!-- Placeholder for potential image or graphic -->
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-12 md:mt-16">
            <a href="/login" class="bg-pink-strong hover:bg-pink-hover text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg">
                Chat met Shirley
            </a>
        </div>
    </div>
</section> 