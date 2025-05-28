# Functionele Eisen - "Shirley in je pocket"-chatbot

## 🎯 Must-haves

### Core Functionaliteit
- [x] Chatbot werkt 24/7 binnen Online Academy (afvallenindeovergang.nl)
- [x] Alleen bestaande klanten/deelnemers met academy-login hebben toegang
- [x] Antwoorden uitsluitend gebaseerd op Shirley's programma-inhoud (geen algemene internet-info)
- [x] Tone of voice: direct, motiverend, "hupakee" stijl zonder gedoe
- [x] Reactietijd onder 2 seconden bij normale belasting

### Ondersteunde Onderwerpen
- [x] Voedingsvragen (eiwitten, macro's, praktische tips)
- [x] Mindset & motivatie ondersteuning
- [x] Doorverwijzing naar specifieke modules, video's en werkboeken
- [x] Link naar caloriecalculator wanneer relevant

### Gedragsregels Bot
- [x] **GEEN** standaard voedingsschema's genereren (past niet bij Shirley's visie)
- [x] **GEEN** algemene voedingsadviezen die afwijken van programma
- [x] **WEL** praktische suggesties (ei, kipfilet, peulvruchten etc.)
- [x] Verwijst naar caloriecalculator voor persoonlijke berekeningen
- [x] Zegt "dat vind je in Module X" of "kijk naar video Y" met directe links

### Privacy & Beveiliging
- [x] Geen opslag van persoonlijke chatdata (alleen session-basis)
- [x] Integratie binnen bestaande Academy-omgeving
- [x] AVG-compliant data handling

### Technische Specs
- [x] Responsive design (desktop, tablet, mobiel)
- [x] Werkt binnen bestaande Academy-infrastructuur
- [x] OpenAI API integratie voor slimme antwoorden
- [x] Vector database voor doorzoeken programma-content

## 💡 Nice-to-haves (v2+)

### Geavanceerde Functies
- [ ] Contextbewustzijn: onthouden eerdere gesprekken binnen sessie
- [ ] Persoonlijk profiel opbouw (activiteitenniveau, voorkeuren)
- [ ] "Stok achter de deur": periodieke check-ins en motivatie
- [ ] Slimme opvolging op basis van programmavoortgang
- [ ] Integratie met caloriecalculator-API voor realtime advies

### UX Verbeteringen
- [ ] Chatgeschiedenis voor gebruiker zichtbaar
- [ ] Voorgesuggereerde vragen/categorieën (zoals bij Yvette's bot)
- [ ] Mogelijkheid om favoriete antwoorden te bewaren
- [ ] Mobiele webapp/PWA ("Shirley in je broekzak")

### Analytics & Optimalisatie
- [ ] Dashboard voor Shirley met FAQ-insights
- [ ] Tracking welke vragen het meest gesteld worden
- [ ] A/B testing voor verschillende antwoordstijlen
- [ ] Gebruiksstatistieken per module/onderwerp

---

## 🎨 UX & UI Richtlijnen (Shirley's huisstijl)

### Visuele Identiteit
- [x] Gebruik Shirley's huisstijl kleuren en fonts
- [x] Consistent met Online Academy vormgeving
- [x] Afgeronde elementen en vriendelijke interface
- [x] Mobiel-first design approach

### Communicatiestijl Interface
- [x] Directe, no-nonsense taal in UI elementen
- [x] Motiverende welkomstboodschap
- [x] Duidelijke CTA's ("Stel je vraag", "Ga naar module" etc.)
- [x] Gebruik van Shirley's karakteristieke uitdrukkingen

### Interactiepatronen
- [x] Snelle, natuurlijke chatflow
- [x] Duidelijke indicatie wanneer bot "nadenkt"
- [x] Links naar Academy-content openen in nieuwe tab/window
- [x] Fallback-opties als bot vraag niet begrijpt

---

## 🧪 Testcriteria per Functionaliteit

### Basis Chatfunctionaliteit
- **Test**: Gebruiker stelt voedingsvraag → Bot geeft Shirley-conform antwoord binnen 2 sec
- **Test**: Bot verwijst correct naar specifieke module/video met werkende link
- **Test**: Bot weigert algemene voedingsschema's te maken

### Tone of Voice
- **Test**: 10 willekeurige vragen → alle antwoorden klinken als Shirley (direct, motiverend)
- **Test**: Bot gebruikt karakteristieke uitdrukkingen ("hupakee", "gewoon doen")

### Doorverwijzingen
- **Test**: Vraag over calorieën → verwijst naar caloriecalculator
- **Test**: Mindsetvraag → verwijst naar juiste werkboek/video
- **Test**: Alle gegenereerde links werken en leiden naar juiste content

### Privacy & Toegang
- **Test**: Niet-ingelogde gebruiker krijgt geen toegang
- **Test**: Chatdata wordt niet opgeslagen na sessie-einde
- **Test**: Bot vraagt nooit om persoonlijke gegevens