#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3.1-flash-image-preview';
const STYLE = 'Editorial magazine photography, premium brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition, muted warm professional colors, no text or typography, no logos, horizontal 16:9 composition.';
const IMGS = [
  { slug: 'local-seo-guide-korean-business-2026', prompt: `A smartphone showing Google Maps with multiple business pins and a search bar. Placed on a clean desk with a notebook and coffee. Warm morning light, editorial tech style. ${STYLE}` },
  { slug: 'bilingual-seo-new-york-korean-business', prompt: `Manhattan skyline at golden hour seen through a modern office window, with a laptop on a desk showing a bilingual website. Korean and English text visible on screen. ${STYLE}` },
  { slug: 'google-business-profile-korean-business-optimization', prompt: `A tablet on a marble counter displaying a Google Business Profile listing with star ratings, photos, and a map. Small business storefront visible through glass behind. ${STYLE}` },
  { slug: 'affordable-seo-new-jersey-korean-business', prompt: `A small business owner's hands using a laptop showing an SEO analytics dashboard with upward-trending graphs. Simple home office, warm desk lamp, budget-friendly feeling. ${STYLE}` },
  { slug: 'instagram-vs-website-korean-business', prompt: `Split composition: left side shows a smartphone with Instagram feed, right side shows a laptop with a professional business website. Both on a clean desk, connected by a soft light arc. ${STYLE}` },
];
async function gen(prompt) {
  for (let i = 1; i <= 3; i++) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } }),
      });
      const b = await r.json();
      const img = b.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (img) return Buffer.from(img.inlineData.data, 'base64');
      throw new Error(b.error?.message || 'no image');
    } catch (e) { if (i === 3) throw e; await new Promise(r => setTimeout(r, 2000)); }
  }
}
(async () => {
  const out = path.join(__dirname, '../../public/blog');
  for (const { slug, prompt } of IMGS) {
    try { const buf = await gen(prompt); fs.writeFileSync(path.join(out, `${slug}.png`), buf); console.log(`✅ ${slug}.png`); }
    catch (e) { console.log(`❌ ${slug}: ${e.message?.slice(0, 80)}`); }
  }
})();
