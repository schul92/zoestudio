'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CAPTION_RANGES, REDUCED_P, SEQ_COUNT, SEQ_DIR, seqSrc } from './lumosStory'

export type LumosCaption = { label: string; value: string; body: string }
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
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => t * t * (3 - 2 * t)
const span = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)))

// Room kept clear at the bottom of the phone stage: sticky KakaoTalk/quote bar and the chat launcher.
const PHONE_BOTTOM_RESERVE = 150
const BAND_GAP = 16

// Brand names stay untranslated when a browser auto-translates the page.
function NoTranslate({ text }: { text: string }) {
  const parts = text.split(/(Zoe Lumos|Shopify)/)
  return (
    <>
      {parts.map((part, i) =>
        part === 'Zoe Lumos' || part === 'Shopify' ? (
          <span key={i} translate="no">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

function setHidden(el: HTMLElement | null, hidden: boolean) {
  if (!el) return
  el.toggleAttribute('inert', hidden)
  el.style.pointerEvents = hidden ? 'none' : ''
}

type SeqMeta = { w: number; h: number }[]

export default function LumosHero({ t, prefix }: { t: LumosCopy; prefix: string }) {
  const storyRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const seqRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])
  const [fallback, setFallback] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [mode, setMode] = useState<'' | 'lite' | 'full'>('')

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const story = storyRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current
    const seqCanvas = seqRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Phones, data-saver and low-memory devices never download three.js: they play the image sequence.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
    const lite =
      window.innerWidth <= 820 || !!nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 4)
    setMode(lite ? 'lite' : 'full')
    const root = document.documentElement

    let scene: import('./lumosScene').LumosScene | null = null
    let disposed = false
    let raf = 0
    let visible = true
    let target = 0
    let progress = -1
    let dirty = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    // ── Image sequence (lite) ─────────────────────────────────────
    const frames: (HTMLImageElement | null)[] = Array(SEQ_COUNT).fill(null)
    let meta: SeqMeta | null = null
    let seqScale = 0
    const staticIdx = Math.round(REDUCED_P * (SEQ_COUNT - 1))
    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.src = seqSrc(i)
        img
          .decode()
          .then(() => {
            if (!disposed) {
              frames[i] = img
              dirty = true
            }
          })
          .catch(() => {})
          .finally(resolve)
      })
    let restStarted = false
    const loadRest = async () => {
      if (restStarted || reduce) return
      restStarted = true
      for (let i = 1; i < SEQ_COUNT && !disposed; i++) if (!frames[i]) await loadFrame(i)
    }
    if (lite && seqCanvas) {
      fetch(`${SEQ_DIR}/meta.txt`)
        .then((r) => r.json())
        .then((m: SeqMeta) => { meta = m; dirty = true })
        .catch(() => {})
      loadFrame(reduce ? staticIdx : 0)
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      if (idle) idle(() => loadRest())
      else setTimeout(loadRest, 1200)
    }
    const nearestFrame = (i: number) => {
      for (let d = 0; d < SEQ_COUNT; d++) {
        if (frames[i - d]) return i - d
        if (frames[i + d]) return i + d
      }
      return -1
    }
    // The product band sits between the copy/caption block and the CTA/bottom reserve, so nothing overlaps.
    const drawSeq = (p: number, fade: number, ctaOn: boolean) => {
      if (!seqCanvas || !meta) return
      const W = stage.clientWidth
      const H = stage.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (seqCanvas.width !== Math.round(W * dpr) || seqCanvas.height !== Math.round(H * dpr)) {
        seqCanvas.width = Math.round(W * dpr)
        seqCanvas.height = Math.round(H * dpr)
      }
      const g = seqCanvas.getContext('2d')
      if (!g) return
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.clearRect(0, 0, W, H)

      const stageTop = stage.getBoundingClientRect().top
      const subBottom = subRef.current ? subRef.current.getBoundingClientRect().bottom - stageTop : H * 0.5
      let capBottom = 0
      capRefs.current.forEach((el) => { if (el) capBottom = Math.max(capBottom, el.offsetTop + el.offsetHeight) })
      // Hold the band under the headline until it has all but faded, so the product never sits on the copy.
      const top = lerp(subBottom, capBottom, span(fade, 0.85, 1)) + BAND_GAP
      let bottom = H - PHONE_BOTTOM_RESERVE
      if (ctaOn && ctaRef.current) bottom = Math.min(bottom, ctaRef.current.getBoundingClientRect().top - stageTop - BAND_GAP)
      const bandH = Math.max(0, bottom - top)
      const bandW = W - 32

      const want = reduce ? staticIdx : Math.round(p * (SEQ_COUNT - 1))
      const i = nearestFrame(want)
      if (i < 0) return
      const img = frames[i]!
      const m = meta[i] ?? { w: img.naturalWidth, h: img.naturalHeight }
      const s = Math.min(bandW / m.w, bandH / m.h)
      seqScale = seqScale ? lerp(seqScale, s, 0.25) : s
      const scale = Math.min(seqScale, s)
      const dw = m.w * scale
      const dh = m.h * scale
      g.drawImage(img, (W - dw) / 2, top + (bandH - dh) / 2, dw, dh)
    }

    const invalidate = () => { dirty = true }
    const readScroll = () => {
      const r = story.getBoundingClientRect()
      target = clamp(-r.top / (r.height - window.innerHeight))
      if (lite && target > 0.002) loadRest()
    }
    const onPointer = (e: PointerEvent) => {
      if (reduce) return
      pointer.tx = e.clientX / window.innerWidth - 0.5
      pointer.ty = e.clientY / window.innerHeight - 0.5
    }
    // Lowest caption edge as a fraction of the stage height; the scene parks the display just below it.
    let capFloor = 0.3
    const measureCaps = () => {
      const h = stage.clientHeight || 1
      capFloor = Math.max(0, ...capRefs.current.map((el) => (el ? (el.offsetTop + el.offsetHeight) / h : 0)))
      dirty = true
    }
    const resize = () => {
      measureCaps()
      scene?.resize(stage.clientWidth, stage.clientHeight)
    }
    document.fonts?.ready.then(() => { if (!disposed) measureCaps() })

    const frame = (now: number) => {
      if (!visible || disposed) return
      const prevP = progress
      const prevX = pointer.x
      const prevY = pointer.y
      progress = progress < 0 || reduce ? target : progress + (target - progress) * 0.08
      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05
      const p = progress
      const moved = Math.abs(p - prevP) > 1e-4 || Math.abs(pointer.x - prevX) > 1e-4 || Math.abs(pointer.y - prevY) > 1e-4
      const idling = !reduce && p < 0.15

      if (moved || dirty) {
        const fade = reduce ? (p > 0.06 ? 1 : 0) : span(p, 0.06, 0.2)
        if (copyRef.current) {
          copyRef.current.style.opacity = String(1 - fade)
          copyRef.current.style.transform = reduce ? '' : `translateY(${-fade * 40}px) scale(${1 - fade * 0.06})`
        }
        const ctaOpacity = 1 - (reduce ? (p > 0.04 ? 1 : 0) : span(p, 0.04, 0.12))
        if (ctaRef.current) ctaRef.current.style.opacity = String(ctaOpacity)
        setHidden(ctaRef.current, ctaOpacity < 0.05)
        // Persistent CTA: takes over once the hero buttons are gone, leaves when the story is done.
        const pillOn = ctaOpacity < 0.05 && p < 0.985
        pillRef.current?.classList.toggle('lh-pill-on', pillOn)
        setHidden(pillRef.current, !pillOn)
        if (hintRef.current) hintRef.current.style.opacity = String(1 - span(p, 0, 0.05))
        CAPTION_RANGES.forEach(([from, to], i) => {
          const el = capRefs.current[i]
          if (!el) return
          const on = p >= from && p < to
          el.classList.toggle('lh-on', on)
          el.setAttribute('aria-hidden', on ? 'false' : 'true')
        })
        if (lite) drawSeq(p, fade, ctaOpacity > 0.05)
        dirty = lite ? false : dirty
      }

      if (scene && (moved || dirty || idling)) {
        scene.render({
          p: reduce ? REDUCED_P : p,
          sp: p,
          px: pointer.x,
          py: pointer.y,
          now,
          narrow: stage.clientWidth / stage.clientHeight < 0.9,
          reduce,
          capFloor,
        })
        dirty = false
      }
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
      if (visible) {
        dirty = true
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(stage)

    const onContextLost = (e: Event) => {
      e.preventDefault()
      setFallback(true)
    }
    canvas?.addEventListener('webglcontextlost', onContextLost)

    const onResize = () => { resize(); dirty = true }
    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', onResize)
    readScroll()
    raf = requestAnimationFrame(frame)

    if (canvas && !lite) {
      import('./lumosScene')
        .then(({ createLumosScene }) => {
          if (disposed) return
          scene = createLumosScene(canvas, invalidate)
          resize()
        })
        .catch(() => setFallback(true))
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      navIo.disconnect()
      root.dataset.navTone = ''
      canvas?.removeEventListener('webglcontextlost', onContextLost)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      scene?.dispose()
    }
  }, [t, fallback])

  return (
    <section ref={storyRef} className={`lh-story${reduced ? ' lh-story-reduced' : ''}${mode ? ` lh-${mode}` : ''}`} aria-labelledby="hero-title">
      <div ref={stageRef} className="lh-stage">
        {fallback ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/portfolio/tj-flowers.jpg" alt="TJ Flowers Shopify store" className="lh-fallback" />
        ) : (
          <canvas ref={canvasRef} className="lh-canvas" role="img" aria-label={t.sceneLabel} />
        )}
        <canvas ref={seqRef} className="lh-seq" role="img" aria-label={t.sceneLabel} />

        <div ref={copyRef} className="lh-copy">
          <p className="lh-eyebrow">
            <NoTranslate text={t.eyebrow} />
          </p>
          <h1 id="hero-title" className="lh-h1">
            <span className="block">{t.h1Lead}</span>
            <span className="block lh-accent">{t.h1Accent}</span>
          </h1>
          <p ref={subRef} className="lh-sub">
            <NoTranslate text={t.sub} />
          </p>
        </div>

        {t.captions.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => { capRefs.current[i] = el }}
            className="lh-cap"
            aria-hidden="true"
          >
            <small>
              <NoTranslate text={c.label} />
            </small>
            <b>{c.value}</b>
            <p>
              <NoTranslate text={c.body} />
            </p>
          </div>
        ))}

        <div ref={ctaRef} className="lh-cta">
          <Link href={`${prefix}/#contact`} className="lh-btn">
            {t.cta1} <span className="lh-btn-arrow" aria-hidden>→</span>
          </Link>
          <Link href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`} className="lh-link">
            {t.cta2} <span aria-hidden>›</span>
          </Link>
        </div>
        <div ref={pillRef} className="lh-pill">
          <Link href={`${prefix}/#contact`} className="lh-btn lh-pill-btn">
            {t.cta1}
          </Link>
        </div>
        <div ref={hintRef} className="lh-hint" aria-hidden>
          {t.scroll}
        </div>
      </div>
    </section>
  )
}
