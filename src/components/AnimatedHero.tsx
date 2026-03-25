'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)
  const backgroundVideoRef = useRef<HTMLVideoElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroVideoSrc = '/videos/hero-bg.mp4?v=20260310c'
  const heroPosterSrc = '/videos/hero-poster.jpg?v=20260310c'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lazy-play video after mount to not block initial render
  useEffect(() => {
    if (mounted) {
      backgroundVideoRef.current?.play().catch(() => {})
      videoRef.current?.play().catch(() => {})
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
              ref={backgroundVideoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroPosterSrc}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-45 saturate-75"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_72%_at_50%_48%,transparent_34%,rgba(10,10,10,0.08)_58%,rgba(10,10,10,0.45)_82%,rgba(10,10,10,0.85)_100%)]" />

            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroPosterSrc}
              className="relative z-10 w-full h-full object-contain scale-[0.96]"
              style={{
                maskImage: 'radial-gradient(ellipse 76% 68% at 50% 46%, black 42%, rgba(0,0,0,0.95) 58%, rgba(0,0,0,0.5) 74%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse 76% 68% at 50% 46%, black 42%, rgba(0,0,0,0.95) 58%, rgba(0,0,0,0.5) 74%, transparent 92%)',
              }}
            >
              <source src={heroVideoSrc} type="video/mp4" />
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
        <div className="mt-10 mb-16 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#services"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-10 py-4 text-sm font-semibold text-black shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110 active:scale-[0.97]"
          >
            {t.hero.cta.start}
          </Link>
          <a
            href="http://pf.kakao.com/_xhxdxmlX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#FEE500]/30 bg-[#FEE500]/10 px-8 py-4 text-sm font-semibold text-[#FEE500] transition-all duration-300 hover:bg-[#FEE500]/20 hover:border-[#FEE500]/50 active:scale-[0.97]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.463-.2.723-.722 2.62-.828 3.026-.13.502.184.496.387.36.16-.106 2.544-1.726 3.576-2.428.766.112 1.56.17 2.357.17 5.523 0 10-3.463 10-7.591S17.523 3 12 3Z"
                fill="#FEE500"
              />
            </svg>
            {locale === 'ko' ? '카카오톡 상담' : 'Chat on KakaoTalk'}
          </a>
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
