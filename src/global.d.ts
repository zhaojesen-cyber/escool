import type { SitePageContext } from './site/content'

declare global {
  interface Window {
    __SITE_CONTEXT__?: SitePageContext
  }
}

export {}
