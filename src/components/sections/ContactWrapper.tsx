'use client'

import { useState } from 'react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import Toast, { ToastMessage } from '@/components/ui/motion/Toast'
import { trackEvent } from '@/components/GoogleAnalytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

const copy = {
  en: {
    eyebrow: 'Inquiries',
    headlineLead: 'Start',
    headlineAccent: 'a conversation.',
    sub: "We reply within one business day, in English or Korean. No templates — every project begins with a real reply, not an auto-responder.",
    labels: {
      name: 'Your name',
      email: 'Email',
      message: 'Tell us about your project',
      scope: 'What you need help with',
    },
    placeholders: {
      name: 'e.g. Yuna Kim',
      email: 'you@company.com',
      message: 'A few sentences is plenty — what are you building, any deadlines, a site or brand you love as a reference?',
    },
    scopes: [
      'Shopify build',
      'Shopify takeover',
      'Cost audit',
      'Bilingual SEO',
      'Web design',
      'Not sure yet',
    ],
    send: 'Send inquiry',
    sending: 'Sending…',
    successTitle: 'Inquiry sent',
    successBody: "We've received your message. Expect a reply within one business day.",
    errorTitle: 'Could not send',
    errorBody: 'Please try again, or email us directly at the address below.',
    requiredTitle: 'Almost there',
    required_err: 'Please complete your name and email so we can reply.',
    privacy: 'Your information is used only to reply to your inquiry.',
    altContact: {
      label: 'Prefer to skip the form?',
      email: 'zoestudiollc@gmail.com',
      emailHref: 'mailto:zoestudiollc@gmail.com?subject=Project%20inquiry%20%E2%80%94%20Zoe%20Lumos',
      kakao: 'KakaoTalk · Korean OK',
      kakaoHref: 'https://pf.kakao.com/_xhxdxmlX/chat',
    },
    nextLabel: 'What happens next',
    nextSteps: [
      ['Today', 'A real human reads your message and replies within one business day.'],
      ['Day 2–3', 'A 30-minute call to understand your business and goals.'],
      ['Week 1', 'A written proposal with scope, timeline, and a fixed investment.'],
    ] as [string, string][],
  },
  ko: {
    eyebrow: '상담 신청',
    headlineLead: '대화로',
    headlineAccent: '시작합니다.',
    sub: '영업일 기준 1일 이내에 한국어 또는 영어로 회신드립니다. 템플릿 답장 X — 실 사람이 직접 읽고 답합니다.',
    labels: {
      name: '이름',
      email: '이메일',
      message: '프로젝트에 대해 알려주세요',
      scope: '어떤 도움이 필요하신가요',
    },
    placeholders: {
      name: '예: 김유나',
      email: 'you@company.com',
      message: '몇 줄이면 충분합니다 — 무엇을 만들고 싶으신가요, 일정, 참고하는 사이트나 브랜드?',
    },
    scopes: [
      'Shopify 구축',
      'Shopify 인수',
      '비용 감사',
      '이중언어 SEO',
      '웹디자인',
      '아직 미정',
    ],
    send: '상담 신청 보내기',
    sending: '전송 중…',
    successTitle: '상담 신청 완료',
    successBody: '메시지 수신 완료. 영업일 기준 1일 이내에 회신드립니다.',
    errorTitle: '전송 실패',
    errorBody: '다시 시도하시거나 아래 이메일로 직접 연락 주세요.',
    requiredTitle: '거의 다 됐어요',
    required_err: '회신을 위해 이름과 이메일을 입력해 주세요.',
    privacy: '입력하신 정보는 상담 회신 목적으로만 사용됩니다.',
    altContact: {
      label: '폼이 아니어도 좋습니다',
      email: 'zoestudiollc@gmail.com',
      emailHref: 'mailto:zoestudiollc@gmail.com?subject=%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EB%AC%B8%EC%9D%98%20%E2%80%94%20Zoe%20Lumos',
      kakao: '카카오톡 · 한국어 OK',
      kakaoHref: 'https://pf.kakao.com/_xhxdxmlX/chat',
    },
    nextLabel: '다음 단계',
    nextSteps: [
      ['오늘', '실 사람이 메시지를 직접 읽고 영업일 1일 이내 답장.'],
      ['2-3일차', '비즈니스와 목표 이해를 위한 30분 통화.'],
      ['1주 차', '범위, 일정, 확정 견적 포함 서면 제안서.'],
    ] as [string, string][],
  },
}

export default function ContactWrapper({
  locale = 'en',
  sectionNumber = '07',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const t = copy[locale as 'en' | 'ko'] || copy.en
  const isKo = locale === 'ko'

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    scope: [] as string[],
  })
  const [status, setStatus] = useState<Status>('idle')
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const toggleScope = (s: string) => {
    setForm((f) =>
      f.scope.includes(s)
        ? { ...f, scope: f.scope.filter((x) => x !== s) }
        : { ...f, scope: [...f.scope, s] }
    )
  }

  const valid = form.name.trim() && form.email.trim()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!valid) {
      setToast({ id: Date.now(), kind: 'info', title: t.requiredTitle, body: t.required_err })
      return
    }
    setStatus('loading')
    trackEvent('form_submit_attempt', 'conversion', 'home_contact')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          services: form.scope.join(' | '),
        }),
      })
      if (!res.ok) throw new Error('bad response')
      setStatus('success')
      trackEvent('form_submit_success', 'conversion', 'home_contact')
      setToast({ id: Date.now(), kind: 'success', title: t.successTitle, body: t.successBody })
      setForm({ name: '', email: '', message: '', scope: [] })
    } catch {
      setStatus('error')
      trackEvent('form_submit_error', 'conversion', 'home_contact')
      setToast({ id: Date.now(), kind: 'error', title: t.errorTitle, body: t.errorBody })
    }
  }

  return (
    <section
      id="contact"
      className="relative section-pad overflow-hidden"
      style={{
        background: '#FFF4E8',
      }}
    >
      <Toast message={toast} onDismiss={() => setToast(null)} />

      {/* Soft sun-mesh atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(40% 35% at 88% 12%, rgba(255, 212, 91, 0.28) 0%, rgba(255, 212, 91, 0) 60%),
            radial-gradient(35% 30% at 8% 92%, rgba(255, 107, 74, 0.10) 0%, rgba(255, 107, 74, 0) 65%)
          `,
        }}
      />

      <div className="container-edge relative">
        {/* Header — centered, single statement */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <InView className="inline-flex items-center gap-3 overline text-ash mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B4A' }} />
            <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
            <span className="h-px w-8 bg-hairline" />
            <span>{t.eyebrow}</span>
          </InView>
          <h2
            className="font-display tracking-[-0.02em] leading-[1.0] m-0"
            style={{
              color: '#3D1F0F',
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 400,
            }}
          >
            <InView as="span" className="mask-row">
              <span className="mask-rise block">{t.headlineLead}</span>
            </InView>
            <InView as="span" className="mask-row" delay={120}>
              <span className="mask-rise block italic font-light" style={{ color: '#FF6B4A' }}>
                {t.headlineAccent}
              </span>
            </InView>
          </h2>
          <p
            className="mt-8 mx-auto max-w-xl text-[16px] md:text-[17px] leading-[1.65]"
            style={{ color: '#6B3D24' }}
          >
            {t.sub}
          </p>
        </div>

        {/* FORM — single card, dominant element, max-w-3xl */}
        <form onSubmit={submit} noValidate className="max-w-3xl mx-auto">
          <div
            className="bg-paper rounded-2xl p-7 md:p-10 shadow-[0_30px_70px_-30px_rgba(61,31,15,0.18),0_8px_20px_-8px_rgba(61,31,15,0.10)] border"
            style={{ borderColor: 'rgba(61,31,15,0.08)' }}
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <Field
                label={t.labels.name}
                placeholder={t.placeholders.name}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                autoComplete="name"
                required
              />
              <Field
                label={t.labels.email}
                placeholder={t.placeholders.email}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                autoComplete="email"
                required
              />
            </div>

            {/* Scope chips — optional but useful */}
            <div className="mt-7">
              <label
                className="block uppercase text-[11px] mb-3"
                style={{ letterSpacing: '0.18em', color: '#A37C5F' }}
              >
                {t.labels.scope}
                <span className="ml-2 normal-case tracking-normal text-[11px]" style={{ color: 'rgba(163,124,95,0.6)' }}>
                  {isKo ? '· 선택' : '· optional'}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {t.scopes.map((s) => {
                  const active = form.scope.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleScope(s)}
                      className="px-3.5 py-2 rounded-full text-[13px] transition-all duration-200 border"
                      style={{
                        background: active ? '#3D1F0F' : 'transparent',
                        color: active ? '#FFF4E8' : '#6B3D24',
                        borderColor: active ? '#3D1F0F' : 'rgba(61,31,15,0.18)',
                      }}
                    >
                      {active && <span className="mr-1">✓</span>}
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message textarea */}
            <div className="mt-7">
              <label
                className="block uppercase text-[11px] mb-3"
                style={{ letterSpacing: '0.18em', color: '#A37C5F' }}
              >
                {t.labels.message}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.placeholders.message}
                rows={5}
                className="w-full rounded-xl px-4 py-3.5 text-[15px] leading-[1.6] resize-y transition-all duration-200 outline-none focus:ring-2"
                style={{
                  background: '#FFF9F1',
                  border: '1px solid rgba(61,31,15,0.12)',
                  color: '#3D1F0F',
                  minHeight: '128px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B4A'
                  e.currentTarget.style.background = '#FFFFFF'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(61,31,15,0.12)'
                  e.currentTarget.style.background = '#FFF9F1'
                }}
              />
            </div>

            {/* SEND BUTTON — big, coral, impossible to miss */}
            <div className="mt-8 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[12px] leading-relaxed" style={{ color: '#A37C5F' }}>
                <span
                  className="inline-block w-1 h-1 rounded-full mr-2 align-middle"
                  style={{ background: '#FF6B4A' }}
                />
                {t.privacy}
              </p>
              <Magnetic strength={16} radius={120}>
                <button
                  type="submit"
                  data-cursor={isKo ? '보내기' : 'Send'}
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-3 px-8 py-[18px] rounded-full text-[15px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_24px_50px_-16px_rgba(255,107,74,0.55)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: valid ? '#FF6B4A' : '#3D1F0F',
                    color: '#FFF4E8',
                    boxShadow: valid
                      ? '0 18px 40px -14px rgba(255,107,74,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)'
                      : '0 14px 40px -14px rgba(61,31,15,0.45)',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-ivory/60 border-t-ivory rounded-full animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.send}
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </form>

        {/* Alternative contact — email + KakaoTalk pills, prominent */}
        <div className="mt-12 md:mt-14 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-center">
            <span
              className="text-[12px] uppercase"
              style={{ letterSpacing: '0.18em', color: '#A37C5F' }}
            >
              {t.altContact.label}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={t.altContact.emailHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(61,31,15,0.10)',
                  color: '#3D1F0F',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span aria-hidden style={{ color: '#FF6B4A' }}>✉</span>
                {t.altContact.email}
              </a>
              <a
                href={t.altContact.kakaoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: '#FEE500',
                  border: '1px solid rgba(61,31,15,0.10)',
                  color: '#3D1F0F',
                }}
              >
                <span aria-hidden>💬</span>
                {t.altContact.kakao}
              </a>
            </div>
          </div>
        </div>

        {/* What happens next — small horizontal row, no longer dominant */}
        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          <p
            className="text-center text-[11px] uppercase mb-8"
            style={{ letterSpacing: '0.22em', color: '#A37C5F' }}
          >
            {t.nextLabel}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.nextSteps.map(([when, desc], i) => (
              <InView key={when} delay={i * 80} className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-medium"
                    style={{
                      background: 'rgba(255, 107, 74, 0.12)',
                      color: '#FF6B4A',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="font-display italic text-[18px] md:text-[20px] font-light"
                    style={{ color: '#3D1F0F' }}
                  >
                    {when}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.6]" style={{ color: '#6B3D24' }}>
                  {desc}
                </p>
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Field — clean labeled input with focus state ────────────────
function Field({
  label,
  placeholder,
  helper,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string
  placeholder?: string
  helper?: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span
        className="block uppercase text-[11px] mb-2.5"
        style={{ letterSpacing: '0.18em', color: '#A37C5F' }}
      >
        {label}
        {required && (
          <span className="ml-1 align-top" style={{ color: '#FF6B4A' }}>*</span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl px-4 py-3 text-[15px] transition-all duration-200 outline-none"
        style={{
          background: '#FFF9F1',
          border: '1px solid rgba(61,31,15,0.12)',
          color: '#3D1F0F',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#FF6B4A'
          e.currentTarget.style.background = '#FFFFFF'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(61,31,15,0.12)'
          e.currentTarget.style.background = '#FFF9F1'
        }}
      />
      {helper && (
        <span className="block mt-1.5 text-[11px]" style={{ color: '#A37C5F' }}>
          {helper}
        </span>
      )}
    </label>
  )
}
