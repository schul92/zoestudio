import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { MapPin, Globe, Search, Star, Users, Zap, TrendingUp } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  if (locale === 'ko') {
    return {
      title: '클리프사이드파크 웹사이트 제작 | Cliffside Park 한인 마케팅 | ZOE LUMOS',
      description: '클리프사이드파크(Cliffside Park) 웹사이트 제작 전문. 한인 비즈니스 웹디자인, 홈페이지 제작, 구글 SEO, 소셜미디어 마케팅. 팰팍·포트리 인근. 100% 한국어 상담.',
      keywords: '클리프사이드파크 웹사이트, Cliffside Park 웹디자인, 클리프사이드파크 한인 비즈니스, 클리프사이드파크 SEO, 버겐카운티 웹사이트, 한인 마케팅 에이전시 뉴저지, 클리프사이드파크 홈페이지 제작',
      openGraph: {
        title: '클리프사이드파크 웹사이트 제작 - ZOE LUMOS',
        description: '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 & 마케팅.',
        url: `${baseUrl}/ko/cliffside-park-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        alternateLocale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/cliffside-park-web-design`,
        languages: {
          'x-default': `${baseUrl}/cliffside-park-web-design`,
          'en': `${baseUrl}/cliffside-park-web-design`,
          'ko': `${baseUrl}/ko/cliffside-park-web-design`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Cliffside Park Web Design | Korean Business Marketing NJ | ZOE LUMOS',
    description: 'Cliffside Park, NJ web design & digital marketing for Korean-American businesses. Local SEO, Google Ads, bilingual websites in English & Korean. Serving Cliffside Park, Palisades Park & Fort Lee. Free consultation.',
    keywords: 'Cliffside Park web design, Cliffside Park NJ website, Korean business Cliffside Park, Bergen County Korean marketing, small business SEO NJ, Cliffside Park digital marketing, Korean web design NJ, bilingual website NJ',
    openGraph: {
      title: 'Cliffside Park Web Design - Korean Business Experts - ZOE LUMOS',
      description: 'Web design & marketing agency for Korean-American businesses in Cliffside Park, NJ.',
      url: `${baseUrl}/cliffside-park-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/cliffside-park-web-design`,
      languages: {
        'x-default': `${baseUrl}/cliffside-park-web-design`,
        'en': `${baseUrl}/cliffside-park-web-design`,
        'ko': `${baseUrl}/ko/cliffside-park-web-design`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function CliffsideParkWebDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const isKo = locale === 'ko'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: isKo ? 'ZOE LUMOS - 클리프사이드파크 웹디자인' : 'ZOE LUMOS - Cliffside Park Web Design',
    description: isKo
      ? '클리프사이드파크 한인 비즈니스를 위한 웹사이트 제작 & 디지털 마케팅 에이전시'
      : 'Web design & digital marketing agency for Korean-American businesses in Cliffside Park, NJ',
    url: `${baseUrl}/${isKo ? 'ko/' : ''}cliffside-park-web-design`,
    email: 'info@zoelumos.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cliffside Park',
      addressRegion: 'NJ',
      postalCode: '07010',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.8215',
      longitude: '-73.9871',
    },
    areaServed: [
      { '@type': 'City', name: 'Cliffside Park' },
      { '@type': 'City', name: 'Fort Lee' },
      { '@type': 'City', name: 'Palisades Park' },
      { '@type': 'City', name: 'Edgewater' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    knowsLanguage: ['en-US', 'ko-KR'],
    priceRange: '$$',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-black text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">
                {isKo ? '뉴저지 클리프사이드파크 & 버겐카운티 전역' : 'Cliffside Park, NJ & Bergen County'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isKo
                ? '클리프사이드파크 한인 비즈니스 웹사이트 제작'
                : 'Cliffside Park Web Design for Korean Businesses'}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {isKo
                ? '팰팍·포트리 인근 클리프사이드파크 한인 비즈니스를 위한 전문 웹사이트 제작 & 디지털 마케팅. 구글 SEO, 구글 광고, 소셜미디어. 100% 한국어 상담 가능.'
                : 'Professional bilingual websites, local SEO & Google Ads for Korean-American businesses in Cliffside Park, NJ. Serving the heart of Bergen County\'s Korean community.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                {isKo ? '무료 상담 신청' : 'Free Consultation'}
              </Link>
              <Link href={`/${locale}/pricing`} className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                {isKo ? '서비스 요금 보기' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isKo ? '클리프사이드파크 맞춤 서비스' : 'Services for Cliffside Park Businesses'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: isKo ? '웹사이트 제작' : 'Website Design',
                  desc: isKo
                    ? '한국어·영어 이중언어 웹사이트. 모바일 최적화, 빠른 로딩, SEO 친화적 구조.'
                    : 'Bilingual Korean & English websites. Mobile-first, fast-loading, SEO-ready.',
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  title: isKo ? '구글 SEO' : 'Local SEO',
                  desc: isKo
                    ? '클리프사이드파크, 팰팍, 포트리 지역 구글 검색 상위 노출. 한국어 키워드 최적화.'
                    : 'Rank on Google for Cliffside Park, Palisades Park & Fort Lee searches in English and Korean.',
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: isKo ? '구글 광고' : 'Google Ads',
                  desc: isKo
                    ? '효율적인 구글 광고로 즉시 고객 유입. 한인 타겟 광고 전문.'
                    : 'Drive immediate customers with targeted Google Ads campaigns for Korean-American audiences.',
                },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-black mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ZOE LUMOS */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isKo ? '왜 ZOE LUMOS를 선택하나요?' : 'Why Korean Businesses in Cliffside Park Choose ZOE LUMOS'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Star className="w-6 h-6" />,
                  title: isKo ? '한국어 & 영어 완전 이중언어' : '100% Bilingual Korean & English',
                  desc: isKo
                    ? '한국어 원어민이 직접 콘텐츠 작성. 구글 번역 사용 없음.'
                    : 'Native Korean speakers write your content. No Google Translate.',
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: isKo ? '한인 비즈니스 전문' : 'Korean Business Specialists',
                  desc: isKo
                    ? '팰팍·포트리·버겐카운티 한인 비즈니스 환경을 누구보다 잘 압니다.'
                    : 'We know the Palisades Park, Fort Lee & Bergen County Korean business landscape inside out.',
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: isKo ? '성과 중심 마케팅' : 'Results-Driven Marketing',
                  desc: isKo
                    ? '웹사이트 오픈 후 실제 고객 증가를 목표로 합니다.'
                    : 'We focus on real customer growth after launch, not just pretty websites.',
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: isKo ? '로컬 SEO 전문' : 'Local SEO Experts',
                  desc: isKo
                    ? '클리프사이드파크, 팰팍, 포트리, 에지워터 지역 구글 검색 최적화 전문.'
                    : 'We specialize in local SEO for Cliffside Park, Palisades Park, Fort Lee & Edgewater.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-black mt-1 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby areas */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">
              {isKo ? '서비스 지역' : 'Also Serving Nearby Areas'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: `/${locale}/palisades-park-marketing`, label: isKo ? '팰리세이즈파크' : 'Palisades Park' },
                { href: `/${locale}/fort-lee-web-design`, label: isKo ? '포트리' : 'Fort Lee' },
                { href: `/${locale}/edgewater-web-design`, label: isKo ? '에지워터' : 'Edgewater' },
                { href: `/${locale}/north-bergen-web-design`, label: isKo ? '노스버겐' : 'North Bergen' },
                { href: `/${locale}/englewood-nj-seo`, label: isKo ? '잉글우드' : 'Englewood' },
                { href: `/${locale}/ridgefield-web-design`, label: isKo ? '리지필드' : 'Ridgefield' },
              ].map((area, i) => (
                <Link
                  key={i}
                  href={area.href}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
