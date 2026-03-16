import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, TrendingUp, Megaphone } from 'lucide-react'

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
      title: '팰리세이즈파크 마케팅 에이전시 | 팰팍 웹사이트 제작 | 한인 마케팅 에이전시 뉴저지 | ZOE LUMOS',
      description: '팰리세이즈파크(팰팍) 한인 마케팅 에이전시. 팰팍 웹사이트 제작, 홈페이지 디자인, 구글 SEO, 소셜미디어 마케팅. 한인 마케팅 에이전시 뉴저지 1위. 100% 한국어 상담 가능.',
      keywords: '팰팍 웹사이트 제작, 팰리세이즈파크 마케팅, 한인 마케팅 에이전시 뉴저지, 팰팍 홈페이지, 팰팍 SEO, 팰리세이즈파크 웹디자인, 한인 마케팅 에이전시, 뉴저지 한인 마케팅, 팰팍 구글 광고, 버겐카운티 한인 비즈니스',
      openGraph: {
        title: '팰팍 웹사이트 제작 & 한인 마케팅 - ZOE LUMOS',
        description: '팰리세이즈파크 한인 비즈니스를 위한 마케팅 에이전시. 웹사이트 제작, SEO, 구글 광고.',
        url: `${baseUrl}/ko/palisades-park-marketing`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/palisades-park-marketing`,
        languages: {
          'x-default': `${baseUrl}/palisades-park-marketing`,
          'en': `${baseUrl}/palisades-park-marketing`,
          'ko': `${baseUrl}/ko/palisades-park-marketing`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }
  
  return {
    title: 'Palisades Park Marketing Agency | Korean Business Marketing NJ | Small Business SEO NJ | ZOE LUMOS',
    description: 'Palisades Park, NJ #1 Korean marketing agency. Website design, SEO, Google Ads for Korean-American small businesses. Small business SEO NJ specialist. Bilingual Korean & English. Free consultation.',
    keywords: 'Palisades Park marketing, Korean marketing agency NJ, small business SEO NJ, Palisades Park web design, Korean business marketing NYC, 한인 마케팅 에이전시 뉴저지, Palisades Park SEO, Bergen County Korean business, NJ Korean digital marketing',
    openGraph: {
      title: 'Palisades Park Marketing Agency - Korean Business Experts - ZOE LUMOS',
      description: '#1 Korean marketing agency in Palisades Park, NJ. Website design, SEO & digital marketing.',
      url: `${baseUrl}/palisades-park-marketing`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/palisades-park-marketing`,
      languages: {
        'x-default': `${baseUrl}/palisades-park-marketing`,
        'en': `${baseUrl}/palisades-park-marketing`,
        'ko': `${baseUrl}/ko/palisades-park-marketing`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function PalisadesParkMarketingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 팰리세이즈파크 마케팅' : 'ZOE LUMOS - Palisades Park Marketing',
    description: locale === 'ko' 
      ? '팰리세이즈파크(팰팍) 한인 비즈니스를 위한 디지털 마케팅 에이전시'
      : 'Digital marketing agency for Korean-American businesses in Palisades Park, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}palisades-park-marketing`,
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
      { '@type': 'City', name: 'Edgewater' },
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
        name: '팰리세이즈파크에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '팰팍 지역 웹사이트 제작은 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스/쇼핑몰 $3,000-$6,000. 무료 상담 후 정확한 견적을 드립니다.'
        }
      },
      {
        '@type': 'Question',
        name: '한인 마케팅 에이전시 뉴저지에서 어떤 서비스를 제공하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '웹사이트 제작, 구글 SEO, 구글 광고(Google Ads), 소셜미디어 마케팅, 한영 이중언어 콘텐츠, 카카오톡 연동, 한인 커뮤니티 마케팅 등 종합적인 디지털 마케팅 서비스를 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 한인 비즈니스에 특화된 마케팅이 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 팰리세이즈파크는 미국 내 최대 한인 밀집 지역 중 하나입니다. 한인 고객 타겟 마케팅, 한국어 SEO, 한인 커뮤니티 광고, 한인 미디어 연계 마케팅 등 팰팍 특화 서비스를 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '웹사이트 제작 기간은 얼마나 걸리나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '일반적으로 2-4주 내에 완성됩니다. 간단한 비즈니스 사이트는 2주, 이커머스/쇼핑몰은 3-4주 소요됩니다. 긴급 제작도 가능합니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does website design cost in Palisades Park, NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park website design starts at $1,000. Small business sites $1,000-$3,000, e-commerce $3,000-$6,000. Free consultation to get an exact quote.'
        }
      },
      {
        '@type': 'Question',
        name: 'What services does your Korean marketing agency in NJ offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer website design, Google SEO, Google Ads, social media marketing, bilingual Korean-English content, KakaoTalk integration, and Korean community marketing for businesses in Palisades Park and Bergen County.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you specialize in Korean businesses in Palisades Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Palisades Park has one of the largest Korean-American communities in the US. We specialize in Korean customer targeting, Korean SEO, Korean community advertising, and Korean media marketing.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically 2-4 weeks. Simple business sites take 2 weeks, e-commerce sites 3-4 weeks. Rush delivery is also available.'
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
                {locale === 'ko' ? '팰리세이즈파크, NJ 한인 마케팅' : 'Palisades Park, NJ Korean Marketing'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? <>팰팍 웹사이트 제작 &<br /><span className="text-green-600">한인 마케팅 에이전시</span></>
                : <>Palisades Park<br /><span className="text-green-600">Korean Marketing Agency</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크(팰팍) 한인 비즈니스를 위한 전문 디지털 마케팅. 웹사이트 제작, 구글 SEO, 소셜미디어 마케팅. 뉴저지 한인 마케팅 에이전시 1위.'
                : 'Expert digital marketing for Korean-American businesses in Palisades Park. Website design, Google SEO, social media marketing. #1 Korean marketing agency in NJ.'
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {locale === 'ko' ? '서비스 & 가격 →' : 'Services & Pricing →'}
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
                <Users className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '팰팍 & 버겐카운티 한인 비즈니스 50+' : '50+ Palisades Park & Bergen County Businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '왜 팰팍 한인 비즈니스에 전문 마케팅이 필요한가?' : 'Why Palisades Park Korean Businesses Need Expert Marketing'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크는 미국 내 한인 인구 비율이 가장 높은 도시 중 하나입니다. 경쟁이 치열한 만큼, 전문적인 디지털 마케팅이 차별화의 핵심입니다.'
                : 'Palisades Park has one of the highest Korean-American populations in the US. In such a competitive market, professional digital marketing is the key to standing out.'
              }
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-green-600 mb-2">52%</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? '팰팍 한인 인구 비율' : 'Korean-American Population'}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {locale === 'ko' ? '미국 내 최대 한인 밀집 지역' : 'One of the largest Korean communities in the US'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-black text-blue-600 mb-2">500+</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? '팰팍 한인 비즈니스' : 'Korean Businesses in Palisades Park'}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {locale === 'ko' ? '식당, 뷰티, 의료, 법률 등' : 'Restaurants, beauty, medical, legal & more'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-black text-red-600 mb-2">73%</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? '한국어 검색 비율' : 'Search in Korean'}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {locale === 'ko' ? '팰팍 한인 고객의 검색 습관' : 'How Palisades Park Korean customers search'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 한인 비즈니스 맞춤 서비스' : 'Services for Palisades Park Businesses'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '팰팍 웹사이트 제작' : 'Palisades Park Website Design'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '한영 이중언어 반응형 웹사이트. 모바일 최적화, 빠른 로딩 속도, 예약/주문 시스템 통합. 팰팍 한인 비즈니스 특화.'
                    : 'Bilingual Korean-English responsive websites. Mobile-optimized, fast loading, booking/ordering integration. Specialized for Palisades Park Korean businesses.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '구글 SEO & 로컬 검색' : 'Google SEO & Local Search'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"팰팍 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 한국어 키워드 SEO, 지역 검색 최적화.'
                    : 'Rank page 1 for "Palisades Park [business]". Google My Business optimization, Korean keyword SEO, local search optimization.'
                  }
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Megaphone className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  {locale === 'ko' ? '한인 커뮤니티 마케팅' : 'Korean Community Marketing'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '팰팍 한인 커뮤니티 타겟 마케팅. 카카오톡 연동, 한인 미디어 광고, 인스타그램/페이스북 한국어 광고.'
                    : 'Targeted marketing for Palisades Park Korean community. KakaoTalk integration, Korean media ads, Korean-language social ads.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Serving Areas */}
        <section className="py-16 px-4 bg-white text-gray-900">
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
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Types */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 업종별 전문 마케팅' : 'Industry-Specific Marketing for Palisades Park'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍽️', title: '한식당 & 카페', desc: '온라인 메뉴, 배달앱 연동, 구글 리뷰 관리, 음식 사진 촬영' },
                { icon: '💇', title: '뷰티 & 네일살롱', desc: '온라인 예약, 인스타그램 마케팅, 비포/애프터 갤러리' },
                { icon: '⚖️', title: '법률 사무소', desc: '이민/비즈니스법 상담 예약, 한영 이중언어 사이트' },
                { icon: '🏥', title: '의료 & 치과', desc: '환자 예약 시스템, 보험 안내, 한국어 상담 페이지' },
                { icon: '🏪', title: '소매 & 마트', desc: '온라인 주문, 전단지 디자인, 세일 프로모션 관리' },
                { icon: '🏫', title: '학원 & 교육', desc: '수강 등록, 온라인 수업 연동, 학부모 커뮤니케이션' },
              ] : [
                { icon: '🍽️', title: 'Korean Restaurants & Cafes', desc: 'Online menus, delivery app integration, Google review management' },
                { icon: '💇', title: 'Beauty & Nail Salons', desc: 'Online booking, Instagram marketing, before/after galleries' },
                { icon: '⚖️', title: 'Law Offices', desc: 'Immigration/business law consultation booking, bilingual sites' },
                { icon: '🏥', title: 'Medical & Dental', desc: 'Patient scheduling, insurance info, Korean consultation pages' },
                { icon: '🏪', title: 'Retail & Grocery', desc: 'Online ordering, flyer design, sale promotion management' },
                { icon: '🏫', title: 'Tutoring & Education', desc: 'Enrollment, online class integration, parent communication' },
              ]).map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 border rounded-lg bg-white">
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
                ? '팰팍 한인 비즈니스의 성장 파트너'
                : "Your Palisades Park Business Growth Partner"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '지금 무료 상담을 예약하세요. 팰팍 한인 비즈니스 전문 마케팅으로 매출을 높이세요.'
                : 'Book your free consultation today. Grow your Palisades Park business with expert Korean marketing.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="inline-block px-10 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
              </Link>
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}fort-lee-web-design`} className="inline-block px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {locale === 'ko' ? '포트리 서비스 보기' : 'See Fort Lee Services'}
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
