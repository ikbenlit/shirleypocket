export interface ChatQuestion {
  text: string;
}

export interface ChatCategory {
  id: string;
  title: string;
  color: string;
  icon: string;
  questions: ChatQuestion[];
}

export interface ChatData {
  version: string;
  createdAt: string;
  updatedAt: string;
  categoriesData: ChatCategory[];
}

// Module Index Types
export interface ModuleInfo {
  id: string;
  title: string;
  url: string;
  topics: string[];
  category: string;
  weight: number;
}

export interface ModuleData {
  version: string;
  createdAt: string;
  updatedAt: string;
  modules: ModuleInfo[];
  standalone?: ModuleInfo[];
  faq?: ModuleInfo[];
}

// Module Detection & Processing Types
export interface ModuleDetectionResult {
  module: ModuleInfo;
  relevanceScore: number;
  matchedTopics: string[];
}

export interface ModuleReference {
  id: string;
  title: string;
  url: string;
  context: string;
  priority: number;
}

export interface ModuleContext {
  relevantModules: ModuleReference[];
  totalModules: number;
  searchQuery: string;
  category?: string;
}

// Module Category Integration
export interface ModuleCategoryMapping {
  categoryId: string;
  moduleIds: string[];
  weight: number;
}

// Module Search & Filtering
export interface ModuleSearchOptions {
  query: string;
  category?: string;
  minRelevanceScore?: number;
  maxResults?: number;
  includeStandalone?: boolean;
  includeFaq?: boolean;
  context?: ConversationContext;
}

// Context Awareness Types
export interface ConversationContext {
  currentCategory?: string;
  messageHistory?: string[];
  userPreferences?: UserPreferences;
  sessionTopics?: string[];
}

export interface UserPreferences {
  preferredCategories?: string[];
  expertLevel?: 'beginner' | 'intermediate' | 'advanced';
  focusAreas?: string[];
}

export interface ContextualModuleResult extends ModuleDetectionResult {
  contextBoost: number;
  contextReason: string;
} 