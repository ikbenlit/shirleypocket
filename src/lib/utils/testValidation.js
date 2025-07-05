// Simple runtime test for module validation
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const moduleData = JSON.parse(readFileSync(join(__dirname, '../data/modules.json'), 'utf8'));
const chatData = JSON.parse(readFileSync(join(__dirname, '../data/chat_category.json'), 'utf8'));

// Basic validation checks
function testModuleValidation() {
  console.log('🧪 Testing Module Data Validation...');
  
  // Test 1: Check structure
  const requiredFields = ['version', 'createdAt', 'updatedAt', 'modules'];
  const hasRequiredFields = requiredFields.every(field => field in moduleData);
  console.log(`✅ Required fields present: ${hasRequiredFields}`);
  
  // Test 2: Check module count
  const totalModules = moduleData.modules.length + 
                      (moduleData.standalone?.length || 0) + 
                      (moduleData.faq?.length || 0);
  console.log(`📊 Total modules: ${totalModules}`);
  
  // Test 3: Check categories
  const validCategories = chatData.categoriesData.map(cat => cat.id);
  const allModules = [
    ...moduleData.modules,
    ...(moduleData.standalone || []),
    ...(moduleData.faq || [])
  ];
  
  const invalidCategories = allModules.filter(mod => !validCategories.includes(mod.category));
  console.log(`✅ Invalid categories: ${invalidCategories.length}`);
  
  // Test 4: Check URLs
  const invalidUrls = allModules.filter(mod => !mod.url.startsWith('https://'));
  console.log(`✅ Invalid URLs: ${invalidUrls.length}`);
  
  // Test 5: Check unique IDs
  const ids = allModules.map(mod => mod.id);
  const uniqueIds = new Set(ids);
  const hasDuplicates = ids.length !== uniqueIds.size;
  console.log(`✅ Duplicate IDs: ${hasDuplicates ? 'Found' : 'None'}`);
  
  // Test 6: Check topics
  const modulesWithoutTopics = allModules.filter(mod => !mod.topics || mod.topics.length === 0);
  console.log(`✅ Modules without topics: ${modulesWithoutTopics.length}`);
  
  // Summary
  const validationPassed = hasRequiredFields && 
                          invalidCategories.length === 0 && 
                          invalidUrls.length === 0 && 
                          !hasDuplicates && 
                          modulesWithoutTopics.length === 0;
  
  console.log(`\n${validationPassed ? '🎉' : '❌'} Validation ${validationPassed ? 'PASSED' : 'FAILED'}`);
  
  if (!validationPassed) {
    if (invalidCategories.length > 0) {
      console.log('Invalid categories found:', invalidCategories.map(m => `${m.id}: ${m.category}`));
    }
    if (invalidUrls.length > 0) {
      console.log('Invalid URLs found:', invalidUrls.map(m => `${m.id}: ${m.url}`));
    }
    if (modulesWithoutTopics.length > 0) {
      console.log('Modules without topics:', modulesWithoutTopics.map(m => m.id));
    }
  }
  
  return validationPassed;
}

// Run test
testModuleValidation();