import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/services/google-business-profile-optimization`
  const koUrl = `${baseUrl}/ko/services/google-business-profile-optimization`

  if (locale === 'ko') {
    return {
      title: '구글 비즈니스 프로파일 최적화 (한인 비즈니스 전용) | ZOE LUMOS',
      description: '미주 한인 비즈니스를 위한 GBP 이중언어 최적화. 영어·한국어 설명, 일관된 NAP, 주간 게시, 리뷰 응답 — 로컬팩 1순위 진입.',
      alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
      openGraph: { title: '구글 비즈니스 프로파일 최적화 - ZOE LUMOS', description: '로컬팩 1순위 진입.', url: koUrl, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Google Business Profile Optimization for Korean-American Businesses | ZOE LUMOS',
    description: 'Bilingual GBP optimization for US Korean businesses. EN+KO descriptions, NAP consistency, weekly posts, review response in both languages — local pack #1.',
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: { title: 'Google Business Profile · ZOE LUMOS', description: 'Bilingual GBP done right.', url: enUrl, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

const COPY = {
  en: {
    eyebrow: 'Service · Google Business Profile',
    h1Lead: 'Win the local pack.',
    h1Sub: 'In two languages.',
    intro: 'Your Google Business Profile is the highest-leverage 30 minutes you can spend on local SEO — and almost every Korean-American business we audit uses 30% of its potential. We rebuild your GBP for bilingual customers: full Korean and English descriptions, weekly bilingual posts, every review answered in the language it was left in, photos optimized for Google\'s ranking signals. Most clients see local pack movement within 21 days.',
    whatTitle: 'What is included',
    whatItems: [
      'Bilingual primary + service descriptions written for ranking, not just clarity',
      'NAP audit and correction across Google, Yelp, Apple Maps, Bing Places, Naver Place',
      'Weekly GBP posts in Korean + English (we write, you approve)',
      'Review response automation: every Korean review gets a Korean reply, every English review an English reply',
      'Photo strategy: 4–6 photos per week categorized correctly (interior, food, team, exterior)',
      'Q&A seeding: pre-populate the GBP Q&A with the questions Korean-American customers actually ask',
      'Monthly rank tracking on 25 target keywords (English + Korean) with Local Falcon grid maps',
    ],
    whyTitle: 'Why bilingual GBP outperforms generic GBP',
    why: 'Google ranks GBPs separately for English and Korean queries. A profile with only English descriptions appears for English searches but barely surfaces for Korean queries — even when the customer is standing 100 yards away. We have audited Korean-American businesses where adding a Korean-language description alone moved them from #7 to #2 in the local pack within three weeks. The competitor on top was running ads. We were not.',
    pricing: 'Setup: $600 one-time (full audit + bilingual rewrite + multi-platform NAP) · Ongoing: $250/mo (weekly posts, review responses, monthly reporting)',
    cta: 'Get your GBP audit',
  },
  ko: {
    eyebrow: '서비스 · 구글 비즈니스 프로파일',
    h1Lead: '로컬팩을 가져오세요.',
    h1Sub: '두 언어로.',
    intro: '구글 비즈니스 프로파일은 로컬 SEO에 쓸 수 있는 가장 레버리지 높은 30분 — 그런데 저희가 감사하는 한인 비즈니스 거의 모두가 잠재력의 30%만 사용. 이중언어 고객을 위해 GBP 재구축: 한국어·영어 풀 설명, 주간 이중언어 게시, 모든 리뷰는 작성된 언어로 응답, 구글 랭크 신호에 최적화된 사진. 대부분 클라이언트는 21일 내 로컬팩 변동.',
    whatTitle: '포함 사항',
    whatItems: [
      '명확함이 아닌 랭킹을 위해 작성된 이중언어 메인·서비스 설명',
      '구글·옐프·애플 맵·빙 플레이스·네이버 플레이스 NAP 감사 및 수정',
      '한국어·영어 주간 GBP 게시 (우리 작성, 승인 후 게시)',
      '리뷰 응답 자동화: 한국어 리뷰엔 한국어, 영어엔 영어',
      '사진 전략: 주당 4–6장, 카테고리(인테리어·음식·팀·외부) 정확 분류',
      'Q&A 시딩: 한인 고객이 실제로 묻는 질문으로 GBP Q&A 사전 채움',
      '월간 25개 타겟 키워드(영어+한국어) 순위 추적 + Local Falcon 그리드 맵',
    ],
    whyTitle: '왜 이중언어 GBP가 일반 GBP를 이기는가',
    why: '구글은 영어와 한국어 쿼리에 대해 GBP를 별도 랭크. 영어 설명만 있는 프로필은 영어 검색엔 뜨지만 한국어 검색엔 거의 안 뜸 — 고객이 100야드 거리에 있어도. 한국어 설명만 추가해도 3주 내 로컬팩 #7 → #2로 이동한 한인 비즈니스 감사 사례 다수. 위에 있던 경쟁사는 광고 운영 중이었음. 우리는 아님.',
    pricing: '셋업 $600 일회성 (전체 감사 + 이중언어 재작성 + 멀티 플랫폼 NAP) · 지속 관리 $250/월 (주간 게시, 리뷰 응답, 월간 리포트)',
    cta: 'GBP 진단 받기',
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/services/google-business-profile-optimization`
  const koUrl = `${baseUrl}/ko/services/google-business-profile-optimization`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ko' ? '구글 비즈니스 프로파일 최적화' : 'Google Business Profile Optimization',
    serviceType: locale === 'ko' ? '로컬 SEO 서비스' : 'Local SEO service',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS', url: baseUrl },
    audience: { '@type': 'BusinessAudience', audienceType: 'Korean-American businesses' },
    availableLanguage: ['en', 'ko'],
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: '600', description: 'One-time GBP optimization setup' },
    url: pageUrl,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: locale === 'ko' ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '서비스' : 'Services', item: `${baseUrl}${prefix}/services/google-business-profile-optimization` },
      { '@type': 'ListItem', position: 3, name: locale === 'ko' ? 'GBP 최적화' : 'GBP Optimization', item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        <section className="container-edge pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-2xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.whatTitle}</h2>
          <ul className="space-y-3 max-w-3xl">
            {t.whatItems.map((it, i) => (
              <li key={i} className="flex gap-4 py-3 border-b border-hairline text-graphite">
                <span className="overline text-ash mt-1">0{i + 1}</span>
                <span className="leading-[1.7]">{it}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.whyTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl">{t.why}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <p className="font-display text-xl md:text-2xl tracking-luxury">{t.pricing}</p>
        </section>

        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <Link
            href={`${prefix}/#contact`}
            className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-ink text-ivory text-[16px]"
          >
            {t.cta} <span aria-hidden>→</span>
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
