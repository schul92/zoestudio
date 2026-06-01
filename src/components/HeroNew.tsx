'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/ui/motion/Magnetic'

const copy = {
  en: {
    eyebrowLeft: 'Shopify Expert · Korean-American Studio',
    eyebrowRight: 'Est. 2019 · Fort Lee NJ',
    h1Line1: 'Korean brand.',
    h1Line2: 'American checkout.',
    sub: (
      <>
        Premium Shopify stores built <span className="text-coral">bilingual by default</span> — fast, considered, and made to convert.
      </>
    ),
    cta1: 'Start a project',
    cta2: 'Free Shopify audit',
    cards: {
      bilingual: { title: 'Bilingual UX', sub: 'KO / EN ready by default' },
      seo: { title: 'SEO Optimized', sub: 'Technical SEO built-in' },
      performance: { title: 'Performance', metric: '0.9s', sub: 'Load time' },
      checkout: { title: 'Secure Checkout', sub: 'Shop Pay · Apple Pay · Google Pay' },
      conversion: { title: 'Conversion', sub: 'Built to turn traffic into sales' },
    },
    flow: {
      step1: { title: 'Korean brand', sub: 'Brand story & trust' },
      step2: { title: 'Shopify build', sub: 'Speed · SEO · UX' },
      step3: { title: 'American checkout', sub: 'Payments & conversion' },
    },
    trust: [
      { metric: '60+', label: 'Sites launched since 2019', icon: '✦' },
      { metric: 'Sub-1.5s', label: 'Load target', icon: '⏱' },
      { metric: 'KO + EN', label: 'Native bilingual delivery', icon: '🌐' },
    ],
  },
  ko: {
    eyebrowLeft: 'Shopify Expert · 한인·미국인 스튜디오',
    eyebrowRight: '2019 설립 · 뉴저지 포트리',
    h1Line1: '한인 브랜드.',
    h1Line2: '미국식 체크아웃.',
    sub: (
      <>
        <span className="text-coral">기본 이중언어</span>로 만드는 프리미엄 Shopify 스토어 — 빠르고, 깔끔하고, 전환되도록.
      </>
    ),
    cta1: '프로젝트 의뢰',
    cta2: '무료 Shopify 감사',
    cards: {
      bilingual: { title: '이중언어 UX', sub: '한·영 기본 지원' },
      seo: { title: 'SEO 최적화', sub: '기술 SEO 내장' },
      performance: { title: '성능', metric: '0.9초', sub: '로딩 시간' },
      checkout: { title: '안전한 결제', sub: 'Shop Pay · Apple Pay · Google Pay' },
      conversion: { title: '전환', sub: '트래픽을 매출로' },
    },
    flow: {
      step1: { title: '한인 브랜드', sub: '브랜드 스토리 · 신뢰' },
      step2: { title: 'Shopify 구축', sub: '속도 · SEO · UX' },
      step3: { title: '미국식 체크아웃', sub: '결제 · 전환' },
    },
    trust: [
      { metric: '60+', label: '런칭 사이트 (2019년부터)', icon: '✦' },
      { metric: '1.5초 이하', label: '로딩 목표', icon: '⏱' },
      { metric: '한 + 영', label: '네이티브 이중언어', icon: '🌐' },
    ],
  },
} as const

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const t = (copy as any)[locale] || copy.en
  const prefix = locale === 'ko' ? '/ko' : ''

  // Cursor-parallax on the mockup + floating cards (desktop only)
  const stageRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    let raf = 0
    let tx = 0, ty = 0, x = 0, y = 0
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const tick = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      if (mockupRef.current) {
        mockupRef.current.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 2.5}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`
      }
      stage.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
        const depth = (i + 1) * 4
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }
    stage.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('mousemove', onMove)
    }
  }, [])

  // Quick paint veil
  const [veilVisible, setVeilVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVeilVisible(false), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="zl-hero relative overflow-hidden"
      style={{
        ['--zl-bg' as string]: '#FFF4E8',
        ['--zl-ink' as string]: '#3D1F0F',
        ['--zl-ink-soft' as string]: '#6B3D24',
        ['--zl-muted' as string]: '#A37C5F',
        ['--zl-coral' as string]: '#FF6B4A',
        ['--zl-peach' as string]: '#FFB394',
        ['--zl-sun' as string]: '#FFD45B',
        ['--zl-teal' as string]: '#74C7C7',
        ['--zl-gold' as string]: '#FF6B4A',
        ['--zl-rule' as string]: 'rgba(61, 31, 15, 0.12)',
        background: '#FFF4E8',
      }}
    >
      {/* Sun-mesh gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(50% 45% at 90% 10%, rgba(255, 212, 91, 0.38) 0%, rgba(255, 212, 91, 0) 60%),
            radial-gradient(45% 40% at 8% 85%, rgba(255, 107, 74, 0.16) 0%, rgba(255, 107, 74, 0) 65%),
            radial-gradient(40% 40% at 75% 95%, rgba(116, 199, 199, 0.16) 0%, rgba(116, 199, 199, 0) 70%)
          `,
        }}
      />

      {/* Loading veil */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${
          veilVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: '#FFF4E8' }}
      >
        <div className="flex items-center gap-3 font-display italic text-[22px]" style={{ color: 'var(--zl-ink)' }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--zl-coral)' }} />
          <span>Zoe <em className="not-italic font-normal">Lumos</em></span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-[5] px-5 md:px-10 lg:px-12 pt-28 md:pt-32 pb-12 md:pb-16 min-h-[100svh] flex flex-col">
        {/* Eyebrow row */}
        <div className="flex items-center justify-between px-1 pb-8 md:pb-12">
          <span
            className="inline-flex items-center text-[11px] uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--zl-muted)' }}
          >
            <span
              className="inline-block w-[5px] h-[5px] rounded-full mr-2.5 -translate-y-[1px]"
              style={{ background: 'var(--zl-coral)' }}
            />
            {t.eyebrowLeft}
          </span>
          <span
            className="hidden md:inline text-[11px] uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--zl-muted)' }}
          >
            {t.eyebrowRight}
          </span>
        </div>

        {/* Main split — text left, mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 flex-1 items-center">
          {/* Left — headline + sub + CTAs */}
          <div className="lg:col-span-6">
            <h1
              className="font-display tracking-[-0.02em] leading-[1.0] m-0"
              style={{
                color: 'var(--zl-ink)',
                fontSize: 'clamp(44px, 6.5vw, 96px)',
                fontWeight: 400,
              }}
            >
              <span className="block">{t.h1Line1}</span>
              <span className="block italic" style={{ color: 'var(--zl-coral)', fontWeight: 300 }}>
                {t.h1Line2}
              </span>
            </h1>

            <p
              className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[1.65]"
              style={{ color: 'var(--zl-ink-soft)' }}
            >
              {t.sub}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Magnetic strength={20} radius={120}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={locale === 'ko' ? '시작' : 'Begin'}
                  className="zl-btn-primary inline-flex items-center gap-3 px-7 py-[18px] rounded-full text-[15px] transition-all"
                  style={{
                    background: 'var(--zl-ink)',
                    color: '#FFF4E8',
                    boxShadow: '0 14px 40px -14px rgba(61,31,15,0.45)',
                  }}
                >
                  <span>{t.cta1}</span>
                  <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic strength={12} radius={110}>
                <Link
                  href={`${prefix}/services/shopify-cost-audit`}
                  data-cursor="view"
                  className="inline-flex items-center gap-2 px-1 py-2.5 text-[15px]"
                  style={{ color: 'var(--zl-ink)' }}
                >
                  <span className="pb-[3px]" style={{ borderBottom: '1px solid var(--zl-coral)' }}>
                    {t.cta2}
                  </span>
                  <span aria-hidden style={{ opacity: 0.7 }}>↗</span>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right — interactive product mockup stage */}
          <div
            ref={stageRef}
            className="lg:col-span-6 relative aspect-[4/5] max-w-[640px] w-full mx-auto"
          >
            {/* Mockup — real client site (TJ Flowers) wrapped in browser chrome */}
            <a
              ref={mockupRef}
              href="https://tjflowersandevents.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit TJ Flowers — Manhattan florist built by Zoe Lumos"
              className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform block"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(61,31,15,0.32),0_10px_25px_-10px_rgba(61,31,15,0.18)] bg-paper border border-black/[0.04]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06] bg-[#FAF5EE]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C940]" />
                  <span className="ml-4 flex-1 h-[18px] rounded-md bg-white/70 flex items-center px-3 text-[10px] text-graphite tracking-tight truncate">
                    tjflowersandevents.com
                  </span>
                  <span className="hidden md:flex gap-1.5 opacity-50">
                    <span className="w-3 h-px bg-graphite" />
                    <span className="w-3 h-px bg-graphite" />
                    <span className="w-3 h-px bg-graphite" />
                  </span>
                </div>
                {/* Site screenshot — fills remaining space */}
                <div className="relative w-full" style={{ height: 'calc(100% - 42px)' }}>
                  <Image
                    src="/hero/tj-flowers-mockup.jpeg"
                    alt="TJ Flowers — Manhattan luxury florist Shopify build by Zoe Lumos"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 640px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {/* Tiny "Live site" pill */}
              <span
                className="absolute -bottom-3 right-6 z-[20] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border text-[10px] uppercase tracking-[0.18em] shadow-[0_8px_20px_-6px_rgba(61,31,15,0.22)]"
                style={{ borderColor: 'var(--zl-rule)', color: 'var(--zl-coral)' }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--zl-coral)', animation: 'zl-pulse 1.6s ease-in-out infinite' }} />
                Live · TJ Flowers
              </span>
            </a>

            {/* Floating card — Bilingual UX (top-left) */}
            <FloatingCard
              className="absolute top-[18%] -left-2 md:left-[-8%] z-[10]"
              icon="🌐"
              title={t.cards.bilingual.title}
              sub={t.cards.bilingual.sub}
              badge={<span className="ml-2 inline-flex items-center justify-center text-[10px] font-medium px-2 py-1 rounded border" style={{ borderColor: 'var(--zl-rule)', color: 'var(--zl-coral)' }}>EN</span>}
              dataFloat
              delaySec={0}
            />

            {/* Floating card — Performance metric (top-right) */}
            <FloatingCard
              className="absolute top-[8%] -right-2 md:right-[-6%] z-[10]"
              icon="⏱"
              title={t.cards.performance.title}
              metric={t.cards.performance.metric}
              sub={t.cards.performance.sub}
              accent="var(--zl-teal)"
              dataFloat
              delaySec={0.6}
            />

            {/* Floating card — SEO (middle-left) */}
            <FloatingCard
              className="absolute top-[48%] -left-3 md:left-[-10%] z-[10]"
              icon="✦"
              title={t.cards.seo.title}
              sub={t.cards.seo.sub}
              accent="var(--zl-sun)"
              dataFloat
              delaySec={1.2}
            />

            {/* Floating card — Secure Checkout (right middle/bottom) */}
            <FloatingCard
              className="absolute top-[55%] -right-2 md:right-[-8%] z-[10]"
              icon="🔒"
              title={t.cards.checkout.title}
              sub={t.cards.checkout.sub}
              dataFloat
              delaySec={1.8}
            />

            {/* Floating card — Conversion (bottom-left) */}
            <FloatingCard
              className="absolute bottom-[8%] -left-2 md:left-[-6%] z-[10]"
              icon="↗"
              title={t.cards.conversion.title}
              sub={t.cards.conversion.sub}
              accent="var(--zl-coral)"
              dataFloat
              delaySec={2.4}
            />
          </div>
        </div>

        {/* 3-step connector flow */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-0">
            <FlowStep title={t.flow.step1.title} sub={t.flow.step1.sub} dotColor="var(--zl-coral)" />
            <FlowDivider />
            <FlowStep title={t.flow.step2.title} sub={t.flow.step2.sub} dotColor="var(--zl-ink)" centered />
            <FlowDivider />
            <FlowStep title={t.flow.step3.title} sub={t.flow.step3.sub} dotColor="var(--zl-teal)" alignRight />
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 md:mt-16 pt-8 border-t" style={{ borderColor: 'var(--zl-rule)' }}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-6 md:gap-x-16">
            {t.trust.map((p: any, i: number) => {
              const accents = ['var(--zl-coral)', 'var(--zl-ink)', 'var(--zl-teal)']
              return (
                <div key={i} className="flex items-center gap-4">
                  <span
                    className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full text-[16px]"
                    style={{ background: 'rgba(255, 212, 91, 0.25)', color: accents[i % accents.length] }}
                  >
                    {p.icon}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-display tracking-[-0.02em] leading-none"
                      style={{ color: accents[i % accents.length], fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500 }}
                    >
                      {p.metric}
                    </span>
                    <span
                      className="text-[11px] md:text-[12px] leading-[1.4] uppercase"
                      style={{ letterSpacing: '0.08em', color: 'var(--zl-muted)' }}
                    >
                      {p.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zl-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes zl-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  )
}

// ─── Floating annotation card ────────────────────────────────────
function FloatingCard({
  className = '',
  icon,
  title,
  sub,
  metric,
  badge,
  accent,
  dataFloat = false,
  delaySec = 0,
}: {
  className?: string
  icon: string
  title: string
  sub?: string
  metric?: string
  badge?: React.ReactNode
  accent?: string
  dataFloat?: boolean
  delaySec?: number
}) {
  return (
    <div
      {...(dataFloat ? { 'data-float': true } : {})}
      className={`${className} group hover:scale-[1.04] transition-all duration-500 will-change-transform`}
      style={{
        animation: 'zl-float 6s ease-in-out infinite',
        animationDelay: `${delaySec}s`,
      }}
    >
      <div
        className="bg-paper rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-[0_20px_50px_-20px_rgba(61,31,15,0.28)] border min-w-[148px] md:min-w-[180px]"
        style={{ borderColor: 'rgba(61,31,15,0.06)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[14px]"
            style={{
              background: accent ? `${accent}1A` : 'rgba(255, 212, 91, 0.2)',
              color: accent || 'var(--zl-coral)',
            }}
          >
            {icon}
          </span>
          <span className="font-display text-[14px] md:text-[15px] tracking-tight text-ink">
            {title}
          </span>
          {badge}
        </div>
        {metric && (
          <div
            className="font-display tracking-[-0.02em] leading-none mb-1"
            style={{ color: accent || 'var(--zl-ink)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 500 }}
          >
            {metric}
          </div>
        )}
        {sub && (
          <div className="text-[11px] md:text-[12px] text-graphite leading-[1.4]">{sub}</div>
        )}
      </div>
    </div>
  )
}

function FlowStep({
  title,
  sub,
  dotColor,
  centered = false,
  alignRight = false,
}: {
  title: string
  sub: string
  dotColor: string
  centered?: boolean
  alignRight?: boolean
}) {
  return (
    <div className={`flex flex-col gap-1.5 md:flex-none ${centered ? 'md:items-center md:text-center' : alignRight ? 'md:items-end md:text-right' : ''}`}>
      <div className="flex items-center gap-2.5">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: dotColor }} />
        <span className="font-display text-[15px] md:text-[16px] tracking-tight" style={{ color: 'var(--zl-ink)' }}>
          {title}
        </span>
      </div>
      <span className="text-[12px] md:text-[13px]" style={{ color: 'var(--zl-muted)' }}>
        {sub}
      </span>
    </div>
  )
}

function FlowDivider() {
  return (
    <div className="hidden md:block flex-1 mx-6 lg:mx-10 max-w-[120px]">
      <div className="h-px w-full" style={{ background: 'repeating-linear-gradient(to right, var(--zl-muted) 0 4px, transparent 4px 10px)' }} />
    </div>
  )
}
