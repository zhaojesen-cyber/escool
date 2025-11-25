'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-20 bg-blue-600 dark:bg-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">{t('desc')}</p>
        
        <a 
          href="https://wa.me/628123456789" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
          {t('whatsapp')}
        </a>
      </div>
    </section>
  );
}

