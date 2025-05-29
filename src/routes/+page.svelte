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
	<title>HealthyLife Coach | Your AI Wellness Companion</title>
	<meta name="description" content="Get personalized nutrition advice, workout plans, and wellness tips from your AI lifestyle coach. Try HealthyLife Coach free for 7 days!" />
	<style>
		body {
			font-family: 'Poppins', sans-serif; /* Zorg ervoor dat Poppins globaal wordt toegepast */
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

