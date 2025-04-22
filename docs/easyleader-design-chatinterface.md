# 🎨 Reflectieve Chat: Schermvullend en Coachend – Easyleader-bot

**Concept**: Een minimalistische, schermvullende chatinterface die leidinggevenden verwelkomt met een warm, empathisch bericht en casussuggesties, en hen door een coachende, reflectieve flow leidt volgens het ABC-model. De interface voelt persoonlijk en professioneel, zoals een digitale coach in de stijl van Yvette, en moedigt zelfreflectie en actie aan met een toegankelijke, visueel aantrekkelijke opmaak.

---

## Visueel Ontwerp

- **Algemene lay-out**:
  - De interface vult het volledige scherm, met een centrale witte chatcontainer (achtergrond: `rgb(255, 255, 255)`, border-radius: 12px, lichte schaduw) van maximaal 600px breed op desktop, volledig breed op mobiel (<768px). De achtergrond is lichtblauwgrijs (`rgb(191, 207, 210)`) voor een rustige, professionele uitstraling.
  - Bovenaan de chatcontainer een smalle, donkerblauwe header (`rgb(0, 61, 75)`) met de tekst “Easyleader-bot” in Poppins Bold (20px, wit), voor herkenbaarheid.
  - De container heeft een schone look met veel witruimte (16-32px padding) om afleiding te minimaliseren en reflectie te bevorderen.

- **Chatberichten**:
  - **Botberichten**: In donkerblauwe speech bubbles (`rgb(0, 61, 75)`, border-radius: 12px) aan de linkerkant, met witte tekst (Poppins Medium, 18px). Een subtiele typanimatie (fade-in over 0,3 seconden) maakt de bot menselijker.
  - **Gebruikersberichten**: In witte speech bubbles met een licht aqua rand (`rgb(145, 194, 207)`) aan de rechterkant (Poppins Medium, 16px, donkergrijs: `rgb(64, 110, 120)`).
  - Berichten zijn gescheiden met 8px verticale ruimte; de container scrollt soepel bij langere gesprekken.

- **Invoerveld**:
  - Onderaan een groot invoerveld (wit, border-radius: 12px, 16px padding) met een licht aqua focusstate (`rgb(145, 194, 207)`). Minimaal 44px hoog voor tapvriendelijkheid op mobiel.
  - Rechts een oranje verzendknop (`rgb(255, 179, 71)`, border-radius: 12px) met een witte pijl of “Verzend”-tekst, die bij hover donkerder wordt (`rgb(255, 159, 51)`).

- **Casussuggesties en follow-up prompts**:
  - Bovenaan, na het welkomstbericht, drie oranje knoppen (`rgb(255, 179, 71)`, border-radius: 12px, Poppins Medium, 16px) met casussen: “Moeilijk gesprek”, “Team motiveren”, “Conflict oplossen”. Knoppen hebben een lichte schaduw en worden donkerder bij hover.
  - Follow-up prompts verschijnen als 2-3 oranje knoppen onder het invoerveld na elk antwoord, zoals “Deel je gedachten”, “Vraag een tip”, “Vertel meer”. Tapvriendelijk (min. 44x44px) met een subtiele gloed bij hover.

- **Welkomstscherm**:
  - Bij inloggen een donkerblauwe banner (`rgb(0, 61, 75)`, border-radius: 12px): “Hoi [Naam], fijn dat je er bent! Wat wil je vandaag bespreken?” (Poppins Bold, 20px, wit).
  - Daaronder casusknoppen en een intro: “Kies een situatie of typ je verhaal hieronder” (Poppins Medium, 16px, donkergrijs).

- **Animaties**:
  - Berichten verschijnen met een zachte fade-in (0,3 seconden).
  - Oranje knoppen krijgen een lichte schaduw en donkerder tint bij hover, met een subtiele schaalvergroting (1.05x).
  - Invoerveld licht op met een licht aqua gloed bij focus.

- **Toegankelijkheid**:
  - WCAG AA-contrast: donkerblauw op wit (>4.5:1), oranje op wit (>3:1).
  - Licht aqua outline (`rgb(145, 194, 207)`) voor focusstates op invoerveld en knoppen.
  - Toetsenbordnavigatie: Tab door knoppen en invoerveld, Enter om te verzenden/kiezen.
  - Labels en aria-attributen voor schermlezers.

---

## Interactie-ontwerp

- **Welkomst en start**:
  - Na inloggen (via een beveiligd scherm met oranje “Inloggen”-knop) verschijnt het welkomstbericht: “Hoi [Naam], fijn dat je er bent! Wat wil je vandaag bespreken?” met drie casusknoppen: “Moeilijk gesprek”, “Team motiveren”, “Conflict oplossen”.
  - Placeholder in het invoerveld: “Beschrijf je situatie of vraag…”

- **Gespreksflow (ABC-model)**:
  - **Casusselectie**: Bij keuze voor “Moeilijk gesprek” vraagt de bot: “Oké, je hebt gekozen voor een moeilijk gesprek. Wat gebeurde er precies?” (Activating event).
  - **Vrije invoer**: Bij tekst zoals “Mijn medewerker was defensief tijdens feedback” herkent de bot de situatie en vraagt: “Wat gebeurde er precies in dat gesprek?”
  - **Reflectieve vragen**:
    - **Activating event**: “Kun je beschrijven wat er gebeurde?”
    - **Belief**: “Wat dacht je toen dit gebeurde? Bijvoorbeeld, wat zei dit over jouw aanpak?”
    - **Consequence**: “Wat was het gevolg voor jou of je team?”
  - **Follow-up prompts**: 2-3 oranje knoppen na elk antwoord, zoals “Deel je gedachten”, “Vraag een praktische tip”, “Vertel meer”. Deze sturen het gesprek zonder dwingend te zijn.
  - **Empathische bevestiging**: Bijv. “Dat klinkt echt uitdagend, [Naam].” of “Ik snap dat dit frustrerend kan zijn.”

- **Actiegerichte afronding**:
  - Na een ABC-cyclus: “Op basis van wat je deelt, kun je proberen een open gesprek te starten. Wil je een voorbeeld van een goede vraag?” met knop “Toon voorbeeld” (bijv. “Vraag: ‘Wat heb jij nodig om verder te komen?’”).
  - Optie om door te gaan: “Wil je nog een situatie bespreken?” met nieuwe casusknoppen.

- **Privacy en geen opslag**:
  - Notificatie bij start (groenblauw, `rgb(0, 204, 156)`): “Je gesprekken worden niet opgeslagen, je privacy is veilig.”
  - Sessie reset na afsluiten, zonder databehoud.

- **Responsiveness**:
  - Mobile-first: op mobiel (<768px) schaalt de chatcontainer naar volledige breedte, met kleinere tekst (14px) en grotere knoppen (min. 44x44px).
  - Padding (16-32px) en casusknoppen stapelen verticaal op mobiel.

---

## Gebruikerservaring (UX)

- **Eerste indruk**: De warme toon (“Hoi [Naam], fijn dat je er bent!”) en duidelijke casusknoppen maken de interface uitnodigend en laagdrempelig, als een coachsessie.
- **Flow en gebruiksgemak**: Casussuggesties en vrije invoer bieden flexibiliteit; follow-up prompts helpen bij vastlopen, en ABC-vragen geven structuur.
- **Coachende toon**: Voelt als een digitale Yvette, met empathische bevestigingen (“Dat klinkt lastig, [Naam]”) en motiverende suggesties (“Mooi dat je dit deelt!”).
- **Visuele helderheid**: Schone lay-out, consistente kleuren (donkerblauw, licht aqua, oranje), en Poppins-font zorgen voor een rustige, professionele ervaring.
- **Feedback bij fouten**: Bij ongeldige invoer: “Oeps, kun je wat meer details delen?” (rood, `rgb(237, 28, 36)`).

---

## Aansluiting bij Functionele Eisen

- **24/7 toegang**: Altijd beschikbaar via Vercel, reactietijd <2 seconden.
- **Beveiligde login**: Inlogscherm (wit, oranje knoppen) beperkt toegang tot geregistreerde gebruikers.
- **Easyleadership-scripts en toon**: Antwoorden volgen Yvette’s warme, reflectieve stijl, gebaseerd op scripts.
- **ABC-model**: Gespreksflow structureert vragen rond Activating event, Belief, Consequence.
- **Geen datastorage**: Geen opslag van gesprekken; privacy-notificatie bevestigt dit.
- **Welkomstbericht**: Persoonlijk, warm bericht bij eerste bezoek.
- **Open vragen en casusherkenning**: Vrije invoer wordt verwerkt, casussen worden herkend.
- **Reactietijd**: Antwoorden binnen 2 seconden, met typanimatie.

---

## Aansluiting bij UX/UI Styleguide

- **Kleuren**: Donkerblauw (`rgb(0, 61, 75)`) voor botberichten/headers, licht aqua (`rgb(145, 194, 207)`) voor focusstates/randen, oranje (`rgb(255, 179, 71)`) voor knoppen, wit (`rgb(255, 255, 255)`) voor de container.
- **Typografie**: Poppins (Bold 18px voor bot, Medium 16px voor gebruiker, 14px voor secundaire tekst).
- **Componenten**: Afgeronde knoppen en speech bubbles (border-radius: 12px), zachte schaduwen, tapvriendelijke invoervelden.
- **Responsiveness**: Mobile-first, schalende typografie, verticale knoppen op mobiel.
- **Toegankelijkheid**: WCAG AA-contrast, duidelijke focusstates, toetsenbordnavigatie.
- **Tone of voice**: Warm, empathisch, reflectief (bijv. “Hoi [Naam], wat speelt er?”).

---

## Voorbeeldinteractie

1. **Inloggen**: Gebruiker ziet een inlogscherm met oranje “Inloggen”-knop.
2. **Welkomstscherm**: “Hoi Lisa, fijn dat je er bent! Wat wil je vandaag bespreken?” met knoppen: “Moeilijk gesprek”, “Team motiveren”, “Conflict oplossen”.
3. **Keuze of invoer**:
   - Kiest “Moeilijk gesprek”: Bot vraagt: “Oké, je hebt gekozen voor een moeilijk gesprek. Wat gebeurde er precies?”
   - Typt: “Mijn medewerker was defensief tijdens feedback.” Bot: “Wat gebeurde er precies in dat gesprek?”
4. **ABC-flow**:
   - Gebruiker: “Hij negeerde mijn feedback en werd boos.”
   - Bot: “Dat klinkt echt uitdagend, Lisa. Wat dacht je toen hij zo reageerde?” [Knoppen: “Ik was gefrustreerd”, “Ik voelde me onzeker”, “Andere gedachte”]
   - Gebruiker: “Ik was gefrustreerd.”
   - Bot: “Begrijpelijk. Wat was het gevolg van die frustratie voor het gesprek?” [Knoppen: “Ik werd kortaf”, “Ik stopte het gesprek”, “Andere impact”]
5. **Afronding**: “Mooi dat je dit hebt gedeeld, Lisa. Wil je een actie proberen, zoals een open vraag stellen?” [Knop: “Toon voorbeeld”]
6. **Nieuwe cyclus**: “Wil je nog een situatie bespreken?” [Knoppen: nieuwe casussen].

---

## Aanbevelingen voor Implementatie

- **Prioriteit MVP**: Dit ontwerp is ideaal voor de MVP door de eenvoud en directe aansluiting bij alle must-haves, met een Grok-achtige ervaring.
- **Technische aanpak**:
  - Gebruik SvelteKit voor een snelle, reactieve app op Vercel.
  - Integreer GPT-4 via xAI’s API met prompts voor Easyleadership-toon en ABC-model.
  - Gebruik Tailwind CSS voor styling, met styleguide-kleuren.
  - Implementeer authenticatie met Clerk of Auth0.
  - Zorg voor in-memory sessies om geen data op te slaan.
- **Testen**:
  - Controleer reactietijd (<2 seconden) en casusherkenning met 10 testcasussen.
  - Valideer warme toon en ABC-vragen met leidinggevenden.
  - Test responsiveness (<768px) en toegankelijkheid (WCAG AA).
- **Toekomstvisie**: Voeg nice-to-haves toe zoals een visuele avatar, stijlkeuzes (coachend, direct), of testmodus (3 vragen gratis) voor v2.

---

## Inspiratiebronnen

- **UX**: ChatGPT’s schone, centrale interface; Notion AI’s reflectieve prompts.
- **Visueel**: Easyleadership-kleuren en Poppins-font, geïnspireerd door Linear.
- **Functioneel**: Snelle, coachende interacties zoals Grok, gericht op reflectie en actie.