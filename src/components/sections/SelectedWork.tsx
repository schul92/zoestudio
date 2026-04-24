'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

type Project = {
  name: string
  industry: { en: string; ko: string }
  location: string
  year: string
  disciplines: { en: string[]; ko: string[] }
  image: string
  accent: string
}

const projects: Project[] = [
  {
    name: 'TJ Flowers',
    industry: { en: 'Floral studio', ko: '플라워 스튜디오' },
    location: 'Manhattan · NY',
    year: '2023',
    disciplines: {
      en: ['Brand', 'Commerce'],
      ko: ['브랜드', '커머스'],
    },
    image: '/portfolio/tj-flowers.jpg',
    accent: '#E4D8C4',
  },
  {
    name: 'Salt & Polish',
    industry: { en: 'Wellness studio', ko: '웰니스 스튜디오' },
    location: 'Fort Lee · NJ',
    year: '2024',
    disciplines: {
      en: ['Web design', 'Local SEO', 'Booking'],
      ko: ['웹디자인', '로컬 SEO', '예약'],
    },
    image: '/portfolio/salt-polish.jpg',
    accent: '#F0DCC4',
  },
  {
    name: 'Kona Coffee Donut',
    industry: { en: 'Café & bakery', ko: '카페 · 베이커리' },
    location: 'Honolulu · HI',
    year: '2024',
    disciplines: {
      en: ['Brand', 'Web design', 'Shopify'],
      ko: ['브랜드', '웹디자인', 'Shopify'],
    },
    image: '/portfolio/kona-coffee.jpg',
    accent: '#E8D5A3',
  },
  {
    name: 'CareK9',
    industry: { en: 'Pet services', ko: '펫 서비스' },
    location: 'Edgewater · NJ',
    year: '2024',
    disciplines: {
      en: ['Web design', 'Booking', 'CMS'],
      ko: ['웹디자인', '예약', 'CMS'],
    },
    image: '/portfolio/carek9.jpg',
    accent: '#DCCAA8',
  },
  {
    name: 'Mochinut',
    industry: { en: 'Confectionery', ko: '디저트 브랜드' },
    location: 'Multi-city',
    year: '2023',
    disciplines: {
      en: ['E-commerce', 'Rebrand', 'Franchise'],
      ko: ['이커머스', '리브랜드', '프랜차이즈'],
    },
    image: '/portfolio/mochinut.jpg',
    accent: '#F4E4D4',
  },
]

export default function SelectedWork({
  locale = 'en',
  sectionNumber = '02',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const [active, setActive] = useState<number | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Decide rendering mode based on input
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsTouch(!fine)
  }, [])

  // Cursor-following preview (desktop only)
  useEffect(() => {
    if (isTouch) return
    const section = sectionRef.current
    const preview = previewRef.current
    if (!section || !preview) return

    let targetX = 0, targetY = 0, x = 0, y = 0, raf = 0
    let visible = false

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }
    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      visible = true
      preview.classList.add('on')
    }
    const onLeave = () => {
      visible = false
      preview.classList.remove('on')
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch])

  return (
    <section
      ref={sectionRef}
      className="relative bg-ivory hair-bottom section-pad overflow-hidden"
    >
      {/* Header */}
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end mb-16 md:mb-20">
          <div className="md:col-span-7">
            <InView className="flex items-center gap-3 overline text-ash mb-5 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '작업' : 'Selected Work'}</span>
              <span className="ml-3 text-ash/60">·  {isKo ? `${projects.length}개 도판` : `${String(projects.length).padStart(2, '0')} plates`}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{isKo ? '한 줄로 읽는' : 'An index'}</span>
              </InView>
              <InView as="span" className="mask-row" delay={140}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '작업의 색인.' : 'of the work.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pb-3">
            <p className="text-body text-graphite leading-[1.7] max-w-md">
              {isKo
                ? '이름 위로 마우스를 올려두세요. 해당 프로젝트가 배경에 나타납니다.'
                : 'Hover a name to preview the project. Everything else quietly recedes.'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating image preview (desktop) */}
      {!isTouch && (
        <div
          ref={previewRef}
          aria-hidden
          className="sw-preview pointer-events-none fixed-safe absolute top-0 left-0 z-10 opacity-0 transition-opacity duration-500"
          style={{ width: 'clamp(340px, 34vw, 520px)', height: 'clamp(240px, 24vw, 360px)' }}
        >
          <div className="relative w-full h-full rounded-[2px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(20,20,20,0.4)]">
            {projects.map((p, i) => (
              <div
                key={p.name}
                className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                  active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.06]'
                }`}
                style={{
                  background: `radial-gradient(80% 80% at 50% 50%, ${p.accent}50, transparent 70%)`,
                }}
              >
                <div className="absolute inset-3 overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="520px"
                    className="object-cover"
                  />
                </div>
                {/* Corner marks */}
                <span aria-hidden className="absolute top-3 right-3" style={{ width: 10, height: 10, borderTop: '1px solid rgba(250,247,240,0.6)', borderRight: '1px solid rgba(250,247,240,0.6)' }} />
                <span aria-hidden className="absolute bottom-3 left-3" style={{ width: 10, height: 10, borderBottom: '1px solid rgba(250,247,240,0.6)', borderLeft: '1px solid rgba(250,247,240,0.6)' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Index */}
      <div className="container-edge">
        <ul className="relative border-t border-hairline">
          {projects.map((p, i) => {
            const isActive = active === i
            const isOther = active !== null && active !== i
            return (
              <InView key={p.name} as="li" className="reveal border-b border-hairline">
                <Link
                  href={`${prefix}/portfolio`}
                  data-cursor={isKo ? '케이스 보기' : 'View case'}
                  onMouseEnter={() => !isTouch && setActive(i)}
                  onMouseLeave={() => !isTouch && setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`block py-8 md:py-10 transition-all duration-700 ${
                    isOther ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={`section-num text-xl md:text-2xl transition-colors duration-500 ${
                          isActive ? 'text-gold' : ''
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-6">
                      <h3
                        className={`font-display leading-[1] tracking-luxury text-[clamp(2rem,5vw,4.25rem)] fraunces-soft transition-all duration-500 ${
                          isActive ? 'italic text-gold font-light md:translate-x-3' : 'text-ink font-normal'
                        }`}
                      >
                        {p.name}
                      </h3>
                    </div>
                    <div className="hidden md:block md:col-span-3">
                      <div className="overline text-ash">
                        {p.industry[locale as 'en' | 'ko'] || p.industry.en}
                      </div>
                      <div className="mt-1 text-[12px] text-ash/70">
                        {p.year} · {p.location}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right md:self-center">
                      <span
                        aria-hidden
                        className={`inline-block text-xl transition-all duration-500 ${
                          isActive ? 'text-gold translate-x-1 -translate-y-1' : 'text-ash'
                        }`}
                      >
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* Mobile inline image */}
                  {isTouch && (
                    <div className="mt-6 relative aspect-[5/4] overflow-hidden rounded-[2px] bg-bone">
                      <div className="absolute inset-4 overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="100vw" className="object-cover" />
                      </div>
                    </div>
                  )}

                  {/* Disciplines rail — mobile + when active on desktop */}
                  <div
                    className={`mt-4 md:mt-5 flex flex-wrap gap-x-5 gap-y-1 transition-opacity duration-500 ${
                      isActive || isTouch ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {(p.disciplines[locale as 'en' | 'ko'] || p.disciplines.en).map((d) => (
                      <span
                        key={d}
                        className="text-[11px] uppercase tracking-[0.18em] text-ash flex items-center gap-2"
                      >
                        <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-gold' : 'bg-ash/60'} transition-colors`} />
                        {d}
                      </span>
                    ))}
                  </div>
                </Link>
              </InView>
            )
          })}
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="container-edge mt-20 md:mt-28">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-12 border-t border-hairline">
          <p className="font-display italic text-2xl md:text-3xl text-ink max-w-xl fraunces-soft">
            {isKo
              ? '150개 이상의 프로젝트. 다음은 당신의 차례입니다.'
              : 'A hundred and fifty projects in. Your move.'}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`${prefix}/portfolio`} data-cursor="view" className="btn-ghost">
              {isKo ? '모든 작업' : 'All work'}
              <span aria-hidden>↗</span>
            </Link>
            <Magnetic strength={14}>
              <Link
                href={`${prefix}/#contact`}
                data-cursor={isKo ? '시작' : 'Begin'}
                className="btn-ink"
              >
                {isKo ? '프로젝트 시작' : 'Start yours'}
                <span className="arrow">→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
