// Where a visitor came from. The inline boot script (analyticsBoot.ts) records raw "touches" in the browser;
// this file turns a touch into a channel name. Shared by the browser (GA params) and the server (lead emails),
// so it must stay free of imports and browser/Node APIs.

export type Touch = {
  t?: number // when (ms epoch)
  lp?: string // landing path
  ref?: string // external referrer host
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  msclkid?: string
  us?: string // utm_source
  um?: string // utm_medium
  uc?: string // utm_campaign
  ut?: string // utm_term
  ucn?: string // utm_content
}

export type Channel = { id: string; label: string; paid: boolean }

const STR_KEYS = ['lp', 'ref', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'us', 'um', 'uc', 'ut', 'ucn'] as const

/** Keep only known string fields, clipped. Everything a browser sends is untrusted. */
export function sanitizeTouch(v: unknown): Touch | undefined {
  if (!v || typeof v !== 'object') return undefined
  const src = v as Record<string, unknown>
  const out: Touch = {}
  if (typeof src.t === 'number' && Number.isFinite(src.t) && src.t > 0) out.t = src.t
  for (const k of STR_KEYS) {
    const val = src[k]
    if (typeof val === 'string' && val) out[k] = val.replace(/[\r\n\t]+/g, ' ').slice(0, 200)
  }
  return Object.keys(out).length ? out : undefined
}

const AI: [RegExp, string][] = [
  [/chatgpt|openai/, 'ChatGPT'],
  [/perplexity/, 'Perplexity'],
  [/gemini\.google|bard\.google/, 'Gemini'],
  [/copilot\.microsoft|copilot\.com/, 'Copilot'],
  [/claude\.ai/, 'Claude'],
]

const PAID_MEDIUM = /^(cpc|ppc|paid|paidsearch|paid_search|paidsocial|paid_social|display|banner|cpm|ads?)$/

export function classify(touch: Touch | undefined): Channel {
  const c = (id: string, label: string, paid = false): Channel => ({ id, label, paid })
  if (!touch) return c('unknown', '알 수 없음')
  const us = (touch.us || '').toLowerCase()
  const um = (touch.um || '').toLowerCase()
  const uc = (touch.uc || '').toLowerCase()
  const ref = (touch.ref || '').toLowerCase()

  // 1. Ad click IDs are the strongest signal.
  if (touch.gclid || touch.gbraid || touch.wbraid) return c('google_ads', 'Google 광고', true)
  if (touch.msclkid) return c('microsoft_ads', 'Bing 광고', true)

  // 2. Tagged links (utm_*).
  if (us || um) {
    if (PAID_MEDIUM.test(um)) {
      if (/google/.test(us)) return c('google_ads', 'Google 광고', true)
      if (/naver/.test(us)) return c('naver_ads', '네이버 광고', true)
      if (/facebook|instagram|meta|^fb$|^ig$/.test(us)) return c('meta_ads', 'Meta 광고 (Instagram·Facebook)', true)
      if (/kakao/.test(us)) return c('kakao_ads', '카카오 광고', true)
      return c('paid_other', `유료 광고 (${touch.us || touch.um})`, true)
    }
    // Our Google Business Profile website link is tagged utm_source=google&utm_medium=organic&utm_campaign=gbp.
    if (/gbp|gmb|business.?profile/.test(uc) || /gbp|gmb/.test(us)) return c('google_business_profile', 'Google 비즈니스 프로필 (지도)')
    for (const [re, name] of AI) if (re.test(us)) return c('ai', `AI 답변 (${name})`)
    if (um === 'email' || /newsletter|mail/.test(us)) return c('email', '이메일')
    if (/kakao/.test(us)) return c('kakao', '카카오톡')
    if (/instagram|^ig$/.test(us)) return c('instagram', 'Instagram')
    if (/facebook|^fb$/.test(us)) return c('facebook', 'Facebook')
    if (/naver/.test(us)) return c('naver_other', `네이버 (${touch.um || touch.us})`)
    return c('campaign', `링크 (${[touch.us, touch.um].filter(Boolean).join(' / ')})`)
  }

  // 3. Referrer.
  if (ref) {
    for (const [re, name] of AI) if (re.test(ref)) return c('ai', `AI 답변 (${name})`)
    if (/(^|\.)google\./.test(ref)) return c('google_organic', 'Google 검색 (무료)')
    if (/place\.naver|map\.naver/.test(ref)) return c('naver_place', '네이버 플레이스·지도')
    if (/blog\.naver|cafe\.naver/.test(ref)) return c('naver_blog', '네이버 블로그·카페')
    if (/search\.naver/.test(ref)) return c('naver_search', '네이버 검색')
    if (/naver\./.test(ref)) return c('naver_other', '네이버')
    if (/daum\.net/.test(ref)) return c('daum', 'Daum 검색')
    if (/bing\.com/.test(ref)) return c('bing', 'Bing 검색')
    if (/duckduckgo|yahoo\.|yandex\.|ecosia|brave\.com/.test(ref)) return c('search_other', `검색 (${touch.ref})`)
    if (/instagram/.test(ref)) return c('instagram', 'Instagram')
    if (/facebook|fb\.me/.test(ref)) return c('facebook', 'Facebook')
    if (/kakao/.test(ref)) return c('kakao', '카카오톡')
    if (/youtube|youtu\.be/.test(ref)) return c('youtube', 'YouTube')
    if (/linkedin|lnkd\.in|(^|\.)t\.co$|twitter|(^|\.)x\.com$|threads\.|tiktok|yelp\./.test(ref)) return c('social_other', `소셜 (${touch.ref})`)
    return c('referral', `다른 사이트 (${touch.ref})`)
  }

  // 4. Link from Facebook/Instagram apps often arrives with only fbclid and no referrer.
  if (touch.fbclid) return c('meta_social', 'Instagram·Facebook 링크')

  // 5. Nothing: typed the address, a bookmark, or an app that hides the referrer (KakaoTalk, most messengers).
  return c('direct', '직접 방문 (주소 입력·카톡 등 앱 링크)')
}

const day = (t?: number) => (t ? new Date(t).toISOString().slice(0, 10) : '')

/** One line a person can read: "Google 광고 · 캠페인 x · 검색어 y → /ko/pricing (2026-11-09)". */
export function describeTouch(touch: Touch | undefined): string {
  if (!touch) return ''
  const ch = classify(touch)
  const parts = [ch.label]
  if (touch.uc) parts.push(`캠페인 ${touch.uc}`)
  if (touch.ut) parts.push(`검색어 ${touch.ut}`)
  if (touch.ucn) parts.push(`소재 ${touch.ucn}`)
  let line = parts.join(' · ')
  if (touch.lp) line += ` → ${touch.lp}`
  const d = day(touch.t)
  if (d) line += ` (${d})`
  return line
}

export type Attribution = { first?: Touch; last?: Touch; ad?: Touch; visits?: number; page?: string }

export function sanitizeAttribution(body: Record<string, unknown>): Attribution {
  const visits = typeof body.visits === 'number' && body.visits > 0 && body.visits < 10000 ? Math.floor(body.visits) : undefined
  const page = typeof body.page === 'string' ? body.page.replace(/[\r\n\t]+/g, ' ').slice(0, 300) : undefined
  return {
    first: sanitizeTouch(body.first_touch),
    last: sanitizeTouch(body.last_touch),
    ad: sanitizeTouch(body.ad_click),
    visits,
    page,
  }
}

/** Label/value rows for the owner email. Empty when the browser sent nothing. */
export function attributionRows(a: Attribution): [string, string][] {
  const rows: [string, string][] = []
  // The touch that led to this inquiry: the latest known source, else the first visit.
  const now = a.last || a.first
  if (now) rows.push(['출처', describeTouch(now)])
  if (a.first && a.last && (a.first.t !== a.last.t || a.first.lp !== a.last.lp)) rows.push(['첫 방문', describeTouch(a.first)])
  // An earlier ad click that neither line above already shows.
  if (a.ad && now && classify(now).id !== 'google_ads' && !(a.first && a.first.t === a.ad.t)) rows.push(['이전 광고 클릭', describeTouch(a.ad)])
  if (a.visits) rows.push(['방문 횟수', `${a.visits}회`])
  if (a.page) rows.push(['문의한 페이지', a.page])
  return rows
}
