'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function Filament() {
  const ref = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!)

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    const coils = 5
    const height = 0.6
    const radius = 0.08
    for (let i = 0; i <= coils * 20; i++) {
      const t = i / (coils * 20)
      const angle = t * coils * Math.PI * 2
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          t * height - height / 2,
          Math.sin(angle) * radius
        )
      )
    }
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.TubeGeometry(curve, 80, 0.012, 6, false)
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 3 + Math.sin(clock.elapsedTime * 1.5) * 1
    }
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[0, 0.05, 0]}>
      <meshStandardMaterial
        ref={materialRef}
        color="#fbbf24"
        emissive="#fbbf24"
        emissiveIntensity={3}
      />
    </mesh>
  )
}

function GlassBulb() {
  return (
    <group>
      {/* Bulb sphere */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.05}
          metalness={0}
          ior={1.5}
          thickness={0.5}
          transparent
          opacity={0.3}
          color="#ffffff"
          envMapIntensity={0.5}
        />
      </mesh>
      {/* Screw base */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.5, 32]} />
        <meshStandardMaterial color="#8B8680" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.35, 0.28, 0.12, 32]} />
        <meshStandardMaterial color="#6B6560" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const count = 30

  const offsets = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 1.0 + Math.random() * 1.2,
      speed: 0.15 + Math.random() * 0.25,
      y: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    offsets.forEach((o, i) => {
      const a = o.angle + t * o.speed
      dummy.position.set(
        Math.cos(a) * o.radius,
        o.y + Math.sin(t * 0.5 + o.phase) * 0.3,
        Math.sin(a) * o.radius
      )
      dummy.scale.setScalar(0.02 + Math.sin(t * 2 + o.phase) * 0.01)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial emissive="#fbbf24" emissiveIntensity={4} color="#fbbf24" />
    </instancedMesh>
  )
}

function BulbScene() {
  const groupRef = useRef<THREE.Group>(null!)
  const { pointer } = useThree()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const maxAngle = (15 * Math.PI) / 180
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * maxAngle,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * maxAngle * 0.5,
      0.05
    )
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <group ref={groupRef}>
      <GlassBulb />
      <Filament />
      <Particles />
      <pointLight position={[0, 0.1, 0]} color="#fbbf24" intensity={50} distance={5} />
    </group>
  )
}

export default function LightBulb3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[0, 5, 3]} intensity={1} angle={0.4} penumbra={0.5} color="#fff8e7" />
        <BulbScene />
        <Environment preset="city" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
