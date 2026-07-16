'use client'

import { useState } from 'react'
import Link from 'next/link'
import { trackChecklistLead } from '@/utils/analytics'

/**
 * Lead magnet for the KakaoTalk guides: email → /api/contact ("카카오톡
 * 체크리스트 요청") → generate_lead → reveal the checklist link.
 *
 * Honesty over forced gating: a small direct link is always visible below,
 * and the link itself is server-rendered so it works without JavaScript.
 */

const copy = {
  en: {
    eyebrow: 'Free resource',
    title: 'The complete KakaoTalk US setup checklist',
    body: 'Every step from this guide (plus the business-Channel setup) as one printable checklist — prerequisites, verification, Channel Manager, website integration. Leave your email and we\'ll also send it to you, along with anything that changes in Kakao\'s process.',
    placeholder: 'Your email address',
    button: 'Send me the checklist',
    sending: 'Sending…',
    successTitle: 'Done — here\'s your checklist:',
    successLink: 'Open the KakaoTalk US Setup Checklist →',
    error: 'Something went wrong — the checklist is still yours, right here:',
    invalidEmail: 'Please enter a valid email address.',
    directPrefix: 'Prefer not to leave an email?',
    directLink: 'Open the checklist directly →',
  },
  ko: {
    eyebrow: '무료 자료',
    title: '카카오톡 미국 셋업 체크리스트 (전체판)',
    body: '이 가이드의 모든 단계와 비즈니스 채널 개설까지, 인쇄해서 쓸 수 있는 체크리스트 한 장으로 정리했습니다. 이메일을 남겨주시면 체크리스트와 함께 카카오 절차가 바뀔 때의 업데이트도 보내드립니다.',
    placeholder: '이메일 주소',
    button: '체크리스트 받기',
    sending: '전송 중…',
    successTitle: '완료 — 체크리스트는 여기 있습니다:',
    successLink: '카카오톡 미국 셋업 체크리스트 열기 →',
    error: '전송에 문제가 있었지만, 체크리스트는 바로 보실 수 있습니다:',
    invalidEmail: '올바른 이메일 주소를 입력해 주세요.',
    directPrefix: '이메일 없이 보고 싶으세요?',
    directLink: '체크리스트 바로 열기 →',
  },
}

export default function KakaoChecklistMagnet({ locale }: { locale: 'en' | 'ko' }) {
  const t = copy[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const checklistHref = `${prefix}/kakao-checklist`

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [validationError, setValidationError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setValidationError(t.invalidEmail)
      return
    }
    setValidationError('')
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmed.split('@')[0] || 'Checklist request',
          email: trimmed,
          message: `카카오톡 체크리스트 요청 (KakaoTalk checklist request) — lead magnet on ${
            typeof window !== 'undefined' ? window.location.pathname : 'blog'
          }`,
          locale,
        }),
      })
      if (!res.ok) throw new Error('contact api failed')
      trackChecklistLead('kakao_checklist')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <aside className="my-12 px-7 py-8 md:px-9 bg-bone rounded-[2px] hair-y">
      <p className="overline text-gold mb-3">{t.eyebrow}</p>
      <h3 className="font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.25] tracking-luxury text-ink m-0 mb-3">
        {t.title}
      </h3>
      <p className="text-[15px] text-graphite leading-[1.7] mb-6">{t.body}</p>

      {status === 'done' || status === 'error' ? (
        <div>
          <p className={`text-[14px] mb-2 ${status === 'error' ? 'text-graphite' : 'text-ink font-medium'}`}>
            {status === 'error' ? t.error : t.successTitle}
          </p>
          <Link
            href={checklistHref}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors"
          >
            {t.successLink}
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="flex-1 min-w-0 bg-ivory border border-hairline rounded-[2px] px-4 py-3 text-[15px] text-ink placeholder:text-ash focus:outline-none focus:border-ink/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-ink justify-center disabled:opacity-60"
            >
              {status === 'sending' ? t.sending : t.button}
            </button>
          </form>
          {validationError && <p className="text-[13px] text-red-700 mt-2 mb-0">{validationError}</p>}
        </>
      )}

      {/* Honest no-gate fallback — server-rendered, works without JS */}
      {status !== 'done' && (
        <p className="text-[12px] text-ash mt-4 mb-0">
          {t.directPrefix}{' '}
          <Link href={checklistHref} className="underline underline-offset-2 hover:text-ink transition-colors">
            {t.directLink}
          </Link>
        </p>
      )}
    </aside>
  )
}
