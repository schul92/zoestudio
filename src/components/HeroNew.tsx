'use client'

/**
 * Hero section — rebuilt from the Claude Design handoff (Hero.html).
 * Scope: hero section only. Preserves existing site header + sections
 * that follow. Uses the warm ivory palette (#f2ece2) and the extruded
 * 3D "조이" Hangul wordmark as the centerpiece.
 */

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import Magnetic from '@/components/ui/motion/Magnetic'

// 3D wordmark — lazy-loaded client-only so SSR + LCP stay clean
const HangulWordmark = dynamic(() => import('@/components/ui/motion/HangulWordmark'), {
  ssr: false,
  loading: () => null,
})

const copy = {
  en: {
    eyebrowLeft: 'Zoe Lumos — Est. New Jersey',
    eyebrowRight: 'Korean-American design studio',
    subEn: (
      <>
        A Korean-American studio building <span>considered, quiet,</span> high-performance
        websites for the brands that care about every detail.
      </>
    ),
    cta1: 'Start a project',
    cta2: 'Selected work',
    scroll: 'Scroll',
  },
  ko: {
    eyebrowLeft: 'Zoe Lumos — 2019, 뉴저지',
    eyebrowRight: '한인·미국인 디자인 스튜디오',
    subEn: (
      <>
        포트리에서 LA까지 — <span>조용하지만 단단한,</span> 매 디테일이 고려된 한인 ·
        미국인 디자인 스튜디오.
      </>
    ),
    cta1: '프로젝트 의뢰',
    cta2: '작업 둘러보기',
    scroll: '아래로',
  },
}

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const t = copy[locale as 'en' | 'ko'] || copy.en
  const prefix = locale === 'ko' ? '/ko' : ''

  // Subtle parallax — replicates the design's scroll offset on wordmark/subcopy
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const subcopyRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (wordmarkRef.current)
          wordmarkRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`
        if (subcopyRef.current)
          subcopyRef.current.style.transform = `translate3d(0, ${y * -0.14}px, 0)`
        if (eyebrowRef.current)
          eyebrowRef.current.style.transform = `translate3d(0, ${y * -0.25}px, 0)`
        if (ctasRef.current)
          ctasRef.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Loading veil that dismisses once the 3D scene mounts
  const [veilVisible, setVeilVisible] = useState(true)
  useEffect(() => {
    const dismiss = () => setVeilVisible(false)
    // Dismiss on first paint after a beat, or if wordmark never loads
    const fallback = setTimeout(dismiss, 1800)
    const onReady = () => {
      clearTimeout(fallback)
      setTimeout(dismiss, 320)
    }
    // Any canvas mounting inside the hero signals readiness
    const observer = new MutationObserver(() => {
      if (document.querySelector('.hero-wordmark-stage canvas')) onReady()
    })
    const target = document.querySelector('.hero-wordmark-stage')
    if (target) observer.observe(target, { childList: true, subtree: true })
    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      className="zl-hero relative overflow-hidden"
      style={{
        // Scoped design tokens — apply only inside .zl-hero
        ['--zl-bg' as string]: '#f2ece2',
        ['--zl-ink' as string]: '#151414',
        ['--zl-ink-soft' as string]: '#3a3836',
        ['--zl-muted' as string]: '#8a8378',
        ['--zl-gold' as string]: '#b48a43',
        ['--zl-rule' as string]: 'rgba(21, 20, 20, 0.12)',
        background: '#f2ece2',
      }}
    >
      {/* Grain overlay — fixed over the hero only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          opacity: 0.28,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08  0 0 0 0 0.08  0 0 0 0 0.08  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Loading veil */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[200] flex items-center justify-center transition-all duration-700 ${
          veilVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: '#f2ece2' }}
      >
        <div className="flex items-center gap-3.5 font-display italic text-[22px] text-[color:var(--zl-ink,#151414)]">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: '#b48a43',
              animation: 'zl-pulse 1.4s cubic-bezier(0.2,0.8,0.2,1) infinite',
            }}
          />
          <span>
            Zoe <em className="not-italic font-normal">Lumos</em>
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-[5] px-5 md:px-12 pt-20 md:pt-28 pb-16 md:pb-20 min-h-[100svh] flex flex-col">
        {/* Eyebrow row */}
        <div
          ref={eyebrowRef}
          className="flex items-center justify-between px-1 pb-6 md:pb-12"
        >
          <span
            className="inline-flex items-center text-[11px] uppercase"
            style={{
              letterSpacing: '0.22em',
              color: 'var(--zl-muted)',
            }}
          >
            <span
              className="inline-block w-[5px] h-[5px] rounded-full mr-2.5 -translate-y-[2px]"
              style={{ background: 'var(--zl-gold)' }}
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

        {/* 3D wordmark stage */}
        <div
          ref={wordmarkRef}
          className="relative mx-auto w-full flex-1"
          style={{
            maxWidth: 1400,
            height: 'clamp(300px, 58vh, 720px)',
          }}
        >
          <div className="hero-wordmark-stage absolute inset-0 pointer-events-auto">
            <HangulWordmark />
          </div>
        </div>

        {/* Subcopy — single editorial paragraph, right-aligned on desktop */}
        <div
          ref={subcopyRef}
          className="flex justify-start md:justify-end px-1 pt-6 pb-3 mx-auto w-full"
          style={{ maxWidth: 1400 }}
        >
          <p
            className="md:text-right m-0 max-w-[520px] text-[15px] leading-[1.55]"
            style={{ color: 'var(--zl-ink-soft)' }}
          >
            {t.subEn}
          </p>
        </div>

        {/* CTAs right-aligned */}
        <div
          ref={ctasRef}
          className="flex flex-wrap justify-start md:justify-end items-center gap-x-5 gap-y-4 md:gap-6 pt-6 md:pt-10 px-1 mx-auto w-full"
          style={{ maxWidth: 1400 }}
        >
          <Magnetic strength={20} radius={120}>
            <Link
              href={`${prefix}/#contact`}
              data-cursor={locale === 'ko' ? '시작' : 'Begin'}
              className="zl-btn-primary inline-flex items-center gap-3 px-7 py-[18px] rounded-full text-[15px] transition-all"
              style={{
                background: 'var(--zl-ink)',
                color: 'var(--zl-bg)',
                boxShadow:
                  '0 14px 40px -14px rgba(21,20,20,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              <span>{t.cta1}</span>
              <span aria-hidden className="zl-arrow transition-transform duration-500">
                →
              </span>
            </Link>
          </Magnetic>
          <Magnetic strength={12} radius={110}>
            <Link
              href={`${prefix}/portfolio`}
              data-cursor="view"
              className="inline-flex items-center gap-2.5 px-1 py-2.5 text-[15px]"
              style={{ color: 'var(--zl-ink)' }}
            >
              <span
                className="pb-[3px]"
                style={{ borderBottom: '1px solid currentColor' }}
              >
                {t.cta2}
              </span>
              <span
                aria-hidden
                className="text-[14px]"
                style={{ opacity: 0.7 }}
              >
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Scroll pill */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2.5 text-[10px] uppercase"
          style={{
            letterSpacing: '0.24em',
            color: 'var(--zl-muted)',
            opacity: 0.85,
          }}
        >
          <span
            className="block w-7 h-px"
            style={{
              background: 'currentColor',
              animation: 'zl-pull 2.4s cubic-bezier(0.2,0.8,0.2,1) infinite',
            }}
          />
          <span>{t.scroll}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes zl-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.4;
          }
        }
        @keyframes zl-pull {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(6px);
            opacity: 1;
          }
        }
        .zl-btn-primary:hover {
          box-shadow: 0 24px 60px -18px rgba(21, 20, 20, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .zl-btn-primary:hover .zl-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  )
}
