import Link from 'next/link'
import Image from 'next/image'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import { localSeoByKey, localSeoPages, type LocalSeoEntry } from '@/data/localSeoPages'
import { industrySlugs } from '@/lib/localeSlugs'

type Loc = 'en' | 'ko'

const KAKAO = 'https://pf.kakao.com/_xhxdxmlX/chat'

// Existing town and guide pages these landings link out to (EN path, KO path).
const BERGEN_LINKS: { en: string; ko: string; enHref: string; koHref: string }[] = [
  { en: 'Fort Lee', ko: '포트리', enHref: '/fort-lee-web-design', koHref: '/ko/fort-lee-web-design' },
  { en: 'Ridgefield', ko: '리지필드', enHref: '/ridgefield-web-design', koHref: '/ko/ridgefield-web-design' },
  { en: 'Cliffside Park', ko: '클리프사이드파크', enHref: '/cliffside-park-web-design', koHref: '/ko/cliffside-park-web-design' },
  { en: 'Edgewater', ko: '에지워터', enHref: '/edgewater-web-design', koHref: '/ko/edgewater-web-design' },
  { en: 'Fairview', ko: '페어뷰', enHref: '/fairview-nj-web-design', koHref: '/ko/fairview-nj-web-design' },
  { en: 'Hackensack', ko: '해켄색', enHref: '/hackensack-web-design', koHref: '/ko/hackensack-web-design' },
  { en: 'Englewood', ko: '잉글우드', enHref: '/englewood-nj-seo', koHref: '/ko/englewood-nj-seo' },
  { en: 'North Bergen', ko: '노스버겐', enHref: '/north-bergen-web-design', koHref: '/ko/north-bergen-web-design' },
]

// Existing industry pages (/industries/{en}, /ko/industries/{ko}) — linked rather than duplicated.
const INDUSTRY_LINKS: { slug: string; en: string; ko: string }[] = [
  { slug: 'korean-restaurant', en: 'Korean restaurant websites', ko: '한인 식당 홈페이지 제작' },
  { slug: 'korean-beauty-salon', en: 'Salon, nail & spa websites', ko: '미용실·네일샵 홈페이지 제작' },
  { slug: 'korean-church', en: 'Korean church websites', ko: '한인 교회 홈페이지 제작' },
  { slug: 'korean-academy', en: 'Academy & tutoring websites', ko: '학원 홈페이지 제작' },
  { slug: 'korean-medical-dental', en: 'Medical & dental websites', ko: '병원·치과 홈페이지 제작' },
  { slug: 'korean-ecommerce', en: 'Online stores (Shopify)', ko: '쇼핑몰 제작 (Shopify)' },
]

const BUILDS = [
  { name: { en: 'Basic', ko: '기본' }, price: '$500–800', note: { en: 'Up to ~5 pages', ko: '약 5페이지 이하' } },
  { name: { en: 'Standard', ko: '일반' }, price: '$1,100–1,500', note: { en: 'Booking, ordering, bilingual', ko: '예약·주문·이중언어' } },
  { name: { en: 'Store', ko: '쇼핑몰' }, price: '$1,800–2,400', note: { en: 'Shopify / e-commerce', ko: 'Shopify · 이커머스' } },
]
const CARE = [
  { name: 'Basic', price: 49, note: { en: 'Hosting & protection', ko: '호스팅·보안' } },
  { name: 'Care', price: 89, note: { en: 'Maintenance + small edits', ko: '유지보수 + 소규모 수정' } },
  { name: 'Grow', price: 199, note: { en: 'Edits, GA4 report, SEO, Google Business Profile', ko: '수정, GA4 리포트, SEO, 구글 비즈니스 프로필' } },
  { name: 'Scale', price: 499, note: { en: 'Content + local SEO engine', ko: '콘텐츠 + 로컬 SEO' } },
]

function cases(e: LocalSeoEntry) {
  const tj = {
    img: '/portfolio/tj-flowers.jpg', name: 'TJ Flowers & Events',
    tag: { en: 'Shopify rebuild', ko: 'Shopify 리빌드' },
    result: { en: '$10,000+ revenue within 3 months of the rebuild; 5× search visibility in 6 weeks.', ko: '리빌드 후 3개월 안에 매출 $10,000+, 6주 만에 검색 노출 5배.' },
    href: '/blog/tj-flowers-shopify-revamp-case-study',
  }
  const endo = {
    img: '/portfolio/endopia.jpg', name: 'EndoPia',
    tag: { en: 'Medical device · U.S. launch', ko: '의료기기 · 미국 런칭' },
    result: { en: 'U.S. launch site for an FDA 510(k)-cleared device — product, training, events and investor pages.', ko: 'FDA 510(k) 인증 의료기기의 미국 런칭 사이트 — 제품, 교육, 이벤트, 투자 페이지.' },
    href: 'https://endopiaglobal.com/',
  }
  const vitos = {
    img: '/portfolio/vitos-pizza.jpg', name: "Vito's Pizza & Ristorante",
    tag: { en: 'Restaurant', ko: '레스토랑' },
    result: { en: 'Online ordering and a catering inquiry funnel that brings in group orders.', ko: '온라인 주문과 단체 주문을 받는 케이터링 문의 흐름.' },
    href: 'https://www.vitospizzaandristorante.com/',
  }
  if (e.key === 'englewood-cliffs') return [endo, tj, vitos]
  return [tj, endo, vitos]
}

export function localSeoUrls(e: LocalSeoEntry, baseUrl: string) {
  return { en: `${baseUrl}/${e.slug}`, ko: `${baseUrl}/ko/${e.koSlug}` }
}

export default function LocalSeoPage({ entry: e, locale, baseUrl }: { entry: LocalSeoEntry; locale: Loc; baseUrl: string }) {
  const ko = locale === 'ko'
  const t = (l: { en: string; ko: string }) => (ko ? l.ko : l.en)
  const urls = localSeoUrls(e, baseUrl)
  const url = ko ? urls.ko : urls.en
  const p = ko ? '/ko' : ''
  const hrefOf = (x: LocalSeoEntry) => (ko ? `/ko/${x.koSlug}` : `/${x.slug}`)

  const allQa = [...e.answers, ...e.faqs]
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQa.map((x) => ({ '@type': 'Question', name: t(x.q), acceptedAnswer: { '@type': 'Answer', text: t(x.a) } })),
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${url}#service`,
    name: 'ZOE LUMOS',
    alternateName: ['조이루모스', 'ZOE STUDIO LLC'],
    description: t(e.description),
    url,
    email: 'info@zoelumos.com',
    image: `${baseUrl}/logo.svg`,
    parentOrganization: { '@id': `${baseUrl}/#organization` },
    address: { '@type': 'PostalAddress', streetAddress: '2200 Center Ave', addressLocality: 'Fort Lee', addressRegion: 'NJ', postalCode: '07024', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 40.8509, longitude: -73.9712 },
    areaServed: e.areaServed.map((name) =>
      name === 'Bergen County'
        ? { '@type': 'AdministrativeArea', name, containedInPlace: { '@type': 'State', name: 'New Jersey' } }
        : name === 'New Jersey'
          ? { '@type': 'State', name }
          : { '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'New Jersey' } },
    ),
    knowsLanguage: ['en-US', 'ko-KR'],
    priceRange: '$$',
    makesOffer: [
      ...BUILDS.map((b) => ({ '@type': 'Offer', name: `${b.name.en} website build`, priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: Number(b.price.split('–')[0].replace(/[$,]/g, '')), maxPrice: Number(b.price.split('–')[1].replace(/[$,]/g, '')) } })),
      ...CARE.map((c) => ({ '@type': 'Offer', name: `${c.name} care plan`, priceSpecification: { '@type': 'UnitPriceSpecification', price: c.price, priceCurrency: 'USD', unitText: 'MONTH' } })),
    ],
  }
  const hub = localSeoByKey['bergen-county']
  const crumbs = [
    { name: ko ? '홈' : 'Home', item: `${baseUrl}${p || '/'}`.replace(/\/$/, '') || baseUrl },
    ...(e.kind === 'town' && e.key !== 'bergen-county'
      ? [{ name: t(hub.eyebrow), item: ko ? localSeoUrls(hub, baseUrl).ko : localSeoUrls(hub, baseUrl).en }]
      : [{ name: ko ? '서비스' : 'Services', item: `${baseUrl}${p}/services` }]),
    { name: t(e.h1).replace(/[.。]$/, ''), item: url },
  ]
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
  }

  const related = e.related.map((k) => localSeoByKey[k]).filter(Boolean)
  const industryHref = (en: string) => {
    const pair = industrySlugs.find(([x]) => x === en)
    return ko && pair ? `/ko/industries/${pair[1]}` : `/industries/${en}`
  }

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-ivory">
        {/* Hero */}
        <section className="container-edge pt-36 md:pt-48 pb-14">
          <nav aria-label={ko ? '경로' : 'Breadcrumb'} className="mb-8 text-[13px] text-ash">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              {crumbs.slice(0, -1).map((c) => (
                <li key={c.item} className="flex gap-2">
                  <a href={c.item.replace(baseUrl, '') || '/'} className="hover:text-ink">{c.name}</a>
                  <span aria-hidden>/</span>
                </li>
              ))}
            </ol>
          </nav>
          <p className="overline text-ash mb-6">{t(e.eyebrow)}</p>
          <h1 className="font-display text-[clamp(2.1rem,6vw,4.75rem)] leading-[1.02] tracking-luxury text-ink max-w-5xl break-keep [overflow-wrap:anywhere]">
            {t(e.h1)}
          </h1>
          <p className="mt-8 text-graphite text-lg md:text-xl max-w-2xl leading-[1.7] break-keep">{t(e.lede)}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`${p}/audit`} className="btn-ink">
              {ko ? '무료 사이트 진단' : 'Get a free audit'} <span className="arrow">→</span>
            </Link>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[44px] inline-flex items-center">
              {ko ? '카카오톡 상담' : 'Message us on KakaoTalk'}
            </a>
            <Link href={`${p}/pricing`} className="btn-ghost min-h-[44px] inline-flex items-center">
              {ko ? '가격 보기' : 'See pricing'}
            </Link>
          </div>
        </section>

        {/* At a glance — short, quotable answers */}
        <section className="container-edge pb-16" aria-labelledby="glance">
          <h2 id="glance" className="overline text-ash mb-6">{ko ? '한눈에 보기' : 'At a glance'}</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {e.answers.map((x) => (
              <div key={x.q.en} className="kn-card p-6 md:p-8">
                <dt className="font-semibold text-ink text-[17px] leading-snug break-keep">{t(x.q)}</dt>
                <dd className="mt-3 text-graphite text-[15px] leading-[1.7] break-keep">{t(x.a)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Context */}
        <section className="container-edge py-14 border-t border-hairline">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16">
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight break-keep">{t(e.context.heading)}</h2>
            <div className="space-y-5">
              {e.context.paras.map((para) => (
                <p key={para.en.slice(0, 32)} className="text-graphite text-[16px] md:text-[17px] leading-[1.8] break-keep">{t(para)}</p>
              ))}
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10 break-keep">{t(e.builds.heading)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {e.builds.items.map((it) => (
              <div key={it.t.en} className="kn-card p-6 md:p-8">
                <h3 className="text-ink font-semibold text-lg mb-2 break-keep">{t(it.t)}</h3>
                <p className="text-graphite text-[15px] leading-[1.7] break-keep">{t(it.d)}</p>
              </div>
            ))}
          </div>
          {e.key === 'bergen-county' && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {[...localSeoPages.filter((x) => x.kind === 'town' && x.key !== 'bergen-county').map((x) => ({ label: t(x.eyebrow).split(',')[0].split(' · ')[0], href: hrefOf(x) })),
                ...BERGEN_LINKS.map((b) => ({ label: ko ? b.ko : b.en, href: ko ? b.koHref : b.enHref }))].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-[44px] items-center rounded-full border border-hairline px-4 text-[14px] text-ink hover:border-ink">
                    {ko ? `${l.label} 홈페이지 제작` : `${l.label} web design`}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Proof */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10">{ko ? '실제 작업' : 'Real work'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cases(e).map((c) => (
              <a key={c.name} href={c.href} className="kn-card overflow-hidden block group" {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={c.img} alt={c.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-6">
                  <p className="overline text-ash mb-2">{t(c.tag)}</p>
                  <h3 className="text-ink font-semibold text-lg">{c.name}</h3>
                  <p className="mt-2 text-graphite text-[15px] leading-[1.6] break-keep">{t(c.result)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">{ko ? '공개 가격' : 'Published prices'}</h2>
          <p className="text-graphite mb-10 max-w-2xl break-keep">{ko ? '견적 요청 없이 바로 확인하세요. 12개월 관리 플랜을 선택하면 셋업비가 면제됩니다.' : 'No quote wall. The setup fee is waived with a 12-month care plan.'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="overline text-ash mb-4">{ko ? '제작 (1회)' : 'Builds (one-time)'}</h3>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {BUILDS.map((b) => (
                  <li key={b.name.en} className="flex items-baseline justify-between gap-4 py-4">
                    <span><span className="text-ink font-medium">{t(b.name)}</span> <span className="text-ash text-sm">· {t(b.note)}</span></span>
                    <span className="text-ink tabular-nums whitespace-nowrap">{b.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="overline text-ash mb-4">{ko ? '월 관리 플랜' : 'Monthly care plans'}</h3>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {CARE.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-4 py-4">
                    <span><span className="text-ink font-medium">{c.name}</span> <span className="text-ash text-sm">· {t(c.note)}</span></span>
                    <span className="text-ink tabular-nums whitespace-nowrap">${c.price}{ko ? '/월' : '/mo'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href={`${p}/pricing`} className="btn-ghost mt-8 inline-flex min-h-[44px] items-center">{ko ? '전체 가격표 →' : 'Full price list →'}</Link>
        </section>

        {/* Process */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10">{ko ? '진행 과정' : 'How it works'}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { en: ['Free audit', 'We review your current site, Google profile and competitors.'], ko: ['무료 진단', '현재 사이트, 구글 프로필, 경쟁 업체를 분석합니다.'] },
              { en: ['Plan & price', 'A written plan with the published price for your tier.'], ko: ['계획 · 가격', '해당 플랜의 공개 가격으로 작성된 계획서.'] },
              { en: ['Design & build', '2–3 weeks for most sites, 4–6 weeks for stores. Copy in both languages.'], ko: ['디자인 · 제작', '대부분 2–3주, 쇼핑몰 4–6주. 두 언어로 문구 작성.'] },
              { en: ['Launch & grow', 'Redirects, Google Business Profile, analytics, then monthly care.'], ko: ['오픈 · 성장', '리다이렉트, 구글 비즈니스 프로필, 분석 설정 후 월 관리.'] },
            ].map((s, i) => (
              <li key={s.en[0]} className="kn-card p-6">
                <p className="text-ash tabular-nums text-sm mb-3">0{i + 1}</p>
                <h3 className="text-ink font-semibold mb-2">{ko ? s.ko[0] : s.en[0]}</h3>
                <p className="text-graphite text-[15px] leading-[1.6] break-keep">{ko ? s.ko[1] : s.en[1]}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">{ko ? '자주 묻는 질문' : 'Questions'}</h2>
          <div className="divide-y divide-hairline border-y border-hairline">
            {e.faqs.map((f) => (
              <details key={f.q.en} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-ink font-medium text-[17px] min-h-[44px] break-keep">
                  {t(f.q)}
                  <span className="text-ash transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-graphite text-[15px] leading-[1.75] max-w-3xl break-keep">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="overline text-ash mb-6">{ko ? '업종별 홈페이지 제작' : 'By industry'}</h2>
          <ul className="flex flex-wrap gap-3">
            {INDUSTRY_LINKS.map((i) => (
              <li key={i.slug}>
                <Link href={industryHref(i.slug)} className="inline-flex min-h-[44px] items-center rounded-full border border-hairline px-4 text-[14px] text-ink hover:border-ink break-keep">
                  {ko ? i.ko : i.en}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Related */}
        <section className="container-edge py-14 border-t border-hairline">
          <h2 className="overline text-ash mb-6">{ko ? '함께 보면 좋은 페이지' : 'Related'}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <li key={r.key}>
                <Link href={hrefOf(r)} className="kn-card flex min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-ink hover:border-ink">
                  <span className="break-keep">{t(r.title).split(' | ')[0]}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={ko ? '/ko/뉴저지-웹사이트' : '/korean-web-design-new-jersey'} className="kn-card flex min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-ink hover:border-ink">
                <span className="break-keep">{ko ? '뉴저지 홈페이지 제작 · 웹사이트 제작' : 'Korean web design in New Jersey'}</span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
