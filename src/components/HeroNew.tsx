'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import MaskReveal from '@/components/ui/motion/MaskReveal'
import Magnetic from '@/components/ui/motion/Magnetic'
import CountUp from '@/components/ui/motion/CountUp'

const copy = {
  en: {
    eyebrow: 'Zoe Lumos · Est. New Jersey',
    studio: 'An American-Korean design studio',
    line1: ['Websites'],
    line2: ['worth'],
    line3: ['remembering.'],
    sub: 'We craft considered, quiet, high-performance websites for Korean-American businesses — from Fort Lee boutiques to Los Angeles studios.',
    cta1: 'Start a project',
    cta2: 'Selected work',
    marquee: [
      'Web Design',
      'Brand Systems',
      'SEO & GEO',
      'Shopify Commerce',
      'Bilingual Content',
      'Google Ads',
      'Editorial Direction',
    ],
    stats: [
      { num: '150', suf: '+', label: 'Projects delivered' },
      { num: '9', suf: '', label: 'US cities served' },
      { num: '100', suf: '%', label: 'Customer satisfaction' },
      { num: '24/7', suf: '', label: 'Korean support' },
    ],
  },
  ko: {
    eyebrow: 'ZOE LUMOS · 뉴저지 · 2019',
    studio: '한인 · 미국인 디자인 스튜디오',
    line1: ['오래도록'],
    line2: ['기억되는'],
    line3: ['웹사이트.'],
    sub: '포트리의 작은 부티크부터 LA의 스튜디오까지 — 한인 비즈니스를 위해 고요하고 단단한 웹사이트를 만듭니다.',
    cta1: '프로젝트 의뢰',
    cta2: '작업 둘러보기',
    marquee: [
      '웹디자인',
      '브랜드 시스템',
      'SEO · GEO',
      'Shopify 커머스',
      '이중언어 콘텐츠',
      '구글 광고',
      '에디토리얼 디렉션',
    ],
    stats: [
      { num: '150', suf: '+', label: '완료 프로젝트' },
      { num: '9', suf: '', label: '서비스 도시' },
      { num: '100', suf: '%', label: '고객 만족도' },
      { num: '24/7', suf: '', label: '한국어 지원' },
    ],
  },
}

export default function HeroNew({ locale = 'en' }: { locale?: string }) {
  const t = copy[locale as 'en' | 'ko'] || copy.en
  const prefix = locale === 'ko' ? '/ko' : ''
  const [mount, setMount] = useState(false)
  const parRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMount(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Subtle parallax on hero display
  useEffect(() => {
    const el = parRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        el.style.transform = `translate3d(0, ${Math.min(y * 0.08, 80)}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="relative bg-ivory overflow-hidden">
      <div className="hair-bottom" />

      {/* Top meta bar */}
      <div className="container-edge">
        <div
          className={`flex items-center justify-between pt-28 md:pt-36 lg:pt-40 pb-8 transition-all duration-1000 ${
            mount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 overline text-ash">
            <span className="gold-dot" />
            <span>{t.eyebrow}</span>
          </div>
          <span className="hidden md:inline-block overline text-ash">
            {t.studio}
          </span>
        </div>
      </div>

      {/* Display headline */}
      <div ref={parRef} className="container-edge pb-10 md:pb-16">
        <h1 className="font-display text-hero text-ink tracking-luxury">
          <MaskReveal delay={120} as="span" className="font-normal">
            {t.line1[0]}
          </MaskReveal>
          <MaskReveal delay={260} as="span" className="italic font-light text-gold fraunces-soft group">
            {t.line2[0]}
          </MaskReveal>
          <MaskReveal delay={400} as="span" className="font-normal">
            {t.line3[0]}
          </MaskReveal>
        </h1>
      </div>

      {/* Asymmetric row: sub + CTAs */}
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-20 md:pb-28">
          <div className="md:col-start-7 md:col-span-6">
            <p
              className={`text-body-lg text-graphite leading-[1.65] max-w-xl transition-all duration-1000 ${
                mount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {t.sub}
            </p>

            <div
              className={`mt-10 flex flex-wrap items-center gap-6 transition-all duration-1000 ${
                mount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '950ms' }}
            >
              <Magnetic strength={16} radius={130}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={locale === 'ko' ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {t.cta1}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <Link
                href={`${prefix}/portfolio`}
                data-cursor="view"
                className="btn-ghost"
              >
                {t.cta2}
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Discipline marquee */}
      <div
        className={`hair-y py-8 marq-wrap transition-opacity duration-1000 ${mount ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1100ms' }}
        data-cursor="drag"
      >
        <div className="overflow-hidden">
          <div className="marq font-display text-graphite/70">
            {[...t.marquee, ...t.marquee, ...t.marquee].map((word, i) => (
              <span key={i} className="flex items-center gap-14 text-[clamp(1.5rem,3vw,2.5rem)]">
                <span className="italic font-light fraunces-soft">{word}</span>
                <span className="gold-dot shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container-edge">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline">
          {t.stats.map((s, i) => (
            <div
              key={i}
              className={`py-10 md:py-14 px-4 md:px-8 first:pl-0 last:pr-0 transition-all duration-1000 ${
                mount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${1250 + i * 90}ms` }}
            >
              <div className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-ink">
                <CountUp value={s.num} duration={1600} />
                <span className="italic font-light text-gold">{s.suf}</span>
              </div>
              <div className="mt-3 overline text-ash">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
