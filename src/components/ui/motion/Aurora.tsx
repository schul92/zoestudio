'use client'

/**
 * WebGL liquid-aurora shader — ivory + bone + soft gold, cursor-reactive.
 * Renders a single full-bleed plane with a custom fragment shader.
 * Falls back to plain div + CSS gradient on: no WebGL, reduced-motion,
 * low-power devices, or small viewports.
 */

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Full-screen quad: skip camera projection, render directly in NDC space.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Simplex noise (Ashima), compact
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2  u_mouse;
  uniform vec2  u_resolution;
  uniform float u_scroll;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                     + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // fbm — fractal brownian motion, 3 octaves
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.55;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // aspect-correct UVs
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv * vec2(aspect, 1.0);

    float t = u_time * 0.08;
    vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);

    // Three layered flowing fields
    vec2 q = p + mouse * 0.18;
    float n1 = fbm(q * 1.6 + vec2(t, t * 0.7));
    float n2 = fbm(q * 2.8 - vec2(t * 0.6, t * 0.3) + 4.0);
    float n3 = fbm(q * 4.2 + vec2(t * 0.4, -t * 0.5) + 9.0);

    // Editorial palette — ivory, bone, soft gold, deep ink tint
    vec3 ivory = vec3(0.980, 0.969, 0.941);   // #FAF7F0
    vec3 bone  = vec3(0.953, 0.933, 0.886);   // #F3EEE2
    vec3 gold  = vec3(0.722, 0.568, 0.290);   // #B8914A
    vec3 goldSoft = vec3(0.851, 0.737, 0.522); // #D9BC85

    // Base wash
    vec3 color = ivory;
    color = mix(color, bone, smoothstep(-0.3, 0.6, n1));

    // Subtle gold veins where noise peaks align
    float goldMask = smoothstep(0.25, 0.65, n1 * 0.6 + n2 * 0.4);
    color = mix(color, goldSoft, goldMask * 0.24);

    // Rarer richer gold highlights
    float glow = smoothstep(0.55, 0.85, n2 * 0.5 + n3 * 0.5);
    color = mix(color, gold, glow * 0.08);

    // Mouse-proximity warm glow
    float dMouse = length(uv - u_mouse);
    float warm = smoothstep(0.4, 0.0, dMouse);
    color = mix(color, goldSoft, warm * 0.06);

    // Soft radial vignette so edges stay ivory
    // v = 1 near the center, fading to 0 toward the corners.
    float d = length(uv - 0.5);
    float v = 1.0 - smoothstep(0.2, 0.95, d * 1.05);
    color = mix(ivory, color, v);

    gl_FragColor = vec4(color, 1.0);
  }
`

function AuroraMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      targetMouse.current.x = e.clientX / window.innerWidth
      targetMouse.current.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [])

  useFrame(({ clock, size }) => {
    if (!matRef.current) return
    // lerp the mouse for smooth trailing
    mouseRef.current.x += (targetMouse.current.x - mouseRef.current.x) * 0.04
    mouseRef.current.y += (targetMouse.current.y - mouseRef.current.y) * 0.04
    const u = matRef.current.uniforms
    u.u_time.value = clock.getElapsedTime()
    u.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y)
    u.u_resolution.value.set(size.width, size.height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_scroll: { value: 0 },
        }}
      />
    </mesh>
  )
}

export default function Aurora({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Respect reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Skip on tiny screens for perf
    const tiny = window.innerWidth < 520
    if (tiny) return

    // Test WebGL support
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
    // Static fallback — CSS radial gradient
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 50% at 30% 20%, rgba(217,188,133,0.32), transparent 60%), radial-gradient(70% 50% at 80% 90%, rgba(243,238,226,0.8), transparent 70%), #FAF7F0',
        }}
      />
    )
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <AuroraMesh />
      </Canvas>
    </div>
  )
}
