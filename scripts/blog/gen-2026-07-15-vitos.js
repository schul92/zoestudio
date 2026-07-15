#!/usr/bin/env node
/**
 * Images for the 2026-07-15 Vito's Pizza flagship case study (1 hero + 2 inline).
 * Gemini 3.1 Flash Image Preview → public/blog/<name>.png
 */
const fs = require('fs');
const path = require('path');

// Env var wins; falls back to GEMINI_API_KEY in repo-root .env.local
let GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  try {
    const env = fs.readFileSync(path.join(__dirname, '../../.env.local'), 'utf8');
    GEMINI_KEY = env.match(/^GEMINI_API_KEY=(.+)$/m)?.[1]?.trim();
  } catch { /* fall through */ }
}
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY (env or .env.local)'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

// Same shared style guide as scripts/blog/generate-images.js for visual cohesion
const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  {
    name: 'website-drives-revenue-pizza-catering-case-study-2026',
    prompt: `A laptop showing a clean analytics dashboard with soft colorful charts, sitting open on the marble counter of a warm Italian pizzeria: a wood-fired pizza oven glowing softly in the blurred background, a fresh margherita pizza on a wooden peel beside the laptop, flour dusting the counter, evening golden light, the feeling of a restaurant owner finally seeing his business clearly. ${STYLE}`,
  },
  {
    name: 'vitos-dashboard-inline-2026',
    prompt: `Close over-the-shoulder view of a restaurant owner's hands holding a morning espresso next to a laptop displaying a simple elegant business dashboard with a few soft bar charts and line graphs, warm morning light through a pizzeria window, red-checkered cloth softly blurred, calm confident start-of-day mood. ${STYLE}`,
  },
  {
    name: 'vitos-catering-inline-2026',
    prompt: `A generous Italian catering spread being prepared: large foil trays of baked pasta and salads, stacks of pizza boxes tied for delivery, fresh herbs and lemons, a tablet with a simple order form propped nearby on the stainless kitchen counter, bustling warm kitchen light, the sense of a big profitable order going out the door. ${STYLE}`,
  },
];

async function generate(prompt, name) {
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
  if (!res.ok) throw new Error(`${name}: ${body.error?.message || JSON.stringify(body).slice(0,200)}`);
  const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!img) throw new Error(`${name}: no image returned`);
  return Buffer.from(img.inlineData.data, 'base64');
}

(async () => {
  const outDir = path.join(__dirname, '../../public/blog');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n🎨 Generating ${IMAGES.length} blog images via ${MODEL}...\n`);
  let ok = 0, fail = 0;
  for (const item of IMAGES) {
    try {
      const buf = await generate(item.prompt, item.name);
      const out = path.join(outDir, `${item.name}.png`);
      fs.writeFileSync(out, buf);
      console.log(`  ✅ ${item.name}.png (${(buf.length / 1024).toFixed(0)}KB)`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message.slice(0, 120)}`);
      fail++;
    }
  }
  console.log(`\n📊 ${ok}/${IMAGES.length} generated${fail ? `, ${fail} failed` : ''}`);
})();
