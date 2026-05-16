#!/usr/bin/env node
/**
 * Generates hero images for the 18 blog posts missing them.
 * Uses Gemini 3.1 Flash Image Preview with retry+backoff.
 * Outputs to public/blog/<slug>.png
 *
 * Run: GEMINI_API_KEY=xxx node scripts/blog/gen-missing-may2026.js
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';

// Shared style — keeps all blog images visually cohesive with prior batch
const STYLE = `Editorial magazine photography, premium SaaS brand aesthetic, cinematic, photorealistic, natural soft lighting, shallow depth of field, clean minimalist composition with negative space, muted professional color palette (warm amber, soft teal, creamy whites, subtle rose), no text or typography in the image, no logos, no watermarks, horizontal 16:9 composition.`;

const IMAGES = [
  // 2026-05-11 batch
  {
    slug: 'kakaotalk-channel-automation-korean-restaurants',
    prompt: `Editorial overhead shot of a Korean restaurant\'s host stand at dusk — a smartphone displaying a KakaoTalk chat thread visible on the surface, a leather-bound reservation book partially open beside it, a brass bell, and warm pendant lights casting soft shadows. Steam from a small ceramic teacup. Mood — quiet automated workflow during a busy night. ${STYLE}`,
  },
  {
    slug: 'doordash-vs-ubereats-vs-own-app-korean-restaurant',
    prompt: `An editorial top-down composition of three smartphones laid out side by side on a dark wooden Korean restaurant table — one displaying a delivery app interface, another showing a different delivery app, the third showing a restaurant\'s own clean branded ordering page. Subtle Korean banchan dishes blurred in the background. ${STYLE}`,
  },
  {
    slug: 'korean-restaurant-marketing-annandale-va',
    prompt: `Atmospheric exterior shot of a Korean restaurant storefront in Annandale Virginia at golden hour — warm interior lighting visible through large glass windows, hangul signage subtly readable, a few diners visible inside, suburban Virginia street context. Editorial documentary photography mood. ${STYLE}`,
  },
  {
    slug: 'ai-search-korean-business-owner-survival-guide-2026',
    prompt: `An editorial workspace scene — a laptop showing an AI search results interface with citations, a Korean ceramic coffee cup steaming, a leather notebook with handwritten notes, and a small Korean traditional brass bell. Late evening lamp light, contemplative mood, tech magazine aesthetic. ${STYLE}`,
  },
  // 2026-05-12 batch (6 posts)
  {
    slug: 'kakaotalk-advertising-agency-usa-guide-2026',
    prompt: `An editorial close-up of a meeting table with two phones lying flat — one open to a KakaoTalk Channel marketing dashboard, the other showing audience analytics. A ceramic cup of black tea, a fountain pen, a single rose. Soft natural daylight from a side window, agency consulting aesthetic. ${STYLE}`,
  },
  {
    slug: 'korean-salon-spa-local-seo-new-jersey-2026',
    prompt: `Editorial interior shot of a luxurious Korean nail spa in New Jersey — rose gold accents, soft pink and cream palette, a tablet on the reception counter displaying a Google Maps interface with map pins, fresh white peonies in a ceramic vase. Soft spa lighting, premium hospitality aesthetic. ${STYLE}`,
  },
  {
    slug: 'google-ai-overviews-korean-business-citation-2026',
    prompt: `An editorial close-up of a laptop screen showing a Google search results page with an AI Overview block at the top, citation icons subtly visible. Surrounded by a Korean ceramic teacup, a small succulent, and a leather notepad. Modern minimal office, soft daylight, tech-editorial mood. ${STYLE}`,
  },
  {
    slug: 'google-business-profile-multi-location-korean-franchise-2026',
    prompt: `An editorial flat-lay of a designer\'s desk with a printed map showing multiple location pins highlighted, several Polaroid-style photos of different Korean restaurant storefronts laid out around it, a fountain pen, a ceramic coffee cup. Top-down composition, organized franchise planning mood. ${STYLE}`,
  },
  {
    slug: 'yelp-optimization-korean-restaurant-no-ads-2026',
    prompt: `An editorial close-up of a Korean restaurant\'s phone displaying a Yelp business profile page, propped against a small ceramic kimchi bowl on a dark wooden counter. Soft warm Edison bulb lighting from above, intimate restaurant ambient mood. ${STYLE}`,
  },
  {
    slug: 'korean-bakery-cafe-website-essentials-2026',
    prompt: `An editorial overhead shot of a Korean bakery counter with a row of beautifully arranged Korean breads and pastries (단팥빵, 슈크림빵, milk bread) under warm display lighting. A tablet on the counter showing a website menu, a small handwritten "오늘의 베이커리" tent card. Cozy bakery morning mood. ${STYLE}`,
  },
  {
    slug: 'korean-food-truck-catering-website-guide-2026',
    prompt: `Editorial exterior shot of a Korean food truck parked on a city street at lunchtime — a small line of office workers in front, hangul signage on the truck side visible but blurred, warm steam from cooking, a small chalkboard menu. Documentary street food photography. ${STYLE}`,
  },
  // 2026-05-13 batch (5 AI posts + 2 case studies)
  {
    slug: 'chatgpt-for-korean-restaurant-owners-2026',
    prompt: `An editorial workspace of a Korean restaurant owner — a laptop open to a ChatGPT conversation with Korean text visible on screen (no readable letters), a leather menu folder beside it, a half-finished cup of Korean barley tea, a small ceramic dish of kimchi. Late evening office light, contemplative entrepreneur mood. ${STYLE}`,
  },
  {
    slug: 'ai-bilingual-customer-service-korean-business-2026',
    prompt: `An editorial close-up of a smartphone propped against a Korean ceramic vase, the screen showing a chat conversation interface with messages in both Korean and English. A small succulent, a fountain pen, and a leather notebook on a marble desk. Soft daylight, modern customer experience aesthetic. ${STYLE}`,
  },
  {
    slug: 'ai-photography-korean-small-business-2026',
    prompt: `An editorial flat-lay of a designer\'s desk with a laptop displaying a grid of AI-generated images on screen, a vintage film camera placed beside it, a Korean ceramic cup, a tripod corner visible. Top-down photography studio aesthetic, creative tools meeting AI tools. ${STYLE}`,
  },
  {
    slug: 'ai-google-review-response-korean-business-2026',
    prompt: `An editorial close-up of a laptop showing a Google review interface with star ratings, a phone beside it with an AI assistant chat open, a Korean ceramic teacup, a stack of business cards. Soft warm desk light, customer service workflow mood. ${STYLE}`,
  },
  {
    slug: 'ai-consulting-korean-small-business-decision-guide-2026',
    prompt: `An editorial scene of a clean modern conference room — two chairs facing each other across a small table with a tablet displaying a decision flowchart, a Korean ceramic tea set on the side, large windows with soft natural light. Consulting meeting mood, professional but warm. ${STYLE}`,
  },
  {
    slug: 'case-study-salt-and-polish-fort-lee-spa-rebuild-2026',
    prompt: `An editorial interior shot of an elegant Korean-American spa reception area in Fort Lee NJ — sage green walls, warm cream tones, a single 한지 paper lampshade hanging, a tablet on the counter showing an online booking widget, fresh white tulips in a ceramic vase, soft afternoon light streaming in. Premium spa hospitality aesthetic. ${STYLE}`,
  },
  {
    slug: 'case-study-korean-restaurant-palisades-park-bookings-3x-2026',
    prompt: `An editorial interior shot of a Korean BBQ restaurant in Palisades Park during dinner service — warm Edison bulb lighting over wooden tables, a host stand in foreground with a tablet showing a reservation dashboard, diners blurred in background, soft steam rising from a grill. Intimate Korean restaurant atmosphere. ${STYLE}`,
  },
];

async function generate(prompt, slug, attempt = 1) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    });
    const body = await res.json();
    if (!res.ok) {
      if (attempt < 4 && /high demand|UNAVAILABLE|503|500|429/.test(body.error?.message || String(res.status))) {
        const wait = 20000 * attempt;
        console.log(`     ${slug}: retry ${attempt + 1}/4 after ${wait / 1000}s…`);
        await new Promise(r => setTimeout(r, wait));
        return generate(prompt, slug, attempt + 1);
      }
      throw new Error(`${body.error?.message || JSON.stringify(body).slice(0, 200)}`);
    }
    const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!img) throw new Error('no image returned');
    return Buffer.from(img.inlineData.data, 'base64');
  } catch (e) {
    if (attempt < 4 && /fetch failed|ETIMEDOUT|ECONNRESET/.test(e.message)) {
      console.log(`     ${slug}: network retry ${attempt + 1}/4…`);
      await new Promise(r => setTimeout(r, 15000 * attempt));
      return generate(prompt, slug, attempt + 1);
    }
    throw e;
  }
}

(async () => {
  const outDir = path.join(__dirname, '../../public/blog');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n🎨 Generating ${IMAGES.length} blog hero images in PARALLEL via ${MODEL}...\n`);

  const startTime = Date.now();
  const results = await Promise.all(
    IMAGES.map(async (item) => {
      const outPath = path.join(outDir, `${item.slug}.png`);
      if (fs.existsSync(outPath)) {
        console.log(`  ⏭  ${item.slug}.png (exists, skip)`);
        return { ok: true, slug: item.slug, skipped: true };
      }
      try {
        const buf = await generate(item.prompt, item.slug);
        fs.writeFileSync(outPath, buf);
        console.log(`  ✅ ${item.slug}.png (${(buf.length / 1024).toFixed(0)}KB)`);
        return { ok: true, slug: item.slug };
      } catch (e) {
        console.log(`  ❌ ${item.slug}: ${e.message.slice(0, 200)}`);
        return { ok: false, slug: item.slug, err: e.message };
      }
    })
  );
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`\n📊 ${ok}/${IMAGES.length} generated${fail ? `, ${fail} failed` : ''} in ${elapsed}s`);
  if (fail > 0) {
    console.log('\nFailed slugs (re-run script to retry):');
    results.filter((r) => !r.ok).forEach((r) => console.log(`  - ${r.slug}`));
  }
})();
