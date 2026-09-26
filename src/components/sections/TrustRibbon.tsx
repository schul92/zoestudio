/**
 * Trust ribbon — the four buyer signals that matter most for Korean small-biz
 * owners landing cold. Client names live in the hero row directly above.
 */

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
    value: '150+',
    label: { en: 'Projects delivered', ko: '완료 프로젝트' },
    sub: { en: 'since 2019', ko: '2019년부터' },
  },
  {
    value: 'KO ↔ EN',
    label: { en: 'Bilingual delivery', ko: '한·영 동시 제작' },
    sub: { en: 'native both sides', ko: '양쪽 모두 네이티브' },
  },
]

export default function TrustRibbon({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'

  return (
    <section aria-label={isKo ? '신뢰 지표' : 'Trust signals'} className="bg-ivory">
      <ul className="container-edge grid grid-cols-2 md:grid-cols-4 py-16 md:py-24 gap-y-12">
        {stats.map((s, i) => (
          <li
            key={s.value}
            className={`flex flex-col items-center text-center px-4 ${i > 0 ? 'md:border-l md:border-[#D2D2D7]' : ''}`}
          >
            <span className="text-[clamp(30px,4.4vw,56px)] font-bold leading-none tracking-[-0.05em] text-ink">
              {s.value}
            </span>
            <span className="mt-3 text-[15px] font-semibold text-ink">{s.label[isKo ? 'ko' : 'en']}</span>
            {s.sub && <span className="mt-1 text-[13px] text-ash">{s.sub[isKo ? 'ko' : 'en']}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
