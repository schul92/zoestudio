import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StatePage, { buildStateMetadata } from '@/components/StatePage'
import { usStates, STATES_WITH_CUSTOM_PAGES } from '@/data/usStates'

// Korean-slug state routes (e.g. /ko/콜로라도-웹사이트) for the 38 programmatic
// states. The 12 custom states already have literal Korean-slug directories,
// which win over this dynamic segment. Unknown slugs 404 (dynamicParams=false).
export const dynamicParams = false

export function generateStaticParams() {
  const params: { locale: string; stateKoSlug: string }[] = []
  for (const s of usStates) {
    if (STATES_WITH_CUSTOM_PAGES.includes(s.abbr)) continue
    params.push({ locale: 'en', stateKoSlug: s.koSlug })
    params.push({ locale: 'ko', stateKoSlug: s.koSlug })
  }
  return params
}

function findState(stateKoSlug: string) {
  const koSlug = decodeURIComponent(stateKoSlug)
  return usStates.find(
    (s) => s.koSlug === koSlug && !STATES_WITH_CUSTOM_PAGES.includes(s.abbr)
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; stateKoSlug: string }
}): Promise<Metadata> {
  const state = findState(params.stateKoSlug)
  if (!state) return {}
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  // The Korean-slug URL is the KO canonical home; for locale==='en' on this
  // route buildStateMetadata canonicalizes to the English-slug page, avoiding
  // duplicate-content competition. hreflang: en -> /[slug], ko -> /ko/[koSlug],
  // x-default -> /[slug].
  return buildStateMetadata(state, locale)
}

export default function Page({
  params,
}: {
  params: { locale: string; stateKoSlug: string }
}) {
  const state = findState(params.stateKoSlug)
  if (!state) notFound()
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  return <StatePage data={state} locale={locale} />
}
