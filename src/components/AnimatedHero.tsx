'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import WorkflowModal from './sections/WorkflowModal'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const [showContent, setShowContent] = useState(false)
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Floating particles - generate once on mount to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{id: number, x: string, delay: number, duration: number}>>([])
  
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 + '%',
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
    })))
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white" style={{ position: 'relative' }}>
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}>
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
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
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

      {/* Main content with staggered animations */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          >
            {/* Animated lightbulb logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full blur-3xl opacity-20"
                />
                <svg
                  viewBox="0 0 100 100"
                  className="w-32 h-32 relative z-10"
                  fill="none"
                >
                  <motion.path
                    d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
                  />
                  {/* Glowing effect inside bulb */}
                  <motion.circle
                    cx="50"
                    cy="45"
                    r="15"
                    fill="black"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.2, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Animated text with typewriter effect */}
            <motion.div className="space-y-6">
              <motion.h1 
                className="text-6xl md:text-8xl font-black leading-none"
              >
                {t.hero.title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="inline-block"
                    style={{ 
                      display: char === ' ' ? 'inline' : 'inline-block',
                      marginRight: char === ' ' ? '0.25em' : 0
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="-mt-2"
              >
                <h2 className="text-4xl md:text-6xl font-black text-gray-500">
                  {t.hero.subtitle}
                </h2>
              </motion.div>
            </motion.div>

            {/* Description with fade in */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-xl md:text-2xl text-gray-700 mt-10 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* Animated buttons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "15px 15px 0px 0px rgba(0,0,0,1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-black text-white px-10 py-5 rounded-xl text-lg font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-white transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  {t.hero.cta.start}
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWorkflowOpen(true)}
                className="group relative border-2 border-black px-10 py-5 rounded-xl text-lg font-bold transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
                  {t.hero.cta.view}
                </span>
              </motion.button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>


      {/* Morphing shapes in background */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 opacity-5"
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
      
      {/* Workflow Modal */}
      <WorkflowModal 
        isOpen={isWorkflowOpen} 
        onClose={() => setIsWorkflowOpen(false)}
        locale={locale}
      />
    </section>
  )
}