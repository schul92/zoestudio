#!/usr/bin/env node
/**
 * Hero images for the 2026-07-15 "새로 시작하는 한인 사장님" market-entry batch (5 posts).
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
    slug: 'shopify-korean-product-sellers-why-start-2026',
    prompt: `A tidy home-office packing station of a small e-commerce seller: neat stacks of small shipping boxes with Korean beauty product cartons softly blurred, a laptop showing a clean online storefront with product photos, a handheld barcode scanner and packing tape beside it, warm morning light, a sense of an organized business about to grow. ${STYLE}`,
  },
  {
    slug: 'b2b-company-website-korean-business-credibility-2026',
    prompt: `A modern wholesale warehouse office viewed through glass: a clean desk with a laptop showing a simple corporate website, printed business cards and a company letterhead neatly arranged, pallet racking softly blurred in the background, cool professional daylight with warm accents, the quiet confidence of a legitimate established company. ${STYLE}`,
  },
  {
    slug: 'why-start-website-right-first-time-lock-in-2026',
    prompt: `A construction metaphor on a clean desk: a small architectural model of a storefront building placed on a solid concrete foundation block beside a second identical model sinking slightly into loose sand in a shallow tray, soft studio light, side by side comparison of solid versus cheap foundations, minimalist and calm. ${STYLE}`,
  },
  {
    slug: 'buy-domain-in-your-own-name-korean-business-2026',
    prompt: `A single brass house key resting on top of a property deed style document beside a small potted plant and a ceramic cup on a warm wooden desk, a softly glowing laptop in the background, the feeling of finally holding the keys to something in your own name, warm reassuring light. ${STYLE}`,
  },
  {
    slug: 'florist-online-ordering-korean-flower-shop-2026',
    prompt: `A cozy flower shop counter during a busy holiday rush: a lush arrangement of red roses and ranunculus in the foreground, a tablet on a stand showing a simple online order screen with a gentle glow, ribbon spools and kraft wrapping paper nearby, an old landline phone pushed to the side out of focus, warm romantic amber light. ${STYLE}`,
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
