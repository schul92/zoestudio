'use client'

import { useId, useState } from 'react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import Toast, { ToastMessage } from '@/components/ui/motion/Toast'

type Status = 'idle' | 'loading' | 'success' | 'error'

const copy = {
  en: {
    eyebrow: 'Inquiries',
    headline1: 'Tell us what',
    headline2: 'you are building.',
    sub: 'We reply within one business day in English or Korean. No templates — every project begins with a conversation.',
    stepA: 'About you',
    stepB: 'About the project',
    stepC: 'Details',
    labels: {
      name: 'Your name',
      email: 'Email',
      business: 'Business or project',
      phone: 'Phone',
      message: 'Tell us a little more',
      budget: 'Approximate budget',
      scope: 'Scope of interest',
    },
    placeholders: {
      name: 'e.g. Yuna Kim',
      email: 'you@company.com',
      business: 'e.g. Ridgewood Dental · new website',
      phone: '+1 (201) 555-0134',
      message:
        'What are you hoping to build? Any deadlines? A site or brand you love as a reference? A few sentences is plenty.',
    },
    helpers: {
      name: "We'll address you by name in our reply.",
      email: 'We reply to this address within one business day.',
      business: 'Optional. Helps us prepare for our first call.',
      phone: 'Optional. We prefer email for first contact.',
      message: 'Anything is useful — rough goals, a rough timeline, a link.',
      scope: 'Pick one or many. You can always refine later.',
      budget: 'Rough range helps us shape the right proposal.',
    },
    scopes: ['Web design', 'Rebuild / revamp', 'SEO & GEO', 'Shopify', 'Google / Yelp ads', 'Social media', 'Not sure yet'],
    budgets: ['< $5k', '$5k — $10k', '$10k — $25k', '$25k+'],
    send: 'Send inquiry',
    sending: 'Sending…',
    success: 'Thank you. We will be in touch within a business day.',
    successTitle: 'Inquiry sent',
    successBody: "We've received your message. Expect a reply within one business day.",
    error: 'Something went wrong. Please try again or email info@zoelumos.com.',
    errorTitle: 'Could not send',
    errorBody: 'Please try again or email info@zoelumos.com directly.',
    required: 'required',
    required_err: 'Please complete your name and email to send.',
    requiredTitle: 'Almost there',
    progress: ['Begin', 'Nicely started', 'Halfway there', 'One more step', 'Ready to send'],
    whatsNext: {
      title: 'What happens next',
      steps: [
        ['Today', 'We read every message personally and reply within one business day.'],
        ['Day 2 — 3', 'A 30-minute call to understand your business, audience, and goals.'],
        ['Week 1', 'A written proposal with scope, timeline, and a fixed investment.'],
      ] as [string, string][],
    },
    contactBlock: {
      title: 'Or reach us directly',
      lines: [
        ['Email', 'info@zoelumos.com'],
        ['Studio', 'Fort Lee, New Jersey'],
        ['Hours', 'Mon — Fri · 9–6 ET · KR 대응'],
      ] as [string, string][],
    },
    privacy: 'Your information is used only to reply to your inquiry.',
  },
  ko: {
    eyebrow: '상담 신청',
    headline1: '무엇을 만들고',
    headline2: '계신가요.',
    sub: '영업일 기준 1일 이내에 한국어 · 영어로 회신드립니다. 템플릿 없음 — 모든 프로젝트는 대화에서 시작합니다.',
    stepA: '기본 정보',
    stepB: '프로젝트',
    stepC: '자세한 내용',
    labels: {
      name: '이름',
      email: '이메일',
      business: '비즈니스 · 프로젝트',
      phone: '연락처',
      message: '프로젝트에 대해 알려주세요',
      budget: '예상 예산',
      scope: '관심 분야',
    },
    placeholders: {
      name: '예: 김유나',
      email: 'you@company.com',
      business: '예: 리지우드 치과 · 신규 사이트',
      phone: '010-1234-5678',
      message:
        '어떤 것을 만들고 싶으신가요? 일정, 참고하는 사이트나 브랜드가 있으신가요? 몇 줄이면 충분합니다.',
    },
    helpers: {
      name: '회신 시 호칭을 드릴 때 사용합니다.',
      email: '영업일 기준 1일 이내 이 주소로 답장드립니다.',
      business: '선택 · 첫 미팅을 준비하는 데 도움이 됩니다.',
      phone: '선택 · 첫 연락은 이메일을 선호합니다.',
      message: '어떤 내용이든 괜찮습니다 — 대략적인 목표, 일정, 참고 링크.',
      scope: '하나 이상 선택 가능. 나중에 조정 가능합니다.',
      budget: '대략적인 범위만 알려주셔도 맞춤 제안이 가능합니다.',
    },
    scopes: ['웹디자인', '리뉴얼', 'SEO · GEO', 'Shopify', '구글 · 옐프 광고', '소셜미디어', '아직 모르겠습니다'],
    budgets: ['$5,000 미만', '$5,000 — $10,000', '$10,000 — $25,000', '$25,000 이상'],
    send: '의뢰 보내기',
    sending: '보내는 중…',
    success: '감사합니다. 영업일 1일 이내 회신드립니다.',
    successTitle: '의뢰가 전송되었습니다',
    successBody: '메시지를 확인했습니다. 영업일 1일 이내 회신드립니다.',
    error: '문제가 발생했습니다. 다시 시도하시거나 info@zoelumos.com 으로 메일 주세요.',
    errorTitle: '전송 실패',
    errorBody: '다시 시도해 주시거나 info@zoelumos.com 으로 직접 메일 주세요.',
    required: '필수',
    required_err: '이름과 이메일을 입력해 주세요.',
    requiredTitle: '거의 다 왔어요',
    progress: ['시작하기', '잘 하고 계세요', '절반 왔어요', '한 단계 남았어요', '보낼 준비 완료'],
    whatsNext: {
      title: '다음 단계',
      steps: [
        ['오늘', '모든 메시지를 직접 확인하고 영업일 기준 1일 이내 회신드립니다.'],
        ['2 — 3일 차', '비즈니스, 고객, 목표를 이해하기 위한 30분 통화.'],
        ['1주 차', '범위, 일정, 확정 견적이 담긴 제안서를 문서로 발송.'],
      ] as [string, string][],
    },
    contactBlock: {
      title: '직접 연락',
      lines: [
        ['이메일', 'info@zoelumos.com'],
        ['스튜디오', '뉴저지 포트리'],
        ['시간', '월 — 금 · 9–6 ET · 한국어 상담 상시'],
      ] as [string, string][],
    },
    privacy: '보내주신 정보는 상담 회신에만 사용됩니다.',
  },
}

export default function ContactWrapper({
  locale = 'en',
  sectionNumber = '06',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const t = copy[locale as 'en' | 'ko'] || copy.en
  const isKo = locale === 'ko'

  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    phone: '',
    message: '',
    budget: '',
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return

    // Client-side required check with a toast, not a dead form
    if (!form.name.trim() || !form.email.trim()) {
      setToast({
        id: Date.now(),
        kind: 'info',
        title: t.requiredTitle,
        body: t.required_err,
      })
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business: form.business,
          message: `${form.message}\n\nBudget: ${form.budget || 'n/a'}`,
          services: form.scope.join(' | '),
          to: 'info@zoelumos.com',
        }),
      })
      if (!res.ok) throw new Error('bad response')
      setStatus('success')
      setToast({
        id: Date.now(),
        kind: 'success',
        title: t.successTitle,
        body: t.successBody,
      })
      setForm({ name: '', email: '', business: '', phone: '', message: '', budget: '', scope: [] })
    } catch {
      setStatus('error')
      setToast({
        id: Date.now(),
        kind: 'error',
        title: t.errorTitle,
        body: t.errorBody,
      })
    }
  }

  // progress — 4 key dimensions
  const steps = [
    form.name.trim().length > 0,
    form.email.trim().length > 0,
    form.scope.length > 0,
    form.message.trim().length > 0,
  ]
  const progress = steps.filter(Boolean).length

  return (
    <section id="contact" className="relative bg-ivory section-pad">
      <Toast message={toast} onDismiss={() => setToast(null)} />

      <div className="container-edge">
        {/* Header band */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-16 md:mb-20">
          <div className="md:col-span-6">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{t.eyebrow}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{t.headline1}</span>
              </InView>
              <InView as="span" className="mask-row" delay={150}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {t.headline2}
                </span>
              </InView>
            </h2>
            <p className="mt-8 text-body-lg text-graphite leading-[1.7] max-w-md">{t.sub}</p>
          </div>

          {/* What happens next */}
          <div className="md:col-span-5 md:col-start-8">
            <InView className="reveal">
              <div className="p-8 md:p-10 rounded-[4px] bg-bone hair-y">
                <p className="overline text-ash mb-6">{t.whatsNext.title}</p>
                <ol className="space-y-6">
                  {t.whatsNext.steps.map(([when, desc], i) => (
                    <li key={when} className="flex gap-5 items-start">
                      <span className="section-num text-sm text-gold shrink-0 mt-1 w-10">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-display text-lg text-ink italic font-light leading-tight">
                          {when}
                        </p>
                        <p className="mt-1 text-[13px] text-graphite leading-[1.65]">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </InView>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-5 mb-12 md:mb-16">
          <span className="overline text-ink">
            {progress}
            <span className="text-ash">/4</span>
          </span>
          <div className="flex-1 flex items-center gap-1">
            {steps.map((done, i) => (
              <span
                key={i}
                className={`h-[2px] flex-1 rounded-full transition-all duration-700 ${
                  done ? 'bg-ink' : 'bg-hairline'
                }`}
              />
            ))}
          </div>
          <span className="overline text-ash hidden md:inline">{t.progress[progress]}</span>
        </div>

        <form onSubmit={submit} noValidate>
          {/* Step A */}
          <StepPanel letter="A" title={t.stepA} done={steps[0] && steps[1]}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              <Field
                label={t.labels.name}
                placeholder={t.placeholders.name}
                helper={t.helpers.name}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
                requiredLabel={t.required}
                autoComplete="name"
              />
              <Field
                label={t.labels.email}
                placeholder={t.placeholders.email}
                helper={t.helpers.email}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
                requiredLabel={t.required}
                autoComplete="email"
              />
            </div>
          </StepPanel>

          {/* Step B */}
          <StepPanel letter="B" title={t.stepB} done={form.scope.length > 0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 mb-10">
              <Field
                label={t.labels.business}
                placeholder={t.placeholders.business}
                helper={t.helpers.business}
                value={form.business}
                onChange={(v) => setForm({ ...form, business: v })}
                autoComplete="organization"
              />
              <Field
                label={t.labels.phone}
                placeholder={t.placeholders.phone}
                helper={t.helpers.phone}
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                autoComplete="tel"
              />
            </div>

            <div className="mb-10">
              <ChipGroupHeader label={t.labels.scope} helper={t.helpers.scope} count={form.scope.length} />
              <div className="flex flex-wrap gap-2">
                {t.scopes.map((s) => {
                  const active = form.scope.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleScope(s)}
                      className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 border ${
                        active
                          ? 'bg-ink text-ivory border-ink'
                          : 'text-graphite border-hairline hover:border-ink'
                      }`}
                    >
                      {active && <span className="mr-1">✓</span>}
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <ChipGroupHeader
                label={t.labels.budget}
                helper={t.helpers.budget}
                count={form.budget ? 1 : 0}
              />
              <div className="flex flex-wrap gap-2">
                {t.budgets.map((b) => {
                  const active = form.budget === b
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm({ ...form, budget: active ? '' : b })}
                      className={`px-4 py-2 rounded-full text-[13px] transition-all duration-300 border ${
                        active
                          ? 'bg-ink text-ivory border-ink'
                          : 'text-graphite border-hairline hover:border-ink'
                      }`}
                    >
                      {active && <span className="mr-1">✓</span>}
                      {b}
                    </button>
                  )
                })}
              </div>
            </div>
          </StepPanel>

          {/* Step C */}
          <StepPanel letter="C" title={t.stepC} done={steps[3]}>
            <TextArea
              label={t.labels.message}
              placeholder={t.placeholders.message}
              helper={t.helpers.message}
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
            />
          </StepPanel>

          {/* Submit */}
          <div className="mt-14 pt-10 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <p className="md:col-span-7 text-[12px] text-ash leading-relaxed max-w-md">
              <span className="gold-dot mr-2 align-middle" />
              {t.privacy}
            </p>
            <div className="md:col-span-5 flex justify-start md:justify-end">
              <Magnetic strength={14}>
                <button
                  type="submit"
                  data-cursor={isKo ? '보내기' : 'Send'}
                  className="btn-ink disabled:opacity-50 min-w-[190px] justify-center"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-ivory/60 border-t-ivory rounded-full animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      {t.send}
                      <span className="arrow">→</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </form>

        {/* Direct contact */}
        <div className="mt-24 pt-12 border-t border-hairline grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="overline text-ash">{t.contactBlock.title}</p>
          </div>
          <dl className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-10">
            {t.contactBlock.lines.map(([k, v]) => (
              <div key={k}>
                <dt className="overline text-ash mb-2">{k}</dt>
                <dd className="font-display text-xl md:text-2xl text-ink italic font-light fraunces-soft">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────── */

function StepPanel({
  letter,
  title,
  done,
  children,
}: {
  letter: string
  title: string
  done: boolean
  children: React.ReactNode
}) {
  return (
    <section className="relative mb-20 md:mb-24">
      <header className="flex items-center gap-4 mb-10">
        <span
          className={`relative flex items-center justify-center w-11 h-11 rounded-full border transition-colors duration-500 ${
            done ? 'bg-ink border-ink text-ivory' : 'border-hairline text-gold'
          }`}
          aria-hidden
        >
          {done ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.5l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <span className="section-num italic text-xl leading-none">{letter}</span>
          )}
        </span>
        <span className="h-px flex-1 bg-hairline max-w-[120px]" />
        <span className="overline text-ink">{title}</span>
      </header>
      {children}
    </section>
  )
}

function ChipGroupHeader({
  label,
  helper,
  count,
}: {
  label: string
  helper: string
  count: number
}) {
  return (
    <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-3">
        <label className="overline text-ink">{label}</label>
        {count > 0 && (
          <span className="overline text-gold">
            {count} selected
          </span>
        )}
      </div>
      <span className="text-[11px] text-ash">{helper}</span>
    </div>
  )
}

function Field({
  label,
  placeholder,
  helper,
  type = 'text',
  value,
  onChange,
  required,
  requiredLabel = 'required',
  autoComplete,
}: {
  label: string
  placeholder?: string
  helper?: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  requiredLabel?: string
  autoComplete?: string
}) {
  const id = useId()
  const [focus, setFocus] = useState(false)
  const filled = value.length > 0

  return (
    <div className="py-4 md:py-5 group relative">
      <div className="flex items-baseline justify-between mb-3">
        <label
          htmlFor={id}
          className={`overline transition-colors duration-300 ${
            focus ? 'text-gold' : filled ? 'text-ink' : 'text-ash'
          }`}
        >
          {label}
        </label>
        {required && (
          <span
            className={`text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
              filled ? 'text-ink/40' : 'text-gold'
            }`}
          >
            {filled ? '✓' : `* ${requiredLabel}`}
          </span>
        )}
      </div>

      {/* Input with its own visible container */}
      <div
        className={`relative border-b-2 pb-2 transition-colors duration-500 ${
          focus
            ? 'border-gold'
            : filled
            ? 'border-ink'
            : 'border-hairline group-hover:border-ash'
        }`}
      >
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2 text-[18px] md:text-[20px] text-ink placeholder:text-mute/70 placeholder:italic placeholder:font-light focus:outline-none"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        />
        {/* Active corner tick */}
        {focus && (
          <span
            aria-hidden
            className="absolute right-0 -top-1 text-gold text-[10px] tracking-[0.18em] uppercase"
          >
            typing
          </span>
        )}
      </div>

      <p
        className={`mt-2 text-[12px] transition-colors duration-300 ${
          focus ? 'text-ink/70' : 'text-ash/70'
        }`}
      >
        {helper}
      </p>
    </div>
  )
}

function TextArea({
  label,
  placeholder,
  helper,
  value,
  onChange,
}: {
  label: string
  placeholder?: string
  helper?: string
  value: string
  onChange: (v: string) => void
}) {
  const id = useId()
  const [focus, setFocus] = useState(false)
  const filled = value.length > 0
  const chars = value.length

  return (
    <div className="py-4 group">
      <div className="flex items-baseline justify-between mb-3">
        <label
          htmlFor={id}
          className={`overline transition-colors duration-300 ${
            focus ? 'text-gold' : filled ? 'text-ink' : 'text-ash'
          }`}
        >
          {label}
        </label>
        <span className="text-[11px] text-ash">
          {chars > 0 ? `${chars} ${chars === 1 ? 'char' : 'chars'}` : helper}
        </span>
      </div>
      <div
        className={`border-b-2 pb-2 transition-colors duration-500 ${
          focus
            ? 'border-gold'
            : filled
            ? 'border-ink'
            : 'border-hairline group-hover:border-ash'
        }`}
      >
        <textarea
          id={id}
          name={id}
          rows={4}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2 text-[17px] md:text-[18px] text-ink placeholder:text-mute/70 placeholder:italic placeholder:font-light focus:outline-none resize-none leading-[1.7]"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        />
      </div>
      {!filled && (
        <p className="mt-2 text-[12px] text-ash/70">{helper}</p>
      )}
    </div>
  )
}
