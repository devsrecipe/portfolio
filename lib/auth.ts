export const SESSION_COOKIE = "dr_admin_session";

/*
 * Demo auth: one invited admin from env vars. Replace with a real provider
 * (session store, hashed passwords) before connecting a backend.
 */
export function adminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@devsrecipe.local",
    password: process.env.ADMIN_PASSWORD ?? "change-me",
    secret: process.env.ADMIN_SESSION_SECRET ?? "dev-only-secret",
  };
}

/** SHA-256 hex of the secret, using Web Crypto so it also runs in the proxy. */
export async function sessionToken(): Promise<string> {
  const { email, secret } = adminCredentials();
  const data = new TextEncoder().encode(`${email}:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
}
