'use client'

import { useEffect, useState, type ReactNode } from 'react'

// Mounts its children after the visitor's first interaction (pointer, scroll, key)
// or once the browser is idle after load — whichever comes first — so chat and
// analytics never compete with the first paint on a phone.
export default function AfterInteraction({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return
    let idleId: number | undefined
    let timer: ReturnType<typeof setTimeout> | undefined
    const events = ['pointerdown', 'scroll', 'keydown'] as const
    const go = () => setReady(true)
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }))

    const scheduleIdle = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(go, { timeout: 8000 })
      else timer = setTimeout(go, 4000)
    }
    if (document.readyState === 'complete') scheduleIdle()
    else window.addEventListener('load', scheduleIdle, { once: true })

    return () => {
      events.forEach((e) => window.removeEventListener(e, go))
      window.removeEventListener('load', scheduleIdle)
      const w = window as Window & { cancelIdleCallback?: (id: number) => void }
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timer) clearTimeout(timer)
    }
  }, [ready])

  return ready ? <>{children}</> : null
}
