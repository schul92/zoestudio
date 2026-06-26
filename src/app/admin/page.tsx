'use client'

import { useApi, Kpi, Card, Spinner, ErrorBox, fmtInt } from '@/components/admin/AdminUI'
import { AreaChart, DonutChart } from '@/components/admin/Chart'

export default function OverviewPage() {
  const { data, loading, error } = useApi('/api/admin/overview')

  if (loading) return <Spinner label="Loading combined analytics…" />
  if (error) return <ErrorBox message={error} />

  const ga4 = data.ga4 || {}
  const gsc = data.gsc || {}
  const ads = data.ads || {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Overview</h1>
        <p className="mt-1 text-sm text-zinc-500">All sources combined · last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Sessions" value={ga4.sessions || 0} sub="GA4" />
        <Kpi label="Users" value={ga4.users || 0} sub="GA4" />
        <Kpi label="Conversions" value={ga4.conversions || 0} accent="#FF6B4A" sub="GA4" />
        <Kpi label="Engagement" value={ga4.engagementRate || 0} format="pct" sub="GA4" />
        <Kpi label="Organic clicks" value={gsc.clicks || 0} sub="Search Console" />
        <Kpi label="Impressions" value={gsc.impressions || 0} sub="Search Console" />
        <Kpi label="Avg position" value={gsc.position || 0} format="pos" sub="Search Console" />
        {ads.pending ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
            <div className="text-[11px] uppercase tracking-[0.14em] text-amber-500/80">Ad spend</div>
            <div className="mt-2 text-sm text-amber-300">Pending API approval</div>
          </div>
        ) : (
          <Kpi label="Ad spend" value={ads.cost || 0} format="money" accent="#FFD45B" sub="Google Ads · 30d" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Daily sessions" className="lg:col-span-2">
          {ga4.daily?.length ? (
            <AreaChart
              series={[{ name: 'Sessions', data: ga4.daily.map((d: any) => d.sessions) }]}
              categories={ga4.daily.map((d: any) => d.date.slice(5))}
            />
          ) : <p className="text-sm text-zinc-600">No data</p>}
        </Card>
        <Card title="Traffic by channel">
          {ga4.channels?.length ? (
            <DonutChart labels={ga4.channels.map((c: any) => c.channel)} series={ga4.channels.map((c: any) => c.sessions)} />
          ) : <p className="text-sm text-zinc-600">No data</p>}
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Organic sessions</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">{fmtInt(ga4.organic || 0)}</div>
        </Card>
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Paid sessions</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">{fmtInt(ga4.paid || 0)}</div>
        </Card>
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Search CTR</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">{((gsc.ctr || 0) * 100).toFixed(2)}%</div>
        </Card>
      </div>
    </div>
  )
}
