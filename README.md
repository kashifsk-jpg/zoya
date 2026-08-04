# Zoya Fashion

A clean, editorial digital flagship for a modern abaya and modest-fashion label —
built as a demonstration project. "Modesty, shaped by movement."

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Three.js /
React Three Fiber · Zustand.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint        # ESLint (flat config, Next core-web-vitals + react-hooks rules)
npx tsc --noEmit     # Strict TypeScript check
npm run test         # Vitest — unit tests for pricing, filtering, cart math, RNG determinism
npm run build        # Production build (also runs TypeScript)
npm run start        # Serve the production build
```

## Project structure

```
src/
  app/                 Routes (App Router): home, collections, products, atelier,
                        craft, journal, about, search, bag, wishlist, account,
                        privacy, terms, sitemap.ts, robots.ts, not-found.tsx
  components/
    brand, navigation   Header, footer, mobile menu, search overlay
    three/              R3F canvas scenes, procedural garment geometry/material
    product/            Gallery, 3D viewer, purchase panel, quick view, cards
    collections/        Filters, product grid, pagination
    atelier/             Step nav, step panel, summary, review, mobile sheet
    commerce/            Bag drawer, bag page content, wishlist content
    editorial/           TextileStudy (procedural imagery placeholder)
    ui/                  Button, IconButton, Dialog (native <dialog>-based)
    seo/                 JSON-LD structured data
  lib/
    types.ts             Product/Collection/Fabric/Article data model
    products.ts, collections.ts, fabrics.ts, journal.ts, atelier-options.ts
    product-filtering.ts Pure filter/sort functions (unit tested)
    three/               Garment geometry + shader material builders
    commerce/            CommerceAdapter interface + mock implementation
    seeded-random.ts     Deterministic PRNG for procedural imagery/geometry
  store/                 Zustand: bag, wishlist, atelier, UI, locale
  hooks/                 useHydrated, useReducedMotion, useWebglSupported,
                        useMediaQuery, useScrollProgress, useRecentlyViewed
public/models/README.md  3D asset contract for real GLB files (not yet supplied)
```

## 3D asset workflow

The homepage hero is a static, minimalistic split layout (no WebGL, no
animation) — this was a deliberate simplification after early cinematic-hero
iterations caused real legibility problems (moving 3D geometry crossing
through the headline text). The product detail page and the Atelier still
have an interactive 3D viewer, used only when the visitor explicitly opens
"3D View" — never overlapping page copy.

No licensed 3D garment models exist yet. Both viewers use a **procedural
stand-in**: parametric draped-panel geometry
(`src/lib/three/garment-geometry.ts`) with a custom GLSL shader
(`src/lib/three/garment-material.ts`) that fakes rim lighting, a traveling
light sweep and sparse glints in place of real embroidery/normal maps. This
keeps every 3D surface on-brand — no primitive boxes, no bare mannequins —
while a real pipeline is pending.

When licensed GLB/glTF assets are produced, drop them in `public/models/` per
the naming, mesh, material and scale contract documented in
[`public/models/README.md`](public/models/README.md), and swap the procedural
geometry for `useGLTF()` inside `garment-viewer-scene.tsx` — the surrounding
UI (presets, auto-rotate, fullscreen) does not need to change.

Product photography, campaign imagery and fabric macro photography are
likewise **procedurally generated placeholders** (`TextileStudy` — a
deterministic, seeded abstract SVG composition, not a raster asset) rather
than stock photography or hotlinked images. Replace `TextileStudy` usages
with `next/image` once real photography exists; the `ProductImage`/`seed`
data shape (`src/lib/types.ts`) is already stable so this is a drop-in swap.

## Commerce integration

Bag, wishlist and Atelier state persist to `localStorage` via Zustand
`persist` middleware — no backend required for browsing, configuring or
"purchasing" in this demo.

Checkout is a deliberate **integration boundary**, not a real payment flow:

- `src/lib/commerce/types.ts` — the `CommerceAdapter` interface.
- `src/lib/commerce/mock-adapter.ts` — the active implementation. Simulates
  latency and returns a demo checkout session; no payment is processed, no
  money moves.
- `src/lib/commerce/index.ts` — swap `mockCommerceAdapter` for a real
  implementation (Shopify Storefront API, Shopify Checkout, or Medusa) that
  satisfies the same interface. No presentation code needs to change.

## Image replacement guide

1. Source or commission real product photography, campaign imagery and fabric
   macro shots per `content` needs in `src/lib/products.ts` / `fabrics.ts`.
2. Add files under `public/images/...` with stable aspect ratios matching the
   `ProductImage.aspect` values already in the data (`portrait`, `detail`,
   `landscape`).
3. Replace `<TextileStudy seed=... alt=... aspect=... />` call sites with
   `<Image src=... alt=... />` from `next/image`, keeping the same `alt` text
   (already written to real accuracy/voice standards).
4. Record the license for every asset in a new `docs/ASSET_LICENSES.md` before
   committing — no Emirates or third-party branding/logos, ever.

## Deployment

Any Node-compatible host that supports Next.js (Vercel, or a Node server
running `npm run build && npm run start`) works out of the box — no
environment variables are required for this demo build.

## Accessibility notes

- Skip-to-content link, semantic landmarks (`header`/`nav`/`main`/`footer`),
  one `<h1>` per page.
- All dialogs/drawers (bag, mobile menu, search, quick view, size guide,
  filter drawer) use the native `<dialog>` element for built-in focus
  trapping, Escape-to-close and focus restoration — see
  `src/components/ui/dialog.tsx`.
- `prefers-reduced-motion` disables the product/Atelier 3D viewer's garment
  sway globally (`globals.css` + `useReducedMotion`).
- WebGL failure swaps the product/Atelier 3D viewer for a plain text notice —
  purchasing, browsing and the Atelier's summary/pricing all work without
  WebGL. The homepage never depends on WebGL at all.
- All icon-only controls carry `aria-label`; toggle controls carry
  `aria-pressed`/`aria-current`.

## Performance notes

- The homepage ships zero WebGL — the hero is plain HTML/CSS, so there's no
  3D bundle, canvas, or GPU cost on first load.
- The product/Atelier `<Canvas>` is lazy-loaded (`next/dynamic`, `ssr: false`)
  and only mounts when the visitor opens "3D View."
- Only one WebGL canvas is ever mounted at a time.
- Catalog pagination uses an explicit "Load more" control, not infinite
  scroll, so the footer stays reachable.

## Known limitations (by design, for this build's scope)

- No real 3D garment models, product photography, or embroidery textures —
  see "3D asset workflow" above.
- i18n is structurally ready (a `locale` store, an EN/AR dictionary, RTL
  `dir`/`lang` switching) but only the header/hero copy is translated; full
  page-content localization is a follow-up.
- Checkout is a demonstration adapter, not a real payment integration.
- No end-to-end (Playwright) test suite — this build ships focused Vitest
  unit tests for pricing/filtering/cart logic instead, keeping the test
  footprint proportional to the project (per the brief's own guidance to
  avoid an oversized test setup). Every interactive flow was manually
  verified in-browser during development.
