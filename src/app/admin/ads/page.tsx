'use client'

import { useApi, Kpi, Card, DataTable, Spinner, ErrorBox, fmtInt, fmtMoney, fmtPct } from '@/components/admin/AdminUI'

export default function AdsPage() {
  const { data, loading, error } = useApi('/api/admin/ads')
  if (loading) return <Spinner label="Loading Google Ads…" />
  if (error) return <ErrorBox message={error} />

  if (data.pending) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-zinc-100">Google Ads</h1>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
          <div className="text-lg font-medium text-amber-300">⏳ Pending API approval</div>
          <p className="mx-auto mt-2 max-w-md text-sm text-amber-300/70">
            Your Google Ads developer token is approved for test accounts only. Once Basic Access is granted
            (≈3 business days after submitting the API token application), this tab will fill with live campaign
            data automatically — no further setup needed.
          </p>
        </div>
      </div>
    )
  }

  const accounts = data.accounts || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Google Ads</h1>
        <p className="mt-1 text-sm text-zinc-500">Managed accounts · last 30 days</p>
      </div>

      {accounts.length === 0 && <p className="text-sm text-zinc-600">No accounts linked under the manager account yet.</p>}

      {accounts.map((a: any) => (
        <div key={a.id} className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-300">
            {a.name} <span className="text-zinc-600">· {a.id}</span>
          </h2>
          {a.error ? (
            <ErrorBox message={a.error} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                <Kpi label="Spend" value={a.totals.cost} format="money" accent="#FFD45B" />
                <Kpi label="Clicks" value={a.totals.clicks} />
                <Kpi label="Impressions" value={a.totals.impressions} />
                <Kpi label="Conversions" value={a.totals.conversions} accent="#FF6B4A" />
                <Kpi label="Avg CPC" value={a.totals.avgCpc} format="money" />
              </div>
              <Card title="Campaigns">
                <DataTable
                  columns={[
                    { key: 'name', label: 'Campaign' },
                    { key: 'status', label: 'Status' },
                    { key: 'cost', label: 'Spend', align: 'right', render: (v) => fmtMoney(v) },
                    { key: 'clicks', label: 'Clicks', align: 'right', render: (v) => fmtInt(v) },
                    { key: 'ctr', label: 'CTR', align: 'right', render: (v) => fmtPct(v) },
                    { key: 'conversions', label: 'Conv', align: 'right', render: (v) => v.toFixed(1) },
                  ]}
                  rows={a.campaigns}
                />
              </Card>
              <Card title="🗑️ Search terms with spend but zero conversions (waste)">
                <DataTable
                  columns={[
                    { key: 'term', label: 'Search term' },
                    { key: 'cost', label: 'Spend', align: 'right', render: (v) => fmtMoney(v) },
                    { key: 'clicks', label: 'Clicks', align: 'right', render: (v) => fmtInt(v) },
                  ]}
                  rows={a.waste}
                />
              </Card>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
