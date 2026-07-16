import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import InView from '@/components/ui/motion/InView'
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
  const url = `${BASE}${isKo ? '/ko' : ''}/tools`

  return {
    title: isKo
      ? '무료 도구 — 웹사이트 감사 & 비용 계산기 | ZOE LUMOS'
      : 'Free Tools — Website Audit & Cost Estimator | Zoe Lumos',
    description: isKo
      ? '한인 비즈니스를 위한 무료 도구 모음. 실시간 웹사이트 감사, 제작 비용 계산기 — 가입 없이 바로 사용하세요.'
      : 'Free tools for Korean-American businesses. Instant website audit, project cost estimator — use them right now, no signup.',
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE}/tools`,
        en: `${BASE}/tools`,
        ko: `${BASE}/ko/tools`,
      },
    },
    openGraph: {
      title: isKo ? '무료 도구' : 'Free Tools',
      description: isKo
        ? '실시간 웹사이트 감사와 제작 비용 계산기 — 한인 비즈니스를 위한 무료 도구.'
        : 'Instant website audit and cost estimator — free tools for Korean-American businesses.',
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
    eyebrow: 'Free tools',
    headlineA: 'Tools that answer',
    headlineB: 'the real questions.',
    intro:
      "“Is my site any good?” and “what will this cost?” — the two questions every business owner has and no agency answers honestly. Here are both, free, no email gate.",
    tools: [
      {
        href: '/audit',
        num: '01',
        name: 'Website Audit',
        desc: "Enter your URL, get Google's real Lighthouse scores — Performance, SEO, Accessibility, Best Practices — in 30 seconds, benchmarked against zoelumos.com.",
        cta: 'Audit my site',
      },
      {
        href: '/tools/website-cost-estimator',
        num: '02',
        name: 'Cost Estimator',
        desc: 'Answer four questions and see an honest price range for your project in seconds. No “request a quote” wall — the same way we scope it on a call.',
        cta: 'Estimate my project',
      },
    ],
    ctaTitle: 'Need a human instead?',
    ctaBody: 'Skip the tools and just talk to us. Free 30-minute call, bilingual, no pressure.',
    ctaBtn: 'Start a conversation',
  },
  ko: {
    eyebrow: '무료 도구',
    headlineA: '진짜 궁금한 것에',
    headlineB: '답하는 도구.',
    intro:
      '“내 사이트 괜찮은가?” 그리고 “비용이 얼마지?” — 모든 사장님이 갖는 두 질문, 그런데 어떤 에이전시도 솔직히 답하지 않습니다. 여기 둘 다, 무료로, 이메일 없이.',
    tools: [
      {
        href: '/audit',
        num: '01',
        name: '웹사이트 감사',
        desc: 'URL을 입력하면 구글 Lighthouse 실제 점수 — 성능, SEO, 접근성, 모범 사례 — 를 30초 만에. zoelumos.com과 비교해 보여드립니다.',
        cta: '내 사이트 감사하기',
      },
      {
        href: '/tools/website-cost-estimator',
        num: '02',
        name: '비용 계산기',
        desc: '네 가지 질문에 답하면 몇 초 만에 솔직한 가격 범위를 확인하세요. “견적 문의” 벽 없이 — 통화로 견적 낼 때와 똑같이.',
        cta: '내 프로젝트 견적 내기',
      },
    ],
    ctaTitle: '사람이 더 편하세요?',
    ctaBody: '도구는 건너뛰고 바로 이야기해요. 무료 30분 상담, 한국어·영어 가능, 부담 없음.',
    ctaBtn: '상담 시작하기',
  },
}

export default function ToolsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'ko'
  const t = copy[locale]
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <>
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink min-h-screen overflow-x-hidden">
        {/* HERO */}
        <section className="hair-bottom pt-32 md:pt-48 pb-16 md:pb-24">
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

        {/* TOOL CARDS */}
        <section className="section-pad hair-bottom bg-bone">
          <div className="container-edge">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
              {t.tools.map((tool) => (
                <InView key={tool.href} className="reveal bg-ivory">
                  <Link
                    href={`${prefix}${tool.href}`}
                    className="group block p-8 md:p-12 h-full transition-colors hover:bg-bone/60"
                  >
                    <div className="flex items-baseline gap-3 mb-8">
                      <span className="section-num not-italic text-ink font-normal">§ {tool.num}</span>
                      <span className="h-px w-10 bg-hairline" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl tracking-luxury text-ink mb-4">
                      {tool.name}
                    </h2>
                    <p className="text-body text-graphite leading-[1.7] mb-8 max-w-md">{tool.desc}</p>
                    <span className="inline-flex items-center gap-2 overline text-ink group-hover:text-gold transition-colors">
                      {tool.cta}
                      <span className="arrow">→</span>
                    </span>
                  </Link>
                </InView>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad">
          <div className="container-edge">
            <div className="max-w-3xl">
              <InView as="h2" className="reveal font-display text-display-sm md:text-display-lg tracking-luxury text-ink mb-6">
                <span>{t.ctaTitle}</span>
              </InView>
              <InView as="p" className="reveal text-body-lg text-graphite leading-[1.7] mb-8">
                <span>{t.ctaBody}</span>
              </InView>
              <Link href={`${prefix}/contact`} data-cursor={isKo ? '상담' : 'Talk'} className="btn-ink">
                {t.ctaBtn}
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
