import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import GuaranteeStrip from '@/components/sections/GuaranteeStrip'
import StartProjectForm from './StartProjectForm'

// ─────────────────────────────────────────────────────────────────────────────
// /pricing — the single published source of truth for prices.
// Same numbers live in public/pricing.md and public/llms.txt: keep in sync.
// Monthly: Basic $49 · Care $89 · Grow $199 (recommended) · Scale $499
// One-time builds: Basic $500–800 · Standard $1,100–1,500 · Store $1,800–2,400
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

type Tier = {
  name: string
  price: string
  tagline: { en: string; ko: string }
  forWho: { en: string; ko: string }
  includes: { en: string[]; ko: string[] }
  excludes?: { en: string; ko: string }
  recommended?: boolean
}

const MONTHLY_TIERS: Tier[] = [
  {
    name: 'Basic',
    price: '$49',
    tagline: { en: 'Hosting & protection only', ko: '호스팅·보안만' },
    forWho: { en: 'For owners who just need safe hosting', ko: '호스팅·보안만 필요한 분께' },
    includes: {
      en: ['Hosting + SSL', 'Security & backups', 'Uptime monitoring'],
      ko: ['호스팅 + SSL', '보안 · 백업', '모니터링'],
    },
    excludes: {
      en: 'No content edits — $75/hr or upgrade',
      ko: '콘텐츠 수정 없음 — $75/시간 또는 상위 플랜',
    },
  },
  {
    name: 'Care',
    price: '$89',
    tagline: { en: 'Maintenance + small edits', ko: '유지보수 + 소규모 수정' },
    forWho: { en: 'For sites that need occasional edits', ko: '가끔 수정이 필요한 분께' },
    includes: {
      en: ['Everything in Basic', '30 min content edits/mo', 'Monthly report'],
      ko: ['Basic의 모든 기능', '월 30분 콘텐츠 수정', '월간 리포트'],
    },
  },
  {
    name: 'Grow',
    price: '$199',
    tagline: { en: 'For sites that need to grow', ko: '성장이 필요한 사이트용' },
    forWho: { en: 'For owners investing in growth', ko: '검색 유입을 키우고 싶은 분께' },
    recommended: true,
    includes: {
      en: [
        'Everything in Care',
        '2 hrs content edits/mo',
        'GA4 analytics report',
        'SEO monitoring',
        'Google Business Profile management',
      ],
      ko: [
        'Care의 모든 기능',
        '월 2시간 수정',
        'GA4 분석 리포트',
        'SEO 모니터링',
        '구글 비즈니스 프로필(GBP) 관리',
      ],
    },
  },
  {
    name: 'Scale',
    price: '$499',
    tagline: { en: 'Content + local SEO engine', ko: '콘텐츠 + 로컬 SEO 엔진' },
    forWho: { en: 'For owners who want marketing handled', ko: '마케팅을 통째로 맡기실 분께' },
    includes: {
      en: [
        'Everything in Grow',
        '4 content pieces/mo (blog or social)',
        'Local SEO + review management',
        'Quarterly strategy session',
      ],
      ko: [
        'Grow의 모든 기능',
        '콘텐츠 제작 월 4회 (블로그·소셜)',
        '로컬 SEO + 리뷰 관리',
        '분기 전략 상담',
      ],
    },
  },
]

// Comparison table rows: [label, Basic, Care, Grow, Scale]
const COMPARE_ROWS: Array<{ label: { en: string; ko: string }; cells: [string, string, string, string] }> = [
  { label: { en: 'Hosting + SSL', ko: '호스팅 + SSL' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Security & backups', ko: '보안 · 백업' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Uptime monitoring', ko: '모니터링' }, cells: ['✓', '✓', '✓', '✓'] },
  { label: { en: 'Content edits', ko: '콘텐츠 수정' }, cells: ['—', '30min/mo', '2hrs/mo', '2hrs/mo'] },
  { label: { en: 'Monthly report', ko: '월간 리포트' }, cells: ['—', '✓', '✓', '✓'] },
  { label: { en: 'GA4 analytics report', ko: 'GA4 분석 리포트' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: 'SEO monitoring', ko: 'SEO 모니터링' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: 'Google Business Profile', ko: '구글 비즈니스 프로필 관리' }, cells: ['—', '—', '✓', '✓'] },
  { label: { en: '4 content pieces/mo', ko: '콘텐츠 제작 월 4회' }, cells: ['—', '—', '—', '✓'] },
  { label: { en: 'Local SEO + reviews', ko: '로컬 SEO + 리뷰 관리' }, cells: ['—', '—', '—', '✓'] },
  { label: { en: 'Quarterly strategy session', ko: '분기 전략 상담' }, cells: ['—', '—', '—', '✓'] },
]

const BUILD_TIERS = [
  {
    name: { en: 'Basic build', ko: '기본' },
    price: '$500–800',
    desc: { en: 'Up to 5 pages · responsive · basic SEO · contact form', ko: '5페이지 이하 · 반응형 · 기본 SEO · 문의 폼' },
  },
  {
    name: { en: 'Standard build', ko: '일반' },
    price: '$1,100–1,500',
    desc: { en: '6–15 pages · custom design · bilingual KO/EN · local SEO', ko: '6–15페이지 · 맞춤 디자인 · 한·영 이중언어 · 로컬 SEO' },
  },
  {
    name: { en: 'Store build', ko: '스토어' },
    price: '$1,800–2,400',
    desc: { en: 'Shopify / e-commerce · products & checkout · ordering or booking', ko: 'Shopify / 이커머스 · 상품·결제 · 주문·예약' },
  },
]

const FAQS: Array<{ q: { en: string; ko: string }; a: { en: string; ko: string } }> = [
  {
    q: { en: 'Which plan should I choose?', ko: '어떤 플랜을 선택해야 하나요?' },
    a: {
      en: 'Most small businesses are best served by Grow at $199/month, because it combines content edits, a GA4 report, SEO monitoring, and Google Business Profile management. Choose Basic ($49) if you only need safe hosting, Care ($89) if you need occasional edits, and Scale ($499) if you want content and local SEO fully handled for you.',
      ko: '대부분의 소상공인에게는 월 $199 Grow 플랜이 가장 잘 맞습니다. 콘텐츠 수정, GA4 리포트, SEO 모니터링, 구글 비즈니스 프로필 관리가 모두 포함되기 때문입니다. 호스팅·보안만 필요하면 Basic($49), 가끔 수정이 필요하면 Care($89), 콘텐츠와 로컬 SEO까지 통째로 맡기시려면 Scale($499)을 선택하세요.',
    },
  },
  {
    q: { en: 'How do I cancel a monthly plan?', ko: '월 플랜 해지는 어떻게 하나요?' },
    a: {
      en: 'You can cancel any monthly plan at any time with a single email or KakaoTalk message — service continues through the month you already paid for, and nothing is billed after that. There is no long-term lock-in unless you chose the 12-month commitment that waives the build setup fee.',
      ko: '월 관리 플랜은 이메일이나 카카오톡 한 통으로 언제든 해지할 수 있습니다. 결제한 달까지 서비스가 그대로 유지되며, 이후 추가 청구는 없습니다. 셋업비 면제를 위한 12개월 약정을 선택하지 않았다면 장기 계약 부담이 전혀 없습니다.',
    },
  },
  {
    q: { en: 'What are the conditions for the setup-fee waiver?', ko: '셋업비 면제 조건이 무엇인가요?' },
    a: {
      en: 'The website build setup fee is waived when you commit to any monthly care plan for 12 months. In other words, instead of paying the one-time build cost ($500–$2,400 depending on scope) upfront, you start with a monthly plan and we build the site as part of the engagement.',
      ko: '월 관리 플랜을 12개월 약정하면 웹사이트 제작 셋업비가 면제됩니다. 즉 일회성 제작비(범위에 따라 $500–$2,400)를 선불로 내는 대신, 월 플랜으로 시작하면 제작을 약정에 포함해 진행해 드립니다.',
    },
  },
  {
    q: { en: 'Can you take over an existing website?', ko: '기존 사이트도 이전해서 관리할 수 있나요?' },
    a: {
      en: 'Yes — we migrate existing sites from OpenCart, older WordPress, Wix, Squarespace, and similar platforms, then run them on a monthly care plan. Your domain and code stay 100% in your name during and after the migration, so you can leave anytime.',
      ko: '네, 가능합니다. OpenCart, 구형 워드프레스, Wix, Squarespace 등에서 운영 중인 기존 사이트를 이전한 뒤 월 관리 플랜으로 운영해 드립니다. 이전 과정과 이후에도 도메인과 코드는 100% 고객 명의로 유지되므로 언제든 떠나실 수 있습니다.',
    },
  },
  {
    q: { en: 'What does a one-time build include?', ko: '일회성 제작비에는 무엇이 포함되나요?' },
    a: {
      en: 'A Basic build at $500–800 includes up to 5 responsive pages, basic SEO, and a contact form. Standard at $1,100–1,500 adds custom design, bilingual Korean/English, and local SEO for 6–15 pages. A Store build at $1,800–2,400 covers Shopify or e-commerce with products, checkout, and ordering or booking. Two revision rounds per phase are included in every build.',
      ko: '기본 제작($500–800)에는 5페이지 이하 반응형 웹사이트, 기본 SEO, 문의 폼이 포함됩니다. 일반($1,100–1,500)은 6–15페이지에 맞춤 디자인, 한·영 이중언어, 로컬 SEO가 더해지고, 스토어($1,800–2,400)는 Shopify/이커머스 상품·결제·주문/예약까지 포함합니다. 모든 제작에는 단계별 수정 2회가 기본 포함됩니다.',
    },
  },
]

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }

  const t = {
    eyebrow: isKo ? '투명한 가격' : 'Transparent pricing',
    headline: isKo ? '가격표, 여기 다 있습니다.' : 'The full price list. Right here.',
    sub: isKo
      ? '견적 문의 뒤에 가격을 숨기지 않습니다. 월 관리 플랜과 제작 비용 전부 공개 — 최종 견적은 무료 상담에서 범위에 맞춰 확정됩니다.'
      : 'No "request a quote" wall. Every monthly plan and build price is published — the final quote is confirmed to your scope in a free consultation.',
    monthlyTitle: isKo ? '월 관리 플랜' : 'Monthly care plans',
    monthlySub: isKo
      ? '호스팅부터 마케팅까지, 필요한 만큼만. 12개월 약정 시 웹사이트 제작 셋업비 면제.'
      : 'From hosting to marketing — pay only for what you need. A 12-month commitment waives the website build setup fee.',
    recommended: isKo ? '★ 추천' : '★ Recommended',
    perMonth: isKo ? '/월' : '/mo',
    addons: isKo
      ? '애드온: 구글 광고 운영 +$150~/월 (플랜 없이 단독 운영은 월 $300~, 셋업 무료) · 예약 시스템 관리 +$50/월 · 추가 수정 $75/시간'
      : 'Add-ons: Google Ads management +$150~/mo (standalone without a plan from $300/mo, free setup) · booking system care +$50/mo · extra edits $75/hr',
    compareTitle: isKo ? '플랜 비교' : 'Compare plans',
    buildTitle: isKo ? '일회성 제작 비용' : 'One-time build pricing',
    buildSub: isKo
      ? '한 번에 제작하고 소유하세요. 월 관리 플랜을 12개월 약정하면 아래 셋업비가 면제됩니다.'
      : 'Build once, own it. Commit to any monthly care plan for 12 months and the setup fee below is waived.',
    buildNote: isKo
      ? '범위에 따라 달라집니다 — 30초 만에 내 프로젝트 예상 견적 보기 →'
      : 'Varies by scope — get your own 30-second estimate →',
    estimatorLink: isKo ? '무료 견적 계산기' : 'Free cost estimator',
    guaranteeTitle: isKo ? '저희가 지키는 약속' : 'What we guarantee',
    guaranteeSub: isKo
      ? '과장 없이, 이미 모든 프로젝트에 적용되는 원칙만 적었습니다.'
      : 'No inflated promises — only the policies already applied to every project.',
    faqTitle: isKo ? '자주 묻는 질문' : 'Frequently asked questions',
    ctaTitle: isKo ? '어떤 플랜이 맞는지 모르시겠어요?' : 'Not sure which plan fits?',
    ctaSub: isKo
      ? '무료 상담에서 15분이면 정리됩니다. 이메일 또는 카카오톡으로 편하게 문의하세요.'
      : 'A free 15-minute consultation sorts it out. Reach us by email or KakaoTalk.',
    ctaContact: isKo ? '무료 상담 신청' : 'Book a free consultation',
    ctaEstimator: isKo ? '견적 계산기 써보기' : 'Try the cost estimator',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-[#080808] pt-28 pb-24 relative overflow-hidden">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(177,36,146,0.06),transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          {/* ── Hero ── */}
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-black text-[#B12492] tracking-[0.25em] uppercase mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[0.98] tracking-tight mb-5">
              {t.headline}
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">{t.sub}</p>
          </div>

          {/* ── Monthly tiers ── */}
          <section aria-label={t.monthlyTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{t.monthlyTitle}</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">{t.monthlySub}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MONTHLY_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-6 border flex flex-col ${
                    tier.recommended
                      ? 'bg-[#B12492]/[0.08] border-[#B12492]/50 shadow-[0_0_30px_rgba(177,36,146,0.12)]'
                      : 'bg-[#0e0e0e] border-white/[0.07]'
                  }`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-6 bg-[#B12492] text-white text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                      {t.recommended}
                    </span>
                  )}
                  <h3 className="text-lg font-black text-white mb-1">{tier.name}</h3>
                  <p className="text-gray-600 text-xs mb-4">{tier.tagline[locale]}</p>
                  <p className="mb-1">
                    <span className={`text-4xl font-black ${tier.recommended ? 'text-[#e058c0]' : 'text-white'}`}>{tier.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{t.perMonth}</span>
                  </p>
                  <p className="text-[12px] text-gray-400 font-medium mb-5">{tier.forWho[locale]}</p>
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {tier.includes[locale].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-gray-300 leading-snug">
                        <span className="text-green-400 mt-[1px]" aria-hidden>✓</span>
                        {item}
                      </li>
                    ))}
                    {tier.excludes && (
                      <li className="flex items-start gap-2 text-[13px] text-gray-600 leading-snug">
                        <span className="mt-[1px]" aria-hidden>✕</span>
                        {tier.excludes[locale]}
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`${prefix}/contact`}
                    className={`block text-center rounded-xl px-4 py-2.5 text-[13px] font-bold transition-colors ${
                      tier.recommended
                        ? 'bg-[#B12492] text-white hover:bg-[#c93aa8]'
                        : 'bg-white/[0.06] text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isKo ? '이 플랜으로 상담' : 'Talk about this plan'}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-[12px] mt-5">{t.addons}</p>
          </section>

          {/* ── Comparison table ── */}
          <section aria-label={t.compareTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">{t.compareTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#0e0e0e]">
                    <th className="px-5 py-4 text-[12px] uppercase tracking-widest text-gray-500 font-bold" />
                    {MONTHLY_TIERS.map((tier) => (
                      <th key={tier.name} className="px-4 py-4 text-center">
                        <span className={`block text-sm font-black ${tier.recommended ? 'text-[#e058c0]' : 'text-white'}`}>
                          {tier.name}{tier.recommended ? ' ★' : ''}
                        </span>
                        <span className="block text-[12px] text-gray-500 font-medium mt-0.5">
                          {tier.price}{t.perMonth}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                      <td className="px-5 py-3 text-[13px] text-gray-300 font-medium whitespace-nowrap">
                        {row.label[locale]}
                      </td>
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-center text-[13px] ${
                            cell === '—' ? 'text-gray-700' : cell === '✓' ? 'text-green-400' : 'text-gray-300'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Per-tier "for who" row */}
                  <tr className="bg-[#0e0e0e]">
                    <td className="px-5 py-3.5 text-[12px] uppercase tracking-widest text-gray-600 font-bold whitespace-nowrap">
                      {isKo ? '이런 분께' : 'Best for'}
                    </td>
                    {MONTHLY_TIERS.map((tier) => (
                      <td key={tier.name} className="px-4 py-3.5 text-center text-[12px] text-gray-400 leading-snug">
                        {tier.forWho[locale]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── One-time builds ── */}
          <section aria-label={t.buildTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{t.buildTitle}</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">{t.buildSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUILD_TIERS.map((b) => (
                <div key={b.price} className="rounded-2xl p-6 bg-[#0e0e0e] border border-white/[0.07]">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-gray-500 font-black mb-2">{b.name[locale]}</p>
                  <p className="text-3xl font-black text-white mb-3">{b.price}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{b.desc[locale]}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-[13px] text-[#e058c0] font-bold m-0">
                {isKo ? '12개월 약정 시 셋업비 면제' : '12-month care-plan commitment waives the setup fee'}
              </p>
              <span className="hidden sm:block text-gray-700">·</span>
              <Link
                href={`${prefix}/tools/website-cost-estimator`}
                className="text-[13px] text-gray-400 underline underline-offset-4 hover:text-white transition-colors"
              >
                {t.buildNote}
              </Link>
            </div>
          </section>

          {/* ── Guarantee ── */}
          <section aria-label={t.guaranteeTitle} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{t.guaranteeTitle}</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl">{t.guaranteeSub}</p>
            <GuaranteeStrip locale={locale} variant="full" dark />
          </section>

          {/* ── FAQ ── */}
          <section aria-label={t.faqTitle} className="mb-20 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">{t.faqTitle}</h2>
            <ul className="space-y-3 m-0 p-0 list-none">
              {FAQS.map((f, i) => (
                <li key={i}>
                  <details className="group rounded-2xl bg-[#0e0e0e] border border-white/[0.07] px-6 py-5">
                    <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                      <h3 className="text-[15px] font-bold text-white m-0 leading-snug group-open:text-[#e058c0] transition-colors">
                        {f.q[locale]}
                      </h3>
                      <span aria-hidden className="text-gray-600 text-xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-[14px] text-gray-400 leading-[1.75] m-0">{f.a[locale]}</p>
                  </details>
                </li>
              ))}
            </ul>
          </section>

          {/* ── CTA ── */}
          <section className="mb-24 rounded-2xl border border-[#B12492]/30 bg-[#B12492]/[0.06] px-8 py-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t.ctaTitle}</h2>
            <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 bg-[#B12492] text-white font-black px-8 py-4 rounded-xl text-sm hover:bg-[#c93aa8] transition-colors"
              >
                {t.ctaContact} →
              </Link>
              <Link
                href={`${prefix}/tools/website-cost-estimator`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-bold"
              >
                {t.ctaEstimator}
              </Link>
            </div>
          </section>

          {/* ── Existing 2-step custom-plan form (kept as final section) ── */}
          <section id="start" className="pt-4 border-t border-white/[0.06]">
            <div className="pt-16">
              <StartProjectForm locale={locale} />
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
