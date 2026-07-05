'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/ui/motion/Magnetic'

const copy = {
  en: {
    eyebrow: 'Korean-American Studio · Shopify Expert',
    h1Lead: 'Bilingual websites,',
    h1Accent: 'built to convert.',
    sub: (
      <>
        Premium Shopify stores for <span className="text-coral">Korean-American brands</span> — bilingual by default, fast by design, built to convert. TJ Flowers: $3,114 revenue in 4 weeks post-rebuild.
      </>
    ),
    cta1: 'Start your project',
    cta2: 'See TJ Flowers case study',
    livePill: 'Last shipped',
    liveTag: 'Live',
    proofBadge: {
      metric: '$3,114',
      label: 'revenue in 4 weeks',
      sub: 'TJ Flowers · Shopify rebuild',
    },
    logosLabel: 'Trusted by founders shipping bilingual',
  },
  ko: {
    eyebrow: '한인 비즈니스 스튜디오 · Shopify 전문',
    h1Lead: '한인 비즈니스 웹사이트,',
    h1Accent: '매출로 이어집니다.',
    sub: (
      <>
        <span className="text-coral">한·영 이중언어</span> 기본, 빠른 속도, Shopify·커스텀 빌드 — 진짜 매출로 이어집니다. TJ Flowers: 리뉴얼 4주 만에 $3,114 매출.
      </>
    ),
    cta1: '프로젝트 시작하기',
    cta2: 'TJ Flowers 성공 사례 보기',
    livePill: '최근 런칭',
    liveTag: '운영 중',
    proofBadge: {
      metric: '$3,114',
      label: '4주 만에 실매출',
      sub: 'TJ Flowers · Shopify 리뉴얼',
    },
    logosLabel: '한국어·영어로 함께 런칭한 브랜드',
  },
} as const

// SSR-safe pinned value (avoids hydration mismatch); client updates via useEffect
const LAST_SHIP_MS = new Date('2026-05-13T00:00:00Z').getTime()
const SSR_DAYS = Math.max(1, Math.floor((new Date('2026-06-01T00:00:00Z').getTime() - LAST_SHIP_MS) / 86_400_000))

const CLIENT_LOGOS: { name: string; url?: string }[] = [
  { name: 'TJ Flowers', url: 'https://tjflowersandevents.com/' },
  { name: 'Salt & Polish', url: 'https://saltpolish.com/' },
  { name: 'Miguk Story', url: 'https://migukstory.com/' },
  { name: 'Kona Coffee', url: 'https://konacoffeedonut.com/' },
  { name: 'CareK9', url: 'https://carek9.com/' },
  { name: 'Mochinut', url: 'https://www.mochinutnynj.com/' },
  { name: "Vito's Pizza", url: 'https://www.vitospizzaandristorante.com/' },
]

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const t = (copy as any)[locale] || copy.en
  const prefix = locale === 'ko' ? '/ko' : ''
  const [days, setDays] = useState(SSR_DAYS)

  // Subtle cursor parallax on the mockup (desktop only)
  const stageRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    // Update to actual elapsed days on the client after hydration
    setDays(Math.max(1, Math.floor((Date.now() - LAST_SHIP_MS) / 86_400_000)))
  }, [])

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
        mockupRef.current.style.transform = `perspective(1400px) rotateY(${x * 2}deg) rotateX(${-y * 1.5}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    stage.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('mousemove', onMove)
    }
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
        ['--zl-rule' as string]: 'rgba(61, 31, 15, 0.10)',
        background: '#FFF4E8',
      }}
    >
      {/* Soft sun-mesh backdrop — single source of warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(45% 40% at 88% 8%, rgba(255, 212, 91, 0.32) 0%, rgba(255, 212, 91, 0) 60%),
            radial-gradient(40% 36% at 6% 92%, rgba(255, 107, 74, 0.14) 0%, rgba(255, 107, 74, 0) 65%)
          `,
        }}
      />

      {/* Loading veil — pure CSS fade so it never waits on JS hydration (LCP-safe) */}
      <div
        aria-hidden
        className="zl-veil pointer-events-none fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: '#FFF4E8' }}
      >
        <div className="flex items-center gap-3 font-display italic text-[22px]" style={{ color: 'var(--zl-ink)' }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--zl-coral)' }} />
          <span>Zoe <em className="not-italic font-normal">Lumos</em></span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-[5] px-5 md:px-10 lg:px-12 pt-28 md:pt-32 pb-10 md:pb-16 min-h-[100svh] flex flex-col">
        {/* Single eyebrow + live pill */}
        <div className="flex items-center justify-between gap-4 pb-8 md:pb-12">
          <span
            className="inline-flex items-center text-[11px] uppercase"
            style={{ letterSpacing: '0.22em', color: 'var(--zl-muted)' }}
          >
            <span className="inline-block w-[5px] h-[5px] rounded-full mr-2.5 -translate-y-[1px]" style={{ background: 'var(--zl-coral)' }} />
            {t.eyebrow}
          </span>
          <span
            className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase px-3 py-1.5 rounded-full border bg-paper/60 backdrop-blur-sm"
            style={{ letterSpacing: '0.18em', color: 'var(--zl-ink-soft)', borderColor: 'var(--zl-rule)' }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#28C940', animation: 'zl-pulse-soft 2s ease-in-out infinite' }} />
            {t.livePill} {days}d
          </span>
        </div>

        {/* Main split — typography left, single clean mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 flex-1 items-center">
          {/* Left — headline + sub + single primary CTA + secondary text link */}
          <div className="lg:col-span-6">
            <h1
              className="font-display tracking-[-0.02em] leading-[1.0] m-0"
              style={{
                color: 'var(--zl-ink)',
                fontSize: 'clamp(40px, 6.5vw, 96px)',
                fontWeight: 400,
              }}
            >
              <span className="block">{t.h1Lead}</span>
              {/* Oversized type moment — EN only: Hangul falls back to a wider
                  system face and already sits at the column's overflow boundary
                  at 6.5vw, so Korean keeps the inherited h1 size. */}
              <span
                className="block italic"
                style={{
                  color: 'var(--zl-coral)',
                  fontWeight: 300,
                  ...(locale === 'ko' ? {} : { fontSize: 'clamp(40px, 8.25vw, 124px)' }),
                }}
              >
                {t.h1Accent}
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl text-[16px] md:text-[17px] leading-[1.65]"
              style={{ color: 'var(--zl-ink-soft)' }}
            >
              {t.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic strength={22} radius={130}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={locale === 'ko' ? '시작' : 'Begin'}
                  className="zl-btn-primary inline-flex items-center gap-3 px-7 py-[18px] rounded-full text-[15px] transition-all hover:opacity-95"
                  style={{
                    background: 'var(--zl-ink)',
                    color: '#FFF4E8',
                    boxShadow: '0 16px 40px -14px rgba(61,31,15,0.45)',
                  }}
                >
                  <span>{t.cta1}</span>
                  <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Link
                href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`}
                data-cursor="view"
                className="inline-flex items-center gap-2 text-[14px] md:text-[15px]"
                style={{ color: 'var(--zl-ink-soft)' }}
              >
                <span className="pb-[3px]" style={{ borderBottom: '1px solid var(--zl-coral)' }}>
                  {t.cta2}
                </span>
                <span aria-hidden style={{ opacity: 0.7 }}>↗</span>
              </Link>
            </div>
          </div>

          {/* Right — single clean TJ Flowers mockup with ONE proof badge */}
          <div
            ref={stageRef}
            className="lg:col-span-6 relative w-full max-w-[620px] mx-auto aspect-[4/5]"
          >
            <a
              ref={mockupRef}
              href="https://www.tjflowersandevents.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit TJ Flowers — Manhattan florist built by Zoe Lumos"
              className="absolute inset-0 block transition-transform duration-300 ease-out will-change-transform lg:[transform:rotate(-1.5deg)]"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(61,31,15,0.32),0_10px_25px_-10px_rgba(61,31,15,0.18)] bg-paper border border-black/[0.04]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06] bg-[#FAF5EE]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C940]" />
                  <span
                    className="ml-3 flex-1 h-[20px] rounded-full bg-paper border flex items-center gap-1.5 px-3 text-[10px] text-graphite tracking-tight truncate"
                    style={{ borderColor: 'var(--zl-rule)' }}
                  >
                    {/* Padlock — https */}
                    <svg aria-hidden width="8" height="9" viewBox="0 0 8 9" fill="none" className="shrink-0" style={{ opacity: 0.55 }}>
                      <rect x="0.5" y="3.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                      <path d="M2 3.5V2.5a2 2 0 1 1 4 0v1" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    tjflowersandevents.com
                  </span>
                </div>
                {/* Site screenshot — slow compositor-only scale drift (CSS keyframe, no JS) */}
                <div className="zl-shot relative w-full" style={{ height: 'calc(100% - 46px)' }}>
                  <Image
                    src="/hero/tj-flowers-mockup.jpeg"
                    alt="TJ Flowers — Manhattan luxury florist Shopify build by Zoe Lumos"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* ONE proof badge — the 5× metric, prominent on top of the mockup */}
              <div
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 z-[10] bg-paper rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-[0_20px_50px_-15px_rgba(61,31,15,0.32)] border"
                style={{ borderColor: 'var(--zl-rule)' }}
              >
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="font-display tracking-[-0.02em] leading-none"
                    style={{
                      color: 'var(--zl-coral)',
                      fontSize: 'clamp(36px, 4.5vw, 56px)',
                      fontWeight: 500,
                    }}
                  >
                    {t.proofBadge.metric}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-[13px] md:text-[14px] tracking-tight text-ink leading-none">
                      {t.proofBadge.label}
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase mt-1" style={{ letterSpacing: '0.12em', color: 'var(--zl-muted)' }}>
                      {t.proofBadge.sub}
                    </span>
                  </div>
                </div>
              </div>

              {/* LIVE pill — real, operating client site */}
              <span
                className="absolute -bottom-3 right-6 z-[10] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border text-[10px] uppercase tracking-[0.18em] shadow-[0_8px_20px_-6px_rgba(61,31,15,0.22)]"
                style={{ borderColor: 'var(--zl-rule)', color: 'var(--zl-coral)' }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--zl-coral)', animation: 'zl-pulse-soft 2.4s ease-in-out infinite' }} />
                {t.liveTag}
              </span>
            </a>
          </div>
        </div>

        {/* Client logo marquee — infinite horizontal scroll */}
        <div className="mt-14 md:mt-20 pt-8 border-t" style={{ borderColor: 'var(--zl-rule)' }}>
          <p
            className="text-[11px] uppercase text-center mb-5"
            style={{ letterSpacing: '0.22em', color: 'var(--zl-muted)' }}
          >
            {t.logosLabel}
          </p>
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 12%, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 12%, black 88%, transparent 100%)' }}>
            <div className="flex gap-x-12 md:gap-x-16 whitespace-nowrap" style={{ animation: 'zl-marquee 32s linear infinite' }}>
              {/* Render twice for seamless loop */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                <a
                  key={`${logo.name}-${i}`}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-display tracking-tight text-[20px] md:text-[26px] hover:text-coral transition-colors duration-300"
                  style={{ color: 'var(--zl-ink-soft)' }}
                >
                  <span className="italic font-light mr-3 opacity-50">·</span>
                  {logo.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zl-pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes zl-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        /* Signature motion — the screenshot breathes: slow scale drift, compositor-only */
        @keyframes zl-drift {
          from { transform: scale(1); }
          to { transform: scale(1.04); }
        }
        .zl-shot :global(img) {
          animation: zl-drift 14s ease-in-out infinite alternate;
          transform-origin: 50% 25%;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .zl-shot :global(img) {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
