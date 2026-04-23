#!/usr/bin/env node
/**
 * Posts a local "Update" post to your GBP location.
 * Usage: node scripts/gbp/post.js <accountId> <locationId>
 * Example: node scripts/gbp/post.js 123456789 987654321
 *
 * Uses legacy GBP v4 API (the only way to create posts).
 */
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
);

const [accountId, locationId] = process.argv.slice(2);
if (!accountId || !locationId) {
  console.error('Usage: node scripts/gbp/post.js <accountId> <locationId>');
  process.exit(1);
}

// Edit this payload before running.
const POST = {
  languageCode: 'en-US',
  summary:
    "Need a website that actually brings in customers? Zoe Studio builds fast, beautiful, SEO-optimized sites for NJ small businesses — from $0 down. Based in Bergen County, serving Korean-American entrepreneurs across the tri-state. Let's chat.",
  callToAction: {
    actionType: 'LEARN_MORE',
    url: 'https://zoelumos.com',
  },
  topicType: 'STANDARD',
};

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

async function main() {
  const token = await getAccessToken();
  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;

  console.log('\n📤 Posting to GBP...');
  console.log('URL:', url);
  console.log('Payload:', JSON.stringify(POST, null, 2));

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(POST),
  });

  const body = await res.json();
  if (!res.ok) {
    console.error('\n❌ Failed:', res.status, JSON.stringify(body, null, 2));
    process.exit(1);
  }
  console.log('\n✅ Posted!');
  console.log(JSON.stringify(body, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
