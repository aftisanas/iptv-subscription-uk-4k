# ACTION PLAN — integration, deploy, and what comes after

Phase 5, 2026-08-22. Assumes you port the design into **this** repo, then deploy everything in one push.

---

## 1. Integration-readiness verdict

# 🟢 GO — with one asset blocker to clear first

**`content-ready/` is complete enough to start porting today.** 14 of the design's 16 data files have finished, paste-ready content. The two uncovered files are uncovered deliberately — see §1.3.

**Nothing in `content-ready/` is waiting on you.** All ten decisions are locked in `00-INTEGRATION-GUIDE.md`.

### 1.1 What is ready

| Deliverable | State |
|---|---|
| `01-homepage.md` | **Complete.** 13 rendered sections + footer, slot by slot, arrays numbered |
| `02-meta-and-schema.md` | **Complete.** Title, 155-char description, OG/Twitter, full JSON-LD graph |
| `03-internal-linking.md` | **Complete.** Anchor distribution verified against what was actually written |
| `00-INTEGRATION-GUIDE.md` | **Complete.** 2 warnings, 10 locked decisions, pre-ship checklist |
| 4 × blog `.md` | **Complete.** 1,705–2,016 words each, front-matter carries measured word counts |
| Track B code | **Applied and build-verified.** 14 files, `npm run build` clean, 16 routes |

### 1.2 🔴 The one blocker — `showcase.ts` must be dropped, and I got this wrong in Phase 2

In Phase 2 I recommended *"Showcase → USE, populated with genuine product screenshots"*, reasoning from the file's shape (`src`, `alt`, `w`, `h`) without reading its contents. **Having now read them, that recommendation was wrong and is withdrawn.**

`showcase.ts` is not a product gallery. It is a marquee of **copyrighted title artwork and broadcaster logos**, with the rights-holders named in the alt text:

| Asset | `alt` |
|---|---|
| `/marquee/movies/breaking-bad.webp` | `Breaking Bad` |
| `/marquee/movies/d-d-pool.webp` | `Deadpool` |
| `/marquee/movies/game-of-throne.webp` | `Game of Thrones` |
| `/marquee/movies/megamind.webp` | `Megamind` |
| `/marquee/movies/no-way-up.webp` | `No Way Up` |
| `/marquee/channels/bbbbc.webp` | `BBC` |
| `/marquee/channels/football.webp` | `Premier League` |
| `/marquee/channels/formul1.webp` | `Formula 1` |
| `/marquee/channels/news.webp` | `Sky News` |
| `/marquee/channels/sky.webp` | `Sky Sports` |

This is a **direct Hard Rule 6 breach** — named rights-holders presented as content we supply, in machine-readable alt text, on a domain in a network with prior DMCA enforcement history. It is the single highest-risk item in the entire port, and it is currently sitting in an unrendered component that would ship the moment someone wires it up.

**Required before deploy:**
1. **Do not render `Showcase`.** Delete `src/data/showcase.ts` and `src/components/showcase/`.
2. **Delete the whole `public/marquee/` tree** — all ten files, not just the two I flagged in Phase 2. My earlier note named only `sky.webp` and `bbbbc.webp`; **that was incomplete.**
3. Confirm no component imports `SHOWCASE` before building.

**Consequence:** the images gap (2 assets against televo's 27) cannot be closed this way. Closing it needs genuine screenshots of your own interface — EPG view, channel grid, device UI — which do not exist yet. **That is a post-deploy task, not a blocker.**

### 1.3 Deliberately not covered

| File | Why |
|---|---|
| `showcase.ts` | Dropped — §1.2 |
| `sequence.ts` | Not rendered, no justified purpose. Leave unused or delete |

### 1.4 What needs your input — nothing blocking, three worth deciding

| # | Item | Impact if skipped |
|---|---|---|
| 1 | **`mcafee` in `payment.marks`** — a security-certification badge, not a payment method. Remove unless you hold the certification | Misrepresentation risk; no SEO impact |
| 2 | **`amex` and `diners`** are listed but have **no asset file** in `public/trust/` | They render as gaps |
| 3 | **1200×630 PNG OG image** | Social previews stay broken. Not a ranking issue |

None of these stop the port. Items 1 and 2 should be settled before deploy; item 3 can follow.

---

## 2. Order of operations

Ten steps. Verify each before starting the next — the checks are cheap and the alternative is debugging a broken deploy with everything changed at once.

### Step 0 — Branch and baseline

```bash
git checkout -b feat/new-design-integration
npm run build          # must be clean BEFORE you change anything
```
Phase 4's Track B changes are uncommitted in your working tree. **Commit them first, on their own** — they are independently valuable and you want them separable if the port goes wrong.

```bash
git add -A src public/llms.txt next.config.ts docs content-ready
git commit -m "seo(N2): Track B technical fixes + Phase 0-5 deliverables"
```

**Verify:** `git log --oneline -1` shows your commit; `npm run build` still clean.

---

### Step 1 — Carry the design's shell, not its routes

The design has **only** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/icon.svg`. It has **no blog, no contact, no legal pages, no robots, no sitemap, no 404.** Everything else comes from this repo and must survive the port.

**Copy in from the design:**
- `src/components/**` (all section components)
- `src/data/**` — except `showcase.ts` and `sequence.ts`
- `src/app/globals.css`
- `public/hero/`, `public/devices/`, `public/reviews/`, `public/trust/` — **not `public/marquee/`**

**Do NOT copy:** `app/layout.tsx` (yours has the metadata, template and manifest), `app/page.tsx` (compose it fresh), `app/icon.svg` (you have `favicon_io/`).

**Verify:**
```bash
ls src/app/          # blog contact dmca editorial-policy privacy refund terms robots.ts sitemap.ts not-found.tsx
test ! -d public/marquee && echo "marquee removed OK"
test ! -f src/data/showcase.ts && echo "showcase removed OK"
```

---

### Step 2 — Fill the data files from `01-homepage.md`

Work in render order. Each section in `01-homepage.md` names its file, its keys and its array counts.

**Do not merge — replace.** Four files (`overview.ts`, `pricing.ts`, `why-choose-us.ts`, `faq.ts`) are derived from televo's live homepage. Keeping "the good bits" produces near-duplicate content of the page you are trying to outrank.

Set `export const BRAND = "IPTV Subscription UK 4K"` in `overview.ts`.

**Verify:**
```bash
grep -rn "Televo\|Kryntix" src/data/ ; echo "(empty = clean)"
grep -rn "34,000\|57,000\|195,000\|238,000\|140,000\|7-Day Money\|99\.9\|renewRate" src/data/ ; echo "(empty = clean)"
```

**Array counts — write to these:** METRICS 4 · KEY_FEATURES 15 (4 `emphasis`) · COMPARISON_ROWS 15 · DEVICES 12 · FAQ 12 · REVIEWS 3 · advantages 3 · pillars 5 · includes 5 · steps 4 · `TIERS.standard.plans` 4 · **`TIERS.premium.plans` 2**.

---

### Step 3 — 🔴 The metrics SSR fix

**The single highest-risk step in the port.** `metrics.ts` animates from zero. If the component initialises state to `0`, the server HTML reads `0+ Live Channels` — and Googlebot's first pass plus every AI crawler (none execute JS) sees a service with zero channels.

**This is the exact bug already fixed in `StatsBar.tsx` in commit `41c2061`.** Do not reintroduce it. Pattern and rationale are in `00-INTEGRATION-GUIDE.md` Warning 1.

**Verify — this is not optional:**
```bash
npm run build && npx next start -p 3000 &
curl -s http://localhost:3000/ | grep -c '37,000+'   # MUST be > 0
curl -s http://localhost:3000/ | grep -c '>0+<'      # MUST be 0
```

---

### Step 4 — Compose `app/page.tsx`

Render the 13 sections in order, then attach the JSON-LD from `02-meta-and-schema.md`. Keep the metadata export from your current `page.tsx` — title, 155-char description, canonical, OG/Twitter are all already correct and build-verified.

**Sections:** Hero · Metrics · Statement · Pricing · WhyChooseUs · KeyFeatures · Comparison · Devices · Reviews · Overview · **Manifesto (legality)** · ClosingCTA. Footer sits in the layout.

`Manifesto` is newly rendered as the legality + E-E-A-T block. `Sequence` and `Showcase` are not rendered.

**Verify:**
```bash
curl -s http://localhost:3000/ | grep -o '<h1[^>]*>.*</h1>' | head -1     # exactly one H1
curl -s http://localhost:3000/ | grep -c '<h2'                             # ~12
```

---

### Step 5 — Wire the countdown honestly

`OFFER.endsAt` must be **computed as the end of the current month**, never `null`. Implementation in `00-INTEGRATION-GUIDE.md`. Compute server-side or at build time so SSR and hydration agree.

**Verify:** load the page twice in a fresh session — the deadline must be **the same date both times**.

---

### Step 6 — Assets

- **Delete `public/marquee/`** entirely (§1.2)
- **Redact** names, numbers and avatars in `public/reviews/review-{1,2,3}.webp`
- **Remove `mcafee`** from `payment.marks`, or move it to `assurances` if you hold the certification
- **Resolve `amex` / `diners`** — add assets or drop the entries
- **Add `public/og-image.png`**, 1200×630 PNG, and point `og:image` / `twitter:image` at it

---

### Step 7 — Confirm the carried-over SEO plumbing still works

The port must not disturb any of this. All of it is already correct in the working tree:

| Item | File | Expect |
|---|---|---|
| Sitemap | `src/app/sitemap.ts` | 12 URLs |
| Robots | `src/app/robots.ts` | `Allow: /`, sitemap declared |
| Redirects | `next.config.ts` | 4 rules |
| 404 | `src/app/not-found.tsx:31` | CTA → `/#pricing` |
| Blog schema | `src/app/blog/page.tsx` | `CollectionPage` + `ItemList` |
| Contact schema | `src/app/contact/page.tsx` | `ContactPage` |
| Article schema | `src/app/blog/[slug]/page.tsx` | `Article` + `BreadcrumbList` |
| Constants | `src/lib/constants.ts` | canonical numbers, `perMonth` divisions, corrected `readTime` |

```bash
curl -s localhost:3000/sitemap.xml | grep -c '<loc>'                     # 12
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/blog/best-iptv-uk-guide-2026   # 308
curl -s localhost:3000/nonexistent | grep -c 'iptv-subscription-uk'      # 0
```

---

### Step 8 — Blog content

Port the four `.md` bodies into `blogContent` in `src/app/blog/[slug]/page.tsx`. Each top-level block (a paragraph, or a `##` heading plus its paragraphs) becomes **one string** in the `content: []` array, matching the existing pattern.

`title`, `excerpt` and `readTime` are **already applied** in `constants.ts` — do not re-edit them.

**Verify:** all four render, titles 41–54 chars, descriptions 138–149.

---

### Step 9 — Full pre-deploy sweep

```bash
npm run build
npx tsc --noEmit

# rights-holders — must return nothing
grep -rniE "sky|bbc|itv|virgin media|premier league|formula 1|breaking bad|game of thrones" src/data/ src/components/ public/

# fabrication — must return nothing
grep -rniE "trustpilot|99\.9|renewRate|500 hours|aggregateRating|\"Review\"" src/

# contamination — must return nothing
grep -rn "Televo\|Kryntix" src/
```

Then walk the pre-ship checklist in `00-INTEGRATION-GUIDE.md`.

---

### Step 10 — Deploy, then Search Console

```bash
git add -A && git commit -m "feat: new landing page design + Track A content"
git checkout main && git merge feat/new-design-integration
git push origin main
```

**Within an hour of deploy, verify live:**
```bash
curl -s https://iptv-subscription-uk-4k.com/ | grep -c '37,000+'                    # >0 — the SSR check
curl -s https://iptv-subscription-uk-4k.com/ | grep -c '>0+<'                       # 0
curl -s -o /dev/null -w "%{http_code}\n" https://iptv-subscription-uk-4k.com/editorial-policy   # 200
curl -s https://iptv-subscription-uk-4k.com/sitemap.xml | grep -c '<loc>'           # 12
curl -s https://iptv-subscription-uk-4k.com/nonexistent | grep -c 'iptv-subscription-uk'  # 0
```

**Then, in Search Console:**
1. **Validate the 404 fix** — Pages → *Not found (404)* → `/iptv-subscription-uk` → Validate Fix
2. **Resubmit the sitemap**
3. **Request indexing** for `/editorial-policy` and `/blog/how-to-setup-iptv-firestick`
4. Watch `/blog/best-iptv-uk-guide-2026` resolve to a 301 over the following weeks

**And in Cloudflare** — neither is fixable in code:
5. **Rules → Settings → Managed Response Headers → disable.** Live responses still carry duplicate, conflicting `X-Frame-Options`, `X-Content-Type-Options` and `Referrer-Policy`. Flagged in the July N1 audit and still open.
6. **Scrape Shield → Email Address Obfuscation → off.** No crawler — search or AI — can currently extract a contact address from the site.

---

## 3. What to measure, and when

Baseline, 2026-08-22, from `docs/EVIDENCE-BASE.md` §11:

| Metric | Baseline | 7 days | 30 days | 90 days |
|---|---|---|---|---|
| GSC 404 errors | **1** | **0** | 0 | 0 |
| Indexed pages | **6 / 12** | 6–8 | **8 / 12** | 8–12 |
| GSC impressions (28-day) | **~5** | ~5 | **low tens** | tens |
| GSC clicks | **0** | 0 | **0** | first non-zero *if* links land |
| Ahrefs DR | **0.0** | 0 | 0 | 0–3 |
| Non-spam referring domains | **1** | 1 | 3–6 | **8–12** |
| Organic keywords | **0** | 0 | 1–5 | 10–30 |

**What each depends on.** Indexation and the 404 depend only on the deploy. Impressions depend on the deploy plus the homepage rewrite. **Clicks and DR depend entirely on link acquisition**, which is yours and which nothing in Tracks A or B substitutes for.

**The honest read at 90 days:** if the non-spam referring-domain count is still 1, the content and technical work will have executed correctly and the traffic number will still be zero. That is not the plan failing — it is the plan's stated dependency going unmet.

---

## 4. The link requirement

`iptv subscriptions` is KD 18 — Ahrefs estimates **~20 referring domains for a top-10 position**. Not for #1. The site has **one non-spam referring domain, and it is a link vendor**.

**The assets worth pitching** are the three long-form guides — the consumer-rights piece especially. It covers the Consumer Rights Act 2015, the DMCC Act 2024, chargeback windows and Section 75 with specifics, and it is the only thing on this site a third party has a reason to cite. The homepage is not a link target and should not be pitched as one.

Realistic targets: UK streaming and cord-cutting communities; comparison and review sites already covering IPTV; consumer-advice and digital-rights sites for the refund piece specifically.

**Pace matters as much as volume.** This domain went 0 → 490 referring domains in five months of scraper spam. Genuine acquisition should look nothing like that: 15–25 links over 3–6 months, from topically plausible sources, with varied anchors.

**On the ~10 dofollow PBN links** (`is_spam: true`, anchor *"Premium PBN Network Service…"*): still low priority, still not a blocker, no manual action in Search Console. Mentioned here once for completeness, per your instruction.

---

## 5. After deploy — the ranked backlog

| Priority | Item | Why |
|---|---|---|
| **1** | **Link acquisition** | The only item that moves clicks or DR |
| **2** | Real product screenshots — EPG, channel grid, device UI | 2 images vs televo's 27; §1.2 removed the shortcut |
| 3 | 1200×630 PNG OG image | Social previews broken today |
| 4 | Cloudflare header + email-obfuscation fixes | Dashboard only; open since July |
| 5 | Convert `HeroSection`, `DevicesSection`, `PromoBanner` to server components | 266 KB JS; framer-motion is 71 KB. Deferred since N0 |
| 6 | Add `sameAs` once real profiles exist | Only entity signal available at DR 0 |
| 7 | Maintain `PRICE_VALID_UNTIL` (`page.tsx:21`, currently `2026-12-31`) | An expired date suppresses the rich result |
| 8 | Re-audit in 90 days against `EVIDENCE-BASE.md` §11 | |

**Deliberately not on this list:** more schema. Televo ranks #1 for `iptv subscriptions`, `iptv subscription`, `iptv uk` and `iptv` with **no Product, no Offer and no FAQPage** — we already ship more structured data than the page beating us on every term (`DIAGNOSIS.md` finding ②). Ours is now complete; adding more is not a ranking lever.

---

## 6. Corrections to earlier deliverables, on the record

| Where | Correction |
|---|---|
| `ARCHITECTURE.md` §5 | **"Showcase → USE if real screenshots exist"** — withdrawn. `showcase.ts` is copyrighted title artwork and broadcaster logos, not a product gallery. **Drop it.** §1.2 |
| `ARCHITECTURE.md` §5 | *"Delete `sky.webp` and `bbbbc.webp`"* — **incomplete**. Delete the entire `public/marquee/` tree, all ten files |
| `ACTION-PLAN-N2.md` | Indexation target 10–12 of 12 in 30 days → **8 of 12**. The four legal pages are boilerplate Google routinely declines to index |
| `ACTION-PLAN-N2.md` | *"Homepage is 1,405 words (High)"* overstated the gap — televo wins the whole 270-keyword cluster with **1,819 words**. Breadth, not length |
| `FULL-AUDIT-REPORT-N2.md` | *"`Article` schema is minimal"* — measured against production; already rich on `main`. Stale, not wrong |
| `FULL-AUDIT-REPORT-N2.md` | Dead link cited at `not-found.tsx:33`; correct line is **:31** |
| Phase 3 front-matter | My first word counts (2,240 / 1,980 / 2,460 / 2,280) were estimates and inflated. Measured: **1,785 / 1,705 / 1,821 / 2,016**; `readTime` recomputed |
| Phase 1 | I called the design's `£3.33` and `£4.17` junk. They were the **true** 24- and 12-month divisions; `constants.ts` was wrong |
| Phase 2 | I proposed dropping Xbox Live and IPTV Smarters Pro. Both are supported; restored |

---

## 7. Hard Rules compliance — Phase 5

| # | Rule | Status |
|---|---|---|
| 1 | One money page | Port keeps `/` as the sole commercial URL |
| 2 | Cluster not phrase | §2 Step 2 preserves the section→term map |
| 3 | No keyword stuffing | No new copy |
| 4 | Distinct non-commercial intent | Blog routes carried unchanged |
| 5 | Never fabricate | §2 Step 9 greps for `Trustpilot`, `99.9`, `renewRate`, `aggregateRating`, `Review` |
| 6 | DMCA discipline | **§1.2 is a Hard Rule 6 finding** — `showcase.ts` and `public/marquee/` must be deleted before deploy; Step 9 greps for rights-holders |
| 7 | No deletion without 301 | Redirect verified in Step 7 |
| 8 | One set of numbers | Step 2 greps for every wrong figure |
| 9 | Never edit `new-modern-landing-page` | **Read-only throughout. Verified untouched by me** |
| 10 | Nothing goes live | No commit, no push, no deploy. `HEAD` = `41c2061`; 14 files modified in the working tree |
| 11 | Evidence or silence | §6 records nine corrections to my own earlier work |
