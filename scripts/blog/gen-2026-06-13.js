#!/usr/bin/env node
/**
 * Hero images for the 2026-06-13 GSC-gap blog batch (4 posts).
 * Gemini 3.1 Flash Image Preview → public/blog/<slug>.png
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

// Same shared style guide as scripts/blog/generate-images.js for visual cohesion
const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  {
    slug: 'korean-business-marketing-atlanta-johns-creek-suwanee-2026',
    prompt: `A sunlit suburban Korean-American shopping plaza in metro Atlanta at golden hour, modern storefronts with subtle hangul signage softly out of focus, lush Georgia greenery, a hand in the foreground holding a smartphone showing a local map with a single location pin dropped. Warm late-afternoon southern light, gentle bokeh. ${STYLE}`,
  },
  {
    slug: 'korean-seo-guide-american-businesses-2026',
    prompt: `A clean editorial desk with a laptop displaying a stylized search results page, beside it a second smaller screen hinting at a different search engine interface, a magnifying glass resting on a notebook with neat bilingual notes, a Korean ceramic mug. Cool focused morning light, tech magazine aesthetic. ${STYLE}`,
  },
  {
    slug: 'kakaotalk-advertising-cost-roi-korean-business-2026',
    prompt: `A smartphone on a minimal desk showing a yellow chat-app messaging interface with message bubbles, beside a small monitor displaying an upward-trending performance graph, a short neat stack of coins and a Korean ceramic dish. Warm amber lighting, financial-tech editorial vibe, soft bokeh. ${STYLE}`,
  },
  {
    slug: 'korean-business-local-seo-englewood-bergen-county-nj-2026',
    prompt: `A charming Korean-American main street in suburban New Jersey at golden hour, storefronts with subtle hangul signs blurred in the background, autumn East Coast trees, a hand holding a smartphone in the foreground showing a local map with a location pin. Warm evening light, cinematic depth of field. ${STYLE}`,
  },
];

async function generate(prompt, slug) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`${slug}: ${body.error?.message || JSON.stringify(body).slice(0,200)}`);
  const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!img) throw new Error(`${slug}: no image returned`);
  return Buffer.from(img.inlineData.data, 'base64');
}

(async () => {
  const outDir = path.join(__dirname, '../../public/blog');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n🎨 Generating ${IMAGES.length} blog hero images via ${MODEL}...\n`);
  let ok = 0, fail = 0;
  for (const item of IMAGES) {
    try {
      const buf = await generate(item.prompt, item.slug);
      const out = path.join(outDir, `${item.slug}.png`);
      fs.writeFileSync(out, buf);
      console.log(`  ✅ ${item.slug}.png (${(buf.length / 1024).toFixed(0)}KB)`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${item.slug}: ${e.message.slice(0, 120)}`);
      fail++;
    }
  }
  console.log(`\n📊 ${ok}/${IMAGES.length} generated${fail ? `, ${fail} failed` : ''}`);
})();
