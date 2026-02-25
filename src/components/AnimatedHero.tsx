'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="grain-overlay relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Subtle radial gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(245,158,11,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.02),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(96,165,250,0.02),transparent_50%)]" />
      </div>

      {/* Anti-gravity particle canvas — client only */}
      {mounted && <ClientParticles />}

      {/* Centered hero content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-400/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Zoe Studio
        </p>

        {/* Lightbulb — client only */}
        <div className="relative mb-6 h-[180px] w-[140px] md:mb-8 md:h-[240px] md:w-[180px]">
          {mounted && <ClientBulb />}
        </div>

        {/* Title */}
        <h1 className="text-display-lg font-extrabold text-[#f5f5f5]">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <h2 className="mt-4 text-display-sm font-semibold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
          {t.hero.subtitle}
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-body-lg text-[#a3a3a3]">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="#services"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-8 py-4 text-sm font-semibold text-black shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110 active:scale-[0.97]"
          >
            {t.hero.cta.start}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
          >
            {t.hero.cta.view}
          </Link>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  )
}

/* Lazy-loaded client-only wrappers to avoid hydration mismatch */
function ClientParticles() {
  const [Comp, setComp] = useState<React.ComponentType | null>(null)
  useEffect(() => {
    import('@/components/AntigravityParticles').then(m => setComp(() => m.default))
  }, [])
  return Comp ? <Comp /> : null
}

function ClientBulb() {
  const [Comp, setComp] = useState<React.ComponentType | null>(null)
  useEffect(() => {
    import('@/components/HeroBulb').then(m => setComp(() => m.default))
  }, [])
  return Comp ? <Comp /> : null
}
