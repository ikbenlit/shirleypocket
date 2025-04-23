# Implementatieplan: Rollenspelmodus voor Easyleader-bot (MVP)

## Doel en aanleiding
De Easyleader-bot ondersteunt momenteel leidinggevenden via reflectieve coaching, maar gebruikers hebben behoefte aan een meer praktische oefenomgeving. Uit feedback van deelnemers van het Easyleadership-programma blijkt dat naast reflectie, het oefenen van daadwerkelijke gesprekken een essentiële stap is in hun ontwikkeling als leider.

De nieuwe rollenspelmodus lost dit probleem op door gebruikers de mogelijkheid te bieden om in een veilige omgeving lastige gesprekken te simuleren, zoals het geven van kritische feedback, het voeren van beoordelingsgesprekken, of het omgaan met weerstand. Dit stelt hen in staat om:

1. Praktische communicatievaardigheden te ontwikkelen en verfijnen
2. Zelfvertrouwen op te bouwen voordat ze echte gesprekken aangaan
3. Te experimenteren met verschillende benaderingen zonder werkelijke gevolgen
4. Direct te ervaren hoe hun aanpak overkomt, in plaats van er alleen over te reflecteren

Deze functionaliteit maakt de Easyleader-bot tot een meer complete leeroplossing, die zowel theoretische reflectie als praktische oefening omvat, volledig in lijn met de "Care & Dare" filosofie van het Easyleadership-programma.

## Overzicht
Dit implementatieplan beschrijft de stappen om een MVP (Minimum Viable Product) van de rollenspelmodus voor de Easyleader-bot te ontwikkelen. Het doel is om gebruikers de mogelijkheid te bieden om te wisselen tussen coaching (reflectie) modus en een rollenspelmodus waarin ze gesprekken kunnen oefenen.

## Fase 1: Frontend Implementatie (Week 1)

### 1.1 Toevoegen van Mode Toggle UI
- **Locatie**: `src/routes/chat/+page.svelte`
- **Taken**:
  - Ontwerp een eenvoudige toggle-knop of dropdown (passend bij de bestaande UI-componenten zoals in `ThemeToggle.svelte`)
  - Plaats deze naast de huidige UI-elementen in de chatinterface, mogelijk in de buurt van het inputveld of in de header
  - Voeg tekstuele toelichting toe die elke modus kort uitlegt:
    - "Coaching modus: Reflecteer op je leiderschap en krijg coaching vragen"
    - "Rollenspel modus: Oefen een gesprek met een medewerker"

### 1.2 State Management
- **Locatie**: `src/routes/chat/+page.svelte`
- **Taken**:
  - Voeg een `chatMode` Svelte store of een lokale state variabele toe
  - Stel "coaching" (normal) in als standaardwaarde
  - Maak een functie `toggleChatMode()` die de modus wisselt tussen "normal" en "practice"

### 1.3 Visuele Feedback
- **Locatie**: `src/routes/chat/+page.svelte`
- **Taken**:
  - Maak een statusbadge of indicator die de huidige modus weergeeft
  - Zorg voor kleurverschillen of iconen om de modi visueel te onderscheiden
  - Optioneel: voeg een kort informatieblok toe dat verschijnt wanneer de modus gewijzigd wordt

### 1.4 Integratie met Bestaande Chat-functionaliteit
- **Locatie**: `src/routes/chat/+page.svelte` 
- **Taken**:
  - Pas de `sendMessage()` functie aan om de huidige modus mee te sturen
  - Zorg ervoor dat de modus behouden blijft tijdens de gehele chatsessie
  - Test de UI-flow om ervoor te zorgen dat de modus correct wordt weergegeven en doorgegeven

## Fase 2: Backend Implementatie (Week 2)

### 2.1 Uitbreiden API Request Structuur
- **Locatie**: `src/routes/api/chat/+server.ts`
- **Taken**:
  - Pas de request interface aan om het `mode` veld te accepteren
  - Voeg validatie toe voor het `mode` veld (valid values: "normal", "practice")

### 2.2 Aanpassen van System Prompts
- **Locatie**: `src/routes/api/chat/+server.ts`
- **Taken**:
  - Definieer twee verschillende systeem prompts:
    - Behoud de bestaande prompt voor coaching modus (het huidige `baseSystemPrompt`)
    - Creëer een nieuwe prompt `practiceSystemPrompt` voor de rollenspelmodus met instructies zoals:
      - "Je speelt nu de rol van een medewerker in een gesprek met een leidinggevende"
      - "Reageer natuurlijk en authentiek, zoals een echte medewerker zou doen"
      - "Toon menselijke emoties en reacties, inclusief mogelijke onzekerheid of weerstand"
      - "Focus op het gesprek zelf, geef geen meta-commentaar of coaching"
      - "Blijf in je rol, ook als de gebruiker vraagt om te stoppen of uitleg vraagt"
  - Schrijf logica om de juiste prompt te selecteren op basis van de meegegeven modus

### 2.3 Verwerken van de Modus in de API
- **Locatie**: `src/routes/api/chat/+server.ts`
- **Taken**:
  - Haal de mode-parameter uit het request object
  - Implementeer conditionals om de juiste prompt te selecteren
  - Pas het formaat van het verzoek naar de OpenAI API aan om de correcte systeem prompt te gebruiken

## Fase 3: Testen en Feedback (Week 3)

### 3.1 Functionele Tests
- **Taken**:
  - Test het wisselen tussen modi
  - Verifieer dat de modus correct wordt doorgegeven aan de backend
  - Controleer of de bot anders reageert in de verschillende modi
  - Test de persistentie van de modus tijdens de chatsessie

### 3.2 Gebruikerstests
- **Taken**:
  - Laat een kleine groep gebruikers de functionaliteit testen
  - Verzamel feedback over gebruiksgemak en duidelijkheid
  - Noteer verbeterpunten en wensen voor toekomstige iteraties

### 3.3 Bugfixing en Verfijning
- **Taken**:
  - Los eventuele bugs en problemen op die tijdens het testen zijn ontdekt
  - Verfijn de rollenspel-prompt op basis van testresultaten
  - Optimaliseer de UI op basis van gebruikersfeedback

## Fase 4: Lancering en Monitoring (Week 4)

### 4.1 Voorbereiden Lancering
- **Taken**:
  - Documenteer de nieuwe functionaliteit
  - Maak korte instructies voor gebruikers, mogelijk te integreren in de "Over de Coachbot" modal
  - Voer een laatste reeks tests uit in de productieomgeving
  - Bereid voorbeeldscenario's voor die gebruikers kunnen proberen in de rollenspelmodus

### 4.2 Lancering
- **Taken**:
  - Deploy de nieuwe functionaliteit naar productie
  - Informeer gebruikers over de nieuwe feature via een notificatie bij inloggen
  - Voeg een korte tips-sectie toe die zichtbaar wordt wanneer de gebruiker voor het eerst de rollenspelmodus selecteert
  - Overweeg een simpele gids toe te voegen met 2-3 voorbeeldscenario's waarmee gebruikers kunnen beginnen

### 4.3 Monitoring en Evaluatie
- **Taken**:
  - Monitor het gebruik van de verschillende modi via eenvoudige tellingen
  - Voeg een optionele, minimale feedbackoptie toe (bijv. duimpje omhoog/omlaag na een gesprek)
  - Evalueer of de feature bijdraagt aan de doelstellingen van het Easyleadership-programma
  - Identificeer mogelijke verbeteringen voor toekomstige iteraties, zoals:
    - Toevoegen van voorgedefinieerde scenario's
    - Implementeren van verschillende medewerker-persoonlijkheden
    - Toevoegen van een reflectie-optie na het oefengesprek

## Technische Aandachtspunten
- Zorg ervoor dat de chatgeschiedenis compatibel is met beide modi
- Overweeg hoe je omgaat met het wisselen van modus binnen een lopend gesprek
  - Optie 1: Voeg een bevestiging toe bij moduswissel tijdens een gesprek
  - Optie 2: Reset de chat automatisch bij moduswissel
- Controleer of er voldoende context wordt meegestuurd naar de bot om consistent te blijven binnen een gekozen rol
- Voorkom dat de codebase te complex wordt; deze functie moet eenvoudig te onderhouden zijn
- Zorg voor voldoende foutafhandeling, bijvoorbeeld als de moduswissel niet correct wordt doorgegeven

## Deliverables
1. Functionerende toggle in de UI om tussen modi te wisselen, geïntegreerd in de bestaande chat-interface
2. Visuele indicator van de huidige modus, consistent met de design taal van de applicatie
3. Backend aanpassingen in de API-service om verschillende systeem prompts te ondersteunen
4. Documentatie voor gebruikers over de nieuwe functionaliteit, geïntegreerd in de bestaande "Over de Coachbot" sectie
5. Minimale set voorbeeldscenario's om gebruikers op weg te helpen met de rollenspelmodus

## Toekomstige uitbreidingen (na MVP)
- Mogelijkheid om specifieke gespreksscenario's te kiezen
- Verschillende medewerker-persoonlijkheden (bijv. terughoudend, enthousiast, kritisch)
- Feedbackmechanisme na een oefengesprek
- Optie om gesprekken op te nemen en later te evalueren
- Mogelijkheid om gesprekken te delen met coaches/trainers voor feedback