import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Search, Globe, BarChart3 } from 'lucide-react'

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
      title: '잉글우드 NJ SEO & 디지털 마케팅 | 한인 비즈니스 검색엔진 최적화 | ZOE LUMOS',
      description: '잉글우드 NJ 지역 한인 비즈니스를 위한 SEO 전문 서비스. 구글 검색 최적화, 로컬 SEO, 구글 마이비즈니스 관리. 버겐카운티 한인 사업체 디지털 마케팅.',
      keywords: '잉글우드 SEO, Englewood NJ SEO, 잉글우드 디지털 마케팅, 버겐카운티 SEO, 한인 SEO 서비스, 잉글우드 한인 비즈니스',
      alternates: {
        canonical: `${baseUrl}/ko/englewood-nj-seo`,
        languages: {
          'x-default': `${baseUrl}/englewood-nj-seo`,
          'en': `${baseUrl}/englewood-nj-seo`,
          'ko': `${baseUrl}/ko/englewood-nj-seo`,
        },
      },
      openGraph: {
        title: '잉글우드 NJ SEO 전문 - ZOE LUMOS',
        description: '잉글우드, 버겐카운티 한인 비즈니스 SEO & 디지털 마케팅 전문.',
        url: `${baseUrl}/ko/englewood-nj-seo`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
    }
  }

  return {
    title: 'Englewood NJ SEO Agency | Small Business SEO Services | ZOE LUMOS',
    description: 'Expert SEO agency in Englewood, NJ. Local SEO, Google Business Profile optimization, and digital marketing for small businesses in Bergen County. Bilingual English & Korean services.',
    keywords: 'Englewood NJ SEO, SEO agency Englewood NJ, small business SEO agency Englewood NJ, SEO experts Englewood NJ, local SEO Englewood, Bergen County SEO, digital marketing Englewood NJ',
    alternates: {
      canonical: `${baseUrl}/englewood-nj-seo`,
      languages: {
        'x-default': `${baseUrl}/englewood-nj-seo`,
        'en': `${baseUrl}/englewood-nj-seo`,
        'ko': `${baseUrl}/ko/englewood-nj-seo`,
      },
    },
    openGraph: {
      title: 'Englewood NJ SEO Agency - ZOE LUMOS',
      description: 'Expert SEO services for small businesses in Englewood, NJ and Bergen County.',
      url: `${baseUrl}/englewood-nj-seo`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function EnglewoodSEO({ params }: { params: { locale: string } }) {
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
                <>잉글우드 NJ<br /><span className="text-blue-400">SEO & 디지털 마케팅</span></>
              ) : (
                <>Englewood NJ<br /><span className="text-blue-400">SEO Agency</span></>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isKo
                ? '잉글우드, 버겐카운티 지역 한인 비즈니스를 위한 검색엔진 최적화 전문 서비스'
                : 'Expert search engine optimization for small businesses in Englewood and Bergen County, NJ'}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKo ? 'SEO 서비스' : 'Our SEO Services in Englewood'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Search className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '로컬 SEO' : 'Local SEO'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '구글 마이비즈니스 최적화, 로컬 검색 순위 개선, 지역 키워드 타겟팅'
                    : 'Google Business Profile optimization, local search rankings, and geo-targeted keyword strategy for Englewood businesses'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <Globe className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '온페이지 SEO' : 'On-Page SEO'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '메타 태그 최적화, 콘텐츠 전략, 사이트 구조 개선'
                    : 'Meta tag optimization, content strategy, site structure improvements, and bilingual content optimization'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{isKo ? '성과 분석' : 'Performance Analytics'}</h3>
                <p className="text-gray-400">
                  {isKo
                    ? '월간 SEO 리포트, 키워드 순위 추적, 경쟁사 분석'
                    : 'Monthly SEO reports, keyword ranking tracking, competitor analysis, and ROI measurement'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isKo ? '왜 ZOE LUMOS인가?' : 'Why Choose ZOE LUMOS for Englewood SEO?'}
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                {isKo
                  ? 'ZOE LUMOS는 잉글우드, 포트리, 팰팍 등 버겐카운티 전역의 한인 비즈니스를 위한 SEO 전문 업체입니다. 영어와 한국어 모두 최적화하여 더 많은 고객에게 도달할 수 있도록 도와드립니다.'
                  : 'Located in Fort Lee, ZOE LUMOS understands the Englewood and Bergen County market. We specialize in helping small businesses — especially Korean-American owned businesses — rank higher on Google with proven SEO strategies.'}
              </p>
              <p>
                {isKo
                  ? '구글 검색에서 상위 노출되면 더 많은 고객이 찾아옵니다. 로컬 SEO, 구글 광고, 웹사이트 최적화를 통해 비즈니스 성장을 도와드리겠습니다.'
                  : 'Whether you run a restaurant, salon, medical practice, or retail store in Englewood, our bilingual team creates SEO strategies that drive real results — more phone calls, more walk-ins, and more online visibility.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {['Englewood', 'Englewood Cliffs', 'Tenafly', 'Fort Lee', 'Palisades Park', 'Leonia', 'Teaneck'].map(city => (
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
              {isKo ? '무료 SEO 상담 받기' : 'Get Your Free SEO Consultation'}
            </h2>
            <p className="text-gray-400 mb-8">
              {isKo ? '지금 바로 연락주세요. 100% 한국어 상담 가능합니다.' : 'Contact us today for a free SEO audit of your Englewood business website.'}
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
