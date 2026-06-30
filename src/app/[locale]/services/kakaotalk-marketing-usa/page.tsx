import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/siteUrl'

const BASE = SITE_URL

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const enUrl = `${BASE}/services/kakaotalk-marketing-usa`
  const koUrl = `${BASE}/ko/services/kakaotalk-marketing-usa`
  const url = locale === 'ko' ? koUrl : enUrl
  return {
    title:
      locale === 'ko'
        ? '카카오톡 마케팅·광고 대행 (미국 한인 비즈니스) | ZOE LUMOS'
        : 'KakaoTalk Marketing & Advertising Agency for US Korean Businesses | Zoe Lumos',
    description:
      locale === 'ko'
        ? '미국 한인 비즈니스를 위한 카카오톡 채널·알림톡·광고 셋업. 이중언어 템플릿, 카카오 승인, POS·예약 연동, ROI 중심. 알림톡 재참여 $1당 $8–$25 회수.'
        : 'KakaoTalk Channel, alimtalk automation, and advertising setup for Korean-American businesses in the US. Bilingual templates, Kakao approval, POS/booking integration — tuned for ROI ($8–$25 returned per $1 of messaging).',
    alternates: {
      canonical: url,
      languages: { 'x-default': enUrl, en: enUrl, ko: koUrl },
    },
    openGraph: {
      title:
        locale === 'ko'
          ? '카카오톡 마케팅·광고 대행 (미국 한인 비즈니스)'
          : 'KakaoTalk Marketing & Advertising for US Korean Businesses',
      description:
        locale === 'ko'
          ? '카카오톡 채널·알림톡·광고 — 이중언어, ROI 중심.'
          : 'KakaoTalk Channel, alimtalk & ads — bilingual, ROI-focused.',
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

const COPY = {
  en: {
    eyebrow: 'Service · KakaoTalk Advertising Agency & Paid Ad Services',
    h1Lead: 'KakaoTalk advertising agency',
    h1Sub: 'marketing that pays for itself.',
    intro:
      'Zoe Lumos is a bilingual KakaoTalk advertising agency that sets up and runs KakaoTalk paid ad services for Korean-American businesses across the US — Channel marketing, alimtalk/friendtalk automation, Biz Board ads, and bilingual creative. We wire it into your POS or booking system so messages fire automatically, and we tune for ROI: alimtalk re-engagement typically returns $8–$25 for every $1 of messaging cost, because the per-message cost is pennies and the audience already knows you.',
    whatTitle: 'What our KakaoTalk paid ad services set up',
    whatItems: [
      'KakaoTalk Channel + bizmessage account — registration and Kakao approval handled for you',
      'Alimtalk (transactional) — reservation confirmations, order-ready alerts, waitlist updates, ~80%+ open rate',
      'Friendtalk (marketing) — promotions, new-menu announcements, birthday and win-back coupons',
      'POS / booking integration — Toast, Square, Yelp/OpenTable webhooks so sends trigger automatically',
      'Bilingual templates (Korean + English) — written and submitted for Kakao approval',
      'Biz Board display ads — set up and managed only when the ROI math supports it',
      'Measurement — unique codes and tracked links so every campaign reports revenue per send',
    ],
    qaTitle: 'KakaoTalk advertising — straight answers',
    qa: [
      {
        q: 'How much does KakaoTalk advertising cost?',
        a: 'For a US Korean business, Channel messages (alimtalk/friendtalk) run roughly $0.007–$0.015 per send. Biz Board display ads are bid-based and need a few hundred dollars/month to test. Most US Korean small businesses spend $300–$1,500/month total. A managed KakaoTalk advertising agency campaign adds $500–$2,000/month on top of media spend.',
      },
      {
        q: 'Can a US business run KakaoTalk ads?',
        a: 'Yes. A US-based business can register a KakaoTalk Channel and bizmessage account and run alimtalk, friendtalk, and Biz Board ads, but the signup and approval flow is Korean-language and assumes a Korean business context. As a KakaoTalk advertising agency we handle the account registration, Kakao approval, and bilingual template submission on your behalf so you do not need a Korean entity or fluent Korean to get live.',
      },
      {
        q: 'What is a KakaoTalk Channel and how is it different from ads?',
        a: 'A KakaoTalk Channel is your business profile inside KakaoTalk — the owned audience of customers who added you, which you reach for free or for pennies through alimtalk and friendtalk. Ads (Biz Board) are paid placements that put your brand in front of people who are not yet your followers. Channel marketing is retention and re-engagement; ads are acquisition. Most US Korean businesses get the best return by building the Channel first, then layering paid ads on top.',
      },
      {
        q: 'Is KakaoTalk advertising worth it vs Google or Meta ads?',
        a: 'For reaching first-generation Korean immigrants who live in KakaoTalk, yes. But it is a retention and re-engagement channel more than an acquisition channel. The strongest setup uses Google/Meta to acquire new customers and KakaoTalk to retain and re-activate them. Used as your only acquisition channel, KakaoTalk underperforms.',
      },
      {
        q: 'Do I need an agency, or can I run it myself?',
        a: 'The build is the hard part; the running is not. An agency earns its fee on Channel/bizmessage approval, bilingual template design, and POS integration. After setup, weekly sends are manageable in-house. For a single location, a fixed-scope build plus self-managed sends is usually the better economics — which is exactly how we scope it.',
      },
      {
        q: 'How do you measure ROI?',
        a: 'Every send carries a unique coupon code or a tracked link, and we divide attributed revenue by total cost. Alimtalk-driven re-engagement (winback, birthday, waitlist) typically returns $8–$25 per dollar of messaging cost because the audience already knows you.',
      },
    ],
    whyTitle: 'Why Zoe Lumos for KakaoTalk advertising',
    why: 'We are a fully bilingual (Korean + English) studio in Fort Lee, NJ that builds the whole stack — website, KakaoTalk, and SEO/GEO — so your Channel connects to a site that actually converts. Fixed-scope build, no monthly retainer trap. Read the full breakdown in our guides: the KakaoTalk Channel setup playbook and the KakaoTalk advertising cost & ROI guide.',
    pricing: 'Fixed-scope KakaoTalk setup, then self-managed or light retainer — no lock-in. Free 30-minute scoping call first.',
    links: 'KakaoTalk guides',
    relatedTitle: 'Related KakaoTalk services & guides',
    r1: 'Google & social ad management (광고대행) →',
    r2: 'KakaoTalk Channel website integration →',
    r3: 'KakaoTalk advertising agency guide (US, 2026) →',
    r4: 'KakaoTalk Channel for US Korean business →',
    cta: 'Start a KakaoTalk setup',
    g1: 'KakaoTalk Channel setup (20-min) →',
    g2: 'KakaoTalk advertising cost & ROI →',
  },
  ko: {
    eyebrow: '서비스 · 카카오톡 광고 대행 · 채널 마케팅',
    h1Lead: '카카오톡 광고 대행,',
    h1Sub: '본전을 뽑는 방식.',
    intro:
      'ZOE LUMOS는 미국 전역 한인 비즈니스를 위한 카카오톡 광고 대행·채널 마케팅을 셋업·운영합니다 — 채널, 알림톡/친구톡 자동화, 비즈보드 광고, 이중언어 크리에이티브. POS·예약 시스템에 연결해 메시지가 자동 발송되게 하고, ROI에 맞춰 조율합니다. 알림톡 재참여는 보통 메시지 비용 $1당 $8–$25를 돌려줍니다 — 발송당 비용이 몇 센트이고 오디언스가 이미 당신을 알기 때문입니다.',
    whatTitle: '카카오톡 채널 마케팅 셋업 항목',
    whatItems: [
      '카카오톡 채널 + 비즈메시지 계정 — 등록과 카카오 승인 대행',
      '알림톡 (거래성) — 예약 확인, 주문 준비 알림, 웨이팅 업데이트, 오픈율 약 80% 이상',
      '친구톡 (마케팅) — 프로모션, 신메뉴 공지, 생일·윈백 쿠폰',
      'POS·예약 연동 — Toast, Square, Yelp/OpenTable 웹훅으로 자동 발송',
      '이중언어 템플릿 (한국어 + 영어) — 작성 및 카카오 승인 제출',
      '비즈보드 디스플레이 광고 — ROI가 맞을 때만 셋업·운영',
      '측정 — 고유 코드·추적 링크로 캠페인마다 발송당 매출 리포트',
    ],
    qaTitle: '카카오톡 광고 — 솔직한 답변',
    qa: [
      {
        q: '카카오톡 광고 대행 비용은? (미국 한인 비즈니스 기준)',
        a: '채널 메시지(알림톡/친구톡)는 발송당 약 $0.007–$0.015. 비즈보드 디스플레이 광고는 입찰 기반으로 테스트에 월 수백 달러 필요. 대부분 미국 한인 소상공인은 월 총 $300–$1,500을 씁니다. 관리형 카카오톡 광고 대행 캠페인은 매체비 위에 월 $500–$2,000 추가.',
      },
      {
        q: '미국 비즈니스도 카카오톡 광고를 집행할 수 있나요?',
        a: '네. 미국에 있는 비즈니스도 카카오톡 채널·비즈메시지 계정을 등록하고 알림톡·친구톡·비즈보드 광고를 집행할 수 있습니다. 다만 가입과 승인 절차가 한국어 기반이고 한국 사업자 환경을 전제로 합니다. 저희가 카카오톡 광고 대행사로서 계정 등록, 카카오 승인, 이중언어 템플릿 제출을 대신 처리하므로 한국 법인이나 유창한 한국어 없이도 시작할 수 있습니다.',
      },
      {
        q: '카카오톡 채널과 광고는 어떻게 다른가요?',
        a: '카카오톡 채널은 카카오톡 안의 비즈니스 프로필 — 당신을 추가한 고객이라는 자기 소유 오디언스이며, 알림톡·친구톡으로 무료 또는 몇 센트에 도달합니다. 광고(비즈보드)는 아직 팔로워가 아닌 사람에게 브랜드를 노출하는 유료 지면입니다. 채널 마케팅은 유지·재참여, 광고는 신규 획득. 대부분 미국 한인 비즈니스는 채널을 먼저 키우고 그 위에 유료 광고를 얹을 때 가장 높은 회수를 봅니다.',
      },
      {
        q: '구글·메타 광고 대비 카카오톡 광고가 할 가치가 있나요?',
        a: '카카오톡에 사는 1세대 한인 이민자에게 도달하려면 네. 단 획득보다 유지·재참여 채널입니다. 가장 강력한 구성은 구글/메타로 신규 손님을 획득하고 카카오톡으로 유지·재활성화하는 것. 유일한 획득 채널로만 쓰면 성과가 떨어집니다.',
      },
      {
        q: '대행사가 필요한가요, 직접 해도 되나요?',
        a: '어려운 건 구축이지 운영이 아닙니다. 대행사는 채널·비즈메시지 승인, 이중언어 템플릿 디자인, POS 연동에서 값을 합니다. 셋업 후 주간 발송은 자체 운영 가능. 단일 매장이라면 고정 범위 구축 + 자체 운영이 보통 더 경제적이며, 저희도 그렇게 설계합니다.',
      },
      {
        q: 'ROI는 어떻게 측정하나요?',
        a: '모든 발송에 고유 쿠폰 코드나 추적 링크를 넣고 귀속 매출을 총비용으로 나눕니다. 알림톡 기반 재참여(윈백, 생일, 웨이팅)는 오디언스가 이미 당신을 알기에 보통 메시지 비용 $1당 $8–$25를 돌려줍니다.',
      },
    ],
    whyTitle: '왜 ZOE LUMOS 카카오톡 광고 대행인가',
    why: '저희는 뉴저지 포트리의 완전한 이중언어(한국어 + 영어) 스튜디오로 전체 스택 — 웹사이트, 카카오톡, SEO/GEO — 을 구축합니다. 그래서 채널이 실제로 전환되는 사이트와 연결됩니다. 고정 범위 구축, 월 리테이너 함정 없음. 자세한 내용은 가이드에서 — 카카오톡 채널 셋업 플레이북과 카카오톡 광고 비용·ROI 가이드.',
    pricing: '고정 범위 카카오톡 셋업, 이후 자체 운영 또는 가벼운 리테이너 — 락인 없음. 무료 30분 스코핑 상담 먼저.',
    links: '카카오톡 가이드',
    relatedTitle: '관련 카카오톡 서비스·가이드',
    r1: '구글·소셜 광고대행 →',
    r2: '카카오톡 채널 웹사이트 연동 →',
    r3: '카카오톡 광고 대행 가이드 (미국, 2026) →',
    r4: '미국 한인 비즈니스 카카오톡 채널 →',
    cta: '카카오톡 셋업 시작하기',
    g1: '카카오톡 채널 셋업 (20분) →',
    g2: '카카오톡 광고 비용·ROI →',
  },
} as const

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const enUrl = `${BASE}/services/kakaotalk-marketing-usa`
  const koUrl = `${BASE}/ko/services/kakaotalk-marketing-usa`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      locale === 'ko'
        ? '카카오톡 마케팅·광고 대행 (미국 한인 비즈니스)'
        : 'KakaoTalk Marketing & Advertising for US Korean Businesses',
    serviceType: locale === 'ko' ? '카카오톡 마케팅 · 광고' : 'KakaoTalk marketing and advertising',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS', url: BASE },
    areaServed: 'US',
    audience: { '@type': 'BusinessAudience', audienceType: 'Korean-American businesses' },
    availableLanguage: ['en', 'ko'],
    url: pageUrl,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.qa.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: locale === 'ko' ? `${BASE}/ko` : BASE },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '서비스' : 'Services', item: pageUrl },
      { '@type': 'ListItem', position: 3, name: locale === 'ko' ? '카카오톡 마케팅' : 'KakaoTalk Marketing', item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        <section className="container-edge pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-2xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-8">{t.whatTitle}</h2>
          <ul className="space-y-3 max-w-3xl">
            {t.whatItems.map((it, i) => (
              <li key={i} className="flex gap-4 py-3 border-b border-hairline text-graphite">
                <span className="overline text-ash mt-1">0{i + 1}</span>
                <span className="leading-[1.7]">{it}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-10">{t.qaTitle}</h2>
          <div className="space-y-8 max-w-3xl">
            {t.qa.map((x, i) => (
              <div key={i}>
                <h3 className="font-display text-xl md:text-2xl tracking-luxury text-ink mb-3">{x.q}</h3>
                <p className="text-graphite leading-[1.7]">{x.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-6">{t.whyTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl">{t.why}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`${prefix}/blog/kakaotalk-channel-us-korean-business`} className="overline text-ink hover:text-gold transition-colors">
              {t.g1}
            </Link>
            <Link href={`${prefix}/blog/kakaotalk-advertising-cost-roi-korean-business-2026`} className="overline text-ink hover:text-gold transition-colors">
              {t.g2}
            </Link>
          </div>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <p className="font-display text-xl md:text-2xl tracking-luxury max-w-3xl leading-[1.4]">{t.pricing}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-sm tracking-luxury mb-8">{t.relatedTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            <Link href={`${prefix}/광고대행`} className="block py-4 border-b border-hairline text-graphite hover:text-gold transition-colors leading-[1.7]">
              {t.r1}
            </Link>
            <Link href={`${prefix}/services/kakaotalk-integration`} className="block py-4 border-b border-hairline text-graphite hover:text-gold transition-colors leading-[1.7]">
              {t.r2}
            </Link>
            <Link href={`${prefix}/blog/kakaotalk-advertising-agency-usa-guide-2026`} className="block py-4 border-b border-hairline text-graphite hover:text-gold transition-colors leading-[1.7]">
              {t.r3}
            </Link>
            <Link href={`${prefix}/blog/kakaotalk-channel-us-korean-business`} className="block py-4 border-b border-hairline text-graphite hover:text-gold transition-colors leading-[1.7]">
              {t.r4}
            </Link>
          </div>
        </section>

        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <Link
            href={`${prefix}/#contact`}
            className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-ink text-ivory text-[16px]"
          >
            {t.cta} <span aria-hidden>→</span>
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
