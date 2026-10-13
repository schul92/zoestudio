import type { CSSProperties, ReactNode } from 'react'
import {
  Bell,
  Cloud,
  CreditCard,
  Database,
  FileBarChart,
  FileCode2,
  LayoutDashboard,
  Megaphone,
  Plug,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Warehouse,
  Webhook,
  Workflow,
} from 'lucide-react'
import { seq, type L, type T } from './Blocks'

const ic = 'h-[18px] w-[18px]'

const sources: { icon: ReactNode; title: T; sub: string }[] = [
  { icon: <ShoppingCart className={ic} aria-hidden />, title: { en: 'Commerce', ko: '쇼핑몰' }, sub: 'Shopify · Amazon' },
  { icon: <Warehouse className={ic} aria-hidden />, title: { en: 'Warehouse', ko: '창고 WMS' }, sub: 'Extensiv · WMS' },
  { icon: <Receipt className={ic} aria-hidden />, title: { en: 'Accounting', ko: '회계 · ERP' }, sub: 'QuickBooks · ERP' },
  { icon: <CreditCard className={ic} aria-hidden />, title: { en: 'Payments', ko: '결제' }, sub: 'Stripe · Square' },
  { icon: <Megaphone className={ic} aria-hidden />, title: { en: 'Ads & analytics', ko: '광고 · 분석' }, sub: 'Google Ads · GA4' },
  { icon: <FileCode2 className={ic} aria-hidden />, title: { en: 'Partners', ko: '거래처' }, sub: 'EDI · SFTP · API' },
]

const tiers: { icon: ReactNode; title: T; services: string }[] = [
  { icon: <Webhook className={ic} aria-hidden />, title: { en: 'Ingest', ko: '수집' }, services: 'API Gateway · Transfer Family (SFTP · AS2)' },
  { icon: <Workflow className={ic} aria-hidden />, title: { en: 'Process', ko: '처리' }, services: 'Lambda · Step Functions · EventBridge · SQS' },
  { icon: <Database className={ic} aria-hidden />, title: { en: 'Store', ko: '저장' }, services: 'Aurora PostgreSQL · DynamoDB · S3' },
]

const GUARDS = ['IAM', 'Secrets Manager', 'KMS', 'CloudWatch', 'CloudTrail', 'Budgets']

const outputs: { icon: ReactNode; title: T; sub: T }[] = [
  { icon: <LayoutDashboard className={ic} aria-hidden />, title: { en: 'Dashboards', ko: '대시보드' }, sub: { en: 'HQ · US team · floor', ko: '본사 · 미국 법인 · 현장' } },
  { icon: <Bell className={ic} aria-hidden />, title: { en: 'Alerts', ko: '알림' }, sub: { en: 'Email · Slack · Teams', ko: '이메일 · Slack · Teams' } },
  { icon: <FileBarChart className={ic} aria-hidden />, title: { en: 'Reports', ko: '자동 리포트' }, sub: { en: 'Daily · weekly', ko: '매일 · 매주 발송' } },
  { icon: <Plug className={ic} aria-hidden />, title: { en: 'Partner feeds', ko: '거래처 연동' }, sub: { en: 'API · EDI out', ko: 'API · EDI 회신' } },
]

// Desktop geometry: chips are exactly 44px tall with 10px gaps, so the six sources stack to 314px (center 157)
// and the four outputs to 206px (center 103). The connector columns are drawn at those exact pixel sizes and
// the grid row centers everything, so each curve starts on a chip and lands on the AWS box's edge.
const ROW = 54
const FAN_IN = sources.map((_, i) => {
  const y = 22 + i * ROW
  return `M0 ${y} C 36 ${y}, 36 157, 72 157`
})
const FAN_OUT = outputs.map((_, i) => {
  const y = 22 + i * ROW
  return `M0 103 C 36 103, 36 ${y}, 72 ${y}`
})
const DOWN = 'M0.5 0 L0.5 48'

const pkt = (path: string, ms: number, lg?: number) => ({ offsetPath: `path('${path}')`, ...seq(ms, lg) }) as CSSProperties

/** The integration map: the systems a company already runs feed an AWS account it owns, which turns the data
 *  into dashboards, alerts, reports and partner feeds. Lines draw in order, then packets keep travelling them.
 *  Desktop plays it as one left-to-right scene; phones stack it and play each stage as it scrolls in. */
export default function IntegrationMap({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  return (
    <figure className="ul-panel rounded-[28px] px-4 py-7 sm:px-6 md:px-8 md:py-10 lg:px-10 lg:pb-12 lg:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1.3fr)_72px_minmax(0,0.95fr)] lg:items-center">
        {/* Sources */}
        <div data-reveal className="relative">
          <StageLabel>{ko ? '지금 쓰는 시스템' : 'Systems you run today'}</StageLabel>
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
            {sources.map((s, i) => (
              <li key={s.title.en} style={seq(i * 60, i * 70)} className="ent-in ent-node flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 lg:h-11 lg:py-0">
                <span className="shrink-0 text-[var(--gold)]">{s.icon}</span>
                <span className="min-w-0 lg:flex lg:items-baseline lg:gap-2">
                  <span className="block text-[13px] font-semibold leading-tight text-ink lg:whitespace-nowrap">{s.title[locale]}</span>
                  <span className="block min-w-0 truncate text-[11.5px] leading-tight text-ash">{s.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <FanConnector paths={FAN_IN} height={314} drawAt={480} packetsAt={2300} joinY={157} joinX={72} />
        <DownConnector at={120} />

        {/* The AWS account */}
        <div data-reveal className="relative">
          <div style={seq(0, 760)} className="ent-in rounded-[22px] border border-dashed border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-white/[0.02] p-3.5 md:p-5">
            <div className="flex items-center justify-between gap-3 px-1">
              <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                <Cloud className="h-4 w-4 text-[var(--gold)]" aria-hidden />
                {ko ? '고객사 명의 AWS 계정' : 'Your AWS account'}
              </p>
              <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[11px] text-ash tabular-nums">us-east-1</span>
            </div>
            <ol className="mt-4 space-y-2">
              {tiers.map((t, i) => (
                <li key={t.title.en} style={seq(140 + i * 140, 960 + i * 160)} className="ent-in flex items-center gap-3 rounded-2xl bg-white/[0.05] p-2.5 md:p-3">
                  <span className="ul-chip grid h-10 w-10 shrink-0 place-items-center rounded-xl">{t.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink">{t.title[locale]}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-graphite">{t.services}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div style={seq(600, 1440)} className="ent-in mt-3 flex flex-wrap items-center gap-1.5 px-1">
              <span className="mr-1 inline-flex items-center gap-1.5 text-[11.5px] text-ash">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
                {ko ? '보안 · 운영' : 'Security & ops'}
              </span>
              {GUARDS.map((g) => (
                <span key={g} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-graphite">{g}</span>
              ))}
            </div>
          </div>
        </div>

        <FanConnector paths={FAN_OUT} height={206} drawAt={1620} packetsAt={2950} joinY={103} joinX={0} />
        <DownConnector at={120} />

        {/* Outputs */}
        <div data-reveal className="relative">
          <StageLabel>{ko ? '받아 보는 결과' : 'What you get'}</StageLabel>
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
            {outputs.map((o, i) => (
              <li key={o.title.en} style={seq(i * 60, 1900 + i * 80)} className="ent-in ent-node flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 lg:h-11 lg:py-0">
                <span className="shrink-0 text-[var(--gold)]">{o.icon}</span>
                <span className="min-w-0 lg:flex lg:items-baseline lg:gap-2">
                  <span className="block text-[13px] font-semibold leading-tight text-ink lg:whitespace-nowrap">{o.title[locale]}</span>
                  <span className="block min-w-0 truncate text-[11.5px] leading-tight text-ash">{o.sub[locale]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-[1.6] text-ash md:mt-10">
        {ko
          ? '모든 리소스는 고객사 명의의 AWS 계정에 만들고, 인프라는 코드(AWS CDK · Terraform)로 관리합니다. 실제 서비스 구성은 업무와 데이터 양에 맞춰 정합니다.'
          : 'Everything is created in an AWS account your company owns and managed as code (AWS CDK or Terraform). The exact services are chosen for your workload and data volume.'}
      </figcaption>
    </figure>
  )
}

function StageLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ash lg:absolute lg:bottom-full lg:left-0 lg:mb-4 lg:whitespace-nowrap">
      {children}
    </p>
  )
}

/** Desktop only: curves between a column of chips and the AWS box, at exact pixel size (see geometry above). */
function FanConnector({ paths, height, drawAt, packetsAt, joinX, joinY }: { paths: string[]; height: number; drawAt: number; packetsAt: number; joinX: number; joinY: number }) {
  const period = 3900 / paths.length
  return (
    <div data-reveal className="relative hidden w-[72px] lg:block" style={{ height }} aria-hidden>
      <svg viewBox={`0 0 72 ${height}`} width="72" height={height} className="absolute inset-0 overflow-visible">
        {paths.map((d) => (
          <path key={`b${d}`} d={d} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.25" />
        ))}
        {paths.map((d, i) => (
          <path key={`g${d}`} d={d} pathLength={1} className="ent-dash" style={seq(0, drawAt + i * 45)} fill="none" stroke="var(--gold)" strokeOpacity=".5" strokeWidth="1.5" />
        ))}
        <circle cx={joinX} cy={joinY} r="3.5" fill="var(--gold)" className="ent-fade" style={seq(0, drawAt + 700)} />
      </svg>
      {paths.map((d, i) => (
        <span key={`p${d}`} className="ent-pkt" style={pkt(d, 0, packetsAt + Math.round(i * period))} />
      ))}
    </div>
  )
}

/** Phones and tablets: a short vertical link between stacked stages, with two packets per loop. */
function DownConnector({ at }: { at: number }) {
  return (
    <div data-reveal className="relative mx-auto my-1.5 h-12 w-px lg:hidden" aria-hidden>
      <span className="absolute inset-0 bg-white/15" />
      <span className="ent-draw-y absolute inset-0 bg-[var(--gold)] opacity-60" style={seq(at)} />
      <span className="ent-pkt" style={pkt(DOWN, at + 800)} />
      <span className="ent-pkt" style={pkt(DOWN, at + 800 + 1950)} />
    </div>
  )
}
