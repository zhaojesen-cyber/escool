# SOOCOOL production website

Approved source: ../soocool/dist, confirmed by the user on 2026-10-10.

Preserve the approved light blue layout, ice animation in the first hero, responsive mobile ordering, three-model carousel, quotation-only products, complete guides, shop links and social links. Use the repository's React, Vite and TypeScript infrastructure with build-time HTML generation. Each locale and product must have a crawlable URL, canonical and alternate-language links. Indonesian uses the root URL; English and Chinese use /en/ and /zh/. Preserve /id/ and existing /products/es-12b/ URLs through redirects.

Separate validated public catalogue data, URL/SEO helpers, page templates, interactive runtime, and ice animation. The React shell renders the same HTML on server and client. Forms validate locally and open an explicit WhatsApp/email draft; there is no pretend submission or database. Never include the input price spreadsheet, channel prices, credentials, private notes, or local absolute paths in public assets.

Cloudflare deployment keeps the existing escool.id domain. Configure GitHub integration with build command npm run build, output dist, master production branch. GitHub Actions validates lint, types, route/content tests and the generated HTML. Do not switch production until the build passes. Preserve the baseline Git revision for rollback. Actual write and hosting access are still being established.
