### Secundaire kleuren
- **Blue Accent** `#337AB7` – Secundaire knoppen, links in tekst, ondersteunende acties
- **Blue Light** `#5DADE2` – Lichte blauwe accenten voor diversiteit# 🎨 ShirleyBot Web App – UX/UI Styleguide (v2)

_Deze versie bevat de complete richtlijnen voor de "Shirley in je pocket" chatbot en "Maak kennis met Shirley" widget, inclusief landingspagina-elementen, chatbot-interface, tone of voice, en iconset._

---

## 🌈 Kleurenpalet

### Primaire kleuren
- **Pink Strong** `#E91E63` – Primaire call-to-action knoppen (zoals "Naar de online academy"), accent kleur
- **Pink Hover** `#C2185B` – Hover-staat van knoppen en interactieve elementen  
- **Pink Light** `#F8BBD9` – Lichte accent kleur, highlight achtergronden, quick reply buttons
- **Pink Dark** `#AD1457` – Donkere variant voor emphasis en contrast

### Neutrale kleuren
- **Black** `#000000` – Body-tekst, koppen, primaire content
- **Dark Gray** `#333333` – Secundaire tekst, subtitels  
- **Medium Gray** `#666666` – Minder belangrijke tekst, placeholders
- **Gray Text** `#707070` – Bijschriften, timestamps, metadata
- **Light Gray** `#F5F5F5` – Panel-achtergronden, content cards
- **Very Light Gray** `#FAFAFA` – Subtiele achtergronden, dividers
- **Beige Light** `#F7F3F0` – Warme achtergrond kleur (zoals op "Over Shirley" pagina)
- **Off White** `#FEFEFE` – Kaarten, modals, bot-ballonnen
- **White** `#FFFFFF` – Zuivere achtergronden, witruimte, user-ballonnen (tekst)

### Donkere neutrals
- **Dark Gray 1** `#1A1A1A` – Donkere modes, footers, sidebars
- **Dark Gray 2** `#222222` – Alternatieve donkere vlakken
- **Dark Gray 3** `#242424` – Subtiele scheidingslijnen, icons
- **Dark Text** `#333333` – Tekst op lichtgrijze achtergronden, labels

### Statuskleuren
- **Succes** `#28a745` – Positieve feedback, bevestiging
- **Waarschuwing** `#ffc107` – Aandacht vereist
- **Fout** `#dc3545` – Foutmeldingen, problemen

---

## 🔠 Typografie

Er worden twee lettertypen gebruikt: **Source Sans Pro** (sans-serif) en **Roboto** (sans-serif).

### Combinatie van Source Sans Pro en Roboto

Source Sans Pro wordt gebruikt voor koppen en accenten (kracht, directheid), terwijl Roboto een ondersteunende rol speelt voor body-tekst (leesbaarheid, warmte).

**Source Sans Pro (Sans-Serif):**
- **Gewichten/stijlen:** Bold (700), Semibold (600), Regular (400)
- **Toepassing:**
    - **Hoofdtitels (H1):** `Source Sans Pro Bold (700)`, 32px, #000000. _Voorbeeld: "Shirley in je pocket – Jouw persoonlijke coach"_
    - **Sectiekoppen (H2):** `Source Sans Pro Semibold (600)`, 24px, #E91E63 of #000000
    - **Subtitels (H3):** `Source Sans Pro Semibold (600)`, 20px, #333333
    - **Knoppen:** `Source Sans Pro Semibold (600)`, 16px, #FFFFFF op #E91E63

**Roboto (Sans-Serif):**
- **Gewichten/stijlen:** Medium (500), Regular (400), Light (300)
- **Toepassing:**
    - **Body-tekst:** `Roboto Regular (400)`, 16px, #333333. _Voorbeeld: chatbot-antwoorden, algemene content_
    - **Kleine tekst:** `Roboto Regular (400)`, 14px, #707070. _Voorbeeld: timestamps, bijschriften_
    - **Monospace (optioneel):** `Roboto Mono Regular (400)`, 14px voor code-voorbeelden

### Visuele hiërarchie samenvatting

1. **Hoofdtitels (H1):** Source Sans Pro Bold (32px) – #000000
2. **Sectiekoppen (H2):** Source Sans Pro Semibold (24px) – #E91E63 of #000000
3. **Subtitels (H3):** Source Sans Pro Semibold (20px) – #333333
4. **Body-tekst:** Roboto Regular (16px) – #333333
5. **Knoppen:** Source Sans Pro Semibold (16px) – #FFFFFF
6. **Kleine tekst:** Roboto Regular (14px) – #707070
7. **Monospace:** Roboto Mono Regular (14px) – #333333

---

## 🧩 Componenten

### Buttons
- **Primaire knop:** #E91E63 achtergrond, #FFFFFF tekst, hover #C2185B
- **Secundaire knop:** #FFFFFF achtergrond, #E91E63 tekst en rand (2px), hover inverse
- **Tertiaire knop:** #337AB7 achtergrond, #FFFFFF tekst
- **Outline knop:** Transparante achtergrond, #E91E63 tekst en rand (1px)
- **Border-radius:** 6px (zoals in login form) of 25px (voor volledig ronde knoppen)
- **Padding:** 14px 28px (iets meer ruimte zoals op website)
- **Font:** Source Sans Pro Semibold (600), 15px
- **Hover:** Subtiele schaduw `box-shadow: 0 2px 8px rgba(233,30,99,0.2)` + kleurverandering

### Formulieren & Input
- **Input achtergrond:** #FFFFFF
- **Input rand:** 1px solid #E0E0E0 (normale staat)
- **Focus rand:** 2px solid #E91E63 (focus staat)
- **Placeholder tekst:** #CCCCCC
- **Border-radius:** 6px (iets ronder zoals in login form)
- **Padding:** 14px 16px (iets meer ruimte)
- **Label:** #333333, Roboto Medium 14px

### Cards & Containers
- **Achtergrond:** #FEFEFE of #F5F5F5
- **Schaduw:** `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- **Border-radius:** 8px
- **Padding:** 16px-24px

### Links
- **Inline link:** #337AB7, hover #E91E63
- **Onderstreping:** alleen on-hover
- **Bezochte links:** #707070

---

## 💬 Chatbot Interface

### Chat Container
- **Max breedte:** 800px op desktop, full-width op mobiel
- **Achtergrond:** #FFFFFF
- **Border-radius:** 8px (top corners)
- **Schaduw:** `box-shadow: 0 4px 12px rgba(0,0,0,0.15)`

### Chat Ballonnen
- **Bot-ballon:**
  - Achtergrond: #FEFEFE
  - Tekst: #000000, Roboto Regular 16px
  - Border-radius: 16px 16px 16px 4px
  - Max-width: 75%
  - Margin: links uitgelijnd

- **User-ballon:**
  - Achtergrond: #E91E63
  - Tekst: #FFFFFF, Roboto Regular 16px
  - Border-radius: 16px 16px 4px 16px
  - Max-width: 75%
  - Margin: rechts uitgelijnd

### Chat Metadata
- **Timestamp:** #707070, Roboto Regular 12px
- **Status indicatoren:** Kleine iconen in #707070

### Quick Reply Buttons
- **Achtergrond:** #F8BBD9
- **Tekst:** #333333, Roboto Medium 14px
- **Hover:** achtergrond #E91E63, tekst #FFFFFF
- **Border-radius:** 16px
- **Padding:** 8px 16px

---

## 🌐 Landingspagina & Widget Elementen

### Landingspagina "Shirley in je pocket"
- **Hero-sectie:**
  - Hoofdtitel: Source Sans Pro Bold 32px, #000000
  - Subtitel: Roboto Regular 18px, #333333
  - CTA-knop: #E91E63 met wit icoon
  - Achtergrond: #FFFFFF of #F7F3F0 (warme beige tint)

- **Functies-sectie:**
  - Sectietitel: Source Sans Pro Semibold 24px, #E91E63
  - Feature cards: #FEFEFE achtergrond, 8px border-radius
  - Feature iconen: 24px, #E91E63 of #337AB7
  - Feature tekst: Roboto Regular 16px, #333333

- **Voordelen-sectie:**
  - Grid layout met cards
  - Voordeel iconen: 32px, #E91E63
  - Titel per voordeel: Source Sans Pro Semibold 18px
  - Beschrijving: Roboto Regular 14px, #707070

### "Maak kennis met Shirley" Widget
- **Widget knop (gesloten):**
  - Achtergrond: #E91E63
  - Icoon: #FFFFFF, 24px
  - Position: fixed bottom-right
  - Border-radius: 50%
  - Grootte: 60px x 60px
  - Schaduw: `box-shadow: 0 4px 12px rgba(233,30,99,0.3)`

- **Widget venster (geopend):**
  - Achtergrond: #FFFFFF
  - Border-radius: 12px
  - Max-breedte: 350px
  - Max-hoogte: 500px
  - Schaduw: `box-shadow: 0 8px 24px rgba(0,0,0,0.15)`

---

## 🎨 Iconset

**Gekozen iconset**: [Lucide Icons](https://lucide.dev/)

**Waarom Lucide Icons?**
Lucide is een open-source iconset (MIT-licentie) met moderne, minimalistische line-iconen. Ze zijn vectorgebaseerd (SVG), perfect schaalbaar, en passen goed bij Shirley's no-nonsense, directe aanpak. De iconen zijn helder, functioneel en toegankelijk.

### Toegang en Gebruik
- **Open library:** Lucide is gratis toegankelijk onder MIT-licentie
- **Integratiemethoden:**
  - **NPM-pakket:** `lucide-react` voor React/Next.js projecten
  - **SVG's:** Directe SVG-bestanden van lucide.dev
  - **CDN:** Voor snelle prototyping
- **Aanbevolen aanpak:** NPM-pakket voor schaalbaarheid, specifieke SVG's voor POC

### Kenmerken
- **Stijl:** Clean line-iconen, consistent 24px grid
- **Kleuren:** Gebruik styleguide-kleuren:
  - #E91E63 voor primaire iconen (acties, highlights) 
  - #337AB7 voor secundaire iconen (info, navigatie)
  - #707070 voor subtiele iconen (timestamps, metadata)
  - #FFFFFF voor iconen op gekleurde achtergronden
- **Groottes:**
  - 32px voor hero/feature iconen
  - 24px voor sectie-iconen
  - 16px voor inline/button iconen
  - 14px voor metadata iconen

### Toepassing in ShirleyBot

#### Landingspagina
- **Hero-sectie:**
  - CTA-knop: `ArrowRight` (16px, #FFFFFF) in #E91E63 knop
- **Functies-sectie:**
  - Voedingsadvies: `Apple` (24px, #E91E63)
  - Mindset coaching: `Brain` (24px, #337AB7)
  - 24/7 beschikbaar: `Clock` (24px, #E91E63)
  - Programma-integratie: `Link` (24px, #337AB7)
- **Voordelen-sectie:**
  - Persoonlijke aandacht: `Heart` (32px, #E91E63)
  - Tijdsbesparing: `Zap` (32px, #337AB7)
  - Altijd bereikbaar: `Smartphone` (32px, #E91E63)

#### Chatbot Interface
- **Chat controls:**
  - Verzenden: `Send` (16px, #FFFFFF) in #E91E63 knop
  - Menu: `Menu` (16px, #707070)
  - Minimaliseren: `Minimize2` (16px, #707070)
  - Sluiten: `X` (16px, #707070)
- **Message types:**
  - Bot bericht: `Bot` (14px, #337AB7)
  - Tip/advies: `Lightbulb` (14px, #E91E63)
  - Link naar programma: `ExternalLink` (14px, #337AB7)
  - Waarschuwing: `AlertTriangle` (14px, #ffc107)` (16px, #707070)
  - Minimaliseren: `Minimize2` (16px, #707070)
  - Sluiten: `X` (16px, #707070)
- **Message types:**
  - Bot bericht: `Bot` (14px, #337AB7)
  - Tip/advies: `Lightbulb` (14px, #DE346C)
  - Link naar programma: `ExternalLink` (14px, #337AB7)
  - Waarschuwing: `AlertTriangle` (14px, #ffc107)

#### Widget
- **Widget knop:** `MessageCircle` (24px, #FFFFFF)
- **Widget header:** `User` (16px, #DE346C) + `Minimize2` (16px, #707070)

---

## 📱 Responsiveness

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

### Mobile-first principes
- **Chat interface:** Full-width op mobiel, max 800px op desktop
- **Widget:** Aanpasbare grootte, bottom-right positioning
- **Touch targets:** Minimaal 44x44px voor knoppen
- **Padding:** 16px op mobiel, 24-32px op desktop
- **Font-sizes:** Relatieve groottes met min/max waardes

---

## 🗣️ Tone of Voice & Woordgebruik

**Shirley's communicatiestijl:**
- **Direct en no-nonsense:** "Hupakee, daar gaan we!" in plaats van omslachtige inleidingen
- **Motiverend en bemoedigend:** "Niet piekeren, gewoon doen!" 
- **Praktisch en concreet:** Specifieke tips in plaats van algemene adviezen
- **Persoonlijk maar professioneel:** Gebruikt "je" en "jij", warm maar respectvol
- **Eerlijk en realistisch:** Erkent uitdagingen, geeft realistische verwachtingen
- **Energiek en enthousiast:** Gebruikt uitroeptekens en krachtige woorden

**Voorbeeldzinnen:**
- _Welkom:_ "Welkom in de academie! Heb je je aangemeld voor een programma van Shirley Verduin?"
- _Advies:_ "Eiwitten zijn cruciaal, maar het hoeft niet ingewikkeld. Probeer dit..."
- _Doorverwijzing:_ "Dat vind je terug in Module 2 van je programma: [LINK]"
- _Motivatie:_ "Je bent niet zwak, je bent mens. Pak je werkboek erbij en aan de slag!"
- _Support:_ "Lukt het inloggen niet? Kijk dan even op de supportpagina."

---

## ✅ Implementatie Checklist

### Technische vereisten
- [ ] Lucide Icons NPM-pakket geïnstalleerd
- [ ] Source Sans Pro & Roboto fonts geladen
- [ ] CSS-variabelen voor kleurenpalet ingesteld
- [ ] Responsive breakpoints gedefinieerd
- [ ] Toegankelijkheid-attributen (aria-labels, alt-text)

### Design consistency
- [ ] Alle knoppen gebruiken juiste border-radius (4px)
- [ ] Chat ballonnen hebben correcte border-radius en alignment
- [ ] Iconen hebben consistente groottes per context
- [ ] Hover-states zijn gedefinieerd voor interactieve elementen
- [ ] Loading states zijn vormgegeven

### Content & UX
- [ ] Tone of voice is geïmplementeerd in alle copy
- [ ] Error messages zijn vriendelijk en helpend
- [ ] Success states geven duidelijke feedback
- [ ] Quick reply buttons bevatten relevante opties
- [ ] Links naar programma-onderdelen zijn correct

---

## 🔧 Technische Specificaties

### Performance
- **Laadtijd:** < 2 seconden voor eerste paint
- **Animaties:** Max 300ms duration, ease-out timing
- **Iconen:** SVG voor scherpte op alle schermen
- **Fonts:** Preload voor Core Web Vitals

### Browser support
- **Modern browsers:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile:** iOS Safari 13+, Chrome Mobile 80+
- **Fallbacks:** System fonts als backup voor custom fonts

### Accessibility (WCAG 2.1 AA)
- **Contrast ratios:** Minimaal 4.5:1 voor normale tekst, 3:1 voor grote tekst
- **Focus indicators:** Zichtbare focus states voor alle interactieve elementen
- **Screen readers:** Semantic HTML en juiste aria-labels
- **Keyboard navigation:** Volledige toegankelijkheid zonder muis

---

> **Tip:** Test regelmatig met echte gebruikers en pas de styleguide aan op basis van feedback. Shirley's directe stijl vraagt om een interface die net zo helder en efficiënt is als haar coaching-aanpak.