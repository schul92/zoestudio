'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Site chatbot widget. Talks to /api/chat, which streams plain text back.
 *
 * Positioning notes — three floating elements share the bottom-right corner:
 *   - KakaoFloatingButton: bottom-6 right-4, z-50, lg-and-up only
 *   - StickyMobileCTA:     full-width bottom bar, z-[80], below lg
 * So this sits above Kakao on desktop and above the CTA bar on mobile.
 *
 * State lives only in this component — no persistence. A reload starts fresh,
 * which is the right default for a support widget on a marketing site.
 */

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING_KO =
  '안녕하세요. 조이루모스입니다. 웹사이트 제작, 가격, 진행 방식 등 궁금한 점을 물어보세요.'
const GREETING_EN =
  "Hi — this is ZOE LUMOS. Ask me about websites, pricing, or how we work."

export default function ChatWidget({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const greeting = isKo ? GREETING_KO : GREETING_EN

  // Keep the newest message in view as tokens arrive.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, streaming])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Cancel any in-flight stream on unmount.
  useEffect(() => () => abortRef.current?.abort(), [])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return

    setError(null)
    setInput('')
    const next: Msg[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        let msg = isKo
          ? '잠시 문제가 있습니다. info@zoelumos.com 으로 문의해 주세요.'
          : 'Something went wrong. Please email info@zoelumos.com.'
        try {
          const j = await res.json()
          if (j?.error) msg = j.error
        } catch {
          /* non-JSON error body — keep the default */
        }
        setError(msg)
        return
      }

      // Append an empty assistant turn, then fill it as chunks arrive.
      setMessages((m) => [...m, { role: 'assistant', content: '' }])
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((m) => {
          const copy = [...m]
          const last = copy[copy.length - 1]
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { ...last, content: last.content + chunk }
          }
          return copy
        })
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setError(
          isKo
            ? '연결이 끊어졌습니다. 다시 시도해 주세요.'
            : 'Connection lost. Please try again.'
        )
      }
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }, [input, messages, streaming, isKo])

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Launcher — sits above the Kakao button on desktop, above the CTA bar on mobile */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={isKo ? '문의 채팅 열기' : 'Open chat'}
          className="fixed right-4 sm:right-6 bottom-24 lg:bottom-24 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#1f1c16] text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b48a43]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={isKo ? '조이루모스 문의 채팅' : 'ZOE LUMOS chat'}
          className="fixed right-4 sm:right-6 bottom-24 lg:bottom-24 z-[90] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white shadow-2xl"
          style={{ height: 'min(560px, calc(100vh - 10rem))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e4ddd0] bg-[#faf7f1] px-4 py-3">
            <div>
              <div className="text-[13px] font-bold tracking-[0.14em] text-[#b48a43]">
                ZOE LUMOS
              </div>
              <div className="mt-0.5 text-[11px] text-[#6b6459]">
                {isKo ? '보통 몇 초 안에 답변합니다' : 'Usually replies in seconds'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={isKo ? '닫기' : 'Close'}
              className="rounded p-1.5 text-[#6b6459] transition-colors hover:bg-[#efe9dd] hover:text-[#1f1c16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b48a43]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            <Bubble role="assistant">{greeting}</Bubble>

            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content || (streaming && i === messages.length - 1 ? <Dots /> : '')}
              </Bubble>
            ))}

            {error && (
              <p className="rounded-lg bg-[#fbe9e7] px-3 py-2 text-[12.5px] leading-relaxed text-[#a8231c]">
                {error}
              </p>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-[#e4ddd0] bg-white px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={2000}
                placeholder={
                  isKo ? '궁금한 점을 입력해 주세요' : 'Ask a question…'
                }
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-lg border border-[#ddd4c4] bg-white px-3 py-2 text-[14px] text-[#1f1c16] placeholder:text-[#9a9284] focus:border-[#b48a43] focus:outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={streaming || !input.trim()}
                aria-label={isKo ? '보내기' : 'Send'}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#b48a43] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b48a43]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-[10.5px] leading-snug text-[#9a9284]">
              {isKo
                ? 'AI 답변입니다. 정확한 상담은 info@zoelumos.com 으로 문의해 주세요.'
                : 'AI-generated. For anything specific, email info@zoelumos.com.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

function Bubble({
  role,
  children,
}: {
  role: 'user' | 'assistant'
  children: React.ReactNode
}) {
  const isUser = role === 'user'
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[#1f1c16] px-3.5 py-2.5 text-[14px] leading-relaxed text-white'
            : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-[#faf7f1] px-3.5 py-2.5 text-[14px] leading-relaxed text-[#1f1c16]'
        }
      >
        {children}
      </div>
    </div>
  )
}

function Dots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b48a43]"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}
