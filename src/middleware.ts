import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig, isAllowed } from '@/auth.config'

const locales = ['en', 'ko']

// Edge-safe Auth.js instance (no DB adapter, JWT sessions).
const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hostname = request.nextUrl.hostname

  // Admin dashboard — internal tool, no i18n. Gated by Google sign-in with an
  // explicit email allowlist (see auth.config.ts). Fails closed.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const session = await auth()
    if (!isAllowed(session?.user?.email)) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.search = `?next=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Client payment pages are their own bilingual route (Korean-first) and must
  // not be locale-rewritten — /pay/<token> would become /en/pay/<token> and 404.
  if (pathname === '/pay' || pathname.startsWith('/pay/')) {
    return NextResponse.next()
  }

  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'


  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Keep /en routable during local development to avoid rewrite/redirect loops.
    if (!isLocalHost && (pathname === '/en' || pathname.startsWith('/en/'))) {
      const newPath = pathname.replace(/^\/en/, '') || '/'
      const url = request.nextUrl.clone()
      url.pathname = newPath
      return NextResponse.redirect(url, { status: 301 })
    }
    // Korean paths stay as-is
    return NextResponse.next()
  }

  // For paths without locale, rewrite to /en internally (don't change URL)
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (including .html and .txt).
    // /llms.txt is intentionally NOT matched — it is served by the static
    // public/llms.txt file (single source of truth, fresh on every deploy).
    // .txt exclusion is critical — IndexNow verification key file lives at
    // /<key>.txt and middleware was 404ing it via locale rewrite.
    '/((?!_next|api|favicon.ico|manifest.json|site.webmanifest|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.mp4|.*\\.webm|.*\\.ogg|.*\\.html|.*\\.txt).*)',
  ],
}
