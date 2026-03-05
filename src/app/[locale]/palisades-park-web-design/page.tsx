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
      title: '팰리세이즈파크 웹사이트 제작 | 팰팍 한인 웹디자인 전문 | ZOE LUMOS',
      description: '팰리세이즈파크(Palisades Park) 웹사이트 제작 전문. 팰팍 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅. 100% 한국어 상담. 무료 컨설팅.',
      keywords: '팰리세이즈파크 웹사이트, 팰팍 웹사이트, 팰팍 웹디자인, Palisades Park 웹사이트, 팰팍 홈페이지 제작, 팰팍 한인 비즈니스, 한인 마케팅 에이전시, 팰팍 SEO, 팰팍 구글 광고, 버겐카운티 웹사이트',
      openGraph: {
        title: '팰리세이즈파크 웹사이트 제작 전문 - ZOE LUMOS',
        description: '팰팍(Palisades Park) 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스.',
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
    title: 'Palisades Park Web Design | Korean Business Website Expert | ZOE LUMOS',
    description: 'Palisades Park, NJ web design agency specializing in Korean-American businesses. Bilingual websites, local SEO, Google Ads. Bergen County\'s Korean business web experts. Free consultation.',
    keywords: 'Palisades Park web design, Palisades Park NJ website, Korean business Palisades Park, Palisades Park SEO, Bergen County web design, Korean American web design NJ, bilingual website NJ, small business web design NJ',
    openGraph: {
      title: 'Palisades Park Web Design & Development - ZOE LUMOS',
      description: 'Web design agency in Palisades Park, NJ. Korean-American business specialists.',
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
    '@type': 'WebDesignAgency',
    name: locale === 'ko' ? 'ZOE LUMOS - 팰팍 웹디자인' : 'ZOE LUMOS - Palisades Park Web Design',
    description: locale === 'ko' 
      ? '팰리세이즈파크 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Premier web design agency for Korean-American businesses in Palisades Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}palisades-park-web-design`,
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
      longitude: '-73.9976',
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
          text: '팰리세이즈파크 지역 웹사이트 제작은 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스 $3,000-$6,000. 무료 상담 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 한인 비즈니스에 특화된 서비스가 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 팰리세이즈파크는 미국 내 한인 인구 비율이 가장 높은 지역입니다. 한영 이중언어 웹사이트, 한국어 SEO, 카카오톡 연동, 한인 커뮤니티 타겟 마케팅을 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 지역 한국어 상담이 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 100% 한국어 상담이 가능합니다. 팰리세이즈파크 한인 비즈니스 오너분들을 위해 한국어로 편하게 상담받으실 수 있습니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Palisades Park, NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park web design starts at $1,000. Small business sites $1,000-$3,000, e-commerce $3,000-$6,000. Free consultation available.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why choose a Korean-specialized agency in Palisades Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park has the highest Korean-American population percentage in the US. We understand the bilingual needs of local businesses and create websites that serve both Korean and American customers effectively.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer Korean language consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer 100% Korean language consultations. Our team is fully bilingual and understands the unique needs of Korean-American business owners in Palisades Park.'
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
                {locale === 'ko' ? '팰리세이즈파크, NJ — 한인타운 전문' : 'Palisades Park, NJ — Koreatown Specialists'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>팰팍 웹사이트 제작<br /><span className="text-green-600">한인 비즈니스 전문</span></>
                : <>Palisades Park Web Design<br /><span className="text-green-600">Korean Business Experts</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '미국 최대 한인 밀집 지역 팰팍의 비즈니스를 위한 전문 웹사이트. 한영 이중언어, 구글 SEO, 로컬 마케팅 전문.'
                : "Web design for America's most Korean town. Bilingual sites, Google SEO, and local marketing for Palisades Park businesses."
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
                <span>{locale === 'ko' ? '한인 비즈니스 전문 에이전시' : 'Korean Business Specialists'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '100% 한국어 상담' : '100% Korean Consultation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '왜 팰팍 비즈니스에 전문 웹사이트가 필요한가' : 'Why Palisades Park Businesses Need Expert Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크는 인구의 52%가 한인인 미국 최대 한인 밀집 지역입니다. 한인 고객과 미국 주류 고객 모두를 위한 이중언어 웹사이트가 필수입니다.'
                : 'Palisades Park has the highest Korean-American population percentage (52%) in the US. Bilingual websites serving both Korean and American customers are essential.'
              }
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Leonia', ko: '리오니아', zip: '07605', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
                { en: 'Fairview', ko: '페어뷰', zip: '07022', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 비즈니스 맞춤 서비스' : 'Services for Palisades Park Businesses'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '팰팍 한인 고객과 미국 주류 고객 모두를 위한 완벽한 이중언어 웹사이트. 자동 언어 감지, 한국어 SEO 최적화.'
                    : 'Perfect bilingual websites for Korean and American customers in Palisades Park. Auto language detection, Korean SEO optimization.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '팰팍 로컬 SEO' : 'Palisades Park Local SEO'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"팰팍 [업종]" 검색 시 구글 1페이지 노출. Google My Business 최적화, 로컬 키워드 타겟팅.'
                    : 'Rank page 1 for "Palisades Park [your business]" on Google. GMB optimization, local keyword targeting.'
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
                    ? 'Broad Ave 한인 상권 중심 타겟 마케팅. 카카오톡, 한인 미디어, 커뮤니티 이벤트 연동.'
                    : 'Targeted marketing along Broad Ave Korean business corridor. KakaoTalk, Korean media, community event integration.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Business Types */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 업종별 전문 웹사이트' : 'Palisades Park Industry Websites'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍽️', title: '한식당 & 카페', desc: '온라인 메뉴, 예약 시스템, 배달 앱 연동' },
                { icon: '💇', title: '뷰티 & 네일살롱', desc: '온라인 예약, 포트폴리오 갤러리' },
                { icon: '🏪', title: '식료품 & 마트', desc: '상품 카탈로그, 온라인 주문, 배달' },
                { icon: '⚖️', title: '법률 & 회계', desc: '상담 예약, 서비스 안내, 이중언어' },
                { icon: '🏥', title: '의료 & 한의원', desc: '환자 예약, 보험 정보, 치료 안내' },
                { icon: '📚', title: '학원 & 교육', desc: '수강 등록, 시간표, 학부모 포털' },
              ] : [
                { icon: '🍽️', title: 'Korean Restaurants & Cafes', desc: 'Online menus, reservations, delivery app integration' },
                { icon: '💇', title: 'Beauty & Nail Salons', desc: 'Online booking, portfolio galleries' },
                { icon: '🏪', title: 'Grocery & Markets', desc: 'Product catalogs, online ordering, delivery' },
                { icon: '⚖️', title: 'Law & Accounting', desc: 'Consultation booking, bilingual services' },
                { icon: '🏥', title: 'Medical & Oriental Medicine', desc: 'Patient scheduling, insurance info' },
                { icon: '📚', title: 'Tutoring & Education', desc: 'Enrollment, schedules, parent portals' },
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
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' 
                ? '팰팍 한인 비즈니스의 온라인 성공 파트너'
                : "Your Palisades Park Business Deserves a Great Website"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '무료 상담으로 시작하세요. 한국어로 편하게 상담받으실 수 있습니다.'
                : 'Start with a free consultation. Korean language support available.'
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
