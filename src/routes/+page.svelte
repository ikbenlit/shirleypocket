<script lang="ts">
	import logoBlue from '$lib/images/EasyLeadership_button_white_edited.avif';
	import heroImage from '$lib/images/easyleader-bot-chatinterface-mockup.webp';
	import type { Action } from 'svelte/action';
	import Button from '$lib/components/Button.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import HeroWithMockup from '$lib/components/layout/hero-with-mockup.svelte';

	let featuresSection: HTMLElement;
	let benefitsSection: HTMLElement;
	let ctaSection: HTMLElement;

	let featuresVisible = false;
	let benefitsVisible = false;
	let ctaVisible = false;

	// Action om elementen in te faden bij scrollen
	const animateOnScroll: Action<HTMLElement, { delay?: number, duration?: number }> = (node, params = {}) => {
		const { delay = 0, duration = 500 } = params;
		let observer: IntersectionObserver;

		// Initiele stijl (onzichtbaar)
		node.style.opacity = '0';
		node.style.transition = `opacity ${duration}ms ease-out ${delay}ms`;

		// Direct observer aanmaken en starten
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1 // Trigger wanneer 10% zichtbaar is
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					node.style.opacity = '1'; // Maak zichtbaar
					observer.unobserve(node); // Stop met observeren
				}
			});
		};

		observer = new IntersectionObserver(observerCallback, observerOptions);
		observer.observe(node);

		return {
			destroy() {
				if (observer) {
					observer.disconnect();
				}
			}
		};
	};

</script>

<svelte:head>
	<title>Easyleader-bot - Jouw Digitale Coach</title>
	<meta 
		name="description" 
		content="Reflecteer en groei met de Easyleader-bot, jouw 24/7 partner in het Easyleadership-programma."
	/>
</svelte:head>

<!-- Header Sectie (verwijderd) -->
<!--
<header class="bg-white py-4 shadow-sm">
	<div class="container mx-auto px-4">
		<img src={logoBlue} alt="Easyleadership Logo" class="h-10" /> 
		
	</div>
</header>
-->

<!-- Nieuwe Hero Sectie met Mockup -->
<HeroWithMockup
	title="Welkom, Yvette 👋"
	description="Wat begon als een idee in ons gesprek, staat hier nu live: jouw digitale coach in Easyleadership-stijl.
Deze bot helpt leidinggevenden reflecteren, scherpte aanbrengen en gedrag ombuigen — zonder dat jij aan tafel hoeft te zitten.
Warm, duidelijk en met de juiste vragen op het juiste moment.

Precies zoals jij het doet. Alleen dan 24/7 beschikbaar. 😉"
	primaryCta={{ text: "Log in en start", href: "/login" }}
	mockupImage={{
		src: heroImage,
		alt: "Visuele weergave van de Easyleader-bot chatinterface",
		width: 1200,
		height: 750
	}}
/>

<!-- Functies Sectie -->
<section use:animateOnScroll={{}} class="py-12 md:py-20 bg-white">
	<div class="container mx-auto px-4">
		<h2 class="text-2xl md:text-3xl font-bold text-primary-dark-blue text-center mb-12">
			Hoe de Easyleader-bot jou ondersteunt
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Kaart 1: Reflectieve vragen -->
			<InfoCard 
				iconSrc="/icons/user.svg"
				iconAlt="Reflectieve vragen icoon"
				iconBgClass="bg-status-positive/10"
				iconColorClass="text-primary-dark-blue" 
				title="Reflectieve vragen"
				text="Krijg inzichten met het ABC-model, zoals: 'Wat dacht je toen dit gebeurde?'"
			/>

			<!-- Kaart 2: Praktische oefening -->
			<InfoCard 
				iconSrc="/icons/chat-circle-dots.svg"
				iconAlt="Praktische oefening icoon"
				iconBgClass="bg-status-positive/10"
				iconColorClass="text-highlight-light-aqua"
				title="Praktische oefening"
				text="Oefen gesprekken, zoals een moeilijk gesprek met een teamlid."
			/>

			<!-- Kaart 3: Altijd beschikbaar -->
			<InfoCard 
				iconSrc="/icons/clock.svg"
				iconAlt="Altijd beschikbaar icoon"
				iconBgClass="bg-status-positive/10"
				iconColorClass="text-status-positive"
				title="Altijd beschikbaar"
				text="24/7 ondersteuning, wanneer jij het nodig hebt."
			/>
		</div>
	</div>
</section>

<!-- Voordelen Sectie -->
<section use:animateOnScroll={{ delay: 150 }} class="py-12 md:py-20 bg-highlight-light-aqua">
	<div class="container mx-auto px-4">
		<h2 class="text-2xl md:text-3xl font-bold text-primary-dark-blue text-center mb-12">
			Waarom kiezen voor de Easyleader-bot?
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Voordeel 1: Persoonlijke coaching -->
			<InfoCard 
				iconSrc="/icons/heart-fill.svg"
				iconAlt="Persoonlijke coaching icoon"
				iconBgClass="bg-highlight-light-aqua/20"
				iconColorClass="text-highlight-light-aqua"
				title="Persoonlijke coaching"
				text="Voelt als een gesprek met Yvette, met empathische en reflectieve vragen."
			/>

			<!-- Voordeel 2: Praktische groei -->
			<InfoCard 
				iconSrc="/icons/arrow-up-bold.svg"
				iconAlt="Praktische groei icoon"
				iconBgClass="bg-primary-dark-blue/10"
				iconColorClass="text-primary-dark-blue"
				title="Praktische groei"
				text="Pas het 10-stappenprogramma direct toe in je dagelijkse praktijk."
			/>

			<!-- Voordeel 3: Veilig en vertrouwd -->
			<InfoCard 
				iconSrc="/icons/shield-check-bold.svg"
				iconAlt="Veilig en vertrouwd icoon"
				iconBgClass="bg-status-positive/10"
				iconColorClass="text-status-positive"
				title="Veilig en vertrouwd"
				text="Je privacy is gegarandeerd; gesprekken worden niet opgeslagen."
			/>
		</div>
	</div>
</section>

<!-- CTA Sectie -->
<section use:animateOnScroll={{ delay: 300 }} class="py-12 md:py-20 bg-white">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-2xl md:text-3xl font-bold text-primary-dark-blue mb-4">
			Klaar om je leiderschap te versterken?
		</h2>
		<p class="text-lg md:text-xl font-medium text-neutral-dark-gray mb-8">
			Log in en start je eerste reflectie met de Easyleader-bot
		</p>
		<Button href="/login" size="large">
			Log in nu
			<img src="/icons/arrow-right-bold.svg" alt="" class="ml-2 h-[18px] w-[18px] inline-block" aria-hidden="true" />
		</Button>
	</div>
</section>

<!-- Footer Sectie -->
<Footer />

