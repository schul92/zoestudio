'use client'

import { useEffect, useRef, useState } from 'react'

/* Animated CSS lightbulb with glow, particles, and mouse tracking */
export default function HeroBulb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const maxTilt = 12
      const x = ((e.clientX - cx) / (window.innerWidth / 2)) * maxTilt
      const y = ((e.clientY - cy) / (window.innerHeight / 2)) * maxTilt
      setOffset({ x, y: -y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
      {/* Ambient radial glow */}
      <div className="absolute h-64 w-64 rounded-full bg-amber-500/[0.08] blur-[100px] animate-glow-pulse md:h-80 md:w-80" />

      {/* Bulb group with mouse-tracking tilt */}
      <div
        className="relative transition-transform duration-[600ms] ease-out"
        style={{
          transform: `perspective(800px) rotateY(${offset.x}deg) rotateX(${offset.y}deg) translateY(${Math.sin(Date.now() / 1200) * 4}px)`,
        }}
      >
        {/* Inner glow bloom */}
        <div className="absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/30 blur-[40px] md:h-36 md:w-36" />
        <div className="absolute left-1/2 top-[38%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/50 blur-[20px] md:h-20 md:w-20" />

        {/* SVG Lightbulb */}
        <svg
          viewBox="0 0 200 320"
          className="relative z-10 h-[220px] w-auto drop-shadow-[0_0_40px_rgba(251,191,36,0.3)] md:h-[320px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glass bulb */}
          <ellipse cx="100" cy="105" rx="72" ry="85" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

          {/* Inner glow */}
          <ellipse cx="100" cy="105" rx="50" ry="60" fill="url(#innerGlow)" />

          {/* Filament coil */}
          <path
            d="M88 80 Q92 70, 96 80 Q100 90, 104 80 Q108 70, 112 80 Q116 90, 112 100 Q108 110, 104 100 Q100 90, 96 100 Q92 110, 88 100 Q84 90, 88 80Z"
            fill="none"
            stroke="#fcd34d"
            strokeWidth="2"
            opacity="0.9"
          />
          {/* Filament center glow */}
          <ellipse cx="100" cy="88" rx="14" ry="16" fill="rgba(251,191,36,0.4)" />

          {/* Filament wires */}
          <line x1="92" y1="110" x2="88" y2="170" stroke="rgba(180,180,170,0.4)" strokeWidth="1" />
          <line x1="108" y1="110" x2="112" y2="170" stroke="rgba(180,180,170,0.4)" strokeWidth="1" />

          {/* Neck taper */}
          <path d="M72 175 Q72 190, 68 195 L132 195 Q128 190, 128 175" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Screw base */}
          <rect x="65" y="195" width="70" height="55" rx="4" fill="url(#baseGrad)" />
          {/* Screw threads */}
          <line x1="65" y1="208" x2="135" y2="208" stroke="rgba(120,115,110,0.5)" strokeWidth="1" />
          <line x1="67" y1="220" x2="133" y2="220" stroke="rgba(120,115,110,0.5)" strokeWidth="1" />
          <line x1="65" y1="232" x2="135" y2="232" stroke="rgba(120,115,110,0.5)" strokeWidth="1" />

          {/* Base contact */}
          <rect x="75" y="250" width="50" height="12" rx="6" fill="#555550" />

          {/* Defs */}
          <defs>
            <radialGradient id="glassGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </radialGradient>
            <radialGradient id="innerGlow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.25)" />
              <stop offset="60%" stopColor="rgba(251,191,36,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a857f" />
              <stop offset="100%" stopColor="#6b6560" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </div>
  )
}

function Particle({ index }: { index: number }) {
  const angle = (index / 12) * Math.PI * 2
  const radius = 100 + (index % 3) * 50
  const size = 3 + (index % 3) * 2
  const duration = 8 + (index % 4) * 3
  const delay = index * 0.6

  return (
    <div
      className="absolute rounded-full bg-amber-400"
      style={{
        width: size,
        height: size,
        left: `calc(50% + ${Math.cos(angle) * radius}px)`,
        top: `calc(45% + ${Math.sin(angle) * radius}px)`,
        opacity: 0.3 + (index % 3) * 0.15,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        boxShadow: '0 0 6px rgba(251,191,36,0.4)',
      }}
    />
  )
}
