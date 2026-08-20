/**
 * Limite « best effort » par IP pour le formulaire de candidature.
 * Même approche que `login-rate-limit.ts` : compteur en mémoire du processus.
 * Sur plusieurs instances serverless, chaque instance a son propre compteur —
 * suffisant au volume visé, l'objectif étant d'écrêter le spam automatisé.
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const buckets = new Map<string, number[]>();

export function consumeLeadRateLimit(ip: string): boolean {
  const now = Date.now();
  const pruned = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (pruned.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    buckets.set(ip, pruned);
    return false;
  }

  pruned.push(now);
  buckets.set(ip, pruned);
  return true;
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
