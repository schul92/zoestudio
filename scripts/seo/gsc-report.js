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
  const start = new Date(Date.now() - 28 * 86400000).toISOString().slice(0, 10);
  console.log(`\n📊 GSC Report: ${start} → ${end}\n`);

  // Totals
  const totals = await query(token, { startDate: start, endDate: end });
  const t = totals.rows?.[0] || {};
  console.log(`TOTALS: ${t.clicks || 0} clicks, ${t.impressions || 0} impressions, CTR ${((t.ctr || 0) * 100).toFixed(2)}%, pos ${(t.position || 0).toFixed(1)}`);

  // Top queries
  console.log('\n🔍 Top 20 queries:');
  const q = await query(token, { startDate: start, endDate: end, dimensions: ['query'], rowLimit: 20 });
  for (const r of q.rows || []) {
    console.log(`  ${r.clicks}c ${r.impressions}i  pos ${r.position.toFixed(1)}  ${r.keys[0]}`);
  }

  // Top pages
  console.log('\n📄 Top 20 pages:');
  const p = await query(token, { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 20 });
  for (const r of p.rows || []) {
    console.log(`  ${r.clicks}c ${r.impressions}i  pos ${r.position.toFixed(1)}  ${r.keys[0].replace('https://www.zoelumos.com', '')}`);
  }

  // Countries
  console.log('\n🌍 Countries:');
  const c = await query(token, { startDate: start, endDate: end, dimensions: ['country'], rowLimit: 10 });
  for (const r of c.rows || []) {
    console.log(`  ${r.clicks}c ${r.impressions}i  ${r.keys[0]}`);
  }

  // Devices
  console.log('\n📱 Devices:');
  const d = await query(token, { startDate: start, endDate: end, dimensions: ['device'], rowLimit: 10 });
  for (const r of d.rows || []) {
    console.log(`  ${r.clicks}c ${r.impressions}i  CTR ${(r.ctr * 100).toFixed(2)}%  ${r.keys[0]}`);
  }
})();
