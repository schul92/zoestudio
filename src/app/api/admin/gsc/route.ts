import { gscQuery } from '@/lib/admin/google'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function daysAgo(n: number) {
  const d = new Date(Date.now() - n * 86400000)
  return d.toISOString().slice(0, 10)
}

export async function GET() {
  if (!(await authed())) return unauthorized()
  const startDate = daysAgo(28)
  const endDate = daysAgo(0)
  const base = { startDate, endDate }

  try {
    const [totals, daily, queries, pages, countries, devices] = await Promise.all([
      gscQuery(base),
      gscQuery({ ...base, dimensions: ['date'], rowLimit: 60 }),
      gscQuery({ ...base, dimensions: ['query'], rowLimit: 25 }),
      gscQuery({ ...base, dimensions: ['page'], rowLimit: 25 }),
      gscQuery({ ...base, dimensions: ['country'], rowLimit: 10 }),
      gscQuery({ ...base, dimensions: ['device'], rowLimit: 5 }),
    ])

    const t = totals.rows?.[0] || {}
    const strip = (u: string) => u.replace(/^https?:\/\/(www\.)?zoelumos\.com/, '') || '/'

    return Response.json({
      range: { startDate, endDate },
      totals: {
        clicks: t.clicks || 0,
        impressions: t.impressions || 0,
        ctr: t.ctr || 0,
        position: t.position || 0,
      },
      daily: (daily.rows || []).map((r: any) => ({
        date: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      queries: (queries.rows || []).map((r: any) => ({
        query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
      pages: (pages.rows || []).map((r: any) => ({
        page: strip(r.keys[0]), clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      })),
      countries: (countries.rows || []).map((r: any) => ({
        country: r.keys[0], clicks: r.clicks, impressions: r.impressions,
      })),
      devices: (devices.rows || []).map((r: any) => ({
        device: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr,
      })),
    })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
