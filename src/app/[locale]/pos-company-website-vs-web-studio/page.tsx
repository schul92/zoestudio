import LocalSeoPage from '@/components/templates/LocalSeoPage'
import { localSeoByKey } from '@/data/localSeoPages'
import { localSeoMeta } from '@/lib/localSeoMeta'
import { SITE_URL } from '@/lib/siteUrl'

const entry = localSeoByKey['pos-vs-studio']

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  return localSeoMeta(entry, params.locale === 'ko' ? 'ko' : 'en')
}

export default function Page({ params }: { params: { locale: string } }) {
  return <LocalSeoPage entry={entry} locale={params.locale === 'ko' ? 'ko' : 'en'} baseUrl={SITE_URL} />
}
