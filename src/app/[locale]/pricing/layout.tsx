import { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

// The pricing route renders a client "Start a project" flow, so it cannot
// export metadata itself. This server layout supplies the SEO metadata,
// canonical, and hreflang for /pricing and /ko/pricing.
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale: 'en' | 'ko' = params?.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = SITE_URL
  const enUrl = `${baseUrl}/pricing`
  const koUrl = `${baseUrl}/ko/pricing`
  const url = locale === 'ko' ? koUrl : enUrl

  const meta = {
    en: {
      title: 'Pricing — Transparent Website & Shopify Plans | Zoe Lumos',
      description:
        'Transparent web design pricing for Korean-American businesses: Starter $1k, Plus $2k–$3k, Pro $3k–$6k. Bilingual builds, SEO & Shopify. No quote wall — free estimate.',
    },
    ko: {
      title: '가격 — 투명한 웹사이트·Shopify 제작 비용 | ZOE LUMOS',
      description:
        '한인 비즈니스를 위한 투명한 웹사이트 제작 가격. 스타터 $1k, 플러스 $2k–$3k, 프로 $3k–$6k. 한·영 이중언어, SEO, Shopify. 견적 장벽 없이 무료 견적.',
    },
  }[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
