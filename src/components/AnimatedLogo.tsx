'use client'

import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  width?: number
  height?: number
  animate?: boolean
}

export default function AnimatedLogo({ width = 40, height = 40, animate = true }: AnimatedLogoProps) {
  const MotionDiv = motion.div
  const MotionPath = motion.path
  const MotionCircle = motion.circle
  
  return (
    <MotionDiv 
      className="relative"
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      {animate && (
        <MotionDiv
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full blur-xl opacity-20"
          style={{ width: width * 1.2, height: height * 1.2, left: '-10%', top: '-10%' }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        width={width}
        height={height}
        className="relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ZOE LUMOS logo - lightbulb icon"
      >
        <MotionPath
          d="M50 20C36.193 20 25 31.193 25 45C25 53.284 29.163 60.622 35.547 65.047C36.719 65.922 37.5 67.266 37.5 68.75V75C37.5 76.381 38.619 77.5 40 77.5H60C61.381 77.5 62.5 76.381 62.5 75V68.75C62.5 67.266 63.281 65.922 64.453 65.047C70.837 60.622 75 53.284 75 45C75 31.193 63.807 20 50 20Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: animate ? 0 : 1, opacity: animate ? 0 : 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <MotionPath
          d="M42.5 77.5V80C42.5 82.761 44.739 85 47.5 85H52.5C55.261 85 57.5 82.761 57.5 80V77.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: animate ? 0 : 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: animate ? 1.5 : 0, ease: "easeInOut" }}
        />
        <MotionPath
          d="M45 50V35C45 32.239 47.239 30 50 30C52.761 30 55 32.239 55 35V50"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <MotionPath
          d="M45 45H55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        {animate && (
          <MotionCircle
            cx="50"
            cy="45"
            r="15"
            fill="currentColor"
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
        )}
      </svg>
    </MotionDiv>
  )
}