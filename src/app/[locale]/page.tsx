import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedHero from '@/components/AnimatedHero'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <div className="relative">
      <Header locale={params.locale} />
      <main className="min-h-screen relative">
        <AnimatedHero locale={params.locale} />
        <Services locale={params.locale} />
        <Contact locale={params.locale} />
      </main>
      <Footer locale={params.locale} />
      <ScrollProgress />
    </div>
  )
}