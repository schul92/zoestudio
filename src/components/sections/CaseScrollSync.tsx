'use client'

import { useEffect } from 'react'

/**
 * Marks the CaseScroll screenshot with the step being read (data-step 1–3), so the CSS in globals.css can take it
 * from faded ("invisible") through a scan ("the rebuild") to full colour ("the result"). Desktop only, where the
 * screenshot is sticky beside the steps; elsewhere, and without JS, the frame keeps its finished state.
 */
export default function CaseScrollSync() {
  useEffect(() => {
    const frame = document.querySelector<HTMLElement>('#case-study .cs-frame')
    const steps = Array.from(document.querySelectorAll<HTMLElement>('#case-study [data-cs-step]'))
    if (!frame || !steps.length || !('IntersectionObserver' in window)) return

    const desktop = window.matchMedia('(min-width: 1024px)')
    let io: IntersectionObserver | null = null

    const start = () => {
      io?.disconnect()
      if (!desktop.matches) {
        frame.removeAttribute('data-step')
        return
      }
      // Start from "the problem" so the story reads forward the first time the frame comes into view.
      if (!frame.hasAttribute('data-step')) frame.setAttribute('data-step', '1')
      // A thin band across the middle of the viewport: the step crossing it is the one being read.
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) frame.setAttribute('data-step', (e.target as HTMLElement).dataset.csStep ?? '3')
          }
        },
        { rootMargin: '-45% 0px -45% 0px' }
      )
      steps.forEach((s) => io!.observe(s))
    }

    start()
    desktop.addEventListener('change', start)
    return () => {
      io?.disconnect()
      desktop.removeEventListener('change', start)
    }
  }, [])

  return null
}
