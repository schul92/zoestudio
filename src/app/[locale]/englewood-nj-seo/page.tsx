import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Search, Globe, BarChart3 } from 'lucide-react'
import { SITE_URL } from '@/lib/siteUrl'

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
  const baseUrl = SITE_URL
  
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
  const canonical = isKo ? `${SITE_URL}/ko/englewood-nj-seo` : `${SITE_URL}/englewood-nj-seo`

  // JSON-LD: ProfessionalService
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ZOE LUMOS',
    description: isKo
      ? '잉글우드 NJ 및 버겐카운티 소상공인을 위한 SEO 전문 업체. 로컬 SEO, 워드프레스 SEO, 영어/한국어 이중언어 SEO.'
      : 'Small business SEO agency in Englewood, NJ serving Bergen County. Local SEO, WordPress SEO, and bilingual English & Korean SEO.',
    url: canonical,
    image: `${SITE_URL}/og-image.png`,
    // No telephone: we take inquiries by email and KakaoTalk only.
    email: 'info@zoelumos.com',
    priceRange: '$$',
    serviceType: 'Search Engine Optimization (SEO)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fort Lee',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      postalCode: '07024',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.8509,
      longitude: -73.9701,
    },
    areaServed: [
      { '@type': 'City', name: 'Englewood' },
      { '@type': 'City', name: 'North Bergen' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
      { '@type': 'AdministrativeArea', name: 'New Jersey' },
    ],
  }

  // JSON-LD: FAQPage (bilingual-aware)
  const faqs = isKo
    ? [
        {
          q: '잉글우드 NJ SEO 대행사 비용은 얼마인가요?',
          a: '대부분의 잉글우드 소상공인 SEO 프로젝트는 작업 범위에 따라 월 단위로 진행되며, 합리적이고 투명한 견적을 드립니다. 무료 상담을 통해 비즈니스 규모와 목표에 맞는 맞춤 견적을 받아보세요.',
        },
        {
          q: '워드프레스(WordPress) SEO도 해주시나요?',
          a: '네. 워드프레스 SEO 전문으로, 사이트 속도 개선, 메타 태그, 스키마, 콘텐츠 구조 최적화까지 워드프레스 사이트에 맞춘 SEO를 제공합니다.',
        },
        {
          q: '노스버겐과 버겐카운티 지역도 서비스하나요?',
          a: '네. 잉글우드뿐 아니라 노스버겐, 포트리, 팰팍, 엣지워터 등 버겐카운티 및 허드슨카운티 전역의 비즈니스를 지원합니다.',
        },
        {
          q: '영어와 한국어 이중언어 SEO가 가능한가요?',
          a: '네. 영어와 한국어 모두 최적화하는 이중언어(Korean + English) SEO가 저희의 핵심 강점입니다. 두 언어로 검색하는 고객 모두에게 도달할 수 있습니다.',
        },
        {
          q: 'SEO 성과는 얼마나 걸리나요?',
          a: '로컬 SEO와 구글 비즈니스 프로필 개선은 보통 몇 주 내에 효과가 나타나기 시작하며, 경쟁 키워드의 의미 있는 순위 상승은 일반적으로 3~6개월이 걸립니다.',
        },
      ]
    : [
        {
          q: 'How much does an SEO agency in Englewood NJ cost?',
          a: 'Most Englewood small business SEO engagements run on a monthly basis and are priced by scope. We keep pricing transparent and affordable for local businesses. Book a free consultation for a custom quote based on your size and goals.',
        },
        {
          q: 'Do you offer WordPress SEO in Englewood?',
          a: 'Yes. We are WordPress SEO experts and tune WordPress sites specifically — site speed, meta tags, schema markup, internal linking, and content structure — so they rank in Englewood and Bergen County.',
        },
        {
          q: 'Do you serve North Bergen and Bergen County?',
          a: 'Yes. Beyond Englewood we work with businesses across North Bergen, Fort Lee, Palisades Park, Edgewater, and the rest of Bergen County and Hudson County, NJ.',
        },
        {
          q: 'Do you do bilingual (Korean + English) SEO?',
          a: 'Yes. Bilingual SEO is a core strength. We optimize in both English and Korean so you reach customers searching in either language across New York and New Jersey.',
        },
        {
          q: 'How long until SEO results?',
          a: 'Local SEO and Google Business Profile improvements often show within a few weeks, while meaningful ranking gains on competitive keywords typically take 3 to 6 months of consistent work.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKo ? '홈' : 'Home',
        item: isKo ? `${SITE_URL}/ko` : SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKo ? '잉글우드 NJ SEO' : 'Englewood NJ SEO',
        item: canonical,
      },
    ],
  }

  const cities = [
    'Englewood',
    'Englewood Cliffs',
    'Tenafly',
    'Fort Lee',
    'Palisades Park',
    'Leonia',
    'Teaneck',
    'North Bergen',
    'Edgewater',
    'Cliffside Park',
    'Ridgefield',
    'Bergenfield',
  ]

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
                ? '잉글우드와 버겐카운티 소상공인을 위한 SEO 전문가 팀. 로컬 SEO, 워드프레스 SEO, 영어/한국어 이중언어 SEO를 제공합니다.'
                : 'A small business SEO agency in Englewood NJ. SEO experts in Englewood delivering local SEO, WordPress SEO, and bilingual Korean + English SEO across Bergen County.'}
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
                  ? 'ZOE LUMOS는 잉글우드, 노스버겐, 포트리, 팰팍 등 버겐카운티 전역의 한인 비즈니스를 위한 SEO 전문가 팀입니다. 영어와 한국어 모두 최적화하는 이중언어(Korean SEO) 전략으로 더 많은 고객에게 도달할 수 있도록 도와드립니다.'
                  : 'Located in Fort Lee, ZOE LUMOS is a small business SEO agency in Englewood NJ that understands the local Bergen County market. As SEO experts in Englewood, we help small businesses — especially Korean-American owned businesses across North Bergen and Bergen County — rank higher on Google with proven SEO and WordPress SEO strategies.'}
              </p>
              <p>
                {isKo
                  ? '구글 검색에서 상위 노출되면 더 많은 고객이 찾아옵니다. 로컬 SEO, 구글 광고, 웹사이트 최적화를 통해 비즈니스 성장을 도와드리겠습니다.'
                  : 'Whether you run a restaurant, salon, medical practice, or retail store in Englewood, our bilingual team creates SEO strategies that drive real results — more phone calls, more walk-ins, and more online visibility.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {cities.map(city => (
                <span key={city} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                  {city}, NJ
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Results / What You Get */}
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isKo ? '함께하면 얻는 것' : 'What You Get With Our Englewood SEO'}
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              {isKo
                ? '잉글우드와 노스버겐의 소상공인 SEO에 집중하는 SEO 전문가 팀이 측정 가능한 성장을 만들어 드립니다.'
                : 'As small business SEO experts in Englewood and North Bergen, we focus on measurable growth — not vanity metrics.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {(isKo
                ? [
                    ['로컬 검색 가시성', '구글 비즈니스 프로필과 로컬 팩(Map Pack)에서 더 자주 노출되어 잉글우드와 버겐카운티 고객이 먼저 발견합니다.'],
                    ['워드프레스 SEO 최적화', '워드프레스 사이트 속도, 메타 태그, 스키마, 내부 링크를 정비해 검색 순위를 끌어올립니다.'],
                    ['이중언어(한/영) 도달', '영어와 한국어로 검색하는 고객 모두에게 도달하는 한인 비즈니스 맞춤 SEO.'],
                    ['투명한 월간 리포트', '키워드 순위, 트래픽, 전환을 매달 투명하게 공유해 무엇이 효과 있는지 명확히 보여드립니다.'],
                  ]
                : [
                    ['Local search visibility', 'Show up more often in Google Business Profile and the local Map Pack so Englewood and Bergen County customers find you first.'],
                    ['WordPress SEO tuning', 'We optimize WordPress site speed, meta tags, schema, and internal links to lift your rankings.'],
                    ['Bilingual (KO/EN) reach', 'Korean-business-friendly SEO that reaches customers searching in both English and Korean.'],
                    ['Transparent monthly reporting', 'Clear monthly reports on keyword rankings, traffic, and conversions so you always see what is working.'],
                  ]
              ).map(([title, body]) => (
                <div key={title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold mb-2 text-blue-400">{title}</h3>
                  <p className="text-gray-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#0d0d1a]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-white flex justify-between items-center gap-4">
                    <span>{f.q}</span>
                    <span className="text-blue-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-gray-400 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              {isKo ? '관련 서비스' : 'Related Services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href={`/${params.locale}/웹사이트-제작`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '웹사이트 제작' : 'Website Design'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? 'SEO에 강한 맞춤형 웹사이트 디자인 및 개발.' : 'Custom, SEO-ready website design and development.'}
                </p>
              </Link>
              <Link
                href={`/${params.locale}/광고대행`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '구글 광고 대행' : 'Google Ads Management'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? '구글 광고로 즉각적인 고객 유입을 만듭니다.' : 'Drive immediate leads with managed Google Ads.'}
                </p>
              </Link>
              <Link
                href={`/${params.locale}/bilingual-seo-new-york`}
                className="block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-blue-400">{isKo ? '뉴욕 이중언어 SEO' : 'Bilingual SEO New York'}</h3>
                <p className="text-gray-400 text-sm">
                  {isKo ? '영어/한국어 이중언어 SEO로 뉴욕 시장 공략.' : 'Reach the NY market with Korean + English SEO.'}
                </p>
              </Link>
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
