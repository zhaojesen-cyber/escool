import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Home, Users, Store, Building2 } from 'lucide-react'
import allProductsData from '../data/products.json'

type ProductType = 'all' | 'small-home' | 'medium-home' | 'small-commercial' | 'large-commercial'

interface Product {
  id: string
  code: string
  power: string
  type: ProductType
  capacity?: string
  storage?: string
  image: string
  shopeeUrl: string
  tiktokUrl: string
  featured?: boolean
  featuredLabel?: string
}

const Products = () => {
  const { t, i18n } = useTranslation()
  const [selectedType, setSelectedType] = useState<ProductType>('small-home')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Get product categories from translation files
  const categories = t('products.items', { returnObjects: true }) as Array<{
    name: string
    capacity: string
    description: string
  }>

  // Product data from JSON file
  const allProducts: Product[] = allProductsData as Product[]

  // Filter products based on selected type
  const filteredProducts = allProducts.filter(p => p.type === selectedType)

  // Get category label for product type
  const getCategoryLabel = (type: ProductType): string => {
    if (type === 'all') return t('products.filterAll')
    const index = type === 'small-home' ? 0 : type === 'medium-home' ? 1 : type === 'small-commercial' ? 2 : 3
    return categories[index]?.name || ''
  }

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1) // -1 for rounding errors
    }
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 272 // 256px (w-64) + 24px (gap-6)
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 272 // 256px (w-64) + 24px (gap-6)
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  // Update arrow visibility on scroll and when filtered products change
  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [filteredProducts])

  return (
    <section
      id="products"
      className="py-20 lg:py-32 bg-white"
      aria-label={t('products.title')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Application Scenarios Section */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
            {t('products.applicationScenarios')}
          </h2>
          <div className="max-w-5xl mx-auto">
          {/* Product Guide Cards - Clickable Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Category Cards */}
            {categories.map((product, index) => {
              // Map index to product type
              const productTypes: ProductType[] = ['small-home', 'medium-home', 'small-commercial', 'large-commercial']
              const productType = productTypes[index]
              const isSelected = selectedType === productType
              
              // Get simplified label
              const simpleLabels = t('products.simpleLabels', { returnObjects: true }) as string[]
              const simpleLabel = simpleLabels[index]
              
              // Get detailed description for tooltip
              const detailedInfo = t(`products.detailedInfo.${productType}`, { returnObjects: true }) as {
                capacity: string
                description: string
              }
              
              // Icons for each category
              const categoryIcons = [Home, Users, Store, Building2]
              const Icon = categoryIcons[index]
              
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => setSelectedType(productType)}
                    className={`w-full rounded-lg p-3 md:p-4 border-2 transition-all duration-300 text-center flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'bg-[#1a7a1a] border-[#1a7a1a] shadow-md'
                        : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-[#1a7a1a]/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${isSelected ? 'text-white' : 'text-[#1a7a1a]'}`} />
                    <div className={`text-sm md:text-base font-bold ${isSelected ? 'text-white' : 'text-[#1a7a1a]'}`}>
                      {simpleLabel}
                    </div>
                    <div className={`text-xs md:text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                      {detailedInfo.capacity}
                    </div>
                  </button>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                    <div className="text-gray-300">{detailedInfo.description}</div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                      <div className="w-2 h-2 bg-gray-900 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>

        {/* Hot Products Section */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
            {t('products.hotProducts')}
          </h2>
          <div className="max-w-6xl mx-auto">
            {/* Product Cards */}
            <div className="relative mb-8">
              {/* Left Arrow Button - Only show if products can scroll */}
              {filteredProducts.length > 3 && showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hidden sm:flex items-center justify-center"
              aria-label="Previous products"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              )}

              {/* Right Arrow Button - Only show if products can scroll */}
              {filteredProducts.length > 3 && showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hidden sm:flex items-center justify-center"
              aria-label="Next products"
            >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
              )}

              <div 
                ref={scrollContainerRef}
                className={`pb-4 scrollbar-hide ${
                  filteredProducts.length <= 3 
                    ? 'flex justify-center' 
                    : 'overflow-x-auto'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className={`${
                  filteredProducts.length === 1 
                    ? 'flex justify-center' 
                    : filteredProducts.length === 2
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center'
                    : filteredProducts.length <= 3
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center'
                    : 'flex gap-8 min-w-max justify-center'
                }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`relative flex-shrink-0 ${filteredProducts.length <= 3 ? 'w-full' : 'w-80'} bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200`}
                >
                  {/* Featured Badge */}
                  {product.featured && product.featuredLabel && (
                    <div className="absolute top-4 right-4 z-10 bg-[#1a7a1a] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {t(`products.featuredLabels.${product.featuredLabel}`)}
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="w-full h-72 bg-gray-50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
                    <img
                      src={product.image}
                      alt={`Soocool ${product.code} Ice Machine - ${product.capacity || ''} ${product.power || ''}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="320"
                      height="288"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6 text-center">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.code}
                      </h3>
                      {/* Category Tag */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {getCategoryLabel(product.type)}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-sm text-gray-600">
                          {t('products.power')}: <span className="font-semibold text-gray-900">{product.power}</span>
                        </p>
                        {product.capacity && (
                          <p className="text-sm text-gray-600">
                            {t('products.capacity')}: <span className="font-semibold text-gray-900">{product.capacity}</span>
                          </p>
                        )}
                        {product.storage && (
                          <p className="text-sm text-gray-600">
                            {t('products.storage')}: <span className="font-semibold text-gray-900">{product.storage}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Buy Button */}
                    <a
                      href={product.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 justify-center bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      {t('products.buyButton')}
                    </a>
                  </div>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Products

