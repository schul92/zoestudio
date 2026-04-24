'use client'

/**
 * 3D interactive hero centerpiece — a translucent gold glass orb that
 * refracts the page behind it, auto-rotates, and reacts to cursor.
 *
 * Stack: @react-three/fiber + @react-three/drei (MeshTransmissionMaterial,
 * Float, Environment) + @react-three/postprocessing (Bloom).
 *
 * Falls back to a static gold gradient disc on:
 * - prefers-reduced-motion
 * - touch / coarse pointer
 * - viewport < 900px (we show it only beside the headline on desktop+)
 * - no WebGL support
 */

import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Icosahedron,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function Orb() {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // map window-relative cursor to [-1, 1]
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    // Smoothly lerp toward target
    current.current.x += (target.current.x - current.current.x) * 0.04
    current.current.y += (target.current.y - current.current.y) * 0.04
    // Cursor drives a subtle tilt (±0.35 rad)
    group.current.rotation.y = current.current.x * 0.35
    group.current.rotation.x = current.current.y * -0.2
    // Gentle autonomous spin
    group.current.rotation.z += delta * 0.05
  })

  return (
    <group ref={group}>
      <Float floatIntensity={0.6} rotationIntensity={0.3} speed={0.9}>
        {/* Core refracting orb — more opacity so it reads against ivory */}
        <Icosahedron args={[1.45, 10]}>
          <MeshTransmissionMaterial
            transmission={0.85}
            thickness={2.2}
            roughness={0.06}
            ior={1.45}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.35}
            distortionScale={0.6}
            temporalDistortion={0.08}
            color="#F3EEE2"
            attenuationColor="#B8914A"
            attenuationDistance={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
            backside
          />
        </Icosahedron>

        {/* Gold core — larger emissive sphere inside */}
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1, 8]} />
          <meshStandardMaterial
            color="#B8914A"
            emissive="#D9BC85"
            emissiveIntensity={1.2}
            roughness={0.12}
            metalness={0.95}
          />
        </mesh>

        {/* Thin gold rings around the orb */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.85, 0.015, 32, 240]} />
          <meshStandardMaterial
            color="#B8914A"
            emissive="#B8914A"
            emissiveIntensity={0.9}
            metalness={1}
            roughness={0.08}
          />
        </mesh>
        <mesh rotation-x={Math.PI / 2.4} rotation-z={0.4}>
          <torusGeometry args={[2.05, 0.01, 24, 200]} />
          <meshStandardMaterial
            color="#D9BC85"
            emissive="#D9BC85"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0.15}
          />
        </mesh>
        <mesh rotation-x={Math.PI / 3.2} rotation-z={-0.7}>
          <torusGeometry args={[2.2, 0.006, 16, 160]} />
          <meshStandardMaterial
            color="#D9BC85"
            emissive="#D9BC85"
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroOrb({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    if (window.innerWidth < 900) return
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2') || c.getContext('webgl')
      if (!gl) return
    } catch {
      return
    }
    setEnabled(true)
  }, [])

  if (!enabled) {
    // Static ornamental fallback — a gold gradient disc with thin rings
    return (
      <div
        className={`relative flex items-center justify-center pointer-events-none ${className}`}
        aria-hidden
      >
        <div
          className="relative w-[320px] h-[320px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, #D9BC85 28%, #B8914A 70%, #8F6F36 100%)',
            boxShadow:
              '0 40px 80px -30px rgba(184,145,74,0.45), inset -30px -40px 80px rgba(143,111,54,0.3), inset 20px 20px 60px rgba(255,255,255,0.35)',
          }}
        />
        <div
          className="absolute w-[380px] h-[380px] rounded-full border border-gold/40"
          style={{ borderStyle: 'solid' }}
        />
        <div
          className="absolute w-[420px] h-[420px] rounded-full border border-gold/20"
          style={{ borderStyle: 'solid' }}
        />
      </div>
    )
  }

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 3, 4]} intensity={1.1} />
          <directionalLight position={[-4, 1, -2]} intensity={0.5} color="#B8914A" />
          <Environment preset="apartment" />
          <Orb />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.7}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
