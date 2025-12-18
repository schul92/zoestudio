'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Floating particles - generate once on mount to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{id: number, x: string, delay: number, duration: number}>>([])
  
  useEffect(() => {
    setParticles(Array.from({ length: 10 }, (_, i) => ({ // Reduce particles for performance
      id: i,
      x: Math.random() * 100 + '%',
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 15,
    })))
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20 sm:py-16 md:py-0">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}>
          {mounted && (
            <motion.div
              animate={{
                x: [0, 50],
                y: [0, 50],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Floating particles */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-black rounded-full"
          initial={{ 
            left: particle.x,
            bottom: '-10px',
            opacity: 0.3
          }}
          animate={{
            y: [0, -1200],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Main content - Always visible, animations are optional */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        {/* Lightbulb logo with glow effect - lights up on load */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer glow ring - fades in */}
            {mounted && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0) 70%)',
                  width: '200%',
                  height: '200%',
                  left: '-50%',
                  top: '-50%',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.5, 0.8, 0.5],
                  scale: [0.5, 1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.3, 0.6, 1],
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeInOut"
                }}
              />
            )}
            {/* Inner glow - fades in */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(245,158,11,0.3) 50%, transparent 70%)',
                width: '150%',
                height: '150%',
                left: '-25%',
                top: '-25%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative z-10"
              fill="none"
              role="img"
              aria-label="ZOE LUMOS - Digital marketing lightbulb icon representing bright ideas and innovation"
            >
              {/* Glow filter definition */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="bulbGradientOff" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9CA3AF" />
                  <stop offset="100%" stopColor="#6B7280" />
                </linearGradient>
                <radialGradient id="innerGlow" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </radialGradient>
                <radialGradient id="innerGlowOff" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#E5E7EB" />
                  <stop offset="100%" stopColor="#D1D5DB" />
                </radialGradient>
              </defs>

              {/* Bulb - starts gray/off, transitions to golden */}
              {mounted ? (
                <motion.path
                  d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    fill: "url(#innerGlowOff)",
                    stroke: "url(#bulbGradientOff)",
                    filter: "none"
                  }}
                  animate={{
                    fill: "url(#innerGlow)",
                    stroke: "url(#bulbGradient)",
                    filter: "url(#glow)"
                  }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                />
              ) : (
                <path
                  d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
                  fill="url(#innerGlowOff)"
                  stroke="url(#bulbGradientOff)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Base of bulb */}
              <path
                d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
                stroke="#B45309"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#D97706"
              />

              {/* Screw threads on base */}
              <path d="M40 77.5H60" stroke="#92400E" strokeWidth="1.5" />
              <path d="M41 80H59" stroke="#92400E" strokeWidth="1.5" />
              <path d="M43 82.5H57" stroke="#92400E" strokeWidth="1.5" />

              {/* Filament - starts dark, lights up */}
              {mounted && (
                <>
                  <motion.path
                    d="M45 55V40C45 37 47 35 50 35C53 35 55 37 55 40V55"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ stroke: "#9CA3AF", opacity: 0.3 }}
                    animate={{
                      stroke: "#FEF3C7",
                      opacity: [0.3, 1, 0.6, 1, 0.6],
                    }}
                    transition={{
                      stroke: { duration: 0.8, delay: 0.5 },
                      opacity: { duration: 1.5, delay: 1.3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  <motion.path
                    d="M47 45H53"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ stroke: "#9CA3AF", opacity: 0.3 }}
                    animate={{
                      stroke: "#FEF3C7",
                      opacity: [0.3, 1, 0.6, 1, 0.6],
                    }}
                    transition={{
                      stroke: { duration: 0.8, delay: 0.6 },
                      opacity: { duration: 1.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </>
              )}

              {/* Pulsing light rays - delayed start */}
              {mounted && (
                <motion.circle
                  cx="50"
                  cy="45"
                  r="18"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </svg>

            {/* Sparkle effects - delayed to appear after bulb lights up */}
            {mounted && (
              <>
                <motion.div
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{ top: '10%', right: '15%' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                  style={{ top: '20%', left: '10%' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2,
                  }}
                />
                <motion.div
                  className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                  style={{ bottom: '30%', right: '5%' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2.5,
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Text content - Always visible */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight text-gray-900">
            <span className="block sm:inline">{t.hero.title}</span>
          </h1>

          <div className="mt-2 sm:-mt-2">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-gray-800 break-words">
              {t.hero.subtitle}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-normal leading-relaxed px-2 sm:px-4 md:px-6">
          {t.hero.description}
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => {
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
          >
            <span className="absolute inset-0 bg-white transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              {t.hero.cta.start}
            </span>
          </button>
        </div>
      </div>

      {/* Morphing shapes in background - hidden on mobile */}
      {mounted && (
        <motion.div
          className="hidden md:block absolute top-20 right-10 w-64 h-64 opacity-5"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              fill="black"
              d="M45,-76.9C59.6,-70.6,73.5,-60.6,81.7,-46.9C89.9,-33.3,92.3,-16.6,91.1,-0.7C89.9,15.2,85,30.4,76.2,43.2C67.4,56,54.6,66.4,40.1,73.2C25.5,80,9.3,83.2,-6.9,83.9C-23.1,84.6,-39.3,82.8,-53.9,76.2C-68.5,69.6,-81.5,58.2,-88.5,43.8C-95.5,29.4,-96.5,12,-93.1,-3.9C-89.7,-19.8,-81.8,-34.2,-71.5,-46.5C-61.2,-58.8,-48.4,-69,-35,-73.8C-21.6,-78.6,-7.6,-78,7.9,-75.6C23.4,-73.2,30.4,-83.2,45,-76.9Z"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </motion.div>
      )}
    </section>
  )
}