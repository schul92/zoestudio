// Short, server-rendered answers to the four questions every visitor (and AI assistant) asks first.
// The same text feeds the FAQPage JSON-LD on the home page, so what's marked up is what's visible.

type QA = { q: string; a: string }

const AT_A_GLANCE: Record<'en' | 'ko', QA[]> = {
  en: [
    {
      q: 'What does Zoe Lumos do?',
      a: 'We design and build bilingual (Korean · English) websites and Shopify stores, with SEO and AI-search optimization built in from day one.',
    },
    {
      q: 'Who is it for?',
      a: 'Korean-American small businesses across the U.S. — restaurants, salons, clinics, shops and service brands — and American brands that want the same care.',
    },
    {
      q: 'How much does it cost?',
      a: 'Builds are $500–$2,400 one-time (Basic, Standard, Store). Monthly care plans are $49, $89, $199 or $499. Every price is published on the pricing page.',
    },
    {
      q: 'How long does it take?',
      a: 'Most builds launch in 2–6 weeks: a website in 2–3 weeks, a Shopify store in 4–6 weeks.',
    },
  ],
  ko: [
    {
      q: 'Zoe Lumos는 무엇을 하나요?',
      a: '한국어·영어 이중언어 웹사이트와 Shopify 쇼핑몰을 디자인하고 제작합니다. SEO와 AI 검색 최적화는 처음부터 포함됩니다.',
    },
    {
      q: '누구를 위한 서비스인가요?',
      a: '미국 전역의 한인 소상공인 — 식당, 뷰티샵, 병원, 쇼핑몰, 서비스 브랜드 — 그리고 같은 수준을 원하는 미국 브랜드를 위한 서비스입니다.',
    },
    {
      q: '비용은 얼마인가요?',
      a: '제작은 1회 $500–$2,400 (기본·일반·스토어)이며, 월 관리 플랜은 $49, $89, $199, $499입니다. 모든 가격은 가격 페이지에 공개되어 있습니다.',
    },
    {
      q: '기간은 얼마나 걸리나요?',
      a: '대부분 2–6주 안에 런칭합니다. 홈페이지는 2–3주, Shopify 쇼핑몰은 4–6주입니다.',
    },
  ],
}

export function atAGlanceFaqSchema(locale: string, url: string) {
  const items = AT_A_GLANCE[locale === 'ko' ? 'ko' : 'en']
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#at-a-glance`,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export default function AtAGlance({ locale = 'en' }: { locale?: string }) {
  const isKo = locale === 'ko'
  const items = AT_A_GLANCE[isKo ? 'ko' : 'en']

  return (
    <section id="at-a-glance" className="bg-ivory section-pad" aria-labelledby="glance-title">
      <div className="container-edge">
        <p className="text-[15px] font-semibold text-gold">{isKo ? '한눈에 보기' : 'At a glance'}</p>
        <h2 id="glance-title" className="mt-3 font-display text-display-lg text-ink text-balance">
          {isKo ? '자주 묻는 네 가지, ' : 'Four answers, '}
          <em>{isKo ? '짧게.' : 'up front.'}</em>
        </h2>
        <dl data-reveal-group className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.map((it) => (
            <div key={it.q} className="kn-card p-6 md:p-7">
              <dt className="text-[19px] md:text-[21px] font-semibold tracking-[-0.03em] text-ink">{it.q}</dt>
              <dd className="mt-3 text-[15px] md:text-[16px] leading-[1.6] text-graphite">{it.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
