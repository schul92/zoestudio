'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'

  const items = [
    {
      no: '01',
      title: t.services.webDesign.title,
      blurb: t.services.webDesign.description,
      tags: t.services.webDesign.features.slice(0, 4),
    },
    {
      no: '02',
      title: t.services.revamp.title,
      blurb: t.services.revamp.description,
      tags: t.services.revamp.features.slice(0, 4),
    },
    {
      no: '03',
      title: t.services.seo.title,
      blurb: t.services.seo.description,
      tags: t.services.seo.features.slice(0, 4),
    },
    {
      no: '04',
      title: t.services.googleAds.title,
      blurb: t.services.googleAds.description,
      tags: t.services.googleAds.features.slice(0, 4),
    },
    {
      no: '05',
      title: t.services.socialMedia.title,
      blurb: t.services.socialMedia.description,
      tags: t.services.socialMedia.features.slice(0, 4),
    },
  ]

  // Cursor-following numeral preview
  const previewRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    let raf = 0
    let x = 0, y = 0, tx = 0, ty = 0
    const onMove = (e: MouseEvent) => {
      const r = list.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    const onEnter = () => preview.classList.add('on')
    const onLeave = () => {
      preview.classList.remove('on')
      setHover(null)
    }

    list.addEventListener('mousemove', onMove)
    list.addEventListener('mouseenter', onEnter)
    list.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener('mousemove', onMove)
      list.removeEventListener('mouseenter', onEnter)
      list.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="services" className="relative bg-ivory section-pad hair-bottom">
      <div className="container-edge">
        {/* Section head */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20 md:mb-28">
          <div className="md:col-span-5">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ 01</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '서비스' : 'Disciplines'}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">
                  {isKo ? '조용하게,' : 'Quiet craft,'}
                </span>
              </InView>
              <InView as="span" className="mask-row" delay={150}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '그러나 단단하게.' : 'loud results.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span className="block transition-all duration-1000" style={{}}>
                {t.services.subtitle}
              </span>
            </InView>
          </div>
        </div>

        {/* Numbered list */}
        <ul
          ref={listRef}
          className="relative border-t border-hairline"
          onMouseLeave={() => setHover(null)}
        >
          {/* Cursor-follower numeral disc */}
          <div ref={previewRef} className="svc-preview" aria-hidden>
            <span className="font-display italic font-light text-[58px] leading-none">
              {hover !== null ? items[hover].no : '·'}
            </span>
          </div>

          {items.map((it, i) => (
            <InView
              key={it.no}
              as="li"
              className="reveal border-b border-hairline group"
            >
              <Link
                href={`${prefix}/#contact`}
                data-cursor="hide"
                onMouseEnter={() => setHover(i)}
                className="grid grid-cols-12 gap-6 md:gap-10 items-start py-10 md:py-14 transition-colors duration-500"
              >
                <div className="col-span-2 md:col-span-1">
                  <span
                    className={`section-num text-2xl md:text-3xl transition-colors duration-500 ${
                      hover === i ? 'text-gold' : ''
                    }`}
                  >
                    {it.no}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-6">
                  <h3
                    className={`font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-luxury transition-colors duration-500 fraunces-soft ${
                      hover === i ? 'text-gold italic font-light' : 'text-ink'
                    }`}
                  >
                    {it.title}
                  </h3>
                  <p
                    className={`mt-5 text-body text-graphite max-w-xl leading-[1.7] transition-all duration-700 ${
                      hover === i ? 'md:translate-x-1.5' : ''
                    }`}
                  >
                    {it.blurb}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-4 md:col-start-8 md:pt-2">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {it.tags.map((tag, ti) => (
                      <li
                        key={tag}
                        className={`text-[13px] text-ash flex items-center gap-2 transition-all duration-500 ${
                          hover === i ? 'opacity-100 translate-y-0' : 'opacity-80'
                        }`}
                        style={{ transitionDelay: `${ti * 40}ms` }}
                      >
                        <span
                          className={`w-1 h-1 rounded-full transition-all duration-500 ${
                            hover === i ? 'bg-gold scale-150' : 'bg-ash/60'
                          }`}
                        />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </InView>
          ))}
        </ul>

        {/* CTA footer */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <p className="font-display italic text-2xl md:text-3xl text-ink max-w-xl fraunces-soft">
            {isKo
              ? '필요한 건 딱 하나면 충분합니다.'
              : 'Start with one. Grow into the rest.'}
          </p>
          <Magnetic strength={14}>
            <Link
              href={`${prefix}/#contact`}
              data-cursor={isKo ? '시작' : 'Begin'}
              className="btn-ink"
            >
              {isKo ? '상담 요청' : 'Begin a conversation'}
              <span className="arrow">→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
