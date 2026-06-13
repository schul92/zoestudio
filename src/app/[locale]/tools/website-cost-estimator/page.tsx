import type { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import EstimatorClient from './EstimatorClient'
import { SITE_URL } from '@/lib/siteUrl'

const BASE = SITE_URL

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
  const url = `${BASE}${isKo ? '/ko' : ''}/tools/website-cost-estimator`

  return {
    title: isKo
      ? '웹사이트 제작 비용 계산기 — 솔직한 실시간 견적 | ZOE LUMOS'
      : 'Website Cost Estimator — Honest Instant Quote | Zoe Lumos',
    description: isKo
      ? '네 가지 질문에 답하고 한인 비즈니스 웹사이트 제작 비용을 몇 초 만에 확인하세요. 가격을 숨기지 않는 실시간 견적 — 이메일 필요 없음.'
      : 'Answer 4 questions and see what a Korean-American business website actually costs — in seconds. A real, honest range, no hidden “request a quote.” No email required.',
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/tools/website-cost-estimator`,
        en: `${BASE}/tools/website-cost-estimator`,
        ko: `${BASE}/ko/tools/website-cost-estimator`,
      },
    },
    openGraph: {
      title: isKo ? '웹사이트 제작 비용 계산기' : 'Website Cost Estimator',
      description: isKo
        ? '한인 비즈니스 웹사이트 비용을 몇 초 만에 — 가격을 숨기지 않습니다.'
        : 'See what your Korean-American business website costs — in seconds. No hidden pricing.',
      url,
      siteName: 'ZOE LUMOS',
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  return (
    <>
      <HeaderWrapper locale={locale} />
      <EstimatorClient locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
