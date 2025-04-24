# Aanpak voor Mobiele Optimalisatie Easyleader Chatbot

## Aanleiding en Probleemstelling

De huidige Easyleader chatbot interface werkt niet optimaal op mobiele apparaten. De belangrijkste problemen zijn:

1. **Verkeerde weergave op mobiele apparaten**: De chat-interface wordt niet correct weergegeven op kleinere schermen.
2. **Opdringerige header/menu**: De huidige implementatie toont een volledige header/hamburgermenu aan de bovenkant op kleine schermen, wat ruimte wegneemt van de chat-interface.
3. **Inefficiënte sidebar-implementatie**: De huidige sidebar neemt het hele scherm over op mobiel in plaats van als overlay te functioneren zoals bij ChatGPT.
4. **Gebrekkige responsiveness**: De huidige CSS voor viewport en body-styling veroorzaakt scroll- en weergaveproblemen.

Het doel is om een meer ChatGPT-achtige ervaring te creëren, waarbij:
- De chat-interface het primaire focuspunt is
- De navigatie subtiel aanwezig is via een klein hamburger-icoon
- De sidebar als overlay verschijnt zonder de chat volledig te verbergen
- De interface natuurlijk aanvoelt op touch-devices van verschillende formaten

## Oplossingsaanpak

We zullen de interface aanpassen door middel van een stapsgewijze refactoring, waarbij we focussen op:

1. **Herstructurering van de basisopzet**
2. **Implementatie van een overlay sidebar**
3. **Optimalisatie van de chatcontainer**
4. **Verbetering van touch en scrollgedrag**

### Stap 1: Herstructurering van de Sidebar

De sidebar moet veranderen van een volledige schermvervanging naar een subtiele overlay op mobiel. Het moet minimaal blijven en alleen verschijnen wanneer nodig.

### Stap 2: Opnieuw Opzetten van de Basisstructuur

De layout moet prioriteit geven aan de chatinterface, vooral op kleine schermen, terwijl navigatie-elementen als overlay worden toegevoegd.

### Stap 3: Aanpassen van de Viewport en Scrollgedrag

Het huidige gefixeerde scrollgedrag moet worden vervangen door een natuurlijker aanpak die beter werkt op mobiel.

### Stap 4: Implementeren van Touch Optimalisaties

Verbeteren van de aanraakervaring door grotere touch targets en duidelijke visuele feedback.

## Aan te passen bestanden

1. **`src/routes/chat/+page.svelte`**
   - **Doel**: Herstructureren van de basisopzet van de chat pagina
   - **Aanpassingen**:
     - Verwijderen van de vaste height berekeningen
     - Implementeren van een mobiel-vriendelijke layout
     - Verplaatsen van sidebar trigger naar een vaste positie
     - Optimaliseren van de chatcontainer voor volledige schermgebruik

2. **`src/lib/components/ui/sidebar.svelte`**
   - **Doel**: Transformeren van de sidebar naar een overlay model op mobiel
   - **Aanpassingen**:
     - Scheiden van de desktop en mobiele implementaties
     - Creëren van een semi-transparante achtergrond op mobiel
     - Implementeren van slide-in animatie
     - Toevoegen van click-outside sluiten

3. **Global CSS (in relevante bestanden)**
   - **Doel**: Oplossen van viewport en scrollproblemen
   - **Aanpassingen**:
     - Verwijderen van de problematische fixed positioning
     - Implementeren van flexibele, responsieve layouts
     - Toevoegen van betere media queries

4. **`src/lib/components/ui/mobile-menu-trigger.svelte`** (nieuw)
   - **Doel**: Creëren van een minimaal, niet-opdringerig hamburgermenu
   - **Inhoud**:
     - Klein icoon dat gefixeerd is in de hoek
     - Toggle functionaliteit voor de sidebar
     - Consistente styling met de rest van de interface

## Implementatieplan

### Fase 1: Basis Herstructurering [x]
- Verwijder de problematische viewport styling [x]
- Implementeer het hamburger-icoon [x]
- Herstructureer de basisopzet van de chatpagina [x]

### Fase 2: Sidebar Transformatie [x]
- Converteer de sidebar naar overlay model [x]
- Implementeer de slide-in animatie [x]
- Zorg voor correcte z-index en interactie [x]

### Fase 3: Chat-optimalisatie [x]
- Pas de chatcontainer aan voor volledige breedte op mobiel [x]
- Optimaliseer scroll- en inputgedrag [x]
- Zorg voor correcte afhandeling van toetsenbord verschijnen/verdwijnen [x]

### Fase 4: Testen en Verfijning [x]
- Test op verschillende apparaten en schermformaten [x]
- Controleer voor edge cases (toetsenbord, rotatie, etc.) [x]
- Verfijn en optimaliseer waar nodig [x]

## Verwachte resultaat

Na deze aanpassingen zal de Easyleader chatbot een mobiele ervaring bieden die:

1. Meer ruimte biedt voor de chatinterface
2. Een subtiele, niet-invasieve navigatie heeft
3. Natuurlijk scrollt en reageert op verschillende schermformaten
4. Een intuïtieve touch-ervaring biedt, vergelijkbaar met ChatGPT

Deze verbeteringen zullen resulteren in een aanzienlijk betere gebruikerservaring op mobiele apparaten, wat essentieel is gezien het toenemende gebruik van mobiele toegang tot chatbots.