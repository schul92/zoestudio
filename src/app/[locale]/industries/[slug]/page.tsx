import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import IndustryPage from '@/components/sections/IndustryPage'
import { industries, industryBySlug } from '@/data/industriesData'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const ind of industries) {
    params.push({ locale: 'en', slug: ind.slug.en })
    params.push({ locale: 'ko', slug: ind.slug.ko })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ko'
  const industry = industryBySlug(decodeURIComponent(params.slug), locale)
  if (!industry) return {}

  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${BASE}${prefix}/industries/${industry.slug[locale]}`
  const altEn = `${BASE}/industries/${industry.slug.en}`
  const altKo = `${BASE}/ko/industries/${industry.slug.ko}`

  return {
    title: industry.seo.title[locale],
    description: industry.seo.description[locale],
    alternates: {
      canonical: url,
      languages: {
        'x-default': altEn,
        en: altEn,
        ko: altKo,
      },
    },
    openGraph: {
      title: industry.seo.title[locale],
      description: industry.seo.description[locale],
      url,
      siteName: locale === 'ko' ? 'ZOE LUMOS' : 'Zoe Lumos',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function IndustrySlugPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const locale = params.locale as 'en' | 'ko'
  const industry = industryBySlug(decodeURIComponent(params.slug), locale)
  if (!industry) notFound()

  const prefix = locale === 'ko' ? '/ko' : ''
  const url = `${BASE}${prefix}/industries/${industry.slug[locale]}`

  // BreadcrumbList
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ko' ? '홈' : 'Home', item: `${BASE}${prefix || ''}` },
      { '@type': 'ListItem', position: 2, name: locale === 'ko' ? '업종' : 'Industries', item: `${BASE}${prefix}/industries` },
      { '@type': 'ListItem', position: 3, name: industry.name[locale], item: url },
    ],
  }

  // Service schema
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: industry.seo.title[locale],
    description: industry.seo.description[locale],
    provider: { '@id': `${BASE}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    serviceType: industry.name[locale],
    audience: { '@type': 'Audience', audienceType: locale === 'ko' ? '한인 소상공인' : 'Korean-American small business owners' },
    url,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: industry.name[locale],
      itemListElement: industry.features.map((f, i) => ({
        '@type': 'Offer',
        position: i + 1,
        name: f.title[locale],
        description: f.body[locale],
      })),
    },
  }

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: industry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] },
    })),
  }

  // Review schema — surface the case study testimonial
  const review = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${url}#review`,
    reviewBody: industry.caseStudy.quote[locale],
    author: { '@type': 'Person', name: industry.caseStudy.author, jobTitle: industry.caseStudy.role[locale] },
    itemReviewed: { '@id': `${BASE}/#organization` },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    about: industry.caseStudy.project,
  }

  // WebPage
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: industry.seo.title[locale],
    description: industry.seo.description[locale],
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    breadcrumb: breadcrumbs,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${BASE}${industry.image}`,
    },
  }

  return (
    <>
      <HeaderWrapper locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }} />
      <IndustryPage industry={industry} locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
