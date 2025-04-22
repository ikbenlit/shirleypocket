# 🔐 Authenticatie – Easyleader-bot (Firebase + Vercel)

## 🎯 Doel
Een veilige, toegankelijke en schaalbare manier om deelnemers van het Easyleadership-programma toegang te geven tot de Easyleader-bot, die draait als een webapplicatie op Vercel. Alleen geverifieerde gebruikers mogen de chatbot gebruiken. Eventueel is er een beperkte testmodus voor niet-deelnemers.

## 🧱 Fundamenten
- **Frontend**: Webapp gehost op Vercel (bijv. met SvelteKit of Next.js)
- **Authenticatie**: Firebase Authentication
- **AI-integratie**: OpenAI GPT-4-turbo via server-side API-calls

## 📶 Gebruikersflow
1. Gebruiker bezoekt Easyleader-bot pagina (bijv. `https://bot.easyleadership.app`)
2. Gebruiker wordt doorgestuurd naar de loginpagina indien niet ingelogd
3. Login via e-mail/wachtwoord of magic link (via Firebase Auth)
4. Na succesvolle login wordt een JWT gegenereerd en opgeslagen in geheugen
5. JWT wordt gebruikt bij servercalls richting OpenAI (beveiligd via edge function / backend)
6. Na logout wordt sessie beëindigd (token ongeldig)

## 🔧 Technische Specificaties

### 🔑 Firebase Authentication
- Inloggen via:
  - E-mail + wachtwoord (standaard)
  - Magic link (optioneel, gebruiksvriendelijker)
- JWT wordt automatisch gegenereerd bij login
- ID-token (`auth.currentUser.getIdToken()`) wordt via headers meegegeven naar backend

### 🔁 Backend Validatie (Edge Function / API)
- Backend valideert Firebase-token via Admin SDK:
```ts
import { getAuth } from "firebase-admin/auth"
const decoded = await getAuth().verifyIdToken(token)
```
- Alleen bij succesvolle verificatie wordt de vraag doorgezet naar OpenAI API
- **Keuze:** Gezien de frontend op Vercel draait met SvelteKit, implementeren we deze validatie en API-call logica via een SvelteKit API route (die als Vercel Function deployt) voor betere integratie, in plaats van een aparte Firebase Function.

### 🔐 Beveiliging
- Geen gevoelige info of API-keys in client-side code
- Firebase-project is afgeschermd per domein
- Alleen ingelogde gebruikers kunnen `/chat` of andere protected routes benaderen

### 🔄 Sessiebeheer
- Token wordt client-side bewaard in geheugen of HttpOnly-cookie
- Automatische tokenvernieuwing door Firebase SDK
- Logout verwijdert token en redirect naar loginpagina

## 🧪 Testgebruikers (optioneel)
- Speciale testpagina (bijv. `/demo`) waar maximaal 3 vragen gesteld kunnen worden zonder login, bedoeld voor potentiële klanten of geïnteresseerden die de bot willen uitproberen.
- Deze route is afgeschermd van het hoofdprogramma en heeft beperkte functionaliteit.
- Technisch kan deze pagina ook dienen voor ontwikkel- en testdoeleinden zonder login, bijvoorbeeld in een staging-omgeving.
- Kan later worden verwijderd of uitgebreid met registratie-flow.

## 🛡️ Privacy en AVG
- Er worden geen persoonsgegevens opgeslagen zonder expliciete toestemming
- Token alleen gebruikt voor toegang, niet voor profilering
- Sessiegegevens worden niet permanent opgeslagen

## 🚀 Volgende Stappen
1. Firebase-project aanmaken (https://console.firebase.google.com)
2. Auth-methodes activeren
3. Firebase SDK installeren in frontend (`firebase/app`, `firebase/auth`)
4. Edge Function opzetten om token te valideren + OpenAI-call te doen
5. Protected routing in frontend instellen (route guard of middleware)
6. Test met dummy-gebruiker + demo userflow

---

**Resultaat:** De Easyleader-bot is alleen toegankelijk voor deelnemers die correct zijn ingelogd, veilig geverifieerd en gebruiksvriendelijk via Vercel aangeboden – klaar voor productie of testfase.
