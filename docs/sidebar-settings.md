# Implementatie Gebruikersgedeelte in Sidebar

## Beschrijving

Het gebruikersgedeelte wordt onderin de sidebar geplaatst en bevat:
- Een avatar die de profielfoto van de gebruiker toont (of initialen in een gekleurde cirkel als fallback)
- Een dropdown menu dat verschijnt bij klikken op de avatar
- Menu-opties inclusief gebruikersinformatie, instellingen, themawisselaar, taalwisselaar en uitlogoptie
- Animaties voor soepele overgang bij openen en sluiten van het menu
- Click-outside functionaliteit om het menu te sluiten

## Projectstructuur

De implementatie bouwt voort op de bestaande sidebar-component structuur.

## 1. Gebruikerssectie toevoegen aan Sidebar

### `src/lib/components/ui/sidebar.svelte` (aanpassen)
- Een apart slot toevoegen onderaan de sidebar voor het gebruikersgedeelte
- Flexbox styling met margin-top: auto toepassen om deze onderaan te plaatsen
- Styling toevoegen voor de gebruikerssectie (padding, border-top, etc.)

## 2. User Avatar Component

### `src/lib/components/ui/avatar.svelte` (nieuw)
- Component maken voor profielfoto/initialen weergave
- Propelarameter voor gebruikersdata toevoegen
- Logica implementeren voor het tonen van initialen indien geen foto beschikbaar
- Kleurenlogica toevoegen voor achtergrond van initialen-avatar
- Verschillende formaten ondersteunen via een size property

## 3. Gebruikersmenu Component

### `src/lib/components/ui/user-menu.svelte` (nieuw)
- State voor open/gesloten menu toevoegen (isMenuOpen)
- Click-handler voor toggle functionaliteit
- Dropdown menu positie relatief t.o.v. avatar
- z-index instellen voor juiste weergave over andere elementen
- Svelte's 'onMount' en event listener voor klik-buiten functionaliteit

## 4. Menu-inhoud Structuur

### Onderdelen van het menu:
- Gebruikersinfo sectie bovenaan (naam en e-mail)
- Separator/divider
- Menuopties met iconen:
  * Instellingen (tandwiel-icoon)
  * Thema wisselen (zon/maan-icoon)
  * Uitloggen (deur/uitgang-icoon)
- Styling voor hover en focus states
- Duidelijke visuele feedback bij interactie

## 5. Animaties implementeren

### Voor menu openen/sluiten:
- Svelte transitie animaties toevoegen (slide, fade of scale)
- CSS transitie properties voor vloeiende beweging
- Duur van animaties afstemmen (150-300ms voor optimale UX)
- Timing functions voor natuurlijke beweging (ease-in-out)

## Implementatiestappen Gebruikersgedeelte

### Stap 1: Gebruikersstore opzetten
1. Mockgebruikersdata definiëren voor ontwikkeling
2. Eenvoudige store maken met writable in Svelte
3. Helper functie maken om initialen uit naam te genereren

### Stap 2: Avatar component bouwen
1. Component structuur opzetten met props voor gebruikersdata
2. Conditionale weergave voor foto vs. initialen
3. Styling toevoegen voor avatar (cirkel, kleuren, grootte)
4. Klikgedrag implementeren

### Stap 3: Gebruikersmenu component bouwen
1. Menu structuur opzetten
2. Toggle functie voor weergave implementeren
3. Opties definiëren met iconen en labels
4. Click-outside mechanisme toevoegen

### Stap 4: Integratie in sidebar 
1. User section toevoegen aan bestaande sidebar component
2. Avatar component plaatsen
3. UserMenu verbinden met avatar
4. Positionering en uitlijning verfijnen

### Stap 5: Interactie en Verfijning
1. Animaties toevoegen voor menu openen/sluiten
2. Hover en focus states verbeteren
3. Testen op verschillende schermformaten

## Tijdsinschatting
- Gebruikersstore: 30-45 minuten
- Avatar component: 1-1.5 uur
- Gebruikersmenu: 1.5-2 uur
- Sidebar integratie: 1 uur
- Verfijning en animaties: 1-1.5 uur
- Totaal: 5-7 uur

## Technische Aspecten
- Gebruik van Svelte transitions voor animaties
- CSS-flex voor positionering
- Event handling voor klikinteracties
- Conditionele rendering voor verschillende states