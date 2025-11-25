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
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services

