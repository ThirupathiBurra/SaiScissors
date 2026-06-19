/**
 * In-memory rate limiter for Edge/Server API routes
 * Limits requests per session ID
 */
const rateMap = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export const checkRateLimit = (sessionId: string): boolean => {
  const now = Date.now();
  const record = rateMap.get(sessionId);

  if (!record) {
    rateMap.set(sessionId, { count: 1, windowStart: now });
    return true; // Allowed
  }

  if (now - record.windowStart > WINDOW_MS) {
    // Reset window
    rateMap.set(sessionId, { count: 1, windowStart: now });
    return true; // Allowed
  }

  if (record.count >= MAX_REQUESTS) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
};
