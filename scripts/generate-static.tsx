import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { renderPage } from "../src/render";
import {
  allPages,
  getPagePath,
  type SitePageContext,
} from "../src/site/routes";
import { getPageSeo, getStructuredData, resolveSiteUrl } from "../src/site/seo";
const dist = path.resolve("dist");
const safeJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const siteUrl = resolveSiteUrl();
interface Entry {
  file: string;
  css?: string[];
  isEntry?: boolean;
}
async function main() {
  const manifest = JSON.parse(
    await readFile(path.join(dist, ".vite/manifest.json"), "utf8"),
  ) as Record<string, Entry>;
  const entry =
    manifest["src/main.tsx"] ??
    manifest["index.html"] ??
    Object.values(manifest).find((item) => item.isEntry);
  if (!entry) throw new Error("Missing Vite main entry");
  const pages = [
    ...allPages,
    { locale: "id", page: "404", id: "" } as SitePageContext,
  ];
  for (const page of pages) {
    const seo = getPageSeo(page, siteUrl);
    const html = `<!doctype html><html lang="${page.locale === "zh" ? "zh-CN" : page.locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#1766cf"><title>${escape(seo.title)}</title><meta name="description" content="${escape(seo.description)}"><meta name="robots" content="${page.page === "404" ? "noindex,follow" : "index,follow"}"><link rel="canonical" href="${seo.url}">${seo.alternates.map((item) => `<link rel="alternate" hreflang="${item.locale}" href="${item.href}">`).join("")}<link rel="alternate" hreflang="x-default" href="${seo.alternates[0].href}"><link rel="icon" href="/logo.png"><meta property="og:type" content="${page.page === "product" ? "product" : "website"}"><meta property="og:title" content="${escape(seo.title)}"><meta property="og:description" content="${escape(seo.description)}"><meta property="og:url" content="${seo.url}"><meta property="og:image" content="${seo.image}"><meta name="twitter:card" content="summary_large_image">${(entry.css || []).map((file) => `<link rel="stylesheet" href="/${file}">`).join("")}${getStructuredData(
      page,
      siteUrl,
    )
      .map(
        (schema) =>
          `<script type="application/ld+json">${safeJson(schema)}</script>`,
      )
      .join(
        "",
      )}</head><body><div id="root">${renderPage(page)}</div><script type="application/json" id="site-context">${safeJson(page)}</script><script type="module" src="/${entry.file}"></script></body></html>`;
    const output =
      page.page === "404"
        ? path.join(dist, "404.html")
        : path.join(dist, getPagePath(page).slice(1), "index.html");
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${allPages
    .map(
      (page) =>
        `<url><loc>${siteUrl}${getPagePath(page)}</loc>${getPageSeo(
          page,
          siteUrl,
        )
          .alternates.map(
            (item) =>
              `<xhtml:link rel="alternate" hreflang="${item.locale}" href="${item.href}"/>`,
          )
          .join("")}</url>`,
    )
    .join("")}</urlset>`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap);
  await writeFile(
    path.join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  await writeFile(
    path.join(dist, "_redirects"),
    "/id / 301\n/id/ / 301\n/en/home /en/ 301\n/zh/home /zh/ 301\n/home / 301\n/id/* /:splat 301\n",
  );
  await rm(path.join(dist, ".vite"), { recursive: true, force: true });
  console.log(
    `Generated ${allPages.length} localized pages, 404, sitemap and compatibility redirects for ${siteUrl}`,
  );
}
main().catch((error) => {
  console.error("Static generation failed:", error);
  process.exitCode = 1;
});
