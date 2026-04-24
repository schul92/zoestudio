import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import { industries } from '@/data/industriesData'

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
  const url = `${BASE}${isKo ? '/ko' : ''}/industries`

  return {
    title: isKo
      ? '업종별 웹사이트 제작 — 한식당 · 뷰티샵 · 교회 · 학원 · 병원 · 쇼핑몰 | ZOE LUMOS'
      : 'Industries We Build For — Korean Restaurants, Salons, Churches, Academies, Medical, E-commerce | Zoe Lumos',
    description: isKo
      ? '한식당 · 한인 뷰티샵 · 교회 · 학원 · 의료 · 쇼핑몰 — 업종별 맞춤 웹사이트 제작. 각 업종의 고유한 과제를 이해합니다.'
      : 'Industry-specific websites for Korean restaurants, beauty salons, churches, academies, medical/dental practices, and e-commerce brands. Each built around the real challenges of your vertical.',
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/industries`,
        en: `${BASE}/industries`,
        ko: `${BASE}/ko/industries`,
      },
    },
  }
}

export default function IndustriesIndex({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const url = `${BASE}${prefix}/industries`

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${BASE}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: isKo ? '업종' : 'Industries', item: url },
    ],
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: isKo ? '업종별 웹사이트 제작' : 'Industries we build for',
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    isPartOf: { '@id': `${BASE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: industries.length,
      itemListElement: industries.map((ind, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: ind.seo.title[locale],
          description: ind.seo.description[locale],
          url: `${BASE}${prefix}/industries/${ind.slug[locale]}`,
          provider: { '@id': `${BASE}/#organization` },
        },
      })),
    },
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
        {/* Hero */}
        <section className="hair-bottom pt-32 md:pt-48 pb-20 md:pb-24">
          <div className="container-edge">
            <nav className="flex items-center gap-2 overline text-ash mb-10 flex-wrap">
              <Link href={prefix || '/'} className="hover:text-ink transition-colors">
                {isKo ? '홈' : 'Home'}
              </Link>
              <span className="opacity-50">/</span>
              <span className="text-ink">{isKo ? '업종' : 'Industries'}</span>
            </nav>

            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '업종별 전문성' : 'Industry practice'}</span>
              <span className="ml-2 text-ash/60">· {industries.length} {isKo ? '업종' : 'verticals'}</span>
            </InView>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <h1 className="lg:col-span-8 font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[0.98] tracking-luxury text-ink">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{isKo ? '업종을 먼저' : 'We build for'}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? '이해하고 만듭니다.' : 'industries we know.'}
                  </span>
                </InView>
              </h1>
              <InView as="p" className="reveal lg:col-span-4 text-body-lg text-graphite leading-[1.7] max-w-md">
                <span>
                  {isKo
                    ? '한인 식당의 피크 타임을 이해합니다. 뷰티샵 예약 패턴을 압니다. 교회 1부 · 2부를 구분합니다. 업종을 이해해야 제대로 된 사이트를 만들 수 있습니다.'
                    : "We know how a Korean restaurant's peak hour behaves. How a salon's booking pattern flows. The difference between 1부 and 2부 service. The site has to come from the industry."}
                </span>
              </InView>
            </div>
          </div>
        </section>

        {/* Industry grid */}
        <section className="section-pad hair-bottom">
          <div className="container-edge">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {industries.map((ind, i) => (
                <InView as="li" key={ind.slug.en} className="reveal group" delay={(i % 2) * 80}>
                  <Link
                    href={`${prefix}/industries/${ind.slug[locale]}`}
                    data-cursor="view"
                    className="block hair-top hair-bottom py-8 md:py-10 transition-colors duration-500 hover:bg-bone/60 -mx-4 px-4 md:-mx-8 md:px-8 rounded-[2px]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3 overline text-ash mb-4">
                          <span className="section-num text-sm">{String(i + 1).padStart(2, '0')}</span>
                          <span className="h-px w-6 bg-hairline" />
                          <span>{ind.eyebrow[locale]}</span>
                        </div>
                        <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.15] tracking-luxury text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                          {ind.name[locale]}
                        </h2>
                        <p className="mt-4 text-[14px] md:text-body text-graphite leading-[1.7] max-w-xl">
                          {ind.intro[locale].slice(0, 180)}…
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="shrink-0 mt-2 text-ash group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                      >
                        ↗
                      </span>
                    </div>
                  </Link>
                </InView>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-8">
                <h2 className="font-display text-display-lg text-ink tracking-luxury">
                  <InView as="span" className="mask-row">
                    <span className="mask-rise block">{isKo ? '당신의 업종도' : 'Don’t see your'}</span>
                  </InView>
                  <InView as="span" className="mask-row" delay={140}>
                    <span className="mask-rise block italic font-light text-gold fraunces-soft">
                      {isKo ? '말씀해 주세요.' : 'industry listed?'}
                    </span>
                  </InView>
                </h2>
                <p className="mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                  {isKo
                    ? '위에 없는 업종이어도 괜찮습니다. 반찬가게, 부동산, CPA, 법무, 산후조리 — 한인 커뮤니티 어떤 업종이든 대화로 시작합니다.'
                    : 'Side-dish shops, real estate, CPAs, law firms, postnatal care — if your vertical isn\'t above, a conversation is still the right place to start.'}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
