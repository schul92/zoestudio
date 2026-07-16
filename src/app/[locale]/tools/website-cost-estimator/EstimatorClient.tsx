'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

type ProjectType = 'new' | 'redesign' | 'ecommerce' | 'landing'
type PageBand = 's' | 'm' | 'l' | 'xl'
type Feature = 'bilingual' | 'ecommerce' | 'booking' | 'kakaotalk' | 'cms' | 'seo' | 'custom'
type Timeline = 'standard' | 'rush'

const copy = {
  en: {
    eyebrow: 'Free cost estimator',
    headlineA: 'Know the price',
    headlineB: 'before you ask.',
    intro:
      "Most agencies hide pricing behind “request a quote.” We don't. Answer four quick questions and see a real, honest range in seconds — the same way we'd scope it on a call. No email required.",
    q1: 'What do you need?',
    q2: 'How many pages?',
    q3: 'Which features?',
    q3hint: 'Select all that apply',
    q4: 'Timeline',
    types: {
      new: { label: 'A new website', note: 'Built from scratch' },
      redesign: { label: 'A redesign', note: 'Rebuild an existing site' },
      ecommerce: { label: 'An online store', note: 'Shopify / e-commerce' },
      landing: { label: 'A landing page', note: 'One focused page' },
    },
    pages: {
      s: { label: '1–5 pages', note: 'Brochure / starter' },
      m: { label: '6–15 pages', note: 'Most small businesses' },
      l: { label: '16–30 pages', note: 'Content-rich' },
      xl: { label: '30+ pages', note: 'Large / catalog' },
    },
    feats: {
      bilingual: { label: 'Bilingual (KO / EN)', note: 'Two-language site + hreflang' },
      ecommerce: { label: 'E-commerce / Shopify', note: 'Cart, checkout, products' },
      booking: { label: 'Online booking', note: 'Appointments / reservations' },
      kakaotalk: { label: 'KakaoTalk integration', note: 'Channel + auto-replies' },
      cms: { label: 'Blog / CMS', note: 'Self-editable content' },
      seo: { label: 'SEO setup', note: 'Schema, sitemap, GBP' },
      custom: { label: 'Custom design', note: 'No template' },
    },
    times: {
      standard: { label: 'Standard', note: '3–6 weeks' },
      rush: { label: 'Rush', note: 'Expedited (+25%)' },
    },
    resultEyebrow: 'Your estimate',
    estimateNote: 'One-time build, USD · varies by project scope',
    recommended: 'Matching tier',
    tiers: { hobby: 'Hobby', plus: 'Plus', pro: 'Pro', custom: 'Enterprise / Custom' },
    monthlyBadge: 'Recommended',
    monthlyTitle: 'Monthly Care Package',
    monthlyPrice: 'From $200/mo',
    monthlyRange: '$200–500/mo depending on scope',
    monthlyIncludes: 'Website + hosting + maintenance + SEO',
    monthlyNote:
      'Skip the big upfront cost — we build, host, maintain, and grow your site for one monthly fee.',
    monthlyCta: 'Start with a free consult',
    ctaTitle: 'Want this quote in writing?',
    ctaBody:
      "Send us your selections and we'll come back with a fixed, itemized quote — and a free 30-minute call to pressure-test the scope. No obligation.",
    ctaBtn: 'Get my detailed quote',
    seePricing: 'See full pricing',
    disclaimer:
      'This is a ballpark range based on typical projects, not a binding quote. Final price depends on scope, content readiness, and integrations. We always confirm in writing first.',
    summaryLabel: 'Based on',
  },
  ko: {
    eyebrow: '무료 견적 계산기',
    headlineA: '묻기 전에',
    headlineB: '가격부터 확인하세요.',
    intro:
      '대부분의 에이전시는 “견적 문의” 뒤에 가격을 숨깁니다. 우리는 아닙니다. 네 가지 질문에 답하면 몇 초 만에 솔직한 실제 범위를 보여드립니다 — 통화로 견적 낼 때와 똑같이. 이메일 필요 없음.',
    q1: '무엇이 필요하세요?',
    q2: '페이지 수는?',
    q3: '어떤 기능이 필요하세요?',
    q3hint: '해당하는 항목 모두 선택',
    q4: '일정',
    types: {
      new: { label: '새 웹사이트', note: '처음부터 제작' },
      redesign: { label: '리디자인', note: '기존 사이트 재구축' },
      ecommerce: { label: '온라인 스토어', note: 'Shopify / 이커머스' },
      landing: { label: '랜딩 페이지', note: '집중형 한 페이지' },
    },
    pages: {
      s: { label: '1–5 페이지', note: '브로셔 / 스타터' },
      m: { label: '6–15 페이지', note: '대부분의 소상공인' },
      l: { label: '16–30 페이지', note: '콘텐츠 중심' },
      xl: { label: '30+ 페이지', note: '대형 / 카탈로그' },
    },
    feats: {
      bilingual: { label: '이중언어 (한/영)', note: '2개 언어 + hreflang' },
      ecommerce: { label: '이커머스 / Shopify', note: '장바구니, 결제, 상품' },
      booking: { label: '온라인 예약', note: '예약 / 부킹' },
      kakaotalk: { label: '카카오톡 연동', note: '채널 + 자동 응답' },
      cms: { label: '블로그 / CMS', note: '직접 수정 가능' },
      seo: { label: 'SEO 셋업', note: '스키마, 사이트맵, GBP' },
      custom: { label: '맞춤 디자인', note: '템플릿 없음' },
    },
    times: {
      standard: { label: '일반', note: '3–6주' },
      rush: { label: '급행', note: '단축 (+25%)' },
    },
    resultEyebrow: '예상 견적',
    estimateNote: '일회성 제작, USD · 프로젝트 범위에 따라 변동',
    recommended: '해당 패키지',
    tiers: { hobby: 'Hobby', plus: 'Plus', pro: 'Pro', custom: 'Enterprise / 맞춤' },
    monthlyBadge: '추천',
    monthlyTitle: '월 관리 패키지',
    monthlyPrice: '월 $200~',
    monthlyRange: '규모에 따라 월 $200–500',
    monthlyIncludes: '웹사이트 + 호스팅 + 유지보수 + SEO',
    monthlyNote:
      '큰 초기 비용 없이 시작하세요 — 제작·호스팅·유지보수·SEO를 하나의 월 요금으로.',
    monthlyCta: '무료 상담으로 시작',
    ctaTitle: '이 견적을 서면으로 받아보시겠어요?',
    ctaBody:
      '선택하신 내용을 보내주시면 고정·항목별 견적과 함께 범위를 점검하는 무료 30분 상담을 드립니다. 부담 없음.',
    ctaBtn: '상세 견적 받기',
    seePricing: '전체 가격 보기',
    disclaimer:
      '일반적인 프로젝트 기준 대략적인 범위이며 구속력 있는 견적이 아닙니다. 최종 가격은 범위, 콘텐츠 준비 상태, 연동에 따라 달라집니다. 항상 서면으로 먼저 확정합니다.',
    summaryLabel: '선택 기준',
  },
}

const BASE: Record<ProjectType, number> = { new: 600, redesign: 750, ecommerce: 1400, landing: 400 }
const PAGES: Record<PageBand, number> = { s: 0, m: 250, l: 700, xl: 1400 }
const FEAT: Record<Feature, number> = {
  bilingual: 200, ecommerce: 600, booking: 300, kakaotalk: 150, cms: 250, seo: 250, custom: 400,
}

const round50 = (n: number) => Math.round(n / 50) * 50

export default function EstimatorClient({ locale = 'en' }: { locale?: 'en' | 'ko' }) {
  const t = copy[locale]
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const [type, setType] = useState<ProjectType>('new')
  const [band, setBand] = useState<PageBand>('m')
  const [feats, setFeats] = useState<Set<Feature>>(new Set<Feature>(['bilingual', 'seo']))
  const [time, setTime] = useState<Timeline>('standard')

  const toggleFeat = (f: Feature) =>
    setFeats((prev) => {
      const next = new Set(prev)
      next.has(f) ? next.delete(f) : next.add(f)
      return next
    })

  const { low, high, tier } = useMemo(() => {
    let subtotal = BASE[type] + PAGES[band]
    feats.forEach((f) => {
      // store type already includes a storefront build; don't double-charge ecommerce feature
      if (f === 'ecommerce' && type === 'ecommerce') return
      subtotal += FEAT[f]
    })
    if (time === 'rush') subtotal *= 1.25
    const lo = round50(subtotal * 0.85)
    const hi = round50(subtotal * 1.15)
    const tierKey: keyof typeof t.tiers =
      hi <= 800 ? 'hobby' : hi <= 1600 ? 'plus' : hi <= 3200 ? 'pro' : 'custom'
    return { low: lo, high: hi, tier: t.tiers[tierKey] }
  }, [type, band, feats, time, t])

  const fmt = (n: number) => '$' + n.toLocaleString('en-US')

  const summary = [
    t.types[type].label,
    t.pages[band].label,
    ...Array.from(feats).map((f) => t.feats[f].label),
    t.times[time].label,
  ].join(' · ')

  const quoteHref = `${prefix}/contact`

  return (
    <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="hair-bottom pt-32 md:pt-48 pb-12 md:pb-16">
        <div className="container-edge">
          <nav className="flex items-center gap-2 overline text-ash mb-10 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">
              {isKo ? '홈' : 'Home'}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`${prefix}/tools`} className="hover:text-ink transition-colors">
              {isKo ? '도구' : 'Tools'}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{t.eyebrow}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <h1 className="lg:col-span-8 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] tracking-luxury text-ink">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{t.headlineA}</span>
              </InView>
              <InView as="span" className="mask-row" delay={140}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {t.headlineB}
                </span>
              </InView>
            </h1>
            <InView as="p" className="reveal lg:col-span-4 text-body-lg text-graphite leading-[1.7]">
              <span>{t.intro}</span>
            </InView>
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="section-pad hair-bottom bg-bone">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Questions */}
            <div className="lg:col-span-7 space-y-12">
              <Group num="01" title={t.q1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(t.types) as ProjectType[]).map((k) => (
                    <Choice key={k} active={type === k} onClick={() => setType(k)} label={t.types[k].label} note={t.types[k].note} />
                  ))}
                </div>
              </Group>

              <Group num="02" title={t.q2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(t.pages) as PageBand[]).map((k) => (
                    <Choice key={k} active={band === k} onClick={() => setBand(k)} label={t.pages[k].label} note={t.pages[k].note} />
                  ))}
                </div>
              </Group>

              <Group num="03" title={t.q3} hint={t.q3hint}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(t.feats) as Feature[]).map((k) => (
                    <Choice key={k} active={feats.has(k)} onClick={() => toggleFeat(k)} label={t.feats[k].label} note={t.feats[k].note} check />
                  ))}
                </div>
              </Group>

              <Group num="04" title={t.q4}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(t.times) as Timeline[]).map((k) => (
                    <Choice key={k} active={time === k} onClick={() => setTime(k)} label={t.times[k].label} note={t.times[k].note} />
                  ))}
                </div>
              </Group>
            </div>

            {/* Live result */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="border border-hairline bg-ivory p-8 md:p-10">
                  <p className="overline text-ash mb-6">{t.resultEyebrow}</p>
                  <div className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-[1] tracking-luxury text-ink tabular-nums">
                    {fmt(low)}
                    <span className="text-ash mx-2 font-light">–</span>
                    {fmt(high)}
                  </div>
                  <p className="mt-3 text-[12px] text-ash">{t.estimateNote}</p>

                  <div className="mt-8 pt-6 border-t border-hairline">
                    <p className="overline text-ash mb-2">{t.recommended}</p>
                    <p className="font-display text-2xl tracking-luxury text-ink">{tier}</p>
                  </div>

                  {/* Monthly care package — the recommended path */}
                  <div className="mt-8 border border-gold bg-gold/[0.06] p-6 relative">
                    <span className="absolute -top-3 left-5 bg-gold text-ivory text-[11px] tracking-[0.12em] uppercase px-3 py-1">
                      {t.monthlyBadge}
                    </span>
                    <p className="font-display text-xl tracking-luxury text-ink mt-1">{t.monthlyTitle}</p>
                    <p className="font-display text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] text-gold mt-2 tabular-nums">
                      {t.monthlyPrice}
                    </p>
                    <p className="text-[12px] text-ash mt-1">{t.monthlyRange}</p>
                    <p className="text-[13px] text-ink font-medium mt-4">{t.monthlyIncludes}</p>
                    <p className="text-[13px] text-graphite leading-relaxed mt-2">{t.monthlyNote}</p>
                    <Link
                      href={quoteHref}
                      data-cursor={isKo ? '상담' : 'Consult'}
                      className="btn-ink w-full justify-center mt-5"
                    >
                      {t.monthlyCta}
                      <span className="arrow">→</span>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-hairline">
                    <p className="overline text-ash mb-2">{t.summaryLabel}</p>
                    <p className="text-[13px] text-graphite leading-relaxed">{summary}</p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={quoteHref}
                      data-cursor={isKo ? '견적' : 'Quote'}
                      className="btn-ink w-full justify-center"
                    >
                      {t.ctaBtn}
                      <span className="arrow">→</span>
                    </Link>
                    <Link
                      href={`${prefix}/pricing`}
                      className="text-center text-[13px] text-ash hover:text-ink transition-colors underline underline-offset-4"
                    >
                      {t.seePricing}
                    </Link>
                  </div>
                </div>
                <p className="mt-4 text-[12px] text-ash leading-relaxed">
                  <span className="gold-dot mr-2 align-middle" />
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-edge">
          <div className="max-w-3xl">
            <InView as="h2" className="reveal font-display text-display-sm md:text-display-lg tracking-luxury text-ink mb-6">
              <span>{t.ctaTitle}</span>
            </InView>
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] mb-8">
              <span>{t.ctaBody}</span>
            </InView>
            <Magnetic strength={12}>
              <Link href={quoteHref} data-cursor={isKo ? '견적' : 'Quote'} className="btn-ink">
                {t.ctaBtn}
                <span className="arrow">→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  )
}

function Group({ num, title, hint, children }: { num: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <InView className="reveal">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="section-num not-italic text-ink font-normal">§ {num}</span>
        <span className="h-px w-10 bg-hairline" />
        <h2 className="font-display text-xl md:text-2xl tracking-luxury text-ink">{title}</h2>
        {hint && <span className="text-[12px] text-ash ml-1">{hint}</span>}
      </div>
      {children}
    </InView>
  )
}

function Choice({
  active, onClick, label, note, check = false,
}: {
  active: boolean; onClick: () => void; label: string; note: string; check?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group text-left p-4 border transition-all duration-300 ${
        active ? 'border-gold bg-gold/[0.04]' : 'border-hairline hover:border-ink/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[15px] font-medium ${active ? 'text-ink' : 'text-ink'}`}>{label}</p>
          <p className="text-[12px] text-ash mt-0.5">{note}</p>
        </div>
        <span
          className={`mt-0.5 shrink-0 w-4 h-4 border flex items-center justify-center transition-colors ${
            check ? '' : 'rounded-full'
          } ${active ? 'border-gold bg-gold text-ivory' : 'border-hairline'}`}
        >
          {active && <span className="text-[10px] leading-none">{check ? '✓' : ''}</span>}
        </span>
      </div>
    </button>
  )
}
