# Easyleader Releasenotes

## Versie 1.0.2 - [Huidige datum]

### Nieuwe functies

- **Introductie Categoriekeuze en Suggestievragen in Chat:**
  - Gebruikers kunnen nu bij aanvang van de chat kiezen uit vooraf gedefinieerde leiderschapscategorieën (bijv. "Verantwoordelijkheid/Pro-activiteit/Delegeren", "Teammeetings", "Omgaan met weerstand", etc.).
  - De categorieën worden weergegeven als klikbare "chips" direct onder het welkomstbericht.
  - Elke categorie heeft een unieke themakleur voor visuele herkenbaarheid.
  - Na het selecteren van een categorie verschijnen er relevante suggestievragen als klikbare items onder de categoriechips.
  - Het selecteren van een suggestievraag vult automatisch het inputveld en verzendt de vraag, waardoor de interactie wordt gestroomlijnd.
  - Er is een "Meer..." / "Minder..." knop functionaliteit geïmplementeerd voor de categoriechips om de interface overzichtelijk te houden; initieel worden 3 categorieën getoond, de rest na een klik op "Meer...".
  - De data voor categorieën en vragen wordt geladen uit `src/lib/data/chat_category.json`.
  - Deze functionaliteit vervangt de eerdere "Casus Knoppen" en biedt een meer gestructureerde en uitgebreide manier om een gespreksonderwerp te kiezen.
  - De implementatie omvat nieuwe Svelte componenten (`CategoryChipContainer.svelte`, `CategoryChip.svelte`, `QuestionChip.svelte`) en een Svelte store (`chatStore.ts`) voor state management.

### Verbeteringen

- **Optimalisatie System Prompt voor LLM:**
  - De `easyleadership_baseprompt.md` (system prompt) is geoptimaliseerd voor duidelijkere en meer gestructureerde LLM-antwoorden.
  - De prompt bevat nu explicietere instructies over de gewenste lengte van alinea's, het gebruik van witregels, en de correcte opmaak van opsommingen (Markdown list-stijl).
  - Het doel is om de output van de LLM beknopter, beter leesbaar en consistenter te maken.

## Versie 1.0.1 - [Huidige datum]

### Opgeloste problemen

#### Navigatie naar Login/Chat Pagina's Mislukte (500 Fout / Geen Laden)
**Probleem:** Gebruikers konden niet navigeren naar de `/login` of `/chat` pagina's. De pagina's laadden niet correct en de browser toonde soms een 500 foutmelding, hoewel de terminal niet altijd een duidelijke serverfout logde.

**Oorzaak:** Dit probleem had meerdere onderliggende oorzaken die na elkaar werden ontdekt en opgelost:
1.  **Foutieve Syntax in Hoofdlayout:** Het bestand `src/routes/+layout.svelte` bevatte de regel `let { children } = $props();`, wat ongebruikelijk is voor een standaard layout en problemen veroorzaakte tijdens Server-Side Rendering (SSR).
2.  **Dubbele Store Bestanden:** Zowel `src/lib/stores/userStore.ts` (correct) als `src/lib/stores/userStore.js` (incorrect, met TypeScript syntax) bestonden, wat leidde tot een `Parse failure` tijdens de build/SSR omdat het `.js` bestand werd opgepakt.
3.  **Fout in Avatar Component:** De component `src/lib/components/ui/avatar.svelte` probeerde een `getInitials` functie en `id`/`profileImage` eigenschappen te importeren/gebruiken uit `userStore.ts`, waar deze niet (meer) bestonden. Dit veroorzaakte een crash tijdens het renderen van de component op de server.

**Oplossing:**
1.  De `$props()` regel is verwijderd uit `src/routes/+layout.svelte`.
2.  Het incorrecte `src/lib/stores/userStore.js` bestand is verwijderd.
3.  De `avatar.svelte` component is aangepast om niet langer afhankelijk te zijn van `getInitials`, `id`, of `profileImage` uit de `userStore`. Het genereert nu initialen lokaal op basis van beschikbare data (naam/e-mail) en baseert de kleur op het e-mailadres.

**Technische notitie:** Dit illustreert hoe fouten tijdens Server-Side Rendering (SSR) soms lastig te diagnosticeren zijn, vooral als meerdere problemen bijdragen of als de terminal logging onduidelijk is. Stapsgewijze isolatie van componenten en aandacht voor build-/parsefouten zijn cruciaal.

#### Favicon 404 Fouten in Logs
**Probleem:** De terminal logde 404 (Not Found) fouten voor `/favicon.png` en `/favicon.jpg` bij het starten van de dev server.

**Oorzaak:** Browsers vragen automatisch naar favicon-bestanden in de root directory. De links in `src/app.html` verwezen naar deze root-locaties, maar het favicon-bestand bevond zich alleen in `static/icons/`. Er waren ook incorrecte verwijzingen naar een `.jpg` versie.

**Oplossing:**
1.  De `src/app.html` is opgeschoond en verwijst nu alleen nog naar `/favicon.png`.
2.  Het `favicon.png` bestand is gekopieerd van `static/icons/favicon.png` naar `static/favicon.png` om aan het browserverzoek naar de root te voldoen.

#### Casusopties verschenen niet bij opstarten van de chat
**Probleem:** Na het toevoegen van het informatie-icoon in de sidebar verschenen de casusopties (Moeilijk gesprek, Team motiveren, Conflict oplossen) niet meer bij het opstarten van de chat.

**Oorzaak:** Meerdere factoren veroorzaakten dit probleem:
1. Conflicterende onMount-functies die de initialisatie van de chat verstoorden
2. Onveilige context-management bij het ophalen van de sidebar status
3. Race condition bij het instellen van de casusGekozen flag en het initialiseren van de berichten

**Oplossing:**
1. Herstructurering van de code met gescheiden verantwoordelijkheden
2. Nieuwe initializeChat-functie die alle chat-gerelateerde initialisatie centraliseert
3. Verbeterde error handling bij het opzetten van de context
4. Toevoeging van een handige resetChat-functie (gekoppeld aan het logo) om de chat te kunnen resetten

**Technische notitie:** Dit probleem toont het belang van een goede initialisatievolgorde in component lifecycle-methoden. Voor toekomstige ontwikkelingen is het raadzaam om:
- Initialisatie te centraliseren in afzonderlijke functies
- Niet te vertrouwen op de volgorde van lifecycle hooks
- Error handling toe te voegen bij context-afhankelijke operaties
- Adequate logging toe te voegen voor debugdoeleinden

#### Chat scroll-probleem opgelost
**Probleem:** Gebruikers konden niet naar beneden scrollen in de chat wanneer er nieuwe berichten werden toegevoegd. Na de initiële poging om dit op te lossen werd de pagina traag en reageerde niet goed.

**Oorzaak:** Meerdere factoren droegen bij aan dit probleem:
1. De scrollToBottom-functie bevatte een extra timeout die onnodig was en vertragingen veroorzaakte
2. De afterUpdate lifecycle hook werd te vaak aangeroepen voor elke render-update
3. Complexe CSS-berekeningen met calc() zorgden voor extra rendering-belasting

**Oplossing:** 
1. De scrollToBottom-functie is vereenvoudigd en overbodige code is verwijderd
2. De afterUpdate hook is volledig verwijderd om onnodige DOM-updates te voorkomen
3. CSS-eigenschappen zijn geoptimaliseerd met een eenvoudigere structuur, maar met behoud van de max-height om scrollen mogelijk te maken

**Technische notitie:** Dit is een bekend probleem in Svelte-applicaties waarbij teveel reactieve updates en DOM-manipulaties kunnen leiden tot prestatieproblemen. Voor toekomstige ontwikkelingen is het raadzaam om:
- Voorzichtig te zijn met lifecycle hooks zoals afterUpdate
- Timeouts te vermijden binnen functies die vaak worden aangeroepen
- CSS-berekeningen te vereenvoudigen waar mogelijk
- Te testen op langzamere apparaten om prestatieproblemen vroegtijdig te ontdekken

#### Verbeterde Theming en Dark Mode Consistentie in Chatinterface
**Probleem:** De tekst in het inputveld van de chat was slecht leesbaar op de Vercel-deployment vanwege een onverwachte standaard donkere modus en een gebrek aan specifieke dark mode stijlen. De chatinterface vertoonde verder inconsistenties en slechte leesbaarheid in de donkere modus.

**Oorzaak:**
1.  De website kon onverwacht in donkere modus starten gebaseerd op de OS-voorkeur van de gebruiker, zelfs als er geen expliciete thema-keuze was opgeslagen in `localStorage`.
2.  Een significant aantal UI-elementen binnen de chatpagina (`src/routes/chat/+page.svelte`) miste specifieke Tailwind CSS `dark:` varianten. Dit leidde tot problemen met contrast en een inconsistente gebruikerservaring wanneer de donkere modus actief was.

**Oplossing:**
1.  Het initialisatiescript voor het thema in `src/app.html` is aangepast. De website start nu standaard in de lichte modus. De donkere modus wordt alleen geactiveerd als `'dark'` expliciet is opgeslagen als thema-voorkeur in `localStorage`. De OS-voorkeur wordt niet langer gebruikt voor de initiële thema-instelling.
2.  Er zijn uitgebreide `dark:` mode Tailwind-klassen toegevoegd aan diverse elementen in `src/routes/chat/+page.svelte` om een consistente en goed leesbare donkere modus te garanderen. Dit omvat:
    *   Het hoofdinputveld (tekstkleur, placeholder-kleur, achtergrondkleur, border-kleur).
    *   De achtergrond van de container van het inputveld.
    *   De algemene achtergrond van de pagina en de achtergrond van de chatberichten-container.
    *   De "Je gesprekken worden niet opgeslagen" privacy banner.
    *   De chatbubbels van de gebruiker (achtergrondkleur, tekstkleur, border-kleur).

### Verbeteringen
- **Optimalisatie `baseSystemPrompt` voor OpenAI API:**
    - De `baseSystemPrompt` die gebruikt wordt voor de OpenAI API is verplaatst van een hardgecodeerde string in `src/routes/api/chat/+server.ts` naar een extern Markdown-bestand (`src/lib/server/prompts/easyleadership_baseprompt.md`).
    - Deze wijziging verbetert de leesbaarheid en onderhoudbaarheid van de prompt aanzienlijk.
    - De prompt wordt nu dynamisch ingeladen in `server.ts` met Vite's `?raw` importfunctionaliteit.

- **Verdere Verfijning Dark Mode in Chatinterface:**
  - Themakleuren en `dark:` Tailwind CSS-varianten zijn nu consistent toegepast in `src/routes/chat/+page.svelte` voor een verbeterde gebruikerservaring in donkere modus. Specifieke aanpassingen omvatten:
    - Hoofdachtergrond: Gebruik van `bg-secondary-light-blue-gray` en `dark:bg-gray-900`.
    - Chatcontainer: `dark:bg-slate-800`.
    - Privacybanner: Gestyled met `bg-status-positive` en `dark:bg-emerald-600`, inclusief `dark:text-white` voor de tekst.
    - Gebruikersberichten: Aangepaste borders (`border-highlight-light-aqua`), achtergronden (`dark:bg-sky-600`, `dark:border-sky-400`) en tekstkleuren (`text-neutral-dark-gray`, `dark:text-sky-50`).
    - Invoerveld: Volledige dark mode styling voor het veld zelf (o.a. `dark:bg-gray-800`, `dark:text-gray-200`), placeholdertekst (`dark:placeholder-gray-400`), borders (`dark:border-gray-600`) en focusstijlen (`dark:focus:border-highlight-light-aqua`).

---

## Versie 1.0.0 - [Release datum]

### Nieuwe functies
- Initiële release van de Easyleader Coach chatbot
- Implementatie van de OpenAI API-integratie met gpt-4-turbo model
- Responsive chatinterface met tailwind CSS
- Casuskeuze voor verschillende coaching-scenarios
