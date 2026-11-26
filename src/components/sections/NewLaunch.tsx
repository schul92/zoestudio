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
  caseStudy?: string // blog slug
  b2b?: boolean // sells to other businesses: B2B label before the meta line
  image: string
}

const NEW_LAUNCHES: Launch[] = [
  {
    name: { en: 'Nailism', ko: 'Nailism (네일리즘)' },
    meta: {
      en: 'Saddle Brook, New Jersey · Salon furniture maker · Launched November 2026',
      ko: '미국 뉴저지 새들브룩 · 네일살롱 가구 제조 · 2026년 11월 오픈',
    },
    body: {
      en: 'A new website for a maker of custom pedicure spas and nail salon furniture, with a factory in New Jersey and showrooms in Saddle Brook, NJ and Flushing, NY: 244 designs the company has built, sorted into 11 categories with a quote request on each, a materials page with vinyl colour charts, and English, Korean and Spanish versions for salon owners.',
      ko: '뉴저지에 공장을 둔 맞춤 페디큐어 스파·네일살롱 가구 제조사의 홈페이지를 새로 만들었습니다. 직접 제작한 디자인 244개를 11개 카테고리로 정리하고 디자인마다 견적 요청을 붙였고, 비닐 색상표가 있는 자재 페이지, 뉴저지 새들브룩·뉴욕 플러싱 쇼룸 안내, 살롱 오너를 위한 영어·한국어·스페인어 3개 국어까지.',
    },
    chips: {
      en: ['3 languages · 132 pages', '244 designs · 11 categories', 'Quote request on every design'],
      ko: ['3개 국어 · 132페이지', '디자인 244개 · 11개 카테고리', '디자인마다 견적 요청'],
    },
    url: 'https://www.nailismusa.com/',
    image: '/portfolio/nailism-live.jpg',
    b2b: true,
  },
  {
    name: { en: 'TopSkin Clinic Med Spa', ko: 'TopSkin Clinic Med Spa' },
    meta: {
      en: 'Duluth, Georgia · Med spa · Launched November 2026',
      ko: '미국 조지아 둘루스 · 메드스파 · 2026년 11월 오픈',
    },
    body: {
      en: 'A new website for a K-beauty med spa in Duluth, Georgia: treatments sorted by skin concern, the clinic’s own before-and-after photos with a drag-to-compare slider, a 3D map to the suite, and English, Korean and Vietnamese versions.',
      ko: '조지아주 둘루스의 K-뷰티 메드스파 홈페이지를 새로 만들었습니다. 피부 고민별로 나눈 시술 안내, 클리닉이 직접 시술한 환자의 전후 사진(드래그로 비교), 클리닉까지 안내하는 3D 지도, 영어·한국어·베트남어 3개 국어까지.',
    },
    chips: {
      en: ['3 languages · 36 pages', '6 treatment pages', 'Real before & after'],
      ko: ['3개 국어 · 36페이지', '고민별 시술 안내 6개', '실제 환자 전후 사진'],
    },
    url: 'https://www.topskinclinicmedspa.com/',
    caseStudy: 'med-spa-website-case-study-duluth-ga',
    image: '/portfolio/topskin-clinic-live.jpg',
  },
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
                  <p className="text-[13px] text-ash flex flex-wrap items-center gap-x-2 gap-y-1">
                    {l.b2b && (
                      // Fixed colors so the label reads the same in both themes.
                      <span className="rounded-full bg-[#1d1d1f] text-white text-[11px] font-bold tracking-[0.08em] px-2.5 py-0.5">B2B</span>
                    )}
                    {l.meta[l10n]}
                  </p>
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
                    {l.caseStudy && (
                      <Link
                        href={`${prefix}/blog/${l.caseStudy}`}
                        className="inline-flex items-center min-h-[44px] text-[15px] font-semibold text-link hover:underline"
                      >
                        {isKo ? '제작 사례 읽기' : 'Read the case study'} <span aria-hidden>›</span>
                      </Link>
                    )}
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
