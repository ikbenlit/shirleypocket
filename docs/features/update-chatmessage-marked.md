# Technische Implementatie voor ChatMessage Stijlen met Marked

In deze handleiding beschrijven we hoe je de chatberichten in een vergelijkbare chatbot kunt stijlen met behulp van de `marked` bibliotheek en aangepaste renderers, zoals geïmplementeerd in `ChatMessage.svelte`.

## Vereisten
- **SvelteKit**: Zorg ervoor dat je project is opgezet met SvelteKit.
- **Marked**: Installeer de `marked` bibliotheek voor het parsen van Markdown.
- **Tailwind CSS**: Gebruik Tailwind CSS voor styling.
- **@tailwindcss/typography**: Plugin voor rijke tekst styling.

## Stappen

1. **Installeer Marked**
   
   Voeg de `marked` bibliotheek toe aan je project:
   ```bash
   npm install marked
   ```

2. **Maak een Custom Renderer**
   
   In je Svelte component, importeer `marked` en maak een nieuwe renderer aan:
   ```typescript
   import { marked } from 'marked';
   const renderer = new marked.Renderer();
   ```

3. **Definieer Aangepaste Render Methodes**
   
   Voeg aangepaste methodes toe aan de renderer om specifieke stijlen toe te passen:
   
   - **Text**: Vervang specifieke uitdrukkingen door gestylede HTML elementen.
   - **Link**: Stijl links als knoppen voor specifieke tekst zoals `[MODULE]`, `[CALCULATOR]`, etc.
   - **List**: Pas de weergave van lijsten aan, inclusief actie-lijstjes met specifieke styling.
   - **Blockquote**: Stijl blockquotes met een achtergrond en een icoon.

   Voorbeeld:
   ```typescript
   renderer.text = (token) => {
     let text = String(token.text ?? '');
     text = text.replace(/Gewoon doen!/gi, '<span class="inline-flex items-center bg-green-200 text-green-800 px-2 py-1 rounded-full font-bold text-sm">✅ Gewoon doen!</span>');
     return text;
   };
   
   renderer.link = function(token) {
     const { href, text } = token;
     return `<a href="${href}" class="text-pink-600 underline">${text}</a>`;
   };
   ```

4. **Configureer Marked**
   
   Stel `marked` in met de aangepaste renderer en opties:
   ```typescript
   marked.setOptions({
     renderer,
     breaks: true,
     gfm: true
   });
   ```

5. **Integreer in Svelte Component**
   
   Gebruik de `marked` functie om berichten te parsen en te renderen binnen je Svelte component:
   ```svelte
   $: formattedMessage = sender === 'bot' ? marked(message) : message;
   ```

6. **Stijl de Chatberichten**
   
   Gebruik Tailwind CSS om de gestylede HTML elementen verder aan te passen binnen je Svelte component:
   ```css
   :global(.prose-pink) {
     --tw-prose-body: #374151;
     --tw-prose-bold: #374151;
   }
   ```

Volg deze stappen om de chatberichten in je chatbot te stijlen zoals geïmplementeerd in `ChatMessage.svelte`. Pas de stijlen aan naar jouw voorkeuren en zorg ervoor dat de gebruikerservaring consistent en aantrekkelijk is.

## Implementatie van Bullet Points en Lijsten

### 1. Custom List Renderer
Maak een aangepaste renderer voor lijsten die zowel normale lijsten als actie-lijsten ondersteunt:

```typescript
// Custom list rendering voor actie-lijstjes
renderer.list = function(token: Tokens.List) {
  const ordered = token.ordered ?? false;
  const itemsHtml = (token.items ?? [])
    .map(item => {
      // Parse de inhoud van elk lijstitem door de Markdown-parser
      let content = this.parser.parseInline(item.tokens);
      // Handmatig **tekst** vervangen door <strong>tekst</strong> voor vetgedrukte tekst
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<li>${content}</li>`;
    })
    .join('');
}
```

### 2. Speciale Actie-lijsten
Voor lijsten die beginnen met actiewoorden, voegen we speciale styling toe:

```typescript
// Check of het een actie-lijst is (begint met actiewoorden)
if (itemsHtml.includes('Eet ') || itemsHtml.includes('Pak ') || itemsHtml.includes('Ga ') || 
    itemsHtml.includes('Probeer ') || itemsHtml.includes('Maak ') || itemsHtml.includes('Doe ')) {
  return `<div class="bg-blue-50 rounded-lg p-4 my-4 border-l-4 border-blue-400">
    <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
      🎯 <span class="ml-1">Jouw actiepunten:</span>
    </h4>
    <ul class="space-y-2 text-blue-700">${itemsHtml}</ul>
  </div>`;
}
```

### 3. Normale Lijsten
Voor standaard lijsten gebruiken we de basis HTML-tags met aangepaste classes:

```typescript
const listClass = ordered ? 'list-decimal' : 'list-disc';
return `<${ordered ? 'ol' : 'ul'} class="${listClass} ml-4 space-y-1">${itemsHtml}</${ordered ? 'ol' : 'ul'}>`;
```

### 4. CSS Styling voor Bullets
Voeg specifieke styling toe voor de bullet points en lijstopmaak:

```css
/* Styling voor lists in chat */
:global(.prose ul) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

:global(.prose li) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

/* Maak bullets roze */
:global(.prose ul li::marker) {
  color: #ec4899; /* Shirley roze kleur */
}
```

## Resultaat
Deze implementatie zorgt voor:
- Roze bullet points die passen bij de Shirley-stijl
- Speciale opmaak voor actie-lijsten met emoji's
- Correcte weergave van vetgedrukte tekst binnen lijstitems
- Consistente spacing en alignment
- Responsive design binnen chat-bubbels

## Troubleshooting

### Veel Voorkomende Problemen

1. **Vetgedrukte Tekst Niet Zichtbaar**
   - **Probleem**: Markdown `**tekst**` wordt niet correct omgezet
   - **Oplossing**: Gebruik de handmatige regex vervanging in de list renderer

2. **Bullet Kleur Niet Zichtbaar**
   - **Probleem**: CSS `::marker` wordt niet toegepast
   - **Oplossing**: Zorg dat de Tailwind Typography plugin correct is geconfigureerd

3. **Inconsistente Spacing**
   - **Probleem**: Lijsten hebben verschillende margins
   - **Oplossing**: Gebruik consistente spacing classes in de renderer

## Best Practices

1. **Markdown Parsing**
   - Test altijd met verschillende Markdown combinaties
   - Zorg voor fallbacks bij complexe Markdown structuren

2. **Styling**
   - Gebruik Tailwind classes voor consistentie
   - Houd rekening met dark/light mode compatibiliteit
   - Zorg voor goede contrast ratios

3. **Performance**
   - Cache gerenderde Markdown waar mogelijk
   - Vermijd onnodige re-renders van lijsten

## Toekomstige Verbeteringen

- Implementatie van geneste lijsten
- Ondersteuning voor custom bullet styles
- Dynamische actiewoord detectie
- Verbeterde toegankelijkheid voor screenreaders
