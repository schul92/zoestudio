'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Adds `.in` class to the host element when it enters the viewport.
 * Pairs with CSS classes like `.mask-row`, `.hair-draw`, `.reveal`.
 */
export default function InView({
  children,
  as: Tag = 'div',
  className = '',
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  delay = 0,
}: {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            const t = setTimeout(() => setInView(true), delay)
            return () => clearTimeout(t)
          }
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once, delay])

  const Node = Tag as any
  return (
    <Node ref={ref} className={`${className} ${inView ? 'in' : ''}`.trim()}>
      {children}
    </Node>
  )
}
