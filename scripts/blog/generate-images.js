#!/usr/bin/env node
/**
 * Generates a unique hero image for each blog article via Gemini 3.1 Flash Image Preview.
 * Saves to public/blog/<slug>.png
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

// Shared style guide — keeps all images visually cohesive
const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  {
    slug: 'korean-business-website-guide-2026',
    prompt: `A modern designer's desk at golden hour with a sleek laptop showing a beautifully designed Korean-American business website mockup. A Korean ceramic coffee cup, leather notebook, and small plant beside it. Window light revealing a soft city skyline. ${STYLE}`,
  },
  {
    slug: 'local-seo-korean-business-2026',
    prompt: `Close-up of a smartphone held in hand showing a Google Maps interface with a local business pin dropped on it. Soft urban street background, slightly blurred, warm evening light. Subtle Korean hangul characters on a distant shop sign. ${STYLE}`,
  },
  {
    slug: 'google-ads-korean-business',
    prompt: `A modern minimal workspace with dual monitors displaying Google Ads performance dashboard graphs trending upward. Stacked dollar coins and a small Korean-inspired ceramic piece on the desk. Warm rim lighting, editorial tech magazine vibe. ${STYLE}`,
  },
  {
    slug: 'shopify-korean-ecommerce',
    prompt: `An elegant flat-lay of a laptop showing a beautifully designed Korean e-commerce storefront with products laid out. Packaging boxes with minimalist Korean design, scissors, brown paper, twine. Top-down editorial composition, soft natural light. ${STYLE}`,
  },
  {
    slug: 'nj-ny-website-cost-2026',
    prompt: `A clean editorial still-life of a calculator, a receipt with tidy numbers, a fountain pen, and a printed website mockup on a marble desk. Afternoon sunlight streaming in from the side. Muted financial magazine aesthetic. ${STYLE}`,
  },
  {
    slug: 'do-i-need-a-website-korean-business',
    prompt: `A Korean-American small business owner's hands holding a smartphone showing a bustling Instagram feed, with a closed laptop beside it on a wooden cafe table. Steam rising from a coffee cup, ambient bokeh background. Thoughtful, contemplative mood. ${STYLE}`,
  },
  {
    slug: 'website-cost-hidden-fees-usa',
    prompt: `A magnifying glass hovering over a printed invoice on a clean desk, revealing fine print and hidden line items. Stack of papers, a red pen, a cup of black tea. Warm lamp light, investigative editorial feel. ${STYLE}`,
  },
  {
    slug: 'korean-restaurant-website-essentials',
    prompt: `An overhead editorial food photography shot of a Korean restaurant table with bibimbap, kimchi, banchan dishes, chopsticks, and a smartphone showing a restaurant website menu beside the food. Dark moody restaurant lighting, steam rising. ${STYLE}`,
  },
  {
    slug: 'naver-vs-google-korean-business-usa',
    prompt: `Two laptops side by side on a designer's desk — one showing a Google search interface, the other showing Naver. Subtle hands gesturing between them in deliberation. Modern minimalist office, neutral cool lighting, tech editorial aesthetic. ${STYLE}`,
  },
  {
    slug: 'kakaotalk-channel-us-korean-business',
    prompt: `A smartphone on a clean desk displaying a KakaoTalk chat interface with multiple message bubbles visible. A Korean rice cake and a ceramic tea cup on a wooden tray beside it. Warm cozy lighting, soft bokeh. ${STYLE}`,
  },
  {
    slug: 'case-study-korean-nail-salon-seo-10x',
    prompt: `An upscale modern Korean-American nail salon interior with rose gold accents, a tablet on the counter displaying a booking calendar dashboard with rising traffic graphs. Clean white and warm pink palette, soft spa lighting. ${STYLE}`,
  },
  {
    slug: 'bilingual-seo-technical-guide-hreflang',
    prompt: `A developer's dual-monitor setup showing code editor with HTML meta tags and hreflang attributes highlighted on one screen, a browser with a bilingual website on the other. Late night working ambiance, desk lamp glow, keyboard, coffee mug with Korean letters. ${STYLE}`,
  },
  {
    slug: 'wordpress-to-nextjs-korean-business-migration',
    prompt: `An abstract editorial scene showing an old computer on the left fading into a modern sleek laptop on the right, connected by a glowing arc of light representing migration. Clean studio backdrop, tech magazine cover aesthetic, dramatic side lighting. ${STYLE}`,
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
