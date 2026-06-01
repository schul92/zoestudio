#!/usr/bin/env node
/**
 * Generate the hero product-mockup image for the homepage.
 * One-shot Gemini 3.1 Flash Image — outputs public/hero/product-mockup.png
 */
const fs = require('fs')
const path = require('path')

const GEMINI_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }
const MODEL = 'gemini-3.1-flash-image-preview'

const PROMPT = `Premium editorial product mockup image, cinematic photography, 4:5 portrait aspect ratio.
Composition: a stylized macOS Safari browser window (clean rounded corners, three traffic-light dots top-left, a single soft URL bar) floating on a warm peach cream background (#FFF4E8) at a slight 3-degree tilt to the right, with a soft realistic shadow underneath. The browser window contains a beautifully designed Korean-American skincare brand product page mockup featuring:
- Brand name "LUMORA" in elegant serif typography (centered top inside the browser window)
- Below: nav links "Shop · Best Sellers · About · Journal" in a clean horizontal row
- Center hero: a beautiful glass amber-cream hyaluronic acid serum bottle (pump dispenser top), photographed against a warm beige stone slab with a single sprig of dried botanical (white lavender or baby's breath) behind it, soft natural daylight from the left
- Right side of the product image area: product info — "Glow Hyaluronic Serum" in serif, "$48.00" in smaller text, five-star rating
- Below the product: black "Add to cart" button + purple "Buy with Shop Pay" button
- Bottom: three small feature badges "Clean Ingredients", "Made in Korea", "Cruelty Free" with tiny minimal icons

Style: ultra-premium e-commerce design like Glossier or Necessaire or Aesop. Warm cream and amber palette ONLY. No bright colors. Soft natural lighting. Photorealistic product photography mixed with clean UI design. NO text typos. Composition should feel like a Behance design portfolio piece.

Strict 4:5 portrait orientation. Background must be solid warm peach cream (#FFF4E8), NOT pure white.`

async function gen() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error?.message || JSON.stringify(body).slice(0, 200))
  const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!img) throw new Error('no image returned')
  return Buffer.from(img.inlineData.data, 'base64')
}

(async () => {
  const outDir = path.join(__dirname, '../../public/hero')
  fs.mkdirSync(outDir, { recursive: true })
  console.log('🎨 Generating hero product mockup...')
  const buf = await gen()
  const out = path.join(outDir, 'product-mockup.png')
  fs.writeFileSync(out, buf)
  console.log(`✅ ${out} (${(buf.length / 1024).toFixed(0)}KB)`)
})()
