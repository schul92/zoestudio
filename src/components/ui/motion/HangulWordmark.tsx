'use client'

/**
 * 3D extruded Korean "조이" (jo-i = Zoe) wordmark.
 * Ported from the design handoff (hangul-wordmark.js) — built from
 * geometric primitives → THREE.Shape → ExtrudeGeometry. Two-tone
 * materials (cream front, amber sides), pop-in animation on mount,
 * orbiting specular light, floating motes, cursor tilt.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Palette = 'ivory' | 'coral' | 'cream'

type Props = {
  palette?: Palette
  motion?: number
  depth?: number
  tiltX?: number
  tiltY?: number
  className?: string
}

const PALETTES: Record<Palette, {
  front: number
  side: number
}> = {
  ivory: { front: 0xf9ecd0, side: 0xa77432 },
  coral: { front: 0xffd8c2, side: 0xc04236 },
  cream: { front: 0xfdf5e4, side: 0x8a5d28 },
}

// ── Shape primitives ────────────────────────────────────────
function rect(x: number, y: number, w: number, h: number) {
  const s = new THREE.Shape()
  s.moveTo(x, y)
  s.lineTo(x + w, y)
  s.lineTo(x + w, y + h)
  s.lineTo(x, y + h)
  s.lineTo(x, y)
  return s
}

function slantBar(
  xTop: number,
  yTop: number,
  length: number,
  thick: number,
  slant: number
) {
  const s = new THREE.Shape()
  const hw = thick / 2
  const dx = slant * length
  const dy = -length
  s.moveTo(xTop - hw, yTop)
  s.lineTo(xTop + hw, yTop)
  s.lineTo(xTop + hw + dx, yTop + dy)
  s.lineTo(xTop - hw + dx, yTop + dy)
  s.lineTo(xTop - hw, yTop)
  return s
}

// 조 (jo): ㅈ on top, ㅗ on bottom
function buildJo(stroke = 22): THREE.Shape[] {
  const shapes: THREE.Shape[] = []
  shapes.push(rect(-48, 42, 96, stroke))
  shapes.push(slantBar(0, 42, 44, stroke, -0.5))
  shapes.push(slantBar(0, 42, 44, stroke, 0.5))
  shapes.push(rect(-stroke / 2, -38, stroke, 28))
  shapes.push(rect(-52, -58, 104, stroke))
  return shapes
}

// 이 (i): ㅇ ring on left, ㅣ vertical on right
function buildI(stroke = 18): THREE.Shape[] {
  const shapes: THREE.Shape[] = []
  const ringOuter = 38
  const ringInner = ringOuter - stroke
  const ringShape = new THREE.Shape()
  ringShape.absarc(-25, 0, ringOuter, 0, Math.PI * 2, false)
  const hole = new THREE.Path()
  hole.absarc(-25, 0, ringInner, 0, Math.PI * 2, true)
  ringShape.holes.push(hole)
  shapes.push(ringShape)
  shapes.push(rect(30, -55, stroke, 110))
  return shapes
}

// Procedural equirect environment for clearcoat reflections
function makeEnv(renderer: THREE.WebGLRenderer) {
  const size = 256
  const c = document.createElement('canvas')
  c.width = size * 2
  c.height = size
  const g = c.getContext('2d')!
  const grad = g.createLinearGradient(0, 0, 0, size)
  grad.addColorStop(0, '#fff5e4')
  grad.addColorStop(0.5, '#eadbc0')
  grad.addColorStop(1, '#b8a17a')
  g.fillStyle = grad
  g.fillRect(0, 0, size * 2, size)
  const warm = g.createRadialGradient(size * 1.4, size * 0.25, 2, size * 1.4, size * 0.25, 180)
  warm.addColorStop(0, 'rgba(255,230,180,1)')
  warm.addColorStop(1, 'rgba(255,230,180,0)')
  g.fillStyle = warm
  g.fillRect(0, 0, size * 2, size)
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(renderer)
  const rt = pmrem.fromEquirectangular(tex)
  pmrem.dispose()
  tex.dispose()
  return rt.texture
}

function makeMoteTexture() {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const r = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  r.addColorStop(0, 'rgba(255, 250, 230, 1)')
  r.addColorStop(0.3, 'rgba(255, 230, 180, 0.7)')
  r.addColorStop(0.7, 'rgba(255, 210, 140, 0.15)')
  r.addColorStop(1, 'rgba(255, 210, 140, 0)')
  g.fillStyle = r
  g.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function easeOutBack(x: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

export default function HangulWordmark({
  palette = 'ivory',
  motion = 1.0,
  depth = 26,
  tiltX = 0.22,
  tiltY = -0.15,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Respect reduced motion — show a static SVG fallback via CSS instead
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const p = PALETTES[palette] ?? PALETTES.ivory
    let width = el.clientWidth
    let height = el.clientHeight

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    // Cap at 1.5x to halve fragment shader cost on retina displays.
    // Visually near-identical to 2x for this scene, 2x faster on most GPUs.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, width / height, 1, 2000)
    camera.position.set(0, 0, 340)

    // Lighting: warm key, cool fill, warm rim, ambient
    const key = new THREE.DirectionalLight(0xfff3dc, 1.5)
    key.position.set(200, 300, 400)
    key.castShadow = true
    key.shadow.mapSize.set(512, 512)
    key.shadow.camera.left = -300
    key.shadow.camera.right = 300
    key.shadow.camera.top = 300
    key.shadow.camera.bottom = -300
    key.shadow.radius = 8
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xe4dcc8, 0.55)
    fill.position.set(-250, 100, 200)
    scene.add(fill)

    const rim = new THREE.DirectionalLight(0xffd89a, 0.5)
    rim.position.set(-100, -200, -200)
    scene.add(rim)

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    scene.environment = makeEnv(renderer)

    // ── Build 조 and 이 letters ──
    const group = new THREE.Group()
    scene.add(group)

    const baseDepth = 60
    const extrudeSettings = {
      depth: baseDepth,
      bevelEnabled: true,
      bevelThickness: 1.6,
      bevelSize: 1.6,
      bevelOffset: 0,
      bevelSegments: 4,
      curveSegments: 28,
    }

    const stroke = 24
    const joShapes = buildJo(stroke)
    const iShapes = buildI(stroke)
    const spacing = 120

    type LetterUserData = {
      baseDepth: number
      meshes: THREE.Mesh[]
      frontMat: THREE.MeshPhysicalMaterial
    }

    function buildLetter(shapes: THREE.Shape[], xOffset: number) {
      const g = new THREE.Group()
      const sideMat = new THREE.MeshPhysicalMaterial({
        color: p.side,
        metalness: 0.05,
        roughness: 0.5,
        clearcoat: 0.3,
        clearcoatRoughness: 0.35,
        envMapIntensity: 0.85,
      })
      const frontMat = new THREE.MeshPhysicalMaterial({
        color: p.front,
        metalness: 0.02,
        roughness: 0.38,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
        sheen: 0.4,
        sheenColor: new THREE.Color(0xffffff),
        envMapIntensity: 1.15,
        emissive: new THREE.Color(p.front),
        emissiveIntensity: 0,
      })
      const meshes: THREE.Mesh[] = []
      shapes.forEach((shape) => {
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new THREE.Mesh(geo, [frontMat, sideMat])
        mesh.castShadow = true
        meshes.push(mesh)
        g.add(mesh)
      })
      const ud: LetterUserData = { baseDepth, meshes, frontMat }
      g.userData = ud
      g.position.x = xOffset
      return g
    }

    const jiGroup = buildLetter(joShapes, -spacing / 2)
    const iGroup = buildLetter(iShapes, spacing / 2)
    group.add(jiGroup)
    group.add(iGroup)

    // Measure unscaled content, then fit by scaling the group.
    // We keep the camera at a fixed distance so the 3D extrusion stays
    // visually prominent — only the letter size changes per aspect ratio.
    group.scale.setScalar(1)
    const fitBox = new THREE.Box3().setFromObject(group)
    const fitSize = new THREE.Vector3()
    fitBox.getSize(fitSize)
    const contentW = fitSize.x
    const contentH = fitSize.y

    const fitCamera = () => {
      const vFov = (camera.fov * Math.PI) / 180
      const visibleH = 2 * camera.position.z * Math.tan(vFov / 2)
      const visibleW = visibleH * camera.aspect
      // Narrower viewports: more side padding + extra room for tilt motion.
      const padH = camera.aspect < 1 ? 0.6 : 0.75
      const padW = camera.aspect < 1 ? 0.72 : 0.8
      const scaleForH = (visibleH * padH) / contentH
      const scaleForW = (visibleW * padW) / contentW
      const s = Math.min(scaleForH, scaleForW, 1.0)
      group.scale.setScalar(s)
    }
    fitCamera()

    // Pop-in animation state
    let currentDepth = 0
    const applyDepth = (d: number) => {
      currentDepth = d
      ;[jiGroup, iGroup].forEach((lg) => {
        const ud = lg.userData as LetterUserData
        ud.meshes.forEach((m) => {
          m.scale.z = Math.max(d / ud.baseDepth, 0.001)
          m.position.z = -d / 2
        })
      })
    }
    applyDepth(0)

    const popAnim = { active: true, start: performance.now(), duration: 900 }

    // Shadow catcher below
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 })
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 400), shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -95
    shadowPlane.receiveShadow = true
    scene.add(shadowPlane)

    group.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true
        ;(o as THREE.Mesh).receiveShadow = false
      }
    })

    // Orbit light — moving specular highlight
    const orbitLight = new THREE.PointLight(0xfff0d0, 3.5, 600, 1.4)
    orbitLight.position.set(180, 80, 200)
    scene.add(orbitLight)

    // Subtle motes
    const moteTex = makeMoteTexture()
    const moteMat = new THREE.SpriteMaterial({
      map: moteTex,
      color: 0xfff3d0,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    type Mote = {
      sprite: THREE.Sprite
      baseX: number
      baseY: number
      baseZ: number
      phase: number
      speed: number
      size: number
      twinklePhase: number
      twinkleSpeed: number
    }
    const motes: Mote[] = []
    for (let i = 0; i < 12; i++) {
      const sprite = new THREE.Sprite(moteMat.clone())
      const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.5
      const r = 160 + Math.random() * 140
      const m: Mote = {
        sprite,
        baseX: Math.cos(ang) * r,
        baseY: Math.sin(ang) * r * 0.55 + (Math.random() - 0.5) * 40,
        baseZ: -30 + Math.random() * 120,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.6,
        size: 8 + Math.random() * 18,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 1 + Math.random() * 1.5,
      }
      sprite.position.set(m.baseX, m.baseY, m.baseZ)
      sprite.scale.setScalar(m.size)
      scene.add(sprite)
      motes.push(m)
    }

    // Mouse tracking (window-level, normalized against container)
    // Cache the container rect — recompute only on resize/scroll, not per mousemove
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let rect = el.getBoundingClientRect()
    const refreshRect = () => {
      rect = el.getBoundingClientRect()
    }
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      mouse.ty = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', refreshRect, { passive: true })

    const onResize = () => {
      width = el.clientWidth
      height = el.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      fitCamera()
      refreshRect()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    const startTime = performance.now()
    let raf = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const t = (performance.now() - startTime) / 1000
      const dt = clock.getDelta()
      // Frame-rate independent exponential smoothing.
      // Larger rate = snappier. 18/sec ≈ 63% catch-up per ~55ms.
      const rotLerp = 1 - Math.exp(-18 * dt)

      // Pop progress
      if (popAnim.active) {
        const elapsed = performance.now() - popAnim.start
        const progress = Math.min(elapsed / popAnim.duration, 1)
        const eased = easeOutBack(progress)
        applyDepth(depth * eased)
        if (progress >= 1) popAnim.active = false
      }

      // Instant target — only the visible rotation is smoothed below.
      // Single-layer smoothing feels more responsive than double-lerp.
      mouse.x = mouse.tx
      mouse.y = mouse.ty

      const popProgress = popAnim.active
        ? Math.min((performance.now() - popAnim.start) / popAnim.duration, 1)
        : 1
      const popEase = easeOutCubic(popProgress)

      // Orbiting specular light
      const orbitA = t * 0.45
      const orbitR = 220
      orbitLight.position.x = Math.cos(orbitA) * orbitR + mouse.x * 80
      orbitLight.position.y = 60 + Math.sin(orbitA) * 60 + mouse.y * 40
      orbitLight.position.z = 180 + Math.sin(orbitA * 1.3) * 80
      const flashPhase = (t % 5) / 5
      const flash = flashPhase < 0.15 ? Math.sin((flashPhase / 0.15) * Math.PI) * 4.5 : 0
      orbitLight.intensity = (3.0 + flash) * popEase

      // Subtle emissive pulse on the front face
      const idlePulse = 0.05 + Math.sin(t * 1.2) * 0.03
      const emissive = popEase * (0.12 + idlePulse)
      ;[jiGroup, iGroup].forEach((lg) => {
        const ud = lg.userData as LetterUserData
        ud.frontMat.emissiveIntensity = emissive
      })

      // Motes drift + twinkle
      motes.forEach((m) => {
        const drift = Math.sin(t * m.speed + m.phase)
        m.sprite.position.x = m.baseX + drift * 18
        m.sprite.position.y = m.baseY + Math.cos(t * m.speed * 0.8 + m.phase) * 14
        m.sprite.position.z = m.baseZ + drift * 10
        const tw = 0.3 + (Math.sin(t * m.twinkleSpeed + m.twinklePhase) + 1) * 0.2
        ;(m.sprite.material as THREE.SpriteMaterial).opacity = tw * popEase
      })

      // Group tilt — follows cursor after pop
      const baseRX = tiltX * popEase
      const baseRY = tiltY * popEase
      const rx = baseRX + mouse.y * 0.18 * motion * popEase
      const ry = baseRY + mouse.x * 0.35 * motion * popEase
      group.rotation.x += (rx - group.rotation.x) * rotLerp
      group.rotation.y += (ry - group.rotation.y) * rotLerp
      group.position.y = Math.sin(t * 0.6) * 3 * motion * popEase

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', refreshRect)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      // Dispose geometries + materials we created
      ;[jiGroup, iGroup].forEach((lg) => {
        const ud = lg.userData as LetterUserData
        ud.meshes.forEach((m) => {
          m.geometry.dispose()
        })
        ud.frontMat.dispose()
      })
    }
  }, [palette, motion, depth, tiltX, tiltY])

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-hidden />
}
