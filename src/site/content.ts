import en from '../i18n/locales/en.json'
import id from '../i18n/locales/id.json'
import zh from '../i18n/locales/zh.json'
import productsData from '../data/products.json'

export const defaultLocale = 'en' as const
export const locales = ['en', 'id', 'zh'] as const

export type Locale = (typeof locales)[number]
export type ProductType = 'all' | 'small-home' | 'medium-home' | 'small-commercial' | 'large-commercial'

export interface Product {
  id: string
  code: string
  power: string
  type: Exclude<ProductType, 'all'>
  capacity?: string
  storage?: string
  image: string
  shopeeUrl: string
  tiktokUrl: string
  featured?: boolean
  featuredLabel?: string
}

export type Dictionary = typeof en

export interface HomePageContext {
  kind: 'home'
  locale: Locale
}

export interface ProductPageContext {
  kind: 'product'
  locale: Locale
  productSlug: string
}

export type SitePageContext = HomePageContext | ProductPageContext

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  id,
  zh,
}

export const products = productsData as Product[]

export function normalizeLocale(locale?: string): Locale {
  if (!locale) return defaultLocale
  const normalized = locale.toLowerCase()
  return locales.find(item => item === normalized) ?? defaultLocale
}

export function getProductSlug(code: string): string {
  return code.toLowerCase()
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => getProductSlug(product.code) === slug.toLowerCase())
}

export function toSentenceFragment(value: string): string {
  if (!value) return value
  return value.charAt(0).toLowerCase() + value.slice(1)
}

export function getUseCaseFragment(locale: Locale, value: string): string {
  if (!value) return value

  const patterns: Record<Locale, RegExp[]> = {
    en: [/^(perfect|ideal|suitable)\s+for\s+/i],
    id: [/^(cocok|ideal|sempurna)\s+untuk\s+/i],
    zh: [],
  }

  let fragment = value.trim()

  for (const pattern of patterns[locale]) {
    fragment = fragment.replace(pattern, '')
  }

  return toSentenceFragment(fragment)
}

export function getCategoryIndex(type: Exclude<ProductType, 'all'>): number {
  switch (type) {
    case 'small-home':
      return 0
    case 'medium-home':
      return 1
    case 'small-commercial':
      return 2
    case 'large-commercial':
      return 3
  }
}

export function getCategoryCopy(locale: Locale, type: Exclude<ProductType, 'all'>) {
  const dictionary = dictionaries[locale]
  const index = getCategoryIndex(type)
  return {
    card: dictionary.products.items[index],
    details: dictionary.products.detailedInfo[type],
    simpleLabel: dictionary.products.simpleLabels[index],
  }
}

export function getHomePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`
}

export function getSectionPath(locale: Locale, sectionId: string): string {
  return `${getHomePath(locale)}#${sectionId}`
}

export function getProductPath(locale: Locale, productOrSlug: Product | string): string {
  const slug = typeof productOrSlug === 'string' ? productOrSlug : getProductSlug(productOrSlug.code)
  const base = locale === defaultLocale ? '' : `/${locale}`
  return `${base}/products/${slug}/`
}

export function getPagePath(page: SitePageContext): string {
  if (page.kind === 'home') return getHomePath(page.locale)
  return getProductPath(page.locale, page.productSlug)
}

export function getLocalizedPagePath(page: SitePageContext, locale: Locale): string {
  if (page.kind === 'home') return getHomePath(locale)
  return getProductPath(locale, page.productSlug)
}

export function getPageFromPath(pathname: string): SitePageContext {
  const normalizedPath = pathname.replace(/\/+/g, '/')
  const trimmed = normalizedPath.replace(/^\/|\/$/g, '')

  if (!trimmed) {
    return { kind: 'home', locale: defaultLocale }
  }

  const segments = trimmed.split('/')
  const first = normalizeLocale(segments[0])

  if (segments.length >= 3 && locales.includes(first) && segments[1] === 'products') {
    return {
      kind: 'product',
      locale: first,
      productSlug: segments[2],
    }
  }

  if (segments.length >= 2 && segments[0] === 'products') {
    return {
      kind: 'product',
      locale: defaultLocale,
      productSlug: segments[1],
    }
  }

  if (locales.includes(first)) {
    return { kind: 'home', locale: first }
  }

  return { kind: 'home', locale: defaultLocale }
}
