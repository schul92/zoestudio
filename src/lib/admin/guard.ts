// Node-only auth guard for /api/admin/* route handlers.
// Access requires a Google sign-in whose email is on ADMIN_ALLOWED_EMAILS.
import { auth } from '@/auth'
import { isAllowed } from '@/auth.config'

export async function authed(): Promise<boolean> {
  const session = await auth()
  return isAllowed(session?.user?.email)
}

export function unauthorized() {
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })
}
