import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'

const Consultation = () => {
  const { t } = useTranslation()

  // Replace with your actual WhatsApp number
  const whatsappNumber = '6285210032851' // Format: country code + number without +
  const whatsappMessage = encodeURIComponent('Hello, I would like to inquire about custom ice machine solutions.')

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    window.open(url, '_blank')
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-gradient-to-br from-[#25D366] via-[#20BA5A] to-[#128C7E] relative overflow-hidden"
      aria-label={t('consultation.title')}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('consultation.title')}
          </h2>
          <p className="text-xl text-white/95 mb-6 font-medium">
            {t('consultation.subtitle')}
          </p>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('consultation.description')}
          </p>
          <button
            onClick={openWhatsApp}
            className="group inline-flex items-center gap-3 bg-white text-[#25D366] px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-3xl"
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

