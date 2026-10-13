import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig, isAllowed } from '@/auth.config'
import { STATE_SLUG_PAIRS } from '@/lib/stateSlugs'
import { US_LAUNCH_PATHS } from '@/data/usLaunch'
import { AWS_PATHS, LOGISTICS_PATHS } from '@/data/enterprise'

const locales = ['en', 'ko']

const KO_STATE_BY_EN = new Map(STATE_SLUG_PAIRS)
const EN_STATE_BY_KO = new Map(STATE_SLUG_PAIRS.map(([en, ko]) => [ko, en] as [string, string]))
// Korean-only landings (/ko/<Hangul slug>) whose English pages live on English slugs. Without /ko the Hangul slug
// isn't prerendered for en and falls through to the [stateKoSlug] catch-all (404), so send it to the English page.
const EN_LANDING_BY_KO = new Map(
  [US_LAUNCH_PATHS, AWS_PATHS, LOGISTICS_PATHS].map((p) => [p.ko.slice('/ko/'.length), p.en] as [string, string])
)
const safeDecode = (s: string) => {
  try { return decodeURIComponent(s) } catch { return s }
}

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

  // Square booking prototype — same deal as /pay: bilingual single route.
  if (pathname === '/book-demo' || pathname.startsWith('/book-demo/')) {
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
    // Korean state pages live on Hangul slugs; /ko/ca-website and friends were duplicates of them.
    const koState = pathname.startsWith('/ko/') ? KO_STATE_BY_EN.get(pathname.slice(4)) : undefined
    if (koState) {
      const url = request.nextUrl.clone()
      url.pathname = `/ko/${koState}`
      return NextResponse.redirect(url, { status: 308 })
    }
    // Korean paths stay as-is
    return NextResponse.next()
  }

  // English state pages live on English slugs; /뉴욕-웹사이트 (English copy on a Hangul slug) duplicated /ny-website.
  const enState = EN_STATE_BY_KO.get(safeDecode(pathname.slice(1)))
  if (enState) {
    const url = request.nextUrl.clone()
    url.pathname = `/${enState}`
    return NextResponse.redirect(url, { status: 308 })
  }
  const enLanding = EN_LANDING_BY_KO.get(safeDecode(pathname.slice(1)))
  if (enLanding) {
    const url = request.nextUrl.clone()
    url.pathname = enLanding
    return NextResponse.redirect(url, { status: 308 })
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
    // .pdf: lead-magnet downloads live at /downloads/*.pdf (public/).
    '/((?!_next|api|favicon.ico|manifest.json|site.webmanifest|robots.txt|sitemap.xml|rss.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.avif|.*\\.mp4|.*\\.webm|.*\\.ogg|.*\\.html|.*\\.txt|.*\\.md|.*\\.pdf).*)',
  ],
}
