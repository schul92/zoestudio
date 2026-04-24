'use client'

import { useEffect, useState } from 'react'
import InView from '@/components/ui/motion/InView'
import CountUp from '@/components/ui/motion/CountUp'

type Quote = {
  text: { en: string; ko: string }
  author: string
  role: { en: string; ko: string }
  project: string
}

const quotes: Quote[] = [
  {
    text: {
      en: 'They understood what our business actually looks like on the ground — not just what the brief said. The site feels like us, and it ranks.',
      ko: '브리프에 적힌 내용이 아니라 실제 우리 비즈니스를 이해해 주셨어요. 사이트가 우리답고, 구글에서도 잘 잡힙니다.',
    },
    author: 'Sarah K.',
    role: { en: 'Owner · Fort Lee spa', ko: '대표 · 포트리 스파' },
    project: 'Salt & Polish',
  },
  {
    text: {
      en: "Bookings doubled in two months. We stopped worrying about the website and got back to running the café.",
      ko: '2개월 만에 예약이 두 배. 이제 웹사이트 걱정 없이 카페에만 집중합니다.',
    },
    author: 'Min Lee',
    role: { en: 'Co-founder · Honolulu café', ko: '공동대표 · 호놀룰루 카페' },
    project: 'Kona Coffee Purveyors',
  },
  {
    text: {
      en: 'Korean-first conversations, English-first execution. The only studio that speaks both of our worlds.',
      ko: '한국어로 대화하고, 영어로 실행합니다. 두 세상을 모두 이해하는 유일한 스튜디오.',
    },
    author: '정성호',
    role: { en: 'Director · NY floral studio', ko: '대표 · 뉴욕 플라워 스튜디오' },
    project: 'TJ Flowers',
  },
]

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
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 7000)
    return () => clearInterval(id)
  }, [])

  const q = quotes[idx]

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
            <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '아름다운 디자인은 시작일 뿐. 우리의 작업은 검색에서 발견되고, 방문자를 고객으로 전환하는 사이트를 만들어냅니다.'
                  : 'Beautiful design is a beginning. Our engagements deliver sites that get found in search and turn visitors into customers.'}
              </span>
            </InView>
          </div>
        </div>

        {/* Metric tiles with micro-charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-32">
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

        {/* Rotating testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pt-12 border-t border-hairline">
          <div className="md:col-span-2 md:pt-2">
            <span className="font-display italic font-light text-gold text-7xl leading-[0.8]">&ldquo;</span>
          </div>
          <div className="md:col-span-8">
            <blockquote
              key={idx}
              className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.25] text-ink tracking-luxury fade-in-quote"
            >
              {q.text[locale as 'en' | 'ko']}
            </blockquote>
            <div className="mt-8 flex items-center gap-4" key={`meta-${idx}`}>
              <span className="w-12 h-px bg-ink" />
              <div>
                <p className="font-display text-lg text-ink italic font-light">
                  {q.author}
                </p>
                <p className="overline text-ash mt-1">
                  {q.role[locale as 'en' | 'ko']} · {q.project}
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 md:pt-2 flex md:flex-col items-start gap-3">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                data-cursor="hide"
                aria-label={`Quote ${i + 1}`}
                className={`h-px transition-all duration-500 cursor-pointer ${
                  i === idx ? 'w-16 bg-ink' : 'w-10 bg-hairline hover:bg-ash'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-in-quote {
          animation: fadeQuote 800ms cubic-bezier(.16,1,.3,1);
        }
        @keyframes fadeQuote {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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
