# SEO Audit — iptv-subscription-uk-4k.com

**Audited:** 2026-08-22 · **Business type:** Digital-service subscription (single-product landing + editorial blog), UK-only, no physical premises → *not* a Local Service business, so no GBP/maps analysis applies.
**Crawl:** 17 URLs requested — 13 × 200, 3 × 308, 1 × 404. Sitemap declares 12 URLs; the site is far below the 500-page crawl cap, so coverage is complete rather than sampled.
**Live status:** 200, TTFB 198–300 ms (3 runs), Cloudflare edge, HSTS preload on, `x-nextjs-cache: HIT`.

## SEO Health Score: **59 / 100**  *(July N1 baseline: 72/100)*

| Category | Score | Weight | Notes |
|---|---|---|---|
| Technical SEO | 58 | 22% | Production is one commit behind `main`; live 404 on an internally-linked URL; stale sitemap; conflicting CF headers |
| Content Quality | 55 | 23% | 3 strong long-form posts; 2 thin posts advertising "13 min read" at 472–601 words; homepage 1,405 w |
| On-Page SEO | 66 | 20% | Unique titles/canonicals throughout, but 6 titles >60 chars, 5 descriptions >160, nav still missing Blog/Contact live |
| Schema / Structured Data | 68 | 10% | Rich homepage graph; cross-domain contact email; no `sameAs`; Article minimal; `/blog` and `/contact` unmarked |
| Performance (CWV) | 65* | 10% | *Lab-inferred. PSI keyless quota exhausted (429); CrUX has **no field data** — the origin has too little traffic to qualify |
| AI Search Readiness | 52 | 10% | llms.txt good and crawlers get 200, but headline stats render as `0+` in SSR HTML and the contact email is CF-obfuscated |
| Images | 42 | 5% | Exactly one image asset site-wide; no dedicated OG card |

**Why the score fell 13 points from July.** Roughly half is new evidence, half is real regression. The July audit scored on-page signals only — it had no Ahrefs or Search Console data. This audit does, and the off-page picture is materially worse than the on-page picture implied. The genuine regressions are the undeployed sprint and a new broken internal link.

---

## Executive Summary

The site is technically competent and, since the N0 honesty pass, editorially clean. It is also **invisible**. Google Search Console shows **0 clicks and 27 impressions across the last 12 months**, average position 37–43, desktop only. Ahrefs shows **0 organic keywords worldwide** — the site does not rank for anything, including its own brand.

Two root causes, in order of magnitude:

1. **No authority.** Ahrefs DR **0.0**. Of 487 referring domains, **486 are flagged as spam** and 1 (`seogeko.shop`, DR 29, 0 traffic, nofollow) is a backlink vendor. The site has effectively **zero genuine editorial links**. The target keyword `iptv subscriptions` needs roughly 20 real referring domains to reach the top 10. The gap is 20, not 487.
2. **The current sprint is not deployed.** Production is running commit `eff6938`; `main` is at `41c2061` — a 988-line, 15-file SEO sprint that is finished, committed, and not live. Everything in it is currently doing nothing.

On-page work is not the bottleneck. Nothing in the title-length or schema sections below will move a site with DR 0 onto page one. They are worth fixing because they are cheap, but the ranking constraint is off-page.

### Top 5 Critical / High

1. **[Critical] Commit `41c2061` is not deployed.** Live nav renders `Home / Why Us / Pricing / FAQ`; `src/lib/constants.ts:29-35` defines `Home / Pricing / Blog / FAQ / Contact`. `/editorial-policy` exists at `src/app/editorial-policy/page.tsx` and returns **404 live**. The live `sitemap.xml` carries `lastmod` `2026-07-17` and omits `/editorial-policy`; `src/app/sitemap.ts:10-19` sets `2026-07-31` and includes it. One deploy fixes all of it.
2. **[Critical] `/iptv-subscription-uk` is a live 404, linked from your own 404 page.** `src/app/not-found.tsx:33` renders a "View Pricing" CTA pointing at a route that has never existed. GSC has it logged under *Introuvable (404)*, last crawled 2026-08-06, and it is the site's only 404 error. Every visitor who lands on a 404 and clicks the primary CTA gets a second 404.
3. **[Critical] The backlink profile is 100% spam with a small dofollow PBN component.** 487 referring domains acquired between April and August 2026 (0 → 36 → 151 → 258 → 423 → 490), every one `is_spam: true`, all with `traffic_domain: 0`. Anchor text is backlink-vendor advertising copy — the top anchor (266 refdomains, 476 links) reads *"Boost Rankings & Massive Traffic | High DR & High Traffic SEO Backlinks for Casino, Crypto…"*. Most are nofollow and Google ignores those automatically. **10 links across 10 domains are dofollow** on the anchor *"High Quality Dofollow Backlinks DA 50 PA 40 Premium PBN Network Service…"* — those are the ones worth disavowing.
4. **[High] Half the sitemap is not indexed.** 6 of 12 URLs are in the index: `/`, `/blog`, `/contact`, and 3 of 5 blog posts. Not indexed: `/terms`, `/privacy`, `/dmca`, `/refund`, `/blog/best-iptv-uk-guide-2026`, `/blog/how-to-setup-iptv-firestick`. The two unindexed posts are the two thin ones — that is not a coincidence.
5. **[High] The homepage stat bar renders as `0+` in the HTML crawlers read.** Live SSR markup contains `0+ Live Channels`, `0+ Films & Series`, `0 Devices at Once`, `0/7 UK Support`. Googlebot renders JS and recovers the real numbers; GPTBot, PerplexityBot and ClaudeBot do not. Every AI engine reading this page sees a service with zero channels. **Already fixed in the undeployed `41c2061`** (`StatsBar.tsx` now initialises state to the final value) — this is item 1 again, wearing a different hat.

### Top 5 Quick Wins

1. **Deploy `main`.** Clears findings 1 and 5 and roughly a third of the on-page list.
2. **Point the 404 CTA at `/#pricing`** — one-line change in `src/app/not-found.tsx:33`.
3. **Trim 6 titles to ≤60 chars and 5 descriptions to ≤160.** The `| IPTV Subscription UK 4K` suffix is what pushes every blog title over; drop it on posts.
4. **Ship a real 1200×630 PNG OG image.** The site currently serves its 102 KB square logo as `og:image`, in WebP, with no `og:image:width`/`height`. LinkedIn and several other platforms will not render it.
5. **Add `sameAs` to the Organization node and move the schema contact email onto this domain.** It currently reads `contact@buy-iptv-uk.com` — a different brand's domain, in the entity block that is supposed to establish who you are.

---

## 1. Technical SEO

**Working well.** HTTPS with HSTS `max-age=63072000; includeSubDomains; preload`. `http://`, `http://www.` and `https://www.` all 301 to the canonical apex host. `robots.txt` is clean (`Allow: /`, disallowing only `/api/` and `/admin/`) and declares the sitemap. TTFB measured 198/285/300 ms — a real improvement on July's 585 ms. Deleted URLs redirect correctly: `/blog/iptv-vs-sky-comparison` and `/blog/premier-league-streaming-guide` → `/blog`, `/iptv-free-trial` → `/#pricing`. These return **308**, not 301 — Next.js's `permanent: true` emits 308, which Google treats as equivalent to 301, so the commit message's "301" is imprecise but the behaviour is correct.

**Issues.**

- **Deployment drift (Critical).** Detailed above. Verify with `git log --oneline -- src/app/editorial-policy` → only `41c2061`, and `/editorial-policy` is 404 live.
- **Broken internal link → live 404 (Critical).** `/iptv-subscription-uk`, from `not-found.tsx:33`. Still present in `HEAD`, so deploying does **not** fix it.
- **Duplicate and conflicting security headers (High, unchanged since July).** The live response carries `x-frame-options: DENY` *and* `SAMEORIGIN`, `x-content-type-options: nosniff` twice, and `referrer-policy: strict-origin-when-cross-origin` *and* `same-origin`. Cloudflare's Managed Response Headers are layering on top of `next.config.ts:5-21`. Browsers resolve to the stricter value so security is not degraded, but the config is no longer authoritative and scanners flag it. Fix in Cloudflare → Rules → Transform Rules → Response Header Modification, or disable Managed Response Headers.
- **No Content-Security-Policy (Medium).** Absent in both layers.
- **Stale sitemap `lastmod` (Medium).** Live sitemap says every URL last changed `2026-07-17`. The design decision in `sitemap.ts:6-9` — hand-maintained dates rather than `new Date()` — is correct; the dates just need bumping on deploy.
- **Sitemap homepage `<loc>` has no trailing slash (Low).** It matches the canonical exactly, so this is cosmetic.
- **3 URLs reported as "Page with redirect" in GSC (informational).** `http://`, `http://www.`, `https://www.` — expected behaviour for host canonicalisation, not a defect.

## 2. Content Quality

**Working well.** The three Sprint-N1 posts are genuinely good: `how-to-buy-iptv-subscription-uk` (2,763 words), `whats-included-in-iptv-subscription-uk` (2,691), `iptv-subscription-renewal-cancellation-refund-uk` (2,599). They cite external sources, cover UK consumer-rights specifics, and read as written rather than generated. The N0 honesty pass holds — no fabricated subscriber counts, ratings or uptime claims survive anywhere on the live site.

**Issues.**

- **Two thin posts whose own metadata contradicts them (High).** `best-iptv-uk-guide-2026` is **601 words** and advertises `readTime: "13 min read"` (`constants.ts:387`). `how-to-setup-iptv-firestick` is **472 words** and also advertises `"13 min read"` (`constants.ts:403`). Both are unindexed in GSC. A page that overstates its own length by 4× is a thin-content signal *and* a trust signal, on a site selling subscriptions.
- **Homepage is 1,405 words (High).** The stated strategy is to win `iptv subscriptions` with the homepage, mirroring `televo.uk`, which ranks #1 with its homepage across the whole cluster. 1,405 words of feature bullets is not a page that out-covers that intent.
- **A promised page that does not exist (High).** The homepage FAQ answers *"The full line-up sits on the Guide page."* There is no Guide page, in the sitemap or the routes. The same claim is embedded in `FAQPage` JSON-LD, so it is a promise made to both users and Google.
- **No named author anywhere (Medium).** Every `Article` sets `"author": {"@type": "Organization"}`. No byline, no credentials, no team page live — `/editorial-policy` is the closest thing and it 404s. For a paid service in a trust-sensitive category, this is the weakest E-E-A-T dimension.
- **`dateModified` frozen at `2026-07-17` (Medium)** on all three N1 posts, five weeks stale.
- **Thin supporting pages (Medium).** `/blog` index 408 words, `/contact` 239 words. The blog index is a bare card list with no category framing or introductory copy.

## 3. On-Page SEO

**Working well.** Every page has a unique title, unique meta description, a self-referencing canonical, `index, follow`, and exactly one `<h1>`. `lang="en-GB"` is set, currency is £ throughout, spelling is UK English. Heading nesting is clean (homepage: 1 H1, 7 H2, 24 H3). OG and Twitter card tags are complete on all 200-status pages. The 404 page correctly sets `robots: noindex`.

**Issues.**

- **6 titles exceed 60 characters (Medium):** `/blog` 99, `whats-included` 94, `renewal-cancellation-refund` 93, `how-to-buy` 90, `best-iptv-uk-guide-2026` 83, `how-to-setup-iptv-firestick` 81, `/contact` 80. All will truncate. The shared `| IPTV Subscription UK 4K` suffix is the cause on every blog URL.
- **5 meta descriptions exceed 160 characters (Medium):** `/contact` 225, `best-iptv-uk-guide-2026` 221, `/blog` 213, `how-to-setup-iptv-firestick` 206, `whats-included` 177.
- **Live nav omits Blog and Contact (High).** Header renders `Home / Why Us / Pricing / FAQ / Get Started`. Fixed in `constants.ts` on `main`, not deployed. The homepage currently links `/blog` once and `/contact` once, both buried in body copy.
- **Target keyword is singular everywhere (Medium).** The goal keyword is `iptv subscriptions` (plural, UK volume 250, KD 18). No title on the site contains the plural form.
- **`&amp;` spacing bug in the `/blog` H1 (Low).** Renders as `IPTV UK Guides &Streaming Tips` — missing space after the ampersand.
- **Internal link graph is shallow (Medium).** Measured inbound unique-page counts: `/` 14, legal pages 14 each, `/blog` 6, `/contact` 4, individual posts 1–3. The four legal pages receive as many internal links as the homepage, which is backwards for a strategy built on concentrating authority on `/`.

## 4. Schema & Structured Data

**Working well.** The homepage ships a well-formed `@graph` — `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` — plus a separate `Product` with four `Offer` nodes carrying correct GBP prices (25.99 / 35.99 / 49.99 / 79.99), `InStock` and `NewCondition`, and a `FAQPage` with 10 Q&A pairs. All 10 answers are verifiably present in the SSR HTML, not injected on click, so the markup matches visible content. All five blog posts carry `Article`. Everything parses without error.

**Issues.**

- **Cross-domain contact email (High).** `Organization.contactPoint.email` = `contact@buy-iptv-uk.com`. The entity block asserting who you are points at a different domain.
- **No `sameAs` (High).** The `Organization` node has no social or third-party profile links. This is the primary hook Google and LLMs use to resolve a brand into a known entity — and with DR 0 and no citations, it is the only entity signal available.
- **`Article` is minimal (Medium).** No `image`, no `inLanguage`, no `BreadcrumbList`, `author` is the Organization. `dateModified` equals `datePublished`.
- **`/blog` and `/contact` carry no schema at all (Medium).** `/blog` should be `Blog` or `CollectionPage` + `ItemList`; `/contact` should be `ContactPage`.
- **`Product` omits the guarantee and price validity (Medium).** No `priceValidUntil`, and the 30-day money-back guarantee — repeated in nine places on the page — is not expressed as `hasMerchantReturnPolicy`. That is a `MerchantReturnPolicy` node you are entitled to and not claiming.
- **`BreadcrumbList` item 2 points at a fragment (Low).** `https://iptv-subscription-uk-4k.com/#features` as a breadcrumb step is meaningless to Google; a two-item breadcrumb ending on the same page adds nothing.
- **FAQ rich results are largely retired (informational).** Since Google's August 2023 change, `FAQPage` rarely produces SERP features for non-government/health sites. Keep the markup — it is high-value for LLM extraction — but do not expect SERP real estate from it.

## 5. Performance

**Measured, not estimated where possible.**

| Metric | Value | Assessment |
|---|---|---|
| TTFB (3 runs) | 198 / 285 / 300 ms | Good — down from 585 ms in July |
| TLS handshake | 79–125 ms | Fine |
| HTML transfer (brotli) | 21.9 KB | Good |
| HTML uncompressed | 177 KB | Acceptable for SSR + RSC |
| JS + CSS transfer | **266 KB** across 13 files | Heavy for a marketing page |
| Largest chunk | 71 KB | framer-motion |
| Inline `<script>` blocks | 40 | RSC hydration payload |
| RSC payload | 68 KB | Contributes to TBT |
| LCP image | preloaded, `fetchPriority="high"`, responsive srcset | Correctly optimised |

**Lab and field data are both unavailable.** PageSpeed Insights returned **429 — keyless daily quota exhausted** (same blocker as July). CrUX has **no field data for this origin** — with 0 clicks in 12 months there is not enough real-user traffic to populate the dataset. Any CWV number for this site today is an estimate; treat the 65 as provisional.

**The one clear opportunity:** 266 KB of JS for a page whose interactive surface is an accordion, a pricing modal and scroll animations. `framer-motion` was already split into three motion islands in N0, which helped, but the library still ships. Converting `HeroSection`, `DevicesSection` and `PromoBanner` to server components — noted as deferred in the N0 commit message — remains the highest-value performance change, and it is mechanical.

## 6. Images

The weakest category by a wide margin.

- **The site has exactly one image asset:** `public/iptv-subscription.webp`, 102 KB, the logo. It appears twice per page (header, footer) and is also the OG image.
- **No dedicated social card.** `og:image` and `twitter:image` both point at the square logo. No `og:image:width` / `og:image:height`. The file is **WebP**, which LinkedIn and several other platforms will not render — social previews are broken today.
- **Zero illustrative content.** No product screenshots, no EPG view, no device mockups, no channel-category imagery. For a visual product — 4K streaming — this is a conversion problem as much as an SEO one, and it removes any chance of image-search or AI-Overview visual citation.
- **No image sitemap.**
- **What is right:** both `<img>` tags carry descriptive `alt`, Next/Image emits a full responsive `srcSet`, the header logo is eagerly loaded with `fetchPriority="high"` and the footer copy is `loading="lazy"`. The mechanics are correct — there is simply almost nothing to apply them to.

## 7. AI Search Readiness (GEO)

**Working well.** `llms.txt` is present, well-structured, and honest — it names the real pricing, flags the Secure Proxy as a paid add-on rather than bundled, and links core pages and all five guides. Every AI crawler tested returns **200 with the full 182 KB payload**: GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, bingbot, Googlebot. Cloudflare is not blocking AI bots at the edge. FAQ answers are in the SSR HTML. Headings are semantic and extractable.

**Issues.**

- **The headline stats are `0` to every non-rendering crawler (Critical).** SSR markup: `0+ Live Channels`, `0+ Films & Series`, `0 Devices at Once`, `0/7 UK Support`. AI crawlers do not execute JavaScript. Fixed in undeployed `41c2061`.
- **The contact email is unreadable (High).** Cloudflare Email Obfuscation rewrites it to `/cdn-cgi/l/email-protection#...`. No crawler — search or AI — can extract a contact address from this site, and the one in schema points at another domain. For citability, an unreachable business is a business that does not get cited.
- **Zero brand mention signal (High).** DR 0, one non-spam referring domain, 0 organic keywords, 0 clicks. LLMs surface brands they have seen discussed elsewhere. This brand has not been discussed anywhere the crawlers index.
- **`llms.txt` promotes the two thin posts (Medium).** `best-iptv-uk-guide-2026` and `how-to-setup-iptv-firestick` are listed as guides; at 601 and 472 words they will not sustain a citation.
- **No author or `sameAs` entity anchor (Medium).** Nothing for a model to resolve "IPTV Subscription UK 4K" against.

---

## Off-Page Reality Check

This section has no July counterpart — the N1 audit had no off-page data.

| Metric | Value | Source |
|---|---|---|
| Ahrefs Domain Rating | **0.0** | Ahrefs, 2026-08-22 |
| Referring domains (live) | 487 | Ahrefs |
| Referring domains **not** flagged spam | **1** | Ahrefs, `is_spam = 0` filter |
| Live backlinks | 927 | Ahrefs |
| Organic keywords (worldwide) | **0** | Ahrefs |
| Organic traffic | **0** | Ahrefs |
| GSC clicks, trailing 12 months | **0** | GSC export 2026-08-21 |
| GSC impressions, trailing 12 months | **27** | GSC export |
| GSC average position | 37.15 (desktop; no mobile impressions at all) | GSC export |
| Indexed pages | 6 of 12 | GSC Coverage export |

**Referring-domain growth:** 0 (Mar) → 36 (Apr) → 151 (May) → 258 (Jun) → 423 (Jul) → 490 (Aug). Roughly 490 domains in five months on a domain with no content history, while DR stayed pinned at 0. That is the signature of automated scraper spam — SEO-vendor sites that generate a page for every domain they crawl — not of anything anyone bought or built.

**Top GSC queries (12 months):** `#iptvsubscriptionuk` (10 impressions, pos 35.5), `4k iptv subscription uk` (6, pos 62), `iptv renewal` (1, pos 41), `how to buy iptv subscription` (1, pos 53). Nothing for the target keyword.

**What this means for the target.** `iptv subscriptions` is KD 18 and needs roughly 20 referring domains for a top-10 position. The site has 1 that is not spam, and it is a backlink vendor. Content and schema work cannot substitute for that. The realistic path is 15–25 genuine, topically relevant links plus the on-page work below — not more on-page work alone.

**On the spam links:** do not mass-disavow. Google ignores nofollow spam automatically, and Search Console shows no manual action. The exception worth acting on is the ~10 **dofollow** links on the *"Premium PBN Network Service"* anchor — those are the only ones passing anything, and what they pass is risk, not equity. A narrow disavow of those 10 domains is proportionate; a 487-domain disavow file is not, and would risk suppressing links you may later earn from adjacent domains.

---

## Reconciliation with the July N1 Audit

| July finding | Status today |
|---|---|
| [Critical] Missing 301s for deleted URLs | **Fixed** — all three redirect (as 308, functionally equivalent) |
| [High] Two thin blog posts contradicting their `readTime` | **Not fixed** — 601 w and 472 w, both still claim 13 min, both now confirmed unindexed |
| [High] Duplicate/conflicting Cloudflare security headers | **Not fixed** — still live |
| [High] `/blog` + `/contact` missing from nav | **Fixed in code, not deployed** |
| [High] Schema contact email on `buy-iptv-uk.com` | **Not fixed** |
| [Quick win] FAQPage schema on the 3 N1 posts | **Not done** |
| [Quick win] 1200×630 OG image | **Not done** |
| — | **New:** `/iptv-subscription-uk` 404 from `not-found.tsx`, logged in GSC |
| — | **New:** entire `41c2061` sprint undeployed |
| — | **New:** off-page picture (DR 0, 0 keywords, 0 clicks) now measured |

TTFB improved from 585 ms to ~250 ms. That is the only unambiguous improvement since July.

---

## Method & Limitations

- **Crawl:** direct HTTP, all 12 sitemap URLs plus the 3 redirect sources, the known-404, and a synthetic 404 control. robots.txt respected; nothing was blocked.
- **Off-page:** Ahrefs API v3 (`site-explorer-*`), 2026-08-22, `mode=subdomains`.
- **Search data:** the repo's own GSC exports dated 2026-08-21 (`Performance-on-Search`, `Coverage`, `Coverage-Valid`, two `Coverage-Drilldown` files), covering the trailing 12 months to 2026-08-19.
- **Not available:** PageSpeed Insights (HTTP 429, keyless daily quota), CrUX field data (origin has insufficient traffic), Google Search Console API and GA4 (no credentials configured — `google_auth.py --check` reports tier -1). Performance is therefore lab-inferred from transfer sizes and TTFB, and is flagged as provisional throughout.
- **Not run:** Playwright screenshots and mobile visual analysis were out of scope for this pass; GSC reports zero mobile impressions in 12 months, so there is no field evidence of a mobile-specific problem to chase.
