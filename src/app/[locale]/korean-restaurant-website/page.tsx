import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Utensils, Camera } from 'lucide-react'

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
      title: '한국 식당 웹사이트 제작 | 한인 레스토랑 홈페이지 | 메뉴 SEO | ZOE LUMOS',
      description: '한국 식당, 한인 레스토랑을 위한 웹사이트 제작 전문. 온라인 예약, 메뉴 디자인, 구글 검색 최적화(SEO), 구글 비즈니스 프로필 관리. 뉴저지·뉴욕 한인 식당 마케팅 1위.',
      keywords: '한국 식당 웹사이트, 한인 레스토랑 홈페이지, 식당 웹디자인, 한인 식당 마케팅, 레스토랑 SEO, 식당 구글 광고, 뉴저지 한인 식당, 뉴욕 한인 레스토랑, 온라인 예약 시스템, 메뉴 웹사이트',
      openGraph: {
        title: '한국 식당 웹사이트 제작 전문 - ZOE LUMOS',
        description: '한인 레스토랑을 위한 맞춤형 웹사이트. 메뉴, 예약, SEO 최적화.',
        url: `${baseUrl}/ko/korean-restaurant-website`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/korean-restaurant-website`,
        languages: {
          'x-default': `${baseUrl}/korean-restaurant-website`,
          'en': `${baseUrl}/korean-restaurant-website`,
          'ko': `${baseUrl}/ko/korean-restaurant-website`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Korean Restaurant Website Design | Restaurant SEO & Online Ordering | ZOE LUMOS',
    description: 'Professional website design for Korean restaurants in NJ & NYC. Online menus, reservation systems, Google Business optimization, local SEO. Bilingual Korean-English. Get more diners today.',
    keywords: 'Korean restaurant website, Korean restaurant web design, restaurant SEO NJ, Korean food website, online menu design, restaurant Google Ads, Korean BBQ website, Korean restaurant marketing NYC, NJ Korean restaurant, Fort Lee Korean restaurant website, Palisades Park restaurant',
    openGraph: {
      title: 'Korean Restaurant Website Design - ZOE LUMOS',
      description: 'Beautiful, SEO-optimized websites for Korean restaurants. Online menus, reservations, local SEO.',
      url: `${baseUrl}/korean-restaurant-website`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/korean-restaurant-website`,
      languages: {
        'x-default': `${baseUrl}/korean-restaurant-website`,
        'en': `${baseUrl}/korean-restaurant-website`,
        'ko': `${baseUrl}/ko/korean-restaurant-website`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function KoreanRestaurantWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': isKo ? '한국 식당 웹사이트 제작' : 'Korean Restaurant Website Design',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'ZOE LUMOS',
      'url': 'https://www.zoelumos.com',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Fort Lee',
        'addressRegion': 'NJ',
        'addressCountry': 'US',
      },
    },
    'areaServed': ['Fort Lee, NJ', 'Palisades Park, NJ', 'Flushing, NY', 'New York, NY', 'New Jersey'],
    'description': isKo
      ? '한인 레스토랑 맞춤형 웹사이트 제작 — 메뉴, 예약, SEO, 구글 비즈니스 관리.'
      : 'Custom website design for Korean restaurants — menus, reservations, SEO, Google Business.',
  }

  const features = isKo
    ? [
        { icon: <Utensils className="w-6 h-6" />, title: '온라인 메뉴 디자인', desc: '보기 좋고 모바일 최적화된 디지털 메뉴. 언제든 직접 수정 가능.' },
        { icon: <Star className="w-6 h-6" />, title: '구글 비즈니스 최적화', desc: '구글 맵 검색 상위 노출. 리뷰 관리 및 영업 정보 업데이트.' },
        { icon: <Search className="w-6 h-6" />, title: '지역 SEO', desc: '"포트리 한식당", "팰팍 맛집" 등 지역 키워드로 구글 상위 노출.' },
        { icon: <Camera className="w-6 h-6" />, title: '푸드 포토 최적화', desc: '음식 사진 최적화 및 SNS 연동으로 더 많은 고객 유입.' },
        { icon: <Globe className="w-6 h-6" />, title: '한/영 이중 언어', desc: '한국어 + 영어 동시 운영. 더 넓은 고객층 확보.' },
        { icon: <MapPin className="w-6 h-6" />, title: '온라인 예약 시스템', desc: 'OpenTable, Resy 연동 또는 자체 예약 시스템 구축.' },
      ]
    : [
        { icon: <Utensils className="w-6 h-6" />, title: 'Digital Menu Design', desc: 'Beautiful, mobile-friendly menus. Update anytime without a developer.' },
        { icon: <Star className="w-6 h-6" />, title: 'Google Business Optimization', desc: 'Rank higher on Google Maps. Manage reviews & business info.' },
        { icon: <Search className="w-6 h-6" />, title: 'Local SEO', desc: 'Show up for "Korean restaurant near me" and local neighborhood searches.' },
        { icon: <Camera className="w-6 h-6" />, title: 'Food Photography SEO', desc: 'Optimized food images and social media integration to drive foot traffic.' },
        { icon: <Globe className="w-6 h-6" />, title: 'Bilingual Korean & English', desc: 'Reach both Korean-speaking and English-speaking customers simultaneously.' },
        { icon: <MapPin className="w-6 h-6" />, title: 'Online Reservation System', desc: 'OpenTable/Resy integration or custom booking system.' },
      ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <HeaderWrapper locale={locale} />

      <main className="bg-[#111111] text-white min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-block bg-[#B12492]/10 border border-[#B12492]/30 rounded-full px-4 py-1.5 mb-6 text-sm text-[#B12492]">
            {isKo ? '한인 레스토랑 전문' : 'Korean Restaurant Specialists'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isKo ? (
              <>한국 식당을 위한<br /><span className="text-[#B12492]">웹사이트 제작</span></>
            ) : (
              <>Korean Restaurant<br /><span className="text-[#B12492]">Website Design</span></>
            )}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {isKo
              ? '더 많은 손님을 끌어오는 식당 웹사이트. 온라인 메뉴, 예약, 지역 SEO — 모두 한국어로 상담 가능합니다.'
              : 'Bring more diners through your door. Beautiful menus, reservations, and local SEO that puts your restaurant on the map.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale === 'ko' ? 'ko/' : ''}#contact`}
              className="bg-[#B12492] hover:bg-[#9a1f7e] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              {isKo ? '무료 상담 신청' : 'Free Consultation'}
            </Link>
            <Link
              href={`/${locale === 'ko' ? 'ko/' : ''}portfolio`}
              className="border border-gray-600 hover:border-[#B12492] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              {isKo ? '포트폴리오 보기' : 'View Portfolio'}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKo ? '식당 웹사이트 핵심 기능' : 'Everything Your Restaurant Website Needs'}
            </h2>
            <p className="text-gray-400 text-center mb-12">
              {isKo ? '한인 식당에 맞춤화된 솔루션' : 'Built specifically for Korean restaurant owners'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#B12492]/40 transition-colors">
                  <div className="text-[#B12492] mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ZOE LUMOS */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isKo ? '왜 ZOE LUMOS인가?' : 'Why Choose ZOE LUMOS?'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">
              <div>
                <div className="text-[#B12492] text-4xl font-bold mb-2">100%</div>
                <p className="text-gray-300">{isKo ? '한국어 상담 가능 — 언어 장벽 없음' : 'Bilingual support — no language barrier'}</p>
              </div>
              <div>
                <div className="text-[#B12492] text-4xl font-bold mb-2">NJ/NY</div>
                <p className="text-gray-300">{isKo ? '포트리·팰팍 현지 밀착 서비스' : 'Local Fort Lee & Palisades Park expertise'}</p>
              </div>
              <div>
                <div className="text-[#B12492] text-4xl font-bold mb-2">SEO</div>
                <p className="text-gray-300">{isKo ? '구글 상위 노출 전문 — 실제 손님 유입' : 'Proven local SEO — real foot traffic results'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location SEO mention */}
        <section className="py-12 px-6 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {isKo ? '주요 서비스 지역' : 'Serving Korean Restaurants In'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Fort Lee, NJ', 'Palisades Park, NJ', 'Englewood, NJ', 'North Bergen, NJ', 'Flushing, NY', 'Manhattan, NY', 'Ridgefield, NJ', 'Edgewater, NJ'].map(loc => (
                <span key={loc} className="bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300">
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
