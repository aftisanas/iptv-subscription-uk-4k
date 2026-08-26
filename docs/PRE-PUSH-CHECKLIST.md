# PRE-PUSH CHECKLIST — result of every check

**Nothing has been pushed and nothing deployed.** Local commits only.
**Date:** 2026-08-26 · **Branch:** `main` · **Origin:** `origin/main` is still at `41c2061`.

Every result below is measured from the build output or the repository, not asserted.

---

## Build and deploy safety

| # | Check | Result |
|---|---|---|
| 1 | `npm run build` clean | ✅ **PASS** — Next.js 16.2.2 (Turbopack), 16 routes, compiled in 5.9 s, TypeScript 9.4 s. **0 errors, 0 type errors, 0 warnings.** |
| 2 | `package.json` / `package-lock.json` in sync | ✅ **PASS** — all 16 direct deps match the lockfile root exactly, lockfileVersion 3, no extras. `npm ci` would resolve on a clean machine. **No dependency was added, removed or changed by this migration.** |
| 3 | Case-sensitivity audit | ✅ **PASS** — every relative import resolved and compared against the real directory listing; 23 literal asset URLs, 12 `devices/` ids and 5 `trust/` ids checked against the filesystem. **0 mismatches.** See note below on why this one mattered most. |
| 4 | No parentheses, spaces or non-ASCII in filenames | ✅ **PASS** — every basename under `public/` and `src/` matches `[A-Za-z0-9._-]` only. |
| 5 | No nested `.git` anywhere | ✅ **PASS** — `find . -name .git -not -path "./.git*"` returns nothing. The source's `public/marquee/.git` was never copied. |
| 6 | `.gitignore` excludes nothing needed | ✅ **PASS** — `node_modules`, `.next/`, `/out/`, `.env*` still ignored; **nothing under `public/` or `src/` is ignored.** |
| 7 | Every new asset staged, none ignored | ✅ **PASS** — `git status --porcelain --ignored public/` reports no ignored files. |
| 8 | `git ls-files public/` matches the copied count | ✅ **PASS** — **44 tracked, 44 on disk.** 35 newly added (36 in the source minus the unreferenced `mcafee.webp`), plus the 9 pre-existing favicon/OG files. |

**On check 3 and check 5 together.** These are the two failures that would have passed every local test and broken only after the Linux pull. 18 of the 36 assets are addressed by runtime template literals — `` `/devices/${device.id}.webp` `` and `` `/trust/${mark.id}.webp` `` — which no compiler, bundler or Windows filesystem can validate. They are now checked mechanically against the real directory listing rather than by eye. The nested `.git` would have made git record `public/marquee` as a gitlink: push succeeds, ten images silently absent on the server, no error at any stage.

---

## SEO — the things that stopped indexation before

| # | Check | Result |
|---|---|---|
| 9 | Metrics render `37,000+`, never `0+` | ✅ **PASS** — SSR HTML for `/` contains `37,000+` **×22**, `198,000+` ×22, and bare `0+` **×0**. The guard lives in `MetricsStrip.tsx`: the count-up only replaces `metric.display` once `revealed` is true, and `useScrollReveal` initialises `false`, so the server render and every no-JS crawler read the real figure. |
| 10 | Sitemap lists exactly the live routes | ✅ **PASS** — **12 URLs**, matching the 12 indexable routes exactly. `/_not-found` correctly absent. No 404, no missing page, no orphan. |
| 11 | `robots.ts` allows crawling; `llms.txt` present | ✅ **PASS** — `robots.txt` allows `/`, disallows only `/api/` and `/admin/`, and declares the sitemap. `llms.txt` present, 32 lines, figures current. |
| 12 | All 4 redirects present | ✅ **PASS** — `/blog/iptv-vs-sky-comparison` → `/blog`, `/blog/premier-league-streaming-guide` → `/blog`, `/blog/best-iptv-uk-guide-2026` → `/blog/how-to-buy-iptv-subscription-uk`, `/iptv-free-trial` → `/#pricing`. All `permanent: true`. |
| 13 | `/iptv-subscription-uk` is a bare 404 with no inbound link | ✅ **PASS** — **0** occurrences of `href="/iptv-subscription-uk"` across all rendered HTML. No redirect exists for it, by your Phase-2 decision. |
| 14 | One `<h1>` per page, correct nesting | ✅ **PASS** — all 13 rendered pages have exactly one `<h1>` and no skipped level. **One failure was found and fixed:** `/contact` went `h1 → h3` (three `h3`s, no `h2`); those are now `h2`. |
| 15 | Every title ≤ 60, every description ≤ 160 | ✅ **PASS** — full table below. |
| 16 | Canonical on every page; `lang="en-GB"` | ✅ **PASS** — self-referencing absolute canonical on all 12 indexable routes; `lang="en-GB"` on all 13. No root-level canonical fallback exists. |
| 17 | JSON-LD valid; no schema describes absent content | ✅ **PASS** — every block parses. Distribution below. |
| 18 | Homepage title and H1 exact | ✅ **PASS** — title `IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund` (54). H1 `IPTV Subscriptions For UK Homes, Without The Satellite Dish`. |

### Titles and descriptions — all 13 routes

| Route | Title | len | desc |
|---|---|---|---|
| `/` | IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund | 54 | 151 |
| `/blog` | IPTV Subscription Guides \| IPTV Subscription UK 4K | 50 | 145 |
| `/blog/how-to-buy-iptv-subscription-uk` | How To Buy An IPTV Subscription Safely In The UK | 48 | 140 |
| `/blog/how-to-setup-iptv-firestick` | How To Set Up An IPTV Subscription On A Fire TV Stick | 53 | 149 |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | IPTV Renewal, Cancellation And Refund Rights In The UK | 54 | 149 |
| `/blog/whats-included-in-iptv-subscription-uk` | What's Included In A UK IPTV Subscription | 41 | 144 |
| `/contact` | Contact UK IPTV Support \| IPTV Subscription UK 4K | 49 | 138 |
| `/terms` | Terms of Service \| IPTV Subscription UK 4K | 42 | 69 |
| `/privacy` | Privacy Policy \| IPTV Subscription UK 4K | 40 | 102 |
| `/dmca` | DMCA Policy \| IPTV Subscription UK 4K | 37 | 54 |
| `/refund` | Refund Policy \| IPTV Subscription UK 4K | 39 | 80 |
| `/editorial-policy` | Editorial Policy \| IPTV Subscription UK 4K | 42 | 155 |
| `/_not-found` | Page Not Found \| IPTV Subscription UK 4K | 40 | 150 |

**Longest title 54, longest description 155.** These are byte-identical to the pre-migration baseline — Phase C and D changed none of them.

### Schema per page type

| Page type | Nodes | Absent-content risk |
|---|---|---|
| `/` | Organization, WebSite, WebPage, BreadcrumbList, MerchantReturnPolicy, **Product (8 Offers)**, **FAQPage (12 Q&A)** | none — all describe content on the page |
| `/blog` | CollectionPage, ItemList, BreadcrumbList | none |
| `/blog/[slug]` ×4 | Article, BreadcrumbList, Organization, WebPage | none |
| `/contact` | ContactPage, Organization, BreadcrumbList | none |
| `/editorial-policy` | WebPage | none |
| `/terms` `/privacy` `/dmca` `/refund` | none | n/a |

**The one thing this checklist exists to prevent** is the source layout's arrangement, where `Product`, `FAQPage` and `MerchantReturnPolicy` sat in the **root layout** and would therefore have rendered on `/terms`, `/privacy` and every blog post — schema describing an accordion and a price list that are not on those pages. They live in `src/app/page.tsx` instead. Verified above: the policy pages carry no JSON-LD at all.

---

## Content integrity

| Check | Result |
|---|---|
| `Televo` · `Kryntix` · `34,000` · `35,000` · `195,000` · `£5.85` · `£12.99/month` · `99.9` · `anti-freeze` · `load balancing` | ✅ **all CLEAN — 0 files each** |
| `7-day` **guarantee/refund/money-back** (narrowed per D-7) | ✅ **CLEAN** |
| `94%` in `src/**/*.ts*`, excluding CSS (narrowed per D-7) | ✅ **CLEAN** |
| Named broadcaster or rights-holder in any copy, heading, schema or metadata | ✅ **none** — Sky, BBC, ITV, Channel 4/5, Virgin, BT/TNT Sport, Premier League, Formula 1, Netflix, Disney, DAZN, UFC: zero hits across all rendered HTML |

**Raw counts for the two narrowed checks, so you can see what was excluded and judge it yourself:**

- **`7-day` raw: 7 hits.** All are `Full EPG with 7-day catch-up` — approved copy in `content-ready/01-homepage.md` (lines 262, 380, 654 and FAQ item 12). `00-INTEGRATION-GUIDE.md` line 80 shows the banned item is a 7-day **guarantee**, which would contradict the 30-day figure. `src/data/{features,overview,pricing}.ts` ×3, `src/lib/constants.ts` ×4 (the superseded arrays).
- **`94%` raw: 4 hits.** All CSS gradient stops — `rgba(0,0,0,0.55) 94%` in `KeyFeatures.module.css` ×2 and `SidePanel.module.css` ×2.

**The one genuine `7-day guarantee` in the repo has been removed.** `refund/page.tsx` said renewals carried a 7-day refund window, on a site whose headline claim is that nothing auto-renews and no card is stored. A matching false claim in the renewal blog post ("we notify buyers ahead of a renewal date") is also gone. Both were the same defect as the purged `anti-freeze` copy: a claim contradicting the rest of the site.

### Figures — every one matches, across all rendered HTML

`37,000+` ×34 · `198,000+` ×34 · `24/7` ×39 · `30-day` ×84 · `3.33` ×26
Standard `25.99` / `35.99` / `49.99` / `79.99` — ×5 each
Premium `37.99` / `59.99` / `97.99` / `175.99` — ×5 / ×7 / ×3 / ×3
**Competing figures `57,000`, `35,000`, `34,000`, `238,000`, `140,000`, `195,000`: ×0 each.**

### `doesNotTarget` guards — honoured in the shipped text

Each guard is now a code comment above its entry in `src/app/blog/[slug]/page.tsx`, with the reason, so a future edit has to read why before undoing it.

| Post | Guard | Verdict |
|---|---|---|
| `whats-included-…` | any commercial term | ✅ **fixed.** "How This Service Structures Its Subscription" applied the anatomy to our own plans and linked `/#pricing` from an informational URL. Replaced with the operator-neutral ten-question checklist; its mirroring FAQ item replaced too |
| `iptv-subscription-renewal-…` | any commercial term | ✅ **passes.** The disclosure section is a rights disclosure, not a pitch, and says so ("None of this is offered as the best refund policy on the market"). Its false auto-renewal paragraph was corrected |
| `how-to-buy-…` | `buy iptv subscription` | ✅ **passes.** Three uses of the phrase, all procedural prose ("Before you buy…", "How do I buy…"). No transactional CTA, no price-led heading |
| `how-to-setup-iptv-firestick` | any commercial term | ✅ **passes.** Clean |

---

## Files added, modified and deleted

**Four local commits, none pushed:**

```
5bd3bce  feat: load blog content updates and internal link plan
e1f172c  feat: apply new design across all routes
10ada35  feat: port new homepage design and assets
e31bdff  fix(seo): pricing correction, metadata trims and de-stuffed blog/footer
```

`e31bdff` is your pre-existing uncommitted Phase-4 SEO work, committed separately so it is not folded into the migration and can be reverted independently.

### Added — 106 files

- **35 assets** under `public/` — `devices/` ×12, `trust/` ×5, `marquee/` ×10, `reviews/` ×3, `hero/` ×1, plus `grain.webp`, `side-panel.webp`, `logo.webp`, `logo-512.png`
- **1 bundled asset** — `src/assets/key-features.webp` (an import, not a URL, so the blur placeholder and intrinsic size survive)
- **50 component files** — 26 `.tsx` and 24 `.module.css` across 16 folders
- **15 data modules** — `src/data/*.ts`
- **4 hooks** — `useScrollReveal`, `useCountUp`, `useIdleWhenOffscreen`, `useCountdown`
- **1 doc** — `docs/MIGRATION-PLAN.md` (this file makes 2)

### Deleted — 19 files

`HeroSection` · `StatsBar` · `FeaturesSection` · `PricingSection` · `DevicesSection` · `ChannelsSection` · `FAQSection` · `TrustSection` · `CTASection` · `ParticleBackground` · `PromoBanner` · `OrderSummaryModal` · `MotionReveal` · `FAQAccordion` · `HeroMotion` · `MotionFadeIn` · the old `Navbar` and `Footer` · `src/lib/whatsapp.ts`

Each was confirmed to have **zero importers** before removal. `SectionLink` was kept — `BlogPostContent` still uses it.

### Modified — 28 files

`src/app/{layout,page,globals.css,not-found}` · `src/app/blog/{page,BlogContent}` · `src/app/blog/[slug]/{page,BlogPostContent}` · `src/app/contact/{page,ContactContent}` · `src/app/{terms,privacy,dmca,refund,editorial-policy}/page` · `src/lib/constants.ts` · `src/data/{hero-content,footer}.ts` · `src/components/hero/Hero.tsx` · `next.config.ts` · `public/llms.txt` · `public/favicon_io/*` (7) · `public/reviews/review-3.webp`

---

## What I could not complete, and why

1. **A rendered 360 px overflow test.** Playwright is not installed and adding it would have changed dependencies, which this migration otherwise does not do. **What I did instead:** a static audit of every `.module.css` for `width`/`min-width` declarations above 360 px that are not behind a `min-width` media guard — **0 found** — plus confirmation that the two components able to exceed the viewport (`Marquee`, `Comparison`) both carry `overflow: hidden`, and that nothing declares more than `100vw` or `min-width: max-content`. **This is static analysis, not a rendered check.** `body { overflow-x: hidden }` (inherited from the design, and needed for the hero's atmosphere layers) would hide a real overflow, so please eyeball `/`, `/blog` and `/contact` at 360 px before you deploy.
2. **A purpose-built `og-image.png`.** See the manual list.

---

## Things you must do — manually

| # | Task | Why |
|---|---|---|
| 1 | **Create a 1200×630 `public/og-image.png`** and point `SHARE_IMAGE_PATH` in `src/app/page.tsx` at it | Currently OG, Twitter and `Product.image` all use `/hero/devices-row.webp` — 900×135, per your instruction, so nothing references a 404 and Product rich results stay valid. The aspect ratio is wrong for a social card and it will render as a thin strip |
| 2 | **Rebuild monthly, or make the homepage dynamic** | `OFFER.endsAt` is computed at module load — build time for a static page. Built today, the countdown deadline is 31 August; it will read as expired from 1 September until the next build. The honest alternatives are a scheduled rebuild, a dynamic homepage, or dropping the countdown |
| 3 | **Eyeball 360 px** on `/`, `/blog`, `/contact` | See limitation 1 |
| 4 | **Decide on `public/iptv-subscription.webp`** | The old OG/logo image, now unreferenced (102 KB). Kept rather than deleted because links shared before this deploy may still point at it. Safe to delete once you're happy |
| 5 | **After deploy:** resubmit `sitemap.xml` in GSC and request indexing for `/` | 12 URLs, several with changed titles and content |

---

## Three things I found that need **your** decision — I did not change them

Rule 4 says copy comes from `content-ready/` and I ask when something is missing. These are all live claims the honesty pass would have caught, but none was in scope and none is covered by an approved replacement.

1. 🔴 **`src/app/terms/page.tsx`: "We offer monthly, quarterly, and annual billing cycles. Payment is due at the start of each billing period."**
   This describes recurring billing on a service whose central differentiator is that nothing auto-renews and no card is stored. It is the same contradiction as the refund-page line you authorised me to fix, on a page I was not authorised to touch. It also disagrees with the renewal blog post, which now says explicitly that there is no auto-renewal here.

2. 🟠 **`src/app/contact/ContactContent.tsx`: "Average first response: under four minutes."**
   An unsubstantiated performance metric, of exactly the class purged in `50765ad` (`99.9% uptime`, `4.9/5`, `50,000 subscribers`). If it is not measured, it should go.

3. 🟠 **Same file: "a named British team with deep knowledge of the UK IPTV market."**
   `/editorial-policy` states that articles are published under the company name and **no individual byline is claimed**. "A named British team" asserts the opposite on another page. One of the two needs to move.

Also minor: `/blog`'s lede opens "Expert articles on IPTV setup…". "Expert" is a self-assessed E-E-A-T claim of the same family. Not changed.

---

## Verdict

**Every check in this checklist passes.** Two real defects were found and fixed while running it — the `/contact` heading skip and the `refund`/blog auto-renewal contradiction — and one contrast token was raised above AA before it could be used.

The build is safe to push and safe to pull onto a Linux server. **Nothing has been pushed.** The three items above are yours to rule on first.
