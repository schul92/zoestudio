'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
  shape: 'circle' | 'square' | 'diamond' | 'line'
  life: number
  maxLife: number
}

const COLORS = [
  '#f59e0b', // amber-400
  '#fbbf24', // amber-300
  '#fcd34d', // amber-200
  '#d97706', // amber-500
  '#ffffff', // white accent
  '#f97316', // orange-400
  '#fb923c', // orange-300
  '#a855f7', // purple accent
  '#60a5fa', // blue accent
  '#34d399', // emerald accent
]

function createParticle(w: number, h: number): Particle {
  const shape = (['circle', 'square', 'diamond', 'line'] as const)[
    Math.floor(Math.random() * 4)
  ]
  return {
    x: Math.random() * w,
    y: h + Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(Math.random() * 1.5 + 0.3),
    size: Math.random() * 5 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: Math.random() * 0.6 + 0.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    shape,
    life: 0,
    maxLife: Math.random() * 400 + 200,
  }
}

export default function AntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const dprRef = useRef(1)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = dprRef.current
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const mouse = mouseRef.current
    const particles = particlesRef.current

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.life++

      // Anti-gravity: float upward
      p.vy -= 0.003
      // Slight horizontal drift
      p.vx += (Math.random() - 0.5) * 0.02

      // Mouse repulsion
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150 && dist > 0) {
        const force = (150 - dist) / 150
        const angle = Math.atan2(dy, dx)
        p.vx += Math.cos(angle) * force * 0.8
        p.vy += Math.sin(angle) * force * 0.8
      }

      // Friction
      p.vx *= 0.995
      p.vy *= 0.995

      // Apply velocity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed

      // Fade in/out based on life
      const lifePct = p.life / p.maxLife
      let alpha = p.opacity
      if (lifePct < 0.1) alpha *= lifePct / 0.1
      if (lifePct > 0.8) alpha *= (1 - lifePct) / 0.2

      // Recycle particles that leave bounds or expire
      if (p.y < -50 || p.x < -50 || p.x > w + 50 || p.life >= p.maxLife) {
        particles[i] = createParticle(w, h)
        continue
      }

      // Draw particle
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = alpha

      // Glow effect
      ctx.shadowBlur = p.size * 3
      ctx.shadowColor = p.color

      ctx.fillStyle = p.color
      ctx.strokeStyle = p.color

      switch (p.shape) {
        case 'circle':
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'square':
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          break
        case 'diamond':
          ctx.beginPath()
          ctx.moveTo(0, -p.size / 2)
          ctx.lineTo(p.size / 2, 0)
          ctx.lineTo(0, p.size / 2)
          ctx.lineTo(-p.size / 2, 0)
          ctx.closePath()
          ctx.fill()
          break
        case 'line':
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(-p.size, 0)
          ctx.lineTo(p.size, 0)
          ctx.stroke()
          break
      }

      ctx.restore()
    }

    ctx.restore()
    animationRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    dprRef.current = dpr

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()

    // Initialize particles
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    particlesRef.current = Array.from({ length: 70 }, () => {
      const p = createParticle(w, h)
      // Spread initial particles across the canvas
      p.y = Math.random() * h
      p.life = Math.random() * p.maxLife * 0.5
      return p
    })

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('touchmove', handleTouch, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('touchmove', handleTouch)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0"
      aria-hidden="true"
    />
  )
}
