#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3.1-flash-image-preview';

const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette, no text or typography in the image, no logos, horizontal 16:9 composition.`;

const RETRY = [
  { slug: 'nj-ny-website-cost-2026', prompt: `A clean editorial still-life of a calculator, a receipt with tidy numbers, a fountain pen, and a printed website mockup on a marble desk. Afternoon sunlight streaming in from the side. Muted financial magazine aesthetic. ${STYLE}` },
  { slug: 'do-i-need-a-website-korean-business', prompt: `A Korean-American small business owner's hands holding a smartphone showing a bustling Instagram feed, with a closed laptop beside it on a wooden cafe table. Steam rising from a coffee cup, ambient bokeh background. Thoughtful, contemplative mood. ${STYLE}` },
];

async function gen(prompt, attempt = 1) {
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } }),
    });
    const b = await r.json();
    if (!r.ok) throw new Error(b.error?.message || 'fail');
    const img = b.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!img) throw new Error('no image');
    return Buffer.from(img.inlineData.data, 'base64');
  } catch (e) {
    if (attempt < 3) { await new Promise(r => setTimeout(r, 2000)); return gen(prompt, attempt + 1); }
    throw e;
  }
}

(async () => {
  const outDir = path.join(__dirname, '../../public/blog');
  for (const { slug, prompt } of RETRY) {
    try {
      const buf = await gen(prompt);
      fs.writeFileSync(path.join(outDir, `${slug}.png`), buf);
      console.log(`  ✅ ${slug}.png`);
    } catch (e) {
      console.log(`  ❌ ${slug}: ${e.message}`);
    }
  }
})();
