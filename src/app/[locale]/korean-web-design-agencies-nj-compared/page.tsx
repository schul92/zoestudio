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
  const enUrl = `${baseUrl}/korean-web-design-agencies-nj-compared`
  const koUrl = `${baseUrl}/ko/korean-web-design-agencies-nj-compared`

  if (locale === 'ko') {
    return {
      title: '한인 웹사이트 제작 에이전시 비교 (NJ/NY 2026) | 솔직한 가이드 | ZOE LUMOS',
      description:
        '뉴저지·뉴욕 한인 웹에이전시 5곳을 객관적으로 비교: Intonet, Boranet, We Design Orange, Romeo Production, Zoe Lumos. 가격, 서비스, 언어, SEO 수준까지 — 영업 멘트 없이.',
      keywords:
        '한인 웹사이트 제작 비교, 인투넷 보라넷 비교, 뉴저지 한인 웹디자인, NJ 한인 웹에이전시, 한인 웹사이트 가격 비교',
      alternates: {
        canonical: koUrl,
        languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
      },
      openGraph: {
        title: '한인 웹사이트 제작 에이전시 비교 NJ/NY 2026',
        description: '5곳을 객관적으로 비교. 영업 멘트 없이.',
        url: koUrl,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'article',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
      },
    }
  }

  return {
    title: 'Korean Web Design Agencies in NJ/NY Compared 2026 | Honest Buyer Guide',
    description:
      'Comparing 5 Korean-American web design agencies serving NJ/NY: Intonet, Boranet, We Design Orange, Romeo Production, Zoe Lumos. Pricing, services, bilingual capability, SEO depth — without the sales pitch.',
    keywords:
      'korean web design agency comparison, korean web designer nj review, intonet vs boranet, best korean web agency new jersey, korean website cost nj',
    alternates: {
      canonical: enUrl,
      languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
    },
    openGraph: {
      title: 'Korean Web Design Agencies in NJ/NY Compared 2026',
      description: '5 agencies compared honestly — pricing, bilingual depth, SEO foundation.',
      url: enUrl,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'article',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

type Agency = {
  name: string
  founded: string
  hq: string
  primaryLanguage: 'KO' | 'EN' | 'Bilingual'
  pricingDisclosed: boolean
  schema: 'Full' | 'Partial' | 'None'
  blogActive: boolean
  serviceBreadth: 'Web only' | 'Web + SEO' | 'Full digital' | 'Boutique'
  bestFor: { en: string; ko: string }
  watchOut: { en: string; ko: string }
}

const AGENCIES: Agency[] = [
  {
    name: 'Zoe Lumos',
    founded: '2019',
    hq: 'Fort Lee, NJ',
    primaryLanguage: 'Bilingual',
    pricingDisclosed: true,
    schema: 'Full',
    blogActive: true,
    serviceBreadth: 'Boutique',
    bestFor: {
      en: 'Korean-American businesses that want premium editorial design, transparent pricing, real bilingual SEO with hreflang, and modern Next.js performance.',
      ko: '에디토리얼 디자인, 투명한 가격, hreflang 적용된 진짜 이중언어 SEO, 모던 Next.js 성능을 원하는 한인 비즈니스.',
    },
    watchOut: {
      en: 'Newer than Intonet/Boranet — if "25 years in business" matters more to you than execution quality, others have more market history.',
      ko: 'Intonet/Boranet보다 신규 — 실행력보다 "25년 업력"이 중요하다면 더 오래된 곳이 있음.',
    },
  },
  {
    name: 'Intonet Solution',
    founded: '~2000',
    hq: 'Englewood Cliffs, NJ',
    primaryLanguage: 'KO',
    pricingDisclosed: false,
    schema: 'None',
    blogActive: false,
    serviceBreadth: 'Web + SEO',
    bestFor: {
      en: 'Korean-first business owners who value long market history (25+ years) and prefer phone-based sales and consultations in Korean.',
      ko: '오랜 업력(25년+)을 중시하고 한국어 전화 상담을 선호하는 한인 사장님.',
    },
    watchOut: {
      en: 'Blog last updated September 2025 — fresh content/SEO momentum unclear. No published pricing. No schema.org structured data observed on homepage.',
      ko: '블로그가 2025년 9월에 멈춤 — 최신 SEO 모멘텀 불분명. 공개 가격 없음. 홈페이지에 schema.org 구조화 데이터 미관찰.',
    },
  },
  {
    name: 'Boranet',
    founded: '~2014',
    hq: 'NJ',
    primaryLanguage: 'KO',
    pricingDisclosed: false,
    schema: 'None',
    blogActive: true,
    serviceBreadth: 'Full digital',
    bestFor: {
      en: 'Businesses that want one vendor for everything: AI chatbot, SMS, video production, influencer marketing, plus the website. Service breadth is their strongest play.',
      ko: 'AI 챗봇·SMS·영상 제작·인플루언서까지 한 벤더에서 처리하길 원하는 비즈니스. 서비스 폭이 강점.',
    },
    watchOut: {
      en: '"#1 NJ/NY" claim is unverified. Pricing not disclosed. No structured data visible. English navigation present but Korean-language depth is much stronger than English.',
      ko: '"#1 NJ/NY" 주장은 검증 안 됨. 가격 비공개. 구조화 데이터 미보임. 영어 네비 있으나 한국어 깊이가 영어보다 훨씬 강함.',
    },
  },
  {
    name: 'We Design Orange',
    founded: '~2018',
    hq: 'Los Angeles + national',
    primaryLanguage: 'KO',
    pricingDisclosed: false,
    schema: 'None',
    blogActive: true,
    serviceBreadth: 'Web + SEO',
    bestFor: {
      en: 'Multi-state Korean-American businesses needing a single agency across LA, NY, Texas, Chicago, Atlanta, and Dallas with a Korean-language project manager.',
      ko: 'LA·NY·텍사스·시카고·애틀랜타·달라스에 걸쳐 한국어 가능 PM 한 명을 두고 싶은 다지역 한인 비즈니스.',
    },
    watchOut: {
      en: 'Generalist positioning across many cities — local Bergen County / Manhattan KT depth weaker than NJ-rooted agencies. No published pricing.',
      ko: '여러 도시에 걸친 제너럴리스트 — 버겐카운티/맨하탄 K타운 로컬 깊이는 NJ 기반 업체보다 약함. 가격 비공개.',
    },
  },
  {
    name: 'Romeo Production',
    founded: '~2010',
    hq: 'National (US)',
    primaryLanguage: 'EN',
    pricingDisclosed: false,
    schema: 'Partial',
    blogActive: false,
    serviceBreadth: 'Web only',
    bestFor: {
      en: 'Korean-American businesses that primarily serve English-speaking customers and want a high-volume, English-first builder with template-based delivery.',
      ko: '주로 영어 고객 대상 한인 비즈니스, 템플릿 기반 영어 우선 빌더 선호 시.',
    },
    watchOut: {
      en: 'English-first design — Korean SEO and bilingual hreflang are not their strength. "2,000 sites" volume claim suggests scale over customization.',
      ko: '영어 우선 설계 — 한국어 SEO와 hreflang은 강점 아님. "2,000개 사이트" 볼륨 주장은 맞춤화보다 규모 시사.',
    },
  },
]

const COPY = {
  en: {
    eyebrow: 'Buyer guide · 2026',
    h1Lead: 'Korean web design agencies in NJ/NY,',
    h1Sub: 'compared honestly.',
    intro:
      'Picking a Korean-American web design agency in 2026 is mostly a guessing game. Pricing is hidden behind "request a quote", marketing claims overlap, and nobody publishes a head-to-head comparison because every agency only wants you to look at theirs. We are publishing this guide because we believe the honest path beats the loud one — even when it means recommending a competitor for use cases where we are not the right fit. Below: 5 agencies serving Korean-American businesses in NJ/NY in 2026, with the same criteria applied to each.',
    methodTitle: 'How we evaluated',
    methodIntro:
      'Same six criteria for every agency, all from publicly available evidence on April 28, 2026:',
    methodPoints: [
      'Years founded (longevity / trust signal)',
      'Primary language of the site (Korean-first vs bilingual vs English-first)',
      'Whether pricing is published (transparency)',
      'Schema.org structured data on the homepage (Google trust signal)',
      'Whether the blog has fresh 2026 content (SEO momentum)',
      'Service breadth (web-only vs full digital)',
    ],
    tableTitle: 'At-a-glance comparison',
    cols: {
      name: 'Agency',
      founded: 'Founded',
      hq: 'HQ',
      lang: 'Primary lang',
      pricing: 'Pricing shown',
      schema: 'Schema',
      blog: 'Active blog',
      breadth: 'Service breadth',
    },
    detailTitle: 'Best fit · what to watch for',
    bestFor: 'Best fit:',
    watchFor: 'Watch out for:',
    pickerTitle: 'Quick decision framework',
    pickerIntro:
      'Skip the comparison fatigue. Pick the agency whose strength matches your priority:',
    pickers: [
      { priority: 'I want premium editorial design + true bilingual SEO + transparent pricing', pick: 'Zoe Lumos' },
      { priority: 'I value 25+ years of market history and prefer Korean phone consultation', pick: 'Intonet Solution' },
      { priority: 'I need one vendor for chatbot + SMS + video + website (all-in-one)', pick: 'Boranet' },
      { priority: 'I have multi-state operations and want one Korean-speaking PM', pick: 'We Design Orange' },
      { priority: 'I serve English-speaking customers and want high-volume template delivery', pick: 'Romeo Production' },
    ],
    faqTitle: 'Frequently asked',
    faqs: [
      {
        q: 'Why does Zoe Lumos appear in their own comparison?',
        a: 'Because hiding ourselves would make this guide useless. We applied the same criteria to ourselves and tried to call out our own weaknesses (we are newer than Intonet and Boranet) just as honestly as we did theirs. If you read this and decide a competitor is the better fit, that is the guide doing its job.',
      },
      {
        q: 'How much does a Korean-American business website actually cost in 2026?',
        a: 'Honest ranges based on our pricing and audited competitor invoices: simple bilingual service site $1,500–$4,000, restaurant or café with menu schema and online ordering $3,500–$7,000, multi-location or e-commerce $7,000–$20,000+. Anyone quoting under $1,000 is selling you a template; anyone quoting over $30,000 for a 5-page service site is overcharging.',
      },
      {
        q: 'Are Korean-language URLs (e.g., /웹사이트-제작) actually worth using?',
        a: 'Yes, for SEO. Hangul URLs rank meaningfully better in Naver search and in Google Korean-language search than transliterated English slugs. Most agencies skip this because their CMS does not support it cleanly. Modern stacks (Next.js, Astro) handle it natively. We have built 60+ Hangul-slug pages and they out-rank our English equivalents on Korean queries by 4–6 positions on average.',
      },
      {
        q: 'Should I pick the agency with the longest history?',
        a: 'Only if your decision criteria is "I want the lowest-risk vendor in 2026". Longevity is a real signal — but in web technology, an agency that has been doing the same WordPress + Yoast stack since 2010 is also an agency that has not adopted modern performance, schema, or bilingual SEO architecture. Check their actual recent work, not their founding date.',
      },
    ],
    cta: 'Get an honest audit',
    ctaSub: 'We will run our same six-point evaluation on your existing website and tell you exactly where you are losing rankings — even if the answer is "do not redesign".',
  },
  ko: {
    eyebrow: '구매자 가이드 · 2026',
    h1Lead: '뉴저지·뉴욕 한인 웹에이전시,',
    h1Sub: '솔직하게 비교합니다.',
    intro:
      '2026년 한인 웹에이전시를 고르는 일은 대부분 추측 게임입니다. 가격은 "견적 요청" 뒤에 숨고, 마케팅 주장은 겹치고, 어떤 에이전시도 정면 비교를 내놓지 않습니다 — 자기네만 보길 원하니까. 이 가이드를 공개하는 이유: 시끄러운 길보다 솔직한 길이 더 멀리 간다고 믿기 때문입니다 — 우리가 적합하지 않은 경우엔 경쟁사를 추천하는 한이 있어도. 아래: NJ/NY 한인 비즈니스를 서비스하는 5개 에이전시, 동일 기준으로 평가.',
    methodTitle: '평가 방법',
    methodIntro: '2026년 4월 28일 기준 공개 정보로 6개 동일 기준 적용:',
    methodPoints: [
      '설립 연도 (장수·신뢰 신호)',
      '사이트 기본 언어 (한국어 우선 vs 이중언어 vs 영어 우선)',
      '가격 공개 여부 (투명성)',
      '홈페이지 Schema.org 구조화 데이터 (구글 신뢰 신호)',
      '블로그에 2026년 최신 콘텐츠 존재 여부 (SEO 모멘텀)',
      '서비스 범위 (웹 전용 vs 풀 디지털)',
    ],
    tableTitle: '한눈에 비교',
    cols: {
      name: '에이전시',
      founded: '설립',
      hq: '본사',
      lang: '기본언어',
      pricing: '가격 공개',
      schema: '스키마',
      blog: '활성 블로그',
      breadth: '서비스 범위',
    },
    detailTitle: '적합한 경우 · 주의할 점',
    bestFor: '적합:',
    watchFor: '주의:',
    pickerTitle: '빠른 결정 프레임워크',
    pickerIntro: '비교 피로 건너뛰기. 우선순위와 강점이 맞는 에이전시 선택:',
    pickers: [
      { priority: '에디토리얼 디자인 + 진짜 이중언어 SEO + 투명한 가격 원함', pick: 'Zoe Lumos' },
      { priority: '25년+ 업력과 한국어 전화 상담 선호', pick: 'Intonet Solution' },
      { priority: '챗봇 + SMS + 영상 + 웹사이트 한 벤더 (올인원)', pick: 'Boranet' },
      { priority: '여러 주에 사업장이 있고 한국어 PM 한 명 원함', pick: 'We Design Orange' },
      { priority: '영어 고객 대상이며 템플릿 기반 빠른 납품 선호', pick: 'Romeo Production' },
    ],
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: 'Zoe Lumos는 왜 자기네 비교에 등장하나요?',
        a: '우리를 숨기면 이 가이드 자체가 쓸모없어집니다. 동일 기준을 우리에게도 적용했고, 우리 약점(Intonet·Boranet보다 신규)도 솔직히 짚으려 했습니다. 이 글을 읽고 경쟁사가 더 맞다고 결정하셨다면, 가이드가 제 역할을 한 겁니다.',
      },
      {
        q: '2026년 미주 한인 비즈니스 웹사이트 실제 비용은?',
        a: '저희 가격과 감사한 경쟁사 인보이스 기준 솔직한 범위: 단순 이중언어 서비스 사이트 $1,500–$4,000, 메뉴 스키마·온라인 주문 식당/카페 $3,500–$7,000, 멀티 로케이션·이커머스 $7,000–$20,000+. $1,000 이하 견적은 템플릿 판매, 5페이지 서비스 사이트에 $30,000 넘는 견적은 과청구.',
      },
      {
        q: '한글 URL(/웹사이트-제작 등)이 정말 의미 있나요?',
        a: 'SEO 측면에선 그렇습니다. 한글 URL은 네이버 검색과 구글 한국어 검색에서 음역 영어 슬러그보다 의미 있게 더 잘 랭크됩니다. 대부분 에이전시가 빠뜨리는 이유는 CMS가 깔끔히 지원 안 하기 때문. 모던 스택(Next.js·Astro)은 네이티브 처리. 우리는 60개+ 한글 슬러그 페이지를 운영 중이며 한국어 쿼리에서 영문 대응보다 평균 4–6위 더 높습니다.',
      },
      {
        q: '가장 오래된 에이전시를 골라야 하나요?',
        a: '결정 기준이 "2026년 가장 안전한 벤더"라면 그렇습니다. 장수는 실제 신호 — 하지만 웹 기술에서 2010년부터 같은 WordPress+Yoast 스택을 운영한 에이전시는 모던 성능·스키마·이중언어 SEO 아키텍처를 채택하지 않았다는 의미이기도 합니다. 설립일이 아니라 최근 작업물을 확인하세요.',
      },
    ],
    cta: '솔직한 진단 받기',
    ctaSub: '동일한 6개 기준을 현재 사이트에 적용하고 어디서 순위를 잃고 있는지 정확히 알려드립니다 — 답이 "리디자인 하지 마세요"여도.',
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/korean-web-design-agencies-nj-compared`
  const koUrl = `${baseUrl}/ko/korean-web-design-agencies-nj-compared`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: locale === 'ko' ? '한인 웹사이트 제작 에이전시 비교 NJ/NY 2026' : 'Korean Web Design Agencies in NJ/NY Compared 2026',
    datePublished: '2026-04-28',
    dateModified: '2026-04-28',
    author: { '@type': 'Organization', name: 'ZOE LUMOS', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'ZOE LUMOS',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: AGENCIES.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Organization', name: a.name },
    })),
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
        name: locale === 'ko' ? '한인 웹에이전시 비교 2026' : 'Korean Web Agencies Compared 2026',
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-3xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        {/* Methodology */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.methodTitle}</h2>
          <p className="text-graphite leading-[1.7] mb-6 max-w-3xl">{t.methodIntro}</p>
          <ul className="space-y-2 text-graphite max-w-3xl">
            {t.methodPoints.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="overline text-ash mt-1">0{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Comparison table */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.tableTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="text-left py-3 px-2 font-display text-base">{t.cols.name}</th>
                  <th className="text-left py-3 px-2">{t.cols.founded}</th>
                  <th className="text-left py-3 px-2">{t.cols.hq}</th>
                  <th className="text-left py-3 px-2">{t.cols.lang}</th>
                  <th className="text-left py-3 px-2">{t.cols.pricing}</th>
                  <th className="text-left py-3 px-2">{t.cols.schema}</th>
                  <th className="text-left py-3 px-2">{t.cols.blog}</th>
                  <th className="text-left py-3 px-2">{t.cols.breadth}</th>
                </tr>
              </thead>
              <tbody>
                {AGENCIES.map((a) => (
                  <tr key={a.name} className="border-b border-hairline align-top">
                    <td className="py-4 px-2 font-display tracking-luxury">{a.name}</td>
                    <td className="py-4 px-2 text-graphite">{a.founded}</td>
                    <td className="py-4 px-2 text-graphite">{a.hq}</td>
                    <td className="py-4 px-2 text-graphite">{a.primaryLanguage}</td>
                    <td className="py-4 px-2 text-graphite">{a.pricingDisclosed ? '✓' : '—'}</td>
                    <td className="py-4 px-2 text-graphite">{a.schema}</td>
                    <td className="py-4 px-2 text-graphite">{a.blogActive ? '✓' : '—'}</td>
                    <td className="py-4 px-2 text-graphite">{a.serviceBreadth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Per-agency detail */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-10">{t.detailTitle}</h2>
          <div className="space-y-12">
            {AGENCIES.map((a, i) => (
              <div key={a.name} className="border-b border-hairline pb-10 last:border-b-0">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="overline text-ash">0{i + 1}</span>
                  <h3 className="font-display text-2xl md:text-3xl tracking-luxury">{a.name}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                  <div>
                    <div className="overline text-ink mb-2">{t.bestFor}</div>
                    <p className="text-graphite leading-[1.7]">{a.bestFor[locale]}</p>
                  </div>
                  <div>
                    <div className="overline text-gold mb-2">{t.watchFor}</div>
                    <p className="text-graphite leading-[1.7]">{a.watchOut[locale]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Picker */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.pickerTitle}</h2>
          <p className="text-graphite mb-10 max-w-3xl">{t.pickerIntro}</p>
          <div className="space-y-3">
            {t.pickers.map((p, i) => (
              <div key={i} className="grid md:grid-cols-[1fr_auto] gap-4 md:gap-12 items-baseline py-4 border-b border-hairline">
                <div className="text-graphite">{p.priority}</div>
                <div className="font-display tracking-luxury text-ink whitespace-nowrap">→ {p.pick}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
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
          <h2 className="font-display text-display-md md:text-display-lg tracking-luxury mb-6">{t.cta}</h2>
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
