'use client'

import { useState } from 'react'
import { useApi, Kpi, Card, Spinner, ErrorBox } from '@/components/admin/AdminUI'
import { SERVICES, isServiceKey, type ServiceKey } from '@/lib/billing/services'

// ── Types (mirror GET /api/admin/billing contract) ───────────────────
// Mirrors Stripe.Subscription.Status — the API forwards it verbatim, so a
// narrower union here would silently mislabel real states (notably `unpaid`
// and `incomplete_expired`, which both mean the client owes us money).
type SubStatus =
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'unpaid'
  | 'paused'

type LatestInvoice = {
  id: string
  status: string
  hostedUrl: string | null
  amountDue: number
  dueDate: number | string | null
}

type Subscription = {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  status: SubStatus
  amountCents: number
  interval: string
  services: string[]
  currentPeriodEnd: number | string | null
  latestInvoice: LatestInvoice | null
  defaultPaymentMethod: 'us_bank_account' | 'card' | null
  delinquent: boolean
  createdAt: number | string | null
}

type BillingData = {
  testMode: boolean
  mrrCents: number
  counts: { active: number; past_due: number; canceled: number; incomplete: number; trialing: number }
  subscriptions: Subscription[]
}

// ── Small helpers ────────────────────────────────────────────────────
const dollars = (cents: number) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

/** Accepts unix seconds, unix ms, or an ISO string; returns a Date or null. */
function toDate(v: number | string | null | undefined): Date | null {
  if (v == null) return null
  if (typeof v === 'number') {
    const ms = v < 1e12 ? v * 1000 : v
    const d = new Date(ms)
    return isNaN(d.getTime()) ? null : d
  }
  const d = new Date(v)
  return isNaN(d.getTime()) ? null : d
}

const fmtDate = (v: number | string | null | undefined) => {
  const d = toDate(v)
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
}

/** Whole days a due date is in the past (0 or negative -> not overdue). */
function daysOverdue(v: number | string | null | undefined): number {
  const d = toDate(v)
  if (!d) return 0
  const diff = Date.now() - d.getTime()
  return diff > 0 ? Math.floor(diff / 86_400_000) : 0
}

const serviceLabel = (k: string) => (isServiceKey(k) ? SERVICES[k].en : k)

// ── Status pill ──────────────────────────────────────────────────────
const PILL: Record<SubStatus, string> = {
  active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  trialing: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  past_due: 'border-transparent text-white',
  unpaid: 'border-transparent text-white',
  canceled: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
  incomplete: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  incomplete_expired: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  paused: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
}

function StatusPill({ status }: { status: SubStatus }) {
  const label = status.replace(/_/g, ' ')
  const style =
    status === 'past_due' || status === 'unpaid' ? { backgroundColor: '#FF6B4A' } : undefined
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${PILL[status] ?? PILL.canceled}`}
      style={style}
    >
      {label}
    </span>
  )
}

function PayMethod({ method }: { method: Subscription['defaultPaymentMethod'] }) {
  if (method === 'us_bank_account')
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        ACH
        <span className="text-emerald-400/60">· lower fee</span>
      </span>
    )
  if (method === 'card')
    return <span className="text-xs text-zinc-400">Card</span>
  return <span className="text-xs text-zinc-600">—</span>
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-400">
      {children}
    </span>
  )
}

// ── Needs-attention row (past due / delinquent) ──────────────────────
function AttentionRow({ sub }: { sub: Subscription }) {
  const [portalError, setPortalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const overdue = daysOverdue(sub.latestInvoice?.dueDate)

  async function manage() {
    setBusy(true)
    setPortalError(null)
    try {
      const res = await fetch('/api/admin/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ customerId: sub.customerId }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.url) {
        setPortalError(j.error || `Could not open the customer portal (HTTP ${res.status}).`)
        return
      }
      window.open(j.url, '_blank', 'noopener,noreferrer')
    } catch (e) {
      setPortalError(e instanceof Error ? e.message : 'Could not open the customer portal.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-lg border border-[#FF6B4A]/25 bg-[#FF6B4A]/[0.06] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium text-zinc-100">{sub.customerName || sub.customerEmail || sub.customerId}</span>
            <StatusPill status={sub.status} />
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            {dollars(sub.amountCents)}/{sub.interval}
            {overdue > 0 && (
              <span className="ml-2 font-medium text-[#FF6B4A]">
                {overdue} {overdue === 1 ? 'day' : 'days'} overdue
              </span>
            )}
            {sub.customerEmail && <span className="ml-2 text-zinc-600">· {sub.customerEmail}</span>}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {sub.latestInvoice?.hostedUrl && (
            <a
              href={sub.latestInvoice.hostedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              View invoice
            </a>
          )}
          <button
            onClick={manage}
            disabled={busy}
            className="rounded-lg bg-[#FF6B4A] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Opening…' : 'Manage / update card'}
          </button>
        </div>
      </div>
      {portalError && (
        <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-300">
          {portalError}
        </div>
      )}
    </div>
  )
}

// ── New subscription form ────────────────────────────────────────────
function NewClientForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [interval, setInterval] = useState<'month' | 'year'>('month')
  const [services, setServices] = useState<ServiceKey[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [payUrl, setPayUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function toggle(key: ServiceKey) {
    setServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPayUrl(null)
    const amountCents = Math.round(parseFloat(amount) * 100)
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }
    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      setError('Enter a valid amount in dollars.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/billing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim(), email: email.trim(), amountCents, services, interval }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.payUrl) {
        setError(j.error || `Could not create the subscription (HTTP ${res.status}).`)
        return
      }
      setPayUrl(j.payUrl)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the subscription.')
    } finally {
      setSubmitting(false)
    }
  }

  async function copy() {
    if (!payUrl) return
    try {
      await navigator.clipboard.writeText(payUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked — the input is selectable as a fallback */
    }
  }

  const inputCls =
    'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-white/30'

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Client name</span>
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Vito's Pizza" />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Email</span>
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@example.com" />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Amount (USD)</span>
          <input
            className={inputCls}
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="200"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wider text-zinc-500">Billing interval</span>
          <select className={inputCls} value={interval} onChange={(e) => setInterval(e.target.value as 'month' | 'year')}>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </label>
      </div>

      <div>
        <span className="mb-2 block text-[11px] uppercase tracking-wider text-zinc-500">Included services</span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(SERVICES) as ServiceKey[]).map((key) => {
            const checked = services.includes(key)
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  checked ? 'border-[#FF6B4A]/40 bg-[#FF6B4A]/10 text-zinc-100' : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20'
                }`}
              >
                <input type="checkbox" className="accent-[#FF6B4A]" checked={checked} onChange={() => toggle(key)} />
                {SERVICES[key].en}
              </label>
            )
          })}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-[#FF6B4A] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? 'Creating…' : 'Create subscription & payment link'}
      </button>

      {payUrl && (
        <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] p-4">
          <div className="mb-2 text-sm font-medium text-emerald-300">Private payment link ready</div>
          <div className="flex items-center gap-2">
            <input readOnly value={payUrl} onFocus={(e) => e.currentTarget.select()} className={`${inputCls} font-mono text-xs`} />
            <button
              type="button"
              onClick={copy}
              className="flex-shrink-0 rounded-lg border border-white/15 px-3 py-2 text-xs text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">Send this to the client. The link is private and expires in 30 days.</p>
        </div>
      )}
    </form>
  )
}

// ── Page ─────────────────────────────────────────────────────────────
export default function BillingPage() {
  const { data, loading, error } = useApi<BillingData>('/api/admin/billing')

  if (loading) return <Spinner label="Loading billing…" />
  if (error) return <ErrorBox message={error} />
  if (!data) return <ErrorBox message="No billing data returned." />

  const subs = data.subscriptions ?? []
  // Every state where money is owed but not collected. `incomplete` matters
  // most: it means the client's FIRST payment failed, so they have never paid
  // at all — Stripe only reports `past_due` once an earlier invoice succeeded.
  const ATTENTION: readonly string[] = ['past_due', 'incomplete', 'incomplete_expired', 'unpaid']
  const attention = subs.filter((s) => ATTENTION.includes(s.status) || s.delinquent)
  const counts = data.counts ?? { active: 0, past_due: 0, canceled: 0, incomplete: 0, trialing: 0 }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Billing</h1>
        <p className="mt-1 text-sm text-zinc-500">Client retainers · live from Stripe</p>
      </div>

      {data.testMode && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
          <span>
            <strong className="font-semibold">Stripe test mode</strong> — no real money moves.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="MRR" value={data.mrrCents / 100} format="money" sub="Monthly recurring" />
        <Kpi label="Active" value={counts.active} sub="Subscriptions" />
        <Kpi label="Past due" value={counts.past_due} accent={counts.past_due > 0 ? '#FF6B4A' : undefined} sub="Needs attention" />
        <Kpi label="Canceled" value={counts.canceled} sub="Ended" />
      </div>

      {attention.length > 0 && (
        <Card title="Needs attention">
          <p className="mb-4 -mt-1 text-xs text-zinc-500">Clients who are past due or delinquent. Follow up first.</p>
          <div className="space-y-3">
            {attention.map((s) => (
              <AttentionRow key={s.id} sub={s} />
            ))}
          </div>
        </Card>
      )}

      <Card title="All subscriptions">
        {subs.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-zinc-400">No subscriptions yet.</p>
            <p className="mx-auto mt-2 max-w-md text-xs text-zinc-600">
              Create your first client retainer with the form below. Stripe becomes the source of truth — a private
              payment link is generated for the client to pay on our site.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-zinc-500">
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Services</th>
                  <th className="pb-2 font-medium">Payment</th>
                  <th className="pb-2 font-medium">Next charge</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 align-top text-zinc-300 hover:bg-white/[0.02]">
                    <td className="py-3 pr-3">
                      <div className="font-medium text-zinc-100">{s.customerName || '—'}</div>
                      <div className="text-xs text-zinc-500">{s.customerEmail}</div>
                    </td>
                    <td className="py-3 pr-3 tabular-nums">
                      {dollars(s.amountCents)}
                      <span className="text-zinc-600">/{s.interval}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex max-w-[16rem] flex-wrap gap-1">
                        {s.services.length ? s.services.map((k) => <Chip key={k}>{serviceLabel(k)}</Chip>) : <span className="text-xs text-zinc-600">—</span>}
                      </div>
                    </td>
                    <td className="py-3 pr-3"><PayMethod method={s.defaultPaymentMethod} /></td>
                    <td className="py-3 pr-3 text-zinc-400">{fmtDate(s.currentPeriodEnd)}</td>
                    <td className="py-3 pr-3"><StatusPill status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="New client subscription">
        <NewClientForm />
      </Card>
    </div>
  )
}
