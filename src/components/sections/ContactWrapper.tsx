'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import Toast, { ToastMessage } from '@/components/ui/motion/Toast'
import { trackEvent } from '@/components/GoogleAnalytics'
import { submitLead, loadDraft, leadText } from '@/lib/leadCapture'
import LeadFallback from '@/components/ui/LeadFallback'

const DRAFT_KEY = 'home_contact'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
      'Medical / dental website',
      'B2B website or portal',
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
    requiredTitle: 'Almost there',
    required_err: 'Please complete your name and email so we can reply.',
    errors: {
      name: 'Add your name so we know who to reply to.',
      email: 'Add the email we should reply to.',
      emailFormat: 'Check the email address (for example, you@company.com).',
    },
    privacy: 'Your information is used only to reply to your inquiry.',
    altContact: {
      label: 'Prefer to skip the form?',
      email: 'info@zoelumos.com',
      emailHref: 'mailto:info@zoelumos.com?subject=Project%20inquiry%20%E2%80%94%20Zoe%20Lumos',
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
      '병원·치과 홈페이지',
      'B2B 웹사이트·포털',
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
    requiredTitle: '거의 다 됐어요',
    required_err: '회신을 위해 이름과 이메일을 입력해 주세요.',
    errors: {
      name: '회신드릴 분의 이름을 입력해 주세요.',
      email: '회신받으실 이메일을 입력해 주세요.',
      emailFormat: '이메일 주소 형식을 확인해 주세요 (예: you@company.com).',
    },
    privacy: '입력하신 정보는 상담 회신 목적으로만 사용됩니다.',
    altContact: {
      label: '폼이 아니어도 좋습니다',
      email: 'info@zoelumos.com',
      emailHref: 'mailto:info@zoelumos.com?subject=%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EB%AC%B8%EC%9D%98%20%E2%80%94%20Zoe%20Lumos',
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
  const [unsent, setUnsent] = useState('')

  // A draft that never reached us (closed tab, mail outage) comes back pre-filled on the next visit.
  useEffect(() => {
    const d = loadDraft<{ name: string; email: string; message: string; services: string }>(DRAFT_KEY)
    if (!d) return
    setForm((f) => ({
      name: d.name || f.name,
      email: d.email || f.email,
      message: d.message || f.message,
      scope: d.services ? d.services.split(' | ').filter(Boolean) : f.scope,
    }))
  }, [])

  const toggleScope = (s: string) => {
    setForm((f) =>
      f.scope.includes(s)
        ? { ...f, scope: f.scope.filter((x) => x !== s) }
        : { ...f, scope: [...f.scope, s] }
    )
  }

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  // Errors sit under their field and the first one takes focus, instead of a toast across the screen.
  const validate = () => {
    const next: { name?: string; email?: string } = {}
    if (!form.name.trim()) next.name = t.errors.name
    if (!form.email.trim()) next.email = t.errors.email
    else if (!EMAIL_RE.test(form.email.trim())) next.email = t.errors.emailFormat
    setErrors(next)
    if (next.name) nameRef.current?.focus()
    else if (next.email) emailRef.current?.focus()
    return !next.name && !next.email
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')
    setUnsent('')
    trackEvent('form_submit_attempt', 'conversion', 'home_contact')
    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
      services: form.scope.join(' | '),
      locale,
    }
    const result = await submitLead(payload, { method: 'form', source: 'home_contact', draftKey: DRAFT_KEY })
    if (result.ok) {
      setStatus('success')
      trackEvent('form_submit_success', 'conversion', 'home_contact')
      setToast({ id: Date.now(), kind: 'success', title: t.successTitle, body: t.successBody })
      setForm({ name: '', email: '', message: '', scope: [] })
    } else {
      setStatus('error')
      trackEvent('form_submit_error', 'conversion', `home_contact:${result.code}`)
      setUnsent(leadText(payload, isKo))
    }
  }

  return (
    <section
      id="contact"
      className="relative section-pad overflow-hidden"
      style={{
        background: 'var(--ivory)',
      }}
    >
      <Toast message={toast} onDismiss={() => setToast(null)} />

      {/* Soft sun-mesh atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(40% 35% at 88% 12%, rgba(0,113,227, 0.22) 0%, rgba(0,113,227, 0) 60%),
            radial-gradient(35% 30% at 8% 92%, rgba(0,113,227, 0.10) 0%, rgba(0,113,227, 0) 65%)
          `,
        }}
      />

      <div className="container-edge relative">
        {/* Header — centered, single statement */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <InView className="inline-flex items-center gap-3 overline text-ash mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#0071E3' }} />
            <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
            <span className="h-px w-8 bg-hairline" />
            <span>{t.eyebrow}</span>
          </InView>
          <h2
            className="font-display tracking-[-0.02em] leading-[1.0] m-0"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 400,
            }}
          >
            <InView as="span" className="mask-row">
              <span className="mask-rise block">{t.headlineLead}</span>
            </InView>
            <InView as="span" className="mask-row" delay={120}>
              <span className="mask-rise block italic font-light" style={{ color: 'var(--link)' }}>
                {t.headlineAccent}
              </span>
            </InView>
          </h2>
          <p
            className="mt-8 mx-auto max-w-xl text-[16px] md:text-[17px] leading-[1.65]"
            style={{ color: 'var(--graphite)' }}
          >
            {t.sub}
          </p>
        </div>

        {/* FORM — single card, dominant element, max-w-3xl */}
        <form onSubmit={submit} noValidate className="max-w-3xl mx-auto">
          <div
            className="bg-paper rounded-2xl p-7 md:p-10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.18),0_8px_20px_-8px_rgba(0,0,0,0.09)] border"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <Field
                id="contact-name"
                inputRef={nameRef}
                label={t.labels.name}
                placeholder={t.placeholders.name}
                value={form.name}
                error={errors.name}
                onChange={(v) => {
                  setForm({ ...form, name: v })
                  if (errors.name) setErrors((er) => ({ ...er, name: undefined }))
                }}
                autoComplete="name"
                required
              />
              <Field
                id="contact-email"
                inputRef={emailRef}
                label={t.labels.email}
                placeholder={t.placeholders.email}
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(v) => {
                  setForm({ ...form, email: v })
                  if (errors.email) setErrors((er) => ({ ...er, email: undefined }))
                }}
                autoComplete="email"
                required
              />
            </div>

            {/* Scope chips — optional but useful */}
            <div className="mt-7">
              <label
                className="block uppercase text-[12px] mb-3"
                style={{ letterSpacing: 'var(--ovl-track)', color: 'var(--ash)' }}
              >
                {t.labels.scope}
                <span className="ml-2 normal-case tracking-normal text-[12px]" style={{ color: 'var(--ash)' }}>
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
                      aria-pressed={active}
                      onClick={() => toggleScope(s)}
                      className="zl-chip"
                    >
                      {active && <Check aria-hidden size={15} strokeWidth={2.25} />}
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message textarea */}
            <div className="mt-7">
              <label
                className="block uppercase text-[12px] mb-3"
                style={{ letterSpacing: 'var(--ovl-track)', color: 'var(--ash)' }}
              >
                {t.labels.message}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.placeholders.message}
                rows={5}
                className="zl-field rounded-xl px-4 py-3.5 text-[15px] leading-[1.6] resize-y min-h-[128px]"
              />
            </div>

            {/* SEND BUTTON — big, coral, impossible to miss */}
            <div className="mt-8 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ash)' }}>
                <span
                  className="inline-block w-1 h-1 rounded-full mr-2 align-middle"
                  style={{ background: '#0071E3' }}
                />
                {t.privacy}
              </p>
              <Magnetic strength={16} radius={120}>
                <button
                  type="submit"
                  data-cursor={isKo ? '보내기' : 'Send'}
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-3 px-8 py-[18px] rounded-full text-[15px] font-medium transition duration-300 hover:scale-[1.02] hover:shadow-[0_24px_50px_-16px_rgba(0,113,227,0.55)] active:scale-[.97] active:duration-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  // Always the primary colour: a grey "not yet valid" button read as disabled. Missing fields are
                  // explained under the field on submit instead.
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--ivory)',
                    boxShadow: '0 18px 40px -14px rgba(0,113,227,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)',
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

        {status === 'error' && unsent && (
          <div className="max-w-3xl mx-auto mt-6">
            <LeadFallback locale={locale} text={unsent} />
          </div>
        )}

        {/* Alternative contact — email + KakaoTalk pills, prominent */}
        <div className="mt-12 md:mt-14 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-center">
            <span
              className="text-[12px] uppercase"
              style={{ letterSpacing: 'var(--ovl-track)', color: 'var(--ash)' }}
            >
              {t.altContact.label}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={t.altContact.emailHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] transition duration-200 hover:scale-[1.03]"
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span aria-hidden style={{ color: 'var(--link)' }}>✉</span>
                {t.altContact.email}
              </a>
              <a
                href={t.altContact.kakaoHref}
                target="_blank"
                rel="noopener noreferrer"
                data-kakao-loc="contact_section"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] transition duration-200 hover:scale-[1.03]"
                style={{
                  background: '#FEE500',
                  border: '1px solid rgba(0,0,0,0.09)',
                  color: '#3C1E1E',
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
            className="text-center text-[12px] uppercase mb-8"
            style={{ letterSpacing: 'var(--ovl-track)', color: 'var(--ash)' }}
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
                      background: 'rgba(0,113,227, 0.12)',
                      color: 'var(--link)',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="font-display italic text-[18px] md:text-[20px] font-light"
                    style={{ color: 'var(--ink)' }}
                  >
                    {when}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--graphite)' }}>
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
  id,
  inputRef,
  label,
  placeholder,
  helper,
  error,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
}: {
  id: string
  inputRef?: React.Ref<HTMLInputElement>
  label: string
  placeholder?: string
  helper?: string
  error?: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  const errorId = `${id}-error`
  return (
    <label className="block" htmlFor={id}>
      <span
        className="block uppercase text-[12px] mb-2.5"
        style={{ letterSpacing: 'var(--ovl-track)', color: 'var(--ash)' }}
      >
        {label}
        {required && (
          <span className="ml-1 align-top" style={{ color: 'var(--link)' }}>*</span>
        )}
      </span>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="zl-field rounded-xl px-4 py-3 text-[15px]"
      />
      {error && (
        <span id={errorId} role="alert" className="zl-error block mt-2 text-[13px] leading-snug">
          {error}
        </span>
      )}
      {helper && (
        <span className="block mt-1.5 text-[12px]" style={{ color: 'var(--ash)' }}>
          {helper}
        </span>
      )}
    </label>
  )
}
