/**
 * Limite « best effort » par IP (mémoire du processus).
 * Sur plusieurs instances serverless, chaque instance a son propre compteur.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_POSTS_PER_WINDOW = 15;

const buckets = new Map<string, number[]>();

export function consumeLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = buckets.get(ip) ?? [];
  const pruned = arr.filter((t) => now - t < WINDOW_MS);
  if (pruned.length >= MAX_POSTS_PER_WINDOW) {
    buckets.set(ip, pruned);
    return false;
  }
  pruned.push(now);
  buckets.set(ip, pruned);
  return true;
}

export function loginAttemptClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
