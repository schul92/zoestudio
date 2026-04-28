import { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/services/kakaotalk-integration`
  const koUrl = `${baseUrl}/ko/services/kakaotalk-integration`

  if (locale === 'ko') {
    return {
      title: '카카오톡 채널 웹사이트 연동 서비스 | 한인 비즈니스 전용 | ZOE LUMOS',
      description: '미국 한인 비즈니스를 위한 카카오톡 채널 + 웹사이트 통합 서비스. 채널 설정, 플로팅 버튼, 자동 메시지, 광고 연동까지 — 20분 내 시작.',
      alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
      openGraph: { title: '카카오톡 채널 웹사이트 연동 - ZOE LUMOS', description: '20분 내 시작.', url: koUrl, siteName: 'ZOE LUMOS', locale: 'ko_KR', type: 'website' },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }

  return {
    title: 'KakaoTalk Channel Website Integration for Korean-American Businesses | ZOE LUMOS',
    description: 'Done-for-you KakaoTalk Channel setup + website integration for US-based Korean businesses. Floating button, auto-replies, ad linking. 20-min start.',
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: { title: 'KakaoTalk Integration · ZOE LUMOS', description: 'Bring KakaoTalk into your customer flow.', url: enUrl, siteName: 'ZOE LUMOS', locale: 'en_US', type: 'website' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

const COPY = {
  en: {
    eyebrow: 'Service · KakaoTalk Channel + Website',
    h1Lead: 'KakaoTalk',
    h1Sub: 'integrated, end to end.',
    intro: 'Korean-American customers prefer KakaoTalk over email or contact forms — but most US-based Korean businesses still send people through Western channels they ignore. We set up your KakaoTalk Channel, integrate it into your website with a non-intrusive floating button, and wire up auto-replies, broadcasts, and ad-account links so the channel actually delivers conversations, not silence.',
    whatTitle: 'What is included',
    whatItems: [
      'KakaoTalk Channel registration from the US (we handle Korean admin UI)',
      'Floating chat button on every page of your website with brand-matched styling',
      'Welcome message, FAQ auto-replies, and after-hours auto-response in Korean and English',
      'Channel-to-website link tracking via UTM so you know which page sent the chat',
      'KakaoTalk Channel ad account setup if you want paid promotion',
      'Schema.org ContactPoint with KakaoTalk added to your site so Google sees it as a real contact channel',
    ],
    whyTitle: 'Why this matters in 2026',
    why: 'Roughly 85% of first-generation Korean-Americans use KakaoTalk daily. They will ignore "Contact us" forms, ignore generic chatbots, and hesitate to call a phone number — but they will tap a KakaoTalk button without thinking. The conversion gap between Korean-American customers offered KakaoTalk vs forced through a contact form is 3–5x in our audit data.',
    pricing: 'One-time setup: $400 · Optional monthly management $150/mo (broadcast scheduling, response templates, weekly analytics)',
    cta: 'Start KakaoTalk integration',
  },
  ko: {
    eyebrow: '서비스 · 카카오톡 채널 + 웹사이트',
    h1Lead: '카카오톡',
    h1Sub: '엔드투엔드 통합.',
    intro: '한인 고객은 이메일·문의 폼보다 카카오톡을 선호합니다 — 그런데 대부분의 미주 한인 비즈니스는 여전히 무시당하는 서구 채널로 고객을 보냅니다. 카카오톡 채널 등록, 웹사이트에 비침입적인 플로팅 버튼 통합, 자동 응답·단체 메시지·광고 계정 연동까지 처리해 채널이 실제로 대화를 만듭니다 — 침묵이 아니라.',
    whatTitle: '포함 사항',
    whatItems: [
      '미국에서 카카오톡 채널 등록 (한국어 관리자 UI 우리가 처리)',
      '브랜드 톤에 맞춘 플로팅 채팅 버튼 (모든 페이지)',
      '한국어·영어 환영 메시지, FAQ 자동 응답, 영업시간 외 자동 답변',
      '어느 페이지가 채팅을 보냈는지 알 수 있는 UTM 추적',
      '유료 프로모션 원할 시 카카오톡 채널 광고 계정 설정',
      '구글이 실제 연락 채널로 인식하도록 사이트에 Schema.org ContactPoint + 카카오톡 추가',
    ],
    whyTitle: '왜 2026년 중요한가',
    why: '미주 1세 한인의 약 85%가 매일 카카오톡 사용. "Contact us" 폼은 무시, 일반 챗봇 무시, 전화 망설임 — 카카오톡 버튼은 생각 없이 누름. 우리 감사 데이터 기준 카카오톡 제공 vs 폼 강요 시 한인 고객 전환 격차 3–5배.',
    pricing: '일회성 셋업 $400 · 월 관리(선택) $150/월 (단체 메시지 일정, 응답 템플릿, 주간 분석)',
    cta: '카카오톡 통합 시작',
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/services/kakaotalk-integration`
  const koUrl = `${baseUrl}/ko/services/kakaotalk-integration`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ko' ? '카카오톡 채널 웹사이트 통합' : 'KakaoTalk Channel Website Integration',
    serviceType: locale === 'ko' ? '디지털 마케팅 통합' : 'Digital marketing integration',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS', url: baseUrl },
    audience: { '@type': 'BusinessAudience', audienceType: 'Korean-American businesses' },
    availableLanguage: ['en', 'ko'],
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: '400', description: 'One-time KakaoTalk integration setup' },
    url: pageUrl,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: locale === 'ko' ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '서비스' : 'Services', item: `${baseUrl}${prefix}/services/kakaotalk-integration` },
      { '@type': 'ListItem', position: 3, name: locale === 'ko' ? '카카오톡 통합' : 'KakaoTalk Integration', item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        <section className="container-edge pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-2xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.whatTitle}</h2>
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
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.whyTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl">{t.why}</p>
        </section>

        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <p className="font-display text-xl md:text-2xl tracking-luxury">{t.pricing}</p>
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
