'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { trackButtonClick } from '@/utils/analytics'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch by not rendering anything different on server vs client initially
  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
        {/* Loading placeholder */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          </div>
        </div>
        {/* Cover for Spline watermark */}
        <div className="absolute bottom-0 right-0 w-48 h-16 bg-gradient-to-tl from-[#1a1a1a] via-[#1a1a1a] to-transparent z-[5]" />
        {/* Content placeholder to prevent layout shift */}
        <div className="absolute bottom-36 sm:bottom-32 md:bottom-32 lg:bottom-36 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 z-10 max-w-xl text-right opacity-0">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white">
              {t.hero.title}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-400">
              {t.hero.subtitle}
            </h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
      {/* Loading placeholder with gradient that matches the scene */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] transition-opacity duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
      </div>

      {/* Spline 3D Animation via iframe - uses Spline's CDN optimization */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-700 overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <iframe
          src="https://my.spline.design/animatedlightdesktop-6X8ZfDzkCg2Db5sXXa6vdDxb/"
          frameBorder="0"
          className="border-0 -mt-16 sm:-mt-8 md:mt-0"
          style={{
            background: 'transparent',
            width: 'calc(100% + 200px)',
            height: 'calc(100% + 100px)',
            marginBottom: '-100px',
            marginRight: '-200px',
          }}
          title="3D Animation"
          loading="eager"
          onLoad={() => setIsLoaded(true)}
          allow="autoplay"
        />
      </div>

      {/* Cover for Spline watermark */}
      <div className="absolute bottom-0 right-0 w-48 h-16 bg-gradient-to-tl from-[#1a1a1a] via-[#1a1a1a] to-transparent z-[5]" />

      {/* Content overlay - positioned bottom-right, moved higher */}
      <div className="absolute bottom-36 sm:bottom-32 md:bottom-32 lg:bottom-36 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 z-10 max-w-xl text-right">
        {/* Text content */}
        <motion.div
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            {t.hero.title}
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-400 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            {t.hero.subtitle}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 sm:mt-4 mb-6 sm:mb-8 ml-auto max-w-md font-medium leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => {
              trackButtonClick('Get Started CTA', 'hero')
              const servicesSection = document.getElementById('services')
              if (servicesSection) {
                const rect = servicesSection.getBoundingClientRect()
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                const isMobile = window.innerWidth < 768
                const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
                const offset = isMobile ? 100 : isTablet ? 90 : 80
                const targetPosition = rect.top + scrollTop - offset

                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                })
              }
            }}
            className="group relative bg-amber-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold shadow-lg transition-all overflow-hidden hover:bg-amber-300 hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10">
              {t.hero.cta.start}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
