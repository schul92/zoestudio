'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'span' | 'div'
}

/**
 * A single line of content clipped by a row; rises from below on enter.
 * Wrap each headline line independently for a stagger. Safe for nested
 * inline content (italic, color spans).
 */
export default function MaskReveal({
  children,
  delay = 0,
  className = '',
  as = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag: any = as
  return (
    <Tag ref={ref} className={`mask-row ${className} ${inView ? 'in' : ''}`.trim()}>
      <span className="mask-rise" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </Tag>
  )
}
