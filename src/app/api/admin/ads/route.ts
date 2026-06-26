import { adsSearch, adsCustomerId, adsLoginCustomerId, AdsNotApprovedError } from '@/lib/admin/google'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const micros = (m: any) => Number(m || 0) / 1e6

async function listChildAccounts() {
  const mcc = adsLoginCustomerId() || adsCustomerId()
  const rows = await adsSearch(
    `SELECT customer_client.id, customer_client.descriptive_name, customer_client.manager, customer_client.status
     FROM customer_client WHERE customer_client.level <= 1`,
    mcc
  )
  return rows
    .map((r: any) => r.customerClient)
    .filter((c: any) => c && !c.manager && c.status === 'ENABLED')
    .map((c: any) => ({ id: String(c.id), name: c.descriptiveName || String(c.id) }))
}

async function reportAccount(cid: string, name: string) {
  const totalsRows = await adsSearch(
    `SELECT metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions, metrics.average_cpc
     FROM customer WHERE segments.date DURING LAST_30_DAYS`, cid)
  const t = totalsRows[0]?.metrics || {}
  const campaigns = await adsSearch(
    `SELECT campaign.name, campaign.status, metrics.cost_micros, metrics.clicks, metrics.impressions,
            metrics.conversions, metrics.ctr, metrics.average_cpc
     FROM campaign WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0
     ORDER BY metrics.cost_micros DESC`, cid)
  const waste = await adsSearch(
    `SELECT search_term_view.search_term, metrics.cost_micros, metrics.clicks
     FROM search_term_view WHERE segments.date DURING LAST_30_DAYS AND metrics.conversions = 0 AND metrics.cost_micros > 0
     ORDER BY metrics.cost_micros DESC LIMIT 15`, cid)

  return {
    id: cid,
    name,
    totals: {
      cost: micros(t.costMicros), clicks: Number(t.clicks || 0), impressions: Number(t.impressions || 0),
      conversions: Number(t.conversions || 0), avgCpc: micros(t.averageCpc),
    },
    campaigns: campaigns.map((r: any) => ({
      name: r.campaign.name, status: r.campaign.status, cost: micros(r.metrics.costMicros),
      clicks: Number(r.metrics.clicks || 0), ctr: Number(r.metrics.ctr || 0),
      avgCpc: micros(r.metrics.averageCpc), conversions: Number(r.metrics.conversions || 0),
    })),
    waste: waste.map((r: any) => ({ term: r.searchTermView.searchTerm, cost: micros(r.metrics.costMicros), clicks: Number(r.metrics.clicks || 0) })),
  }
}

export async function GET() {
  if (!(await authed())) return unauthorized()
  try {
    const scope = adsCustomerId()
    const accounts = scope === 'all' ? await listChildAccounts() : [{ id: scope.replace(/-/g, ''), name: 'Account' }]
    const reports = []
    for (const a of accounts) {
      try { reports.push(await reportAccount(a.id, a.name)) }
      catch (e: any) { if (e instanceof AdsNotApprovedError) throw e /* bubble up */; reports.push({ id: a.id, name: a.name, error: e.message }) }
    }
    return Response.json({ pending: false, accounts: reports })
  } catch (e: any) {
    if (e instanceof AdsNotApprovedError) {
      return Response.json({ pending: true, message: e.message })
    }
    return Response.json({ error: e.message }, { status: 500 })
  }
}
