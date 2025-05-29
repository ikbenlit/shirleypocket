import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import OpenAI from 'openai';
import { ReadableStream } from 'node:stream/web';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { OPENAI_API_KEY } from '$env/static/private';
import baseSystemPromptContent from '$lib/server/prompts/chat_baseprompt.md?raw';

// Initialiseer OpenAI client
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// chatbot systeem prompt
const baseSystemPrompt = baseSystemPromptContent;

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
                    controller.error(error);
                } finally {
                    controller.close();
                }
            },
            cancel() {
                 console.log("Stream cancelled by client.");
            }
        });

        // Stuur de stream terug als response
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