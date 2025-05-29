<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';
</script>

<!-- Testimonials Section -->
<section id="testimonials" class="py-16 md:py-24 bg-white" use:animateOnScroll>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-black">Wat Gebruikers Zeggen over Shirley in je Pocket</h2>
            <p class="mt-4 text-lg md:text-xl text-gray-text max-w-3xl mx-auto">
                Ontdek hoe de AI-coach het S.H.A.P.E. programma nog waardevoller maakt.
            </p>
        </div>
        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            <!-- Testimonial 1 -->
            <div class="bg-pink-extralight p-6 rounded-xl shadow-md testimonial-card">
                <div class="flex items-center mb-4">
                    <img class="w-12 h-12 rounded-full mr-4" src="/images/avatar-1.webp" alt="Avatar Marieke">
                    <div>
                        <h4 class="font-semibold text-black text-lg">Marieke (52)</h4>
                        <!-- <p class="text-sm text-gray-text">Health Enthusiast</p> -->
                    </div>
                </div>
                <p class="text-dark-gray italic">
                    "Wat ik het fijnst vind is dat de bot precies weet waar ik ben in mijn S.H.A.P.E. reis. Hij verwijst me direct naar de juiste module of video. Scheelt zoveel zoektijd!"
                </p>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-pink-extralight p-6 rounded-xl shadow-md testimonial-card md:mt-8 lg:mt-0">
                <div class="flex items-center mb-4">
                    <img class="w-12 h-12 rounded-full mr-4" src="/images/avatar-2.webp" alt="Avatar Linda">
                    <div>
                        <h4 class="font-semibold text-black text-lg">Linda (48)</h4>
                        <!-- <p class="text-sm text-gray-text">Fitness Beginner</p> -->
                    </div>
                </div>
                <p class="text-dark-gray italic">
                    "De bot helpt me echt om op koers te blijven. Als ik twijfel over mijn eiwitten of motivatie kwijt ben, typ ik mijn vraag en krijg meteen Shirley's praktische advies. Zo handig!"
                </p>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-pink-extralight p-6 rounded-xl shadow-md testimonial-card md:mt-8 lg:mt-0">
                <div class="flex items-center mb-4">
                    <img class="w-12 h-12 rounded-full mr-4" src="/images/avatar-3.webp" alt="Avatar Annemarie">
                    <div>
                        <h4 class="font-semibold text-black text-lg">Annemarie (55)</h4>
                        <!-- <p class="text-sm text-gray-text">Busy Professional</p> -->
                    </div>
                </div>
                <p class="text-dark-gray italic">
                    "Eindelijk geen wachten meer op antwoorden in de Facebook-groep! Shirley in je Pocket geeft me direct advies, ook 's avonds laat. Het voelt echt alsof Shirley naast me zit."
                </p>
            </div>
        </div>
    </div>
</section>

<style>
.testimonial-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}
</style> 