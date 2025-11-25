'use client';

import { useTranslations } from 'next-intl';
import { Instagram, Facebook, Video, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">escool</Link>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                {t('location')}: <br />
                Jalan Industri Raya No. 88,<br />
                Jakarta Utara, Indonesia
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">{t('follow_us')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Video className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          {t('rights')}
        </div>
      </div>
    </footer>
  );
}

