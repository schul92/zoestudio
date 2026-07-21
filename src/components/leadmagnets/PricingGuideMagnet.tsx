'use client'

import { useState } from 'react'
import { trackChecklistLead } from '@/utils/analytics'

/**
 * Lead magnet for the website pricing guide: email → /api/contact ("가격 가이드
 * 요청") → generate_lead → reveal the PDF download links (KO + EN + bonus
 * checklist).
 *
 * Honesty over forced gating (house pattern, same as KakaoChecklistMagnet):
 * a small direct link is always visible below.
 */

const FILES = {
  ko: '/downloads/zoelumos-website-pricing-guide-2026-ko.pdf',
  en: '/downloads/zoelumos-website-pricing-guide-2026-en.pdf',
  checklist: '/downloads/zoelumos-website-checklist-ko-en.pdf',
}

const copy = {
  en: {
    eyebrow: 'Free PDF guide',
    title: 'Get the full guide as a designed PDF (English + Korean)',
    body: 'Everything on this page plus the full market-rate tables and the printable 7-question contract checklist, as a 6-page PDF in both languages. Leave your email and we\'ll send updates when 2026 market prices shift.',
    placeholder: 'Your email address',
    button: 'Send me the PDF',
    sending: 'Sending…',
    successTitle: 'Done — your downloads:',
    dlEn: 'Pricing Guide (English, PDF) ↓',
    dlKo: 'Pricing Guide (한국어, PDF) ↓',
    dlBonus: 'Bonus: 10-Point Website Checklist (PDF) ↓',
    error: 'Something went wrong — the PDFs are still yours, right here:',
    invalidEmail: 'Please enter a valid email address.',
    directPrefix: 'Prefer not to leave an email?',
    directLink: 'Download the PDF directly ↓',
  },
  ko: {
    eyebrow: '무료 PDF 가이드',
    title: '이 가이드 전체를 PDF로 받아보세요 (한국어 + 영어)',
    body: '이 페이지의 내용에 시장 시세표 전체와 인쇄용 "계약 전 7가지 질문" 체크리스트까지, 6페이지 PDF 두 개 언어로 정리했습니다. 이메일을 남겨주시면 2026년 시세가 바뀔 때 업데이트도 보내드립니다.',
    placeholder: '이메일 주소',
    button: 'PDF 받기',
    sending: '전송 중…',
    successTitle: '완료 — 바로 다운로드하세요:',
    dlEn: '가격 가이드 (English, PDF) ↓',
    dlKo: '가격 가이드 (한국어, PDF) ↓',
    dlBonus: '보너스: 웹사이트 10가지 체크리스트 (PDF) ↓',
    error: '전송에 문제가 있었지만, PDF는 바로 받으실 수 있습니다:',
    invalidEmail: '올바른 이메일 주소를 입력해 주세요.',
    directPrefix: '이메일 없이 받고 싶으세요?',
    directLink: 'PDF 바로 다운로드 ↓',
  },
}

export default function PricingGuideMagnet({ locale }: { locale: 'en' | 'ko' }) {
  const t = copy[locale]

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
          name: trimmed.split('@')[0] || 'Pricing guide request',
          email: trimmed,
          message: `웹사이트 가격 가이드 요청 (Website pricing guide request) — lead magnet on ${
            typeof window !== 'undefined' ? window.location.pathname : '/website-pricing-guide'
          }`,
          locale,
        }),
      })
      if (!res.ok) throw new Error('contact api failed')
      trackChecklistLead('pricing_guide')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const links = (
    <ul className="space-y-2 m-0 p-0 list-none">
      {(locale === 'ko'
        ? ([['ko', t.dlKo], ['en', t.dlEn], ['checklist', t.dlBonus]] as const)
        : ([['en', t.dlEn], ['ko', t.dlKo], ['checklist', t.dlBonus]] as const)
      ).map(([key, label]) => (
        <li key={key}>
          <a
            href={FILES[key]}
            download
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <aside className="my-12 px-7 py-8 md:px-9 bg-bone rounded-[2px] hair-y">
      <p className="overline text-gold mb-3">{t.eyebrow}</p>
      <h3 className="font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.25] tracking-luxury text-ink m-0 mb-3">
        {t.title}
      </h3>
      <p className="text-[15px] text-graphite leading-[1.7] mb-6">{t.body}</p>

      {status === 'done' || status === 'error' ? (
        <div>
          <p className={`text-[14px] mb-3 ${status === 'error' ? 'text-graphite' : 'text-ink font-medium'}`}>
            {status === 'error' ? t.error : t.successTitle}
          </p>
          {links}
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

      {/* Honest no-gate fallback — works without JS */}
      {status !== 'done' && (
        <p className="text-[12px] text-ash mt-4 mb-0">
          {t.directPrefix}{' '}
          <a
            href={locale === 'ko' ? FILES.ko : FILES.en}
            download
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            {t.directLink}
          </a>
        </p>
      )}
    </aside>
  )
}
