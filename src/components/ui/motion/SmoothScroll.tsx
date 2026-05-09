'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Skip on touch devices, reduced-motion, save-data, and small screens.
    // Smooth scroll on mobile is a perf cost with no UX upside — Lenis ships
    // ~7KB and runs a RAF loop that drains battery.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const smallScreen = window.innerWidth < 1024
    const conn = (navigator as any).connection
    const saveData = conn?.saveData === true
    if (reduced || coarsePointer || smallScreen || saveData) return

    let rafId = 0
    let lenis: any = null
    let cancelled = false

    // Defer Lenis import until after first paint so it never blocks LCP.
    const start = () => {
      if (cancelled) return
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return
        lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
          smoothWheel: true,
          syncTouch: false,
        })
        const raf = (time: number) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      })
    }

    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(start, { timeout: 1500 })
    } else {
      setTimeout(start, 800)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return null
}
