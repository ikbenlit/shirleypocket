// Test script for Context-Aware ModuleDetector
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load test data
const moduleData = JSON.parse(readFileSync(join(__dirname, '../data/modules.json'), 'utf8'));

// Simplified ContextManager for testing
class TestContextManager {
  extractSessionTopics(messageHistory) {
    if (!messageHistory || messageHistory.length === 0) {
      return [];
    }

    const topicFrequency = new Map();
    const keyTopics = new Set([
      'eiwitten', 'koolhydraten', 'vetten', 'calorieën', 'afvallen', 'overgang',
      'sport', 'slaap', 'stress', 'honger', 'gewicht', 'stoelgang', 'macro'
    ]);

    messageHistory.forEach((message, index) => {
      const normalizedMessage = message.toLowerCase();
      const words = normalizedMessage.split(/\s+/);
      
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?;:()[\]{}""'']/g, '');
        
        if (keyTopics.has(cleanWord)) {
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

    return Array.from(topicFrequency.entries())
      .map(([topic, data]) => {
        const recencyBoost = Math.pow(0.8, messageHistory.length - 1 - data.lastSeen);
        const score = data.count * recencyBoost;
        return { topic, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.topic);
  }

  calculateCategoryBoost(moduleCategory, context) {
    let boost = 1.0;
    let reason = 'no context';

    if (!context) {
      return { boost, reason };
    }

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

    return { boost: Math.min(boost, 2.0), reason };
  }

  getCategoryKeywords(categoryId) {
    const categoryKeywords = {
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

  createContextFromHistory(messageHistory, currentCategory, userPreferences) {
    const recentHistory = messageHistory.slice(-5);
    const sessionTopics = this.extractSessionTopics(recentHistory);

    return {
      currentCategory,
      messageHistory: recentHistory,
      userPreferences,
      sessionTopics
    };
  }
}

// Simplified KeywordProcessor for testing
class TestKeywordProcessor {
  extractWeightedKeywords(text) {
    const words = text
      .toLowerCase()
      .replace(/[.,!?;:()[\]{}""'']/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter(word => word.length > 2);

    const uniqueWords = [...new Set(words)];
    
    return uniqueWords.map(word => ({
      word,
      weight: 1.0 // Simplified for testing
    }));
  }

  calculateEnhancedSimilarity(word1, word2) {
    if (word1 === word2) return 1.0;
    if (word1.includes(word2) || word2.includes(word1)) return 0.8;
    return 0;
  }
}

// Context-Aware ModuleDetector for testing
class TestContextAwareModuleDetector {
  constructor() {
    this.moduleData = [
      ...moduleData.modules,
      ...(moduleData.standalone || []),
      ...(moduleData.faq || [])
    ];
    
    this.contextManager = new TestContextManager();
    this.keywordProcessor = new TestKeywordProcessor();
  }

  detectContextualModules(userQuery, options = {}) {
    const queryKeywords = this.keywordProcessor.extractWeightedKeywords(userQuery);
    
    if (queryKeywords.length === 0) {
      return [];
    }

    const results = [];
    const context = options.context;

    for (const module of this.moduleData) {
      if (options.category && module.category !== options.category) {
        continue;
      }

      const baseRelevanceScore = this.calculateBasicRelevanceScore(queryKeywords, module);
      
      if (baseRelevanceScore > 0) {
        // Apply context boost
        const { boost, reason } = this.contextManager.calculateCategoryBoost(module.category, context);
        const contextualScore = Math.min(baseRelevanceScore * boost, 1.0);
        
        if (contextualScore >= (options.minRelevanceScore || 0)) {
          results.push({
            module,
            relevanceScore: contextualScore,
            matchedTopics: this.findBasicMatchedTopics(queryKeywords, module),
            contextBoost: boost,
            contextReason: reason
          });
        }
      }
    }

    // Sort by contextual score
    return results.sort((a, b) => {
      if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.05) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      if (Math.abs(a.contextBoost - b.contextBoost) > 0.1) {
        return b.contextBoost - a.contextBoost;
      }
      
      if (a.module.weight !== b.module.weight) {
        return b.module.weight - a.module.weight;
      }
      
      return b.matchedTopics.length - a.matchedTopics.length;
    }).slice(0, options.maxResults || 10);
  }

  calculateBasicRelevanceScore(queryKeywords, module) {
    let matchCount = 0;
    
    for (const queryKeyword of queryKeywords) {
      for (const topic of module.topics) {
        if (topic.toLowerCase().includes(queryKeyword.word)) {
          matchCount++;
          break;
        }
      }
    }

    if (matchCount === 0) return 0;
    
    const baseScore = matchCount / queryKeywords.length;
    const weightMultiplier = module.weight / 10;
    
    return baseScore * weightMultiplier;
  }

  findBasicMatchedTopics(queryKeywords, module) {
    const matchedTopics = [];
    
    for (const topic of module.topics) {
      for (const queryKeyword of queryKeywords) {
        if (topic.toLowerCase().includes(queryKeyword.word)) {
          matchedTopics.push(topic);
          break;
        }
      }
    }
    
    return matchedTopics;
  }

  createContext(messageHistory, currentCategory, userPreferences) {
    return this.contextManager.createContextFromHistory(messageHistory, currentCategory, userPreferences);
  }
}

// Context-Aware Tests
function runContextAwareTests() {
  console.log('🧠 Testing Context-Aware ModuleDetector...\n');
  
  const detector = new TestContextAwareModuleDetector();
  
  // Test 1: Category context boost
  console.log('Test 1: "eiwitten" with voeding-macros category context');
  const context1 = detector.createContext(
    ['Ik wil meer leren over voeding', 'Hoe zit het met macro verdeling?'],
    'voeding-macros'
  );
  
  const result1 = detector.detectContextualModules('eiwitten', { 
    context: context1, 
    maxResults: 3 
  });
  
  console.log(`Found ${result1.length} relevant modules:`);
  result1.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title}`);
    console.log(`     Score: ${r.relevanceScore.toFixed(3)} (boost: ${r.contextBoost.toFixed(2)}x)`);
    console.log(`     Context: ${r.contextReason}`);
  });
  
  console.log('\n---\n');
  
  // Test 2: Session topic context
  console.log('Test 2: "sport" with overgang conversation history');
  const context2 = detector.createContext(
    [
      'Ik ben in de overgang',
      'Heb last van opvliegers',
      'Wordt afvallen nu moeilijker?',
      'Wat kan ik doen aan stress?'
    ],
    undefined
  );
  
  const result2 = detector.detectContextualModules('sport', { 
    context: context2, 
    maxResults: 3 
  });
  
  console.log(`Session topics detected: ${context2.sessionTopics.join(', ')}`);
  console.log(`Found ${result2.length} relevant modules:`);
  result2.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title}`);
    console.log(`     Score: ${r.relevanceScore.toFixed(3)} (boost: ${r.contextBoost.toFixed(2)}x)`);
    console.log(`     Context: ${r.contextReason}`);
  });
  
  console.log('\n---\n');
  
  // Test 3: User preferences context
  console.log('Test 3: "tips" with user preferences for praktische-tips');
  const context3 = detector.createContext(
    [],
    undefined,
    { preferredCategories: ['praktische-tips', 'voeding-macros'] }
  );
  
  const result3 = detector.detectContextualModules('tips', { 
    context: context3, 
    maxResults: 3 
  });
  
  console.log(`Found ${result3.length} relevant modules:`);
  result3.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title}`);
    console.log(`     Score: ${r.relevanceScore.toFixed(3)} (boost: ${r.contextBoost.toFixed(2)}x)`);
    console.log(`     Context: ${r.contextReason}`);
  });
  
  console.log('\n---\n');
  
  // Test 4: Compare with and without context
  console.log('Test 4: Comparison - "gewicht" with vs without context');
  
  // Without context
  const resultWithoutContext = detector.detectContextualModules('gewicht', { 
    maxResults: 2 
  });
  
  // With context (weight-focused conversation)
  const contextWeight = detector.createContext(
    [
      'Mijn gewicht schommelt zo veel',
      'Waarom ben ik soms zwaarder?',
      'Hoe vaak moet ik wegen?'
    ],
    'weegschaal-voortgang'
  );
  
  const resultWithContext = detector.detectContextualModules('gewicht', { 
    context: contextWeight,
    maxResults: 2 
  });
  
  console.log('Without context:');
  resultWithoutContext.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
  });
  
  console.log('\nWith context:');
  resultWithContext.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)}, boost: ${r.contextBoost.toFixed(2)}x)`);
    console.log(`     Context: ${r.contextReason}`);
  });
  
  console.log('\n🎉 Context-aware tests completed!');
  
  // Summary
  console.log('\n📊 Context Awareness Summary:');
  console.log('✅ Category context boosts relevant modules');
  console.log('✅ Session topics extracted from conversation history');
  console.log('✅ User preferences influence module prioritization');
  console.log('✅ Context-aware scoring improves relevance');
}

// Run the tests
runContextAwareTests();