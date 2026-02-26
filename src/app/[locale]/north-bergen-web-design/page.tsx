import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Globe, Search, Zap } from 'lucide-react'

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
  
  if (locale === 'ko') {
    return {
      title: '노스버겐 NJ 웹디자인 & SEO | 한인 비즈니스 웹사이트 제작 | ZOE LUMOS',
      description: '노스버겐 NJ 지역 한인 비즈니스를 위한 웹사이트 제작 & SEO 전문. 허드슨카운티 웹디자인, 구글 광고, 로컬 SEO 서비스.',
      keywords: '노스버겐 웹디자인, North Bergen web design, 노스버겐 웹사이트, 허드슨카운티 웹디자인, 노스버겐 SEO, 노스버겐 한인 비즈니스',
      alternates: {
        canonical: `${baseUrl}/ko/north-bergen-web-design`,
        languages: {
          'x-default': `${baseUrl}/north-bergen-web-design`,
          'en': `${baseUrl}/north-bergen-web-design`,
          'ko': `${baseUrl}/ko/north-bergen-web-design`,
        },
      },
      openGraph: {
        title: '노스버겐 NJ 웹디자인 - ZOE LUMOS',
        description: '노스버겐, 허드슨카운티 한인 비즈니스 웹사이트 제작 & SEO 전문.',
        url: `${baseUrl}/ko/north-bergen-web-design`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
    }
  }

  return {
    title: 'North Bergen NJ Web Design & SEO | Small Business Website Development | ZOE LUMOS',
    description: 'Professional web design and SEO services in North Bergen, NJ. Custom websites for small businesses in Hudson County. Bilingual English & Korean. Google Ads, local SEO expert.',
    keywords: 'North Bergen web design, North Bergen NJ web designer, SEO North Bergen NJ, SEO experts North Bergen NJ, SEO agency North Bergen NJ, small business SEO agency North Bergen NJ, Hudson County web design, web design NJ',
    alternates: {
      canonical: `${baseUrl}/north-bergen-web-design`,
      languages: {
        'x-default': `${baseUrl}/north-bergen-web-design`,
        'en': `${baseUrl}/north-bergen-web-design`,
        'ko': `${baseUrl}/ko/north-bergen-web-design`,
      },
    },
    openGraph: {
      title: 'North Bergen NJ Web Design & SEO - ZOE LUMOS',
      description: 'Professional web design and SEO for small businesses in North Bergen, NJ and Hudson County.',
      url: `${baseUrl}/north-bergen-web-design`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function NorthBergenWebDesign({ params }: { params: { locale: string } }) {
  const isKo = params.locale === 'ko'

  return (
    <div className="relative">
      <HeaderWrapper locale={params.locale} />
      <main className="min-h-screen relative overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#111111] to-[#1a1a2e]">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isKo ? (
                <>노스버겐 NJ<br /><span className="text-blue-400">웹디자인 & SEO</span></>
              ) : (
                <>North Bergen NJ<br /><span className="text-blue-400">Web Design & SEO</span></>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isKo
                ? '노스버겐, 허드슨카운티 지역 한인 비즈니스를 위한 맞춤형 웹사이트 제작 & SEO 서비스'
                : 'Professional website development and SEO for small businesses in North Bergen and Hudson County'}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKo ? '웹디자인 & SEO 서비스' : 'Web Design & SEO Services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '웹사이트 제작' : 'Custom Web Design'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '모바일 반응형 웹사이트, 쇼피파이 쇼핑몰, 워드프레스 사이트 제작'
                    : 'Mobile-responsive websites, Shopify stores, and custom web applications for North Bergen businesses'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Search className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '로컬 SEO' : 'Local SEO'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '구글 마이비즈니스, 로컬 검색 최적화, 지역 키워드 전략'
                    : 'Google Business Profile optimization, local citations, and targeted SEO strategies for Hudson County'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Zap className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '구글 광고' : 'Google Ads'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? 'PPC 광고 관리, 키워드 리서치, 광고 성과 최적화'
                    : 'PPC campaign management, keyword research, and ad performance optimization for maximum ROI'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Focus */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isKo ? '허드슨카운티 & 버겐카운티 서비스 지역' : 'Serving North Bergen & Surrounding Areas'}
            </h2>
            <p className="text-gray-300 text-center mb-8">
              {isKo
                ? 'ZOE LUMOS는 노스버겐을 포함한 허드슨카운티, 버겐카운티 전역의 한인 비즈니스에 웹디자인과 SEO 서비스를 제공합니다.'
                : 'ZOE LUMOS provides web design and SEO services to businesses throughout North Bergen, Hudson County, and the greater NJ/NYC metro area.'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['North Bergen', 'West New York', 'Union City', 'Guttenberg', 'Secaucus', 'Fort Lee', 'Palisades Park', 'Fairview'].map(city => (
                <span key={city} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                  {city}, NJ
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isKo ? '무료 상담 받기' : 'Get a Free Quote'}
            </h2>
            <p className="text-gray-400 mb-8">
              {isKo ? '지금 바로 연락주세요. 100% 한국어 상담 가능합니다.' : 'Contact us today for a free web design and SEO consultation.'}
            </p>
            <Link
              href={`/${params.locale}#contact`}
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              {isKo ? '무료 상담 신청' : 'Free Consultation'}
            </Link>
          </div>
        </section>

        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
    </div>
  )
}
