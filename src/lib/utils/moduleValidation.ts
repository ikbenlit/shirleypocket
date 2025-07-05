import type { ModuleInfo, ModuleData, ModuleDetectionResult, ModuleReference } from '../types/chat';

/**
 * Validates if a ModuleInfo object has all required fields
 */
export function validateModuleInfo(module: unknown): module is ModuleInfo {
  if (!module || typeof module !== 'object') {
    return false;
  }

  const mod = module as Partial<ModuleInfo>;
  
  return (
    typeof mod.id === 'string' &&
    mod.id.length > 0 &&
    typeof mod.title === 'string' &&
    mod.title.length > 0 &&
    typeof mod.url === 'string' &&
    mod.url.startsWith('https://') &&
    Array.isArray(mod.topics) &&
    mod.topics.length > 0 &&
    mod.topics.every(topic => typeof topic === 'string' && topic.length > 0) &&
    typeof mod.category === 'string' &&
    mod.category.length > 0 &&
    typeof mod.weight === 'number' &&
    mod.weight >= 0 &&
    mod.weight <= 10
  );
}

/**
 * Validates if a ModuleData object has correct structure
 */
export function validateModuleData(data: unknown): data is ModuleData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const moduleData = data as Partial<ModuleData>;
  
  if (
    typeof moduleData.version !== 'string' ||
    typeof moduleData.createdAt !== 'string' ||
    typeof moduleData.updatedAt !== 'string' ||
    !Array.isArray(moduleData.modules)
  ) {
    return false;
  }

  // Validate all modules
  if (!moduleData.modules.every(validateModuleInfo)) {
    return false;
  }

  // Validate optional arrays
  if (moduleData.standalone && !moduleData.standalone.every(validateModuleInfo)) {
    return false;
  }

  if (moduleData.faq && !moduleData.faq.every(validateModuleInfo)) {
    return false;
  }

  return true;
}

/**
 * Validates if a ModuleDetectionResult has correct structure
 */
export function validateModuleDetectionResult(result: unknown): result is ModuleDetectionResult {
  if (!result || typeof result !== 'object') {
    return false;
  }

  const detectionResult = result as Partial<ModuleDetectionResult>;
  
  return (
    validateModuleInfo(detectionResult.module) &&
    typeof detectionResult.relevanceScore === 'number' &&
    detectionResult.relevanceScore >= 0 &&
    detectionResult.relevanceScore <= 1 &&
    Array.isArray(detectionResult.matchedTopics) &&
    detectionResult.matchedTopics.every(topic => typeof topic === 'string')
  );
}

/**
 * Validates if a ModuleReference has correct structure
 */
export function validateModuleReference(reference: unknown): reference is ModuleReference {
  if (!reference || typeof reference !== 'object') {
    return false;
  }

  const ref = reference as Partial<ModuleReference>;
  
  return (
    typeof ref.id === 'string' &&
    ref.id.length > 0 &&
    typeof ref.title === 'string' &&
    ref.title.length > 0 &&
    typeof ref.url === 'string' &&
    ref.url.startsWith('https://') &&
    typeof ref.context === 'string' &&
    typeof ref.priority === 'number' &&
    ref.priority >= 0
  );
}

/**
 * Validates if module IDs are unique within a dataset
 */
export function validateUniqueModuleIds(modules: ModuleInfo[]): boolean {
  const ids = modules.map(module => module.id);
  const uniqueIds = new Set(ids);
  return ids.length === uniqueIds.size;
}

/**
 * Validates if module categories exist in the provided category list
 */
export function validateModuleCategories(modules: ModuleInfo[], validCategories: string[]): boolean {
  const categorySet = new Set(validCategories);
  return modules.every(module => categorySet.has(module.category));
}

/**
 * Validates if module URLs are accessible (basic URL format check)
 */
export function validateModuleUrls(modules: ModuleInfo[]): boolean {
  return modules.every(module => {
    try {
      new URL(module.url);
      return true;
    } catch {
      return false;
    }
  });
}

/**
 * Comprehensive validation of a complete ModuleData object
 */
export function validateCompleteModuleData(data: unknown, validCategories: string[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!validateModuleData(data)) {
    errors.push('Invalid ModuleData structure');
    return { isValid: false, errors };
  }

  const moduleData = data as ModuleData;
  const allModules = [
    ...moduleData.modules,
    ...(moduleData.standalone || []),
    ...(moduleData.faq || [])
  ];

  // Check unique IDs
  if (!validateUniqueModuleIds(allModules)) {
    errors.push('Duplicate module IDs found');
  }

  // Check valid categories
  if (!validateModuleCategories(allModules, validCategories)) {
    errors.push('Invalid module categories found');
  }

  // Check URLs
  if (!validateModuleUrls(allModules)) {
    errors.push('Invalid module URLs found');
  }

  // Check for empty topics
  const modulesWithEmptyTopics = allModules.filter(module => module.topics.length === 0);
  if (modulesWithEmptyTopics.length > 0) {
    errors.push(`Modules with empty topics: ${modulesWithEmptyTopics.map(m => m.id).join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}