import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import type { StateData } from '@/data/usStates'
import { SITE_URL } from '@/lib/siteUrl'

/** Per-state FAQ, generated from the state's own data so every page is distinct. */
function buildFaq(s: StateData, ko: boolean) {
  const name = ko ? s.name.ko : s.name.en
  const cities = (ko ? s.cities.map((c) => c.ko) : s.cities.map((c) => c.en)).slice(0, 3)
  const cityList = cities.join(ko ? ', ' : ', ')
  const metro = ko ? s.metro.ko : s.metro.en
  return ko
    ? [
        {
          q: `${name}에서 한인 비즈니스 웹사이트를 제작하나요?`,
          a: `네. ZOE LUMOS는 ${name} 전역 한인 비즈니스를 위해 한·영 이중언어 웹사이트를 제작합니다${cities.length ? ` — ${cityList} 등` : ''}. 원격으로 미국 전 주를 서비스하며, 화상 미팅과 카카오톡 상담이 가능합니다.`,
        },
        {
          q: `${name}의 어떤 도시를 커버하나요?`,
          a: `${cities.length ? `${cityList}를 포함한 ${name} 전 지역` : `${metro}를 포함한 ${name} 전 지역`}을 서비스합니다. ${s.distinct.ko}`,
        },
        {
          q: `${name} 한인 비즈니스 웹사이트 비용은 얼마인가요?`,
          a: `고정·투명 가격 — 스타터 $1,000, 플러스 $2,000–$3,000(대부분의 소상공인), 프로 $3,000–$6,000. SEO는 월 $500부터. 전체 가격: ${SITE_URL}/ko/pricing`,
        },
        {
          q: `${name}에서 직접 만나지 않고도 작업할 수 있나요?`,
          a: `네. 100% 원격으로 진행하며 Zoom 화상 미팅과 카카오톡으로 상담합니다. 한국어·영어 모두 가능하며, 6주 평균 납기로 ${name} 어디서나 동일한 품질을 제공합니다.`,
        },
      ]
    : [
        {
          q: `Do you build websites for Korean-American businesses in ${name}?`,
          a: `Yes. ZOE LUMOS builds bilingual Korean-English websites for Korean-American businesses across ${name}${cities.length ? ` — including ${cityList}` : ''}. We serve every US state remotely, with video meetings and KakaoTalk consultations.`,
        },
        {
          q: `Which ${name} cities do you cover?`,
          a: `We serve all of ${name}${cities.length ? `, including ${cityList}` : `, centered on ${metro}`}. ${s.distinct.en}`,
        },
        {
          q: `How much does a Korean business website in ${name} cost?`,
          a: `Fixed, transparent pricing — Starter $1,000, Plus $2,000–$3,000 (most small businesses), Pro $3,000–$6,000. SEO retainers start at $500/month. Full pricing: ${SITE_URL}/pricing`,
        },
        {
          q: `Can you work with ${name} businesses without meeting in person?`,
          a: `Yes. We work 100% remotely with Zoom video meetings and KakaoTalk, in Korean or English, with a 6-week average timeline — same quality anywhere in ${name}.`,
        },
      ]
}

export default function StatePage({
  data,
  locale = 'en',
}: {
  data: StateData
  locale?: 'en' | 'ko'
}) {
  const ko = locale === 'ko'
  const prefix = ko ? '/ko' : ''
  const name = ko ? data.name.ko : data.name.en
  const pageUrl = `${SITE_URL}${prefix}/${data.slug}`
  const cities = ko ? data.cities.map((c) => c.ko) : data.cities.map((c) => c.en)
  const metro = ko ? data.metro.ko : data.metro.en
  const faq = buildFaq(data, ko)

  const proServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `ZOE LUMOS — Korean Web Design in ${data.name.en}`,
    description: ko
      ? `${name} 한인 비즈니스를 위한 이중언어 웹사이트 제작·SEO`
      : `Bilingual website design and SEO for Korean-American businesses in ${data.name.en}`,
    url: pageUrl,
    email: 'info@zoelumos.com',
    areaServed: { '@type': 'State', name: data.name.en },
    priceRange: '$1,000-$10,000',
    availableLanguage: ['en', 'ko'],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ko ? '홈' : 'Home', item: ko ? `${SITE_URL}/ko` : SITE_URL },
      { '@type': 'ListItem', position: 2, name: ko ? '지역' : 'Locations', item: `${SITE_URL}${prefix}/states` },
      { '@type': 'ListItem', position: 3, name, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(proServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-32 md:pt-44 pb-12 md:pb-16">
          <nav className="flex items-center gap-2 overline text-ash mb-8 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">{ko ? '홈' : 'Home'}</Link>
            <span className="opacity-50">/</span>
            <Link href={`${prefix}/states`} className="hover:text-ink transition-colors">{ko ? '지역' : 'Locations'}</Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{name}</span>
          </nav>
          <p className="overline text-gold mb-5">{ko ? `${name} · 한인 비즈니스` : `${name} · Korean-American business`}</p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-luxury text-ink max-w-4xl">
            {ko ? `${name} 한인 웹사이트 제작` : `Korean Web Design in ${name}`}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-graphite leading-[1.7]">
            {ko
              ? `${cities.length ? cities.slice(0, 3).join(', ') + ' 등 ' : ''}${name} 전역 한인 비즈니스를 위한 한·영 이중언어 웹사이트, 로컬 SEO, 그리고 AI 검색 최적화(GEO). 원격으로 동일한 품질을 제공합니다.`
              : `Bilingual Korean-English websites, local SEO, and AI-search optimization (GEO) for Korean-American businesses across ${name}${cities.length ? ` — ${cities.slice(0, 3).join(', ')}, and beyond` : ''}. Same quality, fully remote.`}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`${prefix}/#contact`} className="btn-ink">{ko ? '무료 상담' : 'Free consultation'}<span className="arrow">→</span></Link>
            <Link href={`${prefix}/pricing`} className="inline-flex items-center text-[15px] text-ink underline underline-offset-4 hover:text-gold transition-colors py-2">{ko ? '가격 보기' : 'See pricing'}</Link>
          </div>
        </section>

        {/* Korean community context — the differentiator */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h2 className="font-display text-display-sm tracking-luxury mb-6">{ko ? `${name}의 한인 비즈니스` : `Korean businesses in ${name}`}</h2>
              <p className="text-body-lg text-graphite leading-[1.7]">{ko ? data.distinct.ko : data.distinct.en}</p>
              <p className="mt-4 text-graphite leading-[1.7]">
                {ko
                  ? `${name} 한인 인구는 약 ${data.koreanPopulation}명으로 추정됩니다. 우리는 1세대 사장님(한국어)과 1.5·2세 고객(영어)을 모두 끌어오는 이중언어 사이트를 만듭니다.`
                  : `${name}'s Korean-American population is estimated around ${data.koreanPopulation}. We build bilingual sites that win both the first-generation owner (Korean) and the 1.5/second-generation customer (English).`}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="overline text-ash mb-4">{ko ? '서비스 지역' : 'Service areas'}</p>
              <ul className="grid grid-cols-2 gap-2">
                {(cities.length ? cities : [metro]).map((c) => (
                  <li key={c} className="border border-hairline px-4 py-3 text-[14px] text-ink">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              ko ? ['이중언어', '한국어 사장님과 영어권 고객을 한 사이트에서. 올바른 hreflang으로 양쪽 검색을 모두 잡습니다.'] : ['Bilingual', 'Korean-speaking owner and English-speaking customer on one site, with correct hreflang to win both searches.'],
              ko ? ['로컬 SEO + GEO', `"korean [업종] ${data.name.en.toLowerCase()}" 검색과 ChatGPT·Perplexity·구글 AI 답변 모두에서 노출되도록 최적화.`] : ['Local SEO + GEO', `Optimized to show up for "korean [service] ${data.name.en.toLowerCase()}" and in ChatGPT, Perplexity, and Google AI answers.`],
              ko ? ['원격 + 카카오톡', 'Zoom 화상 미팅과 카카오톡 상담. 직접 만나지 않아도 6주 평균 납기로 동일한 품질.'] : ['Remote + KakaoTalk', 'Zoom video meetings and KakaoTalk consultations. Same quality with a 6-week average timeline, no in-person needed.'],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="font-display text-xl tracking-luxury text-ink mb-3">{title}</h3>
                <p className="text-graphite leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing table — transparent, and tables boost AI-search citation */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-8">
            {ko ? `${name} 한인 웹사이트 가격` : `Korean website pricing in ${name}`}
          </h2>
          <div className="overflow-x-auto max-w-3xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-ink">
                  <th className="py-3 pr-6 overline text-ash font-normal">{ko ? '패키지' : 'Package'}</th>
                  <th className="py-3 pr-6 overline text-ash font-normal">{ko ? '가격 (일회성)' : 'Price (one-time)'}</th>
                  <th className="py-3 overline text-ash font-normal">{ko ? '적합한 곳' : 'Best for'}</th>
                </tr>
              </thead>
              <tbody className="text-graphite">
                {[
                  ['Starter', '$1,000', ko ? '소개형 사이트' : 'Brochure sites'],
                  ['Plus', '$2,000–$3,000', ko ? '대부분의 소상공인' : 'Most small businesses'],
                  ['Pro', '$3,000–$6,000', ko ? '식당·예약·다페이지' : 'Restaurants, booking, multi-page'],
                  [ko ? '월 SEO' : 'SEO / mo', '$500+', ko ? '검색·AI 노출 성장' : 'Grow search + AI visibility'],
                ].map(([pkg, price, best]) => (
                  <tr key={pkg} className="border-b border-hairline">
                    <td className="py-3 pr-6 text-ink font-medium">{pkg}</td>
                    <td className="py-3 pr-6 tabular-nums">{price}</td>
                    <td className="py-3">{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ — state-specific, GEO */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-10">{ko ? '자주 묻는 질문' : 'Frequently asked questions'}</h2>
          <div className="space-y-8 max-w-3xl">
            {faq.map((f, i) => (
              <div key={i}>
                <h3 className="font-display text-xl md:text-2xl tracking-luxury text-ink mb-3">{f.q}</h3>
                <p className="text-graphite leading-[1.7]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <p className="font-display italic font-light text-[clamp(1.35rem,2.5vw,2rem)] text-ink leading-[1.4] max-w-2xl mb-8">
            {ko ? `${name}에서 눈에 띄는 웹사이트를 만들 준비가 되셨나요?` : `Ready to be the Korean business ${name} finds first?`}
          </p>
          <Link href={`${prefix}/#contact`} className="btn-ink">{ko ? '상담 시작하기' : 'Start a conversation'}<span className="arrow">→</span></Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
