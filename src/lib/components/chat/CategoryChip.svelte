<script lang="ts">
  import type { ChatCategory } from '$lib/types/chat';
  import { createEventDispatcher } from 'svelte';

  export let category: ChatCategory;

  const dispatch = createEventDispatcher();

  function handleClick(): void {
    dispatch('select', { id: category.id, title: category.title });
  }

  // Kleurmapping gebaseerd op de tabel in 07-category-gefaseerd-implementatieplan.md
  // Deze mapping hoort idealiter in een centrale configuratie of de store,
  // maar voor nu direct in het component voor eenvoud.
  interface ChipColors {
    bg: string;
    text: string;
  }

  const categoryColorMap: Record<string, ChipColors> = {
    '1': { bg: 'bg-[#003D4B]', text: 'text-white' }, // Verantwoordelijkheid...
    '2': { bg: 'bg-[#BFCFD2]', text: 'text-[#406E78]' }, // Teammeetings
    '3': { bg: 'bg-[#FFCB05]', text: 'text-[#406E78]' }, // Omgaan met weerstand
    '4': { bg: 'bg-[#ED1C24]', text: 'text-white' },    // Performancegesprekken
    '5': { bg: 'bg-[#91C2CF]', text: 'text-[#003D4B]' }, // Afspraken maken
    '6': { bg: 'bg-[#00CC9C]', text: 'text-[#003D4B]' }, // Bijdragen aan doelen...
    '7': { bg: 'bg-[#FFB347]', text: 'text-[#003D4B]' }, // Eigen tijd managen
    '8': { bg: 'bg-[#406E78]', text: 'text-white' },    // Continue verbetering
  };

  // Bepaal de kleuren voor de huidige categorie, met een fallback naar de standaardkleur
  // De standaard is de "categorie-chip" kleur (donkerblauw #003D4B) zoals beschreven in het plan.
  // Deze logica kan verfijnd worden als er een algemene 'Categorie' chip is naast de thema chips.
  // Voor nu gaan we ervan uit dat elke chip een themakleur krijgt als die bestaat.
  $: chipColors = categoryColorMap[category.id] || { bg: 'bg-[#003D4B]', text: 'text-white' };

</script>

<button
  on:click={handleClick}
  class={`px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors whitespace-nowrap ${chipColors.bg} ${chipColors.text} focus:ring-[${chipColors.bg.replace('bg-[','').replace(']','')}]`}
  aria-label={`Selecteer categorie: ${category.title}`}
>
  {category.title}
</button> 