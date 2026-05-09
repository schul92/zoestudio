'use client'

/**
 * Editorial blog rail — surfaces 3 most-recent blog posts on the homepage.
 * Drives traffic from the homepage (high impression count) into the content
 * engine (where most users currently never make the jump).
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

// Hand-curated list of 3 most-impactful posts to surface on the homepage.
// Update when new tentpole content ships.
const FEATURED: Post[] = [
  {
    slug: 'tj-flowers-shopify-revamp-case-study',
    title: {
      en: 'Manhattan Florist: $0 → $3,114 in 4 Weeks',
      ko: '맨해튼 플라워샵: 4주 만에 $0 → $3,114',
    },
    excerpt: {
      en: 'Real Shopify analytics from a real client. 68% from Google, $277 from ChatGPT, 38% returning customer rate.',
      ko: '실제 클라이언트의 진짜 Shopify 데이터. 68%가 구글에서, $277은 ChatGPT, 재구매율 38%.',
    },
    category: { en: 'Case Study', ko: '케이스 스터디' },
    date: '2026-05-08',
    readTime: 8,
    image: '/blog/tj-flowers-shopify-revamp-case-study.png',
  },
  {
    slug: 'korean-restaurant-own-app-vs-doordash',
    title: {
      en: 'Korean Restaurant Own App vs DoorDash',
      ko: '한식당 자체 앱 vs 도어대시',
    },
    excerpt: {
      en: 'DoorDash takes 30%. At $20K/mo delivery that is $72K/yr lost. A $14K own-app pays back in 4 months.',
      ko: '도어대시 수수료 30%. 월 $20K 배달이면 연 $72K 손실. $14K 자체 앱은 4개월이면 본전.',
    },
    category: { en: 'App Development', ko: '앱 개발' },
    date: '2026-05-07',
    readTime: 7,
    image: '/blog/korean-restaurant-own-app-vs-doordash.png',
  },
  {
    slug: 'pwa-vs-native-app-korean-smb',
    title: {
      en: 'PWA vs Native App: $4K vs $15K',
      ko: 'PWA vs 네이티브 앱: $4,000 vs $15,000',
    },
    excerpt: {
      en: 'Skip the $15K native app if a $4K PWA is enough. Decision framework for Korean SMBs.',
      ko: '$4,000 PWA로 충분하면 $15,000 네이티브 앱은 건너뛰세요. 한인 소상공업 의사결정 가이드.',
    },
    category: { en: 'App Development', ko: '앱 개발' },
    date: '2026-05-07',
    readTime: 6,
    image: '/blog/pwa-vs-native-app-korean-smb.png',
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
