import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import {
  Megaphone, Search, Instagram, Star, Users, CheckCircle, BarChart3,
  Globe, TrendingUp, FileText, MessageCircle, Mail, MapPin, Zap, Target
} from 'lucide-react'

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
      ? '한인 광고대행 & 소셜미디어 관리 | 구글 광고, 인스타 광고 전문 | 조이루모스'
      : 'Korean Advertising Agency & Social Media Management | Google Ads, Instagram Ads | ZOE LUMOS',
    description: locale === 'ko'
      ? '미국 한인 광고대행 전문 조이루모스. 구글 광고, 인스타그램 광고, 소셜미디어 관리, 옐프 광고. 한영 이중언어 광고 캠페인. 소셜미디아 마케팅. 월간 성과 리포트 제공. 무료 상담.'
      : 'Korean-American advertising agency ZOE LUMOS. Google Ads, Instagram Ads, social media management, Yelp Ads. Bilingual ad campaigns with monthly ROI reports. Free consultation.',
    keywords: locale === 'ko'
      ? '광고대행, 소셜미디어 관리, 소셜미디아, 구글 광고, 인스타 광고, 한인 광고대행, 미국 한인 소셜미디어, 인스타그램 광고, 옐프 광고, 한인 마케팅, 소셜미디어 마케팅, 한인 디지털 마케팅, 페이스북 광고, 틱톡 광고'
      : 'Korean advertising agency, social media management, Google Ads, Instagram Ads, Korean American marketing, Yelp advertising, bilingual ads, digital marketing',
    openGraph: {
      title: locale === 'ko' ? '한인 광고대행 & 소셜미디어 관리 - 조이루모스' : 'Korean Advertising & Social Media Management - ZOE LUMOS',
      description: locale === 'ko'
        ? '구글 광고, 인스타 광고, 소셜미디어 관리 전문. 미국 한인 비즈니스 맞춤 광고 캠페인.'
        : 'Google Ads, Instagram Ads, social media management for Korean-American businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/광고대행` : `${baseUrl}/advertising`,
      siteName: 'ZOE LUMOS 조이루모스',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [{
        url: `${baseUrl}/og-advertising.jpg`,
        width: 1200,
        height: 630,
        alt: locale === 'ko' ? '한인 광고대행 & 소셜미디어 관리' : 'Korean Advertising & Social Media Management',
      }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/광고대행` : `${baseUrl}/advertising`,
      languages: {
        'x-default': `${baseUrl}/advertising`,
        'en': `${baseUrl}/advertising`,
        'ko': `${baseUrl}/ko/광고대행`,
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

export default function AdvertisingKoreanPage({ params }: { params: { locale: string } }) {
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
      ? '미국 한인 비즈니스를 위한 광고대행 및 소셜미디어 관리 전문 에이전시'
      : 'Advertising agency and social media management for Korean-American businesses',
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

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#advertising-service`,
    name: isKorean ? '조이루모스 - 한인 광고대행 & 소셜미디어 관리' : 'ZOE LUMOS - Korean Advertising & Social Media Management',
    image: `${baseUrl}/logo.png`,
    description: isKorean
      ? '미국 한인 비즈니스를 위한 구글 광고, 인스타그램 광고, 소셜미디어 관리 전문 에이전시.'
      : 'Google Ads, Instagram Ads, and social media management agency for Korean-American businesses.',
    url: isKorean ? `${baseUrl}/ko/광고대행` : `${baseUrl}/advertising`,
    email: 'info@zoelumos.com',
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
      { '@type': 'Country', name: 'United States' },
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Texas' },
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
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '광고대행 & 소셜미디어 관리 서비스' : 'Advertising & Social Media Management Service',
    provider: {
      '@type': 'Organization',
      name: 'ZOE LUMOS',
    },
    serviceType: 'Advertising Agency',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isKorean ? '광고 & 소셜미디어 서비스' : 'Advertising & Social Media Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '구글 광고 관리' : 'Google Ads Management',
          },
          price: '300',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '300',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '인스타그램 광고 관리' : 'Instagram Ads Management',
          },
          price: '500',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '500',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '소셜미디어 관리' : 'Social Media Management',
          },
          price: '800',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '800',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isKorean ? '옐프 광고 관리' : 'Yelp Ads Management',
          },
          price: '200',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '200',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
      ],
    },
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: '2026-03-10',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '광고 비용은 얼마나 드나요?' : 'How much do advertising services cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS(조이루모스)의 광고대행 비용은 서비스 유형에 따라 다릅니다. 2026년 3월 기준, 구글 광고 관리는 월 $300부터, 인스타그램 광고는 월 $500부터, 소셜미디어 종합 관리는 월 $800부터, 옐프 광고는 월 $200부터 시작합니다. 광고비(미디어 비용)는 별도이며, 비즈니스 규모와 목표에 따라 맞춤 견적을 제공합니다. 모든 패키지에 월간 성과 리포트가 포함됩니다.'
            : 'ZOE LUMOS advertising service costs vary by type. As of March 2026, Google Ads management starts at $300/month, Instagram Ads at $500/month, comprehensive social media management at $800/month, and Yelp Ads at $200/month. Ad spend (media costs) is separate. Custom quotes based on business size and goals. All packages include monthly performance reports.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '소셜미디어 포스팅은 얼마나 자주 하나요?' : 'How often do you post on social media?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '소셜미디어 관리 패키지에 따라 포스팅 빈도가 다릅니다. 기본 패키지($800/월)는 주 3회(인스타그램, 페이스북), 프리미엄 패키지($1,200/월)는 주 5회(인스타그램, 페이스북, 틱톡 포함) 포스팅을 제공합니다. 모든 콘텐츠는 한국어와 영어 이중언어로 제작되며, 고품질 이미지/영상 제작, 해시태그 최적화, 스토리/릴스 제작이 포함됩니다. 콘텐츠 캘린더를 사전에 공유하여 승인 후 게시합니다.'
            : 'Posting frequency depends on the package. Basic package ($800/month) includes 3 posts per week (Instagram, Facebook). Premium package ($1,200/month) includes 5 posts per week (Instagram, Facebook, TikTok). All content is created bilingually in Korean and English, including high-quality images/videos, hashtag optimization, and Stories/Reels. Content calendar shared in advance for approval.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '광고 효과(ROI)를 어떻게 추적하나요?' : 'How do you track advertising ROI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'ZOE LUMOS는 데이터 기반 광고 관리를 제공합니다. Google Analytics, Meta Ads Manager, Google Ads 대시보드를 활용하여 실시간 성과를 추적합니다. 매월 상세 리포트를 제공하며, 주요 지표로는 노출수, 클릭수, 클릭률(CTR), 전환율, 전환당 비용(CPA), 광고 수익률(ROAS)을 포함합니다. 한국어로 작성된 이해하기 쉬운 리포트를 제공하며, 월 1회 화상 또는 대면 미팅으로 결과를 설명드립니다.'
            : 'ZOE LUMOS provides data-driven advertising management using Google Analytics, Meta Ads Manager, and Google Ads dashboards for real-time tracking. Monthly detailed reports include impressions, clicks, CTR, conversion rate, CPA, and ROAS. Easy-to-understand reports in Korean, with monthly video or in-person review meetings to explain results.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '한국어와 영어 이중언어 광고가 가능한가요?' : 'Can you create bilingual Korean-English ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, ZOE LUMOS의 가장 큰 강점 중 하나가 한영 이중언어 광고 제작입니다. 한국어 네이티브와 영어 네이티브 팀이 함께 광고 카피, 이미지, 영상을 제작합니다. 한인 커뮤니티 타겟팅과 미국 현지 고객 타겟팅을 동시에 진행할 수 있으며, 구글 광고의 경우 한국어/영어 키워드를 별도로 최적화합니다. 인스타그램과 페이스북에서는 한국어와 영어 콘텐츠를 각각 제작하여 타겟 오디언스에 맞게 배포합니다.'
            : 'Yes, bilingual Korean-English advertising is one of ZOE LUMOS\'s key strengths. Our team of native Korean and English speakers creates ad copy, images, and videos together. We simultaneously target Korean communities and local American customers. For Google Ads, we optimize Korean and English keywords separately. On Instagram and Facebook, we create separate Korean and English content distributed to matching target audiences.',
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
        name: isKorean ? '광고대행' : 'Advertising',
        item: isKorean ? `${baseUrl}/ko/광고대행` : `${baseUrl}/advertising`,
      },
    ],
  }

  const services = [
    {
      icon: <Search className="w-8 h-8" />,
      title: isKorean ? '구글 광고 (Google Ads)' : 'Google Ads',
      desc: isKorean ? '구글 검색 광고, 디스플레이 광고, 리마케팅. 한국어/영어 키워드 최적화.' : 'Search ads, display ads, remarketing. Korean/English keyword optimization.',
      price: '$300/월~',
      priceEn: '$300/mo~',
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: isKorean ? '인스타그램 광고 (Instagram Ads)' : 'Instagram Ads',
      desc: isKorean ? '인스타 피드, 스토리, 릴스 광고. 한인 타겟팅 & 로컬 타겟팅.' : 'Feed, Story, and Reels ads. Korean community & local targeting.',
      price: '$500/월~',
      priceEn: '$500/mo~',
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: isKorean ? '소셜미디어 관리 (Social Media Management)' : 'Social Media Management',
      desc: isKorean ? '인스타그램, 페이스북, 틱톡 콘텐츠 제작 & 관리. 이중언어 포스팅.' : 'Instagram, Facebook, TikTok content creation & management. Bilingual posting.',
      price: '$800/월~',
      priceEn: '$800/mo~',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: isKorean ? '옐프 광고 (Yelp Ads)' : 'Yelp Ads',
      desc: isKorean ? '옐프 비즈니스 페이지 최적화 & 광고 관리. 리뷰 관리 포함.' : 'Yelp business page optimization & ad management. Review management included.',
      price: '$200/월~',
      priceEn: '$200/mo~',
    },
  ]

  const platforms = [
    { name: 'Instagram', icon: <Instagram className="w-8 h-8" />, desc: isKorean ? '피드, 스토리, 릴스' : 'Feed, Stories, Reels' },
    { name: 'Facebook', icon: <Users className="w-8 h-8" />, desc: isKorean ? '페이지 관리, 광고' : 'Page management, Ads' },
    { name: 'TikTok', icon: <Zap className="w-8 h-8" />, desc: isKorean ? '숏폼 영상 마케팅' : 'Short-form video marketing' },
    { name: 'Google Business', icon: <Globe className="w-8 h-8" />, desc: isKorean ? '구글 마이 비즈니스' : 'Google My Business' },
    { name: 'Yelp', icon: <Star className="w-8 h-8" />, desc: isKorean ? '리뷰 & 광고 관리' : 'Reviews & ad management' },
  ]

  const statePages = [
    { ko: '뉴저지-웹사이트', en: 'nj-website', label: isKorean ? '뉴저지' : 'New Jersey' },
    { ko: '뉴욕-웹사이트', en: 'ny-website', label: isKorean ? '뉴욕' : 'New York' },
    { ko: '캘리포니아-웹사이트', en: 'ca-website', label: isKorean ? '캘리포니아' : 'California' },
    { ko: '텍사스-웹사이트', en: 'tx-website', label: isKorean ? '텍사스' : 'Texas' },
    { ko: '버지니아-웹사이트', en: 'va-website', label: isKorean ? '버지니아' : 'Virginia' },
    { ko: '메릴랜드-웹사이트', en: 'md-website', label: isKorean ? '메릴랜드' : 'Maryland' },
    { ko: '일리노이-웹사이트', en: 'il-website', label: isKorean ? '일리노이' : 'Illinois' },
    { ko: '조지아-웹사이트', en: 'ga-website', label: isKorean ? '조지아' : 'Georgia' },
    { ko: '워싱턴-웹사이트', en: 'wa-website', label: isKorean ? '워싱턴' : 'Washington' },
    { ko: '펜실베이니아-웹사이트', en: 'pa-website', label: isKorean ? '펜실베이니아' : 'Pennsylvania' },
    { ko: '플로리다-웹사이트', en: 'fl-website', label: isKorean ? '플로리다' : 'Florida' },
    { ko: '하와이-웹사이트', en: 'hi-website', label: isKorean ? '하와이' : 'Hawaii' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-violet-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* Breadcrumb */}
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">
                  {isKorean ? '홈' : 'Home'}
                </Link>
                <span className="mx-2">&rsaquo;</span>
                <span className="text-gray-900">{isKorean ? '광고대행' : 'Advertising'}</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (
                  <>
                    <span className="text-violet-600">한인 광고대행</span> &amp; 소셜미디어 관리
                  </>
                ) : (
                  <>
                    <span className="text-violet-600">Korean Advertising</span> &amp; Social Media Management
                  </>
                )}
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean
                  ? '미국 한인 비즈니스를 위한 전문 광고대행 & 소셜미디어 관리 서비스'
                  : 'Professional advertising & social media management for Korean-American businesses'
                }
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean
                  ? '구글 광고, 인스타 광고, 소셜미디아 관리까지. 한영 이중언어 캠페인으로 매출을 극대화하세요.'
                  : 'Google Ads, Instagram Ads, and social media management. Maximize revenue with bilingual campaigns.'
                }
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link
                  href="#contact"
                  className="px-8 py-4 bg-violet-600 text-white rounded-xl font-bold text-lg hover:bg-violet-700 transition-colors shadow-lg"
                >
                  {isKorean ? '무료 상담 받기' : 'Get Free Consultation'}
                </Link>
                <Link
                  href={isKorean ? '/ko/pricing' : '/pricing'}
                  className="px-8 py-4 bg-white text-violet-600 border-2 border-violet-600 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors"
                >
                  {isKorean ? '가격 보기' : 'View Pricing'}
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-600" />
                  <span>{isKorean ? '100+ 광고 캠페인 관리' : '100+ Ad Campaigns Managed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                  <span>{isKorean ? '월간 성과 리포트' : 'Monthly Reports'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '광고대행 & 소셜미디어 서비스' : 'Advertising & Social Media Services'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isKorean
                ? '한인 비즈니스에 최적화된 디지털 광고 & 소셜미디어 관리 서비스'
                : 'Digital advertising & social media services optimized for Korean-American businesses'
              }
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <p className="text-violet-600 font-bold">{isKorean ? service.price : service.priceEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKorean ? '관리 플랫폼' : 'Platforms We Manage'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {isKorean
                ? '주요 소셜미디어 & 광고 플랫폼을 한곳에서 관리합니다'
                : 'We manage all major social media & advertising platforms in one place'
              }
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {platforms.map((platform) => (
                <div key={platform.name} className="bg-white p-6 rounded-xl text-center hover:bg-violet-50 transition-colors border border-gray-100 shadow-sm">
                  <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mx-auto mb-3">
                    {platform.icon}
                  </div>
                  <p className="font-bold text-gray-900">{platform.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{platform.desc}</p>
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
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '한영 이중언어 팀' : 'Bilingual Team'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '한국어 네이티브와 영어 네이티브가 함께 광고를 제작합니다. 한인 커뮤니티와 미국 현지 고객 모두 효과적으로 타겟팅.'
                    : 'Native Korean and English speakers create ads together. Effectively target both Korean communities and local American customers.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '데이터 기반 접근' : 'Data-Driven Approach'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? 'Google Analytics, Meta Ads Manager 등 전문 도구로 실시간 성과 추적. A/B 테스트로 광고 효율을 지속적으로 개선합니다.'
                    : 'Real-time performance tracking with Google Analytics, Meta Ads Manager. Continuous A/B testing to improve ad efficiency.'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isKorean ? '월간 성과 리포트' : 'Monthly Performance Reports'}
                </h3>
                <p className="text-gray-600">
                  {isKorean
                    ? '매월 상세한 한국어 리포트를 제공합니다. 노출수, 클릭수, 전환율, ROI를 한눈에 확인. 월 1회 미팅으로 결과를 상세히 설명드립니다.'
                    : 'Detailed monthly reports in Korean. View impressions, clicks, conversions, and ROI at a glance. Monthly review meetings to explain results in detail.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKorean ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-violet-600 to-violet-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isKorean ? '광고대행 & 소셜미디어 관리, 지금 시작하세요' : 'Start Your Advertising & Social Media Today'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isKorean
                ? '무료 상담으로 비즈니스에 맞는 최적의 광고 전략을 제안드립니다.'
                : 'Get a free consultation and discover the best advertising strategy for your business.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#contact"
                className="flex items-center gap-2 px-8 py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <Target className="w-5 h-5" />
                {isKorean ? '무료 상담 받기' : 'Get Free Consultation'}
              </Link>
              <a
                href="mailto:info@zoelumos.com"
                className="flex items-center gap-2 px-8 py-4 bg-violet-500 text-white rounded-xl font-bold text-lg hover:bg-violet-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {isKorean ? '이메일 문의' : 'Email Us'}
              </a>
            </div>
          </div>
        </section>

        {/* Internal Links - State Pages */}
        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">
              {isKorean ? '지역별 서비스' : 'Services by State'}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {statePages.map((state) => (
                <Link
                  key={state.en}
                  href={isKorean ? `/ko/${state.ko}` : `/${state.en}`}
                  className="text-sm text-violet-600 hover:underline bg-white px-3 py-1 rounded-full border border-gray-200"
                >
                  {state.label}
                </Link>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-4 text-center">
              {isKorean ? '관련 서비스' : 'Related Services'}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/웹사이트-제작' : '/website-design'} className="text-violet-600 hover:underline">
                {isKorean ? '웹사이트 제작' : 'Website Design'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/쇼핑몰-제작' : '/ecommerce'} className="text-violet-600 hover:underline">
                {isKorean ? '쇼핑몰 제작' : 'E-commerce'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-violet-600 hover:underline">
                {isKorean ? '가격 안내' : 'Pricing'}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-violet-600 hover:underline">
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
