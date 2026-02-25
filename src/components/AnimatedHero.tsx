'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

const LightBulb3D = dynamic(() => import('@/components/3d/LightBulb3D'), {
  ssr: false,
})

function BulbFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.3),transparent_70%)] blur-2xl" />
    </div>
  )
}

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
      {/* Subtle radial glow from right side (bulb illumination) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(251,191,36,0.1),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center px-6 py-12 md:flex-row md:px-10 md:py-20">
        {/* Text - left 60% on desktop */}
        <div className="w-full md:w-[60%]">
          <p className="mb-4 inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Zoe Studio
          </p>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>

          <h2 className="mt-3 text-xl font-bold text-amber-400 sm:text-2xl md:text-3xl">
            {t.hero.subtitle}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-base font-bold text-black transition hover:bg-amber-300"
            >
              {t.hero.cta.start}
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
            >
              {t.hero.cta.view}
            </Link>
          </div>
        </div>

        {/* 3D Bulb - right 40% on desktop, top on mobile */}
        <div className="mb-8 h-[280px] w-full md:mb-0 md:h-[520px] md:w-[40%]">
          <Suspense fallback={<BulbFallback />}>
            <LightBulb3D />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
