'use client'

import { useEffect, useRef, useState } from 'react'

// ── Data fetching ────────────────────────────────────────────────────
export function useApi<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    setLoading(true)
    fetch(url, { credentials: 'include' })
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`)
        return j
      })
      .then((j) => alive && (setData(j), setError(null)))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [url])
  return { data, loading, error }
}

// ── Formatting ───────────────────────────────────────────────────────
export const fmtInt = (n: number) => Math.round(n || 0).toLocaleString('en-US')
export const fmtPct = (n: number, d = 1) => `${((n || 0) * 100).toFixed(d)}%`
export const fmtMoney = (n: number) => `$${(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
export const fmtPos = (n: number) => (n || 0).toFixed(1)
export const fmtDur = (s: number) => `${Math.floor((s || 0) / 60)}m ${Math.round((s || 0) % 60)}s`

// ── Count-up animation (no dependency) ───────────────────────────────
function useCountUp(target: number, ms = 900) {
  const [val, setVal] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    const start = performance.now()
    const from = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(from + (target - from) * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, ms])
  return val
}

// ── KPI card ─────────────────────────────────────────────────────────
export function Kpi({
  label, value, format = 'int', sub, accent,
}: {
  label: string
  value: number
  format?: 'int' | 'pct' | 'money' | 'pos' | 'dur'
  sub?: string
  accent?: string
}) {
  const animated = useCountUp(value)
  const fmt = { int: fmtInt, pct: (n: number) => fmtPct(n), money: fmtMoney, pos: fmtPos, dur: fmtDur }[format]
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20">
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50" style={accent ? { color: accent } : undefined}>
        {fmt(animated)}
      </div>
      {sub && <div className="mt-1 text-xs text-zinc-500">{sub}</div>}
    </div>
  )
}

// ── Card / section ───────────────────────────────────────────────────
export function Card({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      {title && <h3 className="mb-4 text-sm font-medium text-zinc-300">{title}</h3>}
      {children}
    </div>
  )
}

// ── Table ────────────────────────────────────────────────────────────
export function DataTable({ columns, rows }: { columns: { key: string; label: string; align?: 'left' | 'right'; render?: (v: any, row: any) => React.ReactNode }[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-zinc-500">
            {columns.map((c) => (
              <th key={c.key} className={`pb-2 font-medium ${c.align === 'right' ? 'text-right' : ''}`}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 text-zinc-300 hover:bg-white/[0.02]">
              {columns.map((c) => (
                <td key={c.key} className={`py-2 pr-3 ${c.align === 'right' ? 'text-right tabular-nums' : ''}`}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="py-6 text-center text-zinc-600">No data</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ── States ───────────────────────────────────────────────────────────
export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-16 text-zinc-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
      <div className="font-medium">Couldn’t load data</div>
      <div className="mt-1 text-red-300/70">{message}</div>
    </div>
  )
}
