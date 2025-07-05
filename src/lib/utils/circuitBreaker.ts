/**
 * Circuit breaker implementation for module detection services
 */
export class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  private readonly failureThreshold: number;
  private readonly recoveryTimeMs: number;
  private readonly timeoutMs: number;

  constructor(options: {
    failureThreshold?: number;
    recoveryTimeMs?: number;
    timeoutMs?: number;
  } = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.recoveryTimeMs = options.recoveryTimeMs || 60000; // 1 minute
    this.timeoutMs = options.timeoutMs || 100; // 100ms
  }

  /**
   * Executes a function with circuit breaker protection
   */
  async execute<T>(fn: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeMs) {
        this.state = 'half-open';
      } else {
        // Circuit is open, use fallback or throw
        if (fallback) {
          return fallback();
        }
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      // Add timeout to the function execution
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Operation timeout')), this.timeoutMs)
        )
      ]);

      // Success - reset failures if we were in half-open state
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failures = 0;
      }

      return result;
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.failures >= this.failureThreshold) {
        this.state = 'open';
      }

      // Use fallback if available
      if (fallback) {
        return fallback();
      }

      throw error;
    }
  }

  /**
   * Gets the current state of the circuit breaker
   */
  getState(): {
    state: string;
    failures: number;
    lastFailureTime: number;
    isOperational: boolean;
  } {
    return {
      state: this.state,
      failures: this.failures,
      lastFailureTime: this.lastFailureTime,
      isOperational: this.state === 'closed'
    };
  }

  /**
   * Manually resets the circuit breaker
   */
  reset(): void {
    this.state = 'closed';
    this.failures = 0;
    this.lastFailureTime = 0;
  }

  /**
   * Updates circuit breaker configuration
   */
  updateConfig(config: {
    failureThreshold?: number;
    recoveryTimeMs?: number;
  }): void {
    if (config.failureThreshold !== undefined) {
      this.failureThreshold = Math.max(1, Math.min(20, config.failureThreshold));
    }
    if (config.recoveryTimeMs !== undefined) {
      this.recoveryTimeMs = Math.max(10000, Math.min(600000, config.recoveryTimeMs));
    }
  }
}