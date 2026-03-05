import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Building2, Globe, Search, CheckCircle, Star, Users, Zap, Mail, MapPin } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  return {
    title: locale === 'ko'
      ? '하와이 웹사이트 제작 | 호놀룰루 한인 홈페이지 전문 | 조이루모스'
      : 'Hawaii Website Design | Honolulu Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '하와이 웹사이트 제작 전문 업체 조이루모스. 호놀룰루, 와이키키, 카폴레이, 진주만 한인 비즈니스 홈페이지 제작. 하와이 SEO 최적화, 관광 비즈니스 웹사이트.'
      : 'Professional Hawaii website design for Korean-American businesses. Honolulu, Waikiki, Kapolei web development. HI SEO, tourism business websites.',
    keywords: locale === 'ko'
      ? '하와이 웹사이트, 하와이 웹사이트 제작, 호놀룰루 웹사이트, 하와이 한인 웹사이트, 와이키키 웹사이트, 하와이 관광 웹사이트, 하와이 SEO'
      : 'Hawaii website, HI website design, Honolulu Korean website, Waikiki website, Hawaii tourism website, HI SEO',
    openGraph: {
      title: locale === 'ko' ? '하와이 웹사이트 제작 전문 - 조이루모스' : 'Hawaii Website Design - ZOE LUMOS',
      description: locale === 'ko' ? '하와이 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스.' : 'Premier website design for HI Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/하와이-웹사이트` : `${baseUrl}/hi-website`,
      siteName: 'ZOE LUMOS 조이루모스', locale: locale === 'ko' ? 'ko_KR' : 'en_US', type: 'website',
      images: [{ url: `${baseUrl}/og-hi-website.jpg`, width: 1200, height: 630, alt: locale === 'ko' ? '하와이 웹사이트 제작' : 'Hawaii Website Design' }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/하와이-웹사이트` : `${baseUrl}/hi-website`,
      languages: { 'x-default': `${baseUrl}/hi-website`, 'en': `${baseUrl}/hi-website`, 'ko': `${baseUrl}/ko/하와이-웹사이트` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function HIWebsiteKoreanPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const isKorean = locale === 'ko'

  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'ZOE LUMOS 조이루모스', url: baseUrl, logo: `${baseUrl}/logo.png`,
    description: isKorean ? '하와이 한인 비즈니스를 위한 웹사이트 제작 전문 업체' : 'Professional web design for Korean-American businesses in Hawaii',
    address: { '@type': 'PostalAddress', addressLocality: 'Fort Lee', addressRegion: 'NJ', addressCountry: 'US' },
    contactPoint: { '@type': 'ContactPoint', email: 'info@zoelumos.com', contactType: 'sales', availableLanguage: ['English', 'Korean'] },
    sameAs: ['https://www.instagram.com/zoelumos'], inLanguage: isKorean ? 'ko' : 'en',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${baseUrl}/#hawaii-service`,
    name: isKorean ? '조이루모스 - 하와이 웹사이트 제작' : 'ZOE LUMOS - Hawaii Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean ? '하와이 한인 비즈니스를 위한 웹사이트 제작 전문. 호놀룰루, 와이키키 관광 비즈니스 전문.' : 'Website design for Korean-American businesses in Hawaii. Honolulu, Waikiki tourism specialists.',
    url: isKorean ? `${baseUrl}/ko/하와이-웹사이트` : `${baseUrl}/hi-website`, email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressRegion: 'HI', addressCountry: 'US' },
    areaServed: [
      { '@type': 'City', name: 'Honolulu' }, { '@type': 'City', name: 'Kapolei' },
      { '@type': 'City', name: 'Pearl City' }, { '@type': 'City', name: 'Aiea' },
      { '@type': 'State', name: 'Hawaii' },
    ],
    priceRange: '$$', inLanguage: isKorean ? 'ko' : 'en',
  }

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: isKorean ? '하와이 웹사이트 제작 서비스' : 'Hawaii Website Design Service',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS' },
    serviceType: 'Website Design', areaServed: { '@type': 'State', name: 'Hawaii' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: isKorean ? '웹사이트 제작 서비스' : 'Website Design Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isKorean ? '비즈니스 웹사이트' : 'Business Website' }, price: '1000', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store' }, price: '3000', priceCurrency: 'USD' },
      ],
    },
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage', dateModified: '2026-03-01',
    mainEntity: [
      {
        '@type': 'Question', name: isKorean ? '하와이 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in Hawaii?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS의 하와이 웹사이트 제작 비용은 기본 비즈니스 웹사이트 $1,000-$2,500, Shopify 이커머스 쇼핑몰 $3,000-$6,000입니다. 호놀룰루, 카폴레이 등 하와이 전 지역 동일 가격입니다. 관광 비즈니스 전용 패키지도 별도 제공합니다.'
          : 'ZOE LUMOS website design in Hawaii: basic business websites $1,000-$2,500, Shopify e-commerce $3,000-$6,000. Same pricing across Honolulu and Kapolei. Tourism business packages also available.' },
      },
      {
        '@type': 'Question', name: isKorean ? '하와이에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in Hawaii?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, ZOE LUMOS는 하와이 한인 비즈니스 웹사이트 제작 전문입니다. 호놀룰루 한인 커뮤니티, 와이키키 관광 비즈니스, 카폴레이 지역 한인 비즈니스를 전문 지원합니다. 한국인 관광객 대상 비즈니스를 위한 한국어 웹사이트도 제작 가능합니다.'
          : 'Yes, ZOE LUMOS specializes in Korean-American business websites in Hawaii. We serve the Honolulu Korean community, Waikiki tourism businesses, and Kapolei Korean businesses. Korean-language websites for Korean tourist-facing businesses also available.' },
      },
      {
        '@type': 'Question', name: isKorean ? '하와이에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Hawaii?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS 본사는 뉴저지에 있지만, 하와이 고객님과는 Zoom/Google Meet 화상 미팅과 카카오톡으로 상담합니다. 하와이 시간대(HST)에 맞춘 유연한 미팅 일정이 가능합니다. 하와이 한인 비즈니스 웹사이트 제작 경험이 풍부합니다. 첫 상담은 무료입니다.'
          : 'ZOE LUMOS is headquartered in NJ, but we consult with Hawaii clients via Zoom/Google Meet and KakaoTalk. Flexible scheduling for Hawaii time (HST). Extensive experience with Hawaii Korean businesses. First consultation free.' },
      },
      {
        '@type': 'Question', name: isKorean ? '하와이 관광 비즈니스 웹사이트도 제작하나요?' : 'Do you create tourism business websites?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, 하와이 관광 비즈니스 웹사이트를 전문 제작합니다. 투어 예약 시스템, 한국어/영어/일본어 다국어 지원, 관광객 대상 SEO 최적화가 포함됩니다. 한국인 관광객을 타겟으로 하는 투어 회사, 숙박 업소, 렌터카, 쇼핑몰 웹사이트를 다수 제작했습니다.'
          : 'Yes, we specialize in Hawaii tourism business websites. Includes tour booking systems, multilingual support (Korean/English/Japanese), and tourism-targeted SEO. Experience with tour companies, accommodations, car rentals, and shopping targeting Korean tourists.' },
      },
      {
        '@type': 'Question', name: isKorean ? '하와이 SEO 서비스도 제공하나요?' : 'Do you offer Hawaii SEO services?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, 하와이 로컬 SEO와 관광 SEO를 모두 제공합니다. 구글 마이 비즈니스 최적화, "하와이 한국 투어", "호놀룰루 한식당" 등 키워드 타겟팅이 포함됩니다. 한국 네이버/카카오 검색 최적화도 별도 제공합니다.'
          : 'Yes, we provide both Hawaii local SEO and tourism SEO. Includes Google My Business optimization, targeting "Hawaii Korean tour", "Honolulu Korean restaurant" etc. Korean Naver/Kakao search optimization also available.' },
      },
    ],
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKorean ? '홈' : 'Home', item: isKorean ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isKorean ? '하와이 웹사이트' : 'HI Website', item: isKorean ? `${baseUrl}/ko/하와이-웹사이트` : `${baseUrl}/hi-website` },
    ],
  }

  const hiCities = [
    { ko: '호놀룰루', en: 'Honolulu', desc: isKorean ? '하와이 한인 중심지' : 'HI Korean hub' },
    { ko: '와이키키', en: 'Waikiki', desc: isKorean ? '관광 비즈니스 중심' : 'Tourism business center' },
    { ko: '카폴레이', en: 'Kapolei', desc: isKorean ? '성장하는 한인 지역' : 'Growing Korean area' },
    { ko: '펄시티', en: 'Pearl City', desc: isKorean ? '한인 가족 커뮤니티' : 'Korean family community' },
    { ko: '아이에아', en: 'Aiea', desc: isKorean ? '한인 상권 밀집' : 'Korean business district' },
    { ko: '마우이', en: 'Maui', desc: isKorean ? '관광 비즈니스' : 'Tourism business' },
  ]

  const services = [
    { icon: <Globe className="w-8 h-8" />, title: isKorean ? '비즈니스 웹사이트' : 'Business Website', desc: isKorean ? '전문적인 회사 소개 사이트' : 'Professional company website', price: '$1,000~' },
    { icon: <Building2 className="w-8 h-8" />, title: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store', desc: isKorean ? 'Shopify 기반 온라인 스토어' : 'Shopify-based online store', price: '$3,000~' },
    { icon: <Search className="w-8 h-8" />, title: isKorean ? '하와이 SEO' : 'HI SEO', desc: isKorean ? '구글 상위 노출 최적화' : 'Google ranking optimization', price: '$500/mo~' },
    { icon: <Zap className="w-8 h-8" />, title: isKorean ? '구글 광고' : 'Google Ads', desc: isKorean ? 'PPC 광고 관리' : 'PPC advertising management', price: '$300/mo~' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">{isKorean ? '홈' : 'Home'}</Link>
                <span className="mx-2">&rsaquo;</span>
                <span className="text-gray-900">{isKorean ? '하와이 웹사이트' : 'HI Website'}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (<><span className="text-cyan-600">하와이</span> 웹사이트 제작</>) : (<><span className="text-cyan-600">Hawaii</span> Website Design</>)}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean ? '호놀룰루, 와이키키 한인 비즈니스 & 관광 업체를 위한 전문 웹사이트 제작' : 'Professional website design for Korean-American businesses & tourism in Honolulu & Waikiki'}
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean ? '한국인 관광객과 하와이 현지 한인 커뮤니티를 모두 타겟팅. 한영 이중언어 웹사이트, 관광 SEO 최적화. 화상 미팅과 카카오톡으로 상담하세요.' : 'Targeting both Korean tourists and local Korean community. Bilingual websites, tourism SEO. Consult via video call or KakaoTalk.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="px-8 py-4 bg-cyan-600 text-white rounded-xl font-bold text-lg hover:bg-cyan-700 transition-colors shadow-lg">{isKorean ? '가격 보기' : 'View Pricing'}</Link>
                <Link href="#contact" className="px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-600 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-colors">{isKorean ? '무료 상담' : 'Free Consultation'}</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-cyan-600" /><span>{isKorean ? '화상 미팅 상담' : 'Video Consultation'}</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-cyan-600" /><span>{isKorean ? '카카오톡 상담 가능' : 'KakaoTalk Available'}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '하와이 서비스 지역' : 'Hawaii Service Areas'}</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{isKorean ? '하와이 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스' : 'Website design services for Korean businesses throughout Hawaii'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {hiCities.map((city) => (
                <div key={city.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-cyan-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-cyan-600 mx-auto mb-2" /><p className="font-bold text-gray-900">{isKorean ? city.ko : city.en}</p><p className="text-xs text-gray-500 mt-1">{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '하와이 웹사이트 제작 서비스' : 'HI Website Design Services'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '하와이 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for HI Korean businesses'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3><p className="text-gray-600 text-sm mb-3">{service.desc}</p><p className="text-cyan-600 font-bold">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{isKorean ? '왜 조이루모스를 선택해야 할까요?' : 'Why Choose ZOE LUMOS?'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-cyan-600" /></div>
                <h3 className="text-xl font-bold mb-2">{isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}</h3>
                <p className="text-gray-600">{isKorean ? '한국어와 영어 완벽 지원. 한국인 관광객과 현지 고객 모두 타겟팅.' : 'Perfect Korean and English support. Target both Korean tourists and local customers.'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-cyan-600" /></div>
                <h3 className="text-xl font-bold mb-2">{isKorean ? '관광 SEO 전문' : 'Tourism SEO Specialists'}</h3>
                <p className="text-gray-600">{isKorean ? '"하와이 한국 투어", "호놀룰루 한식당" 검색시 구글 1페이지 노출. 네이버 검색 최적화.' : 'Rank on page 1 for "Hawaii Korean tour" searches. Naver search optimization.'}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"><Mail className="w-8 h-8 text-cyan-600" /></div>
                <h3 className="text-xl font-bold mb-2">{isKorean ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3>
                <p className="text-gray-600">{isKorean ? 'Zoom 화상 미팅과 카카오톡으로 상담. 하와이 시간대에 맞춘 일정 조정 가능.' : 'Consultations via Zoom and KakaoTalk. Flexible Hawaii time scheduling.'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '하와이 업종별 웹사이트' : 'HI Industry-Specific Websites'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '하와이 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for HI Korean business industries'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: isKorean ? '레스토랑 & 카페' : 'Restaurants & Cafes', items: isKorean ? ['온라인 주문 시스템', 'DoorDash/UberEats 연동', '메뉴 관리', '예약 시스템'] : ['Online ordering', 'DoorDash/UberEats integration', 'Menu management', 'Reservations'] },
                { title: isKorean ? '투어 & 관광' : 'Tours & Tourism', items: isKorean ? ['투어 예약 시스템', '다국어 지원 (한/영/일)', '결제 연동', '후기 관리'] : ['Tour booking system', 'Multilingual (KR/EN/JP)', 'Payment integration', 'Review management'] },
                { title: isKorean ? '뷰티 & 헤어샵' : 'Beauty & Hair Salons', items: isKorean ? ['온라인 예약', '포트폴리오 갤러리', '가격표', 'SNS 연동'] : ['Online booking', 'Portfolio gallery', 'Price list', 'Social media integration'] },
                { title: isKorean ? '숙박 & 렌터카' : 'Accommodations & Car Rental', items: isKorean ? ['예약 시스템', '가격 비교', '후기 연동', '위치 안내'] : ['Booking system', 'Price comparison', 'Review integration', 'Location guide'] },
                { title: isKorean ? '부동산' : 'Real Estate', items: isKorean ? ['매물 리스팅', 'MLS 연동', '가상 투어', '리드 캡처'] : ['Property listings', 'MLS integration', 'Virtual tours', 'Lead capture'] },
                { title: isKorean ? '이커머스 & 리테일' : 'E-commerce & Retail', items: isKorean ? ['Shopify 스토어', '재고 관리', '결제 시스템', '배송 추적'] : ['Shopify store', 'Inventory management', 'Payment processing', 'Shipping tracking'] },
              ].map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                  <ul className="space-y-2">{industry.items.map((item, i) => (<li key={i} className="flex items-center text-gray-600"><CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />{item}</li>))}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{isKorean ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (<div key={idx} className="bg-gray-50 p-6 rounded-xl"><h3 className="text-lg font-bold mb-2">{faq.name}</h3><p className="text-gray-600">{faq.acceptedAnswer.text}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{isKorean ? '하와이 웹사이트 제작, 지금 시작하세요' : 'Start Your HI Website Today'}</h2>
            <p className="text-xl mb-8 opacity-90">{isKorean ? '무료 상담으로 시작하세요. 화상 미팅 또는 카카오톡으로 편리하게 상담 가능합니다.' : 'Start with a free consultation. Video meetings and KakaoTalk available.'}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:info@zoelumos.com" className="flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"><Mail className="w-5 h-5" />{isKorean ? '이메일 문의' : 'Email Us'}</a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">{isKorean ? '관련 서비스' : 'Related Services'}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/캘리포니아-웹사이트' : '/ca-website'} className="text-cyan-600 hover:underline">{isKorean ? '캘리포니아 웹사이트 제작' : 'CA Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/워싱턴-웹사이트' : '/wa-website'} className="text-cyan-600 hover:underline">{isKorean ? '워싱턴 웹사이트 제작' : 'WA Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-cyan-600 hover:underline">{isKorean ? '뉴저지 웹사이트 제작' : 'NJ Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-cyan-600 hover:underline">{isKorean ? '가격 안내' : 'Pricing'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-cyan-600 hover:underline">{isKorean ? '포트폴리오' : 'Portfolio'}</Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
