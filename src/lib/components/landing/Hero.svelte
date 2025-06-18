<!-- Hero Section -->
<section class="pt-24 pb-16 md:pt-32 md:pb-24 gradient-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0">
                <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight">Shirley in je Pocket: Je persoonlijke S.H.A.P.E. coach 24/7</h1>
                <p class="mt-4 text-xl text-white opacity-90">Krijg direct antwoord op je vragen over afvallen in de overgang. Geen schema's, geen gedoe - gewoon Shirley's no-nonsense aanpak wanneer jij het nodig hebt.</p>
                <div class="mt-8 flex flex-col sm:flex-row">
                    <a href="/login" class="bg-white text-pink-strong font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">Chat met Shirley</a>
                    <a href="#how-it-works" class="mt-4 sm:mt-0 sm:ml-4 text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300 text-center">Meer Weten</a>
                </div>
            </div>
            <div class="md:w-1/2 md:pl-10">
                <div class="bg-white p-4 rounded-2xl shadow-xl max-w-md mx-auto">
                    <div class="flex items-center border-b pb-4">
                        <div class="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center">
                            <svg class="h-6 w-6 text-pink-strong" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-lg font-semibold text-black">Shirley in je Pocket</p>
                            <p class="text-sm text-gray-text">Online • Reageert meteen</p>
                        </div>
                    </div>
                    <div class="py-4 h-64 overflow-y-auto">
                        <div class="flex mb-4">
                            <div class="bg-pink-light rounded-lg py-2 px-4 max-w-[80%]">
                                <p class="text-dark-gray">Hupakee! Ik ben je persoonlijke S.H.A.P.E. coach. Waar kan ik je mee helpen?</p>
                            </div>
                        </div>
                        <div class="flex justify-end mb-4">
                            <div class="bg-pink-strong text-white rounded-lg py-2 px-4 max-w-[80%]">
                                <p>Ik kom niet aan mijn eiwitten, wat raad je aan?</p>
                            </div>
                        </div>
                        <div class="flex mb-4">
                            <div class="bg-pink-light rounded-lg py-2 px-4 max-w-[80%]">
                                <p class="text-dark-gray">Daar gaan we! Eiwitten zijn cruciaal, maar het hoeft niet ingewikkeld:</p>
                                <ul class="list-disc pl-5 mt-2 space-y-1 text-dark-gray">
                                    <li>Een ei bij het ontbijt</li>
                                    <li>Wat kipfilet bij de lunch</li>
                                    <li>Of peulvruchten als je vegetarisch eet</li>
                                </ul>
                                <p class="mt-2 text-dark-gray">Check mijn eiwitgids in Module 2. Niet piekeren, gewoon doen!</p>
                            </div>
                        </div>
                        <div class="flex justify-end chat-bubble">
                            <div class="bg-pink-strong text-white rounded-lg py-2 px-4 max-w-[80%]">
                                <p>Super handig, dank je!</p>
                            </div>
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <div class="relative">
                            <input type="text" placeholder="Stel je vraag..." class="w-full border border-gray-300 rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-strong focus:border-transparent">
                            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-strong text-white rounded-full p-2 hover:bg-pink-hover transition-colors" aria-label="Verstuur bericht">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-beige-light to-transparent"></div>
</section>

<style>
    .gradient-bg {
        background: linear-gradient(135deg, #E91E63 0%, #AD1457 100%);
    }
    .chat-bubble {
        animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
</style> 