import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ko']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // If it's /en or /en/*, redirect to root without /en
    if (pathname === '/en' || pathname.startsWith('/en/')) {
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
    // Skip Next.js internals and all static files
    '/((?!_next|api|favicon.ico|manifest.json|site.webmanifest|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp).*)',
  ],
}