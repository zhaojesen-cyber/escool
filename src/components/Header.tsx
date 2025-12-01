import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsMenuOpen(false)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'id', name: 'Bahasa' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center"
            >
              <img 
                src="/newlogo.png" 
                alt="Soocool Logo" 
                className="h-12 lg:h-14 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
            >
              {t('header.home')}
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
            >
              {t('header.products')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
            >
              {t('header.services')}
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
            >
              {t('header.testimonials')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
            >
              {t('header.contact')}
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors">
                <Globe className="w-5 h-5" />
                <span className="uppercase">{i18n.language}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-base hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[#1a7a1a]/20 text-[#1a7a1a] font-bold'
                        : 'text-gray-700 font-semibold'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-900 hover:text-[#1a7a1a] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {t('header.home')}
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {t('header.products')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {t('header.services')}
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {t('header.testimonials')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {t('header.contact')}
              </button>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-gray-900" />
                  <span className="text-base font-bold text-gray-900">Language</span>
                </div>
                <div className="flex flex-col gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                    className={`text-left px-4 py-2 text-base rounded-lg transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-[#1a7a1a]/20 text-[#1a7a1a] font-bold'
                        : 'text-gray-700 hover:bg-gray-100 font-semibold'
                    }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

