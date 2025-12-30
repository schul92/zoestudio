'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('View')
  const [isVisible, setIsVisible] = useState(false)

  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)

      const target = e.target as HTMLElement
      const clickable = target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-hover="true"]')

      if (clickable) {
        setIsHovering(true)
        // Get custom hover text if specified (null means not set, empty string means no text)
        const customText = clickable.getAttribute('data-hover-text')
        setHoverText(customText !== null ? customText : 'View')
      } else {
        setIsHovering(false)
        setHoverText('')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:flex items-center justify-center will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Cursor body - white with mix-blend-difference for inversion effect */}
      <motion.div
        className="relative rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center justify-center"
        style={{ width: 60, height: 60 }}
        animate={{
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Hover text - only show if there's text */}
        {hoverText && (
          <motion.span
            className="z-10 text-black font-black uppercase tracking-wider text-xs overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CustomCursor
