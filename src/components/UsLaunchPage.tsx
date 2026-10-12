import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Accessibility,
  Activity,
  BookOpen,
  Building2,
  ChartColumn,
  ClipboardList,
  CodeXml,
  DatabaseBackup,
  FileBarChart,
  FileText,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Video,
} from 'lucide-react'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import HeroVisual from '@/components/us-launch/HeroVisual'
import TimeZoneRoute from '@/components/us-launch/TimeZoneRoute'
import LawsuitCharts from '@/components/us-launch/LawsuitCharts'
import ProcessTimeline, { type Step } from '@/components/us-launch/ProcessTimeline'
import { SITE_URL } from '@/lib/siteUrl'
import { US_LAUNCH_PATHS } from '@/data/usLaunch'

export { US_LAUNCH_PATHS }

/**
 * Service landing for Korean companies, franchises and brands launching in the US
 * (HQ teams in Korea or their new US subsidiaries). KO lives on a Korean slug that
 * matches the search phrase; EN on an English slug. Both are hreflang-paired.
 *
 * Every number on this page is sourced (Seyfarth Shaw / UsableNet, as cited inline);
 * case studies are only ones already public on /portfolio. No prices, no phone.
 */

type L = 'en' | 'ko'
type T = { en: string; ko: string }

const KAKAO = 'http://pf.kakao.com/_xhxdxmlX/chat'
const ic = 'h-5 w-5'

export const US_LAUNCH_META = {
  title: {
    en: 'US Launch Websites for Korean Companies | ZOE LUMOS',
    ko: '미국 진출 홈페이지 제작 | 한국 기업 미국 공식 영문 사이트 | ZOE LUMOS',
  },
  description: {
    en: 'Official US English websites for Korean companies and franchises entering the US. Run in Korean from Fort Lee, NJ, with a Korean admin CMS, SEO and AI search.',
    ko: '미국 진출 한국 기업·프랜차이즈의 미국 공식 영문 홈페이지 제작. 뉴저지 현지 팀이 한국어로 진행하고 한국어 관리자 화면, Google SEO·AI 검색, 웹 접근성 검수까지 맡습니다.',
  },
}

const hero = {
  eyebrow: { en: 'For Korean companies entering the US', ko: '미국 진출 기업' },
  h1: {
    en: 'Your official US website, built in the US for Korean brands launching here',
    ko: '미국 진출 한국 기업의 공식 영문 홈페이지, 미국 현지에서 만듭니다',
  },
  intro: {
    en: 'Opening your first US location, setting up a US subsidiary, or starting to sell to American customers? Our bilingual team in Fort Lee, New Jersey builds the official English website your launch needs. We run the project in Korean, meet on Korea time, and hand over a Korean-language admin panel your HQ team can run on its own.',
    ko: '미국 1호점 오픈, 미국 법인 설립, 미국 판매 시작을 앞두고 계신가요? 뉴저지 포트리의 이중언어 팀이 미국 진출에 필요한 공식 영문 홈페이지를 만듭니다. 상담과 보고는 한국어로, 미팅은 한국 시간에 맞춰 진행하고, 출시 후에는 본사가 한국어 관리자 화면에서 직접 운영하실 수 있게 넘겨드립니다.',
  },
}

const facts: { icon: ReactNode; text: T }[] = [
  { icon: <MapPin className="h-4 w-4" aria-hidden />, text: { en: 'US-based team in Fort Lee, NJ', ko: '미국 뉴저지 포트리 현지 팀' } },
  { icon: <Languages className="h-4 w-4" aria-hidden />, text: { en: 'Project management in Korean and English', ko: '한국어 상담·진행 보고' } },
  { icon: <Video className="h-4 w-4" aria-hidden />, text: { en: 'Video meetings on Korea time', ko: '한국 시간 화상 미팅' } },
  { icon: <LayoutDashboard className="h-4 w-4" aria-hidden />, text: { en: 'Korean-language admin panel', ko: '한국어 관리자 화면' } },
]

const audiences: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <Store className={ic} aria-hidden />,
    title: { en: 'Franchise HQs opening a first US store', ko: '미국 1호점을 준비하는 프랜차이즈 본사' },
    body: {
      en: 'Store locator, menu, franchise inquiries and news in one place, organized the way US customers and prospective US franchisees look for them.',
      ko: '매장 찾기, 메뉴, 가맹 문의, 소식까지 미국 고객과 미국 가맹 희망자가 찾는 정보를 한곳에 정리합니다.',
    },
  },
  {
    icon: <Building2 className={ic} aria-hidden />,
    title: { en: 'Manufacturers and medical or beauty brands with a new US entity', ko: '미국 법인을 세운 제조·의료기기·뷰티 브랜드' },
    body: {
      en: 'Product pages and inquiry paths in English that US buyers, clinicians and distribution partners can trust.',
      ko: '미국 바이어·의료진·유통 파트너가 신뢰할 수 있는 제품 소개와 문의 동선을 영어로 설계합니다.',
    },
  },
  {
    icon: <ShoppingBag className={ic} aria-hidden />,
    title: { en: 'Brands starting to sell online in the US', ko: '미국 온라인 판매를 시작하는 브랜드' },
    body: {
      en: 'A Shopify store with US checkout, shipping and returns pages, connected to your US marketing.',
      ko: 'Shopify 기반 쇼핑몰과 미국 결제·배송·반품 안내 페이지를 갖추고 미국 마케팅과 연결합니다.',
    },
  },
]

const reasons: { icon: ReactNode; title: T; body: T }[] = [
  {
    icon: <Search className={ic} aria-hidden />,
    title: { en: 'US search runs on Google', ko: '미국 검색은 Google 중심입니다' },
    body: {
      en: 'Americans find brands and stores through Google Search and Google Maps, not Naver. Page titles and descriptions, structured data and one page per store have to follow US search conventions to show up.',
      ko: '미국 고객은 네이버가 아니라 Google 검색과 Google 지도로 브랜드와 매장을 찾습니다. 페이지 제목·설명, 구조화 데이터, 매장별 페이지가 미국 검색 기준에 맞아야 노출됩니다.',
    },
  },
  {
    icon: <Scale className={ic} aria-hidden />,
    title: { en: 'Accessibility lawsuits are common', ko: '웹 접근성 소송이 많습니다' },
    body: {
      en: 'In 2025, 1,021 of the 3,117 website-accessibility lawsuits filed in US federal courts came from New York (Seyfarth Shaw). By industry, e-commerce (about 70%) was followed by food service (about 21%) (UsableNet). We build keyboard navigation, alt text, color contrast and labeled forms in from the start.',
      ko: '2025년 미국 연방법원에 제기된 웹사이트 접근성 소송 3,117건 중 1,021건이 뉴욕주에서 제기됐고(Seyfarth Shaw), 업종별로는 이커머스(약 70%)에 이어 외식·서비스업(약 21%)이 두 번째였습니다(UsableNet). 키보드 이동, 대체 텍스트, 명도 대비, 폼 레이블 같은 기본 기준을 처음부터 반영합니다.',
    },
  },
  {
    icon: <Smartphone className={ic} aria-hidden />,
    title: { en: 'US visitors expect different basics', ko: '미국 사용자가 기대하는 기본이 다릅니다' },
    body: {
      en: 'Fast mobile pages, short native-sounding English, store hours and addresses that are easy to find, and a privacy policy are the baseline for a US brand site.',
      ko: '빠른 모바일 화면, 원어민이 읽기 편한 짧은 영어 문장, 쉽게 찾을 수 있는 매장 영업시간·주소, 개인정보 처리방침 고지가 미국 브랜드 사이트의 기본입니다.',
    },
  },
  {
    icon: <Sparkles className={ic} aria-hidden />,
    title: { en: 'AI search has to describe you correctly', ko: 'AI 검색도 브랜드를 정확히 설명해야 합니다' },
    body: {
      en: 'ChatGPT, Perplexity and Google AI Overviews summarize brands from what your site states plainly and in machine-readable form. We structure your company, store and menu information so these systems can read it.',
      ko: 'ChatGPT, Perplexity, Google AI 개요 같은 AI 검색은 사이트에 명확하게 적힌 정보와 구조화된 데이터를 바탕으로 브랜드를 설명합니다. 회사·매장·메뉴 정보를 AI가 읽을 수 있는 형태로 정리해 둡니다.',
    },
  },
]

const scope: { icon: ReactNode; text: T }[] = [
  { icon: <FileText className={ic} aria-hidden />, text: { en: 'Information architecture for US customers and an English content guide', ko: '미국 고객 기준 정보 구조와 영문 콘텐츠 구성 가이드' } },
  { icon: <PenTool className={ic} aria-hidden />, text: { en: 'Design mockups shared, reviewed and approved in Figma', ko: 'Figma 디자인 시안 공유·코멘트·승인' } },
  { icon: <MonitorSmartphone className={ic} aria-hidden />, text: { en: 'Responsive build for mobile, tablet and desktop', ko: '모바일·태블릿·데스크톱 반응형 개발' } },
  { icon: <LayoutDashboard className={ic} aria-hidden />, text: { en: 'Korean-language admin CMS: menus, stores, news and banners edited by your HQ', ko: '한국어 관리자 화면 CMS: 메뉴·매장·소식·배너를 본사에서 직접 수정' } },
  { icon: <MapPin className={ic} aria-hidden />, text: { en: 'Store locator with maps and a page for each store', ko: '지도 기반 매장 찾기와 매장별 상세 페이지' } },
  { icon: <Mail className={ic} aria-hidden />, text: { en: 'Contact and franchise-inquiry forms with email alerts', ko: '문의·가맹 문의 폼과 이메일 알림' } },
  { icon: <Search className={ic} aria-hidden />, text: { en: 'Google SEO setup: metadata, structured data, sitemap, Korean–English hreflang', ko: 'Google SEO 기본 설정: 메타 정보, 구조화 데이터, 사이트맵, 한·영 hreflang' } },
  { icon: <Sparkles className={ic} aria-hidden />, text: { en: 'AI search (GEO) readiness: structured company and store data, llms.txt', ko: 'AI 검색(GEO) 대응: 구조화된 회사·매장 정보, llms.txt' } },
  { icon: <ChartColumn className={ic} aria-hidden />, text: { en: 'GA4 and Google Search Console with conversion tracking', ko: 'GA4·Google Search Console 연결과 문의 전환 측정' } },
  { icon: <Accessibility className={ic} aria-hidden />, text: { en: 'Accessibility review against WCAG basics before launch', ko: '출시 전 WCAG 기준 웹 접근성 기본 검수' } },
  { icon: <BookOpen className={ic} aria-hidden />, text: { en: 'Admin training and a Korean operations manual', ko: '관리자 교육과 한국어 운영 안내서' } },
]

const steps: Step[] = [
  {
    icon: <ClipboardList className={ic} aria-hidden />,
    when: { en: 'Week 1', ko: '1주차' },
    title: { en: 'Scope and site structure', ko: '요구사항·사이트 구조 확정' },
    body: {
      en: 'One video call covers your launch date, must-have pages and the materials you already have. Then we confirm scope, price and schedule in writing.',
      ko: '공개 일정, 필수 페이지, 자료 준비 상황을 화상 미팅으로 확인하고 범위·견적·일정을 서면으로 확정합니다.',
    },
  },
  {
    icon: <PenTool className={ic} aria-hidden />,
    when: { en: 'Weeks 2–3', ko: '2~3주차' },
    title: { en: 'Design approved in Figma', ko: 'Figma 디자인 승인' },
    body: {
      en: 'Desktop and mobile mockups of the key screens are shared in Figma. Your team comments directly on the designs and approves them.',
      ko: '주요 화면의 데스크톱·모바일 시안을 Figma로 공유하고, 본사 코멘트를 반영해 승인받습니다.',
    },
  },
  {
    icon: <CodeXml className={ic} aria-hidden />,
    when: { en: 'Weeks 4–5', ko: '4~5주차' },
    title: { en: 'Build, CMS and content entry', ko: '개발·CMS·초기 데이터 등록' },
    body: {
      en: 'We build to the approved design, set up the admin panel and load your menus, stores and initial content.',
      ko: '승인된 시안대로 개발하고, 관리자 화면을 구성해 메뉴·매장 등 초기 데이터를 등록합니다.',
    },
  },
  {
    icon: <Rocket className={ic} aria-hidden />,
    when: { en: 'Week 6', ko: '6주차' },
    title: { en: 'QA, training and launch', ko: '검수·교육·출시' },
    body: {
      en: 'Browser and accessibility checks, admin training, and a public launch once you sign off.',
      ko: '브라우저·접근성 점검과 관리자 교육을 마친 뒤, 본사 승인을 받아 공개합니다.',
    },
  },
]

const cases: { name: string; host: string; tag: T; body: T; image: string; url?: string }[] = [
  {
    name: 'EndoPia',
    host: 'endopiaglobal.com',
    tag: { en: 'Medical device · US launch', ko: '의료기기 · 미국 런칭' },
    body: {
      en: 'The US website of a medical-device company with offices in the US and Korea: product storytelling and SEO for its US launch.',
      ko: '한국과 미국에 거점을 둔 의료기기 기업의 미국 공식 사이트. 미국 런칭을 위한 제품 스토리텔링과 SEO를 맡았습니다.',
    },
    image: '/portfolio/endopia.jpg',
    url: 'https://endopiaglobal.com/',
  },
  {
    name: 'Mochinut',
    host: 'mochinut',
    tag: { en: 'Dessert franchise · Multi-city', ko: '디저트 프랜차이즈 · 여러 도시' },
    body: {
      en: 'E-commerce, a rebrand and franchise pages for a dessert brand with locations in several cities.',
      ko: '여러 도시에 매장을 둔 디저트 브랜드의 이커머스, 리브랜드, 프랜차이즈 페이지를 만들었습니다.',
    },
    image: '/portfolio/mochinut.jpg',
  },
  {
    name: 'Kona Coffee Donut',
    host: 'kona coffee donut',
    tag: { en: 'Café & bakery · Honolulu', ko: '카페·베이커리 · 호놀룰루' },
    body: {
      en: 'Brand, website and a Shopify store for a café and bakery in Honolulu.',
      ko: '호놀룰루 카페·베이커리의 브랜드, 웹사이트, Shopify 스토어를 만들었습니다.',
    },
    image: '/portfolio/kona-coffee.jpg',
  },
]

const careItems: { icon: ReactNode; text: T }[] = [
  { icon: <ShieldCheck className={ic} aria-hidden />, text: { en: 'Security and dependency updates', ko: '보안·의존성 업데이트' } },
  { icon: <DatabaseBackup className={ic} aria-hidden />, text: { en: 'Backup checks', ko: '백업 확인' } },
  { icon: <Activity className={ic} aria-hidden />, text: { en: 'Uptime monitoring', ko: '가동 모니터링' } },
  { icon: <FileBarChart className={ic} aria-hidden />, text: { en: 'Monthly search and traffic report', ko: '월간 검색·방문 리포트' } },
]

const care = {
  title: { en: 'After launch', ko: '출시 후 운영' },
  body: {
    en: 'Run the site yourselves, or hand it to us on a monthly care plan that also covers content changes such as seasonal menus and banners. We propose scope and cost in writing after our first call.',
    ko: '본사가 직접 운영하시거나, 시즌 메뉴·배너 교체 같은 콘텐츠 수정까지 포함한 월 단위 운영 플랜으로 맡기실 수 있습니다. 범위와 비용은 첫 미팅 후 서면으로 제안드립니다.',
  },
}

export const US_LAUNCH_FAQ: { q: T; a: T }[] = [
  {
    q: { en: 'Can we just translate our Korean website into English?', ko: '한국 홈페이지를 영어로 번역해서 쓰면 안 되나요?' },
    a: {
      en: 'We reuse your brand assets (logo, photography, tone), but US customers look for different information and search differently, so the structure is redesigned for the US. Translated sites usually fall short on Google visibility, store information and accessibility.',
      ko: '로고·사진·톤 같은 브랜드 자산은 그대로 활용하지만, 미국 고객이 찾는 정보와 검색 방식이 달라 정보 구조는 미국 기준으로 다시 설계합니다. 번역만 한 사이트는 Google 노출, 매장 정보 표시, 웹 접근성에서 부족한 경우가 많습니다.',
    },
  },
  {
    q: { en: 'Can our HQ team use the admin panel in Korean?', ko: '관리자 화면을 한국어로 쓸 수 있나요?' },
    a: {
      en: 'Yes. We build on a CMS with a Korean-language admin interface, so your team adds and edits menus, stores, news and banners through simple lists and forms. There are no per-seat license fees for editor accounts.',
      ko: '네. 한국어 관리자 화면을 지원하는 CMS로 구축해, 본사 담당자가 메뉴·매장·소식·배너를 목록과 입력 양식으로 직접 추가·수정할 수 있습니다. 편집 계정 수에 따른 라이선스 비용은 없습니다.',
    },
  },
  {
    q: { en: 'Can we meet on Korea time?', ko: '미팅은 한국 시간으로 할 수 있나요?' },
    a: {
      en: 'Yes. We hold video calls in the Korean morning (the previous evening in US Eastern time) and report progress in Korean or English.',
      ko: '네. 한국 시간 오전(미국 동부 기준 전날 저녁)에 화상 미팅을 진행하고, 진행 상황은 한국어로 보고드립니다.',
    },
  },
  {
    q: { en: 'How long does it take?', ko: '제작 기간은 얼마나 걸리나요?' },
    a: {
      en: 'A typical official brand site takes about five to six weeks, depending on scope and on how quickly materials and approvals come in.',
      ko: '일반적인 브랜드 공식 사이트는 약 5~6주가 걸립니다. 범위와 자료 준비·승인 일정에 따라 조정됩니다.',
    },
  },
  {
    q: { en: 'How is the price calculated?', ko: '비용은 어떻게 산정되나요?' },
    a: {
      en: 'By the number of design templates, the amount of launch content and the features you need (store locator, franchise inquiries and so on), not by page count. After the first call you receive an itemized quote and schedule in writing.',
      ko: '페이지 수가 아니라 디자인 템플릿 수, 초기 등록 콘텐츠 양, 필요한 기능(매장 찾기, 가맹 문의 등)을 기준으로 산정합니다. 첫 미팅 후 항목별 견적서와 일정을 서면으로 드립니다.',
    },
  },
  {
    q: { en: 'Does this protect us from ADA website lawsuits?', ko: '미국 웹 접근성(ADA) 소송에 대비할 수 있나요?' },
    a: {
      en: 'We design and build to WCAG basics (keyboard navigation, alt text, color contrast, form labels) and check them before launch. Legal advice and accessibility certification are not included.',
      ko: '키보드 이동, 대체 텍스트, 명도 대비, 폼 레이블 같은 WCAG 기본 기준을 설계·개발 단계부터 반영하고 출시 전에 점검합니다. 다만 법률 자문과 접근성 인증은 포함하지 않습니다.',
    },
  },
  {
    q: { en: 'Can you help our US stores show up on Google Maps and Search?', ko: '미국 매장이 Google 지도와 검색에 잘 나오게 할 수 있나요?' },
    a: {
      en: 'We create a page and structured data for each store, connect Google Search Console, and check that each Google Business Profile matches the website. We do not guarantee rankings.',
      ko: '매장별 페이지와 구조화 데이터를 만들고 Search Console을 연결하며, 매장별 Google 비즈니스 프로필 정보가 사이트와 일치하는지 점검합니다. 검색 순위를 보장하지는 않습니다.',
    },
  },
  {
    q: { en: 'Who writes the English copy?', ko: '영어 문구는 누가 쓰나요?' },
    a: {
      en: 'We provide an English content guide written for US customers and lightly edit the English you supply. Full translation and new copywriting are quoted separately.',
      ko: '미국 고객 기준의 영문 콘텐츠 구성 가이드를 드리고, 고객사가 제공한 영문을 간단히 교정합니다. 전체 번역과 신규 카피 작성은 별도로 견적드립니다.',
    },
  },
  {
    q: { en: 'What happens after launch?', ko: '출시 후 관리는 어떻게 하나요?' },
    a: {
      en: 'You choose between running the site yourselves and a monthly care plan that covers updates, backups, monitoring, content changes and a monthly report.',
      ko: '본사 직접 운영과 월 단위 운영 플랜 중에서 선택하실 수 있습니다. 운영 플랜은 업데이트·백업·모니터링, 콘텐츠 수정, 월간 리포트를 포함합니다.',
    },
  },
]

function SectionHead({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 md:mb-14 max-w-3xl">
      {eyebrow && <p className="mb-3 text-[13px] font-semibold text-[var(--gold)]">{eyebrow}</p>}
      <h2 className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.12] tracking-luxury text-ink text-balance">{title}</h2>
      {intro && <p className="mt-4 text-[16px] md:text-[17px] leading-[1.7] text-graphite">{intro}</p>}
    </div>
  )
}

function IconChip({ children }: { children: ReactNode }) {
  return <span className="ul-chip grid h-11 w-11 shrink-0 place-items-center rounded-2xl">{children}</span>
}

export default function UsLaunchPage({ locale }: { locale: L }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''
  const enUrl = `${SITE_URL}${US_LAUNCH_PATHS.en}`
  const koUrl = `${SITE_URL}${US_LAUNCH_PATHS.ko}`
  const pageUrl = isKo ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${enUrl}#service`,
    name: isKo ? '미국 진출 기업 공식 홈페이지 제작' : 'US launch websites for Korean companies',
    serviceType: isKo ? '웹사이트 기획·디자인·개발 및 운영' : 'Website strategy, design, development and care',
    description: US_LAUNCH_META.description[locale],
    provider: { '@id': `${SITE_URL}/#organization` },
    url: pageUrl,
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    availableLanguage: ['ko', 'en'],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'South Korea' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Korean companies, franchises and brands expanding into the United States',
    },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: US_LAUNCH_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isKo ? '홈' : 'Home', item: isKo ? `${SITE_URL}/ko` : SITE_URL },
      { '@type': 'ListItem', position: 2, name: isKo ? '서비스' : 'Services', item: `${SITE_URL}${prefix}/services` },
      { '@type': 'ListItem', position: 3, name: hero.eyebrow[locale], item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        {/* Hero */}
        <section className="container-edge pt-28 md:pt-40 pb-14 md:pb-24">
          <nav className="mb-8 flex flex-wrap items-center gap-2 overline text-ash" aria-label={isKo ? '경로' : 'Breadcrumb'}>
            <Link href={prefix || '/'} className="transition-colors hover:text-ink">{isKo ? '홈' : 'Home'}</Link>
            <span className="opacity-50">/</span>
            <Link href={`${prefix}/services`} className="transition-colors hover:text-ink">{isKo ? '서비스' : 'Services'}</Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{hero.eyebrow[locale]}</span>
          </nav>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-6">
              <p className="mb-5 text-[14px] font-semibold text-[var(--gold)]">{hero.eyebrow[locale]}</p>
              <h1 className="font-display text-[clamp(2.1rem,7.4vw,3.6rem)] lg:text-[clamp(2.5rem,3.8vw,3.75rem)] leading-[1.08] tracking-luxury text-ink text-balance">
                {hero.h1[locale]}
              </h1>
              <p className="mt-7 max-w-xl text-[16px] md:text-[18px] leading-[1.7] text-graphite">{hero.intro[locale]}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={`${prefix}/contact`} className="btn-ink">
                  {isKo ? '미국 진출 상담 요청' : 'Plan your US launch'}
                  <span className="arrow">→</span>
                </Link>
                <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {isKo ? '카카오톡 상담' : 'Chat on KakaoTalk'}
                </a>
              </div>
              <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.text.en} className="flex items-center gap-3 text-[14.5px] text-graphite">
                    <span className="ul-chip grid h-8 w-8 shrink-0 place-items-center rounded-full">{f.icon}</span>
                    {f.text[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <HeroVisual locale={locale} />
            </div>
          </div>
        </section>

        {/* Seoul ↔ New Jersey */}
        <section className="container-edge pb-20 md:pb-28">
          <TimeZoneRoute locale={locale} />
        </section>

        {/* Who it's for */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '대상' : 'Who it is for'} title={isKo ? '이런 기업과 함께합니다' : 'Built for Korean HQs and their US teams'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {audiences.map((a) => (
              <li key={a.title.en} className="ul-panel rounded-[24px] p-6 md:p-7">
                <IconChip>{a.icon}</IconChip>
                <h3 className="mt-6 text-[19px] md:text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{a.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-graphite">{a.body[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Why not just translate + sourced charts */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '왜 미국 기준인가' : 'Why US-native'}
            title={isKo ? '한국 사이트를 번역만 해서는 안 되는 이유' : 'Why a translated Korean site is not enough'}
          />
          <ul data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {reasons.map((r, i) => (
              <li key={r.title.en} className="ul-panel rounded-[24px] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <IconChip>{r.icon}</IconChip>
                  <span className="text-[13px] font-semibold text-ash tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-[19px] md:text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">{r.title[locale]}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-graphite">{r.body[locale]}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 md:mt-5">
            <LawsuitCharts locale={locale} />
          </div>
        </section>

        {/* Scope */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '제작 범위' : 'Scope'} title={isKo ? '미국 공식 사이트에 필요한 것을 한 번에' : 'Everything a US brand site needs'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {scope.map((s) => (
              <li key={s.text.en} className="ul-panel flex items-center gap-4 rounded-[20px] p-4 md:p-5">
                <IconChip>{s.icon}</IconChip>
                <span className="text-[15px] leading-[1.55] text-ink">{s.text[locale]}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm text-ash">
            {isKo
              ? '전체 번역, 신규 카피 작성, 촬영, 주문·결제·POS 연동은 별도로 견적드립니다.'
              : 'Full translation, new copywriting, photography and ordering, payment or POS integrations are quoted separately.'}
          </p>
        </section>

        {/* Process */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead
            eyebrow={isKo ? '진행 방식' : 'Process'}
            title={isKo ? '6주, 네 단계로 출시합니다' : 'Six weeks, four steps to launch'}
            intro={
              isKo
                ? '일정은 범위와 자료 준비·승인 속도에 따라 달라집니다. 미팅은 한국 시간 오전에 진행할 수 있습니다.'
                : 'Timing depends on scope and on how fast materials and approvals arrive. Meetings can run in the Korean morning.'
            }
          />
          <ProcessTimeline steps={steps} locale={locale} />
        </section>

        {/* Case studies */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '사례' : 'Work'} title={isKo ? '미국 런칭·브랜드 사례' : 'Launch and brand work'} />
          <ul data-reveal-group className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {cases.map((c) => (
              <li key={c.name} className="ul-case">
                <div className="ul-case-frame ul-frame overflow-hidden rounded-[14px] bg-[#1C1C1E]">
                  <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                    <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                    <span className="ml-2 truncate text-[10.5px] text-ash">{c.host}</span>
                  </div>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={c.image}
                      alt={isKo ? `${c.name} 웹사이트 화면` : `${c.name} website`}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="mt-5 text-[13px] text-ash">{c.tag[locale]}</p>
                <h3 className="mt-1.5 text-[21px] font-semibold tracking-[-0.02em] text-ink">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.name}</a>
                  ) : (
                    c.name
                  )}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-graphite">{c.body[locale]}</p>
              </li>
            ))}
          </ul>
          <Link href={`${prefix}/portfolio`} className="btn-ghost mt-10 inline-block">
            {isKo ? '전체 포트폴리오 보기 →' : 'See all work →'}
          </Link>
        </section>

        {/* Care */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead eyebrow={isKo ? '운영' : 'Care'} title={care.title[locale]} intro={care.body[locale]} />
          <ul data-reveal-group className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {careItems.map((c) => (
              <li key={c.text.en} className="ul-panel rounded-[20px] p-5">
                <IconChip>{c.icon}</IconChip>
                <p className="mt-5 text-[15px] font-medium leading-[1.45] text-ink">{c.text[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="container-edge border-t border-hairline py-20 md:py-28">
          <SectionHead title={isKo ? '자주 묻는 질문' : 'Frequently asked questions'} />
          <div className="max-w-3xl divide-y divide-[var(--hairline)]">
            {US_LAUNCH_FAQ.map((f) => (
              <div key={f.q.en} className="py-7 first:pt-0">
                <h3 className="text-[18px] md:text-[20px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink">{f.q[locale]}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.75] text-graphite">{f.a[locale]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-edge pb-24 md:pb-32">
          <div data-reveal className="ul-panel rounded-[32px] px-6 py-14 text-center md:px-16 md:py-20">
            <p className="mx-auto max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.25] tracking-luxury text-ink text-balance">
              {isKo
                ? '미국 진출 일정과 필요한 페이지를 알려주시면, 한국어로 견적서와 일정을 보내드립니다.'
                : 'Tell us your launch date and the pages you need. We will send a written quote and schedule, in Korean or English.'}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={`${prefix}/contact`} className="btn-ink">
                {isKo ? '상담 요청하기' : 'Start a conversation'}
                <span className="arrow">→</span>
              </Link>
              <a href="mailto:info@zoelumos.com" className="btn-outline">info@zoelumos.com</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
