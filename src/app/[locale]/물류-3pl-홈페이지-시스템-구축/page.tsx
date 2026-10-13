import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import LogisticsPage, { LOGISTICS_META, LOGISTICS_PATHS } from '@/components/LogisticsPage'
import { SITE_URL } from '@/lib/siteUrl'

// Korean landing for logistics companies searching "물류 회사 홈페이지 · 3PL 시스템 · EDI 연동".
// The English counterpart lives on an English slug; /물류-3pl-홈페이지-시스템-구축 (en) redirects there.
export function generateStaticParams() {
  return [{ locale: 'ko' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${LOGISTICS_PATHS.en}`
  const koUrl = `${SITE_URL}${LOGISTICS_PATHS.ko}`
  return {
    title: LOGISTICS_META.title.ko,
    description: LOGISTICS_META.description.ko,
    alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: LOGISTICS_META.title.ko,
      description: LOGISTICS_META.description.ko,
      url: koUrl,
      siteName: 'ZOE LUMOS',
      locale: 'ko_KR',
      alternateLocale: 'en_US',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== 'ko') permanentRedirect(LOGISTICS_PATHS.en)
  return <LogisticsPage locale="ko" />
}
