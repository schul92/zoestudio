'use client'

import Link from 'next/link'
import { useState } from 'react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

type Scores = {
  performance: number | null
  seo: number | null
  accessibility: number | null
  bestPractices: number | null
}
type Metrics = {
  lcp: number | null
  cls: number | null
  fcp: number | null
  tti: number | null
  tbt: number | null
  speedIndex: number | null
}
type AuditResult = {
  url: string
  fetchedAt: number
  scores: Scores
  metrics: Metrics
  displays: Record<keyof Metrics, string | null>
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const copy = {
  en: {
    eyebrow: 'Free website audit',
    headlineA: 'See where your site',
    headlineB: 'actually stands.',
    intro:
      "Enter your URL. We'll run Google's real Lighthouse audit — the same one Google uses to decide who ranks — and show you the four scores that matter. Takes about 30 seconds. No email required.",
    placeholder: 'https://your-business.com',
    run: 'Audit my site',
    running: 'Auditing…',
    error: 'Something went wrong. Double-check the URL and try again.',
    categories: {
      performance: 'Performance',
      seo: 'SEO',
      accessibility: 'Accessibility',
      bestPractices: 'Best Practices',
    },
    vitals: 'Core Web Vitals',
    vs: 'vs. zoelumos.com',
    tipsTitle: 'What to do next',
    tips: [
      'Performance < 80 — your site is slow enough to lose customers before the page loads. Usually solved by image optimization + caching.',
      'SEO < 90 — you are missing the table-stakes structured data + meta tags Google uses to decide who shows up.',
      'Accessibility < 90 — you are losing users with screen readers, keyboard-only navigation, or low-contrast vision. Also hurts SEO.',
      'Best Practices < 90 — security or console errors quietly eroding trust signals.',
    ],
    ctaTitle: 'Want us to fix it?',
    ctaBody:
      'Send us your score + a short note about what you want. We will come back with a 30-minute roadmap of what to fix first — no obligation.',
    ctaBtn: 'Start a conversation',
    ours: 'Zoe Lumos reference',
    yours: 'Your site',
    disclaimer:
      'Scores come from Google PageSpeed Insights (mobile strategy). Results reflect your live site and can change between audits.',
  },
  ko: {
    eyebrow: '무료 웹사이트 감사',
    headlineA: '지금 내 사이트가',
    headlineB: '어디에 서 있는지.',
    intro:
      'URL을 입력해 주세요. 구글 Lighthouse 감사 — 구글이 실제로 순위를 결정할 때 사용하는 그 기준 — 을 돌려, 중요한 네 가지 점수를 보여드립니다. 약 30초. 이메일 필요 없음.',
    placeholder: 'https://내-비즈니스.com',
    run: '내 사이트 감사하기',
    running: '감사 중…',
    error: '문제가 발생했습니다. URL을 다시 확인하고 시도해 주세요.',
    categories: {
      performance: '성능',
      seo: 'SEO',
      accessibility: '접근성',
      bestPractices: '모범 사례',
    },
    vitals: 'Core Web Vitals',
    vs: 'vs. zoelumos.com',
    tipsTitle: '다음 단계',
    tips: [
      '성능 < 80 — 고객이 페이지 로드를 기다리지 못하고 떠나는 수준. 보통 이미지 최적화 + 캐싱으로 해결됩니다.',
      'SEO < 90 — 구글이 순위를 결정할 때 쓰는 기본 구조화 데이터와 메타 태그가 빠져 있습니다.',
      '접근성 < 90 — 스크린 리더 · 키보드 네비게이션 · 저시력 사용자를 놓치고 있고, SEO에도 악영향.',
      '모범 사례 < 90 — 보안 이슈나 콘솔 에러가 조용히 신뢰 지표를 깎고 있습니다.',
    ],
    ctaTitle: '고쳐 드릴까요?',
    ctaBody:
      '점수와 하고 싶은 것을 간단히 보내 주세요. 30분 로드맵으로 가장 먼저 고쳐야 할 부분을 정리해 드립니다 — 상담 부담 없음.',
    ctaBtn: '상담 요청',
    ours: 'Zoe Lumos 기준',
    yours: '내 사이트',
    disclaimer:
      '점수는 Google PageSpeed Insights(모바일 전략)에서 가져옵니다. 실시간 결과이며 감사마다 달라질 수 있습니다.',
  },
}

// Our own reference baseline (updated periodically from real runs).
const OURS: { scores: Scores; displays: Record<keyof Metrics, string> } = {
  scores: { performance: 98, seo: 100, accessibility: 96, bestPractices: 100 },
  displays: {
    lcp: '1.4 s',
    cls: '0.00',
    fcp: '0.9 s',
    tti: '1.6 s',
    tbt: '20 ms',
    speedIndex: '1.3 s',
  },
}

export default function AuditClient({ locale = 'en' }: { locale?: 'en' | 'ko' }) {
  const t = copy[locale]
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [err, setErr] = useState('')
  const [result, setResult] = useState<AuditResult | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim() || status === 'loading') return
    setStatus('loading')
    setErr('')
    setResult(null)
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      if (!res.ok) throw new Error('audit failed')
      const data: AuditResult = await res.json()
      setResult(data)
      setStatus('success')
    } catch {
      setStatus('error')
      setErr(t.error)
    }
  }

  const cats: Array<{ key: keyof Scores; label: string }> = [
    { key: 'performance', label: t.categories.performance },
    { key: 'seo', label: t.categories.seo },
    { key: 'accessibility', label: t.categories.accessibility },
    { key: 'bestPractices', label: t.categories.bestPractices },
  ]

  return (
    <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="hair-bottom pt-32 md:pt-48 pb-16 md:pb-24">
        <div className="container-edge">
          <nav className="flex items-center gap-2 overline text-ash mb-10 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">
              {isKo ? '홈' : 'Home'}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{t.eyebrow}</span>
          </nav>

          <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
            <span className="section-num not-italic text-ink font-normal">§</span>
            <span className="h-px w-10 bg-hairline" />
            <span>{t.eyebrow}</span>
          </InView>

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

          {/* Audit input */}
          <form onSubmit={submit} className="mt-12 md:mt-16 max-w-3xl">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="relative flex-1 border-b-2 border-hairline focus-within:border-gold transition-colors duration-500">
                <label htmlFor="audit-url" className="sr-only">URL</label>
                <input
                  id="audit-url"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={t.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 text-[18px] md:text-[22px] text-ink placeholder:text-mute/70 placeholder:italic placeholder:font-light focus:outline-none"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                />
              </div>
              <Magnetic strength={12}>
                <button
                  type="submit"
                  data-cursor={isKo ? '감사' : 'Audit'}
                  disabled={status === 'loading'}
                  className="btn-ink min-w-[200px] justify-center disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-ivory/60 border-t-ivory rounded-full animate-spin" />
                      {t.running}
                    </>
                  ) : (
                    <>
                      {t.run}
                      <span className="arrow">→</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
            <p className="mt-4 text-[12px] text-ash leading-relaxed max-w-xl">
              <span className="gold-dot mr-2 align-middle" />
              {t.disclaimer}
            </p>
          </form>
        </div>
      </section>

      {/* RESULTS */}
      {status === 'success' && result && (
        <section className="section-pad hair-bottom bg-bone">
          <div className="container-edge">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-10">
              <div className="overline text-ash flex items-center gap-3">
                <span className="section-num not-italic text-ink font-normal">§ 01</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '감사 결과' : 'Audit results'}</span>
              </div>
              <p className="text-[13px] text-ash truncate max-w-full break-all">
                {result.url}
              </p>
            </div>

            {/* Category scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
              {cats.map(({ key, label }) => (
                <ScoreCard
                  key={key}
                  label={label}
                  yours={result.scores[key]}
                  ours={OURS.scores[key]}
                  yoursLabel={t.yours}
                  oursLabel={t.ours}
                />
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="pt-10 border-t border-hairline">
              <p className="overline text-ash mb-6">{t.vitals}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                <MetricRow label="LCP" tooltip="Largest Contentful Paint" yours={result.displays.lcp} ours={OURS.displays.lcp} />
                <MetricRow label="CLS" tooltip="Cumulative Layout Shift" yours={result.displays.cls} ours={OURS.displays.cls} />
                <MetricRow label="TBT" tooltip="Total Blocking Time" yours={result.displays.tbt} ours={OURS.displays.tbt} />
                <MetricRow label="FCP" tooltip="First Contentful Paint" yours={result.displays.fcp} ours={OURS.displays.fcp} />
                <MetricRow label="TTI" tooltip="Time to Interactive" yours={result.displays.tti} ours={OURS.displays.tti} />
                <MetricRow label="Speed Index" yours={result.displays.speedIndex} ours={OURS.displays.speedIndex} />
              </div>
            </div>

            {/* Tips */}
            <div className="mt-16 pt-10 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <p className="overline text-ash mb-6">{t.tipsTitle}</p>
                <h2 className="font-display text-display text-ink tracking-luxury leading-[1.05]">
                  <span className="block">{isKo ? '개선이' : 'Where to'}</span>
                  <span className="block italic font-light text-gold fraunces-soft">{isKo ? '필요한 지점.' : 'fix first.'}</span>
                </h2>
              </div>
              <ul className="md:col-span-8 space-y-5">
                {t.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="section-num text-sm mt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] md:text-body text-graphite leading-[1.7]">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {status === 'error' && (
        <section className="pb-20">
          <div className="container-edge">
            <p className="text-[14px] text-red-700 border-l-2 border-red-600 pl-4">{err}</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <h2 className="font-display text-display-lg text-ink tracking-luxury leading-[1.05]">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{t.ctaTitle}</span>
                </InView>
              </h2>
              <p className="mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                {t.ctaBody}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Magnetic strength={14}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={isKo ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {t.ctaBtn}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── Score card component ───────────────────────────── */

function ScoreCard({
  label,
  yours,
  ours,
  yoursLabel,
  oursLabel,
}: {
  label: string
  yours: number | null
  ours: number | null
  yoursLabel: string
  oursLabel: string
}) {
  const score = yours ?? 0
  const ringColor = score >= 90 ? '#2F7A3D' : score >= 50 ? '#B8914A' : '#C0432E'
  const size = 140
  const stroke = 6
  const radius = (size - stroke) / 2
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ

  return (
    <InView className="reveal flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(20,20,20,0.08)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.16,1,.3,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none text-ink">
            {yours ?? '—'}
          </span>
        </div>
      </div>
      <div className="mt-5 overline text-ink">{label}</div>
      <div className="mt-3 text-[11px] text-ash leading-relaxed">
        <span className="block">{yoursLabel}: {yours ?? '—'}</span>
        <span className="block mt-0.5">{oursLabel}: <span className="text-gold">{ours ?? '—'}</span></span>
      </div>
    </InView>
  )
}

function MetricRow({
  label,
  tooltip,
  yours,
  ours,
}: {
  label: string
  tooltip?: string
  yours: string | null
  ours: string | null
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-hairline">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-lg text-ink italic font-light">{label}</span>
        {tooltip && <span className="text-[10px] uppercase tracking-[0.14em] text-ash">{tooltip}</span>}
      </div>
      <div className="text-right">
        <span className="block font-display text-base text-ink">{yours ?? '—'}</span>
        <span className="block text-[11px] text-gold">{ours ?? '—'}</span>
      </div>
    </div>
  )
}
