'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { trackGAEvent } from '@/utils/analytics'

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
// are answerable from chatKnowledge.ts, so none of them dead-ends.
const STARTERS_KO = [
  '제작 비용이 얼마나 드나요?',
  '기간은 얼마나 걸리나요?',
  '이런 AI 챗봇, 우리 가게에도 달 수 있나요?',
]
const STARTERS_EN = [
  'How much does a website cost?',
  'How long does a build take?',
  'Can I get this AI chat on my site?',
]

// The model appends this token (system-prompt rule 8) when the visitor should
// be offered the in-chat contact form. Stripped from display and from the
// history we send back; its only job is flipping the form open.
const LEAD_TOKEN = '[[CONTACT_FORM]]'

// Remove the token — and any partially-streamed tail of it — for display.
// Mid-stream the last chunk can end with "[[CONTA", which would flash as
// literal text without the second pattern.
const displayText = (s: string) =>
  s.replaceAll(LEAD_TOKEN, '').replace(/\[\[[A-Z_[\]]*$/, '').trimEnd()

// Deterministic backstop for the model's token: if the visitor's own message
// shows contact/quote intent, the form opens whether or not the model
// remembered rule 8. A missed lead costs more than a slightly eager form.
const CONTACT_INTENT =
  /contact|reach you|get in touch|talk to|human|quote|estimate|pricing for|연락|문의|상담|견적|사람이랑|시작하고|진행하고/i

export default function ChatWidget({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Lead form: opened by the model's LEAD_TOKEN or the footer's "상담 연결"
  // button; once sent it stays closed for the session.
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadSent, setLeadSent] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const greeting = isKo ? GREETING_KO : GREETING_EN

  // Keep the newest message in view as tokens arrive.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, streaming, leadOpen, leadSent])

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
        // The lead token is a UI signal, not conversation content — feeding it
        // back teaches the model to imitate it in the wrong places.
        body: JSON.stringify({
          messages: next.map((m) => ({ ...m, content: displayText(m.content) || m.content })),
        }),
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
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        acc += chunk
        setMessages((m) => {
          const copy = [...m]
          const last = copy[copy.length - 1]
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { ...last, content: last.content + chunk }
          }
          return copy
        })
      }
      if (acc.includes(LEAD_TOKEN) && !leadSent) {
        setLeadOpen(true)
        trackGAEvent('chat_lead_form_shown', { category: 'chat', label: 'model_token' })
      } else if (!leadSent && CONTACT_INTENT.test(text)) {
        setLeadOpen(true)
        trackGAEvent('chat_lead_form_shown', { category: 'chat', label: 'intent_backstop' })
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
                {displayText(m.content) ||
                  (streaming && i === messages.length - 1 ? <Dots /> : '')}
              </Bubble>
            ))}

            {leadOpen && !leadSent && !streaming && (
              <LeadForm
                isKo={isKo}
                messages={messages}
                onDone={() => {
                  setLeadSent(true)
                  setLeadOpen(false)
                }}
              />
            )}

            {leadSent && (
              <Bubble role="assistant">
                {isKo
                  ? '접수되었습니다. 1영업일 안에 이메일로 회신드리겠습니다. 그동안 다른 질문도 편하게 물어보세요.'
                  : "Got it — Steve will reply by email within one business day. Feel free to keep asking questions here in the meantime."}
              </Bubble>
            )}

            {error && (
              <p className="rounded-lg bg-[#fbe9e7] px-3 py-2 text-[12.5px] leading-relaxed text-[#a8231c]">
                {error}
              </p>
            )}
          </div>

          {/* Self-promo: this widget IS the product. One quiet line; tapping it
              asks the bot about it, which answers and (rule 8) opens the form. */}
          {!leadOpen && !leadSent && (
            <button
              type="button"
              onClick={() =>
                send(
                  isKo
                    ? '이런 AI 챗봇, 우리 가게 웹사이트에도 달 수 있나요? 구독 안내해 주세요.'
                    : 'Can I get this AI chat on my own website? How does the subscription work?'
                )
              }
              disabled={streaming}
              className="border-t border-[#e4ddd0] bg-[#faf7f1] px-4 py-2 text-left text-[11.5px] leading-snug text-[#6b6459] transition-colors hover:text-[#1f1c16] disabled:opacity-60"
              style={{ touchAction: 'manipulation' }}
            >
              {isKo
                ? '✨ 이 AI 챗봇, 사장님 웹사이트에도 달 수 있습니다 — 구독형 · 자세히 물어보기'
                : '✨ This AI chat is available for your website too — subscription · ask me'}
            </button>
          )}

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
                ? 'AI 답변입니다. 정확한 상담은 '
                : 'AI-generated. For anything specific, '}
              <button
                type="button"
                onClick={() => {
                  if (!leadSent) {
                    setLeadOpen(true)
                    trackGAEvent('chat_lead_form_shown', { category: 'chat', label: 'footer_button' })
                  }
                }}
                className="font-semibold text-[#b48a43] underline underline-offset-2 hover:text-[#8f6c30]"
                style={{ touchAction: 'manipulation' }}
              >
                {isKo ? '상담 연결' : 'leave your contact info'}
              </button>
              {isKo ? ' 버튼으로 연락처를 남겨주세요.' : ' and Steve will reply.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * In-chat contact form. Reuses /api/contact (nodemailer → owner inboxes), so
 * chat leads land in the same place as the site's contact form — with the
 * conversation transcript attached, which is the context a reply needs.
 */
function LeadForm({
  isKo,
  messages,
  onDone,
}: {
  isKo: boolean
  messages: Msg[]
  onDone: () => void
}) {
  const lastQuestion =
    [...messages].reverse().find((m) => m.role === 'user')?.content ?? ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [question, setQuestion] = useState(lastQuestion)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)

  const submit = async () => {
    if (sending || !name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return
    setSending(true)
    setFailed(false)

    // Last 12 turns, capped — enough context to reply without shipping a novel.
    const transcript = messages
      .slice(-12)
      .map((m) => `${m.role === 'user' ? (isKo ? '방문자' : 'Visitor') : 'AI'}: ${displayText(m.content)}`)
      .join('\n')
      .slice(0, 2500)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          business: website.trim() || undefined,
          services: 'AI chat lead (site widget)',
          message: `${question.trim() || '(no question)'}\n\n--- chat transcript ---\n${transcript}`,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackGAEvent('chat_lead_submit', {
        category: 'chat',
        label: 'success',
        form_type: 'chat_widget',
        message_length: question.length,
      })
      onDone()
    } catch {
      setFailed(true)
      trackGAEvent('chat_lead_submit', { category: 'chat', label: 'error', form_type: 'chat_widget' })
    } finally {
      setSending(false)
    }
  }

  const field =
    'w-full rounded-lg border border-[#ddd4c4] bg-white px-3 py-2 text-base text-[#1f1c16] placeholder:text-[#9a9284] focus:border-[#b48a43] focus:outline-none lg:text-[13.5px]'

  return (
    <div className="rounded-2xl border border-[#e0cfa8] bg-[#fdfaf3] p-3.5">
      <p className="text-[13px] font-semibold text-[#1f1c16]">
        {isKo ? '연락처를 남겨주세요' : 'Leave your contact info'}
      </p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-[#6b6459]">
        {isKo
          ? '지금까지의 대화와 함께 Steve에게 바로 전달됩니다 · 1영업일 내 회신'
          : 'Sent straight to Steve with this conversation · reply within 1 business day'}
      </p>
      <div className="mt-2.5 space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isKo ? '이름 *' : 'Name *'}
          maxLength={80}
          className={field}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={isKo ? '이메일 *' : 'Email *'}
          maxLength={120}
          className={field}
        />
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder={isKo ? '웹사이트 또는 업종 (선택)' : 'Website or business type (optional)'}
          maxLength={120}
          className={field}
        />
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          maxLength={1000}
          placeholder={isKo ? '문의 내용' : 'Your question'}
          className={`${field} resize-none`}
        />
      </div>
      {failed && (
        <p className="mt-2 text-[11.5px] text-[#a8231c]">
          {isKo
            ? '전송에 실패했습니다. 잠시 후 다시 시도하시거나 info@zoelumos.com 으로 보내주세요.'
            : 'Failed to send. Please try again or email info@zoelumos.com.'}
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={sending || !name.trim() || !email.trim()}
        className="mt-2.5 w-full rounded-lg bg-[#b48a43] py-2.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ touchAction: 'manipulation' }}
      >
        {sending
          ? isKo ? '전송 중…' : 'Sending…'
          : isKo ? '보내기' : 'Send'}
      </button>
    </div>
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
