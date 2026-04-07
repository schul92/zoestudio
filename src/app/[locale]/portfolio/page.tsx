import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import PortfolioClient from './PortfolioClient'

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
      title: 'Our Work - Portfolio | ZOE LUMOS',
      description: 'Explore our portfolio of successful website designs and digital marketing projects. See real results from businesses we\'ve helped grow in NY and NJ.',
    },
    ko: {
      title: '포트폴리오 - 제작 사례 | ZOE LUMOS',
      description: '저희가 제작한 웹사이트와 디지털 마케팅 프로젝트를 확인하세요. 뉴욕, 뉴저지 비즈니스의 실제 성공 사례를 보여드립니다.',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/portfolio` : `${baseUrl}/ko/portfolio`,
      languages: {
        'x-default': `${baseUrl}/portfolio`,
        'en': `${baseUrl}/portfolio`,
        'ko': `${baseUrl}/ko/portfolio`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/portfolio` : `${baseUrl}/ko/portfolio`,
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

const projects = [
  {
    id: 'tj-flowers',
    url: 'https://tjflowersandevents.com/',
    image: '/portfolio/tj-flowers.jpg',
    en: {
      title: 'TJ Flowers & Events',
      category: 'Flower Shop / E-Commerce',
      description: 'Full Shopify e-commerce build for TJ Flower Shop, a beloved NJ flower shop since 1988. Featuring 66+ orchid varieties, same-day NYC delivery, wedding & event services, and subscription plans.',
      services: ['Shopify Development', 'E-Commerce Design', 'SEO Optimization', 'Product Photography'],
    },
    ko: {
      title: 'TJ Flowers & Events',
      category: '꽃집 / 이커머스',
      description: '1988년부터 운영된 NJ 꽃집 TJ Flower Shop의 Shopify 쇼핑몰 구축. 66종 이상의 난초, 당일 NYC 배달, 웨딩 & 이벤트 서비스, 정기 구독 플랜 제공.',
      services: ['Shopify 개발', '이커머스 디자인', 'SEO 최적화', '상품 사진 촬영'],
    },
  },
  {
    id: 'carek9',
    url: 'https://carek9.com/',
    image: '/portfolio/carek9.jpg',
    en: {
      title: 'CareK9',
      category: 'Pet Products / E-Commerce',
      description: 'Shopify e-commerce store for CareK9, a premium natural dog treat and paw care brand. Features product collections, a Care Magazine blog, and integrated payment processing with free shipping tiers.',
      services: ['Shopify Development', 'E-Commerce Design', 'SEO Optimization', 'Brand Identity'],
    },
    ko: {
      title: 'CareK9',
      category: '반려동물 용품 / 이커머스',
      description: '프리미엄 천연 강아지 간식 & 발 관리 브랜드 CareK9의 Shopify 쇼핑몰 구축. 상품 컬렉션, Care Magazine 블로그, 결제 시스템 및 무료 배송 기능 포함.',
      services: ['Shopify 개발', '이커머스 디자인', 'SEO 최적화', '브랜드 아이덴티티'],
    },
  },
  {
    id: 'kona-coffee',
    url: 'https://konacoffeedonut.com/',
    image: '/portfolio/kona-coffee.jpg',
    en: {
      title: 'Kona Coffee & Donut',
      category: 'Restaurant / Cafe',
      description: 'A beautiful website for a local coffee and donut shop featuring an elegant design, online menu, and location information.',
      services: ['Website Design', 'SEO Optimization', 'Mobile Responsive'],
    },
    ko: {
      title: 'Kona Coffee & Donut',
      category: '레스토랑 / 카페',
      description: '지역 커피 & 도넛 전문점을 위한 세련된 웹사이트. 온라인 메뉴, 매장 위치 정보 등을 포함한 아름다운 디자인.',
      services: ['웹사이트 디자인', 'SEO 최적화', '모바일 반응형'],
    },
  },
  {
    id: 'mochinut',
    url: 'https://www.mochinutnynj.com/',
    image: '/portfolio/mochinut.jpg',
    en: {
      title: 'Mochinut NY/NJ',
      category: 'Food & Beverage',
      description: 'Modern website for the popular Mochinut franchise locations in New York and New Jersey, featuring menu showcase and store locations.',
      services: ['Website Design', 'Multi-location Setup', 'Brand Integration'],
    },
    ko: {
      title: 'Mochinut NY/NJ',
      category: '식음료',
      description: '뉴욕과 뉴저지의 인기 모찌넛 프랜차이즈 매장을 위한 모던한 웹사이트. 메뉴 소개 및 매장 위치 정보 제공.',
      services: ['웹사이트 디자인', '다중 매장 설정', '브랜드 통합'],
    },
  },
  {
    id: 'salt-polish',
    url: 'https://saltpolish.com/',
    image: '/portfolio/salt-polish.jpg',
    en: {
      title: 'Salt & Polish Nail Bar',
      category: 'Beauty / Nail Salon',
      description: 'Elegant website for a non-toxic, vegan nail salon in Waltham, MA. Features service menus, gallery, FAQ section, and a clean design reflecting the brand\'s commitment to health-conscious beauty.',
      services: ['Website Design', 'SEO Optimization', 'Mobile Responsive', 'Brand Identity'],
    },
    ko: {
      title: 'Salt & Polish Nail Bar',
      category: '뷰티 / 네일 살롱',
      description: 'MA 월섬에 위치한 비건·무독성 네일 살롱을 위한 세련된 웹사이트. 서비스 메뉴, 갤러리, FAQ 섹션과 건강을 중시하는 브랜드 철학을 반영한 클린 디자인.',
      services: ['웹사이트 디자인', 'SEO 최적화', '모바일 반응형', '브랜드 아이덴티티'],
    },
  },
]

const content = {
  en: {
    hero: {
      subtitle: 'Our Work',
      title: 'Portfolio',
      description: 'Real projects. Real results. See how we\'ve helped businesses like yours succeed online.',
    },
    viewSite: 'Visit Website',
    servicesLabel: 'Services Provided',
    cta: {
      title: 'Ready to Start Your Project?',
      description: 'Let us create a stunning website that drives results for your business.',
      button: 'Get Free Quote',
    },
  },
  ko: {
    hero: {
      subtitle: '제작 사례',
      title: '포트폴리오',
      description: '실제 프로젝트, 실제 결과. 저희가 어떻게 비즈니스의 온라인 성공을 도왔는지 확인하세요.',
    },
    viewSite: '웹사이트 방문',
    servicesLabel: '제공된 서비스',
    cta: {
      title: '프로젝트를 시작할 준비가 되셨나요?',
      description: '비즈니스 성과를 이끌어내는 멋진 웹사이트를 만들어 드립니다.',
      button: '무료 견적 받기',
    },
  },
}

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]
  const localizedProjects = projects.map(project => ({
    ...project,
    ...project[locale],
  }))

  return (
    <>
      <HeaderWrapper locale={locale} />
      <PortfolioClient t={t} projects={localizedProjects} locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
