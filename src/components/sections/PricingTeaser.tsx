'use client'

/**
 * Inline pricing teaser — answers the #1 unsaid question Korean small-biz
 * owners have within 5 seconds of landing: "how much?"
 *
 * Now includes a "10-second estimate" mini-estimator: three single-select
 * chip steps (type / size / bilingual) that render a live price range +
 * timeline with zero submit friction. Ranges are anchored to the real
 * tiers below so the number is credible, and every interaction fires a
 * GA4 event (estimator_select / estimator_complete) for engagement +
 * funnel measurement. Static tier cards stay as the price-legitimacy anchor.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import InView from '@/components/ui/motion/InView'

const KAKAO_CHAT_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

/* ---------------------------------- GA4 ---------------------------------- */

function track(event: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('event', event, params)
}

/* ------------------------------- Estimator ------------------------------- */

type PriceRange = readonly [number, number]
type StepId = 'type' | 'size' | 'bilingual'

type EstimatorOption = {
  value: string
  label: { en: string; ko: string }
  /** USD add (or base, for type) — kept in clean $100s */
  price: PriceRange
  /** weeks add (or base, for type) */
  weeks: PriceRange
}

type EstimatorStep = {
  id: StepId
  label: { en: string; ko: string }
  options: EstimatorOption[]
}

const estimatorSteps: EstimatorStep[] = [
  {
    id: 'type',
    label: { en: 'Type', ko: '사이트 유형' },
    options: [
      { value: 'website', label: { en: 'Website', ko: '홈페이지' }, price: [1000, 2500], weeks: [2, 3] },
      { value: 'shopify', label: { en: 'Shopify store', ko: 'Shopify 쇼핑몰' }, price: [3000, 6000], weeks: [4, 6] },
      { value: 'revamp', label: { en: 'Revamp', ko: '리뉴얼' }, price: [1500, 4000], weeks: [3, 5] },
    ],
  },
  {
    id: 'size',
    label: { en: 'Size', ko: '규모' },
    options: [
      { value: 'small', label: { en: 'Up to 5 pages', ko: '5페이지 이하' }, price: [0, 0], weeks: [0, 0] },
      { value: 'medium', label: { en: '5–10 pages', ko: '5–10페이지' }, price: [500, 800], weeks: [1, 1] },
      { value: 'large', label: { en: '10+ / commerce', ko: '10+ · 커머스' }, price: [1000, 1500], weeks: [2, 2] },
    ],
  },
  {
    id: 'bilingual',
    label: { en: 'Language', ko: '이중언어' },
    options: [
      { value: 'both', label: { en: 'KO + EN both', ko: '한·영 둘 다' }, price: [300, 800], weeks: [0, 0] },
      { value: 'one', label: { en: 'One language', ko: '한 언어만' }, price: [0, 0], weeks: [0, 0] },
    ],
  },
]

const roundTo100 = (n: number) => Math.round(n / 100) * 100
const usd = (n: number) => `$${n.toLocaleString('en-US')}`

function Estimator({ isKo, prefix }: { isKo: boolean; prefix: string }) {
  const [picks, setPicks] = useState<Partial<Record<StepId, string>>>({})

  const estimate = useMemo(() => {
    const chosen = estimatorSteps.map((step) =>
      step.options.find((o) => o.value === picks[step.id]),
    )
    if (chosen.some((o) => !o)) return null
    const opts = chosen as EstimatorOption[]
    const min = roundTo100(opts.reduce((sum, o) => sum + o.price[0], 0))
    const max = roundTo100(opts.reduce((sum, o) => sum + o.price[1], 0))
    const weeksMin = opts.reduce((sum, o) => sum + o.weeks[0], 0)
    const weeksMax = opts.reduce((sum, o) => sum + o.weeks[1], 0)
    return { min, max, weeksMin, weeksMax }
  }, [picks])

  // Fire once per completed combination (estimate identity only changes
  // when picks change, thanks to useMemo).
  useEffect(() => {
    if (!estimate) return
    track('estimator_complete', {
      type: picks.type,
      size: picks.size,
      bilingual: picks.bilingual,
      price_min: estimate.min,
      price_max: estimate.max,
      range: `${usd(estimate.min)}–${usd(estimate.max)}`,
    })
  }, [estimate, picks])

  const select = (step: StepId, value: string) => {
    setPicks((prev) => ({ ...prev, [step]: value }))
    track('estimator_select', { step, value })
  }

  const weeksLabel = estimate
    ? isKo
      ? `약 ${estimate.weeksMin === estimate.weeksMax ? estimate.weeksMin : `${estimate.weeksMin}–${estimate.weeksMax}`}주`
      : `~${estimate.weeksMin === estimate.weeksMax ? estimate.weeksMin : `${estimate.weeksMin}–${estimate.weeksMax}`} weeks`
    : ''

  return (
    <div className="mb-12 md:mb-16 border border-black/[0.08] bg-white/60 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,400px)]">
        {/* Steps */}
        <div className="p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8378] mb-6">
            {isKo ? '10초 견적' : '10-second estimate'}
          </p>
          <div className="space-y-6">
            {estimatorSteps.map((step) => (
              <fieldset key={step.id} className="m-0 p-0 border-0">
                <legend className="text-[12px] uppercase tracking-[0.18em] text-[#8a8378] mb-3 p-0">
                  {step.label[isKo ? 'ko' : 'en']}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {step.options.map((opt) => {
                    const selected = picks[step.id] === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => select(step.id, opt.value)}
                        className={`inline-flex items-center min-h-[44px] px-5 rounded-full border text-[14px] transition-colors ${
                          selected
                            ? 'bg-[#151414] border-[#151414] text-[#f2ece2]'
                            : 'bg-transparent border-black/[0.15] text-[#3a3836] hover:border-black/[0.45]'
                        }`}
                      >
                        {opt.label[isKo ? 'ko' : 'en']}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        {/* Live result */}
        <div className="border-t lg:border-t-0 lg:border-l border-black/[0.08] p-6 md:p-8 flex flex-col justify-center min-h-[220px]">
          {estimate ? (
            <div aria-live="polite">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8378] mb-3">
                {isKo ? '예상 견적' : 'Estimated range'}
              </p>
              <p className="font-display italic font-light text-[#b48a43] text-[clamp(32px,3.6vw,48px)] leading-[1.05] tracking-[-0.02em] m-0">
                {usd(estimate.min)}–{usd(estimate.max)}
              </p>
              <p className="text-[14px] text-[#3a3836] mt-2 mb-0">
                {weeksLabel}
                <span className="text-[#8a8378]">
                  {' '}· {isKo ? '정확한 금액은 상담 후 확정돼요' : 'final quote after a quick chat'}
                </span>
              </p>
            </div>
          ) : (
            <div aria-live="polite">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8378] mb-3">
                {isKo ? '예상 견적' : 'Estimated range'}
              </p>
              <p className="font-display italic font-light text-[#151414]/70 text-[clamp(20px,2.2vw,28px)] leading-[1.2] tracking-[-0.01em] m-0">
                {isKo ? '3번의 탭이면 예상 비용이 나옵니다' : 'Three taps to your estimate.'}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('kakao_click', {
                  link_location: 'pricing_teaser',
                  lead_source: 'kakao_chat',
                  page_path: window.location.pathname,
                })
              }
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#151414] text-[#f2ece2] text-[14px] transition-colors hover:bg-[#2c2a28]"
            >
              {isKo ? '카톡으로 정확한 견적 받기' : 'Get an exact quote on KakaoTalk'}
            </a>
            <Link
              href={`${prefix}/#contact`}
              className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-black/[0.2] text-[#151414] text-[14px] transition-colors hover:border-black/[0.5]"
            >
              {isKo ? '상담 신청' : 'Book a consult'}
            </Link>
          </div>
          <Link
            href={`${prefix}/pricing`}
            className="mt-4 self-start text-[13px] text-[#8a8378] border-b border-[#8a8378]/40 hover:text-[#151414] hover:border-[#151414] transition-colors pb-[2px]"
          >
            {isKo ? '전체 가격표 보기' : 'See the full price list'}
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- Tier cards ------------------------------ */

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

        {/* 10-second estimator */}
        <InView>
          <Estimator isKo={isKo} prefix={prefix} />
        </InView>

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
