import { useTranslation } from 'react-i18next'
import { ShoppingBag, ShoppingCart } from 'lucide-react'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 lg:pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Purchase Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-6 h-6" />
              {t('hero.buyTikTok')}
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#EE4D2D] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d43f1f] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6" />
              {t('hero.buyShopee')}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

export default Hero

