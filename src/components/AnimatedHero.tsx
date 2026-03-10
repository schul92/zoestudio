'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lazy-play video after mount to not block initial render
  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [mounted])

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
        {/* Hero Video — Lightbulb advertisement */}
        <div className="relative mb-2 md:mb-4 w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px] -mt-4">
          {/* Warm glow behind video */}
          <div className="absolute inset-0 bg-amber-500/[0.04] rounded-full blur-[80px] pointer-events-none scale-75" />

          {/* Video with aggressive radial fade */}
          <div className="relative w-full h-full" style={{
            maskImage: 'radial-gradient(ellipse 70% 75% at 50% 48%, black 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 65%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 75% at 50% 48%, black 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 65%, transparent 80%)',
          }}>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/videos/hero-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
          </div>
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

        {/* CTA */}
        <div className="mt-10 mb-16">
          <Link
            href="#services"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-10 py-4 text-sm font-semibold text-black shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110 active:scale-[0.97]"
          >
            {t.hero.cta.start}
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
