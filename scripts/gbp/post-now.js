#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')
).web;
const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8')
);

const IMAGE_URL = 'https://tmpfiles.org/dl/33650069/gbp-1776215017174.png';
const ACCOUNT = '106619474785848933266';
const LOCATION = '15235250653762799567';

const POST = {
  languageCode: 'en-US',
  summary:
    "Need a website that actually brings in customers? Zoe Lumos builds fast, beautiful, SEO-optimized sites for NJ small businesses — Korean-American owned, Bergen County based. From first click to first booking. Let's talk.",
  callToAction: { actionType: 'LEARN_MORE', url: 'https://zoelumos.com' },
  media: [{ mediaFormat: 'PHOTO', sourceUrl: IMAGE_URL }],
  topicType: 'STANDARD',
};

(async () => {
  const tRes = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id,
      client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const { access_token } = await tRes.json();

  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT}/locations/${LOCATION}/localPosts`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(POST),
    }
  );
  const body = await res.json();
  console.log('Status:', res.status);
  console.log(JSON.stringify(body, null, 2));
})();
