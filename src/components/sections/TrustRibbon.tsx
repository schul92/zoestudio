'use client'

/**
 * Trust ribbon — high-density credibility band placed directly after the hero.
 * Carries the four buyer signals that matter most for Korean small-biz owners
 * landing cold: rating, volume, geography, language.
 */

import InView from '@/components/ui/motion/InView'

type Stat = {
  value: string
  label: { en: string; ko: string }
  sub?: { en: string; ko: string }
}

const stats: Stat[] = [
  {
    value: 'Shopify',
    label: { en: 'Expert builds', ko: 'Shopify 전문' },
    sub: { en: 'rebuild · migrate · scale', ko: '재구축 · 이전 · 확장' },
  },
  {
    value: '5×',
    label: { en: 'Search visibility', ko: '검색 노출' },
    sub: { en: 'TJ Flowers · 6 weeks', ko: 'TJ Flowers · 6주' },
  },
  {
    value: '60+',
    label: { en: 'Sites launched', ko: '런칭 사이트' },
    sub: { en: 'since 2019', ko: '2019년부터' },
  },
  {
    value: 'KO ↔ EN',
    label: { en: 'Bilingual delivery', ko: '한·영 동시 제작' },
    sub: { en: 'native both sides', ko: '양쪽 모두 네이티브' },
  },
]

const clientMarks = [
  'TJ Flowers',
  'Salt & Polish',
  'Kona Coffee',
  'CareK9',
  'Mochinut',
]

export default function TrustRibbon({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'

  return (
    <section
      aria-label={isKo ? '신뢰 지표' : 'Trust signals'}
      className="relative border-y border-black/[0.08] bg-[#f2ece2]"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-10 md:py-14">
        {/* Stats row */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-8">
          {stats.map((s, i) => (
            <InView key={i} delay={i * 70}>
              <li className="flex flex-col">
                <span className="font-display text-[clamp(28px,3.4vw,44px)] leading-none tracking-[-0.02em] text-[#151414]">
                  {s.value}
                </span>
                <span className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[#3a3836]">
                  {s.label[isKo ? 'ko' : 'en']}
                </span>
                {s.sub && (
                  <span className="mt-1 text-[12px] text-[#8a8378]">
                    {s.sub[isKo ? 'ko' : 'en']}
                  </span>
                )}
              </li>
            </InView>
          ))}
        </ul>

        {/* Client marks row */}
        <div className="mt-10 md:mt-14 pt-8 border-t border-black/[0.06]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a8378] mb-5">
            {isKo ? '함께한 브랜드' : 'Selected clients'}
          </p>
          <ul className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 items-center">
            {clientMarks.map((m) => (
              <li
                key={m}
                className="font-display italic text-[15px] md:text-[17px] text-[#3a3836]"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
