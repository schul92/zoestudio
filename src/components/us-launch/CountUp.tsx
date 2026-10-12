'use client'

import { useEffect, useRef } from 'react'

/**
 * Renders the final number on the server (SEO, no-JS, reduced motion) and counts up from 0
 * the first time it scrolls into view. Follows the site's reveal contract: only when
 * <html data-rv> is set, and never for numbers already on screen at load (no flash).
 */
export default function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !document.documentElement.hasAttribute('data-rv')) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return

    const fmt = (n: number) => n.toLocaleString('en-US')
    el.textContent = fmt(0)
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          // ease-out quart: fast start, gentle landing on the final figure
          el.textContent = fmt(Math.round(value * (1 - Math.pow(1 - p, 4))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = fmt(value)
    }
  }, [value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('en-US')}
    </span>
  )
}
