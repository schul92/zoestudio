import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { Globe, Smartphone, Zap, Shield, CheckCircle, Star, Clock, DollarSign } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  return {
    title: locale === 'ko'
      ? '웹사이트 제작 | 홈페이지 제작 전문 | 뉴욕 뉴저지 한인 웹디자인 | 조이루모스'
      : 'Website Design & Development | NY NJ Korean Web Agency | ZOE LUMOS',
    description: locale === 'ko'
      ? '전문 웹사이트 제작 서비스. 뉴욕, 뉴저지 한인 비즈니스를 위한 맞춤 홈페이지 제작. 반응형 웹디자인, SEO 최적화, 빠른 제작. $1,000부터 시작.'
      : 'Professional website design services for NY NJ Korean businesses. Responsive web design, SEO optimization, fast delivery. Starting at $1,000.',
    keywords: locale === 'ko'
      ? '웹사이트 제작, 홈페이지 제작, 웹디자인, 한인 웹사이트, 뉴욕 웹사이트 제작, 뉴저지 웹사이트 제작, 반응형 웹사이트, SEO 웹사이트, 워드프레스, 커스텀 웹사이트'
      : 'website design, web development, Korean website, NY web design, NJ web design, responsive website, SEO website, WordPress, custom website',
    openGraph: {
      title: locale === 'ko' ? '웹사이트 제작 전문 - 조이루모스' : 'Website Design - ZOE LUMOS',
      description: locale === 'ko'
        ? '뉴욕, 뉴저지 한인 비즈니스를 위한 전문 웹사이트 제작'
        : 'Professional website design for NY NJ Korean businesses',
      url: locale === 'ko' ? `${baseUrl}/ko/웹사이트-제작` : `${baseUrl}/웹사이트-제작`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/웹사이트-제작` : `${baseUrl}/웹사이트-제작`,
    },
  }
}

export default function WebsiteDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'
  const isKorean = locale === 'ko'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '웹사이트 제작 서비스' : 'Website Design Service',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS' },
    serviceType: 'Website Design',
    areaServed: ['New York', 'New Jersey'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isKorean ? '웹사이트 제작 패키지' : 'Website Design Packages',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Basic Website' }, price: '1000', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Website' }, price: '2000', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Website' }, price: '3500', priceCurrency: 'USD' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 비용은 얼마인가요?' : 'How much does website design cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '기본 웹사이트는 $1,000부터, 비즈니스 웹사이트는 $2,000부터, 커스텀 웹사이트는 $3,500부터 시작합니다.'
            : 'Basic websites start at $1,000, business websites at $2,000, and custom websites at $3,500.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 기간은 얼마나 걸리나요?' : 'How long does website development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '기본 웹사이트는 1-2주, 비즈니스 웹사이트는 2-3주, 커스텀 웹사이트는 3-4주 정도 소요됩니다.'
            : 'Basic websites take 1-2 weeks, business websites 2-3 weeks, and custom websites 3-4 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '한국어 웹사이트 제작이 가능한가요?' : 'Can you create Korean websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 한국어와 영어 이중언어 웹사이트 전문입니다. 한인 비즈니스에 최적화된 웹사이트를 제작합니다.'
            : 'Yes, we specialize in bilingual Korean-English websites optimized for Korean businesses.',
        },
      },
    ],
  }

  const packages = [
    {
      name: isKorean ? '베이직' : 'Basic',
      price: '$1,000',
      desc: isKorean ? '소규모 비즈니스용' : 'For small businesses',
      features: isKorean
        ? ['5페이지 이하', '반응형 디자인', '기본 SEO', '연락처 폼', '1개월 무료 유지보수']
        : ['Up to 5 pages', 'Responsive design', 'Basic SEO', 'Contact form', '1 month free support'],
    },
    {
      name: isKorean ? '비즈니스' : 'Business',
      price: '$2,000',
      desc: isKorean ? '성장하는 비즈니스용' : 'For growing businesses',
      popular: true,
      features: isKorean
        ? ['10페이지 이하', '커스텀 디자인', '고급 SEO', '블로그 기능', '이중언어 지원', '3개월 무료 유지보수']
        : ['Up to 10 pages', 'Custom design', 'Advanced SEO', 'Blog functionality', 'Bilingual support', '3 months free support'],
    },
    {
      name: isKorean ? '커스텀' : 'Custom',
      price: '$3,500+',
      desc: isKorean ? '맞춤 솔루션' : 'Tailored solutions',
      features: isKorean
        ? ['무제한 페이지', '완전 맞춤 디자인', '프리미엄 SEO', '고급 기능', 'API 연동', '6개월 무료 유지보수']
        : ['Unlimited pages', 'Fully custom design', 'Premium SEO', 'Advanced features', 'API integrations', '6 months free support'],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-violet-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto text-center">
            <nav className="text-sm mb-6 text-gray-500">
              <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">{isKorean ? '홈' : 'Home'}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{isKorean ? '웹사이트 제작' : 'Website Design'}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {isKorean ? (
                <><span className="text-violet-600">웹사이트 제작</span> 전문</>
              ) : (
                <><span className="text-violet-600">Website Design</span> Experts</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {isKorean
                ? '뉴욕, 뉴저지 한인 비즈니스를 위한 전문 웹사이트 제작. 반응형, SEO 최적화, 빠른 제작.'
                : 'Professional website design for NY NJ Korean businesses. Responsive, SEO-optimized, fast delivery.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={isKorean ? '/ko/pricing' : '/pricing'} className="px-8 py-4 bg-violet-600 text-white rounded-xl font-bold text-lg hover:bg-violet-700 transition-colors shadow-lg">
                {isKorean ? '가격 보기' : 'View Pricing'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-violet-600 border-2 border-violet-600 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors">
                {isKorean ? '무료 상담' : 'Free Consultation'}
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{isKorean ? '웹사이트 제작 특징' : 'Website Design Features'}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Smartphone className="w-8 h-8" />, title: isKorean ? '반응형 디자인' : 'Responsive Design', desc: isKorean ? '모든 기기에서 완벽 작동' : 'Works on all devices' },
                { icon: <Zap className="w-8 h-8" />, title: isKorean ? '빠른 로딩' : 'Fast Loading', desc: isKorean ? '최적화된 성능' : 'Optimized performance' },
                { icon: <Shield className="w-8 h-8" />, title: isKorean ? 'SSL 보안' : 'SSL Security', desc: isKorean ? 'HTTPS 보안 인증서' : 'HTTPS security certificate' },
                { icon: <Globe className="w-8 h-8" />, title: isKorean ? 'SEO 최적화' : 'SEO Optimized', desc: isKorean ? '검색 엔진 최적화' : 'Search engine optimized' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-600">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Packages */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{isKorean ? '웹사이트 제작 패키지' : 'Website Design Packages'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '비즈니스에 맞는 패키지를 선택하세요' : 'Choose the package that fits your business'}</p>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-8 border-2 ${pkg.popular ? 'border-violet-600 shadow-xl' : 'border-gray-200'} relative`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {isKorean ? '인기' : 'Popular'}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.desc}</p>
                  <p className="text-4xl font-black text-violet-600 mb-6">{pkg.price}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact" className={`block text-center py-3 rounded-xl font-bold ${pkg.popular ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors`}>
                    {isKorean ? '상담 신청' : 'Get Started'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{isKorean ? '웹사이트 제작 과정' : 'Website Design Process'}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: isKorean ? '상담' : 'Consultation', desc: isKorean ? '요구사항 파악' : 'Understand requirements' },
                { step: '02', title: isKorean ? '디자인' : 'Design', desc: isKorean ? '시안 제작 및 피드백' : 'Create mockups & feedback' },
                { step: '03', title: isKorean ? '개발' : 'Development', desc: isKorean ? '코딩 및 기능 구현' : 'Coding & implementation' },
                { step: '04', title: isKorean ? '런칭' : 'Launch', desc: isKorean ? '테스트 및 배포' : 'Testing & deployment' },
              ].map((process, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-black text-violet-200 mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{isKorean ? '자주 묻는 질문' : 'FAQ'}</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-4">{isKorean ? '관련 서비스' : 'Related Services'}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={isKorean ? '/ko/쇼핑몰-제작' : '/ecommerce'} className="text-violet-600 hover:underline">{isKorean ? '쇼핑몰 제작' : 'E-commerce'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴욕-웹사이트' : '/ny-website'} className="text-violet-600 hover:underline">{isKorean ? '뉴욕 웹사이트' : 'NYC Website'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-violet-600 hover:underline">{isKorean ? '뉴저지 웹사이트' : 'NJ Website'}</Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
