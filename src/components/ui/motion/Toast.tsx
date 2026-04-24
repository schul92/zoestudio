'use client'

import { useEffect, useState } from 'react'

export type ToastKind = 'success' | 'error' | 'info'

export type ToastMessage = {
  id: number
  kind: ToastKind
  title: string
  body?: string
}

export default function Toast({
  message,
  onDismiss,
  duration = 6000,
}: {
  message: ToastMessage | null
  onDismiss: () => void
  duration?: number
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 500)
    }, duration)
    return () => clearTimeout(t)
  }, [message, duration, onDismiss])

  if (!message) return null

  const borderColor =
    message.kind === 'success'
      ? 'border-gold'
      : message.kind === 'error'
      ? 'border-red-500'
      : 'border-ink'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-24 right-6 md:right-10 z-[9999] max-w-[360px] transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}
    >
      <div className={`bg-ivory/95 backdrop-blur-xl border-l-2 ${borderColor} pl-5 pr-6 py-5 shadow-[0_30px_60px_-20px_rgba(20,20,20,0.25)] rounded-[2px]`}>
        <div className="flex items-start gap-3">
          <span
            className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
              message.kind === 'success'
                ? 'bg-gold animate-pulse'
                : message.kind === 'error'
                ? 'bg-red-500'
                : 'bg-ink'
            }`}
          />
          <div className="flex-1">
            <p className="font-display italic font-light text-lg text-ink leading-tight">
              {message.title}
            </p>
            {message.body && (
              <p className="mt-1.5 text-[13px] text-graphite leading-[1.55]">{message.body}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setVisible(false)
              setTimeout(onDismiss, 500)
            }}
            aria-label="Dismiss"
            data-cursor="hide"
            className="w-6 h-6 -mt-1 flex items-center justify-center text-ash hover:text-ink transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
