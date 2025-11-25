import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'

const Consultation = () => {
  const { t } = useTranslation()

  // Replace with your actual WhatsApp number
  const whatsappNumber = '1234567890' // Format: country code + number without +
  const whatsappMessage = encodeURIComponent('Hello, I would like to inquire about custom ice machine solutions.')

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    window.open(url, '_blank')
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 to-indigo-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('consultation.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-4">
            {t('consultation.subtitle')}
          </p>
          <p className="text-lg text-blue-50 mb-12 max-w-2xl mx-auto">
            {t('consultation.description')}
          </p>
          <button
            onClick={openWhatsApp}
            className="group inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <MessageCircle className="w-6 h-6" />
            {t('consultation.button')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Consultation

