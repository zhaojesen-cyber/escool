import { useTranslation } from 'react-i18next'
import { getProductPath, type Locale } from '../site/content'

interface KeywordGuideProps {
  locale: Locale
}

const KeywordGuide = ({ locale }: KeywordGuideProps) => {
  const { t } = useTranslation()
  const items = t('seoGuide.items', { returnObjects: true }) as Array<{
    title: string
    body: string
  }>

  return (
    <section id="buying-guide" className="py-20 lg:py-28 bg-[#f7faf7]" aria-label={t('seoGuide.title')}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            {t('seoGuide.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t('seoGuide.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {t('seoGuide.intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map(item => (
              <article
                key={item.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-8">
            {t('seoGuide.outroPrefix')}{' '}
            <a
              href={getProductPath(locale, 'es-12b')}
              className="text-[#1a7a1a] font-bold hover:text-[#0d4d0d] transition-colors"
            >
              {t('seoGuide.outroLink')}
            </a>
            {' '}{t('seoGuide.outroSuffix')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default KeywordGuide
