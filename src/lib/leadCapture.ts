'use client'

import { trackLead, type LeadMethod } from '@/utils/analytics'
import { classify, type Touch } from '@/lib/attribution'

// Every lead form posts through submitLead so a mail outage can never silently swallow an inquiry:
// the draft stays on the device until the server confirms delivery, the visitor's source (first touch, last
// touch, last ad click — recorded by the inline boot script) rides along for attribution, and the caller gets a
// code it can branch on to show the manual fallback.

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  business?: string
  services?: string
  message?: string
  locale?: string
}

export type SubmitResult = { ok: true } | { ok: false; code: 'MAIL_UNAVAILABLE' | 'BAD_REQUEST' | 'NETWORK' | 'UNKNOWN' }

const DRAFT_PREFIX = 'zl_draft_'
const NINETY_DAYS = 90 * 864e5

function readTouch(key: string): Touch | undefined {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : null
    if (!parsed || typeof parsed !== 'object') return undefined
    if (typeof parsed.t !== 'number' || Date.now() - parsed.t > NINETY_DAYS) return undefined
    return parsed as Touch
  } catch {
    return undefined
  }
}

/** What the boot script recorded about how this visitor arrived. Every field is optional. */
export function attribution() {
  const first = readTouch('zl_ft')
  const last = readTouch('zl_lt')
  const ad = readTouch('zl_ck')
  let visits: number | undefined
  let page: string | undefined
  try {
    visits = Number(localStorage.getItem('zl_n')) || undefined
    page = window.location.pathname
  } catch {}
  return { first, last, ad, visits, page }
}

export function saveDraft(key: string, data: object) {
  try {
    localStorage.setItem(DRAFT_PREFIX + key, JSON.stringify({ ...data, savedAt: Date.now() }))
  } catch {}
}

export function loadDraft<T extends object>(key: string): Partial<T> | null {
  try {
    const raw = localStorage.getItem(DRAFT_PREFIX + key)
    if (!raw) return null
    const { savedAt, ...rest } = JSON.parse(raw)
    // Two weeks is long enough to come back and resend, short enough not to resurrect stale text.
    if (typeof savedAt === 'number' && Date.now() - savedAt > 14 * 864e5) {
      localStorage.removeItem(DRAFT_PREFIX + key)
      return null
    }
    return rest as Partial<T>
  } catch {
    return null
  }
}

export function clearDraft(key: string) {
  try {
    localStorage.removeItem(DRAFT_PREFIX + key)
  } catch {}
}

export async function submitLead(
  payload: LeadPayload,
  opts: { method: LeadMethod; source: string; draftKey?: string },
): Promise<SubmitResult> {
  if (opts.draftKey) saveDraft(opts.draftKey, payload)
  const a = attribution()
  let res: Response
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        lead_source: opts.source,
        // Flat click IDs stay for the Google Ads offline-conversion upload; the touches explain the source.
        gclid: a.ad?.gclid,
        gbraid: a.ad?.gbraid,
        wbraid: a.ad?.wbraid,
        landing: a.ad?.lp,
        first_touch: a.first,
        last_touch: a.last,
        ad_click: a.ad,
        visits: a.visits,
        page: a.page,
      }),
    })
  } catch {
    return { ok: false, code: 'NETWORK' }
  }
  if (res.ok) {
    if (opts.draftKey) clearDraft(opts.draftKey)
    trackLead(opts.method, opts.source, {
      first_channel: classify(a.first).id,
      last_channel: classify(a.last || a.first).id,
    })
    return { ok: true }
  }
  let code: Exclude<SubmitResult, { ok: true }>['code'] = res.status === 400 ? 'BAD_REQUEST' : 'UNKNOWN'
  try {
    const j = await res.json()
    if (j?.code === 'MAIL_UNAVAILABLE') code = 'MAIL_UNAVAILABLE'
  } catch {}
  return { ok: false, code }
}

export function leadText(p: LeadPayload, isKo: boolean): string {
  const rows: [string, string | undefined][] = [
    [isKo ? '이름' : 'Name', p.name],
    [isKo ? '이메일' : 'Email', p.email],
    [isKo ? '연락처' : 'Phone / KakaoTalk', p.phone],
    [isKo ? '비즈니스' : 'Business', p.business],
    [isKo ? '서비스' : 'Services', p.services],
  ]
  const head = rows.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v!.trim()}`).join('\n')
  const msg = p.message?.trim()
  return msg ? `${head}\n\n${msg}` : head
}
