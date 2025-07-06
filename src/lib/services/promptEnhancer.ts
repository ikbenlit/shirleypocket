import type { ModuleInfo, ModuleReference, ModuleContext, ContextualModuleResult } from '../types/chat.js';

/**
 * Service for enhancing prompts with dynamic module context
 */
export class PromptEnhancer {
  private maxModulesInPrompt: number = 4;
  private maxPromptLength: number = 4000; // Conservative limit for chat models
  private moduleReferenceTemplate: string;
  private templates: Record<string, string>;

  constructor() {
    // Strenge instructie om URL hallucinatie te voorkomen
    const urlInstruction = `BELANGRIJK: Gebruik UITSLUITEND de URL die hierboven wordt gegeven. Verzin NOOIT een URL. Als een URL niet beschikbaar is, zeg dan dat je de link niet kunt vinden.`;

    this.moduleReferenceTemplate = `
**Relevante Modules:**
{{moduleList}}

${urlInstruction}`;
    
    this.templates = {
      detailed: `
**Relevante Modules:**
{{moduleList}}

${urlInstruction}`,
      
      quick: `
**Relevante Info:** {{moduleList}}`,
      
      fallback: `
**Zie ook:** {{moduleList}}`,
      
      inline: `Relevante modules: {{moduleList}}`,
      
      contextual: `
**Gebaseerd op je vraag, deze modules kunnen helpen:**
{{moduleList}}

{{contextNote}}
${urlInstruction}`,
      
      category: `
**{{categoryName}} Modules:**
{{moduleList}}

Deze modules zijn specifiek relevant voor {{categoryName}}.
${urlInstruction}`
    };
  }

  /**
   * Injects module context into the base prompt
   */
  public injectModuleContext(
    basePrompt: string, 
    modules: ModuleInfo[] | ContextualModuleResult[], 
    userQuery?: string,
    options: {
      template?: string;
      contextNote?: string;
      categoryName?: string;
      maxModules?: number;
    } = {}
  ): string {
    if (!modules || modules.length === 0) {
      return basePrompt;
    }

    // Convert to module references
    const moduleReferences = this.createModuleReferences(modules, userQuery);
    
    // Prioritize and limit modules
    const maxModules = options.maxModules || this.maxModulesInPrompt;
    const prioritizedModules = this.prioritizeModulesForPrompt(moduleReferences, maxModules);
    
    // Format module context using specified template
    const templateName = options.template || 'detailed';
    const moduleContext = this.formatModuleContextWithTemplate(
      prioritizedModules, 
      templateName, 
      options
    );
    
    // Inject into prompt
    const enhancedPrompt = this.combinePromptWithContext(basePrompt, moduleContext);
    
    // Ensure prompt length limits
    return this.maintainPromptLength(enhancedPrompt, this.maxPromptLength);
  }

  /**
   * Creates module references from module data
   */
  private createModuleReferences(
    modules: ModuleInfo[] | ContextualModuleResult[], 
    userQuery?: string
  ): ModuleReference[] {
    return modules.map((item, index) => {
      const module = 'module' in item ? item.module : item;
      const contextualInfo = 'contextReason' in item ? item : null;
      
      // Generate context description
      let context = `Module ${index + 1}`;
      if (contextualInfo?.contextReason && contextualInfo.contextReason !== 'no context') {
        context += ` (${contextualInfo.contextReason})`;
      }
      
      // Add query relevance info
      if (userQuery && module.topics) {
        const relevantTopics = this.findRelevantTopics(userQuery, module.topics);
        if (relevantTopics.length > 0) {
          context += ` - relevant voor: ${relevantTopics.slice(0, 2).join(', ')}`;
        }
      }

      return {
        id: module.id,
        title: module.title,
        url: module.url,
        context,
        priority: contextualInfo?.relevanceScore || 1.0
      };
    });
  }

  /**
   * Prioritizes modules for inclusion in prompt
   */
  private prioritizeModulesForPrompt(modules: ModuleReference[], maxModules?: number): ModuleReference[] {
    // Sort by priority (relevance score)
    const sorted = modules.sort((a, b) => b.priority - a.priority);
    
    // Take top modules within limit
    const limit = maxModules || this.maxModulesInPrompt;
    return sorted.slice(0, limit);
  }

  /**
   * Formats module context for prompt injection
   */
  private formatModuleContext(modules: ModuleReference[]): string {
    if (modules.length === 0) {
      return '';
    }

    const moduleList = modules.map(module => 
      `- **${module.title}**: [Link](${module.url})\n  ${module.context}`
    ).join('\n');

    return this.moduleReferenceTemplate.replace('{{moduleList}}', moduleList);
  }

  /**
   * Formats module context using specified template
   */
  private formatModuleContextWithTemplate(
    modules: ModuleReference[], 
    templateName: string, 
    options: {
      contextNote?: string;
      categoryName?: string;
    } = {}
  ): string {
    if (modules.length === 0) {
      return '';
    }

    // Get template
    const template = this.templates[templateName] || this.templates.detailed;
    
    // Format module list based on template type
    let moduleList: string;
    
    switch (templateName) {
      case 'quick':
      case 'fallback':
      case 'inline':
        moduleList = modules.map(m => m.title).join(', ');
        break;
      
      case 'contextual':
        moduleList = modules.map(module => 
          `- **${module.title}**: [Link](${module.url})\n  ${module.context}`
        ).join('\n');
        break;
      
      case 'category':
        moduleList = modules.map(module => 
          `- **${module.title}**: [Link](${module.url})`
        ).join('\n');
        break;
      
      case 'detailed':
      default:
        moduleList = modules.map(module => 
          `- **${module.title}**: [Link](${module.url})\n  ${module.context}`
        ).join('\n');
        break;
    }
    
    // Replace template variables
    let result = template.replace('{{moduleList}}', moduleList);
    
    if (options.contextNote) {
      result = result.replace('{{contextNote}}', options.contextNote);
    }
    
    if (options.categoryName) {
      result = result.replace(/\{\{categoryName\}\}/g, options.categoryName);
    }
    
    return result;
  }

  /**
   * Combines base prompt with module context
   */
  private combinePromptWithContext(basePrompt: string, moduleContext: string): string {
    if (!moduleContext.trim()) {
      return basePrompt;
    }

    // Find the best insertion point in the base prompt
    const insertionPoint = this.findOptimalInsertionPoint(basePrompt);
    
    if (insertionPoint === -1) {
      // Fallback: append at the end
      return `${basePrompt}\n\n${moduleContext}`;
    }

    // Insert at optimal point
    return basePrompt.slice(0, insertionPoint) + 
           `\n\n${moduleContext}\n\n` + 
           basePrompt.slice(insertionPoint);
  }

  /**
   * Finds optimal insertion point for module context
   */
  private findOptimalInsertionPoint(prompt: string): number {
    // Look for specific sections where module context fits well
    const preferredSections = [
      /## Ondersteunde Onderwerpen/i,
      /## Veelgestelde Vragen/i,
      /## Doorverwijzingen/i,
      /## Antwoordstructuur/i
    ];

    for (const section of preferredSections) {
      const match = prompt.match(section);
      if (match && match.index !== undefined) {
        return match.index;
      }
    }

    // If no preferred section found, look for end of core instructions
    const coreEndMarkers = [
      /## Wat NOOIT te doen/i,
      /## Emergency Responses/i,
      /---/
    ];

    for (const marker of coreEndMarkers) {
      const match = prompt.match(marker);
      if (match && match.index !== undefined) {
        return match.index;
      }
    }

    return -1; // No good insertion point found
  }

  /**
   * Maintains prompt within length limits
   */
  public maintainPromptLength(prompt: string, maxLength: number): string {
    if (prompt.length <= maxLength) {
      return prompt;
    }

    // Try to truncate module context first
    const moduleContextMatch = prompt.match(/\*\*Relevante Modules:\*\*(.*?)(?=\n\n[^-])/s);
    
    if (moduleContextMatch) {
      const moduleContext = moduleContextMatch[0];
      const moduleLines = moduleContext.split('\n').filter(line => line.trim());
      
      // Remove modules one by one until we're under the limit
      while (prompt.length > maxLength && moduleLines.length > 3) {
        // Remove the last module (keep at least header + 1 module)
        const lastModuleStart = moduleLines.findLastIndex(line => line.startsWith('- **'));
        if (lastModuleStart > 2) {
          moduleLines.splice(lastModuleStart, 2); // Remove module and its context line
          const newModuleContext = moduleLines.join('\n');
          prompt = prompt.replace(moduleContext, newModuleContext);
        } else {
          break;
        }
      }
    }

    // If still too long, remove module context entirely
    if (prompt.length > maxLength) {
      prompt = prompt.replace(/\n\n\*\*Relevante Modules:\*\*.*?(?=\n\n[^-])/s, '');
    }

    // Last resort: truncate from the end
    if (prompt.length > maxLength) {
      prompt = prompt.slice(0, maxLength - 100) + '\n\n[Prompt truncated for length]';
    }

    return prompt;
  }

  /**
   * Finds topics relevant to the user query
   */
  private findRelevantTopics(query: string, topics: string[]): string[] {
    const normalizedQuery = query.toLowerCase();
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
    
    return topics.filter(topic => {
      const normalizedTopic = topic.toLowerCase();
      return queryWords.some(word => normalizedTopic.includes(word));
    });
  }

  /**
   * Creates a module context summary for shorter prompts
   */
  public createCompactModuleContext(modules: ModuleInfo[] | ContextualModuleResult[]): ModuleContext {
    const moduleReferences = this.createModuleReferences(modules);
    const prioritized = this.prioritizeModulesForPrompt(moduleReferences);
    
    return {
      relevantModules: prioritized,
      totalModules: modules.length,
      searchQuery: '', // Will be filled by caller
      category: this.inferPrimaryCategory(modules)
    };
  }

  /**
   * Infers the primary category from a set of modules
   */
  private inferPrimaryCategory(modules: ModuleInfo[] | ContextualModuleResult[]): string | undefined {
    const categoryCount: Record<string, number> = {};
    
    modules.forEach(item => {
      const module = 'module' in item ? item.module : item;
      categoryCount[module.category] = (categoryCount[module.category] || 0) + 1;
    });

    const categories = Object.entries(categoryCount);
    if (categories.length === 0) return undefined;
    
    categories.sort((a, b) => b[1] - a[1]);
    return categories[0][0];
  }

  /**
   * Formats a single module reference for inline use
   */
  public formatModuleReference(module: ModuleInfo): string {
    return `[${module.title}](${module.url})`;
  }

  /**
   * Creates a contextual prompt addition for specific scenarios
   */
  public createContextualPromptAddition(
    modules: ModuleInfo[] | ContextualModuleResult[],
    scenario: 'detailed' | 'quick' | 'fallback' | 'contextual' | 'category' | 'inline' = 'detailed',
    options: {
      contextNote?: string;
      categoryName?: string;
      maxModules?: number;
    } = {}
  ): string {
    if (!modules || modules.length === 0) {
      return '';
    }

    const moduleRefs = this.createModuleReferences(modules);
    const moduleLimit = options.maxModules || (scenario === 'quick' ? 2 : 4);
    const topModules = moduleRefs.slice(0, moduleLimit);

    return this.formatModuleContextWithTemplate(topModules, scenario, options);
  }

  /**
   * Gets available template names
   */
  public getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }

  /**
   * Gets a specific template content
   */
  public getTemplate(templateName: string): string | undefined {
    return this.templates[templateName];
  }

  /**
   * Adds or updates a template
   */
  public setTemplate(templateName: string, template: string): void {
    this.templates[templateName] = template;
  }

  /**
   * Gets configuration for debugging
   */
  public getConfig(): Record<string, any> {
    return {
      maxModulesInPrompt: this.maxModulesInPrompt,
      maxPromptLength: this.maxPromptLength,
      templateLength: this.moduleReferenceTemplate.length
    };
  }

  /**
   * Updates configuration
   */
  public updateConfig(config: {
    maxModulesInPrompt?: number;
    maxPromptLength?: number;
  }): void {
    if (config.maxModulesInPrompt !== undefined) {
      this.maxModulesInPrompt = Math.max(1, Math.min(10, config.maxModulesInPrompt));
    }
    if (config.maxPromptLength !== undefined) {
      this.maxPromptLength = Math.max(1000, Math.min(8000, config.maxPromptLength));
    }
  }
}