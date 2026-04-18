import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import BlogListing from '@/components/blog/BlogListing'

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
      title: 'Digital Marketing Blog - ZOE LUMOS | SEO, Google Ads & Web Design Tips',
      description: 'Expert digital marketing insights, SEO tips, Google Ads strategies, and web design best practices. Learn how to grow your business online with ZOE LUMOS.',
      keywords: 'digital marketing blog, SEO tips, Google Ads tips, web design tips, small business marketing, local SEO guide, e-commerce tips',
    },
    ko: {
      title: '디지털 마케팅 블로그 - ZOE LUMOS | SEO, 구글 광고 & 웹 디자인 팁',
      description: '전문 디지털 마케팅 인사이트, SEO 팁, 구글 광고 전략, 웹 디자인 모범 사례. ZOE LUMOS와 함께 온라인 비즈니스 성장 방법을 배워보세요.',
      keywords: '디지털 마케팅 블로그, SEO 팁, 구글 광고 팁, 웹 디자인 팁, 소규모 비즈니스 마케팅, 로컬 SEO 가이드, 이커머스 팁',
    }
  }

  return {
    title: metadata[locale].title,
    description: metadata[locale].description,
    keywords: metadata[locale].keywords,
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/blog` : `${baseUrl}/ko/blog`,
      languages: {
        'x-default': `${baseUrl}/blog`,
        'en': `${baseUrl}/blog`,
        'ko': `${baseUrl}/ko/blog`,
      },
    },
    openGraph: {
      title: metadata[locale].title,
      description: metadata[locale].description,
      url: locale === 'en' ? `${baseUrl}/blog` : `${baseUrl}/ko/blog`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Blog posts data (can be moved to a separate file or CMS later)
const blogPosts = [
  {
    id: 1,
    slug: 'korean-business-website-guide-2026',
    date: '2026-03-01',
    readTime: 10,
    category: {
      en: 'Web Design',
      ko: '웹 디자인'
    },
    title: {
      en: '2026 Guide: Building a Website for Korean-American Businesses',
      ko: '2026년 미국 한인 비즈니스 웹사이트 제작 완벽 가이드'
    },
    excerpt: {
      en: 'Everything Korean-American business owners need to know about building a bilingual website in 2026. From NJ to CA, TX to GA.',
      ko: 'NJ, NY, CA, TX, GA 등 미국 전역 한인 사업주를 위한 이중언어 웹사이트 제작 가이드. 비용, 기간, 필수 기능 총정리.'
    },
    image: '/blog/korean-business-website.jpg'
  },
  {
    id: 2,
    slug: 'local-seo-korean-business-2026',
    date: '2026-02-20',
    readTime: 8,
    category: {
      en: 'SEO',
      ko: 'SEO'
    },
    title: {
      en: 'Local SEO for Korean Businesses: NJ, NY, CA, TX & Beyond',
      ko: '한인 비즈니스 로컬 SEO 가이드: 뉴저지, 뉴욕, 캘리포니아, 텍사스'
    },
    excerpt: {
      en: 'How Korean-American businesses can dominate local Google search in their city. Proven strategies for Fort Lee, Flushing, LA Koreatown, and more.',
      ko: '포트리, 플러싱, LA 코리아타운, 애틀랜타 등 한인 밀집 지역에서 구글 상위 노출하는 방법. 실전 SEO 전략.'
    },
    image: '/blog/local-seo.jpg'
  },
  {
    id: 3,
    slug: 'google-ads-korean-business',
    date: '2026-02-10',
    readTime: 6,
    category: {
      en: 'Google Ads',
      ko: '구글 광고'
    },
    title: {
      en: 'Google Ads for Korean Businesses: Stop Wasting Money',
      ko: '한인 비즈니스 구글 광고: 돈 낭비 없는 광고 전략'
    },
    excerpt: {
      en: 'Korean-American business owners: avoid these 7 Google Ads mistakes. Bilingual ad strategies that actually convert.',
      ko: '한인 사업주가 흔히 하는 구글 광고 7가지 실수. 한영 이중언어 광고로 실제 고객 전환하는 전략.'
    },
    image: '/blog/google-ads.jpg'
  },
  {
    id: 4,
    slug: 'shopify-korean-ecommerce',
    date: '2026-01-28',
    readTime: 10,
    category: {
      en: 'E-commerce',
      ko: '이커머스'
    },
    title: {
      en: 'Shopify for Korean Businesses: Complete Setup Guide',
      ko: '한인 비즈니스 Shopify 쇼핑몰 제작 완벽 가이드'
    },
    excerpt: {
      en: 'Set up a Shopify store for your Korean-American business. Korean payment options, bilingual product pages, and SEO tips.',
      ko: '미국 한인 사업주를 위한 Shopify 쇼핑몰 구축 가이드. 한국어 상품 페이지, 결제 시스템, SEO 최적화 총정리.'
    },
    image: '/blog/shopify-seo.jpg'
  },
  {
    id: 5,
    slug: 'nj-ny-website-cost-2026',
    date: '2026-01-15',
    readTime: 7,
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'How Much Does a Website Cost in 2026? (NJ/NY/CA/TX)', ko: '2026년 웹사이트 제작 비용 총정리 (뉴저지/뉴욕/캘리포니아/텍사스)' },
    excerpt: { en: 'Transparent pricing guide for website design in 2026. Compare costs across NJ, NY, California, Texas, and nationwide.', ko: '2026년 미국 한인 웹사이트 제작 비용 비교. 뉴저지, 뉴욕, 캘리포니아, 텍사스 지역별 가격 안내.' },
    image: '/blog/website-cost.jpg'
  },
  {
    id: 6,
    slug: 'do-i-need-a-website-korean-business',
    date: '2026-04-15',
    readTime: 9,
    category: { en: 'Foundations', ko: '기초 가이드' },
    title: { en: 'Do Korean-American Businesses Actually Need a Website in 2026?', ko: '2026년, 미국 한인 비즈니스에 정말 웹사이트가 필요할까요?' },
    excerpt: { en: 'An honest look at whether your Korean-American business needs a website in 2026, or if Instagram, KakaoTalk, and Google Business Profile are enough.', ko: '인스타그램, 카카오톡, 구글 비즈니스 프로필만 있으면 되는 시대에 과연 한인 비즈니스에 웹사이트가 필요한지 솔직하게 분석합니다.' },
    image: '/blog/need-website.jpg'
  },
  {
    id: 7,
    slug: 'website-cost-hidden-fees-usa',
    date: '2026-04-14',
    readTime: 8,
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'The Real Cost of a Website in 2026 — A Korean-American Business Owner\'s Guide to Hidden Fees', ko: '2026년 웹사이트의 진짜 비용 — 한인 사업주를 위한 숨은 비용 완벽 가이드' },
    excerpt: { en: 'What a website actually costs in 2026 beyond the sticker price. Hidden fees, 3-year total cost of ownership, and red flags to avoid.', ko: '2026년 웹사이트의 표면 가격 너머 진짜 비용. 숨은 수수료, 3년 총 소유 비용, 피해야 할 위험 신호 총정리.' },
    image: '/blog/hidden-fees.jpg'
  },
  {
    id: 8,
    slug: 'korean-restaurant-website-essentials',
    date: '2026-04-13',
    readTime: 10,
    category: { en: 'Industry Guide', ko: '업종별 가이드' },
    title: { en: '11 Essentials Every Korean Restaurant Website Needs in 2026', ko: '2026년 한식당 웹사이트에 꼭 필요한 11가지' },
    excerpt: { en: 'From bilingual menus to KakaoTalk integration — the 11 must-have features every Korean restaurant website needs to convert visitors into diners.', ko: '이중언어 메뉴부터 카카오톡 연동까지 — 방문자를 실제 고객으로 전환시키는 한식당 웹사이트 필수 11가지 요소.' },
    image: '/blog/korean-restaurant.jpg'
  },
  {
    id: 9,
    slug: 'naver-vs-google-korean-business-usa',
    date: '2026-04-12',
    readTime: 7,
    category: { en: 'SEO', ko: 'SEO' },
    title: { en: 'Naver vs Google: Where Should Your US-Based Korean Business Actually Rank?', ko: '네이버 vs 구글: 미국 한인 비즈니스는 어디에 랭크해야 할까?' },
    excerpt: { en: 'Most Korean-Americans in the US search on Google, not Naver. An honest breakdown of where to invest your SEO budget for a US-based Korean business.', ko: '미국의 한인들은 대부분 네이버가 아닌 구글을 사용합니다. 미국 한인 비즈니스가 SEO 예산을 어디에 투자해야 하는지 솔직하게 분석합니다.' },
    image: '/blog/naver-vs-google.jpg'
  },
  {
    id: 10,
    slug: 'kakaotalk-channel-us-korean-business',
    date: '2026-04-11',
    readTime: 7,
    category: { en: 'Marketing', ko: '마케팅' },
    title: { en: 'How to Use KakaoTalk Channel for a US-Based Korean Business (2026 Guide)', ko: '미국 한인 비즈니스를 위한 카카오톡 채널 활용 가이드 (2026년 완벽판)' },
    excerpt: { en: 'A step-by-step guide to setting up and using KakaoTalk Channel from the US for your Korean-American business — customer service, marketing, and retention.', ko: '미국에서 한인 비즈니스용 카카오톡 채널을 설정하고 활용하는 단계별 가이드 — 고객 응대, 마케팅, 재방문 유도까지.' },
    image: '/blog/kakaotalk.jpg'
  },
  {
    id: 11,
    slug: 'case-study-korean-nail-salon-seo-10x',
    date: '2026-04-10',
    readTime: 9,
    category: { en: 'Case Study', ko: '사례 연구' },
    title: { en: 'Case Study: How We 10×\'d a Korean Nail Salon\'s Organic Traffic in 6 Months', ko: '사례 연구: 한인 네일샵의 유입 트래픽을 6개월 만에 10배로 만든 방법' },
    excerpt: { en: 'A step-by-step case study of how ZOE LUMOS grew a North Bergen Korean nail salon\'s organic Google traffic from 40 to 430 monthly visits in 6 months.', ko: 'North Bergen 한인 네일샵의 월 유입을 6개월 만에 40명에서 430명으로 늘린 ZOE LUMOS의 단계별 사례 연구.' },
    image: '/blog/nail-salon-case.jpg'
  },
  {
    id: 12,
    slug: 'bilingual-seo-technical-guide-hreflang',
    date: '2026-04-09',
    readTime: 11,
    category: { en: 'Technical SEO', ko: '기술 SEO' },
    title: { en: 'The Technical Bilingual SEO Playbook — hreflang, Canonicals, and Language-Aware Architecture', ko: '이중언어 SEO 기술 플레이북 — hreflang, 캐노니컬, 언어 인식 아키텍처' },
    excerpt: { en: 'A developer-friendly, honest guide to implementing bilingual Korean-English SEO correctly. hreflang, canonicals, URL structure, and common mistakes.', ko: '이중언어 한영 SEO를 올바르게 구현하는 개발자 친화적 가이드. hreflang, 캐노니컬, URL 구조, 흔한 실수들.' },
    image: '/blog/hreflang-seo.jpg'
  },
  {
    id: 13,
    slug: 'wordpress-to-nextjs-korean-business-migration',
    date: '2026-04-08',
    readTime: 10,
    category: { en: 'Technical', ko: '기술' },
    title: { en: 'Migrating from WordPress to Next.js — A Korean Business Case Study', ko: '워드프레스에서 Next.js로 — 한인 비즈니스 마이그레이션 사례' },
    excerpt: { en: 'A honest walkthrough of migrating a Korean-American business website from WordPress to Next.js — decisions, risks, metrics, and when NOT to migrate.', ko: '한인 비즈니스 웹사이트를 워드프레스에서 Next.js로 마이그레이션하는 솔직한 가이드 — 결정, 리스크, 지표, 그리고 마이그레이션하지 말아야 할 때.' },
    image: '/blog/wordpress-nextjs.jpg'
  },
  // Phase 2 — Industry cluster
  { id: 14, slug: 'korean-nail-salon-website-guide', date: '2026-04-17', readTime: 9, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'The Ultimate Korean Nail Salon Website Guide', ko: '한인 네일샵 웹사이트 완벽 가이드' }, excerpt: { en: 'How to build a Korean nail salon website that books appointments 24/7. Online booking, before/after galleries, review management.', ko: '24시간 예약 가능한 한인 네일샵 웹사이트 만드는 법. 온라인 예약, 비포/애프터 갤러리, 리뷰 관리.' }, image: '/blog/korean-nail-salon-website-guide.png' },
  { id: 15, slug: 'korean-dental-practice-website-guide', date: '2026-04-17', readTime: 9, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Dental Practice Website Guide', ko: '한인 치과 웹사이트 가이드' }, excerpt: { en: 'Build a HIPAA-compliant Korean dental practice website that acquires patients. Bilingual content, insurance info, online scheduling.', ko: 'HIPAA 준수 한인 치과 웹사이트 구축법. 이중언어, 보험 정보, 온라인 예약.' }, image: '/blog/korean-dental-practice-website-guide.png' },
  { id: 16, slug: 'korean-law-firm-website-guide', date: '2026-04-17', readTime: 9, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Law Firm Website Guide', ko: '한인 로펌 웹사이트 가이드' }, excerpt: { en: 'How to build a Korean law firm website that generates qualified leads. Practice areas, attorney bios, client trust signals.', ko: '자격 있는 리드를 생성하는 한인 로펌 웹사이트 만드는 법. 전문 분야, 변호사 프로필, 신뢰 신호.' }, image: '/blog/korean-law-firm-website-guide.png' },
  { id: 17, slug: 'korean-real-estate-agent-website', date: '2026-04-17', readTime: 8, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Real Estate Agent Website Guide', ko: '한인 부동산 에이전트 웹사이트 가이드' }, excerpt: { en: 'Build a Korean real estate agent website with IDX/MLS integration, bilingual property searches, and Korean buyer trust signals.', ko: 'IDX/MLS 연동, 이중언어 매물 검색, 한인 바이어 신뢰를 갖춘 한인 부동산 웹사이트.' }, image: '/blog/korean-real-estate-agent-website.png' },
  { id: 18, slug: 'korean-church-website-guide', date: '2026-04-17', readTime: 7, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Church Website Guide', ko: '한인 교회 웹사이트 가이드' }, excerpt: { en: 'A practical guide to building a Korean church website: sermon archives, event registration, online giving, and bilingual content.', ko: '한인 교회 웹사이트 구축 실전 가이드: 설교 아카이브, 행사 등록, 온라인 헌금.' }, image: '/blog/korean-church-website-guide.png' },
  { id: 19, slug: 'korean-tutoring-sat-prep-website', date: '2026-04-17', readTime: 7, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Tutoring & SAT Prep Website Guide', ko: '한인 학원 & SAT 웹사이트 가이드' }, excerpt: { en: 'Build a Korean tutoring or SAT prep website that parents trust: student results, instructor bios, online enrollment.', ko: '학부모가 신뢰하는 한인 학원/SAT 웹사이트 구축법: 학생 성과, 강사 소개, 온라인 등록.' }, image: '/blog/korean-tutoring-sat-prep-website.png' },
  { id: 20, slug: 'korean-medspa-aesthetic-clinic-website', date: '2026-04-17', readTime: 8, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Med Spa & Aesthetic Clinic Website Guide', ko: '한인 메디스파 & 피부과 웹사이트 가이드' }, excerpt: { en: 'Build a Korean med spa website that books consultations: before/after galleries, treatment pages, online booking.', ko: '상담 예약을 만드는 한인 메디스파 웹사이트 구축법: 비포/애프터 갤러리, 시술 페이지.' }, image: '/blog/korean-medspa-aesthetic-clinic-website.png' },
  { id: 21, slug: 'korean-hair-salon-website-guide', date: '2026-04-17', readTime: 7, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Hair Salon Website Guide', ko: '한인 헤어살롱 웹사이트 가이드' }, excerpt: { en: 'Build a Korean hair salon website that shows K-style authority: stylist portfolios, online booking, pricing.', ko: 'K-스타일 전문성을 보여주는 한인 헤어살롱 웹사이트: 디자이너 포트폴리오, 예약.' }, image: '/blog/korean-hair-salon-website-guide.png' },
  { id: 22, slug: 'korean-insurance-financial-services-website', date: '2026-04-17', readTime: 8, category: { en: 'Industry Guide', ko: '업종별 가이드' }, title: { en: 'Korean Insurance & Financial Services Website Guide', ko: '한인 보험 & 금융 서비스 웹사이트 가이드' }, excerpt: { en: 'Build a Korean insurance or financial services website that generates qualified leads while meeting compliance standards.', ko: '규정을 준수하면서 자격 있는 리드를 생성하는 한인 보험/금융 서비스 웹사이트 구축법.' }, image: '/blog/korean-insurance-financial-services-website.png' },
]

// Blog Schema
function generateBlogSchema(locale: 'en' | 'ko') {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": locale === 'en' ? 'ZOE LUMOS Digital Marketing Blog' : 'ZOE LUMOS 디지털 마케팅 블로그',
    "description": locale === 'en'
      ? 'Expert digital marketing insights, SEO tips, and web design best practices'
      : '전문 디지털 마케팅 인사이트, SEO 팁, 웹 디자인 모범 사례',
    "url": `https://www.zoelumos.com${locale === 'ko' ? '/ko' : ''}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ZOE LUMOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.zoelumos.com/favicon.svg"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[locale],
      "description": post.excerpt[locale],
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "ZOE LUMOS"
      }
    }))
  }
}

const content = {
  en: {
    title: 'Blog',
    subtitle: 'Digital Marketing Insights',
    description: 'Tips, strategies, and best practices to grow your Korean-American business online',
    readMore: 'Read',
    minRead: 'min read',
    featured: 'Featured',
    all: 'All',
    searchPlaceholder: 'Search articles...',
    noResults: 'No articles match your filter.',
  },
  ko: {
    title: '블로그',
    subtitle: '디지털 마케팅 인사이트',
    description: '한인 비즈니스 온라인 성장을 위한 팁, 전략, 모범 사례',
    readMore: '읽기',
    minRead: '분',
    featured: '추천',
    all: '전체',
    searchPlaceholder: '검색...',
    noResults: '검색 결과가 없습니다.',
  },
}

// Map each blog post slug to its generated hero image
const postsWithImages = blogPosts.map((p) => ({ ...p, image: `/blog/${p.slug}.png` }))

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema(locale)) }}
      />
      <BlogListing posts={postsWithImages} locale={locale} content={t} />
      <Footer locale={locale} />
    </>
  )
}
