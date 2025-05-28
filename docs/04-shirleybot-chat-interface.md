# 🎨 "Shirley in je pocket" Chat: Schermvullend en Direct – ShirleyBot

**Concept**: Een minimalistische, schermvullende chatinterface die vrouwen in de overgang verwelkomt met een warme, directe bericht en voedingscoaching suggesties. De interface leidt hen door een praktische, motiverende flow volgens Shirley's no-nonsense aanpak. De interface voelt persoonlijk en energiek, zoals een digitale coach in de stijl van Shirley, en moedigt actie aan met een toegankelijke, visueel aantrekkelijke opmaak.

---

## Visueel Ontwerp

- **Algemene lay-out**:
  - De interface vult het volledige scherm, met een centrale witte chatcontainer (achtergrond: `#FFFFFF`, border-radius: 12px, lichte schaduw `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`) van maximaal 800px breed op desktop, volledig breed op mobiel (<768px). De achtergrond is lichtgrijs (`#F5F5F5`) voor een rustige, professionele uitstraling.
  - Bovenaan de chatcontainer een smalle, roze header (`#E91E63`) met de tekst "Shirley in je pocket" in Source Sans Pro Bold (20px, wit), plus een klein Shirley-logo voor herkenbaarheid.
  - De container heeft een schone look met veel witruimte (16-32px padding) om afleiding te minimaliseren en focus te bevorderen.

- **Chatberichten**:
  - **Botberichten**: In lichtgrijze speech bubbles (`#FEFEFE`, border-radius: 16px 16px 16px 4px, subtiele schaduw) aan de linkerkant, met zwarte tekst (Roboto Regular, 16px). Een subtiele typanimatie (fade-in over 0,3 seconden) maakt de bot menselijker.
  - **Gebruikersberichten**: In roze speech bubbles (`#E91E63`, border-radius: 16px 16px 4px 16px) aan de rechterkant met witte tekst (Roboto Regular, 16px).
  - Berichten zijn gescheiden met 12px verticale ruimte; de container scrollt soepel bij langere gesprekken.

- **Invoerveld**:
  - Onderaan een groot invoerveld (wit, border-radius: 8px, 16px padding, border: 1px solid `#E0E0E0`) met een roze focusstate (`#E91E63`, 2px border). Minimaal 48px hoog voor tapvriendelijkheid op mobiel.
  - Rechts een roze verzendknop (`#E91E63`, border-radius: 8px) met een witte pijl-icoon (Lucide `Send`), die bij hover donkerder wordt (`#C2185B`).

- **Coaching suggesties en quick actions**:
  - Bovenaan, na het welkomstbericht, drie lichtroze knoppen (`#F8BBD9`, border-radius: 16px, Roboto Medium, 14px, tekst: `#333333`) met suggesties: "Eiwitadvies", "Motivatie boost", "Programma vraag". Knoppen hebben een lichte schaduw en worden roze bij hover (`#E91E63`, tekst wit).
  - Quick action prompts verschijnen als 2-3 lichtroze knoppen onder het invoerveld na elk antwoord, zoals "Geef me tips", "Verwijs naar module", "Motiveer me". Tapvriendelijk (min. 44x44px) met een subtiele hover-effect.

- **Welkomstscherm**:
  - Bij inloggen een roze banner (`#E91E63`, border-radius: 12px): "Hupakee! Welkom terug, [Naam]! Waar kan ik je vandaag mee helpen?" (Source Sans Pro Bold, 18px, wit).
  - Daaronder coaching knoppen en een intro: "Kies een onderwerp of stel je vraag hieronder" (Roboto Regular, 16px, `#333333`).

- **Animaties**:
  - Berichten verschijnen met een zachte fade-in (0,3 seconden).
  - Lichtroze knoppen krijgen een roze achtergrond en witte tekst bij hover, met een subtiele schaalvergroting (1.02x).
  - Invoerveld licht op met een roze gloed bij focus.

- **Toegankelijkheid**:
  - WCAG AA-contrast: zwart op wit (>4.5:1), roze op wit (>3:1).
  - Roze outline (`#E91E63`) voor focusstates op invoerveld en knoppen.
  - Toetsenbordnavigatie: Tab door knoppen en invoerveld, Enter om te verzenden/kiezen.
  - Labels en aria-attributen voor schermlezers.

---

## Interactie-ontwerp

- **Welkomst en start**:
  - Na inloggen verschijnt het welkomstbericht: "Hupakee! Welkom terug, [Naam]! Waar kan ik je vandaag mee helpen?" met drie coaching knoppen: "Eiwitadvies", "Motivatie boost", "Programma vraag".
  - Placeholder in het invoerveld: "Stel je vraag over voeding of mindset..."

- **Gespreksflow (Shirley's aanpak)**:
  - **Coaching keuze**: Bij keuze voor "Eiwitadvies" vraagt de bot: "Top keuze! Vertel eens, waar loop je tegenaan met je eiwitten?"
  - **Vrije invoer**: Bij tekst zoals "Ik kom niet aan mijn eiwitten" herkent de bot de situatie en vraagt: "Oké, wat eet je nu meestal? Vertel me over je normale dag."
  - **Praktische vragen**:
    - **Situatie**: "Waar loop je precies tegenaan?"
    - **Huidige aanpak**: "Wat probeer je nu al?"
    - **Concrete oplossing**: "Hupakee, hier zijn 3 praktische tips voor jou..."
  - **Quick actions**: 2-3 lichtroze knoppen na elk antwoord, zoals "Geef me tips", "Verwijs naar module", "Nog een vraag". Deze sturen het gesprek zonder dwingend te zijn.
  - **Motiverende bevestiging**: Bijv. "Dat snap ik helemaal, [Naam]!" of "Niet piekeren, we gaan dit oplossen!"

- **Actiegerichte afronding**:
  - Na een coaching cyclus: "Op basis van wat je vertelt, zou ik dit proberen: [concrete tip]. Check ook Module 2 in je programma voor meer eiwitinspiratie!" met knop "Naar Module 2".
  - Optie om door te gaan: "Nog meer vragen? Stel ze gerust!" met nieuwe coaching knoppen.

- **Programma-integratie**:
  - Links naar specifieke modules: "Dat staat in Module 3, klik hier: [LINK]"
  - Verwijzing naar caloriecalculator: "Bereken je persoonlijke gegevens met de calculator: [LINK]"
  - Werkboek verwijzingen: "Pak je werkboek erbij bij Module 5, daar staat een goede oefening!"

- **Responsiveness**:
  - Mobile-first: op mobiel (<768px) schaalt de chatcontainer naar volledige breedte, met aangepaste tekst (14px) en grotere knoppen (min. 44x44px).
  - Padding (16-24px) en coaching knoppen stapelen verticaal op mobiel.

---

## Gebruikerservaring (UX)

- **Eerste indruk**: De energieke toon ("Hupakee! Welkom terug!") en duidelijke coaching knoppen maken de interface uitnodigend en motiverend, als een persoonlijke coaching sessie.
- **Flow en gebruiksgemak**: Coaching suggesties en vrije invoer bieden flexibiliteit; quick actions helpen bij vastlopen, en praktische vragen geven structuur.
- **Shirley's directe toon**: Voelt als een digitale Shirley, met motiverende bevestigingen ("Dat snap ik helemaal!") en no-nonsense oplossingen ("Hupakee, hier zijn 3 tips...").
- **Visuele helderheid**: Schone lay-out, consistente kleuren (roze, lichtgrijs, wit), en Source Sans Pro + Roboto zorgen voor een energieke, professionele ervaring.
- **Feedback bij fouten**: Bij ongeldige invoer: "Hmm, kun je wat meer details geven? Ik help je graag verder!" (vriendelijk, `#337AB7`).

---

## Aansluiting bij ShirleyBot Styleguide

- **Kleuren**: Roze (`#E91E63`) voor buttons/accenten, lichtroze (`#F8BBD9`) voor coaching knoppen, lichtgrijs (`#F5F5F5`) voor achtergrond, wit (`#FFFFFF`) voor de container.
- **Typografie**: Source Sans Pro (Bold 18px voor headers, Semibold 16px voor knoppen), Roboto (Regular 16px voor berichten, 14px voor secundaire tekst).
- **Componenten**: Afgeronde knoppen en speech bubbles (border-radius: 16px voor bubbles, 8px voor knoppen), zachte schaduwen, tapvriendelijke invoervelden.
- **Responsiveness**: Mobile-first, schalende typografie, verticale knoppen op mobiel.
- **Toegankelijkheid**: WCAG AA-contrast, duidelijke focusstates, toetsenbordnavigatie.
- **Tone of voice**: Direct, energiek, motiverend (bijv. "Hupakee! Wat kan ik voor je doen?").

---

## Voorbeeldinteractie

1. **Welkomstscherm**: "Hupakee! Welkom terug, Linda! Waar kan ik je vandaag mee helpen?" met knoppen: "Eiwitadvies", "Motivatie boost", "Programma vraag".

2. **Keuze of invoer**:
   - Kiest "Eiwitadvies": Bot vraagt: "Top keuze! Vertel eens, waar loop je tegenaan met je eiwitten?"
   - Typt: "Ik kom niet aan mijn eiwitten." Bot: "Oké, wat eet je nu meestal? Vertel me over je normale dag."

3. **Coaching flow**:
   - Gebruiker: "Vooral brood en pasta, weinig vlees."
   - Bot: "Dat snap ik helemaal, Linda! Eiwitten hoeven niet ingewikkeld. Probeer dit: een ei bij je ontbijt, wat kipfilet bij de lunch, of peulvruchten bij het avondeten. Simpel en effectief!" [Knoppen: "Geef me tips", "Verwijs naar module", "Motiveer me"]
   - Gebruiker klikt: "Verwijs naar module"
   - Bot: "Check Module 2 in je programma - daar vind je mijn complete eiwitgids met nog meer inspiratie: [LINK naar Module 2]. Hup, aan de slag!"

4. **Afronding**: "Mooi dat je dit aanpakt, Linda! Niet piekeren, gewoon doen. Nog meer vragen?" [Knoppen: nieuwe coaching categorieën]

---

## MVP vs Nice-to-Haves

### ✅ **MVP - Must-Haves**
- Schermvullende chatinterface met Shirley's branding
- Basis welkomstbericht met personalisatie
- Vrije tekstinvoer met onderwerp-herkenning
- Chat bubbles met juiste styling en animaties
- Invoerveld met verzendknop
- Doorverwijzingen naar programma-onderdelen
- Responsive design (desktop + mobiel)
- Basic error handling

### 🚀 **Nice-to-Haves**
- Coaching categorieën als knoppen ("Eiwitadvies", "Motivatie boost", "Programma vraag")
- Quick action buttons na elk antwoord
- Geavanceerde animaties en hover-effecten
- Context-aware responses binnen sessie
- Typing indicator en betere loading states
- Voice input/output mogelijkheden