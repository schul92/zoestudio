'use client'


export default function AboutClient({ t, locale }: { t: any, locale: string }) {
  const prefix = locale === 'ko' ? '/ko' : ''

  return (
    <>
      {/* Hero Section - Fixed padding-top for header */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative pt-32">
        {/* Animated Light Rays */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[2px] h-[200vh] bg-gradient-to-t from-transparent via-[#6BB4FF]/20 to-transparent"
              style={{
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>

        {/* Floating Light Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#6BB4FF] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div 
            className="max-w-4xl mx-auto text-center"
          >
            {/* Glowing Logo */}
            <div
              className="w-32 h-32 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 bg-[#6BB4FF] rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-[#6BB4FF] to-[#00A3A3] rounded-full w-full h-full flex items-center justify-center">
                <span className="text-4xl font-bold text-black">ZL</span>
              </div>
            </div>

            <p
              className="text-[#6BB4FF] text-xl mb-4"
            >
              {t.hero.subtitle}
            </p>

            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {t.hero.title}
            </h1>

            <p
              className="text-3xl md:text-4xl text-gray-300 mb-8"
            >
              {t.hero.tagline}
            </p>

            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              {t.hero.description}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#6BB4FF] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#6BB4FF] rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Name Meaning Section */}
      <section className="py-32 bg-[#111111] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">{t.meaning.title}</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* ZOE */}
            <div
              className="relative"
            >
              <div className="bg-[#1a1a1a] p-10 rounded-3xl border-2 border-green-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -mr-32 -mt-32" />
                <h3 className="text-6xl font-bold text-green-400 mb-2">{t.meaning.zoe.word}</h3>
                <p className="text-sm text-gray-500 mb-2">{t.meaning.zoe.origin}</p>
                <p className="text-2xl font-semibold text-white mb-4">{t.meaning.zoe.meaning}</p>
                <p className="text-gray-400">{t.meaning.zoe.description}</p>
              </div>
            </div>

            {/* LUMOS */}
            <div
              className="relative"
            >
              <div className="bg-[#1a1a1a] p-10 rounded-3xl border-2 border-[#6BB4FF]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6BB4FF]/10 to-transparent rounded-full -mr-32 -mt-32" />
                <h3 className="text-6xl font-bold text-[#6BB4FF] mb-2">{t.meaning.lumos.word}</h3>
                <p className="text-sm text-gray-500 mb-2">{t.meaning.lumos.origin}</p>
                <p className="text-2xl font-semibold text-white mb-4">{t.meaning.lumos.meaning}</p>
                <p className="text-gray-400">{t.meaning.lumos.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-ink">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">{t.philosophy.title}</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.philosophy.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 hover:border-[#6BB4FF]/30 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-32 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-[#6BB4FF] to-[#00A3A3]">
            {t.mission.title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {t.mission.stats.map((stat: any, index: number) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#6BB4FF] mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - How We Bring Light */}
      <section className="py-32 bg-[#111111]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">{t.services.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.services.items.map((item: any, index: number) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-[#6BB4FF] to-[#00A3A3] p-[2px] rounded-2xl">
                  <div className="bg-[#1a1a1a] rounded-2xl p-8 h-full hover:bg-[#222222] transition-all">
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-32 bg-[#0d0d0d]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-[#6BB4FF] text-sm font-bold tracking-widest uppercase mb-4"
            >
              {t.founder.label}
            </p>

            <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
              {/* Avatar */}
              <div
                className="flex-shrink-0"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#6BB4FF] to-[#00A3A3] flex items-center justify-center text-black font-bold text-2xl md:text-3xl shadow-lg shadow-amber-500/20">
                  ZL
                </div>
              </div>

              {/* Bio */}
              <div
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">{t.founder.name}</h2>
                <p className="text-gray-400 text-sm mb-6">{t.founder.role}</p>

                <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                  <p>{t.founder.bio1}</p>
                  <p>{t.founder.bio2}</p>
                  <p>{t.founder.bio3}</p>
                  <div className="border-l-2 border-[#6BB4FF] pl-4 text-gray-200">
                    <p>{t.founder.bio4}</p>
                  </div>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.founder.skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Promo CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[#6BB4FF] font-semibold text-sm">✦ {t.founder.promoLabel}</span>
                  <a
                    href={`${prefix}/contact`}
                    className="bg-[#6BB4FF] text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-[#6BB4FF] hover:scale-105 transition-all"
                  >
                    {t.founder.promoButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-ink relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${10 + i * 30}%`,
                top: `${-50 + i * 20}%`,
                background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#6BB4FF] to-[#00A3A3]"
          >
            {t.cta.title}
          </h2>
          <p
            className="text-xl mb-10 text-gray-300"
          >
            {t.cta.subtitle}
          </p>
          <div
          >
            <a
              href={`${prefix}/contact`}
              className="inline-block bg-[#6BB4FF] text-black px-10 py-5 text-lg font-bold rounded-full hover:bg-[#6BB4FF] hover:scale-110 transition-all shadow-2xl"
            >
              {t.cta.button}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}