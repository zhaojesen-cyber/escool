import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import Consultation from '../components/Consultation'
import Footer from '../components/Footer'
import {
  getCategoryCopy,
  getUseCaseFragment,
  getHomePath,
  getProductBySlug,
  getProductPath,
  products,
  type ProductPageContext,
} from '../site/content'

interface ProductPageProps {
  page: ProductPageContext
}

const ProductPage = ({ page }: ProductPageProps) => {
  const { t } = useTranslation()
  const product = getProductBySlug(page.productSlug)

  if (!product) {
    return (
      <>
        <Header page={{ kind: 'home', locale: page.locale }} />
        <main className="pt-24 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('productPage.notFoundTitle')}</h1>
          <a
            href={getHomePath(page.locale)}
            className="inline-flex items-center justify-center bg-[#1a7a1a] text-white px-6 py-3 rounded-full font-bold"
          >
            {t('productPage.backToProducts')}
          </a>
        </main>
        <Footer page={{ kind: 'home', locale: page.locale }} />
      </>
    )
  }

  const categoryCopy = getCategoryCopy(page.locale, product.type)
  const useCase = getUseCaseFragment(page.locale, categoryCopy.details.description)
  const relatedProducts = products.filter(item => item.type === product.type && item.id !== product.id).slice(0, 3)
  const whatsappText = encodeURIComponent(
    t('productPage.whatsappMessage', { code: product.code, category: categoryCopy.card.name }),
  )
  const whatsappHref = `https://wa.me/6285210032851?text=${whatsappText}`

  return (
    <>
      <Header page={page} />
      <main className="overflow-x-hidden w-full">
        <section className="bg-[#f0f7f0] pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label={t('productPage.breadcrumbAriaLabel')}
              className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-8"
            >
              <a href={getHomePath(page.locale)} className="hover:text-[#1a7a1a] transition-colors">
                {t('productPage.breadcrumbHome')}
              </a>
              <span>/</span>
              <a href={`${getHomePath(page.locale)}#products`} className="hover:text-[#1a7a1a] transition-colors">
                {t('productPage.breadcrumbProducts')}
              </a>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{product.code}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10">
                <img
                  src={product.image}
                  alt={t('productPage.imageAlt', { code: product.code, category: categoryCopy.card.name })}
                  className="w-full h-auto object-contain"
                  width="720"
                  height="720"
                />
              </div>

              <div>
                <p className="inline-flex items-center rounded-full bg-[#1a7a1a]/10 text-[#1a7a1a] px-4 py-2 text-sm font-bold mb-4">
                  {categoryCopy.card.name}
                </p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                  {t('productPage.titleTemplate', { code: product.code })}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('productPage.descriptionTemplate', {
                    code: product.code,
                    category: categoryCopy.card.name,
                    useCase,
                    capacity: product.capacity ?? t('productPage.multipleOptions'),
                  })}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="rounded-2xl bg-white shadow-md p-5 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">{t('productPage.categoryLabel')}</p>
                    <p className="text-lg font-bold text-gray-900">{categoryCopy.simpleLabel}</p>
                  </div>
                  <div className="rounded-2xl bg-white shadow-md p-5 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">{t('productPage.powerLabel')}</p>
                    <p className="text-lg font-bold text-gray-900">{product.power}</p>
                  </div>
                  <div className="rounded-2xl bg-white shadow-md p-5 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">{t('productPage.capacityLabel')}</p>
                    <p className="text-lg font-bold text-gray-900">{product.capacity ?? t('productPage.multipleOptions')}</p>
                  </div>
                  <div className="rounded-2xl bg-white shadow-md p-5 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">{t('productPage.storageLabel')}</p>
                    <p className="text-lg font-bold text-gray-900">{product.storage ?? t('productPage.onRequest')}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={product.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#1a7a1a] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#0d4d0d] transition-colors"
                  >
                    {t('productPage.buyShopee')}
                  </a>
                  <a
                    href={product.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-2 border-[#1a7a1a] text-[#1a7a1a] px-8 py-4 rounded-full font-bold text-base hover:bg-[#1a7a1a]/10 transition-colors"
                  >
                    {t('productPage.buyTikTok')}
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    {t('productPage.askWhatsApp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {t('productPage.overviewTitle')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t('productPage.overviewBody', {
                    code: product.code,
                    category: categoryCopy.card.name,
                    useCase,
                  })}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(t('productPage.highlights', { returnObjects: true }) as string[]).map(item => (
                    <div key={item} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-700 font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-3xl bg-gray-900 text-white p-8">
                <h2 className="text-2xl font-bold mb-4">{t('productPage.supportTitle')}</h2>
                <p className="text-white/85 leading-relaxed mb-6">{t('productPage.supportBody')}</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  {t('productPage.supportButton')}
                </a>
              </aside>
            </div>
          </div>
        </section>

        {product.code === 'ES-12B' && (
          <section className="py-16 lg:py-24 bg-[#f7faf7]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {t('productPage.keywordSpotlightTitle')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('productPage.keywordSpotlightBody')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(t('productPage.keywordSpotlightItems', { returnObjects: true }) as Array<{ title: string; body: string }>).map(item => (
                    <article key={item.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {relatedProducts.length > 0 && (
          <section className="py-16 lg:py-24 bg-[#f7faf7]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    {t('productPage.relatedTitle')}
                  </h2>
                  <p className="text-lg text-gray-600">{t('productPage.relatedSubtitle')}</p>
                </div>
                <a
                  href={`${getHomePath(page.locale)}#products`}
                  className="hidden sm:inline-flex items-center text-[#1a7a1a] font-bold hover:text-[#0d4d0d] transition-colors"
                >
                  {t('productPage.backToProducts')}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(item => (
                  <article
                    key={item.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden"
                  >
                    <div className="bg-gray-50 p-6">
                      <img
                        src={item.image}
                        alt={t('productPage.imageAlt', { code: item.code, category: getCategoryCopy(page.locale, item.type).card.name })}
                        className="w-full h-56 object-contain"
                        width="360"
                        height="280"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.code}</h3>
                      <p className="text-gray-600 mb-4">{getCategoryCopy(page.locale, item.type).card.name}</p>
                      <a
                        href={getProductPath(page.locale, item)}
                        className="inline-flex items-center text-[#1a7a1a] font-bold hover:text-[#0d4d0d] transition-colors"
                      >
                        {t('products.viewDetails')}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Services />
        <FAQ />
        <Consultation />
      </main>
      <Footer page={page} />
    </>
  )
}

export default ProductPage
