import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import HeroNew from '@/components/HeroNew'
import { seoConfig, structuredData } from '@/config/seo'
import {
  breadcrumbList,
  webPage,
  selectedWorkItemList,
  baseUrl,
} from '@/config/schemas'
import { SITE_URL } from '@/lib/siteUrl'

const TrustRibbon = dynamic(() => import('@/components/sections/TrustRibbon'), {
  ssr: true,
  loading: () => <div className="min-h-[200px] bg-ivory" />
})

const FloatingDevices = dynamic(() => import('@/components/sections/FloatingDevices'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-ivory" />
})

const Services = dynamic(() => import('@/components/sections/Services'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-ivory" />
})

const SelectedWork = dynamic(() => import('@/components/sections/SelectedWork'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-ivory" />
})

const Process = dynamic(() => import('@/components/sections/Process'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-bone" />
})

const Proof = dynamic(() => import('@/components/sections/Proof'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-ivory" />
})

const ContactWrapper = dynamic(() => import('@/components/sections/ContactWrapper'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-ivory" />
})

const LocationLinks = dynamic(() => import('@/components/sections/LocationLinks'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-bone" />
})

const BlogRail = dynamic(() => import('@/components/sections/BlogRail'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-ivory" />
})

const PricingTeaser = dynamic(() => import('@/components/sections/PricingTeaser'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-bone" />
})

// Pinned, scroll-scrubbed case study (GSAP ScrollTrigger). Client-only: it
// pins and measures, so SSR markup would be discarded on hydration anyway.
const CaseScroll = dynamic(() => import('@/components/sections/CaseScroll'), {
  ssr: false,
  loading: () => <div className="min-h-[600px] bg-[#171310]" />
})

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale: 'en' | 'ko' = params?.locale === 'ko' ? 'ko' : 'en'
  const seo = seoConfig[locale]
  const baseUrl = SITE_URL

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: locale === 'en' ? baseUrl : `${baseUrl}/ko`,
      languages: {
        'x-default': baseUrl,
        'en': baseUrl,
        'ko': `${baseUrl}/ko`,
      },
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: locale === 'en' ? baseUrl : `${baseUrl}/ko`,
      siteName: 'ZOE LUMOS',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      alternateLocale: locale === 'ko' ? 'en_US' : 'ko_KR',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale: 'en' | 'ko' = params?.locale === 'ko' ? 'ko' : 'en'
  const seo = seoConfig[locale]
  const base = baseUrl()
  const pageUrl = locale === 'ko' ? `${base}/ko` : base

  // Breadcrumbs
  const crumbs = breadcrumbList([
    { name: locale === 'ko' ? '홈' : 'Home', url: locale === 'ko' ? '/ko' : '/' },
  ])

  // WebPage
  const webPageSchema = webPage({
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    breadcrumb: crumbs,
  })

  // Selected Work ItemList
  const worksSchema = selectedWorkItemList([
    {
      name: 'Miguk Story',
      url: 'https://migukstory.com/',
      image: '/portfolio/migukstory.jpg',
      year: '2026',
      location: 'Bilingual, US',
      industry: 'Editorial publication',
      disciplines: ['Editorial', 'CMS', 'Bilingual SEO'],
    },
    {
      name: "Vito's Pizza & Ristorante",
      url: 'https://www.vitospizzaandristorante.com/',
      image: '/portfolio/vitos-pizza.jpg',
      year: '2026',
      location: 'Alpharetta, GA',
      industry: 'Italian restaurant',
      disciplines: ['Web design', 'Online ordering', 'Local SEO'],
    },
    {
      name: 'TJ Flowers',
      url: '/portfolio',
      image: '/portfolio/tj-flowers.jpg',
      year: '2023',
      location: 'Manhattan, NY',
      industry: 'Floral studio',
      disciplines: ['Brand', 'Commerce'],
    },
    {
      name: 'Salt & Polish',
      url: '/portfolio',
      image: '/portfolio/salt-polish.jpg',
      year: '2024',
      location: 'Fort Lee, NJ',
      industry: 'Wellness studio',
      disciplines: ['Web design', 'Local SEO', 'Booking'],
    },
    {
      name: 'Kona Coffee Donut',
      url: '/portfolio',
      image: '/portfolio/kona-coffee.jpg',
      year: '2024',
      location: 'Honolulu, HI',
      industry: 'Café & bakery',
      disciplines: ['Brand', 'Web design', 'Shopify'],
    },
    {
      name: 'CareK9',
      url: '/portfolio',
      image: '/portfolio/carek9.jpg',
      year: '2024',
      location: 'Edgewater, NJ',
      industry: 'Pet services',
      disciplines: ['Web design', 'Booking', 'CMS'],
    },
    {
      name: 'Mochinut',
      url: '/portfolio',
      image: '/portfolio/mochinut.jpg',
      year: '2023',
      location: 'Multi-city, US',
      industry: 'Confectionery',
      disciplines: ['E-commerce', 'Rebrand', 'Franchise'],
    },
  ])

  // NOTE: testimonial Review schemas removed 2026-07-04 — the quotes were not
  // verifiable client statements. Re-add only with real, client-approved
  // reviews (ideally mirrored from the Google Business Profile).

  return (
    <div className="relative">
      {/* WebPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {/* FAQPage schema omitted — Google requires visible FAQ content on the page */}
      {/* Selected Work ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(worksSchema) }}
      />
      {/* Service schema — render on homepage */}
      {structuredData.services.map((service, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ))}
      <HeaderWrapper locale={locale} />
      <main className="min-h-screen relative overflow-x-hidden">
        <HeroNew locale={locale} />
        <TrustRibbon locale={locale} />
        <FloatingDevices locale={locale as 'en' | 'ko'} />
        <Services locale={locale} />
        <SelectedWork locale={locale} sectionNumber="02" />
        {/* Dark act continues: the pinned case study rides straight out of
            SelectedWork's ink ground, then the page returns to ivory. */}
        <CaseScroll locale={locale} />
        <Process locale={locale} sectionNumber="03" />
        <Proof locale={locale} sectionNumber="04" />
        <PricingTeaser locale={locale} />
        <ContactWrapper locale={locale} sectionNumber="06" />
        <BlogRail locale={locale} sectionNumber="07" />
        <LocationLinks locale={locale} sectionNumber="08" />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
