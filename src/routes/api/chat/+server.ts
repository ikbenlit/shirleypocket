import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import OpenAI from 'openai';
import { ReadableStream } from 'node:stream/web';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { OPENAI_API_KEY } from '$env/static/private';
import baseSystemPromptContent from '$lib/server/prompts/chat_baseprompt.md?raw';
import { ModuleDetector } from '$lib/services/moduleDetector';
import { PromptEnhancer } from '$lib/services/promptEnhancer';
import { ContextManager } from '$lib/utils/contextManager';
import { ModuleCache } from '$lib/utils/moduleCache';
import { PerformanceMonitor } from '$lib/utils/performanceMonitor';
import { CircuitBreaker } from '$lib/utils/circuitBreaker';

// Initialiseer OpenAI client
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// chatbot systeem prompt
const baseSystemPrompt = baseSystemPromptContent;

// Initialiseer Module services
const moduleDetector = new ModuleDetector();
const promptEnhancer = new PromptEnhancer();
const contextManager = new ContextManager();
const moduleCache = new ModuleCache(100, 5 * 60 * 1000); // 100 entries, 5 min expiry
const performanceMonitor = new PerformanceMonitor();
const circuitBreaker = new CircuitBreaker({
    failureThreshold: 5,
    recoveryTimeMs: 60000, // 1 minute
    timeoutMs: 100
});

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        const { messages, currentCategory = null, userPreferences = null } = await request.json();
        
        // Enhanced prompt met module context
        let enhancedSystemPrompt = baseSystemPrompt;
        
        // Extracteer laatste user message voor module detection
        const lastUserMessage = messages
            .filter((msg: any) => msg.role === 'user')
            .slice(-1)[0]?.content || '';
        
        if (lastUserMessage.trim()) {
            const contextTimingId = performanceMonitor.startTiming('context-creation');
            
            try {
                // Bouw conversatie context
                const messageHistory = messages
                    .filter((msg: any) => msg.role === 'user')
                    .map((msg: any) => msg.content)
                    .slice(-5); // Laatste 5 user messages voor context
                
                const conversationContext = contextManager.createContextFromHistory(
                    messageHistory,
                    currentCategory,
                    userPreferences
                );
                
                performanceMonitor.endTiming(contextTimingId, true);
                
                // Check cache first
                const cacheTimingId = performanceMonitor.startTiming('cache-lookup');
                const cachedModules = moduleCache.get(lastUserMessage, conversationContext);
                performanceMonitor.endTiming(cacheTimingId, true);
                
                let relevantModules = cachedModules;
                
                if (!cachedModules) {
                    // Cache miss - perform module detection
                    const detectionTimingId = performanceMonitor.startTiming('module-detection');
                    
                    try {
                        // Use circuit breaker for module detection
                        relevantModules = await circuitBreaker.execute(
                            async () => {
                                return await moduleDetector.detectContextualModules(lastUserMessage, {
                                    context: conversationContext,
                                    maxResults: 4,
                                    minRelevanceScore: 0.1
                                });
                            },
                            () => {
                                // Fallback: try basic detection
                                console.log('Circuit breaker fallback: using basic module detection');
                                return moduleDetector.detectRelevantModules(lastUserMessage, { maxResults: 2 });
                            }
                        );
                        
                        performanceMonitor.endTiming(detectionTimingId, true);
                        
                        // Cache the results
                        if (relevantModules && relevantModules.length > 0) {
                            const cacheStoreTimingId = performanceMonitor.startTiming('cache-store');
                            moduleCache.set(lastUserMessage, relevantModules, conversationContext);
                            performanceMonitor.endTiming(cacheStoreTimingId, true);
                        }
                        
                    } catch (detectionError) {
                        performanceMonitor.endTiming(detectionTimingId, false);
                        throw detectionError;
                    }
                }
                
                // Enhance systeem prompt met module context
                if (relevantModules && relevantModules.length > 0) {
                    const enhancementTimingId = performanceMonitor.startTiming('prompt-enhancement');
                    
                    try {
                        // Infer primary category for template
                        const primaryCategory = conversationContext.currentCategory || 
                            contextManager.inferPrimaryCategory(relevantModules.map(r => r.module));
                        
                        enhancedSystemPrompt = promptEnhancer.injectModuleContext(
                            baseSystemPrompt,
                            relevantModules,
                            lastUserMessage,
                            { 
                                template: primaryCategory ? 'contextual' : 'detailed',
                                maxModules: 3,
                                contextNote: conversationContext.sessionTopics.length > 0 
                                    ? `Conversatie context: ${conversationContext.sessionTopics.slice(0, 3).join(', ')}`
                                    : undefined,
                                categoryName: primaryCategory
                            }
                        );
                        
                        performanceMonitor.endTiming(enhancementTimingId, true);
                        
                    } catch (enhancementError) {
                        performanceMonitor.endTiming(enhancementTimingId, false);
                        throw enhancementError;
                    }
                }
                
            } catch (error) {
                performanceMonitor.endTiming(contextTimingId, false);
                console.warn('Context-aware module detection failed, trying basic detection:', error);
                
                // Fallback naar basic module detection
                const fallbackTimingId = performanceMonitor.startTiming('fallback-detection');
                
                try {
                    const relevantModules = await Promise.race([
                        moduleDetector.detectRelevantModules(lastUserMessage, { maxResults: 3 }),
                        new Promise((_, reject) => setTimeout(() => reject(new Error('Fallback timeout')), 50))
                    ]);
                    
                    if (relevantModules && relevantModules.length > 0) {
                        enhancedSystemPrompt = promptEnhancer.injectModuleContext(
                            baseSystemPrompt,
                            relevantModules,
                            lastUserMessage,
                            { template: 'quick', maxModules: 2 }
                        );
                    }
                    
                    performanceMonitor.endTiming(fallbackTimingId, true);
                    
                } catch (fallbackError) {
                    performanceMonitor.endTiming(fallbackTimingId, false);
                    console.warn('All module detection failed, using base prompt:', fallbackError);
                }
            }
        }
        
        // Debug logging voor development
        if (process.env.NODE_ENV === 'development') {
            console.log('=== Chat API Debug ===');
            console.log('User query:', lastUserMessage.substring(0, 100) + '...');
            console.log('Enhanced prompt length:', enhancedSystemPrompt.length);
            console.log('Base prompt contains Module 3?', baseSystemPrompt.includes('Module 3'));
            console.log('Enhanced prompt contains Module 3?', enhancedSystemPrompt.includes('Module 3'));
            console.log('Context params:', { currentCategory, userPreferences });
            
            // Performance metrics
            const metrics = performanceMonitor.getAllMetrics();
            if (Object.keys(metrics).length > 0) {
                console.log('Performance metrics:', JSON.stringify(metrics, null, 2));
            }
            
            // Cache stats
            const cacheStats = moduleCache.getStats();
            console.log('Cache stats:', cacheStats);
            
            // Circuit breaker status
            const circuitState = circuitBreaker.getState();
            console.log('Circuit breaker state:', circuitState);
            console.log('=== End Debug ===');
        }
        
        // Voeg de enhanced systeem prompt toe aan het begin van de berichten
        const fullMessages = [
            { role: 'system', content: enhancedSystemPrompt },
            ...messages
        ];
        
        // Roep de OpenAI API aan met streaming ingeschakeld
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: fullMessages,
            temperature: 0.7,
            stream: true
        });

        // Creëer een ReadableStream om chunks door te geven
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let isFirstChunk = true;
                try {
                    for await (const chunk of response) {
                        if (isFirstChunk) {
                            // Stuur het model als eerste stukje data
                            if (chunk.model) {
                                controller.enqueue(encoder.encode(JSON.stringify({ type: 'model', model: chunk.model }) + '\n'));
                            }
                            isFirstChunk = false;
                        }
                        const text = chunk.choices[0]?.delta?.content || '';
                        if (text) {
                            // Stuur de tekst chunk door
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