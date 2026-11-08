// Replace individual frames of an encoded hero sequence with freshly rendered PNGs (same pose, new screen image),
// re-encode just those frames the way encode.mjs does, and write the result as a NEW content-hashed folder
// (the /hero/* folders are cached immutable, so frames are never overwritten in place).
//
// node scripts/hero/replace-frames.mjs <set: FRAMES_DESKTOP|FRAMES_MOBILE> <avifQuality> <index=render.png> [<index=render.png> ...]
// Example: node scripts/hero/replace-frames.mjs FRAMES_DESKTOP 64 105=/tmp/render-d/p0.48.png 106=/tmp/render-d/p0.61.png
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const [setName, qArg, ...pairs] = process.argv.slice(2)
const Q = Number(qArg)
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..')
const PUB = path.join(REPO, 'public/hero')
const MANIFEST = path.join(REPO, 'src/components/home/lumosFrames.ts')
const PAD = 24

const manifest = fs.readFileSync(MANIFEST, 'utf8')
const line = manifest.split('\n').find((l) => l.startsWith(`export const ${setName} =`))
if (!line) throw new Error('no manifest line for ' + setName)
const current = JSON.parse(line.slice(line.indexOf('{'), line.lastIndexOf('}') + 1))
const oldDir = path.join(PUB, path.basename(current.dir))
const meta = JSON.parse(fs.readFileSync(path.join(oldDir, 'meta.txt'), 'utf8'))

// ── same as encode.mjs ────────────────────────────────────────────
async function trimBox(buf) {
  const { data, info } = await sharp(buf).extractChannel(3).raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let y = 0; y < h; y++) {
    const row = y * w
    for (let x = 0; x < w; x++) {
      if (data[row + x] > 48) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
    }
  }
  const left = Math.max(0, x0 - PAD), top = Math.max(0, y0 - PAD)
  const box = { left, top, width: Math.min(w, x1 + PAD + 1) - left, height: Math.min(h, y1 + PAD + 1) - top }
  box.cut = { top: y0 <= 1, bottom: y1 >= h - 2, left: x0 <= 1, right: x1 >= w - 2 }
  return box
}
async function fadeCuts(buf, cut) {
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

// ── encode the replacements ───────────────────────────────────────
const replaced = {}
for (const pair of pairs) {
  const [idxS, file] = pair.split('=')
  const idx = Number(idxS)
  let buf = fs.readFileSync(file)
  const md = await sharp(buf).metadata()
  // The render is normalised to the set's shared render frame (mobile renders are downscaled to 860 wide).
  if (md.width !== meta.rw) buf = await sharp(buf).resize({ width: meta.rw, height: meta.rh, fit: 'fill' }).png().toBuffer()
  const { cut, ...rect } = await trimBox(buf)
  const raw = await fadeCuts(await sharp(buf).extract(rect).png().toBuffer(), cut)
  const avif = await sharp(raw).avif({ quality: Q, effort: 5 }).toBuffer()
  const webp = await sharp(raw).webp({ quality: 72, alphaQuality: 75, effort: 6, smartSubsample: true }).toBuffer()
  const prev = meta.f[idx]
  console.log(`frame ${idx} p=${prev.p}: box ${prev.x},${prev.y} ${prev.w}x${prev.h} → ${rect.left},${rect.top} ${rect.width}x${rect.height}; avif ${(avif.length / 1024).toFixed(0)} KB webp ${(webp.length / 1024).toFixed(0)} KB`)
  meta.f[idx] = { p: prev.p, x: rect.left, y: rect.top, w: rect.width, h: rect.height }
  replaced[idx] = { avif, webp }
}

// ── assemble the new folder (content hash over every frame, like encode.mjs) ──
const n = meta.f.length
const avifs = [], webps = []
for (let i = 0; i < n; i++) {
  const name = `f${String(i).padStart(3, '0')}`
  avifs.push(replaced[i] ? replaced[i].avif : fs.readFileSync(path.join(oldDir, name + '.avif')))
  webps.push(replaced[i] ? replaced[i].webp : fs.readFileSync(path.join(oldDir, name + '.webp')))
}
const hash = crypto.createHash('sha1')
avifs.forEach((b) => hash.update(b)); webps.forEach((b) => hash.update(b))
const prefix = path.basename(current.dir).split('-').slice(0, 2).join('-') // seq-d / seq-m
const newName = `${prefix}-${hash.digest('hex').slice(0, 8)}`
const newDir = path.join(PUB, newName)
fs.mkdirSync(newDir, { recursive: true })
avifs.forEach((b, i) => fs.writeFileSync(path.join(newDir, `f${String(i).padStart(3, '0')}.avif`), b))
webps.forEach((b, i) => fs.writeFileSync(path.join(newDir, `f${String(i).padStart(3, '0')}.webp`), b))
fs.writeFileSync(path.join(newDir, 'meta.txt'), JSON.stringify(meta))
fs.rmSync(oldDir, { recursive: true })

const next = { ...current, dir: `/hero/${newName}` }
fs.writeFileSync(MANIFEST, manifest.replace(line, `export const ${setName} = ${JSON.stringify(next)} as const`))
console.log(`${setName}: ${path.basename(oldDir)} → ${newName} (${Object.keys(replaced).length} frame(s) replaced)`)
