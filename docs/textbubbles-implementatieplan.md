# Plan: Avatar met Tekstbubbles

## Statusoverzicht (laatste update)

- ✅ **Stap 1: Base CSS voor Bubbles** — Geïmplementeerd in src/app.css
- ✅ **Stap 2: AvatarBubble Component** — Geïmplementeerd als AvatarBubble.svelte, gebruikt op 404 en errorpagina
- ✅ **404/Errors: Gebruik van AvatarBubble** — Centraal en in juiste tone of voice
- ⬜ **Stap 3: ChatMessage Component** — Nog niet als losse component aanwezig; chat gebruikt inline divs
- ⬜ **Stap 4: Avatar Logic in Chat Container** — Nog niet geïmplementeerd; avatar wordt niet getoond bij bot-berichten
- ⬜ **Stap 5: Chat Voorbeeld** — Chatinterface gebruikt nog geen AvatarBubble of ChatMessage met avatar

---

## 🎯 Overzicht
Twee componenten bouwen voor avatar + tekstbubble functionaliteit, met focus op herbruikbaarheid en consistente styling.

---

## 📋 Stap-voor-stap Plan

### **Stap 1: Base CSS voor Bubbles**
*Eerst de styling foundation leggen*

```css
/* Suggestie: bubble.css of in je main stylesheet */
.speech-bubble {
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
}

.speech-bubble::before {
  content: '';
  position: absolute;
  width: 0; height: 0;
  border: 8px solid transparent;
  /* Pointer richting afhankelijk van position */
}

.speech-bubble.left::before {
  left: -8px;
  top: 20px;
  border-right-color: white;
}

.speech-bubble.right::before {
  right: -8px;
  top: 20px;
  border-left-color: white;
}
```

### **Stap 2: AvatarBubble Component**
*Voor standalone pagina's (404, login, etc.)*

```svelte
<!-- Suggestie: components/AvatarBubble.svelte -->
<script>
  export let text = "";
  export let position = "left"; // left|right
  export let size = "large"; // large|small
</script>

<div class="avatar-bubble-container {position}">
  {#if position === 'left'}
    <img src="/avatar.png" alt="Avatar" class="avatar {size}" />
    <div class="speech-bubble left">
      {text}
    </div>
  {:else}
    <div class="speech-bubble right">
      {text}
    </div>
    <img src="/avatar.png" alt="Avatar" class="avatar {size}" />
  {/if}
</div>

<style>
  .avatar-bubble-container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    max-width: 400px;
  }
  
  .avatar.large {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .avatar.small {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
```

### **Stap 3: ChatMessage Component**
*Voor chat interface met slimme avatar logic*

```svelte
<!-- Suggestie: components/ChatMessage.svelte -->
<script>
  export let message = "";
  export let sender = "bot"; // bot|user
  export let showAvatar = false; // Expliciet meegeven
</script>

{#if sender === 'bot'}
  <div class="chat-message bot">
    {#if showAvatar}
      <img src="/avatar.png" alt="Bot" class="chat-avatar" />
    {:else}
      <div class="chat-avatar-spacer"></div>
    {/if}
    <div class="speech-bubble chat-style left">
      {message}
    </div>
  </div>
{:else}
  <div class="chat-message user">
    <div class="speech-bubble chat-style right user-bubble">
      {message}
    </div>
  </div>
{/if}

<style>
  .chat-message {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .chat-message.user {
    justify-content: flex-end;
  }
  
  .chat-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .chat-avatar-spacer {
    width: 32px;
    flex-shrink: 0;
  }
  
  .speech-bubble.chat-style {
    max-width: 70%;
    font-size: 14px;
    padding: 8px 12px;
  }
  
  .user-bubble {
    background: #007bff;
    color: white;
  }
</style>
```

### **Stap 4: Avatar Logic in Chat Container**
*Parent component bepaalt wanneer avatar tonen*

```svelte
<!-- Suggestie: in je chat container component -->
<script>
  let messages = [...];
  
  function shouldShowAvatar(message, index) {
    if (message.sender !== 'bot') return false;
    if (index === 0) return true;
    return messages[index - 1].sender !== 'bot';
  }
</script>

<div class="chat-container">
  {#each messages as message, i}
    <ChatMessage 
      message={message.text}
      sender={message.sender}
      showAvatar={shouldShowAvatar(message, i)} 
    />
  {/each}
</div>
```

### **Stap 5: Gebruik Voorbeelden**

```svelte
<!-- 404 Pagina -->
<AvatarBubble 
  text="Whoops, deze pagina bestaat niet!" 
  position="right" 
  size="large" 
/>

<!-- Login Pagina -->
<AvatarBubble 
  text="Welkom terug! Log hier in." 
  position="left" 
  size="small" 
/>

<!-- Chat Interface -->
<ChatContainer {messages} />
```

---

## Voorbeeldgebruik in chatinterface (stap 5)

De chatinterface gebruikt nu de herbruikbare ChatMessage component met avatarlogica:

```svelte
{#each messages as message, i (message.id)}
  <ChatMessage
    message={message.text}
    sender={message.sender}
    showAvatar={message.sender === 'bot' && (i === 0 || messages[i-1].sender !== 'bot')}
  />
{/each}
```

- Avatar wordt getoond bij het eerste botbericht of na een userbericht
- Styling en gedrag zijn volledig in lijn met het plan en de styleguide

---

## 🔄 Herbruikbare AvatarBubble: universele oplossing

Voor maximale flexibiliteit en hergebruik op verschillende plekken (404, login, onboarding, etc.) adviseren we een volledig configureerbare Svelte component:

### Props
- `text: string` — De boodschap in de bubble
- `avatarSrc: string` — Pad naar de gewenste avatar-afbeelding
- `bubblePosition: 'top' | 'top-right' | 'top-left'` — Waar de bubble t.o.v. de avatar staat
- `avatarSize: 'small' | 'medium' | 'large'` — Grootte van de avatar
- `bubbleAlign: 'center' | 'left' | 'right'` — Uitlijning van de bubble

### Voordelen
- Eén component voor alle situaties (404, login, onboarding, etc.)
- Volledig aanpasbaar via props, geen code duplicatie
- Makkelijk te onderhouden en uit te breiden
- Ondersteunt verschillende avatars, teksten en layouts

### Voorbeeldgebruik

```svelte
<!-- 404 Pagina -->
<AvatarBubble
  text="Oeps, deze pagina bestaat niet!"
  avatarSrc="/images/avatar_shirley.webp"
  bubblePosition="top"
  avatarSize="large"
  bubbleAlign="center"
/>

<!-- Login Pagina -->
<AvatarBubble
  text="Welkom terug! Log hier in."
  avatarSrc="/images/avatar_shirley.webp"
  bubblePosition="top-right"
  avatarSize="medium"
  bubbleAlign="right"
/>

<!-- Andere avatar -->
<AvatarBubble
  text="Welkom, admin!"
  avatarSrc="/images/avatar_admin.webp"
  bubblePosition="top"
  avatarSize="large"
  bubbleAlign="center"
/>
```

> **Let op:** Implementeer de positionering van de bubble en het driehoekje met absolute positionering en dynamische CSS, zodat de uitlijning altijd klopt, ongeacht tekstlengte of avatar-grootte.

---

## ⚠️ Integratie Aandachtspunten

### **CSS Conflicts Vermijden**
- Check of je al `.speech-bubble` classes hebt in bestaande CSS
- Gebruik CSS modules of scoped styling als nodig
- Test bubble positioning op verschillende schermformaten
- Zorg dat z-index niet conflicteert met modals/dropdowns

### **Bestaande Chat Interface**
- Kijk naar je huidige message components en styling
- Avatar size moet matchen met je design system
- Spacing/padding consistent houden met bestaande chat
- Check of je al message types hebt (text, image, etc.)

### **Performance**
- Avatar image optimaliseren (WebP, juiste sizes)
- Consider lazy loading als veel messages in chat
- CSS-in-JS vs externe stylesheets afstemmen op project
- Avatar caching implementeren

### **Responsive Design**
- Bubble max-width instellen voor mobiel (bijv. 85% van container)
- Avatar size responsive maken op kleine schermen
- Touch targets groot genoeg houden (min 44px)
- Test op verschillende devices

### **Toegankelijkheid**
- Alt-text voor avatar images
- Proper heading hierarchy als bubble tekst headers bevat
- Keyboard navigation support
- Screen reader friendly markup

---

## 🧪 Test Plan

### **Development Tests**
1. **Standalone test**: AvatarBubble op lege test pagina
2. **Styling test**: Verschillende tekst lengtes en content types
3. **Position test**: Left vs right positioning werkt correct
4. **Avatar logic test**: Chat avatar verschijnt op juiste momenten

### **Integration Tests**
4. **404/Login integratie**: Positionering en styling check in echte pagina's
5. **Chat integratie**: Avatar logic en message flow testen
6. **Responsive test**: Alle belangrijke breakpoints doorlopen
7. **Edge cases**: Lange teksten, emoji's, special characters, HTML in tekst

### **Browser Tests**
8. **Cross-browser**: Chrome, Safari, Firefox, Edge
9. **Mobile browsers**: iOS Safari, Android Chrome
10. **Performance**: Geen layout shifts, smooth animations

---

## 🚀 Deployment Checklist

- [ ] Avatar image geoptimaliseerd en toegevoegd aan assets
- [ ] CSS conflicts getest en opgelost
- [ ] Responsive design getest op alle target devices
- [ ] Toegankelijkheid getest met screen reader
- [ ] Performance impact gemeten (vooral bij veel chat messages)
- [ ] Fallback voor als avatar image niet laadt
- [ ] Documentation voor team over component gebruik

---

**💡 Tip**: Begin met AvatarBubble op een test pagina, dan zie je direct of de CSS goed werkt voordat je chat integration doet. Test ook eerst met placeholder tekst voordat je echte content gebruikt.

# Het doel van dit plan:
### Praktisch doel:

Shirley's avatar een "stem" geven op je website
404-pagina's en login vriendelijker maken
Chat interface persoonlijker maken voor klanten

### Business doel voor jouw klanten:

Hogere engagement (mensen blijven langer op 404 in plaats van weggaan)
Betere user experience = minder support vragen
Consistente "merkpersoonlijkheid" door de hele site

### Voor jouw AI-consultancy:
Toont aandacht voor UX details
Herbruikbare component die je bij andere klanten kunt inzetten