import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import UsLaunchPage, { US_LAUNCH_META, US_LAUNCH_PATHS } from '@/components/UsLaunchPage'
import { SITE_URL } from '@/lib/siteUrl'

// Korean landing for Korean HQ teams searching "미국 진출 홈페이지 제작".
// The English counterpart lives on an English slug; /미국-진출-홈페이지-제작 (en) redirects there.
export function generateStaticParams() {
  return [{ locale: 'ko' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${US_LAUNCH_PATHS.en}`
  const koUrl = `${SITE_URL}${US_LAUNCH_PATHS.ko}`
  return {
    title: US_LAUNCH_META.title.ko,
    description: US_LAUNCH_META.description.ko,
    alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: US_LAUNCH_META.title.ko,
      description: US_LAUNCH_META.description.ko,
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
  if (params.locale !== 'ko') permanentRedirect(US_LAUNCH_PATHS.en)
  return <UsLaunchPage locale="ko" />
}
