'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import InView from '@/components/ui/motion/InView'
import Magnetic from '@/components/ui/motion/Magnetic'

interface Project {
  id: string
  url: string
  image: string
  title: string
  category: string
  description: string
  services: string[]
}

interface PortfolioClientProps {
  t: {
    hero: {
      subtitle: string
      title: string
      description: string
    }
    viewSite: string
    servicesLabel: string
    cta: {
      title: string
      description: string
      button: string
    }
  }
  projects: Project[]
  locale: string
}

export default function PortfolioClient({ t, projects, locale }: PortfolioClientProps) {
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }))
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      {/* Hero */}
      <section className="relative hair-bottom pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="container-edge">
          <InView className="flex items-center gap-3 overline text-ash mb-8 hair-draw pb-4">
            <span className="section-num not-italic text-ink font-normal">§</span>
            <span className="h-px w-10 bg-hairline" />
            <span>{t.hero.subtitle}</span>
          </InView>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <h1 className="md:col-span-8 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-luxury text-ink">
              <InView as="span" className="mask-row">
                <span className="mask-rise block">{t.hero.title}</span>
              </InView>
            </h1>
            <InView as="p" className="reveal md:col-span-4 text-body-lg text-graphite leading-[1.7] max-w-md">
              <span>{t.hero.description}</span>
            </InView>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 overline text-ash">
            <span>
              <span className="gold-dot mr-2 inline-block" />
              {projects.length} {isKo ? '선택된 작업' : 'selected projects'}
            </span>
            <span className="hidden md:inline">·</span>
            <span>150+ {isKo ? '총 프로젝트' : 'total engagements'}</span>
            <span className="hidden md:inline">·</span>
            <span>{isKo ? '2019 — 현재' : '2019 — present'}</span>
          </div>
        </div>
      </section>

      {/* Projects grid — editorial asymmetric */}
      <section className="section-pad hair-bottom pt-0 md:pt-0">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {projects.map((project, index) => {
              const wideCols = [
                'md:col-span-7',
                'md:col-span-5 md:col-start-8 md:mt-24',
                'md:col-span-6',
                'md:col-span-6 md:mt-20',
                'md:col-span-7 md:col-start-4',
                'md:col-span-5 md:mt-16',
              ]
              const span = wideCols[index % wideCols.length] || 'md:col-span-6'
              return (
                <InView
                  key={project.id}
                  as="article"
                  className={`reveal group ${span}`}
                  delay={(index % 3) * 80}
                >
                  {/* Image frame */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="block relative w-full aspect-[5/4] overflow-hidden rounded-[2px] bg-bone"
                  >
                    {/* Halo */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background:
                          'radial-gradient(80% 60% at 50% 50%, rgba(184,145,74,0.25), transparent 80%)',
                      }}
                    />
                    <div className="absolute inset-6 md:inset-8 overflow-hidden">
                      {!imageErrors[project.id] ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                          onError={() => handleImageError(project.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bone text-ash p-6">
                          <svg
                            className="w-14 h-14 mb-4 opacity-40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                          <span className="font-display text-lg italic font-light text-ink">
                            {project.title}
                          </span>
                          <span className="text-xs text-ash mt-1">
                            {project.url.replace('https://', '').replace('www.', '')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Corner marks */}
                    <span aria-hidden className="absolute top-5 right-5" style={{ width: 14, height: 14, borderTop: '1px solid rgba(20,20,20,0.28)', borderRight: '1px solid rgba(20,20,20,0.28)' }} />
                    <span aria-hidden className="absolute bottom-5 left-5" style={{ width: 14, height: 14, borderBottom: '1px solid rgba(20,20,20,0.28)', borderLeft: '1px solid rgba(20,20,20,0.28)' }} />

                    {/* Plate index + viewSite chip */}
                    <div className="absolute top-4 left-4 overline text-ink bg-ivory/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="gold-dot" />
                      {isKo ? '도판' : 'Plate'} · {String(index + 1).padStart(2, '0')}
                    </div>
                    <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0 bg-ink text-ivory px-4 py-2 rounded-full text-[12px] tracking-wide">
                      {t.viewSite} →
                    </span>
                  </a>

                  {/* Caption */}
                  <div className="mt-6 grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-12 md:col-span-8">
                      <div className="overline text-ash mb-3">{project.category}</div>
                      <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] tracking-luxury leading-tight text-ink fraunces-soft group-hover:italic group-hover:text-gold group-hover:font-light transition-all duration-500">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      </h2>
                      <p className="mt-3 text-body text-graphite leading-[1.7] max-w-xl">
                        {project.description}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <p className="overline text-ash mb-3">{t.servicesLabel}</p>
                      <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {project.services.map((service, i) => (
                          <li
                            key={i}
                            className="text-[12px] uppercase tracking-[0.16em] text-ash flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </InView>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <InView className="flex items-center gap-3 overline text-ash mb-6 hair-draw pb-4">
                <span className="section-num italic text-ink">—</span>
                <span className="h-px w-10 bg-hairline" />
                <span>{isKo ? '다음 작업' : 'Next chapter'}</span>
              </InView>
              <h2 className="font-display text-display-lg text-ink tracking-luxury">
                <InView as="span" className="mask-row">
                  <span className="mask-rise block">{t.cta.title}</span>
                </InView>
              </h2>
              <InView as="p" className="reveal mt-6 text-body-lg text-graphite leading-[1.7] max-w-xl">
                <span>{t.cta.description}</span>
              </InView>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Magnetic strength={14}>
                <Link
                  href={`${prefix}/#contact`}
                  data-cursor={isKo ? '시작' : 'Begin'}
                  className="btn-ink"
                >
                  {t.cta.button}
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
