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
      title: 'About Us - ZOE LUMOS | Digital Marketing Agency',
      description: 'Learn about ZOE LUMOS - Bringing Life & Light to Your Digital Presence. Professional web design and digital marketing services in Fort Lee, NJ & NYC.',
    },
    ko: {
      title: '회사 소개 - ZOE LUMOS | 디지털 마케팅 에이전시',
      description: 'ZOE LUMOS 소개 - 디지털 프레즌스에 생명과 빛을 가져다 드립니다. 포트리 NJ & NYC 전문 웹 디자인 및 디지털 마케팅 서비스.',
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

  return (
    <>
      <HeaderWrapper locale={locale} />
      <AboutClient t={t} locale={locale} />
      <Footer locale={locale} />
    </>
  )
}