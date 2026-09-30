// Encode rendered PNG frames to AVIF + WebP under a size budget, into content-hashed folders, and emit a TS manifest.
// node encode.mjs <renderDirDesktop> <renderDirMobile> <repoRoot>
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const [dDir, mDir, repo] = process.argv.slice(2)
const PUB = path.join(repo, 'public/hero')
const list = (d) => fs.readdirSync(d).filter((f) => /^f\d+\.png$/.test(f)).sort().map((f) => path.join(d, f))
const schedule = (d) => JSON.parse(fs.readFileSync(path.join(d, 'schedule.json'), 'utf8'))

const PAD = 24
// Bounded parallel map (encodes are CPU-bound; sharp runs them on its own threads).
async function pmap(items, fn, n = 8) {
  const out = new Array(items.length)
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k) } }))
  return out
}
// Frames are trimmed to the product (alpha bbox + pad) so it fills the measured band.
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
  const pad = PAD
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad)
  const box = { left, top, width: Math.min(w, x1 + pad + 1) - left, height: Math.min(h, y1 + pad + 1) - top }
  // Edges where the product runs off the render frame get a soft alpha fade instead of a hard cut.
  box.cut = { top: y0 <= 1, bottom: y1 >= h - 2, left: x0 <= 1, right: x1 >= w - 2 }
  return box
}

async function fadeCuts(buf, cut) {
  // Every crop edge gets a narrow fade (the faint floor shadow is trimmed there); edges where the product itself
  // runs off the render frame get a long one.
  // Uncut edges fade only inside the transparent pad (≤ PAD px), so the product itself is never faded and neighbouring
  // frames (placed in shared render space by the player) cross-fade without edge shimmer.
  const { width: w, height: h } = await sharp(buf).metadata()
  const fy = cut.top || cut.bottom ? Math.round(h * 0.16) : Math.min(PAD, Math.round(h * 0.05))
  const fx = cut.left || cut.right ? Math.round(w * 0.1) : Math.min(PAD, Math.round(w * 0.04))
  const stops = (a, b, n) => `<stop offset="0" stop-color="#fff" stop-opacity="${a}"/><stop offset="${n}" stop-color="#fff" stop-opacity="1"/><stop offset="${1 - n}" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="${b}"/>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">${stops(0, 0, fy / h)}</linearGradient>
    <linearGradient id="u" x1="0" y1="0" x2="1" y2="0">${stops(0, 0, fx / w)}</linearGradient>
    <mask id="m"><rect width="${w}" height="${h}" fill="url(#u)"/></mask></defs>
    <rect width="${w}" height="${h}" fill="url(#v)" mask="url(#m)"/></svg>`
  return sharp(buf).composite([{ input: Buffer.from(svg), blend: 'dest-in' }]).png().toBuffer()
}

async function encodeSet({ name, src, budget, firstMax }) {
  const files = list(src)
  const ps = schedule(src)
  if (ps.length !== files.length) throw new Error(`${name}: ${files.length} frames vs ${ps.length} schedule`)
  const raws = []
  const boxes = []
  const { width: rw, height: rh } = await sharp(files[0]).metadata()
  for (const f of files) {
    const box = await trimBox(f)
    const { cut, ...rect } = box
    boxes.push(rect)
    raws.push(await fadeCuts(await sharp(f).extract(rect).png().toBuffer(), cut))
  }
  // Search the AVIF quality that keeps the whole set under budget (and the first frame under its own cap).
  // Quality ceiling: q76 is visually lossless on these renders; above that bytes grow with no visible gain.
  let lo = 30, hi = 76, best = null
  while (lo <= hi) {
    const q = Math.round((lo + hi) / 2)
    const out = await pmap(raws, (r) => sharp(r).avif({ quality: q, effort: 5 }).toBuffer())
    const total = out.reduce((a, b) => a + b.length, 0)
    const ok = total <= budget && out[0].length <= firstMax
    console.log(name, 'avif q', q, 'total', (total / 1024).toFixed(0), 'KB', 'first', (out[0].length / 1024).toFixed(1), ok ? 'ok' : 'over')
    if (ok) { best = { q, out, total }; lo = q + 1 } else hi = q - 1
  }
  if (!best) throw new Error(name + ': cannot meet budget')
  // WebP fallback at a matched visual quality.
  const webp = await pmap(raws, (r) => sharp(r).webp({ quality: 72, alphaQuality: 75, effort: 6, smartSubsample: true }).toBuffer())
  // Each frame keeps its crop's position in the shared render frame, so the player can place any two neighbours in
  // one coordinate space and cross-fade them exactly (no snaps when the crop changes between frames).
  const meta = { rw, rh, f: boxes.map((b, i) => ({ p: ps[i], x: b.left, y: b.top, w: b.width, h: b.height })) }
  const hash = crypto.createHash('sha1')
  best.out.forEach((b) => hash.update(b)); webp.forEach((b) => hash.update(b))
  const dir = `${name}-${hash.digest('hex').slice(0, 8)}`
  const outDir = path.join(PUB, dir)
  fs.mkdirSync(outDir, { recursive: true })
  best.out.forEach((b, i) => fs.writeFileSync(path.join(outDir, `f${String(i).padStart(3, '0')}.avif`), b))
  webp.forEach((b, i) => fs.writeFileSync(path.join(outDir, `f${String(i).padStart(3, '0')}.webp`), b))
  fs.writeFileSync(path.join(outDir, 'meta.txt'), JSON.stringify(meta))
  const ph = await sharp(raws[0]).resize({ width: 40 }).blur(1.2).webp({ quality: 45, alphaQuality: 60 }).toBuffer()
  const webpTotal = webp.reduce((a, b) => a + b.length, 0)
  console.log(name, '→', dir, 'avif q', best.q, 'avif', (best.total / 1024).toFixed(0), 'KB', 'webp', (webpTotal / 1024).toFixed(0), 'KB',
    'first avif', (best.out[0].length / 1024).toFixed(1), 'KB', 'placeholder', ph.length, 'B')
  return { dir: `/hero/${dir}`, count: raws.length, placeholder: `data:image/webp;base64,${ph.toString('base64')}`,
    avifKB: Math.round(best.total / 1024), webpKB: Math.round(webpTotal / 1024), q: best.q }
}

// Pass "-" for a set to keep its current frames (the manifest line is carried over from lumosFrames.ts).
const manifest = path.join(repo, 'src/components/home/lumosFrames.ts')
const keep = (name) => {
  const line = fs.readFileSync(manifest, 'utf8').split('\n').find((l) => l.startsWith(`export const ${name} =`))
  if (!line) throw new Error('no existing manifest line for ' + name)
  return line
}
const desktop = dDir === '-' ? null : await encodeSet({ name: 'seq-d', src: dDir, budget: 5 * 1024 * 1024, firstMax: 60 * 1024 })
// Phones: ~2.2x density frames (the render is downscaled to 860 wide before encoding) — decode cost and memory matter
// more than the last bit of sharpness a 3x set would add.
const mobile = mDir === '-' ? null : await encodeSet({ name: 'seq-m', src: mDir, budget: 2.6 * 1024 * 1024, firstMax: 30 * 1024 })
const line = (name, set) => `export const ${name} = ${JSON.stringify({ dir: set.dir, count: set.count, placeholder: set.placeholder })} as const`
const ts = `// Generated by the hero render pipeline (Blender → sharp). Do not edit by hand.
${desktop ? line('FRAMES_DESKTOP', desktop) : keep('FRAMES_DESKTOP')}
${mobile ? line('FRAMES_MOBILE', mobile) : keep('FRAMES_MOBILE')}
`
fs.writeFileSync(manifest, ts)
console.log(JSON.stringify({ desktop: desktop && { ...desktop, placeholder: undefined }, mobile: mobile && { ...mobile, placeholder: undefined } }))
