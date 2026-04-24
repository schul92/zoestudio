'use client'

import { useEffect, useRef, useState } from 'react'

const LABELS: Record<string, string> = {
  view: 'View',
  link: '↗',
  drag: 'Drag',
  arrow: '→',
  hide: '',
}

/**
 * Editorial cursor — a small ink dot that grows into a labeled disc when
 * hovering elements marked with [data-cursor]. Supported modes:
 * data-cursor="view" | "link" | "drag" | "hide" | custom label string.
 */
export default function CursorEditorial() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only render the cursor DOM on devices with a fine pointer (mouse).
    // On touch/mobile the ring would otherwise float as a phantom circle in
    // the top-left corner since no pointermove ever fires to transform it.
    if (typeof window !== 'undefined') {
      setSupported(
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      )
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (typeof window === 'undefined') return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let dx = mx, dy = my
    let rx = mx, ry = my
    let rafId = 0

    const overInteractive = (t: EventTarget | null) => {
      if (!(t instanceof Element)) return null

      // Text inputs: hide the editorial cursor so the native I-beam takes over.
      const textInput = t.closest(
        'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'
      )
      if (textInput) return { label: '', mode: 'hide' as const }

      const el = t.closest('[data-cursor], a, button, select, [role="button"]')
      if (!el) return null
      const raw = el.getAttribute('data-cursor')
      if (raw === 'hide') return { label: '', mode: 'hide' as const }
      if (raw && LABELS[raw] !== undefined) return { label: LABELS[raw], mode: raw }
      if (raw) return { label: raw, mode: 'custom' as const }
      return { label: '', mode: 'link' as const }
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!dot.classList.contains('on')) dot.classList.add('on')
      if (!ring.classList.contains('on')) ring.classList.add('on')
    }

    const onOver = (e: PointerEvent) => {
      const hit = overInteractive(e.target)
      if (hit) {
        ring.classList.add('big')
        // Filled black disc only when there's a label to display. Otherwise
        // stay as a small subtle ring so nav/text links remain legible.
        ring.classList.toggle('labeled', !!hit.label)
        if (hit.mode === 'hide') {
          ring.classList.add('hide')
          dot.classList.add('hide')
        } else {
          ring.classList.remove('hide')
          dot.classList.remove('hide')
        }
        label.textContent = hit.label || ''
        label.classList.toggle('on', !!hit.label)
      } else {
        ring.classList.remove('big', 'labeled', 'hide')
        dot.classList.remove('hide')
        label.textContent = ''
        label.classList.remove('on')
      }
    }

    const onLeave = () => {
      dot.classList.remove('on')
      ring.classList.remove('on')
    }
    const onEnter = () => {
      dot.classList.add('on')
      ring.classList.add('on')
    }

    const tick = () => {
      dx += (mx - dx) * 0.32
      dy += (my - dy) * 0.32
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (dot) {
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      }
      if (ring) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(tick)
    }

    document.body.classList.add('has-editorial-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.classList.remove('has-editorial-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
    }
  }, [mounted])

  // Render nothing on touch devices — no mousemove will ever transform the
  // ring, so it would sit as a stray circle at (0,0).
  if (!mounted || !supported) return null

  return (
    <>
      <div ref={dotRef} className="ed-dot" aria-hidden />
      <div ref={ringRef} className="ed-ring" aria-hidden>
        <span ref={labelRef} className="ed-label" />
      </div>
    </>
  )
}
