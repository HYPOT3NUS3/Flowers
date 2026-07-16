# MUZA Lake Como

Premium mobile-first ecommerce site for an independent floral studio on Lake Como. The app is multilingual in Russian, English and Italian, with catalogue filtering, product pages, persistent cart, checkout validation, delivery-zone calculation, events, service enquiries, Instagram fallback, CMS structure and Stripe-ready endpoints.

## Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000/ru`. Locale routes are `/ru`, `/en` and `/it`.

In the Codex desktop runtime used for this build, `npm` was not available on PATH, so dependencies were installed and verified with the bundled `pnpm` binary. The project scripts remain standard Next.js scripts and can be run with npm in a normal Node environment.

## Build

```bash
npm run lint
npm run build
```

## Assets

Place official brand files in:

- `public/assets/logo/`
- `public/assets/products/`
- `public/assets/editorial/`
- `public/assets/decorative/`

Reference and moodboard files belong in `public/assets/references/` and are not used by the live pages. Do not publish Dior-branded moodboards as production artwork.

## Demo Products

Products live in `content/products/products.ts`. Each product has localized fields, exact price, images, categories, composition, care instructions, lead time and SEO copy. Budget bands are calculated in `content/products/types.ts`.

## Localization

Interface messages live in `content/messages/ru.json`, `content/messages/en.json` and `content/messages/it.json`. Product and event content uses separate localized fields in the data layer. The language switcher keeps the equivalent path where possible.

## Sanity

Sanity setup is prepared in `lib/cms/sanity.ts`. Add credentials from `.env.example`, then replace local data fetches with Sanity queries. Schema notes are in `content/cms-schemas.md`. The site works without Sanity credentials.

## Stripe

The checkout endpoint is `app/api/checkout/route.ts`. Add:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Without keys, checkout returns safe demo mode and does not pretend a payment was processed.

Custom payment-link scaffolding is in `app/api/custom-payment-link/route.ts`. Protect it with `STRIPE_PAYMENT_LINK_ADMIN_TOKEN`.

## Instagram

The feed layer is `lib/instagram/feed.ts`. Add:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_USER_ID`

When unavailable or failing, the app uses local fallback tiles from `content/instagram.ts`.

## Delivery Zones

Editable demo zones are in `content/delivery/zones.ts`, and calculation logic is in `lib/delivery/calculate.ts`. Replace demo fees, towns and CAP coverage with verified commercial data before launch.

## Revolut

Revolut instructions are placeholders in `content/site.ts`. Do not add real banking details to source control.

## Legal Review

`/privacy`, `/cookies` and `/terms` are placeholders and require professional legal review for Italy and EU use. Optional analytics must not load before cookie consent.

## Deploy to Vercel

1. Push the repository.
2. Create a Vercel project.
3. Add the environment variables from `.env.example`.
4. Deploy.
5. Verify all locale routes, checkout demo/Stripe mode, Instagram fallback/API mode and delivery zones.
