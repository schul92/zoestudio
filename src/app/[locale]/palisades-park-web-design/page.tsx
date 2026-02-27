import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, TrendingUp, Shield } from 'lucide-react'

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
      title: '팰팍 웹사이트 제작 | 팰리세이즈파크 한인 웹디자인 전문 | ZOE LUMOS',
      description: '팰팍 한인 비즈니스 웹사이트 제작 전문. Broad Ave 상권 맞춤 웹디자인, 구글 SEO, 로컬 마케팅. 100% 한국어 상담.',
      keywords: '팰팍 웹사이트, 팰리세이즈파크 웹사이트, Palisades Park 웹사이트, 팰팍 홈페이지 제작, 팰팍 한인 비즈니스, 팰팍 웹디자인, 팰팍 SEO, 팰팍 구글 광고, 팰팍 마케팅, 버겐카운티 한인 웹사이트',
      openGraph: {
        title: '팰팍 웹사이트 제작 전문 - ZOE LUMOS',
        description: '팰리세이즈파크(팰팍) 한인 비즈니스를 위한 웹사이트 제작 & 디지털 마케팅 전문.',
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
    title: 'Palisades Park Web Design | Korean Business Website Experts NJ | ZOE LUMOS',
    description: 'Palisades Park NJ web design for Korean-American businesses. Broad Ave specialists for websites, local SEO, and Google Ads. Bilingual Korean/English.',
    keywords: 'Palisades Park web design, Palisades Park NJ website, Palisades Park web developer, Korean business Palisades Park, Palisades Park SEO, Broad Ave businesses, Korean American web design NJ, Bergen County web design',
    openGraph: {
      title: 'Palisades Park Web Design - Korean Business Experts | ZOE LUMOS',
      description: 'Web design agency specializing in Korean-American businesses in Palisades Park, NJ.',
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
      ? '팰리세이즈파크 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Web design agency specializing in Korean-American businesses in Palisades Park, NJ',
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
      longitude: '-73.9979',
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
          text: '팰팍 지역 웹사이트 제작은 $1,000부터 시작합니다. Broad Ave 소규모 비즈니스부터 대형 이커머스까지 맞춤 견적. 무료 상담으로 정확한 가격을 확인하세요.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 한인 식당 웹사이트도 만들어주나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, Broad Ave와 팰팍 전역의 한식당, 카페, 베이커리 웹사이트 전문입니다. 온라인 메뉴, 예약 시스템, 배달앱 연동, 구글 맵 최적화까지 포함됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 비즈니스 구글 검색 1페이지에 나오게 할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 팰팍 로컬 SEO 전문가로서 "팰팍 [업종]" 키워드로 구글 1페이지 노출을 목표합니다. Google My Business 최적화, 한국어/영어 키워드 최적화 포함.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does a website cost for a Palisades Park business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park business websites start at $1,000. From Broad Ave small shops to large e-commerce, we provide custom quotes. Free consultation available.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you build websites for Korean restaurants in Palisades Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in Korean restaurant, cafe, and bakery websites on Broad Ave and throughout Palisades Park. Includes online menus, reservations, delivery app integration, and Google Maps optimization.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you help my Palisades Park business rank on Google page 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, as Palisades Park local SEO experts, we target "Palisades Park [your business]" keywords for Google page 1 rankings. Includes Google Business Profile optimization, bilingual keyword targeting.'
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
                ? <>팰팍 웹사이트 제작<br /><span className="text-green-600">Broad Ave 비즈니스 전문</span></>
                : <>Palisades Park<br />Web Design<br /><span className="text-green-600">Korean Business Experts</span></>
              }
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '뉴저지 최대 한인타운 팰팍의 비즈니스를 위한 전문 웹사이트 제작. Broad Ave 상권부터 Grand Ave까지, 한인 비즈니스의 온라인 성공을 만듭니다.'
                : "NJ's largest Koreatown deserves expert web design. From Broad Ave to Grand Ave, we build online success for Korean-American businesses in Palisades Park."
              }
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담 (한국어)' : '📞 Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>{locale === 'ko' ? '팰팍 & 포트리 한인 비즈니스 50+' : '50+ Palisades Park & Fort Lee Businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>{locale === 'ko' ? '100% 한국어 상담' : '100% Korean Consultation'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '왜 팰팍 비즈니스에 전문 웹사이트가 필요한가요?' : 'Why Palisades Park Businesses Need Expert Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크는 미국에서 한인 인구 비율이 가장 높은 도시입니다. 경쟁이 치열한 만큼, 전문적인 온라인 존재가 필수입니다.'
                : 'Palisades Park has the highest Korean population percentage in the US. In this competitive market, a professional online presence is essential.'
              }
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl font-black text-green-600 mb-2">52%</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? '팰팍 한인 인구 비율' : 'Korean Population in Palisades Park'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-black text-blue-600 mb-2">200+</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? 'Broad Ave 한인 비즈니스' : 'Korean Businesses on Broad Ave'}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-black text-red-600 mb-2">73%</div>
                <p className="text-gray-700 font-semibold">
                  {locale === 'ko' ? '모바일 검색 비율' : 'Mobile Search Rate'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '팰팍 비즈니스 맞춤 서비스' : 'Services for Palisades Park Businesses'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Globe className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '한영 웹사이트' : 'Bilingual Websites'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '한국어/영어 완벽 지원. 한인 고객과 미국 고객 모두 타겟'
                    : 'Perfect Korean/English support. Target both Korean and American customers'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Search className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '팰팍 로컬 SEO' : 'Palisades Park Local SEO'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '"팰팍 [업종]" 구글 1페이지. 한국어 검색 최적화 포함'
                    : '"Palisades Park [business]" Google page 1. Korean search optimization'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <TrendingUp className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '구글 & 옐프 광고' : 'Google & Yelp Ads'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '팰팍 지역 타겟 광고. 한인 고객 유치에 최적화된 광고 운영'
                    : 'Palisades Park targeted ads. Optimized for Korean customer acquisition'
                  }
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'ko' ? '쇼피파이 쇼핑몰' : 'Shopify E-Commerce'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ko'
                    ? '팰팍 한인 쇼핑몰 제작. 한국 결제/배송 시스템 연동'
                    : 'Korean e-commerce stores. Korean payment & shipping integration'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Broad Ave Business Types */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {locale === 'ko' ? 'Broad Ave 업종별 전문 웹사이트' : 'Broad Ave Industry-Specific Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {locale === 'ko' ? '팰팍 Broad Ave의 다양한 업종에 맞춤화된 웹사이트를 제작합니다' : 'Custom websites for every type of business on Broad Ave'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍖', title: '한식당 & BBQ', desc: '온라인 메뉴, 예약, DoorDash/Uber Eats 연동' },
                { icon: '🧁', title: '베이커리 & 카페', desc: '주문 시스템, 케이크 커스텀 주문, 갤러리' },
                { icon: '💆', title: '스파 & 뷰티', desc: '온라인 예약, 시술 메뉴, 전후 사진 갤러리' },
                { icon: '🦷', title: '치과 & 의원', desc: '환자 예약, 보험 정보, 한국어 안내' },
                { icon: '📱', title: '핸드폰 & 전자제품', desc: '제품 카탈로그, 수리 예약, 재고 관리' },
                { icon: '🏪', title: '슈퍼마켓 & 식품점', desc: '주간 특가, 온라인 주문, 배달 서비스' },
              ] : [
                { icon: '🍖', title: 'Korean BBQ & Restaurants', desc: 'Online menus, reservations, DoorDash/Uber Eats integration' },
                { icon: '🧁', title: 'Bakeries & Cafes', desc: 'Order systems, custom cake orders, photo galleries' },
                { icon: '💆', title: 'Spas & Beauty', desc: 'Online booking, service menus, before/after galleries' },
                { icon: '🦷', title: 'Dental & Medical', desc: 'Patient scheduling, insurance info, Korean language support' },
                { icon: '📱', title: 'Phone & Electronics', desc: 'Product catalogs, repair booking, inventory management' },
                { icon: '🏪', title: 'Supermarkets & Grocery', desc: 'Weekly specials, online ordering, delivery service' },
              ]).map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 border rounded-lg hover:shadow-md transition-shadow">
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
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
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
                ? '팰팍 한인 비즈니스의 온라인 성공 파트너'
                : "Your Palisades Park Business Deserves a Great Website"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko'
                ? '100% 한국어 상담. 팰팍 비즈니스에 대한 깊은 이해. 오늘 무료 상담을 시작하세요.'
                : '100% Korean consultation available. Deep understanding of Palisades Park businesses. Start your free consultation today.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="inline-block px-10 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
              </Link>
              <Link href="#contact" className="inline-block px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {locale === 'ko' ? '상담 바로 예약' : 'Book Consultation'}
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
