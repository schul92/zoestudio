import { Metadata } from 'next'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import AnimatedHero from '@/components/AnimatedHero'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { seoConfig } from '@/config/seo'

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
        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
      <ScrollProgress />
    </div>
  )
}