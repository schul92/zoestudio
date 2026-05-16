import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import BlogListing from '@/components/blog/BlogListing'
import { blogContent } from '@/data/blogContent'
import fs from 'fs'
import path from 'path'

// Build-time check: which blog slugs have a static PNG on disk vs. need
// the dynamic /api/og fallback. Runs once at SSG time, zero runtime cost.
const BLOG_IMG_DIR = path.join(process.cwd(), 'public', 'blog')
const STATIC_BLOG_IMAGES: Set<string> = (() => {
  try {
    return new Set(
      fs.readdirSync(BLOG_IMG_DIR)
        .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .map((f) => f.replace(/\.[^.]+$/, ''))
    )
  } catch {
    return new Set<string>()
  }
})()

function blogImageUrl(slug: string, title: string): string {
  if (STATIC_BLOG_IMAGES.has(slug)) return `/blog/${slug}.png`
  const encodedTitle = encodeURIComponent(title.slice(0, 60))
  return `/api/og?title=${encodedTitle}&subtitle=Zoe+Lumos+%C2%B7+Korean+Web+%26+SEO`
}

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
    id: 100,
    slug: 'korean-restaurant-own-app-vs-doordash',
    date: '2026-05-07',
    readTime: 7,
    category: { en: 'App Development', ko: '앱 개발' },
    title: { en: 'Korean Restaurant Own App vs DoorDash: $14K App Pays Back in 4 Months', ko: '한식당 자체 앱 vs 도어대시 — $14,000 앱이 4개월 만에 본전 뽑는 이유' },
    excerpt: { en: 'DoorDash takes 30%. At $20K/mo delivery that is $72K/yr lost. A $14K own-app pays back in 4 months if you migrate 40% of repeat orders. Honest math.', ko: '도어대시 수수료 30% — 월 $20,000 배달 매출이면 연 $72,000 손실. $14,000짜리 자체 앱은 재주문의 40%만 옮겨도 4개월이면 본전. 솔직한 계산.' },
    image: '/blog/korean-restaurant-own-app-vs-doordash.png'
  },
  {
    id: 101,
    slug: 'pwa-vs-native-app-korean-smb',
    date: '2026-05-07',
    readTime: 6,
    category: { en: 'App Development', ko: '앱 개발' },
    title: { en: 'PWA vs Native App: When $4K Is Enough vs When You Need $15K', ko: 'PWA vs 네이티브 앱: $4,000으로 충분한 경우 vs $15,000이 필요한 경우' },
    excerpt: { en: 'Skip the $15K native app if a $4K PWA is enough. Decision framework for Korean SMBs: when web-based works, when iOS push and App Store visibility require native.', ko: '$4,000짜리 PWA로 충분하면 $15,000짜리 네이티브 앱은 건너뛰세요. 한인 소상공업 의사결정 가이드 — 웹 기반이 통할 때, iOS 푸시와 앱스토어 노출이 필요해서 네이티브가 필수인 때.' },
    image: '/blog/pwa-vs-native-app-korean-smb.png'
  },
  {
    id: 102,
    slug: 'app-store-submission-korean-business-guide',
    date: '2026-05-07',
    readTime: 8,
    category: { en: 'App Development', ko: '앱 개발' },
    title: { en: 'App Store Submission for Korean SMBs: Apple Developer, DUNS, and the Guideline 4.3 Trap', ko: '한인 사장님을 위한 앱스토어 등록 — Apple Developer·DUNS·Guideline 4.3 함정' },
    excerpt: { en: 'Apple Developer enrollment ($99/yr), DUNS for LLCs, App Privacy nutrition labels, and the Guideline 4.3 rejection that kills cheap "app builder" services. Real mechanics for Korean small business owners shipping their first app.', ko: 'Apple Developer 가입 ($99/년), LLC를 위한 DUNS, App Privacy 라벨, 그리고 저가 "앱 빌더" 서비스를 죽이는 Guideline 4.3 거절 — 첫 앱을 출시하는 한인 사장님을 위한 실제 메커니즘.' },
    image: '/blog/app-store-submission-korean-business-guide.png'
  },
  {
    id: 0,
    slug: 'tj-flowers-shopify-revamp-case-study',
    date: '2026-05-06',
    readTime: 7,
    category: {
      en: 'Case Study',
      ko: '케이스 스터디'
    },
    title: {
      en: 'Manhattan Florist Case Study: $0 → $3,114 in 4 Weeks [2026]',
      ko: '맨해튼 플라워샵 케이스 스터디: 4주 만에 $0 → $3,114 [2026]'
    },
    excerpt: {
      en: 'Manhattan florist launched a new Shopify site April 10, 2026. Four weeks later: $3,114 in real online sales, 68% from Google organic search, 38% returning customer rate (industry avg 15-20%), and $277 from ChatGPT. Bot traffic and migration imports excluded. Honest numbers, what we changed, and what it means for any Korean-American small business.',
      ko: '맨해튼 플라워샵이 2026년 4월 10일 새 Shopify 사이트 런칭. 4주 후 — 진짜 온라인 매출 $3,114, 그중 68%가 구글 자연검색에서, 재구매율 38% (업계 평균 15-20%), $277은 ChatGPT에서. 봇 트래픽과 마이그레이션 임포트 제외한 정직한 숫자. 우리가 바꾼 것, 그리고 한인 스몰비즈니스에게 의미하는 바.'
    },
    image: '/blog/tj-flowers-shopify-revamp-case-study.png'
  },
  {
    id: 1,
    slug: 'why-anthropic-chose-aws',
    date: '2026-04-22',
    readTime: 9,
    category: {
      en: 'Architecture',
      ko: '아키텍처'
    },
    title: {
      en: 'Why Anthropic Built Claude on AWS (And What Small Businesses Can Learn)',
      ko: '앤트로픽은 왜 Claude를 AWS 위에 올렸나 — 그리고 소규모 비즈니스가 배울 점'
    },
    excerpt: {
      en: 'The $8B bet, Trainium2 chips, Project Rainier, and the quiet lesson hiding inside all of it: the smartest companies don\'t build infrastructure — they pick the right partner.',
      ko: '80억 달러의 베팅, Trainium2 칩, 프로젝트 레이니어, 그리고 이 모든 것에 숨겨진 조용한 교훈 — 가장 똑똑한 회사들은 인프라를 직접 짓지 않는다. 올바른 파트너를 고른다.'
    },
    image: '/blog/why-anthropic-chose-aws.png'
  },
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
    image: '/blog/korean-business-website-guide-2026.png'
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
    image: '/blog/local-seo-guide-korean-business-2026.png'
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
    image: '/blog/google-ads-korean-business.png'
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
      en: 'Shopify for Korean Sellers in the US: 5 Setup Wins [2026]',
      ko: '미국 한인 셀러를 위한 Shopify 구축 5단계 [2026]'
    },
    excerpt: {
      en: 'Launch a Korean-language Shopify store in the US: payment gateways, hangul fonts, Naver Shopping feed, and KRW/USD pricing — set up in one day.',
      ko: '미국에서 한국어 Shopify 쇼핑몰 구축 — 결제 연동, 한글 폰트, 네이버 쇼핑 피드, 원/달러 가격 표기까지 하루 만에 완료하는 방법.'
    },
    image: '/blog/shopify-korean-ecommerce.png'
  },
  {
    id: 5,
    slug: 'nj-ny-website-cost-2026',
    date: '2026-01-15',
    readTime: 7,
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'How Much Does a Website Cost in 2026? (NJ/NY/CA/TX)', ko: '2026년 웹사이트 제작 비용 총정리 (뉴저지/뉴욕/캘리포니아/텍사스)' },
    excerpt: { en: 'Transparent pricing guide for website design in 2026. Compare costs across NJ, NY, California, Texas, and nationwide.', ko: '2026년 미국 한인 웹사이트 제작 비용 비교. 뉴저지, 뉴욕, 캘리포니아, 텍사스 지역별 가격 안내.' },
    image: '/blog/nj-ny-website-cost-2026.png'
  },
  {
    id: 6,
    slug: 'do-i-need-a-website-korean-business',
    date: '2026-04-15',
    readTime: 9,
    category: { en: 'Foundations', ko: '기초 가이드' },
    title: { en: '7 Signs Your Korean Business Loses Sales Without a Website', ko: '한인 비즈니스가 웹사이트 없이 매출을 잃는 7가지 신호' },
    excerpt: { en: 'Instagram and Naver alone cost Korean-American businesses ~30% of new customers. Here is when a website pays for itself — and when it does not.', ko: '인스타그램과 네이버만으로 운영하면 한인 비즈니스는 신규 고객의 약 30%를 잃습니다. 웹사이트가 비용을 회수하는 시점과 회수하지 못하는 경우를 솔직하게 분석합니다.' },
    image: '/blog/do-i-need-a-website-korean-business.png'
  },
  {
    id: 7,
    slug: 'website-cost-hidden-fees-usa',
    date: '2026-04-14',
    readTime: 8,
    category: { en: 'Pricing', ko: '비용 안내' },
    title: { en: 'The Real Cost of a Website in 2026 — A Korean-American Business Owner\'s Guide to Hidden Fees', ko: '2026년 웹사이트의 진짜 비용 — 한인 사업주를 위한 숨은 비용 완벽 가이드' },
    excerpt: { en: 'What a website actually costs in 2026 beyond the sticker price. Hidden fees, 3-year total cost of ownership, and red flags to avoid.', ko: '2026년 웹사이트의 표면 가격 너머 진짜 비용. 숨은 수수료, 3년 총 소유 비용, 피해야 할 위험 신호 총정리.' },
    image: '/blog/website-cost-hidden-fees-usa.png'
  },
  {
    id: 8,
    slug: 'korean-restaurant-website-essentials',
    date: '2026-04-13',
    readTime: 10,
    category: { en: 'Industry Guide', ko: '업종별 가이드' },
    title: { en: '11 Essentials Every Korean Restaurant Website Needs in 2026', ko: '2026년 한식당 웹사이트에 꼭 필요한 11가지' },
    excerpt: { en: 'From bilingual menus to KakaoTalk integration — the 11 must-have features every Korean restaurant website needs to convert visitors into diners.', ko: '이중언어 메뉴부터 카카오톡 연동까지 — 방문자를 실제 고객으로 전환시키는 한식당 웹사이트 필수 11가지 요소.' },
    image: '/blog/korean-restaurant-website-essentials.png'
  },
  {
    id: 9,
    slug: 'naver-vs-google-korean-business-usa',
    date: '2026-04-12',
    readTime: 7,
    category: { en: 'SEO', ko: 'SEO' },
    title: { en: 'Naver vs Google: Where Should Your US-Based Korean Business Actually Rank?', ko: '네이버 vs 구글: 미국 한인 비즈니스는 어디에 랭크해야 할까?' },
    excerpt: { en: 'Most Korean-Americans in the US search on Google, not Naver. An honest breakdown of where to invest your SEO budget for a US-based Korean business.', ko: '미국의 한인들은 대부분 네이버가 아닌 구글을 사용합니다. 미국 한인 비즈니스가 SEO 예산을 어디에 투자해야 하는지 솔직하게 분석합니다.' },
    image: '/blog/naver-vs-google-korean-business-usa.png'
  },
  {
    id: 10,
    slug: 'kakaotalk-channel-us-korean-business',
    date: '2026-04-11',
    readTime: 7,
    category: { en: 'Marketing', ko: '마케팅' },
    title: { en: 'KakaoTalk Channel from the US: 20-Min Setup for Korean Businesses (2026)', ko: '미국에서 카카오톡 채널 20분 만에 만들기 — 한인 비즈니스 완벽 가이드 (2026)' },
    excerpt: { en: '85% of Korean-Americans use KakaoTalk daily. Here is how to set up a business Channel from the US in 20 minutes — registration, ads, broadcasts, and website integration. No Korean phone number required.', ko: '미주 한인 85%가 매일 쓰는 카카오톡 — 미국에서 비즈니스 채널을 20분 만에 만드는 방법. 사업자 등록, 광고, 단체 메시지, 웹사이트 연동까지. 한국 번호 없이 가능.' },
    image: '/blog/kakaotalk-channel-us-korean-business.png'
  },
  {
    id: 11,
    slug: 'case-study-korean-nail-salon-seo-10x',
    date: '2026-04-10',
    readTime: 9,
    category: { en: 'Case Study', ko: '사례 연구' },
    title: { en: 'Case Study: How We 10×\'d a Korean Nail Salon\'s Organic Traffic in 6 Months', ko: '사례 연구: 한인 네일샵의 유입 트래픽을 6개월 만에 10배로 만든 방법' },
    excerpt: { en: 'A step-by-step case study of how ZOE LUMOS grew a North Bergen Korean nail salon\'s organic Google traffic from 40 to 430 monthly visits in 6 months.', ko: 'North Bergen 한인 네일샵의 월 유입을 6개월 만에 40명에서 430명으로 늘린 ZOE LUMOS의 단계별 사례 연구.' },
    image: '/blog/case-study-korean-nail-salon-seo-10x.png'
  },
  {
    id: 12,
    slug: 'bilingual-seo-technical-guide-hreflang',
    date: '2026-04-09',
    readTime: 11,
    category: { en: 'Technical SEO', ko: '기술 SEO' },
    title: { en: 'The Technical Bilingual SEO Playbook — hreflang, Canonicals, and Language-Aware Architecture', ko: '이중언어 SEO 기술 플레이북 — hreflang, 캐노니컬, 언어 인식 아키텍처' },
    excerpt: { en: 'A developer-friendly, honest guide to implementing bilingual Korean-English SEO correctly. hreflang, canonicals, URL structure, and common mistakes.', ko: '이중언어 한영 SEO를 올바르게 구현하는 개발자 친화적 가이드. hreflang, 캐노니컬, URL 구조, 흔한 실수들.' },
    image: '/blog/bilingual-seo-technical-guide-hreflang.png'
  },
  {
    id: 13,
    slug: 'wordpress-to-nextjs-korean-business-migration',
    date: '2026-04-08',
    readTime: 10,
    category: { en: 'Technical', ko: '기술' },
    title: { en: 'Migrating from WordPress to Next.js — A Korean Business Case Study', ko: '워드프레스에서 Next.js로 — 한인 비즈니스 마이그레이션 사례' },
    excerpt: { en: 'A honest walkthrough of migrating a Korean-American business website from WordPress to Next.js — decisions, risks, metrics, and when NOT to migrate.', ko: '한인 비즈니스 웹사이트를 워드프레스에서 Next.js로 마이그레이션하는 솔직한 가이드 — 결정, 리스크, 지표, 그리고 마이그레이션하지 말아야 할 때.' },
    image: '/blog/wordpress-to-nextjs-korean-business-migration.png'
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
  // Phase 3 — GSC gap-targeting
  { id: 23, slug: 'local-seo-guide-korean-business-2026', date: '2026-04-18', readTime: 10, category: { en: 'SEO', ko: 'SEO' }, title: { en: 'Local SEO for Korean Businesses: 9-Step Playbook [2026]', ko: '한인 비즈니스 로컬 SEO 9단계 플레이북 [2026]' }, excerpt: { en: '9-step local SEO playbook for Korean restaurants, salons, and shops in NJ/NY/LA. Rank in Google Maps, fix duplicate listings, win Korean reviews.', ko: '한인 식당·살롱·소매점을 위한 9단계 로컬 SEO 플레이북. NJ·NY·LA에서 구글 지도 상위 노출, 중복 리스팅 정리, 한국어 리뷰 확보까지.' }, image: '/blog/local-seo-guide-korean-business-2026.png' },
  { id: 24, slug: 'bilingual-seo-new-york-korean-business', date: '2026-04-18', readTime: 8, category: { en: 'SEO', ko: 'SEO' }, title: { en: 'Bilingual SEO for New York Korean Businesses', ko: '뉴욕 한인 비즈니스 이중언어 SEO' }, excerpt: { en: 'How NYC Korean businesses can rank on Google in both English and Korean simultaneously.', ko: '뉴욕 한인 비즈니스가 영어와 한국어 양쪽으로 동시 랭크하는 방법.' }, image: '/blog/bilingual-seo-new-york-korean-business.png' },
  { id: 25, slug: 'google-business-profile-korean-business-optimization', date: '2026-04-18', readTime: 9, category: { en: 'Marketing', ko: '마케팅' }, title: { en: 'Google Business Profile Optimization for Korean Businesses', ko: '한인 비즈니스 구글 비즈니스 프로필 최적화' }, excerpt: { en: 'Step-by-step GBP optimization guide for Korean-American businesses. Photos, posts, reviews, bilingual descriptions.', ko: '한인 비즈니스 GBP 최적화 단계별 가이드. 사진, 포스트, 리뷰, 이중언어 설명.' }, image: '/blog/google-business-profile-korean-business-optimization.png' },
  { id: 26, slug: 'affordable-seo-new-jersey-korean-business', date: '2026-04-18', readTime: 7, category: { en: 'SEO', ko: 'SEO' }, title: { en: 'Affordable SEO for NJ Korean Businesses — What $500/Month Gets You', ko: '뉴저지 한인 비즈니스 합리적 SEO — 월 $500으로 뭘 받나' }, excerpt: { en: 'What affordable SEO actually looks like for NJ Korean businesses. Real deliverables, realistic timelines, red flags.', ko: '뉴저지 한인 비즈니스의 합리적 SEO. 실제 산출물, 현실적 일정, 위험 신호.' }, image: '/blog/affordable-seo-new-jersey-korean-business.png' },
  { id: 27, slug: 'instagram-vs-website-korean-business', date: '2026-04-18', readTime: 7, category: { en: 'Marketing', ko: '마케팅' }, title: { en: 'Instagram vs Website — What Korean-American Businesses Need', ko: '인스타그램 vs 웹사이트 — 한인 비즈니스에 필요한 것' }, excerpt: { en: 'An honest comparison of Instagram vs a website for Korean-American businesses. When each is enough, and how to use both.', ko: '한인 비즈니스를 위한 인스타 vs 웹사이트 솔직 비교. 각각 충분할 때, 둘 다 쓰는 법.' }, image: '/blog/instagram-vs-website-korean-business.png' },
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
    "blogPost": blogPostsForSchema.map(post => ({
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

// Auto-derive from blogContent.ts — single source of truth, never goes stale.
// Hand-curated featured ordering: TJ Flowers + 3 app-dev posts pinned at top
// (id 0-3), everything else by date desc.
const FEATURED_SLUGS = [
  'tj-flowers-shopify-revamp-case-study',
  'korean-restaurant-own-app-vs-doordash',
  'pwa-vs-native-app-korean-smb',
  'app-store-submission-korean-business-guide',
]
const sortedContent = [...blogContent].sort((a, b) => {
  const ai = FEATURED_SLUGS.indexOf(a.slug)
  const bi = FEATURED_SLUGS.indexOf(b.slug)
  if (ai !== -1 || bi !== -1) {
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  }
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})
const postsWithImages = sortedContent.map((p, i) => ({
  id: i,
  slug: p.slug,
  date: p.date,
  readTime: p.readTime,
  category: p.category,
  title: p.title,
  excerpt: p.metaDescription,
  // Static PNG if it exists, dynamic /api/og fallback otherwise.
  // Falls back automatically for any future post without a generated hero.
  image: blogImageUrl(p.slug, p.title.en),
}))
// Keep `blogPosts` reference alive for the JSON-LD generator below.
// (Using the auto-derived list ensures schema and rendered list stay in sync.)
const blogPostsForSchema = postsWithImages

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = content[locale]

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const prefix = locale === 'ko' ? '/ko' : ''
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: `${baseUrl}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: t.title, item: `${baseUrl}${prefix}/blog` },
    ],
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <BlogListing posts={postsWithImages} locale={locale} content={t} />
      <Footer locale={locale} />
    </>
  )
}
