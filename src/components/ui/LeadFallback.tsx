'use client'

import { useRef, useState } from 'react'

// Shown when a lead couldn't be delivered automatically. The visitor's text is never lost: it stays saved on the
// device (see submitLead), can be copied in one tap, and two direct channels are offered right here.
const KAKAO_CHAT = 'https://pf.kakao.com/_xhxdxmlX/chat'
const OWNER_EMAIL = 'zoestudiollc@gmail.com'

const copy = {
  en: {
    title: "We couldn't send this automatically.",
    body: 'Your message is saved on this device. Send it to us directly and we’ll reply the same way:',
    kakao: 'Send on KakaoTalk',
    copy: 'Copy my message',
    copied: 'Copied',
    copyHint: 'Select the text below and copy it.',
    email: 'Or email us at',
    compactBody: 'Reach us directly instead:',
  },
  ko: {
    title: '자동 전송이 되지 않았습니다.',
    body: '작성하신 내용은 이 기기에 저장되어 있습니다. 아래로 직접 보내주시면 같은 방법으로 답장드립니다:',
    kakao: '카카오톡으로 보내기',
    copy: '내 메시지 복사',
    copied: '복사됨',
    copyHint: '아래 내용을 선택해 복사해 주세요.',
    email: '또는 이메일:',
    compactBody: '아래로 직접 연락 주세요:',
  },
}

export default function LeadFallback({
  locale,
  text,
  compact = false,
  className = '',
}: {
  locale: string
  text?: string
  compact?: boolean
  className?: string
}) {
  const t = copy[locale === 'ko' ? 'ko' : 'en']
  const [state, setState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const areaRef = useRef<HTMLTextAreaElement>(null)

  const doCopy = () => {
    if (!text) return
    const manual = () => {
      setState('manual')
      requestAnimationFrame(() => areaRef.current?.select())
    }
    try {
      navigator.clipboard.writeText(text).then(() => setState('copied'), manual)
    } catch {
      manual()
    }
  }

  return (
    <div
      role="alert"
      className={`rounded-2xl border p-5 md:p-6 text-left ${className}`}
      style={{ background: 'var(--paper)', borderColor: 'var(--line)', color: 'var(--ink)' }}
    >
      <p className="text-[16px] md:text-[17px] font-semibold tracking-[-0.01em] m-0">{t.title}</p>
      <p className="mt-1.5 text-[14px] leading-[1.6] m-0" style={{ color: 'var(--graphite)' }}>
        {compact ? t.compactBody : t.body}
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <a
          href={KAKAO_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          data-kakao-loc="lead_fallback"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full text-[15px] font-semibold active:scale-[0.97] transition-transform"
          style={{ background: '#FEE500', color: '#191600' }}
        >
          <span aria-hidden>💬</span>
          {t.kakao}
        </a>
        {!compact && text && (
          <button
            type="button"
            onClick={doCopy}
            className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full text-[15px] font-medium border active:scale-[0.97] transition-transform"
            style={{ borderColor: 'var(--line)', color: 'var(--ink)', background: 'transparent' }}
          >
            {state === 'copied' ? `✓ ${t.copied}` : t.copy}
          </button>
        )}
      </div>
      {state === 'manual' && text && (
        <div className="mt-3">
          <p className="text-[13px] m-0 mb-1.5" style={{ color: 'var(--graphite)' }}>{t.copyHint}</p>
          <textarea
            ref={areaRef}
            readOnly
            value={text}
            rows={5}
            className="w-full rounded-xl px-3 py-2.5 text-[14px] leading-[1.5]"
            style={{ background: 'var(--ivory)', border: '1px solid var(--line)', color: 'var(--ink)' }}
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      )}
      <p className="mt-4 text-[14px] m-0" style={{ color: 'var(--graphite)' }}>
        {t.email}{' '}
        <span className="select-all font-medium [overflow-wrap:anywhere]" style={{ color: 'var(--ink)' }}>
          {OWNER_EMAIL}
        </span>
      </p>
    </div>
  )
}
