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
      ? '플로리다 웹사이트 제작 | 마이애미 올랜도 한인 홈페이지 전문 | 조이루모스'
      : 'Florida Website Design | Miami Orlando Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '플로리다 웹사이트 제작 전문 업체 조이루모스. 마이애미, 올랜도, 탬파, 잭슨빌 한인 비즈니스 홈페이지 제작. 플로리다 SEO 최적화, 구글 상위노출.'
      : 'Professional Florida website design for Korean-American businesses. Miami, Orlando, Tampa, Jacksonville web development. FL SEO, Google ranking.',
    keywords: locale === 'ko'
      ? '플로리다 웹사이트, 플로리다 웹사이트 제작, 마이애미 웹사이트, 올랜도 웹사이트, 플로리다 한인 웹사이트, 마이애미 한인 홈페이지, 플로리다 SEO'
      : 'Florida website, FL website design, Miami Korean website, Orlando Korean website, Tampa website, FL SEO',
    openGraph: {
      title: locale === 'ko' ? '플로리다 웹사이트 제작 전문 - 조이루모스' : 'Florida Website Design - ZOE LUMOS',
      description: locale === 'ko' ? '플로리다 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스.' : 'Premier website design for FL Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/플로리다-웹사이트` : `${baseUrl}/fl-website`,
      siteName: 'ZOE LUMOS 조이루모스', locale: locale === 'ko' ? 'ko_KR' : 'en_US', type: 'website',
      images: [{ url: `${baseUrl}/og-fl-website.jpg`, width: 1200, height: 630, alt: locale === 'ko' ? '플로리다 웹사이트 제작' : 'Florida Website Design' }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/플로리다-웹사이트` : `${baseUrl}/fl-website`,
      languages: { 'x-default': `${baseUrl}/fl-website`, 'en': `${baseUrl}/fl-website`, 'ko': `${baseUrl}/ko/플로리다-웹사이트` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function FLWebsiteKoreanPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const isKorean = locale === 'ko'

  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'ZOE LUMOS 조이루모스', url: baseUrl, logo: `${baseUrl}/logo.png`,
    description: isKorean ? '플로리다 한인 비즈니스를 위한 웹사이트 제작 전문 업체' : 'Professional web design for Korean-American businesses in Florida',
    address: { '@type': 'PostalAddress', addressLocality: 'Fort Lee', addressRegion: 'NJ', addressCountry: 'US' },
    contactPoint: { '@type': 'ContactPoint', email: 'info@zoelumos.com', contactType: 'sales', availableLanguage: ['English', 'Korean'] },
    sameAs: ['https://www.instagram.com/zoelumos'], inLanguage: isKorean ? 'ko' : 'en',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${baseUrl}/#florida-service`,
    name: isKorean ? '조이루모스 - 플로리다 웹사이트 제작' : 'ZOE LUMOS - Florida Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean ? '플로리다 한인 비즈니스를 위한 웹사이트 제작 전문.' : 'Website design for Korean-American businesses in Florida.',
    url: isKorean ? `${baseUrl}/ko/플로리다-웹사이트` : `${baseUrl}/fl-website`, email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressRegion: 'FL', addressCountry: 'US' },
    areaServed: [
      { '@type': 'City', name: 'Miami' }, { '@type': 'City', name: 'Orlando' },
      { '@type': 'City', name: 'Tampa' }, { '@type': 'City', name: 'Jacksonville' },
      { '@type': 'City', name: 'Fort Lauderdale' }, { '@type': 'State', name: 'Florida' },
    ],
    priceRange: '$$', inLanguage: isKorean ? 'ko' : 'en',
  }

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: isKorean ? '플로리다 웹사이트 제작 서비스' : 'Florida Website Design Service',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS' },
    serviceType: 'Website Design', areaServed: { '@type': 'State', name: 'Florida' },
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
        '@type': 'Question', name: isKorean ? '플로리다 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in Florida?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS의 플로리다 웹사이트 제작 비용은 기본 비즈니스 웹사이트 $1,000-$2,500, Shopify 이커머스 쇼핑몰 $3,000-$6,000입니다. 마이애미, 올랜도, 탬파 등 플로리다 전 지역 동일 가격입니다. 화상 미팅으로 무료 상담이 가능합니다.'
          : 'ZOE LUMOS website design in Florida: basic business websites $1,000-$2,500, Shopify e-commerce $3,000-$6,000. Same pricing across Miami, Orlando, and Tampa. Free consultation via video call.' },
      },
      {
        '@type': 'Question', name: isKorean ? '플로리다에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in Florida?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, ZOE LUMOS는 플로리다 한인 비즈니스 웹사이트 제작 전문입니다. 플로리다는 최근 한인 인구가 빠르게 증가하고 있으며, 마이애미, 올랜도, 탬파 등지에 한인 비즈니스가 늘어나고 있습니다. 화상 미팅과 카카오톡으로 편리하게 상담 가능합니다.'
          : 'Yes, ZOE LUMOS specializes in Korean-American business websites in Florida. Florida Korean population is growing rapidly, with businesses expanding in Miami, Orlando, and Tampa. Consultations via video call and KakaoTalk.' },
      },
      {
        '@type': 'Question', name: isKorean ? '플로리다에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Florida?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS 본사는 뉴저지에 있지만, 플로리다 고객님과는 Zoom/Google Meet 화상 미팅과 카카오톡으로 상담합니다. 동부 시간대가 같아 실시간 소통이 원활합니다. 플로리다 한인 비즈니스 웹사이트 제작 경험이 풍부합니다. 첫 상담은 무료입니다.'
          : 'ZOE LUMOS is HQ in NJ, but we consult with Florida clients via Zoom/Google Meet and KakaoTalk. Same Eastern time zone. Extensive Florida Korean business experience. First consultation free.' },
      },
      {
        '@type': 'Question', name: isKorean ? '플로리다 SEO 서비스도 제공하나요?' : 'Do you offer Florida SEO services?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, 플로리다 로컬 SEO 서비스를 전문 제공합니다. 마이애미, 올랜도 지역 구글 마이 비즈니스 최적화, "마이애미 한식당", "올랜도 한인 비즈니스" 등 키워드 최적화가 포함됩니다. 월정액 SEO 서비스($500/월~)도 이용 가능합니다.'
          : 'Yes, we provide Florida local SEO. Includes Miami and Orlando Google My Business optimization, keyword targeting. Monthly SEO ($500/month+) available.' },
      },
      {
        '@type': 'Question', name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '기본 비즈니스 웹사이트는 평균 10일(1-2주), Shopify 이커머스 쇼핑몰은 평균 21일(2-4주)이 소요됩니다. 동부 시간대가 같아 진행 상황 공유가 원활합니다.'
          : 'Basic business websites take about 10 days (1-2 weeks), Shopify e-commerce stores take 21 days (2-4 weeks). Same Eastern time zone for smooth communication.' },
      },
    ],
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKorean ? '홈' : 'Home', item: isKorean ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isKorean ? '플로리다 웹사이트' : 'FL Website', item: isKorean ? `${baseUrl}/ko/플로리다-웹사이트` : `${baseUrl}/fl-website` },
    ],
  }

  const flCities = [
    { ko: '마이애미', en: 'Miami', desc: isKorean ? '남부 플로리다 한인 중심' : 'South FL Korean center' },
    { ko: '올랜도', en: 'Orlando', desc: isKorean ? '중부 플로리다 한인 지역' : 'Central FL Korean area' },
    { ko: '탬파', en: 'Tampa', desc: isKorean ? '성장하는 한인 커뮤니티' : 'Growing Korean community' },
    { ko: '잭슨빌', en: 'Jacksonville', desc: isKorean ? '북부 플로리다 한인 지역' : 'North FL Korean area' },
    { ko: '포트로더데일', en: 'Fort Lauderdale', desc: isKorean ? '한인 비즈니스 확장' : 'Expanding Korean business' },
    { ko: '세인트피터즈버그', en: 'St. Petersburg', desc: isKorean ? '한인 은퇴 커뮤니티' : 'Korean retirement community' },
  ]

  const services = [
    { icon: <Globe className="w-8 h-8" />, title: isKorean ? '비즈니스 웹사이트' : 'Business Website', desc: isKorean ? '전문적인 회사 소개 사이트' : 'Professional company website', price: '$1,000~' },
    { icon: <Building2 className="w-8 h-8" />, title: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store', desc: isKorean ? 'Shopify 기반 온라인 스토어' : 'Shopify-based online store', price: '$3,000~' },
    { icon: <Search className="w-8 h-8" />, title: isKorean ? '플로리다 SEO' : 'FL SEO', desc: isKorean ? '구글 상위 노출 최적화' : 'Google ranking optimization', price: '$500/mo~' },
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 via-white to-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">{isKorean ? '홈' : 'Home'}</Link>
                <span className="mx-2">&rsaquo;</span>
                <span className="text-gray-900">{isKorean ? '플로리다 웹사이트' : 'FL Website'}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (<><span className="text-orange-600">플로리다</span> 웹사이트 제작</>) : (<><span className="text-orange-600">Florida</span> Website Design</>)}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean ? '마이애미, 올랜도, 탬파 한인 비즈니스를 위한 전문 웹사이트 제작 서비스' : 'Professional website design for Korean-American businesses in Miami, Orlando & Tampa'}
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean ? '빠르게 성장하는 플로리다 한인 커뮤니티를 위한 맞춤형 웹사이트. 한영 이중언어, SEO 최적화. 화상 미팅과 카카오톡으로 상담하세요.' : 'Custom websites for Florida rapidly growing Korean community. Bilingual sites with SEO. Consult via video call or KakaoTalk.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg">{isKorean ? '가격 보기' : 'View Pricing'}</Link>
                <Link href="#contact" className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors">{isKorean ? '무료 상담' : 'Free Consultation'}</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-orange-600" /><span>{isKorean ? '화상 미팅 상담' : 'Video Consultation'}</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-600" /><span>{isKorean ? '카카오톡 상담 가능' : 'KakaoTalk Available'}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '플로리다 서비스 지역' : 'Florida Service Areas'}</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{isKorean ? '플로리다 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스' : 'Website design services for Korean businesses throughout Florida'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {flCities.map((city) => (
                <div key={city.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-orange-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-orange-600 mx-auto mb-2" /><p className="font-bold text-gray-900">{isKorean ? city.ko : city.en}</p><p className="text-xs text-gray-500 mt-1">{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '플로리다 웹사이트 제작 서비스' : 'FL Website Design Services'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '플로리다 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for FL Korean businesses'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3><p className="text-gray-600 text-sm mb-3">{service.desc}</p><p className="text-orange-600 font-bold">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{isKorean ? '왜 조이루모스를 선택해야 할까요?' : 'Why Choose ZOE LUMOS?'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-orange-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}</h3><p className="text-gray-600">{isKorean ? '한국어와 영어 완벽 지원. 플로리다 한인 고객과 미국 고객 모두 타겟팅.' : 'Perfect Korean and English support for Florida businesses.'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-orange-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? '플로리다 SEO 전문' : 'FL SEO Specialists'}</h3><p className="text-gray-600">{isKorean ? '"마이애미 [업종]", "올랜도 [업종]" 검색시 구글 1페이지 노출.' : 'Rank on page 1 for "Miami [business]" and "Orlando [business]" searches.'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"><Mail className="w-8 h-8 text-orange-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? '화상 미팅 & 카카오톡' : 'Video & KakaoTalk'}</h3><p className="text-gray-600">{isKorean ? 'Zoom 화상 미팅과 카카오톡으로 편리하게 상담. 동부 시간대 동일.' : 'Consultations via Zoom and KakaoTalk. Same Eastern time zone.'}</p></div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '플로리다 업종별 웹사이트' : 'FL Industry-Specific Websites'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '플로리다 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for FL Korean business industries'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: isKorean ? '레스토랑 & 카페' : 'Restaurants & Cafes', items: isKorean ? ['온라인 주문 시스템', 'DoorDash/UberEats 연동', '메뉴 관리', '예약 시스템'] : ['Online ordering', 'DoorDash/UberEats integration', 'Menu management', 'Reservations'] },
                { title: isKorean ? '뷰티 & 헤어샵' : 'Beauty & Hair Salons', items: isKorean ? ['온라인 예약', '포트폴리오 갤러리', '가격표', 'SNS 연동'] : ['Online booking', 'Portfolio gallery', 'Price list', 'Social media integration'] },
                { title: isKorean ? '의료 & 치과' : 'Medical & Dental', items: isKorean ? ['환자 포털', '온라인 예약', 'HIPAA 준수', '보험 정보'] : ['Patient portal', 'Online appointments', 'HIPAA compliant', 'Insurance info'] },
                { title: isKorean ? '변호사 & 회계사' : 'Lawyers & CPAs', items: isKorean ? ['전문가 프로필', '상담 예약', '고객 포털', '케이스 관리'] : ['Professional profiles', 'Consultation booking', 'Client portal', 'Case management'] },
                { title: isKorean ? '부동산' : 'Real Estate', items: isKorean ? ['매물 리스팅', 'MLS 연동', '가상 투어', '리드 캡처'] : ['Property listings', 'MLS integration', 'Virtual tours', 'Lead capture'] },
                { title: isKorean ? '이커머스 & 리테일' : 'E-commerce & Retail', items: isKorean ? ['Shopify 스토어', '재고 관리', '결제 시스템', '배송 추적'] : ['Shopify store', 'Inventory management', 'Payment processing', 'Shipping tracking'] },
              ].map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                  <ul className="space-y-2">{industry.items.map((item, i) => (<li key={i} className="flex items-center text-gray-600"><CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />{item}</li>))}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{isKorean ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (<div key={idx} className="bg-gray-50 p-6 rounded-xl"><h3 className="text-lg font-bold mb-2">{faq.name}</h3><p className="text-gray-600">{faq.acceptedAnswer.text}</p></div>))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{isKorean ? '플로리다 웹사이트 제작, 지금 시작하세요' : 'Start Your FL Website Today'}</h2>
            <p className="text-xl mb-8 opacity-90">{isKorean ? '무료 상담으로 시작하세요. 화상 미팅 또는 카카오톡으로 편리하게 상담 가능합니다.' : 'Start with a free consultation. Video meetings and KakaoTalk available.'}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:info@zoelumos.com" className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"><Mail className="w-5 h-5" />{isKorean ? '이메일 문의' : 'Email Us'}</a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">{isKorean ? '관련 서비스' : 'Related Services'}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/조지아-웹사이트' : '/ga-website'} className="text-orange-600 hover:underline">{isKorean ? '조지아 웹사이트 제작' : 'GA Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/텍사스-웹사이트' : '/tx-website'} className="text-orange-600 hover:underline">{isKorean ? '텍사스 웹사이트 제작' : 'TX Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-orange-600 hover:underline">{isKorean ? '뉴저지 웹사이트 제작' : 'NJ Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-orange-600 hover:underline">{isKorean ? '가격 안내' : 'Pricing'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-orange-600 hover:underline">{isKorean ? '포트폴리오' : 'Portfolio'}</Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
