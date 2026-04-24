'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Editorial count-up. Supports integer and decimal targets, and preserves
 * a leading sign / trailing non-numeric chunk automatically.
 * If the value isn't numeric (e.g. "24/7"), it's rendered as-is.
 */
export default function CountUp({
  value,
  duration = 1800,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [run, setRun] = useState(false)
  const [out, setOut] = useState<string>(isNumeric(value) ? '0' : value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!run) return
    if (!isNumeric(value)) {
      setOut(value)
      return
    }
    const target = parseFloat(value)
    const decimals = (value.split('.')[1] || '').length
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setOut(value)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const n = target * eased
      setOut(decimals ? n.toFixed(decimals) : String(Math.round(n)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, value, duration])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}

function isNumeric(s: string) {
  return /^\d+(\.\d+)?$/.test(s)
}
