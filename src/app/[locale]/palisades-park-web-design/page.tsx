import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, TrendingUp } from 'lucide-react'

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
      title: '팰리세이즈파크 웹사이트 제작 | 팰팍 한인 웹디자인 전문 | ZOE LUMOS',
      description: '팰리세이즈파크(팰팍) 웹사이트 제작 전문. 팰팍 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅. Broad Ave 상권 비즈니스 전문. 100% 한국어 상담.',
      keywords: '팰리세이즈파크 웹사이트, 팰팍 웹사이트, 팰팍 웹디자인, Palisades Park 웹사이트, 팰팍 홈페이지 제작, 팰팍 한인 비즈니스, 팰팍 마케팅, 팰팍 SEO, 팰팍 구글 광고, Broad Ave 웹사이트, 버겐카운티 한인 웹사이트',
      openGraph: {
        title: '팰리세이즈파크 웹사이트 제작 전문 - ZOE LUMOS',
        description: '팰팍 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스. Broad Ave 상권 전문.',
        url: `${baseUrl}/ko/palisades-park-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/palisades-park-web-design`,
        languages: {
          'x-default': `${baseUrl}/palisades-park-web-design`,
          'en': `${baseUrl}/palisades-park-web-design`,
          'ko': `${baseUrl}/ko/palisades-park-web-design`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }
  
  return {
    title: 'Palisades Park Web Design | Korean Business Website Expert NJ | ZOE LUMOS',
    description: 'Palisades Park, NJ web design agency for Korean-American businesses. Broad Ave business specialists. Local SEO, Google Ads, bilingual websites. Free consultation.',
    keywords: 'Palisades Park web design, Palisades Park NJ website, Korean business Palisades Park, Broad Ave web design, 팰팍 web design, Bergen County Korean web design, Palisades Park SEO, Korean American website NJ',
    openGraph: {
      title: 'Palisades Park Web Design - ZOE LUMOS',
      description: 'Web design agency for Korean-American businesses on Broad Ave and throughout Palisades Park, NJ.',
      url: `${baseUrl}/palisades-park-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/palisades-park-web-design`,
      languages: {
        'x-default': `${baseUrl}/palisades-park-web-design`,
        'en': `${baseUrl}/palisades-park-web-design`,
        'ko': `${baseUrl}/ko/palisades-park-web-design`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function PalisadesParkWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: locale === 'ko' ? 'ZOE LUMOS - 팰팍 웹디자인' : 'ZOE LUMOS - Palisades Park Web Design',
    description: locale === 'ko' 
      ? '팰리세이즈파크(팰팍) 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Web design agency for Korean-American businesses in Palisades Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}palisades-park-web-design`,
    // telephone intentionally omitted until verified public business number is available,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Palisades Park',
      addressRegion: 'NJ',
      postalCode: '07650',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8482',
      longitude: '-73.9977',
    },
    areaServed: [
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Leonia' },
      { '@type': 'City', name: 'Ridgefield' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '89',
    },
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '팰팍에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '팰리세이즈파크 지역 웹사이트 제작은 $1,000부터 시작합니다. 식당, 뷰티살롱 등 소규모 비즈니스 $1,000-$3,000, 이커머스 $3,000-$6,000. 팰팍 근처에서 무료 상담 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 Broad Ave 식당 웹사이트도 만들어주나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, Broad Ave 한식당, 카페, 뷰티살롱 등 다양한 업종의 웹사이트를 제작합니다. 온라인 메뉴, 예약 시스템, 배달 연동, 구글 지도 최적화까지 포함됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 비즈니스 구글 검색에 잘 나오게 할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, "팰팍 [업종]", "Palisades Park [업종]" 등 지역 키워드로 구글 1페이지 노출을 목표로 합니다. Google My Business 최적화, 한국어/영어 SEO, 리뷰 관리까지 포함됩니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Palisades Park, NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park web design starts at $1,000. Small business sites $1,000-$3,000, e-commerce $3,000-$6,000. Free consultation available near Broad Ave.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you build websites for Broad Ave businesses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We specialize in websites for Korean restaurants, cafes, beauty salons, and other businesses along Broad Ave and throughout Palisades Park. Includes online menus, booking systems, and Google Maps optimization.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you help my Palisades Park business rank on Google?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We target local keywords like "Palisades Park [your business type]" to get you on Google page 1. Includes GMB optimization, bilingual Korean/English SEO, and review management.'
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? '팰리세이즈파크, NJ · Broad Ave 전문' : 'Palisades Park, NJ · Broad Ave Specialists'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>팰팍 웹사이트 제작<br /><span className="text-green-600">한인 비즈니스 전문</span></>
                : <>Palisades Park<br />Web Design<br /><span className="text-green-600">Korean Business Experts</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크 Broad Ave 상권부터 주변 지역까지. 한인 비즈니스를 위한 전문 웹사이트 제작, 구글 SEO, 로컬 마케팅.'
                : 'From Broad Ave to the entire borough. Expert web design, Google SEO & local marketing for Korean-American businesses in Palisades Park.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '고객 만족도 높은 서비스' : 'Top-rated client satisfaction'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '팰팍 · 포트리 한인 비즈니스 전문' : 'Specialists in Palisades Park & Fort Lee businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '왜 팰팍 비즈니스에 웹사이트가 필요한가요?' : 'Why Your Palisades Park Business Needs a Website'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크는 미국에서 한인 인구 비율이 가장 높은 도시 중 하나입니다. 온라인 존재감이 곧 매출입니다.'
                : 'Palisades Park has one of the highest Korean-American populations in the US. Your online presence directly impacts revenue.'
              }
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl font-black text-green-600 mb-2">52%</div>
                <p className="text-gray-700 font-semibold mb-1">
                  {locale === 'ko' ? '한인 인구 비율' : 'Korean-American Population'}
                </p>
                <p className="text-gray-500 text-sm">
                  {locale === 'ko' ? '팰팍 전체 인구의 절반 이상이 한인' : 'Over half of Palisades Park residents are Korean-American'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-black text-green-600 mb-2">200+</div>
                <p className="text-gray-700 font-semibold mb-1">
                  {locale === 'ko' ? 'Broad Ave 한인 업소' : 'Korean Businesses on Broad Ave'}
                </p>
                <p className="text-gray-500 text-sm">
                  {locale === 'ko' ? '식당, 뷰티, 마트, 학원 등 다양한 업종' : 'Restaurants, beauty, grocery, tutoring and more'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-black text-green-600 mb-2">73%</div>
                <p className="text-gray-700 font-semibold mb-1">
                  {locale === 'ko' ? '모바일 검색 비율' : 'Mobile Search Rate'}
                </p>
                <p className="text-gray-500 text-sm">
                  {locale === 'ko' ? '고객의 73%가 모바일로 "근처 [업종]" 검색' : '73% of customers search "near me [business]" on mobile'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Broad Ave Business Types */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? 'Broad Ave 업종별 전문 웹사이트' : 'Broad Ave Industry-Specific Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '팰팍 Broad Ave의 모든 업종에 맞는 맞춤형 웹사이트를 제작합니다'
                : 'Custom websites tailored for every type of business on Broad Ave'
              }
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍜', title: '한식당 & 분식집', desc: '온라인 메뉴, 예약 시스템, 배달앱 연동, 구글 리뷰 관리' },
                { icon: '☕', title: '카페 & 베이커리', desc: '메뉴 사진 갤러리, 온라인 주문, 소셜미디어 연동' },
                { icon: '💅', title: '네일살롱 & 뷰티', desc: '온라인 예약, 서비스 메뉴, 작업 포트폴리오 갤러리' },
                { icon: '🛒', title: '한인마트 & 식품', desc: '상품 카탈로그, 온라인 주문, 할인 이벤트 페이지' },
                { icon: '📚', title: '학원 & 과외', desc: '수강 등록, 시간표, 학부모 포털, 성과 후기' },
                { icon: '🏥', title: '한의원 & 의원', desc: '온라인 예약, 진료 안내, 건강 정보 블로그' },
              ] : [
                { icon: '🍜', title: 'Korean Restaurants', desc: 'Online menus, reservations, delivery app integration, Google review management' },
                { icon: '☕', title: 'Cafes & Bakeries', desc: 'Menu photo galleries, online ordering, social media integration' },
                { icon: '💅', title: 'Nail Salons & Beauty', desc: 'Online booking, service menus, portfolio galleries' },
                { icon: '🛒', title: 'Korean Grocery & Food', desc: 'Product catalogs, online ordering, promotional event pages' },
                { icon: '📚', title: 'Tutoring & Academies', desc: 'Enrollment, schedules, parent portals, testimonials' },
                { icon: '🏥', title: 'Medical & Wellness', desc: 'Online booking, service info, health blog content' },
              ]).map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-white border rounded-lg shadow-sm">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 비즈니스 성장 서비스' : 'Grow Your Palisades Park Business'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <Globe className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '한인 고객과 영어권 고객 모두를 위한 완벽한 이중언어 웹사이트. 자동 언어 감지, 한국어 타이포그래피 최적화.'
                    : 'Perfect bilingual websites for both Korean and English-speaking customers. Auto language detection, Korean typography optimization.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '팰팍 로컬 SEO' : 'Palisades Park Local SEO'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"팰팍 [업종]" 검색 시 구글 1페이지 노출. Google My Business, 네이버 지도, 한국어 키워드 최적화.'
                    : 'Rank on Google page 1 for "Palisades Park [your business]". GMB optimization, Korean keyword targeting.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <TrendingUp className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '구글 & 옐프 광고' : 'Google & Yelp Ads'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '팰팍 지역 타겟 구글 광고, 옐프 광고 관리. 한인 고객 맞춤 광고 전략으로 매출 증대.'
                    : 'Targeted Google Ads & Yelp Ads for Palisades Park. Korean customer-focused ad strategies to boost revenue.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {locale === 'ko' ? '팰팍 & 주변 지역 서비스' : 'Serving Palisades Park & Nearby Areas'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Leonia', ko: '리오니아', zip: '07605', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Fairview', ko: '페어뷰', zip: '07022', highlight: false },
                { en: 'Hackensack', ko: '해켄색', zip: '07601', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' 
                ? '팰팍 한인 비즈니스의 성공 파트너'
                : "Your Palisades Park Business Growth Partner"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '지금 무료 상담을 예약하세요. 팰팍 근처에서 직접 만나실 수 있습니다.'
                : 'Book your free consultation today. We can meet near Broad Ave.'
              }
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      
      <Footer locale={locale} />
    </>
  )
}
