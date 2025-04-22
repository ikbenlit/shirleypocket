# SvelteKit Boilerplate

This is a basic boilerplate project for SvelteKit applications, including:

*   SvelteKit (with `@sveltejs/adapter-auto` for flexible deployment)
*   TypeScript
*   Tailwind CSS (with PostCSS and Autoprefixer)
*   ESLint
*   Prettier
*   Vitest for unit testing

## Using This Boilerplate to Start a New Project

1.  **Copy the Boilerplate:**
    Copy all files and folders from this boilerplate directory to a new directory for your project.

2.  **Initialize Git:**
    Navigate to your new project directory in the terminal and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit from boilerplate"
    ```
    *(The original `.git` folder should not be present in the boilerplate copy)*

3.  **Install Dependencies:**
    ```bash
    npm install
    # or yarn install or pnpm install
    ```

4.  **Update `package.json`:**
    Open `package.json` and update the `"name"`, `"version"`, and other relevant fields for your new project.

5.  **Configure Environment Variables:**
    Copy the empty `.env` file to `.env.local` (or edit `.env` directly) and add your project-specific environment variables.

6.  **Start the Development Server:**
    ```bash
    npm run dev
    # or yarn dev or pnpm dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the specified port) in your browser.

---

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run preview`: Runs a local preview of the production build.
*   `npm run check`: Runs Svelte Check to validate types.
*   `npm run lint`: Lints the code using ESLint and Prettier.
*   `npm run format`: Formats the code using Prettier.
*   `npm run test:unit`: Runs unit tests using Vitest.
*   `npm run test`: Runs all tests (currently only unit tests).

## Project Structure

*   `src/`
    *   `lib/`: Contains reusable components, utilities, stores, etc.
        *   `components/`: Svelte components.
        *   `stores/`: Svelte stores.
        *   `utils/`: Utility functions.
        *   `index.ts`: Exports from the lib directory.
    *   `routes/`: Contains the application's routes.
    *   `app.html`: The main HTML template.
    *   `app.css`: Global CSS styles (Tailwind base/components/utilities are imported here).
    *   `app.d.ts`: Ambient type definitions for SvelteKit.
*   `static/`: Static assets (favicon, etc.).
*   `tests/`: Contains test files (though Vitest can find tests alongside code).
*   `svelte.config.js`: SvelteKit configuration.
*   `vite.config.ts`: Vite configuration.
*   `tailwind.config.js`: Tailwind CSS configuration.
*   `postcss.config.js`: PostCSS configuration.
*   `tsconfig.json`: TypeScript configuration.
*   `.eslintrc.cjs`: ESLint configuration.
*   `.prettierrc`: Prettier configuration.

## Customization

*   **Styling:** Modify `tailwind.config.js` and add custom styles to `src/app.css`.
*   **Components:** Add your reusable components to `src/lib/components/`.
*   **Routing:** Add new pages and layouts in the `src/routes/` directory.
*   **Deployment:** The `@sveltejs/adapter-auto` will attempt to detect the deployment environment (Vercel, Netlify, Cloudflare Pages, Node). You can install a specific adapter (e.g., `@sveltejs/adapter-node`) if needed.
