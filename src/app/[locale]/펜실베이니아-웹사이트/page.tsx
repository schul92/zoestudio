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
      ? '펜실베이니아 웹사이트 제작 | 필라델피아 한인 홈페이지 전문 | 조이루모스'
      : 'Pennsylvania Website Design | Philadelphia Korean Business Web Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '펜실베이니아 웹사이트 제작 전문 업체 조이루모스. 필라델피아, 킹오브프러시아 한인 홈페이지. SEO, 구글 상위노출, 광고대행, 소셜미디어 관리, 구글/인스타 광고.'
      : 'Professional Pennsylvania website design for Korean-American businesses. Philadelphia, King of Prussia, Cheltenham web development. PA SEO, Google ranking.',
    keywords: locale === 'ko'
      ? '펜실베이니아 웹사이트, 펜실베이니아 웹사이트 제작, 필라델피아 웹사이트, 필라델피아 한인 웹사이트, 킹오브프러시아 웹사이트, 펜실베이니아 SEO, 펜실베이니아 광고대행, 펜실베이니아 소셜미디어, 펜실베이니아 인스타광고, 한인 광고대행'
      : 'Pennsylvania website, PA website design, Philadelphia Korean website, King of Prussia website, PA SEO, Pennsylvania social media management, Pennsylvania Google Ads, Pennsylvania Korean advertising agency',
    openGraph: {
      title: locale === 'ko' ? '펜실베이니아 웹사이트 제작 전문 - 조이루모스' : 'Pennsylvania Website Design - ZOE LUMOS',
      description: locale === 'ko' ? '펜실베이니아 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스.' : 'Premier website design for PA Korean businesses.',
      url: locale === 'ko' ? `${baseUrl}/ko/펜실베이니아-웹사이트` : `${baseUrl}/pa-website`,
      siteName: 'ZOE LUMOS 조이루모스', locale: locale === 'ko' ? 'ko_KR' : 'en_US', type: 'website',
      images: [{ url: `${baseUrl}/og-pa-website.jpg`, width: 1200, height: 630, alt: locale === 'ko' ? '펜실베이니아 웹사이트 제작' : 'Pennsylvania Website Design' }],
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/펜실베이니아-웹사이트` : `${baseUrl}/pa-website`,
      languages: { 'x-default': `${baseUrl}/pa-website`, 'en': `${baseUrl}/pa-website`, 'ko': `${baseUrl}/ko/펜실베이니아-웹사이트` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

export default function PAWebsiteKoreanPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const isKorean = locale === 'ko'

  const organizationSchema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'ZOE LUMOS 조이루모스', url: baseUrl, logo: `${baseUrl}/logo.png`,
    description: isKorean ? '펜실베이니아 한인 비즈니스를 위한 웹사이트 제작 전문 업체' : 'Professional web design for Korean-American businesses in Pennsylvania',
    address: { '@type': 'PostalAddress', addressLocality: 'Fort Lee', addressRegion: 'NJ', addressCountry: 'US' },
    contactPoint: { '@type': 'ContactPoint', email: 'info@zoelumos.com', contactType: 'sales', availableLanguage: ['English', 'Korean'] },
    sameAs: ['https://www.instagram.com/zoelumos'], inLanguage: isKorean ? 'ko' : 'en',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${baseUrl}/#pennsylvania-service`,
    name: isKorean ? '조이루모스 - 펜실베이니아 웹사이트 제작' : 'ZOE LUMOS - Pennsylvania Website Design',
    image: `${baseUrl}/logo.png`,
    description: isKorean ? '펜실베이니아 한인 비즈니스를 위한 웹사이트 제작 전문.' : 'Website design for Korean-American businesses in Pennsylvania.',
    url: isKorean ? `${baseUrl}/ko/펜실베이니아-웹사이트` : `${baseUrl}/pa-website`, email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressRegion: 'PA', addressCountry: 'US' },
    areaServed: [
      { '@type': 'City', name: 'Philadelphia' }, { '@type': 'City', name: 'King of Prussia' },
      { '@type': 'City', name: 'Cheltenham' }, { '@type': 'City', name: 'Upper Darby' },
      { '@type': 'City', name: 'Elkins Park' }, { '@type': 'State', name: 'Pennsylvania' },
    ],
    priceRange: '$$', inLanguage: isKorean ? 'ko' : 'en',
  }

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: isKorean ? '펜실베이니아 웹사이트 제작 서비스' : 'Pennsylvania Website Design Service',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS' },
    serviceType: 'Website Design', areaServed: { '@type': 'State', name: 'Pennsylvania' },
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
        '@type': 'Question', name: isKorean ? '펜실베이니아 웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost in Pennsylvania?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS의 펜실베이니아 웹사이트 제작 비용은 기본 비즈니스 웹사이트 $1,000-$2,500, Shopify 이커머스 쇼핑몰 $3,000-$6,000입니다. 필라델피아, 킹오브프러시아 등 펜실베이니아 전 지역 동일 가격입니다. 화상 미팅으로 무료 상담이 가능합니다.'
          : 'ZOE LUMOS website design in Pennsylvania: basic business websites $1,000-$2,500, Shopify e-commerce $3,000-$6,000. Same pricing across Philadelphia and King of Prussia. Free consultation via video call.' },
      },
      {
        '@type': 'Question', name: isKorean ? '필라델피아에서 한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites in Philadelphia?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, ZOE LUMOS는 펜실베이니아 한인 비즈니스 웹사이트 제작 전문입니다. 필라델피아 올니 한인타운, 킹오브프러시아, 첼튼햄 등 한인 밀집 지역의 비즈니스를 지원합니다. 뉴저지 본사에서 가까워 필요시 방문 미팅도 가능합니다.'
          : 'Yes, ZOE LUMOS specializes in Korean-American business websites in Pennsylvania. We serve Philadelphia Olney Koreatown, King of Prussia, and Cheltenham. Based in nearby NJ, in-person meetings possible when needed.' },
      },
      {
        '@type': 'Question', name: isKorean ? '펜실베이니아에서 직접 만나서 상담 가능한가요?' : 'Can we meet in person in Pennsylvania?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? 'ZOE LUMOS 본사는 뉴저지에 있어 필라델피아와 매우 가깝습니다. 화상 미팅(Zoom/Google Meet)과 카카오톡 상담은 물론, 필라델피아 지역 고객님께는 방문 미팅도 가능합니다. 동부 시간대가 같아 실시간 소통이 원활합니다.'
          : 'ZOE LUMOS is headquartered in NJ, very close to Philadelphia. Video meetings and KakaoTalk are available, and in-person meetings possible for Philadelphia area clients. Same Eastern time zone.' },
      },
      {
        '@type': 'Question', name: isKorean ? '펜실베이니아 SEO 서비스도 제공하나요?' : 'Do you offer Pennsylvania SEO services?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '네, 펜실베이니아 로컬 SEO 서비스를 전문 제공합니다. 필라델피아 지역 구글 마이 비즈니스 최적화, "필라델피아 한식당", "킹오브프러시아 뷰티" 등 키워드 최적화가 포함됩니다. 월정액 SEO 서비스($500/월~)도 이용 가능합니다.'
          : 'Yes, we provide Pennsylvania local SEO. Includes Philadelphia area Google My Business optimization, keyword targeting. Monthly SEO ($500/month+) available.' },
      },
      {
        '@type': 'Question', name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: { '@type': 'Answer', text: isKorean
          ? '기본 비즈니스 웹사이트는 평균 10일(1-2주), Shopify 이커머스 쇼핑몰은 평균 21일(2-4주)이 소요됩니다. 뉴저지 본사에서 가까워 빠른 소통이 가능합니다.'
          : 'Basic business websites take about 10 days (1-2 weeks), Shopify e-commerce stores take 21 days (2-4 weeks). Close proximity from NJ HQ enables fast communication.' },
      },
    ],
    inLanguage: isKorean ? 'ko' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKorean ? '홈' : 'Home', item: isKorean ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: isKorean ? '펜실베이니아 웹사이트' : 'PA Website', item: isKorean ? `${baseUrl}/ko/펜실베이니아-웹사이트` : `${baseUrl}/pa-website` },
    ],
  }

  const paCities = [
    { ko: '필라델피아', en: 'Philadelphia', desc: isKorean ? '펜실베이니아 한인 중심' : 'PA Korean center' },
    { ko: '킹오브프러시아', en: 'King of Prussia', desc: isKorean ? '한인 비즈니스 밀집' : 'Korean business hub' },
    { ko: '첼튼햄', en: 'Cheltenham', desc: isKorean ? '한인 가족 커뮤니티' : 'Korean family area' },
    { ko: '어퍼다비', en: 'Upper Darby', desc: isKorean ? '한인 상권 지역' : 'Korean commercial area' },
    { ko: '엘킨스파크', en: 'Elkins Park', desc: isKorean ? '한인 전문직 지역' : 'Korean professional area' },
    { ko: '노리스타운', en: 'Norristown', desc: isKorean ? '성장하는 한인 지역' : 'Growing Korean area' },
  ]

  const services = [
    { icon: <Globe className="w-8 h-8" />, title: isKorean ? '비즈니스 웹사이트' : 'Business Website', desc: isKorean ? '전문적인 회사 소개 사이트' : 'Professional company website', price: '$1,000~' },
    { icon: <Building2 className="w-8 h-8" />, title: isKorean ? '이커머스 쇼핑몰' : 'E-commerce Store', desc: isKorean ? 'Shopify 기반 온라인 스토어' : 'Shopify-based online store', price: '$3,000~' },
    { icon: <Search className="w-8 h-8" />, title: isKorean ? '펜실베이니아 SEO' : 'PA SEO', desc: isKorean ? '구글 상위 노출 최적화' : 'Google ranking optimization', price: '$500/mo~' },
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
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-violet-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <nav className="text-sm mb-6 text-gray-500">
                <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">{isKorean ? '홈' : 'Home'}</Link>
                <span className="mx-2">&rsaquo;</span>
                <span className="text-gray-900">{isKorean ? '펜실베이니아 웹사이트' : 'PA Website'}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                {isKorean ? (<><span className="text-violet-600">펜실베이니아</span> 웹사이트 제작</>) : (<><span className="text-violet-600">Pennsylvania</span> Website Design</>)}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                {isKorean ? '필라델피아, 킹오브프러시아, 첼튼햄 한인 비즈니스를 위한 전문 웹사이트 제작' : 'Professional website design for Korean-American businesses in Philadelphia, King of Prussia & Cheltenham'}
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {isKorean ? '뉴저지 본사에서 가까운 펜실베이니아. 방문 미팅과 화상 미팅 모두 가능. 한영 이중언어 웹사이트, SEO 최적화.' : 'Close to our NJ headquarters. In-person and video meetings available. Bilingual websites with SEO.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="px-8 py-4 bg-violet-600 text-white rounded-xl font-bold text-lg hover:bg-violet-700 transition-colors shadow-lg">{isKorean ? '가격 보기' : 'View Pricing'}</Link>
                <Link href="#contact" className="px-8 py-4 bg-white text-violet-600 border-2 border-violet-600 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors">{isKorean ? '무료 상담' : 'Free Consultation'}</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{isKorean ? '4.9점 평점' : '4.9 Rating'}</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-violet-600" /><span>{isKorean ? '방문/화상 미팅' : 'In-person/Video'}</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-violet-600" /><span>{isKorean ? '카카오톡 상담 가능' : 'KakaoTalk Available'}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '펜실베이니아 서비스 지역' : 'Pennsylvania Service Areas'}</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{isKorean ? '펜실베이니아 전 지역 한인 비즈니스를 위한 웹사이트 제작 서비스' : 'Website design services for Korean businesses throughout Pennsylvania'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {paCities.map((city) => (
                <div key={city.en} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-violet-50 transition-colors border border-gray-100">
                  <MapPin className="w-6 h-6 text-violet-600 mx-auto mb-2" /><p className="font-bold text-gray-900">{isKorean ? city.ko : city.en}</p><p className="text-xs text-gray-500 mt-1">{city.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '펜실베이니아 웹사이트 제작 서비스' : 'PA Website Design Services'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '펜실베이니아 한인 비즈니스에 최적화된 웹서비스' : 'Web services optimized for PA Korean businesses'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3><p className="text-gray-600 text-sm mb-3">{service.desc}</p><p className="text-violet-600 font-bold">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{isKorean ? '왜 조이루모스를 선택해야 할까요?' : 'Why Choose ZOE LUMOS?'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center"><div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-violet-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? '한영 이중언어 전문' : 'Bilingual Experts'}</h3><p className="text-gray-600">{isKorean ? '한국어와 영어 완벽 지원. 필라델피아 한인 고객과 미국 고객 모두 타겟팅.' : 'Perfect Korean and English support for Pennsylvania businesses.'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-violet-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? '펜실베이니아 SEO 전문' : 'PA SEO Specialists'}</h3><p className="text-gray-600">{isKorean ? '"필라델피아 [업종]" 검색시 구글 1페이지 노출. 펜실베이니아 로컬 SEO.' : 'Rank on page 1 for "Philadelphia [business]" searches. PA local SEO.'}</p></div>
              <div className="text-center"><div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8 text-violet-600" /></div><h3 className="text-xl font-bold mb-2">{isKorean ? 'NJ 본사 인접' : 'Near NJ HQ'}</h3><p className="text-gray-600">{isKorean ? '뉴저지 본사에서 가까워 방문 미팅 가능. 화상 미팅과 카카오톡 상담도 지원.' : 'Close to our NJ headquarters. In-person meetings possible. Video and KakaoTalk also available.'}</p></div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{isKorean ? '펜실베이니아 업종별 웹사이트' : 'PA Industry-Specific Websites'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '펜실베이니아 한인 비즈니스 업종별 맞춤 웹사이트' : 'Custom websites for PA Korean business industries'}</p>
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
                  <ul className="space-y-2">{industry.items.map((item, i) => (<li key={i} className="flex items-center text-gray-600"><CheckCircle className="w-4 h-4 text-violet-500 mr-2 flex-shrink-0" />{item}</li>))}</ul>
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

        <section className="py-16 px-4 bg-gradient-to-br from-violet-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{isKorean ? '펜실베이니아 웹사이트 제작, 지금 시작하세요' : 'Start Your PA Website Today'}</h2>
            <p className="text-xl mb-8 opacity-90">{isKorean ? '무료 상담으로 시작하세요. 방문 미팅, 화상 미팅, 카카오톡 모두 가능합니다.' : 'Start with a free consultation. In-person, video, and KakaoTalk available.'}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:info@zoelumos.com" className="flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"><Mail className="w-5 h-5" />{isKorean ? '이메일 문의' : 'Email Us'}</a>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4 text-center">{isKorean ? '관련 서비스' : 'Related Services'}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-violet-600 hover:underline">{isKorean ? '뉴저지 웹사이트 제작' : 'NJ Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴욕-웹사이트' : '/ny-website'} className="text-violet-600 hover:underline">{isKorean ? '뉴욕 웹사이트 제작' : 'NY Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/메릴랜드-웹사이트' : '/md-website'} className="text-violet-600 hover:underline">{isKorean ? '메릴랜드 웹사이트 제작' : 'MD Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="text-violet-600 hover:underline">{isKorean ? '가격 안내' : 'Pricing'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/portfolio' : '/portfolio'} className="text-violet-600 hover:underline">{isKorean ? '포트폴리오' : 'Portfolio'}</Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
