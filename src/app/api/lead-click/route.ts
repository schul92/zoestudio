import { createMailer, mailFrom } from '@/lib/mailer'
import { attributionRows, classify, sanitizeAttribution } from '@/lib/attribution'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// A KakaoTalk chat, a phone call or an email written in the visitor's own mail app starts outside the site, so
// the lead itself never carries a source. The boot script (src/lib/analyticsBoot.ts) sends one beacon per
// session and kind when such a link is clicked; this route emails the owner the visitor's source and the time,
// so the chat or call that arrives a moment later can be matched to it.

const KINDS: Record<string, string> = { kakao: '카카오톡', phone: '전화', email: '이메일' }
const OWNER_INBOXES = 'zoestudiollc@gmail.com, steve.b.song92@gmail.com'
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|curl|wget|python|axios|node-fetch/i

// The beacon is public, so cap how many notifications one server instance may send per hour. It is a blunt
// guard against someone looping the endpoint to flood the inbox, not a precise limiter.
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 30
const sent: number[] = []
function allow(): boolean {
  const now = Date.now()
  while (sent.length && now - sent[0] > WINDOW_MS) sent.shift()
  if (sent.length >= MAX_PER_WINDOW) return false
  sent.push(now)
  return true
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const clean = (v: unknown, n: number) => (typeof v === 'string' ? v.replace(/[\r\n\t]+/g, ' ').slice(0, n) : '')
const stamp = (timeZone: string) =>
  new Intl.DateTimeFormat('sv-SE', { timeZone, dateStyle: 'short', timeStyle: 'short' }).format(new Date())

const done = () => new Response(null, { status: 204 })

export async function POST(request: Request) {
  try {
    // Same-site only: a beacon from our own pages always carries our Origin.
    const origin = request.headers.get('origin') || ''
    const host = request.headers.get('host') || ''
    let originHost = ''
    try {
      originHost = origin ? new URL(origin).host : ''
    } catch {}
    if (!originHost || originHost !== host) return done()
    if (BOT.test(request.headers.get('user-agent') || '')) return done()

    // sendBeacon posts a string as text/plain, so parse the body by hand.
    const raw = await request.text()
    if (raw.length > 6000) return done()
    const body = JSON.parse(raw) as Record<string, unknown>
    const kind = typeof body.kind === 'string' ? body.kind : ''
    const kindLabel = KINDS[kind]
    if (!kindLabel) return done()

    const attribution = sanitizeAttribution(body)
    const loc = clean(body.loc, 60)
    const source = classify(attribution.last || attribution.first).label
    const rows: [string, string][] = [
      ['클릭', `${kindLabel} 버튼${loc ? ` (${loc})` : ''}`],
      ['시각', `${stamp('America/New_York')} 뉴욕 · ${stamp('Asia/Seoul')} 서울`],
      ...attributionRows(attribution),
    ]
    const subject = `[클릭] ${kindLabel} · ${source}${attribution.page ? ` · ${attribution.page}` : ''}`

    const transporter = createMailer()
    if (!transporter) {
      if (process.env.NODE_ENV !== 'production') console.log('lead-click (mail not configured):', subject, rows)
      return done()
    }
    if (!allow()) {
      console.warn(JSON.stringify({ event: 'LEAD_CLICK_THROTTLED', subject }))
      return done()
    }

    await transporter.sendMail({
      from: mailFrom('ZOE LUMOS Website'),
      to: OWNER_INBOXES,
      subject,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n방문자가 ${kindLabel} 버튼을 눌렀습니다. 곧 들어오는 ${kindLabel} 문의가 이 방문자일 가능성이 높습니다.\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px;">
          ${rows.map(([k, v]) => `<p style="margin: 4px 0; font-size: 14px; color: #333;"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`).join('')}
          <p style="margin-top: 16px; font-size: 12px; color: #777;">방문자가 ${kindLabel} 버튼을 눌렀습니다. 곧 들어오는 ${kindLabel} 문의가 이 방문자일 가능성이 높습니다.</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('lead-click error:', error instanceof Error ? error.message : error)
  }
  return done()
}
