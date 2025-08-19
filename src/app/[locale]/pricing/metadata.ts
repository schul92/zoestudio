import { Metadata } from 'next'

export function generatePricingMetadata(locale: 'en' | 'ko'): Metadata {
  const metadata = {
    en: {
      title: 'Pricing - Web Design & Development Plans | ZOE LUMOS',
      description: 'Simple, transparent pricing for web design & development. Free Hobby plan, Plus $99/mo, Pro $299/mo with e-commerce, Enterprise custom. Fort Lee NJ & NYC.',
      keywords: 'web design pricing, website development cost, ecommerce pricing, shopify website cost, web design packages, small business website pricing, monthly website maintenance, Fort Lee web design, NYC web development, affordable website plans',
    },
    ko: {
      title: '가격 - 웹 디자인 및 개발 플랜 | ZOE LUMOS',
      description: '웹 디자인 및 개발을 위한 간단하고 투명한 가격. 무료 Hobby, Plus 월 $99, Pro 월 $299 이커머스 포함, Enterprise 맞춤. 포트리 NJ & NYC.',
      keywords: '웹디자인 가격, 홈페이지 제작 비용, 이커머스 가격, 쇼피파이 웹사이트 비용, 웹디자인 패키지, 중소기업 홈페이지 가격, 월간 웹사이트 관리, 포트리 웹디자인, NYC 웹개발, 저렴한 웹사이트 플랜',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    keywords: metadata[locale].keywords,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/pricing` : `${baseUrl}/ko/pricing`,
      languages: {
        'en': `${baseUrl}/pricing`,
        'ko': `${baseUrl}/ko/pricing`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: `${baseUrl}/${locale === 'en' ? '' : 'ko/'}pricing`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(metadata[locale].title)}&subtitle=${encodeURIComponent(metadata[locale].description)}`,
          width: 1200,
          height: 630,
          alt: 'ZOE LUMOS Pricing Plans',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata[locale].title,
      description: metadata[locale].description,
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
  }
}