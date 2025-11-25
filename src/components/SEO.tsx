import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SEO = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Update meta tags based on current language
    const updateMetaTags = () => {
      const lang = i18n.language
      
      // Update title
      document.title = lang === 'zh' 
        ? 'Escool - 优质制冰机品牌'
        : lang === 'id'
        ? 'Escool - Mesin Es Premium'
        : 'Escool - Premium Ice Machine'

      // Update description
      const description = lang === 'zh'
        ? 'Escool 提供专业级制冰机，满足您的业务需求。质量、效率和可靠性的完美结合。'
        : lang === 'id'
        ? 'Escool menyediakan mesin es kelas profesional untuk kebutuhan bisnis Anda. Perpaduan sempurna antara kualitas, efisiensi, dan keandalan.'
        : 'Escool provides professional-grade ice machines for your business needs. The perfect blend of quality, efficiency, and reliability.'

      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)

      // Update lang attribute
      document.documentElement.lang = lang

      // Update Open Graph tags
      const updateOGTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`)
        if (!tag) {
          tag = document.createElement('meta')
          tag.setAttribute('property', property)
          document.head.appendChild(tag)
        }
        tag.setAttribute('content', content)
      }

      updateOGTag('og:title', document.title)
      updateOGTag('og:description', description)
      updateOGTag('og:locale', lang === 'zh' ? 'zh_CN' : lang === 'id' ? 'id_ID' : 'en_US')
      updateOGTag('og:type', 'website')

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

      // Update alternate language links (assuming same URL for all languages)
      const currentUrl = window.location.href
      updateAlternateLink('en', currentUrl)
      updateAlternateLink('zh', currentUrl)
      updateAlternateLink('id', currentUrl)
      updateAlternateLink('x-default', currentUrl)
    }

    updateMetaTags()
  }, [i18n.language, t])

  return null
}

export default SEO

