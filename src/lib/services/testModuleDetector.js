// Test script for ModuleDetector service
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock the module loader since we can't import TypeScript directly
const moduleData = JSON.parse(readFileSync(join(__dirname, '../data/modules.json'), 'utf8'));
const chatData = JSON.parse(readFileSync(join(__dirname, '../data/chat_category.json'), 'utf8'));

// Simplified ModuleDetector for testing
class TestModuleDetector {
  constructor() {
    this.moduleData = [
      ...moduleData.modules,
      ...(moduleData.standalone || []),
      ...(moduleData.faq || [])
    ];
    
    this.stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'te', 'dat', 'die', 'in', 'voor', 'op', 'met', 'als', 'zijn',
      'er', 'maar', 'om', 'had', 'aan', 'bij', 'nog', 'kan', 'wat', 'zou', 'nu', 'naar', 'toe',
      'ik', 'je', 'mijn', 'zijn', 'haar', 'onze', 'jullie', 'hun', 'deze', 'dit', 'die', 'dat'
    ]);
  }

  detectRelevantModules(userQuery, options = {}) {
    const query = this.normalizeQuery(userQuery);
    const queryWords = this.extractKeywords(query);
    
    if (queryWords.length === 0) {
      return [];
    }

    const results = [];

    for (const module of this.moduleData) {
      if (options.category && module.category !== options.category) {
        continue;
      }

      const relevanceScore = this.calculateRelevanceScore(queryWords, module);
      
      if (relevanceScore > 0) {
        const matchedTopics = this.findMatchedTopics(queryWords, module);
        
        results.push({
          module,
          relevanceScore,
          matchedTopics
        });
      }
    }

    return this.prioritizeModules(results).slice(0, options.maxResults || 10);
  }

  calculateRelevanceScore(queryWords, module) {
    let totalScore = 0;
    let matchCount = 0;

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
      
      if (bestWordScore > 0.6) {
        totalScore += bestWordScore;
        matchCount++;
      }
    }

    if (matchCount === 0) {
      return 0;
    }

    const baseScore = totalScore / queryWords.length;
    const weightMultiplier = module.weight / 10;
    const coverageBonus = matchCount / queryWords.length;
    
    return Math.min(baseScore * weightMultiplier * (1 + coverageBonus * 0.3), 1);
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

  findMatchedTopics(queryWords, module) {
    const matchedTopics = [];
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

  normalizeQuery(query) {
    return query
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:()[\]{}""'']/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\b(m'n|'t|'s|'k|'r)\b/g, '');
  }

  extractKeywords(text) {
    return text
      .split(' ')
      .filter(word => word.length > 2 && !this.stopWords.has(word))
      .filter(word => word.trim().length > 0);
  }

  calculateWordSimilarity(word1, word2) {
    if (word1 === word2) {
      return 1.0;
    }
    
    if (word1.includes(word2) || word2.includes(word1)) {
      const longer = word1.length > word2.length ? word1 : word2;
      const shorter = word1.length <= word2.length ? word1 : word2;
      return shorter.length / longer.length * 0.9;
    }
    
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity > 0.7 ? similarity * 0.8 : 0;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
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
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}

// Test cases
function runTests() {
  console.log('🧪 Testing ModuleDetector Service...\n');
  
  const detector = new TestModuleDetector();
  
  // Test 1: Eiwitten vraag
  console.log('Test 1: "Ik kom niet aan mijn eiwitten"');
  const result1 = detector.detectRelevantModules('Ik kom niet aan mijn eiwitten', { maxResults: 3 });
  console.log(`Found ${result1.length} relevant modules:`);
  result1.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 2: Overgang vraag
  console.log('Test 2: "Wat gebeurt er in de overgang?"');
  const result2 = detector.detectRelevantModules('Wat gebeurt er in de overgang?', { maxResults: 3 });
  console.log(`Found ${result2.length} relevant modules:`);
  result2.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 3: Gewicht vraag
  console.log('Test 3: "Waarom schommelt mijn gewicht zo?"');
  const result3 = detector.detectRelevantModules('Waarom schommelt mijn gewicht zo?', { maxResults: 3 });
  console.log(`Found ${result3.length} relevant modules:`);
  result3.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 4: Sport vraag
  console.log('Test 4: "Welke sport is het beste?"');
  const result4 = detector.detectRelevantModules('Welke sport is het beste?', { maxResults: 3 });
  console.log(`Found ${result4.length} relevant modules:`);
  result4.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
    console.log(`     Topics: ${r.matchedTopics.join(', ')}`);
  });
  
  console.log('\n---\n');
  
  // Test 5: Category filtering
  console.log('Test 5: "eiwitten" with category filter');
  const result5 = detector.detectRelevantModules('eiwitten', { 
    category: 'voeding-macros', 
    maxResults: 3 
  });
  console.log(`Found ${result5.length} relevant modules in voeding-macros category:`);
  result5.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.module.title} (score: ${r.relevanceScore.toFixed(3)})`);
  });
  
  console.log('\n🎉 All tests completed!');
  
  // Summary stats
  console.log('\n📊 Summary:');
  console.log(`Total modules available: ${detector.moduleData.length}`);
  console.log(`Categories: ${[...new Set(detector.moduleData.map(m => m.category))].length}`);
  console.log(`Average module weight: ${(detector.moduleData.reduce((sum, m) => sum + m.weight, 0) / detector.moduleData.length).toFixed(1)}`);
}

// Run the tests
runTests();