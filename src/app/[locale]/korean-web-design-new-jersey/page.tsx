import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, CheckCircle, Shield, TrendingUp, Award, Clock, DollarSign } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
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
      title: '뉴저지 한인 웹디자인 | 한국계 미국인 웹사이트 제작 전문 | ZOE LUMOS',
      description: '뉴저지 #1 한인 웹디자인 에이전시. 한국어-영어 이중언어 웹사이트, 구글 SEO, 카카오톡 연동. 포트리, 팰팍, 잉글우드, 버겐카운티 전역 서비스. 100% 한국어 상담. 무료 견적.',
      keywords: '뉴저지 한인 웹디자인, 한인 웹사이트 제작 NJ, 한국계 미국인 웹디자인, korean web design new jersey, 뉴저지 웹사이트 제작, 한인 마케팅 에이전시 뉴저지, 이중언어 웹사이트, 포트리 한인 웹디자인, 팰팍 웹사이트, 버겐카운티 한인 웹사이트',
      openGraph: {
        title: '뉴저지 한인 웹디자인 전문 - ZOE LUMOS',
        description: '뉴저지 #1 한인 웹디자인 에이전시. 이중언어, 구글 SEO, 카카오톡 연동.',
        url: `${baseUrl}/ko/korean-web-design-new-jersey`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/korean-web-design-new-jersey`,
        languages: {
          'x-default': `${baseUrl}/korean-web-design-new-jersey`,
          'en': `${baseUrl}/korean-web-design-new-jersey`,
          'ko': `${baseUrl}/ko/korean-web-design-new-jersey`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Korean Web Design New Jersey | #1 Korean-American Website Agency | ZOE LUMOS',
    description: 'New Jersey\'s #1 Korean web design agency. Bilingual Korean-English websites, local SEO, KakaoTalk integration. Serving Fort Lee, Palisades Park, Englewood & all of Bergen County. Free consultation.',
    keywords: 'korean web design new jersey, korean american web design nj, korean website design nj, bilingual web design new jersey, korean web developer nj, korean marketing agency new jersey, korean business website nj, korean seo new jersey, web design fort lee korean, korean web design bergen county',
    openGraph: {
      title: 'Korean Web Design New Jersey - ZOE LUMOS',
      description: 'NJ\'s #1 Korean web design agency. Bilingual, Fort Lee based, Bergen County wide.',
      url: `${baseUrl}/korean-web-design-new-jersey`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/korean-web-design-new-jersey`,
      languages: {
        'x-default': `${baseUrl}/korean-web-design-new-jersey`,
        'en': `${baseUrl}/korean-web-design-new-jersey`,
        'ko': `${baseUrl}/ko/korean-web-design-new-jersey`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function KoreanWebDesignNJPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const prefix = locale === 'ko' ? '/ko' : ''

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'WebDesignBusiness'],
    '@id': `${baseUrl}/korean-web-design-new-jersey#business`,
    name: locale === 'ko' ? 'ZOE LUMOS - 뉴저지 한인 웹디자인' : 'ZOE LUMOS - Korean Web Design New Jersey',
    description: locale === 'ko'
      ? '뉴저지 최고의 한인 웹디자인 에이전시. 한영 이중언어 웹사이트, 로컬 SEO, 디지털 마케팅 전문.'
      : 'New Jersey\'s premier Korean-American web design agency. Bilingual websites, local SEO, and digital marketing specialists.',
    url: `${baseUrl}${prefix}/korean-web-design-new-jersey`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bergen County',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8509', longitude: '-73.9712' },
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Englewood' },
      { '@type': 'City', name: 'Edgewater' },
      { '@type': 'City', name: 'Leonia' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Ridgefield' },
      { '@type': 'City', name: 'Teaneck' },
      { '@type': 'City', name: 'Hackensack' },
      { '@type': 'City', name: 'North Bergen' },
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '24', bestRating: '5' },
    knowsLanguage: ['English', 'Korean', 'ko-KR', 'en-US'],
    makesOffer: [
      { '@type': 'Offer', name: locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Websites' },
      { '@type': 'Offer', name: locale === 'ko' ? '구글 로컬 SEO' : 'Google Local SEO' },
      { '@type': 'Offer', name: locale === 'ko' ? '쇼핑몰 제작' : 'E-commerce Development' },
      { '@type': 'Offer', name: locale === 'ko' ? '카카오톡 & 네이버 연동' : 'KakaoTalk & Naver Integration' },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      { '@type': 'Question', name: '뉴저지에서 한인 웹디자인 비용은 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '뉴저지 한인 웹사이트 제작 비용은 스타터 플랜 $1,000부터 시작합니다. 소규모 비즈니스 $1,000-$3,000, 이커머스 쇼핑몰 $3,000-$6,000, 커스텀 엔터프라이즈 $6,000 이상. 한국어 상담 및 무료 견적 제공.' } },
      { '@type': 'Question', name: '왜 한인 비즈니스에 특화된 웹디자인이 필요한가요?', acceptedAnswer: { '@type': 'Answer', text: '한인 비즈니스는 한국 고객과 미국 주류 고객을 동시에 공략해야 합니다. 일반 웹디자인 업체는 한국어 SEO, 카카오톡 연동, 네이버 지도 등록, 한인 커뮤니티 마케팅 등을 제대로 다루지 못합니다. ZOE LUMOS는 양쪽 모두를 전문적으로 처리합니다.' } },
      { '@type': 'Question', name: '포트리, 팰팍 외에 어디서 서비스하나요?', acceptedAnswer: { '@type': 'Answer', text: '뉴저지 전역에서 서비스합니다. 버겐카운티 (포트리, 팰리세이즈파크, 잉글우드, 리지필드, 에지워터, 리오니아, 클리프사이드파크), 허드슨카운티 (저지시티, 노스버겐), 에섹스카운티, 그리고 뉴욕 플러싱, 롱아일랜드, 맨하탄까지 원격 및 대면 상담 가능합니다.' } },
      { '@type': 'Question', name: '한국어 SEO와 영어 SEO를 동시에 할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 가능합니다. 이중언어 웹사이트는 hreflang 태그, 별도 URL 구조, 각 언어별 키워드 리서치, Google 및 Naver 색인 관리를 통해 양쪽 모두 최적화됩니다. 실제로 저희 고객들은 영어 "korean restaurant nj"와 한국어 "뉴저지 한식당" 양쪽에서 상위 노출됩니다.' } },
      { '@type': 'Question', name: '웹사이트 제작 기간은 얼마나 걸리나요?', acceptedAnswer: { '@type': 'Answer', text: '표준 한인 비즈니스 웹사이트는 2-3주, 이커머스는 4-6주가 소요됩니다. 급한 경우 1주일 패스트트랙 옵션도 제공합니다. 모든 일정은 한국어로 명확히 소통되며 매주 진행 상황을 공유합니다.' } },
      { '@type': 'Question', name: 'KakaoTalk(카카오톡) 채널을 웹사이트에 연동할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 저희는 카카오톡 채널 연동, KakaoTalk 상담 버튼, 카카오맵 임베드를 표준으로 제공합니다. 미국 한인 고객들이 가장 선호하는 소통 채널이므로 모든 한인 비즈니스 웹사이트에 포함됩니다.' } },
      { '@type': 'Question', name: '기존 웹사이트를 리뉴얼할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 기존 웹사이트 리뉴얼 전문입니다. WordPress, Wix, Squarespace, GoDaddy 등 어떤 플랫폼에서든 Next.js 기반 고속 모던 웹사이트로 마이그레이션합니다. SEO 순위 유지, URL 리다이렉트, 기존 콘텐츠 보존 모두 책임집니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does Korean web design cost in New Jersey?', acceptedAnswer: { '@type': 'Answer', text: 'Korean web design in New Jersey starts at $1,000 for our Starter plan. Small business sites range $1,000-$3,000, e-commerce $3,000-$6,000, custom enterprise projects $6,000+. Free consultation and transparent pricing with no hidden fees.' } },
      { '@type': 'Question', name: 'Why do Korean-American businesses need specialized web design?', acceptedAnswer: { '@type': 'Answer', text: 'Korean-American businesses need to serve both Korean-speaking and English-speaking customers. Generic web design agencies miss critical elements: Korean SEO, KakaoTalk integration, Naver map listings, bilingual content strategy, and Korean community marketing. ZOE LUMOS handles both markets natively.' } },
      { '@type': 'Question', name: 'Which NJ cities do you serve for Korean web design?', acceptedAnswer: { '@type': 'Answer', text: 'We serve all of New Jersey. Primary coverage includes Bergen County (Fort Lee, Palisades Park, Englewood, Ridgefield, Edgewater, Leonia, Cliffside Park, Teaneck), Hudson County (Jersey City, North Bergen), Essex County, plus NYC (Flushing, Long Island, Manhattan) via remote and in-person consultation.' } },
      { '@type': 'Question', name: 'Can you do Korean and English SEO on the same site?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our bilingual sites use proper hreflang tags, separate URL structures (/en and /ko), language-specific keyword research, and dual indexing on both Google and Naver. Our clients rank for both English terms like "korean restaurant nj" and Korean terms like "뉴저지 한식당" simultaneously.' } },
      { '@type': 'Question', name: 'How long does a Korean-American website take to build?', acceptedAnswer: { '@type': 'Answer', text: 'Standard Korean business websites take 2-3 weeks. E-commerce builds take 4-6 weeks. Fast-track 1-week option available for urgent launches. All timelines are communicated clearly in both Korean and English with weekly progress updates.' } },
      { '@type': 'Question', name: 'Can you integrate KakaoTalk on our website?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — KakaoTalk Channel integration, KakaoTalk chat buttons, and Kakao Map embeds are standard on every Korean business website we build. It\'s the preferred communication channel for Korean-American customers.' } },
      { '@type': 'Question', name: 'Can you redesign my existing Korean business website?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we specialize in Korean business website redesigns. We migrate from WordPress, Wix, Squarespace, GoDaddy, or any platform to a fast modern Next.js stack. We preserve your SEO rankings, implement proper URL redirects, and carry over existing content.' } },
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: `${baseUrl}${prefix}` },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '뉴저지 한인 웹디자인' : 'Korean Web Design New Jersey', item: `${baseUrl}${prefix}/korean-web-design-new-jersey` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: locale === 'ko' ? '한인 웹디자인 서비스' : 'Korean Web Design Services',
    provider: { '@id': `${baseUrl}/korean-web-design-new-jersey#business` },
    areaServed: { '@type': 'State', name: 'New Jersey' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '1000',
      highPrice: '15000',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-rose-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4" />
              <span className="font-semibold">
                {locale === 'ko' ? '뉴저지 #1 한인 웹디자인 에이전시' : "New Jersey's #1 Korean Web Design Agency"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">
              {locale === 'ko'
                ? <>뉴저지 한인 웹디자인<br /><span className="text-rose-600">한국계 미국인 비즈니스 전문</span></>
                : <>Korean Web Design New Jersey<br /><span className="text-rose-600">Built for Korean-American Businesses</span></>
              }
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '진짜 한국계 미국인 팀이 만드는 이중언어 웹사이트. 뉴저지 버겐카운티 기반, 구글 & 네이버 SEO, 카카오톡 연동. 포트리부터 저지시티까지.'
                : 'The only truly Korean-American web design studio in NJ. Bilingual sites, Google + Naver SEO, KakaoTalk integration. Serving Fort Lee to Jersey City, Bergen County to the NYC border.'
              }
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`${prefix}/pricing`} className="px-8 py-4 bg-rose-600 text-white rounded-lg font-bold text-lg hover:bg-rose-700 transition-colors">
                {locale === 'ko' ? '가격 & 패키지 보기 →' : 'View Pricing & Packages →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '무료 상담 받기' : 'Get Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm md:text-base">
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{locale === 'ko' ? '5.0 / 24+ 리뷰' : '5.0 / 24+ Reviews'}</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /><span>{locale === 'ko' ? '100+ 한인 비즈니스' : '100+ Korean Businesses'}</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /><span>{locale === 'ko' ? '2주 내 완성' : '2 Weeks Delivery'}</span></div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-purple-500" /><span>{locale === 'ko' ? '100% 한국어 지원' : '100% Korean Support'}</span></div>
            </div>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '왜 ZOE LUMOS를 선택해야 하나요?' : 'Why Korean-American Businesses Choose Us'}
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              {locale === 'ko'
                ? '일반 웹디자인 에이전시 vs 진짜 한인 전문 에이전시의 차이를 확인하세요'
                : 'The difference between a generic agency and a true Korean-American specialist'
              }
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-bold border-b-2">{locale === 'ko' ? '비교 항목' : 'Feature'}</th>
                    <th className="p-4 text-center font-bold border-b-2 text-gray-400">{locale === 'ko' ? '일반 에이전시' : 'Generic NJ Agency'}</th>
                    <th className="p-4 text-center font-bold border-b-2 bg-rose-50 text-rose-700">ZOE LUMOS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [locale === 'ko' ? '한국어-영어 이중언어' : 'Bilingual Korean + English', false, true],
                    [locale === 'ko' ? '카카오톡 / 네이버 연동' : 'KakaoTalk & Naver integration', false, true],
                    [locale === 'ko' ? '한국어 SEO 최적화' : 'Korean-language SEO', false, true],
                    [locale === 'ko' ? '한인 커뮤니티 마케팅' : 'Korean community marketing', false, true],
                    [locale === 'ko' ? '100% 한국어 상담' : '100% Korean language support', false, true],
                    [locale === 'ko' ? '뉴저지 로컬 SEO' : 'NJ local SEO', true, true],
                    [locale === 'ko' ? '모바일 반응형 디자인' : 'Mobile responsive', true, true],
                    [locale === 'ko' ? '월 $500+ 숨은 비용' : 'Hidden monthly fees $500+', true, false],
                  ].map(([label, generic, zoe], i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{label}</td>
                      <td className="p-4 text-center">{generic ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-red-400">✗</span>}</td>
                      <td className="p-4 text-center bg-rose-50">{zoe ? <CheckCircle className="w-5 h-5 text-rose-600 mx-auto" /> : <span className="text-red-400">✗</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '한인 비즈니스 맞춤 서비스' : 'Services Built for Korean-American Businesses'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko' ? '뉴저지 한인 사업주를 위한 올인원 디지털 솔루션' : 'All-in-one digital solutions for Korean business owners in NJ'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: Globe, color: 'text-blue-600', title: '이중언어 웹사이트', desc: '한국어와 영어 양쪽에 완벽 최적화. 자동 언어 전환, hreflang 태그, 각 언어 개별 SEO.', price: '$1,000부터' },
                { icon: Search, color: 'text-green-600', title: '구글 + 네이버 SEO', desc: '미국 구글과 한국 네이버 양쪽에서 상위 노출. 한인 고객 + 현지 고객 동시 공략.', price: '월 $500부터' },
                { icon: TrendingUp, color: 'text-purple-600', title: '카카오톡 + 네이버 지도', desc: '카카오톡 채널 연동, 네이버 지도 등록, 한인 플랫폼 마케팅. 한인 고객 필수.', price: '포함' },
                { icon: DollarSign, color: 'text-rose-600', title: '쇼핑몰 제작', desc: 'Shopify / WooCommerce 한영 쇼핑몰. 한국 결제 연동 (KG이니시스, 페이코), 국제 배송.', price: '$3,000부터' },
                { icon: Clock, color: 'text-orange-600', title: '온라인 예약 시스템', desc: '한식당, 미용실, 네일샵, 병원, 학원을 위한 이중언어 예약 시스템. SMS/카카오 알림.', price: '$800부터' },
                { icon: Shield, color: 'text-indigo-600', title: '유지보수 & 호스팅', desc: '빠른 호스팅, SSL, 백업, 월간 SEO 리포트, 한국어 기술 지원. 모든 것 포함.', price: '월 $99부터' },
              ] : [
                { icon: Globe, color: 'text-blue-600', title: 'Bilingual Websites', desc: 'Perfectly optimized for both Korean and English. Auto language switching, hreflang tags, separate SEO per language.', price: 'From $1,000' },
                { icon: Search, color: 'text-green-600', title: 'Google + Naver SEO', desc: 'Rank on both US Google and Korean Naver. Win Korean-speaking + English-speaking customers simultaneously.', price: 'From $500/mo' },
                { icon: TrendingUp, color: 'text-purple-600', title: 'KakaoTalk + Naver Maps', desc: 'KakaoTalk Channel integration, Naver Map listings, Korean platform marketing. Essential for Korean customers.', price: 'Included' },
                { icon: DollarSign, color: 'text-rose-600', title: 'E-commerce Stores', desc: 'Shopify / WooCommerce bilingual stores. Korean payment gateways (KG Inicis, PayCo), international shipping.', price: 'From $3,000' },
                { icon: Clock, color: 'text-orange-600', title: 'Online Booking Systems', desc: 'Bilingual booking for restaurants, salons, nail spas, clinics, tutoring. SMS/KakaoTalk notifications.', price: 'From $800' },
                { icon: Shield, color: 'text-indigo-600', title: 'Maintenance & Hosting', desc: 'Fast hosting, SSL, backups, monthly SEO reports, Korean-language tech support. All included.', price: 'From $99/mo' },
              ]).map(({ icon: Icon, color, title, desc, price }) => (
                <div key={title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <Icon className={`w-10 h-10 ${color} mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{desc}</p>
                  <p className="text-lg font-bold text-gray-900">{price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NJ Cities Served */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {locale === 'ko' ? '뉴저지 전역 서비스 지역' : 'Serving All of New Jersey'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'ko' ? '각 도시의 한인 비즈니스 전문 페이지에서 더 자세히 확인하세요' : 'Click any city for our dedicated Korean web design page'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { en: 'Fort Lee', ko: '포트리', slug: 'fort-lee-web-design', population: '37,000+', korean: '35%' },
                { en: 'Palisades Park', ko: '팰리세이즈파크', slug: 'palisades-park-web-design', population: '21,000+', korean: '52%' },
                { en: 'Englewood', ko: '잉글우드', slug: 'englewood-nj-seo', population: '29,000+', korean: '8%' },
                { en: 'Edgewater', ko: '에지워터', slug: 'edgewater-web-design', population: '15,000+', korean: '12%' },
                { en: 'Leonia', ko: '리오니아', slug: 'leonia-web-design', population: '9,000+', korean: '25%' },
                { en: 'Cliffside Park', ko: '클리프사이드파크', slug: 'cliffside-park-web-design', population: '24,000+', korean: '14%' },
                { en: 'Ridgefield', ko: '리지필드', slug: 'ridgefield-web-design', population: '12,000+', korean: '22%' },
                { en: 'Teaneck', ko: '티넥', slug: 'fort-lee-web-design', population: '41,000+', korean: '5%' },
              ].map((city) => (
                <Link key={city.en} href={`${prefix}/${city.slug}`} className="p-6 rounded-lg border-2 border-gray-200 hover:border-rose-500 hover:shadow-md transition-all">
                  <p className="font-bold text-lg text-gray-900">{locale === 'ko' ? city.ko : city.en}</p>
                  <p className="text-sm text-gray-500 mt-1">{locale === 'ko' ? `한인 인구 ${city.korean}` : `${city.korean} Korean population`}</p>
                  <p className="text-xs text-gray-400 mt-1">{city.population}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '한인 업종별 웹사이트 전문' : 'Specialized for Korean-American Industries'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(locale === 'ko' ? [
                { icon: '🍚', title: '한식당 & 카페', desc: '온라인 메뉴, 한식 사진 최적화, Toast/Square POS 연동, 배달 플랫폼 연결' },
                { icon: '💅', title: '네일샵 & 뷰티', desc: '온라인 예약, 인스타그램 연동, 멤버십 시스템, 카카오 알림' },
                { icon: '🦷', title: '한인 치과 & 병원', desc: 'HIPAA 준수, 환자 포털, 보험 정보, 한영 진료 과목' },
                { icon: '⚖️', title: '한인 변호사 & 회계', desc: '전문 상담 예약, 케이스 스터디, 서류 보안, 이중언어 법률 콘텐츠' },
                { icon: '🏠', title: '한인 부동산', desc: 'MLS 연동, 매물 검색, 가상 투어, 한국어 검색 최적화' },
                { icon: '📚', title: '한인 학원 & SAT', desc: '수강 등록, 학부모 포털, 성적 관리, 일정 예약' },
                { icon: '💇', title: '헤어샵 & 미용실', desc: '디자이너별 포트폴리오, 예약, 가격 안내, 스타일 갤러리' },
                { icon: '🛒', title: '한식/한인 마트', desc: 'Shopify 쇼핑몰, 당일 배송, 한국 상품 카탈로그, 포인트 시스템' },
                { icon: '🎓', title: '한인 교회 & 커뮤니티', desc: '주보, 설교 아카이브, 헌금, 이벤트 등록, 한영 이중언어' },
              ] : [
                { icon: '🍚', title: 'Korean Restaurants & Cafes', desc: 'Online menus, Korean food photo optimization, Toast/Square POS integration, delivery platforms' },
                { icon: '💅', title: 'Nail Salons & Beauty', desc: 'Online booking, Instagram integration, membership systems, KakaoTalk notifications' },
                { icon: '🦷', title: 'Korean Dental & Medical', desc: 'HIPAA compliant, patient portals, insurance info, bilingual treatment descriptions' },
                { icon: '⚖️', title: 'Korean Lawyers & CPAs', desc: 'Specialized consultation booking, case studies, secure documents, bilingual legal content' },
                { icon: '🏠', title: 'Korean Real Estate', desc: 'MLS integration, property search, virtual tours, Korean-language search optimization' },
                { icon: '📚', title: 'Korean Tutoring & SAT Prep', desc: 'Enrollment, parent portals, grade tracking, scheduling' },
                { icon: '💇', title: 'Korean Hair Salons', desc: 'Designer portfolios, booking, pricing, style galleries' },
                { icon: '🛒', title: 'Korean Markets & Groceries', desc: 'Shopify e-commerce, same-day delivery, Korean product catalogs, rewards' },
                { icon: '🎓', title: 'Korean Churches & Community', desc: 'Bulletins, sermon archive, giving, event registration, bilingual content' },
              ]).map((item) => (
                <div key={item.title} className="bg-white flex items-start gap-4 p-6 rounded-lg shadow-sm">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 bg-white text-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '간단한 4단계 프로세스' : 'Simple 4-Step Process'}
            </h2>
            <div className="space-y-8">
              {(locale === 'ko' ? [
                { n: '01', title: '무료 상담 (30분)', desc: '한국어 또는 영어로 비즈니스 목표, 타겟 고객, 예산을 논의합니다. 대면 또는 온라인 가능.' },
                { n: '02', title: '맞춤 제안서 & 견적', desc: '48시간 이내에 상세한 제안서와 투명한 견적을 제공합니다. 숨은 비용 없음.' },
                { n: '03', title: '디자인 & 개발 (2-6주)', desc: '매주 진행 상황 업데이트. 한국어 슬랙 또는 카카오톡으로 실시간 소통.' },
                { n: '04', title: '런칭 & SEO 최적화', desc: '웹사이트 런칭 후에도 구글/네이버 SEO 모니터링 및 월간 리포트를 제공합니다.' },
              ] : [
                { n: '01', title: 'Free Consultation (30 min)', desc: 'Discuss your business goals, target customers, and budget in Korean or English. In-person or online.' },
                { n: '02', title: 'Custom Proposal & Quote', desc: 'Detailed proposal with transparent pricing within 48 hours. No hidden fees.' },
                { n: '03', title: 'Design & Development (2-6 weeks)', desc: 'Weekly progress updates via Korean Slack or KakaoTalk. Real-time communication.' },
                { n: '04', title: 'Launch & SEO Optimization', desc: 'Post-launch Google/Naver SEO monitoring and monthly performance reports.' },
              ]).map((step) => (
                <div key={step.n} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xl">{step.n}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq: any, i: number) => (
                <details key={i} className="bg-white p-6 rounded-lg shadow-sm group">
                  <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                    {faq.name}
                    <span className="text-rose-600 group-open:rotate-45 transition-transform text-2xl">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-rose-600 to-rose-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {locale === 'ko' ? '뉴저지 #1 한인 웹디자인 에이전시' : "New Jersey's #1 Korean Web Design Agency"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko' ? '오늘 무료 상담을 예약하세요. 한국어 상담 100% 가능. 뉴저지 전역 서비스.' : 'Book your free consultation today. 100% Korean-language support. Serving all of New Jersey.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="px-10 py-4 bg-white text-rose-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
              </Link>
              <Link href={`${prefix}/pricing`} className="px-10 py-4 bg-rose-800 text-white border-2 border-white rounded-lg font-bold text-lg hover:bg-rose-900 transition-colors">
                {locale === 'ko' ? '가격 보기' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
