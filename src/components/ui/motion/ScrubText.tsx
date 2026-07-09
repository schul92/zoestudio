'use client'

/**
 * ScrubText — scroll-scrubbed, word-by-word reveal.
 *
 * A statement "lights up" as the reader scrolls it through the viewport:
 * each word ramps from a dim ghost (opacity 0.12) to full ink, driven by
 * ScrollTrigger scrub so the reveal is tied directly to scroll position.
 *
 * Splits on whitespace only (never per character), so it reads correctly
 * for both Korean and English. Compositor-only (opacity) — no layout work.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type ScrubTextProps = {
  children: string
  className?: string
  as?: 'h2' | 'p'
}

export default function ScrubText({
  children,
  className = '',
  as = 'p',
}: ScrubTextProps) {
  const scope = useRef<HTMLElement | null>(null)

  // Split on whitespace, keeping the separators so spacing is preserved
  // exactly. Works for ko + en (never per-character).
  const tokens = (children ?? '').split(/(\s+)/)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const words = gsap.utils.toArray<HTMLElement>('[data-scrub-word]', root)
      if (!words.length) return

      const mm = gsap.matchMedia()

      // Reduced motion: everything at full opacity, no ScrollTrigger.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { opacity: 1 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(words, { opacity: 0.12 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        })

        tl.to(words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.4,
        })

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })
    },
    { scope, dependencies: [children] }
  )

  const Tag = as

  return (
    <Tag ref={scope as never} className={`whitespace-pre-wrap ${className}`}>
      {tokens.map((tok, i) =>
        /\s+/.test(tok) || tok === '' ? (
          // real whitespace text node — keeps native wrapping / no layout shift
          tok
        ) : (
          <span
            key={i}
            data-scrub-word
            className="inline-block will-change-[opacity]"
          >
            {tok}
          </span>
        )
      )}
    </Tag>
  )
}
