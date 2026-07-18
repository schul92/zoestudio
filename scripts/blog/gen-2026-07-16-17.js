#!/usr/bin/env node
/**
 * Hero images for the 2026-07-16/17 backfill posts + the 2026-07-18 AWS post
 * that shipped without a static hero (was falling back to /api/og).
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
    slug: 'korean-restaurant-chicago-online-ordering-pos-reviews-2026',
    prompt: `A Korean restaurant counter at golden hour: a modern POS touchscreen terminal glowing softly beside a small receipt printer, a tablet on a stand showing an online food ordering screen, steam rising from a stone bowl of bibimbap slightly blurred in the background, a QR code stand card on the counter edge, warm wood surfaces, the calm before the dinner rush in a busy Chicago restaurant. ${STYLE}`,
  },
  {
    slug: 'korean-app-development-hire-guide-2026',
    prompt: `A clean designer desk during a mobile app design session: an iPhone displaying a polished custom booking app screen propped on a stand, a laptop behind it showing app interface wireframes, printed screen-flow sketches with hand annotations fanned neatly beside a pen, a warm cup of barley tea, soft morning window light, the feeling of a serious custom software project taking shape. ${STYLE}`,
  },
  {
    slug: 'aws-cloud-consulting-korean-business-dallas-2026',
    prompt: `A modern wholesale business office meets cloud infrastructure: a tidy desk with a laptop showing an abstract cloud architecture diagram of connected nodes, a small server rack with soft blue status lights glowing in a glass room behind, warehouse shelving softly blurred through a window, warm evening light mixing with cool teal accents, the sense of a growing company's data finally organized and secure. ${STYLE}`,
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
  process.exit(fail ? 1 : 0);
})();
