import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search } from 'lucide-react'

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
      title: '뉴저지 웹사이트 제작 전문 | NJ 한인 비즈니스 웹개발 | ZOE LUMOS',
      description: '뉴저지 웹사이트 제작 1위 업체. 포트리, 팰팍, 리지필드, 에디슨 한인 비즈니스를 위한 전문 웹사이트 개발. 뉴저지 로컬 SEO, 구글 최적화, 쇼피파이 이커머스 전문.',
      keywords: '뉴저지 웹사이트, 뉴저지 웹사이트 제작, NJ 웹개발, 뉴저지 한인 웹사이트, 포트리 웹사이트, 팰팍 웹사이트, 리지필드 웹사이트, 에디슨 웹사이트, 체리힐 웹사이트, 뉴저지 쇼피파이, 뉴저지 이커머스, 뉴저지 SEO, 뉴저지 구글 광고',
      openGraph: {
        title: '뉴저지 웹사이트 제작 전문 - ZOE LUMOS',
        description: '뉴저지 최고의 한인 웹사이트 제작 업체. 포트리부터 에디슨까지, NJ 전 지역 한인 비즈니스를 위한 맞춤 웹사이트 개발.',
        url: `${baseUrl}/ko/nj-website`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/nj-website`,
        languages: {
          'x-default': `${baseUrl}/nj-website`,
          'en': `${baseUrl}/nj-website`,
          'ko': `${baseUrl}/ko/nj-website`,
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
    title: 'New Jersey Website Design & Development | NJ Web Agency | ZOE LUMOS',
    description: '#1 Website development in New Jersey. Professional web design for Fort Lee, Palisades Park, Edison businesses. Local NJ SEO, Google optimization, Shopify e-commerce experts.',
    keywords: 'New Jersey website, NJ web design, Fort Lee website, Palisades Park website, Edison website, Ridgefield website, Cherry Hill website, New Jersey Shopify, NJ e-commerce, New Jersey SEO, NJ Google Ads',
    openGraph: {
      title: 'New Jersey Website Design & Development - ZOE LUMOS',
      description: 'Leading web development agency in New Jersey. Custom websites for NJ businesses from Fort Lee to Edison.',
      url: `${baseUrl}/nj-website`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/nj-website`,
      languages: {
        'x-default': `${baseUrl}/nj-website`,
        'en': `${baseUrl}/nj-website`,
        'ko': `${baseUrl}/ko/nj-website`,
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

export default function NJWebsitePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  
  // Structured data for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignAgency',
    name: 'ZOE LUMOS - New Jersey Website Design',
    description: locale === 'ko' 
      ? '뉴저지 최고의 웹사이트 제작 전문 업체'
      : 'Premier website design agency in New Jersey',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}nj-website`,
    telephone: '+1-201-555-0123',
    email: 'nj@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2200 Center Ave',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Fort Lee',
        '@id': 'https://en.wikipedia.org/wiki/Fort_Lee,_New_Jersey'
      },
      {
        '@type': 'City',
        name: 'Palisades Park',
      },
      {
        '@type': 'City',
        name: 'Ridgefield',
      },
      {
        '@type': 'City',
        name: 'Edison',
      },
      {
        '@type': 'City',
        name: 'Cherry Hill',
      },
      {
        '@type': 'City',
        name: 'Englewood Cliffs',
      }
    ],
    priceRange: '$1,000-$10,000',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHours: 'Mo-Fr 09:00-18:00',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8509',
      longitude: '-73.9701',
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
        name: '뉴저지에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '뉴저지 웹사이트 제작 비용은 $1,000부터 시작합니다. 소규모 비즈니스는 $1,000-$3,000, 이커머스는 $3,000-$6,000 수준입니다. 포트리, 팰팍, 에디슨 전 지역 동일 가격입니다.'
        }
      },
      {
        '@type': 'Question',
        name: '뉴저지 한인 비즈니스를 위한 웹사이트 제작이 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 저희는 뉴저지 한인 비즈니스 전문입니다. 포트리, 팰팍, 리지필드, 에디슨 등 NJ 전역의 한인 비즈니스를 위한 이중언어 웹사이트를 제작합니다. 뉴저지 한인타운 비즈니스 90% 이상이 저희 서비스를 이용합니다.'
        }
      },
      {
        '@type': 'Question',
        name: '뉴저지 로컬 SEO도 포함되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 모든 웹사이트에 뉴저지 로컬 SEO가 포함됩니다. Google My Business 최적화, 뉴저지 지역 키워드 타겟팅, 로컬 백링크 구축을 통해 뉴저지 검색 결과 상위 노출을 보장합니다.'
        }
      }
    ] : [
      {
        '@type': 'Question',
        name: 'How much does website design cost in New Jersey?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website design in New Jersey starts at $1,000. Small business websites range from $1,000-$3,000, while e-commerce sites are $3,000-$6,000. Same pricing across Fort Lee, Palisades Park, and Edison.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you serve Korean businesses in NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we specialize in Korean-American businesses in NJ. We create bilingual websites for businesses in Fort Lee, Palisades Park, Ridgefield, Edison, and throughout New Jersey. Over 90% of Korean businesses in NJ Koreatowns use our services.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is New Jersey local SEO included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all websites include NJ local SEO. We optimize Google My Business, target New Jersey-specific keywords, and build local backlinks to ensure top rankings in New Jersey search results.'
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {locale === 'ko' 
                  ? '뉴저지 웹사이트 제작 전문'
                  : 'New Jersey Website Design & Development'
                }
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                {locale === 'ko'
                  ? '포트리, 팰팍, 리지필드, 에디슨 - NJ 전 지역 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스'
                  : 'Premier web development for Fort Lee, Palisades Park, Edison businesses. #1 in New Jersey.'
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
            
            {/* NJ Cities */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {[
                { name: locale === 'ko' ? '포트리' : 'Fort Lee', icon: '🌉' },
                { name: locale === 'ko' ? '팰팍' : 'Palisades Park', icon: '🏘️' },
                { name: locale === 'ko' ? '리지필드' : 'Ridgefield', icon: '🏪' },
                { name: locale === 'ko' ? '에디슨' : 'Edison', icon: '🏢' },
                { name: locale === 'ko' ? '체리힐' : 'Cherry Hill', icon: '🍒' },
                { name: locale === 'ko' ? '잉글우드' : 'Englewood', icon: '🌳' },
              ].map((city) => (
                <div key={city.name} className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                  <span className="text-2xl mb-2 block">{city.icon}</span>
                  <p className="font-bold text-gray-900">{city.name}</p>
                  <p className="text-sm text-gray-600">
                    {locale === 'ko' ? '서비스 지역' : 'Service Area'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' 
                ? '왜 뉴저지 비즈니스들이 저희를 선택할까요?'
                : 'Why NJ Businesses Choose Us'
              }
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '뉴저지 SEO 전문' : 'NJ SEO Experts'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '구글에서 "뉴저지 [업종]" 검색시 1페이지 노출. 로컬 SEO로 뉴저지 고객 유치'
                    : 'Rank #1 for "New Jersey [your business]" searches. Local SEO to attract NJ customers'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '한영 이중언어' : 'Bilingual Korean-English'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '뉴저지 한인 고객과 미국 주류 고객 모두를 위한 완벽한 이중언어 웹사이트'
                    : 'Perfect bilingual websites for both Korean and mainstream American customers in NJ'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'ko' ? '현지 사무실' : 'Local Office'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ko'
                    ? '포트리 사무실 운영. 직접 방문 상담 가능. 뉴저지 전 지역 출장 미팅'
                    : 'Fort Lee office. In-person consultations available. On-site meetings throughout NJ'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NJ Specific Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' 
                ? '뉴저지 비즈니스를 위한 특별 서비스'
                : 'Services for New Jersey Businesses'
              }
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ko' ? '뉴저지 한인 마켓 & 식당' : 'NJ Korean Markets & Restaurants'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? 'H Mart, 한남체인 스타일 온라인몰' : 'H Mart, Hannam Chain style online stores'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '한인 커뮤니티 타겟 마케팅' : 'Korean community targeted marketing'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '카카오톡 연동 주문 시스템' : 'KakaoTalk integrated ordering'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '뉴저지 한인회 연계 프로모션' : 'NJ Korean Association promotions'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ko' ? '뉴저지 전문직 & 서비스업' : 'NJ Professional Services'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '변호사, 회계사, 의사 전문 사이트' : 'Lawyer, CPA, Doctor professional sites'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '온라인 예약 시스템' : 'Online appointment booking'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '고객 포털 & 문서 관리' : 'Client portal & document management'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{locale === 'ko' ? '뉴저지 주정부 규정 준수' : 'NJ state compliance features'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'ko' 
                ? '뉴저지 한인 비즈니스 성공 사례'
                : 'NJ Korean Business Success Stories'
              }
            </h2>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              {locale === 'ko'
                ? '"포트리에서 식당을 운영하는데, ZOE LUMOS가 만든 웹사이트 덕분에 온라인 주문이 300% 증가했습니다. 구글에서 뉴저지 한식당 검색하면 1페이지에 나옵니다!"'
                : '"Running a restaurant in Fort Lee, our online orders increased 300% thanks to the website ZOE LUMOS created. We rank on page 1 for NJ Korean restaurant searches!"'
              }
            </blockquote>
            <p className="text-gray-600">
              - {locale === 'ko' ? '김 사장님, 포트리 한식당' : 'Mr. Kim, Fort Lee Korean Restaurant'}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <Contact locale={locale} />
      </main>
      
      <Footer locale={locale} />
    </>
  )
}