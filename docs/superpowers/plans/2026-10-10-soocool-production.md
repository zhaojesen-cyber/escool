# SOOCOOL Production Implementation Plan

> **For agentic workers:** Implement inline with executing-plans; use requesting-code-review before integration.

**Goal:** Ship the approved SOOCOOL site to escool.id and commit it to the specified GitHub repository.

**Architecture:** React shell plus shared HTML page rendering and build-time generation. Typed routes and SEO, separate data and browser lifecycle modules. Static Cloudflare hosting with GitHub automation.

**Tech Stack:** Existing React 18, Vite 7, TypeScript, Node 22, Cloudflare.

**Spec:** docs/superpowers/specs/2026-10-10-soocool-production-design.md

## Global Constraints

- Preserve all approved content, photos, links and responsive layout.
- Consultation prices only; no private spreadsheets or credentials.
- Independent localized URLs; preserve old URL compatibility.
- Obtain actual permissions through platform login, never assume a read-only connection can write.

### Task 1: Routing and public data

Create src/site/routes.ts, src/catalogue/products.json, tests/routes.test.ts.
- [x] Test first: /products/es-12b/, /zh/about/, /id/products/es-12b/ must resolve correctly; invalid product returns 404.
- [x] Run npm test and observe missing implementation failure.
- [x] Implement typed route parsing, locale switching and page enumeration from validated catalogue.
- [x] Run the route tests.

### Task 2: Approved page rendering and interaction

Create src/site/approved-site.js, src/site/pages/*.js, src/site/ice-scene.js; replace src/App.tsx, src/main.tsx, src/render.tsx and src/index.css. Add public/assets and public/documents.
- [x] Render all approved pages from shared templates on build and client.
- [x] Mount event handlers only in effects and dispose animations/listeners on cleanup.
- [x] Browser-verify desktop/mobile hero, filters, comparison, language URLs, guides and quotation validation.

### Task 3: Production generation and deployment

Replace scripts/generate-static.tsx and src/site/seo.ts; add tests/production.test.ts, .github/workflows/ci.yml, Dockerfile, nginx.conf, .env.example; update README.md.
- [x] Test first: every page has locale, canonical, hreflang, visible content; assets resolve; no prices/placeholders leak; 404 remains 404.
- [x] Generate all pages, sitemap, robots, security/cache headers and compatibility redirects.
- [x] Run npm test, npm run lint, npm run typecheck and npm run build.
- [x] Review source and create a local commit of the verified implementation.
- [ ] Push the reviewed commits after verifying repository write access.
- [ ] Connect Cloudflare to the repository, deploy and verify the live domain and certificate.

## Verification and access status — 2026-10-10

- Local checks pass: 13 tests, lint, TypeScript, 81 generated pages and 2,760 internal links/assets.
- Desktop/mobile views in all three languages, quotation validation, cross-page scenario choices and model comparison were browser-verified.
- Cloudflare local runtime verifies response headers, legacy redirects and a real 404; Docker is not installed locally and its image has not been run.
- Code review identified lost cross-page selections; query parameters and validated session storage now preserve them, and focused re-review passed.
- GitHub push and production deployment remain pending actual write access and login to the user-specified hosting account. These have not been completed.
