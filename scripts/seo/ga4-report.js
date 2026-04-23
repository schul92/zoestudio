#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CREDS = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.config/gbp-token.json'), 'utf8'));
const PROP = '500538997';

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

async function run(token, body) {
  const r = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROP}:runReport`,
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
  const range = { startDate: '28daysAgo', endDate: 'today' };
  console.log('\n📊 GA4 Report (last 28 days)\n');

  // Totals
  const t = await run(token, {
    dateRanges: [range],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
  });
  const m = t.rows?.[0]?.metricValues || [];
  console.log(`TOTALS: ${m[0]?.value} users, ${m[1]?.value} sessions, ${m[2]?.value} pageviews, engagement ${(parseFloat(m[3]?.value) * 100).toFixed(1)}%, avg session ${Math.round(parseFloat(m[4]?.value))}s`);

  // Top pages
  console.log('\n📄 Top 15 pages:');
  const p = await run(token, {
    dateRanges: [range],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 15,
  });
  for (const r of p.rows || []) {
    console.log(`  ${r.metricValues[0].value}v ${r.metricValues[1].value}u  ${r.dimensionValues[0].value}`);
  }

  // Traffic sources
  console.log('\n🌐 Traffic sources:');
  const s = await run(token, {
    dateRanges: [range],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
  for (const r of s.rows || []) {
    console.log(`  ${r.metricValues[0].value}s ${r.metricValues[1].value}u  ${r.dimensionValues[0].value}`);
  }

  // Devices
  console.log('\n📱 Devices:');
  const d = await run(token, {
    dateRanges: [range],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
  });
  for (const r of d.rows || []) {
    console.log(`  ${r.metricValues[0].value}s ${r.metricValues[1].value}u  ${r.dimensionValues[0].value}`);
  }

  // Countries
  console.log('\n🌍 Countries (top 10):');
  const c = await run(token, {
    dateRanges: [range],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 10,
  });
  for (const r of c.rows || []) {
    console.log(`  ${r.metricValues[0].value}u  ${r.dimensionValues[0].value}`);
  }
})();
