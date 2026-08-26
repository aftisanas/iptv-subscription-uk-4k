# ARCHITECTURE — URL inventory, link plan, outline, titles

Phase 2, 2026-08-22. Builds on `EVIDENCE-BASE.md` and `DIAGNOSIS.md`. **No body copy written — this is the outline for approval.**

**Governing principle, adopted from your Phase 1 correction:** *copy what works for a site in our position, not what a dominant incumbent gets away with.* Televo can run a keyword-free H1 because 253 rankings already establish its relevance. At DR 0 with zero rankings we must earn every relevance signal explicitly. **Every title option and the H1 carry the exact plural.**

---

## 1. Verified URL inventory

Verified against the GSC Coverage export (`Coverage-Valid`, drilldowns) and `sitemap.ts`. Where my reading differs from the brief's table, the row is flagged.

| URL | GSC status | Decision | Track | Rationale |
|---|---|---|---|---|
| `/` | indexed, pos 40.5, 18 impr | **REWRITE** — all 12 sections | **A** | the money page; sole commercial URL |
| `/blog` | indexed, pos 21.17, 6 impr | **KEEP** + add `CollectionPage`+`ItemList`, fix H1 `&` bug, shorten title (99→≤60) | B | hub; must link up to `/` |
| `/blog/whats-included-in-iptv-subscription-uk` | indexed, **pos 7** | **REWRITE — de-commercialise** | **A** | best position on the site; strip commercial intent, keep informational, link up |
| `/blog/how-to-buy-iptv-subscription-uk` | indexed, pos 53 | **REWRITE** | **A** | must not compete for `buy iptv subscription` — that term belongs to `/` |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | indexed, pos 30.33 | **REWRITE + strengthen** | **A** | genuinely informational; consumer-rights depth is our best link asset |
| `/blog/best-iptv-uk-guide-2026` | **not indexed**, 601 w | **DELETE + 301 → `/blog/how-to-buy-iptv-subscription-uk`** | **B** | thin, unindexed, targets a commercial term `/` wants. **N2 target adopted over the brief's `→ /`**: blog→blog is topically coherent; blog→homepage risks reading as an irrelevant redirect. Zero equity at stake either way |
| `/blog/how-to-setup-iptv-firestick` | **not indexed**, **472 w** | **REWRITE to 1,800–2,500 w** | **A** | salvageable — supports `iptv subscriptions for firestick` and feeds the Devices section. Not unsalvageable, so not deleted |
| `/contact` | indexed | **KEEP** + `ContactPage` schema, title 80→≤60, desc 225→≤160 | B | E-E-A-T |
| `/terms` `/privacy` `/dmca` `/refund` | not indexed | **KEEP ALL** | B | E-E-A-T for a paid service; removal would hurt. Non-indexation is normal for boilerplate legal pages and is **not** a defect to chase |
| `/editorial-policy` | **404 in production**, exists on `main` | **KEEP — ships on your deploy** | you | already built (204 lines); becomes the E-E-A-T anchor `Article.publishingPrinciples` already points at |
| `/iptv-subscription-uk` | **404**, crawled 2026-08-06 | **fix `not-found.tsx:31` → `/#pricing`**; **no 301 needed** | **B** | ⚠️ see note |

**⚠️ Two corrections to the brief's inventory.**

**(a) `/iptv-subscription-uk` needs no redirect.** The brief says "fix `not-found.tsx:31` + **301 → `/`**". A 301 would be wrong here: the URL has **never existed**, was never indexed, and holds zero equity. Its only inbound link is our own 404 page. Adding a permanent redirect for a URL that never resolved creates a phantom route that implies it once had meaning, and Hard Rule 1 forbids ever creating `/iptv-subscription-uk` as a real page. **Fixing the dead link removes the only thing generating the crawl. A bare 404 is the correct terminal state**, and Hard Rule 7 ("no deletion without a 301") does not apply because nothing is being deleted. If you prefer the redirect anyway, say so and I'll add it — but I'd be adding it against the evidence.

**(b) Indexation target should be 8–10, not 10–12.** The four legal pages are boilerplate and Google routinely declines to index them; that is not a fault. Realistic post-deploy target: `/`, `/blog`, `/contact`, `/editorial-policy` and 4 blog posts = **8 of 12** URLs (after the one deletion), with the legal four as a bonus. I flagged 10–12 in `ACTION-PLAN-N2.md`; **that was too optimistic and I'm revising it down.**

**Final URL count after Phase 4:** 12 (8 static incl. `/editorial-policy`, 4 blog posts).

---

## 2. Page × primary-intent — non-overlap proof

Hard Rules 1 and 4. **No two URLs share a primary intent, and only `/` carries commercial intent.**

| URL | Primary intent | Intent class | Head term owned | Explicitly does NOT target |
|---|---|---|---|---|
| `/` | *I want to buy an IPTV subscription* | **Commercial / Transactional** | **`iptv subscriptions`** + full commercial family | — |
| `/blog` | *Show me the guides* | Navigational | none | no commercial terms |
| `/blog/whats-included-in-iptv-subscription-uk` | *What does a subscription contain?* | **Informational — definitional** | `what's included in an iptv subscription` | ⚠️ must lose its current commercial framing |
| `/blog/how-to-buy-iptv-subscription-uk` | *What is the safe buying process?* | **Informational — procedural** | `how to buy an iptv subscription` (process) | **must NOT target `buy iptv subscription`** — that is `/`'s engine term |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | *What are my rights after buying?* | **Informational — consumer rights** | cancellation / refund / cooling-off | no acquisition intent |
| `/blog/how-to-setup-iptv-firestick` | *How do I install it on a Fire Stick?* | **Informational — technical** | `iptv subscriptions for firestick` (setup) | no purchase framing |
| `/contact` | *How do I reach support?* | Navigational / support | none | — |
| `/editorial-policy` | *Who writes this and how?* | Trust / E-E-A-T | none | — |
| `/terms` `/privacy` `/dmca` `/refund` | Legal disclosure | Trust | none | — |

**The one real cannibalisation risk, named:** `/blog/how-to-buy-iptv-subscription-uk` vs `/`'s engine term `buy iptv subscription` (KD 0, vol 100). The separation is **process vs purchase**: the post teaches *how to evaluate and pay safely for any operator* and never presents our checkout; `/` owns the transaction. The post's CTA links to `/` with a navigational anchor, not a commercial one (§3).

**Second, milder risk:** `/blog/whats-included-…` currently holds position 7 while `/` sits at 40.5. On one impression this is weak evidence, as noted in Phase 1 — but the structural fix (de-commercialise, link up) is correct regardless of what that single data point means.

---

## 3. Internal link plan

### The measured problem

| Target | Inbound unique pages (N2) | Televo equivalent |
|---|---|---|
| `/` | 14 | 5 self-links |
| **each legal page** | **14** | **3 legal links total on the page** |
| `/blog` | 6 | — |
| `/contact` | 4 | — |
| individual posts | 1–3 | — |

**An honest mechanic first.** The legal pages score 14 because they sit in a global footer rendered on all 14 pages. **Compacting them into one row does not reduce that count — it stays one link per page.** What compaction changes is *prominence and link position*, which carries real weight; what changes the *ratio* is adding `/`-directed contextual links. I'd rather say that plainly than imply a footer tweak alone rebalances PageRank.

### The plan

1. **Legal → one compact footer row.** Four links (`Terms · Privacy · DMCA · Refund`) on a single line in the footer's lowest tier, not a headed column. Count stays 12 per page; visual and positional weight drops sharply.
2. **`/editorial-policy` joins that row** — 5 links, still one row.
3. **Every blog post gains 2 contextual in-body links to `/`** — one mid-body, one in the closing paragraph, both descriptive.
4. **Every blog post keeps 1–2 sibling links** to a topically adjacent post (already partly present).
5. **Header logo → `/`** on all pages (existing). **Nav `Home` → `/`** (ships with your deploy).
6. **`/blog` index gains an intro paragraph** with one contextual link to `/`.
7. **404 CTA → `/#pricing`** (replaces the dead link).

**Result:** `/` inbound rises from 14 to **~28 link-slots**, roughly half of them descriptive rather than navigational, while legal drops from a headed column to a single de-emphasised row.

### Anchor distribution into `/`

Internal anchors carry less over-optimisation risk than external ones, but exact-match repetition at scale is still a pattern. Target distribution:

| Class | Share | Count | Anchors |
|---|---|---|---|
| **Branded / navigational** | ~40% | 11 | `IPTV Subscription UK 4K` · `Home` · logo (image, `alt="IPTV Subscription UK 4K"`) |
| **Partial-match descriptive** | ~35% | 10 | `our IPTV subscription plans` · `UK IPTV subscription plans` · `see what's included in a subscription` · `compare subscription terms` · `IPTV subscription pricing` |
| **Exact-match** | ~14% | 4 | `IPTV subscriptions` — **maximum four occurrences site-wide**, one per blog post |
| **Generic** | ~11% | 3 | `pricing` · `view plans` · `back to plans` |

**Per-page assignment:**

| Source page | Position | Anchor | Class |
|---|---|---|---|
| `/blog/whats-included-…` | mid-body | `our IPTV subscription plans` | partial |
| `/blog/whats-included-…` | closing | `IPTV subscriptions` | **exact** |
| `/blog/how-to-buy-…` | mid-body | `compare subscription terms` | partial |
| `/blog/how-to-buy-…` | closing | `IPTV subscriptions` | **exact** |
| `/blog/renewal-cancellation-refund-…` | mid-body | `IPTV subscription pricing` | partial |
| `/blog/renewal-cancellation-refund-…` | closing | `IPTV subscriptions` | **exact** |
| `/blog/how-to-setup-iptv-firestick` | mid-body | `see what's included in a subscription` | partial |
| `/blog/how-to-setup-iptv-firestick` | closing | `IPTV subscriptions` | **exact** |
| `/blog` | intro | `UK IPTV subscription plans` | partial |
| `/contact` | body | `view plans` | generic |
| `/editorial-policy` | body | `IPTV Subscription UK 4K` | branded |
| all 12 pages | header logo | image alt | branded |
| all 12 pages | nav `Home` | `Home` | branded |
| `/404` | CTA | `pricing` | generic |

**Rule for Phase 3:** never two exact-match anchors on one page, and never an exact-match anchor above the fold.

---

## 4. Flag vs engine — which section owns which term

**The flag wins nothing in 30–45 days.** `iptv subscriptions` requires beating televo, which requires links. **The engine terms sit on different, weaker SERPs and do not require beating televo** — they are what produces Checkpoint 1.

### Flag — title, H1, first 100 words only

| Term | KD | Vol | SERP features |
|---|---|---|---|
| **`iptv subscriptions`** | 18 | 250 | PAA, Sitelinks — **no AI Overview** |

### Engine — the Checkpoint 1 terms

| Term | KD | Vol | AIO? | Section that owns it |
|---|---|---|---|---|
| `iptv subscriptions uk` | **4** | 60–70 | no | Hero + Statement (secondary) |
| `uk iptv subscription` | **4** | 350 | yes | Overview |
| `buy iptv subscription` | **0** | 100 | yes | Closing CTA |
| `cheap iptv subscription` | **0** | 150 | yes | Pricing |
| `best iptv subscription` | 9 | 250 | no | Why Choose Us |
| `best iptv subscription uk` | 12 | 100 | no | Why Choose Us |
| `best iptv subscriptions` | 15 | 20 | no | Why Choose Us |
| `iptv subscriptions for firestick` | N/A | 10 | — | Devices |
| `are iptv subscriptions legal` / `illegal` | N/A | 10 + 10 | — | **Legality block** |
| `how to install iptv subscriptions` | N/A | 0–10 | — | Overview → steps |
| `iptv subscription service` / `iptv services uk` | 6 | 50–100 | no | Key Features |

**Word-order ruling (your point 2, from finding #3):** `iptv subscriptions uk` is **KD 4**; `uk iptv subscriptions` is **KD 33** at comparable volume and carries an AI Overview. **Always write "IPTV Subscriptions UK", never "UK IPTV Subscriptions".** This applies to the title, H1, H2s and body throughout.

---

## 5. H1 → H4 outline

Mapped to the design's 12 rendered sections. **Slot counts verified against the real data files — five differ from the brief's table and the verified number governs.**

| Section | Brief said | **Verified (corrected 2026-08-22)** |
|---|---|---|
| Metrics | 4 | **4** ✓ |
| Key Features | 15 (4 emphasis) | **15 (4 emphasis)** ✓ |
| Comparison rows | 15 | **15** ✓ |
| Devices | 12 | **12** ✓ |
| FAQ | 10 | **12** |
| Reviews | 3 | **3** ✓ |
| Why Choose Us | 3 | **3** ✓ |
| Overview pillars / includes / steps | 5 / 5 / 4 | **5 / 5 / 4** ✓ |
| Pricing | 2 tiers × plans | **2 × 4 = 8 price points** |

**⚠️ Correction.** An earlier revision of this table claimed 17 comparison rows, 13 FAQ items, 4 reviews and 4 advantages. Those were wrong: the count grepped field names and caught the `export type` definition blocks as if they were array entries. Re-verified by enumerating actual array members with type blocks stripped. **Only the FAQ count (12, not the brief's 10) differs from the brief.** Writing to a wrong count would have dropped content silently at integration.

### Additional contamination proof found during the recount

Enumerating the arrays surfaced two exact matches with televo's live page beyond those in `DIAGNOSIS.md` §0:

**`why-choose-us.ts` advantages — all three, verbatim, in televo's order:**

| Design | televo.uk live H3s |
|---|---|
| `Instant Automated Delivery` | `INSTANT AUTOMATED DELIVERY` |
| `Built-in VPN & Anti-Block` | `BUILT-IN VPN & ANTI-BLOCK` |
| `Zero Auto-Billing` | `ZERO AUTO-BILLING` |

**`faq.ts` — the design's 12 questions are televo's first 12 FAQ questions, in identical order** (televo has 13; the design drops *"Can I watch UK sports with IPTV UK?"*).

This raises the copy from "Overview and Pricing derived from televo" to **Overview, Pricing, Why Choose Us and FAQ all derived from televo**. Four of twelve sections. The from-scratch rewrite rule is not optional.

**Consequence worth noting:** `Zero Auto-Billing` already occupies advantage slot #3, so the differentiator has structural real estate — but the phrasing is televo's and must be rewritten, not reused. Ours is also the stronger claim: televo runs recurring checkout and still markets "zero auto-billing"; we take one-time WhatsApp payments with no stored card.

---

### 1 — Hero → `hero-content.ts` · **H1**
**Flag:** `iptv subscriptions` · **Engine:** `iptv subscriptions uk`
- `brand.name`, `nav.links[1–4]`, `nav.cta`, `rail.left`, `rail.right`
- `eyebrow` · `headline.lead` / `.tail` / `.accent` — **H1 carries the exact plural**
- `lede` — **the first 100 words live here; exact target + "what is this page"**
- `devices.alt`
- `offer.label`, `.headline`, `.assurance`, `.endsInLabel`, `.primary`, `.secondary`, `.trustLabel`, `.marks[1–4]`
- ⚠️ `offer.endsInLabel` is driven by `OFFER.endsAt: null` → permanent fake countdown. **Recommend removing the countdown** unless you supply a real deadline.

### 2 — Metrics strip → `metrics.ts` · no heading
4 metrics: `37,000+` Live Channels · `198,000+` Films & Series · `4K UHD` Native Streaming · **`£5.85/mo` From, 24-Month Plan** (design says `£4.17/mo` — wrong).
- ⚠️ **`countTo` reproduces the `0+` SSR bug we just fixed.** The file comment says the number "counts up from 0". At integration, `display` must be the SSR-rendered value with the animation starting after hydration — exactly the `StatsBar.tsx` fix on `main`. Otherwise every non-JS AI crawler reads "0+ Live Channels" again. **Flagged for `00-INTEGRATION-GUIDE.md`.**

### 3 — Statement → `statement-content.ts` · **H2**
**Owns:** definitional / entity establishment. **Engine:** `iptv subscriptions uk`
- `headline` (H2) · `echo` · `body`
- Answers *what an IPTV subscription is* — completes the first-100-words passage AI surfaces extract.

### 4 — Pricing → `pricing.ts` · **H2**
**Engine:** `cheap iptv subscription` (KD 0)
- `eyebrow`, `title` (H2), `TIERS.standard.label` / `.premium.label`, `.tagline`
- 8 plan blocks: `term`, `note`, `was`, `save`, `savePct`, `price`, `cta`
- `features[]` per tier · `multiConnection` · `includedLabel` · `OFFER` block
- ⚠️ **`7-Day Money-Back Guarantee` ×2 → must become 30-Day.**
- ⚠️ **BLOCKING QUESTION — see §7.**

### 5 — Why Choose Us → `why-choose-us.ts` · **H2 + 3×H3**
**Engine:** `best iptv subscription` (KD 9), `best iptv subscription uk` (KD 12), `best iptv subscriptions` (KD 15)
- `heading` (H2) + **3** `advantages[]` (`icon`, `title` H3, `description`)
- **H3 #1 = No auto-billing** (design slot `billing`, currently televo's `Zero Auto-Billing` — rewrite from scratch). Verifiable: WhatsApp checkout, one-time payment, no card stored. Televo gives this an H3 and says "no auto" 8×; **we actually win on it and currently say nothing.**
- H3 #2 = 30-day money-back guarantee (replaces design slot `delivery`)
- H3 #3 = **Optional Secure Proxy, not a bundled VPN** (replaces design slot `vpn`, currently `Built-in VPN & Anti-Block`)

### 6 — Key Features → `features.ts` · **H2**
**Engine:** `iptv subscription service`, `iptv services uk`
- `eyebrow`, `title` (H2), `imageAlt`, **15** `KEY_FEATURES[].label` (**4** with `emphasis:true`)
- ⚠️ **Unfalsifiable-claims purge applies here** (§6).

### 7 — Comparison → `comparison.ts` · **H2**
**Owns:** comparison intent, featured-snippet bait
- `eyebrow`, `title` (H2), `columns.feature/.standard/.premium`, `premiumBadge`, `footnote`, **15** rows (`feature`, `standard`, `premium`, `differs`)
- A real HTML `<table>` — snippet-eligible. Depends on the §7 tier decision.

### 8 — Devices → `devices.ts` · **H2**
**Engine:** `iptv subscriptions for firestick`
- `eyebrow`, `title` (H2), `lede`, `note`, **12** `DEVICES[]` (`id`, `name`)
- Links to `/blog/how-to-setup-iptv-firestick`.

### 9 — Reviews → `reviews.ts` · **H2**
- `eyebrow`, `headlineTail` (H2), `lede`, `note`, **3** cards (`id`, `image`, `label`, `caption`)
- ⚠️ **`renewRate: "94%"` must not ship** — the file's own comment says it is not a measurement. Hard Rule 5.
- ⚠️ **BLOCKING QUESTION — see §7.**

### 10 — Overview → `overview.ts` · **H2 + 5×H3 + H4s** — the long-form semantic block
**Engine:** `uk iptv subscription` (KD 4, vol 350), `how to install iptv subscriptions`
- `eyebrow`, `title` (H2), `intro`, `pillarsLabel`
- **5 pillars** (H3): coverage · stability · **privacy** · devices · support — each with a `body[]`
  - ⚠️ pillar 3 is currently `built-in VPN`; must become the **optional Secure Proxy add-on** (N0 honesty position)
- `plans` block: `label`, `lede`, **4** `rows`, `includesLabel`, **5** `includes`
- `steps`: `label` + **4** `items` (H4) — owns `how to install iptv subscriptions`
- `closing`: `kicker`, `kickerBody`
- ⚠️ **`BRAND = "Televo"` ×11 — rewrite from scratch, never paraphrase** (`DIAGNOSIS.md` §0).

### 11 — Legality & Editorial Trust → **repurpose `manifesto-content.ts`** · **H2** — *new*
**Engine:** `are iptv subscriptions legal` (10) · `are iptv subscriptions illegal` (10)
**Your point 3.** `manifesto-content.ts` exists, is not rendered, and is currently agency filler ("Kryntix" ×3, "Start a project"). Its shape — `eyebrow`, `headline`, `lines[]`, `body`, `cta.primary`, `cta.secondary` — fits this block exactly.
- H2: *Is an IPTV subscription legal in the UK?*
- `lines[]`: the technology is lawful; legality turns on the operator's licensing; what a buyer should check
- `body`: our position, plainly stated — DMCA policy, no rights-holder claims, refund route
- `cta.primary` → `/editorial-policy` · `cta.secondary` → `/dmca`
- **Doubles as the E-E-A-T block we lack.** Televo and the parasite both answer legality; we answer it nowhere (Blocker #8). Hard Rule 6 observed throughout — no broadcaster named.

### 12 — Closing CTA → `closing-cta.ts` · **H2**
**Engine:** `buy iptv subscription` (KD 0)
- `badge`, `title` (H2), `body[]` (9 parts), `primary`, `secondary`, `note`
- ⚠️ `built-in VPN` ×1 → Secure Proxy.

### 13 — Footer → `footer.ts` · H2s
- `brand`, `lead`, **4** `columns` × 4 `links`, **3** `assurances`, **6** payment `marks`, `legal`, `copyright`, `note`
- ⚠️ `Kryntix` ×2. **Legal links → one compact row (§3).**

### Unrendered components — recommendation
- **`manifesto` → USE**, repurposed as §11 above. Justified: closes Blocker #8 and supplies the missing E-E-A-T block.
- **`showcase` → USE.** Its shape is a pure image gallery (`src`, `alt`, `w`, `h`) and it is the direct fix for **Blocker #6 — 2 images vs televo's 27**. Populate with genuine product screenshots (EPG view, channel grid, device UI). **If real screenshots cannot be produced, drop it** — placeholder or stock imagery would be a Hard Rule 5 problem.
- ⚠️ `public/marquee/channels/sky.webp` and `bbbbc.webp` are broadcaster logos. **Delete both** — Hard Rule 6, and this network has enforcement history.

---

## 6. Track B addition — unfalsifiable-claims purge

Your point 4. Every phrase our own N1 post calls *"unfalsifiable by design"*, with a checkable replacement.

| Location | Current | Problem | Replacement |
|---|---|---|---|
| `constants.ts:66` | **"Anti-Freeze Fast IPTV Technology"** (feature title) | named in our own post as unfalsifiable | *"Adaptive Bitrate Streaming"* — a real, nameable technique |
| `constants.ts` feature body | *"smart load balancing across UK servers"* | unverifiable | *"Streams adapt to your connection speed, so picture quality drops before playback does"* |
| `constants.ts:96` | **"Reliable IPTV Uptime You Can Trust"** | unmeasurable | *"What To Do If A Stream Fails"* → points at the refund window |
| `constants.ts` body | *"Our IPTV grid is monitored around the clock"* | unverifiable | *"Support answers via WhatsApp during UK hours"* — checkable |
| `constants.ts` body | *"If a server wobbles, your stream reroutes in seconds"* | invented mechanism + timing | remove |
| `constants.ts:262` FAQ | *"Our UK server grid and anti-freeze tech hold a clean 4K stream"* | same family | rewrite around the 30-day refund as the actual guarantee |
| `constants.ts:250` FAQ | *"The full line-up sits on the Guide page."* | **promises a page that does not exist**, and is in `FAQPage` JSON-LD | remove from both visible FAQ and schema |
| `constants.ts:387`, `:403` | `readTime: "13 min read"` on 601 w / 472 w posts | overstates by 4× | recompute from real word count |
| new design `pricing.ts` | `99.9` | invented uptime | remove |
| new design `reviews.ts` | `renewRate: "94%"` | not a measurement | remove |

**Principle carried from `DIAGNOSIS.md` §2:** specificity and fabrication are not the same thing. *"Test during Friday and Saturday 7–10pm and use your refund window"* is specific, useful and true. *"99.9% uptime"* is neither checkable nor necessary.

---

## 7. ✅ RESOLVED — decisions of record (approved 2026-08-22)

**(a) Two pricing tiers, or one?** The design ships **Standard + Premium × 4 terms = 8 price points**. Our canonical table has **one tier × 4**. The design's Standard ladder is nearly ours — `24.99 / 34.99 / 49.99 / 79.99` against canonical `25.99 / 35.99 / 49.99 / 79.99` (two exact, two £1 low). Its Premium ladder is invented, and its "was" values are **televo's Premium ladder** (`DIAGNOSIS.md` §0).

Three options:

1. **Collapse to one tier.** Fully truthful, matches canonical exactly. Cost: loses the Comparison section's `standard`/`premium` columns and the self-selection effect Phase 1 identified as doing real conversion work (finding ⑤).
2. **Two tiers from real SKUs** — *Standard* = the base plan; *Premium* = base + the add-ons we genuinely sell (`proxyPrice: 4.75`, `extraConnectionPrice: 7.25`, both already in `constants.ts`). **My recommendation:** keeps televo's proven two-column structure, every number stays true, and the Comparison table gets real `differs` rows. Needs your sign-off because it is a packaging decision, not a copy decision.
3. **Invent a Premium tier** — barred by Hard Rules 5 and 8. Listed only to rule out.

I cannot pick this myself: it changes what you sell.

**(b) Reviews — 4 cards, and what goes in them?** `reviews.ts` wants 4 review cards. **We have no reviews**, and N0 deleted the fabricated testimonials and the `aggregateRating` schema for exactly this reason. Options: (i) drop the section entirely; (ii) repurpose it as four non-review trust panels — 30-day guarantee, no auto-billing, WhatsApp support, DMCA policy — with no rating claims and no `Review` schema. **I recommend (ii).** I will not write invented reviews under any framing.

---

## 8. Three title options

All ≤60 chars, all carry the **exact plural**, all use the **`IPTV Subscriptions UK`** word order (KD 4, not the KD 33 inversion).

| # | Title | Chars | Differentiator | Engine terms picked up |
|---|---|---|---|---|
| **1** | `IPTV Subscriptions UK — 37,000 Channels, 30-Day Refund` | **54** | scale + risk reversal | `iptv subscriptions`, `iptv subscriptions uk` |
| **2** | `IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund` | **54** | **the differentiator televo cannot claim** | `iptv subscriptions`, `iptv subscriptions uk` |
| **3** | `Buy IPTV Subscriptions UK — 4K, 5 Screens, £5.85/month` | **54** | transactional + price entry | + `buy iptv subscription` (KD 0) |

**Recommendation: #2.**

Televo's title is *"IPTV UK - Best #1 IPTV Subscription UK - Premium VPN Integrated"* (63 chars, truncates). Options 1 and 3 compete on axes televo already owns — scale and price. **Option 2 competes on the one axis it cannot follow us onto**: televo runs recurring checkout; we take one-time WhatsApp payments with no stored card. It is verifiable, it is the category's top anxiety (televo says "no auto" 8× on its own page), and it differentiates the SERP snippet rather than blending into four near-identical provider titles.

**Fallback if you want volume over differentiation: #3** — it adds `buy iptv subscription` (KD 0), the single most winnable engine term.

### H1 options (title #2 assumed)

| # | H1 | Chars | Note |
|---|---|---|---|
| **1** | `UK IPTV Subscriptions, Paid Once. No Auto-Billing, Ever.` | 56 | ⚠️ uses the KD 33 word order — **not recommended** despite reading best |
| **2** | `IPTV Subscriptions For UK Homes, Without The Satellite Dish` | 59 | correct word order; substitution framing; agrees with title without repeating it |
| **3** | `IPTV Subscriptions Built For UK Homes — 37,000 Channels In 4K` | 61 | correct order but duplicates the title's number and runs 1 over |

**Recommendation: H1 #2.** Exact plural, front-loaded, correct word order, and it frames the purchase as a substitution for satellite — the move the parasite uses effectively and Hard Rule 6 permits, since "satellite dish" names no rights-holder.

---

## 9. Hard Rules compliance — Phase 2

| # | Rule | Status |
|---|---|---|
| 1 | One money page | `/` is the sole commercial URL (§2). `/iptv-subscription-uk` explicitly never created |
| 2 | Cluster not phrase | §4 assigns 11 terms across 12 sections |
| 3 | No keyword stuffing | Exact-match anchors capped at 4 site-wide; head term placed in title/H1/first-100 only |
| 4 | Distinct non-commercial intent elsewhere | §2 table; the one real risk named and resolved |
| 5 | Never fabricate | `renewRate` and `99.9` flagged for removal; §7(b) declines invented reviews; §6 purge |
| 6 | DMCA discipline | Broadcaster logos flagged for deletion; §11 names no rights-holder; "satellite dish" used as generic |
| 7 | No deletion without 301 | One deletion, with a 301 to a topically coherent target. §1(a) explains why the never-existed 404 is the exception |
| 8 | One set of numbers | Every wrong figure catalogued; §7(a) raised rather than decided |
| 9 | Never edit `new-modern-landing-page` | **Read-only.** Verified untouched after Phase 1 and Phase 2 |
| 10 | Nothing goes live | No commits, no push, no deploy. Working tree only |
| 11 | Evidence or silence | Slot-count corrections verified against real files; §7 raised as blocking rather than assumed |

---

## 10. Gate — CLEARED

**Approved 2026-08-22:**

| # | Decision |
|---|---|
| Title | **#2** — `IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund` (54) |
| H1 | **#2** — `IPTV Subscriptions For UK Homes, Without The Satellite Dish` (59) |
| `buy iptv subscription` | taken via the **Closing CTA H2**, not the title |
| Pricing | **Two tiers.** Standard = base plan. Premium = base + Secure Proxy (£4.75) + extra connection (£7.25) — both real SKUs in `constants.ts`. **Canonical prices £25.99 / £35.99 / £49.99 / £79.99 — never the design's £24.99 / £34.99.** Nothing invented |
| Reviews | **3 trust panels**, no `Review` schema, no rating claims. Structured to work either way pending confirmation that the three WhatsApp screenshots are genuine customer conversations; if genuine they may stay as redacted evidence. **UK DMCC Act 2024 explicitly bans fake reviews** — this is a legal line, not only a policy one |
| `/iptv-subscription-uk` | **No 301.** Fix `not-found.tsx:31` only |
| Indexation target | **8 of 12** accepted |
| Manifesto | **Approved** — becomes the legality + E-E-A-T block |
| Showcase | **Approved only if real screenshots exist.** Otherwise drop it and say so |
| Broadcaster logos | `sky.webp` and `bbbbc.webp` — **delete** |
| `metrics.ts` `countTo` | crawler-bug warning goes **prominently** in `00-INTEGRATION-GUIDE.md` — it would undo the `StatsBar.tsx` fix already on `main` |

**⚠️ Correction to §11 of this document.** I wrote that we "answer legality nowhere". That is true of the **live site**, not of the design — `faq.ts` item 10 is *"Is IPTV legal in the UK?"*. The Legality block still earns its place (an FAQ line is not an E-E-A-T section, and the two plural-family legality terms deserve real estate), but the gap was overstated and the FAQ item must be rewritten rather than treated as absent.

Phase 3 proceeds.
