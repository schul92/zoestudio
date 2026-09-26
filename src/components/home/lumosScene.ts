import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export type LumosFrame = { p: number; px: number; py: number; now: number; narrow: boolean; reduce: boolean }
export type LumosScene = { render: (f: LumosFrame) => void; resize: (w: number, h: number) => void; dispose: () => void }

const IMG = {
  screens: ['/portfolio/tj-flowers.jpg', '/portfolio/migukstory.jpg', '/portfolio/salt-polish.jpg'],
  phone: '/portfolio/mochinut.jpg',
}

// Screen swaps happen at these progress points; the captions in LumosHero use the same ranges.
export const SCREEN_BREAKS = [0.47, 0.62] as const

// End-of-story line-up: the laptop steps left and the phone stands on the same floor beside it.
// Kept in one place so the final composition can be retuned without touching the scene graph.
export const FINAL_POSE = {
  phoneIn: [0.74, 0.92] as const,
  laptopShiftX: -0.62,
  phoneFromX: 4.4,
  phoneFromXNarrow: 2.6,
  phoneX: 1.95,
  phoneXNarrow: 1.05,
  phoneZ: 0.35,
  phoneZNarrow: 1.25,
  phoneRotY: [-0.9, -0.24] as const,
  cameraShiftX: 0.06,
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => t * t * (3 - 2 * t)
const span = (p: number, a: number, b: number) => ease(clamp((p - a) / (b - a)))

function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  return new THREE.CanvasTexture(c)
}

// Product-photo studio: a black room with large soft boxes; their reflections give the metal long, clean highlights.
function studio() {
  const s = new THREE.Scene()
  s.background = new THREE.Color(0x000000)
  const box = (w: number, h: number, x: number, y: number, z: number, rx: number, ry: number, i: number) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(i), side: THREE.DoubleSide }),
    )
    m.position.set(x, y, z)
    m.rotation.set(rx, ry, 0)
    s.add(m)
  }
  box(14, 6, 0, 9, 0, Math.PI / 2, 0, 2.4)
  box(2.2, 10, -9, 2, 1, 0, Math.PI / 2, 1.6)
  box(2.2, 10, 9, 2, -1, 0, -Math.PI / 2, 1.2)
  box(12, 1.2, 0, 1.2, -9, 0, 0, 0.9)
  box(10, 3, 0, 3, 10, 0, Math.PI, 0.5)
  return s
}

function slab(w: number, d: number, h: number, r: number, bevel: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -d / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + d - r)
  s.absarc(x + w - r, y + d - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + d)
  s.absarc(x + r, y + d - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  const g = new THREE.ExtrudeGeometry(s, {
    depth: h - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 8,
    curveSegments: 40,
  })
  g.rotateX(-Math.PI / 2)
  g.translate(0, bevel, 0)
  return g
}

type Mats = { blackGlass: THREE.Material; soft: (inner: number, outer: number, a0: string, a1: string) => THREE.Texture }

function roundRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

// ShapeGeometry UVs are in shape units; remap to 0..1 so a texture fills the rounded rect.
function flatShape(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundRectShape(w, h, r), 48)
  const p = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h)
  return g
}

function phoneScreenTexture() {
  const c = document.createElement('canvas')
  c.width = 720
  c.height = 1560
  const g = c.getContext('2d')!
  g.fillStyle = '#ffffff'
  g.fillRect(0, 0, 720, 1560)
  g.fillStyle = '#111'
  g.font = '600 34px -apple-system, "Geist", sans-serif'
  g.fillText('9:41', 70, 78)
  g.beginPath()
  g.roundRect(560, 56, 62, 28, 8)
  g.lineWidth = 3
  g.strokeStyle = '#111'
  g.stroke()
  g.fillRect(565, 61, 44, 18)
  g.fillRect(625, 64, 5, 12)
  ;[0, 1, 2, 3].forEach((i) => g.fillRect(470 + i * 14, 78 - (i + 1) * 7, 9, (i + 1) * 7))
  g.beginPath()
  g.roundRect(260, 22, 200, 60, 30)
  g.fillStyle = '#000'
  g.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  const img = new Image()
  img.onload = () => {
    const sx = 380, sy = 100, sw = 440, sh = 540, dw = 600, dh = (dw * sh) / sw
    g.drawImage(img, sx, sy, sw, sh, 60, (1560 - dh) / 2 - 20, dw, dh)
    g.fillStyle = '#111'
    g.beginPath()
    g.roundRect(240, 1510, 240, 10, 5)
    g.fill()
    tex.needsUpdate = true
  }
  img.src = IMG.phone
  return tex
}

// iPhone Pro proportions (163 × 77.6 × 8.25 mm): flat titanium band, edge-to-edge glass, side buttons.
export const PH = 1.62
function buildPhone(m: Mats) {
  const PW = (PH * 77.6) / 163
  const PD = (PH * 8.25) / 163
  const PR = PW * 0.17
  const titanium = new THREE.MeshPhysicalMaterial({ color: 0x3d3e42, metalness: 1, roughness: 0.2, clearcoat: 0.3, clearcoatRoughness: 0.2 })
  const phone = new THREE.Group()
  const band = new THREE.ExtrudeGeometry(roundRectShape(PW - 0.02, PH - 0.02, PR - 0.01), {
    depth: PD - 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 6,
    curveSegments: 48,
  })
  band.translate(0, 0, -(PD - 0.02) / 2)
  phone.add(new THREE.Mesh(band, titanium))
  const glass = new THREE.Mesh(flatShape(PW - 0.004, PH - 0.004, PR - 0.002), m.blackGlass)
  glass.position.z = PD / 2 + 0.0006
  phone.add(glass)
  const inset = 0.028
  const screen = new THREE.Mesh(
    flatShape(PW - inset * 2, PH - inset * 2, PR - inset * 0.8),
    new THREE.MeshBasicMaterial({ map: phoneScreenTexture(), toneMapped: false, color: 0xededed }),
  )
  screen.position.z = PD / 2 + 0.0012
  phone.add(screen)
  const btn = (side: number, y: number, len: number, dark = false) => {
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.012, len, PD * 0.42, 3, 0.005), dark ? m.blackGlass : titanium)
    b.position.set(side * (PW / 2 + 0.004), y, 0)
    phone.add(b)
  }
  btn(-1, PH * 0.3, 0.07) // Action
  btn(-1, PH * 0.19, 0.13) // volume up
  btn(-1, PH * 0.08, 0.13) // volume down
  btn(1, PH * 0.2, 0.2) // side button
  btn(1, -PH * 0.12, 0.1, true) // Camera Control

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(PW * 2.6, PD * 14),
    new THREE.MeshBasicMaterial({ map: m.soft(10, 128, 'rgba(0,0,0,.9)', 'rgba(0,0,0,0)'), transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  return { phone, shadow }
}

export function createLumosScene(canvas: HTMLCanvasElement): LumosScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const studioScene = studio()
  const envRT = pmrem.fromScene(studioScene, 0.02)
  scene.environment = envRT.texture
  scene.environmentIntensity = 1.25

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100)
  const key = new THREE.DirectionalLight(0xffffff, 0.9)
  key.position.set(2, 7, 4)
  scene.add(key)

  const loader = new THREE.TextureLoader()
  const tex = (src: string) => {
    const t = loader.load(src)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }
  const shots = IMG.screens.map(tex)

  const grain = canvasTex(512, 512, (g) => {
    g.fillStyle = 'rgb(128,128,128)'
    g.fillRect(0, 0, 512, 512)
    for (let i = 0; i < 9000; i++) {
      const v = 110 + Math.random() * 40
      g.fillStyle = `rgb(${v},${v},${v})`
      g.fillRect(Math.random() * 512, Math.random() * 512, 30 + Math.random() * 90, 1)
    }
  })
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping
  grain.repeat.set(3, 3)

  const alu = new THREE.MeshPhysicalMaterial({ color: 0x45484e, metalness: 1, roughness: 0.4, roughnessMap: grain, specularIntensity: 1 })
  const aluInner = new THREE.MeshPhysicalMaterial({ color: 0x26282c, metalness: 1, roughness: 0.52, roughnessMap: grain })
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: 0.72, metalness: 0 })
  const well = new THREE.MeshStandardMaterial({ color: 0x060607, roughness: 0.9 })
  const padMat = new THREE.MeshPhysicalMaterial({ color: 0x2a2c30, metalness: 0.9, roughness: 0.3, clearcoat: 0.4, clearcoatRoughness: 0.3 })
  const blackGlass = new THREE.MeshPhysicalMaterial({ color: 0x020203, metalness: 0, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02 })

  const W = 3.2, D = 2.2, H = 0.075, T = 0.03
  const laptop = new THREE.Group()
  scene.add(laptop)

  const base = new THREE.Mesh(slab(W, D, H, 0.14, 0.012), alu)
  base.position.y = -H
  laptop.add(base)

  const kbW = W * 0.72, kbD = D * 0.4, kbZ = -D * 0.16
  const kbWell = new THREE.Mesh(new THREE.PlaneGeometry(kbW + 0.06, kbD + 0.06), well)
  kbWell.rotation.x = -Math.PI / 2
  kbWell.position.set(0, 0.0005, kbZ)
  laptop.add(kbWell)

  const rows: { w: number[]; h?: number }[] = [
    { w: Array(14).fill(1), h: 0.5 },
    { w: [...Array(13).fill(1), 1.5] },
    { w: [1.5, ...Array(13).fill(1)] },
    { w: [1.8, ...Array(11).fill(1), 1.8] },
    { w: [2.3, ...Array(10).fill(1), 2.3] },
    { w: [1, 1, 1, 1.3, 5.2, 1.3, 1, 1, 1] },
  ]
  const gap = 0.018
  const unit = (kbW - 13 * gap) / 14.5
  const rowH = (kbD - 5 * gap) / 5.5
  const keyGeo = new RoundedBoxGeometry(1, 0.022, 1, 3, 0.006)
  const count = rows.reduce((n, r) => n + r.w.length, 0)
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, count)
  const m4 = new THREE.Matrix4()
  let k = 0
  let zCursor = kbZ - kbD / 2
  rows.forEach((r) => {
    const hh = rowH * (r.h ?? 1)
    const total = r.w.reduce((a, b) => a + b, 0) * unit + (r.w.length - 1) * gap
    let x = -total / 2
    r.w.forEach((wu) => {
      const kw = wu * unit
      m4.compose(new THREE.Vector3(x + kw / 2, 0.012, zCursor + hh / 2), new THREE.Quaternion(), new THREE.Vector3(kw, 1, hh))
      keys.setMatrixAt(k++, m4)
      x += kw + gap
    })
    zCursor += hh + gap
  })
  laptop.add(keys)

  const grille = canvasTex(64, 512, (g) => {
    g.fillStyle = '#000'
    g.fillRect(0, 0, 64, 512)
    g.fillStyle = '#fff'
    for (let y = 6; y < 512; y += 11)
      for (let x = 6; x < 64; x += 11) {
        g.beginPath()
        g.arc(x + ((y / 11) % 2) * 5, y, 2.4, 0, Math.PI * 2)
        g.fill()
      }
  })
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, alphaMap: grille, roughness: 1 })
  ;[-1, 1].forEach((sx) => {
    const gm = new THREE.Mesh(new THREE.PlaneGeometry(0.2, kbD), grilleMat)
    gm.rotation.x = -Math.PI / 2
    gm.position.set(sx * (kbW / 2 + 0.2), 0.0008, kbZ)
    laptop.add(gm)
  })

  const pad = new THREE.Mesh(new RoundedBoxGeometry(1.35, 0.004, 0.82, 3, 0.0019), padMat)
  pad.position.set(0, 0.0005, D * 0.28)
  laptop.add(pad)

  const hingeBar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, W * 0.78, 40), aluInner)
  hingeBar.rotation.z = Math.PI / 2
  hingeBar.position.set(0, 0.012, -D / 2 + 0.05)
  laptop.add(hingeBar)

  const hinge = new THREE.Group()
  hinge.position.set(0, 0.012, -D / 2 + 0.05)
  laptop.add(hinge)
  const LD = D - 0.05
  const lid = new THREE.Mesh(slab(W, LD, T, 0.2, 0.008), alu)
  lid.position.set(0, 0, LD / 2)
  hinge.add(lid)
  const bezel = new THREE.Mesh(flatShape(W - 0.014, LD - 0.014, 0.19), blackGlass)
  bezel.rotation.x = Math.PI / 2
  bezel.position.set(0, -0.001, LD / 2)
  hinge.add(bezel)
  const screenMat = new THREE.MeshBasicMaterial({ map: shots[0], color: 0x000000, toneMapped: false })
  const SW = W - 0.13
  const SH = SW / 1.6
  const screen = new THREE.Mesh(flatShape(SW, SH, 0.07), screenMat)
  screen.rotation.x = Math.PI / 2
  screen.position.set(0, -0.0025, LD - 0.065 - SH / 2)
  hinge.add(screen)
  const camDot = new THREE.Mesh(new THREE.CircleGeometry(0.011, 24), new THREE.MeshStandardMaterial({ color: 0x1b1d22, roughness: 0.3, metalness: 0.4 }))
  camDot.rotation.x = Math.PI / 2
  camDot.position.set(0, -0.0022, LD - 0.032)
  hinge.add(camDot)

  const soft = (inner: number, outer: number, a0: string, a1: string) => {
    const t = canvasTex(256, 256, (g) => {
      const r = g.createRadialGradient(128, 128, inner, 128, 128, outer)
      r.addColorStop(0, a0)
      r.addColorStop(1, a1)
      g.fillStyle = r
      g.fillRect(0, 0, 256, 256)
    })
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }
  const glowMat = new THREE.SpriteMaterial({
    map: soft(0, 128, 'rgba(170,200,255,.55)', 'rgba(0,0,0,0)'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const glow = new THREE.Sprite(glowMat)
  glow.scale.set(8, 5.2, 1)
  glow.position.set(0, 1.0, -3.4)
  scene.add(glow)
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 1.6, D * 1.7),
    new THREE.MeshBasicMaterial({ map: soft(20, 128, 'rgba(0,0,0,.85)', 'rgba(0,0,0,0)'), transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -H - 0.004
  laptop.add(shadow)

  const { phone, shadow: pShadow } = buildPhone({ blackGlass, soft })
  scene.add(phone, pShadow)
  const pShadowMat = pShadow.material as THREE.MeshBasicMaterial

  function render({ p, px, py, now, narrow, reduce }: LumosFrame) {
    const F = FINAL_POSE
    const idle = reduce ? 0 : Math.sin(now / 2600) * 0.05 * (1 - span(p, 0, 0.15))
    const open = span(p, 0.02, 0.3)
    const ph = span(p, F.phoneIn[0], F.phoneIn[1])
    // Screen beats: come in until the display fills most of the width, pull back for the line-up.
    const zoom = span(p, 0.22, 0.4) * (1 - ph)
    hinge.rotation.x = lerp(lerp(-0.28, -1.86, open), -1.64, zoom)
    laptop.rotation.y = lerp(-0.58, 0, span(p, 0.02, 0.36)) + idle + px * 0.1
    laptop.rotation.x = py * 0.04
    laptop.position.y = lerp(-0.62, -0.4, open)

    const lumos = span(p, 0.14, 0.3)
    const idx = p < SCREEN_BREAKS[0] ? 0 : p < SCREEN_BREAKS[1] ? 1 : 2
    if (screenMat.map !== shots[idx]) screenMat.map = shots[idx]
    const edge = SCREEN_BREAKS.reduce((m, e) => Math.min(m, Math.abs(p - e)), 1)
    screenMat.color.setScalar(lumos * 0.95 * lerp(0.2, 1, clamp(edge / 0.02)))
    glowMat.opacity = lumos * 0.5

    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    const fit = (hw: number) => hw / (tanHalf * camera.aspect)
    const wide = Math.max(narrow ? 14 : 9.6, fit(1.95))
    const dist = lerp(lerp(wide, fit(narrow ? 1.72 : 2.2), zoom), fit(narrow ? 1.85 : 2.6), ph)
    // Close-up framing: lid near-vertical, camera square-on, display top parked just under the caption line.
    const hView = tanHalf * dist
    const sTop = laptop.position.y + 2.09
    const zLook = sTop - hView * (1 - 2 * (narrow ? 0.27 : 0.3))
    const zCamY = zLook + dist * 0.07
    const lookY = lerp(lerp(0.0, 0.55, open) + (narrow ? 0.45 : 0), zLook, zoom)

    laptop.position.x = lerp(0, narrow ? 0 : F.laptopShiftX, ph)
    const floor = laptop.position.y - H
    phone.position.set(
      lerp(narrow ? F.phoneFromXNarrow : F.phoneFromX, narrow ? F.phoneXNarrow : F.phoneX, ph),
      floor + PH / 2 + 0.002,
      narrow ? F.phoneZNarrow : F.phoneZ,
    )
    phone.rotation.set(0, lerp(F.phoneRotY[0], F.phoneRotY[1], ph), 0)
    phone.visible = pShadow.visible = ph > 0.001
    pShadow.position.set(phone.position.x, floor + 0.001, phone.position.z)
    pShadowMat.opacity = ph

    const cx = lerp(0, narrow ? 0 : F.cameraShiftX, ph)
    camera.position.set(px * 0.35 * (1 - zoom * 0.6) + cx, lerp(lerp(2.3, 1.25, span(p, 0, 0.3)), zCamY, zoom), dist)
    camera.lookAt(cx, lookY, 0)

    renderer.render(scene, camera)
  }

  function resize(w: number, h: number) {
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function dispose() {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
      ;(Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((mm) => {
        Object.values(mm).forEach((v) => {
          if (v instanceof THREE.Texture) v.dispose()
        })
        mm.dispose()
      })
    })
    shots.forEach((t) => t.dispose())
    envRT.dispose()
    pmrem.dispose()
    studioScene.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      ;(mesh.material as THREE.Material | undefined)?.dispose?.()
    })
    renderer.dispose()
  }

  return { render, resize, dispose }
}
