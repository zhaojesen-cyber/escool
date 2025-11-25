import { useTranslation } from 'react-i18next'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const { t } = useTranslation()

  // Get testimonials from translation files
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string
    role: string
    content: string
    rating: number
    date?: string
    business?: string
  }>

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-white"
      aria-label={t('testimonials.title')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <Quote className="w-10 h-10 text-gray-300 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-base">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a7a1a] to-[#0d4d0d] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-base">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  {testimonial.business && (
                    <p className="text-xs text-gray-500 mt-1">{testimonial.business}</p>
                  )}
                  {testimonial.date && (
                    <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

