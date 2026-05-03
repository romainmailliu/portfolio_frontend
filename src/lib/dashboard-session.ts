/** Session dashboard : HMAC via Web Crypto (Edge middleware + routes Node). */

const SESSION_SEP = ".";

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

function hexToBytes(hex: string): Uint8Array | null {
  const lower = hex.toLowerCase();
  if (!/^[0-9a-f]*$/.test(lower) || lower.length % 2 !== 0) return null;
  const out = new Uint8Array(lower.length / 2);
  for (let i = 0; i < out.length; i++) {
    const v = Number.parseInt(lower.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(v)) return null;
    out[i] = v;
  }
  return out;
}

export function timingSafeEqualHex(a: string, b: string): boolean {
  const ba = hexToBytes(a);
  const bb = hexToBytes(b);
  if (!ba || !bb || ba.length !== bb.length) return false;
  return timingSafeEqualBytes(ba, bb);
}

export function randomHex(byteLength: number): string {
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Valeur du cookie : identifiant opaque + signature (révoquée si tu changes le secret). */
export async function createDashboardSessionCookie(secret: string): Promise<string> {
  const id = randomHex(24);
  const sig = await hmacSha256Hex(secret, id);
  return `${id}${SESSION_SEP}${sig}`;
}

export async function verifyDashboardSessionCookie(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(SESSION_SEP);
  if (dot <= 0 || dot >= token.length - 1) return false;
  const id = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[0-9a-f]+$/i.test(id) || !/^[0-9a-f]+$/i.test(sig)) return false;
  const expected = await hmacSha256Hex(secret, id);
  return timingSafeEqualHex(sig, expected);
}

const CSRF_SEP = ":";

/** Jeton pour formulaire POST déconnexion (validité courte). */
export async function createLogoutCsrfToken(secret: string): Promise<string> {
  const exp = Date.now() + 2 * 60 * 60 * 1000;
  const nonce = randomHex(16);
  const payload = `${exp}${CSRF_SEP}${nonce}`;
  const sig = await hmacSha256Hex(secret, `logout:${payload}`);
  return `${payload}${CSRF_SEP}${sig}`;
}

export async function verifyLogoutCsrfToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(CSRF_SEP);
  if (parts.length !== 3) return false;
  const exp = Number(parts[0]);
  const nonce = parts[1];
  const sig = parts[2];
  if (!Number.isFinite(exp) || !nonce || !sig) return false;
  if (Date.now() > exp) return false;
  const payload = `${exp}${CSRF_SEP}${nonce}`;
  const expected = await hmacSha256Hex(secret, `logout:${payload}`);
  return timingSafeEqualHex(sig, expected);
}
