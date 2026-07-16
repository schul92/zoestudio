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
      title: 'Pricing — Transparent Website & Care Plans | Zoe Lumos',
      description:
        'Transparent pricing for Korean-American businesses: monthly care plans from $49/mo (Basic $49 · Care $89 · Grow $199 · Scale $499) and one-time builds $500–$2,400. 12-month commitment waives the setup fee.',
    },
    ko: {
      title: '가격 — 투명한 웹사이트 제작·관리 비용 | ZOE LUMOS',
      description:
        '한인 비즈니스를 위한 투명한 가격표. 월 관리 플랜 $49부터 (Basic $49 · Care $89 · Grow $199 · Scale $499), 일회성 제작 $500–$2,400. 12개월 약정 시 셋업비 면제.',
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
