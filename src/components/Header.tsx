import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'
import { getHomePath, getLocalizedPagePath, getSectionPath, type SitePageContext } from '../site/content'

interface HeaderProps {
  page: SitePageContext
}

const Header = ({ page }: HeaderProps) => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'id', name: 'Bahasa' },
  ] as const

  const currentLanguage = page.locale
  const homePath = getHomePath(page.locale)
  const navItems = [
    { label: t('header.home'), href: getHomePath(page.locale) },
    { label: t('header.products'), href: getSectionPath(page.locale, 'products') },
    { label: t('header.services'), href: getSectionPath(page.locale, 'services') },
    { label: t('header.testimonials'), href: getSectionPath(page.locale, 'testimonials') },
    { label: t('header.contact'), href: getSectionPath(page.locale, 'contact') },
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
            <a href={homePath} className="flex items-center">
              <img 
                src="/newlogo.png" 
                alt="Soocool Logo" 
                className="h-12 lg:h-14 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors">
                <Globe className="w-5 h-5" />
                <span className="uppercase">{currentLanguage}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={getLocalizedPagePath(page, lang.code)}
                    className={`w-full text-left px-4 py-2 text-base hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-[#1a7a1a]/20 text-[#1a7a1a] font-bold'
                        : 'text-gray-700 font-semibold'
                    }`}
                  >
                    {lang.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Language Selector & Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = languages.findIndex(l => l.code === currentLanguage)
                  const nextIndex = (currentIndex + 1) % languages.length
                  window.location.href = getLocalizedPagePath(page, languages[nextIndex].code)
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold text-sm transition-colors"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase text-xs">{currentLanguage}</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-[#1a7a1a] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-900 hover:text-[#1a7a1a] font-bold text-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-gray-900" />
                  <span className="text-base font-bold text-gray-900">{t('header.language')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={getLocalizedPagePath(page, lang.code)}
                      className={`w-full text-left px-4 py-3 text-base rounded-lg transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-[#1a7a1a] text-white font-bold'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 font-semibold'
                      }`}
                    >
                      {lang.name}
                    </a>
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
