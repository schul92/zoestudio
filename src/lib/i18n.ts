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
    },
    hero: {
      title: 'Illuminate