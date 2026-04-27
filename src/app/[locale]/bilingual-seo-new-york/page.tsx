import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/bilingual-seo-new-york`
  const koUrl = `${baseUrl}/ko/bilingual-seo-new-york`

  if (locale === 'ko') {
    return {
      title: '뉴욕 한영 이중언어 SEO 에이전시 | 한인 비즈니스 검색 1위 | ZOE LUMOS',
      description:
        '뉴욕 한인 비즈니스를 위한 한국어·영어 이중언어 SEO 전문 에이전시. 구글 검색 1페이지 진입, hreflang 최적화, 카카오톡·네이버 통합. 맨하탄·플러싱·롱아일랜드 전역.',
      keywords:
        '뉴욕 이중언어 SEO, 뉴욕 한영 SEO, 한인 SEO 에이전시 뉴욕, 맨하탄 한인 SEO, 플러싱 SEO, 한국어 영어 SEO, hreflang 최적화, 한인 비즈니스 검색 노출',
      alternates: {
        canonical: koUrl,
        languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
      },
      openGraph: {
        title: '뉴욕 한영 이중언어 SEO 에이전시 - ZOE LUMOS',
        description: '뉴욕 한인 비즈니스 한국어·영어 이중언어 SEO. 구글 1페이지 노출.',
        url: koUrl,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  }

  return {
    title: 'Bilingual SEO New York | Korean–English SEO Agency | ZOE LUMOS',
    description:
      'New York Korean-American businesses: rank in both English and Korean search. Hreflang, KakaoTalk, Naver, Google integration. Manhattan, Flushing, Long Island & all NY metro.',
    keywords:
      'bilingual seo new york, korean english seo new york, manhattan korean seo, flushing korean seo agency, hreflang optimization, korean american seo agency, NY korean business seo',
    alternates: {
      canonical: enUrl,
      languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
    },
    openGraph: {
      title: 'Bilingual SEO New York — Korean–English Agency | ZOE LUMOS',
      description:
        'Rank in both English and Korean search across the NY metro. Hreflang, schema, KakaoTalk, Naver — built for Korean-American businesses.',
      url: enUrl,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const COPY = {
  en: {
    eyebrow: 'Bilingual SEO · New York metro',
    h1Lead: 'Rank in English.',
    h1Sub: 'Rank in Korean.',
    intro:
      'New York is a two-language market. Your customers search in English on Google, and in Korean on Google, Naver, and inside KakaoTalk. Most agencies optimize for one and quietly lose the other. We build sites that show up in both — with the technical SEO, hreflang, and content discipline to back it.',
    statsTitle: 'What we measure',
    stats: [
      { n: '1.2M+', l: 'Korean speakers in NY metro' },
      { n: '85%', l: 'Korean-Americans use KakaoTalk daily' },
      { n: '60%', l: 'of K-Town searches are Korean-language' },
      { n: '2–3 mo', l: 'typical first-page entry timeline' },
    ],
    pillarsTitle: 'How a bilingual site actually ranks',
    pillars: [
      {
        h: 'Real hreflang, not just a meta tag',
        p: 'Every English page has a Korean-language counterpart with proper hreflang return tags. Google sees a unified site, not two competing pages — so neither cannibalizes the other.',
      },
      {
        h: 'Hangul URL slugs that index',
        p: 'Korean URLs like /이중언어-SEO-뉴욕 outrank transliterated slugs in Naver and on Google when the user searches in Korean. We build them as primary URLs, not redirects.',
      },
      {
        h: 'Schema in both languages',
        p: 'LocalBusiness, Service, FAQ, and BreadcrumbList schemas are emitted in the page language. That powers rich snippets in Korean SERPs — most agencies skip this entirely.',
      },
      {
        h: 'KakaoTalk + Naver, not just Google',
        p: 'Korean-Americans in NY check Naver before they check Google for Korean topics. We submit to Naver Webmaster, structure content for KakaoTalk previews, and track all three platforms.',
      },
      {
        h: 'Content depth, not keyword stuffing',
        p: 'A bilingual page with 1,500 words of original Korean and a culturally adapted English version (not a translation) outranks a 4,000-word English page that has been Google-translated.',
      },
      {
        h: 'Local NY signals',
        p: 'GBP optimization in both languages, NYC backlinks (Korean newspapers, community sites), and review schema across Manhattan, Flushing, and Long Island clusters.',
      },
    ],
    citiesTitle: 'NY neighborhoods we serve',
    cities: [
      'Manhattan (K-Town · Midtown · Financial District)',
      'Flushing (Main Street · Murray Hill)',
      'Bayside · Little Neck',
      'Long Island (Great Neck · Manhasset · Roslyn)',
      'Westchester (White Plains · Tarrytown)',
      'Brooklyn (Sunset Park · Williamsburg)',
    ],
    faqTitle: 'Bilingual SEO FAQ',
    faqs: [
      {
        q: 'Will Korean and English pages cannibalize each other?',
        a: 'Not when hreflang is implemented correctly. Google treats them as alternate language versions of the same canonical entity, so the Korean page surfaces for Korean queries and the English page for English queries — without either bleeding ranking from the other.',
      },
      {
        q: 'Do I need a separate Korean website?',
        a: 'No. We build one site with two language versions sharing the same domain authority. A subdomain or separate domain splits your link equity and historically ranks worse for Korean-American businesses we have audited.',
      },
      {
        q: 'How long until I see rankings?',
        a: 'For Korean queries with low competition (e.g., "맨하탄 한인 변호사") we typically see first-page placement in 4–8 weeks. English queries in NY take 3–6 months because the competition is significantly heavier.',
      },
      {
        q: 'What about Naver and KakaoTalk?',
        a: 'We submit to Naver Webmaster, optimize OpenGraph for KakaoTalk preview cards, and structure your content for both platforms. Most US-based Korean-American businesses are completely missing from Naver — fixing that alone is a meaningful traffic source.',
      },
    ],
    cta: 'Start a project',
    ctaSub: 'Free 20-minute audit. We will show you exactly where your Korean and English versions are losing rankings — and what it takes to fix.',
  },
  ko: {
    eyebrow: '이중언어 SEO · 뉴욕 메트로',
    h1Lead: '영어로 노출되고,',
    h1Sub: '한국어로도 노출됩니다.',
    intro:
      '뉴욕은 두 가지 언어 시장입니다. 고객은 구글에서 영어로 검색하고, 동시에 구글·네이버·카카오톡에서 한국어로 검색합니다. 대부분의 에이전시는 한쪽만 최적화하고 다른 한쪽은 조용히 잃습니다. 저희는 두 언어 모두에서 노출되는 웹사이트를 구축합니다 — 기술 SEO, hreflang, 컨텐츠 전략까지 갖춰서.',
    statsTitle: '뉴욕 시장 데이터',
    stats: [
      { n: '120만+', l: '뉴욕 메트로 한국어 사용자' },
      { n: '85%', l: '미주 한인 카카오톡 매일 사용' },
      { n: '60%', l: '코리아타운 검색의 한국어 비율' },
      { n: '2–3개월', l: '구글 1페이지 진입 평균' },
    ],
    pillarsTitle: '이중언어 사이트가 실제로 노출되는 방법',
    pillars: [
      {
        h: '진짜 hreflang, 메타태그 흉내 X',
        p: '영문 페이지마다 한국어 대응 페이지를 hreflang 양방향 태그로 연결합니다. 구글은 통합된 한 사이트로 인식하므로 페이지가 서로 잠식하지 않습니다.',
      },
      {
        h: '한글 URL 슬러그',
        p: '/이중언어-SEO-뉴욕 같은 한글 URL은 네이버와 구글 한국어 검색에서 음역 슬러그보다 상위 노출됩니다. 리다이렉트가 아닌 정규 URL로 구축합니다.',
      },
      {
        h: '두 언어 모두의 스키마',
        p: 'LocalBusiness, Service, FAQ, BreadcrumbList 스키마를 페이지 언어로 출력합니다. 한국어 검색 결과에서 리치 스니펫이 노출되며, 대부분의 에이전시가 누락하는 부분입니다.',
      },
      {
        h: '카카오톡 · 네이버 통합',
        p: '미주 한인은 한국 관련 토픽을 구글보다 네이버에서 먼저 찾습니다. 네이버 웹마스터 등록, 카카오톡 미리보기 최적화, 3개 플랫폼 추적까지 진행합니다.',
      },
      {
        h: '컨텐츠 깊이, 키워드 채우기 X',
        p: '한국어 1,500자 원본과 문화적으로 조정된 영문 버전이, 구글 번역기로 만든 4,000자 영문 페이지보다 항상 상위 노출됩니다.',
      },
      {
        h: '뉴욕 로컬 시그널',
        p: '두 언어 GBP 최적화, 뉴욕 한인 미디어 백링크, 맨하탄·플러싱·롱아일랜드 리뷰 스키마.',
      },
    ],
    citiesTitle: '뉴욕 주요 한인 지역',
    cities: [
      '맨하탄 (코리아타운 · 미드타운 · 금융가)',
      '플러싱 (메인스트리트 · 머레이힐)',
      '베이사이드 · 리틀넥',
      '롱아일랜드 (그레이트넥 · 맨해셋 · 로슬린)',
      '웨스트체스터 (화이트플레인스 · 태리타운)',
      '브루클린 (선셋파크 · 윌리엄스버그)',
    ],
    faqTitle: '이중언어 SEO 자주 묻는 질문',
    faqs: [
      {
        q: '한국어와 영어 페이지가 서로 잠식하지 않나요?',
        a: 'hreflang을 정확히 구현하면 그렇지 않습니다. 구글은 두 페이지를 같은 정규 엔티티의 다른 언어 버전으로 인식하므로, 한국어 검색에는 한국어 페이지가, 영어 검색에는 영문 페이지가 노출되며 서로의 순위를 갉아먹지 않습니다.',
      },
      {
        q: '한국어 사이트를 따로 만들어야 하나요?',
        a: '아니요. 같은 도메인 권한을 공유하는 두 언어 버전을 하나의 사이트로 구축합니다. 서브도메인이나 별도 도메인은 링크 가치를 분산시키며, 저희가 감사한 한인 비즈니스 사례에서 일관되게 더 낮은 순위를 보였습니다.',
      },
      {
        q: '검색 노출까지 얼마나 걸리나요?',
        a: '경쟁이 적은 한국어 쿼리("맨하탄 한인 변호사" 등)는 보통 4–8주 안에 1페이지 진입합니다. 뉴욕 영어 쿼리는 경쟁이 심해 3–6개월 소요됩니다.',
      },
      {
        q: '네이버와 카카오톡은요?',
        a: '네이버 웹마스터 등록, 카카오톡 미리보기 OG 태그 최적화, 두 플랫폼 컨텐츠 구조화까지 진행합니다. 대부분의 미주 한인 비즈니스는 네이버에 아예 등록되어 있지 않습니다 — 이것만 해결해도 의미 있는 트래픽 소스가 됩니다.',
      },
    ],
    cta: '프로젝트 의뢰',
    ctaSub: '20분 무료 진단. 현재 한국어·영문 페이지가 어디서 순위를 잃고 있는지, 어떻게 고치는지 정확히 알려드립니다.',
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/bilingual-seo-new-york`
  const koUrl = `${baseUrl}/ko/bilingual-seo-new-york`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ko' ? '뉴욕 이중언어 SEO' : 'Bilingual SEO New York',
    serviceType: locale === 'ko' ? '한영 이중언어 검색엔진 최적화' : 'Korean–English bilingual SEO',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS', url: baseUrl },
    areaServed: [
      { '@type': 'City', name: 'New York' },
      { '@type': 'City', name: 'Manhattan' },
      { '@type': 'City', name: 'Flushing' },
      { '@type': 'City', name: 'Long Island' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Korean-American businesses',
    },
    availableLanguage: ['en', 'ko'],
    url: pageUrl,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ko' ? '홈' : 'Home',
        item: locale === 'ko' ? `${baseUrl}/ko` : baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ko' ? '이중언어 SEO 뉴욕' : 'Bilingual SEO New York',
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-2xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
          <div className="mt-12">
            <Link
              href={`${prefix}/#contact`}
              className="inline-flex items-center gap-3 px-7 py-[18px] rounded-full bg-ink text-ivory text-[15px]"
            >
              {t.cta} <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="container-edge py-16 md:py-24 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {t.stats.map((s, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl tracking-luxury text-ink">{s.n}</div>
                <div className="mt-3 text-sm text-graphite">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="container-edge py-16 md:py-24 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-12">{t.pillarsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {t.pillars.map((p, i) => (
              <div key={i}>
                <div className="overline text-ash mb-3">0{i + 1}</div>
                <h3 className="font-display text-2xl md:text-3xl tracking-luxury mb-4">{p.h}</h3>
                <p className="text-graphite leading-[1.7]">{p.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section className="container-edge py-16 md:py-24 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.citiesTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-graphite">
            {t.cities.map((c, i) => (
              <li key={i} className="flex items-baseline gap-3 py-2 border-b border-hairline">
                <span className="overline text-ash">0{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="container-edge py-16 md:py-24 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.faqTitle}</h2>
          <div className="space-y-8 max-w-3xl">
            {t.faqs.map((f, i) => (
              <div key={i} className="border-b border-hairline pb-8">
                <h3 className="font-display text-xl md:text-2xl mb-4">{f.q}</h3>
                <p className="text-graphite leading-[1.75]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <h2 className="font-display text-display-md md:text-display-lg tracking-luxury mb-6">
            {t.cta}
          </h2>
          <p className="text-body-lg text-graphite max-w-2xl mb-10 leading-[1.7]">{t.ctaSub}</p>
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
