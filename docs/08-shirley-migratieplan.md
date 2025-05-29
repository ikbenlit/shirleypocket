# Migratieplan: van Easyleader Chatbot naar Shirley Chatbot

Dit document beschrijft de gefaseerde aanpak om het bestaande easyleader-chatbot-project om te bouwen naar de Shirley chatbot, gericht op het ondersteunen van het programma "Afvallen doe je zo". Dit plan is gebaseerd op de projectdocumentatie in de `docs/` map.

## Fase 1: Projectvoorbereiding & Basisconfiguratie

- ⚪ **Projectnaam en metadata aanpassen**
  - ⚪ Hernoem de projectmap en pas `package.json` aan (`name`, `keywords`, etc.).
  - ⚪ Werk de `README.md` bij met Shirley-specifieke informatie.
- ⚪ **Verwijder of archiveer easyleader-specifieke code**
  - ⚪ Verwijder componenten, assets en logica die niet relevant zijn voor Shirley.
- ⚪ **Controleer en update omgevingsvariabelen**
  - ⚪ Pas `.env` aan voor de juiste API keys en endpoints (zie `01-pocket-shirley-technische-eisen.md`).
- ⚪ **Vervang visuele assets**
  - ⚪ Vervang favicon, logo's en andere branding in `static/` en `public/`.

## Fase 2: Shirley-specifieke Functionele Aanpassingen

- ⚪ **Chatbot prompt en tone-of-voice**
  - ⚪ Implementeer Shirley's directe, motiverende stijl (zie `03-shirley-bot-styleguide.md`).
  - ⚪ Pas de system prompt(s) aan voor OpenAI zodat antwoorden altijd in Shirley's stem zijn.
- ⚪ **Ondersteunde onderwerpen en contentkoppelingen**
  - ⚪ Implementeer verwijzingen naar modules, video's, werkboeken en caloriecalculator (zie `00-pocket-schirley-prd.md`).
  - ⚪ Voeg relevante links toe aan de trainingsdata.
- ✅ **Privacy en sessiebeheer**
  - ✅ Zorg dat er geen persoonlijke data wordt opgeslagen, alleen sessie-informatie. _(Gesprekken worden niet opgeslagen)_

## Fase 3: UI & Gebruikerservaring

- ⚪ **Aanpassen van de chatinterface**
  - 🚧 Pas componenten aan voor Shirley's doelgroep en huisstijl. (Basis UI componenten zoals Buttons zijn aangepakt, gestyled en geïmplementeerd. Glow component gedebugged.)
    - ✅ Vervang oude `Button.svelte` instanties door `ButtonElement.svelte` of `Link.svelte` in:
      - `src/routes/login/+page.svelte`
      - `src/routes/+page.svelte` (inclusief de buttons binnen `HeroWithMockup.svelte`)
    - ✅ Verwijder `src/lib/components/Button.old.svelte` na volledige vervanging.
  - ⚪ Implementeer duidelijke call-to-actions en doorverwijzingen.
- ⚪ **Mobielvriendelijk maken**
  - ⚪ Optimaliseer voor mobiel gebruik (zie technische eisen).
- ⚪ **Toegankelijkheid**
  - ⚪ Controleer op voldoende contrast, focus states en toetsenbordnavigatie.

## Fase 4: Testen & Validatie

- ⚪ **Functioneel testen**
  - ⚪ Test alle flows: inloggen, chatten, doorverwijzen, foutafhandeling.
- ⚪ **Gebruikerstesten**
  - ⚪ Laat een aantal gebruikers uit de doelgroep testen en verzamel feedback.
- ⚪ **Performance & Web Vitals**
  - ⚪ Optimaliseer voor laadtijd, responsiveness en toegankelijkheid.

## Fase 5: Lancering & Doorontwikkeling

- ⚪ **Documentatie bijwerken**
  - ⚪ Werk alle relevante documentatie bij in de `docs/` map.
- ⚪ **Vervolgstappen voorbereiden**
  - ⚪ Zie de roadmap in `00-pocket-schirley-prd.md` voor toekomstige features (contextbewustzijn, profiel, notificaties, dashboard).

---

> Raadpleeg altijd de meest recente projectdocumentatie in de `docs/` map voor details over requirements, stijl en technische eisen. 