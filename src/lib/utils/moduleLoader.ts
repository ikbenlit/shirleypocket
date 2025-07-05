import moduleDataRaw from '../data/modules.json';
import chatCategoryDataRaw from '../data/chat_category.json';
import type { ModuleData, ChatData } from '../types/chat';
import { validateCompleteModuleData } from './moduleValidation';

/**
 * Loads and validates module data from JSON file
 */
export function loadModuleData(): ModuleData {
  const moduleData = moduleDataRaw as ModuleData;
  
  // Get valid categories from chat category data
  const chatData = chatCategoryDataRaw as ChatData;
  const validCategories = chatData.categoriesData.map(cat => cat.id);
  
  // Validate the loaded data
  const validation = validateCompleteModuleData(moduleData, validCategories);
  
  if (!validation.isValid) {
    console.error('Module data validation failed:', validation.errors);
    throw new Error(`Invalid module data: ${validation.errors.join(', ')}`);
  }
  
  console.log('Module data validation passed');
  return moduleData;
}

/**
 * Gets all modules (main + standalone + faq) as a flat array
 */
export function getAllModules(moduleData: ModuleData) {
  return [
    ...moduleData.modules,
    ...(moduleData.standalone || []),
    ...(moduleData.faq || [])
  ];
}

/**
 * Gets modules by category
 */
export function getModulesByCategory(moduleData: ModuleData, categoryId: string) {
  const allModules = getAllModules(moduleData);
  return allModules.filter(module => module.category === categoryId);
}

/**
 * Gets module by ID
 */
export function getModuleById(moduleData: ModuleData, moduleId: string) {
  const allModules = getAllModules(moduleData);
  return allModules.find(module => module.id === moduleId);
}

/**
 * Gets module statistics
 */
export function getModuleStats(moduleData: ModuleData) {
  const allModules = getAllModules(moduleData);
  const categoryCounts: Record<string, number> = {};
  
  allModules.forEach(module => {
    categoryCounts[module.category] = (categoryCounts[module.category] || 0) + 1;
  });
  
  return {
    totalModules: allModules.length,
    mainModules: moduleData.modules.length,
    standaloneModules: moduleData.standalone?.length || 0,
    faqModules: moduleData.faq?.length || 0,
    categoryCounts,
    averageWeight: allModules.reduce((sum, mod) => sum + mod.weight, 0) / allModules.length,
    totalTopics: allModules.reduce((sum, mod) => sum + mod.topics.length, 0)
  };
}