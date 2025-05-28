**ShirleyBot Styleguide**

Een consistente stijl versterkt de herkenbaarheid en het vertrouwen van gebruikers in de chatbot van Shirley. Deze styleguide beschrijft de kleuren, typografie en basis UI-onderdelen die gebruikt worden in de chatbot-interface.

---

## 1. Kleurpalet

### 1.1 Primaire kleuren

| Doel                | Kleurcode | Naam        | Gebruik                                            |
| ------------------- | --------- | ----------- | -------------------------------------------------- |
| **Accent / Acties** | #DE346C   | Pink Strong | Primaire call-to-action knoppen, links, highlights |
| **Accent / Hover**  | #E4287C   | Pink Hover  | Hover-staat van knoppen en interactieve elementen  |
| **Secundair**       | #337AB7   | Blue Accent | Secundaire knoppen, links in tekst                 |

### 1.2 Neutrale kleuren

| Doel                | Kleurcode | Naam       | Gebruik                                |
| ------------------- | --------- | ---------- | -------------------------------------- |
| **Tekst hoofd**     | #000000   | Black      | Body-tekst, koppen                     |
| **Tekst secundair** | #707070   | Gray Text  | Bijschriften, minder belangrijke tekst |
| **Achtergrond**     | #F5F5F5   | Light Gray | Panel-achtergronden, content cards     |
| **Paneel / Card**   | #FEFEFE   | Off White  | Kaarten, modals                        |
| **Wit**             | #FFFFFF   | White      | Zuivere achtergronden, witruimte       |

### 1.3 Donkere Neutrals

| Doel                | Kleurcode | Naam        | Gebruik                            |
| ------------------- | --------- | ----------- | ---------------------------------- |
| **Background Dark** | #1A1A1A   | Dark Gray 1 | Donkere modes, footers, sidebars   |
| **Background Alt**  | #222222   | Dark Gray 2 | Alternatieve donkere vlakken       |
| **Zwart-variant**   | #242424   | Dark Gray 3 | Subtiele scheidingslijnen, icons   |
| **Text Dark Mode**  | #333333   | Dark Text   | Tekst op lichtgrijze achtergronden |

---

## 2. Typografie

### 2.1 Lettertypen

| Element                              | Font Family               | Gewicht (Weight) | Stijl   |
| ------------------------------------ | ------------------------- | ---------------- | ------- |
| **Koppen**                           | Source Sans Pro           | 600 – 700        | Normaal |
| **Body**                             | Roboto                    | 400 – 500        | Normaal |
| **Monospace** (code / bot responses) | Roboto Mono\* (optioneel) | 400              | Normaal |

> *\*Optioneel: voor geformatteerde tekst zoals code en JSON-voorbeelden.*

### 2.2 Font-groottes & hiërarchie

| Naam  | Grootte (px) | Line-height | Gebruik                                   |
| ----- | ------------ | ----------- | ----------------------------------------- |
| H1    | 32           | 1.25        | Pagina-titels, belangrijke sectiekoppen   |
| H2    | 24           | 1.3         | Sectiekoppen binnen content               |
| H3    | 20           | 1.4         | Subsecties, vraagtitels                   |
| Body  | 16           | 1.6         | Algemene tekst, antwoorden van de chatbot |
| Small | 14           | 1.4         | Bijschriften, metadata                    |

---

## 3. UI-componenten

### 3.1 Knoppen

* **Primaire knop**:

  * Achtergrond: #DE346C
  * Tekst: #FFFFFF
  * Hover: achtergrond #E4287C
  * Rand: geen
  * Border-radius: 4px
  * Padding: 12px 24px

* **Secundaire knop**:

  * Achtergrond: #FFFFFF
  * Tekst: #DE346C
  * Rand: 2px solid #DE346C
  * Hover: achtergrond #DE346C, tekst #FFFFFF
  * Border-radius: 4px
  * Padding: 12px 24px

### 3.2 Link-stijlen

* **Inline link**:

  * Kleur: #337AB7
  * Hover: #DE346C
  * Onderstreping: alleen on-hover

### 3.3 Chatvenster

* **Achtergrond bot-ballon**: #FEFEFE
* **Tekst bot**: #000000
* **Achtergrond user-ballon**: #DE346C
* **Tekst user**: #FFFFFF
* **Timestamp (klein)**: #707070, 12px, Roboto

### 3.4 Formulieren & Velden

* **Input achtergrond**: #FFFFFF
* **Input rand**: 1px solid #CCCCCC
* **Focus rand**: 1px solid #DE346C
* **Label**: #333333, Roboto 14px

---

## 4. Illustraties & Iconen

* Gebruik eenvoudige, lijngebaseerde iconen in zwart (#000000) of wit (#FFFFFF).
* Icons voor acties in accentkleur (#DE346C).

---

> **Tip**: Houd de interface ruimtelijk en overzichtelijk. White space (padding & margins) is essentieel om de content rust te geven.

Met deze richtlijnen kun je de chatbot-interface consistent en herkenbaar maken, in lijn met Shirleys merkidentiteit.
