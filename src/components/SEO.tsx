import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import allProductsData from '../data/products.json'

const SEO = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Update meta tags based on current language
    const updateMetaTags = () => {
      const lang = i18n.language
      const baseUrl = window.location.origin
      const currentUrl = window.location.href
      
      // SEO content based on language
      const seoContent = {
        zh: {
          title: 'Soocool - 优质制冰机品牌 | 专业制冰机制造商',
          description: 'Soocool 提供专业级制冰机，满足您的业务需求。质量、效率和可靠性的完美结合。从小型家用机到大型商用机，我们提供完整的制冰解决方案。',
          keywords: '制冰机,商用制冰机,家用制冰机,制冰机品牌,Soocool,制冰设备,制冰系统,印尼制冰机',
        },
        id: {
          title: 'Soocool - Mesin Es Premium | Produsen Mesin Es Profesional',
          description: 'Soocool menyediakan mesin es kelas profesional untuk kebutuhan bisnis Anda. Perpaduan sempurna antara kualitas, efisiensi, dan keandalan. Dari mesin rumah kecil hingga mesin komersial besar.',
          keywords: 'mesin es,mesin es komersial,mesin es rumah,produsen mesin es,Soocool,peralatan es,sistem es,mesin es Jakarta',
        },
        en: {
          title: 'Soocool - Premium Ice Machine | Professional Ice Machine Manufacturer',
          description: 'Soocool provides professional-grade ice machines for your business needs. The perfect blend of quality, efficiency, and reliability. From small home units to large commercial systems, we offer complete ice solutions.',
          keywords: 'ice machine,commercial ice machine,home ice maker,ice machine brand,Soocool,ice equipment,ice system,ice machine Indonesia',
        },
      }

      const content = seoContent[lang as keyof typeof seoContent] || seoContent.en
      
      // Update title
      document.title = content.title

      // Helper function to update or create meta tag
      const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
        let tag = document.querySelector(`meta[${attribute}="${name}"]`)
        if (!tag) {
          tag = document.createElement('meta')
          tag.setAttribute(attribute, name)
          document.head.appendChild(tag)
        }
        tag.setAttribute('content', content)
      }

      // Update description
      updateMetaTag('description', content.description)
      
      // Update keywords
      updateMetaTag('keywords', content.keywords)
      
      // Robots
      updateMetaTag('robots', 'index, follow')
      
      // Author
      updateMetaTag('author', 'Soocool')
      
      // Viewport (already in HTML, but ensure it's correct)
      updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

      // Additional SEO meta tags
      updateMetaTag('geo.region', 'ID-JK')
      updateMetaTag('geo.placename', 'Jakarta')
      updateMetaTag('geo.position', '-6.147168;106.9002237')
      updateMetaTag('ICBM', '-6.147168, 106.9002237')

      // Update lang attribute
      document.documentElement.lang = lang

      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', currentUrl)

      // Open Graph tags
      updateMetaTag('og:title', content.title, 'property')
      updateMetaTag('og:description', content.description, 'property')
      updateMetaTag('og:type', 'website', 'property')
      updateMetaTag('og:url', currentUrl, 'property')
      updateMetaTag('og:image', `${baseUrl}/logo.png`, 'property')
      updateMetaTag('og:image:width', '1200', 'property')
      updateMetaTag('og:image:height', '630', 'property')
      updateMetaTag('og:image:alt', content.title, 'property')
      updateMetaTag('og:locale', lang === 'zh' ? 'zh_CN' : lang === 'id' ? 'id_ID' : 'en_US', 'property')
      updateMetaTag('og:site_name', 'Soocool', 'property')


      // Alternate language links
      const updateAlternateLink = (langCode: string, href: string) => {
        let link = document.querySelector(`link[rel="alternate"][hreflang="${langCode}"]`)
        if (!link) {
          link = document.createElement('link')
          link.setAttribute('rel', 'alternate')
          link.setAttribute('hreflang', langCode)
          document.head.appendChild(link)
        }
        link.setAttribute('href', href)
      }

      updateAlternateLink('en', currentUrl)
      updateAlternateLink('zh', currentUrl)
      updateAlternateLink('id', currentUrl)
      updateAlternateLink('x-default', currentUrl)

      // Structured Data (JSON-LD)
      const products = allProductsData as Array<{
        id: string
        code: string
        power: string
        capacity?: string
        storage?: string
        image: string
        shopeeUrl: string
      }>

      // Organization Schema
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Soocool',
        alternateName: 'PT. Multi Citra Rejeki (MCR)',
        description: content.description,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        image: `${baseUrl}/logo.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gading Kirana Utara Blok A13 No. 33, RT.18/RW.8, Klp. Gading Bar.',
          addressLocality: 'Kec. Klp. Gading, Jkt Utara',
          addressRegion: 'Jakarta',
          postalCode: '14240',
          addressCountry: 'ID'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -6.147168,
          longitude: 106.9002237
        },
        telephone: '+62-852-1003-2851',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+62-852-1003-2851',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Chinese', 'Indonesian'],
          areaServed: 'ID',
          contactOption: 'TollFree'
        },
        sameAs: [
          'https://shopee.co.id/soocool.mall',
          'https://vt.tiktok.com/ZSHTYVj5fwj6j-kHOnd/',
          'https://www.facebook.com/soocool.indonesia',
          'https://www.instagram.com/soocool.indonesia'
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '3',
          bestRating: '5',
          worstRating: '1'
        }
      }

      // LocalBusiness Schema
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}#business`,
        name: 'Soocool',
        image: `${baseUrl}/logo.png`,
        description: content.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gading Kirana Utara Blok A13 No. 33, RT.18/RW.8, Klp. Gading Bar.',
          addressLocality: 'Kec. Klp. Gading, Jkt Utara',
          addressRegion: 'Jakarta',
          postalCode: '14240',
          addressCountry: 'ID'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -6.147168,
          longitude: 106.9002237
        },
        telephone: '+62-852-1003-2851',
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          opens: '09:00',
          closes: '18:00'
        }
      }

      // Product Schemas
      const productSchemas = products.map(product => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `Soocool ${product.code} Ice Machine`,
        description: `${content.description} Model ${product.code} with ${product.capacity || 'high'} ice production capacity.`,
        brand: {
          '@type': 'Brand',
          name: 'Soocool'
        },
        sku: product.code,
        image: `${baseUrl}${product.image}`,
        offers: {
          '@type': 'Offer',
          url: product.shopeeUrl,
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Soocool'
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '1',
          bestRating: '5'
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Power',
            value: product.power
          },
          ...(product.capacity ? [{
            '@type': 'PropertyValue',
            name: 'Ice Production Capacity',
            value: product.capacity
          }] : []),
          ...(product.storage ? [{
            '@type': 'PropertyValue',
            name: 'Ice Storage Capacity',
            value: product.storage
          }] : [])
        ]
      }))

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'zh' ? '产品' : lang === 'id' ? 'Produk' : 'Products',
            item: `${baseUrl}#products`
          }
        ]
      }

      // Remove old structured data
      const oldStructuredData = document.querySelectorAll('script[type="application/ld+json"]')
      oldStructuredData.forEach(script => script.remove())

      // Add all structured data
      const allSchemas = [
        organizationSchema,
        localBusinessSchema,
        breadcrumbSchema,
        ...productSchemas
      ]

      allSchemas.forEach((schema, index) => {
        const script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.setAttribute('id', `structured-data-${index}`)
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      })
    }

    updateMetaTags()
  }, [i18n.language, t])

  return null
}

export default SEO
