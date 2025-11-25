import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {setRequestLocale} from 'next-intl/server';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <Hero />
      <Products />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
