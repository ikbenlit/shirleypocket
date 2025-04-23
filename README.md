# Easyleader-bot

Easyleader-bot is een digitale coach applicatie, ontwikkeld voor Easyleadership, die leidinggevenden ondersteunt bij hun ontwikkeling. De bot maakt gebruik van het ABC-model (Activating event, Belief, Consequence) om reflectie te stimuleren en biedt een veilige omgeving om te oefenen met leiderschapssituaties zoals moeilijke gesprekken.

## Belangrijkste Features

*   **Chat Interface:** Interactieve chat met de AI-coach.
*   **ABC-Model Coaching:** Gestructureerde gesprekken volgens het ABC-model.
*   **Reflectieve Vragen:** Stimuleert zelfinzicht en ontwikkeling.
*   **Praktische Tips:** Biedt concrete handvatten voor leiderschapssituaties.
*   **Authenticatie:** Veilige login voor gebruikers (via Firebase).

## Technologie Stack

*   **Frontend:** SvelteKit, TypeScript
*   **Styling:** Tailwind CSS
*   **AI:** OpenAI API (GPT-4 Turbo)
*   **Authenticatie:** Firebase Authentication
*   **Deployment:** Vercel (geconfigureerd met `@sveltejs/adapter-vercel`)
*   **Linting/Formatting:** ESLint, Prettier
*   **Testing:** Vitest

## Getting Started

### Vereisten

*   Node.js (versie aanbevolen in `.nvmrc` of nieuwste LTS)
*   npm, yarn, of pnpm

### Installatie

1.  **Clone de repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Installeer dependencies:**
    ```bash
    npm install
    # of yarn install / pnpm install
    ```

### Omgevingsvariabelen (Environment Variables)

Maak een `.env` bestand aan in de root van het project door `.env.example` (indien aanwezig) te kopiëren of door het handmatig aan te maken. Voeg de volgende variabelen toe:

```env
# Firebase Configuratie (verkrijg deze uit je Firebase project console)
# Let op: Gebruik VITE_ prefix voor client-side variabelen
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"

# OpenAI API Key (server-side only, geen VITE_ prefix)
OPENAI_API_KEY="your_openai_api_key"
```

**Belangrijk:** Voeg nooit je `.env` bestand toe aan Git.

## Applicatie Draaien

Start de development server:

```bash
npm run dev
# of yarn dev / pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) (of de getoonde poort) in je browser.

## Beschikbare Scripts

*   `npm run dev`: Start de development server.
*   `npm run build`: Bouwt de applicatie voor productie.
*   `npm run preview`: Draait een lokale preview van de productie build.
*   `npm run check`: Voert Svelte Check uit om types te valideren.
*   `npm run lint`: Lint de code met ESLint en Prettier.
*   `npm run format`: Formatteert de code met Prettier.
*   `npm run test:unit`: Voert unit tests uit met Vitest.
*   `npm run test`: Voert alle tests uit.

## Deployment

De applicatie is geconfigureerd om te deployen naar Vercel met behulp van `@sveltejs/adapter-vercel`.
