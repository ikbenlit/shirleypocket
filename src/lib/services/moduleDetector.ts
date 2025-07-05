import type { ModuleInfo, ModuleDetectionResult, ModuleSearchOptions, ContextualModuleResult, ConversationContext } from '../types/chat';
import { loadModuleData, getAllModules } from '../utils/moduleLoader';
import { KeywordProcessor } from '../utils/keywordProcessor';
import { ContextManager } from '../utils/contextManager';

/**
 * Service for detecting relevant modules based on user queries
 */
export class ModuleDetector {
  private moduleData: ModuleInfo[];
  private stopWords: Set<string>;
  private keywordProcessor: KeywordProcessor;
  private moduleKeywordIndex: Map<string, Array<{ word: string; weight: number }>>;
  private contextManager: ContextManager;

  constructor() {
    const data = loadModuleData();
    this.moduleData = getAllModules(data);
    this.keywordProcessor = new KeywordProcessor();
    this.moduleKeywordIndex = new Map();
    this.contextManager = new ContextManager();
    
    // Common Dutch stop words to filter out during matching
    this.stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'te', 'dat', 'die', 'in', 'voor', 'op', 'met', 'als', 'zijn',
      'er', 'maar', 'om', 'had', 'aan', 'bij', 'nog', 'kan', 'wat', 'zou', 'nu', 'naar', 'toe',
      'ik', 'je', 'mijn', 'zijn', 'haar', 'onze', 'jullie', 'hun', 'deze', 'dit', 'die', 'dat',
      'is', 'was', 'ben', 'bent', 'zijn', 'heeft', 'hebben', 'heb', 'hebt', 'had', 'hadden',
      'wordt', 'worden', 'werd', 'werden', 'zal', 'zullen', 'zou', 'zouden', 'kan', 'kunnen',
      'moet', 'moeten', 'mag', 'mogen', 'wil', 'willen', 'ga', 'gaan', 'kom', 'komen',
      'hoe', 'wat', 'waar', 'wanneer', 'waarom', 'wie', 'welke', 'zoals', 'omdat', 'dus',
      'over', 'onder', 'tussen', 'door', 'tegen', 'zonder', 'binnen', 'buiten', 'vanaf'
    ]);

    // Pre-build keyword index for all modules
    this.buildKeywordIndex();
  }

  /**
   * Builds keyword index for all modules for faster matching
   */
  private buildKeywordIndex(): void {
    for (const module of this.moduleData) {
      const allTopicsText = module.topics.join(' ');
      const weightedKeywords = this.keywordProcessor.extractWeightedKeywords(allTopicsText);
      this.moduleKeywordIndex.set(module.id, weightedKeywords);
    }
  }

  /**
   * Detects relevant modules with context awareness (Enhanced)
   */
  public detectRelevantModules(userQuery: string, options?: ModuleSearchOptions): ModuleDetectionResult[] {
    // If context is provided, use context-aware detection
    if (options?.context) {
      return this.detectContextualModules(userQuery, options);
    }

    // Fallback to standard detection
    const queryKeywords = this.keywordProcessor.extractWeightedKeywords(userQuery);
    
    if (queryKeywords.length === 0) {
      return [];
    }

    const results: ModuleDetectionResult[] = [];

    for (const module of this.moduleData) {
      // Skip modules based on search options
      if (options?.category && module.category !== options.category) {
        continue;
      }

      const relevanceScore = this.calculateEnhancedRelevanceScore(queryKeywords, module);
      
      if (relevanceScore > 0 && (!options?.minRelevanceScore || relevanceScore >= options.minRelevanceScore)) {
        const matchedTopics = this.findEnhancedMatchedTopics(queryKeywords, module);
        
        results.push({
          module,
          relevanceScore,
          matchedTopics
        });
      }
    }

    const prioritizedResults = this.prioritizeModules(results);
    
    // Apply max results limit
    if (options?.maxResults) {
      return prioritizedResults.slice(0, options.maxResults);
    }
    
    return prioritizedResults;
  }

  /**
   * Context-aware module detection
   */
  public detectContextualModules(userQuery: string, options: ModuleSearchOptions): ContextualModuleResult[] {
    const queryKeywords = this.keywordProcessor.extractWeightedKeywords(userQuery);
    
    if (queryKeywords.length === 0) {
      return [];
    }

    const results: ContextualModuleResult[] = [];
    const context = options.context!;

    for (const module of this.moduleData) {
      // Skip modules based on search options
      if (options.category && module.category !== options.category) {
        continue;
      }

      const baseRelevanceScore = this.calculateEnhancedRelevanceScore(queryKeywords, module);
      
      if (baseRelevanceScore > 0) {
        // Apply context boost
        const { boost, reason } = this.contextManager.calculateCategoryBoost(module.category, context);
        const contextualScore = Math.min(baseRelevanceScore * boost, 1.0);
        
        if (contextualScore >= (options.minRelevanceScore || 0)) {
          const matchedTopics = this.findEnhancedMatchedTopics(queryKeywords, module);
          
          results.push({
            module,
            relevanceScore: contextualScore,
            matchedTopics,
            contextBoost: boost,
            contextReason: reason
          });
        }
      }
    }

    // Sort by contextual score
    const prioritizedResults = results.sort((a, b) => {
      // Primary sort: contextual relevance score
      if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.05) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      // Secondary sort: context boost
      if (Math.abs(a.contextBoost - b.contextBoost) > 0.1) {
        return b.contextBoost - a.contextBoost;
      }
      
      // Tertiary sort: module weight
      if (a.module.weight !== b.module.weight) {
        return b.module.weight - a.module.weight;
      }
      
      return b.matchedTopics.length - a.matchedTopics.length;
    });
    
    // Apply max results limit
    if (options.maxResults) {
      return prioritizedResults.slice(0, options.maxResults);
    }
    
    return prioritizedResults;
  }

  /**
   * Calculates enhanced relevance score using keyword processor
   */
  public calculateEnhancedRelevanceScore(
    queryKeywords: Array<{ word: string; weight: number }>, 
    module: ModuleInfo
  ): number {
    const moduleKeywords = this.moduleKeywordIndex.get(module.id);
    if (!moduleKeywords) {
      return 0;
    }

    let totalScore = 0;
    let matchCount = 0;
    let weightedQueryTotal = 0;

    for (const queryKeyword of queryKeywords) {
      weightedQueryTotal += queryKeyword.weight;
      let bestMatchScore = 0;

      for (const moduleKeyword of moduleKeywords) {
        const similarity = this.keywordProcessor.calculateEnhancedSimilarity(
          queryKeyword.word, 
          moduleKeyword.word
        );

        if (similarity > 0.6) {
          // Weight the similarity by both query and module keyword weights
          const weightedSimilarity = similarity * queryKeyword.weight * moduleKeyword.weight;
          bestMatchScore = Math.max(bestMatchScore, weightedSimilarity);
        }
      }

      if (bestMatchScore > 0) {
        totalScore += bestMatchScore;
        matchCount++;
      }
    }

    if (matchCount === 0) {
      return 0;
    }

    // Calculate base score as weighted average
    const baseScore = totalScore / weightedQueryTotal;
    
    // Apply module weight multiplier (normalized to 0-1 range)
    const weightMultiplier = module.weight / 10;
    
    // Coverage bonus: how many query terms were matched
    const coverageBonus = matchCount / queryKeywords.length;
    
    return Math.min(baseScore * weightMultiplier * (1 + coverageBonus * 0.4), 1);
  }

  /**
   * Legacy method for backward compatibility
   */
  public calculateRelevanceScore(queryWords: string[], module: ModuleInfo): number {
    let totalScore = 0;
    let matchCount = 0;

    // Normalize module topics for comparison
    const normalizedTopics = module.topics.map(topic => this.normalizeQuery(topic));
    
    for (const queryWord of queryWords) {
      let bestWordScore = 0;
      
      for (const topic of normalizedTopics) {
        const topicWords = this.extractKeywords(topic);
        
        for (const topicWord of topicWords) {
          const similarity = this.calculateWordSimilarity(queryWord, topicWord);
          
          if (similarity > bestWordScore) {
            bestWordScore = similarity;
          }
        }
      }
      
      if (bestWordScore > 0.6) { // Threshold for considering a match
        totalScore += bestWordScore;
        matchCount++;
      }
    }

    if (matchCount === 0) {
      return 0;
    }

    // Calculate base score as average similarity
    const baseScore = totalScore / queryWords.length;
    
    // Apply module weight as multiplier (normalized to 0-1 range)
    const weightMultiplier = module.weight / 10;
    
    // Boost score if many query words match
    const coverageBonus = matchCount / queryWords.length;
    
    return Math.min(baseScore * weightMultiplier * (1 + coverageBonus * 0.3), 1);
  }

  /**
   * Prioritizes modules based on relevance score and weight
   */
  public prioritizeModules(modules: ModuleDetectionResult[]): ModuleDetectionResult[] {
    return modules.sort((a, b) => {
      // Primary sort: relevance score (descending)
      if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.05) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      // Secondary sort: module weight (descending)
      if (a.module.weight !== b.module.weight) {
        return b.module.weight - a.module.weight;
      }
      
      // Tertiary sort: number of matched topics (descending)
      return b.matchedTopics.length - a.matchedTopics.length;
    });
  }

  /**
   * Enhanced method to find which topics matched the query
   */
  private findEnhancedMatchedTopics(
    queryKeywords: Array<{ word: string; weight: number }>, 
    module: ModuleInfo
  ): string[] {
    const matchedTopics: string[] = [];
    
    for (const topic of module.topics) {
      const topicKeywords = this.keywordProcessor.extractWeightedKeywords(topic);
      
      let hasMatch = false;
      for (const queryKeyword of queryKeywords) {
        for (const topicKeyword of topicKeywords) {
          const similarity = this.keywordProcessor.calculateEnhancedSimilarity(
            queryKeyword.word, 
            topicKeyword.word
          );
          
          if (similarity > 0.6) {
            hasMatch = true;
            break;
          }
        }
        if (hasMatch) break;
      }
      
      if (hasMatch && !matchedTopics.includes(topic)) {
        matchedTopics.push(topic);
      }
    }
    
    return matchedTopics;
  }

  /**
   * Legacy method for backward compatibility
   */
  private findMatchedTopics(queryWords: string[], module: ModuleInfo): string[] {
    const matchedTopics: string[] = [];
    const normalizedTopics = module.topics.map(topic => this.normalizeQuery(topic));
    
    for (let i = 0; i < module.topics.length; i++) {
      const topic = module.topics[i];
      const normalizedTopic = normalizedTopics[i];
      const topicWords = this.extractKeywords(normalizedTopic);
      
      let hasMatch = false;
      for (const queryWord of queryWords) {
        for (const topicWord of topicWords) {
          if (this.calculateWordSimilarity(queryWord, topicWord) > 0.6) {
            hasMatch = true;
            break;
          }
        }
        if (hasMatch) break;
      }
      
      if (hasMatch && !matchedTopics.includes(topic)) {
        matchedTopics.push(topic);
      }
    }
    
    return matchedTopics;
  }

  /**
   * Normalizes query string for comparison
   */
  private normalizeQuery(query: string): string {
    return query
      .toLowerCase()
      .trim()
      // Remove punctuation
      .replace(/[.,!?;:()[\]{}""'']/g, ' ')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Remove common contractions
      .replace(/\b(m'n|'t|'s|'k|'r)\b/g, '');
  }

  /**
   * Extracts meaningful keywords from text
   */
  private extractKeywords(text: string): string[] {
    return text
      .split(' ')
      .filter(word => word.length > 2 && !this.stopWords.has(word))
      .filter(word => word.trim().length > 0);
  }

  /**
   * Calculates similarity between two words
   */
  private calculateWordSimilarity(word1: string, word2: string): number {
    // Exact match
    if (word1 === word2) {
      return 1.0;
    }
    
    // Contains match (one word contains the other)
    if (word1.includes(word2) || word2.includes(word1)) {
      const longer = word1.length > word2.length ? word1 : word2;
      const shorter = word1.length <= word2.length ? word1 : word2;
      return shorter.length / longer.length * 0.9;
    }
    
    // Levenshtein distance for similar words
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    const similarity = 1 - (distance / maxLength);
    
    // Only consider it a match if similarity is above threshold
    return similarity > 0.7 ? similarity * 0.8 : 0;
  }

  /**
   * Calculates Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Gets all available modules
   */
  public getAllModules(): ModuleInfo[] {
    return [...this.moduleData];
  }

  /**
   * Gets modules by category
   */
  public getModulesByCategory(categoryId: string): ModuleInfo[] {
    return this.moduleData.filter(module => module.category === categoryId);
  }

  /**
   * Gets module by ID
   */
  public getModuleById(moduleId: string): ModuleInfo | undefined {
    return this.moduleData.find(module => module.id === moduleId);
  }

  /**
   * Creates conversation context from message history
   */
  public createContext(
    messageHistory: string[],
    currentCategory?: string,
    userPreferences?: any
  ): ConversationContext {
    return this.contextManager.createContextFromHistory(messageHistory, currentCategory, userPreferences);
  }

  /**
   * Updates existing context with new message
   */
  public updateContext(context: ConversationContext, newMessage: string): ConversationContext {
    return this.contextManager.updateContext(context, newMessage);
  }

  /**
   * Gets context manager for advanced operations
   */
  public getContextManager(): ContextManager {
    return this.contextManager;
  }
}