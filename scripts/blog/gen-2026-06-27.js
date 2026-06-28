#!/usr/bin/env node
/**
 * Hero images for the 2026-06-27 "why owners fire their web agency" pain batch (10 posts).
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
    slug: 'web-designer-ghosted-take-back-website-2026',
    prompt: `An empty modern ergonomic office chair turned slightly away in a quiet dim workspace, a silent smartphone lying face-up on a wooden desk with a blank screen and no notifications, cold pale morning light falling through half-closed blinds, a faint sense of absence and abandonment, a single cold cup of coffee. ${STYLE}`,
  },
  {
    slug: 'do-you-own-your-website-domain-hostage-2026',
    prompt: `A small brass padlock resting closed on top of a sleek laptop keyboard with a softly glowing screen, a single house key and a minimalist keychain just out of reach behind frosted glass, warm but slightly tense lighting, concept of being locked out of something you should own. ${STYLE}`,
  },
  {
    slug: 'website-maintenance-fee-what-it-covers-2026',
    prompt: `A clean minimal desk with a printed monthly invoice, a magnifying glass hovering over the fine print, a small potted plant and a Korean ceramic coffee cup beside it, warm amber morning light, the quiet act of scrutinizing what you are actually paying for. ${STYLE}`,
  },
  {
    slug: 'website-no-traffic-not-showing-google-2026',
    prompt: `A beautiful warmly lit boutique storefront window glowing at dusk on a completely empty quiet sidewalk with no passersby, the inviting interior light contrasting with the deserted street, a lovely shop that nobody is visiting, cinematic lonely mood. ${STYLE}`,
  },
  {
    slug: 'google-ads-agency-wasting-budget-signs-2026',
    prompt: `A smartphone on a desk showing a steeply rising click-activity line graph, but beside it an empty paper shopping bag tipped over and a few scattered coins rolling toward the edge of the table, warm amber light, the unsettling gap between spend and real results. ${STYLE}`,
  },
  {
    slug: 'small-business-marketing-dashboard-flying-blind-2026',
    prompt: `A calm tidy desk at early dawn, a single monitor displaying a clean simple analytics dashboard with gently rising charts, a fresh cup of coffee with rising steam, soft teal and amber Monday-morning light, a feeling of clarity and control after confusion. ${STYLE}`,
  },
  {
    slug: 'toast-clover-pos-analytics-goldmine-2026',
    prompt: `A modern restaurant front counter at warm dinner service, a glowing POS payment tablet on a stand with a small stack of receipts, beside it a slim laptop showing a simple upward sales chart, Korean restaurant ambiance softly blurred in the background, inviting amber light. ${STYLE}`,
  },
  {
    slug: 'outdated-slow-website-losing-customers-2026',
    prompt: `Two smartphones lying side by side on a warm wooden table, the left one sleek and crisp with a clean modern interface, the right one older and dim showing a loading spinner mid-load, a clear visual contrast between fast-fresh and slow-dated, soft studio light, shallow focus. ${STYLE}`,
  },
  {
    slug: 'korean-business-web-vendor-red-flags-2026',
    prompt: `A Korean-American small business owner's desk with a printed service contract and a pen, faint hangul document text softly out of focus, a single small red stamp resting on the paper as a quiet warning accent, cautionary but professional mood, warm office light. ${STYLE}`,
  },
  {
    slug: 'ai-tools-korean-small-business-catch-up-2026',
    prompt: `A relaxed small business owner at a tidy shop counter using a tablet that shows a friendly abstract glowing assistant interface, a few green plants and a Korean ceramic mug nearby, warm approachable inviting light, the feeling that modern AI is accessible and not intimidating. ${STYLE}`,
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
