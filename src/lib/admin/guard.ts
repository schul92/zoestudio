// Node-only auth guard for /api/admin/* route handlers.
// (Kept separate from auth.ts so the edge middleware never imports next/headers.)
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, isValidToken } from './auth'

export async function authed(): Promise<boolean> {
  return isValidToken(cookies().get(ADMIN_COOKIE)?.value)
}

export function unauthorized() {
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })
}
