import { cookies } from 'next/headers'
import { ADMIN_COOKIE, expectedToken } from '@/lib/admin/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }))
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'invalid' }, { status: 401 })
  }
  cookies().set(ADMIN_COOKIE, await expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return Response.json({ ok: true })
}

export async function DELETE() {
  cookies().delete(ADMIN_COOKIE)
  return Response.json({ ok: true })
}
