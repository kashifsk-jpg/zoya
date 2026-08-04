# Session Handoff — Zoya Fashion

Read this first if you're a new Claude session picking up this project. It
captures decisions and context that aren't obvious from the code alone.

## What this project is

A demonstration e-commerce site for "Zoya Fashion," a modest-fashion/abaya
brand. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 +
Zustand. Fully built out: home, collections, product pages, Atelier
configurator, bag/wishlist, journal, craft, about. See `README.md` for
architecture, commands, and the full feature list.

## Key decisions made this session (not obvious from code/git history alone)

- **Brand direction pivoted mid-build.** The original build brief (visible in
  early commit history / conversation) called for a dark, cinematic,
  Three.js-heavy homepage hero with a moving 3D garment. The client (Kashif)
  repeatedly pushed back on this: disliked the black/obsidian palette
  site-wide, and the moving 3D garment was visually crossing through the
  headline text on his machine (a real bug, confirmed and fixed by widening
  the header's responsive breakpoint — see below). **The 3D hero was fully
  removed** and replaced with a static rotating image carousel. Do not
  reintroduce a dark cinematic hero or 3D homepage animation without the
  client explicitly asking for it again.
- **Palette**: warm ivory / beige (`--color-warm-ivory` / `bg-warm-ivory`) is
  now the dominant site background, not obsidian black. Obsidian/black is
  still used for small UI accents (buttons, selected states, modal
  backdrops) but never as a full-section background. See `globals.css` for
  the token list — burgundy, gold and warm-ivory are the primary brand
  colors now, pulled from the client's logo (`public/images/brand/`).
- **Tagline**: the site now carries two taglines — "Modesty, shaped by
  movement." (primary) and "Modest Style, Timeless Elegance" (secondary,
  from the client's logo). Both are used together, not one replacing the
  other.
- **Homepage hero** (`src/components/home/hero-carousel.tsx`) is a 5-slide
  auto-rotating image carousel (pauses on hover/focus, respects
  `prefers-reduced-motion`), one slide per collection + one for the Atelier.
  Currently uses real photos supplied by the client (see below), not
  procedural placeholders.
- **Product/Atelier 3D viewers still exist and still use Three.js** — that
  wasn't part of the complaint. Only the *homepage hero* animation was
  removed. Don't confuse the two when making changes.
- **Header layout**: had a real, reproducible bug where the desktop nav
  overlapped the centered logo — not a caching artifact (confirmed via
  incognito). Fixed by (a) pushing the desktop-nav breakpoint from `md`
  (768px) to `lg` (1024px) for much more margin, and (b) making the nav
  track `minmax(0,1fr)` with `overflow-x-auto` as a structural safety net.
  If overlap ever resurfaces, check `site-header.tsx` first.
- **`read_console_messages` in this dev environment appears to buffer/cache
  stale error messages** — a "WHATSAPP_HREF defined multiple times" error
  kept showing up in console reads long after the file was fixed and
  production builds succeeded cleanly. Verified via direct DOM inspection
  and successful `npm run build` multiple times. If you see this exact
  error and the build succeeds, it's the stale buffer, not a real bug.
- **Dev server flakiness**: this environment's filesystem is slow (Next.js
  logs a "Slow filesystem detected" warning), and the dev server has died
  unexpectedly multiple times this session. If the client reports something
  that doesn't reproduce, prefer verifying against a **production build**
  (`npm run build && npm run start`) over the dev server — it's been far
  more reliable.

## Images / assets status

- `public/images/brand/zoya-logo.png` — the client's real logo (ornate gold
  script + floral illustration). Used to generate `src/app/icon.png` and
  `src/app/opengraph-image.png` via `tools/generate-brand-assets.mjs`
  (uses `sharp`, already a dependency). Re-run that script if the logo file
  changes.
- `public/images/campaigns/` — contains **~75 real product photos + 2
  videos** the client sent, with unhelpful WhatsApp-export filenames
  (`WhatsApp Image 2026-08-03 at ...jpeg`) and **no labeling of which photo
  is which product**. Only 5 of these are currently wired into the site
  (the hero carousel — see `evening-light.jpg`, `obsidian-edit.jpg`,
  `embroidered-atelier.jpg`, `quiet-structure.jpg`, `atelier.jpg`, which are
  copies of 5 Unsplash stock photos, not the client's own product photos).
  **The client has not yet said how he wants the other ~75 photos
  organized** — last thing discussed was asking him to either (a) tell you
  which photos map to which products, or (b) let you group them visually
  first and have him label the groups. Follow up on this.
- Two of the five current hero-carousel photos are honestly weak fits for a
  modest-fashion brand (one shows a South Asian formal outfit with hair
  uncovered, one is bold-pattern streetwear) — flagged to the client
  already, he knows, hasn't asked for a fix yet.
- All product data (`src/lib/products.ts`) still uses procedural
  `TextileStudy` placeholder imagery, not real photos — that migration
  hasn't started.

## WhatsApp / contact info

Real number wired in: `src/lib/constants.ts` (`WHATSAPP_DISPLAY` /
`WHATSAPP_HREF`). Social media links (Instagram, TikTok, Pinterest,
Facebook, Snapchat) in the footer are still placeholder URLs — client said
he'd provide real ones "with details of each," hasn't yet.

## Commands

See `README.md` — `npm run dev`, `npm run build && npm run start` (prefer
this for verification, see above), `npm run lint`, `npm run test`.
