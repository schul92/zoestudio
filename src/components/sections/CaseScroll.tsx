import Image from 'next/image'
import Link from 'next/link'

type Step = { n: string; title: string; sub: string }

export default function CaseScroll({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const steps: Step[] = [
    {
      n: '01',
      title: isKo ? '문제 — 아름답지만 아무도 찾지 못하는 사이트' : 'The problem — beautiful, and invisible.',
      sub: isKo ? '느린 페이지, 검색 노출 없음, 주문은 전화로만.' : 'Slow pages, no search visibility, orders only by phone.',
    },
    {
      n: '02',
      title: isKo ? '재구축 — 이중언어 + Shopify' : 'The rebuild — bilingual + Shopify.',
      sub: isKo ? '6주. 모바일 우선, 구조화 데이터, 로컬 SEO까지.' : 'Six weeks. Mobile-first, structured data, local SEO.',
    },
    {
      n: '03',
      title: isKo ? '결과 — 4주 만에 $3,114 실매출' : 'The result — $3,114 in four weeks.',
      sub: isKo ? '검색 노출 5배. 이제 주문이 알아서 들어옵니다.' : 'Five times the search visibility. Orders arrive on their own.',
    },
  ]

  return (
    <section id="case-study" className="bg-ink text-white" aria-labelledby="case-title">
      <div className="container-edge py-24 md:py-36">
        <p className="text-[15px] font-semibold text-gold-soft">{isKo ? '실제 사례 연구' : 'A real case study'}</p>
        <h2 id="case-title" className="mt-3 text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.045em] leading-[1.02] text-white">
          TJ Flowers <span className="text-white/40">· Manhattan</span>
        </h2>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[18px] overflow-hidden border border-white/10 bg-[#111]">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 truncate text-[12px] text-white/40">tjflowersandevents.com</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/hero/tj-flowers-mockup.jpeg"
                    alt={isKo ? 'TJ Flowers Shopify 사이트' : 'TJ Flowers Shopify site'}
                    fill
                    sizes="(max-width: 1024px) 92vw, 720px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-5 flex flex-col gap-16 lg:gap-[28vh] lg:py-[6vh]">
            {steps.map((s) => (
              <li key={s.n} className="flex flex-col gap-3">
                <span className="text-[13px] font-medium text-white/40 tabular-nums">{s.n} / 03</span>
                <h3 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.035em] leading-[1.12] text-white text-balance">
                  {s.title}
                </h3>
                <p className="text-[17px] text-white/60 leading-relaxed">{s.sub}</p>
                {s.n === '03' && (
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    <Link href={`${prefix}/portfolio`} className="btn-ink">
                      {isKo ? '전체 작업 보기' : 'See all work'}
                    </Link>
                    <a
                      href="https://www.tjflowersandevents.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[15px] font-semibold text-gold-soft hover:underline"
                    >
                      {isKo ? '실제 사이트 방문' : 'Visit the live site'} <span aria-hidden>↗</span>
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
