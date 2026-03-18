'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
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
    headline: "Let's figure out\nwhat you need.",
    sub: 'No forms. No pricing tables. Just tell us what you\'re building — we\'ll come back with a custom plan within 24 hours.',
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
    successSub: "We'll review your project and get back to you within 24 hours with ideas and next steps.",
    successBack: 'Back to home',
    required: 'Please select at least one service.',
    requiredContact: 'Please fill in your name and email.',
  },
  ko: {
    step1Label: '1단계 / 2단계',
    step2Label: '2단계 / 2단계',
    headline: '무엇이 필요하신지\n알려주세요.',
    sub: '복잡한 양식도, 가격표도 없습니다. 원하시는 것만 말씀해 주시면 24시간 내에 맞춤 플랜으로 연락드립니다.',
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
    successSub: '24시간 내에 아이디어와 다음 단계를 포함한 맞춤 플랜을 보내드립니다.',
    successBack: '홈으로 돌아가기',
    required: '서비스를 하나 이상 선택해 주세요.',
    requiredContact: '이름과 이메일을 입력해 주세요.',
  },
}

export default function StartProjectPage() {
  const params = useParams()
  const locale = (params?.locale as string) === 'ko' ? 'ko' : 'en'
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
    <>
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-[#080808] pt-28 pb-24 relative overflow-hidden">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(177,36,146,0.06),transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-3xl relative z-10">

          <AnimatePresence mode="wait">

            {/* ── Step 1: Pick services ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#B12492] flex items-center justify-center text-white text-[11px] font-black">1</div>
                    <span className="text-[11px] font-black text-[#B12492] tracking-widest uppercase">{t.step1Label}</span>
                  </div>
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-600 text-[11px] font-black">2</div>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-4 whitespace-pre-line">
                  {t.headline}
                </h1>
                <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-lg">{t.sub}</p>

                {/* Service cards */}
                <p className="text-xs font-black tracking-[0.2em] text-gray-600 uppercase mb-4">
                  {t.pickLabel} <span className="text-gray-700 normal-case font-normal tracking-normal">— {t.pickHint}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {serviceList.map((s) => {
                    const on = selected.includes(s.id)
                    return (
                      <motion.button
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        whileTap={{ scale: 0.97 }}
                        className={`text-left rounded-2xl p-5 border transition-all duration-200 ${
                          on
                            ? 'bg-[#B12492]/10 border-[#B12492]/50 shadow-[0_0_20px_rgba(177,36,146,0.1)]'
                            : 'bg-[#0e0e0e] border-white/[0.07] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-2xl">{s.emoji}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            on ? 'bg-[#B12492] border-[#B12492]' : 'border-white/20'
                          }`}>
                            {on && <span className="text-white text-[10px] font-black">✓</span>}
                          </div>
                        </div>
                        <h3 className={`font-black text-sm mb-1 transition-colors ${on ? 'text-white' : 'text-gray-300'}`}>
                          {s.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
                      </motion.button>
                    )
                  })}
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <motion.button
                  onClick={goStep2}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto relative overflow-hidden bg-[#B12492] text-white font-black px-8 py-4 rounded-xl text-sm flex items-center gap-2"
                >
                  {t.nextBtn}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.button>
              </motion.div>
            )}

            {/* ── Step 2: Contact details ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-[11px] font-black">✓</div>
                  <div className="flex-1 h-px bg-[#B12492]/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#B12492] flex items-center justify-center text-white text-[11px] font-black">2</div>
                    <span className="text-[11px] font-black text-[#B12492] tracking-widest uppercase">{t.step2Label}</span>
                  </div>
                </div>

                {/* Selected summary */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {serviceList.filter(s => selected.includes(s.id)).map(s => (
                    <span key={s.id} className="inline-flex items-center gap-1.5 bg-[#B12492]/15 border border-[#B12492]/30 text-[#B12492] rounded-full px-3 py-1 text-xs font-bold">
                      {s.emoji} {s.title}
                    </span>
                  ))}
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
                  {t.step2Headline}
                </h2>
                <p className="text-gray-500 text-base mb-10">{t.step2Sub}</p>

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
                      className="w-full bg-[#0e0e0e] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#B12492]/50 transition-colors"
                    />
                  ))}
                  <textarea
                    placeholder={t.descPlaceholder}
                    rows={4}
                    value={form.desc}
                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                    className="w-full bg-[#0e0e0e] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#B12492]/50 transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { setStep(1); setError('') }}
                    className="px-5 py-3.5 rounded-xl bg-white/[0.05] text-gray-400 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
                  >
                    {t.backBtn}
                  </button>
                  <motion.button
                    onClick={submit}
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 relative overflow-hidden bg-[#B12492] text-white font-black px-8 py-3.5 rounded-xl text-sm disabled:opacity-60"
                  >
                    {sending ? t.sending : t.submitBtn}
                    {!sending && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── Done ── */}
            {step === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#B12492]/20 border border-[#B12492]/40 flex items-center justify-center text-4xl mx-auto mb-8"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.successHeadline}</h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">{t.successSub}</p>
                <Link
                  href={prefix || '/'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
                >
                  {t.successBack}
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
