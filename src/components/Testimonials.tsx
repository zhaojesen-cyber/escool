import { useTranslation } from 'react-i18next'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const { t } = useTranslation()

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Restaurant Owner',
      content: 'Escool ice machines have been a game-changer for our restaurant. The quality and reliability are outstanding!',
      rating: 5,
    },
    {
      name: 'Maria Garcia',
      role: 'Bar Manager',
      content: 'We\'ve been using Escool machines for over 2 years. Excellent performance and great customer support.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Hotel Director',
      content: 'The industrial ice system from Escool handles our high demand perfectly. Highly recommended!',
      rating: 5,
    },
  ]

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 relative hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Quote className="w-12 h-12 text-blue-600 opacity-20 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

