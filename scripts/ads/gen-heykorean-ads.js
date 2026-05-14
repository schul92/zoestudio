#!/usr/bin/env node
/**
 * Generate HeyKorean display-ad images via Gemini 3.1 Flash Image Preview.
 * Produces 2 PC square (1:1) + 2 mobile banner (4:1) variants.
 * Outputs to public/ads/.
 */
const fs = require('fs');
const path = require('path');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) { console.error('Set GEMINI_API_KEY'); process.exit(1); }
const MODEL = 'gemini-3.1-flash-image-preview';

const ADS = [
  {
    name: 'pc-square-v1-portfolio',
    prompt: `Premium editorial advertisement image, perfectly square 1:1 ratio composition.
Clean off-white background (#F7F4EF) with generous whitespace.
In the upper-center: a single sleek modern desktop monitor mockup floating with soft realistic shadow.
Inside the desktop screen: a beautifully designed Korean restaurant website hero — warm overhead photography of Korean BBQ banchan spread, large bold serif Korean text "한식당 웹사이트" visible inside the screen.
Below the desktop mockup, sharp typographic headline in two stacked lines, left-aligned and centered horizontally:
  Top line — bold serif Korean (deep navy #0B1A33): "한인 비즈니스 웹사이트 + SEO"
  Bottom line — lighter sans-serif English (gray #555): "Premium bilingual sites that rank on Google"
Bottom-right corner: small clean "ZOE LUMOS" wordmark in deep navy.
Bottom-left corner: tiny tag "NJ · NY · LA" in subtle gray.
Style: high-end design agency portfolio aesthetic, print-magazine feel, no gradients, no glow, no stock-photo people, no fake logos inside the website mockup other than the explicit Korean text.
Korean and English text must be crisp, legible, perfectly spelled and grammatically correct.
Soft natural daylight illuminating the mockup.`,
  },
  {
    name: 'pc-square-v2-typographic',
    prompt: `Premium typographic advertisement image, perfectly square 1:1 ratio composition.
Solid deep navy background (#0B1A33) filling the entire canvas.
Massive bold serif Korean headline filling 65% of the canvas, left-aligned with three stacked lines and tight leading:
"한인 사장님,
구글 1페이지에
오르세요."
Text color: off-white (#F7F4EF).
Below the headline, a thin horizontal gold divider line (#D4A857), 30% canvas width.
Below the divider, smaller English subline in light gray: "Bilingual websites + SEO for Korean-American businesses · NJ · NY · LA"
Bottom-right corner: small clean "ZOE LUMOS" wordmark in gold (#D4A857).
Bottom-left corner: tiny gold text "무료 30분 컨설팅 · zoelumos.com"
A single thin gold accent line breaking through the lower-left corner of the canvas.
No images, no people, no photographs — pure typographic composition.
Font feel: similar to Apple SD Gothic Neo Heavy or Pretendard ExtraBold for Korean.
Premium editorial newspaper aesthetic. Korean must be grammatically perfect.`,
  },
  {
    name: 'mobile-banner-v1-split',
    prompt: `Wide horizontal banner advertisement image, 4:1 ratio aspect, horizontal rectangular composition.
Left 55% of the canvas: solid warm off-white background (#F7F4EF).
On this left side, vertically centered, two stacked bold Korean lines, left-aligned:
  Line 1 (large serif, deep navy #0B1A33): "한인 비즈니스"
  Line 2 (large serif, deep navy): "웹사이트 + SEO"
Beneath them, a tiny English subline in gray: "Bilingual sites that rank on Google"
Right 45% of the canvas: a perspective-tilted modern phone mockup (tilted 8 degrees to the right) showing a Korean beauty salon website inside its screen — warm beige hero, Korean serif headline visible.
Phone has a soft realistic shadow beneath it.
Behind the phone, a single warm peach accent color block (#F1D5B8) breaking out diagonally from the right edge.
Far right edge: tiny vertical "ZOE LUMOS · zoelumos.com" wordmark in deep navy.
Style: editorial agency-grade, no people, no clipart, no gradients, no glow.
Korean and English text must be crisp and grammatically perfect.
Strong 4:1 wide horizontal banner composition, not square.`,
  },
  {
    name: 'mobile-banner-v2-typeonly',
    prompt: `Wide horizontal banner advertisement, 4:1 aspect ratio, horizontal rectangle composition.
Solid deep navy background (#0B1A33) filling the entire canvas.
Centered single-line bold Korean headline in heavy serif, filling 70% of the banner width on a single horizontal line:
"구글에서 한인 손님이 찾는 웹사이트, 만듭니다."
Color: off-white (#F7F4EF). Tight letterspacing. The line must fit on ONE single horizontal line without wrapping.
Below the Korean line, much smaller English subline in gold (#D4A857), centered:
"Bilingual web + SEO for Korean-American businesses · NJ · NY · LA"
Far-left edge: thin vertical gold accent line (#D4A857), full banner height.
Far-right edge: small "ZOE LUMOS" wordmark stacked above tiny "zoelumos.com" text, in gold.
No images, no photos, no decorative noise — pure typographic billboard aesthetic.
Korean text must be grammatically perfect and rendered on a single horizontal line.
Strong wide 4:1 banner composition, definitely not square.`,
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
  if (!res.ok) throw new Error(`${name}: ${body.error?.message || JSON.stringify(body).slice(0, 200)}`);
  const img = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!img) throw new Error(`${name}: no image returned`);
  return Buffer.from(img.inlineData.data, 'base64');
}

(async () => {
  const outDir = path.join(__dirname, '../../public/ads');
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n🎨 Generating ${ADS.length} HeyKorean ad images via ${MODEL}...\n`);
  let ok = 0, fail = 0;
  for (const item of ADS) {
    try {
      const buf = await generate(item.prompt, item.name);
      const out = path.join(outDir, `${item.name}.png`);
      fs.writeFileSync(out, buf);
      console.log(`  ✅ ${item.name}.png (${(buf.length / 1024).toFixed(0)}KB)`);
      ok++;
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message.slice(0, 200)}`);
      fail++;
    }
  }
  console.log(`\n📊 ${ok}/${ADS.length} generated${fail ? `, ${fail} failed` : ''}`);
  console.log(`\nOutput: ${outDir}`);
})();
