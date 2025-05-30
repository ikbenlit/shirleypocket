<script lang="ts">
	import Navbar from '$lib/components/landing/Navbar.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import Testimonials from '$lib/components/landing/Testimonials.svelte';
	import Pricing from '$lib/components/landing/Pricing.svelte';
	import TryNow from '$lib/components/landing/TryNow.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		// Smooth scrolling voor ankerlinks
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			const htmlAnchor = anchor as HTMLAnchorElement;
			htmlAnchor.addEventListener('click', function(e: MouseEvent) {
				e.preventDefault();
				
				const targetId = htmlAnchor.getAttribute('href');
				if (!targetId || targetId === '#') return;
				
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					window.scrollTo({
						top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // 80px offset for fixed navbar
						behavior: 'smooth'
					});
					
					// Mobile menu sluiten (als de logica daarvoor in Navbar.svelte zit en globaal toegankelijk is)
					// Dit is al afgehandeld in Navbar.svelte zelf door on:click op de links.
				}
			});
		});
	});

</script>

<svelte:head>
	<title>Shirley in je pocket | Jouw persoonlijke S.H.A.P.E.-coach</title>
	<meta name="description" content="Stel al je vragen over voeding, mindset en het S.H.A.P.E. programma aan Shirley's digitale zusje, 24/7 beschikbaar in de Online Academy." />

	<!-- Favicon met logo Shirley PT -->
	<link rel="icon" type="image/png" href="/images/logo-shirleypt-127x91-127x91.png" />
	<link rel="apple-touch-icon" href="/images/logo-shirleypt-127x91-127x91.png" />

	<!-- Open Graph voor social sharing -->
	<meta property="og:title" content="Shirley in je pocket | Jouw persoonlijke S.H.A.P.E.-coach" />
	<meta property="og:description" content="Stel al je vragen over voeding, mindset en het S.H.A.P.E. programma aan Shirley's digitale zusje, 24/7 beschikbaar in de Online Academy." />
	<meta property="og:image" content="https://shirleypocket.vercel.app/images/shirley-social-card.webp" />
	<meta property="og:url" content="https://shirleypocket.vercel.app/" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Shirley in je pocket | Jouw persoonlijke S.H.A.P.E.-coach" />
	<meta name="twitter:description" content="Stel al je vragen over voeding, mindset en het S.H.A.P.E. programma aan Shirley's digitale zusje, 24/7 beschikbaar in de Online Academy." />
	<meta name="twitter:image" content="https://shirleypocket.vercel.app/images/shirley-social-card.webp" />

	<meta name="robots" content="noindex, nofollow" />
	<style>
		body {
			font-family: 'Poppins', sans-serif;
			scroll-behavior: smooth;
		}
	</style>
</svelte:head>

<div class="bg-beige-light">
	<Navbar />
	<Hero />
	<Features />
	<HowItWorks />
	<Testimonials />
	<Pricing />
	<TryNow />
	<Footer />
</div>

