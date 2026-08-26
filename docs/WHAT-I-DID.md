# WHAT I DID — Phase 4, Track B

2026-08-22. **14 files changed in the working tree. Nothing committed, nothing pushed, nothing deployed.** `HEAD` is still `41c2061`. `new-modern-landing-page/` untouched.

**Build:** `npm run build` — compiled clean, TypeScript clean, **16 routes** (was 17; the thin post is gone, `/editorial-policy` present). `npx tsc --noEmit` exits 0.

---

## 1. Every code change, with file and line

### 🔴 Critical

| # | File | Change |
|---|---|---|
| 1 | `src/app/not-found.tsx:31` | `href="/iptv-subscription-uk"` → `href="/#pricing"`. This was the site's only GSC 404, crawled 2026-08-06, generated entirely by our own 404 page's primary CTA. **No 301 added** — the URL never existed and holds no equity; see §4. |
| 2 | `src/lib/constants.ts:111,140,169,198` | `perMonth` corrected to the true divisions: `12.99→8.66`, `10.99→6.0`, `7.79→4.17`, `5.85→3.33`. |
| 3 | 8 files | Headline `£5.85/month` → **`£3.33/month`** everywhere: `page.tsx` (×4 incl. Product + Organization schema), `HeroSection.tsx:86,111`, `CTASection.tsx:77`, `Footer.tsx:39`, `llms.txt:3`, `BlogPostContent.tsx:266`, `blog/[slug]/page.tsx:84`. |
| 4 | `src/lib/constants.ts:275` | FAQ: `from £12.99 per month on the 3-month plan` → `£8.66`. |

### Deletion of the thin, unindexed post

| # | File | Change |
|---|---|---|
| 5 | `src/lib/constants.ts` | `BLOG_POSTS` entry for `best-iptv-uk-guide-2026` removed (601 words, `13 min read`, never indexed). |
| 6 | `src/app/blog/[slug]/page.tsx` | `blogContent` entry removed; orphan `ARTICLE_ABOUT` key removed. |
| 7 | `src/app/blog/[slug]/page.tsx:16` | Internal link inside the *how-to-buy* post repointed from the deleted URL to `/blog/whats-included-in-iptv-subscription-uk` — otherwise a live in-body link would have pointed at a redirect. |
| 8 | `public/llms.txt` | The post's line removed. |
| 9 | `next.config.ts:57-61` | **301 (Next emits 308) → `/blog/how-to-buy-iptv-subscription-uk`.** Blog→blog, topically coherent. |

### Metadata

| # | File | Change |
|---|---|---|
| 10 | `src/app/page.tsx:20` | Title → **`IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund`** (54). Approved option #2. |
| 11 | `src/app/page.tsx:22` | Description → 151 chars, exact plural leading, guarantee inside the visible window. |
| 12 | `src/app/page.tsx:36-56` | OG/Twitter now reference the `title`/`description` constants instead of a stale hard-coded copy that had drifted. |
| 13 | `src/app/page.tsx:29-33` | **Self-referencing `hreflang` removed** (brief L5). One `en-GB` alternate pointing at itself does nothing; adding `en-CA` without a Canada page would be a false signal. |
| 14 | `src/app/blog/[slug]/page.tsx:187` | `title: post.title` → **`title: { absolute: post.title }`**, bypassing the `"%s \| IPTV Subscription UK 4K"` template. Rendered titles dropped from **88–92 → 41–54**. |
| 15 | `src/app/blog/page.tsx:5-7` | Title 69→24 (49 rendered), description 213→145. |
| 16 | `src/app/contact/page.tsx:5-7` | Title 53→23 (48 rendered), description 225→138. |
| 17 | `src/app/editorial-policy/page.tsx:11` | Description 186→155. |
| 18 | `src/lib/constants.ts` | The four surviving posts' `title` and `excerpt` replaced with the approved Track A values — see §3 for why this crossed the track line. |
| 19 | `src/lib/constants.ts:339,355,371,403` | `readTime` recomputed at 225 wpm from measured word counts: `14→8`, `14→9`, `13→8`, `13→8`. |

### Schema

| # | File | Change |
|---|---|---|
| 20 | `src/app/page.tsx:185-186` | Every `Offer` gains `priceValidUntil` (`PRICE_VALID_UNTIL = "2026-12-31"`, `page.tsx:21`) and `hasMerchantReturnPolicy`. |
| 21 | `src/app/page.tsx:131-141` | **`MerchantReturnPolicy` node added** — `merchantReturnDays: 30`, `FreeReturn`, links to `/refund`. The guarantee appeared 9× on the page and 0× in schema. |
| 22 | `src/app/page.tsx:118,129` | `WebPage.name`/`.description` now reference the metadata constants rather than a stale duplicate. |
| 23 | `src/app/blog/page.tsx:31-70` | **`CollectionPage` + `ItemList`** of all 4 posts, with a 2-level `BreadcrumbList`. Page previously had no JSON-LD at all. |
| 24 | `src/app/contact/page.tsx:31-72` | **`ContactPage`** with breadcrumb and `contactPoint`. Page previously had no JSON-LD at all. |

### Unfalsifiable-claims purge (your Phase 2 point 4)

| # | `src/lib/constants.ts` | Before → after |
|---|---|---|
| 25 | Feature title + body | **"Anti-Freeze Fast IPTV Technology"** / *"smart load balancing across UK servers"* → **"Adaptive Bitrate Streaming"** / *"Streams adjust to the bandwidth actually available at your device… around 25 Mbps gives you 4K; 10 Mbps is comfortable for HD."* |
| 26 | Feature title + body | **"Reliable IPTV Uptime You Can Trust"** / *"Our IPTV grid is monitored around the clock… reroutes in seconds"* → **"If A Stream Fails, You Have A Remedy"** / WhatsApp support + the 30-day guarantee as the actual backstop. |
| 27 | FAQ `:250` | *"The full line-up sits on the **Guide page**."* — **a promise to Google of a page that does not exist**, embedded in `FAQPage` JSON-LD → replaced with an offer to confirm a specific channel on WhatsApp before purchase. |
| 28 | FAQ | *"Our UK server grid and anti-freeze tech hold a clean 4K stream"* → the no-auto-billing + 30-day-refund answer. |

**Verified:** the only surviving instance of that language anywhere in `src/` is the blog passage that *criticises* it — *"Marketing language about load balancing, anti-freeze technology, or server grids is unfalsifiable by design"*. **The homepage no longer contradicts our own blog post.**

### Internal linking

| # | File | Change |
|---|---|---|
| 29 | `src/components/Footer.tsx:88-108` | Headed **Legal column → Guides column** listing all 4 posts. |
| 30 | `src/components/Footer.tsx:112-124` | Legal links → **one compact row** in the bottom bar. Count per page is unchanged (4); prominence and position drop sharply — the honest mechanic, as recorded in `03-internal-linking.md`. |
| 31 | `src/components/Footer.tsx` | Footer copyright de-stuffed: `— IPTV Subscription UK \| 4K UHD IPTV Service \| British IPTV Provider` → `— IPTV subscriptions for UK homes`. |
| 32 | `src/app/blog/BlogContent.tsx:84` | H1 `&`-spacing bug fixed with `&amp;{" "}`. Text extractors strip the `<br>`, so the H1 read **`IPTV UK Guides &Streaming Tips`**; it now reads `IPTV UK Guides & Streaming Tips`. |

---

## 2. Verification — every fix, tested against a production build

Run against `npx next start`, not the dev server.

```
REDIRECTS
  /blog/best-iptv-uk-guide-2026        -> 308 /blog/how-to-buy-iptv-subscription-uk   ✅
  /blog/iptv-vs-sky-comparison         -> 308 /blog                                   ✅
  /blog/premier-league-streaming-guide -> 308 /blog                                   ✅
  /iptv-free-trial                     -> 308 /#pricing                               ✅
  /iptv-subscription-uk                -> 404 (bare, by design)                       ✅

404 PAGE
  references to /iptv-subscription-uk: 0                                              ✅

TITLE / DESCRIPTION LENGTHS (rendered, incl. template where it applies)
  /                                                    54 / 151   OK
  /blog                                                50 / 145   OK
  /contact                                             49 / 138   OK
  /editorial-policy                                    42 / 155   OK
  /blog/how-to-buy-iptv-subscription-uk                48 / 140   OK
  /blog/whats-included-in-iptv-subscription-uk         41 / 144   OK
  /blog/iptv-subscription-renewal-cancellation-refund  54 / 149   OK
  /blog/how-to-setup-iptv-firestick                    53 / 149   OK
  → every page now inside 60 / 160. Was 80–99 / 168–258.

SITEMAP: 12 URLs (8 static incl. /editorial-policy, 4 blog posts)                     ✅

HOMEPAGE SCHEMA
  Organization, WebSite, WebPage, MerchantReturnPolicy, BreadcrumbList, Product, FAQPage
  Product: 4 offers, prices 25.99 / 35.99 / 49.99 / 79.99
    priceValidUntil on all offers ......... True
    hasMerchantReturnPolicy on all offers . True
  MerchantReturnPolicy: 30 days -> /refund
  BreadcrumbList: 1 item (fragment crumb already removed on main)
  FAQPage: 10 questions; phantom-page and unfalsifiable answers remaining: none        ✅

/blog   -> CollectionPage (+ItemList, 4 items)                                        ✅
/contact-> ContactPage                                                                ✅
blog H1 -> "IPTV UK Guides & Streaming Tips"                                          ✅
```

**Re-run after deploy** by swapping `localhost` for the live host. The commands are in `content-ready/03-internal-linking.md` §6.

---

## 3. Where I crossed the track line, and why

**Item 18 — blog post `title` and `excerpt` values in `constants.ts` are copy, and I changed them.**

The structural half of your correction #2 (`title.absolute`) took rendered titles from 88–92 to **64/63/67/55** — three still over 60, because the underlying title text was too long. Doing only the structural half would have left N2's M1 open, which is what you asked me to close. So I applied the four approved Track A titles and excerpts, which brings every page inside both limits.

**If you would rather hold that copy until integration, revert those four `title`/`excerpt` pairs** — the `title.absolute` change stands on its own and still delivers 64/63/67/55, an improvement on 88–92.

---

## 4. Where I did not do what the brief said

**`/iptv-subscription-uk` — no 301 added.** The brief specified *"fix `not-found.tsx:31` + 301 → `/`"*. You accepted my argument in Phase 2 and this records it: the URL has never existed, was never indexed, holds zero equity, and its only inbound link was our own 404 CTA. A permanent redirect for a URL that never resolved manufactures a phantom route, and Hard Rule 1 bars us from ever making it real. Fixing the CTA removed the sole thing generating the crawl. **Verified: 0 references remain, and the URL returns a clean 404.**

---

## 5. What you must do manually

### Before anything else

1. **Deploy.** Production is on `eff6938`; `main` is `41c2061`; and this working tree is ahead of both. Deploying `main` alone fixes the nav, `/editorial-policy`'s 404, the stale sitemap and the `0+` stat-bar bug. **These Phase 4 changes are uncommitted and ship only when you commit them.**

### Search Console, after deploy

2. **Validate the 404 fix** — Pages → *Not found (404)* → `/iptv-subscription-uk` → **Validate Fix**.
3. **Resubmit the sitemap** — it now carries 12 URLs including `/editorial-policy`.
4. **Request indexing** for `/editorial-policy` and `/blog/how-to-setup-iptv-firestick` (never indexed).
5. **Confirm the 301** on `/blog/best-iptv-uk-guide-2026` resolves in Coverage over the following weeks.

### Cloudflare dashboard — not fixable in code

6. **Duplicate response headers.** Live responses still carry `X-Frame-Options: DENY` **and** `SAMEORIGIN`, `X-Content-Type-Options` twice, and two conflicting `Referrer-Policy` values. Cloudflare's Managed Response Headers layer on top of `next.config.ts:5-21`. → Rules → Settings → **Managed Response Headers → disable**. Flagged in the July N1 audit and still open.
7. **Email Obfuscation.** No crawler — search or AI — can extract a contact address from this site. → Scrape Shield → **Email Address Obfuscation → off**.

### Decisions I could not make for you

8. **`CONTACT_EMAIL` is still `contact@buy-iptv-uk.com`** (`constants.ts:5`) — a different brand's domain, emitted into `Organization.contactPoint` and now also into the new `ContactPage`. **The brief said to propose, not silently change, so I have not touched it.** It should be an address on this domain.
9. **`sameAs` is still absent** from the Organization node. I did **not** add an empty array — an empty `sameAs` is worse than no key. With DR 0 and one non-spam referring domain, this is the only entity signal available. Fill it with profiles you genuinely control.
10. **`PRICE_VALID_UNTIL = "2026-12-31"`** (`page.tsx:21`) needs maintaining. An expired date suppresses the rich result, so a stale value is worse than none.
11. **A 1200×630 PNG OG image.** Still shipping the 102 KB square logo in WebP, which LinkedIn and others will not render. Social previews are broken today.

---

## 6. Before / after

| Metric | Before | After (working tree) | Notes |
|---|---|---|---|
| GSC 404 errors | 1 | **0** | verified |
| Pages with title >60 | 7 | **0** | 88–92 → 41–54 on posts |
| Pages with description >160 | 5 | **0** | 258 → 149 worst case |
| Sitemap URLs | 12 live / 13 intended | **12** | one thin post deleted with a 301 |
| Blog posts | 5 | **4** | unindexed 601-word post removed |
| Pages with no JSON-LD | `/blog`, `/contact` | **0** | CollectionPage + ContactPage added |
| `priceValidUntil` / return policy in schema | absent | **on all 4 offers** | guarantee was 9× on page, 0× in schema |
| Unfalsifiable claims in `constants.ts` | 4 | **0** | only the blog's critique of them remains |
| Links to a non-existent Guide page | 1 (visible + schema) | **0** | |
| `readTime` overstatement | up to **4×** | **0** | recomputed from measured counts |
| Self-referencing hreflang | 1 | **0** | |
| Legal pages as headed footer column | yes | **compact row** | slot reused for Guides |

### Indexation expectation

**Target: 8 of 12 within 30 days of deploy** — `/`, `/blog`, `/contact`, `/editorial-policy` and the 4 posts. The four legal pages are boilerplate that Google routinely declines to index; that is normal and not a defect to chase. `ACTION-PLAN-N2.md` said 10–12; **that was too optimistic and is revised down here.**

**The 404 should clear within a week** of deploy plus validation.

**Clicks and DR will not move on this timescale.** Nothing in Phase 4 addresses the actual constraint — 1 non-spam referring domain against the ~20 the head term needs. This work removes the reasons Google could have for discounting the site. It does not give Google a reason to rank it.

---

## 7. Hard Rules compliance — Phase 4

| # | Rule | Status |
|---|---|---|
| 1 | One money page | No new URL. `/iptv-subscription-uk` explicitly left as a 404 rather than made real |
| 2 | Cluster not phrase | Metadata carries the plural once, in the title; no stuffing added |
| 3 | No keyword stuffing | Footer copyright de-stuffed (item 31); no keyword strings added |
| 4 | Distinct non-commercial intent | Blog metadata rewritten to informational framing; `doesNotTarget` respected |
| 5 | Never fabricate | 4 unfalsifiable claims removed; nothing invented. `readTime` now derived from measured counts |
| 6 | DMCA discipline | No broadcaster named in any changed string. Redirect for the trademark-loaded deleted posts retained |
| 7 | No deletion without 301 | One deletion, with a 301 to a topically coherent target. §4 documents the one justified exception |
| 8 | One set of numbers | `perMonth` reconciled to true division; `£3.33/month` consistent across copy, schema, meta and `llms.txt` |
| 9 | Never edit `new-modern-landing-page` | **Verified untouched** |
| 10 | Nothing goes live | **No commit, no push, no deploy. `HEAD` = `41c2061`. 14 files modified in the working tree only** |
| 11 | Evidence or silence | Every claim in §2 is a command output; §3 and §4 record the two places I deviated |
