import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, UtensilsCrossed, ShoppingBag, Clock, Smartphone } from 'lucide-react'

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
      title: '한식당 웹사이트 제작 | 한인 레스토랑 홈페이지 전문 | ZOE LUMOS',
      description: '한식당, 한인 레스토랑 웹사이트 제작 전문. 온라인 메뉴, 예약 시스템, 배달 연동, 구글 SEO 최적화. 포트리, 팰팍, 뉴저지, 뉴욕 한식당 전문. 100% 한국어 상담.',
      keywords: '한식당 웹사이트, 한인 레스토랑 홈페이지, 한식당 홈페이지 제작, korean restaurant website, 레스토랑 웹사이트 제작, 한식당 온라인 메뉴, 한식당 예약 시스템, 포트리 한식당, 팰팍 한식당, 뉴저지 한식당 웹사이트',
      openGraph: {
        title: '한식당 웹사이트 제작 전문 - ZOE LUMOS',
        description: '한식당, 한인 레스토랑을 위한 전문 웹사이트 제작. 온라인 메뉴, 예약, 배달 연동.',
        url: `${baseUrl}/ko/korean-restaurant-website`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
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
    title: 'Korean Restaurant Website Design | K-BBQ, Korean Cafe & Restaurant Sites | ZOE LUMOS',
    description: 'Professional website design for Korean restaurants, K-BBQ, Korean cafes & bakeries. Online menus, reservation systems, delivery integration, Google SEO. Serving Fort Lee, Palisades Park, NJ & NYC metro.',
    keywords: 'korean restaurant website, korean restaurant web design, K-BBQ website, korean cafe website, korean bakery website, restaurant website NJ, korean food website design, Fort Lee restaurant website, Palisades Park restaurant, online menu korean restaurant',
    openGraph: {
      title: 'Korean Restaurant Website Design - ZOE LUMOS',
      description: 'Professional websites for Korean restaurants. Online menus, reservations, delivery integration.',
      url: `${baseUrl}/korean-restaurant-website`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 한식당 웹사이트 제작' : 'ZOE LUMOS - Korean Restaurant Website Design',
    description: locale === 'ko' 
      ? '한식당, 한인 레스토랑을 위한 전문 웹사이트 제작 에이전시'
      : 'Professional website design agency specializing in Korean restaurants',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}korean-restaurant-website`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Flushing' },
      { '@type': 'City', name: 'Manhattan' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
    ],
    priceRange: '$$',
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '한식당 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '한식당 웹사이트는 $1,500부터 시작합니다. 기본 메뉴 사이트 $1,500-$2,500, 온라인 주문/예약 포함 $2,500-$5,000. 무료 상담으로 정확한 견적을 받아보세요.'
        }
      },
      {
        '@type': 'Question',
        name: '온라인 주문 시스템도 포함되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, DoorDash, UberEats, Grubhub 등 배달 앱 연동과 자체 온라인 주문 시스템 구축이 가능합니다. 수수료를 절약하는 자체 주문 시스템을 추천드립니다.'
        }
      },
      {
        '@type': 'Question',
        name: '한국어와 영어 메뉴 모두 지원하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '물론입니다. 한영 이중언어 메뉴, 음식 사진 갤러리, 메뉴 설명이 모두 포함됩니다. 미국인 고객에게도 한식의 매력을 전달할 수 있도록 영어 메뉴 설명을 최적화합니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does a Korean restaurant website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Korean restaurant websites start at $1,500. Basic menu sites $1,500-$2,500, with online ordering/reservations $2,500-$5,000. Free consultation for exact quote.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you include online ordering systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we integrate with DoorDash, UberEats, Grubhub and can build custom online ordering to save on commission fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can the menu be in both Korean and English?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We build fully bilingual menus with food photography, descriptions optimized for both Korean and American customers.'
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <HeaderWrapper locale={locale} />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-6">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? '한식당 전문 웹디자인' : 'Korean Restaurant Specialists'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>한식당 웹사이트 제작<br /><span className="text-red-600">맛있는 음식, 멋진 웹사이트</span></>
                : <>Korean Restaurant<br /><span className="text-red-600">Website Design</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '한식당, KBBQ, 한인 카페, 베이커리를 위한 전문 웹사이트. 온라인 메뉴, 예약 시스템, 배달 연동, 구글 1페이지 노출까지.'
                : 'Professional websites for Korean restaurants, K-BBQ, Korean cafes & bakeries. Online menus, reservations, delivery integration & Google page 1 ranking.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '🍽️ 무료 상담' : '🍽️ Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '한식당 30+ 제작 경험' : '30+ Korean Restaurants Built'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                <span>{locale === 'ko' ? '100% 한국어 상담' : '100% Korean Language Support'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '10일 내 완성' : 'Ready in 10 Days'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurant Types */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '모든 한식당 업종 전문' : 'Every Type of Korean Restaurant'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? 'KBBQ부터 분식집까지, 한식당 유형에 맞는 맞춤형 웹사이트를 제작합니다'
                : 'From K-BBQ to casual eateries, we build custom websites for every Korean restaurant type'
              }
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(locale === 'ko' ? [
                { emoji: '🥩', name: 'KBBQ / 고기집', desc: '인터랙티브 메뉴, 예약' },
                { emoji: '🍜', name: '한식당 / 백반집', desc: '메뉴판, 위치 안내' },
                { emoji: '🍰', name: '카페 / 베이커리', desc: '갤러리, 온라인 주문' },
                { emoji: '🍲', name: '찌개 / 전골 전문', desc: '시즌 메뉴, 케이터링' },
                { emoji: '🍱', name: '도시락 / 테이크아웃', desc: '온라인 주문 시스템' },
                { emoji: '🍗', name: '치킨 / 분식', desc: '배달 연동, 쿠폰' },
                { emoji: '🍣', name: '일식 / 퓨전', desc: '프리미엄 디자인' },
                { emoji: '🧋', name: '음료 / 디저트', desc: '인스타 연동, 신메뉴' },
              ] : [
                { emoji: '🥩', name: 'K-BBQ', desc: 'Interactive menus, reservations' },
                { emoji: '🍜', name: 'Korean Cuisine', desc: 'Menu boards, directions' },
                { emoji: '🍰', name: 'Cafe & Bakery', desc: 'Gallery, online ordering' },
                { emoji: '🍲', name: 'Hot Pot / Stew', desc: 'Seasonal menus, catering' },
                { emoji: '🍱', name: 'Lunch Box / Takeout', desc: 'Online ordering system' },
                { emoji: '🍗', name: 'Fried Chicken / Snacks', desc: 'Delivery integration' },
                { emoji: '🍣', name: 'Japanese / Fusion', desc: 'Premium design' },
                { emoji: '🧋', name: 'Drinks / Dessert', desc: 'Instagram integration' },
              ]).map((item) => (
                <div key={item.name} className="p-5 rounded-xl border-2 border-gray-200 hover:border-red-400 transition-colors text-center">
                  <span className="text-3xl block mb-2">{item.emoji}</span>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '한식당에 꼭 필요한 기능' : 'Essential Features for Korean Restaurants'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <UtensilsCrossed className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '디지털 메뉴판' : 'Digital Menu'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '한영 이중언어 메뉴, 음식 사진, 가격, 알레르기 정보. QR코드 메뉴 포함.'
                    : 'Bilingual menus with photos, prices, allergen info. QR code menu included.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '온라인 예약' : 'Online Reservations'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '실시간 예약 시스템. OpenTable, Resy 연동 또는 자체 예약 시스템 구축.'
                    : 'Real-time reservation system. OpenTable, Resy integration or custom booking.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <ShoppingBag className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '온라인 주문 & 배달' : 'Online Ordering & Delivery'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '자체 온라인 주문으로 배달앱 수수료 절약. DoorDash, UberEats 연동도 가능.'
                    : 'Save on delivery app fees with direct ordering. DoorDash, UberEats integration available.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Smartphone className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '구글 SEO & 지도' : 'Google SEO & Maps'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '"근처 한식당" 검색 시 구글 지도에 노출. Google My Business 최적화 포함.'
                    : 'Show up for "Korean restaurant near me" on Google Maps. GMB optimization included.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Korean Restaurants Need a Website */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '왜 한식당에 웹사이트가 필요한가요?' : 'Why Your Korean Restaurant Needs a Website'}
            </h2>
            
            <div className="space-y-8">
              {(locale === 'ko' ? [
                { stat: '72%', title: '고객이 방문 전 온라인 검색', desc: '웹사이트가 없으면 경쟁 식당에 고객을 빼앗깁니다.' },
                { stat: '30%', title: '배달앱 수수료 절약', desc: '자체 온라인 주문 시스템으로 DoorDash, UberEats 수수료를 절약하세요.' },
                { stat: '3배', title: '더 많은 예약', desc: '온라인 예약 시스템이 있는 식당이 전화만 받는 식당보다 3배 더 많은 예약을 받습니다.' },
                { stat: '24/7', title: '항상 열려있는 가게', desc: '영업시간 외에도 메뉴 확인, 예약, 주문이 가능합니다.' },
              ] : [
                { stat: '72%', title: 'Customers search online before visiting', desc: 'Without a website, you lose customers to competitors who have one.' },
                { stat: '30%', title: 'Save on delivery app commissions', desc: 'Direct online ordering saves you DoorDash, UberEats commission fees.' },
                { stat: '3x', title: 'More reservations', desc: 'Restaurants with online reservations get 3x more bookings than phone-only.' },
                { stat: '24/7', title: 'Always open storefront', desc: 'Customers can browse menus, book, and order outside business hours.' },
              ]).map((item) => (
                <div key={item.stat} className="flex items-start gap-6">
                  <div className="text-4xl font-black text-red-600 min-w-[80px]">{item.stat}</div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serving Areas */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'ko' ? '서비스 지역' : 'Areas We Serve'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Fort Lee', 'Palisades Park', 'Edgewater', 'Cliffside Park',
                'Flushing', 'Manhattan', 'Bayside', 'Murray Hill',
                'Bergen County', 'All of NJ', 'All of NY', 'Nationwide'
              ].map((area) => (
                <span key={area} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium">
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' 
                ? '한식당 웹사이트, 지금 시작하세요'
                : 'Get Your Korean Restaurant Online Today'
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '무료 상담으로 시작하세요. 10일 내에 멋진 웹사이트를 완성해드립니다.'
                : 'Start with a free consultation. Your new website ready in just 10 days.'
              }
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              {locale === 'ko' ? '무료 상담 시작 →' : 'Start Free Consultation →'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      
      <Footer locale={locale} />
    </>
  )
}
