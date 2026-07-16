import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import PricingTeaser from '@/components/sections/PricingTeaser'
import GuaranteeStrip from '@/components/sections/GuaranteeStrip'
import { SITE_URL } from '@/lib/siteUrl'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isKo = params.locale === 'ko'
  const baseUrl = SITE_URL
  return {
    title: isKo
      ? '서비스 — 웹사이트 제작 · 구글 광고대행 · SEO · 카카오톡 마케팅 | 조이루모스'
      : 'Services — Website Design, Google Ads, SEO & KakaoTalk Marketing | ZOE LUMOS',
    description: isKo
      ? '미국 한인 비즈니스를 위한 디지털 서비스 한곳에서. 웹사이트 제작·유지보수, 구글 광고대행, 로컬 SEO, 카카오톡 마케팅, 쇼핑몰 제작. 한영 이중언어, 계정·도메인 소유권은 100% 고객님께. 무료 상담.'
      : 'Every digital service for US Korean-American businesses in one place: website design & maintenance, Google Ads management, local SEO, KakaoTalk marketing, and e-commerce builds. Bilingual, you own your accounts and domain. Free consultation.',
    keywords: isKo
      ? '한인 마케팅 서비스, 웹사이트 제작, 구글 광고대행, 한인 SEO, 카카오톡 마케팅, 미국 한인 디지털 마케팅, 홈페이지 제작 유지보수'
      : 'Korean marketing services, website design, Google Ads agency, Korean SEO, KakaoTalk marketing, Korean American digital marketing',
    alternates: {
      canonical: isKo ? `${baseUrl}/ko/services` : `${baseUrl}/services`,
      languages: {
        'x-default': `${baseUrl}/services`,
        en: `${baseUrl}/services`,
        ko: `${baseUrl}/ko/services`,
      },
    },
    openGraph: {
      title: isKo ? '서비스 — 조이루모스' : 'Services — ZOE LUMOS',
      description: isKo
        ? '웹사이트 제작, 구글 광고대행, SEO, 카카오톡 마케팅. 미국 한인 비즈니스 맞춤.'
        : 'Website design, Google Ads, SEO, and KakaoTalk marketing for Korean-American businesses.',
      url: isKo ? `${baseUrl}/ko/services` : `${baseUrl}/services`,
      siteName: 'ZOE LUMOS 조이루모스',
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{
        url: `${baseUrl}/api/og?title=Services&subtitle=Web+%C2%B7+Ads+%C2%B7+SEO+%C2%B7+KakaoTalk`,
        width: 1200,
        height: 630,
        alt: isKo ? '조이루모스 서비스' : 'ZOE LUMOS Services',
      }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
  }
}

export default function ServicesHub({ params }: { params: { locale: string } }) {
  const isKo = params.locale === 'ko'
  const baseUrl = SITE_URL
  const p = isKo ? '/ko' : ''

  const services = [
    {
      href: isKo ? '/ko/웹사이트-제작' : '/웹사이트-제작',
      kicker: isKo ? '웹사이트 제작 · 유지보수' : 'Website design & care',
      title: isKo ? '미국·한인 비즈니스 웹사이트 제작' : 'US & Korean business website design',
      body: isKo
        ? '빠르고 모바일 최적화된 맞춤 웹사이트. 제작 후 유지보수·보안·호스팅까지 한 팀이 책임집니다. 도메인과 코드 소유권은 100% 고객님께.'
        : 'Fast, mobile-first custom sites. One team handles design, maintenance, security, and hosting. You own the domain and the code, always.',
    },
    {
      href: isKo ? '/ko/광고대행' : '/광고대행',
      kicker: isKo ? '구글 · 인스타 · 옐프 광고' : 'Google · Instagram · Yelp ads',
      title: isKo ? '구글 광고대행 & 소셜미디어 관리' : 'Google Ads & social media management',
      body: isKo
        ? '예산을 태우지 않는 광고 운영. 전환 추적, 네거티브 키워드 관리, 월간 성과 리포트. 광고 계정 소유권은 고객님께 드립니다.'
        : 'Ad management that does not burn budget. Conversion tracking, negative keywords, monthly ROI reports — and you own the ad account.',
    },
    {
      href: isKo ? '/ko/englewood-nj-seo' : '/englewood-nj-seo',
      kicker: isKo ? '로컬 SEO · 검색 최적화' : 'Local SEO',
      title: isKo ? 'SEO & 구글 검색 상위 노출' : 'SEO that gets you found on Google',
      body: isKo
        ? '로컬 SEO, 구글 비즈니스 프로필, 이중언어(한·영) 최적화. 잉글우드·버겐카운티·뉴욕 한인 비즈니스 검색 노출 전문.'
        : 'Local SEO, Google Business Profile, and bilingual (Korean + English) optimization for Englewood, Bergen County, and NY Korean businesses.',
    },
    {
      href: isKo ? '/ko/services/kakaotalk-marketing-usa' : '/services/kakaotalk-marketing-usa',
      kicker: isKo ? '카카오톡 채널 · 광고' : 'KakaoTalk Channel & ads',
      title: isKo ? '카카오톡 마케팅 · 광고대행' : 'KakaoTalk marketing & advertising',
      body: isKo
        ? '카카오톡 채널 개설·운영과 광고로 미국 내 한인 고객을 확보합니다. 웹사이트·예약과 연결해 문의가 한곳으로 모이게 합니다.'
        : 'Reach Korean-American customers through a KakaoTalk Channel and paid ads, wired into your website and booking so inquiries land in one place.',
    },
    {
      href: isKo ? '/ko/쇼핑몰-제작' : '/services/shopify-cost-audit',
      kicker: isKo ? '쇼핑몰 · 이커머스' : 'E-commerce',
      title: isKo ? 'Shopify 쇼핑몰 제작' : 'Shopify & e-commerce builds',
      body: isKo
        ? 'Shopify·카페24 기반 온라인 스토어 구축과 비용 점검. 한국·미국 결제와 배송에 맞춘 셋업.'
        : 'Shopify and e-commerce store builds plus a cost audit, set up for US and Korea payments and shipping.',
    },
    {
      href: isKo ? '/ko/services/google-business-profile-optimization' : '/services/google-business-profile-optimization',
      kicker: isKo ? '구글 비즈니스 프로필' : 'Google Business Profile',
      title: isKo ? '구글 지도 노출 & 리뷰 최적화' : 'Google Maps visibility & reviews',
      body: isKo
        ? '구글 비즈니스 프로필 최적화로 지도 검색 상위 노출과 리뷰 관리. 워크인·전화 문의를 늘립니다.'
        : 'Google Business Profile optimization for map rankings and review management that drives walk-ins and calls.',
    },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: isKo ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isKo ? '서비스' : 'Services', item: isKo ? `${baseUrl}/ko/services` : `${baseUrl}/services` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${baseUrl}${s.href}`,
    })),
  }

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <HeaderWrapper locale={params.locale} />
      <main className="min-h-screen bg-ivory">
        {/* Hero */}
        <section className="container-edge pt-40 md:pt-48 pb-16">
          <p className="overline text-ash mb-6">{isKo ? '서비스' : 'Services'}</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-luxury text-ink fraunces-soft max-w-5xl">
            {isKo ? (
              <>한인 비즈니스를 위한<br /><span className="italic font-light text-gold">디지털 서비스 전부</span></>
            ) : (
              <>Every digital service<br /><span className="italic font-light text-gold">for Korean businesses</span></>
            )}
          </h1>
          <p className="mt-8 text-graphite text-lg md:text-xl max-w-2xl leading-[1.7]">
            {isKo
              ? '웹사이트 제작과 유지보수부터 구글 광고, SEO, 카카오톡 마케팅까지. 한영 이중언어로 처음부터 끝까지. 계정과 도메인 소유권은 언제나 고객님께 있습니다.'
              : 'From website design and maintenance to Google Ads, SEO, and KakaoTalk marketing — bilingual from start to finish. You always own your accounts and your domain.'}
          </p>
        </section>

        {/* Services grid */}
        <section className="container-edge pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block rounded-3xl border border-hairline bg-white/60 hover:bg-white transition-colors p-8 md:p-10"
              >
                <p className="overline text-gold mb-4">{s.kicker}</p>
                <h2 className="font-display text-2xl md:text-3xl text-ink mb-4 leading-tight">{s.title}</h2>
                <p className="text-graphite text-[15px] leading-[1.7]">{s.body}</p>
                <span className="inline-flex items-center gap-2 mt-6 text-ink text-sm font-medium">
                  {isKo ? '자세히 보기' : 'Learn more'}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <PricingTeaser locale={params.locale} />

        {/* True-facts guarantee strip */}
        <section className="container-edge pt-16">
          <GuaranteeStrip locale={params.locale} variant="compact" />
        </section>

        {/* CTA */}
        <section className="container-edge py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
            {isKo ? '어떤 서비스가 필요한지 모르시겠나요?' : 'Not sure which service you need?'}
          </h2>
          <p className="text-graphite mb-8 max-w-xl mx-auto">
            {isKo
              ? '지금 연락주시면 비즈니스에 맞는 가장 빠른 길을 한국어로 함께 정리해 드립니다.'
              : 'Reach out and we will map the fastest path for your business — in English or Korean.'}
          </p>
          <Link href={`${p}/contact`} className="btn-ink">
            {isKo ? '무료 상담 신청' : 'Get a free consultation'}
            <span className="arrow">→</span>
          </Link>
        </section>

        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
    </div>
  )
}
