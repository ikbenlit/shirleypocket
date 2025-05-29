# Herstel- en Aanpassingsplan voor Chat Interface (src/routes/chat/+page.svelte)

Dit document beschrijft de stappen om de Svelte chat interface (`src/routes/chat/+page.svelte`) te herstellen naar zijn oorspronkelijke Svelte-gebaseerde logica (met name het gebruik van `chatStore` voor suggesties), terwijl de recente visuele verbeteringen (geïnspireerd door `docs/chatinterface.html`) behouden blijven.

## Doelstelling

De primaire doelstelling is om de chatfunctionaliteit, met name het laden en verwerken van suggesties/categorieën, weer via de `chatStore` te laten verlopen, zoals oorspronkelijk bedoeld. De te directe implementatie van de HTML-voorbeeldlogica wordt teruggedraaid. Algemene UI/UX-verbeteringen (kleuren, lettertypen, layout) die recent zijn doorgevoerd, blijven behouden.

## Herstelacties en Aanpassingen

### 1. Herstel `chatStore` Integratie in `<script>`-blok

*   **Herstel Imports**: ✅ Afgerond
    - Alle benodigde imports zijn aanwezig en correct gebruikt.
*   **Herstel Store Abonnement**: ✅ Afgerond
    - Store-abonnement op `chatStore` en correcte typering zijn aanwezig.
*   **Herstel Reactieve Logica voor Geselecteerde Vraag**: ✅ Afgerond
    - De `$: if (browser && $selectedQuestionText) {...}`-logica is correct geïmplementeerd.
*   **Verwijder HTML-Specifieke Suggestielogica**: ✅ Afgerond
    - Alle HTML/JS-voorbeeldlogica is verwijderd uit de Svelte-component.
*   **Pas `sendMessage()` aan**: ✅ Afgerond
    - De functie verwerkt nu alleen nog API-calls en geen hardgecodeerde antwoorden.
*   **Pas `initializeChat()` aan**: ✅ Afgerond
    - Alleen het standaard welkomstbericht wordt getoond.
*   **Pas `resetChat()` aan**: ✅ Afgerond
    - `userInput` wordt geleegd en de chat wordt correct gereset.

### 2. Aanpassingen in de Svelte Template (HTML-gedeelte)

*   **Verwijder Hardgecodeerde Suggesties**: ✅ Afgerond
    - De welkomstbanner en knoppen zijn verwijderd uit de template.
*   **Herintegreer `CategoryChipContainer`**: ✅ Afgerond
    - De suggesties worden nu weer via de store en chips getoond.
*   **Verwijder `quick-actions` Div**: ✅ Afgerond
    - De quick actions div is verwijderd.
*   **Behoud Visuele Styling**: ✅ Afgerond
    - Alle visuele verbeteringen zijn behouden.

### 3. Code Opschoning (Algemeen)

*   **Verwijder Ongebruikte Variabelen**: ✅ Afgerond
    - Er zijn geen overgebleven variabelen zoals `quickActionsContainer` meer in de codebase.
*   **Controleer Imports**: ✅ Afgerond
    - Alle imports in `src/routes/chat/+page.svelte` zijn in gebruik en relevant.

## Werkwijze

1.  **Implementeer Herstelacties**: ✅ Afgerond
2.  **Test Functionaliteit**: 🔳 Open
    - Nog te testen: suggesties/categorieën via `chatStore` en `CategoryChipContainer`, selectie van een suggestie, verzenden van een bericht, API-afhandeling, reset functionaliteit.
3.  **Test Visuele Consistentie**: 🔳 Open
    - Nog te testen: visuele stijl en responsiviteit.
4.  **Code Opschoning**: ✅ Afgerond

---

**Samenvatting:**  
Alle herstelacties en code opschoning zijn uitgevoerd en afgerond. Alleen het testen van de functionaliteit en visuele consistentie staat nog open.
