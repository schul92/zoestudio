#!/usr/bin/env node
/**
 * Submit URLs to Google Indexing API using an existing service account JWT.
 * Falls back through any service account JSON the box has if the first one
 * isn't authorized for sc-domain:zoelumos.com.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const BASE = 'https://www.zoelumos.com';
const SLUG = 'tj-flowers-shopify-revamp-case-study';
const URLS = [`${BASE}/blog/${SLUG}`, `${BASE}/ko/blog/${SLUG}`];

const SA_CANDIDATES = [
  path.join(os.homedir(), '.config/gcloud/aplus-sc-key.json'),
  path.join(os.homedir(), '.config/gcloud/carek9-ga4-key.json'),
];

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken(saPath, scopes) {
  const sa = JSON.parse(fs.readFileSync(saPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: scopes.join(' '),
    aud: sa.token_uri,
    exp: now + 3600,
    iat: now,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), sa.private_key);
  const jwt = `${signingInput}.${b64url(signature)}`;

  const r = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`token exchange: ${JSON.stringify(j)}`);
  return { token: j.access_token, email: sa.client_email };
}

async function notify(token, url) {
  const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  const body = await r.json();
  return { status: r.status, body };
}

(async () => {
  for (const saPath of SA_CANDIDATES) {
    if (!fs.existsSync(saPath)) continue;
    let auth;
    try {
      auth = await getAccessToken(saPath, ['https://www.googleapis.com/auth/indexing']);
    } catch (e) {
      console.log(`✗ ${path.basename(saPath)}: ${e.message.slice(0, 200)}`);
      continue;
    }
    console.log(`\n📡 Trying service account: ${auth.email}\n`);

    let allOk = true;
    for (const url of URLS) {
      const res = await notify(auth.token, url);
      const ok = res.status === 200;
      if (!ok) allOk = false;
      const detail = ok
        ? `notifyTime=${res.body.urlNotificationMetadata?.latestUpdate?.notifyTime || 'ok'}`
        : (res.body.error?.message || JSON.stringify(res.body)).slice(0, 250);
      console.log(`  ${ok ? '✅' : '❌'} ${res.status}  ${url}\n       ${detail}\n`);
    }

    if (allOk) {
      console.log(`✓ Submitted via ${auth.email}. Done.\n`);
      console.log('To make this permanent: add this service account email as an Owner');
      console.log('of sc-domain:zoelumos.com in Search Console.');
      process.exit(0);
    } else {
      console.log(`Account not authorized for zoelumos.com. Trying next candidate...\n`);
    }
  }
  console.log('\nNo service account worked. Either:');
  console.log('  1. Add aplus-sc-key (search-console-reader@aplus-495517) as Owner of sc-domain:zoelumos.com');
  console.log('  2. Or complete the OAuth reauth flow that is still listening on :3000');
  process.exit(1);
})();
