import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ko']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle llms.txt - serve content directly
  if (pathname === '/llms.txt') {
    const llmsContent = `# ZOE LUMOS (조이루모스)

> Korean-American digital marketing agency specializing in website design, SEO, and Google Ads for businesses in New Jersey and New York. 100% Korean language support available.

## Company Information
- Name: ZOE LUMOS (조이루모스)
- Location: Fort Lee, New Jersey, USA
- Service Area: New Jersey and New York
- Languages: English, Korean (한국어)
- Email: info@zoelumos.com
- Website: https://www.zoelumos.com

## Services
- Website Design: $1,000 - $6,000
- SEO Services: $500/month+
- Google Ads: $300/month+

## Key Pages
- Homepage: https://www.zoelumos.com
- Korean: https://www.zoelumos.com/ko
- NJ Website: https://www.zoelumos.com/nj-website
- NY Website: https://www.zoelumos.com/ny-website
- 뉴저지 웹사이트: https://www.zoelumos.com/ko/뉴저지-웹사이트
- 뉴욕 웹사이트: https://www.zoelumos.com/ko/뉴욕-웹사이트

Last Updated: January 2026`

    return new NextResponse(llmsContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  }

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
    // Match llms.txt for API rewrite
    '/llms.txt',
    // Skip Next.js internals and all static files (including .html)
    '/((?!_next|api|favicon.ico|manifest.json|site.webmanifest|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.mp4|.*\\.webm|.*\\.ogg|.*\\.html).*)',
  ],
}