import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import ContactWrapper from '@/components/sections/ContactWrapper'
import InView from '@/components/ui/motion/InView'
import { breadcrumbList, baseUrl } from '@/config/schemas'
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
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const url = `${BASE}${isKo ? '/ko' : ''}/contact`

  return {
    title: isKo
      ? '문의 · 상담 — 웹사이트 제작 견적 문의 | ZOE LUMOS'
      : 'Contact — Free Website Consultation | Zoe Lumos',
    description: isKo
      ? '웹사이트 제작 문의, 상담, 견적 — 모두 무료입니다. 이메일 또는 카카오톡으로 문의하시면 영업일 기준 24시간 내 한국어로 답변드립니다. 뉴저지 포트리 기반, 미국 전역 서비스.'
      : 'Website inquiries, consultations, and quotes — all free. Email or KakaoTalk us and a real person replies within one business day, in English or Korean. Based in Fort Lee, NJ, serving the entire US.',
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/contact`,
        en: `${BASE}/contact`,
        ko: `${BASE}/ko/contact`,
      },
    },
    openGraph: {
      title: isKo ? '문의 · 상담 — ZOE LUMOS' : 'Contact — Zoe Lumos',
      description: isKo
        ? '웹사이트 제작 문의와 견적 상담, 모두 무료. 영업일 24시간 내 답변.'
        : 'Free website consultation and quotes. Reply within one business day.',
      url,
      siteName: 'ZOE LUMOS',
      locale: isKo ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

const copy = {
  en: {
    eyebrow: 'Contact',
    headlineA: 'One message.',
    headlineB: 'A real reply.',
    intro:
      'No phone tag, no sales script. Write a few sentences about your business and a real person replies within one business day — in English or Korean.',
    channelsLabel: 'Direct channels',
    emailLabel: 'Email',
    kakaoLabel: 'KakaoTalk 1:1 chat',
    kakaoNote: 'Korean OK · usually fastest',
    estimatorTitle: 'Want a number first?',
    estimatorBody:
      'Answer four questions in the 10-second cost estimator and see an honest price range before you even write to us.',
    estimatorCta: '10-second cost estimator',
    areaLabel: 'Where we work',
    areaBody:
      'Based in Fort Lee, New Jersey — serving Korean-American businesses across all 50 states. Every project can run fully remote.',
    responseLabel: 'Response time',
    responseBody:
      'We reply within one business day (Mon–Fri, 9–6 ET). No auto-responders — a person reads your message and answers it.',
    faqLabel: 'Frequently asked',
    faqs: [
      {
        q: 'Is the consultation free?',
        a: 'Yes — the consultation is completely free. The first reply, the 30-minute call, and the written proposal all cost nothing, and there is no obligation to proceed.',
      },
      {
        q: 'How does a project start?',
        a: 'A project starts in three steps: you send an inquiry, we hold a free 30-minute call within 2–3 days, and within the first week you receive a written proposal with scope, timeline, and a fixed price.',
      },
      {
        q: 'How long does a website take to build?',
        a: 'Most small-business websites take 2–6 weeks from kickoff to launch, depending on scope. A simple brochure site lands near two weeks; e-commerce or booking-heavy builds run longer, and you get a concrete timeline in the proposal.',
      },
      {
        q: 'Can everything be done remotely?',
        a: 'Yes — 100% of the process can run remotely over email, KakaoTalk, and video calls. We work with clients in every US state without a single in-person meeting, though local Fort Lee-area clients are welcome to meet.',
      },
    ],
  },
  ko: {
    eyebrow: '문의 · 상담',
    headlineA: '한 통의 메시지,',
    headlineB: '진짜 사람의 답장.',
    intro:
      '영업 전화도, 스크립트도 없습니다. 비즈니스에 대해 몇 줄만 남겨주시면 실제 사람이 영업일 기준 24시간 내에 한국어로 답변드립니다.',
    channelsLabel: '바로 연락하기',
    emailLabel: '이메일',
    kakaoLabel: '카카오톡 1:1 채팅',
    kakaoNote: '한국어 OK · 가장 빠른 채널',
    estimatorTitle: '가격부터 알고 싶으세요?',
    estimatorBody:
      '10초 견적 계산기에서 네 가지 질문에 답하면, 문의 전에 솔직한 가격 범위를 먼저 확인할 수 있습니다.',
    estimatorCta: '10초 견적 계산기',
    areaLabel: '서비스 지역',
    areaBody:
      '뉴저지 포트리(Fort Lee) 기반 — 미국 50개 주 전역의 한인 비즈니스와 함께합니다. 모든 프로젝트는 100% 원격 진행이 가능합니다.',
    responseLabel: '답변 시간',
    responseBody:
      '영업일 기준 24시간 내에 답변드립니다 (월–금, 9–6 ET). 자동 응답이 아니라 실제 사람이 읽고 답합니다.',
    faqLabel: '자주 묻는 질문',
    faqs: [
      {
        q: '상담 비용이 있나요?',
        a: '상담은 완전히 무료입니다. 첫 답변, 30분 통화, 서면 제안서까지 비용이 전혀 들지 않으며, 진행 의무도 없습니다.',
      },
      {
        q: '프로젝트는 어떻게 진행되나요?',
        a: '프로젝트는 문의 접수 → 2–3일 내 무료 30분 통화 → 1주 내 범위·일정·확정 가격이 담긴 서면 제안서, 세 단계로 시작됩니다. 제안서 확인 후 진행 여부를 결정하시면 됩니다.',
      },
      {
        q: '웹사이트 제작 기간은 얼마나 걸리나요?',
        a: '대부분의 소규모 비즈니스 웹사이트는 착수부터 런칭까지 2–6주가 걸립니다. 간단한 소개형 사이트는 2주 안팎, 쇼핑몰이나 예약 기능이 많은 사이트는 더 길어지며, 정확한 일정은 제안서에 명시됩니다.',
      },
      {
        q: '원격으로도 진행할 수 있나요?',
        a: '네, 모든 과정을 100% 원격으로 진행할 수 있습니다. 이메일·카카오톡·화상 통화만으로 미국 전 지역 클라이언트와 작업하며, 포트리 인근 지역은 대면 미팅도 가능합니다.',
      },
    ],
  },
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const isKo = locale === 'ko'
  const t = copy[locale] || copy.en
  const prefix = isKo ? '/ko' : ''
  const base = baseUrl()
  const pageUrl = `${base}${prefix}/contact`

  const crumbs = breadcrumbList([
    { name: isKo ? '홈' : 'Home', url: isKo ? '/ko' : '/' },
    { name: isKo ? '문의' : 'Contact', url: `${prefix}/contact` },
  ])

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#contactpage`,
    url: pageUrl,
    name: isKo
      ? '문의 · 상담 — 웹사이트 제작 견적 문의 | ZOE LUMOS'
      : 'Contact — Free Website Consultation | Zoe Lumos',
    description: isKo
      ? '웹사이트 제작 문의, 상담, 견적 — 모두 무료. 이메일 또는 카카오톡으로 문의하시면 영업일 기준 24시간 내 답변드립니다.'
      : 'Website inquiries, consultations, and quotes — all free. Reply within one business day.',
    inLanguage: isKo ? 'ko-KR' : 'en-US',
    isPartOf: { '@id': `${base}/#website` },
    about: { '@id': `${base}/#localbusiness` },
    publisher: { '@id': `${base}/#organization` },
    breadcrumb: crumbs,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      {/* ContactPage + BreadcrumbList + FAQPage JSON-LD.
          Organization & LocalBusiness/ProfessionalService (#organization,
          #localbusiness) are emitted globally in [locale]/layout.tsx and
          referenced here by @id. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
        {/* HERO */}
        <section className="pt-32 md:pt-44 pb-10 md:pb-14">
          <div className="container-edge">
            <nav className="flex items-center gap-2 overline text-ash mb-10 flex-wrap">
              <Link href={prefix || '/'} className="hover:text-ink transition-colors">
                {isKo ? '홈' : 'Home'}
              </Link>
              <span className="opacity-50">/</span>
              <span className="text-ink">{t.eyebrow}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <h1 className="lg:col-span-8 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] tracking-luxury text-ink">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{t.headlineA}</span>
                </InView>
                <InView as="span" className="mask-row" delay={140}>
                  <span className="mask-rise block italic font-light text-gold fraunces-soft">
                    {t.headlineB}
                  </span>
                </InView>
              </h1>
              <InView as="p" className="reveal lg:col-span-4 text-body-lg text-graphite leading-[1.7]">
                <span>{t.intro}</span>
              </InView>
            </div>
          </div>
        </section>

        {/* REUSED CONTACT FORM — same component as homepage #contact,
            posts to the existing /api/contact endpoint */}
        <ContactWrapper locale={locale} sectionNumber="01" />

        {/* DIRECT CHANNELS — email + KakaoTalk only */}
        <section className="section-pad hair-bottom">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
              <InView className="reveal bg-ivory">
                <a
                  href={
                    isKo
                      ? 'mailto:info@zoelumos.com?subject=%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EC%A0%9C%EC%9E%91%20%EB%AC%B8%EC%9D%98'
                      : 'mailto:info@zoelumos.com?subject=Website%20inquiry'
                  }
                  className="group block p-8 md:p-12 h-full transition-colors hover:bg-bone/60"
                >
                  <p className="overline text-ash mb-6">{t.channelsLabel} · 01</p>
                  <h2 className="font-display text-2xl md:text-3xl tracking-luxury text-ink mb-3">
                    {t.emailLabel}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-body text-graphite group-hover:text-gold transition-colors">
                    info@zoelumos.com
                    <span className="arrow">→</span>
                  </span>
                </a>
              </InView>
              <InView className="reveal bg-ivory" delay={100}>
                <a
                  href="http://pf.kakao.com/_xhxdxmlX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-8 md:p-12 h-full transition-colors hover:bg-bone/60"
                >
                  <p className="overline text-ash mb-6">{t.channelsLabel} · 02</p>
                  <h2 className="font-display text-2xl md:text-3xl tracking-luxury text-ink mb-3">
                    {t.kakaoLabel}
                  </h2>
                  <span className="inline-flex items-center gap-2 text-body text-graphite group-hover:text-gold transition-colors">
                    {t.kakaoNote}
                    <span className="arrow">→</span>
                  </span>
                </a>
              </InView>
            </div>

            {/* Business area + response promise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mt-14 md:mt-16 max-w-4xl">
              <InView className="reveal">
                <p className="overline text-ash mb-4">{t.areaLabel}</p>
                <p className="text-body text-graphite leading-[1.7]">{t.areaBody}</p>
              </InView>
              <InView className="reveal" delay={100}>
                <p className="overline text-ash mb-4">{t.responseLabel}</p>
                <p className="text-body text-graphite leading-[1.7]">{t.responseBody}</p>
              </InView>
            </div>
          </div>
        </section>

        {/* ESTIMATOR LINK BLOCK */}
        <section className="section-pad hair-bottom bg-bone">
          <div className="container-edge">
            <div className="max-w-3xl">
              <InView as="h2" className="reveal font-display text-display-sm md:text-display-lg tracking-luxury text-ink mb-6">
                <span>{t.estimatorTitle}</span>
              </InView>
              <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] mb-8">
                <span>{t.estimatorBody}</span>
              </InView>
              <Link
                href={`${prefix}/tools/website-cost-estimator`}
                data-cursor={isKo ? '견적' : 'Quote'}
                className="btn-ink"
              >
                {t.estimatorCta}
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ — visible content backing the FAQPage schema */}
        <section className="section-pad">
          <div className="container-edge">
            <p className="overline text-ash mb-10">{t.faqLabel}</p>
            <div className="max-w-3xl divide-y divide-hairline border-y border-hairline">
              {t.faqs.map((f, i) => (
                <InView key={f.q} className="reveal py-8" delay={i * 60}>
                  <h3 className="font-display text-xl md:text-2xl tracking-luxury text-ink mb-3">
                    {f.q}
                  </h3>
                  <p className="text-body text-graphite leading-[1.7]">{f.a}</p>
                </InView>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
