import type { Metadata } from 'next'
import PillarPage from '@/components/PillarPage'
import { pillarPages } from '@/data/pillarPages'
import { SITE_URL } from '@/lib/siteUrl'

const data = pillarPages.find((p) => p.slug === 'kakaotalk-marketing-guide')!

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  const enUrl = `${SITE_URL}${data.url}`
  const koUrl = `${SITE_URL}/ko${data.url}`
  const url = locale === 'ko' ? koUrl : enUrl
  return {
    title: data.title[locale],
    description: data.metaDescription[locale],
    alternates: { canonical: url, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: data.title[locale],
      description: data.metaDescription[locale],
      url,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'article',
    },
    robots: { index: true, follow: true },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  return <PillarPage data={data} locale={locale} />
}
