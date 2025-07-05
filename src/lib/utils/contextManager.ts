import type { ConversationContext, UserPreferences } from '../types/chat';
import { loadModuleData } from './moduleLoader';

/**
 * Manages conversation context for better module detection
 */
export class ContextManager {
  private maxHistoryLength: number = 5;
  private topicDecayFactor: number = 0.8; // How much topic importance decreases over time

  constructor() {}

  /**
   * Analyzes message history to extract relevant topics
   */
  public extractSessionTopics(messageHistory: string[]): string[] {
    if (!messageHistory || messageHistory.length === 0) {
      return [];
    }

    const topicFrequency: Map<string, { count: number; lastSeen: number }> = new Map();
    const keyTopics = new Set([
      'eiwitten', 'koolhydraten', 'vetten', 'calorieën', 'afvallen', 'overgang',
      'sport', 'slaap', 'stress', 'honger', 'gewicht', 'stoelgang', 'macro'
    ]);

    // Analyze each message for key topics
    messageHistory.forEach((message, index) => {
      const normalizedMessage = message.toLowerCase();
      const words = normalizedMessage.split(/\s+/);
      
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?;:()[\]{}""'']/g, '');
        
        if (keyTopics.has(cleanWord) || this.isRelatedTopic(cleanWord)) {
          const existing = topicFrequency.get(cleanWord);
          if (existing) {
            existing.count++;
            existing.lastSeen = index;
          } else {
            topicFrequency.set(cleanWord, { count: 1, lastSeen: index });
          }
        }
      });
    });

    // Score topics based on frequency and recency
    const scoredTopics = Array.from(topicFrequency.entries())
      .map(([topic, data]) => {
        const recencyBoost = Math.pow(this.topicDecayFactor, messageHistory.length - 1 - data.lastSeen);
        const score = data.count * recencyBoost;
        return { topic, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Top 5 topics
      .map(item => item.topic);

    return scoredTopics;
  }

  /**
   * Determines category boost based on conversation context
   */
  public calculateCategoryBoost(
    moduleCategory: string, 
    context: ConversationContext
  ): { boost: number; reason: string } {
    let boost = 1.0;
    let reason = 'no context';

    // Current category match
    if (context.currentCategory && context.currentCategory === moduleCategory) {
      boost *= 1.5;
      reason = `matches current category: ${context.currentCategory}`;
    }

    // User preferences
    if (context.userPreferences?.preferredCategories?.includes(moduleCategory)) {
      boost *= 1.3;
      reason = reason === 'no context' 
        ? `matches user preference: ${moduleCategory}`
        : `${reason} + user preference`;
    }

    // Session topics alignment
    if (context.sessionTopics && context.sessionTopics.length > 0) {
      const categoryKeywords = this.getCategoryKeywords(moduleCategory);
      const topicMatches = context.sessionTopics.filter(topic => 
        categoryKeywords.some(keyword => topic.includes(keyword) || keyword.includes(topic))
      ).length;

      if (topicMatches > 0) {
        const topicBoost = 1 + (topicMatches * 0.2);
        boost *= topicBoost;
        reason = reason === 'no context'
          ? `aligns with session topics: ${context.sessionTopics.slice(0, 2).join(', ')}`
          : `${reason} + topic alignment`;
      }
    }

    return { boost: Math.min(boost, 2.0), reason }; // Cap at 2x boost
  }

  /**
   * Gets keywords associated with each category
   */
  private getCategoryKeywords(categoryId: string): string[] {
    const categoryKeywords: Record<string, string[]> = {
      'voeding-macros': ['eiwitten', 'koolhydraten', 'vetten', 'macro', 'calorieën', 'voeding'],
      'mindset-motivatie': ['motivatie', 'mindset', 'honger', 'eetlust', 'emoties', 'gedrag'],
      'programma-planning': ['programma', 'planning', 'budget', 'calculator', 'werkboek'],
      'beweging-activiteit': ['sport', 'beweging', 'training', 'krachttraining', 'fitness'],
      'weegschaal-voortgang': ['gewicht', 'weegschaal', 'voortgang', 'resultaat', 'meten'],
      'praktische-tips': ['tips', 'recepten', 'feestjes', 'uit eten', 'praktisch'],
      'overgang-hormonen': ['overgang', 'menopauze', 'hormonen', 'slaap', 'stress', 'alcohol']
    };

    return categoryKeywords[categoryId] || [];
  }

  /**
   * Checks if a word is related to key health/diet topics
   */
  private isRelatedTopic(word: string): boolean {
    const relatedTerms = new Set([
      'proteïne', 'proteïnen', 'khd', 'carbs', 'fats', 'energie', 'kcal',
      'dieet', 'voeding', 'eten', 'drinken', 'maaltijd', 'snack',
      'bewegen', 'fitness', 'training', 'sporten', 'lopen', 'wandelen',
      'menopauze', 'climacterium', 'opvliegers', 'hormonen',
      'slapen', 'rust', 'moe', 'energie', 'spanning', 'ontspanning',
      'trek', 'eetlust', 'vol', 'verzadigd', 'honger', 'dorst',
      'kilo', 'gram', 'pond', 'lichaamsgewicht', 'afslanken'
    ]);

    return relatedTerms.has(word);
  }

  /**
   * Creates conversation context from chat history
   */
  public createContextFromHistory(
    messageHistory: string[],
    currentCategory?: string,
    userPreferences?: UserPreferences
  ): ConversationContext {
    const recentHistory = messageHistory.slice(-this.maxHistoryLength);
    const sessionTopics = this.extractSessionTopics(recentHistory);

    return {
      currentCategory,
      messageHistory: recentHistory,
      userPreferences,
      sessionTopics
    };
  }

  /**
   * Updates context with new message
   */
  public updateContext(
    context: ConversationContext,
    newMessage: string
  ): ConversationContext {
    const updatedHistory = [
      ...(context.messageHistory || []),
      newMessage
    ].slice(-this.maxHistoryLength);

    const updatedTopics = this.extractSessionTopics(updatedHistory);

    return {
      ...context,
      messageHistory: updatedHistory,
      sessionTopics: updatedTopics
    };
  }

  /**
   * Infers the primary category from a set of modules
   */
  public inferPrimaryCategory(modules: any[]): string | undefined {
    if (!modules || modules.length === 0) return undefined;
    
    const categoryCount: Record<string, number> = {};
    
    modules.forEach(module => {
      const category = module.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const categories = Object.entries(categoryCount);
    if (categories.length === 0) return undefined;
    
    categories.sort((a, b) => b[1] - a[1]);
    return categories[0][0];
  }

  /**
   * Gets category statistics for debugging
   */
  public getCategoryStats(context: ConversationContext): Record<string, any> {
    const moduleData = loadModuleData();
    const categories = ['voeding-macros', 'mindset-motivatie', 'programma-planning', 
                      'beweging-activiteit', 'weegschaal-voortgang', 'praktische-tips', 
                      'overgang-hormonen'];

    const stats: Record<string, any> = {};

    categories.forEach(category => {
      const boost = this.calculateCategoryBoost(category, context);
      stats[category] = boost;
    });

    return stats;
  }
}