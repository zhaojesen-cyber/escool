import { renderToString } from 'react-dom/server'
import App from './App'
import { initI18n } from './i18n/config'
import type { SitePageContext } from './site/content'

export async function renderPage(page: SitePageContext) {
  await initI18n(page.locale)
  return renderToString(<App page={page} />)
}
