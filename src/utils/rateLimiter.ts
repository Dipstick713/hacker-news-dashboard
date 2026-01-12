
/**
 * Simple client-side rate limiter to prevent API spamming.
 * Note: This can be bypassed by sophisticated bots but prevents 
 * basic script misuse and UI spam.
 */

class RateLimiter {
  private lastRequest: number = 0;
  private minInterval: number; // in ms
  private requestCount: number = 0;
  private maxRequestsPerMinute: number = 15;
  private windowStart: number = Date.now();
  private lastInteraction: number = Date.now();

  constructor(minInterval: number = 2000) {
    this.minInterval = minInterval;
    
    // Listen for real human interactions
    if (typeof window !== 'undefined') {
      const updateInteraction = () => { this.lastInteraction = Date.now(); };
      window.addEventListener('mousemove', updateInteraction);
      window.addEventListener('keydown', updateInteraction);
      window.addEventListener('scroll', updateInteraction);
      window.addEventListener('touchstart', updateInteraction);
    }
  }

  public async checkLimit(): Promise<boolean> {
    const now = Date.now();

    // Protocol: Humanity Verification
    // If no interaction in the last 2 minutes, treat as a potential bot/stale script
    if (now - this.lastInteraction > 120000) {
      console.warn("Security Protocol: No human interaction detected. Throttling requests.");
      return false;
    }

    // Check Window (Per Minute)
    if (now - this.windowStart > 60000) {
      this.windowStart = now;
      this.requestCount = 0;
    }

    if (this.requestCount >= this.maxRequestsPerMinute) {
      console.warn("Global rate limit exceeded for this session.");
      return false;
    }

    // Check Interval (Between consecutive calls)
    if (now - this.lastRequest < this.minInterval) {
      console.warn("Request throttled: Interval too short.");
      return false;
    }

    this.lastRequest = now;
    this.requestCount++;
    return true;
  }
}

export const aiRateLimiter = new RateLimiter(10000); // 10s cooldown for AI
export const dataRateLimiter = new RateLimiter(2000);   // 2s cooldown for HN Data
