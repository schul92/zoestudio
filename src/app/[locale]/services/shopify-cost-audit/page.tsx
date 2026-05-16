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
  const enUrl = `${baseUrl}/services/shopify-cost-audit`
  const koUrl = `${baseUrl}/ko/services/shopify-cost-audit`

  if (locale === 'ko') {
    return {
      title: '무료 Shopify 비용 감사 — 월 $200-800 절감 식별 | 한인 비즈니스 | ZOE LUMOS',
      description: '7일 무료 Shopify 비용 감사. Shopify Expert가 전체 스택 감사 + 월 $200-$800 절감 식별. 본인이 직접 해지하거나, $899 추가로 우리가 대신 실행. 한·영 이중언어.',
      keywords: 'shopify 비용 절감, shopify 앱 감사, shopify 비용 절약, 쇼피파이 앱 정리, 쇼피파이 비용 감사, 무료 shopify 감사, shopify cost audit Korean, shopify app audit, reduce shopify costs Korean business',
      alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
      openGraph: {
        title: '무료 Shopify 비용 감사 — 월 $200-800 절감 식별',
        description: '7일 무료 Shopify 비용 감사. 본인이 직접 해지하거나 $899 추가로 우리가 실행.',
        url: koUrl,
        siteName: 'ZOE LUMOS',
        locale: 'ko_KR',
        type: 'website',
        images: [{ url: `${baseUrl}/api/og?title=%EB%AC%B4%EB%A3%8C+Shopify+%EB%B9%84%EC%9A%A9+%EA%B0%90%EC%82%AC&subtitle=Zoe+Lumos+%C2%B7+Shopify+Expert`, width: 1200, height: 630 }],
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }
  }

  return {
    title: 'Free Shopify Cost Audit — Find $200-$800/mo in Savings (7-Day Turnaround) | ZOE LUMOS',
    description: 'Free 7-day Shopify cost audit. Shopify Expert reviews your full stack (apps, plan, subscriptions, payment processors) and identifies $200-$800/mo in cuttable spend. Keep the report and execute yourself, or pay $899 for full implementation.',
    keywords: 'free shopify cost audit, shopify audit, shopify app audit, reduce shopify costs, shopify expense reduction, shopify expert nj, shopify developer korean, shopify app review, cut shopify monthly costs, shopify subscription audit, shopify plan optimization, free shopify audit Korean',
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: 'Free Shopify Cost Audit — Find $200-$800/mo in Savings',
      description: 'Free 7-day audit by a Shopify Expert. Keep the report. Optional $899 implementation if you want us to execute.',
      url: enUrl,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      type: 'website',
      images: [{ url: `${baseUrl}/api/og?title=Free+Shopify+Cost+Audit&subtitle=Zoe+Lumos+%C2%B7+Shopify+Expert`, width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

const COPY = {
  en: {
    eyebrow: 'Service · Free Shopify Expert Cost Audit',
    h1Lead: 'Free 7-day audit.',
    h1Sub: '$200-$800/mo in savings, identified.',
    intro: 'Most Shopify stores we audit are overpaying for apps that duplicate native functionality, plan tiers they\'ve outgrown or never grew into, and subscription tools that haven\'t moved a single sale in 12 months. We are a Shopify Expert + Korean-American studio. We audit your entire stack — apps, plan, payment processors, marketing tools — for free. You keep the report. Execute the cancellations yourself, or hire us to do it for a flat $899.',
    statsTitle: 'Real audit results',
    stats: [
      { k: 'Free', v: 'Audit cost' },
      { k: '$3,600-$9,600', v: 'Typical annual savings identified' },
      { k: '12-18', v: 'Apps audited per store' },
      { k: '4-8', v: 'Apps we recommend cancelling' },
    ],
    whatTitle: 'What is included',
    whatItems: [
      'Full Shopify app inventory — every active app, its monthly cost, and whether it\'s actually driving revenue',
      'Plan tier review — Basic vs Shopify vs Advanced vs Plus — most stores are on the wrong tier for their volume',
      'Marketing stack audit — Klaviyo, Mailchimp, Yotpo, Privy, Postscript, etc. Identify duplicates and unused features',
      'Payment processor review — Shopify Payments vs Stripe vs PayPal fees, especially for international Korean customers',
      'Theme + checkout app audit — apps slowing your checkout cost you sales (we measure conversion impact)',
      'Plan downgrade or app negotiation done for you (we contact vendors directly)',
      'Written audit report with prioritized cancellation list and projected monthly savings',
      'Optional: implementation of all the changes (extra $400 fixed-scope)',
    ],
    whyTitle: 'Why this matters in 2026',
    why: 'Shopify\'s app marketplace has 8,000+ apps, and the average mid-size store accumulates 12-18 of them over a few years — most installed by a previous agency, a previous developer, or in response to a problem that was solved differently a year later. Nobody ever audits and cancels. The cumulative cost compounds silently: $29 here, $49 there, a $99 enterprise tool the store outgrew. The average Korean SMB Shopify store we audit is paying $400-700/month in apps alone, and 60-75% of that spend is providing zero or negative ROI.',
    guaranteeTitle: 'Why we offer it free',
    guarantee: 'Most of the cost-audit value lands inside the first 60 minutes of looking at your stack. We make this audit free because (a) it builds trust before any real engagement, (b) it surfaces deeper problems we can help with later (rebuilds, migrations, KakaoTalk integration), and (c) we have run 23 of these audits across Korean SMB Shopify stores in 2025-2026 and have identified $200+/month in savings on every single one. There is no catch. You keep the report whether you ever hire us again or not.',
    processTitle: 'The 7-day process',
    process: [
      'Day 1: You grant us collaborator access to your Shopify admin (we give you the exact permissions list)',
      'Day 2-3: We inventory every app, subscription, payment processor, and plan tier — full stack audit',
      'Day 4-5: We measure each app\'s actual revenue contribution (or lack of) via Shopify analytics',
      'Day 6: We prepare the prioritized cancellation list with projected monthly savings + risk assessment for each',
      'Day 7: We deliver the written report + 30-min video walkthrough call (English or Korean)',
      'After Day 7: You execute the cancellations yourself OR we implement for fixed $400 add-on',
    ],
    pricingTitle: 'Pricing',
    pricing: 'Audit + written report + 30-min walkthrough call: FREE · Optional full implementation: $899 flat (we cancel apps, downgrade plan, negotiate with vendors on your behalf) · No retainer, no subscription, no upsell pressure',
    casestudyTitle: 'Why we know this works',
    casestudy: 'Our most-public case study is TJ Flowers (Manhattan florist), where we removed two third-party apps (Pickeasy + Buunto) that were both breaking the checkout AND costing $79/month combined. We rebuilt that functionality natively in Liquid — saved the monthly cost AND lifted booking completion from 53% to 84%. The cost audit work isn\'t glamorous, but it pays for itself faster than any other service we offer.',
    cta: 'Start my free Shopify cost audit',
  },
  ko: {
    eyebrow: '서비스 · 무료 Shopify Expert 비용 감사',
    h1Lead: '7일 무료 감사.',
    h1Sub: '월 $200-800 절감 식별.',
    intro: '대부분 감사하는 Shopify 스토어는 — 네이티브 기능을 중복하는 앱, 성장 안 한 (또는 졸업한) 요금제, 12개월 동안 단 한 건의 매출도 못 만든 구독 도구에 — 과지불 중. Shopify Expert + 한인·미국인 스튜디오. 전체 스택 — 앱, 요금제, 결제 프로세서, 마케팅 도구 — 무료로 감사. 보고서는 본인 소유. 본인이 직접 해지 실행하거나, 고정 $899로 우리가 대신 처리.',
    statsTitle: '실제 감사 결과',
    stats: [
      { k: '무료', v: '감사 비용' },
      { k: '$3,600-$9,600', v: '일반 연간 식별 절감액' },
      { k: '12-18개', v: '스토어당 감사 앱 수' },
      { k: '4-8개', v: '해지 권장 앱 수' },
    ],
    whatTitle: '포함 사항',
    whatItems: [
      '전체 Shopify 앱 인벤토리 — 활성 앱 전부, 월 비용, 실제 매출 기여 여부',
      '요금제 검토 — Basic vs Shopify vs Advanced vs Plus — 대부분 볼륨에 안 맞는 티어',
      '마케팅 스택 감사 — Klaviyo, Mailchimp, Yotpo, Privy, Postscript 등. 중복·미사용 기능 식별',
      '결제 프로세서 검토 — Shopify Payments vs Stripe vs PayPal 수수료, 특히 한국 국제 고객용',
      '테마 + 체크아웃 앱 감사 — 체크아웃 속도 느리게 하는 앱은 매출 손실 (전환 영향 측정)',
      '대신 요금제 다운그레이드 또는 앱 협상 (벤더 직접 연락)',
      '우선순위 해지 목록 + 예상 월 절감액 포함 서면 감사 보고서',
      '선택 — 모든 변경 구현 ($400 추가 고정 범위)',
    ],
    whyTitle: '왜 2026년 중요한가',
    why: 'Shopify 앱 마켓플레이스에 8,000+ 앱, 일반 중간 규모 스토어는 몇 년에 걸쳐 12-18개 누적 — 대부분 이전 대행사·개발자 설치, 또는 1년 후 다른 방식으로 해결된 문제 대응. 아무도 감사·해지 안 함. 누적 비용 조용히 복리 — 여기 $29, 저기 $49, 스토어가 졸업한 $99 엔터프라이즈 도구. 우리가 감사하는 평균 한인 SMB Shopify 스토어가 앱비만 월 $400-700 지불 + 그 지출의 60-75%가 ROI 0 또는 마이너스.',
    guaranteeTitle: '왜 무료로 제공하나',
    guarantee: '비용 감사 가치 대부분이 스택 보기 시작 후 첫 60분 안에 발견. 무료로 제공하는 이유 — (a) 실제 약정 전에 신뢰 구축, (b) 우리가 나중에 도울 수 있는 더 깊은 문제 발견 (재구축, 이전, 카카오톡 통합), (c) 2025-2026 한인 SMB Shopify 스토어 23건 감사 — 매 건 월 $200+ 절감 식별. 함정 없음. 우리를 다시 고용 안 해도 보고서는 본인 소유.',
    processTitle: '7일 프로세스',
    process: [
      '1일차 — Shopify 관리자에 협업자 접근권 부여 (정확한 권한 목록 제공)',
      '2-3일차 — 모든 앱, 구독, 결제 프로세서, 요금제 인벤토리 — 전체 스택 감사',
      '4-5일차 — Shopify 애널리틱스로 각 앱의 실제 매출 기여 (또는 부족) 측정',
      '6일차 — 예상 월 절감액 + 각 항목 위험 평가 포함 우선순위 해지 목록 준비',
      '7일차 — 서면 보고서 + 30분 영상 워크스루 콜 제공 (한국어 또는 영어)',
      '7일차 이후 — 본인이 직접 해지 실행 OR 우리가 $400 추가로 구현',
    ],
    pricingTitle: '가격',
    pricing: '감사 + 서면 보고서 + 30분 워크스루 콜 — 무료 · 선택 전체 구현 — 고정 $899 (대신 앱 해지, 요금제 다운그레이드, 벤더 협상) · 리테이너 X, 구독 X, 업셀 압박 X',
    casestudyTitle: '왜 작동하는지 알 수 있는 이유',
    casestudy: '가장 공개된 케이스 스터디 — TJ Flowers (맨해튼 플라워샵), 체크아웃을 망가뜨리면서 합쳐 월 $79 비용도 들던 3자 앱 두 개 (Pickeasy + Buunto) 제거. Liquid에 네이티브 재구축 — 월 비용 절감 + 예약 완료율 53% → 84% 상승. 비용 감사 작업은 화려하진 않지만 우리가 제공하는 어떤 서비스보다 빠르게 회수.',
    cta: '무료 Shopify 비용 감사 시작',
  },
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const t = COPY[locale]
  const prefix = locale === 'ko' ? '/ko' : ''
  const baseUrl = 'https://www.zoelumos.com'
  const enUrl = `${baseUrl}/services/shopify-cost-audit`
  const koUrl = `${baseUrl}/ko/services/shopify-cost-audit`
  const pageUrl = locale === 'ko' ? koUrl : enUrl

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ko' ? 'Shopify 비용 감사' : 'Shopify Cost Audit',
    serviceType: locale === 'ko' ? 'Shopify 컨설팅 · 비용 최적화' : 'Shopify consulting · cost optimization',
    provider: { '@type': 'Organization', name: 'ZOE LUMOS', url: baseUrl },
    audience: { '@type': 'BusinessAudience', audienceType: 'Korean-American Shopify store owners' },
    availableLanguage: ['en', 'ko'],
    offers: [
      { '@type': 'Offer', priceCurrency: 'USD', price: '0', name: locale === 'ko' ? '무료 감사' : 'Free audit', description: locale === 'ko' ? '서면 감사 보고서 + 30분 워크스루 — 무료' : 'Written audit report + 30-min walkthrough — free' },
      { '@type': 'Offer', priceCurrency: 'USD', price: '899', name: locale === 'ko' ? '선택 구현' : 'Optional implementation', description: locale === 'ko' ? '감사 후 본인이 직접 실행하거나, 고정 $899로 우리가 모든 해지 · 다운그레이드 · 협상 실행' : 'After the free audit, execute yourself OR pay flat $899 for us to do all cancellations, plan downgrades, and vendor negotiations' },
    ],
    url: pageUrl,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'ko' ? '정말 무료인가요? 함정 없나요?' : 'Is the audit really free? What\'s the catch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'ko'
            ? '네 — 정말 무료. 함정 없음. 7일 안에 완전한 서면 감사 보고서 + 30분 영상 워크스루 받으십니다. 본인이 직접 해지 실행해도 됩니다 (실제로 많은 분이 그렇게 합니다). 우리를 다시 안 써도 됩니다. 무료로 제공하는 이유 — 신뢰 구축 + 우리가 도울 수 있는 더 큰 문제 (재구축, 이전) 발견 + 어떤 한 사람의 시간 60분이면 가치 대부분 발견 가능. 2025-2026 23건 감사 — 매 건 월 $200+ 절감 식별.'
            : 'Yes — actually free. No catch. You get a complete written audit report + 30-min video walkthrough within 7 days. You can execute the cancellations yourself (many clients do). You are not obligated to ever hire us again. We offer it free because (a) it builds trust, (b) it surfaces bigger problems we can help with (rebuilds, migrations), and (c) most of the value lands inside the first 60 minutes of looking. We have run 23 audits in 2025-2026 and identified $200+/month in savings on every single one.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'ko' ? '얼마나 걸리나요?' : 'How long does the audit take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'ko'
            ? '7일. 1일차 — 협업자 접근권 부여. 2-5일차 — 앱·구독·요금제 감사. 6일차 — 우선순위 해지 목록 준비. 7일차 — 서면 보고서 + 30분 영상 워크스루 콜.'
            : '7 days. Day 1: collaborator access granted. Days 2-5: full stack audit (apps, subscriptions, plan, payment processors). Day 6: prioritized cancellation list. Day 7: written report + 30-min walkthrough call.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'ko' ? '앱 해지를 본인이 직접 해야 하나요?' : 'Do I have to cancel the apps myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'ko'
            ? '두 옵션 — (1) 무료 감사 후 본인이 직접 해지 실행 (단순함, 각 해지 3-5분). (2) 고정 $899로 우리가 모든 해지 실행 + 요금제 다운그레이드 + 필요 시 벤더 직접 협상. 무료 감사 자체엔 의무 없음 — 보고서 받고 결정.'
            : 'Two options: (1) Take the free audit and execute the cancellations yourself (simple — 3-5 minutes per cancellation). (2) Pay flat $899 for us to execute everything, downgrade your plan, and negotiate with vendors directly. The free audit itself has no commitment — get the report, then decide.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'ko' ? '한국어 가능한가요?' : 'Is the service available in Korean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'ko'
            ? '네. 모든 워크스루 콜, 보고서, 후속 한국어·영어 양쪽 가능. 한인 미국인 스튜디오 — 한국어가 1세대 사장님께 결정적.'
            : 'Yes. All walkthrough calls, written reports, and follow-up are available in both Korean and English. We are a Korean-American studio — Korean is critical for first-generation owners.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'ko' ? '내 Shopify 데이터가 안전한가요?' : 'Is my Shopify data safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'ko'
            ? '네. 협업자 접근권 — 우리에게 필요한 정확한 권한만 부여 (앱, 요금제, 결제 가시성 — 고객 데이터 X). 약정 종료 시 접근권 즉시 회수 가능. 우리는 어떤 데이터도 다운로드·내보내기·외부 시스템에 저장 안 함.'
            : 'Yes. We use Shopify\'s collaborator access — you grant the exact permissions we need (app, plan, payment visibility — NO customer data access). You can revoke access immediately when the engagement ends. We never download, export, or store any of your data in external systems.',
        },
      },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: locale === 'ko' ? `${baseUrl}/ko` : baseUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '서비스' : 'Services', item: `${baseUrl}${prefix}/services/shopify-cost-audit` },
      { '@type': 'ListItem', position: 3, name: locale === 'ko' ? 'Shopify 비용 감사' : 'Shopify Cost Audit', item: pageUrl },
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
        <section className="container-edge pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="overline text-ash mb-8">{t.eyebrow}</div>
          <h1 className="font-display text-display-lg md:text-display-xl tracking-luxury leading-[1.05]">
            <span className="block">{t.h1Lead}</span>
            <span className="block italic font-light text-gold">{t.h1Sub}</span>
          </h1>
          <p className="mt-10 max-w-2xl text-body-lg text-graphite leading-[1.7]">{t.intro}</p>
        </section>

        {/* Stats */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="overline text-ash mb-8">{t.statsTitle}</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {t.stats.map((s, i) => (
              <li key={i} className="flex flex-col">
                <span className="font-display text-[clamp(28px,3.4vw,44px)] leading-none tracking-[-0.02em] text-ink">{s.k}</span>
                <span className="mt-2 text-[13px] uppercase tracking-[0.18em] text-graphite">{s.v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.whatTitle}</h2>
          <ul className="space-y-3 max-w-3xl">
            {t.whatItems.map((it, i) => (
              <li key={i} className="flex gap-4 py-3 border-b border-hairline text-graphite">
                <span className="overline text-ash mt-1 shrink-0">0{i + 1}</span>
                <span className="leading-[1.7]">{it}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why this matters */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.whyTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl">{t.why}</p>
        </section>

        {/* Guarantee */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline bg-bone">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.guaranteeTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl">{t.guarantee}</p>
        </section>

        {/* Process */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-8">{t.processTitle}</h2>
          <ol className="space-y-3 max-w-3xl">
            {t.process.map((it, i) => (
              <li key={i} className="flex gap-4 py-3 border-b border-hairline text-graphite">
                <span className="overline text-ash mt-1 shrink-0">0{i + 1}</span>
                <span className="leading-[1.7]">{it}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Case study tie-in */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.casestudyTitle}</h2>
          <p className="text-body-lg text-graphite leading-[1.7] max-w-3xl mb-6">{t.casestudy}</p>
          <Link
            href={`${prefix}/blog/tj-flowers-shopify-revamp-case-study`}
            className="inline-flex items-center gap-2 text-[15px] text-ink border-b border-ink pb-1"
          >
            {locale === 'ko' ? 'TJ Flowers 케이스 스터디 전체 보기' : 'Read the full TJ Flowers case study'}
            <span aria-hidden>→</span>
          </Link>
        </section>

        {/* Pricing */}
        <section className="container-edge py-12 md:py-16 border-t border-hairline">
          <h2 className="font-display text-display-md tracking-luxury mb-6">{t.pricingTitle}</h2>
          <p className="font-display text-xl md:text-2xl tracking-luxury text-graphite leading-[1.5]">{t.pricing}</p>
        </section>

        {/* CTA */}
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
