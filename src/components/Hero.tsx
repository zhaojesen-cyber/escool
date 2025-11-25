import { useTranslation } from 'react-i18next'
import { ShoppingBag, ShoppingCart, CheckCircle2 } from 'lucide-react'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#f0f7f0] pt-16 lg:pt-20"
      aria-label={t('hero.title')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              
              {/* Advantages List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                {(t('hero.advantages', { returnObjects: true }) as string[]).map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1a7a1a] flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://shopee.co.id/soocool.mall"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 bg-[#1a7a1a] text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#0d4d0d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {t('hero.buyShopee')}
              </a>
              <a
                href="https://vt.tiktok.com/ZSHTYVj5fwj6j-kHOnd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 border-2 border-[#1a7a1a] text-[#1a7a1a] px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#1a7a1a]/10 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {t('hero.buyTikTok')}
              </a>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="relative flex items-center justify-center order-first lg:order-last">
            <div className="w-full max-w-xl">
              <img
                src="/logo.png"
                alt="Escool Ice Machine"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-[#f0f7f0]"></div>
    </section>
  )
}

export default Hero

