# Categorie - Inline-chips Pattern

## Aanleiding

Organisaties streven naar een naadloze gebruikerservaring in één enkele interface zonder dubbele navigatielagen. Het gebruik van sidebars op mobiele toestellen kan leiden tot verwarring en een verminderde context. Met inline-chips wordt de gebruiker niet uit de chatflow gehaald en blijven alle interacties binnen één vertrouwde interface.

## Doelstelling

1. **Verbeteren van gebruiksgemak:** door categorieën en voorbeeldvragen direct boven de chat-input aan te bieden.
2. **Behouden van context:** de gebruiker blijft in de conversatie-omgeving zonder schermwissels.
3. **Consistentie over devices:** één universeel patroon dat zowel op desktop als mobiel goed functioneert.
4. **Inbedding van content:** de volledige set categorieën en bijbehorende voorbeeldvragen wordt via de inline-chips ontsloten voor de gebruiker.

## 1. State & Props

* **Props**

  * `categories: Array<{ id: string; title: string; questions: Array<{ text: string }> }>`
* **Local State**

  * `activeCategoryId: string | null` – de huidige geselecteerde categorie
  * `viewMode: 'chips' | 'picker'` – of we vraag-chips tonen of de categorie-picker

## 2. Gebruiker-interacties & Events

1. **Pagina laden**

   * `activeCategoryId = null`, `viewMode = 'chips'`
   * Toon één tappable chip met label “Categorie kiezen”
2. **Tap op “Categorie”-chip**

   * Event: `openPicker()` → `viewMode = 'picker'`
   * Resultaat: open modal/bottom sheet met alle 8 categorieën
3. **Selecteer categorie in picker**

   * Event: `selectCategory(id)` → `activeCategoryId = id`, `viewMode = 'chips'`
   * Resultaat: laad vraag-chips voor de gekozen categorie en sluit picker
4. **Tap op vraag-chip**

   * Event: `selectQuestion(questionText)`
   * Logic: vul chat-input met `questionText` en zet focus op input-veld

## 3. UI-transities & Dataflow

* **Modal animatie**: fade-in/out bij openen en sluiten van categorie-picker
* **Chips-rij**: horizontaal scrollable, bestaande uit:

  * **Categorie-chip** (altijd zichtbaar, opent picker)
  * **Vraag-chips** voor de actieve categorie (eenvoudige lijstregels zonder bubble-weergave)
* **Focus management**: na `selectQuestion` focus automatisch op input-veld

## 4. UX-aanpak

* **Consistente interface**: alle keuzes inline, direct boven de chat, geen zijbalk.
* **Contextbehoud**: gebruiker blijft in dezelfde chatomgeving zonder schermwissels.
* **Snel wisselen**: tappable categorie-chip voor snelle toegang tot andere categorieën.
* **Responsief ontwerp**: werkt op alle schermgroottes; chips-rij is scrollbaar bij overflow.

## 5. Conclusie

Met de inline-chips pattern bieden we een overzichtelijke én focusgerichte gebruikerservaring. Categorieën en voorbeeldvragen zijn direct beschikbaar, zonder extra navigatie. Dit patroon reduceert het aantal klikken, houdt de gebruiker in context en is uniform inzetbaar op desktop en mobiel.

---

## Kleuren per categorie

Elke categorie krijgt een eigen chipkleur, gebaseerd op ons primaire palet en statuskleuren. Chip-tekst is contrastrijk: wit (`#FFF`) of donkergrijs (`#406E78`).

| Categorie                                               | Achtergrond (RGB)  | Hex     | Tekst   |
| ------------------------------------------------------- | ------------------ | ------- | ------- |
| Eigen verantwoordelijkheid, pro‑activiteit en delegeren | rgb(0, 61, 75)     | #003D4B | #FFF    |
| Team meetings leiden                                    | rgb(191, 207, 210) | #BFCFD2 | #406E78 |
| Omgaan met weerstand                                    | rgb(255, 203, 5)   | #FFCB05 | #406E78 |
| Performance‑gesprekken voeren                           | rgb(237, 28, 36)   | #ED1C24 | #FFF    |
| Goede afspraken maken                                   | rgb(145, 194, 207) | #91C2CF | #003D4B |
| Bijdragen aan doelen en strategie van de organisatie    | rgb(0, 204, 156)   | #00CC9C | #003D4B |
| Eigen tijd managen                                      | rgb(255, 179, 71)  | #FFB347 | #003D4B |
| Zorgen voor continue verbetering                        | rgb(64, 110, 120)  | #406E78 | #FFF    |
