import { useTranslation } from 'react-i18next'

const FAQ = () => {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white" aria-label={t('faq.title')}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            {t('faq.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-5">
          {items.map(item => (
            <article
              key={item.question}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:p-7 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
