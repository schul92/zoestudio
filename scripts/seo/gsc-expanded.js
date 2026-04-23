#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8'));

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

async function query(token, body) {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent('sc-domain:zoelumos.com')}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  return r.json();
}

(async () => {
  const token = await getToken();
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
  console.log(`\n📊 Last 90 days: ${start} → ${end}\n`);

  // ALL queries
  const q = await query(token, { startDate: start, endDate: end, dimensions: ['query'], rowLimit: 250 });
  console.log(`Total unique queries: ${q.rows?.length || 0}\n`);

  // Save to file for reference
  fs.writeFileSync(
    path.join(__dirname, '../../.config/gsc-data/queries-90d.json'),
    JSON.stringify(q.rows || [], null, 2)
  );

  // Separate Korean vs English
  const korean = [];
  const english = [];
  for (const row of q.rows || []) {
    const kw = row.keys[0];
    if (/[\u3131-\uD79D]/.test(kw)) korean.push(row);
    else english.push(row);
  }

  console.log(`🇰🇷 KOREAN queries (${korean.length}):`);
  for (const r of korean) {
    console.log(`  ${r.clicks}c ${r.impressions}i  pos ${r.position.toFixed(1)}  ${r.keys[0]}`);
  }

  console.log(`\n🇺🇸 ENGLISH queries (${english.length}):`);
  for (const r of english.slice(0, 50)) {
    console.log(`  ${r.clicks}c ${r.impressions}i  pos ${r.position.toFixed(1)}  ${r.keys[0]}`);
  }
})();
