# Soocool Website

A modern, responsive website for Soocool ice machine brand built with React, Vite, and TypeScript.

## Features

- 🌍 Multi-language support with dedicated crawlable URLs for English, Indonesian, and Chinese
- 📱 Fully responsive design for mobile and desktop
- 🎨 Modern, beautiful UI with Tailwind CSS
- ⚡ Fast performance with Vite
- 🔍 Static SEO output with localized metadata, structured data, sitemap, and robots.txt
- ☁️ Ready for Cloudflare Pages deployment

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- i18next for internationalization
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Products.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── Consultation.tsx
│   ├── Footer.tsx
├── pages/            # Home and product landing pages
├── site/             # Locale routing and SEO helpers
├── i18n/            # Internationalization
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       ├── zh.json
│       └── id.json
├── render.tsx       # Server rendering entry for static generation
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Configuration

### WhatsApp Number

Update the WhatsApp number in `src/components/Consultation.tsx`:

```typescript
const whatsappNumber = '1234567890' // Replace with your actual number
```

### Social Media Links

Update social media links in `src/components/Footer.tsx` and `src/components/Hero.tsx`:

- TikTok Shop link
- Shopee link
- Facebook, Instagram, Twitter links

### Company Address

Update the company address in `src/components/Footer.tsx`.

## Deployment to Cloudflare Pages

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In Cloudflare Dashboard:
   - Go to Pages
   - Create a new project
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Root directory: `/`
   - Environment variables:
     - `SITE_URL=https://escool.id`

3. In your custom domain settings, connect `escool.id` to the Pages project so the generated canonical URLs, `robots.txt`, and `sitemap.xml` match the live domain.

4. The generated `_redirects`, `robots.txt`, and `sitemap.xml` files inside `dist/` will be picked up automatically by Cloudflare Pages.

Alternatively, you can use Wrangler CLI:

```bash
# Install Wrangler
npm install -D wrangler

# Deploy
npx wrangler pages deploy dist
```

## SEO

The website includes:
- Static HTML for every locale homepage and product landing page
- Canonical URLs for `https://escool.id`
- Localized alternate language links (`hreflang`)
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data for Organization, LocalBusiness, FAQ, Product, and Breadcrumbs
- XML sitemap and robots.txt generation
- Semantic HTML structure with product internal linking

## License

© 2026 Soocool. All rights reserved.
