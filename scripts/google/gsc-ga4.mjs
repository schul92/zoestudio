// Read-only GSC + GA4 check for zoelumos.com, plus one safe write: (re)submit the sitemap to GSC.
const e = process.env
const tok = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ client_id: e.GOOGLE_OAUTH_CLIENT_ID, client_secret: e.GOOGLE_OAUTH_CLIENT_SECRET, refresh_token: e.GOOGLE_REFRESH_TOKEN, grant_type: 'refresh_token' }) })).json()
if (!tok.access_token) { console.log('token error', tok.error); process.exit(1) }
const H = { Authorization: 'Bearer ' + tok.access_token, 'content-type': 'application/json' }
const SITE = encodeURIComponent('sc-domain:zoelumos.com')
const d = n => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)
const q = async body => (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE}/searchAnalytics/query`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json()
console.log('\n== GSC totals: last 28d vs previous 28d')
for (const [a, b] of [[30, 3], [58, 31]]) { const r = await q({ startDate: d(a), endDate: d(b) }); console.log(d(a), '→', d(b), JSON.stringify(r.rows?.[0] ?? r.error?.message)) }
console.log('\n== GSC top queries 28d'); for (const r of (await q({ startDate: d(30), endDate: d(3), dimensions: ['query'], rowLimit: 25 })).rows ?? []) console.log(r.keys[0], '| clk', r.clicks, 'impr', r.impressions, 'pos', r.position.toFixed(1))
console.log('\n== GSC top pages 28d'); for (const r of (await q({ startDate: d(30), endDate: d(3), dimensions: ['page'], rowLimit: 15 })).rows ?? []) console.log(r.keys[0].replace('https://www.zoelumos.com', ''), '| clk', r.clicks, 'impr', r.impressions, 'pos', r.position.toFixed(1))
console.log('\n== GSC by country 28d'); for (const r of (await q({ startDate: d(30), endDate: d(3), dimensions: ['country'], rowLimit: 6 })).rows ?? []) console.log(r.keys[0], r.clicks, r.impressions)
console.log('\n== GSC sitemaps'); const sm = await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE}/sitemaps`, { headers: H })).json()
for (const s of sm.sitemap ?? []) console.log(s.path, 'submitted', s.lastSubmitted, 'downloaded', s.lastDownloaded, 'errors', s.errors, 'warnings', s.warnings, JSON.stringify(s.contents))
if (!sm.sitemap) console.log(JSON.stringify(sm).slice(0, 300))
const put = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE}/sitemaps/${encodeURIComponent('https://www.zoelumos.com/sitemap.xml')}`, { method: 'PUT', headers: H })
console.log('sitemap resubmit http', put.status)
const P = 'properties/500538997'
const ga = async body => (await fetch(`https://analyticsdata.googleapis.com/v1beta/${P}:runReport`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json()
const pr = (title, r) => { console.log('\n== ' + title); if (r.error) return console.log('ERR', r.error.message); for (const row of r.rows ?? []) console.log(row.dimensionValues?.map(v => v.value).join(' / ') ?? '', '|', row.metricValues.map(v => v.value).join(' ')) }
pr('GA4 28d by channel (sessions, users, keyEvents)', await ga({ dateRanges: [{ startDate: '28daysAgo', endDate: 'yesterday' }], dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'keyEvents' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }))
pr('GA4 28d key events by name', await ga({ dateRanges: [{ startDate: '28daysAgo', endDate: 'yesterday' }], dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }, { name: 'keyEvents' }], orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }], limit: 20 }))
pr('GA4 28d top landing pages', await ga({ dateRanges: [{ startDate: '28daysAgo', endDate: 'yesterday' }], dimensions: [{ name: 'landingPage' }], metrics: [{ name: 'sessions' }, { name: 'keyEvents' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 12 }))
pr('GA4 28d by country', await ga({ dateRanges: [{ startDate: '28daysAgo', endDate: 'yesterday' }], dimensions: [{ name: 'country' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 6 }))
