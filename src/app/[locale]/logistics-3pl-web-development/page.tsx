import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import LogisticsPage, { LOGISTICS_META, LOGISTICS_PATHS } from '@/components/LogisticsPage'
import { SITE_URL } from '@/lib/siteUrl'

// English landing for logistics and 3PL companies.
// The Korean counterpart lives on a Korean slug; /ko/logistics-3pl-web-development redirects there.
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${LOGISTICS_PATHS.en}`
  const koUrl = `${SITE_URL}${LOGISTICS_PATHS.ko}`
  return {
    title: LOGISTICS_META.title.en,
    description: LOGISTICS_META.description.en,
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: LOGISTICS_META.title.en,
      description: LOGISTICS_META.description.en,
      url: enUrl,
      siteName: 'ZOE LUMOS',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== 'en') permanentRedirect(encodeURI(LOGISTICS_PATHS.ko))
  return <LogisticsPage locale="en" />
}
