import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { notFound } from 'next/navigation'
import { seoConfig, structuredData } from '@/config/seo'
import { ServiceProvider } from '@/context/ServiceContext'

const inter = Inter({ subsets: ['latin'] })

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
    authors: [{ name: 'Zoe Studio LLC' }],
    creator: 'Zoe Studio LLC',
    publisher: 'Zoe Studio LLC',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://zoestudio.com'),
    manifest: '/manifest.json',
    category: 'business',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ko': '/ko',
      },
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: `https://zoestudio.com/${locale}`,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Zoe Studio - Digital Marketing Services',
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
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification',
      yahoo: 'yahoo-verification',
    },
    other: {
      'msapplication-TileColor': '#000000',
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z' stroke='black' stroke-width='3' fill='none'/><path d='M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5' stroke='black' stroke-width='3'/></svg>" />
        <link rel="alternate" hrefLang="en" href="https://zoestudio.com/en" />
        <link rel="alternate" hrefLang="ko" href="https://zoestudio.com/ko" />
        <link rel="alternate" hrefLang="x-default" href="https://zoestudio.com/en" />
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
              "url": "https://zoestudio.com",
              "name": "ZOE STUDIO LLC",
              "description": "Professional SEO Services, Google Ads Management & Web Design",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://zoestudio.com/search?q={search_term_string}",
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
                  "item": `https://zoestudio.com/${params.locale}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": `https://zoestudio.com/${params.locale}#services`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Contact",
                  "item": `https://zoestudio.com/${params.locale}#contact`
                }
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className} style={{ position: 'relative' }}>
        <ServiceProvider>
          {children}
        </ServiceProvider>
      </body>
    </html>
  )
}