'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Headset, Wrench } from 'lucide-react';

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    { id: 'warranty', icon: ShieldCheck },
    { id: 'support', icon: Headset },
    { id: 'installation', icon: Wrench },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t(`items.${service.id}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

