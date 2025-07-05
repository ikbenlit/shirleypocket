// Enhanced test script for improved ModuleDetector with keyword processing
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load test data
const moduleData = JSON.parse(readFileSync(join(__dirname, '../data/modules.json'), 'utf8'));
const chatData = JSON.parse(readFileSync(join(__dirname, '../data/chat_category.json'), 'utf8'));

// Simplified KeywordProcessor for testing
class TestKeywordProcessor {
  constructor() {
    this.synonymsMap = {
      'eiwitten': ['eiwit', 'proteïne', 'proteïnen', 'protein'],
      'koolhydraten': ['koolhydraat', 'khd', 'carbs', 'suikers'],
      'vetten': ['vet', 'lipiden', 'oliën', 'fats'],
      'calorieën': ['calorie', 'kcal', 'energie', 'cal'],
      'afvallen': ['gewichtsverlies', 'afslanken', 'vermageren', 'diëten'],
      'overgang': ['menopauze', 'climacterium', 'hormonen'],
      'sport': ['bewegen', 'fitness', 'training', 'lichaamsbeweging', 'oefening'],
      'gewicht': ['kilo', 'kilogram', 'zwaar', 'lichter']
    };

    this.coreKeywords = new Set([
      'eiwitten', 'koolhydraten', 'vetten', 'macro', 'calorieën',
      'overgang', 'menopauze', 'afvallen', 'gewicht', 'stoelgang',
      'sport', 'krachttraining', 'slaap', 'stress', 'honger'
    ]);

    this.supportKeywords = new Set([
      'budget', 'voeding', 'eten', 'drinken', 'bewegen', 'training',
      'gezond', 'tip', 'help', 'probleem', 'vraag', 'advies'
    ]);
  }

  normalizeWord(word) {
    let normalized = word.toLowerCase().trim();
    // Simple plurals
    normalized = normalized.replace(/en$/, ''); // eiwitten → eiwit
    normalized = normalized.replace(/s$/, ''); // macros → macro  
    normalized = normalized.replace(/ën$/, 'e'); // calorieën → calorie
    return normalized;
  }

  getSynonyms(word) {
    const normalized = this.normalizeWord(word);
    const synonyms = new Set([normalized]);
    
    for (const [primary, syns] of Object.entries(this.synonymsMap)) {
      if (syns.includes(normalized) || primary === normalized) {
        synonyms.add(primary);
        syns.forEach(syn => synonyms.add(syn));
      }
    }
    
    return synonyms;
  }

  getKeywordWeight(word) {
    const normalized = this.normalizeWord(word);
    
    if (this.coreKeywords.has(normalized)) {
      return 1.0;
    }
    
    if (this.supportKeywords.has(normalized)) {
      return 0.7;
    }

    // Check synonyms
    const synonyms = this.getSynonyms(normalized);
    for (const synonym of synonyms) {
      if (this.coreKeywords.has(synonym)) {
        return 1.0;
      }
      if (this.supportKeywords.has(synonym)) {
        return 0.7;
      }
    }
    
    return 0.3;
  }

  calculateEnhancedSimilarity(word1, word2) {
    const norm1 = this.normalizeWord(word1);
    const norm2 = this.normalizeWord(word2);

    // Exact match
    if (norm1 === norm2) {
      return 1.0;
    }

    // Synonym match
    const synonyms1 = this.getSynonyms(norm1);
    const synonyms2 = this.getSynonyms(norm2);
    
    if (synonyms1.has(norm2) || synonyms2.has(norm1)) {
      return 0.95;
    }

    // Overlapping synonyms
    const intersection = new Set([...synonyms1].filter(x => synonyms2.has(x)));
    if (intersection.size > 0) {
      return 0.9;
    }

    // Contains match
    if (norm1.includes(norm2) || norm2.includes(norm1)) {
      const longer = norm1.length > norm2.length ? norm1 : norm2;
      const shorter = norm1.length <= norm2.length ? norm1 : norm2;
      return (shorter.length / longer.length) * 0.8;
    }

    return 0;
  }

  extractWeightedKeywords(text) {
    const words = text
      .toLowerCase()
      .replace(/[.,!?;:()[\]{}""'']/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter(word => word.length > 2)
      .map(word => this.normalizeWord(word))
      .filter(word => word.length > 0);

    const uniqueWords = [...new Set(words)];
    
    return uniqueWords.map(word => ({
      word,
      weight: this.getKeywordWeight(word)
    }));
  }
}

// Enhanced ModuleDetector with keyword processing
class TestEnhancedModuleDetector {
  constructor() {
    this.moduleData = [
      ...moduleData.modules,
      ...(moduleData.standalone || []),
      ...(moduleData.faq || [])
    ];
    
    this.keywordProcessor = new TestKeywordProcessor();
    this.moduleKeywordIndex = new Map();
    
    // Build keyword index
    this.buildKeywordIndex();
  }

  buildKeywordIndex() {
    for (const module of this.moduleData) {
      const allTopicsText = module.topics.join(' ');
      const weightedKeywords = this.keywordProcessor.extractWeightedKeywords(allTopicsText);
      this.moduleKeywordIndex.set(module.id, weightedKeywords);
    }
  }

  detectRelevantModules(userQuery, options = {}) {
    const queryKeywords = this.keywordProcessor.extractWeightedKeywords(userQuery);
    
    if (queryKeywords.length === 0) {
      return [];
    }

    const results = [];

    for (const module of this.moduleData) {
      if (options.category && module.category !== options.category) {
        continue;
      }

      const relevanceScore = this.calculateEnhancedRelevanceScore(queryKeywords, module);
      
      if (relevanceScore > 0) {
        const matchedTopics = this.findEnhancedMatchedTopics(queryKeywords, module);
        
        results.push({
          module,
          relevanceScore,
          matchedTopics
        });
      }
    }

    return this.prioritizeModules(results).slice(0, options.maxResults || 10);
  }

  calculateEnhancedRelevanceScore(queryKeywords, module) {
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

    const baseScore = totalScore / weightedQueryTotal;
    const weightMultiplier = module.weight / 10;
    const coverageBonus = matchCount / queryKeywords.length;
    
    return Math.min(baseScore * weightMultiplier * (1 + coverageBonus * 0.4), 1);
  }

  findEnhancedMatchedTopics(queryKeywords, module) {
    const matchedTopics = [];
    
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

  prioritizeModules(modules) {
    return modules.sort((a, b) => {
      if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.05) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      if (a.module.weight !== b.module.weight) {
        return b.module.weight - a.module.weight;
      }
      
      return b.matchedTopics.length - a.matchedTopics.length;
    });
  }
}

// Enhanced test cases
function runEnhancedTests() {
  console.log('🚀 Testing Enhanced ModuleDetector with Keyword Processing...\n');
  
  const detector = new TestEnhancedModuleDetector();
  
  // Test 1: Synonym matching
  console.log('Test 1: "Ik heb te weinig proteïne" (synonym for eiwitten)');
  const result1 = detector.detectRelevantModules('Ik heb te weinig proteïne', { maxResults: 3 });
  console.log(`Found ${result1.length} relevant modules:`);
  result1.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 2: Plural/singular matching
  console.log('Test 2: "calorie budget" (should match calorieën)');
  const result2 = detector.detectRelevantModules('calorie budget', { maxResults: 3 });
  console.log(`Found ${result2.length} relevant modules:`);
  result2.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 3: Weight-based prioritization
  console.log('Test 3: "beweging" (should prioritize sport module)');
  const result3 = detector.detectRelevantModules('beweging', { maxResults: 3 });
  console.log(`Found ${result3.length} relevant modules:`);
  result3.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 4: Improved weight matching
  console.log('Test 4: "Mijn gewicht schommelt heel erg"');
  const result4 = detector.detectRelevantModules('Mijn gewicht schommelt heel erg', { maxResults: 3 });
  console.log(`Found ${result4.length} relevant modules:`);
  result4.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 5: Compare with basic detector
  console.log('Test 5: Keyword analysis for "eiwitten proteïne macro"');
  const keywords = detector.keywordProcessor.extractWeightedKeywords('eiwitten proteïne macro');
  console.log('Extracted keywords with weights:');
  keywords.forEach(kw => {
    console.log(`  - ${kw.word}: ${kw.weight}`);
  });
  
  console.log('\n🎉 Enhanced tests completed!');
  
  // Enhanced summary
  console.log('\n📊 Enhanced Summary:');
  console.log(`Total modules indexed: ${detector.moduleData.length}`);
  console.log(`Keyword index size: ${detector.moduleKeywordIndex.size}`);
  
  // Show synonym examples
  console.log('\nSynonym examples:');
  const processor = new TestKeywordProcessor();
  console.log(`eiwitten synonyms: ${[...processor.getSynonyms('eiwitten')].join(', ')}`);
  console.log(`calorieën synonyms: ${[...processor.getSynonyms('calorieën')].join(', ')}`);
  console.log(`overgang synonyms: ${[...processor.getSynonyms('overgang')].join(', ')}`);
}

// Run enhanced tests
runEnhancedTests();