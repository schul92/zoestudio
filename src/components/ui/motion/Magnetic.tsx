'use client'

import { useEffect, useRef } from 'react'

/**
 * Wrap any interactive element to give it subtle magnetic pull toward cursor.
 * Translates the child (a .magnet span) up to `strength` px.
 */
export default function Magnetic({
  children,
  strength = 18,
  radius = 140,
  className,
  as: Tag = 'span',
}: {
  children: React.ReactNode
  strength?: number
  radius?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}) {
  const wrapRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        inner.style.transform = `translate3d(0,0,0)`
        return
      }
      const f = 1 - dist / radius
      inner.style.transform = `translate3d(${(dx * strength * f) / radius * 2}px, ${(dy * strength * f) / radius * 2}px, 0)`
    }

    const onLeave = () => {
      inner.style.transform = `translate3d(0,0,0)`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [strength, radius])

  const Wrap = Tag as any
  return (
    <Wrap ref={wrapRef} className={className} style={{ display: 'inline-block' }}>
      <span ref={innerRef} className="magnet" style={{ display: 'inline-block' }}>
        {children}
      </span>
    </Wrap>
  )
}
