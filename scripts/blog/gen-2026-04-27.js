#!/usr/bin/env node
/**
 * Generate hero images for the 5 new blog posts published 2026-04-27.
 * Saves to public/blog/<slug>.png
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  {
    slug: 'google-ads-vs-meta-ads-korean-business-2026',
    prompt: `A modern dual-monitor workspace with one screen showing a Google search bar and the other showing an Instagram feed split. A Korean ceramic coffee cup, leather notebook, and brass desk lamp warmly lighting the scene. Side-by-side composition representing the choice between two ad platforms. ${STYLE}`,
  },
  {
    slug: 'naver-seo-from-usa-korean-business',
    prompt: `A laptop on a clean desk displaying a green Naver-style search interface, with a small US passport and Korean ceramic teacup beside it. Through a window, a soft New York skyline is barely visible at golden hour. Cross-cultural editorial composition. ${STYLE}`,
  },
  {
    slug: 'korean-cafe-coffee-shop-website-guide',
    prompt: `An overhead editorial shot of a beautifully styled Korean café table — pour-over coffee in a ceramic cup, a slice of injeolmi cake on a wooden board, a phone displaying a minimalist café website mockup, dried flowers, and warm natural light filtering through. Soft K-café aesthetic. ${STYLE}`,
  },
  {
    slug: 'website-redesign-vs-rebuild-korean-business',
    prompt: `An abstract editorial scene showing two laptops side by side — one closed and slightly worn with a small plant on it suggesting age, the other open with a clean modern interface glowing softly. Architectural lines connecting them representing transformation. Warm studio lighting, magazine cover quality. ${STYLE}`,
  },
  {
    slug: 'yelp-ads-vs-google-ads-korean-restaurant',
    prompt: `An elegant editorial restaurant interior shot — a warm wooden table with a tablet showing a Korean BBQ restaurant website on it, set place settings ready for guests, a small ceramic vase of seasonal flowers, soft pendant light from above. Inviting, premium dining magazine vibe. ${STYLE}`,
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
}

(async () => {
  console.log(`🎨 Generating ${IMAGES.length} blog hero images...\n`);
  let ok = 0;
  for (const { slug, prompt } of IMAGES) {
    if (await generate(prompt, slug)) ok++;
    await new Promise(r => setTimeout(r, 1500)); // rate limit cushion
  }
  console.log(`\n📊 ${ok}/${IMAGES.length} generated`);
})();
