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
      description: '팰리세이즈파크(Palisades Park) 웹사이트 제작 전문. 팰팍 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 구글 광고. 팰팍 브로드애비뉴 한인 상가 전문. 100% 한국어 상담.',
      keywords: '팰리세이즈파크 웹사이트, 팰팍 웹사이트, 팰팍 웹디자인, Palisades Park 웹사이트, 팰팍 홈페이지 제작, 팰팍 한인 비즈니스, 팰팍 구글 광고, 팰팍 SEO, 버겐카운티 웹사이트, 팰팍 한인 마케팅',
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
    title: 'Palisades Park Web Design | Korean Business Website Expert NJ | ZOE LUMOS',
    description: 'Palisades Park, NJ web design agency specializing in Korean-American businesses. Website development, local SEO, Google Ads for Broad Avenue businesses. Bilingual Korean & English. Free consultation.',
    keywords: 'Palisades Park web design, Palisades Park NJ website, Korean business Palisades Park, Broad Avenue web design, Bergen County web design, Korean American web design NJ, Palisades Park SEO',
    openGraph: {
      title: 'Palisades Park Web Design - ZOE LUMOS',
      description: 'Web design agency in Palisades Park, NJ. Korean-American business specialists on Broad Avenue.',
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
    name: 'ZOE LUMOS - Palisades Park Web Design',
    description: locale === 'ko'
      ? '팰리세이즈파크 한인 비즈니스 웹사이트 제작 전문'
      : 'Web design agency specializing in Korean-American businesses in Palisades Park',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}palisades-park-web-design`,
    telephone: '+1-201-555-0123',
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Palisades Park',
      addressRegion: 'NJ',
      postalCode: '07650',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Leonia' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Edgewater' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8482',
      longitude: '-73.9976',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
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
          text: '팰리세이즈파크 한인 비즈니스 웹사이트 제작은 $1,000부터 시작합니다. 레스토랑, 네일샵, 뷰티샵 등 업종별 맞춤 패키지를 제공합니다. 브로드애비뉴 방문 상담 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '팰팍 한인 비즈니스에 SEO가 필요한 이유는?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '팰리세이즈파크는 미국 최대 한인 밀집 지역 중 하나입니다. 구글에서 "팰팍 [업종]"을 검색하는 고객이 매일 증가하고 있어, SEO 최적화된 웹사이트가 필수입니다.'
        }
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Palisades Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website design for Palisades Park businesses starts at $1,000. We offer custom packages for restaurants, nail salons, beauty shops, and other local businesses. Free in-person consultation on Broad Avenue.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why do Palisades Park businesses need SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Palisades Park has one of the largest Korean-American communities in the US. More customers search Google for "Palisades Park [business type]" every day, making an SEO-optimized website essential for visibility.'
        }
      },
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <HeaderWrapper locale={locale} />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {locale === 'ko' ? '팰리세이즈파크, NJ' : 'Palisades Park, NJ'}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {locale === 'ko' 
                  ? '팰팍 웹사이트 제작 전문'
                  : 'Palisades Park Web Design'
                }
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                {locale === 'ko'
                  ? '브로드애비뉴부터 전 지역까지 — 팰팍 한인 비즈니스를 위한 맞춤 웹사이트와 디지털 마케팅'
                  : 'From Broad Avenue to every corner — custom websites and digital marketing for Palisades Park Korean-American businesses'
                }
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`/${locale === 'ko' ? 'ko/' : ''}pricing`}
                  className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                  {locale === 'ko' ? '가격 보기' : 'View Pricing'}
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
                >
                  {locale === 'ko' ? '무료 상담' : 'Free Consultation'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park Businesses Need a Website */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              {locale === 'ko' 
                ? '팰팍 비즈니스에 웹사이트가 필수인 이유'
                : 'Why Every Palisades Park Business Needs a Website'
              }
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {locale === 'ko'
                ? '팰리세이즈파크는 인구의 52%가 한인입니다. 온라인 검색으로 비즈니스를 찾는 고객이 매년 증가하고 있습니다.'
                : 'Palisades Park is 52% Korean-American. More customers find businesses through online search every year.'
              }
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {locale === 'ko' ? '구글 검색 1위' : 'Rank #1 on Google'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '"팰팍 네일샵", "팰팍 레스토랑" 등 검색 시 1페이지 노출. 로컬 SEO 최적화 포함.'
                    : 'Appear on page 1 for "Palisades Park nail salon", "Palisades Park restaurant" and more. Local SEO included.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {locale === 'ko' ? '한영 이중언어' : 'Korean & English'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '한국어와 영어 모두 지원하는 이중언어 웹사이트. 한인 고객과 미국 주류 고객 모두 확보.'
                    : 'Bilingual websites serving both Korean and English-speaking customers in the Palisades Park community.'
                  }
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {locale === 'ko' ? '리뷰 최적화' : 'Review Optimization'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? 'Google, Yelp 리뷰 관리 및 최적화. 팰팍 고객들의 긍정적 리뷰로 신뢰도 상승.'
                    : 'Google and Yelp review management. Build trust with positive reviews from Palisades Park customers.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Business Types */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {locale === 'ko' 
                ? '팰팍 업종별 웹사이트 솔루션'
                : 'Web Solutions by Business Type'
              }
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: '🍜', name: locale === 'ko' ? '레스토랑 & 카페' : 'Restaurants & Cafes', desc: locale === 'ko' ? '메뉴, 온라인 주문, 배달 연동' : 'Menu, online ordering, delivery integration' },
                { emoji: '💅', name: locale === 'ko' ? '네일샵 & 뷰티' : 'Nail & Beauty Salons', desc: locale === 'ko' ? '예약 시스템, 갤러리, 리뷰' : 'Booking system, gallery, reviews' },
                { emoji: '🏥', name: locale === 'ko' ? '의료 & 한의원' : 'Medical & Clinics', desc: locale === 'ko' ? '환자 예약, HIPAA 준수' : 'Patient booking, HIPAA compliant' },
                { emoji: '🏠', name: locale === 'ko' ? '부동산' : 'Real Estate', desc: locale === 'ko' ? 'MLS 연동, 매물 검색' : 'MLS integration, property search' },
                { emoji: '📚', name: locale === 'ko' ? '학원 & 교육' : 'Education & Tutoring', desc: locale === 'ko' ? '수강 등록, 스케줄 관리' : 'Enrollment, schedule management' },
                { emoji: '🛒', name: locale === 'ko' ? '소매점 & 마켓' : 'Retail & Markets', desc: locale === 'ko' ? '이커머스, 재고 관리' : 'E-commerce, inventory management' },
              ].map((biz) => (
                <div key={biz.name} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                  <span className="text-3xl mb-3 block">{biz.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{biz.name}</h3>
                  <p className="text-gray-600 text-sm">{biz.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {locale === 'ko' ? '주변 지역 서비스' : 'Also Serving Nearby Areas'}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: locale === 'ko' ? '포트리' : 'Fort Lee', href: `/${locale}/fort-lee-web-design` },
                { name: locale === 'ko' ? '클리프사이드파크' : 'Cliffside Park', href: '#' },
                { name: locale === 'ko' ? '리오니아' : 'Leonia', href: '#' },
                { name: locale === 'ko' ? '에지워터' : 'Edgewater', href: '#' },
                { name: locale === 'ko' ? '잉글우드' : 'Englewood', href: `/${locale}/englewood-nj-seo` },
                { name: locale === 'ko' ? '노스버겐' : 'North Bergen', href: `/${locale}/north-bergen-web-design` },
              ].map((area) => (
                <Link key={area.name} href={area.href} className="px-6 py-3 bg-gray-100 rounded-full text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors font-medium">
                  {area.name}
                </Link>
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
