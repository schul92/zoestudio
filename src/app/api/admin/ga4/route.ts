import { ga4RunReport } from '@/lib/admin/google'
import { authed, unauthorized } from '@/lib/admin/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RANGE = [{ startDate: '28daysAgo', endDate: 'today' }]

function rows(res: any, dims: string[], mets: string[]) {
  return (res.rows || []).map((r: any) => {
    const o: Record<string, any> = {}
    dims.forEach((d, i) => (o[d] = r.dimensionValues[i].value))
    mets.forEach((m, i) => (o[m] = Number(r.metricValues[i].value)))
    return o
  })
}

export async function GET() {
  if (!(await authed())) return unauthorized()
  try {
    const [totals, daily, channels, pages, countries, devices] = await Promise.all([
      ga4RunReport({ dateRanges: RANGE, metrics: ['sessions', 'totalUsers', 'screenPageViews', 'conversions', 'averageSessionDuration', 'engagementRate'].map((name) => ({ name })) }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'date' }], metrics: [{ name: 'sessions' }, { name: 'totalUsers' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 15 }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'country' }], metrics: [{ name: 'totalUsers' }], orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }], limit: 10 }),
      ga4RunReport({ dateRanges: RANGE, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
    ])

    const tv = totals.rows?.[0]?.metricValues || []
    return Response.json({
      totals: {
        sessions: Number(tv[0]?.value || 0),
        users: Number(tv[1]?.value || 0),
        pageViews: Number(tv[2]?.value || 0),
        conversions: Number(tv[3]?.value || 0),
        avgSessionDuration: Number(tv[4]?.value || 0),
        engagementRate: Number(tv[5]?.value || 0),
      },
      daily: rows(daily, ['date'], ['sessions', 'totalUsers']).map((r: any) => ({
        date: `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}`,
        sessions: r.sessions,
        users: r.totalUsers,
      })),
      channels: rows(channels, ['sessionDefaultChannelGroup'], ['sessions']).map((r: any) => ({ channel: r.sessionDefaultChannelGroup, sessions: r.sessions })),
      pages: rows(pages, ['pagePath'], ['screenPageViews', 'totalUsers']).map((r: any) => ({ page: r.pagePath, views: r.screenPageViews, users: r.totalUsers })),
      countries: rows(countries, ['country'], ['totalUsers']).map((r: any) => ({ country: r.country, users: r.totalUsers })),
      devices: rows(devices, ['deviceCategory'], ['sessions']).map((r: any) => ({ device: r.deviceCategory, sessions: r.sessions })),
    })
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
