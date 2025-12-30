'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { trackButtonClick } from '@/utils/analytics'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)
  const [isBroken, setIsBroken] = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Send scroll progress to iframe
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (!sectionRef.current || !iframeRef.current?.contentWindow) return
      if (manualMode) return // Don't override manual control

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const scrolled = -rect.top

      // Calculate progress: 0 at top, 1 when scrolled past section
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.8)))

      // Send to iframe
      iframeRef.current.contentWindow.postMessage(
        { scrollProgress: progress },
        '*'
      )
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted, manualMode])

  // Handle manual break/fix toggle
  const handleBreakToggle = () => {
    const newBroken = !isBroken
    setIsBroken(newBroken)
    setManualMode(true)

    trackButtonClick(newBroken ? 'Break Lightbulb' : 'Fix Lightbulb', 'hero')

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { scrollProgress: newBroken ? 1 : 0 },
        '*'
      )
    }

    // Reset to scroll mode after 3 seconds if assembled
    if (!newBroken) {
      setTimeout(() => {
        setManualMode(false)
      }, 2000)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Voxel Lightbulb - Full screen background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          ref={iframeRef}
          src="/voxel-lightbulb.html"
          className="w-full h-full border-0"
          style={{
            background: 'transparent',
          }}
          title="3D Voxel Lightbulb"
          loading="eager"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full pointer-events-none">
        {/* Text content */}
        <motion.div
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight text-gray-900 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
            <span className="block sm:inline">{t.hero.title}</span>
          </h1>

          <div className="mt-2 sm:-mt-2">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-gray-800 break-words drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
              {t.hero.subtitle}
            </h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-medium leading-relaxed px-2 sm:px-4 md:px-6 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto"
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
            className="group relative bg-black text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl text-base sm:text-lg font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
            data-hover="true"
            data-hover-text="Go"
          >
            <span className="absolute inset-0 bg-white transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              {t.hero.cta.start}
            </span>
          </button>

          <button
            onClick={handleBreakToggle}
            className="group relative bg-transparent border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
            data-hover="true"
            data-hover-text={isBroken ? 'Fix' : 'Break'}
          >
            <span className="flex items-center gap-2">
              <span>{isBroken ? '🔧' : '💡'}</span>
              <span>{isBroken ? 'Fix It' : 'Break It'}</span>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
