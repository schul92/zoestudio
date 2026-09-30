'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { BAND_RISE, CAPTION_RANGES, COPY_FADE, OPENING_END, PHONE_MQ, REDUCED_P, type SeqMeta, type SeqSet, seqSrc } from './lumosStory'

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

// Room kept clear at the bottom of the stage: CTA / pinned pill, sticky KakaoTalk bar and the chat launcher.
// Mirrored in the .lh-copy padding-bottom so the server-rendered first frame sits in the same band.
const BOTTOM_RESERVE = 150
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

// The server-rendered first frame is a <picture> with an AVIF <source>: whatever the browser picked there (currentSrc)
// is the format it supports, so the rest of the sequence follows it with no probe image in the bundle.
const pickedAvif = (stage: HTMLElement) =>
  new Promise<boolean>((res) => {
    const img = stage.querySelector<HTMLImageElement>('.lh-first img')
    if (!img) return res(false)
    const read = () => res(/\.avif(\?|$)/.test(img.currentSrc))
    if (img.currentSrc) read()
    else {
      img.addEventListener('load', read, { once: true })
      img.addEventListener('error', read, { once: true })
    }
  })

export default function LumosHero({
  t,
  prefix,
  desktop,
  mobile,
  firstFrame,
}: {
  t: LumosCopy
  prefix: string
  desktop: SeqSet
  mobile: SeqSet
  firstFrame: ReactNode
}) {
  const storyRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])
  const [fallback, setFallback] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const story = storyRef.current!
    const stage = stageRef.current!
    const canvas = seqRef.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const phone = window.matchMedia(PHONE_MQ).matches
    const set = phone ? mobile : desktop
    const N = set.count
    const root = document.documentElement
    // Test hook: a harness may set window.__lumos = [] before load to log every draw.
    const trace = (window as Window & { __lumos?: unknown[] }).__lumos

    let disposed = false
    let raf = 0
    let visible = true
    let target = 0
    let progress = -1
    let dirty = true
    let running = false
    let lastT = 0
    // Declared up front so loaders and listeners can wake the loop; frame is assigned below.
    let frame: (now: number) => void = () => {}
    const kick = () => {
      if (running || !visible || disposed) return
      running = true
      lastT = 0
      raf = requestAnimationFrame((n) => frame(n))
    }

    // ── Frames ──────────────────────────────────────────────────
    const frames: (HTMLImageElement | null)[] = Array(N).fill(null)
    let loaded = 0
    let meta: SeqMeta | null = null
    let staticIdx = 0
    let shownFirst = false
    let ext: 'avif' | 'webp' = 'webp'

    // Last frame whose p ≤ the given progress (frames are motion-weighted, so index ≠ progress).
    const idxAt = (p: number) => {
      let k = 0
      if (meta) while (k < N - 1 && meta.f[k + 1].p <= p) k++
      return k
    }

    // <img> + decode(): decoded off the main thread, and frame 0 reuses the server-rendered <picture> download
    // (a fetch() would not match an image request, and would fetch it twice).
    const loadFrame = (i: number): Promise<void> => {
      const im = new Image()
      im.decoding = 'async'
      if (i !== 0) (im as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'low'
      im.src = seqSrc(set.dir, i, ext)
      return im.decode().then(() => {
        if (disposed) return
        frames[i] = im
        if (++loaded === N) performance.mark('lumos:all-frames')
        dirty = true
        kick()
      })
    }
    // Loading order: the whole opening segment first, in order (so the first scroll is never coarse), then the rest
    // nearest the reader; 4 requests at a time.
    const requested = new Set<number>()
    let active = 0
    let restStarted = false
    const nextIndex = () => {
      if (!meta) return -1
      const f = meta.f
      for (let k = 0; k < N && f[k].p <= OPENING_END; k++) if (!requested.has(k)) return k
      const here = idxAt(clamp(target))
      for (let d = 0; d < N; d++) {
        for (const k of [here + d, here - d]) if (k >= 0 && k < N && !requested.has(k)) return k
      }
      return -1
    }
    const pump = () => {
      while (active < 4 && !disposed) {
        const next = nextIndex()
        if (next < 0) return
        requested.add(next)
        active++
        loadFrame(next).catch(() => {}).finally(() => { active--; pump() })
      }
    }
    const loadRest = () => {
      if (restStarted || reduce) return
      restStarted = true
      pump()
    }
    let later: () => void = () => {}
    const metaReady = fetch(`${set.dir}/meta.txt`)
      .then((r) => r.json())
      .then((m: SeqMeta) => {
        if (disposed) return
        meta = m
        staticIdx = idxAt(REDUCED_P)
        dirty = true
        kick()
      })
    Promise.all([pickedAvif(stage), metaReady]).then(([ok]) => {
      if (disposed) return
      ext = ok ? 'avif' : 'webp'
      const first = reduce ? staticIdx : 0
      requested.add(first)
      loadFrame(first).catch(() => { if (!disposed) setFallback(true) })
      // The rest wait for the page's own load so they never compete with the headline and fonts;
      // the first scroll starts them sooner (see readScroll).
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      later = () => { idle ? idle(() => loadRest()) : setTimeout(loadRest, 300) }
      if (document.readyState === 'complete') later()
      else window.addEventListener('load', later, { once: true })
      if (target > 0.002) loadRest()
    }).catch(() => { if (!disposed) setFallback(true) })

    // Highest loaded frame at or below i (the opening loads in order, so this only ever moves forward while it fills
    // in); above i only if nothing below has loaded yet.
    const nearestFrame = (i: number) => {
      for (let k = i; k >= 0; k--) if (frames[k]) return k
      for (let k = i + 1; k < N; k++) if (frames[k]) return k
      return -1
    }

    // Layout is measured once per resize (untransformed offsets), never inside the scroll loop.
    const offsetIn = (el: HTMLElement | null) => {
      let y = 0
      let n: HTMLElement | null = el
      while (n && n !== stage) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null }
      return y
    }
    let lay = { W: 0, H: 0, subBottom: 0, capBottom: 0, ctaTop: 0 }
    const measure = () => {
      const W = stage.clientWidth
      const H = stage.clientHeight
      const sub = subRef.current
      let capBottom = 0
      capRefs.current.forEach((el) => { if (el) capBottom = Math.max(capBottom, el.offsetTop + el.offsetHeight) })
      lay = {
        W,
        H,
        subBottom: sub ? offsetIn(sub) + sub.offsetHeight : H * 0.5,
        capBottom,
        ctaTop: ctaRef.current ? offsetIn(ctaRef.current) : H,
      }
      const dpr = Math.min(window.devicePixelRatio || 1, set.maxDpr)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      dirty = true
    }

    const markFirst = () => {
      if (shownFirst) return
      shownFirst = true
      stage.dataset.ready = '1'
      performance.mark('lumos:first-frame')
    }

    type Fit = { s: number; tx: number; ty: number }
    const draw = (p: number, ctaOn: boolean) => {
      if (!lay.W) measure()
      const { W, H } = lay
      const dpr = canvas.width / (W || 1)
      const g = canvas.getContext('2d')
      if (!g) return
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.imageSmoothingEnabled = true
      g.imageSmoothingQuality = 'high'
      g.clearRect(0, 0, W, H)
      if (!meta) return
      const f = meta.f

      // The product band sits between the copy/caption block and the bottom reserve (CTA, pill, chat launcher), so
      // nothing overlaps at any viewport. It stays under the (untransformed) subline until the copy has faded, and
      // only then rises to the caption. The server-rendered first frame (.lh-first) is laid out by CSS in exactly this
      // band, so the canvas takes over without a shift.
      const top = lerp(lay.subBottom, lay.capBottom, span(p, BAND_RISE[0], BAND_RISE[1])) + BAND_GAP
      let bottom = H - BOTTOM_RESERVE
      if (ctaOn) bottom = Math.min(bottom, lay.ctaTop - BAND_GAP)
      const bandH = Math.max(0, bottom - top)
      // Desktop opening: the closed laptop is held to ~60% of the width under the headline, growing as it opens.
      const bandW = phone ? W - 24 : Math.min(W - 32, lerp(W * 0.62, W - 32, span(p, 0.1, 0.28)))
      // Phones: the final line-up sits low in its band (the empty space goes above, under the caption).
      const align = phone ? lerp(0.5, 0.72, span(p, 0.8, 0.95)) : 0.5
      const fit = (k: number): Fit => {
        const b = f[k]
        const s = Math.min(bandW / b.w, bandH / b.h)
        return { s, tx: W / 2 - (b.x + b.w / 2) * s, ty: top + (bandH - b.h * s) * align - b.y * s }
      }
      // Every frame is placed in the shared render frame with one transform, so two neighbours always line up and
      // cross-fade exactly. 'lighter' adds premultiplied pixels: a·(1−t) + b·t, a true blend of transparent frames.
      const put = (k: number, alpha: number, T: Fit) => {
        const img = frames[k]
        if (!img || alpha <= 0) return
        const b = f[k]
        g.globalAlpha = alpha
        g.drawImage(img, T.tx + b.x * T.s, T.ty + b.y * T.s, b.w * T.s, b.h * T.s)
      }
      // Frames are dense where things move, so drawing the nearest one is smooth; blending neighbours ghosted the lid
      // and the phone whenever the pose changed between them.
      const lo = reduce ? staticIdx : idxAt(clamp(p))
      const hi = reduce ? lo : Math.min(lo + 1, N - 1)
      let k = hi > lo && (p - f[lo].p) / (f[hi].p - f[lo].p) >= 0.5 ? hi : lo
      if (!frames[k]) {
        k = nearestFrame(k)
        if (k < 0) return
      }
      put(k, 1, fit(k))
      g.globalAlpha = 1
      markFirst()
      if (trace) trace.push({ t: performance.now(), y: window.scrollY, p, lo: k, frac: 0 })
    }

    const readScroll = () => {
      const r = story.getBoundingClientRect()
      target = clamp(-r.top / (r.height - window.innerHeight))
      if (target > 0.002 && requested.size) loadRest()
      if (restStarted) pump()
      kick()
    }
    const onResize = () => { measure(); kick() }
    document.fonts?.ready.then(() => { if (!disposed) onResize() })

    frame = (now: number) => {
      if (!visible || disposed) { running = false; return }
      const dt = lastT ? Math.min(64, now - lastT) : 16
      lastT = now
      const prevP = progress
      // Critically damped follow, frame-rate independent: ~37% of the gap per 16 ms (τ ≈ 35 ms) — glued to the
      // scroll, with just enough smoothing to hide wheel steps.
      progress = progress < 0 || reduce ? target : progress + (target - progress) * (1 - Math.exp(-dt / 35))
      // Snap the last sub-pixel of easing so the loop can go idle instead of redrawing forever.
      if (Math.abs(target - progress) < 2e-4) progress = target
      const p = progress
      const moved = Math.abs(p - prevP) > 1e-5

      if (moved || dirty) {
        const fade = reduce ? (p > COPY_FADE[0] ? 1 : 0) : span(p, COPY_FADE[0], COPY_FADE[1])
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
        draw(p, ctaOpacity > 0.05)
        dirty = false
      }
      // Render on demand: once settled, stop the loop until scroll, resize or a frame load wakes it.
      if (!moved && !dirty && progress === target) { running = false; return }
      raf = requestAnimationFrame((n) => frame(n))
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
      running = false
      if (visible) {
        dirty = true
        kick()
      }
    })
    io.observe(stage)

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', onResize)
    measure()
    readScroll()
    kick()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      navIo.disconnect()
      root.dataset.navTone = ''
      delete stage.dataset.ready
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', later)
    }
  }, [t, desktop, mobile])

  return (
    <section ref={storyRef} className={`lh-story${reduced ? ' lh-story-reduced' : ''}`} aria-labelledby="hero-title">
      <div ref={stageRef} className="lh-stage">
        {fallback && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/portfolio/tj-flowers.jpg" alt="TJ Flowers Shopify store" className="lh-fallback" />
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
          {firstFrame}
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
