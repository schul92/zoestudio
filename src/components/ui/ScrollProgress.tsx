'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [bgDark, setBgDark] = useState(false)
  
  // Transform scroll progress to percentage
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setHasScrolled(scrolled)
      
      // Hide when near bottom
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      setIsVisible(!isNearBottom)
      
      // Check if current section has dark background
      const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      const isDark = currentSection?.closest('.bg-black, .bg-gray-900, .bg-gray-800')
      setBgDark(!!isDark)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleClick = () => {
    const currentScroll = window.scrollY
    const documentHeight = document.body.offsetHeight
    const windowHeight = window.innerHeight
    const maxScroll = documentHeight - windowHeight
    
    // If at top, scroll to first section
    if (currentScroll < 100) {
      window.scrollTo({ top: windowHeight, behavior: 'smooth' })
    } 
    // If not at bottom, scroll down by viewport height
    else if (currentScroll < maxScroll - 100) {
      window.scrollTo({ top: currentScroll + windowHeight, behavior: 'smooth' })
    }
    // If near bottom, scroll to top
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -100
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <div 
        className="relative cursor-pointer group"
        onClick={handleClick}
      >
        {/* Background circle with progress */}
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke={bgDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
            strokeWidth="3"
            fill="none"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke={bgDark ? "white" : "black"}
            strokeWidth="3"
            fill="none"
            strokeDasharray="126"
            style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [126, 0]) }}
          />
        </svg>
        
        {/* Center content */}
        <div className={`absolute inset-0 flex items-center justify-center ${bgDark ? 'text-white' : 'text-black'}`}>
          {!hasScrolled ? (
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          ) : (
            <motion.div className="text-xs font-bold">
              {Math.round(scrollPercentage.get())}%
            </motion.div>
          )}
        </div>
        
        {/* Hover effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${bgDark ? 'bg-white' : 'bg-black'} opacity-0 group-hover:opacity-10 transition-opacity`}
        />
        
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-sm whitespace-nowrap pointer-events-none ${
            bgDark ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          {!hasScrolled ? 'Scroll down' : scrollPercentage.get() < 90 ? 'Next section' : 'Back to top'}
        </motion.div>
      </div>
    </motion.div>
  )
}