import { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export function generatePricingMetadata(locale: 'en' | 'ko'): Metadata {
  const metadata = {
    en: {
      title: 'Web Design Pricing for Korean-American Businesses | ZOE LUMOS',
      description: 'Transparent web design pricing for Korean-American businesses. Starter $1,000 · Plus $2,000–$3,000 · Pro $3,000–$6,000. Shopify, bilingual SEO included. Custom plan in 24h. Fort Lee NJ.',
      keywords: 'web design pricing, website development cost, ecommerce pricing, shopify website cost, web design packages, small business website pricing, monthly website maintenance, Fort Lee web design, NYC web development, affordable website plans',
    },
    ko: {
      title: '한인 웹사이트 제작 가격 | ZOE LUMOS',
      description: '한인 비즈니스 웹사이트 제작 가격. 스타터 $1,000 · 플러스 $2,000–$3,000 · 프로 $3,000–$6,000. Shopify, 이중언어 SEO 포함. 24시간 내 맞춤 플랜. 포트리 NJ.',
      keywords: '웹디자인 가격, 홈페이지 제작 비용, 이커머스 가격, 쇼피파이 웹사이트 비용, 웹디자인 패키지, 중소기업 홈페이지 가격, 월간 웹사이트 관리, 포트리 웹디자인, NYC 웹개발, 저렴한 웹사이트 플랜',
    }
  }

  const baseUrl = SITE_URL

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