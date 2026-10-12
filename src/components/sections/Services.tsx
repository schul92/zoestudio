import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { US_LAUNCH_PATHS } from '@/data/usLaunch'

export default function Services({ locale = 'en' }: { locale?: string }) {
  const { t } = useTranslation(locale)
  const prefix = locale === 'ko' ? '/ko' : ''
  const isKo = locale === 'ko'

  // Each discipline deep-links to its service page (homepage link equity);
  // the section CTA below still routes to #contact for conversion.
  const items = [
    {
      no: '01',
      href: `${prefix}/쇼핑몰-제작`,
      title: t.services.webDesign.title,
      blurb: t.services.webDesign.description,
      tags: t.services.webDesign.features.slice(0, 4),
    },
    {
      no: '02',
      href: `${prefix}/services`,
      title: (t.services as any).takeover.title,
      blurb: (t.services as any).takeover.description,
      tags: (t.services as any).takeover.features.slice(0, 4),
    },
    {
      no: '03',
      href: `${prefix}/services/shopify-cost-audit`,
      title: (t.services as any).costAudit.title,
      blurb: (t.services as any).costAudit.description,
      tags: (t.services as any).costAudit.features.slice(0, 4),
    },
    {
      no: '04',
      href: `${prefix}/웹사이트-제작`,
      title: t.services.revamp.title,
      blurb: t.services.revamp.description,
      tags: t.services.revamp.features.slice(0, 4),
    },
    {
      no: '05',
      href: `${prefix}/englewood-nj-seo`,
      title: t.services.seo.title,
      blurb: t.services.seo.description,
      tags: t.services.seo.features.slice(0, 4),
    },
    {
      no: '06',
      href: `${prefix}/광고대행`,
      title: t.services.googleAds.title,
      blurb: t.services.googleAds.description,
      tags: t.services.googleAds.features.slice(0, 4),
    },
    {
      no: '07',
      href: `${prefix}/광고대행`,
      title: t.services.socialMedia.title,
      blurb: t.services.socialMedia.description,
      tags: t.services.socialMedia.features.slice(0, 4),
    },
  ]

  return (
    <section id="services" className="bg-ivory section-pad" aria-labelledby="services-title">
      <div className="container-edge">
        <div data-reveal className="text-center max-w-3xl mx-auto">
          <p className="text-[15px] font-semibold text-gold">{isKo ? '서비스' : 'Disciplines'}</p>
          <h2 id="services-title" className="mt-3 font-display text-display-lg text-ink text-balance">
            {isKo ? '조용하게, ' : 'Quiet craft, '}
            <em>{isKo ? '그러나 단단하게.' : 'loud results.'}</em>
          </h2>
          <p className="mt-5 text-body-lg text-graphite">{t.services.subtitle}</p>
        </div>

        {/* Korean HQs launching in the US — the enterprise line, set above the SMB disciplines. */}
        <Link
          href={isKo ? US_LAUNCH_PATHS.ko : US_LAUNCH_PATHS.en}
          data-reveal
          className="group kn-card mt-14 md:mt-20 flex flex-col md:flex-row md:items-end gap-6 md:gap-10 w-full p-7 md:p-10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,.25)]"
        >
          <div className="flex-1">
            <span className="text-[13px] font-semibold text-gold">
              {isKo ? '미국 진출 기업' : 'For Korean companies entering the US'}
            </span>
            <h3 className="mt-3 text-[26px] md:text-[32px] font-semibold tracking-[-0.035em] leading-[1.1] text-ink text-balance">
              {isKo ? '미국 진출 한국 기업의 공식 영문 홈페이지' : 'Official US websites for Korean brands launching here'}
            </h3>
            <p className="mt-3 text-[15px] md:text-[16px] text-graphite leading-relaxed max-w-2xl">
              {isKo
                ? '미국 1호점, 미국 법인, 미국 판매를 앞둔 본사를 위해 한국어로 진행하고 한국 시간에 미팅합니다. 출시 후에는 한국어 관리자 화면으로 직접 운영하실 수 있습니다.'
                : 'For HQ teams opening US stores, entities or online sales: run in Korean, meetings on Korea time, and a Korean-language admin panel after launch.'}
            </p>
          </div>
          <span className="text-[15px] font-semibold text-link group-hover:underline whitespace-nowrap">
            {isKo ? '자세히 보기' : 'Learn more'} <span aria-hidden>›</span>
          </span>
        </Link>

        <ul data-reveal-group className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((it) => (
            <li key={it.no} className={`flex ${it.no === '01' ? 'lg:col-span-2' : it.no === '07' ? 'md:col-span-2' : ''}`}>
              <Link
                href={it.href}
                className="group kn-card flex flex-col w-full p-7 md:p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,.25)]"
              >
                <span className="text-[13px] font-medium text-ash tabular-nums">{it.no}</span>
                <h3 className="mt-3 text-[24px] md:text-[26px] font-semibold tracking-[-0.035em] leading-[1.12] text-ink">
                  {it.title}
                </h3>
                <p className="mt-3 text-[15px] text-graphite leading-relaxed">{it.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {it.tags.map((tag: string) => (
                    <li key={tag} className="text-[12px] text-graphite bg-bone rounded-full px-3 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-6 text-[15px] font-semibold text-link group-hover:underline">
                  {isKo ? '자세히 보기' : 'Learn more'} <span aria-hidden>›</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[22px] md:text-[28px] font-semibold tracking-[-0.035em] text-ink max-w-xl">
            {isKo ? '필요한 건 딱 하나면 충분합니다.' : 'Start with one. Grow into the rest.'}
          </p>
          <Link href={`${prefix}/#contact`} className="btn-ink">
            {isKo ? '상담 요청' : 'Begin a conversation'}
          </Link>
        </div>
      </div>
    </section>
  )
}
