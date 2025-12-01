import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Factory from './components/Factory'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Consultation from './components/Consultation'
import Footer from './components/Footer'
import SEO from './components/SEO'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Update HTML lang attribute when language changes
    const currentLang = i18n.language || 'en'
    document.documentElement.lang = currentLang
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      <SEO />
      <Header />
      <main className="overflow-x-hidden w-full">
        <Hero />
        <Products />
        <Factory />
        <Services />
        <Testimonials />
        <Consultation />
      </main>
      <Footer />
    </div>
  )
}

export default App

