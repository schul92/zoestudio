'use client'

import { useEffect, useRef } from 'react'

/**
 * Fixed 2px gold reading-progress bar at the top of the viewport.
 * Width = scroll percentage. rAF-throttled passive scroll listener,
 * writes directly to the DOM node (no re-renders, no context).
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
    >
      <div ref={barRef} className="h-full bg-gold" style={{ width: '0%' }} />
    </div>
  )
}
