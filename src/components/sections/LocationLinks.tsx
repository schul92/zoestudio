import { usStates } from '@/data/usStates'
import LocationLinksClient, { type LocationItem } from './LocationLinksClient'

// Server wrapper: the 78 KB state dataset is reduced here, so only the small
// link list reaches the browser.
export default function LocationLinks({
  locale = 'en',
  sectionNumber = '05',
}: {
  locale?: string
  sectionNumber?: string
}) {
  const isKo = locale === 'ko'
  // Every large + medium tier state — Korean-slug URLs on the KO locale so the
  // homepage passes link equity to the exact-match "[주명] 웹사이트 제작" pages.
  const locations: LocationItem[] = usStates
    .filter((s) => s.tier === 'large' || s.tier === 'medium')
    .map((s) => ({
      id: s.abbr,
      name: isKo ? s.name.ko : s.name.en,
      cities: (isKo ? s.cities.map((c) => c.ko) : s.cities.map((c) => c.en)).slice(0, 3).join(' · '),
      href: isKo ? `/ko/${s.koSlug}` : `/${s.slug}`,
    }))
  return <LocationLinksClient locale={locale} sectionNumber={sectionNumber} locations={locations} />
}
