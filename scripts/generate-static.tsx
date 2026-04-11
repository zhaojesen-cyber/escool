import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderPage } from '../src/render'
import {
  defaultLocale,
  locales,
  products,
  type SitePageContext,
  getPagePath,
  getProductPath,
  getProductSlug,
} from '../src/site/content'
import {
  getAlternateLinks,
  getPageSeo,
  getStructuredData,
  resolveSiteUrl,
} from '../src/site/seo'

interface ManifestEntry {
  file: string
  css?: string[]
  isEntry?: boolean
}

type Manifest = Record<string, ManifestEntry>

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, '../dist')
const manifestPath = path.join(distDir, '.vite/manifest.json')
const gtmId = 'GTM-T7KHK46T'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function toOgLocale(locale: string) {
  if (locale === 'zh') return 'zh_CN'
  if (locale === 'id') return 'id_ID'
  return 'en_US'
}

function toOutputFile(page: SitePageContext) {
  const pagePath = getPagePath(page)
  if (pagePath === '/') {
    return path.join(distDir, 'index.html')
  }

  return path.join(distDir, pagePath.slice(1), 'index.html')
}

function renderDocument(page: SitePageContext, appHtml: string, manifestEntry: ManifestEntry, siteUrl: string) {
  const seo = getPageSeo(page, siteUrl)
  const alternates = getAlternateLinks(page, siteUrl)
  const xDefaultHref =
    page.kind === 'home'
      ? `${siteUrl}/`
      : `${siteUrl}${getProductPath(defaultLocale, page.productSlug)}`
  const structuredData = getStructuredData(page, siteUrl)
  const cssLinks = (manifestEntry.css ?? [])
    .map(file => `<link rel="stylesheet" href="/${file}" />`)
    .join('\n    ')
  const ogAlternateLocales = locales
    .filter(locale => locale !== page.locale)
    .map(locale => `<meta property="og:locale:alternate" content="${toOgLocale(locale)}" />`)
    .join('\n    ')
  const alternateLinks = alternates
    .map(link => `<link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`)
    .join('\n    ')
  const structuredScripts = structuredData
    .map(schema => `<script type="application/ld+json">${safeJson(schema)}</script>`)
    .join('\n    ')

  return `<!doctype html>
<html lang="${page.locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>
    <!-- End Google Tag Manager -->
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <meta name="author" content="Soocool" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#1a7a1a" />
    <link rel="canonical" href="${seo.url}" />
    ${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <link rel="dns-prefetch" href="https://www.google.com" />
    <link rel="dns-prefetch" href="https://shopee.co.id" />
    <link rel="dns-prefetch" href="https://vt.tiktok.com" />
    <link rel="preconnect" href="https://www.google.com" crossorigin />
    <link rel="preconnect" href="https://shopee.co.id" crossorigin />
    <meta property="og:type" content="${seo.type}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${seo.url}" />
    <meta property="og:image" content="${seo.image}" />
    <meta property="og:site_name" content="Soocool" />
    <meta property="og:locale" content="${toOgLocale(page.locale)}" />
    ${ogAlternateLocales}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${seo.image}" />
    <title>${escapeHtml(seo.title)}</title>
    ${cssLinks}
    ${structuredScripts}
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="root">${appHtml}</div>
    <script>window.__SITE_CONTEXT__ = ${safeJson(page)};</script>
    <script type="module" src="/${manifestEntry.file}"></script>
  </body>
</html>
`
}

async function writePage(page: SitePageContext, manifestEntry: ManifestEntry, siteUrl: string) {
  const outputFile = toOutputFile(page)
  const html = await renderPage(page)
  const document = renderDocument(page, html, manifestEntry, siteUrl)

  await mkdir(path.dirname(outputFile), { recursive: true })
  await writeFile(outputFile, document, 'utf8')
}

function buildSitemap(siteUrl: string, pages: SitePageContext[]) {
  const urls = pages
    .map(page => {
      const pathName = getPagePath(page)
      const priority = page.kind === 'home' ? '1.0' : '0.8'
      return `  <url>
    <loc>${siteUrl}${pathName}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

async function writeSupportFiles(siteUrl: string, pages: SitePageContext[]) {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

  const redirects = `/id /id/ 301
/zh /zh/ 301
`

  await writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8')
  await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(siteUrl, pages), 'utf8')
  await writeFile(path.join(distDir, '_redirects'), redirects, 'utf8')
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Manifest
  const manifestEntry =
    manifest['src/main.tsx'] ?? Object.values(manifest).find(entry => entry.isEntry)

  if (!manifestEntry) {
    throw new Error('Unable to locate the main Vite entry in the manifest.')
  }

  const siteUrl = resolveSiteUrl()
  const pages: SitePageContext[] = [
    ...locales.map(locale => ({ kind: 'home', locale }) as const),
    ...products.flatMap(product =>
      locales.map(locale => ({
        kind: 'product',
        locale,
        productSlug: getProductSlug(product.code),
      }) as const),
    ),
  ]

  for (const page of pages) {
    await writePage(page, manifestEntry, siteUrl)
  }

  await writeSupportFiles(siteUrl, pages)
}

void main()
