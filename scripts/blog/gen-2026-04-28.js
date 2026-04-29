#!/usr/bin/env node
/**
 * Hero images for the 5 blog posts published 2026-04-28.
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  {
    slug: 'squarespace-wordpress-shopify-korean-business',
    prompt: `Three sleek modern laptops arranged in a row on a wooden desk, each open showing distinctly different website builder interfaces (clean editorial, content-rich blog, e-commerce store). Soft directional studio light highlighting their differences. Decision-making composition. ${STYLE}`,
  },
  {
    slug: 'korean-grocery-mart-online-presence-guide',
    prompt: `An overhead editorial flat-lay of fresh Korean grocery items — napa cabbage, korean pears, gochugaru in a small bowl, dried seaweed, korean ceramic banchan dishes, with a smartphone showing a sleek Korean grocery store website mockup beside them. Natural soft daylight, clean wooden surface. ${STYLE}`,
  },
  {
    slug: 'website-translation-vs-localization-korean-business',
    prompt: `An editorial close-up of two open notebooks side by side — one with English text, one with Korean hangul writing — both with the same elegant fountain pen resting between them. Warm desk lamp light, slight bokeh. Concept of careful adaptation between languages. ${STYLE}`,
  },
  {
    slug: 'korean-restaurant-online-ordering-platforms-2026',
    prompt: `An overhead editorial restaurant kitchen pass scene — a tablet showing an online ordering dashboard, a printed receipt order ticket beside it, a beautifully plated Korean dish (bibimbap or kimchi jjigae) on a wooden tray ready to serve, kitchen blur in background. Warm restaurant lighting, deep amber tones. ${STYLE}`,
  },
  {
    slug: 'korean-medical-clinic-online-booking-system-guide',
    prompt: `A clean modern Korean medical clinic reception desk with a tablet displaying an elegant booking calendar interface, soft white orchid in a ceramic vase, glass of water, neutral healthcare design palette (soft sage, warm white, brushed brass). Trustworthy clinical aesthetic, soft window light. ${STYLE}`,
  },
];

async function generate(prompt, slug, attempt = 1) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;
  try {
    // Generous timeout — image generation can take 30–90s
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 180_000);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    const data = await res.json();
    if (data.error) {
      console.log(`❌ ${slug}: ${data.error.message}`);
      return false;
    }
    const part = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (!part) {
      console.log(`❌ ${slug}: no image returned`);
      return false;
    }
    const imageBuf = Buffer.from(part.inlineData.data, 'base64');
    const out = path.join(__dirname, '../../public/blog', `${slug}.png`);
    fs.writeFileSync(out, imageBuf);
    console.log(`✅ ${slug}.png  (${(imageBuf.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (e) {
    if (attempt < 3) {
      console.log(`⏳ ${slug} attempt ${attempt} failed (${e.message}), retrying...`);
      await new Promise(r => setTimeout(r, 5000));
      return generate(prompt, slug, attempt + 1);
    }
    console.log(`❌ ${slug}: ${e.message} (gave up after 3 attempts)`);
    return false;
  }
}

(async () => {
  console.log(`🎨 Generating ${IMAGES.length} blog hero images...\n`);
  let ok = 0;
  for (const { slug, prompt } of IMAGES) {
    if (await generate(prompt, slug)) ok++;
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n📊 ${ok}/${IMAGES.length} generated`);
})();
