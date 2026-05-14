#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const GEMINI_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDW7XO33Fjiybr94nZ6eHnsb9m7kLUn_q0';
const MODEL = 'gemini-3.1-flash-image-preview';

const RETRY = [
  {
    // Regenerate v2 with typo fix
    name: 'pc-square-v2-typographic',
    prompt: `Premium typographic advertisement image, perfectly square 1:1 ratio composition.
Solid deep navy background (#0B1A33) filling the entire canvas.
Massive bold serif Korean headline filling 65% of the canvas, left-aligned with three stacked lines and tight leading:
"한인 사장님,
구글 1페이지에
오르세요."
Text color: off-white (#F7F4EF).
Below the headline, a thin horizontal gold divider line (#D4A857), 30% canvas width.
Below the divider, smaller English subline in light gray reading EXACTLY this text (spell-check carefully): "Bilingual websites + SEO for Korean-American businesses · NJ · NY · LA"
The word businesses must be spelled b-u-s-i-n-e-s-s-e-s.
Bottom-right corner: small clean "ZOE LUMOS" wordmark in gold (#D4A857).
Bottom-left corner: tiny gold text "무료 30분 컨설팅 · zoelumos.com"
A single thin gold accent line breaking through the lower-left corner of the canvas.
No images, no people, no photographs — pure typographic composition.
Font feel: Apple SD Gothic Neo Heavy or Pretendard ExtraBold for Korean.
Premium editorial newspaper aesthetic. All English spelling must be perfect.`,
  },
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
Style: high-end design agency portfolio aesthetic, print-magazine feel, no gradients, no glow, no stock-photo people.
Korean and English text must be crisp, legible, perfectly spelled and grammatically correct.
Soft natural daylight illuminating the mockup.`,
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
All English words must be spelled correctly. Strong wide 4:1 banner composition.`,
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
        console.log(`     ${name}: retry ${attempt + 1}/4 after ${wait/1000}s backoff…`);
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
  for (const item of RETRY) {
    try {
      console.log(`  ⏳ ${item.name}…`);
      const buf = await generate(item.prompt, item.name);
      fs.writeFileSync(path.join(outDir, `${item.name}.png`), buf);
      console.log(`  ✅ ${item.name}.png (${(buf.length / 1024).toFixed(0)}KB)`);
    } catch (e) {
      console.log(`  ❌ ${item.name}: ${e.message.slice(0, 200)}`);
    }
    // small spacing between requests to avoid burst-throttle
    await new Promise(r => setTimeout(r, 5000));
  }
})();
