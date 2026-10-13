import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import AwsIntegrationPage, { AWS_META, AWS_PATHS } from '@/components/AwsIntegrationPage'
import { SITE_URL } from '@/lib/siteUrl'

// English landing for AWS cloud, API integration and dashboards.
// The Korean counterpart lives on a Korean slug; /ko/aws-api-integration-dashboards redirects there.
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata(): Promise<Metadata> {
  const enUrl = `${SITE_URL}${AWS_PATHS.en}`
  const koUrl = `${SITE_URL}${AWS_PATHS.ko}`
  return {
    title: AWS_META.title.en,
    description: AWS_META.description.en,
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    openGraph: {
      title: AWS_META.title.en,
      description: AWS_META.description.en,
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
  if (params.locale !== 'en') permanentRedirect(encodeURI(AWS_PATHS.ko))
  return <AwsIntegrationPage locale="en" />
}
