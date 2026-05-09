#!/usr/bin/env node
/**
 * Deep GSC analysis: where are impressions coming from?
 * Buckets pages by type (blog / city / industry / home / other),
 * surfaces top blog posts specifically, and runs a 7d vs 28d trend
 * to see what's accelerating right now.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const CREDS = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/google-oauth.json'), 'utf8')).web;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, '.config/gbp-token.json'), 'utf8'));
const SITE = 'sc-domain:zoelumos.com';

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
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  return r.json();
}

const today = new Date().toISOString().slice(0, 10);
const ago = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

function bucket(url) {
  const u = url.replace('https://zoelumos.com', '').replace('https://www.zoelumos.com', '');
  if (u === '/' || u === '/ko') return 'home';
  if (u.startsWith('/blog/') || u.startsWith('/ko/blog/')) return 'blog';
  if (u.startsWith('/industries')) return 'industry';
  if (u.match(/^\/(en|ko)?\/?(industries|industry)/)) return 'industry';
  if (u.match(/-website($|\/)/) || u.match(/-web-design($|\/)/) || u.match(/-seo($|\/)/) || u.match(/-marketing($|\/)/)) return 'city/SEO';
  if (u.includes('웹사이트') || u.includes('웹디자인')) return 'city/SEO (KO)';
  if (u === '/blog' || u === '/ko/blog') return 'blog-listing';
  if (u.startsWith('/portfolio') || u.startsWith('/ko/portfolio')) return 'portfolio';
  if (u.startsWith('/pricing') || u.startsWith('/ko/pricing')) return 'pricing';
  if (u.startsWith('/about') || u.startsWith('/ko/about')) return 'about';
  if (u.startsWith('/audit')) return 'audit-tool';
  return 'other';
}

(async () => {
  const token = await getToken();

  // 28-day page-level data
  console.log(`\n📊 GSC Deep Analysis: ${ago(28)} → ${today}\n`);

  const pageRes = await query(token, {
    startDate: ago(28), endDate: today, dimensions: ['page'], rowLimit: 200,
  });

  // Bucket by page type
  const buckets = {};
  for (const r of pageRes.rows || []) {
    const b = bucket(r.keys[0]);
    if (!buckets[b]) buckets[b] = { clicks: 0, imp: 0, pages: 0, pageList: [] };
    buckets[b].clicks += r.clicks;
    buckets[b].imp += r.impressions;
    buckets[b].pages += 1;
    buckets[b].pageList.push({ url: r.keys[0], c: r.clicks, i: r.impressions, p: r.position });
  }

  // Sort buckets by impressions
  const sortedBuckets = Object.entries(buckets).sort((a, b) => b[1].imp - a[1].imp);

  console.log('🪣 IMPRESSION SHARE BY PAGE TYPE\n');
  const totalImp = sortedBuckets.reduce((s, [, v]) => s + v.imp, 0);
  for (const [name, b] of sortedBuckets) {
    const pct = ((b.imp / totalImp) * 100).toFixed(1);
    const ctr = b.imp ? ((b.clicks / b.imp) * 100).toFixed(2) : '0.00';
    console.log(`  ${name.padEnd(18)} ${String(b.imp).padStart(5)}i  ${String(b.clicks).padStart(3)}c  CTR ${ctr.padStart(5)}%  (${pct}%)  ${b.pages} pages`);
  }

  // Blog-only deep dive
  const blogPages = pageRes.rows.filter((r) => bucket(r.keys[0]).startsWith('blog')).sort((a, b) => b.impressions - a.impressions);
  console.log('\n📝 BLOG POSTS BY IMPRESSIONS\n');
  for (const r of blogPages.slice(0, 25)) {
    const u = r.keys[0].replace('https://zoelumos.com', '').replace('https://www.zoelumos.com', '');
    const ctr = ((r.ctr || 0) * 100).toFixed(2);
    console.log(`  ${String(r.impressions).padStart(4)}i  ${String(r.clicks).padStart(2)}c  CTR ${ctr.padStart(5)}%  pos ${r.position.toFixed(1).padStart(4)}  ${u}`);
  }

  // City/SEO pages
  const cityPages = pageRes.rows.filter((r) => bucket(r.keys[0]).startsWith('city')).sort((a, b) => b.impressions - a.impressions);
  if (cityPages.length) {
    console.log('\n🏙️  CITY / SEO PAGES BY IMPRESSIONS\n');
    for (const r of cityPages.slice(0, 15)) {
      const u = r.keys[0].replace('https://zoelumos.com', '').replace('https://www.zoelumos.com', '');
      console.log(`  ${String(r.impressions).padStart(4)}i  ${String(r.clicks).padStart(2)}c  pos ${r.position.toFixed(1).padStart(4)}  ${u}`);
    }
  }

  // Last 7 days vs prior 7 days — what is accelerating?
  const last7 = await query(token, { startDate: ago(7), endDate: today, dimensions: ['page'], rowLimit: 50 });
  const prior7 = await query(token, { startDate: ago(14), endDate: ago(8), dimensions: ['page'], rowLimit: 50 });

  const priorMap = new Map((prior7.rows || []).map((r) => [r.keys[0], r]));
  const movers = (last7.rows || [])
    .map((r) => {
      const prev = priorMap.get(r.keys[0]);
      return { url: r.keys[0], curImp: r.impressions, prevImp: prev?.impressions || 0, curClicks: r.clicks, curPos: r.position };
    })
    .filter((m) => m.curImp >= 5)
    .sort((a, b) => (b.curImp - b.prevImp) - (a.curImp - a.prevImp));

  console.log('\n📈 TOP MOVERS (last 7d vs prior 7d, by impression delta)\n');
  for (const m of movers.slice(0, 15)) {
    const delta = m.curImp - m.prevImp;
    const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
    const u = m.url.replace('https://zoelumos.com', '').replace('https://www.zoelumos.com', '');
    console.log(`  ${arrow} ${String(delta).padStart(4)}  ${String(m.curImp).padStart(3)}i  ${String(m.curClicks).padStart(2)}c  pos ${m.curPos.toFixed(1).padStart(4)}  ${u}`);
  }

  // Query intent
  console.log('\n🔍 QUERY INTENT BUCKETS (last 28d)\n');
  const queryRes = await query(token, { startDate: ago(28), endDate: today, dimensions: ['query'], rowLimit: 500 });
  const intent = { kakaotalk: { c: 0, i: 0 }, korean: { c: 0, i: 0 }, seo: { c: 0, i: 0 }, brand: { c: 0, i: 0 }, geo: { c: 0, i: 0 }, other: { c: 0, i: 0 } };
  for (const r of queryRes.rows || []) {
    const q = r.keys[0].toLowerCase();
    let b = 'other';
    if (q.includes('kakao')) b = 'kakaotalk';
    else if (q.includes('zoe lumos') || q === 'lumos' || q.includes('zoe')) b = 'brand';
    else if (q.includes('한') || q.includes('웹') || q.includes('미국') || q.includes('korean')) b = 'korean';
    else if (q.includes('seo') || q.includes('marketing') || q.includes('ads')) b = 'seo';
    else if (q.includes('nj') || q.includes('ny') || q.includes('jersey') || q.includes('lee') || q.includes('manhattan') || q.includes('flushing') || q.includes('atlanta')) b = 'geo';
    intent[b].c += r.clicks;
    intent[b].i += r.impressions;
  }
  for (const [k, v] of Object.entries(intent).sort((a, b) => b[1].i - a[1].i)) {
    if (!v.i) continue;
    const ctr = ((v.c / v.i) * 100).toFixed(2);
    console.log(`  ${k.padEnd(10)} ${String(v.i).padStart(4)}i  ${String(v.c).padStart(2)}c  CTR ${ctr}%`);
  }
})();
