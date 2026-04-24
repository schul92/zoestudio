'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import InView from '@/components/ui/motion/InView'

/**
 * 3D parallax device showcase — real client screenshots rendered
 * in tilted browser frames that drift on scroll and react to cursor tilt.
 * No Three.js. Pure CSS 3D transforms. Fast, mobile-safe.
 */

type Device = {
  name: string
  src: string
  href: string
  industry: { en: string; ko: string }
  aspect: string // e.g. '16/10'
  accent: string // halo color
}

const devices: Device[] = [
  {
    name: 'TJ Flowers',
    src: '/portfolio/tj-flowers.jpg',
    href: '/portfolio',
    industry: { en: 'Manhattan · Floral studio', ko: '맨하탄 · 플라워 스튜디오' },
    aspect: '16/10',
    accent: '#E4D8C4',
  },
  {
    name: 'Salt & Polish',
    src: '/portfolio/salt-polish.jpg',
    href: '/portfolio',
    industry: { en: 'Fort Lee · Wellness studio', ko: '포트리 · 웰니스 스튜디오' },
    aspect: '4/5',
    accent: '#F0DCC4',
  },
  {
    name: 'Kona Coffee Donut',
    src: '/portfolio/kona-coffee.jpg',
    href: '/portfolio',
    industry: { en: 'Honolulu · Café', ko: '호놀룰루 · 카페' },
    aspect: '16/10',
    accent: '#E8D5A3',
  },
]

export default function FloatingDevices({ locale = 'en' }: { locale?: 'en' | 'ko' }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const sectionRef = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 }) // -1..1
  const [scrollProgress, setScrollProgress] = useState(0) // 0..1

  // Track mouse across the section (desktop only)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect()
      targetX = ((e.clientX - r.left) / r.width) * 2 - 1
      targetY = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    const tick = () => {
      setMouse((m) => ({
        x: m.x + (targetX - m.x) * 0.07,
        y: m.y + (targetY - m.y) * 0.07,
      }))
      raf = requestAnimationFrame(tick)
    }
    section.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('pointermove', onMove)
    }
  }, [])

  // Scroll-driven parallax
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect()
        const vh = window.innerHeight
        // progress: 0 when section just enters view from bottom, 1 when it leaves the top
        const p = 1 - (r.top + r.height) / (vh + r.height)
        setScrollProgress(Math.max(0, Math.min(1, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-ivory hair-bottom section-pad overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      <div className="container-edge">
        {/* Head */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '움직이는 작업' : 'Work in motion'}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{isKo ? '화면 위에서' : 'Live on the'}</span>
              </InView>
              <InView as="span" className="mask-row" delay={140}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '살아있는 작업.' : 'open web.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '최근 런칭된 사이트들 — 에디토리얼 디렉션, 이중언어 카피, 실제 비즈니스 결과. 마우스와 함께 기울어집니다.'
                  : 'Recent launches — editorial direction, bilingual copy, real business outcomes. Tilts with your cursor, drifts as you scroll.'}
              </span>
            </InView>
          </div>
        </div>

        {/* 3D device stage */}
        <div
          className="relative mx-auto max-w-[1200px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left device — TJ Flowers */}
          <DeviceCard
            device={devices[0]}
            locale={locale}
            anchor="left"
            baseTransform={{
              x: -8,
              y: -4,
              rotateX: 4 - mouse.y * 3,
              rotateY: -10 + mouse.x * 4,
              z: 0,
            }}
            scrollShift={scrollProgress * -40}
            aspectClass="aspect-[16/10]"
            index={0}
          />

          {/* Center device — Salt & Polish */}
          <DeviceCard
            device={devices[1]}
            locale={locale}
            anchor="center"
            baseTransform={{
              x: 0,
              y: 6,
              rotateX: -2 - mouse.y * 2,
              rotateY: 0 + mouse.x * 2,
              z: 60,
            }}
            scrollShift={scrollProgress * 30}
            aspectClass="aspect-[4/5]"
            index={1}
            highlight
          />

          {/* Right device — Kona Coffee Donut */}
          <DeviceCard
            device={devices[2]}
            locale={locale}
            anchor="right"
            baseTransform={{
              x: 8,
              y: -2,
              rotateX: 3 - mouse.y * 3,
              rotateY: 10 + mouse.x * 4,
              z: 20,
            }}
            scrollShift={scrollProgress * -60}
            aspectClass="aspect-[16/10]"
            index={2}
          />

          {/* Stage filler — invisible spacer to reserve vertical space */}
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1]" aria-hidden />
        </div>

        {/* Footer CTA */}
        <div className="mt-20 md:mt-28 pt-10 border-t border-hairline flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-display italic text-xl md:text-2xl text-ink max-w-xl fraunces-soft">
            {isKo
              ? '사이트는 화면 안의 이미지가 아닙니다 — 매일 고객과 대화하는 존재입니다.'
              : 'A website is not an image on a screen — it is a presence that talks to your customer every day.'}
          </p>
          <Link
            href={`${prefix}/portfolio`}
            data-cursor="view"
            className="btn-ghost self-start md:self-auto"
          >
            {isKo ? '전체 작업' : 'View all work'}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function DeviceCard({
  device,
  locale,
  anchor,
  baseTransform,
  scrollShift,
  aspectClass,
  index,
  highlight,
}: {
  device: Device
  locale: 'en' | 'ko'
  anchor: 'left' | 'center' | 'right'
  baseTransform: { x: number; y: number; rotateX: number; rotateY: number; z: number }
  scrollShift: number
  aspectClass: string
  index: number
  highlight?: boolean
}) {
  const positionClass =
    anchor === 'left'
      ? 'md:left-[2%] md:w-[36%]'
      : anchor === 'right'
      ? 'md:right-[2%] md:w-[36%]'
      : 'md:left-1/2 md:-translate-x-1/2 md:w-[32%]'

  const style: React.CSSProperties = {
    transform: `
      translate3d(${baseTransform.x}%, calc(${baseTransform.y}% + ${scrollShift}px), ${baseTransform.z}px)
      rotateX(${baseTransform.rotateX}deg)
      rotateY(${baseTransform.rotateY}deg)
    `,
    transformStyle: 'preserve-3d',
    transition: 'box-shadow .6s ease',
    willChange: 'transform',
  }

  return (
    <div
      className={`md:absolute md:top-0 mb-10 md:mb-0 ${positionClass} ${
        highlight ? 'md:top-[6%]' : ''
      }`}
      style={{ zIndex: highlight ? 20 : 10 - index }}
    >
      <Link
        href={device.href}
        data-cursor="view"
        className="group block relative"
        style={style}
      >
        {/* Soft accent halo */}
        <div
          aria-hidden
          className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
          style={{ background: `radial-gradient(50% 50% at 50% 50%, ${device.accent}60, transparent)` }}
        />

        {/* Browser chrome frame */}
        <div
          className={`relative ${aspectClass} rounded-[4px] overflow-hidden bg-paper border border-hairline`}
          style={{
            boxShadow:
              '0 40px 80px -40px rgba(20,20,20,0.35), 0 10px 30px -10px rgba(20,20,20,0.2), 0 0 0 1px rgba(20,20,20,0.04) inset',
          }}
        >
          {/* Browser top bar */}
          <div className="absolute inset-x-0 top-0 h-7 md:h-8 bg-bone/90 backdrop-blur border-b border-hairline flex items-center px-3 gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="ml-3 overline text-ash truncate max-w-[60%]">
              {device.name.toLowerCase().replace(/\s+/g, '')}.com
            </span>
          </div>

          {/* Site screenshot */}
          <div className="absolute inset-0 top-7 md:top-8 overflow-hidden">
            <Image
              src={device.src}
              alt={device.name}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
            />
          </div>

          {/* Subtle glare */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.12) 100%)',
            }}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 md:mt-5">
          <div className="flex items-baseline gap-3">
            <span className="section-num text-sm">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-base md:text-lg tracking-luxury text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
              {device.name}
            </h3>
          </div>
          <p className="mt-1 text-[12px] text-ash">{device.industry[locale]}</p>
        </div>
      </Link>
    </div>
  )
}
