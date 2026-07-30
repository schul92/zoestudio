'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Site chatbot widget. Talks to /api/chat, which streams plain text back.
 *
 * Positioning notes. The site's z-index stack, highest first:
 *   - HeroNew intro veil    z-[200]  pointer-events-none, animates to opacity 0
 *   - Header (all variants) z-[100]  fixed top-0
 *   - Mobile nav panel      z-[95]
 *   - Mobile nav overlay    z-[90]
 *   - StickyMobileCTA       z-[80]   full-width bottom bar, below lg
 *   - KakaoFloatingButton   z-50     bottom-6 left-4, lg-and-up only
 * The launcher sits at z-[90] (nothing overlaps the bottom corners), but the
 * open panel must clear the z-[100] header — at z-[90] the header painted
 * straight through the panel's own title row. Hence z-[120] on the panel.
 *
 * State lives only in this component — no persistence. A reload starts fresh,
 * which is the right default for a support widget on a marketing site.
 */

type Msg = { role: 'user' | 'assistant'; content: string }

const GREETING_KO =
  '안녕하세요. 조이루모스입니다. 웹사이트 제작, 가격, 진행 방식 등 궁금한 점을 물어보세요.'
const GREETING_EN =
  "Hi — this is ZOE LUMOS. Ask me about websites, pricing, or how we work."

// Starter questions. These also give the fullscreen mobile sheet something to
// show — a greeting alone on a 900px-tall panel reads as a broken screen. All
// three are answerable from chatKnowledge.ts, so none of them dead-ends.
const STARTERS_KO = [
  '제작 비용이 얼마나 드나요?',
  '기간은 얼마나 걸리나요?',
  '기존 사이트도 작업 가능한가요?',
]
const STARTERS_EN = [
  'How much does a website cost?',
  'How long does a build take?',
  'Can you work on my existing site?',
]

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
  const panelRef = useRef<HTMLDivElement>(null)

  const greeting = isKo ? GREETING_KO : GREETING_EN

  // Keep the newest message in view as tokens arrive.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, streaming])

  // Focus the composer on desktop only. On mobile, autofocus yanks the
  // on-screen keyboard up before the visitor has read the greeting.
  useEffect(() => {
    if (!open) return
    if (window.matchMedia('(min-width: 1024px)').matches) inputRef.current?.focus()
  }, [open])

  // Lock background scroll while the sheet is open. Without this, scrolling
  // past the end of the transcript scrolls the page behind it on mobile.
  useEffect(() => {
    if (!open) return
    const { overflow, touchAction } = document.body.style
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = overflow
      document.body.style.touchAction = touchAction
    }
  }, [open])

  // Track the visual viewport so the sheet shrinks when the on-screen keyboard
  // opens. Without this the composer sits behind the keyboard: the panel is
  // positioned against the layout viewport, which the keyboard does not resize.
  useEffect(() => {
    if (!open) return
    const vv = window.visualViewport
    if (!vv) return
    const apply = () => {
      const el = panelRef.current
      if (!el) return
      el.style.setProperty('--chat-vvh', `${vv.height}px`)
      // iOS can scroll the visual viewport down out from under a top-0 fixed
      // element; offsetTop puts the panel back in view. Other browsers keep
      // this at 0, so the property is a no-op there.
      el.style.setProperty('--chat-vvtop', `${vv.offsetTop}px`)
    }
    apply()
    vv.addEventListener('resize', apply)
    vv.addEventListener('scroll', apply)
    return () => {
      vv.removeEventListener('resize', apply)
      vv.removeEventListener('scroll', apply)
    }
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

  // `override` lets a starter chip send its own text without round-tripping
  // through the textarea (which would need a second render before send saw it).
  const send = useCallback(async (override?: string) => {
    const text = (override ?? input).trim()
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
      {/*
        Launcher — the primary action on the page, so it gets the right corner,
        the highest contrast on an ivory background, and a label at lg+ where
        there's room. Kakao moved to bottom-left and stays available as the
        human-contact fallback.

        Mobile keeps a circle (a pill would crowd the StickyMobileCTA bar) and
        sits above that bar; desktop drops to bottom-6 now that Kakao vacated it.
      */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={isKo ? '문의 채팅 열기' : 'Open chat'}
          className="group fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[90] flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#1f1c16] text-white shadow-xl ring-1 ring-[#b48a43]/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-[#b48a43] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b48a43] sm:right-6 lg:bottom-6 lg:h-14 lg:w-auto lg:px-6"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="relative flex shrink-0 items-center justify-center">
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
            {/* Live dot: signals "answers now", and is the only motion here.
                motion-reduce drops the ping for vestibular sensitivity. */}
            <span className="absolute -right-1.5 -top-1.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b48a43] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b48a43]" />
            </span>
          </span>
          <span className="hidden whitespace-nowrap text-[15px] font-bold lg:inline">
            {isKo ? 'AI 상담 · 바로 답변' : 'Ask AI · instant reply'}
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          // Not aria-modal: focus is not trapped, so claiming modality would
          // mislead screen readers about what is reachable behind the sheet.
          aria-modal="false"
          aria-label={isKo ? '조이루모스 문의 채팅' : 'ZOE LUMOS chat'}
          /*
           * Mobile: a true fullscreen takeover. It used to be bottom-pinned at
           * `100dvh - 3rem`, which started 48px down the screen and ran straight
           * under the 112px fixed header — the header won on z-index and painted
           * over this panel's title row. Full-bleed at z-[120] removes both the
           * overlap and the sliver of page peeking above.
           *
           * Anchored to the top with an explicit height (over-constrained
           * top+bottom+height, so `bottom` is ignored): when the on-screen
           * keyboard opens, --chat-vvh shrinks and the panel's bottom edge — and
           * with it the composer — rises to meet the keyboard. --chat-vvtop
           * covers iOS scrolling the visual viewport out from under a fixed
           * top-0 element. Both fall back to dvh/0, which excludes browser chrome.
           *
           * Desktop (lg+): back to a floating card, right for a pointer UI.
           */
          className="fixed inset-0 top-[var(--chat-vvtop,0px)] z-[120] flex h-[var(--chat-vvh,100dvh)] flex-col overflow-hidden bg-white shadow-2xl lg:inset-x-auto lg:bottom-6 lg:right-6 lg:top-auto lg:h-[560px] lg:max-h-[calc(100dvh-6rem)] lg:w-[380px] lg:rounded-2xl lg:border lg:border-[#e4ddd0]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
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
              // 44px touch target on mobile (WCAG 2.5.8), tighter on desktop.
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-[#6b6459] transition-colors hover:bg-[#efe9dd] hover:text-[#1f1c16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b48a43] lg:-mr-1 lg:h-8 lg:w-8"
              style={{ touchAction: 'manipulation' }}
            >
              <svg
                width="20"
                height="20"
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

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {(isKo ? STARTERS_KO : STARTERS_EN).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#ddd4c4] bg-white px-3 py-2 text-left text-[13px] leading-snug text-[#4a443b] transition-colors hover:border-[#b48a43] hover:text-[#1f1c16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b48a43]"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

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
                /*
                 * text-base (16px) is load-bearing, not styling: iOS Safari
                 * auto-zooms the whole page when a focused input is under 16px,
                 * and never zooms back out. lg: drops to 14px where that
                 * behavior doesn't exist.
                 */
                className="max-h-28 min-h-[44px] flex-1 resize-none rounded-lg border border-[#ddd4c4] bg-white px-3 py-2.5 text-base text-[#1f1c16] placeholder:text-[#9a9284] focus:border-[#b48a43] focus:outline-none lg:min-h-[40px] lg:py-2 lg:text-[14px]"
              />
              <button
                type="button"
                // Wrapped, not passed by reference: onClick would hand the
                // MouseEvent to send()'s `override` parameter.
                onClick={() => send()}
                disabled={streaming || !input.trim()}
                aria-label={isKo ? '보내기' : 'Send'}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#b48a43] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b48a43] lg:h-10 lg:w-10"
                style={{ touchAction: 'manipulation' }}
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
