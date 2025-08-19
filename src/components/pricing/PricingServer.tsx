import { Check, X, Sparkles, Users, Building2, Zap, HelpCircle } from 'lucide-react'
import OneTimeToggle from './OneTimeToggle'
import FAQAccordion from './FAQAccordion'
import PricingCTA from './PricingCTA'

interface PricingServerProps {
  locale: 'en' | 'ko'
  content: any
}

const tiers = [
  {
    id: 'hobby',
    name: 'Hobby',
    icon: Sparkles,
    description: {
      en: 'Perfect for personal projects and small websites',
      ko: '개인 프로젝트와 소규모 웹사이트에 적합'
    },
    price: {
      monthly: 1000,
      annual: 1000
    },
    displayPrice: {
      en: '$1k',
      ko: '$1k'
    },
    oneTimePrice: {
      en: '$1,000 one-time',
      ko: '$1,000 일회성'
    },
    features: {
      en: [
        '1-3 page website',
        'Mobile responsive design',
        'Basic SEO setup',
        'Contact form',
        '3-day support window',
        'Basic hosting included'
      ],
      ko: [
        '1-3 페이지 웹사이트',
        '모바일 반응형 디자인',
        '기본 SEO 설정',
        '문의 폼',
        '3일 지원 기간',
        '기본 호스팅 포함'
      ]
    },
    notIncluded: {
      en: ['Custom design', 'E-commerce', 'Advanced analytics'],
      ko: ['맞춤 디자인', '이커머스', '고급 분석']
    },
    cta: {
      en: 'Get Started',
      ko: '시작하기'
    },
    subscriptionRecommended: true,
    popular: false
  },
  {
    id: 'plus',
    name: 'Plus',
    icon: Zap,
    description: {
      en: 'For growing businesses and professional sites',
      ko: '성장하는 비즈니스와 전문 사이트용'
    },
    price: {
      monthly: 2500,
      annual: 2500
    },
    displayPrice: {
      en: '$2k-3k',
      ko: '$2k-3k'
    },
    oneTimePrice: {
      en: '$2,000 - $3,000 one-time',
      ko: '$2,000 - $3,000 일회성'
    },
    features: {
      en: [
        'Up to 10 pages',
        'Full bilingual support (EN/KO)',
        'Server-side rendering (SSR)',
        'Custom design elements',
        'Advanced SEO optimization',
        'Google Analytics integration',
        'Blog/Portfolio sections',
        '7-day support window',
        'Performance optimization'
      ],
      ko: [
        '최대 10페이지',
        '완전한 이중 언어 지원 (EN/KO)',
        '서버 사이드 렌더링 (SSR)',
        '맞춤 디자인 요소',
        '고급 SEO 최적화',
        'Google Analytics 통합',
        '블로그/포트폴리오 섹션',
        '7일 지원 기간',
        '성능 최적화'
      ]
    },
    notIncluded: {
      en: ['E-commerce features', 'Custom integrations'],
      ko: ['이커머스 기능', '맞춤 통합']
    },
    cta: {
      en: 'Get Started',
      ko: '시작하기'
    },
    subscriptionRecommended: true,
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Users,
    description: {
      en: 'Full e-commerce solution with Shopify integration',
      ko: 'Shopify 통합을 갖춘 완전한 이커머스 솔루션'
    },
    price: {
      monthly: 4000,
      annual: 4000
    },
    displayPrice: {
      en: '$3k-6k',
      ko: '$3k-6k'
    },
    oneTimePrice: {
      en: '$3,000 - $6,000 one-time',
      ko: '$3,000 - $6,000 일회성'
    },
    requiresSubscription: {
      en: 'Requires Pro care ($399/mo) or higher',
      ko: 'Pro 케어($399/월) 이상 필요'
    },
    features: {
      en: [
        'Everything in Plus',
        '🛍️ Full Shopify/E-commerce setup',
        'Advanced SEO with structured data',
        'Google Analytics 4 with custom events',
        'Performance optimization (<3s load)',
        'Custom animations & interactions',
        'Mobile-first responsive design',
        'Dynamic pricing calculators',
        'Contact form with email integration',
        'Accessibility compliant (WCAG)',
        'Core Web Vitals optimized',
        'Monthly maintenance (4hr)'
      ],
      ko: [
        'Plus의 모든 기능',
        '🛍️ 완전한 Shopify/이커머스 설정',
        '구조화된 데이터로 고급 SEO',
        '맞춤 이벤트가 포함된 GA4',
        '성능 최적화 (<3초 로드)',
        '맞춤 애니메이션 및 상호작용',
        '모바일 우선 반응형 디자인',
        '동적 가격 계산기',
        '이메일 통합 문의 양식',
        '접근성 준수 (WCAG)',
        'Core Web Vitals 최적화',
        '월간 유지보수 (4시간)'
      ]
    },
    notIncluded: {
      en: [],
      ko: []
    },
    cta: {
      en: 'Get Started',
      ko: '시작하기'
    },
    subscriptionRecommended: true,
    popular: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    description: {
      en: 'Custom solutions for large organizations',
      ko: '대규모 조직을 위한 맞춤 솔루션'
    },
    price: {
      monthly: 0,
      annual: 0
    },
    displayPrice: {
      en: 'Custom',
      ko: '맞춤 견적'
    },
    features: {
      en: [
        'Everything in Pro',
        'Custom infrastructure',
        'Dedicated support team',
        'SLA guarantee',
        'Security audit',
        'Custom integrations',
        'Multi-site management',
        'White-label options',
        'Training & onboarding',
        'Compliance support'
      ],
      ko: [
        'Pro의 모든 기능',
        '맞춤 인프라',
        '전담 지원 팀',
        'SLA 보장',
        '보안 감사',
        '맞춤 통합',
        '멀티사이트 관리',
        '화이트라벨 옵션',
        '교육 및 온보딩',
        '규정 준수 지원'
      ]
    },
    notIncluded: {
      en: [],
      ko: []
    },
    cta: {
      en: 'Contact Sales',
      ko: '영업팀 문의'
    },
    popular: false
  }
]

export default function PricingServer({ locale, content: t }: PricingServerProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'Simple, transparent pricing' : '간단하고 투명한 가격'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {locale === 'en' 
              ? 'One-time build fee + monthly subscription for ongoing support. Choose the perfect plan for your needs.'
              : '일회성 제작비 + 지속적인 지원을 위한 월간 구독. 귀하의 필요에 맞는 완벽한 플랜을 선택하세요.'}
          </p>
        </div>
      </section>

      {/* Pricing Cards - Server Rendered */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Step 1 Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-bold">{locale === 'en' ? 'STEP 1' : '1단계'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {locale === 'en' ? 'Choose Your Website Tier' : '웹사이트 티어 선택'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {locale === 'en' 
                ? 'Select the perfect website package for your needs'
                : '귀하의 필요에 맞는 완벽한 웹사이트 패키지를 선택하세요'}
            </p>
          </div>
          
          {/* One-time pricing toggle */}
          <OneTimeToggle locale={locale} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="pricing-grid">
            {tiers.map((tier) => {
              const Icon = tier.icon

              return (
                <div
                  key={tier.id}
                  data-tier={tier.id}
                  className={`relative rounded-2xl p-8 ${
                    tier.popular 
                      ? 'border-2 border-indigo-500 shadow-xl' 
                      : 'border border-gray-200'
                  } bg-white`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white">
                        {locale === 'en' ? 'MOST POPULAR' : '가장 인기'}
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <div className="mb-4">
                      <Icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tier.description[locale]}</p>
                    
                    {/* Price Display */}
                    <div>
                      {tier.id === 'enterprise' ? (
                        <span className="text-4xl font-bold text-gray-900">{tier.displayPrice[locale]}</span>
                      ) : (
                        <>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900 price-display">{tier.displayPrice[locale]}</span>
                            <span className="ml-2 text-sm text-gray-600">{locale === 'en' ? 'one-time' : '일회성'}</span>
                          </div>
                          <div className="annual-discount-badge hidden mt-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            {locale === 'en' ? '30% off with annual subscription' : '연간 구독 시 30% 할인'}
                          </div>
                          {tier.requiresSubscription && (
                            <div className="mt-2 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                              {tier.requiresSubscription[locale]}
                            </div>
                          )}
                          {tier.subscriptionRecommended && !tier.requiresSubscription && (
                            <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                              {locale === 'en' ? '+ Subscription recommended' : '+ 구독 권장'}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <PricingCTA 
                    tierId={tier.id}
                    tierName={tier.name}
                    locale={locale}
                    isEnterprise={tier.id === 'enterprise'}
                    popular={tier.popular}
                  />

                  <div className="mt-8 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        {locale === 'en' ? 'What\'s included' : '포함 사항'}
                      </h4>
                      <ul className="space-y-3" role="list">
                        {tier.features[locale].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tier.notIncluded[locale].length > 0 && (
                      <div>
                        <ul className="space-y-3" role="list">
                          {tier.notIncluded[locale].map((feature, index) => (
                            <li key={index} className="flex items-start opacity-50">
                              <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span className="text-sm text-gray-500 line-through">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Subscription Section - Prominent CTA */}
      <section id="subscription-section" className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">{locale === 'en' ? 'STEP 2 - RECOMMENDED' : '2단계 - 권장'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Ongoing Care & Support Plans' : '지속적인 관리 및 지원 플랜'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-3">
              {locale === 'en' 
                ? 'Keep your website running smoothly with our monthly care plans. Get updates, support, and peace of mind.'
                : '월간 관리 플랜으로 웹사이트를 원활하게 운영하세요. 업데이트, 지원, 안심을 제공합니다.'}
            </p>
            <p className="text-sm text-indigo-600 font-medium">
              {locale === 'en' 
                ? '💡 Tip: You can select this first! We\'ll guide you to choose a website tier next.'
                : '💡 팁: 이것을 먼저 선택할 수 있습니다! 다음에 웹사이트 티어를 선택하도록 안내해드립니다.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter - $99/mo */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-3xl font-bold text-gray-900">$99</span>
                  <span className="ml-2 text-gray-600">/{locale === 'en' ? 'month' : '월'}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {locale === 'en' ? 'Essential maintenance' : '필수 유지보수'}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Hosting included' : '호스팅 포함'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Daily backups' : '일일 백업'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Security monitoring' : '보안 모니터링'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? '30 min updates/mo' : '월 30분 업데이트'}
                  </span>
                </li>
              </ul>
              <button 
                data-subscription="starter"
                data-subscription-name="Starter"
                data-subscription-price="$99/mo"
                className="w-full py-2 px-4 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors subscription-button"
              >
                {locale === 'en' ? 'Select' : '선택'}
              </button>
            </div>

            {/* Growth - $199/mo */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-indigo-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {locale === 'en' ? 'POPULAR' : '인기'}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Growth</h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-3xl font-bold text-gray-900">$199</span>
                  <span className="ml-2 text-gray-600">/{locale === 'en' ? 'month' : '월'}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {locale === 'en' ? 'For growing sites' : '성장하는 사이트용'}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Everything in Starter' : 'Starter의 모든 기능'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? '1 hour updates/mo' : '월 1시간 업데이트'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Content updates' : '콘텐츠 업데이트'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Performance reports' : '성능 보고서'}
                  </span>
                </li>
              </ul>
              <button 
                data-subscription="growth"
                data-subscription-name="Growth"
                data-subscription-price="$199/mo"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors subscription-button"
              >
                {locale === 'en' ? 'Select' : '선택'}
              </button>
            </div>

            {/* Pro - $399/mo */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-3xl font-bold text-gray-900">$399</span>
                  <span className="ml-2 text-gray-600">/{locale === 'en' ? 'month' : '월'}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {locale === 'en' ? 'Professional support' : '전문 지원'}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Everything in Growth' : 'Growth의 모든 기능'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? '4 hours updates/mo' : '월 4시간 업데이트'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'E-commerce support' : '이커머스 지원'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Priority support' : '우선 지원'}
                  </span>
                </li>
              </ul>
              <button 
                data-subscription="pro"
                data-subscription-name="Pro"
                data-subscription-price="$399/mo"
                className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors subscription-button"
              >
                {locale === 'en' ? 'Select' : '선택'}
              </button>
            </div>

            {/* Scale - $799/mo */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {locale === 'en' ? 'ENTERPRISE' : '엔터프라이즈'}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Scale</h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-3xl font-bold text-gray-900">$799</span>
                  <span className="ml-2 text-gray-600">/{locale === 'en' ? 'month' : '월'}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {locale === 'en' ? 'Full-service solution' : '풀 서비스 솔루션'}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Everything in Pro' : 'Pro의 모든 기능'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Unlimited updates' : '무제한 업데이트'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? 'Dedicated manager' : '전담 매니저'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {locale === 'en' ? '24/7 support' : '24/7 지원'}
                  </span>
                </li>
              </ul>
              <button 
                data-subscription="scale"
                data-subscription-name="Scale"
                data-subscription-price="$799/mo"
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors subscription-button"
              >
                {locale === 'en' ? 'Select' : '선택'}
              </button>
            </div>
          </div>

          {/* Why Subscribe CTA */}
          <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Why Choose a Subscription?' : '왜 구독을 선택해야 할까요?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Always Updated' : '항상 최신'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'en' 
                    ? 'Your website stays current with the latest features and security updates'
                    : '웹사이트를 최신 기능과 보안 업데이트로 유지'}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Expert Support' : '전문가 지원'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'en' 
                    ? 'Get help when you need it from our experienced team'
                    : '필요할 때 경험 많은 팀의 도움을 받으세요'}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === 'en' ? 'Scale Easily' : '쉬운 확장'}
                </h4>
                <p className="text-sm text-gray-600">
                  {locale === 'en' 
                    ? 'Grow your website as your business expands'
                    : '비즈니스 확장에 따라 웹사이트도 성장'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {locale === 'en' 
                ? '👆 Select your website tier and care plan above to get started'
                : '👆 시작하려면 위에서 웹사이트 티어와 케어 플랜을 선택하세요'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Frequently Asked Questions' : '자주 묻는 질문'}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === 'en' 
                ? 'Everything you need to know about our services'
                : '저희 서비스에 대해 알아야 할 모든 것'}
            </p>
          </div>
          <FAQAccordion items={t.faq.items} locale={locale} />
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {locale === 'en' 
                ? "Can't find what you're looking for?"
                : '찾으시는 내용이 없으신가요?'}
            </p>
            <a
              href={`${locale === 'ko' ? '/ko' : '/'}#contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              {locale === 'en' ? 'Contact Support' : '지원팀 문의'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}