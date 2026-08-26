# MIGRATION PLAN — Phase A audit

**Status:** Audit complete. **Nothing has been changed.** This document is the only file written.
**Date:** 2026-08-26 · **Target HEAD:** `41c2061` (0 ahead / 0 behind `origin/main`)
**Source:** `C:\Users\Oussama\Desktop\new-modern-landing-page\` — read-only, zero writes made.

**Baseline established before planning:** `npm run build` on the target passes clean today —
Next.js 16.2.2 (Turbopack), 16 routes, 0 errors, 0 type errors, 0 warnings. Every measurement in
this plan is taken from that build or from the files themselves, not assumed.

---

## 0. Executive summary — read this first

The migration is **smaller and safer than the brief assumes in three ways, and larger in four
others.** Both directions matter, so both are set out before the detail.

### Smaller than assumed

1. **The source is already content-integrated.** Every string in `src/data/*.ts` already matches
   `content-ready/`. FAQ = 12 items. Devices = 12 including Xbox and IPTV Smarters Pro. Comparison is
   already repurposed to *ours vs traditional TV*. Footer already has the Guides column, the compact
   legal row, and `mcafee` already removed. Reviews are already trust panels with no `Review` schema.
   **A banned-string scan of the whole source `src/` returns zero hits** for `Televo`, `Kryntix`,
   `34,000`, `35,000`, `195,000`, `£5.85`, `12.99`, `99.9`, `anti-freeze`, `load balancing`, `24.99`,
   `34.99`, `uptime`, and zero hits for any broadcaster or rights-holder name.
2. **The metrics SSR bug is already fixed in the source.** `MetricsStrip.tsx` renders
   `metric.display` unless `revealed`, and `useScrollReveal` initialises to `false`, so the server
   render and every no-JS client print `37,000+`. The port cannot reintroduce the bug by accident —
   only by someone deleting that guard.
3. **No filename hazards in the trees being copied.** Every basename under source `public/` and
   `src/` matches `[A-Za-z0-9._-]` only — no parentheses, spaces or non-ASCII. All 24 CSS-module
   imports were checked character-for-character against the real filenames: **0 case mismatches.**
   The parenthesised and space-bearing filenames all live in `assets-source/` and
   `image_hero_section_robot/`, which are working folders and are **not** being copied.

### Larger than assumed

4. **The source's `layout.tsx` is not portable as written.** It carries the homepage's `Product`,
   `FAQPage` and `MerchantReturnPolicy` JSON-LD **in the root layout**, so those would render on
   `/terms`, `/privacy`, `/blog` and every other route — schema describing something absent from the
   page, which is the exact Phase E check. It also sets `title: { absolute: … }` at the root, which
   destroys the `%s | IPTV Subscription UK 4K` template every other page depends on, and
   `alternates: { canonical: SITE }` at the root, which makes the homepage the fallback canonical for
   anything that forgets to set its own.
5. **The nav lives inside the hero.** `Hero.tsx` renders `<Navbar />` itself, so it is homepage-only.
   Phase C's "one nav, shared from the layout, identical on every page" requires lifting it out — a
   real refactor against `Hero.module.css`, not a move.
6. **`Statement` → `Showcase` → `Marquee` is live on the homepage.** It is third in the render order.
   This is the copyrighted-artwork marquee. See §6, decision **D-1**. *(This corrects my own earlier
   claim that Showcase was unrendered — it is rendered.)*
7. **`og-image.png` does not exist.** The source layout points OG, Twitter and `Product.image` at
   `https://iptv-subscription-uk-4k.com/og-image.png`. It is in neither repo. See **D-5**.

---

## 1. Dependency delta and how it is reconciled

| | Source | Target | Decision |
|---|---|---|---|
| `next` | `^15.5.23` | **`16.2.2`** | **Keep 16.2.2.** Port components onto it. |
| `react` / `react-dom` | `19.1.1` | **`19.2.4`** | Keep 19.2.4 — patch-superset, no source API is affected. |
| styling | CSS Modules, no Tailwind | Tailwind v4 + `@tailwindcss/postcss` | **Both.** See §2. |
| `framer-motion` | — | `^12.38.0` | **Keep** — required by blog, contact, and `SectionLink`. |
| `lucide-react` | — | `^1.7.0` | **Keep** — same reason. |
| `clsx` / `tailwind-merge` / `cva` | — | present | **Keep** — `lib/utils.ts` `cn()` is used by `Navbar`, `FAQAccordion`, `PricingSection`. |
| `@types/node` | `^22` | `^20` | Keep `^20`; nothing in the source needs Node 22 types. |
| `tsconfig` `target` | `ES2022` | `ES2017` | **Keep `ES2017`.** Source uses no ES2018+ syntax. |
| `tsconfig` `jsx` | `preserve` | `react-jsx` | Keep target's. Both compile the same source. |
| `paths` | `@/*` → `./src/*` | identical | No change — source imports resolve unmodified. |
| `next.config.ts` | 6 lines | redirects + security headers + `optimizePackageImports` | **Keep target's entirely.** Source config adds nothing target lacks. |

**Recommendation: keep the target on Next 16.** Agreed with your stated preference, and the evidence
supports it rather than merely deferring to it — downgrading would mean rewriting `next.config.ts`,
losing Turbopack, and re-testing four routes that build clean today, in exchange for nothing.

### Next 15 → 16 incompatibilities found in the source — the complete list

I checked every Next-API surface the source touches. It touches exactly two: `next/font/google` and
`next/image`.

| # | Surface | Finding | Severity |
|---|---|---|---|
| 1 | `next/font/google` — `Inter` with `weight: ["400","500","600","700"]` | **Not an incompatibility.** The target already imports `Outfit` with a `weight` array on Next 16 and builds clean, so weight arrays on variable fonts are accepted by this exact version. | none |
| 2 | `next/font/google` — CSS variable name | Source uses `--font-inter`; target uses `--font-sans` / `--font-display`. Source `globals.css` reads `var(--font-inter)`. **Collision of convention, not of API.** | low — rename one |
| 3 | `next/image` — `placeholder="blur"` + static import (`KeyFeatures`) | Supported in 16. Static import supplies `blurDataURL` automatically. | none |
| 4 | `next/image` — `quality` prop | **Not used anywhere.** The Next 16 `images.qualities` allow-list therefore cannot bite. | none |
| 5 | Raw `<img>` in 6 components | Legal, and `Marquee` documents why (it repeats 5–7 URLs and a wrapper per tile would cost more than it saves). One `eslint-disable` comment for `@next/next/no-img-element` is already present in `Hero.tsx`. Needs the same treatment in the other five or an ESLint rule relaxation. | low |
| 6 | `src/app/icon.png` file convention | Collides with the target's `metadata.icons` block pointing at `/favicon_io/*`. Shipping both emits duplicate `<link rel="icon">`. | medium — see **D-6** |
| 7 | CSS Modules under Turbopack | Supported. No `:global` / `composes` / CSS-nesting-dependent constructs found that Turbopack handles differently. | none |
| 8 | `"use client"` on 24 of 26 components | Not an incompatibility, but it is the whole page. See risk **R-4**. | see §5 |

**No blocking Next 16 incompatibility exists.** Items 2, 5 and 6 are mechanical.

---

## 2. Styling strategy — how two `globals.css` files become one

### The actual conflict

The two files are not just different — they are **inverted**.

| | Source | Target |
|---|---|---|
| theme | **dark** — `--stage: #050507`, white ink | **light** — `--color-background: #fafbff`, near-black ink |
| `color-scheme` | `dark` | unset (light) |
| `themeColor` | `#050507` | `#0a0a0a` |
| mechanism | plain CSS custom properties on `:root` | Tailwind v4 `@theme` block (generates utility classes) |
| lines | 113 | 282 |

The target's every non-homepage page is written in Tailwind utilities tuned for a light background
(`bg-background text-foreground`, `bg-card`, `border-border`, violet/cyan accents). Adopting the
source palette flips the whole site to a near-black stage. **That is the intent of Phase C** — but it
means the propagation step is a re-tune of every page's colour classes, not a token swap. Sized in
§5 as risk **R-1**.

### The merge, precisely

`src/app/globals.css` becomes one file in five ordered blocks:

```
1  @import "tailwindcss";                     <- must stay first
2  @theme { … }                               <- target's Tailwind tokens, colour VALUES swapped
                                                 to the source palette; --font-sans / --font-display
                                                 keys KEPT (layout.tsx and body class depend on them)
3  :root { --stage … --ease-inout … }         <- source's design tokens, VERBATIM, minus the
                                                 duplicated font declaration
4  base element rules                         <- source's html/body/a/button/img/::selection/
                                                 :focus-visible/.visually-hidden, merged over the
                                                 target's html/body/scrollbar rules
5  utility classes                            <- target's .glass .gradient-text .premium-card
                                                 .mesh-gradient .countdown-* .promo-banner-* etc.,
                                                 kept but retinted; keyframes kept as-is
```

**Rules that make this safe:**

- **Neither file is replaced.** Block 2 keeps the target's token *keys* and changes their *values*;
  block 3 adds the source's tokens alongside. No key is deleted, so no existing Tailwind class breaks
  at compile time.
- **`@import "tailwindcss"` stays line 1.** Tailwind v4 requires it before `@theme`.
- **Font variables are reconciled once, in `layout.tsx`.** Source CSS reads `var(--font-inter)`;
  target's `next/font` exposes `--font-sans`. Fix: add `--font-inter` as a second `variable` on the
  existing `Inter` loader (or alias it in block 3 as `--font-inter: var(--font-sans)`), so **no source
  `.module.css` file needs editing.** Preferred, because untouched source CSS is auditable source CSS.
- **CSS Modules and Tailwind genuinely coexist.** They are separate cascade inputs; Modules are
  locally scoped and lose to nothing here. The one hazard is source *base* rules leaking site-wide —
  `a { text-decoration: none }`, `button { background: none; border: 0 }`, `img { display: block }`,
  `body { overflow-x: hidden }`. Those are global by design in the source and **will** reach the blog
  and legal pages. Two are wanted; `body { overflow-x: hidden }` masks the exact 360 px horizontal
  scroll Phase C asks me to verify, so it is applied **last**, after the 360 px check, and recorded.

### How the palette reaches the existing pages

Via block 2. Every existing page already styles itself with `bg-background`, `text-foreground`,
`bg-card`, `text-muted`, `border-border`, `text-primary`. Changing those token values in `@theme`
repaints all nine routes in one edit. The remaining work is the residue: **hardcoded light-mode
colours that bypass the tokens.** Those are enumerated and fixed page by page in Phase C, and the
count is the first thing I will report at the Phase C gate.

---

## 3. Asset inventory

**36 files, 0.90 MB, under source `public/`** (excluding the nested `.git`), plus 1 bundled import,
plus 1 app-icon file. Every one lands in this repo; no cross-project path and no external URL
survives.

### `public/` → `public/` — path preserved exactly

| Source path | Bytes | Referenced from | Ref style |
|---|---|---|---|
| `grain.webp` | 20,988 | 11 `url()` calls across 7 `.module.css` | static URL |
| `side-panel.webp` | 142,606 | `SidePanel.module.css` `url()` | static URL |
| `logo.webp` | 47,930 | `BrandMark.tsx` `<img>` | static URL |
| `logo-512.png` | 255,800 | `Organization.logo` in JSON-LD | static URL |
| `hero/devices-row.webp` | 24,918 | `HERO_CONTENT.devices.src` | static URL |
| `devices/*.webp` ×12 | 77,530 | `` `/devices/${device.id}.webp` `` | **template literal** |
| `trust/*.webp` ×6 | 52,948 | `` `/trust/${mark.id}.webp` `` | **template literal** |
| `reviews/review-{1,2,3}.webp` | 160,600 | `REVIEWS[].image` | static URL |
| `marquee/{poster,tile}-0N.webp` ×10 | 159,108 | `MOVIES[]` / `CHANNELS[]` | static URL — **see D-1** |

**Template-literal references are the case-sensitivity trap.** `/devices/${id}.webp` and
`/trust/${id}.webp` are assembled at runtime from the `id` field, so a case error is invisible to
TypeScript, invisible to `next build`, and invisible on Windows. It appears only as a 404 on the
Linux server. I verified all 18 by hand today: **every `id` matches its filename exactly.** The
mapping is recorded here so it can be re-verified mechanically at Phase E rather than by eye:

```
devices  fire-tv-stick samsung-smart-tv lg-smart-tv android-tv ios magbox
         nvidia-shield android iptv-smarters xbox-live webplayer windows
trust    visa mastercard amex diners paypal        (mcafee.webp exists, is NOT referenced)
```

`trust/mcafee.webp` (13,850 B) is on disk but absent from `FOOTER.payment.marks`. **It will not be
copied** — your locked decision was to remove it, and the source already has.

### `src/assets/` → `src/assets/` — bundled import, not a URL

| Source | Bytes | Notes |
|---|---|---|
| `src/assets/key-features.webp` | 142,814 (1200×716) | `import artwork from "@/assets/key-features.webp"` in `KeyFeatures.tsx`. **Not a public URL.** Next fingerprints it, emits it under `/_next/static/media/`, and derives the `blurDataURL` for `placeholder="blur"` from it at build time. The directory `src/assets/` **does not exist in this repo yet** and must be created. Putting this file in `public/` instead would silently break the blur placeholder and the automatic width/height. |

### `src/app/icon.png` — decision required

512×512, 186,705 B. Next's file convention would serve it as the favicon. The target instead declares
a full `metadata.icons` set pointing at `/favicon_io/*` (7 files, all present). Shipping both emits
duplicate icon links. See **D-6**.

### Not copied — and why

| Path | Reason |
|---|---|
| `public/marquee/.git/` | **The landmine.** Confirmed real: `HEAD`, `config`, `hooks/`, `info/`, `objects/`, `refs/` — a `git init` skeleton with no commits. `git add public/marquee` would record a gitlink (mode `160000`) instead of the ten images; the push would succeed and the images would be absent after the server pull, with no error at any stage. Deleted from the copy before the first `git add`, then verified with `git status --porcelain public/`. |
| `assets-source/` (10 PNGs) | Working originals. Filenames contain spaces. Also the evidence trail for **D-1**. |
| `image_hero_section_robot/` (21 files) | Design references. Contains spaces, parentheses, and a non-ASCII `ç`. |
| `public/trust/mcafee.webp` | Removed by your decision; unreferenced. |
| `README.md`, `eslint.config.mjs`, `next.config.ts`, `tsconfig.json`, `package*.json` | Target's own versions win. |

### Assets the migration still needs and does not have

| Missing | Needed by | See |
|---|---|---|
| `og-image.png` (1200×630) | OG tag, Twitter card, `Product.image` on the homepage | **D-5** |
| favicon set from the new logo | Phase C: "the new logo replaces the old one … including the favicon set" | **D-6** |

---

## 4. Component inventory

### 4a. Source → target: all 26 components

Every source component is reachable from `page.tsx`. Nothing is dead.

| Component | Action | Why |
|---|---|---|
| `hero/Hero` | **port with changes** | Renders `<Navbar/>` internally — must be lifted to the layout for Phase C. |
| `hero/Navbar` | **port with changes** | Becomes the sitewide nav; `HERO_CONTENT.nav` must reconcile with `NAV_LINKS`. See **D-4**. |
| `hero/Atmosphere`, `hero/SidePanel`, `hero/SequenceRail`, `hero/OfferCard` | port as-is | |
| `metrics/MetricsStrip` | **port as-is — do not touch the `revealed` guard** | The SSR fix lives here. |
| `statement/Statement` | **port with changes** | Renders `<Showcase/>`. See **D-1**. |
| `showcase/Showcase`, `showcase/Marquee` | **blocked pending D-1** | |
| `pricing/Pricing`, `PlanCard`, `TierToggle`, `Countdown` | port as-is | |
| `why-choose-us/WhyChooseUs`, `features/KeyFeatures`, `comparison/Comparison`, `devices/Devices`, `reviews/Reviews`, `overview/Overview`, `manifesto/Manifesto`, `faq/Faq`, `closing/ClosingCta` | port as-is | |
| `footer/Footer` | **port with changes** | Replaces the target `Footer`; must render from the layout, not the page. |
| `icons/BrandMark`, `icons/ArrowUpRight` | port as-is | |
| **hooks** `useScrollReveal`, `useCountUp`, `useIdleWhenOffscreen`, `useCountdown` | port as-is | 14 / 1 / 2 / 1 importers |
| **hooks** `usePointerParallax`, `useReducedMotion` | **skip** | **0 importers.** Dead in the source. Porting them ships unreferenced code. |
| **data** all 15 files | port as-is | Except `showcase.ts` — see **D-1**. |
| `app/layout.tsx` | **do not port** | Merge its JSON-LD *into the target's* `page.tsx`. See §0 item 4. |
| `app/page.tsx` | **do not port** | Recompose in the target: no inner `<main>`, no inner `<Footer>` — the target layout supplies both. |
| `app/globals.css` | **merge** | Per §2. |

### 4b. Target components after the port

**Still used by non-homepage routes — must stay:**

| Component | Used by |
|---|---|
| `SectionLink` | `blog/[slug]/BlogPostContent.tsx`, `Footer.tsx`, `Navbar.tsx` |
| `Navbar` | `layout.tsx` — **replaced**, not deleted, by the ported nav |
| `Footer` | `layout.tsx` — **replaced** by the ported footer |

**Genuinely orphaned by the port** — nothing outside the old homepage tree imports them:

`HeroSection` · `StatsBar` · `FeaturesSection` · `PricingSection` · `DevicesSection` ·
`ChannelsSection` · `FAQSection` · `TrustSection` · `CTASection` · `ParticleBackground` ·
`PromoBanner` · `OrderSummaryModal` · `MotionReveal` · `FAQAccordion`

**Already orphaned today, before the port** — zero importers at `41c2061`:

`HeroMotion` · `MotionFadeIn`

> **Correction to the brief's list.** The brief groups `ParticleBackground`, `PromoBanner`,
> `OrderSummaryModal`, `MotionReveal` and `FAQAccordion` with the rest as if they were page-level.
> They are not — they are reached *transitively* (`HeroSection` → `ParticleBackground` +
> `PromoBanner`; `PricingSection` → `OrderSummaryModal`; `FAQSection` → `FAQAccordion`; six sections →
> `MotionReveal`). The outcome is the same — they die with the homepage — but only `HeroMotion` and
> `MotionFadeIn` are dead *right now*.

**Deletion is deferred to Phase E, not done in Phase B.** Rationale: keeping them costs nothing (they
are tree-shaken out of every bundle the moment nothing imports them) and they are the only rollback
path if the ported homepage has to be reverted mid-migration. `src/lib/whatsapp.ts` dies with
`OrderSummaryModal` and is listed with them.

**`src/lib/utils.ts` (`cn`) survives** — `FAQAccordion` and `PricingSection` die, but `Navbar` still
imports it, and so may the reworked non-homepage pages in Phase C.

---

## 5. Risk list — ordered by expected damage

### R-1 · Site-wide light→dark repaint leaves half-styled pages · **HIGH**

Nine routes are written in Tailwind utilities tuned for `#fafbff`. Flipping the tokens to `#050507`
repaints the token-driven parts instantly and leaves every hardcoded light colour behind as a white
slab or an unreadable low-contrast run of text. Blog and contact are the worst exposed — they carry
the most bespoke styling.

**Mitigation.** Before editing anything in Phase C, grep every route for literal colours that bypass
the tokens (`bg-white`, `text-black`, `bg-slate-*`, `bg-gray-*`, `#fff`, `rgba(255,255,255,…)`,
gradient stops) and produce a per-page count. Fix in that order, largest first. Verify each page at
360 px and against WCAG AA **before** the source's `body { overflow-x: hidden }` base rule goes in,
because that rule hides the overflow symptom without fixing it.

### R-2 · JSON-LD from the source layout leaks onto every route · **HIGH**

`Product` with 8 offers, `FAQPage` with 12 questions and `MerchantReturnPolicy` sit in the source's
root layout. Ported literally, `/terms` would carry a `FAQPage` describing an accordion that is not on
it. That is the Phase E failure "no schema describes something absent from the page", and it is the
kind of thing that quietly costs rich results site-wide.

**Mitigation.** Keep the split the target already has: `Organization` + `WebSite` may live in the
layout; `WebPage`, `Product`, `FAQPage`, `MerchantReturnPolicy` and `BreadcrumbList` stay in
`page.tsx`. Verified at Phase E by extracting `@type` counts per built HTML file — the command is
already proven and its current output is recorded in §8.

### R-3 · Root-layout `title.absolute` and `canonical` destroy every other page's metadata · **HIGH**

Source layout sets `title: { absolute: … }` and `alternates: { canonical: SITE }` at the root.
`absolute` at the root removes the `%s | IPTV Subscription UK 4K` template that all nine other pages
rely on; the root canonical becomes the fallback for any page that does not set its own.

**Mitigation.** The target's layout metadata block is on the must-survive list and is **not**
replaced. The absolute title moves to `page.tsx` (where it already is today) and the root keeps its
template. Detected by the §8 title table: any page whose rendered title loses its suffix has hit this.

### R-4 · The entire homepage is client-side · **MEDIUM-HIGH**

24 of 26 source components are `"use client"`. Content still server-renders — verified, `37,000+` is
in the SSR HTML — but the whole tree hydrates. Consequences: a large JS payload on the money page,
and TBT/INP exposure on exactly the URL that has to rank.

**Mitigation.** Out of scope for this migration and explicitly *not* fixed opportunistically. Measured
at Phase E (first-load JS for `/`, before and after) and reported as a number, so the decision to
split server/client components later is made against evidence rather than instinct.

### R-5 · Nav lifted out of the hero breaks the hero layout · **MEDIUM**

`Hero.module.css` positions the hero as a full-bleed stage with `<Navbar/>` inside it. Moving Navbar
to the layout changes its containing block and can drop the hero content by the nav's height, or
leave the nav opaque over a section it was designed to float above.

**Mitigation.** Lift in one step and verify at 360 / 768 / 1280 / 1920 px before moving on. Fallback
if it fights back: render the shared nav in the layout and give the homepage a `position` context, so
the source CSS keeps its assumption instead of being rewritten.

### R-6 · The nested `.git` swallows ten images · **MEDIUM, but silent**

Confirmed present. The failure mode is the dangerous one: local build fine, push succeeds, server
pull produces an empty `public/marquee/`, no error at any stage.

**Mitigation.** Delete the `.git` directory from the copy **before** the first `git add`. Verify with
`git status --porcelain public/` (every image must show `A`, none as a submodule) and
`git ls-files public/ | wc -l` against the copied count. Both are Phase E checklist lines already.
*Contingent on D-1 — if the marquee is dropped, this risk disappears with it.*

### R-7 · Template-literal asset paths fail only on Linux · **MEDIUM, silent**

18 of 36 assets are addressed by `` `/devices/${id}.webp` `` and `` `/trust/${id}.webp` ``. No
compiler, no bundler and no Windows filesystem can catch a case error in these.

**Mitigation.** All 18 verified by hand today (§3). Re-verified mechanically at Phase E by extracting
every `id` from the data files and `test -f` against the real path, rather than by reading.

### R-8 · Countdown deadline is frozen at build time · **MEDIUM**

`OFFER.endsAt` is computed from `new Date()` at *module load* — build time for a static page. That is
correct for hydration safety and is what makes "held until <date>" a real deadline. But a site built
on 26 August and not rebuilt shows an expired deadline from 1 September.

**Mitigation.** Flagged in `content-ready/00-INTEGRATION-GUIDE.md` already. Added to Phase E's
"things you must do manually" as a monthly rebuild requirement, with the honest alternative — make
the homepage dynamic, or drop the countdown — stated rather than buried.

### R-9 · Metadata rewritten during restyling · **MEDIUM**

Phase C touches all nine routes for colour. Titles and descriptions were trimmed in Phase 4 and are
all inside limits today (§8). Restyling is exactly when they get "tidied".

**Mitigation.** The §8 table is the contract. Regenerated after Phase C and after Phase D and diffed
against §8; any change that is not an intended Phase D blog-title change is a regression.

### R-10 · Blog content replacement is a net loss of 3,111 words · **MEDIUM — needs your decision**

See **D-3**. Listed here because it is the largest single content change in the migration.

### R-11 · Base-element CSS from the source leaks into blog and legal pages · **LOW-MEDIUM**

`a { text-decoration: none }`, `button { background: none; border: 0 }`, `img { display: block }`
become global. Underlined in-body links in the blog posts lose their underline — and the
internal-link plan depends on those links being visibly links.

**Mitigation.** Add an explicit underline rule for in-body prose links in the blog scope during
Phase C. Checked visually per page at the Phase C gate.

### R-12 · Duplicate favicon declarations · **LOW**

`src/app/icon.png` plus `metadata.icons` emits two icon link sets. Cosmetic, not a ranking issue.
Resolved by **D-6**.

### R-13 · `npm ci` fails on a clean machine · **LOW**

No dependency change is planned, so `package-lock.json` should stay in sync. Verified explicitly at
Phase E rather than assumed, because it is the one failure that only appears on the server.

---

## 6. Contradictions and decisions I need from you

Per Rule 6 — these are places the data disagrees with the brief, or where two of your own decisions
disagree. I have not resolved any of them myself.

### D-1 · 🔴 The marquee images are on the live homepage — BLOCKING

`Statement` (render position 3) renders `Showcase` → `Marquee` → the ten `public/marquee/` files.

The **text layer is already clean**: filenames are `poster-01…05` / `tile-01…05`, alt text is
`"On-demand series artwork"`, `"Live sport channel tile"`, and `data/showcase.ts` documents the
reasoning. A crawler reads nothing identifying. That mitigation is already done and it is the right
one.

**What remains is the images themselves.** `assets-source/` retains the originals and the mapping is
unambiguous — 5 posters from `breaking_bad`, `d_d_pool`, `game_of_throne`, `megamind`, `no_way_up`;
5 tiles from `bbbbc`, `football`, `formul1`, `news`, `sky_`. Displayed under a heading about what an
IPTV subscription is, they read as a claim about what is supplied, on a domain with prior DMCA
enforcement history. Reverse-image and visual search do not read alt text.

**This is your call, not mine.** Three options:

| | Action | Cost |
|---|---|---|
| **A** | Drop `Showcase` + `Marquee` + `showcase.ts` + all 10 files. `Statement` keeps headline, echo, body. | Loses a visual band; images gap stays at 2 assets. |
| **B** | Keep, unchanged. | Accepts the rights exposure knowingly. |
| **C** | Keep the components, replace the 10 files with your own interface screenshots. | Needs assets that do not exist yet; delays Phase B. |

**My recommendation: A now, C later.** It unblocks Phase B today, and it is reversible — the
components are ten files and one data module, restorable in an hour once real screenshots exist.

### D-2 · Premium tiers: 4 terms in the source, 2 in your locked decision

Your Phase 3 instruction: *"Premium: 3- and 6-month terms only (£37.99 and £59.99). Drop the 12- and
24-month Premium cards."*

The source has all four — `p12` £97.99 and `p24` £175.99 — and the source layout's `Product` schema
carries **8 offers** to match. The target's schema carries 4.

Every Premium price in the source is arithmetically justified in a code comment (Standard + proxy +
extra connection at that term's rate), so this looks like a considered later revision rather than an
oversight. **Which stands — 4 Premium terms and 8 offers, or 2 and 6?**

### D-3 · Phase D shortens every blog post

Measured, working tree vs `content-ready/`:

| Post | In repo now | content-ready | Change |
|---|---|---|---|
| `how-to-setup-iptv-firestick` | **3,051** (27 blocks) | 1,678 | **−45%** |
| `how-to-buy-iptv-subscription-uk` | 2,525 (15) | 1,818 | −28% |
| `whats-included-in-iptv-subscription-uk` | 2,475 (15) | 2,001 | −19% |
| `iptv-subscription-renewal-cancellation-refund-uk` | 2,380 (15) | 1,823 | −23% |

Total: **10,431 → 7,320 words.** The repo versions also carry FAQ blocks and comparison tables the
rewrites do not.

Note that `content-ready/blog/how-to-setup-iptv-firestick.md` states *"the previous version was 472
words"*. Against `41c2061` that is wrong — the post was expanded in that commit and is 3,051 words.
The rationale for the rewrite may still hold; the number it cites does not.

There is a real argument for proceeding anyway: the current versions carry commercial framing on
informational URLs (`"How This Service Measures Against The Framework"`), which is the
cannibalisation the rewrites exist to remove, and `doesNotTarget` enforces. **But it is a 30% content
cut on the only pages currently earning impressions, and it is your call.**

Options: **(a)** swap wholesale as briefed · **(b)** swap the body, keep the existing FAQ blocks
appended · **(c)** keep the current posts and take only the internal-link changes from §D3.
**My recommendation: (b)** — it takes the intent separation and the anti-cannibalisation guard without
discarding 3,100 words, and the FAQ blocks are the part most likely to earn an AI Overview citation.

### D-4 · Hero payment marks — the brief and the code disagree, twice over

Brief B3: *"Restore the four payment marks in `HERO_CONTENT.offer.marks` — they were replaced with
text badges against my decision."*

Two things make this more than a revert:

1. **They are not currently a payment row.** `offer.marks` renders under the label
   `"What every plan includes"` as a tick-list: *30-day money-back guarantee · No auto-renewal, ever ·
   Activation by email in minutes · UK support, 24/7*. Restoring card logos does not replace like
   with like — it deletes four inclusion claims and changes the block's purpose. The component
   renders text with a tick `<svg>`; it would need to render `<img>` instead, and the label would
   need to change.
2. **Your locked decision covered the footer.** *"Payment marks stay — zero SEO impact"* was about
   `FOOTER.payment.marks`, which is intact — five marks, `mcafee` correctly removed.

The honest concern is on the record in both `hero-content.ts` and `Hero.tsx`: no card is taken on this
site, so a card row in the hero advertises a checkout that does not exist. **You have the final call,
and if you confirm, I will implement it exactly.** What I need is *which*: (i) replace the four
inclusion claims with four card logos, (ii) keep the inclusions and add a card row beneath, or
(iii) leave the hero and treat the footer marks as satisfying this.

### D-5 · `og-image.png` does not exist

Referenced three times in the source layout: `openGraph.images`, `twitter.images`, `Product.image`.
Present in neither repo. `Product.image` is a required property for Product rich results, so a 404
here costs more than a blank social card.

Options: **(a)** you supply a 1200×630 `og-image.png` · **(b)** point all three at the existing
`public/iptv-subscription.webp` (1024×1024 — valid, wrong aspect ratio for social) · **(c)** point
them at `logo-512.png`. **My recommendation: (b) now, (a) before deploy** — never ship a 404 in
`Product.image`.

### D-6 · Two favicon systems

`src/app/icon.png` (512×512, new logo) vs `metadata.icons` → `/favicon_io/*` (7 files, old logo).
Phase C says the new logo replaces the old *including the favicon set*, but no favicon set exists for
the new logo and I have no image-processing tooling here to derive one.

Options: **(a)** ship `src/app/icon.png` and delete the `metadata.icons` block and `public/favicon_io/`
— one file, Next handles the rest, but no `.ico` for old clients and no `apple-touch-icon`
· **(b)** you generate a favicon set from the new logo and I drop it into `favicon_io/` unchanged.
**My recommendation: (a) now, (b) when convenient.**

### D-7 · Two Phase E banned-string checks fire on approved copy

- **`7-day`** — 3 legitimate hits in the source (`"Full EPG with 7-day catch-up"`, in `features.ts`,
  `overview.ts`, `pricing.ts`) and the same phrasing is approved in `content-ready/01-homepage.md`
  lines 262, 380, 654 and FAQ item 12. `00-INTEGRATION-GUIDE.md` line 80 shows the banned item is
  **`7-day` *guarantee*** — a 7-day refund window contradicting the 30-day figure — not 7-day
  catch-up. **Proposed narrowing: `7[- ]day\s+(money|guarantee|refund|back)`.**
- **`94%`** — 4 hits, all CSS gradient stops (`rgba(0,0,0,0.55) 94%`). **Proposed narrowing: restrict
  the scan to `src/data/` and `.tsx`, excluding `.css`.**

I will use the narrowed forms at Phase E and state both the raw and narrowed counts, unless you say
otherwise.

### D-8 · `refund/page.tsx` contradicts the homepage's core differentiator

`src/app/refund/page.tsx:59`: *"The 30-day money-back guarantee applies to first-time purchases only.
**Renewals and repeat subscriptions are subject to a 7-day refund window.**"*

This is the one genuine `7-day guarantee` occurrence in the repo, and it sits under a homepage whose
central claim is *"No auto-renewal, ever"* and *"Every plan carries a 30-day money-back guarantee"*.
A buyer reading both pages finds a renewal policy on a service that says nothing renews.

Rule 4 says I do not rewrite content, so I have not. **This needs either a copy change from you or a
decision to leave it.** Flagging it because it is exactly the class of self-contradiction the
`anti-freeze` purge was about.

### D-9 · Review screenshots — redaction is good, three residues remain

All three are genuinely redacted: contact names blacked out, email local-parts blacked, usernames
blacked, avatars covered. Three things survive:

1. **A three-digit fragment of the contact's phone number** is visible in the header of all three
   (`989`, `990`, `990`).
2. **`review-3` contains a photograph of a customer's home interior** — a shelf and its contents,
   forwarded by the customer. Not covered by the name/number/avatar redaction brief.
3. **The section copy and the images disagree.** `REVIEWS_CONTENT.lede` reads *"We have not collected
   published reviews, so we are not going to show you any"* — while displaying three customer
   conversations. Your locked decision called them *"genuine customer conversations"*. Under the
   DMCC Act the distinction between a testimonial and a support-log screenshot is worth being
   deliberate about.

No action taken. **Recommend: crop the phone fragment, crop or blur the room photo in `review-3`, and
tell me which framing the lede should carry.**

---

## 7. Execution order once approved

Unchanged from the brief's phases; recorded here so the commit boundaries are unambiguous.

| Phase | Work | Local commit |
|---|---|---|
| **B1** | Copy `public/` (minus `mcafee`, minus marquee if D-1=A), delete nested `.git`, create `src/assets/`, verify `git status --porcelain public/` | — |
| **B2–B3** | Port components, `.module.css`, `data/`, 4 hooks. Merge `globals.css` per §2. Recompose `page.tsx` in source render order, no inner `<main>`/`<Footer>`. Merge the target's homepage metadata + full JSON-LD graph in. Lift `Navbar` to the layout. | — |
| **B4** | `npm run build`; assert `37,000+` and no `0+` in SSR HTML; every image resolves; JSON-LD graph present and valid | `feat: port new homepage design and assets` |
| **C** | Repaint nine routes; one nav, one footer; reconcile `HERO_CONTENT.nav` with `NAV_LINKS`; new logo + `SITE_LOGO_PATH`; Guides column; compact legal row. **Metadata untouched** — §8 is the contract | `feat: apply new design across all routes` |
| **D** | Load 4 posts per **D-3**; `Article` + `BreadcrumbList` per post; `readTime` matched to measured `wordCount`; `title: { absolute: … }`; `doesNotTarget` preserved as a code comment; implement `03-internal-linking.md` — 7 in-body links to `/`, exactly 3 exact-match, 8 sibling links | `feat: load rewritten blog content and internal link plan` |
| **E** | `docs/PRE-PUSH-CHECKLIST.md` with every check's result. Delete the orphans from §4b. **No push, no deploy.** | — |

**Gates.** I stop at the end of B, C and D with the evidence, not just the claim.

---

## 8. Baseline — measured today, so a regression is provable

`npm run build` · Next.js 16.2.2 (Turbopack) · compiled 9.4 s · TypeScript 11.4 s · 16 routes ·
**0 errors, 0 type errors, 0 warnings.**

**SSR metrics on `/`:** `37,000+` ×20 · `198,000+` ×17 · **`0+` ×0.**

**JSON-LD on `/`:** Organization 1 · WebSite 1 · WebPage 1 · BreadcrumbList 1 · Product 1 · Offer 4 ·
MerchantReturnPolicy 1 · FAQPage 1 · Question 10 · Answer 10 · Brand 1 · ContactPoint 1 · Country 1 ·
ImageObject 1 · ListItem 1.
*(Post-port this becomes Offer 8 or 6 per **D-2**, and Question/Answer 12.)*

**Titles, descriptions, canonicals, H1 count — every route, from the built HTML:**

| Route | Title | len | Desc len | Canonical | H1 |
|---|---|---|---|---|---|
| `/` | IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund | 54 | 151 | yes | 1 |
| `/blog` | IPTV Subscription Guides \| IPTV Subscription UK 4K | 50 | 145 | yes | 1 |
| `/blog/how-to-buy-iptv-subscription-uk` | How To Buy An IPTV Subscription Safely In The UK | 48 | 140 | yes | 1 |
| `/blog/how-to-setup-iptv-firestick` | How To Set Up An IPTV Subscription On A Fire TV Stick | 53 | 149 | yes | 1 |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | IPTV Renewal, Cancellation And Refund Rights In The UK | 54 | 149 | yes | 1 |
| `/blog/whats-included-in-iptv-subscription-uk` | What's Included In A UK IPTV Subscription | 41 | 144 | yes | 1 |
| `/contact` | Contact UK IPTV Support \| IPTV Subscription UK 4K | 49 | 138 | yes | 1 |
| `/terms` | Terms of Service \| IPTV Subscription UK 4K | 42 | 69 | yes | 1 |
| `/privacy` | Privacy Policy \| IPTV Subscription UK 4K | 40 | 102 | yes | 1 |
| `/dmca` | DMCA Policy \| IPTV Subscription UK 4K | 37 | 54 | yes | 1 |
| `/refund` | Refund Policy \| IPTV Subscription UK 4K | 39 | 80 | yes | 1 |
| `/editorial-policy` | Editorial Policy \| IPTV Subscription UK 4K | 42 | 155 | yes | 1 |
| `/_not-found` | Page Not Found \| IPTV Subscription UK 4K | 40 | 150 | n/a | 1 |

**All 13 titles ≤ 60. All 13 descriptions ≤ 160. Canonical on every indexable route. Exactly one
`<h1>` per page.** This is the state Phase C and D must not degrade.

**Internal links to `/` per built page:** 4 sitewide on every route (logo, nav Home, footer column 3,
footer brand) — and **0 in-body contextual links on any blog post.** All 7 from
`03-internal-linking.md` §3 are still to be written in Phase D, along with items 8 (`/blog` intro),
9 (`/contact` body) and 10 (`/editorial-policy` body), none of which exist yet.

**Git:** `HEAD = 41c2061`, 0 ahead / 0 behind `origin/main`. No nested `.git` anywhere in the target.
`.gitignore` excludes `/node_modules`, `/.next/`, `/out/`, `.env*`, `next-env.d.ts` — **and nothing
under `public/` or `src/`.**

---

## 9. What I need from you to start Phase B

**Blocking:** **D-1** (marquee images).
**Needed during B:** **D-2** (Premium terms → determines the offer count in the schema), **D-4**
(hero marks), **D-5** (og-image).
**Needed before C:** **D-6** (favicon).
**Needed before D:** **D-3** (blog content — a/b/c).
**Answer at your convenience:** **D-7** (check narrowing), **D-8** (refund copy), **D-9** (screenshots).

If you answer only **D-1**, I can begin B1–B2 and raise the rest at the Phase B gate.
