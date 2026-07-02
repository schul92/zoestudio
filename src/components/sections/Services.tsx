'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'

  // Each discipline deep-links to its service page (homepage link equity);
  // the section CTA below still routes to #contact for conversion.
  const items = [
    {
      no: '01',
      href: `${prefix}/쇼핑몰-제작`,
      title: t.services.webDesign.title,
      blurb: t.services.webDesign.description,
      tags: t.services.webDesign.features.slice(0, 4),
    },
    {
      no: '02',
      href: `${prefix}/services`,
      title: (t.services as any).takeover.title,
      blurb: (t.services as any).takeover.description,
      tags: (t.services as any).takeover.features.slice(0, 4),
    },
    {
      no: '03',
      href: `${prefix}/services/shopify-cost-audit`,
      title: (t.services as any).costAudit.title,
      blurb: (t.services as any).costAudit.description,
      tags: (t.services as any).costAudit.features.slice(0, 4),
    },
    {
      no: '04',
      href: `${prefix}/웹사이트-제작`,
      title: t.services.revamp.title,
      blurb: t.services.revamp.description,
      tags: t.services.revamp.features.slice(0, 4),
    },
    {
      no: '05',
      href: `${prefix}/englewood-nj-seo`,
      title: t.services.seo.title,
      blurb: t.services.seo.description,
      tags: t.services.seo.features.slice(0, 4),
    },
    {
      no: '06',
      href: `${prefix}/광고대행`,
      title: t.services.googleAds.title,
      blurb: t.services.googleAds.description,
      tags: t.services.googleAds.features.slice(0, 4),
    },
    {
      no: '07',
      href: `${prefix}/광고대행`,
      title: t.services.socialMedia.title,
      blurb: t.services.socialMedia.description,
      tags: t.services.socialMedia.features.slice(0, 4),
    },
  ]

  // Cursor-following numeral preview.
  // Hover never touches React state: the numeral is written straight to the
  // DOM and every row effect is pure CSS (group-hover), so moving between
  // rows costs zero re-renders. The rAF loop only runs while the pointer is
  // inside the list.
  const previewRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    let raf = 0
    let running = false
    let x = 0, y = 0, tx = 0, ty = 0

    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: MouseEvent) => {
      const r = list.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const onOver = (e: MouseEvent) => {
      const row = (e.target as HTMLElement).closest?.('[data-no]') as HTMLElement | null
      if (row && numRef.current) numRef.current.textContent = row.dataset.no || '·'
    }
    const onEnter = (e: MouseEvent) => {
      // Snap to the cursor so the disc doesn't glide in from the last spot.
      const r = list.getBoundingClientRect()
      tx = x = e.clientX - r.left
      ty = y = e.clientY - r.top
      preview.classList.add('on')
      if (!running) { running = true; raf = requestAnimationFrame(tick) }
    }
    const onLeave = () => {
      preview.classList.remove('on')
      running = false
      cancelAnimationFrame(raf)
    }

    list.addEventListener('mousemove', onMove, { passive: true })
    list.addEventListener('mouseover', onOver, { passive: true })
    list.addEventListener('mouseenter', onEnter)
    list.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener('mousemove', onMove)
      list.removeEventListener('mouseover', onOver)
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
              <span className="block">{t.services.subtitle}</span>
            </InView>
          </div>
        </div>

        {/* Numbered list */}
        <ul ref={listRef} className="relative border-t border-hairline">
          {/* Cursor-follower numeral disc */}
          <div ref={previewRef} className="svc-preview will-change-transform" aria-hidden>
            <span ref={numRef} className="font-display italic font-light text-[58px] leading-none">
              ·
            </span>
          </div>

          {items.map((it) => (
            <InView
              key={it.no}
              as="li"
              className="reveal border-b border-hairline group"
            >
              <Link
                href={it.href}
                data-cursor="hide"
                data-no={it.no}
                className="grid grid-cols-12 gap-6 md:gap-10 items-start py-10 md:py-14"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="section-num text-2xl md:text-3xl transition-colors duration-500 group-hover:text-gold">
                    {it.no}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-6">
                  {/* Two pre-rendered layers crossfade on hover — compositor-only,
                      no font re-rasterization mid-interaction. */}
                  <h3 className="relative font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-luxury fraunces-soft">
                    <span className="block text-ink transition-opacity duration-500 group-hover:opacity-0">
                      {it.title}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 block italic font-light text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      {it.title}
                    </span>
                  </h3>
                  <p className="mt-5 text-body text-graphite max-w-xl leading-[1.7] transition-transform duration-700 md:group-hover:translate-x-1.5">
                    {it.blurb}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-4 md:col-start-8 md:pt-2">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {it.tags.map((tag: string, ti: number) => (
                      <li
                        key={tag}
                        className="text-[13px] text-ash flex items-center gap-2 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ transitionDelay: `${ti * 40}ms` }}
                      >
                        <span className="w-1 h-1 rounded-full bg-ash/60 transition-[background-color,transform] duration-500 group-hover:bg-gold group-hover:scale-150" />
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
