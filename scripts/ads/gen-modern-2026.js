#!/usr/bin/env node
/**
 * Modern 2026 ad variants for HeyKorean.
 * 6 directions: bento, glassmorphism, asymmetric type, dark gradient,
 * duotone photo, neon Vercel-style.
 */
const fs = require('fs');
const path = require('path');
const GEMINI_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDW7XO33Fjiybr94nZ6eHnsb9m7kLUn_q0';
const MODEL = 'gemini-3.1-flash-image-preview';

const ADS = [
  // ─── PC SQUARE (1:1) — MODERN VARIANTS ──────────────────────────
  {
    name: 'pc-modern-v3-bento',
    prompt: `Premium 2026 advertisement, perfectly square 1:1 composition.
Background: warm off-white (#F7F4EF) with a 4-cell asymmetric bento grid filling 90% of the canvas with 12px rounded corners and 8px gaps between cells.
Cell layout (4 panels):
  Large top-left cell (60% width × 50% height) — soft gradient peach background (#F1D5B8 to #F7F4EF), contains massive bold Korean headline left-aligned: "한인 비즈니스 웹사이트" — text color deep navy (#0B1A33), Pretendard ExtraBold style font.
  Smaller top-right cell (40% width × 50% height) — deep navy (#0B1A33) background, contains in off-white text "SEO + 디자인" on one line and below it "= 손님" — single gold (#D4A857) equals sign and the Korean word for "customers".
  Bottom-left cell (40% width × 50% height) — photo of a beautifully designed Korean restaurant website on a tilted phone, real food photography visible inside the screen, subtle shadow.
  Bottom-right cell (60% width × 50% height) — off-white background, English subline left-aligned in 2 lines: "Premium bilingual sites for Korean-American businesses · NJ · NY · LA", below it small "ZOE LUMOS" wordmark in deep navy on the right edge.
Style: ultra-modern 2026 design agency aesthetic, bento grid like Linear or Vercel marketing, sharp typography, clean color palette of peach + navy + cream + a single gold accent. All Korean and English text spelled perfectly.
NO people, NO clipart, NO emoji, NO fake logos, NO grunge texture, NO gradients except the soft peach in the top-left cell.`,
  },
  {
    name: 'pc-modern-v4-glassmorphism',
    prompt: `Premium 2026 advertisement, perfectly square 1:1 composition.
Background: a soft 3D gradient mesh — peach (#F1D5B8), coral (#FF8B7A), lavender (#C5B9E0), and cream (#F7F4EF) — blending smoothly like a dreamy cloud, soft blurred light leaks, very high quality.
In the dead center of the canvas: a single floating frosted glass card with translucent white fill (50% opacity), soft white inner glow, subtle 1px white border, generous padding, 24px rounded corners, soft drop shadow.
Inside the glass card:
  Top — small uppercase eyebrow text in deep navy (#0B1A33): "FOR KOREAN BUSINESSES"
  Middle (main headline) — bold serif Korean in deep navy on three centered lines: "한인 사장님 / 웹사이트 + SEO / 한 번에." (slashes here mean line breaks)
  Below — English subline in lighter gray: "Bilingual sites that rank on Google."
  Bottom — small gold "ZOE LUMOS · zoelumos.com" wordmark with a thin gold underline.
Style: Apple Vision Pro / 2026 Linear marketing aesthetic. Glassmorphism done tastefully. Soft, dreamy, premium, expensive. NO people, NO product photos, just the gradient mesh and the floating glass card. Korean and English text perfectly spelled.`,
  },
  {
    name: 'pc-modern-v5-asymmetric',
    prompt: `Premium 2026 typographic advertisement, perfectly square 1:1 composition.
Background: clean off-white (#F7F4EF).
A single GIGANTIC Korean serif letterform "한" rendered in deep navy (#0B1A33) takes up 80% of the canvas, positioned slightly off-center (cropped at the top and right edges, breaking the canvas — like a magazine cover). The letterform has soft inner-shadow texture, subtle paper-grain feel.
Layered on top of the giant letterform, in the lower-right quadrant: a small clean white card (10cm × 6cm proportion) with sharp shadow, containing in three lines:
  Top (small eyebrow): "ZOE LUMOS"
  Middle (bold sans-serif Korean): "한인 비즈니스 웹사이트"
  Below (English subline): "Bilingual web + SEO · NJ NY LA"
Single small gold accent dot (#D4A857) before "ZOE LUMOS".
Style: bold experimental Korean editorial design, like a 2026 print magazine cover or a Pentagram / Sagmeister-inspired poster. Confident asymmetry. NO photos, NO people, NO clipart — just one giant Korean character and one clean info card. Korean and English text spelled perfectly.`,
  },
  // ─── MOBILE BANNER (4:1) — MODERN VARIANTS ────────────────────
  {
    name: 'mobile-modern-v3-duotone-photo',
    prompt: `Premium 2026 banner advertisement, exactly 4:1 wide horizontal aspect ratio composition.
Background: a full-bleed photograph of a beautiful modern Korean storefront at golden hour — clean glass storefront, warm interior lighting visible inside, soft urban context, subtle bokeh. Apply a tasteful duotone treatment using deep navy (#0B1A33) and warm peach (#F1D5B8) — like a Spotify Wrapped or Apple Music editorial duotone.
Overlaid on the LEFT 40% of the banner, in massive bold Korean text in cream (#F7F4EF), perfectly readable: two lines —
  Line 1: "한인 비즈니스"
  Line 2: "웹사이트 + SEO"
Beneath the headline, smaller English subline in gold (#D4A857): "Bilingual sites that rank on Google."
On the FAR RIGHT 5% of the banner: thin vertical gold accent line + small "ZOE LUMOS · zoelumos.com" wordmark in cream.
Style: 2026 editorial advertising, premium streaming-service aesthetic, cinematic duotone photography, big confident type, no clutter. Korean and English text spelled perfectly.
True 4:1 wide horizontal banner — definitely not square.`,
  },
  {
    name: 'mobile-modern-v4-neon-vercel',
    prompt: `Premium 2026 banner advertisement, exactly 4:1 wide horizontal aspect ratio composition.
Background: pure black (#0A0A0A) with a single soft cyan-to-magenta gradient blob (#00D4FF blending to #FF4D9D) glowing softly in the lower-left third — like a Vercel or Linear marketing banner. Subtle very-fine noise grain.
Centered horizontally in the canvas, slightly above middle, a single bold sans-serif Korean headline on one line in pure white (#FFFFFF):
"구글에서 1등 하는 한인 웹사이트."
Tight letterspacing, geometric sans-serif feel (like Pretendard Bold).
Below the Korean line, in slightly smaller text in soft cyan (#7DD3FC), a single English line:
"Bilingual web + SEO · Korean-American businesses · NJ NY LA"
Far-right edge: tiny "ZOE LUMOS" wordmark stacked above tiny "zoelumos.com" in white.
Far-left edge: a single small geometric symbol — a thin upward-pointing arrow or chevron in cyan.
Style: 2026 dev-tool / SaaS landing-page aesthetic, like Vercel, Linear, or Resend. Confident, futuristic, tech-editorial. NO photos, NO people, just the dark canvas + gradient glow + clean typography. Korean and English text spelled perfectly.
Strict 4:1 wide horizontal banner composition.`,
  },
  {
    name: 'mobile-modern-v5-bento-bar',
    prompt: `Premium 2026 banner advertisement, exactly 4:1 wide horizontal aspect ratio composition.
Canvas split horizontally into 4 bento cells with 8px gaps between them, each cell with 8px rounded corners:
  Cell 1 (35% width) — warm cream background (#F7F4EF), contains bold Korean headline left-aligned vertically centered in 2 lines: "한인 비즈니스 / 웹사이트 + SEO" (slashes = line breaks), text in deep navy (#0B1A33).
  Cell 2 (20% width) — deep navy background (#0B1A33), contains massive gold (#D4A857) sans-serif text "10X" centered, with tiny cream text below it "impressions".
  Cell 3 (25% width) — peach background (#F1D5B8), contains a small clean illustration of a search bar / browser window with a Korean word inside, line-art style in deep navy.
  Cell 4 (20% width) — deep navy background (#0B1A33), contains cream "ZOE LUMOS" wordmark centered, with tiny gold "zoelumos.com" beneath it.
Style: 2026 bento grid marketing banner, like a Notion or Linear feature row, modern, organized, premium. NO people, NO real photos — clean illustration only.
True wide 4:1 horizontal banner — definitely not square.
Korean and English text spelled perfectly.`,
  },
];

async function generate(prompt, name, attempt = 1) {
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
        console.log(`     ${name}: retry ${attempt + 1}/4 after ${wait/1000}s…`);
        await new Promise(r => setTimeout(r, wait));
        return generate(prompt, name, attempt + 1);
      }
      throw new Error(`${body.error?.message || JSON.stringify(body).slice(0, 200)}`);
    }
    const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!img) throw new Error('no image returned');
    return Buffer.from(img.inlineData.data, 'base64');
  } catch (e) {
    if (attempt < 4 && /fetch failed|ETIMEDOUT|ECONNRESET/.test(e.message)) {
      console.log(`     ${name}: network retry ${attempt + 1}/4…`);
      await new Promise(r => setTimeout(r, 15000 * attempt));
      return generate(prompt, name, attempt + 1);
    }
    throw e;
  }
}

(async () => {
  const outDir = path.join(__dirname, '../../public/ads');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n🎨 Generating ${ADS.length} modern 2026 ad variants...\n`);
  let ok = 0, fail = 0;
  for (const item of ADS) {
    try {
      console.log(`  ⏳ ${item.name}…`);
      const buf = await generate(item.prompt, item.name);
      fs.writeFileSync(path.join(outDir, `${item.name}.png`), buf);
      console.log(`  ✅ ${item.name}.png (${(buf.length / 1024).toFixed(0)}KB)`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message.slice(0, 200)}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 4000));
  }
  console.log(`\n📊 ${ok}/${ADS.length} generated${fail ? `, ${fail} failed` : ''}`);
})();
