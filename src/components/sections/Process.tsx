'use client'

import InView from '@/components/ui/motion/InView'

type Step = {
  no: string
  title: { en: string; ko: string }
  weeks: { en: string; ko: string }
  body: { en: string; ko: string }
  bullets: { en: string[]; ko: string[] }
  Illo: React.FC<{ className?: string }>
}

const steps: Step[] = [
  {
    no: '01',
    title: { en: 'Discover', ko: '발견' },
    weeks: { en: 'Week 1', ko: '1주차' },
    body: {
      en: 'A kickoff conversation — we listen to your business, customers, and goals. In Korean or English.',
      ko: '사업, 고객, 목표를 경청합니다. 한국어 · 영어 모두 가능.',
    },
    bullets: {
      en: ['Brand discovery', 'Audience mapping', 'Goals + KPIs'],
      ko: ['브랜드 발견', '타겟 분석', '목표 · KPI'],
    },
    Illo: IlloDiscover,
  },
  {
    no: '02',
    title: { en: 'Design', ko: '설계' },
    weeks: { en: 'Weeks 2 — 3', ko: '2 — 3주차' },
    body: {
      en: 'Editorial direction, bilingual copy, wireframes and high-fidelity screens. Reviewed together, twice.',
      ko: '에디토리얼 디렉션, 이중언어 카피, 와이어프레임, 시안. 함께 두 번 리뷰.',
    },
    bullets: {
      en: ['Art direction', 'Wireframes', 'UI + Type system'],
      ko: ['아트 디렉션', '와이어프레임', 'UI · 타입 시스템'],
    },
    Illo: IlloDesign,
  },
  {
    no: '03',
    title: { en: 'Build', ko: '개발' },
    weeks: { en: 'Weeks 4 — 5', ko: '4 — 5주차' },
    body: {
      en: 'Next.js or Shopify, SEO + GEO on day one, structured data, hreflang. Built to be fast and found.',
      ko: 'Next.js · Shopify. 첫날부터 SEO · GEO, 구조화 데이터, hreflang. 빠르고, 검색되게.',
    },
    bullets: {
      en: ['Next.js / Shopify', 'SEO + GEO', 'CMS training'],
      ko: ['Next.js · Shopify', 'SEO · GEO', 'CMS 교육'],
    },
    Illo: IlloBuild,
  },
  {
    no: '04',
    title: { en: 'Grow', ko: '성장' },
    weeks: { en: 'Week 6 →', ko: '6주차 →' },
    body: {
      en: 'Launch, monitor, iterate. Monthly reports, ads, and content support that compounds.',
      ko: '런칭 · 모니터링 · 개선. 월간 리포트, 광고, 콘텐츠 지원으로 복리 성장.',
    },
    bullets: {
      en: ['Launch', 'Ads + content', 'Monthly reports'],
      ko: ['런칭', '광고 · 콘텐츠', '월간 리포트'],
    },
    Illo: IlloGrow,
  },
]

export default function Process({
  locale = 'en',
  sectionNumber = '03',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'

  return (
    <section className="relative bg-bone section-pad hair-bottom">
      <div className="container-edge">
        {/* Head */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20 md:mb-28">
          <div className="md:col-span-5">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '프로세스' : 'How we work'}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{isKo ? '6주,' : 'Six weeks,'}</span>
              </InView>
              <InView as="span" className="mask-row" delay={150}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '네 개의 장면.' : 'four movements.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '모든 프로젝트는 대화에서 시작해 런칭 후 성장까지. 복잡한 과정을 단순하게, 투명하게 진행합니다.'
                  : 'Every engagement begins with a conversation and ends with something that keeps compounding. Simple phases, transparent handoffs.'}
              </span>
            </InView>
          </div>
        </div>

        {/* 4 cards with connector line */}
        <div className="relative">
          {/* Horizontal connector on md+ */}
          <div className="hidden md:block absolute top-[112px] left-[10%] right-[10%] h-px bg-hairline" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {steps.map((s, i) => (
              <InView
                key={s.no}
                className="reveal group relative"
                delay={i * 120}
              >
                {/* Dot on connector */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[104px] w-4 h-4 rounded-full bg-bone border border-hairline items-center justify-center z-10 group-hover:border-gold transition-colors duration-500">
                  <span className="block w-1.5 h-1.5 rounded-full bg-ink group-hover:bg-gold transition-colors duration-500" />
                </div>

                {/* Illustration */}
                <div className="relative aspect-square max-w-[220px] mx-auto mb-12 flex items-center justify-center">
                  <s.Illo className="w-full h-full text-ink group-hover:text-gold transition-colors duration-700" />
                </div>

                {/* Step content */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="section-num text-lg">{s.no}</span>
                    <span className="overline text-ash">{s.weeks[locale as 'en' | 'ko']}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink tracking-luxury fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                    {s.title[locale as 'en' | 'ko']}
                  </h3>
                  <p className="mt-4 text-[14px] text-graphite leading-[1.7] max-w-[30ch] mx-auto md:mx-0">
                    {s.body[locale as 'en' | 'ko']}
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {(s.bullets[locale as 'en' | 'ko'] || s.bullets.en).map((b) => (
                      <li key={b} className="flex items-center justify-center md:justify-start gap-2 text-[12px] text-ash">
                        <span className="w-1 h-1 rounded-full bg-ash/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </InView>
            ))}
          </div>
        </div>

        {/* Timeline callout */}
        <div className="mt-24 md:mt-32 pt-12 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <p className="overline text-ash mb-3">{isKo ? '평균 기간' : 'Average timeline'}</p>
            <p className="font-display text-4xl md:text-5xl text-ink fraunces-soft">
              6 <span className="italic font-light text-gold">{isKo ? '주' : 'weeks'}</span>
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="overline text-ash mb-3">{isKo ? '리뷰 라운드' : 'Review rounds'}</p>
            <p className="font-display text-4xl md:text-5xl text-ink fraunces-soft">
              2 <span className="italic font-light text-gold">/ {isKo ? '단계' : 'phase'}</span>
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="overline text-ash mb-3">{isKo ? '런칭 후 지원' : 'Post-launch'}</p>
            <p className="font-display text-4xl md:text-5xl text-ink fraunces-soft">
              <span className="italic font-light text-gold">{isKo ? '상시' : 'Ongoing'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Editorial SVG illustrations ──────────────────────────────────────── */

function IlloDiscover({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <circle cx="90" cy="90" r="46" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="90" cy="90" r="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
      <line x1="124" y1="124" x2="160" y2="160" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="90" cy="90" r="4" fill="#B8914A" />
      <text x="100" y="195" textAnchor="middle" className="fill-current" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="12" opacity="0.5">
        ·  listen  ·
      </text>
    </svg>
  )
}

function IlloDesign({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <rect x="34" y="40" width="132" height="100" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="34" y1="62" x2="166" y2="62" stroke="currentColor" strokeWidth="1" />
      <line x1="48" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="48" y1="92" x2="150" y2="92" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="48" y1="104" x2="140" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="48" y1="116" x2="110" y2="116" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="42" cy="54" r="2" fill="#B8914A" />
      <circle cx="52" cy="54" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="62" cy="54" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="100" y="195" textAnchor="middle" className="fill-current" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="12" opacity="0.5">
        ·  compose  ·
      </text>
    </svg>
  )
}

function IlloBuild({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <polyline points="70,70 50,100 70,130" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="130,70 150,100 130,130" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="110" y1="62" x2="90" y2="138" stroke="#B8914A" strokeWidth="1.6" strokeLinecap="round" />
      <text x="100" y="195" textAnchor="middle" className="fill-current" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="12" opacity="0.5">
        ·  craft  ·
      </text>
    </svg>
  )
}

function IlloGrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      <polyline
        points="34,140 60,120 86,128 112,96 138,100 166,58"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {[{ x: 34, y: 140 }, { x: 60, y: 120 }, { x: 86, y: 128 }, { x: 112, y: 96 }, { x: 138, y: 100 }, { x: 166, y: 58 }].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={i === 5 ? '#B8914A' : 'currentColor'} />
      ))}
      <line x1="34" y1="155" x2="166" y2="155" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <text x="100" y="195" textAnchor="middle" className="fill-current" fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="300" fontSize="12" opacity="0.5">
        ·  compound  ·
      </text>
    </svg>
  )
}
