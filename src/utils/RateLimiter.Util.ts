type RecordEntry = { count: number; lastRequest: number };

const rateLimitMap = new Map<string, RecordEntry>();

const WINDOW_MS = 2 * 60 * 1000; // 2 minute window
const MAX_REQUESTS = 1; // Max 1 messages/min per IP

export function rateLimit(identifier: string): {
  success: boolean;
  message?: string;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    rateLimitMap.set(identifier, { count: 1, lastRequest: now });
    return { success: true };
  }

  const timePassed = now - entry.lastRequest;

  if (timePassed > WINDOW_MS) {
    // Reset window
    rateLimitMap.set(identifier, { count: 1, lastRequest: now });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, message: 'Too many requests. Try again later.' };
  }

  entry.count++;
  entry.lastRequest = now;
  rateLimitMap.set(identifier, entry);
  return { success: true };
}
