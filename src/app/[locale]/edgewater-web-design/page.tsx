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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '에지워터 웹사이트 제작 | Edgewater 한인 웹디자인 | ZOE LUMOS',
      description: '에지워터(Edgewater) 웹사이트 제작 전문. 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 한인 마케팅. 미쓰비시 아울렛 근처. 100% 한국어 상담.',
      keywords: '에지워터 웹사이트, Edgewater 웹디자인, 에지워터 한인 비즈니스, 에지워터 SEO, 버겐카운티 웹사이트, 한인 마케팅 에이전시, 뉴저지 웹사이트 제작',
      openGraph: {
        title: '에지워터 웹사이트 제작 - ZOE LUMOS',
        description: '에지워터 한인 비즈니스를 위한 웹사이트 제작 서비스.',
        url: `${baseUrl}/ko/edgewater-web-design`, siteName: 'ZOE LUMOS', locale: 'ko_KR', alternateLocale: 'en_US', type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/edgewater-web-design`,
        languages: { 'x-default': `${baseUrl}/edgewater-web-design`, 'en': `${baseUrl}/edgewater-web-design`, 'ko': `${baseUrl}/ko/edgewater-web-design` },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Edgewater Web Design | Korean Business Website NJ | ZOE LUMOS',
    description: 'Edgewater, NJ web design & digital marketing. Korean-American business website specialists. Local SEO, Google Ads, bilingual websites. Near Mitsuwa Marketplace. Free consultation.',
    keywords: 'Edgewater web design, Edgewater NJ website, Korean business Edgewater, Bergen County web design, small business SEO NJ, Edgewater digital marketing, Mitsuwa marketplace',
    openGraph: {
      title: 'Edgewater Web Design - ZOE LUMOS',
      description: 'Web design agency in Edgewater, NJ. Korean-American business specialists.',
      url: `${baseUrl}/edgewater-web-design`, siteName: 'ZOE LUMOS', locale: 'en_US', alternateLocale: 'ko_KR', type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/edgewater-web-design`,
      languages: { 'x-default': `${baseUrl}/edgewater-web-design`, 'en': `${baseUrl}/edgewater-web-design`, 'ko': `${baseUrl}/ko/edgewater-web-design` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function EdgewaterWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: locale === 'ko' ? 'ZOE LUMOS - 에지워터 웹디자인' : 'ZOE LUMOS - Edgewater Web Design',
    description: locale === 'ko' ? '에지워터 한인 비즈니스를 위한 웹사이트 제작 에이전시' : 'Web design agency for Korean-American businesses in Edgewater, NJ',
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}edgewater-web-design`,
    email: 'info@zoelumos.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Edgewater', addressRegion: 'NJ', postalCode: '07020', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: '40.8271', longitude: '-73.9754' },
    areaServed: [
      { '@type': 'City', name: 'Edgewater' }, { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' }, { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    priceRange: '$$', openingHours: 'Mo-Fr 09:00-18:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '6' },
    knowsLanguage: ['English', 'Korean'],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      { '@type': 'Question', name: '에지워터에서 웹사이트 제작 비용은?', acceptedAnswer: { '@type': 'Answer', text: '에지워터 웹사이트 제작은 $1,000부터 시작합니다. 무료 상담 후 정확한 견적을 드립니다.' } },
      { '@type': 'Question', name: '에지워터 한인 비즈니스 전문 서비스가 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 에지워터와 주변 포트리, 팰팍 한인 비즈니스를 위한 이중언어 웹사이트, 한국어 SEO, 커뮤니티 마케팅을 제공합니다.' } },
    ] : [
      { '@type': 'Question', name: 'How much does web design cost in Edgewater?', acceptedAnswer: { '@type': 'Answer', text: 'Edgewater web design starts at $1,000. Free consultation to get an exact quote.' } },
      { '@type': 'Question', name: 'Do you work with Korean businesses near Mitsuwa?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! We work with many Korean and Japanese businesses near Mitsuwa Marketplace in Edgewater. Bilingual websites, local SEO, and community marketing.' } },
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-teal-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">{locale === 'ko' ? '에지워터, NJ 현지 에이전시' : 'Local Edgewater, NJ Agency'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko'
                ? <>에지워터 웹사이트 제작<br /><span className="text-teal-600">한인 비즈니스 전문</span></>
                : <>Edgewater Web Design<br /><span className="text-teal-600">Korean Business Experts</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '에지워터, 포트리, 팰리세이즈파크 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅. 미쓰와 마켓플레이스 근처.'
                : 'Expert web design for Korean-American businesses in Edgewater, Fort Lee & Bergen County. Near Mitsuwa Marketplace. Bilingual sites, Google SEO.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-teal-600 text-white rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors">
                {locale === 'ko' ? '가격 보기 →' : 'View Pricing →'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '📞 무료 상담' : '📞 Free Consultation'}
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /><span>{locale === 'ko' ? '5.0 평점 (89개 리뷰)' : '5.0 Rating (89 Reviews)'}</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-teal-500" /><span>{locale === 'ko' ? '버겐카운티 한인 비즈니스 50+' : '50+ Bergen County Korean Businesses'}</span></div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-500" /><span>{locale === 'ko' ? '2주 내 완성' : 'Ready in 2 Weeks'}</span></div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {locale === 'ko' ? '에지워터 비즈니스 맞춤 서비스' : 'Services for Edgewater Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Globe className="w-10 h-10 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '한영 이중언어 웹사이트' : 'Bilingual Korean-English Sites'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '에지워터 한인 고객과 미국 고객 모두를 위한 이중언어 웹사이트. 자동 언어 전환, 한국어 SEO 포함.' : 'Websites for both Korean and American customers in Edgewater. Auto language switching, Korean SEO included.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '에지워터 로컬 SEO' : 'Edgewater Local SEO'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '"에지워터 [업종]" 구글 검색 1페이지 노출. Google My Business 최적화, 로컬 키워드 타겟팅.' : 'Rank page 1 for "Edgewater [your business]" on Google. GMB optimization, local keyword targeting.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <MapPin className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{locale === 'ko' ? '한인 커뮤니티 마케팅' : 'Korean Community Marketing'}</h3>
                <p className="text-gray-600">{locale === 'ko' ? '에지워터, 포트리 한인 커뮤니티 타겟 마케팅. 카카오톡 연동, 한인 미디어 광고.' : 'Targeted marketing for Edgewater & Fort Lee Korean communities. KakaoTalk integration, Korean media ads.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{locale === 'ko' ? '에지워터 & 주변 지역 서비스' : 'Serving Edgewater & Surrounding Areas'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { en: 'Edgewater', ko: '에지워터', zip: '07020', highlight: true },
                { en: 'Fort Lee', ko: '포트리', zip: '07024', highlight: true },
                { en: 'Cliffside Park', ko: '클리프사이드파크', zip: '07010', highlight: false },
                { en: 'Palisades Park', ko: '팰리세이즈파크', zip: '07650', highlight: false },
                { en: 'North Bergen', ko: '노스버겐', zip: '07047', highlight: false },
                { en: 'Fairview', ko: '페어뷰', zip: '07022', highlight: false },
                { en: 'Ridgefield', ko: '리지필드', zip: '07657', highlight: false },
                { en: 'Englewood', ko: '잉글우드', zip: '07631', highlight: false },
              ].map((area) => (
                <div key={area.en} className={`p-4 rounded-lg border-2 text-center ${area.highlight ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`}>
                  <p className="font-bold text-gray-900">{locale === 'ko' ? area.ko : area.en}</p>
                  <p className="text-sm text-gray-500">{area.zip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-teal-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'ko' ? '에지워터 비즈니스를 온라인에서 성장시키세요' : 'Grow Your Edgewater Business Online'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ko' ? '오늘 무료 상담을 예약하세요. 허드슨강변 최고의 웹디자인 에이전시.' : 'Book your free consultation today. The best web design agency on the Hudson River waterfront.'}
            </p>
            <Link href="#contact" className="inline-block px-10 py-4 bg-white text-teal-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              {locale === 'ko' ? '무료 상담 예약 →' : 'Book Free Consultation →'}
            </Link>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
