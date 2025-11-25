import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
          title: 'Escool - 优质制冰机品牌 | 专业制冰机制造商',
          description: 'Escool 提供专业级制冰机，满足您的业务需求。质量、效率和可靠性的完美结合。从小型家用机到大型商用机，我们提供完整的制冰解决方案。',
          keywords: '制冰机,商用制冰机,家用制冰机,制冰机品牌,Escool,制冰设备,制冰系统',
        },
        id: {
          title: 'Escool - Mesin Es Premium | Produsen Mesin Es Profesional',
          description: 'Escool menyediakan mesin es kelas profesional untuk kebutuhan bisnis Anda. Perpaduan sempurna antara kualitas, efisiensi, dan keandalan. Dari mesin rumah kecil hingga mesin komersial besar.',
          keywords: 'mesin es,mesin es komersial,mesin es rumah,produsen mesin es,Escool,peralatan es,sistem es',
        },
        en: {
          title: 'Escool - Premium Ice Machine | Professional Ice Machine Manufacturer',
          description: 'Escool provides professional-grade ice machines for your business needs. The perfect blend of quality, efficiency, and reliability. From small home units to large commercial systems, we offer complete ice solutions.',
          keywords: 'ice machine,commercial ice machine,home ice maker,ice machine brand,Escool,ice equipment,ice system',
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
      updateMetaTag('author', 'Escool')
      
      // Viewport (already in HTML, but ensure it's correct)
      updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

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
      updateMetaTag('og:site_name', 'Escool', 'property')

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image', 'name')
      updateMetaTag('twitter:title', content.title, 'name')
      updateMetaTag('twitter:description', content.description, 'name')
      updateMetaTag('twitter:image', `${baseUrl}/logo.png`, 'name')

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
      let structuredData = document.querySelector('script[type="application/ld+json"]')
      if (!structuredData) {
        structuredData = document.createElement('script')
        structuredData.setAttribute('type', 'application/ld+json')
        document.head.appendChild(structuredData)
      }

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Escool',
        description: content.description,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          // Add your social media URLs here
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Chinese', 'Indonesian'],
        },
        offers: {
          '@type': 'AggregateOffer',
          offerCount: '7',
          lowPrice: '0',
          priceCurrency: 'USD',
        },
      }

      structuredData.textContent = JSON.stringify(jsonLd)
    }

    updateMetaTags()
  }, [i18n.language, t])

  return null
}

export default SEO

