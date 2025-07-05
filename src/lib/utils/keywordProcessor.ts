/**
 * Keyword processing utilities for better module detection
 */

// Dutch synonyms mapping for better keyword matching
const SYNONYMS_MAP: Record<string, string[]> = {
  'eiwitten': ['eiwit', 'proteïne', 'proteïnen', 'protein'],
  'koolhydraten': ['koolhydraat', 'khd', 'carbs', 'suikers'],
  'vetten': ['vet', 'lipiden', 'oliën', 'fats'],
  'calorieën': ['calorie', 'kcal', 'energie', 'cal'],
  'afvallen': ['gewichtsverlies', 'afslanken', 'vermageren', 'diëten'],
  'overgang': ['menopauze', 'climacterium', 'hormonen'],
  'sport': ['bewegen', 'fitness', 'training', 'lichaamsbeweging', 'oefening'],
  'slaap': ['slapen', 'rust', 'nachtrust', 'uitrusten'],
  'stress': ['spanning', 'druk', 'zenuwachtig', 'onrust'],
  'honger': ['eetlust', 'trek', 'appetijt', 'hongergevoelens'],
  'weegschaal': ['wegen', 'gewicht', 'kilo', 'kilogram'],
  'stoelgang': ['ontlasting', 'poepen', 'defecatie', 'darmontlasting'],
  'macro': ['macros', 'macronutriënten', 'voedingsstoffen'],
  'budget': ['budgetten', 'limiet', 'grens', 'hoeveelheid']
};

// Word normalization patterns
const NORMALIZATION_PATTERNS: Array<[RegExp, string]> = [
  // Remove common contractions
  [/\b(m'n|'t|'s|'k|'r)\b/g, ''],
  // Normalize plural forms
  [/en$/i, ''], // eiwitten → eiwit
  [/s$/i, ''], // macros → macro  
  [/ën$/i, 'e'], // calorieën → calorie
  // Common spelling variations
  [/ij/g, 'y'], // overgewich → overgewycht for better matching
  [/ie/g, 'i'], // calorieën → caloriën
];

// Weight categories for keywords
const KEYWORD_WEIGHTS = {
  CORE: 1.0,     // Specific domain terms
  SUPPORT: 0.7,  // General health/diet terms  
  GENERIC: 0.3   // Very common words
};

const CORE_KEYWORDS = new Set([
  'eiwitten', 'koolhydraten', 'vetten', 'macro', 'calorieën',
  'overgang', 'menopauze', 'afvallen', 'gewicht', 'stoelgang',
  'sport', 'krachttraining', 'slaap', 'stress', 'honger'
]);

const SUPPORT_KEYWORDS = new Set([
  'budget', 'voeding', 'eten', 'drinken', 'bewegen', 'training',
  'gezond', 'tip', 'help', 'probleem', 'vraag', 'advies'
]);

/**
 * Enhanced keyword processor for better module matching
 */
export class KeywordProcessor {
  private synonymIndex: Map<string, Set<string>>;
  private stemCache: Map<string, string>;

  constructor() {
    this.synonymIndex = new Map();
    this.stemCache = new Map();
    this.buildSynonymIndex();
  }

  /**
   * Builds reverse synonym index for fast lookup
   */
  private buildSynonymIndex(): void {
    for (const [primary, synonyms] of Object.entries(SYNONYMS_MAP)) {
      // Add primary term
      if (!this.synonymIndex.has(primary)) {
        this.synonymIndex.set(primary, new Set());
      }
      this.synonymIndex.get(primary)!.add(primary);

      // Add all synonyms pointing to primary
      for (const synonym of synonyms) {
        if (!this.synonymIndex.has(synonym)) {
          this.synonymIndex.set(synonym, new Set());
        }
        this.synonymIndex.get(synonym)!.add(primary);
        this.synonymIndex.get(primary)!.add(synonym);
      }
    }
  }

  /**
   * Normalizes a word using various patterns
   */
  public normalizeWord(word: string): string {
    if (this.stemCache.has(word)) {
      return this.stemCache.get(word)!;
    }

    let normalized = word.toLowerCase().trim();
    
    // Apply normalization patterns
    for (const [pattern, replacement] of NORMALIZATION_PATTERNS) {
      normalized = normalized.replace(pattern, replacement);
    }

    this.stemCache.set(word, normalized);
    return normalized;
  }

  /**
   * Gets all synonyms for a given word
   */
  public getSynonyms(word: string): Set<string> {
    const normalized = this.normalizeWord(word);
    return this.synonymIndex.get(normalized) || new Set([normalized]);
  }

  /**
   * Gets weight for a keyword based on importance
   */
  public getKeywordWeight(word: string): number {
    const normalized = this.normalizeWord(word);
    
    if (CORE_KEYWORDS.has(normalized)) {
      return KEYWORD_WEIGHTS.CORE;
    }
    
    if (SUPPORT_KEYWORDS.has(normalized)) {
      return KEYWORD_WEIGHTS.SUPPORT;
    }

    // Check if any synonyms are core keywords
    const synonyms = this.getSynonyms(normalized);
    for (const synonym of synonyms) {
      if (CORE_KEYWORDS.has(synonym)) {
        return KEYWORD_WEIGHTS.CORE;
      }
      if (SUPPORT_KEYWORDS.has(synonym)) {
        return KEYWORD_WEIGHTS.SUPPORT;
      }
    }
    
    return KEYWORD_WEIGHTS.GENERIC;
  }

  /**
   * Calculates enhanced similarity between two words
   */
  public calculateEnhancedSimilarity(word1: string, word2: string): number {
    const norm1 = this.normalizeWord(word1);
    const norm2 = this.normalizeWord(word2);

    // Exact match after normalization
    if (norm1 === norm2) {
      return 1.0;
    }

    // Check synonym matches
    const synonyms1 = this.getSynonyms(norm1);
    const synonyms2 = this.getSynonyms(norm2);
    
    // Direct synonym match
    if (synonyms1.has(norm2) || synonyms2.has(norm1)) {
      return 0.95;
    }

    // Overlapping synonyms
    const intersection = new Set([...synonyms1].filter(x => synonyms2.has(x)));
    if (intersection.size > 0) {
      return 0.9;
    }

    // Fallback to basic similarity
    return this.basicSimilarity(norm1, norm2);
  }

  /**
   * Basic similarity calculation
   */
  private basicSimilarity(word1: string, word2: string): number {
    // Contains match
    if (word1.includes(word2) || word2.includes(word1)) {
      const longer = word1.length > word2.length ? word1 : word2;
      const shorter = word1.length <= word2.length ? word1 : word2;
      return (shorter.length / longer.length) * 0.8;
    }

    // Levenshtein distance
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity > 0.6 ? similarity * 0.7 : 0;
  }

  /**
   * Levenshtein distance calculation
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
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  /**
   * Extracts and weights keywords from text
   */
  public extractWeightedKeywords(text: string): Array<{ word: string; weight: number }> {
    const words = text
      .toLowerCase()
      .trim()
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

  /**
   * Gets the primary term for a word (maps synonyms to main term)
   */
  public getPrimaryTerm(word: string): string {
    const normalized = this.normalizeWord(word);
    
    // Check if this word has synonyms pointing to a primary term
    for (const [primary, synonyms] of Object.entries(SYNONYMS_MAP)) {
      if (synonyms.includes(normalized) || primary === normalized) {
        return primary;
      }
    }
    
    return normalized;
  }
}