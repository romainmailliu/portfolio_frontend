import { createHash, timingSafeEqual } from "node:crypto";

/** Compare deux secrets UTF-8 sans fuite notable par timing sur la chaîne brute. */
export function timingSafePasswordEqual(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}
