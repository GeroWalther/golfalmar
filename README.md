# GOLF AL MAR

Premium golf-accessories ecommerce site for the GOLF AL MAR brand.

Three flagship products: **Golfers Pro Sunscreen — SPF 30**, **Golfers Pro Magic Grip**, **DOLO Golf Joint & Muscle Relief Cream**. Multi-language storefront, full Stripe checkout with shipping address collection, MongoDB order tracking, and a built-in journal/blog with rich-text editor and SEO-perfect Open Graph previews.

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts` middleware)
- **React 19** + TypeScript
- **Tailwind CSS v4** with shadcn-style primitives
- **MongoDB** + Mongoose
- **Stripe Checkout** (multi-line-item, EU + intl shipping)
- **Resend** for transactional email (order confirmation + shipped notification)
- **next-intl** for EN / DE / ES localisation
- **Tiptap** for rich-text blog editor
- **isomorphic-dompurify** for HTML sanitisation

## Local development

```bash
npm install
cp .env.example .env.local      # then fill in the values
npm run dev                     # runs on http://localhost:1515
```

### Required env vars

```
MONGODB_URI=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM=GOLF AL MAR <orders@golfalmar.com>
OWNER_EMAIL=you@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:1515
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
```

For Stripe webhooks during local development:

```bash
stripe listen --forward-to http://localhost:1515/api/webhooks/stripe
```

…and put the `whsec_…` it prints into `STRIPE_WEBHOOK_SECRET`.

## Routes

### Public

- `/[locale]` — long-scroll homepage (hero, marquee, brand story, problem section + embedded video, products, latest journal posts, CTA)
- `/[locale]/boutique` — product grid
- `/[locale]/boutique/[slug]` — product detail with description images, badge seal, features, body-area list
- `/[locale]/about` — multi-section brand story with values pillars, craft section, founder's note
- `/[locale]/blog` — journal index
- `/[locale]/blog/[slug]` — journal post (full Open Graph + Twitter Cards + Article JSON-LD + canonical)
- `/[locale]/cart` — full cart page
- `/[locale]/checkout/success`, `/checkout/cancel`

Locales: `en` (default), `de`, `es`. Headlines (`Play longer.\nProtect more.\nGrip stronger.`, `Part of the golfer's world.`, `Two essentials. Endless rounds.`) are intentionally English on every locale; body copy is translated.

### Admin (HTTP Basic Auth gated by `proxy.ts`)

- `/admin` — KPI dashboard, 30-day revenue sparkline, status breakdown, recent orders
- `/admin/orders` — sortable, filterable, paginated, CSV export
- `/admin/orders/[id]` — full detail with tracking-number form, status mutations, shipped-email trigger
- `/admin/customers` — aggregated by email, CSV export
- `/admin/blog` — list, create, edit, delete blog posts (Tiptap editor + cover image upload)

### API

- `POST /api/checkout` — create Stripe session from cart
- `POST /api/webhooks/stripe` — persist `Order` + send confirmation emails
- `PATCH /api/admin/orders/[id]/status` — change status, send shipped email on `paid → fulfilled`
- `PATCH /api/admin/orders/[id]/tracking` — set tracking number/URL
- `GET  /api/admin/orders/export` — orders CSV
- `GET  /api/admin/customers/export` — customers CSV
- `POST /api/admin/blog` (`PATCH`/`DELETE` for `/[id]`) — blog CRUD
- `POST /api/admin/blog/upload` — cover-image upload (writes to `public/uploads/blog/`)

## Production notes

- **Image uploads**: the blog cover-image route writes to `public/uploads/blog/` on disk. That works for self-hosted Node servers; on Vercel (serverless), swap it for `@vercel/blob`.
- **Sitemap** is dynamic and includes all published blog posts.
- **OpenGraph** images for blog posts default to the cover image (1200×630 recommended); the static `/opengraph-image.tsx` generates a brand fallback.

## License

Proprietary — © GOLF AL MAR.
