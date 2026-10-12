import { Video } from 'lucide-react'

type L = 'en' | 'ko'
const ARC = 'M10 104 C 120 -6, 280 -6, 390 104'

/** Seoul HQ ↔ New Jersey team. The route draws itself on scroll (pathLength=1 dash offset), then the
 *  endpoint and the "video call" chip arrive. Times are EDT; the footnote covers winter time. */
export default function TimeZoneRoute({ locale }: { locale: L }) {
  const ko = locale === 'ko'
  return (
    <figure data-reveal className="ul-tz ul-panel rounded-[28px] px-5 py-8 md:px-12 md:py-12">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-3 md:gap-8">
        <Endpoint
          tag="SEOUL · KST"
          place={ko ? '서울 본사' : 'Seoul HQ'}
          time="10:00"
          note={ko ? '오전' : 'morning'}
        />
        <div className="relative pb-2 md:pb-3">
          <svg viewBox="0 0 400 112" className="block h-auto w-full overflow-visible" aria-hidden>
            <path d={ARC} fill="none" stroke="currentColor" className="text-white/15" strokeWidth="1.5" strokeDasharray="2 6" />
            <path className="ul-tz-arc" d={ARC} pathLength={1} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="104" r="4.5" fill="var(--gold)" />
            <circle className="ul-tz-dot" cx="390" cy="104" r="5.5" fill="var(--gold)" />
          </svg>
          <span className="ul-tz-chip absolute left-1/2 top-[6%] inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] md:text-[12px] font-medium text-ink">
            <Video className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
            {ko ? '화상 미팅' : 'Video call'}
          </span>
        </div>
        <Endpoint
          tag="NEW JERSEY · ET"
          place={ko ? '뉴저지 팀' : 'New Jersey team'}
          time="21:00"
          note={ko ? '전날 저녁' : 'previous evening'}
          right
        />
      </div>
      <figcaption className="mx-auto mt-8 max-w-xl text-center">
        <p className="text-[15px] md:text-[17px] leading-[1.6] text-graphite">
          {ko
            ? '본사 업무 시간에 맞춰 화상 회의를 하고, 진행 상황은 한국어로 보고드립니다.'
            : 'We meet during your HQ office hours and report progress in Korean or English.'}
        </p>
        <p className="mt-2 text-[12px] text-ash">
          {ko
            ? '미국 서머타임 기간 기준이며, 겨울에는 뉴저지 시간이 20:00입니다.'
            : 'US daylight-saving time shown; in winter it is 20:00 in New Jersey.'}
        </p>
      </figcaption>
    </figure>
  )
}

function Endpoint({ tag, place, time, note, right }: { tag: string; place: string; time: string; note: string; right?: boolean }) {
  return (
    <div className={right ? 'text-right' : 'text-left'}>
      <p className="text-[10px] md:text-[11px] font-medium tracking-[0.14em] text-ash">{tag}</p>
      <p className="mt-1 text-[12px] md:text-[15px] text-graphite">{place}</p>
      <p className="mt-2 text-[30px] md:text-[56px] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">{time}</p>
      <p className="mt-2 text-[11px] md:text-[13px] text-ash">{note}</p>
    </div>
  )
}
