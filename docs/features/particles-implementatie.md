# Implementatieplan (Technisch): Dynamische Particle-Achtergrond

Dit document beschrijft de technische specificaties en het stappenplan voor het vervangen van de huidige CSS-animatie door een dynamisch `tsparticles`-systeem.

## 1. Analyse en Doel

**Probleem:** De huidige animatie is niet-performant, visueel beperkt en niet schaalbaar.
**Doel:** Een subtiele, performante, volledig dekkende particle-animatie implementeren als achtergrond voor de rechterkolom van de loginpagina.

## 2. Architectuur: `tsparticles` met Svelte

We gebruiken de `tsparticles`-bibliotheek vanwege de hoge performance en configureerbaarheid.

-   **Library:** `@tsparticles/svelte` (Svelte-wrapper)
-   **Engine:** `@tsparticles/slim` (Lichtgewicht renderer, voldoende voor dit effect)
-   **Structuur:** De logica wordt geïsoleerd in een herbruikbaar Svelte-component (`Particles.svelte`) dat een `options`-object als prop accepteert.

## 3. Gefaseerd Implementatieplan

### Fase 1: Dependencies Installeren

Voer het volgende commando uit in de terminal om de benodigde packages aan het project toe te voegen:

```bash
npm install @tsparticles/svelte @tsparticles/slim
```

### Fase 2: `Particles.svelte` Component Opzetten

Maak het bestand `src/lib/components/ui/Particles.svelte` aan met de volgende basisstructuur. Dit component is verantwoordelijk voor het laden en initialiseren van de `tsparticles`-engine.

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import Particles from '@tsparticles/svelte';
  import { type ISourceOptions } from '@tsparticles/engine';
  import { loadSlim } from '@tsparticles/slim';

  export let options: ISourceOptions;
  let init = false;

  // Initialiseer de engine alleen aan de client-zijde.
  onMount(async () => {
    await loadSlim();
    init = true;
  });
</script>

{#if init}
  <div class="particle-container">
    <Particles {options} />
  </div>
{/if}

<style>
  .particle-container {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
</style>
```

### Fase 3: Particle-effect Configureren

De `options` prop bepaalt het volledige gedrag van de animatie. We maken een specifiek `loginParticlesOptions` object aan, bijvoorbeeld in een nieuw bestand `src/lib/components/ui/particles-options.ts` of direct in de `+page.svelte` script-tag.

**Configuratie Object (`loginParticlesOptions`):**

```typescript
import type { ISourceOptions } from '@tsparticles/engine';

export const loginParticlesOptions: ISourceOptions = {
  background: {
    color: {
      value: 'transparent', // Maak canvas transparant
    },
  },
  fpsLimit: 60, // Limiteer FPS voor performance
  interactivity: {
    events: {
      onClick: { enable: false },
      onHover: { enable: false },
    },
  },
  particles: {
    color: {
      value: '#ffffff', // Witte deeltjes
    },
    links: {
      enable: false, // Geen lijnen tussen deeltjes
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'out', // Deeltjes verdwijnen aan de randen
      random: true,
      speed: 0.5, // Langzame, subtiele beweging
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800, // Hoeveelheid deeltjes
      },
      value: 80,
    },
    opacity: {
      value: { min: 0.1, max: 0.5 }, // Start opacity
      animation: {
        enable: true,
        speed: 1,
        sync: false,
        startValue: 'random',
        destroy: 'none',
      },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 }, // Kleine, variabele grootte
    },
  },
  detectRetina: true,
};
```

### Fase 4: Integratie en Opschonen in `login/+page.svelte`

1.  **Opschonen:** Verwijder de oude 'sparkle' SVG's en de bijbehorende CSS (`.sparkle`, `@keyframes floatSparkle`).

2.  **Integreren:** Pas `src/routes/login/+page.svelte` als volgt aan.

    ```svelte
    <script lang="ts">
      // ... bestaande imports
      import Particles from '$lib/components/ui/Particles.svelte';
      import { loginParticlesOptions } from '$lib/components/ui/particles-options'; // (of definieer hier)

      // ... rest van de script-logica
    </script>

    <!-- ... -->

    <!-- Rechterkant - Feature Showcase (md:w-3/5) -->
    <div class="w-full md:w-3/5 text-white p-8 md:p-12 flex items-center relative overflow-hidden order-1 md:order-2" style="background: linear-gradient(135deg, #E91E63 0%, #D81B60 100%);">

      <!-- NIEUW: Particles Component -->
      <Particles options={loginParticlesOptions} />

      <!-- Glow Effect (moet een hogere z-index krijgen of verwijderd worden indien overbodig) -->
      <div class="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full hidden md:block z-10" style="background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);"></div>

      <!-- Content (moet een hogere z-index krijgen) -->
      <div class="relative z-10 ...">
        <!-- ... telefoon mockup, etc. ... -->
      </div>
    </div>

    <!-- ... -->
    ```
    **Belangrijk:** Zorg ervoor dat alle content die *over* de particles heen moet worden getoond een `position: relative` en een `z-index` hoger dan 0 krijgt (bv. `z-10`). Het `<Particles />` component heeft een `z-index` van 0 in zijn eigen stijl.

## 4. Verwacht Resultaat
Een performante, esthetisch aantrekkelijke en dynamische achtergrond die de UX verbetert zonder de laadtijd significant te beïnvloeden. De implementatie is modulair en herbruikbaar.
