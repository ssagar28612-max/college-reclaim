// Simple in-memory rate limiter
// For production, consider using Redis or a database-backed solution

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 } // 10 requests per minute default
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired entry
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // Increment existing entry
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: entry.count <= config.maxRequests,
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetTime: entry.resetTime,
  };
}

// Specific rate limiter for messaging
export function rateLimitMessages(userId: string) {
  return rateLimit(`message:${userId}`, {
    maxRequests: 30, // 30 messages
    windowMs: 60000, // per minute
  });
}

// Specific rate limiter for creating conversations
export function rateLimitConversations(userId: string) {
  return rateLimit(`conversation:${userId}`, {
    maxRequests: 10, // 10 new conversations
    windowMs: 3600000, // per hour
  });
}
