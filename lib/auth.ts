export const SESSION_COOKIE = "dr_admin_session";
export const SESSION_HOURS = 8;

/*
 * Stateless signed session: `<adminId>.<issuedAt>.<expiresAt>.<signature>`.
 * Uses Web Crypto HMAC so the same code verifies it in proxy.ts and in server code.
 * `issuedAt` lets server code reject sessions created before a password change.
 */

export type Session = { adminId: string; issuedAt: number; expiresAt: number };

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("Missing ADMIN_SESSION_SECRET. See .env.example.");
  return value;
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(adminId: string): Promise<string> {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_HOURS * 60 * 60 * 1000;
  const payload = `${adminId}.${issuedAt}.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<Session | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [adminId, issued, expires, signature] = parts;
  if (!safeEqual(signature, await sign(`${adminId}.${issued}.${expires}`))) return null;
  const session = { adminId, issuedAt: Number(issued), expiresAt: Number(expires) };
  if (!Number.isFinite(session.expiresAt) || session.expiresAt < Date.now()) return null;
  return session;
}
