'use client'

/**
 * Editorial blog rail — surfaces 6 strategically-chosen blog posts on the
 * homepage. Drives traffic from the homepage (high impression count) into the
 * content engine, with descriptive anchor text that compounds the rankings
 * of underperforming page-1 posts.
 *
 * Selection logic: 1 case study + 2 high-CTR-leak page-1 posts + 1 city/SEO
 * comparison + 2 evergreen-topic anchors. Updated when new tentpole ships.
 */

import Link from 'next/link'
import Image from 'next/image'
import InView from '@/components/ui/motion/InView'

type Post = {
  slug: string
  title: { en: string; ko: string }
  excerpt: { en: string; ko: string }
  category: { en: string; ko: string }
  date: string
  readTime: number
  image: string
}

// Hand-curated 6-card grid. Each anchor is descriptive (not "Read more")
// and points at a high-impression-but-low-CTR or rising-tide page so the
// homepage's organic authority compounds into the deep-page rankings.
const FEATURED: Post[] = [
  {
    slug: 'tj-flowers-shopify-revamp-case-study',
    title: {
      en: 'Manhattan florist earned $3,114 + $277 from ChatGPT in 4 weeks',
      ko: '맨해튼 플라워샵: 4주 만에 $3,114 + ChatGPT에서 $277',
    },
    excerpt: {
      en: 'Real Shopify analytics from a real client. 68% from Google organic, $277 from ChatGPT, 38% returning customer rate. Bot traffic excluded.',
      ko: '실제 Shopify 데이터. 매출의 68%가 구글 자연검색, $277이 ChatGPT, 재구매율 38%. 봇 트래픽 제외.',
    },
    category: { en: 'Case Study', ko: '케이스 스터디' },
    date: '2026-05-08',
    readTime: 8,
    image: '/blog/tj-flowers-shopify-revamp-case-study.png',
  },
  {
    slug: 'kakaotalk-channel-us-korean-business',
    title: {
      en: 'Open a KakaoTalk Channel from the US in 20 minutes (no Korean phone)',
      ko: '미국에서 카카오톡 채널 20분 만에 만들기 (한국 번호 없이)',
    },
    excerpt: {
      en: '85% of Korean-Americans use KakaoTalk daily. Step-by-step setup, ads, broadcasts, website integration — without a Korean phone number.',
      ko: '미주 한인 85%가 매일 쓰는 카카오톡. 한국 번호 없이 비즈니스 채널 설정, 광고, 단체 메시지, 웹사이트 연동까지.',
    },
    category: { en: 'Marketing', ko: '마케팅' },
    date: '2026-04-11',
    readTime: 7,
    image: '/blog/kakaotalk-channel-us-korean-business.png',
  },
  {
    slug: 'korean-restaurant-own-app-vs-doordash',
    title: {
      en: 'Korean restaurant own app vs DoorDash: $14K pays back in 4 months',
      ko: '한식당 자체 앱 vs 도어대시: $14K가 4개월 만에 본전',
    },
    excerpt: {
      en: 'DoorDash takes 30%. At $20K/mo delivery that is $72K/yr lost. A $14K own-app pays back in 4 months if you migrate 40% of repeat orders.',
      ko: '도어대시 수수료 30%. 월 $20K 배달이면 연 $72K 손실. 재주문의 40%를 자체 앱으로 옮기면 4개월이면 본전.',
    },
    category: { en: 'App Development', ko: '앱 개발' },
    date: '2026-05-07',
    readTime: 7,
    image: '/blog/korean-restaurant-own-app-vs-doordash.png',
  },
  {
    slug: 'do-i-need-a-website-korean-business',
    title: {
      en: '7 signs your Korean business loses sales without a website',
      ko: '한인 비즈니스가 웹사이트 없이 매출을 잃는 7가지 신호',
    },
    excerpt: {
      en: 'Instagram and Naver alone cost Korean-American businesses ~30% of new customers. Honest framework for when a website pays for itself.',
      ko: '인스타와 네이버만 운영하면 한인 비즈니스는 신규 고객의 30%를 잃습니다. 웹사이트가 비용을 회수하는 시점을 정직하게.',
    },
    category: { en: 'Foundations', ko: '기초 가이드' },
    date: '2026-04-15',
    readTime: 9,
    image: '/blog/do-i-need-a-website-korean-business.png',
  },
  {
    slug: 'instagram-vs-website-korean-business',
    title: {
      en: 'Instagram vs website for Korean small business — the honest tradeoff',
      ko: '인스타그램 vs 웹사이트 — 한인 자영업자의 솔직한 비교',
    },
    excerpt: {
      en: 'Instagram has zero discovery from Google or ChatGPT. Korean SMBs that rely only on it cannot rank for "Korean BBQ near me" or any AI search query.',
      ko: '인스타그램은 구글·ChatGPT 검색에 노출되지 않습니다. 인스타만 운영하면 "Korean BBQ near me" 같은 검색에 우리 가게가 절대 안 나옵니다.',
    },
    category: { en: 'Foundations', ko: '기초 가이드' },
    date: '2026-03-15',
    readTime: 8,
    image: '/blog/instagram-vs-website-korean-business.png',
  },
  {
    slug: 'local-seo-guide-korean-business-2026',
    title: {
      en: 'Local SEO for Korean businesses — 9-step playbook [2026]',
      ko: '한인 비즈니스 로컬 SEO 9단계 플레이북 [2026]',
    },
    excerpt: {
      en: '9-step local SEO playbook for Korean restaurants, salons, and shops in NJ/NY/LA. Rank in Google Maps, fix duplicate listings, win Korean reviews.',
      ko: '한인 식당·살롱·소매점을 위한 9단계 로컬 SEO 플레이북. 구글 지도 상위 노출, 중복 리스팅 정리, 한국어 리뷰 확보.',
    },
    category: { en: 'SEO', ko: 'SEO' },
    date: '2026-04-18',
    readTime: 10,
    image: '/blog/local-seo-guide-korean-business-2026.png',
  },
]

export default function BlogRail({
  locale = 'en',
  sectionNumber = '05',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(isKo ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <section className="hair-bottom py-24 md:py-32 bg-ivory">
      <div className="container-edge">
        {/* Section header */}
        <InView className="flex items-center gap-3 overline text-ash mb-8 hair-draw pb-4">
          <span className="section-num not-italic text-ink font-normal">§ {sectionNumber}</span>
          <span className="h-px w-10 bg-hairline" />
          <span>{isKo ? '저널' : 'Journal'}</span>
        </InView>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end mb-12 md:mb-16">
          <h2 className="md:col-span-8 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-luxury text-ink m-0">
            {isKo ? (
              <>
                실전 사례와{' '}
                <span className="italic font-light text-gold">정직한 숫자.</span>
              </>
            ) : (
              <>
                Real cases,{' '}
                <span className="italic font-light text-gold">honest numbers.</span>
              </>
            )}
          </h2>
          <p className="md:col-span-4 text-graphite leading-[1.6]">
            {isKo
              ? '실제 클라이언트 데이터, 앱 개발 비용 가이드, 한인 비즈니스를 위한 SEO 전략 — 모두 우리 작업장에서 직접 작성합니다.'
              : 'Real client data, app development cost guides, and SEO strategy for Korean-American businesses — all written from our actual work.'}
          </p>
        </div>

        {/* 3-up grid */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURED.map((post, i) => (
            <InView key={post.slug} delay={i * 80}>
              <li>
                <Link
                  href={`${prefix}/blog/${post.slug}`}
                  className="group block h-full"
                >
                  {/* Hero image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-bone mb-5">
                    <Image
                      src={post.image}
                      alt={post.title[isKo ? 'ko' : 'en']}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 overline text-ash mb-3">
                    <span>{post.category[isKo ? 'ko' : 'en']}</span>
                    <span className="opacity-50">·</span>
                    <span>{formatDate(post.date)}</span>
                    <span className="opacity-50">·</span>
                    <span>
                      {post.readTime} {isKo ? '분' : 'min'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.2] tracking-luxury text-ink mb-3 group-hover:text-gold transition-colors">
                    {post.title[isKo ? 'ko' : 'en']}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[15px] text-graphite leading-[1.6] mb-4">
                    {post.excerpt[isKo ? 'ko' : 'en']}
                  </p>

                  {/* Read more */}
                  <span className="inline-flex items-center gap-2 text-[13px] text-ink border-b border-ink/30 group-hover:border-ink pb-1">
                    {isKo ? '읽기' : 'Read'}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            </InView>
          ))}
        </ul>

        {/* All posts link */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-hairline flex items-center justify-between">
          <p className="text-[13px] text-graphite">
            {isKo ? '전체 저널' : 'All journal entries'}
          </p>
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 text-[14px] text-ink border-b border-ink/30 hover:border-ink pb-1"
          >
            {isKo ? '저널 전체 보기' : 'See all posts'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
