import Header from '../components/Header'
import Hero from '../components/Hero'
import Products from '../components/Products'
import KeywordGuide from '../components/KeywordGuide'
import Factory from '../components/Factory'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Consultation from '../components/Consultation'
import Footer from '../components/Footer'
import type { HomePageContext } from '../site/content'

interface HomePageProps {
  page: HomePageContext
}

const HomePage = ({ page }: HomePageProps) => {
  return (
    <>
      <Header page={page} />
      <main className="overflow-x-hidden w-full">
        <Hero />
        <KeywordGuide locale={page.locale} />
        <Products locale={page.locale} />
        <Factory />
        <Services />
        <Testimonials />
        <FAQ />
        <Consultation />
      </main>
      <Footer page={page} />
    </>
  )
}

export default HomePage
