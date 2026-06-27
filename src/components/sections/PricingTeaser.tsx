'use client'

/**
 * Inline pricing teaser — answers the #1 unsaid question Korean small-biz
 * owners have within 5 seconds of landing: "how much?"
 * Shows three tiers with transparent ranges and links to /pricing for the
 * full breakdown. Matches the editorial ivory + gold palette of the hero.
 */

import Link from 'next/link'
import InView from '@/components/ui/motion/InView'

type Tier = {
  id: string
  label: { en: string; ko: string }
  price: string
  forWho: { en: string; ko: string }
  bullets: { en: string[]; ko: string[] }
  popular?: boolean
}

const tiers: Tier[] = [
  {
    id: 'hobby',
    label: { en: 'Starter', ko: '스타터' },
    price: '$1k',
    forWho: { en: '1–3 page launch', ko: '1–3페이지 런칭' },
    bullets: {
      en: ['Mobile responsive', 'Basic SEO + form', 'Hosting included'],
      ko: ['모바일 반응형', '기본 SEO · 문의 폼', '호스팅 포함'],
    },
  },
  {
    id: 'plus',
    label: { en: 'Plus', ko: '플러스' },
    price: '$2k–3k',
    forWho: { en: 'Most small businesses', ko: '대부분의 스몰비즈니스' },
    bullets: {
      en: ['Custom design', 'Bilingual EN ↔ KO', 'Local SEO + GBP'],
      ko: ['맞춤 디자인', '한·영 이중언어', '로컬 SEO · GBP'],
    },
    popular: true,
  },
  {
    id: 'pro',
    label: { en: 'Pro', ko: '프로' },
    price: '$3k–6k',
    forWho: { en: 'Restaurants, multi-location, e-com', ko: '식당 · 다지점 · 이커머스' },
    bullets: {
      en: ['Shopify or Next.js', 'Booking / ordering', 'Advanced analytics'],
      ko: ['Shopify · Next.js', '예약 · 주문', '고급 분석'],
    },
  },
]

export default function PricingTeaser({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <section
      aria-label={isKo ? '가격' : 'Pricing'}
      className="relative bg-[#f7f2e9]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8378] mb-3">
              {isKo ? '05 — 가격' : '05 — Pricing'}
            </p>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] leading-[1.05] tracking-[-0.02em] text-[#151414] m-0">
              {isKo ? (
                <>
                  견적 없이도{' '}
                  <span className="italic font-light text-[#b48a43]">시작가가 보입니다.</span>
                </>
              ) : (
                <>
                  Transparent pricing,{' '}
                  <span className="italic font-light text-[#b48a43]">no quote dance.</span>
                </>
              )}
            </h2>
          </div>
          <Link
            href={`${prefix}/pricing`}
            className="inline-flex items-center gap-2 text-[14px] text-[#151414] border-b border-[#151414]/30 hover:border-[#151414] pb-1 self-start md:self-end"
          >
            {isKo ? '전체 가격 보기' : 'See full pricing'} →
          </Link>
        </div>

        {/* Tiers */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {tiers.map((t, i) => (
            <InView key={t.id} delay={i * 80}>
              <li
                className={`relative rounded-2xl p-7 md:p-8 h-full border ${
                  t.popular
                    ? 'border-[#b48a43] bg-white shadow-[0_24px_60px_-30px_rgba(180,138,67,0.45)]'
                    : 'border-black/[0.08] bg-white/60'
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#151414] text-[#f2ece2] text-[10px] uppercase tracking-[0.22em]">
                    {isKo ? '가장 인기' : 'Most popular'}
                  </span>
                )}
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] uppercase tracking-[0.22em] text-[#8a8378]">
                    {t.label[isKo ? 'ko' : 'en']}
                  </span>
                  <span className="font-display text-[clamp(26px,2.8vw,36px)] leading-none tracking-[-0.02em] text-[#151414]">
                    {t.price}
                  </span>
                </div>
                <p className="text-[13px] text-[#3a3836] mb-5">
                  {t.forWho[isKo ? 'ko' : 'en']}
                </p>
                <ul className="space-y-2 mb-6">
                  {t.bullets[isKo ? 'ko' : 'en'].map((b, j) => (
                    <li
                      key={j}
                      className="text-[14px] text-[#3a3836] flex items-start gap-2"
                    >
                      <span className="text-[#b48a43] mt-[2px]">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${prefix}/#contact`}
                  className={`inline-flex items-center gap-2 text-[14px] ${
                    t.popular
                      ? 'text-[#151414] font-medium'
                      : 'text-[#3a3836]'
                  } border-b border-current/30 hover:border-current pb-1`}
                >
                  {isKo ? '문의하기' : 'Start a project'} →
                </Link>
              </li>
            </InView>
          ))}
        </ul>
      </div>
    </section>
  )
}
