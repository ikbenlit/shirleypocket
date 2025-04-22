# Gefaseerd Stappenplan: Ontwikkeling Easyleader Web App (Landings- & Aanbodpagina)

Dit plan is gebaseerd op `docs/easyleadership-landings-aanbodpagina.md`.

**Doel:** Structureren van de ontwikkeling, van de Proof of Concept (POC) tot de live pagina's, en het bijhouden van de voortgang.

---

### Fase -1: Planning & Documentatie

*   **Taak:** Analyseren basisdocumentatie (`easyleadership-landings-aanbodpagina.md`, styleguide, eisen).
    *   *Status:* ✅ Voltooid
*   **Taak:** Definiëren hoofd-ontwikkelingsfasen (POC, Pagina's, Testen, Lancering, Doorontwikkeling).
    *   *Status:* ✅ Voltooid
*   **Taak:** Uitsplitsen van fasen in concrete, uitvoerbare taken.
    *   *Status:* ✅ Voltooid
*   **Taak:** Toewijzen initiële status aan elke taak.
    *   *Status:* ✅ Voltooid
*   **Taak:** Opstellen en structureren van `faseplan.md`.
    *   *Status:* ✅ Voltooid

---

### Fase 0: Voorbereiding & Setup

*   **Taak:** Project setup (SvelteKit, Vercel).
    *   *Status:* ✅ Voltooid
*   **Taak:** Tailwind CSS configuratie met kleuren en fonts uit de styleguide (`docs/easyleader-ui-ux-styleguide.md`).
    *   *Status:* ✅ Voltooid
*   **Taak:** Bevestigen van alle vereisten (Functioneel, Technisch, UI/UX, PRD).
    *   *Status:* ✅ Voltooid

---

### Fase 1: Proof of Concept (POC) - Easyleader-bot Kernfunctionaliteit

*   **Taak:** Ontwikkelen basis chatbot structuur (GPT-4 integratie).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren van kennisbasis (scripts, voorbeeldvragen Easyleadership-programma).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren van Yvette's tone of voice en coachingstijl (incl. ABC-model).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Garanderen van privacy (geen dataopslag).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Basis testen van de bot (reactiesnelheid <2s, casusherkenning, reflectieve vragen).
    *   *Status:* ⚫️ Nog te starten

---

### Fase 2: Ontwikkeling Aanbodpagina (voor Yvette)

*   **Taak:** Ontwikkelen structuur en content per sectie (Intro, POC-aanbod, Doorontwikkeling, CTA, Footer).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren visueel ontwerp (layout, kleuren, typografie, animaties) conform styleguide.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren interactie-ontwerp (hovers, tooltips, link naar contact/agenda).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Zorgen voor responsiveness (mobile-first).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren toegankelijkheid (WCAG AA, focus states, aria-labels).
    *   *Status:* ⚫️ Nog te starten

---

### Fase 3: Ontwikkeling Landingspagina (voor Leidinggevenden)

*   **Taak:** Ontwikkelen structuur en content per sectie Landingspagina (Hero, Functies, Voordelen, CTA, Footer).
    *   *Status:* ✅ Voltooid
*   **Taak:** Implementeren visueel ontwerp Landingspagina (layout, kleuren, typografie, animaties, illustratie) conform styleguide.
    *   *Status:* ✅ Voltooid
*   **Taak:** Implementeren interactie-ontwerp Landingspagina (hovers, animaties, link naar login).
    *   *Status:* ✅ Voltooid
*   **Taak:** Zorgen voor responsiveness Landingspagina (mobile-first).
    *   *Status:* ✅ Voltooid
*   **Taak:** Implementeren toegankelijkheid Landingspagina (WCAG AA, focus states, aria-labels).
    *   *Status:* 🟡 In uitvoering

---

### Fase 3.1: Ontwikkeling Loginpagina UI

*   **Taak:** Ontwikkelen structuur en content Loginpagina (twee-kolommen layout).
    *   *Status:* 🟡 In uitvoering
*   **Taak:** Implementeren visueel ontwerp Loginpagina (conform beschrijving & layout).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren interactie-ontwerp Loginpagina (basis: focus, hover; excl. auth feedback).
    *   *Status:* 🟡 In uitvoering
*   **Taak:** Zorgen voor responsiveness Loginpagina.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren basis toegankelijkheid Loginpagina.
    *   *Status:* ⚫️ Nog te starten

---

### Fase 3.2: Implementatie Authenticatie (Firebase)

*   **Taak:** Firebase project setup & Auth configuratie (activeren e-mail/wachtwoord, evt. magic link).
    *   *Status:* 🟡 In uitvoering
*   **Taak:** Installeren Firebase SDK (frontend).
    *   *Status:* 🟡 In uitvoering
*   **Taak:** Implementeren Login UI interactie met Firebase Auth (incl. feedback/validatie).
    *   *Status:* 🟡 In uitvoering
*   **Taak:** Opzetten Backend/Edge Function voor Firebase token validatie & API calls.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Implementeren Protected Routing (frontend).
    *   *Status:* ⚫️ Nog te starten

---

### Fase 4: Testen & Review

*   **Taak:** Functioneel testen Aanbodpagina (links, formulier/agenda-link, weergave).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Review Aanbodpagina met Yvette (inhoud, toon, aanbod).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Functioneel testen Landingspagina (links, login flow, weergave).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Testen laadtijd (<1s) en performance (beide pagina's).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Testen responsiveness op verschillende apparaten (beide pagina's).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Testen toegankelijkheid (WCAG AA, toetsenbordnavigatie) (beide pagina's).
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Gebruikerstest (optioneel, met doelgroep/Yvette) voor tone of voice en UX.
    *   *Status:* ⚫️ Nog te starten

---

### Fase 5: Implementatie & Lancering

*   **Taak:** Deployment Aanbodpagina naar Vercel.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Deployment Landingspagina (incl. authenticatie) naar Vercel.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Finale controle live omgeving.
    *   *Status:* ⚫️ Nog te starten
*   **Taak:** Overdracht/presentatie POC & Aanbodpagina aan Yvette.
    *   *Status:* ⚫️ Nog te starten

---

### Fase 6: Doorontwikkeling (Post-POC / Toekomst)

*   **Taak:** Evaluatie POC met Yvette en definitieve afspraken doorontwikkeling.
    *   *Status:* 🔮 Toekomst
*   **Taak:** Implementatie uitbreidingen (o.b.v. "Doorontwikkelingsdiensten"):
    *   Integratie intakegegevens / Care & Daring-test.
    *   Ledenomgeving.
    *   Demo-modus.
    *   *Status:* 🔮 Toekomst
*   **Taak:** Continue optimalisatie & onderhoud.
    *   *Status:* 🔮 Toekomst

---
