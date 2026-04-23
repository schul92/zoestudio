#!/usr/bin/env node
/**
 * Generate an image with Gemini, upload it publicly, post to GBP with media.
 * Usage: GEMINI_API_KEY=... node scripts/gbp/generate-and-post.js <accountId> <locationId>
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
);

const [accountId, locationId] = process.argv.slice(2);
if (!accountId || !locationId) {
  console.error('Usage: node scripts/gbp/generate-and-post.js <accountId> <locationId>');
  process.exit(1);
}

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error('Set GEMINI_API_KEY env var');
  process.exit(1);
}

const IMAGE_PROMPT = `A bold, modern marketing hero image for a Korean-American web design studio in New Jersey called "Zoe Lumos".
Style: editorial, clean, confident, premium — like a high-end SaaS landing page hero.
Scene: a sleek laptop on a minimalist desk with a glowing website mockup on screen showing a beautiful modern business website. Warm soft rim-lighting in teal and magenta. Subtle Korean typography elements in the background. Bergen County NJ skyline silhouette faintly visible through a window.
Mood: aspirational, trustworthy, design-forward. No text overlays. No logos. Square 1:1 composition. Photorealistic.`;

const POST_SUMMARY =
  "Need a website that actually brings in customers? Zoe Lumos builds fast, beautiful, SEO-optimized sites for NJ small businesses — Korean-American owned, Bergen County based. From first click to first booking. Let's talk. 🌐";

// nano-banana 2 = gemini-3.1-flash-image-preview
const IMAGE_MODELS = [
  'gemini-3.1-flash-image-preview',
  'gemini-3-flash-image-preview',
  'gemini-2.5-flash-image-preview',
];

async function generateImage() {
  for (const model of IMAGE_MODELS) {
    console.log(`\n🎨 Trying ${model}...`);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: IMAGE_PROMPT }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    });
    const body = await res.json();
    if (!res.ok) {
      console.error(`  ❌ ${model}:`, body.error?.message || JSON.stringify(body).slice(0, 200));
      continue;
    }
    const parts = body.candidates?.[0]?.content?.parts || [];
    const img = parts.find((p) => p.inlineData);
    if (!img) {
      console.error(`  ❌ ${model}: no image in response`);
      continue;
    }
    console.log(`  ✅ Image generated with ${model}`);
    return Buffer.from(img.inlineData.data, 'base64');
  }
  throw new Error('All image models failed');
}

async function uploadPublic(buffer, filename) {
  const tmpPath = path.join('/tmp', filename);
  fs.writeFileSync(tmpPath, buffer);
  console.log('\n📤 Uploading to catbox.moe...');
  const url = execSync(
    `curl -s -F "reqtype=fileupload" -F "fileToUpload=@${tmpPath}" https://catbox.moe/user/api.php`
  )
    .toString()
    .trim();
  if (!url.startsWith('http')) throw new Error(`Upload failed: ${url}`);
  console.log('  ✅ Public URL:', url);
  return url;
}

async function getAccessToken() {
  const res = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j));
  return j.access_token;
}

async function postToGBP(imageUrl) {
  const token = await getAccessToken();
  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;
  const payload = {
    languageCode: 'en-US',
    summary: POST_SUMMARY,
    callToAction: { actionType: 'LEARN_MORE', url: 'https://zoelumos.com' },
    media: [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }],
    topicType: 'STANDARD',
  };
  console.log('\n📮 Posting to GBP...');
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  if (!res.ok) {
    console.error('❌ Post failed:', res.status, JSON.stringify(body, null, 2));
    process.exit(1);
  }
  console.log('\n✅ Posted!');
  console.log('  searchUrl:', body.searchUrl);
  console.log('  name:', body.name);
}

async function main() {
  const imgBuf = await generateImage();
  const localPath = path.join(
    __dirname,
    '../../renders',
    `gbp-${Date.now()}.png`
  );
  fs.mkdirSync(path.dirname(localPath), { recursive: true });
  fs.writeFileSync(localPath, imgBuf);
  console.log('  💾 Saved locally:', localPath);

  const publicUrl = await uploadPublic(imgBuf, `zoe-gbp-${Date.now()}.png`);
  await postToGBP(publicUrl);
}

main().catch((e) => {
  console.error('\n💥', e.message);
  process.exit(1);
});
