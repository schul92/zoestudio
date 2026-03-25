import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import AnimatedHero from '@/components/AnimatedHero'
import { seoConfig, structuredData } from '@/config/seo'

const Services = dynamic(() => import('@/components/sections/Services'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-[#111111]" />
})

const ContactWrapper = dynamic(() => import('@/components/sections/ContactWrapper'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-[#111111]" />
})

const LocationLinks = dynamic(() => import('@/components/sections/LocationLinks'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-[#111111]" />
})

// Client-only component for scroll progress
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), {
  ssr: false
})

const KakaoFloatingButton = dynamic(() => import('@/components/ui/KakaoFloatingButton'), {
  ssr: false
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  
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

  return (
    <div className="relative">
      {/* FAQPage schema — only on homepage where FAQ content context exists */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faqPage) }}
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
        <AnimatedHero locale={locale} />
        <Services locale={locale} />
        <LocationLinks locale={locale} />
        <ContactWrapper locale={locale} />
      </main>
      <Footer locale={locale} />
      <ScrollProgress />
      <KakaoFloatingButton />
    </div>
  )
}
