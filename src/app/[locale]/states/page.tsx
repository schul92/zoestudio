import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { usStates } from '@/data/usStates'
import { SITE_URL } from '@/lib/siteUrl'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const ko = params.locale === 'ko'
  const url = `${SITE_URL}${ko ? '/ko' : ''}/states`
  return {
    title: ko
      ? '미국 50개 주 한인 웹사이트 제작 · 전 지역 서비스 | ZOE LUMOS'
      : 'Korean Web Design in All 50 US States · Nationwide | Zoe Lumos',
    description: ko
      ? '캘리포니아부터 뉴저지, 조지아, 텍사스까지 — 미국 50개 주 전역 한인 비즈니스를 위한 이중언어 웹사이트 제작·SEO·GEO. 원격 가능, 카카오톡 상담.'
      : 'From California to New Jersey, Georgia to Texas — bilingual websites, SEO, and GEO for Korean-American businesses in all 50 US states. Remote, KakaoTalk consultations.',
    alternates: {
      canonical: url,
      languages: { 'x-default': `${SITE_URL}/states`, en: `${SITE_URL}/states`, ko: `${SITE_URL}/ko/states` },
    },
    openGraph: {
      title: ko ? '미국 50개 주 한인 웹사이트 제작' : 'Korean Web Design in All 50 US States',
      description: ko ? '50개 주 전역 한인 비즈니스 웹사이트·SEO·GEO.' : 'Bilingual websites, SEO & GEO across all 50 states.',
      url,
      siteName: 'ZOE LUMOS',
      locale: ko ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

const TIERS: { key: string; en: string; ko: string }[] = [
  { key: 'large', en: 'Major Korean markets', ko: '주요 한인 시장' },
  { key: 'medium', en: 'Growing Korean communities', ko: '성장하는 한인 커뮤니티' },
  { key: 'small', en: 'Established smaller communities', ko: '자리 잡은 소규모 커뮤니티' },
  { key: 'minimal', en: 'Served remotely, nationwide', ko: '전국 원격 서비스' },
]

export default function StatesIndex({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const ko = locale === 'ko'
  const prefix = ko ? '/ko' : ''

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: ko ? '미국 50개 주 한인 웹사이트 제작' : 'Korean Web Design across all 50 US states',
    numberOfItems: usStates.length,
    itemListElement: usStates.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name.en,
      url: `${SITE_URL}${prefix}/${s.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <HeaderWrapper locale={locale} />
      <main className="bg-ivory text-ink">
        <section className="container-edge pt-32 md:pt-44 pb-12 md:pb-16">
          <nav className="flex items-center gap-2 overline text-ash mb-8 flex-wrap">
            <Link href={prefix || '/'} className="hover:text-ink transition-colors">{ko ? '홈' : 'Home'}</Link>
            <span className="opacity-50">/</span>
            <span className="text-ink">{ko ? '지역' : 'Locations'}</span>
          </nav>
          <p className="overline text-gold mb-5">{ko ? '미국 50개 주 전역' : 'All 50 US states'}</p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-luxury text-ink max-w-4xl">
            {ko ? '어느 주에서든 한인 비즈니스 웹사이트' : 'Korean business websites, in every state'}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-graphite leading-[1.7]">
            {ko
              ? 'ZOE LUMOS는 미국 50개 주 어디서나 한인 비즈니스를 위한 한·영 이중언어 웹사이트, 로컬 SEO, AI 검색 최적화(GEO)를 제공합니다. 직접 만나지 않아도 화상 미팅과 카카오톡으로 동일한 품질로 진행합니다. 아래에서 주를 선택하세요.'
              : 'ZOE LUMOS builds bilingual Korean-English websites, local SEO, and AI-search optimization (GEO) for Korean-American businesses in all 50 states — same quality everywhere, via video meetings and KakaoTalk, no in-person required. Pick your state below.'}
          </p>
        </section>

        {TIERS.map((tier) => {
          const states = usStates.filter((s) => s.tier === tier.key)
          if (!states.length) return null
          return (
            <section key={tier.key} className="container-edge py-10 md:py-12 border-t border-hairline">
              <h2 className="font-display text-display-sm tracking-luxury mb-2">{ko ? tier.ko : tier.en}</h2>
              <p className="text-[13px] text-ash mb-7">{states.length} {ko ? '개 주' : states.length === 1 ? 'state' : 'states'}</p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1">
                {states.map((s) => (
                  <li key={s.abbr}>
                    <Link
                      href={`${prefix}/${s.slug}`}
                      className="group flex items-baseline justify-between gap-2 py-2.5 border-b border-hairline hover:border-ink/40 transition-colors"
                    >
                      <span className="text-[15px] text-ink group-hover:text-gold transition-colors">{ko ? s.name.ko : s.name.en}</span>
                      <span className="overline text-ash">{s.abbr.toUpperCase()}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        <section className="container-edge py-20 md:py-28 border-t border-hairline">
          <p className="font-display italic font-light text-[clamp(1.35rem,2.5vw,2rem)] text-ink leading-[1.4] max-w-2xl mb-8">
            {ko ? '내 주가 안 보여도 괜찮습니다 — 50개 주 모두 원격으로 서비스합니다.' : "Don't see your state listed? We serve all 50, fully remote."}
          </p>
          <Link href={`${prefix}/#contact`} className="btn-ink">{ko ? '상담 시작하기' : 'Start a conversation'}<span className="arrow">→</span></Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
