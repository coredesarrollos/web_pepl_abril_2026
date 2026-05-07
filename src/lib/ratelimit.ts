import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Returns a Ratelimit instance bound to the given namespace, or null when
 * Upstash is not configured (local dev). Callers should treat null as
 * "no rate limiting" (only safe in dev).
 */
export function getLimiter(namespace: string, max: number, window: '1 m' | '1 h' | '1 d') {
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(max, window),
    analytics: true,
    prefix: `pepl:${namespace}`,
  });
}

/** Best-effort client IP extraction. */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? '0.0.0.0';
}
