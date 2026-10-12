import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { projects } from '@/components/sections/SelectedWork'
import { SITE_URL } from '@/lib/siteUrl'

// Independent review profiles (same URLs as the Organization schema's sameAs / the Yelp listing).
const GOOGLE_REVIEWS = 'https://maps.google.com/maps?cid=423025541319098436'
const YELP = 'https://www.yelp.com/biz/zoe-lumos-fort-lee'

/**
 * 2026-10-11: this page used to show six testimonials that could not be tied to any real client, plus
 * "5-star / 100% satisfaction" badges. It now shows only verifiable proof: the real client list (shared
 * with the homepage), published case studies, and links to independent review platforms.
 */

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const ko = params.locale === 'ko'
  const url = `${SITE_URL}${ko ? '/ko' : ''}/reviews`
  const title = ko ? '고객 사례·리뷰 | ZOE LUMOS' : 'Client Work & Reviews | ZOE LUMOS'
  const description = ko
    ? '조이루모스가 작업한 실제 고객(EndoPia, TJ Flowers, Vito’s Pizza, Salt & Polish 등)과 구글·Yelp 독립 리뷰 링크.'
    : 'Real client work by ZOE LUMOS (EndoPia, TJ Flowers, Vito’s Pizza, Salt & Polish and more) and links to independent reviews on Google and Yelp.'
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { 'x-default': `${SITE_URL}/reviews`, en: `${SITE_URL}/reviews`, ko: `${SITE_URL}/ko/reviews` },
    },
    openGraph: { title, description, url, siteName: 'ZOE LUMOS', locale: ko ? 'ko_KR' : 'en_US', type: 'website' },
    robots: { index: true, follow: true },
  }
}

export default function ReviewsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const ko = locale === 'ko'
  const prefix = ko ? '/ko' : ''

  const caseStudies = [
    {
      href: `${prefix}/blog/tj-flowers-shopify-revamp-case-study`,
      title: ko ? 'TJ Flowers — Shopify 리빌드 사례' : 'TJ Flowers — Shopify rebuild case study',
      body: ko ? '맨해튼 플라워샵의 Shopify 리빌드와 검색 노출 변화를 실제 수치로 정리했습니다.' : 'A Manhattan florist’s Shopify rebuild and what changed in search, with the real numbers.',
    },
    {
      href: `${prefix}/blog/website-drives-revenue-pizza-catering-case-study-2026`,
      title: ko ? 'Vito’s Pizza — 웹사이트와 케이터링 주문' : 'Vito’s Pizza — website and catering orders',
      body: ko ? '전환 추적과 사장님 대시보드로 가장 큰 주문을 찾아낸 과정입니다.' : 'How conversion tracking and an owner dashboard surfaced the highest-value orders.',
    },
  ]

  return (
    <>
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        <section className="container-edge pt-32 md:pt-44 pb-12 md:pb-16">
          <nav className="mb-8 flex flex-wrap items-center gap-2 overline text-ash" aria-label={ko ? '경로' : 'Breadcrumb'}>
            <Link href={prefix || '/'} className="transition-colors hover:text-ink">{ko ? '홈' : 'Home'}</Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{ko ? '고객 사례·리뷰' : 'Client work & reviews'}</span>
          </nav>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.06] tracking-luxury text-ink max-w-4xl">
            {ko ? '고객 사례와 리뷰' : 'Client work and reviews'}
          </h1>
          <p className="mt-7 max-w-2xl text-body-lg leading-[1.7] text-graphite">
            {ko
              ? '확인할 수 있는 리뷰만 게시합니다. 리뷰는 구글과 Yelp에서 직접 확인하시고, 아래에서 저희가 작업한 실제 고객을 보세요.'
              : 'We only publish reviews you can verify. Read them on Google and Yelp, and see the businesses we have built for below.'}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="btn-ink">
              <Star className="h-4 w-4" aria-hidden />
              {ko ? '구글 리뷰 보기' : 'Google reviews'}
            </a>
            <a href={YELP} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {ko ? 'Yelp 리뷰 보기' : 'Yelp reviews'}
            </a>
          </div>
        </section>

        <section className="container-edge border-t border-hairline py-16 md:py-24">
          <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] tracking-luxury text-ink mb-10">
            {ko ? '함께한 고객' : 'Who we have built for'}
          </h2>
          <ul data-reveal-group className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {projects.map((p) => (
              <li key={p.name}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bone">
                  <Image src={p.image} alt={ko ? `${p.name} 웹사이트 화면` : `${p.name} website`} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" className="object-cover object-top" />
                </div>
                <p className="mt-4 text-[13px] text-ash">{p.industry[locale]} · {p.year}</p>
                <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {p.name}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-graphite">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {p.location}
                </p>
                <p className="mt-2 text-[13.5px] text-graphite">{p.disciplines[locale].join(' · ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-edge border-t border-hairline py-16 md:py-24">
          <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] tracking-luxury text-ink mb-10">
            {ko ? '공개 사례 연구' : 'Published case studies'}
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {caseStudies.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group block rounded-[24px] p-6 md:p-8 bg-bone ring-1 ring-hairline transition-colors hover:ring-ink/30">
                  <h3 className="text-[19px] md:text-[21px] font-semibold tracking-[-0.02em] text-ink group-hover:underline">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-graphite">{c.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <p className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] tracking-luxury text-ink max-w-2xl mb-8">
            {ko
              ? '저희와 일해 보셨나요? 짧은 구글 리뷰가 다른 사장님들이 저희를 찾는 데 큰 도움이 됩니다.'
              : 'Worked with us? A short Google review helps other business owners find us.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="btn-ink">
              {ko ? '구글 리뷰 남기기' : 'Leave a Google review'}
            </a>
            <Link href={`${prefix}/contact`} className="btn-outline">{ko ? '상담 요청' : 'Start a conversation'}</Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
