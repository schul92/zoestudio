import type { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import AuditClient from './AuditClient'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const url = `${BASE}${isKo ? '/ko' : ''}/audit`

  return {
    title: isKo
      ? '무료 웹사이트 감사 — 내 사이트 점수 확인 | ZOE LUMOS'
      : 'Free Website Audit — Check Your Site Score | Zoe Lumos',
    description: isKo
      ? 'URL을 입력하고 30초 안에 Performance · SEO · 접근성 · 모범 사례 점수를 확인하세요. 구글 Lighthouse 기반 실시간 감사.'
      : 'Enter your URL, get Performance · SEO · Accessibility · Best Practices scores in 30 seconds. Real-time Google Lighthouse audit, compared with zoelumos.com.',
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/audit`,
        en: `${BASE}/audit`,
        ko: `${BASE}/ko/audit`,
      },
    },
    openGraph: {
      title: isKo ? '무료 웹사이트 감사' : 'Free Website Audit',
      description: isKo
        ? '내 사이트의 Google Lighthouse 점수를 무료로 확인하세요.'
        : 'Check your site’s real Google Lighthouse scores for free.',
      url,
      siteName: isKo ? 'ZOE LUMOS' : 'Zoe Lumos',
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  }
}

export default function AuditPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const url = `${BASE}${prefix}/audit`

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${BASE}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '무료 감사' : 'Free audit', item: url },
    ],
  }

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#tool`,
    name: isKo ? 'Zoe Lumos 웹사이트 감사 도구' : 'Zoe Lumos Website Audit Tool',
    description: isKo
      ? 'URL을 입력하고 실시간 Google Lighthouse 점수를 받아보세요.'
      : 'Enter a URL and receive real-time Google Lighthouse scores.',
    url,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@id': `${BASE}/#organization` },
    inLanguage: isKo ? 'ko-KR' : 'en-US',
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
      <AuditClient locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
