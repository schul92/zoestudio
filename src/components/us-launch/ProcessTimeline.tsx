import type { CSSProperties, ReactNode } from 'react'

type L = 'en' | 'ko'
type T = { en: string; ko: string }
export type Step = { when: T; title: T; body: T; icon: ReactNode }

const delay = (ms: number) => ({ ['--ul-d' as string]: `${ms}ms` }) as CSSProperties
// The fill line runs 1.4s with the site's ease-in-out; nodes light as it reaches them.
const nodeDelay = (i: number, n: number) => 100 + Math.round((i / Math.max(1, n - 1)) * 1300)

/** Six-week plan: the line draws across (down on phones) and each step's node lights up in turn. */
export default function ProcessTimeline({ steps, locale }: { steps: Step[]; locale: L }) {
  return (
    <div data-reveal className="ul-tl">
      {/* Desktop / tablet: horizontal */}
      <div className="relative hidden md:block">
        <span className="absolute top-6 h-px bg-white/15" style={{ left: '12.5%', right: '12.5%' }} aria-hidden />
        <span className="ul-tl-fill absolute top-6 -mt-px h-[2px] bg-[var(--gold)]" style={{ left: '12.5%', right: '12.5%' }} aria-hidden />
        <ol className="relative grid grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <li key={s.title.en} className="text-center">
              <span className="ul-node relative mx-auto grid h-12 w-12 place-items-center rounded-full" style={delay(nodeDelay(i, steps.length))}>
                <span className="relative z-[1]">{s.icon}</span>
              </span>
              <p className="mt-6 text-[13px] font-semibold text-[var(--gold)]">{s.when[locale]}</p>
              <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.02em] text-ink">{s.title[locale]}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-graphite">{s.body[locale]}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Phones: vertical */}
      <div className="relative md:hidden">
        <span className="absolute left-6 top-6 bottom-10 w-px bg-white/15" aria-hidden />
        <span className="ul-tl-fill-v absolute left-6 top-6 bottom-10 -ml-px w-[2px] bg-[var(--gold)]" aria-hidden />
        <ol className="relative space-y-9">
          {steps.map((s, i) => (
            <li key={s.title.en} className="relative pl-[4.5rem]">
              <span className="ul-node absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full" style={delay(nodeDelay(i, steps.length))}>
                <span className="relative z-[1]">{s.icon}</span>
              </span>
              <p className="pt-0.5 text-[13px] font-semibold text-[var(--gold)]">{s.when[locale]}</p>
              <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-ink">{s.title[locale]}</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.65] text-graphite">{s.body[locale]}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
