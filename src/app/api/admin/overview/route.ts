import { gscQuery, ga4RunReport, adsSearch, adsCustomerId, adsLoginCustomerId, AdsNotApprovedError } from '@/lib/admin/google'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)
const micros = (m: any) => Number(m || 0) / 1e6

export async function GET() {
  if (!(await authed())) return unauthorized()

  const out: any = { ga4: null, gsc: null, ads: null }

  // GA4 — totals, channel split, daily sessions
  try {
    const RANGE = [{ startDate: '28daysAgo', endDate: 'today' }]
    const [totals, channels, daily] = await Promise.all([
      ga4RunReport({ dateRanges: RANGE, metrics: ['sessions', 'totalUsers', 'conversions', 'engagementRate'].map((name) => ({ name })) }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'date' }], metrics: [{ name: 'sessions' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }),
    ])
    const tv = totals.rows?.[0]?.metricValues || []
    const ch = (channels.rows || []).map((r: any) => ({ channel: r.dimensionValues[0].value, sessions: Number(r.metricValues[0].value) }))
    out.ga4 = {
      sessions: Number(tv[0]?.value || 0),
      users: Number(tv[1]?.value || 0),
      conversions: Number(tv[2]?.value || 0),
      engagementRate: Number(tv[3]?.value || 0),
      organic: ch.filter((c: any) => /organic/i.test(c.channel)).reduce((s: number, c: any) => s + c.sessions, 0),
      paid: ch.filter((c: any) => /paid/i.test(c.channel)).reduce((s: number, c: any) => s + c.sessions, 0),
      channels: ch,
      daily: (daily.rows || []).map((r: any) => ({
        date: `${r.dimensionValues[0].value.slice(0, 4)}-${r.dimensionValues[0].value.slice(4, 6)}-${r.dimensionValues[0].value.slice(6, 8)}`,
        sessions: Number(r.metricValues[0].value),
      })),
    }
  } catch (e: any) { out.ga4 = { error: e.message } }

  // GSC — totals
  try {
    const totals = await gscQuery({ startDate: daysAgo(28), endDate: daysAgo(0) })
    const t = totals.rows?.[0] || {}
    out.gsc = { clicks: t.clicks || 0, impressions: t.impressions || 0, ctr: t.ctr || 0, position: t.position || 0 }
  } catch (e: any) { out.gsc = { error: e.message } }

  // Ads — spend + conversions (or pending)
  try {
    const scope = adsCustomerId()
    let cid = scope
    if (scope === 'all') {
      const accts = await adsSearch(
        `SELECT customer_client.id, customer_client.manager, customer_client.status FROM customer_client WHERE customer_client.level <= 1`,
        adsLoginCustomerId() || scope)
      const first = accts.map((r: any) => r.customerClient).find((c: any) => c && !c.manager && c.status === 'ENABLED')
      cid = first?.id ? String(first.id) : adsLoginCustomerId()
    }
    const rows = await adsSearch(
      `SELECT metrics.cost_micros, metrics.clicks, metrics.conversions FROM customer WHERE segments.date DURING LAST_30_DAYS`, cid)
    const m = rows[0]?.metrics || {}
    out.ads = { pending: false, cost: micros(m.costMicros), clicks: Number(m.clicks || 0), conversions: Number(m.conversions || 0) }
  } catch (e: any) {
    out.ads = e instanceof AdsNotApprovedError ? { pending: true } : { error: e.message }
  }

  return Response.json(out)
}
