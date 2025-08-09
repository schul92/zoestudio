import enTranslations from '../../public/locales/en/common.json'
import koTranslations from '../../public/locales/ko/common.json'

type Translations = typeof enTranslations

export function useTranslation(locale: string = 'en') {
  const translations: Translations = locale === 'ko' ? koTranslations : enTranslations
  
  return {
    t: translations,
    locale
  }
}