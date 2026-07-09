import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

/**
 * Edge-safe Auth.js config.
 *
 * The admin dashboard exposes GA4, Search Console, Google Ads and (soon)
 * client billing data, so access is restricted to an explicit allowlist of
 * Google accounts. There is no shared password to brute-force, and the
 * owner's Google 2FA is inherited for free.
 *
 * Allowlist comes from ADMIN_ALLOWED_EMAILS (comma-separated). If it is unset
 * we fail CLOSED — nobody gets in — rather than silently allowing everyone.
 */
export const allowedEmails = (): string[] =>
  (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

export const isAllowed = (email?: string | null): boolean => {
  if (!email) return false
  const list = allowedEmails()
  if (list.length === 0) return false
  return list.includes(email.toLowerCase())
}

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      // Login only — we never request Google API scopes here. The server-side
      // Google API access uses its own long-lived refresh token.
      authorization: { params: { scope: 'openid email profile', prompt: 'select_account' } },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 },
  callbacks: {
    // Runs before a session is ever issued. This is the real gate.
    signIn({ profile, user }) {
      const email = (profile?.email as string | undefined) ?? user?.email
      const verified = (profile as { email_verified?: boolean } | undefined)?.email_verified
      if (verified === false) return false
      return isAllowed(email)
    },
    // Re-check on every request: revoking an email in env locks them out
    // immediately, without waiting for the JWT to expire.
    jwt({ token }) {
      token.allowed = isAllowed(token.email)
      return token
    },
    session({ session, token }) {
      ;(session as { allowed?: boolean }).allowed = Boolean(token.allowed)
      return session
    },
    // Guards /admin/* at the edge (middleware).
    authorized({ auth }) {
      return Boolean(auth?.user?.email && isAllowed(auth.user.email))
    },
  },
  trustHost: true,
} satisfies NextAuthConfig
