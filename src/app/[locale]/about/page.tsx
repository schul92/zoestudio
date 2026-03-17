import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import AboutClient from './AboutClient'
import { seoConfig } from '@/config/seo'

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
  
  const metadata = {
    en: {
      title: 'About ZOE LUMOS | Fort Lee NJ Web Design & SEO Expert',
      description: 'ZOE LUMOS — Next.js web design for small businesses to organizations in NJ & NYC. SEO-first builds, transparent pricing, special promos running now.',
    },
    ko: {
      title: 'ZOE LUMOS 소개 | 포트리 NJ 웹디자인 & SEO 전문가',
      description: 'ZOE LUMOS — NJ & NYC 소규모 비즈니스부터 중견 기업까지 Next.js 웹사이트 제작. SEO 중심 개발, 투명한 가격, 신규 고객 프로모션 진행 중.',
    }
  }
  
  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/about` : `${baseUrl}/ko/about`,
      languages: {
        'x-default': `${baseUrl}/about`,
        'en': `${baseUrl}/about`,
        'ko': `${baseUrl}/ko/about`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/about` : `${baseUrl}/ko/about`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      alternateLocale: locale === 'ko' ? 'en_US' : 'ko_KR',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const content = {
  en: {
    hero: {
      subtitle: 'ZOE (Life) + LUMOS (Light)',
      title: 'Bringing Life & Light',
      tagline: 'to Your Digital Presence',
      description: 'Just as light brings life to darkness, we illuminate your path to digital success.',
    },
    meaning: {
      title: 'The Meaning Behind Our Name',
      zoe: {
        word: 'ZOE',
        origin: 'Greek: ζωή',
        meaning: 'Life',
        description: 'We breathe life into your business, creating vibrant digital experiences that grow and thrive.',
      },
      lumos: {
        word: 'LUMOS',
        origin: 'Latin: Light',
        meaning: 'Illumination',
        description: 'We cast light on opportunities, making your business visible in the vast digital darkness.',
      },
    },
    philosophy: {
      title: 'Our Philosophy',
      items: [
        {
          icon: '🌱',
          title: 'Growth is Life',
          description: 'Every business deserves to grow. We plant seeds of success through strategic SEO and marketing.',
        },
        {
          icon: '💡',
          title: 'Visibility is Light',
          description: 'In the darkness of the internet, we make you shine bright where customers can find you.',
        },
        {
          icon: '✨',
          title: 'Innovation Sparks',
          description: 'We combine life-giving creativity with illuminating strategy for magical results.',
        },
      ],
    },
    mission: {
      title: 'Illuminating Success Stories',
      stats: [
        { number: '∞', label: 'Possibilities', description: 'We see infinite potential' },
        { number: '24/7', label: 'Always On', description: 'Your light never dims' },
        { number: '1st', label: 'Page Rankings', description: 'Where you deserve to be' },
        { number: '100%', label: 'Dedication', description: 'To your growth' },
      ],
    },
    services: {
      title: 'How We Bring Light',
      items: [
        { title: 'SEO', description: 'Illuminate your presence on Google' },
        { title: 'Google Ads', description: 'Spotlight on your business' },
        { title: 'Web Design', description: 'Radiant digital experiences' },
        { title: 'LLC Formation', description: 'Birth of your business journey' },
      ],
    },
    founder: {
      label: 'MEET THE FOUNDER',
      name: 'Founder & Lead Developer',
      role: 'Fort Lee, NJ · Serving NJ & NYC',
      bio1: 'I started ZOE LUMOS because I saw too many small businesses with great products but invisible online presence. My background is in web performance and SEO — I build every site on Next.js, not because it\'s trendy, but because it genuinely loads faster, ranks higher, and converts better than the alternatives. That matters when your customers are searching on their phones at 11pm.',
      bio2: 'I\'ve built websites for corner restaurants, multi-location healthcare providers, nonprofit organizations, real estate teams, and e-commerce brands. Whether you\'re a solo business owner opening your first location or a growing organization ready to scale — I can build the right solution. No gatekeeping, no upselling what you don\'t need.',
      bio3: '100% transparent pricing is non-negotiable here. You see the full cost upfront — no surprise invoices, no hidden fees. And right now, I\'m running special launch promotions for new clients. Reach out and let\'s talk.',
      bio4: 'Here\'s something most agencies won\'t tell you: for e-commerce and content-driven sites, I build you a CMS — a simple dashboard where you can upload products, write posts, and manage your own content, without touching a line of code. That means you don\'t need to call me every time something needs updating. Your monthly bill goes down. Most agencies deliberately avoid doing this because recurring management fees are how they make money. I\'d rather build you something you own and control. Honest businesses grow through trust, not dependency.',
      skills: ['Next.js', 'SEO & Analytics', 'Google Ads', 'Shopify', 'Core Web Vitals', 'Bilingual Sites'],
      promoLabel: 'Current promos available',
      promoButton: 'Get in touch',
    },
    cta: {
      title: 'Ready to Shine?',
      subtitle: 'Let us bring life and light to your business',
      button: 'Illuminate My Business',
    },
  },
  ko: {
    hero: {
      subtitle: 'ZOE (생명) + LUMOS (빛)',
      title: '생명과 빛을 가져다주는',
      tagline: '당신의 디지털 존재에',
      description: '빛이 어둠에 생명을 가져다주듯, 우리는 당신의 디지털 성공으로 가는 길을 밝혀드립니다.',
    },
    meaning: {
      title: '우리 이름의 의미',
      zoe: {
        word: 'ZOE',
        origin: '그리스어: ζωή',
        meaning: '생명',
        description: '우리는 당신의 비즈니스에 생명을 불어넣어, 성장하고 번창하는 생동감 있는 디지털 경험을 창조합니다.',
      },
      lumos: {
        word: 'LUMOS',
        origin: '라틴어: 빛',
        meaning: '조명',
        description: '우리는 기회를 비추어, 광대한 디지털 어둠 속에서 당신의 비즈니스를 보이게 만듭니다.',
      },
    },
    philosophy: {
      title: '우리의 철학',
      items: [
        {
          icon: '🌱',
          title: '성장이 곧 생명',
          description: '모든 비즈니스는 성장할 자격이 있습니다. 전략적 SEO와 마케팅을 통해 성공의 씨앗을 심습니다.',
        },
        {
          icon: '💡',
          title: '가시성이 곧 빛',
          description: '인터넷의 어둠 속에서, 고객이 당신을 찾을 수 있는 곳에서 밝게 빛나게 합니다.',
        },
        {
          icon: '✨',
          title: '혁신의 불꽃',
          description: '생명을 주는 창의성과 빛나는 전략을 결합하여 마법같은 결과를 만듭니다.',
        },
      ],
    },
    mission: {
      title: '성공 스토리를 밝히다',
      stats: [
        { number: '∞', label: '가능성', description: '무한한 잠재력을 봅니다' },
        { number: '24/7', label: '항상 켜짐', description: '당신의 빛은 꺼지지 않습니다' },
        { number: '1st', label: '페이지 순위', description: '당신이 있어야 할 곳' },
        { number: '100%', label: '헌신', description: '당신의 성장을 위해' },
      ],
    },
    services: {
      title: '우리가 제공하는 서비스',
      items: [
        { title: '웹사이트 제작', description: 'NY/NJ 비즈니스를 위한 전문 홈페이지' },
        { title: '구글 광고', description: 'Google Ads로 즉시 고객 확보' },
        { title: '옐프 광고', description: 'Yelp Ads로 지역 고객 타겟팅' },
        { title: 'SEO 최적화', description: '검색 1페이지 상위 노출 보장' },
      ],
    },
    founder: {
      label: '창업자를 소개합니다',
      name: '창업자 & 수석 개발자',
      role: '포트리, NJ · NJ & NYC 서비스',
      bio1: '저는 ZOE LUMOS를 시작하게 된 이유가 있습니다. 좋은 제품과 서비스를 가진 소규모 비즈니스들이 온라인에서 보이지 않는 것을 너무 많이 봤기 때문입니다. 저는 웹 성능과 SEO 전문가로, 모든 웹사이트를 Next.js로 제작합니다. 유행을 따르는 게 아닙니다 — Next.js는 실제로 더 빠르게 로딩되고, 검색 순위가 높으며, 일반 홈페이지 제작 툴보다 전환율이 높기 때문입니다.',
      bio2: '작은 식당부터 다지점 의료기관, 비영리 단체, 부동산 팀, 이커머스 브랜드까지 다양한 업종의 웹사이트를 제작해왔습니다. 처음 사업을 시작하는 소규모 사업자부터 확장을 준비하는 중견 기업까지 — 필요에 맞는 솔루션을 제공합니다. 필요하지 않은 서비스를 억지로 팔지 않습니다.',
      bio3: '100% 투명한 가격 정책은 저의 원칙입니다. 전체 비용을 미리 확인할 수 있으며, 숨겨진 요금이 없습니다. 지금 신규 고객을 위한 특별 프로모션을 진행 중입니다. 연락 주세요.',
      bio4: '대부분의 웹 에이전시들이 절대 알려주지 않는 사실이 있습니다. 이커머스나 콘텐츠 중심 사이트의 경우, 저는 직접 관리할 수 있는 CMS 시스템을 함께 구축해 드립니다. 코드 한 줄 몰라도 상품을 올리고, 글을 쓰고, 콘텐츠를 직접 관리할 수 있는 대시보드입니다. 업데이트가 필요할 때마다 저에게 연락할 필요가 없습니다. 월 유지비가 줄어듭니다. 대부분의 에이전시들이 이걸 일부러 안 해주는 이유가 있습니다. 월 관리 수수료가 그들의 수익 모델이기 때문입니다. 저는 고객이 직접 소유하고 운영할 수 있는 것을 만들어 드리고 싶습니다. 신뢰로 성장하는 비즈니스가 진짜라고 믿기 때문입니다.',
      skills: ['Next.js', 'SEO & 분석', '구글 광고', 'Shopify', '코어 웹 바이탈', '이중언어 사이트'],
      promoLabel: '현재 프로모션 진행 중',
      promoButton: '문의하기',
    },
    cta: {
      title: '빛날 준비가 되셨나요?',
      subtitle: '당신의 비즈니스에 생명과 빛을 가져다드립니다',
      button: '내 비즈니스 밝히기',
    },
  },
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    jobTitle: 'Founder & Lead Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'ZOE LUMOS',
      url: baseUrl,
    },
    knowsAbout: ['Web Design', 'SEO', 'Next.js', 'Google Ads', 'Shopify', 'Core Web Vitals', 'Bilingual Websites'],
    url: `${baseUrl}/${locale === 'ko' ? 'ko/' : ''}about`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Fort Lee',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutClient t={t} locale={locale} />
      <Footer locale={locale} />
    </>
  )
}