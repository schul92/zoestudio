import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Search, BarChart3, MapPin, Target, TrendingUp, CheckCircle } from 'lucide-react'

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
      title: '뉴저지 SEO 서비스 | NJ 소규모 비즈니스 검색엔진 최적화 | ZOE LUMOS',
      description: '뉴저지 SEO 전문 업체. 포트리, 팰팍, 잉글우드, 노스버겐 등 NJ 전역 한인 소규모 비즈니스를 위한 저렴한 SEO 서비스. 구글 1페이지 노출 보장. 무료 SEO 진단.',
      keywords: '뉴저지 SEO, NJ SEO, 뉴저지 검색엔진 최적화, 소규모 비즈니스 SEO, 한인 SEO 서비스, 저렴한 SEO 뉴저지, 포트리 SEO, 팰팍 SEO, 버겐카운티 SEO, 구글 최적화 NJ',
      openGraph: {
        title: '뉴저지 SEO 서비스 전문 - ZOE LUMOS',
        description: 'NJ 한인 소규모 비즈니스를 위한 전문 SEO 서비스. 구글 1페이지 노출.',
        url: `${baseUrl}/ko/nj-seo-services`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/nj-seo-services`,
        languages: {
          'x-default': `${baseUrl}/nj-seo-services`,
          'en': `${baseUrl}/nj-seo-services`,
          'ko': `${baseUrl}/ko/nj-seo-services`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }
  
  return {
    title: 'NJ SEO Services | Affordable Small Business SEO New Jersey | ZOE LUMOS',
    description: 'Affordable SEO services for small businesses in New Jersey. Local SEO experts serving Fort Lee, Palisades Park, Englewood, North Bergen & Bergen County. Free SEO audit. Bilingual Korean & English.',
    keywords: 'NJ SEO, New Jersey SEO, small business SEO New Jersey, low cost SEO New Jersey, NJ SEO agency, Bergen County SEO, local SEO NJ, SEO experts NJ, affordable SEO New Jersey, NJ web designer SEO',
    openGraph: {
      title: 'NJ SEO Services - Affordable Small Business SEO - ZOE LUMOS',
      description: 'Expert SEO services for NJ small businesses. Local SEO for Bergen County, Fort Lee, Palisades Park & more.',
      url: `${baseUrl}/nj-seo-services`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/nj-seo-services`,
      languages: {
        'x-default': `${baseUrl}/nj-seo-services`,
        'en': `${baseUrl}/nj-seo-services`,
        'ko': `${baseUrl}/ko/nj-seo-services`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function NJSeoServicesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ko' ? '뉴저지 SEO 서비스' : 'New Jersey SEO Services',
    provider: {
      '@type': 'ProfessionalService',
      name: 'ZOE LUMOS',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fort Lee',
        addressRegion: 'NJ',
        addressCountry: 'US',
      },
    },
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'AdministrativeArea', name: 'Bergen County' },
    ],
    serviceType: 'Search Engine Optimization',
    description: locale === 'ko'
      ? '뉴저지 소규모 비즈니스를 위한 전문 SEO 서비스'
      : 'Professional SEO services for small businesses in New Jersey',
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        price: '499',
        unitText: 'MONTH',
      },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locale === 'ko' ? [
      {
        '@type': 'Question',
        name: '뉴저지 SEO 서비스 비용은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '소규모 비즈니스 SEO는 월 $499부터 시작합니다. 키워드 리서치, 온페이지 최적화, 구글 마이비즈니스 관리, 월간 리포트가 포함됩니다. 대형 프로젝트는 맞춤 견적을 제공합니다.'
        }
      },
      {
        '@type': 'Question',
        name: 'SEO 결과가 나오기까지 얼마나 걸리나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '로컬 SEO는 보통 3-6개월 내에 눈에 띄는 결과가 나타납니다. 경쟁이 낮은 키워드는 1-2개월 만에 1페이지 노출이 가능합니다. 지속적인 최적화로 장기적인 성과를 보장합니다.'
        }
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How much do NJ SEO services cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Small business SEO starts at $499/month. Includes keyword research, on-page optimization, Google Business Profile management, and monthly reports. Custom pricing for larger projects.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does SEO take to show results in New Jersey?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Local SEO typically shows noticeable results within 3-6 months. Low-competition keywords can reach page 1 in 1-2 months. We ensure long-term results through continuous optimization.'
        }
      },
    ]
  }

  const seoServices = locale === 'ko' ? [
    { icon: Search, title: '로컬 SEO', desc: '구글 마이비즈니스 최적화, 로컬 키워드 타겟팅, 지역 디렉토리 등록' },
    { icon: BarChart3, title: '키워드 리서치', desc: '업종별 맞춤 키워드 분석, 경쟁사 키워드 조사, 롱테일 키워드 전략' },
    { icon: Target, title: '온페이지 SEO', desc: '메타 태그 최적화, 콘텐츠 최적화, 스키마 마크업, 사이트 속도 개선' },
    { icon: TrendingUp, title: '콘텐츠 마케팅', desc: '블로그 작성, 한영 이중언어 콘텐츠, 지역 뉴스 및 이벤트 활용' },
    { icon: MapPin, title: '구글 마이비즈니스', desc: 'GMB 프로필 최적화, 리뷰 관리, 포스트 작성, Q&A 관리' },
    { icon: CheckCircle, title: '월간 리포트', desc: '키워드 순위 추적, 트래픽 분석, 전환율 리포트, 개선 제안' },
  ] : [
    { icon: Search, title: 'Local SEO', desc: 'Google Business Profile optimization, local keyword targeting, directory listings' },
    { icon: BarChart3, title: 'Keyword Research', desc: 'Industry-specific keyword analysis, competitor research, long-tail keyword strategy' },
    { icon: Target, title: 'On-Page SEO', desc: 'Meta tag optimization, content optimization, schema markup, site speed improvement' },
    { icon: TrendingUp, title: 'Content Marketing', desc: 'Blog writing, bilingual Korean-English content, local news and event coverage' },
    { icon: MapPin, title: 'Google Business Profile', desc: 'GBP optimization, review management, post creation, Q&A management' },
    { icon: CheckCircle, title: 'Monthly Reports', desc: 'Keyword rank tracking, traffic analysis, conversion reports, improvement recommendations' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <HeaderWrapper locale={locale} />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {locale === 'ko' ? '구글 1페이지 노출 전문' : 'Page 1 Google Rankings'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {locale === 'ko' 
                ? '뉴저지 SEO 서비스'
                : 'New Jersey SEO Services'
              }
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? 'NJ 소규모 비즈니스를 위한 저렴하고 효과적인 SEO. 포트리, 팰팍, 잉글우드, 노스버겐 전 지역.'
                : 'Affordable, effective SEO for NJ small businesses. Serving Fort Lee, Palisades Park, Englewood, North Bergen & all of Bergen County.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">
                {locale === 'ko' ? '무료 SEO 진단 받기' : 'Get Free SEO Audit'}
              </Link>
              <Link href={`/${locale === 'ko' ? 'ko/' : ''}pricing`} className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors">
                {locale === 'ko' ? '가격 보기' : 'View Pricing'}
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {locale === 'ko' ? 'SEO 서비스 상세' : 'Our SEO Services'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoServices.map((svc) => (
                <div key={svc.title} className="bg-gray-50 p-8 rounded-xl">
                  <svc.icon className="w-8 h-8 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{svc.title}</h3>
                  <p className="text-gray-600">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {locale === 'ko' ? 'NJ SEO 서비스 지역' : 'NJ Areas We Serve'}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: locale === 'ko' ? '포트리' : 'Fort Lee', href: `/${locale}/fort-lee-web-design` },
                { name: locale === 'ko' ? '팰리세이즈파크' : 'Palisades Park', href: `/${locale}/palisades-park-web-design` },
                { name: locale === 'ko' ? '잉글우드' : 'Englewood', href: `/${locale}/englewood-nj-seo` },
                { name: locale === 'ko' ? '노스버겐' : 'North Bergen', href: `/${locale}/north-bergen-web-design` },
                { name: locale === 'ko' ? '클리프사이드파크' : 'Cliffside Park', href: '#' },
                { name: locale === 'ko' ? '에디슨' : 'Edison', href: '#' },
                { name: locale === 'ko' ? '리지우드' : 'Ridgewood', href: '#' },
                { name: locale === 'ko' ? '버겐카운티 전역' : 'All Bergen County', href: '#' },
              ].map((area) => (
                <Link key={area.name} href={area.href} className="px-6 py-3 bg-white rounded-full text-gray-700 hover:bg-orange-100 hover:text-orange-800 transition-colors font-medium border border-gray-200">
                  {area.name}
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
