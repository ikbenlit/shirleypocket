<script lang="ts">
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// JavaScript voor smooth scrolling wordt later in de +page.svelte of een globale utility afgehandeld
</script>

<nav class="bg-white shadow-sm fixed w-full z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex items-center">
				<div class="flex-shrink-0 flex items-center">
					<svg class="h-8 w-8 text-pink-strong" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						></path>
					</svg>
					<span class="ml-2 text-xl font-bold text-black">Shirley in je Pocket</span>
				</div>
			</div>
			<div class="hidden md:flex items-center space-x-8">
				<a href="#features" class="text-dark-gray hover:text-pink-strong transition-colors duration-300">Voordelen</a>
				<a href="#how-it-works" class="text-dark-gray hover:text-pink-strong transition-colors duration-300">Hoe werkt het</a>
				<a href="#testimonials" class="text-dark-gray hover:text-pink-strong transition-colors duration-300">Ervaringen</a>
				<a href="#pricing" class="text-dark-gray hover:text-pink-strong transition-colors duration-300">Prijzen</a>
			</div>
			<div class="flex items-center">
				<button
					id="mobile-menu-button"
					on:click={toggleMobileMenu}
					class="md:hidden text-gray-600 hover:text-pink-strong focus:outline-none"
					aria-label="Hoofdmenu"
				>
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
				<a href="/login" class="hidden md:block bg-pink-strong hover:bg-pink-hover text-white px-4 py-2 rounded-md font-medium transition-colors duration-300">Chat met Shirley</a>
			</div>
		</div>
	</div>
	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div id="mobile-menu" class="md:hidden bg-white border-t border-gray-200">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<a href="#features" on:click={() => mobileMenuOpen = false} class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-pink-strong hover:bg-gray-50">Voordelen</a>
				<a href="#how-it-works" on:click={() => mobileMenuOpen = false} class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-pink-strong hover:bg-gray-50">Hoe werkt het</a>
				<a href="#testimonials" on:click={() => mobileMenuOpen = false} class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-pink-strong hover:bg-gray-50">Ervaringen</a>
				<a href="#pricing" on:click={() => mobileMenuOpen = false} class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-pink-strong hover:bg-gray-50">Prijzen</a>
				<a href="/login" on:click={() => mobileMenuOpen = false} class="block px-3 py-2 rounded-md text-base font-medium text-white bg-pink-strong hover:bg-pink-hover">Chat met Shirley</a>
			</div>
		</div>
	{/if}
</nav> 