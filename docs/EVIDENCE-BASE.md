# EVIDENCE BASE — iptv-subscription-uk-4k.com

Compiled 2026-08-22, Phase 0. **Every number below is traced to a source file.** Where I could not verify a claim from the data, it is marked `NO DATA`. Where the data contradicts `PROMPT-FOR-CLAUDE.md`, the row is shown and the conflict is flagged.

**Ahrefs MCP was not used.** All Ahrefs figures come from the exports and screenshots in `ahref_gsc_data_to_analyse_and_understand_deeply_correctly_to_win/`, per instruction.

---

## 0. Sources and decoding

| File | Encoding | Delimiter | Rows |
|---|---|---|---|
| `...content-gap-subd_2026-08-21_22-20-51.csv` | UTF-16LE + BOM | tab | 270 keywords × 44 cols |
| `...installation-guides_2026-08-21_22-22-25.csv` | UTF-16LE + BOM | tab | 7 keywords |
| `...installation-guides_2026-08-21_22-24-35.csv` | UTF-16LE + BOM | tab | 6 outlinks |
| `..._common-keywords_s_...csv` | UTF-8 | comma | 4×4 matrix |
| `..._perf_2026-08-21_22-19-27.csv` | UTF-8 | comma | 135 months |
| `...installation-guides_p_...csv` | UTF-8 | comma | 135 months |
| `...installation-guides-o_...csv` | UTF-8 | comma | 731 days |
| `Links for https___...installation-guides_.csv` | UTF-8 | comma | 61 links |
| `indie_hacker_parasite_blog_post_content.txt` | UTF-8 | — | 2,412 words |
| 5 × GSC `.zip` | UTF-8 CSV, French headers | comma | extracted via `Expand-Archive` |

**Decoding note confirmed.** Three CSVs carry a UTF-16LE BOM (`ff fe`). `iconv` is unavailable; I decoded with Python's `utf-16` codec rather than `tr -d '\000'`, which is equivalent and safer for the quoted fields. The four plain-UTF-8 files were read directly — running `tr -d '\000'` on them would have been harmless but unnecessary.

---

## 1. The target keyword — verified

Source: `data_of_keyword_iptv_subscriptions_targeted.png` (Ahrefs Keywords Explorer, UK, updated 3 Aug 2026).

| Metric | Value |
|---|---|
| Keyword | `iptv subscriptions` |
| Keyword Difficulty | **18** — "~20 ref. domains to rank in top 10" |
| UK search volume | **250** |
| Global search volume | 1.1K (UK 250 / 22%, US 250 / 22%, Canada 200 / 18%, Germany 90, Ireland 30, Saudi 30) |
| Traffic Potential | **17K** (value $8K) |
| Parent topic | **`iptv`**, 33K |
| Clicks | **409** on 250 searches — **CPS 1.69** |
| CPC | $0.60 |
| First seen | 20 Dec 2015 |
| **Current #1** | **`https://televo.uk/`** — *"IPTV UK - Best #1 IPTV Subscription UK - Premium VPN …"* |

**CPS 1.69 is a load-bearing number.** 409 clicks distributed across 250 searches means this SERP still sends more than one click per search. That is what an AI-Overview-free commercial SERP looks like, and it is independent corroboration of §2 below.

### The plural family — 57 keywords, SV 490, GSV 2.0K
Source: `other_keywords_iptv_subscriptions.png` (Matching terms, Terms match).

| Keyword | KD | SV | GSV | TP | SF count | Parent |
|---|---|---|---|---|---|---|
| `iptv subscriptions` | 18 | 250 | 1.1K | 17K | 2 | iptv |
| `iptv subscriptions uk` | **4** | 70 | 100 | 14K | 1 | iptv |
| `uk iptv subscriptions` | **33** | 50 | 60 | 19K | 4 | iptv |
| `great iptv subscriptions` | N/A | 30 | 90 | N/A | N/A | — |
| `iptv smarters subscriptions` | N/A | 20 | 30 | N/A | N/A | — |
| `best iptv subscriptions` | 15 | 20 | 150 | 22K | 3 | iptv |
| `are iptv subscriptions legal` | N/A | 10 | 40 | N/A | N/A | — |
| `iptv smarters pro subscriptions` | N/A | 10 | 30 | N/A | N/A | — |
| `are iptv subscriptions illegal` | N/A | 10 | 30 | N/A | N/A | — |
| `iptv uk subscriptions` | N/A | 10 | 10 | N/A | N/A | — |
| `iptv subscriptions for firestick` | N/A | 10 | 20 | N/A | N/A | — |
| `iptv subscriptions reddit` | N/A | 0–10 | 30 | N/A | N/A | — |
| `how to sell iptv subscriptions` | N/A | 0–10 | 20 | N/A | N/A | — |

Note the spread: `iptv subscriptions uk` is **KD 4**, `uk iptv subscriptions` is **KD 33**, for near-identical volume. Word order matters more than the words here.

---

## 2. The SERP-feature evidence — the brief's central thesis, tested

Source: content-gap CSV, `SERP features` column, restricted to the **265 rows with populated cells** (5 rows are blank export gaps — see Correction 2). **129 of 265 (49%) carry an AI Overview, absorbing 60,240 of 82,030 volume — 73%.** The AIO-free subset is genuinely scarce and genuinely valuable.

| Keyword | Vol | KD | televo pos | SERP features |
|---|---|---|---|---|
| **`iptv subscriptions`** | **200** | **18** | **1** | **People also ask, Sitelinks — no AI Overview** |
| `iptv subscription` | ~~2800~~ **2.4K** | ~~7~~ **50** | 1 | ~~(none)~~ **SF 4 — CSV cell is a stale export gap; live figures are authoritative** |
| `iptv subscriptions uk` | 60 | 4 | 1 | People also ask — no AI Overview |
| `best iptv subscriptions` | 20 | 15 | 1 | Sitelinks, PAA, Discussions — no AI Overview |
| `best iptv subscription` | 250 | 9 | 1 | PAA, Sitelinks, Video — no AI Overview |
| `best iptv subscription uk` | 100 | 12 | 2 | PAA, Sitelinks — no AI Overview |
| `uk iptv subscriptions` | 40 | 33 | 1 | **AI Overview**, Thumbnail, Video, PAA |
| `iptv subscription uk` | 500 | 22 | 1 | **AI Overview**, Thumbnail, PAA, Video |
| `uk iptv subscription` | 350 | 4 | 1 | **AI Overview**, Thumbnail, Video |
| `cheap iptv subscription` | 150 | 0 | 3 | **AI Overview**, Thumbnail, Shopping |
| `buy iptv subscription` | 100 | 0 | 1 | **AI Overview**, Thumbnail |
| `iptv providers uk` | 500 | 12 | 1 | **AI Overview**, Thumbnail, PAA |
| `iptv services` | 400 | 28 | 1 | **AI Overview**, Thumbnail, PAA, Video, Sitelinks |
| `best iptv uk` | 2400 | 0 | 3 | **AI Overview**, Thumbnail, PAA, Video |
| `iptv` | 39000 | 49 | 1 | **AI Overview**, Thumbnail, PAA, Video |
| `iptv uk` | 7200 | 40 | 1 | PAA, Video — no AI Overview |
| `best iptv` | 4700 | 33 | 2 | PAA, Video, Sitelinks, Image pack — no AI Overview |

### ✅ Thesis confirmed — with two corrections

**Confirmed:** `iptv subscriptions` genuinely has **no AI Overview** while every `... subscription uk` / `uk ... subscription` / `cheap ...` / `buy ...` variant does. The brief's reason for planting the flag on the plural is correct and is the strongest single strategic finding in this dataset.

**⚠️ Correction 1 — the plural family is NOT uniformly AIO-free.** `uk iptv subscriptions` (plural, vol 40, KD 33) **does carry an AI Overview**, plus Thumbnail and Video. The brief's SERP-feature table lists only singular variants under AIO and implies the plural is clean across the board. It is not. The AIO-free plural terms are exactly three: `iptv subscriptions`, `iptv subscriptions uk`, `best iptv subscriptions`.

**⚠️ Correction 2 — RESOLVED, see below.** The content-gap file shows `iptv subscription` (singular) at 2,800 volume, KD 7, with an **empty** SERP-features cell. I initially read that as a genuinely clean SERP and argued it deserved co-primary billing. **That reading was wrong on two counts and is withdrawn.**

**Authoritative figures for `iptv subscription` (live Keywords Explorer, supplied 2026-08-22, updated 8 days prior):**

| KD | SV | GSV | TP | CPC | CPS | Parent | SF |
|---|---|---|---|---|---|---|---|
| **50** | **2.4K** | **16K** | **19K** | $0.45 | 1.76 | iptv | **4** |

The KD 7 / blank-features row is a **stale cell in the export, not a clean SERP** — every neighbouring row carries rich features. Verified: only **5 of 270 rows** have a blank SERP-features cell, and just two carry meaningful volume (`iptv subscription` 2,800 and `iptv 12 months` 40). The export gap is isolated and identifiable.

**This does not weaken the plural flag — and there was never a trade-off to weigh.** `iptv subscriptions` contains `iptv subscription` as an exact substring, and Google stems singular and plural into one term family regardless. **A title carrying the plural carries the singular verbatim; nothing is left unclaimed.** Combined with the fact that it is the same page and the same competitor to beat either way, the decision is free.

**Ruling carried into Phase 2: the plural is the sole flag — title and H1. The singular will appear naturally in the meta description, the H2s and the body without being engineered in.**

**Reliability check on the AIO analysis.** Because the blank cells are unreliable, the AIO counts are restated over the 265 populated rows: **129 of 265 (49%) carry an AI Overview, absorbing 60,240 of 82,030 volume (73%).** All five AIO-free keywords the strategy depends on — `iptv subscriptions`, `iptv subscriptions uk`, `best iptv subscriptions`, `best iptv subscription`, `best iptv subscription uk` — have **populated** cells. The plural thesis rests on read data, not on absence of data.

---

## 3. Architecture — the ruling is proven, not asserted

Source: content-gap CSV, URL columns.

| Site | Keywords ranked (of 270) | Distinct URLs | Organic traffic across these 270 |
|---|---|---|---|
| **televo.uk** | **253** | **1** | **20,565** |
| apollotv.uk | 95 | 6 | 5,692 |
| iptv-subscription.co.uk | 6 | 1 | 863 |
| **iptv-subscription-uk-4k.com** | **0** | **0** | **0** |

**televo.uk ranks for 253 of 270 keywords — 94% of the entire competitive keyword set — with exactly one URL: `https://televo.uk/`.** Not a silo, not a cluster, not a hub-and-spoke. One homepage.

ApolloTV repeats the pattern: 77 of its 95 keywords sit on `https://apollotv.uk/`. Its other five URLs are genuinely separate intents — `/reseller/` (8 kws, B2B), `/blog/best-iptv-players-uk/` (7), `/blog/best-iptv-box-uk-guide/`, `/blog/iptv-on-stremio-uk-guide/`, `/setup-guide/`. **No commercial sub-page competes with its homepage.** That is Hard Rule 1 and Hard Rule 4, observed in the wild by the #2 competitor.

**The cocon-sémantique rejection is correct** and this table is the evidence for it. Building five silos would be building an architecture that no site winning this SERP uses.

### Keyword overlap matrix
Source: `..._common-keywords_s_...csv`.

|  | us | televo | installation-guides | apollotv |
|---|---|---|---|---|
| **iptv-subscription-uk-4k.com** | — | **0** | **0** | **0** |
| televo.uk | 0 | — | 6 | 79 |
| iptv-subscription.co.uk/installation-guides/ | 0 | 6 | — | 5 |
| apollotv.uk | 0 | 79 | 5 | — |

**We share zero keywords with all three competitors.** They share 79, 6 and 5 with each other. We are not in the competitive set at all.

---

## 4. Our position — measured

### Ahrefs performance history
Source: `..._perf_2026-08-21_22-19-27.csv`, monthly 2015-06 → 2026-08.

**Organic traffic: 0 in every month on record. Organic positions 1–3: 0. Positions 4–10: 0. Positions 51+: 0. Branded organic traffic: 0.** There is no month in the file where any of these is non-zero.

Referring domains by month: `0` through 2026-03, then **36 (Apr) → 148 (May) → 253 (Jun) → 416 (Jul) → 481 (Aug)**.

### Google Search Console — trailing 12 months to 2026-08-19
Source: `...Performance-on-Search-2026-08-21.zip`.

| Cut | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| **Total (Devices: Ordinateur)** | **0** | **27** | 0% | **37.15** |
| United Kingdom | 0 | **21** | 0% | **43.52** |
| United States | 0 | 4 | 0% | 21.75 |
| Morocco | 0 | 2 | 0% | 1.00 |

**Zero mobile impressions in twelve months** — the device file contains a single row, `Ordinateur`. Every impression this site has ever received was desktop.

**Top queries (all of them — the file has four rows):**

| Query | Clicks | Impr | Position |
|---|---|---|---|
| `#iptvsubscriptionuk` | 0 | 10 | 35.5 |
| `4k iptv subscription uk` | 0 | 6 | 62 |
| `iptv renewal` | 0 | 1 | 41 |
| `how to buy iptv subscription` | 0 | 1 | 53 |

The single highest-impression query is a **hashtag**, `#iptvsubscriptionuk` — social-copy residue, not search demand. Nothing in the target family appears.

**Top pages:**

| Page | Impr | Position |
|---|---|---|
| `/` | 18 | **40.5** |
| `/blog` | 6 | 21.17 |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | 3 | 30.33 |
| **`/blog/whats-included-in-iptv-subscription-uk`** | 1 | **7** ← best position on the site |
| `/blog/how-to-buy-iptv-subscription-uk` | 1 | 53 |

**Confirmed: the site's best position (7) belongs to a blog post, not the money page**, which sits at 40.5. The brief's cannibalisation read is supported — though on 1 impression this is a weak signal, and I would not over-weight a single data point. The structural argument for de-commercialising that post stands on its own.

---

## 5. Indexation
Source: `...Coverage-*.zip` (4 files), data to 2026-08-17.

**Indexed: 6.** `/contact` (crawled 08-17), `/` (08-10), `/blog/iptv-subscription-renewal-cancellation-refund-uk` (07-17), `/blog/how-to-buy-iptv-subscription-uk` (07-17), `/blog/whats-included-in-iptv-subscription-uk` (07-17), `/blog` (07-07).

**Not indexed: 4 known problems.**

| Reason | Source | Pages |
|---|---|---|
| Page with redirect | Website | 3 |
| **Not found (404)** | Website | **1** |
| Discovered, currently not indexed | Google systems | 0 |

- The 3 redirects are `http://`, `http://www.`, `https://www.` — correct host canonicalisation, not a defect.
- **The single 404 is `https://iptv-subscription-uk-4k.com/iptv-subscription-uk`, last crawled 2026-08-06.** It first appears in the drilldown chart on **2026-07-25** and has been present every day since.

**Index growth:** 2 pages (May 25 → Jul 10) → **5** (Jul 11) → **6** (Jul 25). Non-indexed: 12 → 3 (Jun 2) → 4 (Jul 25).

**⚠️ Sitemap count — brief says 13, live serves 12.** `src/app/sitemap.ts` emits 8 static + 5 blog = **13**. The **deployed** `sitemap.xml` contains **12** — it is missing `/editorial-policy`, because the commit that added that route is not deployed (§9). Both numbers in circulation are correct; they describe different things. Indexation is therefore **6 of 12 live / 6 of 13 intended**.

**Never indexed, and both are the thin posts:** `/blog/best-iptv-uk-guide-2026` and `/blog/how-to-setup-iptv-firestick`. Also unindexed: `/terms`, `/privacy`, `/dmca`, `/refund`.

---

## 6. Backlinks
Source: `..._perf_...csv` (refdomain history) + `docs/FULL-AUDIT-REPORT-N2.md`.

481 referring domains as of 2026-08 (Ahrefs perf export), from zero in March. N2 recorded 487 live / 927 backlinks / **DR 0.0** / **exactly 1 domain not flagged as spam** (`seogeko.shop`, DR 29, traffic 0, nofollow — itself an SEO vendor).

Anchor text is backlink-vendor advertising copy. The largest anchor, on 266 referring domains and 476 links, reads *"Boost Rankings & Massive Traffic | High DR & High Traffic SEO Backlinks for Casino, Crypto…"*. Approximately **10 links across 10 domains are dofollow**, on the anchor *"High Quality Dofollow Backlinks DA 50 PA 40 Premium PBN Network Service…"*.

**Per the brief: these were not bought. They are unsolicited vendor spam, Google discounts them automatically, and there is no manual action in Search Console. Recorded once, treated as low priority, not a blocker.**

The operative fact is not the 481 — it is that **~20 genuine referring domains are needed for the head term and we have 1**, and it is a link vendor.

---

## 7. The parasite post — what is copyable and what is not
Source: `indie_hacker_parasite_blog_post_content.txt`, 2,412 words, byline "RukhsarSeo", dated 16 June 2026.

### Structure — copyable
- **Title:** `Best IPTV UK 2026: Top 5 British IPTV Services Tested and Compared` — year + count + "tested and compared"
- **Question-shaped H2s:** *Why So Many Brits Are Switching…* · *How I Tested…* · *Which … Is Right for You?* · *How to Set Up Your IPTV Subscription on Firestick or Smart TV* · *Is IPTV Legal in the UK?* · *FAQ* · *Final Verdict*
- **Per-entry block with a differentiated superlative role** — best overall / best value / best for sport / best for on-demand / most flexible. No two entries compete for the same crown.
- **Price anchoring against traditional TV:** "£70–£90 a month" vs "£5–£15 a month"
- **Concrete technical specificity that reads as first-hand:** TiviMate bitrate overlay to detect upscaled 1080p; 16 Mbps HD / 25 Mbps 4K; M3U playlist vs Xtream Codes; ethernet over wifi; testing between 8pm–11pm for peak load
- **A decision-matrix paragraph** ("Which is right for you?") that restates each pick in one clause
- **6-question FAQ** using real PAA-shaped questions
- **A legality section** that answers the question honestly rather than dodging it

### Fabrication — NOT copyable (Hard Rule 5)
- *"I spent more than 500 hours testing twelve different British IPTV services"*
- *"a Trustpilot rating of 4.8 out of 5"* — invented
- *"a guaranteed 99.9% server uptime"* — invented
- *"I actually subscribed to and used every service in this guide"* — the five "brands" (OREXETV, NEXOMIR, TVOXAR, VISSOLOTV, TVZITAM) have no independent existence
- *"All five offer a free trial"*

**Tell worth recording:** VISSOLOTV is described as having *"close to 198,000 films and series"* — **our exact canonical figure**. The five shells and this site's copy appear to share a supplier template. That is a duplicate-content and footprint risk worth watching, and a reason our rewrite must not paraphrase any of this.

**Attribution split.** The post ranks at position 3 on a third-party high-DR domain. What comes from the **host domain's authority** is the position itself — we cannot copy that. What comes from the **content format** is the structure list above — that we can. The brief's instruction to separate the two is the correct frame and Phase 1 will do it properly.

---

## 8. The `/installation-guides/` anomaly — with a finding that reframes it
Source: `...installation-guides_2026-08-21_22-22-25.csv`, `..._p_...csv`, `...-o_...csv`, `Links for …csv`.

| Keyword | Vol | Position | Traffic |
|---|---|---|---|
| **`iptv uk`** | **5,600** | **5** | **637** |
| `iptv trial uk` | 150 | 7 | 21 |
| `iptv service providers` | 150 | 6 | 18 |
| `iptv providers in uk` | 70 | 6 | 5 |
| `iptv subscription service` | 50 | 3 | 6 |
| `uk iptv services` | 40 | 3 | 5 |
| `iptv subscription in uk` | 0 | 1 | 0 (Pakistan) |

**⚠️ The anomaly is days old, not established.** From `...-o_...csv` (daily, 2024-08-21 → 2026-08-21), organic keywords in positions 1–3 were **0 every single day until 2026-08-20**, when they hit 1, then **3 on 2026-08-21**. Positions 4–10 went 1 → 2 → **4** over the same two days. The monthly file shows page traffic going from **0 in 2026-07 to 793 in 2026-08**, with 1 referring domain.

This is a **48-hour spike on a page with one referring domain**, not a durable position. Any lesson drawn from it must carry that caveat — it may well be a transient Google fluctuation that reverts. Phase 1 will treat it accordingly.

**Link profile of the page** (61 links: 57 internal, 4 external):

| Target | Links | Anchor |
|---|---|---|
| `/installation-guides/` (itself) | **28** | "Setup Guide" ×27 |
| `/` | 3 | "Home" ×2, 1 image |
| `/subscriptions/` | 3+2 | "Subscription Plans", "View Subscription Plans", "IPTV subscription" |
| `/billing/…` store URLs | 4 | "Buy Now" ×3, "Buy now" ×2 |
| `/blog/`, `/about-us-2/`, `/contact-us/` | 3 each | nav |
| `wa.me` (external) | 3 | "Chat on WhatsApp", "Send us a message" |
| `dmca.com` badge (external) | 1 | image |

Two things stand out: the page is **massively self-linking** (28 of 57 internal links point at itself, one per device section — it is a device hub with anchor navigation), and it carries **hard commercial CTAs inline** ("Buy Now" ×5, "Claim Your Free Trial"). It is an informational URL doing commercial work — the opposite of the separation Hard Rule 4 imposes on us. Whether that is *why* it ranks or merely *what it does* is a Phase 1 question, and the 48-hour age makes any causal claim weak.

---

## 9. Already fixed on `main`, awaiting deploy — do not redo

**Production is at `eff6938`. `main` is at `41c2061`.**

**⚠️ Correction:** that is **one commit**, not fifteen. `git rev-list --count HEAD` = 29 total commits; `git log eff6938..HEAD` returns exactly one. The "15" is the **file count** in that commit (15 files, 988 insertions). Nothing else is pending.

### Deploying alone fixes these — I will not touch them

| Item | Evidence it is fixed on `main` |
|---|---|
| Nav missing Blog + Contact | `constants.ts:29-35` — `Home / Pricing / Blog / FAQ / Contact`. Live renders `Home / Why Us / Pricing / FAQ` |
| `/editorial-policy` returns 404 | `src/app/editorial-policy/page.tsx` exists (204 lines), added in `41c2061` |
| Sitemap missing `/editorial-policy`, stale `lastmod` | `sitemap.ts:10-19` sets 2026-07-31 and includes the route; live serves 2026-07-17 and 12 URLs |
| **Homepage stats render `0+` to non-JS crawlers** | `StatsBar.tsx` now initialises state to the final value — *"Crawlers and LLM extractors read the SSR markup… starting at `0+` hid the headline stats from them"* |
| Homepage title 48 → 46 chars | `page.tsx` — `IPTV Subscription UK — 4K UHD From £5.85/month` |
| Homepage meta description 150 → 119 chars | `page.tsx` |
| **`Article` schema is minimal** | Already rich on `main`: `wordCount`, `articleSection`, `keywords`, `inLanguage: "en-GB"`, `image`, `publishingPrinciples → /editorial-policy`, `isAccessibleForFree`, `about`, plus a **3-level `BreadcrumbList`** (`blog/[slug]/page.tsx:225-266`) |
| `llms.txt` updates | modified in `41c2061` |
| Extra-connection price | fixed in `41c2061` |

**N2 correction:** `docs/FULL-AUDIT-REPORT-N2.md` lists "Article is minimal — no `image`, no `inLanguage`, no `BreadcrumbList`" as an open Medium finding. That was measured against **production** and is **stale relative to `main`**. It is already done.

### Still broken on `main` — these are genuinely mine (Track B)

| Item | Location | State on `main` |
|---|---|---|
| Dead link `/iptv-subscription-uk` | `src/app/not-found.tsx:31` | still present |
| FAQ promises a non-existent "Guide page" | `constants.ts:250` | still present, and in `FAQPage` JSON-LD |
| `readTime: "13 min read"` on both thin posts | `constants.ts:387`, `:403` | still wrong (601 w and 472 w) |
| Blog titles render 88–92 chars | `layout.tsx:27` template `"%s \| IPTV Subscription UK 4K"` + titles of 63–67 chars | template unchanged |
| `/blog` H1 `&amp;` spacing | `blog/BlogContent.tsx:84-86` — `IPTV UK Guides &` / `Streaming Tips` in separate spans | still broken |
| `Product` schema: no `priceValidUntil`, no `hasMerchantReturnPolicy` | `src/app/page.tsx` | absent — grep returns nothing repo-wide |
| `/blog` has no `Blog`/`CollectionPage`/`ItemList` | `src/app/blog/page.tsx` | no JSON-LD at all |
| `/contact` has no `ContactPage` | `src/app/contact/page.tsx` | no JSON-LD at all |
| `CONTACT_EMAIL` on a foreign domain | `constants.ts:5` — `contact@buy-iptv-uk.com` | unchanged (propose, do not silently change) |
| Legal pages absorb as much internal link equity as `/` | Footer/layout | unchanged |
| Single self-referencing `hreflang` | `src/app/page.tsx:29` | unchanged |
| 266 KB JS; framer-motion 71 KB | `HeroSection`, `DevicesSection`, `PromoBanner` | still client components |

### Not mine at all — dashboard actions for you
Cloudflare Managed Response Headers duplicating `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy`; Cloudflare Email Obfuscation making the contact address unreadable to every crawler; the ~10-domain dofollow disavow (low priority).

---

## 10. Data conflicts on the record

| # | Conflict | Sources | Resolution |
|---|---|---|---|
| 1 | `iptv subscriptions` volume: **250** vs **200** | KE screenshot (upd. 3 Aug) vs content-gap CSV (upd. 2026-08-13) | Both UK. Different snapshots. Use **250** as headline (brief's ground truth), **200** when quoting the gap file. Strategy unaffected. |
| 2 | `iptv subscription` KD **7 / no SERP features** vs **KD 50 / SF 4** | content-gap CSV vs live Keywords Explorer | **RESOLVED in favour of the live figures: KD 50, SV 2.4K, GSV 16K, TP 19K, CPC $0.45, CPS 1.76, parent `iptv`, SF 4.** The CSV cell is a stale export gap — only 5 of 270 rows are blank and every neighbouring row carries rich features. No live lookup performed or needed; figures supplied 2026-08-22. See §2 Correction 2. |
| 3 | Parent topic `iptv`: **33K** vs **39,000** | KE screenshot vs content-gap CSV | Snapshot timing. Immaterial. |
| 4 | `iptv uk`: **7.2K** (brief) / **7,200** (content-gap) vs **5.6K** (KE "also rank for") vs **5,600** (competitor file) | four sources | The 7,200 and 5,600 figures come from different export dates. Immaterial to strategy; quote the source when using either. |
| 5 | Sitemap **13** vs **12** URLs | `sitemap.ts` vs live `sitemap.xml` | Both correct — repo vs production. See §5. |
| 6 | `main` is **15 commits** ahead | your message vs `git log` | **One commit**, 15 files, 988 insertions. |
| 7 | `how-to-setup-iptv-firestick` **~350 w** vs **472 w** | brief vs N2 measurement | N2's 472 measured from rendered HTML. Use **472**. |
| 8 | Dead-link line number **31** vs **33** | brief vs my N2 report | Brief is right: `not-found.tsx:31`. N2 said 33. **N2 was wrong**; corrected here. |
| 9 | `best-iptv-uk-guide-2026` readTime **"12 min"** vs **"13 min"** | brief vs `constants.ts:387` | Source of truth is the file: **"13 min read"**. |

---

## 11. Baseline to preserve

Recorded so the next audit has a comparison point. **Date: 2026-08-22.**

| Metric | Value | Source |
|---|---|---|
| GSC clicks, 12 months | **0** | Performance export |
| GSC impressions, 12 months | **27** (UK 21) | Performance export |
| GSC impressions, 28-day | **~5** | Graphique.csv, 2026-07-25 → 08-19 |
| GSC average position | **37.15** (UK 43.52) | Devices / Pays |
| Mobile impressions, 12 months | **0** | Appareils.csv — desktop only |
| Indexed pages | **6 of 12 live** (6 of 13 intended) | Coverage-Valid |
| GSC 404 errors | **1** (`/iptv-subscription-uk`) | Coverage drilldown |
| Ahrefs DR | **0.0** | N2 |
| Referring domains | **481** (perf export) / 487 (N2) | perf CSV |
| Non-spam referring domains | **1** | N2 |
| Organic keywords | **0** | perf CSV + content gap |
| Organic traffic | **0**, every month on record | perf CSV |
| Keywords shared with any competitor | **0** | common-keywords matrix |
| Best position on site | **7**, `/blog/whats-included-…` (1 impression) | Pages.csv |
| Money page position | **40.5** (18 impressions) | Pages.csv |

**Expected trajectory if the technical work ships:** indexation reaches 10–12 of 13 within 30 days; the 404 clears within a week. **Clicks and DR will not move on that timescale.** No deliverable produced in later phases may promise otherwise.

---

## 12. Hard Rules compliance — Phase 0

| # | Rule | Status |
|---|---|---|
| 1 | One money page | No pages proposed in Phase 0 |
| 2 | Cluster not phrase | §2–§3 establish the cluster; recorded |
| 3 | No keyword stuffing | No copy written |
| 4 | Non-commercial intent on other pages | §8 records the competitor's contrary practice as observation, not endorsement |
| 5 | Never fabricate | §7 separates the parasite's structure from its invented claims; every figure here is traced |
| 6 | DMCA discipline | Broadcaster names appear only in quoted competitor copy, clearly attributed |
| 7 | No deletion without 301 | Nothing deleted |
| 8 | One set of numbers | Canonical table not yet applied; conflicts logged in §10 rather than silently resolved |
| 9 | Never touch `new-modern-landing-page` | Not opened in Phase 0 |
| 10 | Nothing goes live | No commits, no push, no deploy. Only `docs/EVIDENCE-BASE.md` written |
| 11 | Evidence or silence | `NO DATA` and `⚠️` markers used throughout; §10 logs every conflict |
