'use client'

import { useApi, Kpi, Card, DataTable, Spinner, ErrorBox, fmtInt } from '@/components/admin/AdminUI'
import { AreaChart, DonutChart, BarChart } from '@/components/admin/Chart'

export default function Ga4Page() {
  const { data, loading, error } = useApi('/api/admin/ga4')
  if (loading) return <Spinner label="Loading GA4…" />
  if (error) return <ErrorBox message={error} />

  const { totals, daily, channels, pages, countries, devices } = data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Analytics (GA4)</h1>
        <p className="mt-1 text-sm text-zinc-500">Site engagement · last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Sessions" value={totals.sessions} accent="#FF6B4A" />
        <Kpi label="Users" value={totals.users} />
        <Kpi label="Page views" value={totals.pageViews} />
        <Kpi label="Conversions" value={totals.conversions} accent="#FFD45B" />
        <Kpi label="Engagement" value={totals.engagementRate} format="pct" />
        <Kpi label="Avg session" value={totals.avgSessionDuration} format="dur" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Sessions & users" className="lg:col-span-2">
          <AreaChart
            series={[
              { name: 'Sessions', data: daily.map((d: any) => d.sessions) },
              { name: 'Users', data: daily.map((d: any) => d.users) },
            ]}
            categories={daily.map((d: any) => d.date.slice(5))}
          />
        </Card>
        <Card title="Channels">
          <DonutChart labels={channels.map((c: any) => c.channel)} series={channels.map((c: any) => c.sessions)} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Top pages">
          <DataTable
            columns={[
              { key: 'page', label: 'Page' },
              { key: 'views', label: 'Views', align: 'right', render: (v) => fmtInt(v) },
              { key: 'users', label: 'Users', align: 'right', render: (v) => fmtInt(v) },
            ]}
            rows={pages}
          />
        </Card>
        <Card title="Devices">
          <BarChart
            series={[{ name: 'Sessions', data: devices.map((d: any) => d.sessions) }]}
            categories={devices.map((d: any) => d.device)}
            horizontal
            height={220}
          />
        </Card>
      </div>

      <Card title="Top countries">
        <DataTable
          columns={[
            { key: 'country', label: 'Country' },
            { key: 'users', label: 'Users', align: 'right', render: (v) => fmtInt(v) },
          ]}
          rows={countries}
        />
      </Card>
    </div>
  )
}
