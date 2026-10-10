import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { allPages, getPagePath } from "../src/site/routes";
import { getPageSeo, resolveSiteUrl } from "../src/site/seo";
const origin = resolveSiteUrl();
let links = 0;
for (const page of allPages) {
  const route = getPagePath(page);
  const html = await readFile(
    path.join("dist", route.slice(1), "index.html"),
    "utf8",
  );
  assert.ok(
    html.includes(`<link rel="canonical" href="${origin + route}">`),
    route,
  );
  assert.match(html, /<h1[\s>]/, route);
  assert.match(html, /id="site-context"/, route);
  for (const alt of getPageSeo(page, origin).alternates)
    assert.ok(
      html.includes(`hreflang="${alt.locale}" href="${alt.href}"`),
      route,
    );
  assert.doesNotMatch(
    html,
    /原型说明|待补资料|file:\/\/|\/Users\/|retail|wholesale|未含税、运费|Rp\s*[\d.,]+/,
  );
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1].replace(/&amp;/g, "&");
    if (value.startsWith("#") || /^(?:https?:|data:|mailto:|tel:)/.test(value))
      continue;
    const url = new URL(value, origin + route);
    const file = path.join(
      "dist",
      url.pathname.slice(1),
      url.pathname.endsWith("/") ? "index.html" : "",
    );
    await access(file).catch(() => {
      throw new Error(`Missing asset/link ${value} on ${route}`);
    });
    links++;
  }
}
assert.match(await readFile("dist/404.html", "utf8"), /noindex,follow/);
assert.match(
  await readFile("dist/_redirects", "utf8"),
  /\/id\/\* \/:splat 301/,
);
assert.equal(
  (await readFile("dist/sitemap.xml", "utf8")).match(/<loc>/g)?.length,
  allPages.length,
);
console.log(
  `Verified ${allPages.length} static pages and ${links} internal assets/links; 404 and sitemap OK`,
);
