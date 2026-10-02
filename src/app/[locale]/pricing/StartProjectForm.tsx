'use client'

import { useState } from 'react'
import Link from 'next/link'

const services = {
  en: [
    { id: 'webdesign', emoji: '🌐', title: 'Web Design & Development', desc: 'Custom website for any business — restaurant, medical, nonprofit, e-commerce.' },
    { id: 'revamp',   emoji: '⚡', title: 'Website Revamp & Migration', desc: 'On OpenCart, old WordPress, or Wix? We modernize and migrate to any platform.' },
    { id: 'seo',      emoji: '📈', title: 'SEO & GEO', desc: 'Rank on Google and get found by AI search (ChatGPT, Perplexity).' },
    { id: 'ads',      emoji: '🎯', title: 'Google Ads', desc: 'Get in front of customers immediately with targeted ad campaigns.' },
    { id: 'social',   emoji: '📱', title: 'Social Media Management', desc: 'We post for you — Instagram, TikTok, Facebook, Google Business.' },
  ],
  ko: [
    { id: 'webdesign', emoji: '🌐', title: '웹사이트 디자인 & 개발', desc: '식당, 의료, 비영리, 이커머스 등 모든 업종의 맞춤 웹사이트.' },
    { id: 'revamp',   emoji: '⚡', title: '웹사이트 리뉴얼 & 이전', desc: 'OpenCart, 구형 워드프레스, Wix 사용 중이신가요? 원하는 플랫폼으로 이전해드립니다.' },
    { id: 'seo',      emoji: '📈', title: 'SEO & GEO', desc: '구글 상위 노출 + AI 검색(ChatGPT, Perplexity) 최적화.' },
    { id: 'ads',      emoji: '🎯', title: '구글 광고', desc: '타겟 광고로 즉시 신규 고객을 확보하세요.' },
    { id: 'social',   emoji: '📱', title: '소셜미디어 관리', desc: '인스타그램, 틱톡, 페이스북, 구글 비즈니스 — 저희가 대신 포스팅합니다.' },
  ],
}

const copy = {
  en: {
    step1Label: 'Step 1 of 2',
    step2Label: 'Step 2 of 2',
    headline: 'Want a custom plan\ninstead?',
    sub: 'The prices above are real. If you want a plan scoped to your exact project, tell us what you\'re building — we\'ll come back with a custom plan within one business day.',
    pickLabel: 'What are you looking for?',
    pickHint: 'Pick everything that applies',
    nextBtn: 'Next — tell us about your project →',
    step2Headline: 'Almost there.',
    step2Sub: 'A few quick details and we\'ll put together a custom plan for you.',
    namePlaceholder: 'Your name',
    businessPlaceholder: 'Business name (optional)',
    emailPlaceholder: 'Email address',
    phonePlaceholder: 'Phone or KakaoTalk ID (optional)',
    descPlaceholder: 'Tell us a bit about your project — what do you have now, what do you want?',
    submitBtn: 'Send — get my custom plan',
    sending: 'Sending...',
    backBtn: '← Back',
    successHeadline: "We got it. 🎉",
    successSub: "We'll review your project and get back to you within one business day with ideas and next steps.",
    successBack: 'Back to home',
    required: 'Please select at least one service.',
    requiredContact: 'Please fill in your name and email.',
  },
  ko: {
    step1Label: '1단계 / 2단계',
    step2Label: '2단계 / 2단계',
    headline: '맞춤 플랜이\n필요하신가요?',
    sub: '위 가격은 실제 가격입니다. 내 프로젝트에 딱 맞는 플랜이 필요하시면 원하시는 것만 말씀해 주세요 — 영업일 기준 24시간 내에 맞춤 플랜으로 연락드립니다.',
    pickLabel: '어떤 서비스가 필요하신가요?',
    pickHint: '해당되는 것을 모두 선택해 주세요',
    nextBtn: '다음 — 프로젝트 설명 →',
    step2Headline: '거의 다 됐어요.',
    step2Sub: '간단한 정보만 입력해 주시면 맞춤 플랜을 준비해 드립니다.',
    namePlaceholder: '이름',
    businessPlaceholder: '비즈니스 이름 (선택)',
    emailPlaceholder: '이메일 주소',
    phonePlaceholder: '전화번호 또는 카카오톡 ID (선택)',
    descPlaceholder: '현재 상황과 원하시는 것을 간단히 알려주세요.',
    submitBtn: '보내기 — 맞춤 플랜 받기',
    sending: '전송 중...',
    backBtn: '← 이전',
    successHeadline: '접수됐습니다. 🎉',
    successSub: '영업일 기준 24시간 내에 아이디어와 다음 단계를 포함한 맞춤 플랜을 보내드립니다.',
    successBack: '홈으로 돌아가기',
    required: '서비스를 하나 이상 선택해 주세요.',
    requiredContact: '이름과 이메일을 입력해 주세요.',
  },
}

export default function StartProjectForm({ locale }: { locale: 'en' | 'ko' }) {
  const prefix = locale === 'ko' ? '/ko' : ''
  const t = copy[locale]
  const serviceList = services[locale]

  const [step, setStep] = useState<1 | 2 | 'done'>(1)
  const [selected, setSelected] = useState<string[]>([])
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', desc: '' })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    setError('')
  }

  const goStep2 = () => {
    if (selected.length === 0) { setError(t.required); return }
    setStep(2)
  }

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) { setError(t.requiredContact); return }
    setSending(true)
    const selectedTitles = serviceList.filter(s => selected.includes(s.id)).map(s => s.title).join(', ')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          email: form.email,
          phone: form.phone,
          message: `Services: ${selectedTitles}\n\n${form.desc}`,
          locale,
        }),
      })
    } catch (_) {}
    setSending(false)
    setStep('done')
  }

  return (
    <div className="container mx-auto px-6 max-w-3xl relative z-10">
      <>

        {/* ── Step 1: Pick services ── */}
        {step === 1 && (
          <div
            key="step1"
          >
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-action flex items-center justify-center text-white text-[11px] font-black">1</div>
                <span className="text-[11px] font-black text-link tracking-widest uppercase">{t.step1Label}</span>
              </div>
              <div className="flex-1 h-px bg-bone" />
              <div className="w-6 h-6 rounded-full bg-bone flex items-center justify-center text-mute text-[11px] font-black">2</div>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl font-black text-ink leading-[0.95] tracking-tight mb-4 whitespace-pre-line">
              {t.headline}
            </h2>
            <p className="text-ash text-base leading-relaxed mb-12 max-w-lg">{t.sub}</p>

            {/* Service cards */}
            <p className="text-xs font-black tracking-[0.2em] text-mute uppercase mb-4">
              {t.pickLabel} <span className="text-mute normal-case font-normal tracking-normal">— {t.pickHint}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {serviceList.map((s) => {
                const on = selected.includes(s.id)
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    className={`text-left rounded-2xl p-5 border transition duration-200 ${
                      on
                        ? 'bg-action/10 border-action/50 shadow-[0_0_20px_rgba(0,113,227,0.1)]'
                        : 'bg-paper border-black/[0.08] hover:border-black/[0.14]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{s.emoji}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition flex-shrink-0 ${
                        on ? 'bg-action border-action' : 'border-black/[0.14]'
                      }`}>
                        {on && <span className="text-ink text-[10px] font-black">✓</span>}
                      </div>
                    </div>
                    <h3 className={`font-black text-sm mb-1 transition-colors ${on ? 'text-ink' : 'text-graphite'}`}>
                      {s.title}
                    </h3>
                    <p className="text-mute text-xs leading-relaxed">{s.desc}</p>
                  </button>
                )
              })}
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              onClick={goStep2}
              className="w-full sm:w-auto relative overflow-hidden bg-action text-white font-black px-8 py-4 rounded-xl text-sm flex items-center gap-2"
            >
              {t.nextBtn}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
              />
            </button>
          </div>
        )}

        {/* ── Step 2: Contact details ── */}
        {step === 2 && (
          <div
            key="step2"
          >
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-ink text-[11px] font-black">✓</div>
              <div className="flex-1 h-px bg-action/40" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-action flex items-center justify-center text-white text-[11px] font-black">2</div>
                <span className="text-[11px] font-black text-link tracking-widest uppercase">{t.step2Label}</span>
              </div>
            </div>

            {/* Selected summary */}
            <div className="flex flex-wrap gap-2 mb-8">
              {serviceList.filter(s => selected.includes(s.id)).map(s => (
                <span key={s.id} className="inline-flex items-center gap-1.5 bg-action/15 border border-action/30 text-link rounded-full px-3 py-1 text-xs font-bold">
                  {s.emoji} {s.title}
                </span>
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-ink leading-tight tracking-tight mb-3">
              {t.step2Headline}
            </h2>
            <p className="text-ash text-base mb-10">{t.step2Sub}</p>

            <div className="space-y-3 mb-8">
              {[
                { key: 'name', placeholder: t.namePlaceholder, required: true },
                { key: 'business', placeholder: t.businessPlaceholder, required: false },
                { key: 'email', placeholder: t.emailPlaceholder, required: true, type: 'email' },
                { key: 'phone', placeholder: t.phonePlaceholder, required: false },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type || 'text'}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-paper border border-black/[0.08] rounded-xl px-4 py-3.5 text-ink placeholder-mute text-sm focus:outline-none focus:border-action/50 transition-colors"
                />
              ))}
              <textarea
                placeholder={t.descPlaceholder}
                rows={4}
                value={form.desc}
                onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                className="w-full bg-paper border border-black/[0.08] rounded-xl px-4 py-3.5 text-ink placeholder-mute text-sm focus:outline-none focus:border-action/50 transition-colors resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setStep(1); setError('') }}
                className="px-5 py-3.5 rounded-xl bg-black/[0.03] text-ash hover:bg-bone hover:text-ink transition text-sm font-medium"
              >
                {t.backBtn}
              </button>
              <button
                onClick={submit}
                disabled={sending}
                className="flex-1 relative overflow-hidden bg-action text-white font-black px-8 py-3.5 rounded-xl text-sm disabled:opacity-60"
              >
                {sending ? t.sending : t.submitBtn}
                {!sending && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12"
                  />
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Done ── */}
        {step === 'done' && (
          <div
            key="done"
            className="text-center py-20"
          >
            <div
              className="w-20 h-20 rounded-full bg-action/20 border border-action/40 flex items-center justify-center text-4xl mx-auto mb-8"
            >
              🎉
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-ink mb-4">{t.successHeadline}</h2>
            <p className="text-ash text-lg max-w-md mx-auto mb-10">{t.successSub}</p>
            <Link
              href={prefix || '/'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black/[0.03] border border-black/[0.08] text-graphite hover:bg-bone hover:text-ink transition text-sm font-medium"
            >
              {t.successBack}
            </Link>
          </div>
        )}

      </>
    </div>
  )
}
