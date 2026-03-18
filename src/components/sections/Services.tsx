'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useServices } from '@/context/ServiceContext'
import { useTracking } from '@/hooks/useTracking'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const { addService, removeService, isServiceSelected, selectedServices } = useServices()
  const [showTooltip, setShowTooltip] = useState(false)
  const { trackServiceClick } = useTracking()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const isKo = locale === 'ko'
  const [scrolling, setScrolling] = useState(false)

  const services = [
    {
      id: 'webdesign',
      number: '01',
      emoji: '🌐',
      title: t.services.webDesign.title,
      description: t.services.webDesign.description,
      features: t.services.webDesign.features,
      benefit: t.services.webDesign.benefit,
      seoBadge: true,
    },
    {
      id: 'revamp',
      number: '02',
      emoji: '⚡',
      title: t.services.revamp.title,
      description: t.services.revamp.description,
      features: t.services.revamp.features,
      benefit: t.services.revamp.benefit,
      seoBadge: true,
    },
    {
      id: 'seo',
      number: '03',
      emoji: '📈',
      title: t.services.seo.title,
      description: t.services.seo.description,
      features: t.services.seo.features,
      benefit: t.services.seo.benefit,
      seoBadge: false,
    },
    {
      id: 'googleads',
      number: '04',
      emoji: '🎯',
      title: t.services.googleAds.title,
      description: t.services.googleAds.description,
      features: t.services.googleAds.features,
      benefit: t.services.googleAds.benefit,
      seoBadge: false,
    },
    {
      id: 'socialmedia',
      number: '05',
      emoji: '📱',
      title: t.services.socialMedia.title,
      description: t.services.socialMedia.description,
      features: t.services.socialMedia.features,
      benefit: t.services.socialMedia.benefit,
      seoBadge: false,
    },
  ]

  const handleClick = (service: typeof services[0]) => {
    trackServiceClick(service.title)
    if (isServiceSelected(service.id)) {
      removeService(service.id)
    } else {
      addService({ id: service.id, title: service.title, description: service.description })
      if (selectedServices.length === 0) {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 5000)
      }
    }
  }

  const seoBadgeLabel = isKo ? 'SEO + GEO 포함' : 'SEO + GEO Included'
  const selectLabel = isKo ? '+ 선택하기' : '+ Select'
  const selectedLabel = isKo ? '✓ 선택됨' : '✓ Selected'

  return (
    <section id="services" className="py-28 bg-[#080808] relative overflow-hidden">
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_50%,transparent_50%,#080808_100%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#B12492]" />
            <span className="text-[11px] font-black tracking-[0.25em] text-[#B12492] uppercase">
              {isKo ? '서비스' : 'Our Services'}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-5">
            {isKo ? (
              <>우리가 만듭니다.<br /><span className="text-gray-500">당신은 발견됩니다.</span></>
            ) : (
              <>We Build.<br /><span className="text-gray-500">You Get Found.</span></>
            )}
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-lg leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* ── Top row: 2 primary cards ── */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          {services.slice(0, 2).map((service, i) => {
            const selected = mounted && isServiceSelected(service.id)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                onClick={() => handleClick(service)}
                className={`group relative rounded-3xl p-8 md:p-10 cursor-pointer overflow-hidden transition-all duration-300 ${
                  selected
                    ? 'bg-[#B12492]/10 border border-[#B12492]/50 shadow-[0_0_40px_rgba(177,36,146,0.12)]'
                    : 'bg-[#0e0e0e] border border-white/[0.07] hover:border-white/[0.15] hover:bg-[#111]'
                }`}
              >
                {/* Ghost number */}
                <span className="pointer-events-none select-none absolute -bottom-6 -right-4 text-[11rem] font-black leading-none text-white/[0.025]">
                  {service.number}
                </span>

                {/* Top meta row */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[11px] font-black tracking-[0.2em] text-gray-700">{service.number}</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#B12492]/15 text-[#B12492] border border-[#B12492]/25 rounded-full px-3 py-1 text-[11px] font-black tracking-wide">
                      ✦ {seoBadgeLabel}
                    </span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-7 h-7 rounded-full bg-[#B12492] flex items-center justify-center text-white text-xs font-black"
                      >✓</motion.span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-sm">
                  {service.description}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((f: string, fi: number) => (
                    <span
                      key={fi}
                      className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                        f.includes('SEO') || f.includes('GEO')
                          ? 'bg-[#B12492]/10 border-[#B12492]/30 text-[#B12492]'
                          : 'bg-white/[0.04] border-white/[0.08] text-gray-500'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition-all ${
                  selected
                    ? 'bg-[#B12492] text-white'
                    : 'bg-white text-black group-hover:bg-gray-100'
                }`}>
                  {selected ? selectedLabel : selectLabel}
                  {!selected && (
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      →
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom row: 3 supporting cards ── */}
        <div className="grid md:grid-cols-3 gap-3 mb-16">
          {services.slice(2).map((service, i) => {
            const selected = mounted && isServiceSelected(service.id)
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                onClick={() => handleClick(service)}
                className={`group relative rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
                  selected
                    ? 'bg-amber-400/[0.08] border border-amber-400/40 shadow-[0_0_24px_rgba(251,191,36,0.08)]'
                    : 'bg-[#0e0e0e] border border-white/[0.07] hover:border-white/[0.15] hover:bg-[#111]'
                }`}
              >
                {/* Ghost number */}
                <span className="pointer-events-none select-none absolute -bottom-4 -right-2 text-[7rem] font-black leading-none text-white/[0.025]">
                  {service.number}
                </span>

                {/* Number + selected check */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black tracking-[0.2em] text-gray-700">{service.number}</span>
                  {selected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-black text-[10px] font-black"
                    >✓</motion.span>
                  )}
                </div>

                {/* Emoji */}
                <div className="text-3xl mb-4">{service.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-black text-white mb-2 leading-tight tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* 2 feature chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.slice(0, 2).map((f: string, fi: number) => (
                    <span key={fi} className="bg-white/[0.04] border border-white/[0.07] text-gray-600 rounded-full px-2.5 py-0.5 text-[11px]">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Select indicator */}
                <span className={`text-[11px] font-black tracking-wide transition-colors ${
                  selected ? 'text-amber-400' : 'text-gray-700 group-hover:text-gray-400'
                }`}>
                  {selected ? selectedLabel : selectLabel}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Floating cart bar ── */}
      {mounted && selectedServices.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/97 backdrop-blur-md"
        >
          {/* Progress steps — desktop only */}
          <div className="hidden sm:flex items-center justify-center gap-0 border-b border-white/[0.06] py-2.5 px-4">
            {[
              { label: isKo ? '서비스 선택' : 'Pick services', done: true },
              { label: isKo ? '정보 입력' : 'Fill your info', done: false },
              { label: isKo ? '무료 상담' : 'Free consult', done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-0">
                <div className="flex items-center gap-2 px-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                    step.done ? 'bg-[#B12492] text-white' : 'bg-white/[0.06] text-gray-600'
                  }`}>
                    {step.done ? '✓' : i + 1}
                  </div>
                  <span className={`text-[11px] font-bold tracking-wide ${
                    step.done ? 'text-[#B12492]' : i === 1 ? 'text-gray-300' : 'text-gray-600'
                  }`}>{step.label}</span>
                </div>
                {i < 2 && <span className="text-gray-700 text-xs mx-1">──</span>}
              </div>
            ))}
          </div>

          <div className="container mx-auto max-w-6xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">

            {/* Selected service chips */}
            <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
              <span className="text-[11px] font-black tracking-widest text-gray-600 uppercase flex-shrink-0">
                {isKo ? '선택' : 'Selected:'}
              </span>
              {selectedServices.map((s) => (
                <motion.span
                  key={s.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center gap-1.5 bg-[#B12492]/15 border border-[#B12492]/30 text-white rounded-full pl-3 pr-2 py-1 text-xs font-bold"
                >
                  {s.title}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeService(s.id) }}
                    className="w-4 h-4 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-[10px] text-gray-400 hover:text-white transition-colors"
                    aria-label={`Remove ${s.title}`}
                  >×</button>
                </motion.span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 justify-end">
              <button
                onClick={() => selectedServices.forEach(s => removeService(s.id))}
                className="px-3 py-2 rounded-lg bg-white/[0.05] text-gray-500 hover:bg-white/10 hover:text-gray-300 transition-all text-xs font-medium"
              >
                {isKo ? '전체 삭제' : 'Clear all'}
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                animate={!scrolling ? {
                  boxShadow: ['0 0 0px rgba(177,36,146,0)', '0 0 20px rgba(177,36,146,0.5)', '0 0 0px rgba(177,36,146,0)']
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => {
                  setScrolling(true)
                  const el = document.getElementById('contact')
                  if (el) {
                    const offset = window.innerWidth < 768 ? 100 : 80
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' })
                  }
                  setTimeout(() => setScrolling(false), 1500)
                }}
                className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-[#B12492] text-white font-black text-sm flex items-center gap-2 min-w-[160px] justify-center"
              >
                {scrolling ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    {isKo ? '이동 중...' : 'Going there...'}
                  </>
                ) : (
                  <>
                    {isKo ? '다음 단계 — 정보 입력' : 'Step 2 — Fill your info'}
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
                  </>
                )}
                {/* Shimmer */}
                {!scrolling && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
