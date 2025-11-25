import { useTranslation } from 'react-i18next'
import { Wrench, Headphones, Settings } from 'lucide-react'

const Services = () => {
  const { t } = useTranslation()

  const services = [
    {
      icon: Wrench,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
    },
    {
      icon: Headphones,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
    },
    {
      icon: Settings,
      title: t('services.customization.title'),
      description: t('services.customization.description'),
    },
  ]

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-gradient-to-br from-[#F4FBEF] via-white to-gray-50"
      aria-label={t('services.title')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1a7a1a] to-[#0d4d0d] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services

