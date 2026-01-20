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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  return {
    title: locale === 'ko'
      ? '뉴욕 웹사이트 제작 | NYC 한인 홈페이지 제작 전문 | 조이루모스'
      : 'New York Website Design | NYC Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '뉴욕 웹사이트 제작 전문 업체 조이루모스. 맨하탄, 플러싱, 브루클린, 퀸즈 한인 비즈니스 홈페이지 제작. 뉴욕 SEO 최적화, 구글 상위노출, 쇼핑몰 제작. 무료 상담 가능.'
      : 'Professional New York website design for Korean-American businesses. Manhattan, Flushing, Brooklyn, Queens web development. NYC SEO, Google ranking, e-commerce.',
    keywords: locale === 'ko'
      ? '뉴욕 웹사이트, 뉴욕 웹사이트 제작, 뉴욕 홈페이지, NYC 웹사이트, 뉴욕 한인 웹사이트, 맨하탄 웹사이트, 플러싱 웹사이트, 브루클린 웹사이트, 퀸즈 웹사이트, 뉴욕 쇼핑몰, 뉴욕 SEO, 뉴욕 구글광고, 뉴욕 웹디자인, 뉴욕 웹개발'
      : 'New York website, NYC website design, NYC Korean website, Manhattan website, Flushing website, Brooklyn website, Queens website, NYC Shopify, NYC SEO',
    openGraph: {
      title: locale === 'ko' ? '뉴욕 웹사이트 제작 전문 - 조이루모스' : 'New York Website Design - ZOE LUMOS',
      description: locale === 'ko'
        ? '뉴욕 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스. 맨하탄, 플러싱, 퀸즈 전 지역.'
        : 'Premier website design for NYC Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/뉴욕-웹사이트` : `${baseUrl}/뉴욕-웹사이트`,
      siteName: 'ZOE LUMOS 조이루모스',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{
        url: `${baseUrl}/og-ny-website.jpg`,
        width: 1200,
        height: 630,
        alt: locale === 'ko' ? '뉴욕 웹사이트 제작' : 'New York Website Design',
      }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/뉴욕-웹사이트` : `${baseUrl}/뉴욕-웹사이트`,
      languages: {
        'x-default': `${baseUrl}/ny-website`,
        'en': `${baseUrl}/ny-website`,
        'ko': `${baseUrl}/ko/뉴욕-웹사이트`,
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

export default function NYWebsiteKoreanPage({ params }: { params: { locale: string } }) {
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
      ? '뉴욕, 뉴저지 한인 비즈니스를 위한 웹사이트 제작 전문 업체'
      : 'Professional web design agency for Korean-American businesses in NY and NJ',
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#nylocalbusiness`,
    name: isKorean ? '조이루모스 - 뉴욕 웹사이트 제작' : 'ZOE LUMOS - New York Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean
      ? '뉴욕 최고의 웹사이트 제작 전문 업체. 맨하탄, 플러싱, 퀸즈 한인 비즈니스 전문.'
      : 'Premier website design agency in New York for Korean-American businesses.',
    url: isKorean ? `${baseUrl}/ko/뉴욕-웹사이트` : `${baseUrl}/ny-website`,
    inLanguage: isKorean ? 'ko' : 'en',
    telephone: '+1-201-555-0123',
    email: 'hello@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    areaServed: [
      { '@type': 'City', name: 'Manhattan' },
      { '@type': 'City', name: 'Flushing' },
      { '@type': 'City', name: 'Brooklyn' },
      { '@type': 'City', name: 'Queens' },
      { '@type': 'City', name: 'Bayside' },
      { '@type': 'State', name: 'New York' },
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '52',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: '2026-01-20',
    inLanguage: isKorean ? 'ko' : 'en',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '뉴욕 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in NYC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS(조이루모스)의 뉴욕 웹사이트 제작 비용은 프로젝트 유형에 따라 다릅니다. 2026년 1월 기준, 기본 비즈니스 웹사이트는 $1,000-$2,500 (5페이지 기준, 모바일 반응형 포함), Shopify 이커머스 쇼핑몰은 $3,000-$6,000 (상품 등록 50개 포함, 결제 시스템 연동)입니다. 모든 가격에는 기본 SEO, SSL 인증서, 1년 호스팅이 포함됩니다. 맨하탄 K-Town, 플러싱, 퀸즈, 브루클린 등 뉴욕 전 지역 동일 가격이 적용됩니다.'
            : 'ZOE LUMOS website design pricing in New York varies by project type. As of January 2026, basic business websites cost $1,000-$2,500 (5 pages, mobile responsive), and Shopify e-commerce stores cost $3,000-$6,000 (50 products included, payment integration). All prices include basic SEO, SSL certificate, and 1-year hosting. Same pricing applies across Manhattan K-Town, Flushing, Queens, and Brooklyn.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '뉴욕에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in NYC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, ZOE LUMOS는 뉴욕 한인 비즈니스 웹사이트 제작 전문 에이전시입니다. 2020년 설립 이후 100개 이상의 한인 비즈니스 웹사이트를 제작했습니다. 한국어와 영어 이중언어 웹사이트 제작이 가능하며, 모든 상담은 한국어로 진행됩니다 (카카오톡 상담 가능). 플러싱 한인타운 레스토랑, 맨하탄 32번가 K-Town 비즈니스, 퀸즈 뷰티샵, 브루클린 한인 업체 등 다양한 뉴욕 한인 비즈니스 웹사이트를 제작한 경험이 있습니다.'
            : 'Yes, ZOE LUMOS specializes in Korean-American business websites in New York City. Since 2020, we have built over 100 Korean business websites. We create bilingual Korean-English websites with all consultations available in Korean (KakaoTalk available). Our experience includes Flushing Koreatown restaurants, Manhattan 32nd Street K-Town businesses, Queens beauty salons, and Brooklyn Korean businesses.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS의 뉴욕 웹사이트 제작 기간은 프로젝트 규모에 따라 다릅니다. 기본 비즈니스 웹사이트(5페이지)는 평균 10일 (1-2주), Shopify 이커머스 쇼핑몰은 평균 21일 (2-4주)이 소요됩니다. 뉴욕 비즈니스의 빠른 속도에 맞춘 긴급 제작 옵션도 제공합니다 - 20% 추가 비용으로 제작 기간 50% 단축 가능. 제작 과정: 1단계 상담/견적(1-2일) → 2단계 디자인 시안(3-5일) → 3단계 개발(5-10일) → 4단계 수정/검수(2-3일) → 5단계 런칭.'
            : 'ZOE LUMOS website development timeline in NYC depends on project scope. Basic business websites (5 pages) take an average of 10 days (1-2 weeks), Shopify e-commerce stores take 21 days (2-4 weeks). Rush delivery option available at 20% premium for 50% faster delivery, matching NYC business pace. Process: Consultation (1-2 days) → Design mockup (3-5 days) → Development (5-10 days) → Revisions (2-3 days) → Launch.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '뉴욕 SEO 서비스도 제공하나요?' : 'Do you offer NYC SEO services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, ZOE LUMOS는 뉴욕 로컬 SEO 서비스를 전문으로 제공합니다. 모든 웹사이트에 기본 SEO(메타태그, 사이트맵, 모바일 최적화)가 포함되며, 추가 월정액 SEO 서비스($500/월~)도 제공합니다. 서비스 내용: 구글 마이 비즈니스 최적화, 한국어/영어 키워드 최적화, 구글 1페이지 노출 전략, 월간 성과 리포트. 평균적으로 3-6개월 내 "뉴욕 [업종]", "플러싱 [업종]" 검색 시 구글 1페이지 노출을 목표로 합니다.'
            : 'Yes, ZOE LUMOS provides specialized New York local SEO services. All websites include basic SEO (meta tags, sitemap, mobile optimization), with additional monthly SEO services available ($500/month+). Services include: Google My Business optimization, Korean/English keyword targeting, Google page 1 ranking strategy, monthly performance reports. Average goal: Google page 1 ranking for "NYC [industry]" and "Flushing [industry]" searches within 3-6 months.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '맨하탄에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Manhattan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, ZOE LUMOS는 뉴욕 전 지역에서 직접 방문 상담을 제공합니다. 상담 방법: 1) 맨하탄 K-Town(32번가) 미팅 (무료), 2) 플러싱 한인타운 미팅 (무료), 3) 퀸즈, 브루클린 등 뉴욕 전 지역 출장 미팅 (무료), 4) 화상 미팅 (Zoom/Google Meet), 5) 카카오톡 상담. 본사는 뉴저지 포트리에 있지만, 뉴욕 고객을 위해 맨하탄과 플러싱에서 정기적으로 미팅을 진행합니다. 첫 상담은 무료이며, 프로젝트 견적서와 제작 일정표를 제공합니다.'
            : 'Yes, ZOE LUMOS provides in-person consultations throughout New York City. Consultation options: 1) Manhattan K-Town (32nd St) meeting (free), 2) Flushing Koreatown meeting (free), 3) On-site meetings in Queens, Brooklyn, and all NYC (free), 4) Video meeting (Zoom/Google Meet), 5) KakaoTalk chat. While headquartered in Fort Lee, NJ, we conduct regular meetings in Manhattan and Flushing for NYC clients. First consultation is free with project quote and timeline.',
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
        name: isKorean ? '뉴욕 웹사이트' : 'NYC Website',
        item: isKorean ? `${baseUrl}/ko/뉴욕-웹사이트` : `${baseUrl}/ny-website`,
      },
    ],
  }

  const nycAreas = [
    { ko: '맨하탄', en: 'Manhattan', desc: isKorean ? 'K-Town 한인타운' : 'K-Town hub' },
    { ko: '플러싱', en: 'Flushing', desc: isKorean ? '퀸즈 한인 중심' : 'Queens Korean hub' },
    { ko: '베이사이드', en: 'Bayside', desc: isKorean ? '퀸즈 한인 지역' : 'Queens Korean area' },
    { ko: '브루클린', en: 'Brooklyn', desc: isKorean ? '성장하는 한인 상권' : 'Growing Korean area' },
    { ko: '퀸즈', en: 'Queens', desc: isKorean ? '다양한 한인 비즈니스' : 'Diverse Korean businesses' },
    { ko: '롱아일랜드', en: 'Long Island', desc: isKorean ? '교외 한인 지역' : 'Suburban Korean area' },
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
      title: isKorean ? '뉴욕 SEO' : 'NYC SEO',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Breadcrumb */}
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">
                  {isKorean ? '홈' : 'Home'}
                </Link>
                <span className="mx-2">›</span>
                <span className="text-gray-900">{isKorean ? '뉴욕 웹사이트' : 'NYC Website'}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (
                  <>
                    <span className="text-blue-600">뉴욕</span> 웹사이트 제작
                  </>
                ) : (
                  <>
                    <span className="text-blue-600">New York</span> Website Design
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean
                  ? '뉴욕 한인 비즈니스를 위한 전문 웹사이트 제작 서비스'
                  : 'Professional website design for NYC Korean-American businesses'
                }
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean
                  ? '맨하탄, 플러싱, 브루클린, 퀸즈 등 뉴욕 전 지역. 한영 이중언어 웹사이트, SEO 최적화, 구글 상위 노출까지.'
                  : 'Serving Manhattan, Flushing, Brooklyn, Queens and all of NYC. Bilingual websites with SEO optimization.'
                }
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link
                  href={isKorean ? '/ko/pricing' : '/pricing'}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  {isKorean ? '가격 보기' : 'View Pricing'}
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
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
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>{isKorean ? '150+ 뉴욕 고객' : '150+ NYC Clients'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>{isKorean ? '무료 상담' : 'Free Consultation'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NYC Service Areas */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '뉴욕 서비스 지역' : 'NYC Service Areas'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isKorean
                ? '뉴욕 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스'
                : 'Website design services for Korean businesses throughout New York'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {nycAreas.map((area) => (
                <div key={area.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-blue-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-gray-900">{isKorean ? area.ko : area.en}</p>
                  <p className="text-xs text-gray-500 mt-1">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '뉴욕 웹사이트 제작 서비스' : 'NYC Website Design Services'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '뉴욕 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for NYC Korean businesses'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <p className="text-blue-600 font-bold">{service.price}</p>
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '한국어와 영어 완벽 지원. 뉴욕 한인 고객과 미국 고객 모두 타겟팅 가능.'
                    : 'Perfect Korean and English support. Target both Korean and American customers in NYC.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '뉴욕 SEO 전문' : 'NYC SEO Specialists'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '"뉴욕 [업종]" 검색시 구글 1페이지 노출. 로컬 SEO로 뉴욕 고객 확보.'
                    : 'Rank on page 1 for "New York [business]" searches. Local SEO for NYC customers.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '뉴욕 속도에 맞춘 제작' : 'NYC Speed Delivery'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '뉴욕 비즈니스 속도에 맞춘 3-7일 완성. 맨하탄, 플러싱 미팅 가능.'
                    : '3-7 day completion matching NYC business speed. Manhattan, Flushing meetings available.'
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
              {isKorean ? '뉴욕 업종별 웹사이트' : 'NYC Industry-Specific Websites'}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {isKorean ? '뉴욕 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for NYC Korean business industries'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: isKorean ? '레스토랑 & 카페' : 'Restaurants & Cafes',
                  items: isKorean
                    ? ['온라인 주문 시스템', 'DoorDash/UberEats/Grubhub 연동', '메뉴 관리', 'Yelp/Google 리뷰 최적화']
                    : ['Online ordering', 'DoorDash/UberEats/Grubhub integration', 'Menu management', 'Yelp/Google review optimization']
                },
                {
                  title: isKorean ? '뷰티 & 네일샵' : 'Beauty & Nail Salons',
                  items: isKorean
                    ? ['온라인 예약', '포트폴리오 갤러리', '가격표', 'Instagram 연동']
                    : ['Online booking', 'Portfolio gallery', 'Price list', 'Instagram integration']
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
                    ? ['전문가 프로필', '상담 예약', '고객 포털', '이민/비자 정보']
                    : ['Professional profiles', 'Consultation booking', 'Client portal', 'Immigration/visa info']
                },
                {
                  title: isKorean ? '부동산' : 'Real Estate',
                  items: isKorean
                    ? ['매물 리스팅', 'StreetEasy 연동', '가상 투어', '리드 캡처']
                    : ['Property listings', 'StreetEasy integration', 'Virtual tours', 'Lead capture']
                },
                {
                  title: isKorean ? '이커머스 & 리테일' : 'E-commerce & Retail',
                  items: isKorean
                    ? ['Shopify 스토어', '재고 관리', '결제 시스템', 'NYC 배송 시스템']
                    : ['Shopify store', 'Inventory management', 'Payment processing', 'NYC delivery system']
                },
              ].map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                  <ul className="space-y-2">
                    {industry.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
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
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isKorean ? '뉴욕 웹사이트 제작, 지금 시작하세요' : 'Start Your NYC Website Today'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isKorean
                ? '무료 상담으로 시작하세요. 맨하탄, 플러싱 미팅 또는 화상 미팅 가능.'
                : 'Start with a free consultation. Meet in Manhattan, Flushing, or video call.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+12015550123"
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {isKorean ? '전화 상담' : 'Call Us'}
              </a>
              <a
                href="mailto:hello@zoelumos.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-colors"
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
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-blue-600 hover:underline">
                {isKorean ? '뉴저지 웹사이트 제작' : 'NJ Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-blue-600 hover:underline">
                {isKorean ? '가격 안내' : 'Pricing'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-blue-600 hover:underline">
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
