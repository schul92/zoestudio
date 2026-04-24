import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import CountUp from '@/components/ui/motion/CountUp'
import { industries, industryBySlug } from '@/data/industriesData'
import { cityMarkets, cityBySlug } from '@/data/cityMarketData'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

export function generateStaticParams() {
  const params: { locale: string; slug: string; city: string }[] = []
  for (const ind of industries) {
    for (const city of cityMarkets) {
      params.push({ locale: 'en', slug: ind.slug.en, city: city.slug.en })
      params.push({ locale: 'ko', slug: ind.slug.ko, city: city.slug.ko })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string; city: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const industry = industryBySlug(decodeURIComponent(params.slug), locale)
  const city = cityBySlug(decodeURIComponent(params.city), locale)
  if (!industry || !city) return {}

  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${BASE}${prefix}/industries/${industry.slug[locale]}/${city.slug[locale]}`

  const title =
    locale === 'ko'
      ? `${city.name.ko} ${industry.name.ko} 웹사이트 제작 — ${city.state.ko} 로컬 SEO | ZOE LUMOS`
      : `${industry.name.en} Website Design in ${city.fullName.en} — Local SEO | Zoe Lumos`

  const description =
    locale === 'ko'
      ? `${city.fullName.ko} 지역 ${industry.name.ko}을 위한 이중언어 웹사이트 제작. ${city.mainCorridors.ko} 상권 로컬 SEO 최적화. 한국어 · 영어 상담.`
      : `Bilingual website design for ${industry.name.en.toLowerCase()} in ${city.fullName.en}. Local SEO for the ${city.mainCorridors.en} corridor. Free consultation.`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/industries/${industry.slug.en}/${city.slug.en}`,
        en: `${BASE}/industries/${industry.slug.en}/${city.slug.en}`,
        ko: `${BASE}/ko/industries/${industry.slug.ko}/${city.slug.ko}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: locale === 'ko' ? 'ZOE LUMOS' : 'Zoe Lumos',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
  }
}

export default function CrossoverPage({
  params,
}: {
  params: { locale: string; slug: string; city: string }
}) {
  const locale = params.locale as 'en' | 'ko'
  const industry = industryBySlug(decodeURIComponent(params.slug), locale)
  const city = cityBySlug(decodeURIComponent(params.city), locale)
  if (!industry || !city) notFound()

  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'
  const url = `${BASE}${prefix}/industries/${industry.slug[locale]}/${city.slug[locale]}`

  const pageTitle = isKo
    ? `${city.name.ko} ${industry.name.ko} 웹사이트`
    : `${industry.name.en} Web Design — ${city.fullName.en}`

  const pageDescription = isKo
    ? `${city.fullName.ko} 지역 ${industry.name.ko}을 위한 이중언어 웹사이트 제작.`
    : `Bilingual website design for ${industry.name.en.toLowerCase()} in ${city.fullName.en}.`

  // Schema
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${BASE}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '업종' : 'Industries', item: `${BASE}${prefix}/industries` },
      { '@type': 'ListItem', position: 3, name: industry.name[locale], item: `${BASE}${prefix}/industries/${industry.slug[locale]}` },
      { '@type': 'ListItem', position: 4, name: city.name[locale], item: url },
    ],
  }

  const localService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: pageTitle,
    description: pageDescription,
    provider: { '@id': `${BASE}/#organization` },
    serviceType: industry.name[locale],
    areaServed: {
      '@type': 'City',
      name: city.name[locale],
      containedInPlace: { '@type': 'AdministrativeArea', name: city.state[locale] },
    },
    audience: { '@type': 'Audience', audienceType: locale === 'ko' ? '한인 소상공인' : 'Korean-American small business owners' },
    url,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: pageTitle,
    description: pageDescription,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    breadcrumb: breadcrumbs,
  }

  // City-specific FAQs that extend the industry base
  const cityFaqs = [
    {
      q: isKo
        ? `${city.name.ko}에서 ${industry.name.ko} 웹사이트 제작, 평균 비용은 얼마인가요?`
        : `What does a ${industry.name.en.toLowerCase()} website cost in ${city.name.en}?`,
      a: isKo
        ? `${city.name.ko} 지역 ${industry.name.ko}은 대개 $5,000 — $15,000 선에서 맞춤 제작이 가능합니다. 로컬 SEO, 이중언어 카피, 온라인 예약 · 주문 통합이 포함됩니다.`
        : `Most ${industry.name.en.toLowerCase()} builds in ${city.name.en} land between $5,000 and $15,000 including local SEO, bilingual copy, and online booking/ordering integration.`,
    },
    {
      q: isKo
        ? `${city.mainCorridors.ko} 상권의 로컬 SEO를 어떻게 잡을 수 있나요?`
        : `How do we rank in the ${city.mainCorridors.en} corridor?`,
      a: isKo
        ? `구글 비즈니스 프로필 최적화, 이중언어 구조화 데이터, 네이버 플레이스 연동, 그리고 ${city.neighborhoods.ko.slice(0, 3).join(' · ')} 같은 인접 지역까지 타겟팅하는 페이지 구조로 잡습니다.`
        : `Google Business Profile optimization, bilingual structured data, Naver Place sync, and targeted content for ${city.neighborhoods.en.slice(0, 3).join(', ')} so your reach extends beyond ${city.name.en} itself.`,
    },
    {
      q: isKo
        ? `한국어로 상담할 수 있나요?`
        : 'Can we consult in Korean?',
      a: isKo
        ? '네. 전체 스튜디오가 한국어 · 영어 이중언어로 운영됩니다. 카카오톡 · 이메일 · 전화 모두 한국어 가능.'
        : 'Yes — our entire studio is bilingual. KakaoTalk, email, and phone all in Korean or English.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [...cityFaqs, ...industry.faqs.slice(0, 2).map((f) => ({ q: f.q[locale], a: f.a[locale] }))].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
        {/* HERO */}
        <section className="relative hair-bottom pt-32 md:pt-48 pb-16 md:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-70"
            style={{ background: `radial-gradient(60% 40% at 50% 0%, ${industry.accent}55, transparent 70%)` }}
          />

          <div className="container-edge relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 overline text-ash mb-8 flex-wrap">
              <Link href={prefix || '/'} className="hover:text-ink transition-colors">
                {isKo ? '홈' : 'Home'}
              </Link>
              <span className="opacity-50">/</span>
              <Link href={`${prefix}/industries`} className="hover:text-ink transition-colors">
                {isKo ? '업종' : 'Industries'}
              </Link>
              <span className="opacity-50">/</span>
              <Link href={`${prefix}/industries/${industry.slug[locale]}`} className="hover:text-ink transition-colors">
                {industry.name[locale]}
              </Link>
              <span className="opacity-50">/</span>
              <span className="text-ink">{city.name[locale]}</span>
            </nav>

            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§</span>
              <span className="h-px w-10 bg-hairline" />
              <span>
                {isKo
                  ? `${city.name.ko} · ${industry.eyebrow.ko}`
                  : `${city.name.en} · ${industry.eyebrow.en.toLowerCase()}`}
              </span>
            </InView>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <h1 className="lg:col-span-8 font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1] tracking-luxury text-ink">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">
                    {isKo ? industry.name.ko : industry.name.en}
                  </span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? `${city.name.ko}에서.` : `in ${city.fullName.en}.`}
                  </span>
                </InView>
              </h1>

              <InView as="p" className="reveal lg:col-span-4 text-body-lg text-graphite leading-[1.7]">
                <span>{city.context[locale]}</span>
              </InView>
            </div>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-5">
              <Magnetic strength={14}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={isKo ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {isKo ? '상담 요청' : 'Start a conversation'}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <Link
                href={`${prefix}/industries/${industry.slug[locale]}`}
                data-cursor="view"
                className="btn-ghost"
              >
                {isKo ? `전체 ${industry.name.ko} 서비스` : `Full ${industry.name.en.toLowerCase()} service`}
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* LOCAL STATS */}
        <section className="hair-bottom bg-bone">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
              <InView className="reveal py-10 md:py-14 px-0 md:px-10 first:pl-0">
                <div className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-ink tracking-luxury">
                  {city.koreanPopulation}
                </div>
                <div className="mt-4 overline text-ash">
                  {isKo ? '한인 인구 밀도' : 'Korean population density'}
                </div>
              </InView>
              <InView className="reveal py-10 md:py-14 px-0 md:px-10" delay={80}>
                <div className="font-display text-[clamp(1.4rem,2.8vw,2.25rem)] leading-tight text-ink tracking-luxury italic font-light">
                  {city.mainCorridors[locale]}
                </div>
                <div className="mt-4 overline text-ash">
                  {isKo ? '주요 상권' : 'Primary corridors'}
                </div>
              </InView>
              <InView className="reveal py-10 md:py-14 px-0 md:px-10 last:pr-0" delay={160}>
                <div className="font-display text-[clamp(1.4rem,2.8vw,2.25rem)] leading-tight text-ink tracking-luxury italic font-light">
                  {city.neighborhoods[locale].slice(0, 3).join(' · ')}
                </div>
                <div className="mt-4 overline text-ash">
                  {isKo ? '인접 지역' : 'Adjacent markets'}
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* WHY THIS MARKET */}
        <section className="section-pad hair-bottom">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-5">
                <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                  <span className="section-num not-italic text-ink font-normal">§ 01</span>
                  <span className="h-px w-10 bg-hairline" />
                  <span>{isKo ? '이 시장의 특성' : 'Why this market'}</span>
                </InView>
                <h2 className="font-display text-display text-ink tracking-luxury">
                  <InView as="span" className="mask-row">
                    <span className="mask-rise block">
                      {isKo ? `${city.name.ko}에서` : `Winning in`}
                    </span>
                  </InView>
                  <InView as="span" className="mask-row" delay={140}>
                    <span className="mask-rise block italic font-light text-gold fraunces-soft">
                      {isKo ? '이기는 법.' : `${city.name.en}.`}
                    </span>
                  </InView>
                </h2>
              </div>
              <div className="md:col-span-7">
                <InView className="reveal">
                  <p className="text-body-lg text-graphite leading-[1.8]">
                    {industry.intro[locale]}
                  </p>
                  <p className="mt-6 text-body-lg text-graphite leading-[1.8]">
                    {isKo
                      ? `${city.fullName.ko} 같은 시장에서는 ${city.mainCorridors.ko} 상권의 로컬 SEO, 이중언어 구글 비즈니스 프로필, 그리고 구글과 네이버 양쪽 모두에서의 검색 가시성이 모든 것을 결정합니다. 템플릿 사이트로는 이길 수 없습니다 — 시장을 이해한 에디토리얼 웹사이트만이 가능합니다.`
                      : `In a market like ${city.fullName.en}, local SEO along the ${city.mainCorridors.en} corridor, a bilingual Google Business Profile, and visibility on both Google and Naver decide everything. Template sites don't win — only editorial websites that understand the market do.`}
                  </p>
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES — pulled from industry */}
        <section className="section-pad hair-bottom bg-bone">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-20">
              <div className="md:col-span-5">
                <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                  <span className="section-num not-italic text-ink font-normal">§ 02</span>
                  <span className="h-px w-10 bg-hairline" />
                  <span>{isKo ? '포함되는 기능' : "What's included"}</span>
                </InView>
                <h2 className="font-display text-display text-ink tracking-luxury">
                  <InView as="span" className="mask-row">
                    <span className="mask-rise block">
                      {isKo ? '모든 프로젝트에' : 'In every'}
                    </span>
                  </InView>
                  <InView as="span" className="mask-row" delay={140}>
                    <span className="mask-rise block italic font-light text-gold fraunces-soft">
                      {isKo ? '포함됩니다.' : 'engagement.'}
                    </span>
                  </InView>
                </h2>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {industry.features.slice(0, 6).map((f, i) => (
                <InView as="li" key={i} className="reveal group" delay={(i % 3) * 80}>
                  <div className="flex items-baseline gap-4 mb-3 pb-3 border-b border-hairline">
                    <span className="section-num text-xl md:text-2xl group-hover:text-gold transition-colors duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[clamp(1.1rem,1.7vw,1.35rem)] leading-[1.2] tracking-luxury text-ink fraunces-soft">
                      {f.title[locale]}
                    </h3>
                  </div>
                  <p className="text-[14px] text-graphite leading-[1.7]">
                    {f.body[locale]}
                  </p>
                </InView>
              ))}
            </ul>
          </div>
        </section>

        {/* CASE STUDY */}
        <section className="hair-bottom section-pad">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-6 order-2 md:order-1">
                <InView>
                  <div className="overline text-ash mb-6">{isKo ? '실제 사례' : 'In practice'}</div>
                  <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.25] text-ink tracking-luxury fraunces-soft">
                    <span className="text-gold italic font-light text-5xl md:text-6xl leading-none align-top mr-2">&ldquo;</span>
                    {industry.caseStudy.quote[locale]}
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="w-12 h-px bg-ink" />
                    <div>
                      <p className="font-display text-lg text-ink italic font-light">
                        {industry.caseStudy.author}
                      </p>
                      <p className="overline text-ash mt-1">
                        {industry.caseStudy.role[locale]} · {industry.caseStudy.project}
                      </p>
                    </div>
                  </div>
                </InView>
              </div>
              <div className="md:col-span-6 order-1 md:order-2">
                <InView className="reveal relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-[2px] bg-bone">
                  <div className="absolute inset-4 md:inset-6 overflow-hidden">
                    <Image
                      src={industry.caseStudy.image}
                      alt={industry.caseStudy.project}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <span aria-hidden className="absolute top-5 right-5" style={{ width: 14, height: 14, borderTop: '1px solid rgba(20,20,20,0.3)', borderRight: '1px solid rgba(20,20,20,0.3)' }} />
                  <span aria-hidden className="absolute bottom-5 left-5" style={{ width: 14, height: 14, borderBottom: '1px solid rgba(20,20,20,0.3)', borderLeft: '1px solid rgba(20,20,20,0.3)' }} />
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL FAQ */}
        <section className="section-pad hair-bottom bg-bone">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-4">
                <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                  <span className="section-num not-italic text-ink font-normal">§ 03</span>
                  <span className="h-px w-10 bg-hairline" />
                  <span>{isKo ? `${city.name.ko} 질문` : `${city.name.en} questions`}</span>
                </InView>
                <h2 className="font-display text-display text-ink tracking-luxury">
                  <InView as="span" className="mask-row">
                    <span className="mask-rise block">{isKo ? '이 시장에 대한' : 'Local to'}</span>
                  </InView>
                  <InView as="span" className="mask-row" delay={140}>
                    <span className="mask-rise block italic font-light text-gold fraunces-soft">
                      {isKo ? '자주 묻는 질문.' : `${city.name.en}.`}
                    </span>
                  </InView>
                </h2>
              </div>
              <dl className="md:col-span-8">
                {cityFaqs.map((f, i) => (
                  <InView
                    as="div"
                    key={i}
                    className="reveal py-7 md:py-8 border-b border-hairline first:border-t"
                    delay={i * 60}
                  >
                    <dt className="flex items-start gap-4">
                      <span className="section-num text-sm mt-1 shrink-0 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(1.1rem,1.7vw,1.35rem)] leading-[1.3] text-ink fraunces-soft">
                        {f.q}
                      </span>
                    </dt>
                    <dd className="mt-3 ml-12 text-[14px] md:text-body text-graphite leading-[1.75]">
                      {f.a}
                    </dd>
                  </InView>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Related links / internal linking */}
        <section className="section-pad hair-bottom">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Other cities for same industry */}
              <div>
                <p className="overline text-ash mb-6">
                  {isKo ? `다른 도시의 ${industry.name.ko}` : `${industry.name.en} in other cities`}
                </p>
                <ul className="space-y-3">
                  {cityMarkets.filter((c) => c.slug.en !== city.slug.en).slice(0, 4).map((c) => (
                    <li key={c.slug.en}>
                      <Link
                        href={`${prefix}/industries/${industry.slug[locale]}/${c.slug[locale]}`}
                        data-cursor="view"
                        className="group flex items-baseline justify-between gap-4 py-2 border-b border-hairline"
                      >
                        <span className="font-display text-lg text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                          {c.fullName[locale]}
                        </span>
                        <span aria-hidden className="text-ash group-hover:text-gold transition-colors">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Other industries for same city */}
              <div>
                <p className="overline text-ash mb-6">
                  {isKo ? `${city.name.ko}의 다른 업종` : `Other industries in ${city.name.en}`}
                </p>
                <ul className="space-y-3">
                  {industries.filter((i) => i.slug.en !== industry.slug.en).slice(0, 4).map((ind) => (
                    <li key={ind.slug.en}>
                      <Link
                        href={`${prefix}/industries/${ind.slug[locale]}/${city.slug[locale]}`}
                        data-cursor="view"
                        className="group flex items-baseline justify-between gap-4 py-2 border-b border-hairline"
                      >
                        <span className="font-display text-lg text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                          {ind.name[locale]}
                        </span>
                        <span aria-hidden className="text-ash group-hover:text-gold transition-colors">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-luxury text-ink fraunces-soft">
                  <InView as="span" className="mask-row">
                    <span className="mask-rise block italic font-light text-gold">
                      {isKo
                        ? `${city.name.ko}에서 시작해 봅시다.`
                        : `Let's build in ${city.name.en}.`}
                    </span>
                  </InView>
                </h2>
                <p className="mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                  {isKo
                    ? '30분 대화면 충분합니다. 시장, 목표, 예산 — 함께 맞는 모양을 그려봅니다.'
                    : 'Thirty minutes is enough. The market, the goal, the rough budget — together we sketch the right shape.'}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Magnetic strength={14}>
                  <Link
                    href={`${prefix}/#contact`}
                    data-cursor={isKo ? '시작' : 'Begin'}
                    className="btn-ink"
                  >
                    {isKo ? '프로젝트 의뢰' : 'Start a project'}
                    <span className="arrow">→</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
