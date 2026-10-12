import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import UsLaunchPage, { US_LAUNCH_META, US_LAUNCH_PATHS } from '@/components/UsLaunchPage'
import { SITE_URL } from '@/lib/siteUrl'

// English landing for Korean companies launching in the US.
// The Korean counterpart lives on a Korean slug; /ko/us-launch-for-korean-brands redirects there.
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${US_LAUNCH_PATHS.en}`
  const koUrl = `${SITE_URL}${US_LAUNCH_PATHS.ko}`
  return {
    title: US_LAUNCH_META.title.en,
    description: US_LAUNCH_META.description.en,
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: US_LAUNCH_META.title.en,
      description: US_LAUNCH_META.description.en,
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
  if (params.locale !== 'en') permanentRedirect(encodeURI(US_LAUNCH_PATHS.ko))
  return <UsLaunchPage locale="en" />
}
