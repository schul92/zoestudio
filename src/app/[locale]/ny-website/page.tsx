import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Globe, Search, Zap } from 'lucide-react'

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  
  if (locale === 'ko') {
    return {
      title: '뉴욕 웹사이트 제작 전문 | NYC 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '뉴욕 웹사이트 제작 1위 업체. 맨하탄, 브루클린, 퀸즈 한인 비즈니스를 위한 전문 웹사이트 개발. 뉴욕 로컬 SEO, 구글 최적화, 쇼피파이 이커머스 전문.',
      keywords: '뉴욕 웹사이트, 뉴욕 웹사이트 제작, NYC 웹개발, 뉴욕 한인 웹사이트, 맨하탄 웹사이트, 브루클린 웹사이트, 퀸즈 웹사이트, 플러싱 웹사이트, 뉴욕 쇼피파이, 뉴욕 이커머스, 뉴욕 SEO, 뉴욕 구글 광고',
      openGraph: {
        title: '뉴욕 웹사이트 제작 전문 - ZOE LUMOS',
        description: '뉴욕 최고의 한인 웹사이트 제작 업체. 맨하탄부터 플러싱까지, NYC 전 지역 한인 비즈니스를 위한 맞춤 웹사이트 개발.',
        url: `${baseUrl}/ko/ny-website`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/ny-website`,
        languages: {
          'x-default': `${baseUrl}/ny-website`,
          'en': `${baseUrl}/ny-website`,
          'ko': `${baseUrl}/ko/ny-website`,
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
    title: 'New York Website Design & Development | NYC Web Agency | ZOE LUMOS',
    description: '#1 Website development in New York. Professional web design for Manhattan, Brooklyn, Queens businesses. Local NYC SEO, Google optimization, Shopify e-commerce experts.',
    keywords: 'New York website, NYC web design, Manhattan website, Brooklyn website, Queens website, Flushing website, New York Shopify, NYC e-commerce, New York SEO, NYC Google Ads',
    openGraph: {
      title: 'New York Website Design & Development - ZOE LUMOS',
      description: 'Leading web development agency in New York. Custom websites for NYC businesses from Manhattan to Flushing.',
      url: `${baseUrl}/ny-website`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/ny-website`,
      languages: {
        'x-default': `${baseUrl}/ny-website`,
        'en': `${baseUrl}/ny-website`,
        'ko': `${baseUrl}/ko/ny-website`,
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

export default function NYWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  
  // Structured data for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: 'ZOE LUMOS - New York Website Design',
    description: locale === 'ko' 
      ? '뉴욕 최고의 웹사이트 제작 전문 업체'
      : 'Premier website design agency in New York',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}ny-website`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'New York City',
        '@id': 'https://en.wikipedia.org/wiki/New_York_City'
      },
      {
        '@type': 'City',
        name: 'Manhattan',
      },
      {
        '@type': 'City',
        name: 'Brooklyn',
      },
      {
        '@type': 'City',
        name: 'Queens',
      },
      {
        '@type': 'City',
        name: 'Flushing',
      }
    ],
    priceRange: '$1,000-$10,000',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHours: 'Mo-Fr 09:00-18:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    sameAs: [
      'https://www.instagram.com/zoelumos',
      'https://www.linkedin.com/company/zoelumos',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '뉴욕에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '뉴욕 웹사이트 제작 비용은 $1,000부터 시작합니다. 소규모 비즈니스는 $1,000-$3,000, 이커머스는 $3,000-$6,000 수준입니다. 맨하탄, 브루클린, 퀸즈 전 지역 동일 가격입니다.'
        }
      },
      {
        '@type': 'Question',
        name: '뉴욕 한인 비즈니스를 위한 웹사이트 제작이 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 저희는 뉴욕 한인 비즈니스 전문입니다. 플러싱, 베이사이드, 맨하탄 K-Town 등 NYC 전역의 한인 비즈니스를 위한 이중언어 웹사이트를 제작합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '뉴욕 로컬 SEO도 포함되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 모든 웹사이트에 뉴욕 로컬 SEO가 포함됩니다. Google My Business 최적화, 뉴욕 지역 키워드 타겟팅, 로컬 백링크 구축을 통해 뉴욕 검색 결과 상위 노출을 보장합니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does website design cost in New York?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website design in New York starts at $1,000. Small business websites range from $1,000-$3,000, while e-commerce sites are $3,000-$6,000. Same pricing across Manhattan, Brooklyn, and Queens.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you serve Korean businesses in NYC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in Korean-American businesses in NYC. We create bilingual websites for businesses in Flushing, Bayside, Manhattan K-Town, and throughout the New York area.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is New York local SEO included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all websites include NYC local SEO. We optimize Google My Business, target New York-specific keywords, and build local backlinks to ensure top rankings in New York search results.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HeaderWrapper locale={locale} />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {locale === 'ko' 
                  ? '뉴욕 웹사이트 제작 전문'
                  : 'New York Website Design & Development'
                }
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                {locale === 'ko'
                  ? '맨하탄, 브루클린, 퀸즈, 플러싱 - NYC 전 지역 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스'
                  : 'Premier web development for Manhattan, Brooklyn, Queens, and Flushing businesses. #1 in NYC.'
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
            
            {/* NYC Districts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { name: locale === 'ko' ? '맨하탄' : 'Manhattan', icon: '🏙️' },
                { name: locale === 'ko' ? '브루클린' : 'Brooklyn', icon: '🌉' },
                { name: locale === 'ko' ? '퀸즈' : 'Queens', icon: '🏘️' },
                { name: locale === 'ko' ? '플러싱' : 'Flushing', icon: '🏪' },
              ].map((district) => (
                <div key={district.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                  <span className="text-2xl mb-2 block">{district.icon}</span>
                  <p className="font-bold text-gray-900">{district.name}</p>
                  <p className="text-sm text-gray-600">
                    {locale === 'ko' ? '서비스 지역' : 'Service Area'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' 
                ? '왜 뉴욕 비즈니스들이 저희를 선택할까요?'
                : 'Why NYC Businesses Choose Us'
              }
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '뉴욕 SEO 전문' : 'NYC SEO Experts'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '구글에서 "뉴욕 [업종]" 검색시 1페이지 노출. 로컬 SEO로 뉴욕 고객 유치'
                    : 'Rank #1 for "New York [your business]" searches. Local SEO to attract NYC customers'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '한영 이중언어' : 'Bilingual Korean-English'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '뉴욕 한인 고객과 미국 주류 고객 모두를 위한 완벽한 이중언어 웹사이트'
                    : 'Perfect bilingual websites for both Korean and mainstream American customers in NYC'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '빠른 제작' : 'Fast Turnaround'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '뉴욕 비즈니스 속도에 맞춘 3-7일 완성. 맨하탄 미팅 가능'
                    : '3-7 day completion matching NYC business speed. In-person meetings in Manhattan'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NYC Specific Services */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' 
                ? '뉴욕 비즈니스를 위한 특별 서비스'
                : 'Services for New York Businesses'
              }
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ko' ? '뉴욕 레스토랑 & 카페' : 'NYC Restaurants & Cafes'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '온라인 주문 시스템' : 'Online ordering system'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? 'DoorDash, UberEats 연동' : 'DoorDash, UberEats integration'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '뉴욕 푸드 블로거 SEO' : 'NYC food blogger SEO'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? 'Yelp, Google Reviews 최적화' : 'Yelp, Google Reviews optimization'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ko' ? '뉴욕 리테일 & 쇼핑몰' : 'NYC Retail & Shopping'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? 'Shopify 이커머스 구축' : 'Shopify e-commerce setup'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? 'NYC 배송 시스템' : 'NYC delivery system'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '재고 관리 시스템' : 'Inventory management'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '뉴욕 세금 계산기' : 'NYC tax calculator'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact locale={locale} />
      </main>
      
      <Footer locale={locale} />
    </>
  )
}