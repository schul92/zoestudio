#!/usr/bin/env node
/**
 * Generates page.tsx files for each city in koreanCities.ts.
 * Writes to src/app/[locale]/<slug>/page.tsx and <koSlug>/page.tsx.
 */
const fs = require('fs');
const path = require('path');

// Load city data via parse
const dataFile = fs.readFileSync(path.join(__dirname, '../src/data/koreanCities.ts'), 'utf8');
// Hack: eval the exported array (safe in our controlled env)
const match = dataFile.match(/export const koreanCities: CityData\[\] = (\[[\s\S]*?\n\])\n\nexport/);
const cities = eval(match[1]);

const APP_DIR = path.join(__dirname, '../src/app/[locale]');

function makePage(city, isKorean) {
  const slug = isKorean ? city.koSlug : city.slug;
  const localeForced = isKorean ? 'ko' : undefined;
  const cityEn = city.city.en;
  const cityKo = city.city.ko;

  return `import { Metadata } from 'next'
import KoreanCityPage from '@/components/templates/KoreanCityPage'
import { koreanCities } from '@/data/koreanCities'

const cityData = koreanCities.find(c => c.slug === '${city.slug}')!

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = ${localeForced ? `'${localeForced}' as 'ko'` : `params.locale as 'en' | 'ko'`}
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  const enUrl = \`\${baseUrl}/${city.slug}\`
  const koUrl = \`\${baseUrl}/ko/${city.koSlug}\`

  if (locale === 'ko') {
    return {
      title: \`\${cityData.city.ko} 한인 웹디자인 | \${cityData.city.en} Korean Web Design | ZOE LUMOS\`,
      description: \`\${cityData.city.ko} #1 한인 웹디자인 에이전시. 한영 이중언어 웹사이트, 구글 SEO, 카카오톡 연동. \${cityData.neighborhoods.slice(0, 4).map(n => n.ko).join(', ')} 전역 서비스. 100% 한국어 상담.\`,
      keywords: \`\${cityData.city.ko} 웹사이트 제작, \${cityData.city.ko} 한인 웹디자인, \${cityData.city.ko} 홈페이지 제작, \${cityData.city.ko} 한인 마케팅, \${cityData.city.ko} SEO, \${cityData.city.ko} 한인 쇼핑몰, \${cityData.region.ko} 한인 웹사이트, 미국 웹사이트 제작, 미국 한인 웹에이전시\`,
      openGraph: { title: \`\${cityData.city.ko} 한인 웹디자인 - ZOE LUMOS\`, description: cityData.hubDescription.ko, url: koUrl, siteName: 'ZOE LUMOS', locale: 'ko_KR', alternateLocale: 'en_US', type: 'website' },
      alternates: { canonical: koUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
    }
  }

  return {
    title: \`\${cityData.city.en} Korean Web Design | #1 Korean-American Agency | ZOE LUMOS\`,
    description: \`\${cityData.city.en}'s #1 Korean web design agency. Bilingual Korean-English websites, local SEO, KakaoTalk integration. Serving \${cityData.neighborhoods.slice(0, 4).map(n => n.en).join(', ')} & all of \${cityData.region.en}.\`,
    keywords: \`korean web design \${cityData.city.en.toLowerCase()}, korean american web design \${cityData.city.en.toLowerCase()}, \${cityData.city.en.toLowerCase()} korean website, bilingual web design \${cityData.city.en.toLowerCase()}, korean marketing agency \${cityData.city.en.toLowerCase()}, korean business website \${cityData.region.en.toLowerCase()}, korean seo \${cityData.city.en.toLowerCase()}, korean web developer \${cityData.city.en.toLowerCase()}\`,
    openGraph: { title: \`\${cityData.city.en} Korean Web Design - ZOE LUMOS\`, description: cityData.hubDescription.en, url: enUrl, siteName: 'ZOE LUMOS', locale: 'en_US', alternateLocale: 'ko_KR', type: 'website' },
    alternates: { canonical: enUrl, languages: { 'x-default': enUrl, en: enUrl, ko: koUrl } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = ${localeForced ? `'${localeForced}' as 'ko'` : `(params.locale as 'en' | 'ko')`}
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zoelumos.com'
  return <KoreanCityPage data={cityData} locale={locale} baseUrl={baseUrl} />
}
`
}

let count = 0
for (const city of cities) {
  const enDir = path.join(APP_DIR, city.slug)
  const koDir = path.join(APP_DIR, city.koSlug)
  fs.mkdirSync(enDir, { recursive: true })
  fs.mkdirSync(koDir, { recursive: true })
  fs.writeFileSync(path.join(enDir, 'page.tsx'), makePage(city, false))
  fs.writeFileSync(path.join(koDir, 'page.tsx'), makePage(city, true))
  count += 2
  console.log(`✅ ${city.slug} + ${city.koSlug}`)
}
console.log(`\n🎉 Generated ${count} page files for ${cities.length} cities.`)
