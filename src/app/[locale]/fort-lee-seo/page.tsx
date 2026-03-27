import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Search, Globe, BarChart3, MapPin, Star, TrendingUp } from 'lucide-react'

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

  if (locale === 'ko') {
    return {
      title: '포트리 SEO 전문 | Fort Lee 검색엔진최적화 | 한인 비즈니스 구글 상위노출 | ZOE LUMOS',
      description: '포트리(Fort Lee) SEO 전문 에이전시. 구글 검색 상위노출, 로컬 SEO, 구글 마이비즈니스 최적화. 포트리 한인 비즈니스 검색엔진최적화 전문. 100% 한국어 상담 가능.',
      keywords: '포트리 SEO, Fort Lee SEO, 포트리 검색엔진최적화, 포트리 구글 상위노출, 포트리 로컬 SEO, 포트리 한인 비즈니스 SEO, 버겐카운티 SEO, 한인 SEO 에이전시, Fort Lee 디지털 마케팅',
      alternates: {
        canonical: `${baseUrl}/ko/fort-lee-seo`,
        languages: {
          'x-default': `${baseUrl}/fort-lee-seo`,
          'en': `${baseUrl}/fort-lee-seo`,
          'ko': `${baseUrl}/ko/fort-lee-seo`,
        },
      },
      openGraph: {
        title: '포트리 SEO 전문 에이전시 - ZOE LUMOS',
        description: '포트리 한인 비즈니스 구글 상위노출 전문. 로컬 SEO, 구글 마이비즈니스 최적화.',
        url: `${baseUrl}/ko/fort-lee-seo`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
    }
  }

  return {
    title: 'Fort Lee NJ SEO Agency | Local SEO for Korean Businesses | ZOE LUMOS',
    description: 'Fort Lee, NJ SEO agency specializing in Korean-American small businesses. Local SEO, Google Business Profile, bilingual content optimization. Rank higher in Fort Lee & Bergen County. Free audit.',
    keywords: 'Fort Lee SEO, Fort Lee NJ SEO agency, SEO Fort Lee NJ, local SEO Fort Lee, Fort Lee small business SEO, Korean business SEO Fort Lee, Bergen County SEO, Fort Lee Google ranking, Fort Lee digital marketing, korean business marketing nyc SEO',
    alternates: {
      canonical: `${baseUrl}/fort-lee-seo`,
      languages: {
        'x-default': `${baseUrl}/fort-lee-seo`,
        'en': `${baseUrl}/fort-lee-seo`,
        'ko': `${baseUrl}/ko/fort-lee-seo`,
      },
    },
    openGraph: {
      title: 'Fort Lee NJ SEO Agency - ZOE LUMOS',
      description: 'Expert SEO for Korean-American small businesses in Fort Lee & Bergen County, NJ.',
      url: `${baseUrl}/fort-lee-seo`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function FortLeeSEO({ params }: { params: { locale: string } }) {
  const isKo = params.locale === 'ko'

  const services = [
    {
      icon: <Search className="w-10 h-10 text-blue-400 mb-4" />,
      titleEn: 'Local SEO',
      titleKo: '로컬 SEO',
      descEn: 'Google Business Profile optimization, local citations, and geo-targeted keywords to rank #1 in Fort Lee & Bergen County searches.',
      descKo: '구글 마이비즈니스 최적화, 로컬 인용 구축, 포트리 & 버겐카운티 지역 키워드 상위 노출.',
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-400 mb-4" />,
      titleEn: 'Bilingual SEO',
      titleKo: '한영 이중언어 SEO',
      descEn: 'Rank for both English and Korean search queries. Capture Korean-speaking customers searching in their native language.',
      descKo: '한국어·영어 키워드 동시 최적화. 한국어로 검색하는 한인 고객을 정확히 타겟팅.',
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />,
      titleEn: 'Technical SEO',
      titleKo: '기술적 SEO',
      descEn: 'Site speed, Core Web Vitals, schema markup, and mobile optimization to ensure Google can crawl and rank your site.',
      descKo: '사이트 속도, Core Web Vitals, 스키마 마크업, 모바일 최적화로 구글 크롤링 효율 극대화.',
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-400 mb-4" />,
      titleEn: 'Content SEO',
      titleKo: '콘텐츠 SEO',
      descEn: 'Keyword-rich service pages, blog posts, and landing pages designed to attract organic traffic and convert visitors.',
      descKo: '키워드 최적화 서비스 페이지, 블로그, 랜딩 페이지로 자연 유입 트래픽 및 전환 극대화.',
    },
  ]

  const cities = ['Fort Lee', 'Palisades Park', 'Englewood', 'North Bergen', 'Edgewater', 'Ridgefield', 'Leonia', 'Cliffside Park']

  return (
    <div className="relative">
      <HeaderWrapper locale={params.locale} />
      <main className="min-h-screen relative overflow-x-hidden">

        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#111111] to-[#1a1a2e]">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
                {isKo ? '포트리, 뉴저지' : 'Fort Lee, New Jersey'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isKo ? (
                <>포트리 <span className="text-blue-400">SEO 전문</span><br />에이전시</>
              ) : (
                <>Fort Lee<br /><span className="text-blue-400">SEO Agency</span></>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isKo
                ? '포트리 한인 비즈니스 구글 검색 상위노출 전문. 로컬 SEO, 키워드 최적화, 한영 이중언어 콘텐츠 전략으로 더 많은 고객을 만나세요.'
                : 'Fort Lee\'s bilingual SEO agency for Korean-American small businesses. Rank higher on Google, attract more local customers, and grow your revenue.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.locale}#contact`}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                {isKo ? '무료 SEO 진단 받기' : 'Free SEO Audit'}
              </Link>
              <Link
                href={`/${params.locale}/fort-lee-web-design`}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/20"
              >
                {isKo ? '웹사이트 제작도 보기' : 'Web Design Services'}
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {isKo ? 'SEO 서비스 항목' : 'Fort Lee SEO Services'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              {isKo
                ? '포트리 & 버겐카운티 비즈니스 맞춤형 SEO 전략으로 구글 첫 페이지에 노출되세요.'
                : 'Comprehensive SEO strategies tailored for Fort Lee & Bergen County businesses.'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {services.map((s, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  {s.icon}
                  <h3 className="text-xl font-bold mb-3">{isKo ? s.titleKo : s.titleEn}</h3>
                  <p className="text-gray-400 text-sm">{isKo ? s.descKo : s.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              {isKo ? '왜 ZOE LUMOS 포트리 SEO인가?' : 'Why ZOE LUMOS for Fort Lee SEO?'}
            </h2>
            <div className="space-y-5 text-gray-300">
              <p>
                {isKo
                  ? 'ZOE LUMOS는 포트리에 위치한 한인 비즈니스 전문 SEO 에이전시입니다. 포트리, 팰팍, 잉글우드, 노스버겐 등 버겐카운티 전역의 한인 소상공인 구글 상위노출을 전문으로 합니다.'
                  : 'ZOE LUMOS is a Fort Lee-based SEO agency that intimately understands the local Korean-American business landscape. We\'ve helped restaurants, nail salons, medical practices, and retail stores across Bergen County rank higher on Google.'}
              </p>
              <p>
                {isKo
                  ? '한국어와 영어 두 가지 언어로 검색 최적화를 진행하기 때문에, 한인 고객과 영어권 고객 모두에게 도달할 수 있습니다. 경쟁사가 놓치는 한국어 키워드를 선점하세요.'
                  : 'Our bilingual approach means you can rank for Korean-language searches (구글 한국어 검색) AND English queries simultaneously. Competitors targeting only English miss half the Korean-American market.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">2x</div>
                  <div className="text-sm text-gray-400 mt-1">{isKo ? '이중언어 키워드 커버리지' : 'Bilingual keyword coverage'}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">NJ/NY</div>
                  <div className="text-sm text-gray-400 mt-1">{isKo ? '뉴저지·뉴욕 로컬 전문' : 'NJ & NY metro specialists'}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400 mt-1">{isKo ? '한국어 상담 가능' : 'Korean language support'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-6">
              {isKo ? 'SEO 서비스 지역' : 'Fort Lee SEO Service Areas'}
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {cities.map(city => (
                <span key={city} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                  {city}, NJ
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <div className="container mx-auto px-6 text-center">
            <Star className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isKo ? '지금 무료 SEO 진단 받기' : 'Get Your Free Fort Lee SEO Audit'}
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              {isKo
                ? '비즈니스 웹사이트 무료 SEO 분석을 통해 개선 사항과 기회를 확인해 드립니다. 100% 한국어 상담 가능.'
                : 'We\'ll analyze your website and show you exactly what\'s holding you back from ranking in Fort Lee and Bergen County.'}
            </p>
            <Link
              href={`/${params.locale}#contact`}
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              {isKo ? '무료 상담 신청' : 'Request Free SEO Audit'}
            </Link>
          </div>
        </section>

        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
    </div>
  )
}
