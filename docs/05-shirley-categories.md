# Shirley Chatbot - Categorieën & Voorbeeldvragen

---

## 🛠️ Implementatieplan & Statusoverzicht (laatste update: [vul datum in])

**Doel:** De huidige categorieën en voorbeeldvragen in de chat vervangen door Shirley's S.H.A.P.E.-categorieën, kleuren en iconen, zoals hieronder beschreven.

### Plan & Status

| Onderdeel                                 | Status  | Opmerkingen |
|-------------------------------------------|---------|-------------|
| 1. Nieuwe categorieën + vragen in JSON    | klaar   | chat_category.json is bijgewerkt naar Shirley's structuur (kleur, icon, vragen) |
| 2. CategoryChip.svelte haalt kleur/icon uit data | klaar   | Mapping verwijderd, props gebruiken voor kleur en icoon |
| 3. CategoryChipContainer.svelte ondersteunt nieuwe structuur | klaar   | key aangepast naar question.text, geen verdere aanpassingen nodig |
| 4. Store/data-loader laadt nieuwe structuur | klaar   | types opgeschoond, store laadt nieuwe structuur direct |
| 5. UI/UX: chips & modal volgens design    | bezig   | Optioneel: inline-chips pattern, modal/picker |
| 6. Testen & valideren                     | todo    | Werkt alles zoals bedoeld? |

**Legenda:** todo = nog te doen, bezig = in uitvoering, klaar = afgerond

---

## Categorie-indeling voor "Shirley in je pocket"

Gebaseerd op Shirley's S.H.A.P.E.-programma en de meest voorkomende vragen in haar community.

---

## 📊 Voeding & Macro's
**Kleur:** `#E91E63` (Pink Strong) - Primaire categorie
**Icoon:** `Apple` (Lucide)

### Voorbeeldvragen:
- "Ik kom niet aan mijn eiwitten, wat kan ik doen?"
- "Welke voeding past bij mijn calorie-doel?"
- "Hoe verdeel ik mijn macro's over de dag?"
- "Wat zijn goede eiwitbronnen voor vegetariërs?"
- "Hoeveel water moet ik per dag drinken?"

---

## 🧠 Mindset & Motivatie
**Kleur:** `#337AB7` (Blue Accent) 
**Icoon:** `Brain` (Lucide)

### Voorbeeldvragen:
- "Ik heb een motivatie-dip, wat nu?"
- "Hoe ga ik om met eetbuien?"
- "Waarom val ik steeds terug in oude gewoontes?"
- "Hoe blijf ik gemotiveerd als de weegschaal stilstaat?"
- "Tips voor mindful eten?"

---

## 📋 Programma & Planning
**Kleur:** `#00CC9C` (uit je category document - groene tint)
**Icoon:** `Calendar` (Lucide)

### Voorbeeldvragen:
- "Hoe gebruik ik de caloriecalculator?"
- "In welke module vind ik informatie over X?"
- "Hoe plan ik mijn maaltijden voor de week?"
- "Wat moet ik doen in week 1 van het programma?"
- "Waar vind ik mijn werkboeken?"

---

## 🏃‍♀️ Beweging & Activiteit
**Kleur:** `#FFB347` (oranje tint uit je palet)
**Icoon:** `Activity` (Lucide)

### Voorbeeldvragen:
- "Hoeveel beweging heb ik nodig per dag?"
- "Welke sporten passen bij mijn niveau?"
- "Hoe tel ik mijn stappen?"
- "Tips voor meer beweging in mijn dagelijkse routine?"
- "Hoe combineer ik beweging met mijn voeding?"

---

## ⚖️ Weegschaal & Voortgang
**Kleur:** `#FFCB05` (geel uit je palet)
**Icoon:** `TrendingUp` (Lucide)

### Voorbeeldvragen:
- "Hoe vaak moet ik mezelf wegen?"
- "Mijn gewicht schommelt, is dat normaal?"
- "Hoe meet ik mijn voortgang behalve wegen?"
- "Wat doe ik als de weegschaal stilstaat?"
- "Hoe interpreteer ik mijn resultaten?"

---

## 🍽️ Praktische Tips
**Kleur:** `#91C2CF` (lichtblauw uit je palet)
**Icoon:** `Lightbulb` (Lucide)

### Voorbeeldvragen:
- "Snelle recepten voor onder de week?"
- "Hoe ga ik om met uitnodigingen en feestjes?"
- "Tips voor gezond boodschappen doen?"
- "Hoe bereid ik maaltijden voor op zondag?"
- "Gezonde snacks voor onderweg?"

---

## 💪 Overgang & Hormonen
**Kleur:** `#C2185B` (Pink Hover - specifiek voor Shirley's doelgroep)
**Icoon:** `Heart` (Lucide)

### Voorbeeldvragen:
- "Afvallen tijdens de overgang, hoe werkt dat?"
- "Invloed van hormonen op mijn gewicht?"
- "Waarom is afvallen moeilijker na de 40?"
- "Tips voor slecht slapen door hormonen?"
- "Omgaan met emotioneel eten tijdens overgang?"

---

## UI/UX Implementatie

### Inline-chips Pattern
- **Standaard staat:** Eén chip "Kies een onderwerp" in `#F8BBD9` (Pink Light)
- **Actieve staat:** Categorienaam + 3-4 vraag-chips horizontaal scrollbaar
- **Mobiel:** Chips wrappen naar nieuwe regel of horizontaal scrollen
- **Interactie:** Tap op categorie → modal met alle 7 categorieën
- **Quick action:** Tap op vraag → vult chat input en zet focus

### Modal/Picker Design
- **Titel:** "Waar kan ik je mee helpen?" (Shirley's directe stijl)
- **Layout:** 2x4 grid (3+4) op desktop, 1x7 lijst op mobiel  
- **Elk item:** Icoon + titel + kleur zoals gespecificeerd
- **Sluiten:** X-knop of tap buiten modal

### Technische Data Structure
```javascript
const categories = [
  {
    id: 'voeding-macros',
    title: 'Voeding & Macro\'s',
    color: '#E91E63',
    icon: 'Apple',
    questions: [
      { text: "Ik kom niet aan mijn eiwitten, wat kan ik doen?" },
      { text: "Welke voeding past bij mijn calorie-doel?" },
      // etc...
    ]
  },
  // ... andere categorieën
];
```

---

## Shirley's Tone of Voice per Categorie

### Voeding & Macro's
- "Hupakee, eiwitten zijn cruciaal maar het hoeft niet ingewikkeld!"
- "Geen schema's, gewoon slimme keuzes maken."

### Mindset & Motivatie  
- "Je bent niet zwak, je bent mens."
- "Niet piekeren, gewoon doen!"

### Praktische Tips
- "Simpel houden, dat werkt het beste."
- "Voorbereiding is het halve werk!"

---

*Deze opzet sluit aan bij Shirley's programma-indeling en haar directe, praktische communicatiestijl. De kleuren komen uit je bestaande styleguide en het inline-chips pattern zorgt voor een naadloze gebruikerservaring.*