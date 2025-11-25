import { useTranslation } from 'react-i18next'
import { Snowflake, Droplets, Zap } from 'lucide-react'

const Products = () => {
  const { t } = useTranslation()

  const products = [
    {
      icon: Snowflake,
      title: 'Commercial Ice Machines',
      description: 'High-capacity ice machines perfect for restaurants and bars',
    },
    {
      icon: Droplets,
      title: 'Undercounter Ice Makers',
      description: 'Space-efficient solutions for small businesses',
    },
    {
      icon: Zap,
      title: 'Industrial Ice Systems',
      description: 'Heavy-duty machines for large-scale operations',
    },
  ]

  return (
    <section
      id="products"
      className="py-20 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {t('products.subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products

