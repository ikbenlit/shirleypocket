<script lang="ts">
  import { marked } from 'marked';
  import type { Tokens } from 'marked';
  
  export let message: string = "";
  export let sender: 'bot' | 'user' = 'bot';
  export let showAvatar: boolean = false;

  // Shirley's custom renderer
  const renderer = new marked.Renderer();
  
  // Custom styling voor Shirley-specifieke uitdrukkingen
  renderer.text = (token: Tokens.Text | Tokens.Escape | Tokens.Tag) => {
    let text = String(token.text ?? '');
    
    // Shirley's karakteristieke uitroepen met emoji en styling
    text = text
      .replace(/Gewoon doen!/gi, '<span class="inline-flex items-center bg-green-200 text-green-800 px-2 py-1 rounded-full font-bold text-sm">✅ Gewoon doen!</span>')
      .replace(/Topper!/gi, '<span class="inline-flex items-center bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-bold text-sm">⭐ Topper!</span>')
      .replace(/Daar gaan we!/gi, '<span class="inline-flex items-center bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-bold text-sm">🏃‍♀️ Daar gaan we!</span>')
      .replace(/Niet piekeren/gi, '<span class="inline-flex items-center bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold text-sm">🧘‍♀️ Niet piekeren</span>');

    // Macro tracking met gekleurde badges
    text = text.replace(/(\d+)g (eiwitten|koolhydraten|vetten)/gi, (match: string, amount: string, macro: string) => {
      const colors: Record<'eiwitten' | 'koolhydraten' | 'vetten', string> = {
        eiwitten: 'bg-red-100 text-red-800 border-red-200',
        koolhydraten: 'bg-blue-100 text-blue-800 border-blue-200', 
        vetten: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      };
      const emojis: Record<'eiwitten' | 'koolhydraten' | 'vetten', string> = {
        eiwitten: '🥚',
        koolhydraten: '🍞',
        vetten: '🥑'
      };
      const macroKey = macro.toLowerCase() as 'eiwitten' | 'koolhydraten' | 'vetten';
      return `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colors[macroKey]}">
        ${emojis[macroKey]} ${amount}g ${macroKey}
      </span>`;
    });

    // Week progress indicators
    text = text.replace(/week (\d+)/gi, (match: string, weekNum: string) => {
      const progress = Math.min((parseInt(weekNum) / 12) * 100, 100); // 12 weken programma
      return `<div class="inline-flex items-center bg-gray-100 rounded-lg px-3 py-1 text-sm">
        <span class="mr-2 font-medium">${match}</span>
        <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-pink-500 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
        </div>
        <span class="ml-2 text-xs text-gray-600">${Math.round(progress)}%</span>
      </div>`;
    });

    return text;
  };
  
  // Custom links voor Academy content met mooie buttons
  renderer.link = function(token: Tokens.Link) {
    const { href, title, text } = token;
    if (text === '[MODULE]' || text === 'MODULE') {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200 font-medium text-sm shadow-sm">
        📚 Ga naar module →
      </a>`;
    }
    if (text === '[CALCULATOR]' || text === 'CALCULATOR') {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm shadow-sm">
        🧮 Open calculator →
      </a>`;
    }
    if (text === '[VIDEO]' || text === 'VIDEO') {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 font-medium text-sm shadow-sm">
        🎥 Bekijk video →
      </a>`;
    }
    if (text === '[WERKBOEK]' || text === 'WERKBOEK') {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm shadow-sm">
        📝 Open werkboek →
      </a>`;
    }
    // Gewone links
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-pink-600 underline hover:text-pink-800 transition-colors">${text}</a>`;
  };

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
    const listClass = ordered ? 'list-decimal' : 'list-disc';
    return `<${ordered ? 'ol' : 'ul'} class="${listClass} ml-4 space-y-1">${itemsHtml}</${ordered ? 'ol' : 'ul'}>`;
  };

  // Custom blockquotes voor motivatie
  renderer.blockquote = function(token: Tokens.Blockquote) {
    // token.text bevat de HTML van de inhoud
    return `<div class="bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-400 p-4 my-4 rounded-r-lg">
      <div class="flex items-start">
        <span class="text-2xl mr-3">💪</span>
        <div class="italic text-gray-700 font-medium">${token.text ?? ''}</div>
      </div>
    </div>`;
  };

  // Configureer marked met custom renderer
  marked.setOptions({ 
    renderer,
    breaks: true,  // Line breaks worden <br>
    gfm: true      // GitHub flavored markdown
  });
  
  // Parse de message alleen voor bot berichten
  $: formattedMessage = sender === 'bot' ? marked(message) : message;
</script>

{#if sender === 'bot'}
  <div class="chat-message flex items-start gap-3 mb-3">
    {#if showAvatar}
      <img src="/images/avatar_shirley.webp" alt="Bot avatar" class="chat-avatar w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0" loading="lazy" />
    {:else}
      <div class="chat-avatar-spacer w-8 md:w-10 flex-shrink-0"></div>
    {/if}
    <div class="speech-bubble left bg-[#FEFEFE] text-black rounded-[16px_16px_16px_4px] max-w-[75%] text-base font-roboto px-4 py-3">
      <div class="prose prose-sm prose-pink max-w-none">
        {@html formattedMessage}
      </div>
    </div>
  </div>
{:else}
  <div class="chat-message flex items-start justify-end gap-3 mb-3">
    <div class="speech-bubble right bg-[#E91E63] text-white rounded-[16px_16px_4px_16px] max-w-[75%] text-base font-roboto px-4 py-3 user-bubble">
      {@html message}
    </div>
  </div>
{/if}

<style>
  /* Custom prose styling voor Shirley's chatbot */
  :global(.prose-pink) {
    --tw-prose-body: #374151;
    --tw-prose-headings: #ec4899;
    --tw-prose-links: #ec4899;
    --tw-prose-bold: #374151; /* Veranderd van roze naar donkergrijs voor betere leesbaarheid */
    --tw-prose-quotes: #6b7280;
    --tw-prose-quote-borders: #ec4899;
  }

  /* Override prose defaults voor chat bubbles */
  :global(.prose p) {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  :global(.prose p:first-child) {
    margin-top: 0;
  }

  :global(.prose p:last-child) {
    margin-bottom: 0;
  }

  /* Maak links in chat berichten mooier */
  :global(.prose a) {
    text-decoration: none;
    font-weight: 500;
  }

  :global(.prose a:hover) {
    text-decoration: underline;
  }

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

  :global(.prose ol li::marker) {
    color: #ec4899; /* Ook genummerde lijsten */
  }

  /* Responsive aanpassingen */
  @media (max-width: 640px) {
    :global(.prose) {
      font-size: 14px;
    }
  }
</style>