import type { CSSProperties } from 'react'
import CountUp from './CountUp'

type L = 'en' | 'ko'
const delay = (ms: number) => ({ ['--ul-d' as string]: `${ms}ms` }) as CSSProperties

// Sourced figures only (same sentences as the MGC proposal, fact-checked 2026-10).
const TOTAL = 3117 // 2025 website-accessibility lawsuits in US federal courts (Seyfarth Shaw)
const NY = 1021 // of which New York
const NY_PCT = Math.round((NY / TOTAL) * 100) // 33

// Blue = the highlighted share, neutral gray = "the rest". The gray is deliberately achromatic
// (dataviz validator: CVD ΔE 23.4, contrast ≥ 3:1 on #0A0A0C); every segment is also direct-labeled.
const REST = '#636366'

export default function LawsuitCharts({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      <figure data-reveal className="ul-chart ul-panel rounded-[24px] p-6 md:p-8">
        <figcaption className="text-[13px] md:text-[14px] text-ash">
          {ko ? '2025년 미국 연방법원 웹사이트 접근성 소송' : 'Website-accessibility lawsuits in US federal courts, 2025'}
        </figcaption>
        <p className="mt-3 text-[46px] md:text-[64px] font-semibold leading-none tracking-[-0.045em] text-ink">
          <CountUp value={TOTAL} />
          <span className="ml-1.5 text-[18px] md:text-[22px] font-medium tracking-normal text-graphite">{ko ? '건' : 'suits'}</span>
        </p>
        <div
          className="mt-7"
          role="img"
          aria-label={ko ? `전체 ${TOTAL.toLocaleString()}건 중 뉴욕주 ${NY.toLocaleString()}건, 약 ${NY_PCT}%` : `${NY.toLocaleString()} of ${TOTAL.toLocaleString()} filed in New York, about ${NY_PCT}%`}
        >
          <div className="flex h-3 w-full gap-[2px]">
            <span className="ul-bar block h-full rounded-l-[4px] bg-[var(--gold)]" style={{ width: `${(NY / TOTAL) * 100}%`, ...delay(250) }} />
            <span className="ul-bar block h-full flex-1 rounded-r-[4px]" style={{ background: REST, ...delay(500) }} />
          </div>
          <div className="mt-3 flex items-start justify-between gap-4 text-[13px] leading-snug">
            <span className="text-ink">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--gold)] align-middle" aria-hidden />
              {ko ? '뉴욕주 ' : 'New York '}
              <CountUp value={NY} />
              {ko ? `건 · ${NY_PCT}%` : ` · ${NY_PCT}%`}
            </span>
            <span className="text-right text-graphite">
              {ko ? `기타 지역 ${(TOTAL - NY).toLocaleString()}건` : `Elsewhere ${(TOTAL - NY).toLocaleString()}`}
            </span>
          </div>
        </div>
        <p className="mt-7 text-[11px] text-ash">{ko ? '출처: Seyfarth Shaw' : 'Source: Seyfarth Shaw'}</p>
      </figure>

      <figure data-reveal className="ul-chart ul-panel rounded-[24px] p-6 md:p-8">
        <figcaption className="text-[13px] md:text-[14px] text-ash">{ko ? '소송이 많은 업종' : 'Most-sued industries'}</figcaption>
        <ul className="mt-6 space-y-6">
          <Bar label={ko ? '이커머스' : 'E-commerce'} value={70} color={REST} ms={250} ko={ko} />
          <Bar
            label={ko ? '외식·서비스업' : 'Food service'}
            value={21}
            color="var(--gold)"
            ms={450}
            ko={ko}
            tag={ko ? '외식 브랜드 해당' : 'Applies to food brands'}
          />
        </ul>
        <p className="mt-6 text-[13px] leading-[1.6] text-graphite">
          {ko
            ? '외식·서비스업은 이커머스 다음으로 소송이 많은 업종입니다.'
            : 'Food service is the second most-sued industry after e-commerce.'}
        </p>
        <p className="mt-5 text-[11px] text-ash">{ko ? '출처: UsableNet' : 'Source: UsableNet'}</p>
      </figure>
    </div>
  )
}

function Bar({ label, value, color, ms, ko, tag }: { label: string; value: number; color: string; ms: number; ko: boolean; tag?: string }) {
  return (
    <li role="img" aria-label={`${label} ${ko ? '약 ' : 'about '}${value}%`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] md:text-[15px] text-ink">
          {label}
          {tag && <span className="ml-2 rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] text-[var(--gold)]">{tag}</span>}
        </span>
        <span className="text-[22px] md:text-[28px] font-semibold tracking-[-0.03em] text-ink">
          <span className="mr-1 text-[13px] font-normal tracking-normal text-ash">{ko ? '약' : '≈'}</span>
          <CountUp value={value} />%
        </span>
      </div>
      <div className="mt-2.5 h-3 w-full overflow-hidden rounded-[4px] bg-white/[0.06]">
        <span className="ul-bar block h-full rounded-[4px]" style={{ width: `${value}%`, background: color, ...delay(ms) }} />
      </div>
    </li>
  )
}
