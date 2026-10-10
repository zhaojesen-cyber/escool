import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { getSavedLocale } from "./site/browser-state";
import "./index.css";
import { fromLegacyHash, getPageFromPath, getPagePath } from "./site/routes";
const savedLocale = (() => {
  try {
    return getSavedLocale(localStorage);
  } catch {
    return null;
  }
})();
const legacy = fromLegacyHash(location.hash);
if (legacy) location.replace(getPagePath(legacy));
else if (location.pathname === "/" && savedLocale && savedLocale !== "id")
  location.replace(
    getPagePath({ locale: savedLocale, page: "home", id: "" }) +
      location.search +
      location.hash,
  );
else {
  const root = document.getElementById("root");
  if (!root) throw new Error("Website root element is missing");
  const context = document.getElementById("site-context")?.textContent;
  const page = context
    ? JSON.parse(context)
    : getPageFromPath(location.pathname);
  const app = (
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
