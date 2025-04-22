# 🌐 Landingspagina en Aanbodpagina voor de Easyleader-bot

Hieronder worden twee pagina's beschreven voor de Easyleader-bot: een **landingspagina** voor leidinggevenden en een **aanbodpagina** gericht op Yvette van Easyleadership. Beide pagina's zijn modern, professioneel, en consistent met het Reflectieve Chat ontwerp, de Easyleadership UX/UI Styleguide (warme, reflectieve toon, Poppins-font, kleurenpalet), en de functionele eisen (24/7 toegang, beveiligde login, ABC-model, geen datastorage, welkomstbericht, open vragen, casusherkenning, reactietijd <2 seconden). Ze zijn geoptimaliseerd voor een SvelteKit-app op Vercel.

---

## 🌐 Landingspagina voor de Easyleader-bot

**Concept**: Een moderne, uitnodigende landingspagina die leidinggevenden verwelkomt en motiveert om de Easyleader-bot te gebruiken als digitale coach binnen het Easyleadership-programma. De hero-sectie benadrukt Yvette's visie en de bot's kernfuncties, bouwt vertrouwen op, en stimuleert inloggen. Het ontwerp is consistent met de Reflectieve Chat, volgt de UX/UI Styleguide, en sluit aan bij Yvette's missie om leidinggevenden te helpen groeien via praktische, reflectieve ondersteuning.

### Visueel Ontwerp

- **Algemene lay-out**:
  - Een full-screen, mobile-first ontwerp met een schone structuur, verdeeld in secties: hero, functies, voordelen, call-to-action (CTA), en footer.
  - Achtergrond: lichtblauwgrijs (`rgb(191, 207, 210)`) met witte containers (`rgb(255, 255, 255)`, border-radius: 12px, lichte schaduw) voor secties, passend bij de Reflectieve Chat.
  - Donkerblauwe accenten (`rgb(0, 61, 75)`) voor headers en oranje knoppen (`rgb(255, 179, 71)`) voor CTA's, met hover-effect (donkerder oranje: `rgb(255, 159, 51)`).
  - Typografie: Poppins (Bold 32px voor hoofdtitels, Medium 18-20px voor subtitels, Light 16px voor bodytekst).

- **Hero-sectie**:
  - Donkerblauwe banner (`rgb(0, 61, 75)`, border-radius: 12px) met titel: "Yvette's digitale coach voor jouw leiderschap" (Poppins Bold, 32px, wit).
  - Ondertitel: "Reflecteer en groei met de Easyleader-bot, jouw 24/7 partner in het Easyleadership-programma" (Poppins Medium, 20px, wit).
  - Intro over Yvette: "Geïnspireerd door Yvette's 10-stappenprogramma helpt deze bot je om praktisch te oefenen met gesprekken en gedragsverandering in je team." (Poppins Light, 16px, wit).
  - Kernfuncties in een compacte lijst (licht aqua bullets, `rgb(145, 194, 207)`):
    - Praktische coaching via het ABC-model.
    - Persoonlijke, reflectieve ondersteuning in Yvette's stijl.
    - Privacyveilig: geen opslag van gesprekken.
  - Oranje CTA-knop: "Log in en start" (Poppins Medium, 18px, border-radius: 12px), met hover-effect (lichte gloed).
  - Rechts een illustratie van de Reflectieve Chat (wit, donkerblauw, licht aqua), met een voorbeeldcasus zoals "Moeilijk gesprek". Op mobiel verschijnt deze onder de tekst.
  - Animatie: Titel, ondertitel, en knop verschijnen met fade-in (0,5 seconden); illustratie schuift subtiel omhoog.

- **Functies-sectie**:
  - Witte container met titel: "Hoe de Easyleader-bot jou ondersteunt" (Poppins Bold, 24px, donkerblauw).
  - Drie functies in compacte kaarten (wit, border-radius: 12px, lichte schaduw):
    1. **Reflectieve vragen**: "Krijg inzichten met het ABC-model, zoals: 'Wat dacht je toen dit gebeurde?'" (icoon: denkend hoofd in donkerblauw).
    2. **Praktische oefening**: "Oefen gesprekken, zoals een moeilijk gesprek met een teamlid." (icoon: gespreksbubble in licht aqua).
    3. **Altijd beschikbaar**: "24/7 ondersteuning, wanneer jij het nodig hebt." (icoon: klok in groenblauw, `rgb(0, 204, 156)`).
  - Kaarten hebben korte tekst (Poppins Light, 16px, donkergrijs: `rgb(64, 110, 120)`) en een icoon.
  - Animatie: Kaarten verschijnen met slide-in (links naar rechts, 0,3 seconden) bij scrollen.

- **Voordelen-sectie**:
  - Licht aqua achtergrond (`rgb(145, 194, 207)`) met witte container en titel: "Waarom kiezen voor de Easyleader-bot?" (Poppins Bold, 24px, donkerblauw).
  - Drie voordelen in een grid (verticaal op mobiel):
    1. **Persoonlijke coaching**: "Voelt als een gesprek met Yvette, met empathische en reflectieve vragen." (icoon: hart in licht aqua).
    2. **Praktische groei**: "Pas het 10-stappenprogramma direct toe in je dagelijkse praktijk." (icoon: groeipijl in donkerblauw).
    3. **Veilig en vertrouwd**: "Je privacy is gegarandeerd; gesprekken worden niet opgeslagen." (icoon: schild in groenblauw).
  - Animatie: Voordelen verschijnen met fade-in (0,4 seconden) bij scrollen.

- **CTA-sectie**:
  - Witte container met tekst: "Klaar om je leiderschap te versterken?" (Poppins Bold, 24px, donkerblauw).
  - Ondertitel: "Log in en start je eerste reflectie met de Easyleader-bot" (Poppins Medium, 18px, donkergrijs).
  - Grote oranje knop: "Log in nu" (Poppins Medium, 18px, border-radius: 12px), met hover-effect (schaduw, donkerder oranje).
  - Animatie: Tekst en knop zoomen subtiel in (0,4 seconden).

- **Footer**:
  - Donkerblauwe strook (`rgb(0, 61, 75)`) met witte tekst (Poppins Light, 14px): "© 2025 Easyleadership. Alle rechten voorbehouden."
  - Links naar "Privacybeleid" en "Contact" (wit, onderstreept bij hover).
  - Klein Easyleadership-logo in licht aqua (`rgb(145, 194, 207)`).

- **Toegankelijkheid**:
  - WCAG AA-contrast: donkerblauw op wit (>4.5:1), oranje op wit (>3:1).
  - Licht aqua focusstates (`rgb(145, 194, 207)`) voor knoppen/links.
  - Toetsenbordnavigatie: Tab door CTA-knoppen en footerlinks.
  - Aria-labels voor iconen en knoppen; tekstalternatieven voor illustratie.

### Interactie-ontwerp

- **Hero-sectie**: Oranje "Log in en start" knop leidt naar het inlogscherm (wit, oranje "Inloggen" knop, consistent met Reflectieve Chat). Fade-overgang bij klikken.
- **Functies-sectie**: Kaarten zijn klikbaar; hover toont een licht aqua gloed, met een tooltip (bijv. "Het ABC-model helpt je situaties analyseren").
- **Voordelen-sectie**: Subtiele hover-effecten op iconen (lichte puls) nodigen uit tot interactie.
- **CTA-sectie**: "Log in nu" knop pulseert licht bij hover. Foutmelding bij ongeldige inlog: "Oeps, controleer je gegevens" (rood, `rgb(237, 28, 36)`).
- **Responsiveness**: Mobile-first; op mobiel (<768px) stapelen secties verticaal, met kleinere tekst (hoofdtitel: 24px, body: 14px) en tapvriendelijke knoppen (min. 44x44px).

### Gebruikerservaring (UX)

- **Eerste indruk**: Warme toon ("Yvette's digitale coach") en visuele consistentie met de bot maken de pagina vertrouwd en uitnodigend.
- **Navigatie**: Duidelijke hiërarchie: hero trekt aandacht, functies en voordelen overtuigen, CTA motiveert inloggen.
- **Toon**: Reflectief en motiverend, zoals "Reflecteer en groei met de Easyleader-bot", passend bij Yvette's stijl.
- **Helderheid**: Minimalistische lay-out en consistente kleuren zorgen voor een rustige, professionele ervaring.

### Aansluiting bij Reflectieve Chat en Styleguide

- **Visueel**: Zelfde kleuren (donkerblauw, licht aqua, oranje, wit), Poppins-font, en afgeronde elementen (border-radius: 12px) als de Reflectieve Chat.
- **Tonale**: Warme, empathische toon spiegelt de bot's stijl ("Hoi [Naam], fijn dat je er bent!").
- **Functioneel**: Benadrukt must-haves (24/7 toegang, ABC-model, privacyveilig) en leidt naar het beveiligde inlogscherm.

---

## 🔒 Inlogpagina

**Concept**: Een gastvrije en functionele inlogpagina die gebruikers snel toegang geeft tot de Easyleader-bot. De pagina is opgedeeld in twee kolommen: links het directe inlogformulier en rechts een informatieve/onboarding sectie die de waarde van de bot benadrukt en visueel aansluit bij de branding. De layout is volledig consistent met de landingspagina en de Reflectieve Chat interface.

### Visueel Ontwerp

- **Algemene lay-out (Desktop)**:
  - Een **twee-kolommen layout** die de beschikbare ruimte vult (bijv. `min-h-screen grid grid-cols-1 lg:grid-cols-2`).
  - Optionele wrapper: Een centrale container (bijv. `max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden`) die beide kolommen bevat voor een geïntegreerd uiterlijk.
  - **Kolom 1 (Links): Login Formulier Sectie**:
    - Focus op functionaliteit.
    - Bevat het logo bovenaan (optioneel).
    - Titel: "Welkom terug" of "Inloggen" (Poppins Bold, 24px, donkerblauw).
    - Het inlogformulier met e-mail, wachtwoord, "Wachtwoord vergeten?" link en de oranje "Inloggen" knop.
    - Voldoende padding (bijv. `p-8` of `p-12`).
  - **Kolom 2 (Rechts): Informatie & Onboarding Sectie**:
    - Visueel aantrekkelijk en informatief.
    - Bevat een prominente afbeelding of illustratie (bijv. chat-mockup of abstract beeld) die de ruimte goed vult of een groot deel ervan beslaat.
    - Titel: "Jouw Digitale Coach Wacht" (Poppins Bold, 24px, donkerblauw of wit, afhankelijk van achtergrond).
    - Korte, scanbare tekst (2-3 punten) met voordelen (Lora Regular of Poppins Light, 16px, donkergrijs of wit):
      - "Krijg direct inzicht met het ABC-model."
      - "Oefen met lastige gesprekken in een veilige omgeving."
      - "Toegankelijk 24/7, als aanvulling op je programma."
    - Kan een contrasterende achtergrondkleur hebben (bijv. donkerblauw of licht aqua) of dezelfde witte achtergrond als de wrapper.
    - Voldoende padding (bijv. `p-8` of `p-12`).
- **Formulierelementen** (binnen linkerkolom):
  - Inputvelden: Witte achtergrond, subtiele grijze rand, `border-radius: 8px`.
  - Labels: Poppins Medium, 14px (`text-sm`), donkergrijs.
  - "Inloggen" Knop: Primair (oranje), `border-radius: 12px`, Poppins Medium, 18px.
  - "Wachtwoord vergeten?" Link: Poppins Light, 14px (`text-sm`), donkerblauw, `hover:underline`.
- **Typografie**: Consistent gebruik van Poppins en Lora zoals gedefinieerd in de styleguide.

### Interactie-ontwerp

- **Focus**: Automatische focus op het e-mailadres veld (linkerkolom).
- **Validatie**: Basis client-side validatie voor e-mailformaat in de linkerkolom. Inline foutmeldingen bij ongeldige invoer.
- **Feedback bij Inloggen** (linkerkolom):
  - Laadindicator op de knop (tekst of spinner).
  - Succes: Snelle doorverwijzing naar de bot interface.
  - Fout: Duidelijke foutmelding binnen de formuliersectie.
- **Responsiveness**:
  - **Mobiel (< lg breakpoint)**: De twee kolommen **stapelen verticaal**. Eerst de Informatie & Onboarding Sectie, daaronder de Login Formulier Sectie. De (optionele) wrapper neemt de volledige breedte in (met padding).

### Gebruikerservaring (UX)

- **Eenvoud & Efficiëntie**: Login formulier is direct beschikbaar en duidelijk.
- **Context & Motivatie**: Rechterkolom biedt waarde en herkenning.
- **Visuele Scheiding**: Duidelijk onderscheid tussen actie (inloggen) en informatie.
- **Vertrouwen**: Professioneel ontwerp, consistente branding.

### Aansluiting bij Andere Pagina's

- **Visueel**: Hergebruik van kleuren, fonts, en afrondingen zorgt voor consistentie.
- **Functioneel**: Blijft de beveiligde toegangspoort, nu met extra context.

---

## 📄 Aanbodpagina voor Yvette

**Concept**: Een persoonlijke, professionele aanbodpagina die Yvette direct aanspreekt, het gratis Proof of Concept (POC) voor de Easyleader-bot presenteert, enthousiasme voor de samenwerking toont, en jouw diensten voor doorontwikkeling beschrijft. De pagina voelt als een warme, op maat gemaakte offerte, met een motiverende toon en een duidelijke call-to-action om de samenwerking te starten. Het ontwerp is consistent met de landingspagina en Reflectieve Chat, volgt de UX/UI Styleguide, and bouwt voort op het intakeverslag.

### Visueel Ontwerp

- **Algemene lay-out**:
  - Een full-screen, mobile-first pagina met secties: intro, POC-aanbod, doorontwikkelingsdiensten, call-to-action (CTA), en footer.
  - Achtergrond: lichtblauwgrijs (`rgb(191, 207, 210)`) met witte containers (`rgb(255, 255, 255)`, border-radius: 12px, lichte schaduw).
  - Donkerblauwe headers (`rgb(0, 61, 75)`) en oranje knoppen (`rgb(255, 179, 71)`), met hover-effect (donkerder oranje: `rgb(255, 159, 51)`).
  - Typografie: Poppins (Bold 32px voor hoofdtitel, Medium 20-24px voor subtitels, Light 16px voor bodytekst).

- **Intro-sectie**:
  - Donkerblauwe banner (`rgb(0, 61, 75)`, border-radius: 12px) met titel: "Beste Yvette, laten we jouw visie tot leven brengen" (Poppins Bold, 32px, wit).
  - Persoonlijke intro: "Met veel enthousiasme bieden we de gratis Proof of Concept (POC) aan voor de Easyleader-bot, een digitale coach die jouw 10-stappenprogramma versterkt. We kijken ernaar uit om samen te werken!" (Poppins Medium, 20px, wit).
  - Subtiele illustratie van de Reflectieve Chat (wit, donkerblauw, licht aqua) rechts, met een voorbeeldcasus. Op mobiel verschijnt deze onder de tekst.
  - Animatie: Titel en tekst verschijnen met fade-in (0,5 seconden); illustratie schuift omhoog.

- **POC-aanbod-sectie**:
  - Witte container met titel: "Ons gratis POC-aanbod voor Easyleadership" (Poppins Bold, 24px, donkerblauw).
  - Beschrijving: "We ontwikkelen een werkende versie van de Easyleader-bot, volledig gratis, gebaseerd op jouw scripts en visie. De bot biedt:
    - Reflectieve coaching in jouw stijl, met het ABC-model.
    - Praktische ondersteuning voor casussen zoals moeilijke gesprekken.
    - Een beveiligde omgeving, zonder opslag van gegevens.
    - Integratie met jouw programma, klaar om te testen met deelnemers." (Poppins Light, 16px, donkergrijs, met licht aqua bullets).
  - Enthousiasme: "We zijn gepassioneerd om jouw missie te ondersteunen en leidinggevenden te helpen groeien!" (Poppins Medium, 18px, donkerblauw).
  - Animatie: Tekst en bullets verschijnen met slide-in (0,3 seconden) bij scrollen.

- **Doorontwikkelingsdiensten-sectie**:
  - Licht aqua achtergrond (`rgb(145, 194, 207)`) met witte container en titel: "Onze diensten voor doorontwikkeling" (Poppins Bold, 24px, donkerblauw).
  - Lijst van jouw diensten:
    1. **Uitbreiding van de bot**: "Integratie met intakegegevens en de Care & Daring-test voor persoonlijke coaching." (icoon: puzzelstuk in donkerblauw).
    2. **Ledenomgeving**: "Een exclusieve omgeving binnen jouw website, met toegang tot de bot." (icoon: slot in licht aqua).
    3. **Demo-modus**: "Beperkte toegang (3 vragen) voor potentiële klanten om de bot te proberen." (icoon: ster in groenblauw).
    4. **Optimalisatie en onderhoud**: "Continue verbetering van scripts, toon, en prestaties, met snelle reactietijden." (icoon: tandwiel in donkerblauw).
  - Toelichting: "Na een succesvolle POC bespreken we de kosten en planning voor deze uitbreidingen, volledig afgestemd op jouw behoeften." (Poppins Light, 16px, donkergrijs).
  - Animatie: Dienstkaarten verschijnen met fade-in (0,4 seconden) bij scrollen.

- **CTA-sectie**:
  - Witte container met titel: "Laten we samen starten, Yvette!" (Poppins Bold, 24px, donkerblauw).
  - Tekst: "We nodigen je uit om de POC te testen en samen te evalueren hoe de bot jouw programma versterkt. Neem contact op om de samenwerking te bevestigen!" (Poppins Medium, 18px, donkergrijs).
  - Oranje knop: "Plan een gesprek" (Poppins Medium, 18px, border-radius: 12px), linkt naar een contactformulier of agenda-tool (bijv. Calendly). Hover-effect: schaduw en donkerder oranje.
  - Animatie: Tekst en knop zoomen subtiel in (0,4 seconden).

- **Footer**:
  - Donkerblauwe strook (`rgb(0, 61, 75)`) met witte tekst (Poppins Light, 14px): "© 2025 [Jouw Bedrijfsnaam]. Gemaakt voor Easyleadership."
  - Links naar "Privacybeleid" en "Contact" (wit, onderstreept bij hover).
  - Jouw logo (indien beschikbaar) in licht aqua (`rgb(145, 194, 207)`).

- **Toegankelijkheid**:
  - WCAG AA-contrast, licht aqua focusstates (`rgb(145, 194, 207)`), toetsenbordnavigatie.
  - Aria-labels voor iconen en knoppen; tekstalternatieven voor illustratie.

### Interactie-ontwerp

- **Intro-sectie**: Persoonlijke toon spreekt Yvette direct aan; illustratie toont de bot in actie.
- **POC-aanbod-sectie**: Klikbare bullets (hover: licht aqua gloed) tonen tooltips, bijv.: "De bot volgt jouw scripts voor een authentieke ervaring."
- **Doorontwikkelingsdiensten-sectie**: Icoon-hover-effecten (lichte puls) maken de sectie interactief.
- **CTA-sectie**: "Plan een gesprek" knop pulseert licht bij hover. Contactformulier (wit, oranje knop) verschijnt in een pop-up of nieuwe pagina.
- **Responsiveness**: Mobile-first; secties stapelen verticaal op mobiel (<768px), met kleinere tekst (hoofdtitel: 24px, body: 14px) en tapvriendelijke knoppen (min. 44x44px).

### Gebruikerservaring (UX)

- **Eerste indruk**: Persoonlijke aanspreking ("Beste Yvette") en enthousiaste toon maken de pagina warm en op maat.
- **Navigatie**: Duidelijke structuur: intro motiveert, POC-aanbod overtuigt, diensten schetsen de toekomst, CTA sluit af met actie.
- **Toon**: Warm, professioneel, en samenwerkingsgericht, zoals "We kijken ernaar uit om jouw visie tot leven te brengen!"
- **Helderheid**: Minimalistische lay-out en consistente kleuren zorgen voor focus op het aanbod.

### Aansluiting bij Reflectieve Chat, Landingspagina, en Intakeverslag

- **Visueel**: Zelfde kleuren, Poppins-font, en afgeronde elementen als de Reflectieve Chat en landingspagina.
- **Tonale**: Spiegelt de bot's empathische toon, met een persoonlijke, motiverende stijl gericht op Yvette.
- **Functioneel**: Benadrukt de gratis POC (reflectieve coaching, ABC-model, privacyveilig) en toekomstige integraties (Care & Daring-test, ledenomgeving, demo-modus), zoals besproken in het intakeverslag.

---

## Aanbevelingen voor Implementatie (Beide Pagina's)

- **Prioriteit MVP**: De landingspagina is de toegangspoort voor gebruikers; de aanbodpagina is cruciaal om Yvette te overtuigen en de samenwerking te starten.
- **Technische aanpak**:
  - Gebruik SvelteKit voor snelle, reactieve pagina's op Vercel.
  - Gebruik Tailwind CSS met styleguide-kleuren (`--primary-blue: rgb(0, 61, 75)`).
  - Authenticatie (Clerk/Auth0) voor de landingspagina's inlogfunctionaliteit.
  - Optimaliseer laadtijd (<1 seconde) met Vercel's Edge Network.
- **Testen**:
  - Valideer laadtijd, responsiveness (<768px), en toegankelijkheid (WCAG AA).
  - Test de warme toon en CTA-effectiviteit met Yvette en leidinggevenden.
  - Controleer casusherkenning en ABC-vragen in de bot (voor de POC).
- **Toekomstvisie**: Na de POC, voeg nice-to-haves toe zoals een demo-modus (3 vragen), Care & Daring-test integratie, of een video op de landingspagina.

---

## Inspiratiebronnen

- **UX**: Landingspagina's zoals Notion (schone lay-out, duidelijke CTA's) en BetterUp (coachende toon); salespages zoals ConvertKit (persoonlijk, aanbodgericht).
- **Visueel**: Easyleadership-kleuren en Poppins-font, geïnspireerd door Linear en Vercel's minimalisme.
- **Functioneel**: Snelle, motiverende pagina's zoals Slack's homepage en op maat gemaakte offertes zoals die van SaaS-platforms.