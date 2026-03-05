import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '팰리세이즈파크 웹사이트 제작 | 팰팍 한인 웹디자인 전문 | ZOE LUMOS',
      description: '팰리세이즈파크(Palisades Park) 웹사이트 제작 전문. 팰팍 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅. 브로드 애비뉴 한인 상가 전문. 100% 한국어 상담.',
      keywords: '팰팍 웹사이트, 팰리세이즈파크 웹사이트, Palisades Park 웹사이트, 팰팍 홈페이지 제작, 팰팍 한인 비즈니스, 팰팍 웹디자인, 팰팍 SEO, 팰팍 구글 광고, 팰팍 마케팅, 버겐카운티 웹사이트, 뉴저지 한인 웹사이트',
      openGraph: {
        title: '팰리세이즈파크 웹사이트 제작 전문 - ZOE LUMOS',
        description: '팰팍 한인 비즈니스를 위한 최고의 웹사이트 제작 서비스.',
        url: `${baseUrl}/ko/palisades-park-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/palisades-park-web-design`,
        languages: { 'x-default': `${baseUrl}/palisades-park-web-design`, 'en': `${baseUrl}/palisades-park-web-design`, 'ko': `${baseUrl}/ko/palisades-park-web-design` },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Palisades Park Web Design & Development | Korean Business Website Expert | ZOE LUMOS',
    description: 'Palisades Park, NJ web design agency specializing in Korean-American businesses. Broad Ave business district experts. Local SEO, Google Ads, Shopify e-commerce. Bilingual Korean & English.',
    keywords: 'Palisades Park web design, Palisades Park NJ website, Pal Park web developer, Bergen County web design, Korean business Palisades Park, Palisades Park SEO, Broad Avenue businesses, Korean American web design NJ',
    openGraph: {
      title: 'Palisades Park Web Design & Development - ZOE LUMOS',
      description: 'Web design for Korean-American businesses in Palisades Park, NJ.',
      url: `${baseUrl}/palisades-park-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/palisades-park-web-design`,
      languages: { 'x-default': `${baseUrl}/palisades-park-web-design`, 'en': `${baseUrl}/palisades-park-web-design`, 'ko': `${baseUrl}/ko/palisades-park-web-design` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function PalisadesParkWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const ko = locale === 'ko'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignAgency',
    name: ko ? 'ZOE LUMOS - 팰팍 웹디자인' : 'ZOE LUMOS - Palisades Park Web Design',
    description: ko
      ? '팰리세이즈파크 한인 비즈니스를 위한 웹사이트 제작 전문 에이전시'
      : 'Premier web design agency for Korean-American businesses in Palisades Park, NJ',
    url: `${baseUrl}/${ko ? 'ko/' : ''}palisades-park-web-design`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Palisades Park',
      addressRegion: 'NJ',
      postalCode: '07650',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8482', longitude: '-73.9976' },
    areaServed: [
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Leonia' },
      { '@type': 'City', name: 'Ridgefield' },
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ko ? [
      {
        '@type': 'Question',
        name: '팰팍에서 웹사이트 제작 비용은 얼마인가요?',
        acceptedAnswer: { '@type': 'Answer', text: '팰팍 지역 웹사이트 제작은 $1,000부터 시작합니다. 한식당, 뷰티샵, 학원 등 업종별 맞춤 패키지 제공. 무료 상담 가능합니다.' },
      },
      {
        '@type': 'Question',
        name: '팰팍 브로드 애비뉴 한인 비즈니스에 맞는 서비스가 있나요?',
        acceptedAnswer: { '@type': 'Answer', text: '네, 브로드 애비뉴 상가를 포함한 팰팍 한인 비즈니스를 위한 이중언어 웹사이트, 한국어 SEO, 구글 마이 비즈니스 최적화, 한인 커뮤니티 타겟 마케팅을 제공합니다.' },
      },
      {
        '@type': 'Question',
        name: '팰팍에서 구글 검색 1페이지에 나올 수 있나요?',
        acceptedAnswer: { '@type': 'Answer', text: '네, "팰팍 [업종]" 또는 "Palisades Park [업종]" 검색에서 구글 1페이지 노출을 목표로 로컬 SEO를 진행합니다. 팰팍 지역 특화 키워드 전략으로 3-6개월 내 성과를 봅니다.' },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How much does web design cost in Palisades Park?',
        acceptedAnswer: { '@type': 'Answer', text: 'Palisades Park web design starts at $1,000. We offer customized packages for restaurants, beauty shops, academies, and more. Free consultation available.' },
      },
      {
        '@type': 'Question',
        name: 'Do you work with Broad Avenue businesses?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! We specialize in Broad Avenue and Palisades Park Korean businesses. Bilingual websites, Korean SEO, Google My Business optimization, and community marketing.' },
      },
      {
        '@type': 'Question',
        name: 'Can you help my business rank on Google in Palisades Park?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, we target "Palisades Park [your business]" and Korean keywords for Google page 1 ranking. Our local SEO strategy delivers results in 3-6 months.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">
                {ko ? '팰리세이즈파크, NJ 한인타운' : 'Palisades Park, NJ Koreatown'}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {ko
                ? <>팰팍 웹사이트 제작<br /><span className="text-green-600">한인 비즈니스 전문</span></>
                : <>Palisades Park Web Design<br /><span className="text-green-600">Korean Business Experts</span></>}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {ko
                ? '팰리세이즈파크 브로드 애비뉴 한인 비즈니스를 위한 전문 웹사이트 제작. 한영 이중언어, 구글 SEO, 로컬 마케팅.'
                : 'Expert web design for Korean-American businesses on Broad Ave & all of Palisades Park. Bilingual sites, Google SEO, local marketing.'}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${ko ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
                {ko ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {ko ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{ko ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span>{ko ? '팰팍 한인 비즈니스 30+ 제작' : '30+ Pal Park Korean Businesses'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>{ko ? '2주 내 완성' : 'Ready in 2 Weeks'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Palisades Park */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {ko ? '팰팍 한인타운의 디지털 파트너' : "Palisades Park's Digital Partner"}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {ko
                ? '미국 최대 한인 밀집 지역 팰리세이즈파크. 브로드 애비뉴의 한인 비즈니스가 온라인에서도 빛날 수 있도록 도와드립니다.'
                : 'Palisades Park has the highest Korean-American population density in the US. We help Broad Avenue businesses shine online too.'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Leonia', ko: '리오니아', zip: '07605', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: false },
                { en: 'Englewood Cliffs', ko: '잉글우드클리프스', zip: '07632', highlight: false },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{ko ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {ko ? '팰팍 비즈니스 맞춤 서비스' : 'Services for Palisades Park Businesses'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{ko ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}</h3>
                <p className="text-gray-600">
                  {ko
                    ? '팰팍 한인 고객과 미국 주류 고객 모두 타겟. 자동 언어 전환, 한국어 콘텐츠 SEO 최적화.'
                    : 'Target both Korean and American customers. Auto language switching, Korean content SEO optimized.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{ko ? '팰팍 로컬 SEO' : 'Palisades Park Local SEO'}</h3>
                <p className="text-gray-600">
                  {ko
                    ? '"팰팍 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 팰팍 지역 키워드 전략.'
                    : 'Rank page 1 for "Palisades Park [business]". GMB optimization, local keyword strategy.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{ko ? '브로드 애비뉴 전문' : 'Broad Ave Specialists'}</h3>
                <p className="text-gray-600">
                  {ko
                    ? '브로드 애비뉴 한인 상가 비즈니스 전문. 한인 커뮤니티 마케팅, 카카오톡 연동, 리뷰 관리.'
                    : 'Specialists for Broad Avenue Korean businesses. Community marketing, KakaoTalk integration, review management.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Types */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {ko ? '팰팍 업종별 전문 웹사이트' : 'Palisades Park Industry Websites'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(ko ? [
                { icon: '🍽️', title: '한식당 & 카페', desc: '온라인 메뉴, 예약, 배달앱 연동, 구글 리뷰 관리' },
                { icon: '💇', title: '뷰티 & 네일살롱', desc: '온라인 예약, 포트폴리오 갤러리, SNS 연동' },
                { icon: '🏪', title: '소매점 & 마켓', desc: '온라인 주문, 상품 카탈로그, 프로모션 관리' },
                { icon: '📚', title: '학원 & 교육', desc: '수강 등록, 일정 관리, 학부모 포털' },
                { icon: '⚖️', title: '전문 서비스', desc: '상담 예약, 사례 소개, 이중언어 사이트' },
                { icon: '🏥', title: '의료 & 건강', desc: '환자 포털, 온라인 예약, HIPAA 준수' },
              ] : [
                { icon: '🍽️', title: 'Korean Restaurants & Cafes', desc: 'Online menus, reservations, delivery app integration' },
                { icon: '💇', title: 'Beauty & Nail Salons', desc: 'Online booking, portfolio galleries, social media' },
                { icon: '🏪', title: 'Retail & Markets', desc: 'Online ordering, product catalogs, promotions' },
                { icon: '📚', title: 'Academies & Education', desc: 'Enrollment, scheduling, parent portals' },
                { icon: '⚖️', title: 'Professional Services', desc: 'Consultation booking, case studies, bilingual' },
                { icon: '🏥', title: 'Medical & Health', desc: 'Patient portals, online booking, HIPAA compliant' },
              ]).map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-6 border rounded-lg">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {ko ? '팰팍 한인 비즈니스의 온라인 성장 파트너' : "Grow Your Palisades Park Business Online"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {ko
                ? '브로드 애비뉴부터 팰팍 전역까지. 한인 비즈니스 맞춤 웹사이트로 고객을 늘리세요.'
                : 'From Broad Avenue to all of Pal Park. Get more customers with a website built for your community.'}
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              {ko ? '무료 상담 예약 →' : 'Book Free Consultation →'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
