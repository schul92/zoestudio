'use client'

/**
 * Inline pricing teaser — answers the first unsaid question a visitor has within 5 seconds of landing: "how much?"
 *
 * Includes a "10-second estimate" mini-estimator: three single-select chip steps (type / size / language) that render
 * a live price range + timeline with zero submit friction. Ranges are anchored to the real tiers below so the number
 * is credible (clinic sites use the published practice-site range), B2B portals and integrations are quoted per
 * project rather than invented, and every interaction fires a GA4 event (estimator_select / estimator_complete).
 * Static tier cards stay as the price-legitimacy anchor.
 *
 * Colours come from theme tokens (ink / graphite / ash / bone / ivory) so the section reads on the dark site and in
 * light contexts alike; the old fixed black borders vanished on #000.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
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
  /** No honest range exists (portals, integrations): the result asks for a scoping call instead of a number. */
  quote?: true
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
      // Clinic sites: the published Standard range for practices (industries/korean-medical-dental FAQ).
      { value: 'clinic', label: { en: 'Clinic / dental', ko: '병원·치과' }, price: [1100, 1500], weeks: [2, 3] },
      { value: 'b2b', label: { en: 'B2B portal / integration', ko: 'B2B 포털·연동' }, price: [0, 0], weeks: [0, 0], quote: true },
      { value: 'website', label: { en: 'Website', ko: '홈페이지' }, price: [500, 800], weeks: [2, 3] },
      { value: 'revamp', label: { en: 'Revamp', ko: '리뉴얼' }, price: [700, 1500], weeks: [3, 5] },
      { value: 'shopify', label: { en: 'Shopify store', ko: 'Shopify 쇼핑몰' }, price: [1800, 2400], weeks: [4, 6] },
    ],
  },
  {
    id: 'size',
    label: { en: 'Size', ko: '규모' },
    options: [
      { value: 'small', label: { en: 'Up to 5 pages', ko: '5페이지 이하' }, price: [0, 0], weeks: [0, 0] },
      { value: 'medium', label: { en: '5–10 pages', ko: '5–10페이지' }, price: [600, 700], weeks: [1, 1] },
      { value: 'large', label: { en: '10+ / commerce', ko: '10+ · 커머스' }, price: [1000, 1400], weeks: [2, 2] },
    ],
  },
  {
    id: 'bilingual',
    label: { en: 'Language', ko: '언어' },
    options: [
      { value: 'both', label: { en: 'KO + EN both', ko: '한·영 둘 다' }, price: [200, 400], weeks: [0, 0] },
      { value: 'one', label: { en: 'One language', ko: '한 언어만' }, price: [0, 0], weeks: [0, 0] },
    ],
  },
]

const roundTo100 = (n: number) => Math.round(n / 100) * 100
const usd = (n: number) => `$${n.toLocaleString('en-US')}`

/** Rolls a number from its previous value to the new one (ease-out quart). Instant under reduced motion. */
function useTweened(target: number, ms = 480) {
  const [value, setValue] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    const start = from.current
    if (start === target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target
      setValue(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / ms)
      const cur = start + (target - start) * (1 - Math.pow(1 - k, 4))
      from.current = cur
      setValue(cur)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return value
}

type Estimate = { quote: true } | { quote?: false; min: number; max: number; weeksMin: number; weeksMax: number }

function Estimator({ isKo, prefix }: { isKo: boolean; prefix: string }) {
  const [picks, setPicks] = useState<Partial<Record<StepId, string>>>({})
  const l = isKo ? 'ko' : 'en'

  const estimate = useMemo<Estimate | null>(() => {
    const type = estimatorSteps[0].options.find((o) => o.value === picks.type)
    // Portals and integrations are scoped, not sized: answer as soon as the type is picked.
    if (type?.quote) return { quote: true }
    const chosen = estimatorSteps.map((step) => step.options.find((o) => o.value === picks[step.id]))
    if (chosen.some((o) => !o)) return null
    const opts = chosen as EstimatorOption[]
    const min = roundTo100(opts.reduce((sum, o) => sum + o.price[0], 0))
    const max = roundTo100(opts.reduce((sum, o) => sum + o.price[1], 0))
    const weeksMin = opts.reduce((sum, o) => sum + o.weeks[0], 0)
    const weeksMax = opts.reduce((sum, o) => sum + o.weeks[1], 0)
    return { min, max, weeksMin, weeksMax }
  }, [picks])

  const priced = estimate && !estimate.quote ? estimate : null
  const shownMin = useTweened(priced?.min ?? 0)
  const shownMax = useTweened(priced?.max ?? 0)
  const roll = (n: number) => usd(Math.round(n / 10) * 10)

  // Fire once per completed combination (estimate identity only changes when picks change, thanks to useMemo).
  useEffect(() => {
    if (!estimate) return
    track('estimator_complete', {
      type: picks.type,
      size: picks.size,
      bilingual: picks.bilingual,
      ...(estimate.quote
        ? { range: 'custom_quote' }
        : { price_min: estimate.min, price_max: estimate.max, range: `${usd(estimate.min)}–${usd(estimate.max)}` }),
    })
  }, [estimate, picks])

  const select = (step: StepId, value: string) => {
    setPicks((prev) => ({ ...prev, [step]: value }))
    track('estimator_select', { step, value })
  }

  const weeksLabel = priced
    ? isKo
      ? `약 ${priced.weeksMin === priced.weeksMax ? priced.weeksMin : `${priced.weeksMin}–${priced.weeksMax}`}주`
      : `~${priced.weeksMin === priced.weeksMax ? priced.weeksMin : `${priced.weeksMin}–${priced.weeksMax}`} weeks`
    : ''

  return (
    <div className="mb-12 md:mb-16 border border-ink/10 bg-bone rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,400px)]">
        {/* Steps */}
        <div className="p-6 md:p-8">
          <p className="text-[12px] uppercase text-ash mb-6" style={{ letterSpacing: 'var(--ovl-track)' }}>
            {isKo ? '10초 견적' : '10-second estimate'}
          </p>
          <div className="space-y-6">
            {estimatorSteps.map((step) => {
              // Size and language don't apply to a scoped portal quote.
              const skipped = step.id !== 'type' && picks.type === 'b2b'
              return (
                <fieldset key={step.id} disabled={skipped} className={`m-0 p-0 border-0 transition-opacity duration-300 ${skipped ? 'opacity-40' : ''}`}>
                  <legend className="text-[12px] uppercase text-ash mb-3 p-0" style={{ letterSpacing: 'var(--ovl-track)' }}>
                    {step.label[l]}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {step.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={picks[step.id] === opt.value}
                        onClick={() => select(step.id, opt.value)}
                        className="zl-chip disabled:pointer-events-none"
                      >
                        {opt.label[l]}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )
            })}
          </div>
        </div>

        {/* Live result */}
        <div className="border-t lg:border-t-0 lg:border-l border-ink/10 p-6 md:p-8 flex flex-col justify-center min-h-[220px]">
          <div aria-live="polite">
            <p className="text-[12px] uppercase text-ash mb-3" style={{ letterSpacing: 'var(--ovl-track)' }}>
              {isKo ? '예상 견적' : 'Estimated range'}
            </p>
            {priced ? (
              <>
                {/* The rolling figure is visual only; screen readers get the settled range once. */}
                <p aria-hidden className="font-display italic font-light text-link text-[clamp(32px,3.6vw,48px)] leading-[1.05] tracking-[-0.02em] m-0 tabular-nums">
                  {roll(shownMin)}–{roll(shownMax)}
                </p>
                <span className="sr-only">
                  {usd(priced.min)}–{usd(priced.max)}
                </span>
                <p className="text-[14px] text-graphite mt-2 mb-0">
                  {weeksLabel}
                  <span className="text-ash"> · {isKo ? '정확한 금액은 상담 후 확정돼요' : 'final quote after a quick chat'}</span>
                </p>
              </>
            ) : estimate?.quote ? (
              <>
                <p className="font-display italic font-light text-link text-[clamp(26px,2.8vw,36px)] leading-[1.15] tracking-[-0.02em] m-0">
                  {isKo ? '범위에 맞춘 개별 견적' : 'Scoped, per-project quote'}
                </p>
                <p className="text-[14px] text-graphite mt-2 mb-0">
                  {isKo
                    ? '포털·시스템 연동은 연결할 시스템과 사용자 범위에 따라 달라져요. 상담에서 범위부터 함께 정해요.'
                    : 'Portals and integrations depend on the systems and users involved. We scope it with you first.'}
                </p>
              </>
            ) : (
              <p className="font-display italic font-light text-ink/80 text-[clamp(20px,2.2vw,28px)] leading-[1.2] tracking-[-0.01em] m-0">
                {isKo ? '3번의 탭이면 예상 비용이 나옵니다' : 'Three taps to your estimate.'}
              </p>
            )}
          </div>

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
              className="btn-ink justify-center min-h-[44px] text-[14px]"
            >
              {isKo ? '카톡으로 정확한 견적 받기' : 'Get an exact quote on KakaoTalk'}
            </a>
            <Link href={`${prefix}/#contact`} className="btn-outline justify-center min-h-[44px] text-[14px]">
              {isKo ? '상담 신청' : 'Book a consult'}
            </Link>
          </div>
          <Link
            href={`${prefix}/pricing`}
            className="mt-4 self-start text-[13px] text-ash border-b border-ash/40 hover:text-ink hover:border-ink transition-colors pb-[2px]"
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
    id: 'basic',
    label: { en: 'Basic', ko: '기본' },
    price: '$500–800',
    forWho: { en: 'Up to 5 pages, quick launch', ko: '5페이지 이하 · 빠른 런칭' },
    bullets: {
      en: ['Mobile responsive', 'Basic SEO + form', '2 revision rounds per phase'],
      ko: ['모바일 반응형', '기본 SEO · 문의 폼', '단계별 수정 2회'],
    },
  },
  {
    id: 'standard',
    label: { en: 'Standard', ko: '일반' },
    price: '$1,100–1,500',
    forWho: { en: 'Clinics, practices and most local businesses', ko: '병원·전문직 · 대부분의 매장' },
    bullets: {
      en: ['Custom design', 'Bilingual EN ↔ KO', 'Local SEO + GBP'],
      ko: ['맞춤 디자인', '한·영 이중언어', '로컬 SEO · GBP'],
    },
    popular: true,
  },
  {
    id: 'store',
    label: { en: 'Store', ko: '스토어' },
    price: '$1,800–2,400',
    forWho: { en: 'Shopify, booking, e-commerce', ko: '쇼핑몰 · 예약 · 이커머스' },
    bullets: {
      en: ['Shopify or Next.js', 'Booking / ordering', 'Products & checkout'],
      ko: ['Shopify · Next.js', '예약 · 주문', '상품 · 결제 연동'],
    },
  },
]

export default function PricingTeaser({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const l = isKo ? 'ko' : 'en'

  return (
    <section aria-label={isKo ? '가격' : 'Pricing'} className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-[12px] uppercase text-ash mb-3" style={{ letterSpacing: 'var(--ovl-track)' }}>
              {isKo ? '가격' : 'Pricing'}
            </p>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] leading-[1.05] tracking-[-0.02em] text-ink m-0">
              {isKo ? (
                <>
                  견적 없이도 <span className="italic font-light text-link">시작가가 보입니다.</span>
                </>
              ) : (
                <>
                  Transparent pricing, <span className="italic font-light text-link">no quote dance.</span>
                </>
              )}
            </h2>
          </div>
          <Link
            href={`${prefix}/pricing`}
            className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1 self-start md:self-end"
          >
            {isKo ? '전체 가격 보기' : 'See full pricing'} →
          </Link>
        </div>

        {/* 10-second estimator */}
        <InView>
          <Estimator isKo={isKo} prefix={prefix} />
        </InView>

        {/* Tiers */}
        <ul data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {tiers.map((t) => (
            <li key={t.id}>
              <div
                className={`relative rounded-2xl p-7 md:p-8 h-full border transition-colors duration-300 ${
                  t.popular
                    ? 'border-[#0071E3] bg-bone shadow-[0_24px_60px_-30px_rgba(0,113,227,0.45)]'
                    : 'border-ink/10 bg-bone hover:border-ink/25'
                }`}
              >
                {t.popular && (
                  <span
                    className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#0071E3] text-white text-[11px] font-semibold uppercase"
                    style={{ letterSpacing: 'var(--ovl-track)' }}
                  >
                    {isKo ? '가장 인기' : 'Most popular'}
                  </span>
                )}
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] uppercase text-ash" style={{ letterSpacing: 'var(--ovl-track)' }}>
                    {t.label[l]}
                  </span>
                  <span className="font-display text-[clamp(26px,2.8vw,36px)] leading-none tracking-[-0.02em] text-ink tabular-nums">
                    {t.price}
                  </span>
                </div>
                <p className="text-[13px] text-graphite mb-5">{t.forWho[l]}</p>
                <ul className="space-y-2 mb-6">
                  {t.bullets[l].map((b, j) => (
                    <li key={j} className="text-[14px] text-graphite flex items-start gap-2">
                      <span className="text-link mt-[2px]">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${prefix}/#contact`}
                  className={`group inline-flex items-center gap-2 text-[14px] ${
                    t.popular ? 'text-ink font-medium' : 'text-graphite hover:text-ink'
                  } border-b border-ink/25 hover:border-ink pb-1 transition-colors`}
                >
                  {isKo ? '문의하기' : 'Start a project'}{' '}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* B2B scope — no fixed tier, said plainly so the tiers don't read as the ceiling */}
        <p className="mt-4 md:mt-6 text-[14px] text-graphite">
          {isKo ? 'B2B 포털·시스템 연동은 범위에 따라 별도로 견적드려요. ' : 'B2B portals and system integrations are quoted per project. '}
          <Link
            href={isKo ? '/ko/aws-api-연동-대시보드-구축' : '/aws-api-integration-dashboards'}
            className="text-ink border-b border-ink/30 hover:border-ink pb-[1px] transition-colors"
          >
            {isKo ? '연동·대시보드 보기' : 'See integrations'}
          </Link>
        </p>

        {/* Monthly care plans — entry framing */}
        <InView>
          <div className="mt-4 md:mt-6 rounded-2xl border border-ink/10 bg-bone p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase text-ash mb-2" style={{ letterSpacing: 'var(--ovl-track)' }}>
                {isKo ? '월 관리 플랜' : 'Monthly care plans'}
              </p>
              <p className="text-[15px] text-ink m-0">
                <span className="font-display italic font-light text-link text-[clamp(20px,2vw,26px)] leading-none tracking-[-0.01em] mr-2 align-middle">
                  {isKo ? '월 $49부터' : 'From $49/mo'}
                </span>
                <span className="text-graphite">
                  {isKo
                    ? 'Basic $49 · Care $129 · Grow $199 (추천) · Scale $499'
                    : 'Basic $49 · Care $129 · Grow $199 (recommended) · Scale $499'}
                </span>
              </p>
              <p className="text-[13px] text-ash mt-2 mb-0">
                {isKo
                  ? '12개월 약정 시 웹사이트 제작 셋업비 면제 · 최종 견적은 무료 상담에서'
                  : '12-month commitment waives the build setup fee · final quote in a free consult'}
              </p>
            </div>
            <Link
              href={`${prefix}/contact`}
              className="btn-outline justify-center min-h-[44px] text-[14px] shrink-0 self-start md:self-center"
            >
              {isKo ? '무료 상담으로 시작' : 'Start with a free consult'}
            </Link>
          </div>
        </InView>
      </div>
    </section>
  )
}
