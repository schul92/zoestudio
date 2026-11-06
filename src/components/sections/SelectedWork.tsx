import Image from 'next/image'
import Link from 'next/link'

export type Project = {
  name: string
  industry: { en: string; ko: string }
  location: string
  year: string
  disciplines: { en: string[]; ko: string[] }
  image: string
  url?: string
  /** 'in-progress': signed and in build, badge and no live link until launch. 'new': recently launched, NEW badge. */
  status?: 'in-progress' | 'new'
  /** Blog slug of the project's case study, linked from the card. */
  caseStudy?: string
}

export const projects: Project[] = [
  {
    name: 'EndoPia',
    industry: { en: 'Medical device · U.S. launch', ko: '의료기기 · 미국 런칭' },
    location: 'United States',
    year: '2026',
    disciplines: {
      en: ['Web design', 'Product storytelling', 'SEO'],
      ko: ['웹디자인', '제품 스토리텔링', 'SEO'],
    },
    image: '/portfolio/endopia.jpg',
    url: 'https://endopiaglobal.com/',
  },
  {
    name: 'Seoul Choice Dental',
    industry: { en: 'Dental clinic · New website', ko: '치과의원 · 홈페이지 리뉴얼' },
    location: 'Seoul · Korea',
    year: '2026',
    disciplines: {
      en: ['Web design', '4 languages', 'Naver & Google search'],
      ko: ['웹디자인', '4개 국어', '네이버·구글 검색'],
    },
    image: '/portfolio/seoul-choice-dental-live.jpg',
    url: 'https://www.seoulchoicedent.com/',
    status: 'new',
    caseStudy: 'seoul-dental-clinic-website-case-study',
  },
  {
    name: 'TJ Flowers',
    industry: { en: 'Floral studio', ko: '플라워 스튜디오' },
    location: 'Manhattan · NY',
    year: '2023',
    disciplines: {
      en: ['Brand', 'Commerce'],
      ko: ['브랜드', '커머스'],
    },
    image: '/portfolio/tj-flowers.jpg',
  },
  {
    name: "Vito's Pizza",
    industry: { en: 'Italian restaurant', ko: '이탈리안 레스토랑' },
    location: 'Alpharetta · GA',
    year: '2026',
    disciplines: {
      en: ['Web design', 'Local SEO', 'Online ordering'],
      ko: ['웹디자인', '로컬 SEO', '온라인 주문'],
    },
    image: '/portfolio/vitos-pizza.jpg',
    url: 'https://www.vitospizzaandristorante.com/',
  },
  {
    name: 'Salt & Polish',
    industry: { en: 'Wellness studio', ko: '웰니스 스튜디오' },
    location: 'Fort Lee · NJ',
    year: '2024',
    disciplines: {
      en: ['Web design', 'Local SEO', 'Booking'],
      ko: ['웹디자인', '로컬 SEO', '예약'],
    },
    image: '/portfolio/salt-polish.jpg',
  },
  {
    name: 'CareK9',
    industry: { en: 'Pet services', ko: '펫 서비스' },
    location: 'Edgewater · NJ',
    year: '2024',
    disciplines: {
      en: ['Web design', 'Booking', 'CMS'],
      ko: ['웹디자인', '예약', 'CMS'],
    },
    image: '/portfolio/carek9.jpg',
  },
  {
    name: 'Kona Coffee Donut',
    industry: { en: 'Café & bakery', ko: '카페 · 베이커리' },
    location: 'Honolulu · HI',
    year: '2024',
    disciplines: {
      en: ['Brand', 'Web design', 'Shopify'],
      ko: ['브랜드', '웹디자인', 'Shopify'],
    },
    image: '/portfolio/kona-coffee.jpg',
  },
  {
    name: 'Mochinut',
    industry: { en: 'Confectionery', ko: '디저트 브랜드' },
    location: 'Multi-city',
    year: '2023',
    disciplines: {
      en: ['E-commerce', 'Rebrand', 'Franchise'],
      ko: ['이커머스', '리브랜드', '프랜차이즈'],
    },
    image: '/portfolio/mochinut.jpg',
  },
  {
    name: 'Miguk Story',
    industry: { en: 'Editorial publication', ko: '에디토리얼 퍼블리케이션' },
    location: 'Bilingual · US',
    year: '2026',
    disciplines: {
      en: ['Editorial', 'CMS', 'Bilingual SEO'],
      ko: ['에디토리얼', 'CMS', '이중언어 SEO'],
    },
    image: '/portfolio/migukstory.jpg',
    url: 'https://migukstory.com/',
  },
]

export default function SelectedWork({
  locale = 'en',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <section id="work" className="bg-ivory section-pad" aria-labelledby="work-title">
      <div className="container-edge">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[15px] font-semibold text-gold">
              {isKo ? '작업' : 'Selected Work'}
              <span className="ml-2 text-ash font-normal tabular-nums">
                · {isKo ? `${projects.length}개 도판` : `${String(projects.length).padStart(2, '0')} plates`}
              </span>
            </p>
            <h2 id="work-title" className="mt-3 font-display text-display-lg text-ink text-balance">
              {isKo ? '한 줄로 읽는 ' : 'An index '}
              <em>{isKo ? '작업의 색인.' : 'of the work.'}</em>
            </h2>
          </div>
          <Link href={`${prefix}/portfolio`} className="btn-ghost self-start md:self-auto">
            {isKo ? '모든 작업' : 'All work'} <span aria-hidden>›</span>
          </Link>
        </div>

        <ul data-reveal-group className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <li key={p.name} className={i === 0 ? 'md:col-span-2' : ''}>
              <article className="kn-card overflow-hidden h-full flex flex-col">
                <Link href={`${prefix}/portfolio`} className="block relative aspect-[16/10] bg-bone overflow-hidden group">
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.industry.en}, ${p.location}`}
                    fill
                    sizes={i === 0 ? '(max-width: 768px) 92vw, 1200px' : '(max-width: 768px) 92vw, 600px'}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Fixed colors: the badge sits on a screenshot, so it must not flip with the theme tokens. */}
                  {p.status === 'in-progress' && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/80 text-white text-[12px] font-semibold px-3 py-1.5 backdrop-blur">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-pulse" aria-hidden />
                      {isKo ? '제작 중' : 'In progress'}
                    </span>
                  )}
                  {/* Top-right so the client's logo (top-left in most screenshots) stays visible. */}
                  {p.status === 'new' && (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[#0071E3] text-white text-[12px] font-bold tracking-[0.08em] px-3 py-1.5">
                      NEW
                    </span>
                  )}
                </Link>
                <div className="p-6 md:p-7 flex flex-col gap-3 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.035em] text-ink">{p.name}</h3>
                    <span className="text-[13px] text-ash tabular-nums">{p.year}</span>
                  </div>
                  <p className="text-[14px] text-graphite">
                    {p.industry[isKo ? 'ko' : 'en']} · {p.location}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {p.disciplines[isKo ? 'ko' : 'en'].map((d) => (
                      <li key={d} className="text-[12px] text-graphite bg-bone rounded-full px-3 py-1">{d}</li>
                    ))}
                  </ul>
                  {(p.url || p.caseStudy) && (
                    <div className="mt-auto flex flex-wrap gap-x-6">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center min-h-[44px] text-[15px] font-semibold text-link hover:underline"
                        >
                          {isKo ? '실제 사이트' : 'Visit live site'} <span aria-hidden>↗</span>
                        </a>
                      )}
                      {p.caseStudy && (
                        <Link
                          href={`${prefix}/blog/${p.caseStudy}`}
                          className="inline-flex items-center min-h-[44px] text-[15px] font-semibold text-link hover:underline"
                        >
                          {isKo ? '제작 사례 읽기' : 'Read the case study'} <span aria-hidden>›</span>
                        </Link>
                      )}
                    </div>
                  )}
                  {!p.url && p.status === 'in-progress' && (
                    <p className="mt-auto pt-2 text-[14px] font-semibold text-ash">
                      {isKo ? '오픈 준비 중' : 'Launching soon'}
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[22px] md:text-[28px] font-semibold tracking-[-0.035em] text-ink max-w-xl">
            {isKo ? '150개 이상의 프로젝트. 다음은 당신의 차례입니다.' : 'A hundred and fifty projects in. Your move.'}
          </p>
          <Link href={`${prefix}/#contact`} className="btn-ink">
            {isKo ? '프로젝트 시작' : 'Start yours'}
          </Link>
        </div>
      </div>
    </section>
  )
}
