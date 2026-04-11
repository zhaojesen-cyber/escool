import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initI18n } from './i18n/config'
import { getPageFromPath } from './site/content'

async function startApp() {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    return
  }

  const page = window.__SITE_CONTEXT__ ?? getPageFromPath(window.location.pathname)
  await initI18n(page.locale)

  const app = (
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  )

  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app)
    return
  }

  ReactDOM.createRoot(rootElement).render(app)
}

void startApp()
