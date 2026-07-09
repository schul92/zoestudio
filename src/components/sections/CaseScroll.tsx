'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type Step = {
  n: string
  title: string
  sub: string
  scale: number
}

export default function CaseScroll({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const scope = useRef<HTMLElement | null>(null)
  const pinRef = useRef<HTMLDivElement | null>(null)
  const stepsRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  const steps: Step[] = [
    {
      n: '01',
      title: isKo ? '문제 — 아름답지만 아무도 찾지 못하는 사이트' : 'The problem — beautiful, and invisible.',
      sub: isKo ? '느린 페이지, 검색 노출 없음, 주문은 전화로만.' : 'Slow pages, no search visibility, orders only by phone.',
      scale: 1.0,
    },
    {
      n: '02',
      title: isKo ? '재구축 — 이중언어 + Shopify' : 'The rebuild — bilingual + Shopify.',
      sub: isKo ? '6주. 모바일 우선, 구조화 데이터, 로컬 SEO까지.' : 'Six weeks. Mobile-first, structured data, local SEO.',
      scale: 1.06,
    },
    {
      n: '03',
      title: isKo ? '결과 — 4주 만에 $3,114 실매출' : 'The result — $3,114 in four weeks.',
      sub: isKo ? '검색 노출 5배. 이제 주문이 알아서 들어옵니다.' : 'Five times the search visibility. Orders arrive on their own.',
      scale: 1.12,
    },
  ]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const stepEls = () => gsap.utils.toArray<HTMLElement>('[data-step]')

      // DESKTOP: pinned, scrubbed storytelling
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const els = stepEls()
        // initial state: only step 0 fully visible
        els.forEach((el, i) => {
          gsap.set(el, {
            opacity: i === 0 ? 1 : 0.15,
            y: i === 0 ? 0 : 30,
            filter: i === 0 ? 'blur(0px)' : 'blur(6px)',
          })
        })
        gsap.set(imageRef.current, { scale: steps[0].scale })
        gsap.set(glowRef.current, { opacity: 0.35, scale: 1 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Two transitions across three steps
        for (let i = 0; i < els.length - 1; i++) {
          const label = `t${i}`
          tl.addLabel(label, i)
          // outgoing step
          tl.to(
            els[i],
            { opacity: 0.15, y: -30, filter: 'blur(6px)', ease: 'power2.inOut', duration: 1 },
            label
          )
          // incoming step
          tl.fromTo(
            els[i + 1],
            { opacity: 0.15, y: 30, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.inOut', duration: 1 },
            label
          )
          // media scale
          tl.to(
            imageRef.current,
            { scale: steps[i + 1].scale, ease: 'power2.inOut', duration: 1 },
            label
          )
          // warm glow pulse behind the frame
          tl.to(
            glowRef.current,
            { opacity: 0.55, scale: 1.15, ease: 'power2.inOut', duration: 0.5 },
            label
          ).to(
            glowRef.current,
            { opacity: 0.35, scale: 1, ease: 'power2.inOut', duration: 0.5 },
            `${label}+=0.5`
          )
        }

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      // MOBILE: no pin, simple per-step reveal
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const els = stepEls()
        const triggers: ScrollTrigger[] = []
        // media reveal
        if (imageRef.current) {
          const st = ScrollTrigger.create({
            trigger: imageRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                imageRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
              )
            },
          })
          triggers.push(st)
        }
        els.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 30 })
          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
            },
          })
          triggers.push(st)
        })
        return () => triggers.forEach((t) => t.kill())
      })
    },
    { scope }
  )

  const Frame = (
    <div ref={imageRef} className="group relative w-full will-change-transform">
      {/* browser chrome */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f0c0a] shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#171310] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 truncate text-[11px] text-ivory/40">tjflowersandevents.com</span>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/hero/tj-flowers-mockup.jpeg"
            alt={isKo ? 'TJ Flowers Shopify 사이트' : 'TJ Flowers Shopify site'}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            priority={false}
          />
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={scope}
      className="relative overflow-x-hidden bg-[#171310] text-ivory"
    >
      <div
        ref={pinRef}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10 lg:py-0"
      >
        {/* eyebrow */}
        <div className="mb-10 lg:absolute lg:top-16 lg:left-10 lg:mb-0">
          <span className="font-display fraunces-soft text-sm italic font-light text-gold">
            {isKo ? '실제 사례 연구' : 'A real case study'}
          </span>
          <span className="ml-3 text-sm text-ivory/40">TJ Flowers · Manhattan</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* MEDIA — order first on mobile */}
          <div className="relative order-first lg:order-last">
            {/* warm gold radial glow */}
            <div
              ref={glowRef}
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-0 rounded-full opacity-35 blur-3xl will-change-transform"
              style={{
                background:
                  'radial-gradient(circle at 60% 40%, rgba(255,107,74,0.45), rgba(255,179,148,0.12) 45%, transparent 70%)',
              }}
            />
            <div className="relative z-10">{Frame}</div>
          </div>

          {/* STEPS */}
          <div ref={stepsRef} className="relative order-last lg:order-first">
            {/* Desktop: stacked in same grid cell so they cross-fade in place.
                Mobile: natural document flow. */}
            <div className="relative flex flex-col gap-16 lg:block lg:min-h-[16rem] lg:gap-0">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  data-step
                  className="max-w-xl lg:absolute lg:inset-0 will-change-transform"
                >
                  <div className="mb-5 font-mono text-xs tracking-[0.3em] text-ivory/40">
                    {s.n} / 03
                  </div>
                  <h3 className="font-display fraunces-soft text-[clamp(1.75rem,3.2vw,3rem)] font-light leading-[1.08] tracking-tight text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-mute md:text-lg">
                    {s.sub}
                  </p>

                  {/* CTA only on final step */}
                  {i === steps.length - 1 && (
                    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <Link
                        href={`${prefix}/portfolio`}
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-ivory transition-colors hover:text-gold"
                      >
                        <span className="border-b border-ivory/30 pb-1 transition-colors group-hover/link:border-gold">
                          {isKo ? '전체 작업 보기' : 'See all work'}
                        </span>
                        <span aria-hidden className="transition-transform group-hover/link:translate-x-1">
                          →
                        </span>
                      </Link>
                      <a
                        href="https://www.tjflowersandevents.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-ivory/70 transition-colors hover:text-gold"
                      >
                        <span className="border-b border-transparent pb-1 transition-colors group-hover/link:border-gold">
                          {isKo ? '실제 사이트 방문' : 'Visit the live site'}
                        </span>
                        <span aria-hidden className="transition-transform group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
