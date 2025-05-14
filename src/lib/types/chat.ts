export interface ChatQuestion {
  text: string;
  categories: string[]; // Array of category IDs this question might belong to (for cross-category)
  priority: number;
  displayOrder: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ChatCategory {
  id: string;
  title: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  questions: ChatQuestion[];
}

export interface ChatData {
  version: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  categoriesData: ChatCategory[];
} 