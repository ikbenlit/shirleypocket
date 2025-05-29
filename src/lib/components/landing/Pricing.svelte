<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animateOnScroll';

	interface FeatureItem {
		text: string;
		included: boolean;
	}

	interface PricingTier {
		name: string;
		price: string;
		priceSuffix: string;
		description: string;
		features: FeatureItem[];
		ctaText: string;
		ctaLink: string;
		popular?: boolean;
		main?: boolean; // Voor de add-on
	}

	const tiers: PricingTier[] = [
		{
			name: 'S.H.A.P.E. DIY + Bot',
			price: '€247',
			priceSuffix: '/jaar',
			description: 'Je huidige DIY programma + 24/7 toegang tot Shirley',
			features: [
				{ text: 'Volledige DIY Academy', included: true },
				{ text: 'Maandelijkse coaching', included: true },
				{ text: 'Community', included: true },
				{ text: 'Shirley in je Pocket bot', included: true }
			],
			ctaText: 'Chat met Shirley',
			ctaLink: '/login'
		},
		{
			name: 'Small Group + Bot',
			price: '€179',
			priceSuffix: '/maand',
			description: 'Small group coaching versterkt met persoonlijke AI-ondersteuning',
			features: [
				{ text: 'Wekelijkse sessies', included: true },
				{ text: 'Volledige Academy', included: true },
				{ text: 'WhatsApp toegang', included: true },
				{ text: 'Shirley bot', included: true },
				{ text: 'Co-coach begeleiding', included: true }
			],
			ctaText: 'Chat met Shirley',
			ctaLink: '/login',
			popular: true
		},
		{
			name: '1-op-1 Coaching',
			price: '€359',
			priceSuffix: '/maand',
			description: 'Premium coaching inclusief Shirley in je Pocket',
			features: [
				{ text: 'Persoonlijke coaching', included: true },
				{ text: 'Volledige Academy', included: true },
				{ text: 'WhatsApp support', included: true },
				{ text: 'Shirley bot GRATIS erbij', included: true }
			],
			ctaText: 'Chat met Shirley',
			ctaLink: '/login'
		}
	];

	const addonTier: PricingTier = {
		name: 'Shirley in je Pocket Add-on',
		price: '€29',
		priceSuffix: '/maand',
		description: 'Voeg de bot toe aan je huidige S.H.A.P.E. programma.',
		features: [
			{ text: 'Onbeperkte vragen, 24/7 beschikbaar', included: true },
			{ text: 'Directe links naar jouw Academy content', included: true }
		],
		ctaText: 'Chat met Shirley',
		ctaLink: '/login',
		main: true
	};
</script>

<!-- Pricing Section -->
<section id="pricing" class="py-16 md:py-24 bg-pink-extralight" use:animateOnScroll>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12 md:mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-black">
				Upgrade je S.H.A.P.E. ervaring met Shirley in je Pocket
			</h2>
			<p class="mt-4 text-lg md:text-xl text-gray-text max-w-3xl mx-auto">
				Voeg je persoonlijke AI-coach toe aan je bestaande S.H.A.P.E. programma voor nog betere
				resultaten.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
			{#each tiers as tier, i}
				<div
					class="bg-white rounded-xl shadow-lg p-6 md:p-8 pricing-card relative flex flex-col h-full {tier.popular ? 'border-2 border-pink-strong popular-card' : ''}"
				>
					{#if tier.popular}
						<div
							class="absolute top-0 -translate-y-1/2 bg-pink-strong text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider"
						>
							Populair
						</div>
					{/if}
					<h3 class="text-2xl font-bold text-black mb-2">{tier.name}</h3>
					<p class="text-gray-text mb-4 min-h-[40px]">{tier.description}</p>
					<div class="mb-6">
						<span class="text-4xl font-extrabold text-black">{tier.price}</span>
						<span class="text-lg text-gray-text">{tier.priceSuffix}</span>
					</div>
					<ul class="space-y-3 mb-8 text-dark-gray flex-grow">
						{#each tier.features as feature}
							<li class="flex items-center">
								<svg
									class="w-5 h-5 {feature.included ? 'text-pink-strong' : 'text-gray-300'} mr-2 flex-shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d={feature.included
											? 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'}
										clip-rule="evenodd"
									></path>
								</svg>
								<span>{feature.text}</span>
							</li>
						{/each}
					</ul>
					<a
						href={tier.ctaLink}
						class="block w-full text-center {tier.popular
							? 'bg-pink-strong hover:bg-pink-hover text-white'
							: 'bg-pink-light hover:bg-pink-medium text-pink-strong'} font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-auto"
					>
						{tier.ctaText}
					</a>
				</div>
			{/each}
		</div>

		<!-- Add-on Section for Existing Customers -->
		<div class="mt-16 md:mt-24">
			<div class="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-10 text-center">
				<h3 class="text-2xl md:text-3xl font-bold text-black mb-3">{addonTier.name}</h3>
				<p class="text-gray-text mb-4">{addonTier.description}</p>
				<div class="mb-6">
					<span class="text-4xl md:text-5xl font-extrabold text-black">{addonTier.price}</span>
					<span class="text-lg md:text-xl text-gray-text">{addonTier.priceSuffix}</span>
				</div>
				<ul class="space-y-2 mb-8 text-dark-gray text-left sm:text-center">
					{#each addonTier.features as feature}
						<li class="flex items-center justify-center sm:justify-start">
							<svg
								class="w-5 h-5 text-pink-strong mr-2 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span>{feature.text}</span>
						</li>
					{/each}
				</ul>
				<a
					href={addonTier.ctaLink}
					class="bg-pink-strong hover:bg-pink-hover text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
				>
					{addonTier.ctaText}
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.pricing-card {
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.pricing-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
	}
	.popular-card {
		transform: scale(1.05); /* Make popular card slightly larger */
	}
	.popular-card:hover {
		transform: scale(1.08) translateY(-8px); /* Slightly more emphasis on hover for popular */
	}
</style> 