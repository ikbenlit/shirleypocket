# 🎨 Easyleader Web App – UX/UI Styleguide (Aanvulling: Iconset)

Op basis van kleuren uit de CSS-variabelen, website-screenshots, algemene UX-principes, en de Easyleadership-filosofie. Deze aanvulling beschrijft de aanbevolen iconset voor de landingspagina, aanbodpagina, en Reflectieve Chat van de Easyleader-bot, met details over toegang en gebruik, om een consistente, moderne, en coachende uitstraling te garanderen.

---

## 🖼️ Iconset

**Gekozen iconset**: [Heroicons](https://heroicons.com/)  
**Waarom Heroicons?**  
Heroicons is een open-source iconset (MIT-licentie) met moderne, minimalistische iconen in twee stijlen: **Outline** (lijnsymbolen) en **Solid** (gevulde symbolen). De Outline-stijl is schoon en toegankelijk, ideaal voor functies en voordelen, terwijl Solid nadruk toevoegt voor CTA’s en belangrijke elementen. Heroicons zijn vectorgebaseerd (SVG), schaalbaar, en ondersteunen WCAG AA-contrast, passend bij de minimalistische esthetiek, afgeronde hoeken (border-radius: 12px), en warme, reflectieve toon van Easyleadership.

### Toegang en Gebruik
- **Open library**: Heroicons is vrij toegankelijk onder de MIT-licentie, zonder kosten of restricties. Geen handmatige download van de volledige set is nodig.
- **Integratiemethoden**:
  - **NPM-pakket**: Installeer `@heroicons/react` (of een Svelte-compatibele variant) voor eenvoudige integratie in SvelteKit. Dit biedt versiebeheer en toegang tot alle iconen (Outline en Solid).
  - **Directe SVG’s**: Kopieer individuele SVG-bestanden van de Heroicons-website of GitHub-repository voor specifieke iconen (bijv. `UserIcon`, `ClockIcon`). Voeg deze toe aan je projectmap (bijv. `/static/icons`) voor een lichtgewicht aanpak.
  - **CDN/prototyping**: Voor snelle tests kun je SVG’s rechtstreeks kopiëren van de website, maar dit is niet aanbevolen voor productie.
- **Aanbevolen aanpak**:
  - Gebruik het NPM-pakket voor schaalbaarheid en onderhoud in SvelteKit, vooral voor de landingspagina, aanbodpagina, en Reflectieve Chat.
  - Voor de POC kun je specifieke SVG’s kopiëren om de bestandsgrootte te minimaliseren, zoals `UserIcon`, `HeartIcon`, en `ArrowRightIcon`.
- **Optimalisatie**: Importeer alleen benodigde iconen om laadtijden te verkorten, cruciaal voor snelle prestaties op Vercel (<1 seconde).

### Kenmerken
- **Stijlen**: Outline voor subtiele, vriendelijke iconen; Solid voor actiegerichte, opvallende elementen.
- **Kleuren**: Gebruik styleguide-kleuren:
  - Donkerblauw (`rgb(0, 61, 75)`) voor primaire iconen (bijv. functies, titels).
  - Licht aqua (`rgb(145, 194, 207)`) voor secundaire iconen (bijv. voordelen, prompts).
  - Groenblauw (`rgb(0, 204, 156)`) voor positieve status (bijv. privacy, 24/7).
  - Wit (`rgb(255, 255, 255)`) op oranje knoppen (`rgb(255, 179, 71)`).
- **Grootte**:
  - 24px voor sectie-iconen (bijv. functies, voordelen).
  - 18px voor knop-iconen (bijv. CTA’s).
  - 16px voor inline-iconen (bijv. chatprompts).
- **Toegankelijkheid**:
  - Zorg voor WCAG AA-contrast (bijv. donkerblauw op wit: >4.5:1).
  - Voeg aria-labels toe (bijv. `aria-label="24/7 ondersteuning"`) voor schermlezers.
  - Gebruik tekstalternatieven of tooltips voor context.
- **Animaties**:
  - Hover: Lichte puls of schaalvergroting (1.05x) voor interactieve iconen.
  - Laden: Fade-in (0,3 seconden) bij het verschijnen van secties.

### Toepassing in de Easyleader-bot

#### Landingspagina
- **Hero-sectie**:
  - Icoon naast CTA-knop “Log in en start”: `ArrowRightIcon` (Solid, wit, 18px) in oranje knop (`rgb(255, 179, 71)`).
- **Functies-sectie**:
  - Reflectieve vragen: `UserIcon` (Outline, donkerblauw, 24px) voor denkend hoofd.
  - Praktische oefening: `ChatBubbleLeftRightIcon` (Outline, licht aqua, 24px) voor gespreksbubble.
  - Altijd beschikbaar: `ClockIcon` (Outline, groenblauw, 24px) voor 24/7 ondersteuning.
- **Voordelen-sectie**:
  - Persoonlijke coaching: `HeartIcon` (Solid, licht aqua, 24px) voor empathie.
  - Praktische groei: `ArrowUpIcon` (Solid, donkerblauw, 24px) voor groei.
  - Veilig en vertrouwd: `ShieldCheckIcon` (Solid, groenblauw, 24px) voor privacy.
- **CTA-sectie**:
  - Icoon naast “Log in nu”: `ArrowRightIcon` (Solid, wit, 18px) in oranje knop.

#### Aanbodpagina
- **Intro-sectie**:
  - Icoon naast “Beste Yvette”: `SparklesIcon` (Outline, licht aqua, 20px) voor enthousiasme.
- **POC-aanbod-sectie**:
  - Icoon bij bullets: `CheckCircleIcon` (Outline, groenblauw, 20px) voor gratis aanbod.
- **Doorontwikkelingsdiensten-sectie**:
  - Uitbreiding bot: `PuzzlePieceIcon` (Outline, donkerblauw, 24px) voor integratie.
  - Ledenomgeving: `LockClosedIcon` (Outline, licht aqua, 24px) voor exclusiviteit.
  - Demo-modus: `StarIcon` (Outline, groenblauw, 24px) voor toegankelijkheid.
  - Optimalisatie: `CogIcon` (Outline, donkerblauw, 24px) voor onderhoud.
- **CTA-sectie**:
  - Icoon naast “Plan een gesprek”: `CalendarIcon` (Solid, wit, 18px) in oranje knop.

#### Reflectieve Chat
- **Welkomstbericht**:
  - Icoon naast “Hoi [Naam], fijn dat je er bent!”: `SparklesIcon` (Outline, licht aqua, 20px).
- **Chatberichten**:
  - Icoon bij botberichten: `ChatBubbleLeftIcon` (Outline, wit, 16px) in donkerblauwe bubbles (`rgb(0, 61, 75)`).
- **Promptknoppen**:
  - Icoon in oranje knoppen (bijv. “Deel je gedachten”): `ArrowRightIcon` (Solid, wit, 16px).

### Richtlijnen voor Gebruik
- **Consistentie**: Gebruik Outline voor informatieve secties (functies, voordelen) en Solid voor actiegerichte elementen (CTA’s, nadrukkelijke voordelen).
- **Kleurgebruik**: Stem iconen af op styleguide-kleuren. Vermijd afwijkende kleuren zoals rood (`rgb(237, 28, 36)`) tenzij voor foutmeldingen.
- **Grootte en schaling**: Zorg dat iconen scherp blijven op retina-schermen en mobiel (<768px). Gebruik 24px voor sectie-iconen, 18px voor knoppen, en 16px voor inline-toepassingen.
- **Toegankelijkheid**:
  - Voeg aria-labels toe (bijv. `aria-label="Privacyveilig"`) voor iconen zonder tekst.
  - Test contrast op achtergronden (wit, lichtblauwgrijs, donkerblauw).
  - Gebruik tooltips of nabijgelegen tekst om de betekenis van iconen te verduidelijken.
- **Animaties**:
  - Hover: Lichte puls of schaalvergroting (1.05x) voor interactieve iconen (bijv. in functies-sectie).
  - Laden: Fade-in (0,3 seconden) bij het verschijnen van secties.
  - Vermijd overmatige animaties om de coachende, rustige uitstraling te behouden.

### Implementatietips
- **Integratie in SvelteKit**: Gebruik het NPM-pakket (`@heroicons/react` of community-ondersteuning voor Svelte) voor schaalbare integratie. Alternatief: kopieer specifieke SVG’s van de Heroicons-website naar `/static/icons` voor een lichtgewicht POC.
- **Optimalisatie**: Importeer alleen benodigde iconen (bijv. `UserIcon`, `HeartIcon`) om de bestandsgrootte te minimaliseren. Gebruik SVG-sprites voor betere prestaties.
- **Testen**:
  - Controleer zichtbaarheid en contrast op verschillende apparaten (<768px, retina).
  - Valideer toegankelijkheid met schermlezers en toetsenbordnavigatie.
  - Zorg dat iconen intuïtief zijn voor leidinggevenden en Yvette’s coachende stijl weerspiegelen.
- **Licentie**: Vermeld de MIT-licentie in je projectdocumentatie (bijv. README) om aan de voorwaarden te voldoen.

### Alternatieve Iconsets
Voor flexibiliteit kunnen de volgende iconsets worden overwogen:
1. **Feather Icons** ([feathericons.com](https://feathericons.com/)):
   - Minimalistische, lijngebaseerde iconen met een zachte, vriendelijke uitstraling.
   - Geschikt voor functies en voordelen, maar biedt minder nadruk dan Heroicons Solid.
   - Open-source (MIT-licentie), eenvoudig te integreren via NPM of SVG’s.
2. **Tabler Icons** ([tabler-icons.io](https://tabler-icons.io/)):
   - Brede set met strakke, moderne lijniconen, ideaal voor een professionele look.
   - Flexibel voor zowel Outline- als Solid-achtige toepassingen, met goede toegankelijkheid.
   - Open-source (MIT-licentie), geoptimaliseerd voor webapps.

**Waarom Heroicons de voorkeur heeft**: Heroicons biedt de beste balans tussen minimalisme, veelzijdigheid, en nadruk, met Outline- en Solid-stijlen die perfect aansluiten bij de coachende, empathische toon van Easyleadership. De open-source toegankelijkheid en eenvoudige integratie maken het ideaal voor SvelteKit en Vercel.