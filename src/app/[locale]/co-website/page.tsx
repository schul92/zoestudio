import type { Metadata } from 'next'
import StatePage from '@/components/StatePage'
import { usStates } from '@/data/usStates'
import { SITE_URL } from '@/lib/siteUrl'

const data = usStates.find((s) => s.slug === 'co-website')!

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const ko = locale === 'ko'
  const name = ko ? data.name.ko : data.name.en
  const enUrl = `${SITE_URL}/${data.slug}`
  const koUrl = `${SITE_URL}/ko/${data.slug}`
  const url = ko ? koUrl : enUrl
  const cities = (ko ? data.cities.map((c) => c.ko) : data.cities.map((c) => c.en)).slice(0, 3).join(', ')
  return {
    title: ko
      ? `${name} 한인 웹사이트 제작 · 이중언어 웹에이전시 | ZOE LUMOS`
      : `Korean Web Design in ${name} · Bilingual Web Agency | Zoe Lumos`,
    description: ko
      ? `${name} 한인 비즈니스를 위한 한·영 이중언어 웹사이트 제작, 로컬 SEO, AI 검색 최적화(GEO). ${cities} 등 ${name} 전역. 원격 가능, 카카오톡 상담.`
      : `Bilingual Korean-English website design, local SEO, and AI-search optimization (GEO) for Korean-American businesses in ${name} — ${cities} and beyond. Remote, KakaoTalk consultations.`,
    alternates: { canonical: url, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: ko ? `${name} 한인 웹사이트 제작` : `Korean Web Design in ${name}`,
      description: ko ? `${name} 한인 비즈니스 이중언어 웹사이트·SEO·GEO.` : `Bilingual websites, SEO & GEO for Korean businesses in ${name}.`,
      url,
      siteName: 'ZOE LUMOS',
      locale: ko ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  return <StatePage data={data} locale={locale} />
}
