import type { SitePageContext } from "./site/routes";
declare global {
  interface Window {
    __SITE_CONTEXT__?: SitePageContext;
  }
}
export {};
