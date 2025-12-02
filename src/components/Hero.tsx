import { useTranslation } from 'react-i18next'
import { ShoppingBag, ShoppingCart, CheckCircle2 } from 'lucide-react'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center bg-[#f0f7f0] pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-32"
      aria-label={t('hero.title')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              
              {/* Advantages List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
                {(t('hero.advantages', { returnObjects: true }) as string[]).map((advantage, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a7a1a] flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4 sm:pt-5 md:pt-6">
              <a
                href="https://shopee.co.id/soocool.mall"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 sm:gap-3 bg-[#1a7a1a] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#0d4d0d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                {t('hero.buyShopee')}
              </a>
              <a
                href="https://vt.tiktok.com/ZSHTYVj5fwj6j-kHOnd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 sm:gap-3 border-2 border-[#1a7a1a] text-[#1a7a1a] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#1a7a1a]/10 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                {t('hero.buyTikTok')}
              </a>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="relative flex items-center justify-center order-first xl:order-last mt-4 sm:mt-6 lg:mt-0">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
              <img
                src="/machine/SC-20F.png"
                alt="Soocool SC-20F Ice Machine"
                className="w-full h-auto object-contain"
                loading="eager"
                width="600"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-white to-[#f0f7f0] pointer-events-none"></div>
    </section>
  )
}

export default Hero

