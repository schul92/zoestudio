'use client'

import { useApi, Kpi, Card, DataTable, Spinner, ErrorBox, fmtInt, fmtPct, fmtPos } from '@/components/admin/AdminUI'
import { AreaChart, DonutChart } from '@/components/admin/Chart'

export default function GscPage() {
  const { data, loading, error } = useApi('/api/admin/gsc')
  if (loading) return <Spinner label="Loading Search Console…" />
  if (error) return <ErrorBox message={error} />

  const { totals, daily, queries, pages, countries, devices } = data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Search Console</h1>
        <p className="mt-1 text-sm text-zinc-500">Organic search · last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Clicks" value={totals.clicks} accent="#FF6B4A" />
        <Kpi label="Impressions" value={totals.impressions} />
        <Kpi label="CTR" value={totals.ctr} format="pct" />
        <Kpi label="Avg position" value={totals.position} format="pos" />
      </div>

      <Card title="Clicks & impressions">
        <AreaChart
          series={[
            { name: 'Clicks', data: daily.map((d: any) => d.clicks) },
            { name: 'Impressions', data: daily.map((d: any) => d.impressions) },
          ]}
          categories={daily.map((d: any) => d.date.slice(5))}
        />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Top queries">
          <DataTable
            columns={[
              { key: 'query', label: 'Query' },
              { key: 'clicks', label: 'Clicks', align: 'right', render: (v) => fmtInt(v) },
              { key: 'impressions', label: 'Impr', align: 'right', render: (v) => fmtInt(v) },
              { key: 'position', label: 'Pos', align: 'right', render: (v) => fmtPos(v) },
            ]}
            rows={queries}
          />
        </Card>
        <Card title="Top pages">
          <DataTable
            columns={[
              { key: 'page', label: 'Page' },
              { key: 'clicks', label: 'Clicks', align: 'right', render: (v) => fmtInt(v) },
              { key: 'impressions', label: 'Impr', align: 'right', render: (v) => fmtInt(v) },
              { key: 'position', label: 'Pos', align: 'right', render: (v) => fmtPos(v) },
            ]}
            rows={pages}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Devices">
          <DonutChart labels={devices.map((d: any) => d.device)} series={devices.map((d: any) => d.clicks)} />
        </Card>
        <Card title="Top countries">
          <DataTable
            columns={[
              { key: 'country', label: 'Country' },
              { key: 'clicks', label: 'Clicks', align: 'right', render: (v) => fmtInt(v) },
              { key: 'impressions', label: 'Impr', align: 'right', render: (v) => fmtInt(v) },
            ]}
            rows={countries}
          />
        </Card>
      </div>
    </div>
  )
}
