import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import PricingServer from '@/components/pricing/PricingServer'
import PricingClientWrapper from '@/components/pricing/PricingClientWrapper'
import { generatePricingMetadata } from './metadata'

const locales = ['en', 'ko']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  return generatePricingMetadata(locale)
}

const content = {
  en: {
    hero: {
      title: 'Simple, transparent pricing',
      subtitle: 'Choose the perfect plan for your needs. Always flexible to scale.',
      cta1: 'Get Started',
      cta2: 'Contact Sales',
      location: 'Fort Lee, NJ & NYC — work with us from anywhere online.',
    },
    plans: {
      title: 'Choose Your Plan',
      brochure: 'Brochure',
      ecommerce: 'E-commerce',
      launchTime: 'Launch Time',
      edits: 'Unlimited edits for 7 days',
      edits1Month: '1-month revisions window',
      features: 'Features',
    },
    brochurePlans: {
      iron: {
        name: 'Iron',
        price: '$500 ~ $1,000',
        launchTime: '2–3 days',
        features: [
          '3 pages, mobile-ready',
          'Template-based design',
          'Contact information',
          'Basic hosting setup',
          'Quick turnaround',
        ],
      },
      silver: {
        name: 'Silver',
        price: '$1,000 ~ $2,000',
        launchTime: '3–5 days',
        features: [
          '5 pages, responsive design',
          'Basic SEO setup',
          'Contact form integration',
          'GA4 base install',
          'Content ready required',
        ],
      },
      gold: {
        name: 'Gold',
        price: '$2,000 ~ $4,000',
        launchTime: '5–7 days',
        features: [
          'Custom layout design',
          'Blog/portfolio sections',
          'Event tracking preset',
          'Speed & image optimization',
          'SEO upgrades included',
        ],
      },
    },
    ecommercePlans: {
      gold: {
        name: 'Gold',
        price: '$4,000 ~ $6,000',
        launchTime: '2–3 weeks',
        features: [
          'Shopify setup complete',
          'Payments/shipping/tax setup',
          'Up to 20 products',
          'GA4 + funnel events',
          'view_item, add_to_cart, checkout tracking',
        ],
      },
      platinum: {
        name: 'Platinum',
        price: '$6,000 ~ $10,000',
        launchTime: '1–3 months',
        features: [
          'Advanced theme customization',
          'Collections & automations',
          'Remarketing pixels setup',
          'CRM/email integration',
          'Analytics dashboard',
        ],
      },
    },
    subscription: {
      title: 'Care Plans — Keep Growing',
      subtitle: 'Start with a one-time build → keep growing from $99/mo.',
      required: 'E-commerce sites require Care Pro or Scale plans',
      basic: {
        name: 'Care Basic',
        price: 'from $99/mo',
        features: [
          'Hosting included',
          'Daily backups',
          'Security monitoring',
          'Minor updates (30 min/mo)',
        ],
      },
      growth: {
        name: 'Care Growth',
        price: 'from $199/mo',
        features: [
          'Everything in Basic',
          '+1 hr monthly updates',
          '1 blog post upload',
          'Keyword performance check',
        ],
      },
      pro: {
        name: 'Care Pro',
        price: 'from $399/mo',
        badge: 'For E-commerce',
        features: [
          'Everything in Growth',
          '+2 hrs monthly updates',
          'Product uploads (up to 10)',
          'Sales performance tracking',
          'Inventory management support',
          'Monthly optimization',
        ],
      },
      scale: {
        name: 'Care Scale',
        price: 'from $799/mo',
        badge: 'For E-commerce',
        features: [
          'Everything in Pro',
          '+4 hrs monthly updates',
          'Advanced conversion report',
          'Weekly strategy calls',
          'A/B testing & optimization',
          'Priority support 24/7',
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Why are there price ranges?',
          answer: 'Every project is unique. The final price depends on complexity, custom features, and content volume. We provide a detailed quote after understanding your needs.',
        },
        {
          question: "What's included in 7-day unlimited edits?",
          answer: 'After launch, you have 7 full days to request any changes—text, images, layout adjustments. We implement all reasonable edits to ensure you love your site.',
        },
        {
          question: 'Can I cancel my subscription?',
          answer: "Yes, you can cancel anytime. Your services pause and you can resume whenever you're ready. No long-term contracts required.",
        },
      ],
    },
  },
  ko: {
    hero: {
      title: '간단하고 투명한 가격',
      subtitle: '귀하의 필요에 맞는 완벽한 플랜을 선택하세요. 항상 유연하게 확장 가능합니다.',
      cta1: '시작하기',
      cta2: '영업팀 문의',
      location: '포트리, NJ & NYC — 온라인으로 어디서나 협업 가능.',
    },
    plans: {
      title: '플랜 선택하기',
      brochure: '브로슈어',
      ecommerce: '이커머스',
      launchTime: '런칭 시간',
      edits: '7일간 무제한 수정',
      edits1Month: '1개월 수정 기간',
      features: '특징',
    },
    brochurePlans: {
      iron: {
        name: '아이언',
        price: '$500 ~ $1,000',
        launchTime: '2–3일',
        features: [
          '3페이지, 모바일 대응',
          '템플릿 기반 디자인',
          '연락처 정보',
          '기본 호스팅 설정',
          '빠른 제작',
        ],
      },
      silver: {
        name: '실버',
        price: '$1,000 ~ $2,000',
        launchTime: '3–5일',
        features: [
          '5페이지, 반응형 디자인',
          '기본 SEO 설정',
          '문의 폼 연동',
          'GA4 기본 설치',
          '콘텐츠 준비 필요',
        ],
      },
      gold: {
        name: '골드',
        price: '$2,000 ~ $4,000',
        launchTime: '5–7일',
        features: [
          '맞춤 레이아웃 디자인',
          '블로그/포트폴리오 섹션',
          '이벤트 추적 사전설정',
          '속도 및 이미지 최적화',
          'SEO 업그레이드 포함',
        ],
      },
    },
    ecommercePlans: {
      gold: {
        name: '골드',
        price: '$4,000 ~ $6,000',
        launchTime: '2–3주',
        features: [
          'Shopify 완벽 설정',
          '결제/배송/세금 설정',
          '최대 20개 상품',
          'GA4 + 퍼널 이벤트',
          '상품보기, 장바구니, 결제 추적',
        ],
      },
      platinum: {
        name: '플래티넘',
        price: '$6,000 ~ $10,000',
        launchTime: '1–3개월',
        features: [
          '고급 테마 커스터마이징',
          '컬렉션 및 자동화',
          '리마케팅 픽셀 설정',
          'CRM/이메일 연동',
          '분석 대시보드',
        ],
      },
    },
    subscription: {
      title: '케어 플랜 — 지속적인 성장',
      subtitle: '일회성 제작으로 시작 → 월 $99부터 지속 성장.',
      required: '이커머스 사이트는 케어 프로 또는 스케일 플랜 필수',
      basic: {
        name: '케어 베이직',
        price: '월 $99부터',
        features: [
          '호스팅 포함',
          '일일 백업',
          '보안 모니터링',
          '간단한 업데이트 (월 30분)',
        ],
      },
      growth: {
        name: '케어 그로스',
        price: '월 $199부터',
        features: [
          '베이직의 모든 기능',
          '+월 1시간 업데이트',
          '블로그 포스트 1개 업로드',
          '키워드 성과 체크',
        ],
      },
      pro: {
        name: '케어 프로',
        price: '월 $399부터',
        badge: '이커머스용',
        features: [
          '그로스의 모든 기능',
          '+월 2시간 업데이트',
          '상품 업로드 (최대 10개)',
          '판매 성과 추적',
          '재고 관리 지원',
          '월간 최적화',
        ],
      },
      scale: {
        name: '케어 스케일',
        price: '월 $799부터',
        badge: '이커머스용',
        features: [
          '프로의 모든 기능',
          '+월 4시간 업데이트',
          '고급 전환 리포트',
          '주간 전략 통화',
          'A/B 테스팅 및 최적화',
          '24/7 우선 지원',
        ],
      },
    },
    faq: {
      title: '자주 묻는 질문',
      items: [
        {
          question: '왜 가격이 범위로 표시되나요?',
          answer: '모든 프로젝트는 독특합니다. 최종 가격은 복잡도, 맞춤 기능, 콘텐츠 양에 따라 결정됩니다. 귀하의 요구사항을 파악한 후 상세 견적을 제공합니다.',
        },
        {
          question: '7일 무제한 수정에는 무엇이 포함되나요?',
          answer: '런칭 후 7일 동안 텍스트, 이미지, 레이아웃 조정 등 모든 변경을 요청할 수 있습니다. 만족하실 때까지 합리적인 모든 수정을 구현합니다.',
        },
        {
          question: '구독을 취소할 수 있나요?',
          answer: '네, 언제든지 취소 가능합니다. 서비스는 일시정지되며 준비되면 언제든 재개할 수 있습니다. 장기 계약은 필요 없습니다.',
        },
      ],
    },
  },
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  
  if (!locales.includes(locale)) {
    notFound()
  }

  const t = content[locale]

  // Generate structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Web Design & Development Services',
    brand: {
      '@type': 'Brand',
      name: 'ZOE LUMOS',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Hobby',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free plan for personal projects and small websites. 1-3 pages, mobile responsive, basic SEO.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Plus',
        price: '99',
        priceCurrency: 'USD',
        description: 'Professional plan for growing businesses. Up to 10 pages, custom design, advanced SEO, analytics.',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2024-12-31',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '299',
        priceCurrency: 'USD',
        description: 'Complete e-commerce solution. Unlimited pages, full e-commerce setup, payment processing, CRM.',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2024-12-31',
      },
      {
        '@type': 'Offer',
        name: 'Enterprise',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: 'Custom pricing',
        },
        description: 'Custom solutions for large organizations. Dedicated support, SLA, custom integrations.',
        availability: 'https://schema.org/InStock',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
    areaServed: ['Fort Lee, NJ', 'New York City', 'Online'],
  }
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'}/${locale === 'en' ? '' : 'ko'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'en' ? 'Pricing' : '가격',
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://zoelumos.com'}/${locale === 'en' ? '' : 'ko/'}pricing`,
      },
    ],
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <PricingServer locale={locale} content={t} />
      <PricingClientWrapper locale={locale} />
      
      <Footer locale={locale} />
    </>
  )
}