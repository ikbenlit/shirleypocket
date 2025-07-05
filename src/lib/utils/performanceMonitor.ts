/**
 * Performance monitoring for module detection and prompt enhancement
 */
export class PerformanceMonitor {
  private metrics: Map<string, {
    count: number;
    totalTime: number;
    minTime: number;
    maxTime: number;
    avgTime: number;
    errors: number;
    lastUpdate: number;
  }> = new Map();

  private timeouts: Map<string, number> = new Map();
  private maxMetricsAge: number = 60 * 60 * 1000; // 1 hour

  constructor() {}

  /**
   * Starts timing an operation
   */
  public startTiming(operationId: string): string {
    const timingId = `${operationId}_${Date.now()}_${Math.random()}`;
    this.timeouts.set(timingId, performance.now());
    return timingId;
  }

  /**
   * Ends timing and records the metric
   */
  public endTiming(timingId: string, success: boolean = true): number {
    const startTime = this.timeouts.get(timingId);
    if (!startTime) {
      console.warn('PerformanceMonitor: No start time found for', timingId);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timeouts.delete(timingId);

    // Extract operation name from timingId
    const operationName = timingId.split('_')[0];
    this.recordMetric(operationName, duration, success);

    return duration;
  }

  /**
   * Records a metric directly
   */
  public recordMetric(operation: string, duration: number, success: boolean = true): void {
    const existing = this.metrics.get(operation);
    const now = Date.now();

    if (existing) {
      existing.count++;
      existing.totalTime += duration;
      existing.minTime = Math.min(existing.minTime, duration);
      existing.maxTime = Math.max(existing.maxTime, duration);
      existing.avgTime = existing.totalTime / existing.count;
      existing.lastUpdate = now;
      
      if (!success) {
        existing.errors++;
      }
    } else {
      this.metrics.set(operation, {
        count: 1,
        totalTime: duration,
        minTime: duration,
        maxTime: duration,
        avgTime: duration,
        errors: success ? 0 : 1,
        lastUpdate: now
      });
    }

    // Cleanup old metrics
    this.cleanupOldMetrics();
  }

  /**
   * Gets performance metrics for an operation
   */
  public getMetrics(operation: string): {
    count: number;
    avgTime: number;
    minTime: number;
    maxTime: number;
    errorRate: number;
    totalTime: number;
  } | null {
    const metric = this.metrics.get(operation);
    if (!metric) return null;

    return {
      count: metric.count,
      avgTime: Math.round(metric.avgTime * 100) / 100,
      minTime: Math.round(metric.minTime * 100) / 100,
      maxTime: Math.round(metric.maxTime * 100) / 100,
      errorRate: Math.round((metric.errors / metric.count) * 100 * 100) / 100,
      totalTime: Math.round(metric.totalTime * 100) / 100
    };
  }

  /**
   * Gets all performance metrics
   */
  public getAllMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    
    for (const [operation, metric] of this.metrics.entries()) {
      result[operation] = {
        count: metric.count,
        avgTime: Math.round(metric.avgTime * 100) / 100,
        minTime: Math.round(metric.minTime * 100) / 100,
        maxTime: Math.round(metric.maxTime * 100) / 100,
        errorRate: Math.round((metric.errors / metric.count) * 100 * 100) / 100,
        totalTime: Math.round(metric.totalTime * 100) / 100
      };
    }
    
    return result;
  }

  /**
   * Checks if an operation is performing within acceptable limits
   */
  public isPerformanceAcceptable(operation: string, maxAvgTime: number = 100): boolean {
    const metric = this.metrics.get(operation);
    if (!metric) return true; // No data, assume OK
    
    return metric.avgTime <= maxAvgTime && (metric.errors / metric.count) < 0.05; // <5% error rate
  }

  /**
   * Gets performance summary
   */
  public getSummary(): {
    totalOperations: number;
    totalTime: number;
    avgResponseTime: number;
    errorRate: number;
    slowestOperation?: string;
    fastestOperation?: string;
  } {
    let totalOps = 0;
    let totalTime = 0;
    let totalErrors = 0;
    let slowestOp = '';
    let slowestTime = 0;
    let fastestOp = '';
    let fastestTime = Infinity;

    for (const [operation, metric] of this.metrics.entries()) {
      totalOps += metric.count;
      totalTime += metric.totalTime;
      totalErrors += metric.errors;

      if (metric.avgTime > slowestTime) {
        slowestTime = metric.avgTime;
        slowestOp = operation;
      }

      if (metric.avgTime < fastestTime) {
        fastestTime = metric.avgTime;
        fastestOp = operation;
      }
    }

    return {
      totalOperations: totalOps,
      totalTime: Math.round(totalTime * 100) / 100,
      avgResponseTime: totalOps > 0 ? Math.round((totalTime / totalOps) * 100) / 100 : 0,
      errorRate: totalOps > 0 ? Math.round((totalErrors / totalOps) * 100 * 100) / 100 : 0,
      slowestOperation: slowestOp || undefined,
      fastestOperation: fastestTime !== Infinity ? fastestOp : undefined
    };
  }

  /**
   * Cleans up old metrics
   */
  private cleanupOldMetrics(): void {
    const now = Date.now();
    const cutoff = now - this.maxMetricsAge;

    for (const [operation, metric] of this.metrics.entries()) {
      if (metric.lastUpdate < cutoff) {
        this.metrics.delete(operation);
      }
    }
  }

  /**
   * Resets all metrics
   */
  public reset(): void {
    this.metrics.clear();
    this.timeouts.clear();
  }

  /**
   * Creates a timing wrapper for async functions
   */
  public wrapAsync<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const timingId = this.startTiming(operation);
    
    return fn()
      .then(result => {
        this.endTiming(timingId, true);
        return result;
      })
      .catch(error => {
        this.endTiming(timingId, false);
        throw error;
      });
  }

  /**
   * Creates a timing wrapper for sync functions
   */
  public wrapSync<T>(operation: string, fn: () => T): T {
    const timingId = this.startTiming(operation);
    
    try {
      const result = fn();
      this.endTiming(timingId, true);
      return result;
    } catch (error) {
      this.endTiming(timingId, false);
      throw error;
    }
  }
}