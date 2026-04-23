#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
);
const GEMINI_KEY = process.env.GEMINI_API_KEY;

const ACCOUNT = '106619474785848933266';
const LOCATION = '15235250653762799567';

const IMAGE_PROMPT = `Editorial photograph of a modern creative studio office in Bergen County, New Jersey. A designer's desk with dual monitors displaying a beautiful, fast-loading small business website mockup. Golden hour sunlight through floor-to-ceiling windows revealing the George Washington Bridge and Manhattan skyline in the distance. Minimalist desk with Korean ceramic coffee cup, plants, and a leather notebook. Teal and warm amber lighting accents. Premium SaaS brand aesthetic, photorealistic, cinematic, shallow depth of field, 1:1 square composition, no text overlays.`;

// SEO-optimized — targets actual GSC ranking opportunities
const POST_SUMMARY =
  "Web design in Bergen County NJ — built to rank. Zoe Lumos creates fast, SEO-optimized websites for small businesses in Fort Lee, Englewood, North Bergen & Teaneck. Korean-American owned studio. Web design, website development, and local SEO under one roof. Free audit — see where you rank today.";

const POST = {
  languageCode: 'en-US',
  summary: POST_SUMMARY,
  callToAction: { actionType: 'LEARN_MORE', url: 'https://zoelumos.com' },
  topicType: 'STANDARD',
};

async function genImage() {
  const models = ['gemini-3.1-flash-image-preview', 'gemini-2.5-flash-image-preview'];
  for (const model of models) {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: IMAGE_PROMPT }] }],
          generationConfig: { responseModalities: ['IMAGE'] },
        }),
      }
    );
    const j = await r.json();
    const img = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (img) {
      console.log(`✅ Image via ${model}`);
      return Buffer.from(img.inlineData.data, 'base64');
    }
    console.error(`❌ ${model}:`, j.error?.message);
  }
  throw new Error('Image generation failed');
}

async function uploadTmp(buf) {
  const p = `/tmp/gbp-seo-${Date.now()}.png`;
  fs.writeFileSync(p, buf);
  const out = execSync(`curl -s -F "file=@${p}" https://tmpfiles.org/api/v1/upload`).toString();
  const j = JSON.parse(out);
  return j.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
}

async function getToken() {
  const r = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  return (await r.json()).access_token;
}

(async () => {
  const buf = await genImage();
  const savePath = path.join(__dirname, '../../renders', `gbp-seo-${Date.now()}.png`);
  fs.writeFileSync(savePath, buf);
  console.log('💾 Saved:', savePath);

  const imageUrl = await uploadTmp(buf);
  console.log('🌐 Public:', imageUrl);

  const token = await getToken();
  const payload = { ...POST, media: [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }] };

  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT}/locations/${LOCATION}/localPosts`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  const body = await res.json();
  console.log('Status:', res.status);
  console.log(JSON.stringify(body, null, 2));
})();
