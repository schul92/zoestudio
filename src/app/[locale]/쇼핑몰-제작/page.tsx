import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { ShoppingCart, CreditCard, Package, TrendingUp, CheckCircle, Shield, Truck, BarChart } from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'

  return {
    title: locale === 'ko'
      ? '쇼핑몰 제작 | 이커머스 웹사이트 전문 | Shopify 쇼핑몰 | 조이루모스'
      : 'E-commerce Website Design | Shopify Store Development | ZOE LUMOS',
    description: locale === 'ko'
      ? '전문 쇼핑몰 제작 서비스. Shopify, WooCommerce 기반 이커머스 웹사이트. 뉴욕 뉴저지 한인 쇼핑몰 전문. 결제 시스템, 재고 관리, 배송 연동.'
      : 'Professional e-commerce website design. Shopify, WooCommerce stores for NY NJ Korean businesses. Payment systems, inventory, shipping integration.',
    keywords: locale === 'ko'
      ? '쇼핑몰 제작, 이커머스 웹사이트, Shopify 쇼핑몰, 온라인 스토어, 한인 쇼핑몰, 뉴욕 쇼핑몰 제작, 뉴저지 쇼핑몰 제작, WooCommerce, 온라인 판매'
      : 'e-commerce website, Shopify store, online store, Korean shopping mall, NY e-commerce, NJ e-commerce, WooCommerce, online sales',
    openGraph: {
      title: locale === 'ko' ? '쇼핑몰 제작 전문 - 조이루모스' : 'E-commerce Website Design - ZOE LUMOS',
      url: locale === 'ko' ? `${baseUrl}/ko/쇼핑몰-제작` : `${baseUrl}/쇼핑몰-제작`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/쇼핑몰-제작` : `${baseUrl}/쇼핑몰-제작`,
    },
  }
}

export default function EcommercePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKorean = locale === 'ko'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '쇼핑몰 제작 서비스' : 'E-commerce Website Design',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS' },
    serviceType: 'E-commerce Development',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopify Store' }, price: '3000', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom E-commerce' }, price: '5000', priceCurrency: 'USD' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isKorean ? '쇼핑몰 제작 비용은 얼마인가요?' : 'How much does e-commerce website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'Shopify 기반 쇼핑몰은 $3,000부터, 커스텀 이커머스는 $5,000부터 시작합니다. 상품 수, 기능에 따라 달라집니다.'
            : 'Shopify stores start at $3,000, custom e-commerce at $5,000. Price varies by product count and features.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? 'Shopify vs WooCommerce 어떤게 좋나요?' : 'Shopify vs WooCommerce - which is better?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? 'Shopify는 사용이 쉽고 관리가 편리합니다. WooCommerce는 더 많은 커스터마이징이 가능합니다. 비즈니스 규모와 요구사항에 따라 추천해 드립니다.'
            : 'Shopify is easier to use and maintain. WooCommerce offers more customization. We recommend based on your business needs.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '결제 시스템 연동이 가능한가요?' : 'Can you integrate payment systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, Stripe, PayPal, Square 등 모든 주요 결제 시스템 연동 가능합니다. 한국 카드 결제도 지원합니다.'
            : 'Yes, we integrate all major payment systems including Stripe, PayPal, Square, and Korean payment gateways.',
        },
      },
    ],
  }

  const packages = [
    {
      name: isKorean ? 'Shopify 스타터' : 'Shopify Starter',
      price: '$3,000',
      desc: isKorean ? '소규모 온라인 스토어' : 'Small online store',
      features: isKorean
        ? ['50개 상품', 'Shopify 테마 커스텀', '결제 시스템 연동', '기본 SEO', '1개월 교육']
        : ['50 products', 'Shopify theme customization', 'Payment integration', 'Basic SEO', '1 month training'],
    },
    {
      name: isKorean ? 'Shopify 프로' : 'Shopify Pro',
      price: '$5,000',
      desc: isKorean ? '성장하는 이커머스' : 'Growing e-commerce',
      popular: true,
      features: isKorean
        ? ['200개 상품', '커스텀 테마 디자인', '고급 결제 옵션', '재고 관리 시스템', '배송 연동', '3개월 지원']
        : ['200 products', 'Custom theme design', 'Advanced payments', 'Inventory management', 'Shipping integration', '3 months support'],
    },
    {
      name: isKorean ? '커스텀 이커머스' : 'Custom E-commerce',
      price: '$8,000+',
      desc: isKorean ? '완전 맞춤 솔루션' : 'Fully custom solution',
      features: isKorean
        ? ['무제한 상품', '완전 맞춤 개발', 'ERP/POS 연동', '멀티벤더 지원', 'API 개발', '6개월 지원']
        : ['Unlimited products', 'Fully custom development', 'ERP/POS integration', 'Multi-vendor support', 'API development', '6 months support'],
    },
  ]

  const features = [
    { icon: <ShoppingCart className="w-8 h-8" />, title: isKorean ? '장바구니' : 'Shopping Cart', desc: isKorean ? '직관적인 쇼핑 경험' : 'Intuitive shopping experience' },
    { icon: <CreditCard className="w-8 h-8" />, title: isKorean ? '결제 시스템' : 'Payment Gateway', desc: isKorean ? 'Stripe, PayPal 등 연동' : 'Stripe, PayPal integration' },
    { icon: <Package className="w-8 h-8" />, title: isKorean ? '재고 관리' : 'Inventory', desc: isKorean ? '실시간 재고 추적' : 'Real-time stock tracking' },
    { icon: <Truck className="w-8 h-8" />, title: isKorean ? '배송 연동' : 'Shipping', desc: isKorean ? 'UPS, FedEx, USPS 연동' : 'UPS, FedEx, USPS integration' },
    { icon: <Shield className="w-8 h-8" />, title: isKorean ? 'SSL 보안' : 'SSL Security', desc: isKorean ? '안전한 거래 보장' : 'Secure transactions' },
    { icon: <BarChart className="w-8 h-8" />, title: isKorean ? '분석' : 'Analytics', desc: isKorean ? '판매 데이터 분석' : 'Sales data analytics' },
    { icon: <TrendingUp className="w-8 h-8" />, title: isKorean ? 'SEO' : 'SEO', desc: isKorean ? '검색 최적화' : 'Search optimization' },
    { icon: <CheckCircle className="w-8 h-8" />, title: isKorean ? '반응형' : 'Responsive', desc: isKorean ? '모바일 최적화' : 'Mobile optimized' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeaderWrapper locale={locale} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <div className="max-w-7xl mx-auto text-center">
            <nav className="text-sm mb-6 text-gray-500">
              <Link href={isKorean ? '/ko' : '/'} className="hover:text-gray-700">{isKorean ? '홈' : 'Home'}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{isKorean ? '쇼핑몰 제작' : 'E-commerce'}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              {isKorean ? (
                <><span className="text-orange-600">쇼핑몰</span> 제작 전문</>
              ) : (
                <><span className="text-orange-600">E-commerce</span> Website Design</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {isKorean
                ? 'Shopify, WooCommerce 기반 전문 쇼핑몰 제작. 결제, 재고, 배송 시스템 완벽 연동.'
                : 'Professional Shopify & WooCommerce stores. Payment, inventory, shipping fully integrated.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#packages" className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg">
                {isKorean ? '패키지 보기' : 'View Packages'}
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors">
                {isKorean ? '무료 상담' : 'Free Consultation'}
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{isKorean ? '쇼핑몰 기능' : 'E-commerce Features'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '온라인 판매에 필요한 모든 기능' : 'Everything you need to sell online'}</p>
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange-600">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{isKorean ? '쇼핑몰 제작 패키지' : 'E-commerce Packages'}</h2>
            <p className="text-center text-gray-600 mb-12">{isKorean ? '비즈니스 규모에 맞는 패키지' : 'Packages for every business size'}</p>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-8 border-2 ${pkg.popular ? 'border-orange-600 shadow-xl' : 'border-gray-200'} relative`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {isKorean ? '추천' : 'Recommended'}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.desc}</p>
                  <p className="text-4xl font-black text-orange-600 mb-6">{pkg.price}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact" className={`block text-center py-3 rounded-xl font-bold ${pkg.popular ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors`}>
                    {isKorean ? '상담 신청' : 'Get Started'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{isKorean ? '지원 플랫폼' : 'Supported Platforms'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Shopify', desc: isKorean ? '가장 인기 있는 이커머스 플랫폼. 사용 쉬움, 관리 편리.' : 'Most popular e-commerce platform. Easy to use and manage.' },
                { name: 'WooCommerce', desc: isKorean ? 'WordPress 기반. 무한 커스터마이징 가능.' : 'WordPress-based. Unlimited customization.' },
                { name: 'Custom', desc: isKorean ? '완전 맞춤 개발. 특수 요구사항 충족.' : 'Fully custom development. Meet special requirements.' },
              ].map((platform, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-xl text-center">
                  <h3 className="text-2xl font-bold mb-4">{platform.name}</h3>
                  <p className="text-gray-600">{platform.desc}</p>
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
              <Link href={isKorean ? '/ko/웹사이트-제작' : '/website-design'} className="text-orange-600 hover:underline">{isKorean ? '웹사이트 제작' : 'Website Design'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴욕-웹사이트' : '/ny-website'} className="text-orange-600 hover:underline">{isKorean ? '뉴욕 웹사이트' : 'NYC Website'}</Link>
              <span className="text-gray-400">|</span>
              <Link href={isKorean ? '/ko/뉴저지-웹사이트' : '/nj-website'} className="text-orange-600 hover:underline">{isKorean ? '뉴저지 웹사이트' : 'NJ Website'}</Link>
            </div>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
