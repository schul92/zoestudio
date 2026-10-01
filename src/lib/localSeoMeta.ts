import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'
import type { LocalSeoEntry } from '@/data/localSeoPages'

// Both locale variants of a landing point at one canonical per language:
// EN → /{slug}, KO → /ko/{koSlug}. /ko/{slug} and /{koSlug} render but canonicalize there.
export function localSeoMeta(e: LocalSeoEntry, locale: 'en' | 'ko'): Metadata {
  const en = `${SITE_URL}/${e.slug}`
  const ko = `${SITE_URL}/ko/${e.koSlug}`
  const isKo = locale === 'ko'
  const url = isKo ? ko : en
  return {
    title: { absolute: isKo ? e.title.ko : e.title.en },
    description: isKo ? e.description.ko : e.description.en,
    openGraph: {
      title: isKo ? e.title.ko : e.title.en,
      description: isKo ? e.description.ko : e.description.en,
      url,
      siteName: isKo ? 'ZOE LUMOS 조이루모스' : 'ZOE LUMOS',
      locale: isKo ? 'ko_KR' : 'en_US',
      alternateLocale: isKo ? 'en_US' : 'ko_KR',
      type: 'website',
    },
    alternates: { canonical: url, languages: { 'x-default': en, en, ko } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}
