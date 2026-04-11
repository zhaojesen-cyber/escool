import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defaultLocale, dictionaries, locales, type Locale } from '../site/content'

const resources = Object.fromEntries(
  locales.map(locale => [locale, { translation: dictionaries[locale] }]),
)

let initPromise: Promise<typeof i18n> | null = null

export async function initI18n(locale: Locale = defaultLocale) {
  if (!i18n.isInitialized) {
    initPromise ??= i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false,
      },
    })

    await initPromise
    return i18n
  }

  if (i18n.language !== locale) {
    await i18n.changeLanguage(locale)
  }

  return i18n
}

export default i18n
