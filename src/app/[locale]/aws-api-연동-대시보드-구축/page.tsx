import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import AwsIntegrationPage, { AWS_META, AWS_PATHS } from '@/components/AwsIntegrationPage'
import { SITE_URL } from '@/lib/siteUrl'

// Korean landing for teams searching "AWS 구축 · API 연동 · 대시보드 개발".
// The English counterpart lives on an English slug; /aws-api-연동-대시보드-구축 (en) redirects there.
export function generateStaticParams() {
  return [{ locale: 'ko' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${AWS_PATHS.en}`
  const koUrl = `${SITE_URL}${AWS_PATHS.ko}`
  return {
    title: AWS_META.title.ko,
    description: AWS_META.description.ko,
    alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: AWS_META.title.ko,
      description: AWS_META.description.ko,
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
  if (params.locale !== 'ko') permanentRedirect(AWS_PATHS.en)
  return <AwsIntegrationPage locale="ko" />
}
