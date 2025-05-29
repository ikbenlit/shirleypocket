# Opzet Nieuwe Button Componenten (`ButtonElement.svelte` en `Link.svelte`)

Dit document beschrijft de nieuwe opzet voor knop-achtige UI elementen in het project. Om de type-veiligheid en onderhoudbaarheid te verbeteren, is de vorige `Button.svelte` component opgesplitst in twee gespecialiseerde componenten:

1.  **`ButtonElement.svelte`**: Voor semantische `<button>` elementen.
2.  **`Link.svelte`**: Voor `<a>` (anker) elementen die eruitzien en zich gedragen als knoppen.

De oude `Button.svelte` is hernoemd naar `src/lib/components/Button.old.svelte` en dient niet meer gebruikt te worden.

## Reden voor de Opsplitsing

De primaire reden was een typeconflict (`Interface '$$Props' cannot simultaneously extend types 'HTMLAnchorAttributes' and 'HTMLButtonAttributes'`). Dit conflict ontstaat omdat `HTMLAnchorAttributes` (voor `<a>`) en `HTMLButtonAttributes` (voor `<button>`) sommige eigenschappen gemeen hebben, maar met verschillende types of betekenissen, wat problematisch is voor Svelte's `$$restProps` en algemene type-checking met TypeScript.

Door twee aparte componenten te gebruiken, elk met zijn eigen strikt gedefinieerde set props, wordt dit typeconflict vermeden en is de code voor elk component duidelijker en beter type-veilig.

## Gedeelde Styling

Om de styling consistent te houden en duplicatie van code te minimaliseren, is er een utility-bestand aangemaakt:

-   **`src/lib/components/ui/button-styles.ts`**

Dit bestand exporteert:

-   **TypeScript Types/Interfaces:**
    -   `ButtonVariant`: (`'primary' | 'secondary' | 'tertiary' | 'outline'`)
    -   `ButtonSize`: (`'default' | 'large'`)
    -   `ButtonShape`: (`'default' | 'round'`)
    -   `CommonButtonProps`: Interface voor props die beide componenten delen (variant, size, shape, icon, iconPosition, elementClass).
    -   `LinkSpecificProps`: Type dat `HTMLAnchorAttributes` uitbreidt en `href` verplicht stelt.
    -   `ButtonElementSpecificProps`: Type dat `HTMLButtonAttributes` uitbreidt en `type` voor buttons specificeert.
-   **Functies:**
    -   `getButtonClasses(props: CommonButtonProps): string`: Genereert de Tailwind CSS class string gebaseerd op de variant, size, shape, en eventuele extra klasses.
    -   `getIconStyling(props: CommonButtonProps): { iconSize: number; iconMargin: string }`: Genereert de grootte en marge voor het icoon.

## `ButtonElement.svelte`

-   **Locatie:** `src/lib/components/ui/ButtonElement.svelte`
-   **Gebruik:** Voor acties die geen navigatie naar een andere URL inhouden, zoals het submitten van een formulier of het triggeren van een JavaScript actie.
-   **Element:** Rendert een `<button>` HTML element.
-   **Props:**
    -   Accepteert alle `CommonButtonProps`.
    -   Accepteert alle standaard `HTMLButtonAttributes` via `$$restProps`.
    -   `type`: Optioneel, default is `'button'`. Kan `'submit'` of `'reset'` zijn.
    -   `elementClass`: String, voor extra Tailwind klasses (vervangt de `class` prop om keyword conflict te vermijden).

### Voorbeeldgebruik `ButtonElement.svelte`:

```svelte
<script lang="ts">
  import ButtonElement from '$lib/components/ui/ButtonElement.svelte';

  function handleSubmit() {
    console.log('Formulier gesubmit!');
  }
</script>

<ButtonElement variant="primary" size="large" on:click={handleSubmit} icon="Send">
  Verstuur
</ButtonElement>

<ButtonElement variant="secondary" type="submit">
  Opslaan
</ButtonElement>
```

## `Link.svelte`

-   **Locatie:** `src/lib/components/ui/Link.svelte`
-   **Gebruik:** Voor navigatie naar een andere pagina (intern of extern) waarbij het element eruit moet zien als een knop.
-   **Element:** Rendert een `<a>` HTML element met `role="button"` voor toegankelijkheid.
-   **Props:**
    -   Accepteert alle `CommonButtonProps`.
    -   Accepteert alle standaard `HTMLAnchorAttributes` via `$$restProps`.
    -   `href`: **Verplicht**. De URL waar de link naartoe navigeert.
    -   `elementClass`: String, voor extra Tailwind klasses.

### Voorbeeldgebruik `Link.svelte`:

```svelte
<script lang="ts">
  import Link from '$lib/components/ui/Link.svelte';
</script>

<Link variant="tertiary" href="/contact" icon="Mail" iconPosition="right">
  Neem Contact Op
</Link>

<Link variant="outline" href="https://externewebsite.com" target="_blank">
  Bezoek Website
</Link>
```

## Consistent Gebruik Borging

1.  **Duidelijke Naamgeving:** `ButtonElement` en `Link` zijn expliciet in hun doel.
2.  **TypeScript:** De types en verplichte props (zoals `href` voor `Link`) helpen bij correct gebruik tijdens de ontwikkeling.
3.  **Documentatie:** Deze file dient als naslagwerk.
4.  **Code Reviews:** Teamleden kunnen letten op correcte toepassing.

## Vervolgstappen

-   Alle bestaande instanties van de oude `Button.svelte` in de codebase moeten worden geüpdatet naar ofwel `ButtonElement.svelte` of `Link.svelte`, afhankelijk van de functionaliteit.
-   De `Icon.svelte` component wordt gebruikt door beide nieuwe button-componenten en moet correct geconfigureerd zijn met `lucide-svelte`. 