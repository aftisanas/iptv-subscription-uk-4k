# Action Plan — iptv-subscription-uk-4k.com

Generated 2026-08-22 from `docs/FULL-AUDIT-REPORT-N2.md`. Ordered by priority, then by effort within each band.

**The framing that should govern sequencing:** the site has 0 clicks in 12 months, 0 organic keywords and DR 0 with 1 non-spam referring domain. On-page work is not what is holding it back. Items C1–C3 stop active bleeding and cost almost nothing; after that, **H1 (links) is the only item on this list that can plausibly change the traffic number.** Everything else is preparation for the day authority exists.

---

## CRITICAL — do today

### C1. Deploy `main`
Production is on `eff6938`. `main` is on `41c2061` — 15 files, 988 insertions, all of it SEO work that is currently inert.

Deploying resolves, in one action:
- Header/footer nav gains **Blog** and **Contact** (`constants.ts:29-35`)
- `/editorial-policy` stops returning 404 (`src/app/editorial-policy/page.tsx`, 204 lines, already written)
- Sitemap gains `/editorial-policy` and correct `lastmod` dates
- **The homepage stat bar stops rendering `0+` to non-JS crawlers** (`StatsBar.tsx` — state now initialises to the final value, with zero as the animation's first frame rather than its initial state)
- `llms.txt`, blog metadata and the extra-connection price fix all go live

**Verify after deploy:**
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://iptv-subscription-uk-4k.com/editorial-policy   # expect 200
curl -s https://iptv-subscription-uk-4k.com/ | grep -c '37,000+'                                # expect >0, and no '0+ *Live Channels'
curl -s https://iptv-subscription-uk-4k.com/sitemap.xml | grep -c editorial-policy              # expect 1
```

*Effort: minutes. Impact: highest on the list.*

### C2. Fix the 404 page's broken CTA
`src/app/not-found.tsx:33` — `href="/iptv-subscription-uk"` points at a route that has never existed. GSC has been reporting it as the site's only 404 since 2026-08-06.

```diff
-            href="/iptv-subscription-uk"
+            href="/#pricing"
```

Then request validation in Search Console → Pages → *Not found (404)*.

*Effort: one line. Impact: removes the only crawl error and a dead-end user path.*

### C3. Narrow disavow of the dofollow PBN links
Do **not** disavow all 487 domains. 477 of them are nofollow scraper spam that Google already ignores, and a blanket file risks suppressing legitimate links from adjacent domains later.

Disavow only the ~10 domains carrying **dofollow** links on the anchor *"High Quality Dofollow Backlinks DA 50 PA 40 Premium PBN Network Service…"*. Pull the exact list:

Ahrefs → Site Explorer → Backlinks → filter `Dofollow` → export → take the referring domains → upload as `domain:` entries to Search Console's disavow tool.

There is no manual action in Search Console today, so this is preventative, not remedial.

*Effort: 30 minutes. Impact: removes the only genuinely risky part of the link profile.*

---

## HIGH — within one week

### H1. Start earning real referring domains
This is the item that matters. `iptv subscriptions` is KD 18 and needs roughly 20 genuine referring domains for a top-10 position. The site has one, and it is a backlink vendor.

The three long-form guides (2,599–2,763 words on UK consumer rights, subscription anatomy and buying process) are the only genuinely linkable assets on the site. They are good enough to pitch. Realistic targets in this niche: UK streaming and cord-cutting forums and communities, comparison and review sites that already cover IPTV, Reddit and specialist Discord communities where a genuinely useful consumer-rights guide gets shared, and digital-rights or consumer-advice sites for the refund/cancellation piece specifically.

Set the expectation honestly: 15–25 links at a natural pace is 3–6 months of work, not a sprint. Nothing else on this plan substitutes for it.

*Effort: ongoing. Impact: the only path to the stated goal.*

### H2. Resolve the two thin posts
`best-iptv-uk-guide-2026` (601 words, claims 13 min read) and `how-to-setup-iptv-firestick` (472 words, claims 13 min read). Both are unindexed in GSC. Pick one route per post:

- **Expand** to 1,800–2,500 words so the content matches its own metadata, or
- **Delete** and 301 to the closest strong post (`best-iptv-uk-guide-2026` → `how-to-buy-iptv-subscription-uk`; `how-to-setup-iptv-firestick` → `whats-included-in-iptv-subscription-uk`), removing both from `llms.txt`.

Whichever you choose, correct the `readTime` values in `constants.ts:387` and `:403` — a page overstating its own length by 4× is a trust problem independent of its SEO effect.

*Effort: 1 day to expand, 30 minutes to delete. Impact: removes the site's clearest thin-content signal.*

### H3. Strip Cloudflare's duplicate response headers
Live responses carry `X-Frame-Options: DENY` **and** `SAMEORIGIN`, `X-Content-Type-Options: nosniff` twice, and two conflicting `Referrer-Policy` values. Cloudflare's Managed Response Headers are layering on top of `next.config.ts:5-21`.

Cloudflare dashboard → **Rules → Settings → Managed Response Headers** → disable, or add a Transform Rule removing the duplicated keys. Keep `next.config.ts` as the single source of truth.

Flagged in the July audit and still live.

*Effort: 15 minutes. Impact: makes the security config authoritative; clears scanner warnings.*

### H4. Fix the Organization entity block
In the homepage `@graph`:

- **Change** `contactPoint.email` from `contact@buy-iptv-uk.com` to an address on **this** domain. A different brand's domain in the entity block that establishes identity actively undermines it.
- **Add `sameAs`** with every third-party profile the business genuinely controls. With DR 0 and no citations anywhere, this is the only entity anchor available to Google and to LLMs.
- **Disable Cloudflare Email Obfuscation** for the contact address, or render it as plain text. Right now no crawler — search or AI — can extract a contact address from this site at all.

*Effort: 1 hour plus whatever profile creation `sameAs` needs. Impact: E-E-A-T and AI citability.*

### H5. Ship a proper OG image
Create a **1200×630 PNG** (not WebP — LinkedIn and several other platforms will not render WebP), set it as `og:image` and `twitter:image` in `src/app/layout.tsx`, and add `og:image:width` / `og:image:height`. The site currently serves its 102 KB square logo, so every social share renders badly today.

*Effort: 1 hour. Impact: social CTR; cheap.*

---

## MEDIUM — within one month

### M1. Trim titles and descriptions
Titles over 60 chars: `/blog` (99), `whats-included` (94), `renewal-cancellation-refund` (93), `how-to-buy` (90), `best-iptv-uk-guide-2026` (83), `how-to-setup-iptv-firestick` (81), `/contact` (80). Descriptions over 160: `/contact` (225), `best-iptv-uk-guide-2026` (221), `/blog` (213), `how-to-setup-iptv-firestick` (206), `whats-included` (177).

The `| IPTV Subscription UK 4K` suffix is what pushes every blog title over. Drop it on posts and keep it on top-level pages.

### M2. Build the homepage into the page that can win the keyword
The strategy is to beat `televo.uk`, which ranks #1 with its homepage across the whole cluster. The current homepage is **1,405 words** of feature bullets. It needs materially deeper coverage of buyer intent — what a subscription actually is, how the terms differ, what happens after payment, what the refund process is in practice — not more features.

Include the plural form `iptv subscriptions` naturally; no title on the site currently contains it.

### M3. Build the Guide page the FAQ already promises
The homepage FAQ says *"The full line-up sits on the Guide page."* No such page exists, in the routes or the sitemap, and the claim is also embedded in `FAQPage` JSON-LD. Either build a channel-lineup page or remove the sentence from both the visible FAQ and the schema. Making a promise to Google that the site cannot keep is the worse of the two options.

### M4. Complete the schema
- `Article`: add `image`, `inLanguage: "en-GB"`, a `BreadcrumbList`, and a **named `Person` author** once a real byline exists.
- `/blog`: add `Blog` or `CollectionPage` + `ItemList`.
- `/contact`: add `ContactPage`.
- `Product`: add `priceValidUntil` and express the 30-day money-back guarantee as `hasMerchantReturnPolicy` → `MerchantReturnPolicy` with `merchantReturnDays: 30`. The guarantee appears nine times on the page and is claimed in schema zero times.
- `BreadcrumbList`: drop the fragment-URL second item, or replace it with a real page.

### M5. Rebalance internal links
Measured inbound unique-page counts: `/` 14, each legal page 14, `/blog` 6, `/contact` 4, individual posts 1–3. The four legal pages currently receive as much internal linking as the homepage. For a strategy built on concentrating authority on `/`, move legal links into a compact footer row and add contextual links from every blog post body into the homepage's pricing and features sections.

### M6. Refresh `dateModified`
All three N1 posts are frozen at `2026-07-17`. Update on any real edit — and only on a real edit. The hand-maintained-dates decision in `sitemap.ts:6-9` is the right one; keep it.

### M7. Cut the JavaScript payload
266 KB of JS/CSS across 13 files for a page whose interactive surface is an accordion, a modal and scroll animations; the largest chunk is framer-motion at 71 KB. Converting `HeroSection`, `DevicesSection` and `PromoBanner` to server components was already identified as deferred work in the N0 commit — it is mechanical and it is the largest remaining performance win.

---

## LOW — backlog

- **L1.** Fix the `&amp;` spacing bug in the `/blog` H1 — renders as `IPTV UK Guides &Streaming Tips`.
- **L2.** Add a Content-Security-Policy header. Absent from both Next and Cloudflare layers.
- **L3.** Create real product imagery — EPG screenshots, device mockups, channel-category visuals. The site has exactly one image asset (the logo) for a product whose entire value proposition is visual.
- **L4.** Add an image sitemap once L3 produces something to list.
- **L5.** Remove the single self-referencing `hreflang` tag, or expand it if other regions are ever added. One self-referencing alternate does nothing.

---

## What to measure, and when

Set the baseline today so the next audit has something to compare against:

| Metric | Today (2026-08-22) | Check at |
|---|---|---|
| GSC clicks (28-day) | 0 | 30 / 60 / 90 days |
| GSC impressions (28-day) | ~5 | 30 / 60 / 90 days |
| Indexed pages | 6 / 12 | 30 days |
| GSC 404 errors | 1 | 7 days (after C2) |
| Ahrefs DR | 0.0 | 90 days |
| Non-spam referring domains | 1 | 90 days |
| Organic keywords | 0 | 90 days |

**Expected trajectory if C1–C3 and H1–H5 are done:** indexation should reach 10–12 of 12 within 30 days, and the 404 clears within a week. Clicks and DR will not move on that timescale — they follow H1, and H1 is a 3–6 month effort. If the 90-day check still shows 1 non-spam referring domain, the plan has not been executed regardless of how much on-page work shipped.
