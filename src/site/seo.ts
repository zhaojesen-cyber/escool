import {
  dictionaries,
  locales,
  type Locale,
  type Product,
  type SitePageContext,
  getCategoryCopy,
  getHomePath,
  getPagePath,
  getProductBySlug,
  getProductPath,
  products,
  getUseCaseFragment,
} from './content'

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export function resolveSiteUrl(): string {
  return trimTrailingSlash(process.env.SITE_URL ?? process.env.VITE_SITE_URL ?? 'https://escool.id')
}

function buildAbsoluteUrl(siteUrl: string, path: string): string {
  return `${trimTrailingSlash(siteUrl)}${path}`
}

function getHomeSeo(locale: Locale) {
  const seo = {
    zh: {
      title: 'Soocool - 优质制冰机品牌 | 专业制冰机制造商',
      description:
        'Soocool 提供家用与商用制冰机、安装维护支持和工厂直供服务，帮助印尼企业找到合适的制冰解决方案。',
      keywords:
        '制冰机,商用制冰机,家用制冰机,印尼制冰机,Jakarta 制冰机,Soocool,制冰设备,制冰机厂家',
    },
    id: {
      title: 'Soocool - Mesin Es Batu, Mesin Es Kristal, Mesin Es Cube & Ice Maker Portable',
      description:
        'Soocool menyediakan mesin es batu, mesin es kristal, mesin es cube, serta ice maker portable kapasitas 12kg dengan daya rendah untuk rumah, cafe, dan bisnis di Indonesia.',
      keywords:
        'mesin es batu,mesin es kristal,mesin es cube,ice maker kapasitas 12kg,mesin es daya rendah,mesin ice maker portable,mesin es Jakarta,Soocool',
    },
    en: {
      title: 'Soocool - Premium Ice Machines | Commercial and Home Ice Machine Manufacturer',
      description:
        'Soocool supplies home and commercial ice machines with factory-direct production, local support in Jakarta, and dependable after-sales service.',
      keywords:
        'ice machine,commercial ice machine,home ice maker,ice machine Indonesia,ice machine Jakarta,Soocool,ice machine supplier',
    },
  } as const

  return seo[locale]
}

function getProductDescription(locale: Locale, product: Product): string {
  const { card, details } = getCategoryCopy(locale, product.type)
  const useCase = getUseCaseFragment(locale, details.description)

  if (locale === 'id' && product.code === 'ES-12B') {
    return 'ES-12B adalah mesin ice maker portable kapasitas 12kg dengan daya rendah dari Soocool, cocok sebagai mesin es batu rumahan, mesin es kristal, dan mesin es cube untuk kebutuhan harian.'
  }

  const templates = {
    zh: `${product.code} 是 Soocool 的${card.name}，适合 ${details.description}，产冰量 ${product.capacity ?? '多规格可选'}，提供本地咨询与售后支持。`,
    id: `${product.code} adalah ${card.name} dari Soocool, cocok untuk ${useCase}, dengan kapasitas ${product.capacity ?? 'beragam pilihan kapasitas'} dan dukungan lokal di Indonesia.`,
    en: `${product.code} is a ${card.name.toLowerCase()} from Soocool, built for ${useCase} with ${product.capacity ?? 'multiple capacity options'} and local support in Indonesia.`,
  } as const

  return templates[locale]
}

function getProductKeywords(locale: Locale, product: Product): string {
  const { card } = getCategoryCopy(locale, product.type)

  if (locale === 'id' && product.code === 'ES-12B') {
    return [
      'ES-12B',
      'Soocool',
      'ice maker kapasitas 12kg',
      'mesin es daya rendah',
      'mesin ice maker portable',
      'mesin es batu',
      'mesin es kristal',
      'mesin es cube',
    ].join(',')
  }

  const values = {
    zh: [product.code, 'Soocool', card.name, '制冰机', '商用制冰机', '家用制冰机'],
    id: [product.code, 'Soocool', card.name, 'mesin es', 'mesin es komersial', 'mesin es Indonesia'],
    en: [product.code, 'Soocool', card.name, 'ice machine', 'commercial ice machine', 'ice machine Indonesia'],
  } as const

  return values[locale].join(',')
}

function getFaqItems(locale: Locale) {
  return dictionaries[locale].faq.items
}

function getOrganizationSchema(siteUrl: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soocool',
    alternateName: 'PT. Multi Citra Rejeki (MCR)',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    description,
    telephone: '+62-852-1003-2851',
    sameAs: [
      'https://shopee.co.id/soocool.mall',
      'https://www.tiktok.com/@soocool.indonesia',
      'https://www.facebook.com/profile.php?id=61581101786961',
      'https://www.instagram.com/soocool.indonesia',
      'https://www.youtube.com/@SOOCOOL.INDONESIA',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gading Kirana Utara Blok A13 No. 33, RT.18/RW.8, Klp. Gading Bar.',
      addressLocality: 'Kec. Klp. Gading, Jkt Utara',
      addressRegion: 'Jakarta',
      postalCode: '14240',
      addressCountry: 'ID',
    },
  }
}

function getLocalBusinessSchema(siteUrl: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#business`,
    name: 'Soocool',
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    description,
    telephone: '+62-852-1003-2851',
    priceRange: '$$',
    areaServed: 'Indonesia',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gading Kirana Utara Blok A13 No. 33, RT.18/RW.8, Klp. Gading Bar.',
      addressLocality: 'Kec. Klp. Gading, Jkt Utara',
      addressRegion: 'Jakarta',
      postalCode: '14240',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.147168,
      longitude: 106.9002237,
    },
  }
}

function getBreadcrumbSchema(siteUrl: string, page: SitePageContext, title: string) {
  const homeItem = {
    '@type': 'ListItem',
    position: 1,
    name: 'Soocool',
    item: buildAbsoluteUrl(siteUrl, getHomePath(page.locale)),
  }

  if (page.kind === 'home') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [homeItem],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      homeItem,
      {
        '@type': 'ListItem',
        position: 2,
        name: dictionaries[page.locale].products.title,
        item: buildAbsoluteUrl(siteUrl, getHomePath(page.locale)),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: buildAbsoluteUrl(siteUrl, getPagePath(page)),
      },
    ],
  }
}

function getHomeSchemas(siteUrl: string, locale: Locale, description: string) {
  const faqItems = getFaqItems(locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Soocool',
      url: buildAbsoluteUrl(siteUrl, getHomePath(locale)),
      inLanguage: locale,
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Soocool Ice Machines',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: buildAbsoluteUrl(siteUrl, getProductPath(locale, product)),
        name: product.code,
      })),
    },
  ]
}

function getProductSchemas(siteUrl: string, locale: Locale, product: Product, description: string) {
  const { card } = getCategoryCopy(locale, product.type)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${product.code} ${card.name}`,
      brand: {
        '@type': 'Brand',
        name: 'Soocool',
      },
      sku: product.code,
      image: `${siteUrl}${product.image}`,
      description,
      category: card.name,
      offers: {
        '@type': 'Offer',
        url: buildAbsoluteUrl(siteUrl, getProductPath(locale, product)),
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Soocool',
        },
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Power',
          value: product.power,
        },
        ...(product.capacity
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Ice Production Capacity',
                value: product.capacity,
              },
            ]
          : []),
        ...(product.storage
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Ice Storage Capacity',
                value: product.storage,
              },
            ]
          : []),
      ],
    },
  ]
}

export function getPageSeo(page: SitePageContext, siteUrl: string) {
  if (page.kind === 'home') {
    const seo = getHomeSeo(page.locale)
    return {
      ...seo,
      url: buildAbsoluteUrl(siteUrl, getHomePath(page.locale)),
      image: `${siteUrl}/logo.png`,
      type: 'website',
    }
  }

  const product = getProductBySlug(page.productSlug)
  if (!product) {
    const fallback = getHomeSeo(page.locale)
    return {
      ...fallback,
      url: buildAbsoluteUrl(siteUrl, getHomePath(page.locale)),
      image: `${siteUrl}/logo.png`,
      type: 'website',
    }
  }

  const { card } = getCategoryCopy(page.locale, product.type)

  if (page.locale === 'id' && product.code === 'ES-12B') {
    return {
      title: 'ES-12B Ice Maker Kapasitas 12kg | Mesin Es Daya Rendah Portable | Soocool',
      description: getProductDescription(page.locale, product),
      keywords: getProductKeywords(page.locale, product),
      url: buildAbsoluteUrl(siteUrl, getProductPath(page.locale, product)),
      image: `${siteUrl}${product.image}`,
      type: 'product',
    }
  }

  return {
    title: `${product.code} ${card.name} | Soocool`,
    description: getProductDescription(page.locale, product),
    keywords: getProductKeywords(page.locale, product),
    url: buildAbsoluteUrl(siteUrl, getProductPath(page.locale, product)),
    image: `${siteUrl}${product.image}`,
    type: 'product',
  }
}

export function getAlternateLinks(page: SitePageContext, siteUrl: string) {
  return locales.map(locale => {
    const path =
      page.kind === 'home'
        ? getHomePath(locale)
        : getProductPath(locale, page.productSlug)
    return {
      hreflang: locale,
      href: buildAbsoluteUrl(siteUrl, path),
    }
  })
}

export function getStructuredData(page: SitePageContext, siteUrl: string) {
  const seo = getPageSeo(page, siteUrl)
  const shared = [
    getOrganizationSchema(siteUrl, seo.description),
    getLocalBusinessSchema(siteUrl, seo.description),
    getBreadcrumbSchema(siteUrl, page, seo.title),
  ]

  if (page.kind === 'home') {
    return [...shared, ...getHomeSchemas(siteUrl, page.locale, seo.description)]
  }

  const product = getProductBySlug(page.productSlug)
  if (!product) return shared

  return [...shared, ...getProductSchemas(siteUrl, page.locale, product, seo.description)]
}
