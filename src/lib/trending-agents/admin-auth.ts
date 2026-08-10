import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ld_admin";

/**
 * The admin area is gated by a single shared password held in an environment
 * variable. There is no user database — this protects an internal authoring
 * tool, not customer data.
 *
 * If `ADMIN_PASSWORD` is unset the area stays locked rather than open, so a
 * missing env var can never accidentally publish the panel.
 */
function adminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : null;
}

/** Secret used to sign the session cookie. Falls back to the password. */
function signingSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? adminPassword();
}

/** The value we expect to find in the cookie for a valid session. */
export function expectedToken(): string | null {
  const secret = signingSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update("trending-agents-admin").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** True when the submitted password matches the configured one. */
export function verifyPassword(submitted: string): boolean {
  const expected = adminPassword();
  if (!expected) return false;
  return safeEqual(submitted, expected);
}

/** True when the request carries a valid admin session cookie. */
export async function isAuthenticated(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, expected);
}

/** Whether an admin password is configured at all. */
export function isAdminConfigured(): boolean {
  return adminPassword() !== null;
}
