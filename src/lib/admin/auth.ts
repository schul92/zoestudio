// Lightweight single-user admin auth. Cookie value is a SHA-256 of
// ADMIN_PASSWORD:ADMIN_SECRET. Works in both the edge (middleware) and node
// (route handlers) runtimes via the global Web Crypto API.

export const ADMIN_COOKIE = 'zl_admin'

export async function expectedToken(): Promise<string> {
  const secret = `${process.env.ADMIN_PASSWORD ?? ''}:${process.env.ADMIN_SECRET ?? ''}`
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret))
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function isValidToken(token?: string | null): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false
  return token === (await expectedToken())
}
