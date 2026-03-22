import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import Contact from '@/components/sections/Contact'
import Link from 'next/link'
import { TrendingUp, Target, DollarSign, BarChart3, Shield, Zap } from 'lucide-react'

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
      title: '한인 비즈니스 구글 광고 대행 | 뉴저지 뉴욕 구글 애즈 전문 | ZOE LUMOS',
      description: '한인 소규모 비즈니스를 위한 구글 광고(Google Ads) 전문 대행. 뉴저지·뉴욕 한인 비즈니스 구글 검색 광고, 디스플레이 광고, 유튜브 광고. 100% 한국어 상담 가능.',
      keywords: '한인 구글 광고, 구글 애즈 대행, 한인 비즈니스 구글광고, 뉴저지 구글 광고, 뉴욕 구글 광고, 한국어 구글 광고, 소규모 비즈니스 광고, 구글 검색 광고, 로컬 광고, 한인 마케팅',
      openGraph: {
        title: '한인 비즈니스 구글 광고 전문 - ZOE LUMOS',
        description: '한인 소규모 비즈니스 구글 광고 대행. 100% 한국어 상담.',
        url: `${baseUrl}/ko/google-ads-korean-business`,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
      },
      alternates: {
        canonical: `${baseUrl}/ko/google-ads-korean-business`,
        languages: {
          'x-default': `${baseUrl}/google-ads-korean-business`,
          'en': `${baseUrl}/google-ads-korean-business`,
          'ko': `${baseUrl}/ko/google-ads-korean-business`,
        },
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Google Ads for Korean Businesses | NJ & NYC Korean Business PPC Management | ZOE LUMOS',
    description: 'Google Ads management for Korean-American small businesses in NJ and NYC. Bilingual campaigns in Korean & English. Fort Lee, Palisades Park, Flushing specialists. No wasted ad spend — results-driven PPC.',
    keywords: 'Google Ads Korean business, Korean American Google Ads, PPC management NJ, Korean business advertising, Fort Lee Google Ads, Palisades Park advertising, Korean Google Ads agency, bilingual Google Ads, small business PPC NJ, Korean digital advertising NYC',
    openGraph: {
      title: 'Google Ads for Korean-American Businesses - ZOE LUMOS',
      description: 'Bilingual Google Ads management for Korean businesses in NJ & NYC. Results-driven PPC.',
      url: `${baseUrl}/google-ads-korean-business`,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/google-ads-korean-business`,
      languages: {
        'x-default': `${baseUrl}/google-ads-korean-business`,
        'en': `${baseUrl}/google-ads-korean-business`,
        'ko': `${baseUrl}/ko/google-ads-korean-business`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function GoogleAdsKoreanBusinessPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': isKo ? '한인 비즈니스 구글 광고 대행' : 'Google Ads Management for Korean Businesses',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'ZOE LUMOS',
      'url': 'https://www.zoelumos.com',
    },
    'areaServed': ['Fort Lee, NJ', 'Palisades Park, NJ', 'Flushing, NY', 'New York, NY', 'New Jersey'],
    'description': isKo
      ? '한인 소규모 비즈니스를 위한 구글 광고 전문 관리 서비스.'
      : 'Professional Google Ads management for Korean-American small businesses.',
  }

  const features = isKo
    ? [
        { icon: <Target className="w-6 h-6" />, title: '정밀 타겟 광고', desc: '지역별, 언어별, 관심사별로 정확한 고객에게만 광고를 노출합니다.' },
        { icon: <DollarSign className="w-6 h-6" />, title: '광고비 낭비 없음', desc: '전환율 최적화로 실제 고객으로 이어지는 클릭에만 집중합니다.' },
        { icon: <TrendingUp className="w-6 h-6" />, title: '한/영 이중 언어 캠페인', desc: '한국어 광고와 영어 광고를 동시에 운영해 더 많은 고객을 유치합니다.' },
        { icon: <BarChart3 className="w-6 h-6" />, title: '매월 성과 리포트', desc: '이해하기 쉬운 한국어 보고서로 광고 성과를 투명하게 공유합니다.' },
        { icon: <Shield className="w-6 h-6" />, title: '구글 파트너 인증', desc: '구글 공인 전문가가 광고를 관리합니다. 안심하고 맡기세요.' },
        { icon: <Zap className="w-6 h-6" />, title: '빠른 시작', desc: '계약 후 1주일 내 광고 캠페인 시작. 빠른 결과를 확인하세요.' },
      ]
    : [
        { icon: <Target className="w-6 h-6" />, title: 'Precision Targeting', desc: 'Reach the exact customers you want — by location, language, and intent.' },
        { icon: <DollarSign className="w-6 h-6" />, title: 'No Wasted Budget', desc: 'Conversion-optimized campaigns that focus spend on customers who actually buy.' },
        { icon: <TrendingUp className="w-6 h-6" />, title: 'Bilingual Campaigns', desc: 'Run Korean and English ads simultaneously to reach your full market.' },
        { icon: <BarChart3 className="w-6 h-6" />, title: 'Monthly Reporting', desc: 'Clear, easy-to-understand reports with full transparency on ad spend and ROI.' },
        { icon: <Shield className="w-6 h-6" />, title: 'Google Partner Certified', desc: 'Your campaigns managed by certified Google Ads professionals.' },
        { icon: <Zap className="w-6 h-6" />, title: 'Fast Launch', desc: 'Campaigns live within 1 week of signing. See results quickly.' },
      ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HeaderWrapper locale={locale} />

      <main className="bg-[#111111] text-white min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-block bg-[#B12492]/10 border border-[#B12492]/30 rounded-full px-4 py-1.5 mb-6 text-sm text-[#B12492]">
            {isKo ? '구글 광고 전문 대행' : 'Google Ads Management'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {isKo ? (
              <>한인 비즈니스를 위한<br /><span className="text-[#B12492]">구글 광고 전문가</span></>
            ) : (
              <>Google Ads for<br /><span className="text-[#B12492]">Korean Businesses</span></>
            )}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {isKo
              ? '뉴저지·뉴욕 한인 비즈니스 전문 구글 광고 대행사. 한국어로 상담하고, 실제 고객을 만드는 광고를 운영합니다.'
              : 'Bilingual Google Ads management for Korean-American small businesses in NJ & NYC. Stop wasting ad budget — get real customers.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale === 'ko' ? 'ko/' : ''}#contact`}
              className="bg-[#B12492] hover:bg-[#9a1f7e] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              {isKo ? '무료 광고 진단 받기' : 'Free Ads Audit'}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {isKo ? '저희가 하는 일' : 'What We Do For You'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#B12492]/40 transition-colors">
                  <div className="text-[#B12492] mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">
              {isKo ? '주요 서비스 업종' : 'Industries We Serve'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {(isKo
                ? ['한식당', '뷰티·네일샵', '태권도 도장', '부동산', '의류·쇼핑몰', '의료·치과', '학원·교육', '세탁소']
                : ['Korean Restaurants', 'Beauty & Nail Salons', 'Taekwondo Studios', 'Real Estate', 'Retail & E-commerce', 'Medical & Dental', 'Education & Tutoring', 'Dry Cleaning']
              ).map(industry => (
                <div key={industry} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 text-sm text-gray-300 hover:border-[#B12492]/30 transition-colors">
                  {industry}
                </div>
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
