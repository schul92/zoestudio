import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Search, TrendingUp, Users } from 'lucide-react'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  if (locale === 'ko') {
    return {
      title: '버겐카운티 SEO & 웹사이트 제작 | 포트리 팰팍 잉글우드 한인 마케팅 | ZOE LUMOS',
      description: '버겐카운티 SEO 전문 업체. 포트리, 팰팍, 잉글우드, 노스버겐, 리지필드 한인 비즈니스 웹사이트 제작 & 구글 상위 노출. 소규모 비즈니스 SEO $500부터. 무료 SEO 진단.',
      keywords: '버겐카운티 SEO, 버겐카운티 웹사이트, bergen county web design, 포트리 SEO, 팰팍 SEO, 잉글우드 SEO, 노스버겐 SEO, 뉴저지 소규모 비즈니스 SEO, 한인 마케팅 에이전시, small business seo agency englewood nj, seo agency north bergen nj, local seo agency englewood nj',
      openGraph: {
        title: '버겐카운티 SEO & 웹사이트 제작 전문 - ZOE LUMOS',
        description: '버겐카운티 한인 비즈니스 SEO & 웹사이트 제작. 포트리, 팰팍, 잉글우드, 노스버겐 전문.',
        url: `${baseUrl}/ko/bergen-county-seo`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/bergen-county-seo`,
        languages: {
          'x-default': `${baseUrl}/bergen-county-seo`,
          'en': `${baseUrl}/bergen-county-seo`,
          'ko': `${baseUrl}/ko/bergen-county-seo`,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  }
  
  return {
    title: 'Bergen County SEO & Web Design | Fort Lee, Englewood, North Bergen | ZOE LUMOS',
    description: 'Bergen County SEO agency & web design experts. Serving Fort Lee, Palisades Park, Englewood, North Bergen small businesses. Local SEO from $500/mo. Free SEO audit. Korean & English bilingual.',
    keywords: 'Bergen County SEO, Bergen County web design, Fort Lee SEO, Englewood SEO agency, North Bergen SEO, Palisades Park web design, small business SEO Bergen County, local SEO New Jersey, Korean business marketing NJ',
    openGraph: {
      title: 'Bergen County SEO & Web Design - ZOE LUMOS',
      description: 'Expert SEO & web design for Bergen County businesses. Fort Lee, Englewood, North Bergen, Palisades Park.',
      url: `${baseUrl}/bergen-county-seo`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/bergen-county-seo`,
      languages: {
        'x-default': `${baseUrl}/bergen-county-seo`,
        'en': `${baseUrl}/bergen-county-seo`,
        'ko': `${baseUrl}/ko/bergen-county-seo`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function BergenCountySEOPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ZOE LUMOS - Bergen County SEO & Web Design',
    description: locale === 'ko'
      ? '버겐카운티 SEO & 웹사이트 제작 전문 업체. 포트리, 팰팍, 잉글우드, 노스버겐 한인 비즈니스.'
      : 'Bergen County SEO agency & web design. Serving Fort Lee, Palisades Park, Englewood, North Bergen.',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}bergen-county-seo`,
    telephone: '+1-201-555-0123',
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Englewood' },
      { '@type': 'City', name: 'Englewood Cliffs' },
      { '@type': 'City', name: 'North Bergen' },
      { '@type': 'City', name: 'Ridgefield' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Leonia' },
    ],
    priceRange: '$500-$5,000',
    openingHours: 'Mo-Fr 09:00-18:00',
    geo: { '@type': 'GeoCoordinates', latitude: '40.8509', longitude: '-73.9701' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SEO & Web Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ko' ? '로컬 SEO 서비스' : 'Local SEO Services',
            description: locale === 'ko' ? '버겐카운티 구글 상위 노출' : 'Rank higher in Bergen County Google searches',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ko' ? '비즈니스 웹사이트 제작' : 'Business Website Design',
            description: locale === 'ko' ? '모바일 최적화 반응형 웹사이트' : 'Mobile-optimized responsive websites',
          },
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '버겐카운티에서 소규모 비즈니스 SEO 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '버겐카운티 소규모 비즈니스 SEO는 월 $500부터 시작합니다. 포트리, 팰팍, 잉글우드 등 지역 타겟팅 SEO로 3-6개월 내 구글 1페이지 노출을 목표로 합니다. 무료 SEO 진단을 통해 현재 순위와 개선점을 확인하세요.',
        },
      },
      {
        '@type': 'Question',
        name: '포트리/팰팍 한인 비즈니스도 SEO가 필요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 한인 고객도 구글에서 "포트리 한식당", "팰팍 네일샵" 등을 검색합니다. 한국어와 영어 모두 SEO 최적화하면 한인 고객과 미국인 고객 모두 유치할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '잉글우드/노스버겐에서도 서비스 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 버겐카운티 전 지역과 허드슨카운티(노스버겐, 저지시티)까지 서비스합니다. 포트리 사무실에서 직접 미팅도 가능합니다.',
        },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How much does small business SEO cost in Bergen County?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bergen County small business SEO starts at $500/month. We target local searches in Fort Lee, Palisades Park, Englewood, and North Bergen. Goal: Google page 1 within 3-6 months. Get a free SEO audit to see your current rankings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you serve businesses in Englewood and North Bergen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We serve all of Bergen County plus Hudson County (North Bergen, Jersey City). Our Fort Lee office is centrally located for in-person meetings throughout the area.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes your SEO different for Bergen County businesses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in Bergen County local SEO with deep knowledge of the Korean-American business community. We optimize for both English and Korean searches, manage Google Business Profiles, and build local citations specific to NJ.',
        },
      },
    ],
  }

  const cities = locale === 'ko'
    ? [
        { name: '포트리', desc: '한인타운 중심', businesses: '식당, 뷰티, 부동산' },
        { name: '팰팍 (팰리세이즈 파크)', desc: '한인 밀집 지역', businesses: '마켓, 학원, 의원' },
        { name: '잉글우드', desc: '전문직 밀집', businesses: '변호사, 회계사, 의사' },
        { name: '노스버겐', desc: '성장하는 한인 커뮤니티', businesses: '식당, 리테일, 서비스' },
        { name: '리지필드', desc: '주거 상업 복합', businesses: '네일, 세탁, 자동차' },
        { name: '클리프사이드 파크', desc: 'GWB 인접', businesses: '카페, 소매, 서비스업' },
      ]
    : [
        { name: 'Fort Lee', desc: 'Korean business hub', businesses: 'Restaurants, beauty, real estate' },
        { name: 'Palisades Park', desc: 'Korean community center', businesses: 'Markets, academies, clinics' },
        { name: 'Englewood', desc: 'Professional district', businesses: 'Lawyers, CPAs, doctors' },
        { name: 'North Bergen', desc: 'Growing Korean community', businesses: 'Restaurants, retail, services' },
        { name: 'Ridgefield', desc: 'Mixed residential-commercial', businesses: 'Nail salons, laundry, auto' },
        { name: 'Cliffside Park', desc: 'Near GWB', businesses: 'Cafes, retail, services' },
      ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {locale === 'ko' ? '버겐카운티 전문' : 'Bergen County Specialists'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko'
                ? '버겐카운티 SEO & 웹사이트 제작'
                : 'Bergen County SEO & Web Design'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '포트리, 팰팍, 잉글우드, 노스버겐 한인 비즈니스를 위한 구글 상위 노출 & 맞춤 웹사이트'
                : 'Get found on Google by Bergen County customers. SEO & custom websites for Fort Lee, Palisades Park, Englewood & North Bergen businesses.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#contact"
                className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                {locale === 'ko' ? '무료 SEO 진단 받기' : 'Free SEO Audit'}
              </Link>
              <Link
                href={`/${locale === 'ko' ? 'ko/' : ''}pricing`}
                className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                {locale === 'ko' ? '가격 보기' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-black text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-emerald-400">90+</p>
              <p className="text-gray-400 mt-1">{locale === 'ko' ? '버겐카운티 고객사' : 'Bergen County Clients'}</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400">#1</p>
              <p className="text-gray-400 mt-1">{locale === 'ko' ? '구글 1페이지 달성률' : 'Page 1 Rankings'}</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400">300%</p>
              <p className="text-gray-400 mt-1">{locale === 'ko' ? '평균 트래픽 증가' : 'Avg Traffic Increase'}</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400">5★</p>
              <p className="text-gray-400 mt-1">{locale === 'ko' ? '구글 리뷰 평점' : 'Google Review Rating'}</p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '버겐카운티 서비스 지역' : 'Bergen County Service Areas'}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '각 지역 특성에 맞는 맞춤 SEO 전략으로 지역 고객을 유치합니다'
                : 'Customized SEO strategies for each area to attract local customers'}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {cities.map((city) => (
                <div key={city.name} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{city.desc}</p>
                  <p className="text-emerald-700 text-sm font-medium">{city.businesses}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '버겐카운티 비즈니스를 위한 서비스' : 'Our Bergen County Services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <Search className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '로컬 SEO' : 'Local SEO'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'ko'
                    ? '구글 맵 상위 노출, 지역 키워드 최적화, Google 비즈니스 프로필 관리'
                    : 'Google Maps ranking, local keyword optimization, Google Business Profile management'}
                </p>
                <p className="text-emerald-700 font-bold">
                  {locale === 'ko' ? '월 $500부터' : 'From $500/mo'}
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <TrendingUp className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '웹사이트 제작' : 'Website Design'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'ko'
                    ? '모바일 최적화, 한영 이중언어, SEO 내장 웹사이트'
                    : 'Mobile-optimized, bilingual Korean-English, SEO-built-in websites'}
                </p>
                <p className="text-emerald-700 font-bold">
                  {locale === 'ko' ? '$1,000부터' : 'From $1,000'}
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <Users className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '구글 광고' : 'Google Ads'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'ko'
                    ? '버겐카운티 타겟 광고, 한인 고객 유치, ROI 최적화'
                    : 'Bergen County targeted ads, Korean customer acquisition, ROI optimization'}
                </p>
                <p className="text-emerald-700 font-bold">
                  {locale === 'ko' ? '월 $300부터' : 'From $300/mo'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'ko' ? '다른 지역도 확인하세요' : 'Explore Other Locations'}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}nj-website`} className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                {locale === 'ko' ? '뉴저지 전체' : 'All New Jersey'}
              </Link>
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}ny-website`} className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                {locale === 'ko' ? '뉴욕' : 'New York'}
              </Link>
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}`} className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                {locale === 'ko' ? '전체 서비스' : 'All Services'}
              </Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
