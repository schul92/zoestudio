// Encode rendered PNG frames to AVIF + WebP under a size budget, into content-hashed folders, and emit a TS manifest.
// node encode.mjs <renderDirDesktop> <renderDirMobile> <repoRoot>
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const [dDir, mDir, repo] = process.argv.slice(2)
const PUB = path.join(repo, 'public/hero')
const list = (d) => fs.readdirSync(d).filter((f) => /^f\d+\.png$/.test(f)).sort().map((f) => path.join(d, f))

// Phone frames are trimmed to the product (alpha bbox + pad) so it fills the measured band.
async function trimBox(file) {
  const { data, info } = await sharp(file).extractChannel(3).raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let y = 0; y < h; y++) {
    const row = y * w
    for (let x = 0; x < w; x++) {
      if (data[row + x] > 48) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
    }
  }
  const pad = 24
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad)
  const box = { left, top, width: Math.min(w, x1 + pad + 1) - left, height: Math.min(h, y1 + pad + 1) - top }
  // Edges where the product runs off the render frame get a soft alpha fade instead of a hard cut.
  box.cut = { top: y0 <= 1, bottom: y1 >= h - 2, left: x0 <= 1, right: x1 >= w - 2 }
  return box
}

async function fadeCuts(buf, cut) {
  // Every crop edge gets a narrow fade (the faint floor shadow is trimmed there); edges where the product itself
  // runs off the render frame get a long one.
  const { width: w, height: h } = await sharp(buf).metadata()
  const fy = Math.round(h * (cut.top || cut.bottom ? 0.16 : 0.05)), fx = Math.round(w * (cut.left || cut.right ? 0.1 : 0.04))
  const stops = (a, b, n) => `<stop offset="0" stop-color="#fff" stop-opacity="${a}"/><stop offset="${n}" stop-color="#fff" stop-opacity="1"/><stop offset="${1 - n}" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="${b}"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">${stops(0, 0, fy / h)}</linearGradient>
    <linearGradient id="u" x1="0" y1="0" x2="1" y2="0">${stops(0, 0, fx / w)}</linearGradient>
    <mask id="m"><rect width="${w}" height="${h}" fill="url(#u)"/></mask></defs>
    <rect width="${w}" height="${h}" fill="url(#v)" mask="url(#m)"/></svg>`
  return sharp(buf).composite([{ input: Buffer.from(svg), blend: 'dest-in' }]).png().toBuffer()
}

async function encodeSet({ name, files, crop, budget, firstMax }) {
  const raws = []
  for (const f of files) {
    if (!crop) { raws.push(await sharp(f).png().toBuffer()); continue }
    const box = await trimBox(f)
    const { cut, ...rect } = box
    raws.push(await fadeCuts(await sharp(f).extract(rect).png().toBuffer(), cut))
  }
  // Search the AVIF quality that keeps the whole set under budget (and the first frame under its own cap).
  // Quality ceiling: q76 is visually lossless on these renders; above that bytes grow with no visible gain.
  let lo = 30, hi = 76, best = null
  while (lo <= hi) {
    const q = Math.round((lo + hi) / 2)
    const out = []
    for (const r of raws) out.push(await sharp(r).avif({ quality: q, effort: 6 }).toBuffer())
    const total = out.reduce((a, b) => a + b.length, 0)
    const ok = total <= budget && out[0].length <= firstMax
    console.log(name, 'avif q', q, 'total', (total / 1024).toFixed(0), 'KB', 'first', (out[0].length / 1024).toFixed(1), ok ? 'ok' : 'over')
    if (ok) { best = { q, out, total }; lo = q + 1 } else hi = q - 1
  }
  if (!best) throw new Error(name + ': cannot meet budget')
  // WebP fallback at a matched visual quality.
  const webp = []
  for (const r of raws) webp.push(await sharp(r).webp({ quality: 72, alphaQuality: 75, effort: 6, smartSubsample: true }).toBuffer())
  const meta = []
  for (const r of raws) { const m = await sharp(r).metadata(); meta.push({ w: m.width, h: m.height }) }
  const hash = crypto.createHash('sha1')
  best.out.forEach((b) => hash.update(b)); webp.forEach((b) => hash.update(b))
  const dir = `${name}-${hash.digest('hex').slice(0, 8)}`
  const outDir = path.join(PUB, dir)
  fs.mkdirSync(outDir, { recursive: true })
  best.out.forEach((b, i) => fs.writeFileSync(path.join(outDir, `f${String(i).padStart(2, '0')}.avif`), b))
  webp.forEach((b, i) => fs.writeFileSync(path.join(outDir, `f${String(i).padStart(2, '0')}.webp`), b))
  fs.writeFileSync(path.join(outDir, 'meta.txt'), JSON.stringify(meta))
  const ph = await sharp(raws[0]).resize({ width: 40 }).blur(1.2).webp({ quality: 45, alphaQuality: 60 }).toBuffer()
  const webpTotal = webp.reduce((a, b) => a + b.length, 0)
  console.log(name, '→', dir, 'avif q', best.q, 'avif', (best.total / 1024).toFixed(0), 'KB', 'webp', (webpTotal / 1024).toFixed(0), 'KB',
    'first avif', (best.out[0].length / 1024).toFixed(1), 'KB', 'placeholder', ph.length, 'B')
  return { dir: `/hero/${dir}`, count: raws.length, w: meta[0].w, h: meta[0].h, placeholder: `data:image/webp;base64,${ph.toString('base64')}`,
    avifKB: Math.round(best.total / 1024), webpKB: Math.round(webpTotal / 1024), q: best.q }
}

const desktop = await encodeSet({ name: 'seq-d', files: list(dDir), crop: true, budget: 3.5 * 1024 * 1024, firstMax: 60 * 1024 })
const mobile = await encodeSet({ name: 'seq-m', files: list(mDir), crop: true, budget: 2.2 * 1024 * 1024, firstMax: 40 * 1024 })
const probe = await sharp({ create: { width: 1, height: 1, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).avif({ quality: 50 }).toBuffer()

const ts = `// Generated by the hero render pipeline (Blender → sharp). Do not edit by hand.
export const FRAMES_DESKTOP = ${JSON.stringify({ dir: desktop.dir, count: desktop.count, placeholder: desktop.placeholder })} as const
export const FRAMES_MOBILE = ${JSON.stringify({ dir: mobile.dir, count: mobile.count, placeholder: mobile.placeholder })} as const
export const AVIF_PROBE = ${JSON.stringify(`data:image/avif;base64,${probe.toString('base64')}`)}
`
fs.writeFileSync(path.join(repo, 'src/components/home/lumosFrames.ts'), ts)
console.log(JSON.stringify({ desktop: { ...desktop, placeholder: undefined }, mobile: { ...mobile, placeholder: undefined } }))
