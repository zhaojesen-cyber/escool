'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShoppingBag, Video } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                <Video className="w-6 h-6" />
                {t('buy_tiktok')}
              </a>
              
              <a 
                href="https://shopee.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#EE4D2D] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-6 h-6" />
                {t('buy_shopee')}
              </a>
            </div>
          </motion.div>

          {/* Image Content - Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg lg:max-w-xl"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                 {/* Placeholder for Product Image */}
                 <div className="text-gray-300 dark:text-gray-600 flex flex-col items-center">
                    <svg className="w-32 h-32 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="mt-4 text-center font-medium text-xl">escool Ice Maker</p>
                 </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

