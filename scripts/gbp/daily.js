#!/usr/bin/env node
/**
 * Daily GBP post — picks today's variant from posts.json, generates image, posts.
 * Run via launchd/cron. Requires GEMINI_API_KEY env var.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));

const ACCOUNT = '106619474785848933266';
const LOCATION = '15235250653762799567';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) throw new Error('Set GEMINI_API_KEY');

// Day-of-year rotation — cycles through pool deterministically
const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const post = posts[doy % posts.length];

const LOG_DIR = path.join(ROOT, '.config/gbp-log');
fs.mkdirSync(LOG_DIR, { recursive: true });
const logPath = path.join(LOG_DIR, `${new Date().toISOString().slice(0, 10)}.json`);
const log = (obj) => fs.appendFileSync(logPath, JSON.stringify(obj) + '\n');

async function generateImage() {
  const models = [
    'gemini-3.1-flash-image-preview',
    'gemini-3-flash-image-preview',
    'gemini-2.5-flash-image-preview',
  ];
  for (const model of models) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: post.imagePrompt }] }],
          generationConfig: { responseModalities: ['IMAGE'] },
        }),
      }
    );
    const b = await res.json();
    const img = b.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (img) {
      log({ step: 'image', model, ok: true });
      return Buffer.from(img.inlineData.data, 'base64');
    }
    log({ step: 'image', model, err: b.error?.message });
  }
  throw new Error('All image models failed');
}

async function uploadPublic(buf) {
  const tmp = `/tmp/gbp-${Date.now()}.png`;
  fs.writeFileSync(tmp, buf);

  // Try multiple hosts in order
  const hosts = [
    () => {
      const out = execSync(
        `curl -s -F "file=@${tmp}" https://tmpfiles.org/api/v1/upload`
      ).toString();
      const j = JSON.parse(out);
      if (j.status !== 'success') throw new Error(out);
      return j.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    },
    () => {
      const out = execSync(
        `curl -s -F "reqtype=fileupload" -F "fileToUpload=@${tmp}" https://catbox.moe/user/api.php`
      ).toString().trim();
      if (!out.startsWith('http')) throw new Error(out);
      return out;
    },
    () => {
      const out = execSync(`curl -s -F "file=@${tmp}" -F "expires=72" https://0x0.st`).toString().trim();
      if (!out.startsWith('http')) throw new Error(out);
      return out;
    },
  ];
  for (const fn of hosts) {
    try {
      const url = fn();
      log({ step: 'upload', url });
      return url;
    } catch (e) {
      log({ step: 'upload', err: e.message });
    }
  }
  throw new Error('All upload hosts failed');
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

(async () => {
  log({ step: 'start', doy, variantIdx: doy % posts.length, lang: post.lang });
  const buf = await generateImage();
  fs.writeFileSync(path.join(ROOT, 'renders', `gbp-${Date.now()}.png`), buf);
  const imageUrl = await uploadPublic(buf);
  const token = await getAccessToken();

  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT}/locations/${LOCATION}/localPosts`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        languageCode: post.lang === 'ko' ? 'ko' : 'en-US',
        summary: post.summary,
        callToAction: post.cta,
        media: [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }],
        topicType: 'STANDARD',
      }),
    }
  );
  const body = await res.json();
  log({ step: 'post', status: res.status, name: body.name, err: body.error });
  console.log(res.ok ? '✅ Posted' : '❌ Failed', body.name || body.error?.message);
  if (!res.ok) process.exit(1);
})().catch((e) => {
  log({ step: 'fatal', err: e.message });
  console.error(e);
  process.exit(1);
});
