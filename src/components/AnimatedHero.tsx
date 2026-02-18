import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function AnimatedHero({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(251,191,36,0.18),transparent_38%),radial-gradient(circle_at_80%_28%,rgba(255,255,255,0.09),transparent_42%),radial-gradient(circle_at_62%_78%,rgba(251,191,36,0.08),transparent_35%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-amber-300/20 blur-sm" />
      <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full border border-white/10" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Zoe Studio
          </p>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>

          <h2 className="mt-3 text-xl font-bold text-amber-400 sm:text-2xl md:text-3xl">
            {t.hero.subtitle}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-base font-bold text-black transition hover:bg-amber-300"
            >
              {t.hero.cta.start}
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
            >
              {t.hero.cta.view}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
