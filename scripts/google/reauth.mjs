// One Google sign-in, then run the read-only checks with the token kept in memory only (never written anywhere).
// Usage (keys come from Vercel, run from a folder linked to v0-zoe-lumos):
//   vercel env run -e production -- node scripts/google/reauth.mjs            → prints a sign-in URL, waits on localhost:3000
//   vercel env run -e production -- node scripts/google/reauth.mjs '<callback url from the phone>'
// Runs: ads-own.mjs (our Ads), gsc-ga4.mjs (GSC + GA4, resubmits sitemap), and Seoul Choice's check if dental-Seoul is next to this repo.
import http from 'node:http'
import { existsSync } from 'node:fs'
const e = process.env
const REDIRECT = 'http://localhost:3000/callback'
const SCOPE = ['business.manage','webmasters','indexing','analytics.readonly','analytics.edit','adwords'].map(s => 'https://www.googleapis.com/auth/' + s).join(' ')
const url = 'https://accounts.google.com/o/oauth2/auth?' + new URLSearchParams({ client_id: e.GOOGLE_OAUTH_CLIENT_ID, redirect_uri: REDIRECT, response_type: 'code', scope: SCOPE, access_type: 'offline', prompt: 'consent' })
const here = new URL('.', import.meta.url)
const SC = new URL('../../../dental-Seoul/research/google-ads/check/status.mjs', here)
async function finish(code) {
  const t = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: e.GOOGLE_OAUTH_CLIENT_ID, client_secret: e.GOOGLE_OAUTH_CLIENT_SECRET, redirect_uri: REDIRECT, grant_type: 'authorization_code' }) })).json()
  if (!t.refresh_token) { console.log('EXCHANGE FAILED', t.error, t.error_description); process.exit(1) }
  process.env.GOOGLE_REFRESH_TOKEN = t.refresh_token
  console.log('\n######## ZOE LUMOS Ads 169-497-4047'); await import(new URL('./ads-own.mjs', here))
  console.log('\n######## GSC + GA4 zoelumos.com'); await import(new URL('./gsc-ga4.mjs', here))
  if (existsSync(SC)) { console.log('\n######## SEOUL CHOICE Ads 468-893-4852'); await import(SC) }
  process.exit(0)
}
const arg = process.argv[2]
if (arg) await finish(arg.includes('code=') ? new URL(arg.slice(arg.indexOf('http'))).searchParams.get('code') : arg)
else {
  http.createServer(async (req, res) => { const u = new URL(req.url, REDIRECT); if (u.pathname !== '/callback') return res.end(); const code = u.searchParams.get('code'); res.end(code ? 'Done. You can close this tab.' : 'No code'); if (code) await finish(code) })
    .listen(3000, () => console.log('AUTH URL:\n' + url + '\n'))
  setTimeout(() => { console.log('TIMEOUT'); process.exit(2) }, 115 * 60 * 1000)
}
