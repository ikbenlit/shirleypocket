import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import OpenAI from 'openai';
import { ReadableStream, TransformStream } from 'node:stream/web';

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

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        const { messages } = await request.json();
        
        // Voeg de systeem prompt toe aan het begin van de berichten
        const fullMessages = [
            { role: 'system', content: baseSystemPrompt },
            ...messages
        ];
        
        // Roep de OpenAI API aan met streaming ingeschakeld
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: fullMessages,
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
        });

        // Creëer een ReadableStream om chunks door te geven
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of response) {
                        const text = chunk.choices[0]?.delta?.content || '';
                        if (text) {
                            // Stuur de tekst chunk direct door
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                } catch (error) {
                    console.error('Stream error:', error);
                    controller.error(error); // Geef de fout door aan de stream
                } finally {
                    controller.close(); // Sluit de stream als de OpenAI stream klaar is
                }
            },
            cancel() {
                 console.log("Stream cancelled by client.");
            }
        });

        // Stuur de stream terug als response, cast naar any om type conflict op te lossen
        return new Response(stream as any, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Error bij het aanroepen van de OpenAI API:', error);
        return json({ error: 'Er ging iets mis bij het verwerken van je vraag.' }, { status: 500 });
    }
}; 