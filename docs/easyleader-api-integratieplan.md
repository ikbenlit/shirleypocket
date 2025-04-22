## 7. 🔗 API & Integratieplan
**Doel:** Wat koppelen we, hoe en wanneer?

**Inhoud:**
- API’s en endpoints
- Authenticatie
- Webhooks of sync

```markdown
### 🧠 AI Integratie
API: OpenAI GPT-4-turbo
Endpoint: https://api.openai.com/v1/chat/completions
Headers:
  - Authorization: Bearer <API_KEY>
  - Content-Type: application/json
Authenticatie: API-key via veilige omgeving (niet client-side zichtbaar)

### 💬 Frontend Integratie
Embed: via iframe of custom script op Wix
Inbedding: beveiligde pagina achter login voor deelnemers
Context meegeven via hidden inputs of local storage (bv. gebruikersprofiel)

### 📩 Optionele Integraties (v2+)
- SendGrid of Postmark → voor fallback naar e-mail bij storing
- Google Sheets of Notion API → logging van anonieme vragen
- Care & Daring-test resultaat → via import of koppeling voor persoonlijke input

### 🔁 Webhooks / Sync (optioneel, later)
- Inzichten delen met coach via e-mail of dashboard
- Webhook bij start / einde gesprek (bijv. voor tracking)
```