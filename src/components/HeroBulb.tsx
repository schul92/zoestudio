'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroBulb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const maxTilt = 10
      const x = ((e.clientX - cx) / (window.innerWidth / 2)) * maxTilt
      const y = ((e.clientY - cy) / (window.innerHeight / 2)) * maxTilt
      setOffset({ x, y: -y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute h-48 w-48 rounded-full bg-amber-400/[0.06] blur-[80px] animate-glow-pulse md:h-64 md:w-64" />

      {/* Bulb group with mouse-tracking tilt */}
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(800px) rotateY(${offset.x}deg) rotateX(${offset.y}deg)`,
        }}
      >
        {/* Layered glow bloom behind bulb */}
        <div className="absolute left-1/2 top-[35%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[50px] md:h-40 md:w-40" />
        <div className="absolute left-1/2 top-[35%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/40 blur-[25px] md:h-24 md:w-24" />

        {/* Modern SVG Edison Bulb */}
        <svg
          viewBox="0 0 200 300"
          className="relative z-10 h-[180px] w-auto md:h-[260px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow filter */}
            <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0.1  0 0.8 0 0 0.05  0 0 0.2 0 0  0 0 0 0.8 0"
                result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Filament glow filter */}
            <filter id="filamentGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glass gradient - frosted glassmorphism */}
            <radialGradient id="glassGrad2" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
            </radialGradient>

            {/* Specular highlight */}
            <radialGradient id="specular" cx="30%" cy="25%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Inner warm glow */}
            <radialGradient id="innerWarm" cx="50%" cy="40%" r="45%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
              <stop offset="40%" stopColor="rgba(251,191,36,0.12)" />
              <stop offset="100%" stopColor="rgba(251,191,36,0)" />
            </radialGradient>

            {/* Base metallic gradient */}
            <linearGradient id="baseMetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b8b0a4" />
              <stop offset="25%" stopColor="#9e978c" />
              <stop offset="50%" stopColor="#8a847a" />
              <stop offset="75%" stopColor="#7a746c" />
              <stop offset="100%" stopColor="#6b655e" />
            </linearGradient>

            {/* Clip path for glass reflection */}
            <clipPath id="bulbClip">
              <ellipse cx="100" cy="100" rx="68" ry="80" />
            </clipPath>
          </defs>

          {/* Glass bulb shell - modern rounded shape */}
          <ellipse cx="100" cy="100" rx="68" ry="80"
            fill="url(#glassGrad2)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.75"
          />

          {/* Inner warm glow */}
          <ellipse cx="100" cy="100" rx="68" ry="80" fill="url(#innerWarm)" />

          {/* Glass specular highlight - gives 3D depth */}
          <ellipse cx="82" cy="70" rx="30" ry="38" fill="url(#specular)" />

          {/* Rim light - subtle edge glow */}
          <ellipse cx="100" cy="100" rx="67" ry="79"
            fill="none"
            stroke="rgba(251,191,36,0.08)"
            strokeWidth="2"
          />

          {/* === Edison Filament === */}
          <g filter="url(#filamentGlow)">
            {/* Vertical support wires */}
            <line x1="90" y1="160" x2="90" y2="115" stroke="#fcd34d" strokeWidth="1" opacity="0.6" />
            <line x1="110" y1="160" x2="110" y2="115" stroke="#fcd34d" strokeWidth="1" opacity="0.6" />

            {/* Zigzag filament - modern Edison style */}
            <polyline
              points="90,115 93,105 97,115 100,100 103,115 107,105 110,115"
              fill="none"
              stroke="#fcd34d"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            >
              <animate attributeName="opacity" values="0.95;0.8;0.95;0.85;0.95" dur="3s" repeatCount="indefinite" />
            </polyline>

            {/* Hot center glow */}
            <ellipse cx="100" cy="108" rx="12" ry="10"
              fill="rgba(251,191,36,0.5)"
            >
              <animate attributeName="opacity" values="0.5;0.35;0.5;0.4;0.5" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Neck / glass taper */}
          <path
            d="M72 172 C72 180, 68 188, 68 192 L132 192 C132 188, 128 180, 128 172"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.75"
          />

          {/* === Screw Base - modern metallic === */}
          <rect x="68" y="192" width="64" height="48" rx="3" fill="url(#baseMetal)" />

          {/* Thread grooves - cleaner, modern style */}
          {[0, 1, 2, 3].map(i => (
            <line
              key={i}
              x1={70 + i * 0.5}
              y1={202 + i * 10}
              x2={130 - i * 0.5}
              y2={202 + i * 10}
              stroke="rgba(60,55,50,0.4)"
              strokeWidth="0.75"
            />
          ))}

          {/* Thread highlights */}
          {[0, 1, 2, 3].map(i => (
            <line
              key={`h${i}`}
              x1={70 + i * 0.5}
              y1={203 + i * 10}
              x2={130 - i * 0.5}
              y2={203 + i * 10}
              stroke="rgba(180,175,170,0.15)"
              strokeWidth="0.5"
            />
          ))}

          {/* Contact tip */}
          <rect x="82" y="240" width="36" height="8" rx="4" fill="#5a5550" />
          <rect x="84" y="241" width="32" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>
    </div>
  )
}
