import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';

// Initialiseer OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // Optioneel: organization: process.env.OPENAI_ORGANIZATION_ID
});

// Basis systeem prompt voor Easyleader coaching stijl
const baseSystemPrompt = `
Je bent Easyleader-bot, een digitale coach voor leidinggevenden, ontwikkeld door Easyleadership.
Je volgt het ABC-model (Activating event, Belief, Consequence) om reflectie te stimuleren.
Je tone of voice is warm, empathisch en coachend, zoals coach Yvette.

Voor verschillende fases in het gesprek:
- Activating event: "Kun je beschrijven wat er gebeurde?"
- Belief: "Wat dacht je toen dit gebeurde? Wat zei dit over jouw aanpak?"
- Consequence: "Wat was het gevolg voor jou of je team?"

Je stelt reflectieve vragen en geeft praktische tips voor leiderschapssituaties.
Je bent specifiek getraind in:
- Moeilijke gesprekken voeren
- Teams motiveren
- Conflicten oplossen

Je antwoorden zijn kort en krachtig, en je moedigt zelfreflectie aan.
`;

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { messages } = await request.json();
        
        // Voeg de systeem prompt toe aan het begin van de berichten
        const fullMessages = [
            { role: 'system', content: baseSystemPrompt },
            ...messages
        ];
        
        // Roep de OpenAI API aan
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: fullMessages,
            temperature: 0.7, // Iets creatief maar grotendeels consistent
            max_tokens: 500,  // Beperk lengte voor snellere reacties
        });

        // Stuur het antwoord terug
        return json({
            message: completion.choices[0].message,
            usage: completion.usage
        });
    } catch (error) {
        console.error('Error bij het aanroepen van de OpenAI API:', error);
        return json({ error: 'Er ging iets mis bij het verwerken van je vraag.' }, { status: 500 });
    }
}; 