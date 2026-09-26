'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type LumosCaption = { from: number; to: number; label: string; value: string; body: string }
export type LumosCopy = {
  eyebrow: string
  h1Lead: string
  h1Accent: string
  sub: string
  cta1: string
  cta2: string
  scroll: string
  sceneLabel: string
  captions: LumosCaption[]
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => t * t * (3 - 2 * t)
const span = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)))

export default function LumosHero({ t, prefix }: { t: LumosCopy; prefix: string }) {
  const storyRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const story = storyRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement

    let scene: import('./lumosScene').LumosScene | null = null
    let disposed = false
    let raf = 0
    let visible = true
    let target = 0
    let progress = 0
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const readScroll = () => {
      const r = story.getBoundingClientRect()
      target = clamp(-r.top / (r.height - window.innerHeight))
    }
    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5
      pointer.ty = e.clientY / window.innerHeight - 0.5
    }
    const resize = () => scene?.resize(stage.clientWidth, stage.clientHeight)

    const frame = (now: number) => {
      if (!visible || disposed) return
      progress += (target - progress) * (reduce ? 1 : 0.08)
      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05
      const p = progress

      const fade = span(p, 0.06, 0.2)
      if (copyRef.current) {
        copyRef.current.style.opacity = String(1 - fade)
        copyRef.current.style.transform = `translateY(${-fade * 40}px) scale(${1 - fade * 0.06})`
      }
      if (ctaRef.current) ctaRef.current.style.opacity = String(1 - span(p, 0.04, 0.12))
      if (hintRef.current) hintRef.current.style.opacity = String(1 - span(p, 0, 0.05))
      t.captions.forEach((c, i) => capRefs.current[i]?.classList.toggle('lh-on', p >= c.from && p < c.to))

      scene?.render({ p, px: pointer.x, py: pointer.y, now, narrow: stage.clientWidth / stage.clientHeight < 0.9, reduce })
      raf = requestAnimationFrame(frame)
    }

    // Nav switches to its dark variant while the dark stage sits under it.
    const navIo = new IntersectionObserver(
      ([e]) => { root.dataset.navTone = e.isIntersecting ? 'dark' : '' },
      { rootMargin: '0px 0px -100% 0px' },
    )
    navIo.observe(story)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(frame)
    })
    io.observe(stage)

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', resize)
    readScroll()
    raf = requestAnimationFrame(frame)

    import('./lumosScene')
      .then(({ createLumosScene }) => {
        if (disposed) return
        scene = createLumosScene(canvas)
        resize()
      })
      .catch(() => setFallback(true))

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      navIo.disconnect()
      root.dataset.navTone = ''
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', resize)
      scene?.dispose()
    }
  }, [t])

  return (
    <section ref={storyRef} className="lh-story" aria-labelledby="hero-title">
      <div ref={stageRef} className="lh-stage">
        {fallback ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/portfolio/tj-flowers.jpg" alt="TJ Flowers Shopify store" className="lh-fallback" />
        ) : (
          <canvas ref={canvasRef} className="lh-canvas" role="img" aria-label={t.sceneLabel} />
        )}

        <div ref={copyRef} className="lh-copy">
          <p className="lh-eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title" className="lh-h1">
            <span className="block">{t.h1Lead}</span>
            <span className="block lh-accent">{t.h1Accent}</span>
          </h1>
          <p className="lh-sub">{t.sub}</p>
        </div>

        {t.captions.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => { capRefs.current[i] = el }}
            className="lh-cap"
          >
            <small>{c.label}</small>
            <b>{c.value}</b>
            <p>{c.body}</p>
          </div>
        ))}

        <div ref={ctaRef} className="lh-cta">
          <Link href={`${prefix}/#contact`} className="lh-btn">
            {t.cta1}
          </Link>
          <Link href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`} className="lh-link">
            {t.cta2} <span aria-hidden>›</span>
          </Link>
        </div>
        <div ref={hintRef} className="lh-hint" aria-hidden>
          {t.scroll}
        </div>
      </div>
    </section>
  )
}
