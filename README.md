# Soocool Website

A modern, responsive website for Soocool ice machine brand built with React, Vite, and TypeScript.

## Features

- 🌍 Multi-language support (English, Chinese, Indonesian) with automatic language detection
- 📱 Fully responsive design for mobile and desktop
- 🎨 Modern, beautiful UI with Tailwind CSS
- ⚡ Fast performance with Vite
- 🔍 SEO optimized with multi-language meta tags
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
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
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
│   ├── Consultation.tsx
│   ├── Footer.tsx
│   └── SEO.tsx
├── i18n/            # Internationalization
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       ├── zh.json
│       └── id.json
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
     - Build command: `pnpm build`
     - Build output directory: `dist`
     - Root directory: `/`

3. The `_headers` and `_redirects` files will be automatically used by Cloudflare Pages.

Alternatively, you can use Wrangler CLI:

```bash
# Install Wrangler
pnpm add -D wrangler

# Deploy
pnpm wrangler pages deploy dist
```

## SEO

The website includes:
- Multi-language meta tags
- Open Graph tags
- Twitter Card tags
- Alternate language links (hreflang)
- Semantic HTML structure

## License

© 2024 Soocool. All rights reserved.
