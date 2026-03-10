import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search, CheckCircle, Star, Users, Zap, Mail, MapPin } from 'lucide-react'

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

  return {
    title: locale === 'ko'
      ? '텍사스 웹사이트 제작 | 달라스 휴스턴 한인 홈페이지 전문 | 조이루모스'
      : 'Texas Website Design | Dallas Houston Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '텍사스 웹사이트 제작 전문 업체 조이루모스. 달라스, 휴스턴, 캐롤턴 한인 홈페이지 제작. SEO, 구글 상위노출, 광고대행, 소셜미디어 관리, 구글/인스타 광고.'
      : 'Professional Texas website design for Korean-American businesses. Dallas, Houston, Carrollton web development. TX SEO, Google ranking, e-commerce.',
    keywords: locale === 'ko'
      ? '텍사스 웹사이트, 텍사스 웹사이트 제작, 달라스 웹사이트, 휴스턴 웹사이트, 캐롤턴 웹사이트, 텍사스 한인 웹사이트, 달라스 한인 홈페이지, 텍사스 쇼핑몰, 텍사스 SEO, 텍사스 구글광고, 텍사스 광고대행, 텍사스 소셜미디어, 텍사스 인스타광고, 한인 광고대행'
      : 'Texas website, TX website design, Dallas Korean website, Houston Korean website, Carrollton website, TX Shopify, TX SEO, Texas social media management, Texas Google Ads, Texas Korean advertising agency',
    openGraph: {
      title: locale === 'ko' ? '텍사스 웹사이트 제작 전문 - 조이루모스' : 'Texas Website Design - ZOE LUMOS',
      description: locale === 'ko'
        ? '텍사스 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스. 달라스, 휴스턴 전 지역.'
        : 'Premier website design for TX Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/텍사스-웹사이트` : `${baseUrl}/tx-website`,
      siteName: 'ZOE LUMOS 조이루모스',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{
        url: `${baseUrl}/og-tx-website.jpg`,
        width: 1200,
        height: 630,
        alt: locale === 'ko' ? '텍사스 웹사이트 제작' : 'Texas Website Design',
      }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/텍사스-웹사이트` : `${baseUrl}/tx-website`,
      languages: {
        'x-default': `${baseUrl}/tx-website`,
        'en': `${baseUrl}/tx-website`,
        'ko': `${baseUrl}/ko/텍사스-웹사이트`,
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

export default function TXWebsiteKoreanPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const isKorean = locale === 'ko'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZOE LUMOS 조이루모스',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: isKorean
      ? '텍사스 한인 비즈니스를 위한 웹사이트 제작 전문 업체'
      : 'Professional web design agency for Korean-American businesses in Texas',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@zoelumos.com',
      contactType: 'sales',
      availableLanguage: ['English', 'Korean'],
    },
    sameAs: [
      'https://www.instagram.com/zoelumos',
    ],
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#texas-service`,
    name: isKorean ? '조이루모스 - 텍사스 웹사이트 제작' : 'ZOE LUMOS - Texas Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean
      ? '텍사스 한인 비즈니스를 위한 웹사이트 제작 전문. 달라스, 휴스턴, 캐롤턴 한인 커뮤니티 전문.'
      : 'Website design for Korean-American businesses in Texas. Dallas, Houston, Carrollton specialists.',
    url: isKorean ? `${baseUrl}/ko/텍사스-웹사이트` : `${baseUrl}/tx-website`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Dallas' },
      { '@type': 'City', name: 'Houston' },
      { '@type': 'City', name: 'Carrollton' },
      { '@type': 'City', name: 'Plano' },
      { '@type': 'City', name: 'Austin' },
      { '@type': 'State', name: 'Texas' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '텍사스 웹사이트 제작 서비스' : 'Texas Website Design Service',
    provider: {
      '@type': 'Organization',
      name: 'ZOE LUMOS',
    },
    serviceType: 'Website Design',
    areaServed: {
      '@type': 'State',
      name: 'Texas',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isKorean ? '웹사이트 제작 서비스' : 'Website Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '비즈니스 웹사이트' : 'Business Website',
          },
          price: '1000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store',
          },
          price: '3000',
          priceCurrency: 'USD',
        },
      ],
    },
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: '2026-03-01',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '텍사스 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in Texas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS의 텍사스 웹사이트 제작 비용은 기본 비즈니스 웹사이트 $1,000-$2,500, Shopify 이커머스 쇼핑몰 $3,000-$6,000입니다. 달라스, 휴스턴, 캐롤턴 등 텍사스 전 지역 동일 가격이 적용됩니다. 화상 미팅을 통해 무료 상담이 가능합니다.'
            : 'ZOE LUMOS website design pricing in Texas: basic business websites $1,000-$2,500, Shopify e-commerce stores $3,000-$6,000. Same pricing across Dallas, Houston, and Carrollton. Free consultation via video call.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '달라스에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in Dallas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, ZOE LUMOS는 텍사스 한인 비즈니스 웹사이트 제작 전문입니다. 달라스 캐롤턴 한인타운, 휴스턴 한인 커뮤니티 등 텍사스 전역의 한인 비즈니스를 지원합니다. 화상 미팅과 카카오톡으로 상담 가능하며, 한영 이중언어 웹사이트 제작이 가능합니다.'
            : 'Yes, ZOE LUMOS specializes in Korean-American business websites in Texas. We support businesses in Dallas Carrollton Koreatown, Houston Korean community, and throughout TX. Consultations via video call and KakaoTalk.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '텍사스에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Texas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS 본사는 뉴저지에 있지만, 텍사스 고객님과는 Zoom/Google Meet 화상 미팅과 카카오톡으로 편리하게 상담합니다. 텍사스 한인 비즈니스 웹사이트를 다수 제작한 경험이 있으며, 원격으로도 완벽한 웹사이트 제작이 가능합니다. 첫 상담은 무료입니다.'
            : 'ZOE LUMOS is headquartered in NJ, but we consult with Texas clients via Zoom/Google Meet and KakaoTalk. We have extensive experience building websites for Texas Korean businesses remotely. First consultation is free.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '텍사스 SEO 서비스도 제공하나요?' : 'Do you offer Texas SEO services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 텍사스 로컬 SEO 서비스를 전문 제공합니다. 달라스, 휴스턴 지역 구글 마이 비즈니스 최적화, 한국어/영어 키워드 최적화가 포함됩니다. 월정액 SEO 서비스($500/월~)로 3-6개월 내 구글 1페이지 노출을 목표로 합니다.'
            : 'Yes, we provide specialized Texas local SEO services. Includes Google My Business optimization for Dallas and Houston areas, Korean/English keyword targeting. Monthly SEO services ($500/month+) with goal of Google page 1 ranking within 3-6 months.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '기본 비즈니스 웹사이트는 평균 10일(1-2주), Shopify 이커머스 쇼핑몰은 평균 21일(2-4주)이 소요됩니다. 화상 미팅으로 실시간 진행 상황을 공유하며, 긴급 제작도 가능합니다.'
            : 'Basic business websites take about 10 days (1-2 weeks), Shopify e-commerce stores take 21 days (2-4 weeks). Progress shared via video meetings. Rush delivery available.',
        },
      },
    ],
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKorean ? '홈' : 'Home',
        item: isKorean ? `${baseUrl}/ko` : baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKorean ? '텍사스 웹사이트' : 'TX Website',
        item: isKorean ? `${baseUrl}/ko/텍사스-웹사이트` : `${baseUrl}/tx-website`,
      },
    ],
  }

  const txCities = [
    { ko: '달라스', en: 'Dallas', desc: isKorean ? '텍사스 한인 중심지' : 'TX Korean hub' },
    { ko: '캐롤턴', en: 'Carrollton', desc: isKorean ? '달라스 한인타운' : 'Dallas Koreatown' },
    { ko: '플레이노', en: 'Plano', desc: isKorean ? '한인 가족 커뮤니티' : 'Korean family community' },
    { ko: '휴스턴', en: 'Houston', desc: isKorean ? '남부 텍사스 한인 중심' : 'South TX Korean center' },
    { ko: '오스틴', en: 'Austin', desc: isKorean ? '성장하는 한인 커뮤니티' : 'Growing Korean community' },
    { ko: '샌안토니오', en: 'San Antonio', desc: isKorean ? '텍사스 남부 서비스' : 'South TX service' },
  ]

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: isKorean ? '비즈니스 웹사이트' : 'Business Website',
      desc: isKorean ? '전문적인 회사 소개 사이트' : 'Professional company website',
      price: '$1,000~',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store',
      desc: isKorean ? 'Shopify 기반 온라인 스토어' : 'Shopify-based online store',
      price: '$3,000~',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: isKorean ? '텍사스 SEO' : 'TX SEO',
      desc: isKorean ? '구글 상위 노출 최적화' : 'Google ranking optimization',
      price: '$500/mo~',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: isKorean ? '구글 광고' : 'Google Ads',
      desc: isKorean ? 'PPC 광고 관리' : 'PPC advertising management',
      price: '$300/mo~',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">
                  {isKorean ? '홈' : 'Home'}
                </Link>
                <span className="mx-2">&rsaquo;</span>
                <span className="text-gray-900">{isKorean ? '텍사스 웹사이트' : 'TX Website'}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (
                  <>
                    <span className="text-purple-600">텍사스</span> 웹사이트 제작
                  </>
                ) : (
                  <>
                    <span className="text-purple-600">Texas</span> Website Design
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean
                  ? '달라스, 휴스턴, 캐롤턴 한인 비즈니스를 위한 전문 웹사이트 제작 서비스'
                  : 'Professional website design for Korean-American businesses in Dallas, Houston & Carrollton'
                }
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean
                  ? '빠르게 성장하는 텍사스 한인 커뮤니티를 위한 맞춤형 웹사이트. 한영 이중언어, SEO 최적화, 구글 상위 노출. 화상 미팅과 카카오톡으로 편리하게 상담하세요.'
                  : 'Custom websites for the fast-growing Texas Korean community. Bilingual sites, SEO optimization, Google ranking. Consult via video call or KakaoTalk.'
                }
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link
                  href={isKorean ? '/ko/pricing' : '/pricing'}
                  className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
                >
                  {isKorean ? '가격 보기' : 'View Pricing'}
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors"
                >
                  {isKorean ? '무료 상담' : 'Free Consultation'}
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>{isKorean ? '화상 미팅 상담' : 'Video Consultation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span>{isKorean ? '카카오톡 상담 가능' : 'KakaoTalk Available'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TX Service Areas */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '텍사스 서비스 지역' : 'Texas Service Areas'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isKorean
                ? '텍사스 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스'
                : 'Website design services for Korean businesses throughout Texas'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {txCities.map((city) => (
                <div key={city.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-purple-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">{isKorean ? city.ko : city.en}</p>
                  <p className="text-xs text-gray-500 mt-1">{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '텍사스 웹사이트 제작 서비스' : 'TX Website Design Services'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '텍사스 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for TX Korean businesses'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <p className="text-purple-600 font-bold">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKorean ? '왜 조이루모스를 선택해야 할까요?' : 'Why Choose ZOE LUMOS?'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '한국어와 영어 완벽 지원. 달라스 캐롤턴 한인 고객과 미국 고객 모두 타겟팅 가능.'
                    : 'Perfect Korean and English support. Target both Korean and American customers in Texas.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '텍사스 SEO 전문' : 'TX SEO Specialists'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '"달라스 [업종]", "휴스턴 [업종]" 검색시 구글 1페이지 노출. 텍사스 로컬 SEO 전문.'
                    : 'Rank on page 1 for "Dallas [business]" and "Houston [business]" searches. TX local SEO experts.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? 'Zoom, Google Meet 화상 미팅과 카카오톡으로 편리하게 상담. 텍사스 시간대에 맞춰 미팅 가능.'
                    : 'Convenient consultations via Zoom, Google Meet, and KakaoTalk. Meetings scheduled in Texas time.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '텍사스 업종별 웹사이트' : 'TX Industry-Specific Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '텍사스 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for TX Korean business industries'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: isKorean ? '레스토랑 & 카페' : 'Restaurants & Cafes',
                  items: isKorean
                    ? ['온라인 주문 시스템', 'DoorDash/UberEats 연동', '메뉴 관리', '예약 시스템']
                    : ['Online ordering', 'DoorDash/UberEats integration', 'Menu management', 'Reservations']
                },
                {
                  title: isKorean ? '뷰티 & 헤어샵' : 'Beauty & Hair Salons',
                  items: isKorean
                    ? ['온라인 예약', '포트폴리오 갤러리', '가격표', 'SNS 연동']
                    : ['Online booking', 'Portfolio gallery', 'Price list', 'Social media integration']
                },
                {
                  title: isKorean ? '의료 & 치과' : 'Medical & Dental',
                  items: isKorean
                    ? ['환자 포털', '온라인 예약', 'HIPAA 준수', '보험 정보']
                    : ['Patient portal', 'Online appointments', 'HIPAA compliant', 'Insurance info']
                },
                {
                  title: isKorean ? '변호사 & 회계사' : 'Lawyers & CPAs',
                  items: isKorean
                    ? ['전문가 프로필', '상담 예약', '고객 포털', '케이스 관리']
                    : ['Professional profiles', 'Consultation booking', 'Client portal', 'Case management']
                },
                {
                  title: isKorean ? '부동산' : 'Real Estate',
                  items: isKorean
                    ? ['매물 리스팅', 'MLS 연동', '가상 투어', '리드 캡처']
                    : ['Property listings', 'MLS integration', 'Virtual tours', 'Lead capture']
                },
                {
                  title: isKorean ? '이커머스 & 리테일' : 'E-commerce & Retail',
                  items: isKorean
                    ? ['Shopify 스토어', '재고 관리', '결제 시스템', '배송 추적']
                    : ['Shopify store', 'Inventory management', 'Payment processing', 'Shipping tracking']
                },
              ].map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                  <ul className="space-y-2">
                    {industry.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKorean ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isKorean ? '텍사스 웹사이트 제작, 지금 시작하세요' : 'Start Your TX Website Today'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isKorean
                ? '무료 상담으로 시작하세요. 화상 미팅 또는 카카오톡으로 편리하게 상담 가능합니다.'
                : 'Start with a free consultation. Video meetings and KakaoTalk available for your convenience.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@zoelumos.com"
                className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {isKorean ? '이메일 문의' : 'Email Us'}
              </a>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">
              {isKorean ? '관련 서비스' : 'Related Services'}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/캘리포니아-웹사이트' : '/ca-website'} className="text-purple-600 hover:underline">
                {isKorean ? '캘리포니아 웹사이트 제작' : 'CA Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/조지아-웹사이트' : '/ga-website'} className="text-purple-600 hover:underline">
                {isKorean ? '조지아 웹사이트 제작' : 'GA Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-purple-600 hover:underline">
                {isKorean ? '뉴저지 웹사이트 제작' : 'NJ Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-purple-600 hover:underline">
                {isKorean ? '가격 안내' : 'Pricing'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-purple-600 hover:underline">
                {isKorean ? '포트폴리오' : 'Portfolio'}
              </Link>
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
