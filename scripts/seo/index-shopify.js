const fs = require('fs');
const path = require('path');
const CREDS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8'));

(async () => {
  const tr = await fetch(CREDS.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CREDS.client_id, client_secret: CREDS.client_secret,
      refresh_token: tokens.refresh_token, grant_type: 'refresh_token',
    }),
  });
  const token = (await tr.json()).access_token;
  const urls = [
    'https://www.zoelumos.com/blog/shopify-korean-ecommerce',
    'https://www.zoelumos.com/ko/blog/shopify-korean-ecommerce',
    'https://www.zoelumos.com/blog',
    'https://www.zoelumos.com/ko/blog',
  ];
  for (const url of urls) {
    const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    console.log(`${r.ok ? '✅' : '❌'} ${url}`);
  }
})();
