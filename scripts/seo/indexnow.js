#!/usr/bin/env node
/**
 * Submit URLs to IndexNow — Bing, Yandex, Naver, Seznam all consume this protocol.
 * No OAuth needed. The key file at /e0a469877ff0c7c06436ab1285d726f4.txt verifies ownership.
 *
 * Usage: node scripts/seo/indexnow.js <url1> <url2> ...
 *        (no args = submits the TJ Flowers case study EN + KO)
 */
const HOST = 'www.zoelumos.com';
const KEY = 'e0a469877ff0c7c06436ab1285d726f4';
const KEY_LOC = `https://${HOST}/${KEY}.txt`;

const ENDPOINTS = [
  { name: 'IndexNow (Bing/Yandex/Seznam)', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Bing direct', url: 'https://www.bing.com/indexnow' },
  { name: 'Yandex direct', url: 'https://yandex.com/indexnow' },
  { name: 'Naver (yes, supports IndexNow)', url: 'https://searchadvisor.naver.com/indexnow' },
];

const argv = process.argv.slice(2);
const urls = argv.length
  ? argv
  : [
      `https://${HOST}/blog/tj-flowers-shopify-revamp-case-study`,
      `https://${HOST}/ko/blog/tj-flowers-shopify-revamp-case-study`,
    ];

(async () => {
  console.log(`\n📡 Submitting ${urls.length} URL(s) to ${ENDPOINTS.length} engines via IndexNow\n`);
  for (const { name, url: ep } of ENDPOINTS) {
    try {
      const r = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOC, urlList: urls }),
      });
      const ok = r.status === 200 || r.status === 202;
      console.log(`  ${ok ? '✅' : '⚠️ '} ${r.status}  ${name}`);
      if (!ok) {
        const body = await r.text();
        console.log(`       ${body.slice(0, 200)}`);
      }
    } catch (e) {
      console.log(`  ❌ ${name} — ${e.message.slice(0, 200)}`);
    }
  }
  console.log(`\nKey file: ${KEY_LOC}`);
  console.log('URLs submitted:');
  urls.forEach((u) => console.log(`  - ${u}`));
})();
