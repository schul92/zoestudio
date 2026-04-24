'use client'

import Image from 'next/image'
import Link from 'next/link'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'
import CountUp from '@/components/ui/motion/CountUp'
import type { Industry, IconId } from '@/data/industriesData'

export default function IndustryPage({
  industry,
  locale = 'en',
}: {
  industry: Industry
  locale?: 'en' | 'ko'
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <main className="bg-ivory text-ink overflow-x-hidden">
      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="relative hair-bottom pt-32 md:pt-48 pb-20 md:pb-28">
        {/* Soft radial halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-70"
          style={{
            background: `radial-gradient(60% 40% at 50% 0%, ${industry.accent}55, transparent 70%)`,
          }}
        />

        <div className="container-edge relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 overline text-ash mb-10 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">
              {isKo ? '홈' : 'Home'}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={`${prefix}/industries`} className="hover:text-ink transition-colors">
              {isKo ? '업종' : 'Industries'}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{industry.name[locale]}</span>
          </nav>

          <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
            <span className="section-num not-italic text-ink font-normal">§</span>
            <span className="h-px w-10 bg-hairline" />
            <span>{industry.eyebrow[locale]}</span>
          </InView>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <h1 className="lg:col-span-8 font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[0.98] tracking-luxury text-ink">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{industry.headline[locale][0]}</span>
              </InView>
              <InView as="span" className="mask-row" delay={140}>
                <span className="mask-rise block italic font-light text-gold fraunces-soft">
                  {industry.headline[locale][1]}
                </span>
              </InView>
            </h1>

            <InView as="p" className="reveal lg:col-span-4 text-body-lg text-graphite leading-[1.7]">
              <span>{industry.intro[locale]}</span>
            </InView>
          </div>

          {/* CTAs */}
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-5">
            <Magnetic strength={14}>
              <Link
                href={`${prefix}/#contact`}
                data-cursor={isKo ? '시작' : 'Begin'}
                className="btn-ink"
              >
                {isKo ? '상담 요청' : 'Start a conversation'}
                <span className="arrow">→</span>
              </Link>
            </Magnetic>
            <Link
              href={`${prefix}/portfolio`}
              data-cursor="view"
              className="btn-ghost"
            >
              {isKo ? '작업 둘러보기' : 'See recent work'}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────── */}
      <section className="hair-bottom bg-bone">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {industry.stats.map((s, i) => (
              <InView
                key={i}
                className="reveal py-10 md:py-14 px-0 md:px-10 first:pl-0 last:pr-0"
                delay={i * 100}
              >
                <div className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none text-ink tracking-luxury">
                  <CountUp value={s.num} duration={1600} />
                  <span className="italic font-light text-gold">{s.suf}</span>
                </div>
                <div className="mt-4 overline text-ash max-w-[28ch]">
                  {s.label[locale]}
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEMS GRID ───────────────────────────────── */}
      <section className="section-pad hair-bottom">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-20">
            <div className="md:col-span-5">
              <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num not-italic text-ink font-normal">§ 01</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '자주 겪는 문제' : 'The problems'}</span>
              </InView>
              <h2 className="font-display text-display-lg text-ink tracking-luxury">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{isKo ? '지금 일어나고' : "What's breaking"}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? '있는 일들.' : 'right now.'}
                  </span>
                </InView>
              </h2>
            </div>
            <InView as="p" className="reveal md:col-span-6 md:col-start-7 md:pt-16 text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '당신의 업종에서 우리가 매번 고치는 네 가지. 하나라도 익숙하다면 — 함께 해결할 수 있습니다.'
                  : 'Four patterns we fix in every engagement in your industry. If any of them sound familiar — we can solve them together.'}
              </span>
            </InView>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {industry.problems.map((p, i) => (
              <InView
                key={i}
                className="reveal group relative p-7 md:p-10 rounded-[2px] bg-bone hair-y overflow-hidden"
                delay={(i % 2) * 100}
              >
                <div className="flex items-start gap-5 md:gap-7">
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full border border-hairline flex items-center justify-center text-ink group-hover:border-gold group-hover:text-gold transition-colors duration-500">
                    <Icon id={p.icon} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] leading-[1.2] tracking-luxury text-ink fraunces-soft">
                      {p.title[locale]}
                    </h3>
                    <p className="mt-3 text-[14px] md:text-body text-graphite leading-[1.7]">
                      {p.body[locale]}
                    </p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES (numbered grid) ────────────────────── */}
      <section className="section-pad hair-bottom bg-bone">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-20">
            <div className="md:col-span-5">
              <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num not-italic text-ink font-normal">§ 02</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '우리가 만드는 것' : "What we build"}</span>
              </InView>
              <h2 className="font-display text-display-lg text-ink tracking-luxury">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{isKo ? '완성된 솔루션이' : 'Every site we'}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? '포함됩니다.' : 'ship includes.'}
                  </span>
                </InView>
              </h2>
            </div>
            <InView as="p" className="reveal md:col-span-6 md:col-start-7 md:pt-16 text-body-lg text-graphite leading-[1.7] max-w-xl">
              <span>
                {isKo
                  ? '업종별로 공통적으로 필요한 기능들. 모든 프로젝트에 포함됩니다 — 추가 패키지나 "옵션"이 아닙니다.'
                  : 'The common features this industry actually needs. Included in every engagement — not "add-on packages" or "upgrades".'}
              </span>
            </InView>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-14">
            {industry.features.map((f, i) => (
              <InView as="li" key={i} className="reveal group" delay={(i % 3) * 80}>
                <div className="flex items-baseline gap-4 mb-4 pb-4 border-b border-hairline">
                  <span className="section-num text-2xl md:text-3xl group-hover:text-gold transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.2] tracking-luxury text-ink fraunces-soft">
                    {f.title[locale]}
                  </h3>
                </div>
                <p className="text-[14px] text-graphite leading-[1.7]">
                  {f.body[locale]}
                </p>
              </InView>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CASE STUDY PULL ─────────────────────────────── */}
      <section className="hair-bottom section-pad">
        <div className="container-edge">
          <InView className="flex items-center gap-3 overline text-ash mb-10 hair-draw pb-4 max-w-sm">
            <span className="section-num not-italic text-ink font-normal">§ 03</span>
            <span className="h-px w-10 bg-hairline" />
            <span>{isKo ? '실제 사례' : 'In practice'}</span>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <InView>
                <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25] text-ink tracking-luxury fraunces-soft">
                  <span className="text-gold italic font-light text-5xl md:text-6xl leading-none align-top mr-2">&ldquo;</span>
                  {industry.caseStudy.quote[locale]}
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <span className="w-12 h-px bg-ink" />
                  <div>
                    <p className="font-display text-lg text-ink italic font-light">
                      {industry.caseStudy.author}
                    </p>
                    <p className="overline text-ash mt-1">
                      {industry.caseStudy.role[locale]} · {industry.caseStudy.project}
                    </p>
                  </div>
                </div>
              </InView>
            </div>

            <div className="md:col-span-6 order-1 md:order-2">
              <InView className="reveal relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-[2px] bg-bone">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(70% 60% at 50% 50%, ${industry.caseStudy.image ? 'transparent' : industry.accent + '55'}, transparent 80%)`,
                  }}
                />
                <div className="absolute inset-4 md:inset-6 overflow-hidden">
                  <Image
                    src={industry.caseStudy.image}
                    alt={industry.caseStudy.project}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Corner marks */}
                <span aria-hidden className="absolute top-5 right-5" style={{ width: 14, height: 14, borderTop: '1px solid rgba(20,20,20,0.3)', borderRight: '1px solid rgba(20,20,20,0.3)' }} />
                <span aria-hidden className="absolute bottom-5 left-5" style={{ width: 14, height: 14, borderBottom: '1px solid rgba(20,20,20,0.3)', borderLeft: '1px solid rgba(20,20,20,0.3)' }} />
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section className="section-pad hair-bottom bg-bone">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-4">
              <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num not-italic text-ink font-normal">§ 04</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '자주 묻는 질문' : 'Common questions'}</span>
              </InView>
              <h2 className="font-display text-display-lg text-ink tracking-luxury">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{isKo ? '직접 물어보신' : 'Asked before'}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {isKo ? '질문들.' : 'you ask.'}
                  </span>
                </InView>
              </h2>
            </div>

            <dl className="md:col-span-8">
              {industry.faqs.map((f, i) => (
                <InView
                  as="div"
                  key={i}
                  className="reveal py-7 md:py-8 border-b border-hairline first:border-t first:hair-top"
                  delay={i * 60}
                >
                  <dt className="flex items-start gap-4">
                    <span className="section-num text-sm mt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.3] text-ink fraunces-soft">
                      {f.q[locale]}
                    </span>
                  </dt>
                  <dd className="mt-4 ml-12 text-[14px] md:text-body text-graphite leading-[1.75]">
                    {f.a[locale]}
                  </dd>
                </InView>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-8">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-luxury text-ink fraunces-soft">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block italic font-light text-gold">
                    {industry.cta[locale]}
                  </span>
                </InView>
              </h2>
              <p className="mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                {isKo
                  ? '30분 대화면 충분합니다. 무엇을 만들고 계신지, 예산 범위, 일정 — 그 안에서 어떤 모양이 나올지 함께 그려봅니다.'
                  : 'Thirty minutes is enough. What you\'re building, rough budget, rough timeline — and together we sketch what\'s possible inside it.'}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right flex flex-col sm:flex-row md:flex-col md:items-end gap-4">
              <Magnetic strength={14}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={isKo ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {isKo ? '프로젝트 의뢰' : 'Start a project'}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
              <Link
                href={`${prefix}/portfolio`}
                data-cursor="view"
                className="btn-ghost"
              >
                {isKo ? '포트폴리오' : 'Selected work'}
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── Compact editorial SVG icons ──────────────────────────── */

function Icon({ id }: { id: IconId }) {
  const s = 24
  const stroke = 'currentColor'
  switch (id) {
    case 'clock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.1" />
          <path d="M12 7v5l3 2" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'phone':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'calendar':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="5" width="16" height="15" rx="1" stroke={stroke} strokeWidth="1.1" />
          <path d="M4 9h16M8 3v4M16 3v4" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'search':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="6" stroke={stroke} strokeWidth="1.1" />
          <path d="M20 20l-4.5-4.5" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )
    case 'translate':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6h8M7 4v2M5 6c0 5 6 8 6 8M11 6s-1 8-8 12" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 20l3-7 3 7M14.5 17h3" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'review':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5L12 16.8 7.1 19.2l.9-5.5-4-3.9L9.5 9 12 4z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'cart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 4h2l2 12h12l2-8H7" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="1.3" stroke={stroke} strokeWidth="1.1" />
          <circle cx="17" cy="20" r="1.3" stroke={stroke} strokeWidth="1.1" />
        </svg>
      )
    case 'location':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.5" stroke={stroke} strokeWidth="1.1" />
        </svg>
      )
    case 'palette':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.3-1-2.3s.8-1.7 1.7-1.7H17a4 4 0 004-4c0-5-4-8.5-9-8.5z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
          <circle cx="7.5" cy="11" r="1" fill={stroke} />
          <circle cx="11" cy="7" r="1" fill={stroke} />
          <circle cx="15.5" cy="8" r="1" fill={stroke} />
        </svg>
      )
    case 'chat':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 5h16v11H9l-5 4V5z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'chart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <polyline points="4,18 9,13 13,15 20,7" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="7" r="1.3" fill={stroke} />
        </svg>
      )
    case 'lock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="9" rx="1.5" stroke={stroke} strokeWidth="1.1" />
          <path d="M8 11V8a4 4 0 018 0v3" stroke={stroke} strokeWidth="1.1" />
        </svg>
      )
    case 'heart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'shield':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      )
    case 'mobile':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="7" y="3" width="10" height="18" rx="2" stroke={stroke} strokeWidth="1.1" />
          <circle cx="12" cy="18" r="0.8" fill={stroke} />
        </svg>
      )
  }
}
