<script lang="ts">
	export let iconSrc: string;
	export let iconAlt: string = ''; // Default lege alt tekst
	export let iconBgClass: string = 'bg-gray-100'; // Default background
	export let iconColorClass: string = 'text-gray-600'; // Default icon color
	export let title: string;
	export let text: string;
</script>

<div class="bg-white p-6 rounded-card shadow-md text-center border border-status-positive h-full flex flex-col">
	<div class="w-16 h-16 {iconBgClass} rounded-full mx-auto mb-4 flex items-center justify-center flex-shrink-0">
		<img src={iconSrc} alt={iconAlt} class="h-6 w-6 {iconColorClass}" />
	</div>
	<div class="flex-grow">
		<h3 class="text-lg font-medium text-primary-dark-blue mb-2">{title}</h3>
		<p class="font-light text-base text-neutral-dark-gray">
			{text}
		</p>
	</div>
</div> 