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

    let lenis: any = null
    let cancelled = false
    let tick: ((time: number) => void) | null = null
    let onLenisScroll: (() => void) | null = null

    // Defer Lenis import until after first paint so it never blocks LCP.
    const start = () => {
      if (cancelled) return
      Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
          if (cancelled) return
          gsap.registerPlugin(ScrollTrigger)

          lenis = new Lenis({
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            smoothWheel: true,
            syncTouch: false,
          })

          // Lenis hijacks scroll, so ScrollTrigger never sees it. Feed it every
          // Lenis frame, and let GSAP's ticker (not a second RAF loop) drive
          // Lenis — otherwise pinned/scrubbed sections lag a frame behind.
          onLenisScroll = () => ScrollTrigger.update()
          lenis.on('scroll', onLenisScroll)
          tick = (time: number) => lenis.raf(time * 1000)
          gsap.ticker.add(tick)
          gsap.ticker.lagSmoothing(0)
          ScrollTrigger.refresh()
        }
      )
    }

    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(start, { timeout: 1500 })
    } else {
      setTimeout(start, 800)
    }

    return () => {
      cancelled = true
      if (tick) import('gsap').then(({ gsap }) => gsap.ticker.remove(tick!))
      if (lenis && onLenisScroll) lenis.off('scroll', onLenisScroll)
      lenis?.destroy()
    }
  }, [])

  return null
}
