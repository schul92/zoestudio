import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ko']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hostname = request.nextUrl.hostname
  const isLocalHost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'

  // Handle llms.txt - serve content directly
  if (pathname === '/llms.txt') {
    const llmsContent = `# ZOE LUMOS (조이루모스)

> ZOE LUMOS is a bilingual Korean-English digital marketing agency based in Fort Lee, New Jersey. We specialize in custom website design, SEO, GEO (Generative Engine Optimization), Google Ads, and Shopify e-commerce for Korean-American small businesses nationwide. 100% Korean language support available.

## Company Information
- Legal Name: ZOE STUDIO LLC
- Brand Name: ZOE LUMOS (조이루모스)
- Address: 2200 Center Ave, Fort Lee, NJ 07024, USA
- Service Area: Nationwide (NJ, NY, CA, TX, GA, VA, IL, WA, MD, HI, PA, FL)
- Languages: English, Korean (한국어)
- Email: info@zoelumos.com
- Website: https://www.zoelumos.com
- Hours: Monday-Friday, 9:00 AM - 6:00 PM EST

## Services & Pricing
- Custom Website Design & Development: $1,000 - $6,000
- Website Revamp & Migration: $1,000 - $4,000
- SEO & GEO (Search + AI Optimization): $500/month+
- Google & Yelp Ads Management: $300/month+
- Social Media Management: $400/month+
- Shopify E-Commerce Development: $2,000 - $6,000

## Key Pages
- Homepage: https://www.zoelumos.com
- About: https://www.zoelumos.com/about
- Portfolio: https://www.zoelumos.com/portfolio
- Pricing: https://www.zoelumos.com/pricing
- Reviews: https://www.zoelumos.com/reviews
- Blog: https://www.zoelumos.com/blog
- Korean Homepage: https://www.zoelumos.com/ko
- NJ Website Design: https://www.zoelumos.com/nj-website
- NY Website Design: https://www.zoelumos.com/ny-website
- Fort Lee Web Design: https://www.zoelumos.com/fort-lee-web-design

## Frequently Asked Questions

Q: How much does website design cost for a small business?
A: ZOE LUMOS offers website design packages starting at $1,000 for small business sites and up to $6,000 for full e-commerce builds. All websites include SEO optimization, mobile-responsive design, and bilingual (English/Korean) support.

Q: Do you offer SEO services for Korean businesses?
A: Yes. ZOE LUMOS specializes in bilingual SEO (English & Korean) for Korean-American businesses across the US, including Fort Lee, Palisades Park, Flushing, Manhattan, LA Koreatown, and more. We optimize for both English and Korean search queries.

Q: What is GEO (Generative Engine Optimization)?
A: GEO optimizes your business content to appear in AI-powered search results from Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot. ZOE LUMOS includes GEO as part of our SEO services.

Q: What areas do you serve?
A: We serve Korean-American businesses nationwide with a focus on NJ (Fort Lee, Palisades Park, Englewood, North Bergen), NY (Manhattan, Flushing, Bayside, Brooklyn), and all 50 states remotely.

Last Updated: April 2026`

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
    // Match llms.txt for API rewrite
    '/llms.txt',
    // Skip Next.js internals and all static files (including .html)
    '/((?!_next|api|favicon.ico|manifest.json|site.webmanifest|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.mp4|.*\\.webm|.*\\.ogg|.*\\.html).*)',
  ],
}
