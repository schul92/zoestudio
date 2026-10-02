import Image from 'next/image'
import Link from 'next/link'

type Device = {
  name: string
  src: string
  industry: { en: string; ko: string }
}

const devices: Device[] = [
  { name: 'EndoPia', src: '/portfolio/endopia.jpg', industry: { en: 'U.S. launch · Medical device', ko: '미국 런칭 · 의료기기' } },
  { name: 'TJ Flowers', src: '/portfolio/tj-flowers.jpg', industry: { en: 'Manhattan · Floral studio', ko: '맨하탄 · 플라워 스튜디오' } },
  { name: "Vito's Pizza", src: '/portfolio/vitos-pizza.jpg', industry: { en: 'Alpharetta · Italian restaurant', ko: '알파레타 · 이탈리안 레스토랑' } },
]

export default function FloatingDevices({ locale = 'en' }: { locale?: 'en' | 'ko' }) {
  const isKo = locale === 'ko'
  const prefix = isKo ? '/ko' : ''

  return (
    <section className="bg-bone section-pad" aria-labelledby="work-in-motion">
      <div className="container-edge">
        <div data-reveal className="text-center max-w-3xl mx-auto">
          <p className="text-[15px] font-semibold text-gold">{isKo ? '움직이는 작업' : 'Work in motion'}</p>
          <h2 id="work-in-motion" className="mt-3 font-display text-display-lg text-ink text-balance">
            {isKo ? '화면 위에서 ' : 'Live on the '}
            <em>{isKo ? '살아있는 작업.' : 'open web.'}</em>
          </h2>
          <p className="mt-5 text-body-lg text-graphite">
            {isKo
              ? '최근 런칭된 사이트들 — 에디토리얼 디렉션, 이중언어 카피, 실제 비즈니스 결과.'
              : 'Recent launches — editorial direction, bilingual copy, real business outcomes.'}
          </p>
        </div>

        <ul data-reveal-group className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 [perspective:1400px]">
          {devices.map((d) => (
            <li key={d.name}>
              <Link
                href={`${prefix}/portfolio`}
                className="group block kn-card overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:[transform:rotateX(4deg)_translateY(-6px)]"
              >
                <div className="relative aspect-[16/10] bg-bone">
                  <Image
                    src={d.src}
                    alt={`${d.name} — ${d.industry.en}`}
                    fill
                    sizes="(max-width: 768px) 92vw, 400px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="px-5 py-4 flex items-baseline justify-between gap-3">
                  <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{d.name}</span>
                  <span className="text-[13px] text-ash">{d.industry[isKo ? 'ko' : 'en']}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-[20px] md:text-[24px] font-semibold tracking-[-0.03em] text-ink max-w-xl text-balance">
            {isKo
              ? '사이트는 화면 안의 이미지가 아닙니다 — 매일 고객과 대화하는 존재입니다.'
              : 'A website is not an image on a screen — it is a presence that talks to your customer every day.'}
          </p>
          <Link href={`${prefix}/portfolio`} className="btn-ghost self-start md:self-auto">
            {isKo ? '전체 작업' : 'View all work'} <span aria-hidden>›</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
