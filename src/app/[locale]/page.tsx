import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import { seoConfig } from '@/config/seo'

// Dynamically import heavy components with SSR enabled for SEO-critical content
const AnimatedHero = dynamic(() => import('@/components/AnimatedHero'), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-50 to-white" />
})

const Services = dynamic(() => import('@/components/sections/Services'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-white" />
})

const ContactWrapper = dynamic(() => import('@/components/sections/ContactWrapper'), {
  ssr: true,
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-gray-50 to-white" />
})

// Client-only component for scroll progress
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), {
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
  const locale = params.locale as 'en' | 'ko'
  const seo = seoConfig[locale]
  
  return {
    title: `${seo.title} | Home`,
    description: seo.description,
    alternates: {
      canonical: `https://zoestudio.com/${locale}`,
    },
  }
}

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <div className="relative">
      <HeaderWrapper locale={params.locale} />
      <main className="min-h-screen relative overflow-x-hidden">
        <AnimatedHero locale={params.locale} />
        <Services locale={params.locale} />
        <ContactWrapper locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
      <ScrollProgress />
    </div>
  )
}