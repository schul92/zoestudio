'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }))
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-4"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Project Image */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {!imageErrors[project.id] ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(project.id)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6">
                      <svg
                        className="w-16 h-16 mb-4 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="text-lg font-medium">{project.title}</span>
                      <span className="text-sm text-gray-400 mt-1">{project.url.replace('https://', '').replace('www.', '')}</span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-6 py-3 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {t.viewSite} →
                    </span>
                  </div>
                </a>

                {/* Project Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Services Tags */}
                  <div className="pt-2">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      {t.servicesLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, i) => (
                        <span
                          key={i}
                          className="text-sm text-gray-700 border border-gray-200 px-3 py-1 rounded-full hover:border-black hover:text-black transition-colors"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 mb-8"
          >
            {t.cta.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href={`${prefix}/#contact`}
              className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
