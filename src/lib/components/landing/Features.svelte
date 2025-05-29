<script lang="ts">
	import { animateOnScroll } from "$lib/actions/animateOnScroll";
</script>

<!-- Features Section -->
<section id="features" class="py-16 md:py-24 bg-white" use:animateOnScroll>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 md:mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-black">Waarom Shirley in je Pocket?</h2>
			<p class="mt-4 text-lg md:text-xl text-gray-text max-w-3xl mx-auto">
				Eindelijk een AI-coach die praat zoals Shirley: direct, praktisch en zonder gedoe. Geen
				algemene adviezen, maar jouw S.H.A.P.E.-programma in je broekzak.
			</p>
		</div>
		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Feature 1 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">Jouw S.H.A.P.E. Kennis</h3>
				<p class="mt-2 text-dark-gray">Alleen antwoorden uit jouw programma. Geen algemene adviezen van internet, maar Shirley's beproefde methode voor afvallen in de overgang.</p>
			</div>
			
			<!-- Feature 2 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">24/7 Beschikbaar</h3>
				<p class="mt-2 text-dark-gray">Ook 's avonds laat of in het weekend. Wanneer jij vragen hebt over je voeding of motivatie, is Shirley er voor je.</p>
			</div>
			
			<!-- Feature 3 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">Direct Antwoord</h3>
				<p class="mt-2 text-dark-gray">Geen wachten op reacties in de Facebook-groep. Stel je vraag en krijg meteen praktisch advies in Shirley's eigen woorden.</p>
			</div>
			
			<!-- Feature 4 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">No-Nonsense Aanpak</h3>
				<p class="mt-2 text-dark-gray">Shirley's directe stijl: 'Hupakee, daar gaan we!' Praktische tips zonder ingewikkelde schema's of dieetregels.</p>
			</div>
			
			<!-- Feature 5 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">Motivatie & Steun</h3>
				<p class="mt-2 text-dark-gray">Niet alleen informatie, maar ook motivatie wanneer je het even niet ziet zitten. Shirley helpt je door de moeilijke momenten heen.</p>
			</div>
			
			<!-- Feature 6 -->
			<div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 feature-card">
				<div class="w-12 h-12 bg-pink-light rounded-lg flex items-center justify-center mb-4">
					<svg class="h-6 w-6 text-pink-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-black">Directe Verwijzingen</h3>
				<p class="mt-2 text-dark-gray">Krijg links naar de juiste modules, video's of tools uit je Academy. Zo vind je altijd precies wat je zoekt.</p>
			</div>
		</div>
	</div>
</section>

<style>
.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style> 