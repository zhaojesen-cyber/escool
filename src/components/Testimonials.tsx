'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('Testimonials');

  // Mock data - in real app could be in json
  const testimonials = [
    { id: 1, name: 'John Doe', role: 'Cafe Owner', text: "The best ice maker we've ever owned. Silent and efficient." },
    { id: 2, name: 'Siti Rahma', role: 'Restaurant Manager', text: "Escool machines are workhorses. Highly recommended for busy kitchens." },
    { id: 3, name: 'Wang Li', role: 'Barista', text: "Perfect ice clarity and shape. Makes our drinks look amazing." },
  ];

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm relative"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{item.text}"</p>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

