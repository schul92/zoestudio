import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search, CheckCircle, Star, Users, Zap, Phone, Mail, MapPin } from 'lucide-react'

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

  // This page is primarily for Korean SEO
  return {
    title: locale === 'ko'
      ? '뉴저지 웹사이트 제작 | NJ 한인 홈페이지 제작 전문 | 조이루모스'
      : 'New Jersey Website Design | NJ Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '뉴저지 웹사이트 제작 전문 업체 조이루모스. 포트리, 팰팍, 에디슨, 체리힐 한인 비즈니스 홈페이지 제작. 뉴저지 SEO 최적화, 구글 상위노출, 쇼핑몰 제작. 무료 상담 가능.'
      : 'Professional New Jersey website design for Korean-American businesses. Fort Lee, Palisades Park, Edison web development. NJ SEO, Google ranking, e-commerce.',
    keywords: locale === 'ko'
      ? '뉴저지 웹사이트, 뉴저지 웹사이트 제작, 뉴저지 홈페이지, NJ 웹사이트, 뉴저지 한인 웹사이트, 포트리 웹사이트, 팰팍 웹사이트, 에디슨 웹사이트, 뉴저지 쇼핑몰, 뉴저지 SEO, 뉴저지 구글광고, 뉴저지 웹디자인, 뉴저지 웹개발'
      : 'New Jersey website, NJ website design, NJ Korean website, Fort Lee website, Palisades Park website, Edison website, NJ Shopify, NJ SEO',
    openGraph: {
      title: locale === 'ko' ? '뉴저지 웹사이트 제작 전문 - 조이루모스' : 'New Jersey Website Design - ZOE LUMOS',
      description: locale === 'ko'
        ? '뉴저지 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스. 포트리, 팰팍, 에디슨 전 지역.'
        : 'Premier website design for NJ Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/뉴저지-웹사이트` : `${baseUrl}/뉴저지-웹사이트`,
      siteName: 'ZOE LUMOS 조이루모스',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{
        url: `${baseUrl}/og-nj-website.jpg`,
        width: 1200,
        height: 630,
        alt: locale === 'ko' ? '뉴저지 웹사이트 제작' : 'New Jersey Website Design',
      }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/뉴저지-웹사이트` : `${baseUrl}/뉴저지-웹사이트`,
      languages: {
        'x-default': `${baseUrl}/nj-website`,
        'en': `${baseUrl}/nj-website`,
        'ko': `${baseUrl}/ko/뉴저지-웹사이트`,
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

export default function NJWebsiteKoreanPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const isKorean = locale === 'ko'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZOE LUMOS 조이루모스',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: isKorean
      ? '뉴저지, 뉴욕 한인 비즈니스를 위한 웹사이트 제작 전문 업체'
      : 'Professional web design agency for Korean-American businesses in NJ and NY',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-201-555-0123',
      contactType: 'sales',
      availableLanguage: ['English', 'Korean'],
    },
    sameAs: [
      'https://www.instagram.com/zoelumos',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: isKorean ? '조이루모스 - 뉴저지 웹사이트 제작' : 'ZOE LUMOS - New Jersey Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean
      ? '뉴저지 최고의 웹사이트 제작 전문 업체. 포트리, 팰팍, 에디슨 한인 비즈니스 전문.'
      : 'Premier website design agency in New Jersey for Korean-American businesses.',
    url: isKorean ? `${baseUrl}/ko/뉴저지-웹사이트` : `${baseUrl}/nj-website`,
    telephone: '+1-201-555-0123',
    email: 'hello@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2200 Center Ave',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8509',
      longitude: '-73.9701',
    },
    areaServed: [
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Ridgefield' },
      { '@type': 'City', name: 'Edgewater' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Edison' },
      { '@type': 'City', name: 'Cherry Hill' },
      { '@type': 'State', name: 'New Jersey' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '뉴저지 웹사이트 제작 서비스' : 'New Jersey Website Design Service',
    provider: {
      '@type': 'Organization',
      name: 'ZOE LUMOS',
    },
    serviceType: 'Website Design',
    areaServed: {
      '@type': 'State',
      name: 'New Jersey',
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
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '뉴저지 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '뉴저지 웹사이트 제작 비용은 $1,000부터 시작합니다. 기본 비즈니스 웹사이트는 $1,000-$2,500, 이커머스 쇼핑몰은 $3,000-$6,000입니다. 포트리, 팰팍, 에디슨 등 뉴저지 전 지역 동일 가격입니다.'
            : 'NJ website design starts at $1,000. Basic business sites are $1,000-$2,500, e-commerce $3,000-$6,000.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '뉴저지에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in NJ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 저희는 뉴저지 한인 비즈니스 전문입니다. 한국어와 영어 이중언어 웹사이트를 제작하며, 한인 타운(포트리, 팰팍) 비즈니스 경험이 풍부합니다.'
            : 'Yes, we specialize in NJ Korean businesses with bilingual Korean-English websites.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '기본 웹사이트는 1-2주, 이커머스 쇼핑몰은 2-4주 정도 소요됩니다. 긴급 제작도 가능합니다.'
            : 'Basic websites take 1-2 weeks, e-commerce 2-4 weeks. Rush delivery available.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '뉴저지 SEO 서비스도 제공하나요?' : 'Do you offer NJ SEO services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 모든 웹사이트에 기본 SEO가 포함됩니다. 추가로 뉴저지 로컬 SEO, 구글 마이 비즈니스 최적화, 구글 광고 관리 서비스를 제공합니다.'
            : 'Yes, basic SEO is included. We also offer NJ local SEO, Google My Business optimization, and Google Ads management.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '포트리에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Fort Lee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 포트리 사무실에서 직접 상담 가능합니다. 팰팍, 에디슨 등 뉴저지 전 지역 출장 미팅도 가능합니다.'
            : 'Yes, we offer in-person consultations at our Fort Lee office and throughout NJ.',
        },
      },
    ],
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
        name: isKorean ? '뉴저지 웹사이트' : 'NJ Website',
        item: isKorean ? `${baseUrl}/ko/뉴저지-웹사이트` : `${baseUrl}/nj-website`,
      },
    ],
  }

  const njCities = [
    { ko: '포트리', en: 'Fort Lee', desc: isKorean ? 'NJ 한인타운 중심' : 'NJ Koreatown hub' },
    { ko: '팰팍 (팰리세이즈 파크)', en: 'Palisades Park', desc: isKorean ? '한인 밀집 지역' : 'Korean community' },
    { ko: '리지필드', en: 'Ridgefield', desc: isKorean ? '성장하는 한인 상권' : 'Growing Korean area' },
    { ko: '에지워터', en: 'Edgewater', desc: isKorean ? '신흥 비즈니스 지역' : 'Emerging business area' },
    { ko: '에디슨', en: 'Edison', desc: isKorean ? '중부 뉴저지 한인 중심' : 'Central NJ Korean hub' },
    { ko: '체리힐', en: 'Cherry Hill', desc: isKorean ? '남부 뉴저지 한인 중심' : 'South NJ Korean hub' },
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
      title: isKorean ? '뉴저지 SEO' : 'NJ SEO',
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Breadcrumb */}
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">
                  {isKorean ? '홈' : 'Home'}
                </Link>
                <span className="mx-2">›</span>
                <span className="text-gray-900">{isKorean ? '뉴저지 웹사이트' : 'NJ Website'}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (
                  <>
                    <span className="text-emerald-600">뉴저지</span> 웹사이트 제작
                  </>
                ) : (
                  <>
                    <span className="text-emerald-600">New Jersey</span> Website Design
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean
                  ? '뉴저지 한인 비즈니스를 위한 전문 웹사이트 제작 서비스'
                  : 'Professional website design for NJ Korean-American businesses'
                }
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean
                  ? '포트리, 팰팍, 에디슨, 체리힐 등 뉴저지 전 지역. 한영 이중언어 웹사이트, SEO 최적화, 구글 상위 노출까지.'
                  : 'Serving Fort Lee, Palisades Park, Edison, Cherry Hill and all of NJ. Bilingual websites with SEO optimization.'
                }
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link
                  href={isKorean ? '/ko/pricing' : '/pricing'}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  {isKorean ? '가격 보기' : 'View Pricing'}
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors"
                >
                  {isKorean ? '무료 상담' : 'Free Consultation'}
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>{isKorean ? '100+ 뉴저지 고객' : '100+ NJ Clients'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>{isKorean ? '무료 상담' : 'Free Consultation'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NJ Service Areas */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '뉴저지 서비스 지역' : 'NJ Service Areas'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isKorean
                ? '뉴저지 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스'
                : 'Website design services for Korean businesses throughout New Jersey'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {njCities.map((city) => (
                <div key={city.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-emerald-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">{isKorean ? city.ko : city.en}</p>
                  <p className="text-xs text-gray-500 mt-1">{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '뉴저지 웹사이트 제작 서비스' : 'NJ Website Design Services'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '뉴저지 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for NJ Korean businesses'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <p className="text-emerald-600 font-bold">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKorean ? '왜 조이루모스를 선택해야 할까요?' : 'Why Choose ZOE LUMOS?'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '한국어와 영어 완벽 지원. 뉴저지 한인 고객과 미국 고객 모두 타겟팅 가능.'
                    : 'Perfect Korean and English support. Target both Korean and American customers in NJ.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '뉴저지 SEO 전문' : 'NJ SEO Specialists'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '"뉴저지 [업종]" 검색시 구글 1페이지 노출. 로컬 SEO로 뉴저지 고객 확보.'
                    : 'Rank on page 1 for "New Jersey [business]" searches. Local SEO for NJ customers.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '포트리 사무실' : 'Fort Lee Office'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '포트리 현지 사무실 운영. 직접 방문 상담 가능. 뉴저지 전 지역 출장 미팅.'
                    : 'Local Fort Lee office. In-person consultations. On-site meetings throughout NJ.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '뉴저지 업종별 웹사이트' : 'NJ Industry-Specific Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '뉴저지 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for NJ Korean business industries'}
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
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
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
        <section className="py-16 px-4 bg-white">
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
        <section className="py-16 px-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isKorean ? '뉴저지 웹사이트 제작, 지금 시작하세요' : 'Start Your NJ Website Today'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isKorean
                ? '무료 상담으로 시작하세요. 포트리 사무실 방문 또는 화상 미팅 가능.'
                : 'Start with a free consultation. Visit our Fort Lee office or schedule a video call.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+12015550123"
                className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {isKorean ? '전화 상담' : 'Call Us'}
              </a>
              <a
                href="mailto:hello@zoelumos.com"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors"
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
              <Link href={isKorean ? '/ko/뉴욕-웹사이트' : '/ny-website'} className="text-emerald-600 hover:underline">
                {isKorean ? '뉴욕 웹사이트 제작' : 'NY Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-emerald-600 hover:underline">
                {isKorean ? '가격 안내' : 'Pricing'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-emerald-600 hover:underline">
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
