# SOOCOOL official website

Production implementation of the approved SOOCOOL website: light blue appliance-brand design, first-screen interactive ice cubes, home/commercial/modular carousel, validated model catalogue, model comparison, ice-demand calculator, complete guides, quotation enquiries, Shopee/TikTok Shop and four social channels.

## Run and verify

Use Node 22 (minimum 20.19) and npm:

```sh
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` runs lint, TypeScript, routing/content/SEO tests, the production build, and checks every generated page and internal asset/link. Builds create 81 crawlable locale/page/product URLs, a real 404 document, sitemap, robots, redirects and security headers. Indonesian uses `/`, English `/en/`, Chinese `/zh/`. Existing `/id/` and `/id/products/es-12b/` links redirect to their canonical destinations. Previous `#/zh/home` prototype links migrate on the client.

## Structure and maintenance

- `src/catalogue/products.json`: validated public models and specifications; prices are not published. Some original source photos are shared by the same series and the pages label them accordingly.
- `src/site/pages/`: approved page templates by page. Templates consume explicit locale-aware helpers; static generation and client rendering share them.
- `src/site/approved-site.js`: shared layout, product UI, localized content helpers, modal forms and scoped browser event lifecycle.
- `src/site/browser-state.ts`: validated cross-page category/scenario choices and session-scoped comparison selection.
- `src/site/ice-scene.js`: proportional particle ice cubes, pointer follow, reduced-motion support and observer cleanup.
- `src/site/guides.js`: complete Chinese, English and Indonesian practical guides.
- `src/site/routes.ts`, `seo.ts`: typed routes and metadata/structured data.
- `src/App.tsx`: React shell and effect cleanup for the approved HTML renderer. React owns the shell; the interactive module owns its contained DOM. This is a static build, not a concurrent server-rendering service.
- `scripts/generate-static.tsx`, `verify-dist.ts`: production output and complete link validation.
- `public/assets`, `public/documents`: product/factory images and three downloadable catalogues.

Shop/social contacts and the approved buyer-rating snapshots are maintained in `approved-site.js` (`STORE_LINKS`, `SOCIAL_LINKS`, `CONTACT`, `BUYER_RATINGS`). Buyer scores are manually verified platform snapshots, not a live API; do not invent quotes or increase ratings without new evidence. No private price sheet or channel-pricing data is stored in this repository.

After updating products, also update the three catalogues in `public/documents/` using the same validated public data. Run `npm run check` and inspect desktop/mobile pages before deploying. Public photos use same-series labels where a unique model photo was not supplied.

## Enquiries and privacy

Forms validate name, location, email/international phone, requirements and consent. They open an editable WhatsApp/email message for the visitor to confirm and send. No enquiries or orders are saved by this site, and there is no simulated submission success. Locale preference is local browser storage; selected comparison model IDs are kept in session storage for cross-page comparison. There is no database or secret required to render the website. Platform access credentials belong in the hosting platform, never this repository.

## Cloudflare deployment

The live site uses the existing Cloudflare `escool` Worker, with `escool.id` and the existing GitHub integration preserved. On 2026-10-10 its build command was updated and the approved redesign was deployed and verified. Git integration settings:

- Repository: `zhaojesen-cyber/escool`
- Production branch: `master`
- Install: `npm ci`
- Build: `npm run check`
- Output: `dist`
- Build environment: `NODE_VERSION=22`, `SITE_URL=https://escool.id`

Workers Builds uses deployment command `npx wrangler deploy`; `wrangler.jsonc` serves the generated static assets. Node 22 is selected by `.nvmrc`. `SITE_URL` defaults to `https://escool.id` when no build environment override is configured. Every push to `master` triggers a build and deployment; keep the build command as `npm run check` so failed verification prevents publishing. Hosting-side Git connection configuration is managed in Cloudflare, separately from this repository.

GitHub Actions `.github/workflows/ci.yml` verifies changes on master and pull requests and retains a build artifact. A failed check stops the Cloudflare build when its build command is `npm run check`.

The `SITE_URL` build environment controls canonical URLs and sitemap. `_headers` sets a restrictive content policy and frame protection; `_redirects` preserves old URLs. A root `404.html` prevents unknown URLs from returning homepage HTML.

Docker alternative:

```sh
docker build -t soocool-web .
docker run --rm -p 8080:80 soocool-web
```

HTTPS is terminated by Cloudflare or an upstream proxy. Container logs go to stdout/stderr. Docker configuration is provided; verify the container in an environment with Docker installed.

## Rollback

Baseline before the approved redesign: `b15052c` on master. Restore the previous deployment using Cloudflare's deployment rollback control, then revert the redesign Git commit if required. Do not force-push shared history. Keep the previous deployment until the new website passes live checks.
