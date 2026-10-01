// The hero's scroll player: loaded on demand after first render, so none of it counts toward first-load JS.
import { BAND_RISE, CAPTION_RANGES, COPY_FADE, OPENING_END, PHONE_MQ, PIN_END, REDUCED_P, type SeqMeta, type SeqSet, seqSrc } from './lumosStory'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => t * t * (3 - 2 * t)
const span = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)))

// Room kept clear at the bottom of the stage: CTA / pinned pill, sticky KakaoTalk bar and the chat launcher.
// Mirrored in the .lh-copy padding-bottom so the server-rendered first frame sits in the same band.
const BOTTOM_RESERVE = 150
const BAND_GAP = 16

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

export type LumosMount = {
  story: HTMLElement
  stage: HTMLElement
  canvas: HTMLCanvasElement
  copy: HTMLElement | null
  sub: HTMLElement | null
  cta: HTMLElement | null
  pill: HTMLElement | null
  hint: HTMLElement | null
  caps: (HTMLElement | null)[]
  desktop: SeqSet
  mobile: SeqSet
  onFallback: () => void
}

export function mountLumos({ story, stage, canvas, copy, sub, cta, pill, hint, caps, desktop, mobile, onFallback }: LumosMount) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const phone = window.matchMedia(PHONE_MQ).matches
    // Touch scrolling (incl. iOS momentum) is already smooth: map it straight to frames, no easing lag.
    const touch = window.matchMedia('(pointer: coarse)').matches
    const set = phone ? mobile : desktop
    const N = set.count
    // Decoded-pixel budgets (MB). The opening segment is pinned (decoded once, never evicted) within PIN_MB; the
    // sliding window over the rest of the story gets WINDOW_MB on top.
    const PIN_MB = phone ? 90 : 200
    const WINDOW_MB = phone ? 40 : 64
    const BASE_LEAD = phone ? 12 : 16
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
    let frame: (now: number) => void = () => {}
    const kick = () => {
      if (running || !visible || disposed) return
      running = true
      lastT = 0
      raf = requestAnimationFrame((n) => frame(n))
    }

    // ── Frames ──────────────────────────────────────────────────
    // Encoded bytes for the whole set stay in memory (a few MB); only a window of frames around the current one is
    // decoded, as ImageBitmaps made off the main thread. drawImage never meets an undecoded image, and the decoded
    // set stays small enough that WebKit never evicts and re-decodes it mid-scroll.
    const blobs: (Blob | null)[] = Array(N).fill(null)
    const bitmaps: (ImageBitmap | HTMLImageElement | null)[] = Array(N).fill(null)
    const decoding = new Set<number>()
    let meta: SeqMeta | null = null
    let staticIdx = 0
    let shownFirst = false
    let ext: 'avif' | 'webp' = 'webp'
    let cur = 0
    let dir = 1
    let pNow = 0
    // WebKit (Safari, and every iOS browser) decodes createImageBitmap(blob) on the main thread, so there frames go
    // through <img>.decode(), which it does off-thread; Chromium/Firefox get GPU-ready ImageBitmaps.
    const ua = navigator.userAgent
    const webkit = /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Edg\//.test(ua)
    const canBitmap = !webkit && typeof createImageBitmap === 'function'
    // One object URL per downloaded frame, kept for the page's life, so a frame that left the window re-decodes
    // from memory without a new request.
    const urls: (string | null)[] = Array(N).fill(null)

    // Last frame whose p ≤ the given progress (frames are motion-weighted, so index ≠ progress).
    const idxAt = (p: number) => {
      if (!meta) return 0
      const f = meta.f
      let lo = 0
      let hi = N - 1
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1
        if (f[mid].p <= p) lo = mid
        else hi = mid - 1
      }
      return lo
    }
    const pickIdx = (p: number) => {
      if (!meta) return 0
      if (reduce) return staticIdx
      const f = meta.f
      const lo = idxAt(clamp(p))
      const hi = Math.min(lo + 1, N - 1)
      return hi > lo && (p - f[lo].p) / (f[hi].p - f[lo].p) >= 0.5 ? hi : lo
    }

    const decodeBlob = async (i: number, b: Blob): Promise<ImageBitmap | HTMLImageElement> => {
      if (canBitmap) {
        try { return await createImageBitmap(b) } catch { /* fall through to <img> */ }
      }
      const im = new Image()
      im.decoding = 'async'
      if (!urls[i]) urls[i] = URL.createObjectURL(b)
      im.src = urls[i]!
      await im.decode()
      return im
    }
    const release = (i: number) => {
      const bm = bitmaps[i]
      if (bm && 'close' in bm) bm.close()
      // Dropping the element (and its src) lets the engine free the decoded pixels.
      else if (bm) bm.src = ''
      bitmaps[i] = null
    }
    const bytesOf = (i: number) => (meta ? meta.f[i].w * meta.f[i].h * 4 : 0)

    // Pinned opening frames: every other frame up to PIN_END first (so the nearest resident frame is never more than
    // one away), then the rest in story order while the budget lasts. Decoded right after load, never released.
    const pinned = new Uint8Array(N)
    const choosePinned = () => {
      if (!meta || reduce) return
      const f = meta.f
      const op: number[] = []
      for (let i = 0; i < N && f[i].p <= PIN_END; i++) op.push(i)
      if (!op.length) return
      let used = 0
      const budget = PIN_MB * 1048576
      const add = (i: number) => { if (!pinned[i]) { pinned[i] = 1; used += bytesOf(i) } }
      for (let j = 0; j < op.length; j += 2) add(op[j])
      add(op[op.length - 1])
      for (const i of op) {
        if (pinned[i]) continue
        if (used + bytesOf(i) > budget) break
        add(i)
      }
    }

    // Sliding window over the rest: a short tail behind and, ahead, as far as the reader will travel in ~300 ms at
    // the current scroll speed, nearest-first in the direction of travel, capped at WINDOW_MB of non-pinned frames.
    let vel = 0 // frames per ms, smoothed
    const behind = 6
    const inWin = new Uint8Array(N)
    const order: number[] = []
    const planWindow = () => {
      inWin.fill(0)
      order.length = 0
      if (reduce) { inWin[staticIdx] = 1; order.push(staticIdx); return }
      const lead = Math.max(BASE_LEAD, Math.ceil(vel * 300))
      const budget = WINDOW_MB * 1048576
      let used = 0
      const take = (k: number) => {
        if (k < 0 || k >= N || inWin[k]) return true
        inWin[k] = 1
        order.push(k)
        if (pinned[k]) return true
        used += bytesOf(k)
        return used <= budget
      }
      take(cur)
      for (let d = 1; d <= Math.max(lead, behind); d++) {
        if (d <= lead && !take(cur + d * dir)) break
        if (d <= behind && !take(cur - d * dir)) break
      }
      // Pinned frames the reader can reach, nearest first, after the window proper.
      for (let d = 1; d < N; d++) {
        for (const k of [cur + d * dir, cur - d * dir]) if (k >= 0 && k < N && pinned[k] && !inWin[k]) { inWin[k] = 1; order.push(k) }
      }
    }
    const keep = (i: number) => pinned[i] === 1 || inWin[i] === 1
    // Decodes in flight (off the main thread); enough to stay ahead without competing with drawing.
    const DECODERS = 2
    const pumpDecode = () => {
      if (disposed || !meta) return
      planWindow()
      for (let i = 0; i < N; i++) if (bitmaps[i] && !keep(i)) release(i)
      for (let j = 0; j < order.length && decoding.size < DECODERS; j++) {
        const k = order[j]
        if (bitmaps[k] || decoding.has(k) || !blobs[k]) continue
        decoding.add(k)
        decodeBlob(k, blobs[k]!).then((bm) => {
          decoding.delete(k)
          if (disposed || !keep(k)) { if ('close' in bm) bm.close(); else bm.src = ''; return }
          bitmaps[k] = bm
          if (k === pickIdx(pNow) || !shownFirst) dirty = true
          kick()
          pumpDecode()
        }).catch(() => { decoding.delete(k) })
      }
    }

    // Fetch order: the whole opening segment first, in order, then outwards from the reader; 4 requests at a time.
    const requested = new Set<number>()
    let active = 0
    let restStarted = false
    const nextIndex = () => {
      if (!meta) return -1
      const f = meta.f
      for (let k = 0; k < N && f[k].p <= OPENING_END; k++) if (!requested.has(k)) return k
      for (let d = 0; d < N; d++) {
        for (const k of [cur + d, cur - d]) if (k >= 0 && k < N && !requested.has(k)) return k
      }
      return -1
    }
    const fetchFrame = (i: number) =>
      fetch(seqSrc(set.dir, i, ext), { priority: i === 0 ? 'high' : 'low' } as RequestInit)
        .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.blob() })
        .then((b) => {
          if (disposed) return
          blobs[i] = b
          if (keep(i)) pumpDecode()
        })
    const pump = () => {
      while (active < 4 && !disposed) {
        const next = nextIndex()
        if (next < 0) {
          if (!active) performance.mark('lumos:all-frames')
          return
        }
        requested.add(next)
        active++
        fetchFrame(next).catch(() => {}).finally(() => { active--; pump() })
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
        choosePinned()
        dirty = true
        kick()
      })
    Promise.all([pickedAvif(stage), metaReady]).then(([ok]) => {
      if (disposed) return
      ext = ok ? 'avif' : 'webp'
      const first = reduce ? staticIdx : 0
      requested.add(first)
      // Frame 0 is already on screen as the server-rendered <picture>; its bytes come from the HTTP cache.
      fetchFrame(first).catch(() => { if (!disposed) onFallback() })
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      later = () => { idle ? idle(() => loadRest()) : setTimeout(loadRest, 300) }
      if (document.readyState === 'complete') later()
      else window.addEventListener('load', later, { once: true })
      if (target > 0.002) loadRest()
    }).catch(() => { if (!disposed) onFallback() })

    // Nearest decoded frame (below first, then above), so a fast fling shows the closest pose instead of a blank.
    const nearestFrame = (i: number) => {
      for (let d = 0; d < N; d++) {
        if (i - d >= 0 && bitmaps[i - d]) return i - d
        if (i + d < N && bitmaps[i + d]) return i + d
      }
      return -1
    }

    // ── Layout ──────────────────────────────────────────────────
    // Measured on load, font load and width/orientation change only. iOS fires resize when the toolbar collapses
    // or expands mid-scroll; the stage is 100svh (stable), so those height-only resizes are ignored: no canvas
    // reallocation and no re-layout while the reader is scrolling.
    const offsetIn = (el: HTMLElement | null) => {
      let y = 0
      let n: HTMLElement | null = el
      while (n && n !== stage) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null }
      return y
    }
    let lay = { W: 0, H: 0, subBottom: 0, capBottom: 0, ctaTop: 0, storyTop: 0, pin: 1 }
    let lastW = -1
    let reallocs = 0
    const measure = () => {
      const W = stage.clientWidth
      const H = stage.clientHeight
      let capBottom = 0
      caps.forEach((el) => { if (el) capBottom = Math.max(capBottom, el.offsetTop + el.offsetHeight) })
      let top = 0
      let n: HTMLElement | null = story
      while (n) { top += n.offsetTop; n = n.offsetParent as HTMLElement | null }
      lay = {
        W,
        H,
        subBottom: sub ? offsetIn(sub) + sub.offsetHeight : H * 0.5,
        capBottom,
        ctaTop: cta ? offsetIn(cta) : H,
        storyTop: top,
        // Scroll distance over which the stage is pinned: story height minus the (stable) stage height.
        pin: Math.max(1, story.offsetHeight - H),
      }
      const dpr = Math.min(window.devicePixelRatio || 1, set.maxDpr)
      const cw = Math.round(W * dpr)
      const ch = Math.round(H * dpr)
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
        reallocs++
      }
      lastW = window.innerWidth
      dirty = true
    }
    if (trace) {
      const w = window as Window & { __lumosReallocs?: () => number; __lumosMem?: () => object }
      w.__lumosReallocs = () => reallocs
      // Resident decoded pixels (MB): pinned opening frames plus the sliding window.
      w.__lumosMem = () => {
        let pin = 0, win = 0, pinCount = 0, pinDecoded = 0
        for (let i = 0; i < N; i++) {
          if (pinned[i]) { pinCount++; if (bitmaps[i]) { pinDecoded++; pin += bytesOf(i) } }
          else if (bitmaps[i]) win += bytesOf(i)
        }
        const mb = (v: number) => Math.round((v / 1048576) * 10) / 10
        return { pinMB: mb(pin), winMB: mb(win), totalMB: mb(pin + win), pinCount, pinDecoded }
      }
    }

    const markFirst = () => {
      if (shownFirst) return
      shownFirst = true
      stage.dataset.ready = '1'
      performance.mark('lumos:first-frame')
    }

    // Last drawn state: skip the draw entirely when neither the frame nor its placement changed.
    let drawnK = -1
    let drawnRect = ''
    const g = canvas.getContext('2d')
    const draw = (p: number, ctaOn: boolean) => {
      if (!g || !meta) return
      if (!lay.W) measure()
      const { W, H } = lay
      const f = meta.f
      // The product band sits between the copy/caption block and the bottom reserve (CTA, pill, chat launcher), so
      // nothing overlaps at any viewport. The server-rendered first frame (.lh-first) sits in the same band.
      const top = lerp(lay.subBottom, lay.capBottom, span(p, BAND_RISE[0], BAND_RISE[1])) + BAND_GAP
      let bottom = H - BOTTOM_RESERVE
      if (ctaOn) bottom = Math.min(bottom, lay.ctaTop - BAND_GAP)
      const bandH = Math.max(0, bottom - top)
      // Desktop opening: the closed laptop is held to ~60% of the width under the headline, growing as it opens.
      const bandW = phone ? W - 24 : Math.min(W - 32, lerp(W * 0.62, W - 32, span(p, 0.1, 0.28)))
      // Phones: the final line-up sits low in its band (the empty space goes above, under the caption).
      const align = phone ? lerp(0.5, 0.72, span(p, 0.8, 0.95)) : 0.5
      const want = pickIdx(p)
      let k = want
      if (!bitmaps[k]) {
        k = nearestFrame(k)
        if (k < 0) return
      }
      const b = f[k]
      const s = Math.min(bandW / b.w, bandH / b.h)
      const q = (v: number) => Math.round(v * 4) / 4
      const x = q(W / 2 - (b.w * s) / 2)
      const y = q(top + (bandH - b.h * s) * align)
      const w = q(b.w * s)
      const h = q(b.h * s)
      const rect = `${x},${y},${w},${h}`
      if (k === drawnK && rect === drawnRect) return
      const dpr = canvas.width / (W || 1)
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      g.imageSmoothingEnabled = true
      // Phones draw the 860px frames near 1:1, where bilinear looks the same as 'high' and costs WebKit far less per frame.
      g.imageSmoothingQuality = phone ? 'low' : 'high'
      g.clearRect(0, 0, W, H)
      g.drawImage(bitmaps[k]!, x, y, w, h)
      drawnK = k
      drawnRect = rect
      markFirst()
      if (trace) trace.push({ t: performance.now(), y: window.scrollY, p, k, want })
    }

    // ── Chrome around the frames: written only when a value actually changes ──
    let lastFade = -1
    let lastCta = -1
    let lastCtaHidden: boolean | null = null
    let lastPill: boolean | null = null
    let lastHint = -1
    let lastBeat = -2
    const q2 = (v: number) => Math.round(v * 100) / 100
    const applyChrome = (p: number) => {
      const fade = q2(reduce ? (p > COPY_FADE[0] ? 1 : 0) : span(p, COPY_FADE[0], COPY_FADE[1]))
      if (fade !== lastFade && copy) {
        lastFade = fade
        copy.style.opacity = String(1 - fade)
        copy.style.transform = reduce ? '' : `translate3d(0,${-fade * 40}px,0) scale(${1 - fade * 0.06})`
      }
      const ctaOpacity = q2(1 - (reduce ? (p > 0.04 ? 1 : 0) : span(p, 0.04, 0.12)))
      if (ctaOpacity !== lastCta && cta) {
        lastCta = ctaOpacity
        cta.style.opacity = String(ctaOpacity)
      }
      const ctaHidden = ctaOpacity < 0.05
      if (ctaHidden !== lastCtaHidden) { lastCtaHidden = ctaHidden; setHidden(cta, ctaHidden) }
      // Persistent CTA: takes over once the hero buttons are gone, leaves when the story is done.
      const pillOn = ctaHidden && p < 0.985
      if (pillOn !== lastPill) {
        lastPill = pillOn
        pill?.classList.toggle('lh-pill-on', pillOn)
        setHidden(pill, !pillOn)
      }
      const hintOp = q2(1 - span(p, 0, 0.05))
      if (hintOp !== lastHint && hint) { lastHint = hintOp; hint.style.opacity = String(hintOp) }
      const beat = CAPTION_RANGES.findIndex(([from, to]) => p >= from && p < to)
      if (beat !== lastBeat) {
        lastBeat = beat
        caps.forEach((el, i) => {
          if (!el) return
          el.classList.toggle('lh-on', i === beat)
          el.setAttribute('aria-hidden', i === beat ? 'false' : 'true')
        })
      }
      return !ctaHidden
    }

    // Progress straight from scrollY and the cached story geometry: no layout read per frame.
    const readTarget = () => clamp((window.scrollY - lay.storyTop) / lay.pin)
    const onScroll = () => {
      if (!restStarted && requested.size && window.scrollY > lay.storyTop + 2) loadRest()
      kick()
    }
    const onResize = () => {
      // Height-only resizes on touch devices are the mobile toolbar collapsing/expanding: ignore them.
      if (touch && window.innerWidth === lastW) return
      measure()
      kick()
    }
    const onOrient = () => { lastW = -1; onResize() }
    document.fonts?.ready.then(() => { if (!disposed) { measure(); kick() } })

    frame = (now: number) => {
      if (!visible || disposed) { running = false; return }
      const dt = lastT ? Math.min(64, now - lastT) : 16
      lastT = now
      target = readTarget()
      const prevP = progress
      // Touch: glued to the finger. Mouse wheel: a very light follow (τ ≈ 24 ms) that only hides wheel notches.
      progress = progress < 0 || reduce || touch ? target : progress + (target - progress) * (1 - Math.exp(-dt / 24))
      if (Math.abs(target - progress) < 2e-4) progress = target
      const p = progress
      pNow = p
      const moved = Math.abs(p - prevP) > 1e-5
      if (moved || dirty) {
        dirty = false
        const t0 = trace ? performance.now() : 0
        const k = pickIdx(p)
        // Frames per ms, smoothed: sets how far ahead the decode window reaches.
        vel = vel * 0.6 + (Math.abs(k - cur) / dt) * 0.4
        if (k !== cur) { dir = k > cur ? 1 : -1; cur = k; pumpDecode() }
        const ctaOn = applyChrome(p)
        draw(p, ctaOn)
        if (trace) trace.push({ work: performance.now() - t0 })
      }
      if (!moved && !dirty && progress === target) { running = false; vel = 0; return }
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

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrient)
    measure()
    target = readTarget()
    kick()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      navIo.disconnect()
      root.dataset.navTone = ''
      delete stage.dataset.ready
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrient)
      window.removeEventListener('load', later)
      for (let i = 0; i < N; i++) { release(i); if (urls[i]) URL.revokeObjectURL(urls[i]!) }
    }
}
