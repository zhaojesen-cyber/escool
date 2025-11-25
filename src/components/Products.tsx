'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Products() {
  const t = useTranslations('Products');

  const products = [
    { id: 1, name: 'Escool Pro 100', capacity: '100kg/24h' },
    { id: 2, name: 'Escool Max 300', capacity: '300kg/24h' },
    { id: 3, name: 'Escool Ultra 500', capacity: '500kg/24h' },
  ];

  return (
    <section id="products" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Image */}
                <div className="text-gray-400 dark:text-gray-500 group-hover:scale-105 transition-transform duration-500">
                   <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                   </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.capacity}</p>
                <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

