import Image from 'next/image'
import Link from 'next/link'

/**
 * "NEW" band on the home page: client sites we just launched, each linking to the
 * live site and its case study. Newest first; drop an entry once it is no longer new
 * (it stays in Selected Work and the portfolio).
 */

type Launch = {
  name: { en: string; ko: string }
  meta: { en: string; ko: string }
  body: { en: string; ko: string }
  chips: { en: string[]; ko: string[] }
  url: string
  caseStudy: string // blog slug
  image: string
}

const NEW_LAUNCHES: Launch[] = [
  {
    name: { en: 'Seoul Choice Dental', ko: '서울초이스치과의원' },
    meta: {
      en: 'Seoul, Korea · Dental clinic · Launched November 2026',
      ko: '서울 영등포 · 치과의원 · 2026년 11월 오픈',
    },
    body: {
      en: 'A new website for a dental clinic near Dangsan and Mullae stations in Seoul: a tooth-chart home screen for picking treatments, live opening status, 19 treatment pages, and Korean, English, Japanese and Chinese versions.',
      ko: '당산역·문래역 인근 치과의원 홈페이지를 새로 만들었습니다. 치아 그림에서 진료를 고르는 첫 화면, 실시간 진료 상태, 진료별 안내 19개, 한국어·영어·일본어·중국어 4개 국어까지.',
    },
    chips: {
      en: ['4 languages · 132 pages', '19 treatment pages', 'Naver & Google search setup'],
      ko: ['4개 국어 · 132페이지', '진료 안내 19개', '네이버·구글 검색 등록'],
    },
    url: 'https://www.seoulchoicedent.com/',
    caseStudy: 'seoul-dental-clinic-website-case-study',
    image: '/portfolio/seoul-choice-dental-live.jpg',
  },
]

export default function NewLaunch({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const l10n = isKo ? 'ko' : 'en'
  const prefix = isKo ? '/ko' : ''

  return (
    <section id="new" className="bg-ivory pb-16 md:pb-24" aria-labelledby="new-title">
      <div className="container-edge">
        <div data-reveal className="flex items-center gap-3">
          {/* Fixed colors so the badge reads the same in both themes. */}
          <span className="rounded-full bg-[#0071E3] text-white text-[12px] font-bold tracking-[0.08em] px-3 py-1">NEW</span>
          <h2 id="new-title" className="text-[15px] font-semibold text-gold">
            {isKo ? '새로 오픈한 웹사이트' : 'Just launched'}
          </h2>
        </div>

        <ul data-reveal-group className="mt-6 grid gap-5 md:gap-6">
          {NEW_LAUNCHES.map((l) => (
            <li key={l.url}>
              <article className="kn-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[16/10] lg:col-span-7 bg-bone overflow-hidden"
                >
                  <Image
                    src={l.image}
                    alt={`${l.name[l10n]} — ${l.meta[l10n]}`}
                    fill
                    sizes="(max-width: 1024px) 92vw, 760px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </a>
                <div className="lg:col-span-5 p-7 md:p-10 flex flex-col gap-4">
                  <p className="text-[13px] text-ash">{l.meta[l10n]}</p>
                  <h3 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.035em] leading-[1.1] text-ink">
                    {l.name[l10n]}
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-graphite leading-relaxed">{l.body[l10n]}</p>
                  <ul className="flex flex-wrap gap-2">
                    {l.chips[l10n].map((c) => (
                      <li key={c} className="text-[12px] text-graphite bg-bone rounded-full px-3 py-1">{c}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="btn-ink">
                      {isKo ? '사이트 보기' : 'Visit the site'} <span aria-hidden>↗</span>
                    </a>
                    <Link
                      href={`${prefix}/blog/${l.caseStudy}`}
                      className="inline-flex items-center min-h-[44px] text-[15px] font-semibold text-link hover:underline"
                    >
                      {isKo ? '제작 사례 읽기' : 'Read the case study'} <span aria-hidden>›</span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
