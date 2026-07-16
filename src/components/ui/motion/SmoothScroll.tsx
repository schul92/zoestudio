'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Landing on /#contact must actually arrive at #contact. The browser's
    // native hash jump happens against the pre-hydration layout; ScrollTrigger
    // then inserts pin spacers that change every offset below the hero, and on
    // desktop Lenis takes over scrolling — so the native jump lands nowhere.
    // Re-jump once the real layout exists, unless the user has already scrolled.
    let userScrolled = false
    const markScrolled = () => {
      userScrolled = true
    }
    window.addEventListener('wheel', markScrolled, { once: true, passive: true })
    window.addEventListener('touchstart', markScrolled, { once: true, passive: true })

    const scrollToHash = (viaLenis?: any) => {
      if (userScrolled || !window.location.hash) return
      let el: Element | null = null
      try {
        el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      } catch {
        return
      }
      if (!el) return
      if (viaLenis) viaLenis.scrollTo(el, { immediate: true, force: true })
      else el.scrollIntoView()
    }

    // Non-Lenis devices (mobile/tablet): jump after the full load settles.
    const onLoad = () => setTimeout(() => scrollToHash(), 60)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

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
          // Desktop: layout is now final and Lenis owns scrolling — re-run the
          // hash jump through Lenis so it is not immediately overridden.
          scrollToHash(lenis)
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
      window.removeEventListener('wheel', markScrolled)
      window.removeEventListener('touchstart', markScrolled)
      window.removeEventListener('load', onLoad)
      if (tick) import('gsap').then(({ gsap }) => gsap.ticker.remove(tick!))
      if (lenis && onLenisScroll) lenis.off('scroll', onLenisScroll)
      lenis?.destroy()
    }
  }, [])

  return null
}
