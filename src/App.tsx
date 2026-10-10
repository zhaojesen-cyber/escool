import { useEffect, useMemo } from "react";
import { renderMarkup, mountSite } from "./site/approved-site.js";
import type { SitePageContext } from "./site/routes";
export default function App({ page }: { page: SitePageContext }) {
  const html = useMemo(() => renderMarkup(page), [page]);
  useEffect(() => mountSite(page), [page]);
  return (
    <div className="soocool-site" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
