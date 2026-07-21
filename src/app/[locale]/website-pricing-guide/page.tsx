import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import PricingGuideMagnet from '@/components/leadmagnets/PricingGuideMagnet'
import { SITE_URL } from '@/lib/siteUrl'

// ─────────────────────────────────────────────────────────────────────────────
// /website-pricing-guide — lead-magnet landing page for the 2026 Small
// Business Website Pricing Guide PDF (KO + EN, built by
// scripts/lead-magnets/build.js into public/downloads/).
// The guide's substance lives ungated on this page (indexable, GEO-citable);
// the designed PDF is the email-capture bonus.
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = SITE_URL
  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${baseUrl}${prefix}/website-pricing-guide`

  const meta = {
    en: {
      title: '2026 Small Business Website Pricing Guide — Real Costs, Hidden Fees, 7 Questions | ZOE LUMOS',
      description:
        'Free 2026 guide: what a small business website really costs in the US — market rates from DIY builders to agencies, hidden fees to watch for, and the 7 questions to ask before signing any contract. Free bilingual (English/Korean) PDF included.',
    },
    ko: {
      title: '2026 스몰비즈니스 웹사이트 가격 가이드 — 시장 시세·숨은 비용·계약 전 질문 7가지 | ZOE LUMOS',
      description:
        '무료 2026 가이드: 미국에서 스몰비즈니스 웹사이트는 실제로 얼마일까요? DIY 빌더부터 에이전시까지 시장 시세, 견적서에 없는 숨은 비용, 계약 전 반드시 물어볼 7가지 질문. 한/영 PDF 무료 제공.',
    },
  }[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${baseUrl}/website-pricing-guide`,
        en: `${baseUrl}/website-pricing-guide`,
        ko: `${baseUrl}/ko/website-pricing-guide`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'article',
    },
    robots: { index: true, follow: true },
  }
}

const RATE_ROWS = [
  {
    approach: { en: 'DIY builders (Wix · Squarespace · GoDaddy)', ko: 'DIY 빌더 (Wix · Squarespace · GoDaddy)' },
    cost: { en: '$16–50/mo + your time', ko: '월 $16~50 + 사장님의 시간' },
    note: {
      en: 'Cheapest on paper, but you build and maintain it yourself — bilingual layouts, local SEO, and speed work are hard, and the subscription never ends.',
      ko: '가장 저렴해 보이지만 직접 만들고 직접 관리해야 합니다. 한/영 이중언어·지역 SEO·속도 최적화가 어렵고 월 구독료는 계속 나갑니다.',
    },
  },
  {
    approach: { en: 'Freelancer', ko: '프리랜서' },
    cost: { en: '$500 – $3,000', ko: '$500 ~ $3,000' },
    note: {
      en: 'The widest quality variance per dollar. Vanishing after launch is common — always confirm the maintenance plan.',
      ko: '가격 대비 품질 편차가 가장 큽니다. 완성 후 연락이 끊기는 경우가 흔해 유지관리 계획 확인이 필수입니다.',
    },
  },
  {
    approach: { en: 'Small agency', ko: '소형 에이전시' },
    cost: { en: '$2,000 – $10,000', ko: '$2,000 ~ $10,000' },
    note: {
      en: 'Design, build, and maintenance under one roof — but few understand bilingual Korean/English content or channels like KakaoTalk.',
      ko: '설계·디자인·관리까지 책임지는 구조. 다만 한인 비즈니스의 한/영 콘텐츠와 카카오톡 같은 채널을 이해하는 곳은 드뭅니다.',
    },
  },
  {
    approach: { en: 'Large agency', ko: '대형 에이전시' },
    cost: { en: '$10,000+', ko: '$10,000+' },
    note: {
      en: 'Full brand-strategy projects — usually more than a small business needs.',
      ko: '브랜드 전략까지 포함한 프로젝트형. 스몰비즈니스에는 과한 경우가 대부분입니다.',
    },
  },
]

const QUESTIONS = [
  {
    q: { en: 'Do I own 100% of the domain and code?', ko: '도메인과 코드는 100% 제 소유인가요?' },
    why: {
      en: "If they're in the vendor's name, you can lose the site when the contract ends. The single most important question.",
      ko: '업체 명의라면 계약 종료 시 사이트를 잃을 수 있습니다. 가장 중요한 질문입니다.',
    },
  },
  {
    q: { en: 'How many revisions are included, and what does an extra one cost?', ko: '수정은 몇 회까지 포함이고, 초과하면 얼마인가요?' },
    why: {
      en: '"Unlimited revisions" is almost always an exaggeration — get the count and hourly overage rate in numbers.',
      ko: '"무제한 수정"은 대부분 과장입니다. 횟수와 시간당 요금을 숫자로 받으세요.',
    },
  },
  {
    q: { en: 'What is my total monthly cost after launch?', ko: '완성 후 매달 나가는 돈은 전부 얼마인가요?' },
    why: {
      en: 'Ask for one number: hosting + domain + licenses + maintenance combined.',
      ko: '호스팅 + 도메인 + 라이선스 + 관리비를 합친 "월 총비용" 하나로 물어보세요.',
    },
  },
  {
    q: { en: 'Does it load in under 3 seconds on a phone?', ko: '휴대폰에서 3초 안에 열리나요?' },
    why: {
      en: "Most customers are on mobile — open the vendor's past work on your own phone.",
      ko: '손님 대부분이 모바일입니다. 기존 작업물을 휴대폰으로 직접 열어보세요.',
    },
  },
  {
    q: { en: 'Is basic SEO included so Google can find me?', ko: '구글에 검색되게 하는 기본 SEO가 포함인가요?' },
    why: {
      en: "Without titles, descriptions, Maps integration, and speed work, you've bought a pretty flyer.",
      ko: '제목·설명·지도 연동·속도 같은 기본이 빠지면 "예쁜 전단지"를 산 것입니다.',
    },
  },
  {
    q: { en: 'Is Korean/English properly supported?', ko: '한국어/영어 두 언어를 제대로 지원하나요?' },
    why: {
      en: 'A translator widget is not bilingual design — serving both Korean and American customers requires the real thing.',
      ko: '번역기 위젯과 이중언어 설계는 다릅니다. 한인+미국 손님을 둘 다 잡으려면 후자가 필요합니다.',
    },
  },
  {
    q: { en: 'When something breaks, who fixes it — and how fast?', ko: '문제가 생기면 누가, 얼마나 빨리 고쳐주나요?' },
    why: {
      en: 'Confirm the response time (e.g., one business day) and maintenance terms in writing.',
      ko: '응답 시간(예: 영업일 1일)과 관리 계약 조건을 서면으로 확인하세요.',
    },
  },
]

export default function WebsitePricingGuidePage({ params }: { params: { locale: string } }) {
  const locale: 'en' | 'ko' = params.locale === 'ko' ? 'ko' : 'en'
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const baseUrl = SITE_URL

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: `${baseUrl}${prefix || ''}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKo ? '웹사이트 가격 가이드' : 'Website Pricing Guide',
        item: `${baseUrl}${prefix}/website-pricing-guide`,
      },
    ],
  }

  const t = {
    eyebrow: isKo ? '무료 가이드 · 2026' : 'Free guide · 2026',
    title: isKo ? '2026 스몰비즈니스 웹사이트 가격 가이드' : 'The 2026 Small Business Website Pricing Guide',
    subtitle: isKo
      ? '웹사이트 견적, 왜 어디는 $500이고 어디는 $10,000일까요? 시장 시세부터 숨은 비용, 계약 전 확인할 7가지 질문까지 — 바가지 쓰지 않도록 정리했습니다.'
      : 'Why is one website quote $500 and another $10,000? Market rates, hidden costs, and the 7 questions to ask before you sign — everything you need to avoid overpaying.',
    directAnswer: isKo
      ? '2026년 기준, 미국 스몰비즈니스 웹사이트는 DIY 빌더 월 $16~50, 프리랜서 $500~3,000, 소형 에이전시 $2,000~10,000이 일반적인 범위입니다. 총비용의 절반은 완성 후의 호스팅·관리에서 발생하므로, 견적을 비교할 때는 제작비만이 아니라 "완성 후 월 총비용"과 도메인·코드 소유권을 함께 확인해야 합니다.'
      : 'As of 2026, typical US small business website costs run $16–50/month for DIY builders, $500–3,000 for freelancers, and $2,000–10,000 for small agencies. Since half the true cost comes after launch in hosting and maintenance, compare quotes on total monthly cost after launch and on domain/code ownership — not on the build price alone.',
    ratesTitle: isKo ? '2026년 미국 시장 시세' : '2026 US market rates',
    ratesIntro: isKo
      ? '미국 스몰비즈니스 기준의 일반적인 범위입니다. 이 범위를 크게 벗어나는 견적은 이유를 물어보세요.'
      : 'Typical ranges for US small businesses. A quote far outside these ranges deserves an explanation.',
    thApproach: isKo ? '제작 방식' : 'Approach',
    thCost: isKo ? '일반적 비용' : 'Typical cost',
    thNote: isKo ? '장단점' : 'Trade-offs',
    hiddenTitle: isKo ? '견적서에 잘 안 보이는 숨은 비용' : 'Hidden costs that rarely appear on quotes',
    hidden: isKo
      ? [
          '도메인 — 연 $12~20. 반드시 사장님 명의로 등록되어야 합니다.',
          '호스팅 — 월 $10~50. 업체 명의면 사이트를 "인질"로 잡힐 수 있습니다.',
          'SSL 보안 인증서 — 무료가 표준입니다. 별도 청구는 의심하세요.',
          '유료 플러그인/테마 라이선스 — 연 $50~300. 갱신 비용 부담자를 확인하세요.',
          '수정 요금 — 포함 수정 횟수와 초과 시 시간당 요금을 서면으로.',
          '사진/콘텐츠 — 메뉴·가격·사진을 누가 준비하는지에 따라 일정과 비용이 달라집니다.',
        ]
      : [
          'Domain — $12–20/year, and it must be registered in your name.',
          "Hosting — $10–50/month. In the vendor's name, your site can be held hostage.",
          'SSL certificate — free is the standard; be suspicious of charges for it.',
          'Premium plugin/theme licenses — $50–300/year. Confirm who pays renewals.',
          'Edit fees — get the included revision count and overage hourly rate in writing.',
          'Photos & content — who prepares menus, prices, and photos changes timeline and cost.',
        ],
    questionsTitle: isKo ? '계약 전 반드시 물어볼 7가지 질문' : '7 questions to ask before you sign',
    questionsIntro: isKo
      ? '어느 업체와 계약하시든 — 저희가 아니어도 — 이 7가지는 서면 답변을 받아두세요.'
      : "Whoever you hire — even if it isn't us — get written answers to these seven.",
    ourTitle: isKo ? '저희 가격은 전부 공개되어 있습니다' : 'Our prices are fully public',
    ourBody: isKo
      ? '비교 기준으로 쓰시라고 ZOE LUMOS의 가격표를 전부 공개합니다: 일회성 제작 $500~2,400, 월 관리 플랜 $49~499. 모든 프로젝트에 수정 2회 기본 포함, 도메인·코드 100% 사장님 소유, 월 플랜은 언제든 해지 가능합니다.'
      : 'As your comparison baseline, ZOE LUMOS publishes its entire price list: one-time builds $500–2,400 and monthly care plans $49–499. Every project includes two revision rounds, 100% client ownership of domain and code, and cancel-anytime monthly plans.',
    ourLink: isKo ? '공개 가격표 보기' : 'See the full price list',
    estimatorLink: isKo ? '1분 견적 계산기' : '1-minute cost estimator',
    ctaTitle: isKo ? '지금 사이트가 제값을 하는지 궁금하세요?' : 'Wondering if your current site is pulling its weight?',
    ctaBody: isKo
      ? '무료 진단으로 속도·SEO 상태를 확인해 드립니다. 상담은 이메일 또는 카카오톡으로 — 한국어·영어 모두 가능합니다.'
      : 'Get a free audit of your speed and SEO health. Consultations by email or KakaoTalk, in English or Korean.',
    ctaBtn: isKo ? '무료 진단 받기' : 'Get a free audit',
    ctaContact: isKo ? '무료 상담 받기' : 'Get a free consultation',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-ivory text-ink">
        {/* Header band */}
        <section className="hair-bottom pt-40 md:pt-48 pb-14 md:pb-16">
          <div className="container-edge">
            <div className="max-w-3xl">
              <p className="overline text-gold mb-6">{t.eyebrow}</p>
              <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] tracking-luxury text-ink mb-6">
                {t.title}
              </h1>
              <p className="text-body-lg text-graphite leading-[1.7]">{t.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-edge">
            <div className="mx-auto max-w-[760px]">
              {/* Direct answer (GEO) */}
              <p className="font-display italic font-light text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.6] text-ink pl-6 border-l-2 border-gold mb-12">
                {t.directAnswer}
              </p>

              {/* Market rates */}
              <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] tracking-luxury text-ink mb-3">
                {t.ratesTitle}
              </h2>
              <p className="text-[15px] text-graphite leading-[1.7] mb-5">{t.ratesIntro}</p>
              <div className="overflow-x-auto mb-12">
                <table className="w-full text-[14px] border-collapse">
                  <thead>
                    <tr className="bg-ink text-ivory">
                      <th className="text-left px-4 py-3 font-medium whitespace-nowrap">{t.thApproach}</th>
                      <th className="text-left px-4 py-3 font-medium whitespace-nowrap">{t.thCost}</th>
                      <th className="text-left px-4 py-3 font-medium">{t.thNote}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RATE_ROWS.map((row, i) => (
                      <tr key={i} className="border-b border-hairline align-top">
                        <td className="px-4 py-3 font-medium text-ink">{row.approach[locale]}</td>
                        <td className="px-4 py-3 text-gold font-semibold whitespace-nowrap">{row.cost[locale]}</td>
                        <td className="px-4 py-3 text-graphite leading-[1.6]">{row.note[locale]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Hidden costs */}
              <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] tracking-luxury text-ink mb-4">
                {t.hiddenTitle}
              </h2>
              <ul className="space-y-3 m-0 p-0 list-none mb-12">
                {t.hidden.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 px-5 py-4 bg-bone rounded-[2px] hair-y">
                    <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-gold" />
                    <span className="text-[15px] text-graphite leading-[1.7]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Magnet — mid-page, after value is proven */}
              <PricingGuideMagnet locale={locale} />

              {/* 7 questions */}
              <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] tracking-luxury text-ink mb-3">
                {t.questionsTitle}
              </h2>
              <p className="text-[15px] text-graphite leading-[1.7] mb-5">{t.questionsIntro}</p>
              <ol className="space-y-3 m-0 p-0 list-none mb-12">
                {QUESTIONS.map((item, i) => (
                  <li key={i} className="px-5 py-4 bg-bone rounded-[2px] hair-y">
                    <p className="text-[15px] font-medium text-ink m-0 mb-1">
                      <span className="text-gold font-semibold mr-2">{i + 1}.</span>
                      {item.q[locale]}
                    </p>
                    <p className="text-[13.5px] text-graphite leading-[1.6] m-0 pl-6">{item.why[locale]}</p>
                  </li>
                ))}
              </ol>

              {/* Our transparent pricing */}
              <aside className="my-12 px-7 py-8 bg-bone rounded-[2px] hair-y">
                <h2 className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] tracking-luxury text-ink m-0 mb-3">
                  {t.ourTitle}
                </h2>
                <p className="text-[15px] text-graphite leading-[1.7] mb-5">{t.ourBody}</p>
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                  <Link
                    href={`${prefix}/pricing`}
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors"
                  >
                    {t.ourLink} →
                  </Link>
                  <Link
                    href={`${prefix}/tools/website-cost-estimator`}
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors"
                  >
                    {t.estimatorLink} →
                  </Link>
                </div>
              </aside>

              {/* CTA */}
              <aside className="my-4 py-10 border-t border-b border-hairline text-center">
                <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-luxury text-ink mb-3">
                  {t.ctaTitle}
                </h2>
                <p className="text-[15px] text-graphite leading-[1.7] mb-8 max-w-xl mx-auto">{t.ctaBody}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  <Link href={`${prefix}/audit`} className="btn-ink">
                    {t.ctaBtn}
                    <span className="arrow">→</span>
                  </Link>
                  <Link
                    href={`${prefix}/contact`}
                    className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
                  >
                    {t.ctaContact}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
