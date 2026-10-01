import LocalSeoPage from '@/components/templates/LocalSeoPage'
import { localSeoByKey } from '@/data/localSeoPages'
import { localSeoMeta } from '@/lib/localSeoMeta'
import { SITE_URL } from '@/lib/siteUrl'

// Korean-slug URL: always the Korean page (canonical /ko/{koSlug}).
const entry = localSeoByKey['leonia']

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export function generateMetadata() {
  return localSeoMeta(entry, 'ko')
}

export default function Page() {
  return <LocalSeoPage entry={entry} locale="ko" baseUrl={SITE_URL} />
}
