<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  // Definieer de verwachte properties voor het component
  interface $$Props extends HTMLAnchorAttributes, HTMLButtonAttributes {
    href?: string; // URL voor link-knoppen
    variant?: 'primary' | 'secondary'; // Stijlvarianten
    size?: 'default' | 'large'; // Groottes
    class?: string; // Extra CSS klassen
    type?: 'button' | 'submit' | 'reset'; // Type voor <button> element
  }

  // Exporteer props met standaard waarden
  export let href: string | undefined = undefined;
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'default' | 'large' = 'default';
  export let type: 'button' | 'submit' | 'reset' | null = href ? null : 'button'; // Standaard 'button' tenzij het een link is
  let elementClass = $$props.class || ''; // Vang extra klassen op

  // Basis Tailwind klassen voor alle knoppen
  let baseClasses = "inline-flex items-center font-medium rounded-card transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Klassen per variant
  let variantClasses = {
    primary: 'bg-cta-orange text-white hover:bg-cta-orange-hover focus:ring-cta-orange',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500' // Voorbeeld voor toekomstige secundaire knop
    // Voeg hier eventueel meer varianten toe
  };

  // Klassen per grootte
  let sizeClasses = {
    default: 'px-8 py-3 text-lg shadow-md',
    large: 'px-10 py-4 text-lg shadow-lg'
  };

  // Combineer alle klassen dynamisch
  $: finalClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${elementClass}
  `.trim().replace(/\s+/g, ' '); // Trim en verwijder extra spaties

</script>

{#if href}
  <!-- Render als een link (<a>) als href is opgegeven -->
  <a {href} class={finalClasses} {...$$restProps} role="button">
    <slot /> <!-- Plaatst de inhoud (tekst, icoon) hier -->
  </a>
{:else}
  <!-- Render als een knop (<button>) als geen href is opgegeven -->
  <button {type} class={finalClasses} {...$$restProps}>
    <slot /> <!-- Plaatst de inhoud (tekst, icoon) hier -->
  </button>
{/if} 