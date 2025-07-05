import type { ModuleDetectionResult } from '../types/chat';

/**
 * Simple in-memory cache for module detection results
 */
export class ModuleCache {
  private cache: Map<string, { 
    result: ModuleDetectionResult[], 
    timestamp: number, 
    context?: string 
  }> = new Map();
  
  private maxCacheSize: number = 100;
  private cacheExpiryMs: number = 5 * 60 * 1000; // 5 minutes

  constructor(maxSize?: number, expiryMs?: number) {
    if (maxSize) this.maxCacheSize = maxSize;
    if (expiryMs) this.cacheExpiryMs = expiryMs;
  }

  /**
   * Generates cache key from query and context
   */
  private generateCacheKey(query: string, context?: any): string {
    const normalizedQuery = query.toLowerCase().trim();
    const contextHash = context ? JSON.stringify({
      category: context.currentCategory,
      topics: context.sessionTopics?.slice(0, 3) || []
    }) : 'no-context';
    
    return `${normalizedQuery}:${contextHash}`;
  }

  /**
   * Gets cached result if available and not expired
   */
  public get(query: string, context?: any): ModuleDetectionResult[] | null {
    const key = this.generateCacheKey(query, context);
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    // Check if expired
    if (Date.now() - cached.timestamp > this.cacheExpiryMs) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.result;
  }

  /**
   * Stores result in cache
   */
  public set(query: string, result: ModuleDetectionResult[], context?: any): void {
    const key = this.generateCacheKey(query, context);
    
    // Clean up expired entries and manage size
    this.cleanup();
    
    this.cache.set(key, {
      result: [...result], // Deep copy to prevent mutations
      timestamp: Date.now(),
      context: context?.currentCategory
    });
  }

  /**
   * Cleans up expired entries and manages cache size
   */
  private cleanup(): void {
    const now = Date.now();
    
    // Remove expired entries
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheExpiryMs) {
        this.cache.delete(key);
      }
    }
    
    // If still too large, remove oldest entries
    if (this.cache.size >= this.maxCacheSize) {
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toDelete = entries.slice(0, Math.floor(this.maxCacheSize * 0.2));
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }

  /**
   * Clears entire cache
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Gets cache statistics
   */
  public getStats(): {
    size: number;
    maxSize: number;
    hitRate?: number;
    oldestEntry?: number;
  } {
    const now = Date.now();
    let oldestTimestamp = now;
    
    for (const value of this.cache.values()) {
      if (value.timestamp < oldestTimestamp) {
        oldestTimestamp = value.timestamp;
      }
    }
    
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      oldestEntry: this.cache.size > 0 ? Math.floor((now - oldestTimestamp) / 1000) : undefined
    };
  }

  /**
   * Updates cache configuration
   */
  public updateConfig(config: { maxSize?: number; expiryMs?: number }): void {
    if (config.maxSize !== undefined) {
      this.maxCacheSize = Math.max(10, Math.min(1000, config.maxSize));
    }
    if (config.expiryMs !== undefined) {
      this.cacheExpiryMs = Math.max(60000, Math.min(3600000, config.expiryMs)); // 1min to 1hour
    }
  }
}