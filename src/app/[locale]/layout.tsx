import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { notFound } from 'next/navigation'
import { seoConfig, structuredData } from '@/config/seo'
import { ServiceProvider } from '@/context/ServiceContext'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

const locales = ['en', 'ko']

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const seo = seoConfig[locale]
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'ZOE LUMOS' }],
    creator: 'ZOE LUMOS',
    publisher: 'ZOE LUMOS',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'),
    manifest: '/manifest.json',
    category: 'business',
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'ko': '/ko',
      },
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'}/${locale}`,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(seo.openGraph.title)}&subtitle=${encodeURIComponent(seo.openGraph.description)}`,
          width: 1200,
          height: 630,
          alt: 'ZOE LUMOS - Digital Marketing Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      images: ['/twitter-image.png'],
      creator: '@zoestudio',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Add real verification codes when available from Google Search Console, Yandex Webmaster, etc.
    other: {
      'msapplication-TileColor': '#000000',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black',
    },
    icons: {
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z' stroke='black' stroke-width='3' fill='none'/><path d='M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5' stroke='black' stroke-width='3'/></svg>",
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(params.locale)) {
    notFound()
  }

  return (
    <html lang={params.locale}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .bg-white { background-color: white; }
            .text-black { color: black; }
            .font-bold { font-weight: 700; }
            .text-center { text-align: center; }
            .container { width: 100%; margin: 0 auto; padding: 0 1.5rem; max-width: 1280px; }
            @media (min-width: 768px) { .md\\:text-8xl { font-size: 6rem; } }
          `
        }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z' stroke='black' stroke-width='3' fill='none'/><path d='M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5' stroke='black' stroke-width='3'/></svg>" />
        <link rel="alternate" hrefLang="en" href="https://zoelumos.com/" />
        <link rel="alternate" hrefLang="ko" href="https://zoelumos.com/ko" />
        <link rel="alternate" hrefLang="x-default" href="https://zoelumos.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="google" content="notranslate" />
        <meta property="og:type" content="website" />
        <meta property="og:locale:alternate" content={params.locale === 'en' ? 'ko_KR' : 'en_US'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.localBusiness),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://zoelumos.com",
              "name": "ZOE LUMOS",
              "description": "Professional SEO Services, Google Ads Management & Web Design",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://zoelumos.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "inLanguage": ["en-US", "ko-KR"]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `https://zoelumos.com/${params.locale}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": `https://zoelumos.com/${params.locale}#services`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Contact",
                  "item": `https://zoelumos.com/${params.locale}#contact`
                }
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className} style={{ position: 'relative' }}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <AnalyticsWrapper />
        <ServiceProvider>
          {children}
        </ServiceProvider>
      </body>
    </html>
  )
}