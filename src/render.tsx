import { renderToString } from "react-dom/server";
import App from "./App";
import type { SitePageContext } from "./site/routes";
export function renderPage(page: SitePageContext) {
  return renderToString(<App page={page} />);
}
