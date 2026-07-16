import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import GuaranteeStrip from '@/components/sections/GuaranteeStrip'
import Link from 'next/link'
import { Globe, Smartphone, Zap, Shield, CheckCircle, Star, Clock, DollarSign, ArrowRight, MessageCircle } from 'lucide-react'
import { usStates } from '@/data/usStates'
import { SITE_URL } from '@/lib/siteUrl'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = SITE_URL

  return {
    title: locale === 'ko'
      ? '미국 웹사이트 제작 | 미국 홈페이지 제작 전문 | 한인 웹디자인 에이전시 | ZOE LUMOS'
      : 'US Website Design for Korean Businesses | Professional Web Agency | ZOE LUMOS',
    description: locale === 'ko'
      ? '미국 웹사이트 제작 전문 에이전시 ZOE LUMOS. 미국 한인 비즈니스를 위한 이중언어 홈페이지 제작, SEO 최적화, 구글 광고. NJ, NY, LA, 전국 서비스. $500부터. 무료 상담.'
      : 'Professional US website design for Korean-American businesses. Bilingual websites, SEO, Google Ads. Serving NJ, NY, LA, and nationwide. From $500. Free consultation.',
    keywords: locale === 'ko'
      ? '미국 웹사이트 제작, 미국 홈페이지 제작, 미국 웹사이트 만들기, 한인 웹사이트 제작, 미국 웹디자인, 한인 홈페이지, 뉴욕 웹사이트 제작, 뉴저지 웹사이트 제작, 엘에이 웹사이트 제작, 미국 웹사이트 제작 비용, 미국 홈페이지 제작 비용, 이중언어 웹사이트'
      : 'US website design, Korean American web design, bilingual website, Korean web agency, NY web design, NJ web design, LA web design, Korean business website, SEO website',
    openGraph: {
      title: locale === 'ko' ? '미국 웹사이트 제작 전문 - ZOE LUMOS' : 'US Website Design - ZOE LUMOS',
      description: locale === 'ko'
        ? '미국 한인 비즈니스를 위한 이중언어 웹사이트 제작 전문 에이전시'
        : 'Professional bilingual website design for Korean-American businesses',
      url: locale === 'ko' ? `${baseUrl}/ko/웹사이트-제작` : `${baseUrl}/웹사이트-제작`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'ko' ? `${baseUrl}/ko/웹사이트-제작` : `${baseUrl}/웹사이트-제작`,
      languages: {
        en: `${baseUrl}/웹사이트-제작`,
        ko: `${baseUrl}/ko/웹사이트-제작`,
        'x-default': `${baseUrl}/웹사이트-제작`,
      },
    },
  }
}

export default function WebsiteDesignPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const baseUrl = SITE_URL
  const isKorean = locale === 'ko'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isKorean ? '웹사이트 제작 서비스' : 'Website Design Service',
    url: isKorean ? `${baseUrl}/ko/웹사이트-제작` : `${baseUrl}/웹사이트-제작`,
    provider: { '@id': 'https://www.zoelumos.com/#organization' },
    serviceType: 'Website Design',
    areaServed: { '@type': 'Country', name: 'United States' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isKorean ? '웹사이트 제작 패키지' : 'Website Design Packages',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Basic Website' }, price: '500', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Standard Website' }, price: '1100', priceCurrency: 'USD' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Store / E-commerce Website' }, price: '1800', priceCurrency: 'USD' },
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
            ? '조이루모스(ZOE LUMOS)의 웹사이트 제작 비용은 기본 웹사이트 $500–$800, 일반 웹사이트 $1,100–$1,500, 스토어(이커머스) $1,800–$2,400입니다. 월 관리 플랜을 12개월 약정하면 제작 셋업비가 면제됩니다.'
            : 'Basic websites run $500-$800, standard websites $1,100-$1,500, and store/e-commerce builds $1,800-$2,400. A 12-month monthly care-plan commitment waives the build setup fee.',
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
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 문의 방법은 어떻게 되나요?' : 'How can I inquire about website creation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '웹사이트 제작 문의는 이메일(info@zoelumos.com), 카카오톡 채널, 또는 홈페이지 문의 폼을 통해 가능합니다. 무료 상담을 통해 프로젝트 범위, 일정, 견적을 안내드립니다. 지금 바로 문의하시면 영업일 기준 24시간 이내에 답변드립니다.'
            : 'You can inquire via email (info@zoelumos.com), KakaoTalk, or our website contact form. We offer a free consultation to discuss project scope, timeline, and pricing. Contact us now and we will respond within one business day.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '웹사이트 제작 비용 문의는 어떻게 하나요?' : 'How do I ask about website development costs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '웹사이트 제작 비용 문의는 무료 상담을 통해 정확한 견적을 받으실 수 있습니다. 기본 $500부터 시작하며, 비즈니스 규모와 필요한 기능에 따라 맞춤 견적을 제공합니다. 부담 없이 문의해주세요.'
            : 'You can get an accurate quote through our free consultation. Starting at $500, we provide custom quotes based on your business size and required features. Feel free to reach out anytime.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '미국에서 웹사이트 제작 비용은 얼마인가요?' : 'How much does US website design cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '조이루모스의 미국 웹사이트 제작 비용은 소규모 홈페이지 $500~800, 일반 비즈니스용 $1,100~1,500, 스토어(이커머스) $1,800~2,400입니다. 페이지 수, 기능, 이중언어 여부에 따라 달라지며, 무료 상담 후 정확한 견적을 안내드립니다.'
            : 'ZOE LUMOS US website builds cost $500-800 for a small site, $1,100-1,500 for a standard business site, and $1,800-2,400 for a store/e-commerce build. The price depends on page count, features, and bilingual needs, with an exact quote after a free consultation.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '한인 비즈니스 홈페이지 제작 기간은?' : 'How long does Korean business website development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '한인 비즈니스 홈페이지 제작 기간은 규모에 따라 보통 1~4주입니다. 기본 홈페이지는 1~2주, 비즈니스 홈페이지는 2~3주, 맞춤 제작은 3~4주 정도 소요되며, 한국어와 영어 이중언어로 함께 제작됩니다.'
            : 'A Korean business website typically takes 1-4 weeks depending on scope: 1-2 weeks for a basic site, 2-3 weeks for a business site, and 3-4 weeks for a custom build, delivered in both Korean and English.',
        },
      },
      {
        '@type': 'Question',
        name: isKorean ? '엘에이/뉴욕/뉴저지에서도 가능한가요?' : 'Do you serve LA, New York, and New Jersey?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isKorean
            ? '네, 엘에이(LA), 뉴욕, 뉴저지를 포함해 미국 전역 어디서나 웹사이트 제작이 가능합니다. 모든 상담과 작업은 온라인으로 진행되어, 미국 어느 지역의 한인 비즈니스든 한국어로 편하게 의뢰하실 수 있습니다.'
            : 'Yes. We build websites for Korean businesses anywhere in the US, including Los Angeles, New York, and New Jersey. All consultation and work is done online, so you can hire us comfortably in Korean from any US location.',
        },
      },
    ],
  }

  const packages = [
    {
      name: isKorean ? '기본' : 'Basic',
      price: '$500–800',
      desc: isKorean ? '소규모 비즈니스용' : 'For small businesses',
      features: isKorean
        ? ['5페이지 이하', '반응형 디자인', '기본 SEO', '연락처 폼', '단계별 수정 2회']
        : ['Up to 5 pages', 'Responsive design', 'Basic SEO', 'Contact form', '2 revision rounds per phase'],
    },
    {
      name: isKorean ? '일반' : 'Standard',
      price: '$1,100–1,500',
      desc: isKorean ? '성장하는 비즈니스용' : 'For growing businesses',
      popular: true,
      features: isKorean
        ? ['6–15페이지', '커스텀 디자인', '고급 SEO', '블로그 기능', '이중언어 지원', '단계별 수정 2회']
        : ['6–15 pages', 'Custom design', 'Advanced SEO', 'Blog functionality', 'Bilingual support', '2 revision rounds per phase'],
    },
    {
      name: isKorean ? '스토어' : 'Store',
      price: '$1,800–2,400',
      desc: isKorean ? 'Shopify · 이커머스' : 'Shopify · e-commerce',
      features: isKorean
        ? ['상품 · 결제 연동', '주문 · 예약 기능', '커스텀 디자인', '이중언어 지원', '프리미엄 SEO', '단계별 수정 2회']
        : ['Products & checkout', 'Ordering or booking', 'Custom design', 'Bilingual support', 'Premium SEO', '2 revision rounds per phase'],
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
                <><span className="text-violet-600">미국 웹사이트 제작</span> · 미국 홈페이지 제작 전문</>
              ) : (
                <><span className="text-violet-600">US Website Design</span> for Korean Businesses</>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {isKorean
                ? '뉴욕, 뉴저지, 엘에이를 비롯한 미국 전역 한인 비즈니스를 위한 전문 웹사이트 제작. 반응형, SEO 최적화, 빠른 제작.'
                : 'Professional US website design for Korean-American businesses in NY, NJ, LA, and nationwide. Responsive, SEO-optimized, fast delivery.'}
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

        {/* SEO Intro */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              {isKorean ? '미국 홈페이지 제작 · 한인 홈페이지 제작 전문 에이전시' : 'Korean Business Website Design in the US'}
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              {isKorean ? (
                <>
                  <p>
                    조이루모스(ZOE LUMOS)는 미국 한인 비즈니스를 위한 <strong>미국 웹사이트 제작</strong> 및 <strong>미국 홈페이지 제작</strong> 전문 에이전시입니다.
                    뉴욕, 뉴저지, 엘에이는 물론 미국 전역 어디서나 한국어로 편하게 상담받고, 영어와 한국어 이중언어 홈페이지를 제작하실 수 있습니다.
                  </p>
                  <p>
                    레스토랑, 병원, 법률·회계 사무소, 부동산, 미용·뷰티, 교회 등 다양한 업종의 <strong>한인 홈페이지 제작</strong> 경험을 바탕으로,
                    반응형 디자인과 구글 검색 최적화(SEO)까지 한 번에 해결해 드립니다. 미국 웹사이트 제작 비용이 궁금하시다면 아래 가격 안내를 확인하세요.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    ZOE LUMOS is a US website design agency specializing in <strong>Korean business website design</strong> for Korean-American
                    companies. Whether you are in New York, New Jersey, Los Angeles, or anywhere across the US, we build fast, bilingual
                    (English and Korean) websites and you can consult comfortably in Korean.
                  </p>
                  <p>
                    From restaurants and clinics to law and accounting firms, real estate, beauty salons, and churches, our experience in
                    Korean-American website development covers responsive design and Google SEO in one package. Curious about US website
                    design pricing? See the pricing section below.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white text-gray-900">
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
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">{isKorean ? '미국 웹사이트 제작 비용 · 패키지' : 'US Website Design Pricing & Packages'}</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {isKorean
                ? '미국 웹사이트 제작 비용은 페이지 수와 기능에 따라 달라집니다. 기본 홈페이지 $500~800, 일반 비즈니스용 $1,100~1,500, 스토어(이커머스) $1,800~2,400입니다. 월 관리 플랜 12개월 약정 시 셋업비가 면제되며, 모든 견적은 무료 상담 후 확정됩니다.'
                : 'US website design cost depends on page count and features. Basic sites run $500-800, standard business sites $1,100-1,500, and store/e-commerce builds $1,800-2,400. A 12-month care-plan commitment waives the setup fee, and every quote is finalized after a free consultation.'}
            </p>

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
        <section className="py-16 px-4 bg-white text-gray-900">
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

        {/* 웹사이트 제작 문의 */}
        {isKorean && (
          <section className="py-16 px-4 bg-violet-50 text-gray-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-center mb-6">
                <span className="text-violet-600">웹사이트 제작 문의</span>
              </h2>
              <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                웹사이트 제작이 필요하신가요? 조이루모스는 미국 전역 한인 비즈니스를 위한 전문 웹사이트 제작 서비스를 제공합니다. 웹사이트 제작 문의부터 런칭까지, 한국어로 편하게 상담받으세요.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                  <Clock className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">빠른 응답</h3>
                  <p className="text-gray-600 text-sm">문의 후 24시간 이내 답변</p>
                </div>
                <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                  <DollarSign className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">무료 견적</h3>
                  <p className="text-gray-600 text-sm">부담 없는 무료 상담 및 견적</p>
                </div>
                <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                  <MessageCircle className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                  <h3 className="font-bold mb-2">한국어 상담</h3>
                  <p className="text-gray-600 text-sm">한국어로 편하게 문의하세요</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* True-facts guarantee strip */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <GuaranteeStrip locale={locale} variant="compact" />
          </div>
        </section>

        {/* 문의하기 CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {isKorean ? '지금 무료 상담 문의하기' : 'Get Your Free Consultation Today'}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {isKorean
                ? '웹사이트 제작 비용이 궁금하신가요? 홈페이지 제작 문의를 주시면 24시간 이내에 맞춤 견적을 보내드립니다. 부담 없이 무료로 상담받으세요!'
                : 'Curious about website development costs? Contact us for a free consultation and receive a custom quote within 24 hours. No obligation!'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#contact" className="px-8 py-4 bg-white text-violet-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2">
                {isKorean ? '문의하기' : 'Contact Us'} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="http://pf.kakao.com/_xhxdxmlX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                {isKorean ? '카카오톡 상담' : 'Chat on KakaoTalk'}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50 text-gray-900">
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
        <section className="py-12 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-4">{isKorean ? '지역별 · 관련 서비스' : 'Related & Local Services'}</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { slug: '엘에이-웹사이트-제작', ko: '엘에이 웹사이트 제작', en: 'LA Website Design' },
                { slug: '뉴욕-웹사이트', ko: '뉴욕 웹사이트 제작', en: 'New York Website' },
                { slug: '뉴저지-웹사이트', ko: '뉴저지 웹사이트 제작', en: 'New Jersey Website' },
                { slug: '광고대행', ko: '구글 광고대행', en: 'Google Ads Management' },
                { slug: 'englewood-nj-seo', ko: 'SEO 검색 최적화', en: 'SEO Services' },
                { slug: isKorean ? '쇼핑몰-제작' : 'ecommerce', ko: '쇼핑몰 제작', en: 'E-commerce' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={isKorean ? `/${locale}/${item.slug}` : `/${item.slug}`}
                  className="px-4 py-2 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors text-sm font-medium"
                >
                  {isKorean ? item.ko : item.en}
                </Link>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-4">{isKorean ? '지역별 웹사이트 제작 서비스' : 'Website Services by State'}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {usStates
                .filter((s) => s.tier === 'large' || s.tier === 'medium')
                .map((state) => (
                  <Link
                    key={state.abbr}
                    href={isKorean ? `/ko/${state.koSlug}` : `/${state.slug}`}
                    className="px-4 py-2 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors text-sm font-medium"
                  >
                    {isKorean ? `${state.name.ko} 웹사이트 제작` : `${state.name.en} Website`}
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
