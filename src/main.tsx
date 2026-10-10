import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { fromLegacyHash, getPageFromPath, getPagePath } from "./site/routes";
const legacy = fromLegacyHash(location.hash);
if (legacy) location.replace(getPagePath(legacy));
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
