export const i18n = {
  locales: ['en', 'ko'],
  defaultLocale: 'en',
} as const

export type Locale = (typeof i18n.locales)[number]

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      portfolio: 'Portfolio',
    },
  },
  ko: {
    nav: {
      home: '홈',
      services: '서비스',
      about: '소개',
      contact: '연락처',
      portfolio: '포트폴리오',
    },
  },
}