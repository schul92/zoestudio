'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * Square booking prototype — the flow a salon client will get on their own
 * site: pick a service, pick a day, pick an open slot, leave your name.
 * Square is the source of truth for hours, staff and collisions; this page
 * only renders what the API offers.
 */

type Service = {
  id: string
  version: number
  name: string
  priceCents: number | null
  durationMinutes: number | null
}
type Staff = { id: string; name: string }
type Slot = { startAt: string; teamMemberId: string | null }

const fmtUSD = (cents: number) => `$${(cents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}`

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })

const fmtDay = (d: Date) =>
  d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short', timeZone: 'America/New_York' })

/** The next 14 days as YYYY-MM-DD (New York — the salon's timezone). */
function next14Days(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = []
  for (let i = 0; i < 14; i++) {
    const d = new Date(Date.now() + i * 86_400_000)
    const value = d.toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
    out.push({ value, label: i === 0 ? `오늘 · ${fmtDay(d)}` : fmtDay(d) })
  }
  return out
}

export default function BookDemoPage() {
  const days = useMemo(next14Days, [])

  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [loadError, setLoadError] = useState(false)

  const [service, setService] = useState<Service | null>(null)
  const [date, setDate] = useState(days[0].value)
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [busy, setBusy] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState<{ startAt: string } | null>(null)

  useEffect(() => {
    fetch('/api/booking/services')
      .then((r) => r.json())
      .then((d: { services?: Service[]; staff?: Staff[]; error?: string }) => {
        if (d.error || !d.services) throw new Error(d.error)
        setServices(d.services)
        setStaff(d.staff ?? [])
      })
      .catch(() => setLoadError(true))
  }, [])

  const searchSlots = useCallback(
    async (svc: Service, day: string) => {
      setSlots(null)
      setSlot(null)
      setError(null)
      const res = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceVariationId: svc.id, date: day }),
      })
      const d = (await res.json()) as { slots?: Slot[]; error?: string }
      if (!res.ok || !d.slots) {
        setError('시간대를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
        setSlots([])
        return
      }
      setSlots(d.slots)
    },
    []
  )

  async function book() {
    if (!service || !slot) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startAt: slot.startAt,
          serviceVariationId: service.id,
          serviceVariationVersion: service.version,
          teamMemberId: slot.teamMemberId ?? staff[0]?.id,
          givenName: name,
          email,
          note,
        }),
      })
      const d = (await res.json()) as { bookingId?: string; error?: string }
      if (!res.ok || !d.bookingId) {
        setError(
          d.error === 'slot_unavailable'
            ? '방금 그 시간이 마감되었습니다. 다른 시간을 선택해 주세요.'
            : d.error?.includes('required')
              ? '이름과 이메일을 확인해 주세요.'
              : '예약에 실패했습니다. 잠시 후 다시 시도해 주세요.'
        )
        if (d.error === 'slot_unavailable') searchSlots(service, date)
        return
      }
      setConfirmed({ startAt: slot.startAt })
    } finally {
      setBusy(false)
    }
  }

  const inputCls =
    'w-full rounded-lg border border-hairline bg-paper px-3 py-2.5 text-sm text-ink placeholder-mute outline-none focus:border-gold/60'

  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-10 sm:py-14">
      <header className="mb-8">
        <div className="text-sm font-medium tracking-[0.2em] text-ink">
          ZOE <span className="text-gold">LUMOS</span>
        </div>
        <h1 className="mt-4 font-display text-3xl text-ink">
          온라인 예약 <span className="text-lg text-ash">/ Book an appointment</span>
        </h1>
        <p className="mt-1 text-xs text-mute">
          데모 — Square 샌드박스 연동 프로토타입입니다. 실제 예약이 아닙니다.
        </p>
      </header>

      {confirmed ? (
        <section className="rounded-2xl border border-hairline bg-paper p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-2xl text-gold">✓</div>
          <h2 className="mt-5 font-display text-2xl text-ink">
            예약이 완료되었습니다
            <span className="mt-1 block text-base font-normal text-ash">You&apos;re booked!</span>
          </h2>
          <p className="mt-4 text-sm text-graphite">
            {new Date(confirmed.startAt).toLocaleString('ko-KR', {
              month: 'long', day: 'numeric', weekday: 'short', hour: 'numeric', minute: '2-digit',
              timeZone: 'America/New_York',
            })}
            {' · '}{service?.name}
          </p>
          <button
            onClick={() => { setConfirmed(null); setSlot(null); setSlots(null); setService(null) }}
            className="mt-6 rounded-full border border-hairline px-5 py-2 text-sm text-ink hover:border-ink/30"
          >
            새 예약 만들기
          </button>
        </section>
      ) : loadError ? (
        <section className="rounded-2xl border border-hairline bg-paper p-8 text-sm text-graphite">
          예약 시스템을 불러오지 못했습니다. Square 연동 설정(SQUARE_ACCESS_TOKEN)을 확인해 주세요.
        </section>
      ) : (
        <div className="space-y-8">
          {/* 1 — service */}
          <section>
            <h2 className="mb-3 text-sm font-medium text-graphite">1 · 시술 선택 / Choose a service</h2>
            {services.length === 0 ? (
              <p className="text-sm text-mute">서비스 목록을 불러오는 중…</p>
            ) : (
              <div className="grid gap-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setService(s); searchSlots(s, date) }}
                    className={`flex items-baseline justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                      service?.id === s.id ? 'border-gold bg-gold/10' : 'border-hairline bg-paper hover:border-ink/25'
                    }`}
                  >
                    <span className="text-sm text-ink">{s.name}</span>
                    <span className="text-xs text-ash">
                      {s.durationMinutes ? `${s.durationMinutes}분` : ''}
                      {s.priceCents != null ? ` · ${fmtUSD(s.priceCents)}` : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* 2 — date + slots */}
          {service && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-graphite">2 · 날짜와 시간 / Pick a time</h2>
              <select
                className={inputCls}
                value={date}
                onChange={(e) => { setDate(e.target.value); searchSlots(service, e.target.value) }}
              >
                {days.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <div className="mt-3">
                {slots === null ? (
                  <p className="text-sm text-mute">빈 시간을 확인하는 중…</p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-mute">이 날은 예약 가능한 시간이 없습니다. 다른 날짜를 선택해 주세요.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s.startAt + (s.teamMemberId ?? '')}
                        onClick={() => setSlot(s)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                          slot?.startAt === s.startAt && slot?.teamMemberId === s.teamMemberId
                            ? 'border-gold bg-gold/15 text-ink'
                            : 'border-hairline bg-paper text-graphite hover:border-ink/25'
                        }`}
                      >
                        {fmtTime(s.startAt)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 3 — details */}
          {slot && (
            <section>
              <h2 className="mb-3 text-sm font-medium text-graphite">3 · 예약자 정보 / Your details</h2>
              <div className="space-y-3">
                <input className={inputCls} placeholder="이름 / Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className={inputCls} type="email" placeholder="이메일 / Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={inputCls} placeholder="요청사항 (선택) / Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              {error && (
                <p className="mt-3 rounded-lg border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}
              <button
                onClick={book}
                disabled={busy || !name.trim() || !email.trim()}
                className="mt-4 w-full rounded-xl bg-ink py-3 text-sm font-medium text-ivory transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {busy ? '예약 중…' : `예약 확정 — ${fmtTime(slot.startAt)}`}
              </button>
            </section>
          )}
        </div>
      )}
    </main>
  )
}
