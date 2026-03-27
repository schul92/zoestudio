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
      title: '페어뷰 웹사이트 제작 | Fairview NJ 한인 웹디자인 전문 | ZOE LUMOS',
      description: '페어뷰(Fairview) NJ 웹사이트 제작 전문. 페어뷰 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 로컬 마케팅. 버겐카운티 현지 에이전시. 100% 한국어 상담.',
      keywords: '페어뷰 웹사이트, Fairview NJ 웹디자인, 페어뷰 홈페이지 제작, 페어뷰 한인 비즈니스, 한인 마케팅, 페어뷰 SEO, 버겐카운티 웹사이트, 페어뷰 구글 광고',
      openGraph: {
        title: '페어뷰 NJ 웹사이트 제작 전문 - ZOE LUMOS',
        description: '페어뷰(Fairview) 한인 비즈니스를 위한 웹사이트 제작. 버겐카운티 현지 에이전시.',
        url: `${baseUrl}/ko/fairview-nj-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/fairview-nj-web-design`,
        languages: {
          'x-default': `${baseUrl}/fairview-nj-web-design`,
          'en': `${baseUrl}/fairview-nj-web-design`,
          'ko': `${baseUrl}/ko/fairview-nj-web-design`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }
  
  return {
    title: 'Fairview NJ Web Design | Korean Business Website Expert | ZOE LUMOS',
    description: 'Fairview, NJ web design agency specializing in Korean-American businesses. Local SEO, bilingual websites, Google Ads. Serving Fairview, Cliffside Park & Bergen County. Free consultation.',
    keywords: 'Fairview NJ web design, Fairview web developer, Fairview NJ website, Korean business Fairview, Fairview SEO, Bergen County web design, Korean American web design NJ, Fairview digital marketing',
    openGraph: {
      title: 'Fairview NJ Web Design - ZOE LUMOS',
      description: 'Web design agency serving Korean-American businesses in Fairview, NJ.',
      url: `${baseUrl}/fairview-nj-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/fairview-nj-web-design`,
      languages: {
        'x-default': `${baseUrl}/fairview-nj-web-design`,
        'en': `${baseUrl}/fairview-nj-web-design`,
        'ko': `${baseUrl}/ko/fairview-nj-web-design`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function FairviewWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 페어뷰 웹디자인' : 'ZOE LUMOS - Fairview NJ Web Design',
    description: locale === 'ko' 
      ? '페어뷰 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Web design agency for Korean-American businesses in Fairview, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}fairview-nj-web-design`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fairview',
      addressRegion: 'NJ',
      postalCode: '07022',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8137',
      longitude: '-73.9993',
    },
    areaServed: [
      { '@type': 'City', name: 'Fairview' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'North Bergen' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '6',
    },
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '페어뷰에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '페어뷰 지역 웹사이트 제작은 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스 $3,000-$6,000. 무료 상담 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '페어뷰 한인 비즈니스에 맞는 서비스가 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 페어뷰와 클리프사이드파크 한인 비즈니스를 위한 이중언어(한영) 웹사이트, 한국어 SEO, 로컬 마케팅 등 맞춤 서비스를 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '페어뷰 근처에서 직접 만날 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 버겐카운티 전역 출장 미팅이 가능합니다. 페어뷰, 포트리, 팰리세이즈파크 등 편한 장소에서 만나실 수 있습니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Fairview, NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fairview web design starts at $1,000. Small business sites $1,000-$3,000, e-commerce $3,000-$6,000. Free consultation available.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you serve Korean businesses in Fairview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in Korean-American businesses in Fairview and surrounding Bergen County towns. Bilingual websites, Korean SEO, and local marketing included.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can we meet near Fairview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer in-person meetings throughout Bergen County including Fairview, Fort Lee, and Palisades Park. Korean language consultations available.'
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? '페어뷰, NJ 지역 서비스' : 'Serving Fairview, NJ'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>페어뷰 웹사이트 제작<br /><span className="text-emerald-600">한인 비즈니스 전문</span></>
                : <>Fairview NJ Web Design<br /><span className="text-emerald-600">Korean Business Experts</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '페어뷰, 클리프사이드파크, 노스버겐 한인 비즈니스를 위한 전문 웹사이트 제작. 한영 이중언어, 구글 SEO, 로컬 마케팅.'
                : 'Expert web design for Korean-American businesses in Fairview, Cliffside Park & North Bergen. Bilingual sites, Google SEO, local marketing.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span>{locale === 'ko' ? '버겐카운티 한인 비즈니스 50+ 제작' : '50+ Bergen County Korean Businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Fairview Businesses Choose Us */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '페어뷰 비즈니스가 ZOE LUMOS를 선택하는 이유' : 'Why Fairview Businesses Choose ZOE LUMOS'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '페어뷰와 버겐카운티 한인 커뮤니티를 깊이 이해하는 현지 에이전시'
                : 'A local agency that deeply understands the Fairview and Bergen County Korean community'
              }
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <Globe className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '페어뷰 한인 고객과 영어권 고객 모두를 위한 전문 이중언어 웹사이트. 자동 언어 전환, 한국어 SEO 포함.'
                    : 'Professional bilingual websites for both Korean and English-speaking customers in Fairview. Auto language switching included.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '페어뷰 로컬 SEO' : 'Fairview Local SEO'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"페어뷰 [업종]" 구글 검색 최적화. Google My Business, 로컬 키워드 타겟팅으로 지역 고객 확보.'
                    : 'Rank for "Fairview [your business]" on Google. GMB optimization, local keyword targeting to capture nearby customers.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '지역 밀착 마케팅' : 'Hyper-Local Marketing'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '페어뷰, 클리프사이드파크, 노스버겐 커뮤니티 타겟 마케팅. 한인 미디어, 지역 이벤트, 소셜 미디어 관리.'
                    : 'Marketing targeted to Fairview, Cliffside Park & North Bergen communities. Korean media, local events, social media management.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {locale === 'ko' ? '페어뷰 & 인근 지역 서비스' : 'Serving Fairview & Nearby Areas'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Fairview', ko: '페어뷰', zip: '07022', highlight: true },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: true },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: false },
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Guttenberg', ko: '거텐버그', zip: '07093', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'ko' ? '페어뷰 업종별 전문 웹사이트' : 'Fairview Industry-Specific Websites'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍽️', title: '한식당 & 카페', desc: '온라인 메뉴, 예약 시스템, 배달 연동' },
                { icon: '💇', title: '뷰티 & 네일살롱', desc: '온라인 예약, 갤러리, 리뷰 관리' },
                { icon: '🏪', title: '소매점 & 마켓', desc: '이커머스, 재고관리, 온라인 주문' },
                { icon: '⚖️', title: '전문 서비스', desc: '법률, 회계, 보험 — 상담 예약, 이중언어' },
                { icon: '🔧', title: '자동차 & 수리', desc: '서비스 예약, 견적 요청, 고객 리뷰' },
                { icon: '📚', title: '학원 & 교육', desc: '수강 등록, 일정 관리, 학부모 포털' },
              ] : [
                { icon: '🍽️', title: 'Restaurants & Cafes', desc: 'Online menus, reservations, delivery integration' },
                { icon: '💇', title: 'Beauty & Nail Salons', desc: 'Online booking, galleries, review management' },
                { icon: '🏪', title: 'Retail & Markets', desc: 'E-commerce, inventory, online ordering' },
                { icon: '⚖️', title: 'Professional Services', desc: 'Law, accounting, insurance — booking, bilingual' },
                { icon: '🔧', title: 'Auto & Repair', desc: 'Service booking, quotes, customer reviews' },
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
        <section className="py-20 px-4 bg-emerald-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' 
                ? '페어뷰 비즈니스를 온라인에서 성장시키세요'
                : 'Grow Your Fairview Business Online'
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '무료 상담으로 시작하세요. 페어뷰, 포트리, 팰팍 어디서든 만나실 수 있습니다.'
                : 'Start with a free consultation. We can meet anywhere in Fairview, Fort Lee, or Palisades Park.'
              }
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-emerald-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
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
