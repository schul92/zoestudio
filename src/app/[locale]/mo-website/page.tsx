import type { Metadata } from 'next'
import StatePage, { buildStateMetadata } from '@/components/StatePage'
import { usStates } from '@/data/usStates'

const data = usStates.find((s) => s.slug === 'mo-website')!

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  return buildStateMetadata(data, locale)
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'ko' ? 'ko' : 'en'
  return <StatePage data={data} locale={locale} />
}
