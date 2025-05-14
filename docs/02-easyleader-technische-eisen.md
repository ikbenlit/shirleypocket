### ⚡ Performance
- [x] Laadtijd van chatbotinterface < 2 seconden bij normaal gebruik
- [x] Reactietijd per prompt < 3 seconden (gemiddeld)
- [x] Chatgeschiedenis wordt lokaal of tijdelijk opgeslagen (geen backend nodig in MVP)
- [x] Gebruikt efficiënte API-aanroepen via OpenAI GPT-4-turbo

### 🚫 Offline gedrag
- [x] Gebruiksvriendelijke foutmelding bij geen verbinding (bijv. “Ik ben even offline. Probeer het zo weer!”)
- [ ] Optioneel: formulier tonen om vraag alsnog in te dienen via e-mail

### 📈 Schaalbaarheid
- [x] Frontend draait onafhankelijk en schaalbaar (bijv. via Wix-embed of externe app)
- [x] Backend/API gebruikt schaalbare infrastructuur (OpenAI, geen stateful server nodig)
- [ ] Eventuele logging kan eenvoudig worden opgeschaald met tools als Logtail of Vercel Analytics

### 📱 Mobielvriendelijkheid
- [x] Volledig responsive design (zowel staand als liggend op mobiel)
- [x] Toegankelijk op smartphones, tablets en desktops
- [x] Grote, goed klikbare knoppen en voldoende spacing op mobiel

### ♿ Toegankelijkheid
- [x] Contrasten voldoen aan WCAG AA-richtlijnen
- [x] Alternatieve tekst voor iconen/avatars (indien gebruikt)
- [ ] Toetsenbordnavigatie ondersteund (vanaf v2)
- [ ] Screenreader-ondersteuning optioneel bij latere uitbreiding
