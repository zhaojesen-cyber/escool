import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Consultation from './components/Consultation'
import Footer from './components/Footer'
import SEO from './components/SEO'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Update HTML lang attribute when language changes
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <Header />
      <main>
        <Hero />
        <Products />
        <Services />
        <Testimonials />
        <Consultation />
      </main>
      <Footer />
    </div>
  )
}

export default App

