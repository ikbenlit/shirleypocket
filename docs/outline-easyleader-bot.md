# Outline Easyleader-bot

## 1. Doel van de chatbot
Een digitale coach-assistent voor deelnemers van het Easyleadership-programma die:
- praktische coaching geeft tussen sessies door
- helpt bij het toepassen van het geleerde op casussen uit hun dagelijkse praktijk
- vragen stelt volgens de stijl en methodiek van Easyleadership (denk aan het ABC-model)
- optioneel ook als teaser kan dienen voor niet-deelnemers (met beperkte toegang)

## 2. Doelgroep
- Leidinggevenden die deelnemen aan het Easyleadership-programma
- Mogelijk: geïnteresseerde leidinggevenden die de bot willen uitproberen (3 vragen max)

## 3. Functionaliteit (eerste versie / MVP)
- Vragen beantwoorden op basis van de trainingsinhoud en voorbeeldcasussen
- Vragen stellen die reflectie stimuleren (volgens de methodiek)
- Antwoorden geven in de toon van Yvette / Easyleadership
- Alleen beschikbaar via afgeschermde omgeving (Wix, met login)

### Voorbeelden van vraagtypes
- “Hoe voer ik een gesprek met iemand die weerstand laat zien?”
- “Ik wil het eigenaarschap in mijn team vergroten, hoe pak ik dat aan?”
- “Mijn medewerker maakt steeds dezelfde fout, hoe spreek ik dat aan?”

## 4. Brondata voor training
- Inhoudsdocument Easyleadership-script
- Voorbeeldvragen en -antwoorden (Yvette levert aan)
- Tone-of-voice voorbeelden uit video’s, slides, of webteksten
- Eventueel intakevragen of testresultaten voor persoonlijke context

## 5. Structuur van de bot
- Welkomstbericht: stelt zich voor als Easyleader-bot
- Vraagt optioneel om profiel/context ("Waar werk je aan?", "Wat speelt er?")
- Verwerkt vraag en antwoord via:
  - Eerst: directe match met trainingsinhoud of voorbeeldvragen
  - Dan: gegenereerd antwoord op basis van instructies + tone
- Stimuleert reflectie: “Wat denk jij dat de oorzaak is?”, “Wat heb je al geprobeerd?”

## 6. Technische specificaties (v1)
- Gebouwd op basis van OpenAI API (GPT-4-turbo)
- Frontend via eigen webapp, geïntegreerd in afgeschermde Wix-pagina
- Geen gebruikersdata opslaan zonder toestemming
- Instructies meegeven over tone, context, en informatiebeveiliging

## 7. Mogelijke uitbreidingen (v2 en verder)
- Koppeling aan intakeformulier of werkboek (voor context of profiel)
- Selectie van persona’s of stijlen (bv. “coachend”, “duidelijk”, “structurerend”)
- Resultaten uit Care & Daring-test verwerken in gesprekken
- Chatgeschiedenis of inzicht voor de coach
- Eigen avatar/karakter (Easyleader als persoon)
