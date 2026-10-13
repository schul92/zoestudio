import type { CSSProperties, ReactNode } from 'react'
import { CheckCheck, LayoutDashboard, RefreshCw, Wallet } from 'lucide-react'
import CountUp from '@/components/us-launch/CountUp'
import { seq, type L, type T } from './Blocks'

const delay = (ms: number) => ({ ['--ul-d' as string]: `${ms}ms` }) as CSSProperties

// Illustrative data only — the mock is labelled "sample screen" in its header and caption.
const DAILY = [820, 860, 910, 870, 940, 1010, 760, 980, 1040, 1100, 1060, 1150, 1210, 1284]
const W = 560
const H = 150
const PAD = 8

const kpis: { label: T; value: number; sub: T; ok?: boolean }[] = [
  { label: { en: 'Orders today', ko: '오늘 주문' }, value: 1284, sub: { en: 'Shopify · Amazon · EDI', ko: 'Shopify · Amazon · EDI' } },
  { label: { en: 'Shipped', ko: '출고 완료' }, value: 1191, sub: { en: 'Cut-off 5 PM', ko: '오후 5시 마감 기준' } },
  { label: { en: 'Inbound pallets', ko: '입고 예정 팔레트' }, value: 36, sub: { en: 'Arriving tomorrow', ko: '내일 오전 도착' } },
  { label: { en: 'Sync errors', ko: '연동 오류' }, value: 0, sub: { en: 'Last 24 hours', ko: '지난 24시간' }, ok: true },
]

const channels: { label: T; pct: number }[] = [
  { label: { en: 'Shopify', ko: 'Shopify' }, pct: 46 },
  { label: { en: 'Amazon', ko: 'Amazon' }, pct: 28 },
  { label: { en: 'B2B · EDI', ko: 'B2B · EDI' }, pct: 19 },
  { label: { en: 'Other', ko: '기타' }, pct: 7 },
]

const events: { icon: ReactNode; text: T; when: T }[] = [
  { icon: <CheckCheck className="h-3.5 w-3.5" aria-hidden />, text: { en: 'EDI 945 ship confirms sent · 212', ko: 'EDI 945 출고 확정 전송 · 212건' }, when: { en: '2 min', ko: '2분 전' } },
  { icon: <RefreshCw className="h-3.5 w-3.5" aria-hidden />, text: { en: 'Shopify orders synced', ko: 'Shopify 주문 동기화' }, when: { en: '1 min', ko: '1분 전' } },
  { icon: <Wallet className="h-3.5 w-3.5" aria-hidden />, text: { en: 'AWS spend · 41% of monthly budget', ko: 'AWS 사용료 · 월 예산의 41%' }, when: { en: 'Today', ko: '오늘' } },
]

function chartPaths() {
  const max = Math.max(...DAILY) * 1.08
  const min = Math.min(...DAILY) * 0.85
  const pts = DAILY.map((v, i) => [PAD + (i * (W - PAD * 2)) / (DAILY.length - 1), PAD + (1 - (v - min) / (max - min)) * (H - PAD * 2)] as const)
  // Catmull-Rom through the points, as cubic Béziers.
  let line = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    line += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  const area = `${line} L${last[0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`
  return { line, area, last }
}

/** A sample operations dashboard (HQ view): KPIs count up, the 14-day line draws, channel bars grow and the
 *  event feed arrives — all once, when it scrolls into view. Clearly marked as a sample with illustrative data. */
export default function DashboardMock({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  const { line, area, last } = chartPaths()
  return (
    <figure data-reveal className="ul-chart">
      <div className="ul-frame overflow-hidden rounded-[18px] bg-[#111113]">
        <div className="flex h-12 items-center justify-between gap-3 border-b border-white/10 px-4 md:px-5">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span className="ul-chip grid h-7 w-7 place-items-center rounded-lg">
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden />
            </span>
            {ko ? '운영 대시보드' : 'Operations'}
          </p>
          <div className="hidden items-center gap-0.5 rounded-full bg-white/[0.06] p-0.5 text-[11.5px] sm:flex" aria-hidden>
            {(ko ? ['본사', '미국 법인', '창고'] : ['HQ', 'US entity', 'Warehouse']).map((t, i) => (
              <span key={t} className={`rounded-full px-2.5 py-1 ${i === 0 ? 'bg-white/[0.12] text-ink' : 'text-ash'}`}>{t}</span>
            ))}
          </div>
          <span className="whitespace-nowrap rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-ash">{ko ? '예시 화면' : 'Sample screen'}</span>
        </div>

        <div className="space-y-4 p-4 md:space-y-5 md:p-6">
          <ul className="grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
            {kpis.map((k, i) => (
              <li key={k.label.en} style={seq(i * 70)} className="ent-in rounded-2xl bg-white/[0.045] p-3.5 md:p-4">
                <p className="flex items-center gap-1.5 text-[11.5px] text-ash">
                  {k.ok && <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" aria-hidden />}
                  {k.label[locale]}
                </p>
                <p className="mt-1.5 text-[24px] font-semibold leading-none tracking-[-0.03em] text-ink md:text-[28px]">
                  <CountUp value={k.value} />
                </p>
                <p className="mt-1.5 truncate text-[11px] text-ash">{k.sub[locale]}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="rounded-2xl bg-white/[0.045] p-3.5 md:p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[12.5px] font-medium text-graphite">{ko ? '일별 주문 · 최근 14일' : 'Daily orders · last 14 days'}</p>
                <p className="text-[11px] text-ash">{ko ? '전 채널' : 'All channels'}</p>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 block h-auto w-full overflow-visible" role="img" aria-label={ko ? '최근 14일 일별 주문 추이(예시)' : 'Daily orders over the last 14 days (sample)'}>
                <defs>
                  <linearGradient id="ent-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--gold)" stopOpacity=".28" />
                    <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,.06)" strokeWidth="1" />
                ))}
                <path d={area} fill="url(#ent-area)" className="ent-fade" style={seq(1000)} />
                <path d={line} pathLength={1} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ent-dash" style={seq(300)} />
                <circle cx={last[0]} cy={last[1]} r="5" fill="var(--gold)" stroke="#111113" strokeWidth="2.5" className="ent-fade" style={seq(1250)} />
              </svg>
            </div>

            <div className="rounded-2xl bg-white/[0.045] p-3.5 md:p-4">
              <p className="text-[12.5px] font-medium text-graphite">{ko ? '채널별 주문 비중' : 'Orders by channel'}</p>
              <ul className="mt-3.5 space-y-3">
                {channels.map((c, i) => (
                  <li key={c.label.en}>
                    <div className="flex items-baseline justify-between text-[12px]">
                      <span className="text-ink">{c.label[locale]}</span>
                      <span className="tabular-nums text-graphite">{c.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <span className="ul-bar block h-full rounded-full bg-[var(--gold)]" style={{ width: `${c.pct}%`, opacity: 1 - i * 0.18, ...delay(400 + i * 120) }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="divide-y divide-white/[0.06] rounded-2xl bg-white/[0.045] px-3.5 md:px-4">
            {events.map((e, i) => (
              <li key={e.text.en} style={seq(900 + i * 140)} className="ent-in flex items-center gap-3 py-2.5 text-[12.5px]">
                <span className="ul-chip grid h-6 w-6 shrink-0 place-items-center rounded-full">{e.icon}</span>
                <span className="min-w-0 flex-1 truncate text-graphite">{e.text[locale]}</span>
                <span className="shrink-0 text-[11px] text-ash">{e.when[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-[12.5px] leading-[1.6] text-ash">
        {ko
          ? '예시 화면과 가상 데이터입니다. 실제 지표와 화면 구성은 고객사의 업무와 권한에 맞춰 설계합니다.'
          : 'Sample screen with illustrative data. Real metrics and layouts are designed around your operations and roles.'}
      </figcaption>
    </figure>
  )
}
