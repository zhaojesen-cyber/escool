import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import type { SitePageContext } from './site/content'

interface AppProps {
  page: SitePageContext
}

function App({ page }: AppProps) {
  useEffect(() => {
    document.documentElement.lang = page.locale
  }, [page.locale])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {page.kind === 'home' ? <HomePage page={page} /> : <ProductPage page={page} />}
    </div>
  )
}

export default App
