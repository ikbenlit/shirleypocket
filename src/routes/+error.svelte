<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/EasyLeadership_button_white_edited.avif'; // Importeer het logo
	import coffeeGif from '$lib/images/coffee.gif'; // Importeer de GIF
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
	{#if $page.status === 404}
		<img src={logo} alt="EasyLeadership Logo" class="mb-8 h-16 w-auto sm:h-20" />
		<h1 class="mb-4 text-4xl font-bold text-gray-800 sm:text-5xl">Oeps! Verdwaald?</h1>
		<p class="mb-8 text-lg text-gray-600 sm:text-xl">
			Het lijkt erop dat deze pagina even een koffiepauze neemt. Geen zorgen, we brengen je terug naar de start!
		</p>
		<img src={coffeeGif} alt="Koffie GIF" class="mx-auto mb-8 h-32 w-auto sm:h-40" />
		<a
			href="/"
			class="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>Terug naar de startpagina</a
		>
	{:else}
		<img src={logo} alt="EasyLeadership Logo" class="mb-8 h-16 w-auto sm:h-20" />
		<h1 class="mb-4 text-4xl font-bold text-red-600 sm:text-5xl">Er is een fout opgetreden</h1>
		<p class="mb-8 text-lg text-gray-600 sm:text-xl">
			Er is iets misgegaan. Foutcode: {$page.status}
		</p>
		<p class="text-md text-gray-500">{$page.error?.message}</p>
		<a
			href="/"
			class="mt-8 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>Terug naar de startpagina</a
		>
	{/if}
</div> 