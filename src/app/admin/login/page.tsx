import { redirect } from 'next/navigation'
import { auth, signIn } from '@/auth'
import { isAllowed } from '@/auth.config'

export const dynamic = 'force-dynamic'

const ERRORS: Record<string, string> = {
  AccessDenied: 'That Google account is not authorized for this dashboard.',
  Configuration: 'Sign-in is misconfigured. Check the Google OAuth env vars.',
  OAuthAccountNotLinked: 'That account cannot be used to sign in.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string }
}) {
  const session = await auth()
  if (isAllowed(session?.user?.email)) redirect(searchParams.next || '/admin')

  const error = searchParams.error ? ERRORS[searchParams.error] ?? 'Sign-in failed.' : null

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-1 font-semibold tracking-tight text-zinc-100">
          ZOE <span className="font-light text-zinc-400">LUMOS</span>
        </div>
        <h1 className="mb-6 text-sm text-zinc-500">Internal dashboard — sign in</h1>

        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: searchParams.next || '/admin' })
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-90"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A21.99 21.99 0 0 0 24 46z" />
              <path fill="#FBBC05" d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
            </svg>
            Continue with Google
          </button>
        </form>

        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

        <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
          Only approved Google accounts can access this dashboard. There is no
          shared password.
        </p>
      </div>
    </div>
  )
}
