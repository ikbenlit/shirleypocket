# Shirley Chatbot – Afvallen doe je zo

De Shirley Chatbot is een digitale coach voor deelnemers aan het programma "Afvallen doe je zo". De bot geeft 24/7 praktische, motiverende en programma-conforme antwoorden op vragen over voeding en mindset, in Shirley's directe stijl. De chatbot verwijst door naar relevante modules, video's en werkboeken binnen de Online Academy.

## Belangrijkste Features

*   **Chat Interface:** Direct chatten met Shirley's AI-coach.
*   **Voedings- en mindsetadvies:** Antwoorden in Shirley's stem, altijd praktisch en motiverend.
*   **Doorverwijzingen:** Links naar caloriecalculator, modules, video's en werkboeken.
*   **Privacy:** Geen opslag van persoonlijke data, alleen sessie-informatie.
*   **Authenticatie:** Veilige login voor gebruikers (via Firebase).

## Technologie Stack

*   **Frontend:** SvelteKit, TypeScript
*   **Styling:** Tailwind CSS
*   **AI:** OpenAI API (GPT-4 Turbo)
*   **Authenticatie:** Firebase Authentication
*   **Deployment:** Vercel (met `@sveltejs/adapter-vercel`)
*   **Linting/Formatting:** ESLint, Prettier
*   **Testing:** Vitest

## Getting Started

### Vereisten

*   Node.js (laatste LTS aanbevolen)
*   npm, yarn of pnpm

### Installatie

1.  **Clone de repository:**
    ```powershell
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Installeer dependencies:**
    ```powershell
    npm install
    # of yarn install / pnpm install
    ```

### Omgevingsvariabelen (Environment Variables)

Maak een `.env` bestand aan in de root van het project. Zie `docs/01-pocket-shirley-technische-eisen.md` voor de benodigde variabelen. Voorbeeld:

```env
# Firebase Configuratie (gebruik VITE_ prefix voor client-side variabelen)
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."

# OpenAI API Key (server-side only, geen VITE_ prefix)
OPENAI_API_KEY="..."
```

**Let op:** Voeg nooit je `.env` bestand toe aan Git.

## Applicatie Draaien

Start de development server:

```powershell
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in je browser.

## Beschikbare Scripts

*   `npm run dev`: Start de development server.
*   `npm run build`: Bouwt de applicatie voor productie.
*   `npm run preview`: Draait een lokale preview van de productie build.
*   `npm run check`: Voert Svelte Check uit om types te valideren.
*   `npm run lint`: Lint de code met ESLint en Prettier.
*   `npm run format`: Formatteert de code met Prettier.
*   `npm run test:unit`: Voert unit tests uit met Vitest.
*   `npm run test`: Voert alle tests uit.

## Documentatie

Zie de map [`docs/`](./docs) voor:
- Projectbeschrijving en requirements (`00-pocket-schirley-prd.md`)
- Technische eisen (`01-pocket-shirley-technische-eisen.md`)
- Functionele eisen (`02-pocket-shirley-functionele-eisen.md`)
- Stijl en tone-of-voice (`03-shirley-bot-styleguide.md`)
- Migratieplan (`08-shirley-migratieplan.md`)

## Roadmap

Zie het migratieplan en de PRD voor toekomstige uitbreidingen zoals contextbewustzijn, gebruikersprofielen, notificaties en dashboard.
