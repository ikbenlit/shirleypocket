# Debugging: 404 Fouten voor Assets en Linterprobleem

Dit document beschrijft de aanhoudende problemen met het laden van assets (afbeeldingen en lettertypen) en een linterfout gerelateerd aan de `$lib` alias in het Shirley in je Pocket SvelteKit project.

## Huidige Problemen

1.  **404 Fouten voor Statische Assets:**
    *   De Vite development server retourneert 404 "Not Found" fouten voor de volgende bestanden:
        *   `/images/avatar-1.webp`
        *   `/images/avatar-2.webp`
        *   `/images/avatar-3.webp`
        *   `/fonts/Lora-Bold.woff2`
    *   Deze fouten treden op ondanks dat de bestanden correct lijken te zijn geplaatst in de `public/images/` en `public/fonts/` mappen en de paden in de Svelte componenten (`Testimonials.svelte`) correct lijken te zijn (`/images/...`).

2.  **Linterfout voor `$lib` Alias:**
    *   Er is een aanhoudende linterfout in Svelte componenten (bijv. `Testimonials.svelte`) van het type: `Cannot find module '$lib/actions/animateOnScroll' or its corresponding type declarations.`
    *   Dit gebeurt ondanks dat de `$lib` alias correct is geconfigureerd in `svelte.config.js` (`kit.alias`) en de `tsconfig.json` is aangepast om SvelteKit de alias-resolutie te laten beheren (door `compilerOptions.paths` te verwijderen).

## Uitgevoerde Stappen

1.  **Asset Locatie:**
    *   Alle statische assets zijn verplaatst van een eventuele `static` map naar de `public` map.
    *   Paden in Svelte componenten zijn geverifieerd en gebruiken de root-relatieve notatie (bijv. `/images/avatar-1.webp`).
2.  **Vite Cache:**
    *   De Vite cachemap (`node_modules/.vite/`) is verwijderd.
    *   De Vite development server is meerdere keren herstart.
3.  **`tsconfig.json` Configuratie:**
    *   De `compilerOptions.paths` en `compilerOptions.baseUrl` zijn verwijderd uit de `tsconfig.json` om SvelteKit de alias-resolutie volledig te laten beheren, zoals aanbevolen door de SvelteKit waarschuwing.
4.  **`vite.config.ts` Aliassen:**
    *   De `resolve.alias` in `vite.config.ts` is (tijdelijk) behouden, aangezien het verwijderen hiervan linterfouten in de Vite configuratie zelf leek te veroorzaken.
5.  **Controle `svelte.config.js`:**
    *   De `kit.alias` voor `$lib` is bevestigd als correct (`./src/lib`).
6.  **Herstarten Development Tools:**
    *   Suggesties gedaan om de Svelte Language Server en de code-editor (VS Code) opnieuw te starten.

## Volgende Aanbevolen Stappen

1.  **Grondige Verificatie van `public` Map Inhoud:**
    *   **Cruciaal:** Handmatig en uiterst zorgvuldig controleren of de `public` map in de project root (`C:\\development\\07-shirleypocket\\public`) de volgende structuur en bestanden bevat (let op exacte spelling, hoofdletters, en extensies):
        *   `public/images/avatar-1.webp`
        *   `public/images/avatar-2.webp`
        *   `public/images/avatar-3.webp`
        *   `public/fonts/Lora-Bold.woff2`
    *   Overwegen om de output van `Get-ChildItem -Path public -Recurse | Select-Object FullName, Name, Length` (PowerShell) te delen om de daadwerkelijke bestandsstructuur te bevestigen.
2.  **Controleren `app.html`:**
    *   Verifiëren welke lettertypen (en met welke paden) worden geladen in `src/app.html` via `<link rel="preload">` of `<link rel="stylesheet">` tags. Dit kan de bron van de `Lora-Bold.woff2` 404 verklaren als het daar nog geladen wordt.
3.  **Opschonen `tailwind.config.js` (optioneel):**
    *   Als het Lora lettertype niet meer actief gebruikt wordt, overweeg de `'lora': ['Lora', ...]` definitie uit `tailwind.config.js` te verwijderen om onnodige 404's te voorkomen.
4.  **Linterfout Oplossen:**
    *   Na bevestiging van de `public` map en het herstarten van de Vite server:
        *   Svelte Language Server opnieuw starten (VS Code: Ctrl+Shift+P -> "Svelte: Restart Svelte Language Server").
        *   VS Code (of de gebruikte editor) volledig herstarten.
        *   Als laatste redmiddel voor de linter: `node_modules` en `.svelte-kit` verwijderen en `npm install` opnieuw uitvoeren.

De focus ligt primair op het oplossen van de 404-fouten, aangezien dit de functionele weergave van de landingspagina direct beïnvloedt. De linterfout is belangrijk voor de ontwikkelervaring en kan gerelateerd zijn aan de manier waarop de projectconfiguratie wordt geïnterpreteerd door de tooling. 