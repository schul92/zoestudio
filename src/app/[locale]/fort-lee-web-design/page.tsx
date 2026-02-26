import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap } from 'lucide-react'

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
      title: '포트리 웹사이트 제작 | Fort Lee 한인 웹디자인 전문 | ZOE LUMOS',
      description: '포트리(Fort Lee) 웹사이트 제작 전문. 포트리 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅 에이전시. 포트리 현지 사무실 운영. 100% 한국어 상담.',
      keywords: '포트리 웹사이트, 포트리 웹디자인, Fort Lee 웹사이트, 포트리 홈페이지 제작, 포트리 한인 비즈니스, 한인 마케팅 에이전시, 포트리 SEO, 포트리 구글 광고, 포트리 웹개발, 버겐카운티 웹사이트',
      openGraph: {
        title: '포트리 웹사이트 제작 전문 - ZOE LUMOS',
        description: '포트리(Fort Lee) 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스. 현지 사무실 운영.',
        url: `${baseUrl}/ko/fort-lee-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/fort-lee-web-design`,
        languages: {
          'x-default': `${baseUrl}/fort-lee-web-design`,
          'en': `${baseUrl}/fort-lee-web-design`,
          'ko': `${baseUrl}/ko/fort-lee-web-design`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }
  
  return {
    title: 'Fort Lee Web Design & Development | Korean Business Website Expert | ZOE LUMOS',
    description: 'Fort Lee, NJ #1 web design agency. Korean-American business website specialists in Bergen County. Local SEO, Google Ads, Shopify e-commerce. Bilingual Korean & English. Free consultation.',
    keywords: 'Fort Lee web design, Fort Lee NJ website, Fort Lee web developer, Bergen County web design, Korean business Fort Lee, Fort Lee SEO, Fort Lee digital marketing, Korean American web design NJ',
    openGraph: {
      title: 'Fort Lee Web Design & Development - ZOE LUMOS',
      description: '#1 Web design agency in Fort Lee, NJ. Korean-American business specialists.',
      url: `${baseUrl}/fort-lee-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/fort-lee-web-design`,
      languages: {
        'x-default': `${baseUrl}/fort-lee-web-design`,
        'en': `${baseUrl}/fort-lee-web-design`,
        'ko': `${baseUrl}/ko/fort-lee-web-design`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function FortLeeWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignAgency',
    name: locale === 'ko' ? 'ZOE LUMOS - 포트리 웹디자인' : 'ZOE LUMOS - Fort Lee Web Design',
    description: locale === 'ko' 
      ? '포트리 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Premier web design agency for Korean-American businesses in Fort Lee, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}fort-lee-web-design`,
    telephone: '+1-201-555-0123',
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8509',
      longitude: '-73.9712',
    },
    areaServed: [
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Leonia' },
      { '@type': 'City', name: 'Edgewater' },
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
        name: '포트리에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '포트리 지역 웹사이트 제작은 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스 $3,000-$6,000. 포트리 현지 사무실에서 무료 상담 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '포트리 한인 비즈니스에 특화된 서비스가 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 포트리와 팰리세이즈파크 한인 비즈니스를 위한 이중언어(한영) 웹사이트, 한국어 SEO, 카카오톡 연동, 한인 커뮤니티 마케팅 등 특화 서비스를 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '포트리에서 직접 만나서 상담할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 포트리 현지 사무실에서 대면 상담이 가능합니다. 버겐카운티 전역 출장 미팅도 가능합니다. 한국어 상담 100% 가능합니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Fort Lee, NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fort Lee web design starts at $1,000. Small business sites $1,000-$3,000, e-commerce $3,000-$6,000. Free consultation at our Fort Lee office.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you specialize in Korean businesses in Fort Lee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in Korean-American businesses in Fort Lee and Palisades Park. We offer bilingual websites, Korean SEO, KakaoTalk integration, and Korean community marketing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I meet in person in Fort Lee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have a local Fort Lee office for in-person consultations. We also travel throughout Bergen County. 100% Korean language consultations available.'
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? '포트리, NJ 현지 에이전시' : 'Local Fort Lee, NJ Agency'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>포트리 웹사이트 제작<br /><span className="text-blue-600">한인 비즈니스 전문</span></>
                : <>Fort Lee Web Design<br /><span className="text-blue-600">Korean Business Experts</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '포트리, 팰리세이즈파크, 클리프사이드파크 한인 비즈니스를 위한 전문 웹사이트 제작. 한영 이중언어, 구글 SEO, 로컬 마케팅.'
                : 'Expert web design for Korean-American businesses in Fort Lee, Palisades Park & Bergen County. Bilingual sites, Google SEO, local marketing.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '포트리 한인 비즈니스 50+ 제작' : '50+ Fort Lee Korean Businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fort Lee Neighborhoods */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '포트리 & 주변 지역 서비스' : 'Serving Fort Lee & Surrounding Areas'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '포트리를 중심으로 버겐카운티 전역의 한인 비즈니스를 지원합니다'
                : 'Based in Fort Lee, serving Korean-American businesses throughout Bergen County'
              }
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: true },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Leonia', ko: '리오니아', zip: '07605', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
                { en: 'Hackensack', ko: '해켄색', zip: '07601', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services for Fort Lee */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '포트리 비즈니스 맞춤 서비스' : 'Services Tailored for Fort Lee'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '포트리 한인 고객과 미국 주류 고객 모두에게 최적화된 이중언어 웹사이트. 자동 언어 전환, 한국어 SEO 포함.'
                    : 'Optimized for both Korean and American customers in Fort Lee. Auto language switching, Korean SEO included.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '포트리 로컬 SEO' : 'Fort Lee Local SEO'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"포트리 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 포트리 지역 키워드 타겟팅.'
                    : 'Rank page 1 for "Fort Lee [your business]" on Google. GMB optimization, Fort Lee keyword targeting.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한인 커뮤니티 마케팅' : 'Korean Community Marketing'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '포트리, 팰팍 한인 커뮤니티 타겟 마케팅. 카카오톡 연동, 한인 미디어 광고, 커뮤니티 이벤트 프로모션.'
                    : 'Targeted marketing for Fort Lee & Palisades Park Korean communities. KakaoTalk integration, Korean media ads.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fort Lee Business Types */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'ko' ? '포트리 업종별 전문 웹사이트' : 'Fort Lee Industry-Specific Websites'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍽️', title: '한식당 & 카페', desc: '온라인 메뉴, 예약 시스템, 배달 연동' },
                { icon: '💇', title: '뷰티 & 네일살롱', desc: '온라인 예약, 갤러리, 리뷰 관리' },
                { icon: '⚖️', title: '법률 사무소', desc: '상담 예약, 사례 소개, 이중언어' },
                { icon: '🏥', title: '의료 & 치과', desc: 'HIPAA 준수, 환자 포털, 예약' },
                { icon: '🏠', title: '부동산', desc: 'MLS 연동, 매물 검색, 가상 투어' },
                { icon: '📚', title: '학원 & 교육', desc: '수강 등록, 일정 관리, 학부모 포털' },
              ] : [
                { icon: '🍽️', title: 'Restaurants & Cafes', desc: 'Online menus, reservations, delivery integration' },
                { icon: '💇', title: 'Beauty & Nail Salons', desc: 'Online booking, galleries, review management' },
                { icon: '⚖️', title: 'Law Offices', desc: 'Consultation booking, case studies, bilingual' },
                { icon: '🏥', title: 'Medical & Dental', desc: 'HIPAA compliant, patient portals, scheduling' },
                { icon: '🏠', title: 'Real Estate', desc: 'MLS integration, property search, virtual tours' },
                { icon: '📚', title: 'Tutoring & Education', desc: 'Enrollment, scheduling, parent portals' },
              ]).map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 border rounded-lg">
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

        {/* CTA */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' 
                ? '포트리에서 가장 신뢰받는 웹디자인 에이전시'
                : "Fort Lee's Most Trusted Web Design Agency"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '오늘 무료 상담을 예약하세요. 포트리 사무실에서 직접 만나실 수 있습니다.'
                : 'Book your free consultation today. Meet us at our Fort Lee office.'
              }
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
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
