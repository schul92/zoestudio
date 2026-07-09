'use client'

import InView from '@/components/ui/motion/InView'
import CountUp from '@/components/ui/motion/CountUp'
import ScrubText from '@/components/ui/motion/ScrubText'

const metrics = [
  {
    label: { en: 'Average organic traffic lift', ko: '평균 유기 트래픽 증가' },
    value: '312',
    suffix: '%',
    sub: { en: 'within 90 days', ko: '90일 이내' },
    chart: [8, 12, 14, 20, 28, 42, 60, 78, 100] as number[],
  },
  {
    label: { en: 'Page speed (Lighthouse)', ko: '페이지 속도 (Lighthouse)' },
    value: '98',
    suffix: '/100',
    sub: { en: 'median across launches', ko: '런칭 기준 중앙값' },
    chart: [92, 95, 94, 96, 97, 97, 98, 98, 98] as number[],
  },
  {
    label: { en: 'Conversion uplift', ko: '전환율 상승' },
    value: '2.4',
    suffix: '×',
    sub: { en: 'vs. prior site', ko: '이전 사이트 대비' },
    chart: [10, 12, 18, 22, 28, 36, 48, 58, 72] as number[],
  },
]

export default function Proof({
  locale = 'en',
  sectionNumber = '04',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'

  return (
    <section className="relative bg-ivory section-pad hair-bottom overflow-hidden">
      <div className="container-edge">
        {/* Head */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-20 md:mb-24">
          <div className="md:col-span-5">
            <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
              <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
              <span className="h-px w-10 bg-hairline" />
              <span>{isKo ? '실제 결과' : 'In the numbers'}</span>
            </InView>
            <h2 className="font-display text-display-lg text-ink tracking-luxury">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{isKo ? '디자인은 기본,' : 'Craft is table stakes.'}</span>
              </InView>
              <InView as="span" className="mask-row" delay={150}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {isKo ? '결과가 증거입니다.' : 'Results prove the work.'}
                </span>
              </InView>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-16">
            {/* Scroll-scrubbed statement: words light up as the reader arrives. */}
            <ScrubText className="text-body-lg text-graphite leading-[1.7] max-w-xl">
              {isKo
                ? '아름다운 디자인은 시작일 뿐. 우리의 작업은 검색에서 발견되고, 방문자를 고객으로 전환하는 사이트를 만들어냅니다.'
                : 'Beautiful design is a beginning. Our engagements deliver sites that get found in search and turn visitors into customers.'}
            </ScrubText>
          </div>
        </div>

        {/* Metric tiles with micro-charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {metrics.map((m, i) => (
            <InView
              key={m.value + i}
              className="reveal relative p-8 md:p-10 bg-bone rounded-[4px] overflow-hidden group"
              delay={i * 120}
            >
              {/* Background chart (soft) */}
              <MiniChart
                points={m.chart}
                className="absolute inset-x-0 bottom-0 w-full h-[60%] text-gold/25 group-hover:text-gold/50 transition-colors duration-700"
              />

              <div className="relative z-10">
                <p className="overline text-ash mb-4">
                  {m.label[locale as 'en' | 'ko']}
                </p>
                <div className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none text-ink tracking-luxury">
                  <CountUp value={m.value} duration={1600} />
                  <span className="italic font-light text-gold">{m.suffix}</span>
                </div>
                <p className="mt-4 text-[12px] text-ash uppercase tracking-wider">
                  {m.sub[locale as 'en' | 'ko']}
                </p>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniChart({
  points,
  className = '',
}: {
  points: number[]
  className?: string
}) {
  const max = Math.max(...points)
  const w = 400
  const h = 120
  const step = w / (points.length - 1)
  const poly = points
    .map((p, i) => `${i * step},${h - (p / max) * h * 0.9 - 4}`)
    .join(' ')
  const area = `0,${h} ${poly} ${w},${h}`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden
    >
      <polygon points={area} fill="currentColor" opacity="0.55" />
      <polyline points={poly} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - (p / max) * h * 0.9 - 4}
          r={i === points.length - 1 ? 3 : 1.5}
          fill={i === points.length - 1 ? '#B8914A' : 'currentColor'}
        />
      ))}
    </svg>
  )
}
