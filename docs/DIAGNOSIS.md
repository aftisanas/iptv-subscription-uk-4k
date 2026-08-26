# DIAGNOSIS — why televo wins, why we don't

Phase 1, 2026-08-22. Builds on `docs/EVIDENCE-BASE.md`. No Ahrefs MCP used.

**Live fetches performed:** `https://televo.uk/` — 200, 443 KB, fully analysed. `https://apollotv.uk/` — **403, Cloudflare bot challenge, twice, with two different browser UA strings.** ApolloTV could not be fetched; everything said about it below comes from the content-gap export only, and is labelled as such. I have not inferred its page structure.

---

## 0. The finding that reframes Phase 3 — the new design is derived from televo's homepage

You flagged the `BRAND = "Televo"` string. Having now fetched televo's live page, the overlap is larger and more specific than "templated from".

**Verified, live, today:**

| Signal | televo.uk (live) | `new-modern-landing-page` | Match |
|---|---|---|---|
| Brand variable | Televo | `overview.ts:` `export const BRAND = "Televo"`, **11 interpolations** | exact |
| Channel count | "34K+ CHANNELS" (H3) | `34,000` ×1, `35,000` ×1 | exact |
| VOD count | "195K+ VOD" (H3) | `195,000` ×1, `195K` ×1 | exact |
| Price ladder | £12.99 · £24.99 · £34.99 · **£38.99** · £49.99 · **£63.99** · **£109.99** · **£189.99** | £**38.99** · £56.99 · £**63.99** · £89.99 · £**109.99** · £154.99 · £**189.99** · £299.99 | **4 of 8 exact** |
| Two-tier structure | Standard / Premium, with H3 *"What is the difference between Standard and Premium?"* | two tiers | structural |
| Built-in VPN as included | "BUILT-IN VPN & ANTI-BLOCK" (H3), VPN ×15 | `built-in VPN` in `overview.ts`, `closing-cta.ts`, `why-choose-us.ts` | exact |

The four matching prices are **televo's Premium ladder**, carried into the new design as its *Standard* "was" prices. The other four (£56.99 / £89.99 / £154.99 / £299.99) are inflated invented anchors.

**Conclusion:** the Overview and Pricing sections are lifted from televo's homepage with the brand parameterised. This is not a loose influence — it is our #1 competitor's live page sitting in our design folder.

**Consequences for Phase 3, all three of which I will follow:**
1. **Rewrite from scratch. Never paraphrase.** Paraphrasing produces near-duplicate content of the exact page we are trying to outrank — the worst possible outcome, and one Google is well equipped to detect.
2. **Discard every number in the design.** Confirmed spread: channels 37,000 ×6 (correct) / 57,000 ×2 / 35,000 / 34,000; films 198,000 ×3 (correct) / 238,000 ×2 / 140,000 ×2 / 195,000; **`7-Day Money-Back Guarantee` appears twice in `pricing.ts` against our canonical 30 days**; `£3.33` and `£4.17` per-month figures that match no plan we sell.
3. **The structure is still safe to keep.** Section order and heading hierarchy are not protectable, and televo's structure is the observable winning pattern on this SERP. Keeping the skeleton while replacing every string is legitimate and is exactly what the brief asks for.

### Contamination map — every file needing a from-scratch rewrite

| File | Markers |
|---|---|
| `overview.ts` | `Televo` ×2, `Kryntix` ×1, `built-in VPN` ×1 — **worst affected** |
| `hero-content.ts` | `Kryntix` ×2 |
| `manifesto-content.ts` | `Kryntix` ×3 |
| `footer.ts` | `Kryntix` ×2 |
| `statement-content.ts` | `Kryntix` ×1 |
| `why-choose-us.ts` | `Built-in VPN` ×1 |
| `closing-cta.ts` | `built-in VPN` ×1 |
| `pricing.ts` | `99.9` ×1, 7-day guarantee ×2, televo price ladder |
| `reviews.ts` | `renewRate: "94%"` — the file's own comment reads *"A renewal rate is a business claim; this placeholder is not a measurement"* |
| `layout.tsx` | `Kryntix` ×1 |

`pricing.ts` also carries `endsAt: null as string | null` — the permanent-countdown deceptive pattern. Recommendation stands: set a real deadline or remove the countdown.

### ✅ The three N1 long-form posts are clean — a correction to your instruction

You asked me to check the N1 posts for the same fingerprint. **They do not have it, and the evidence is unambiguous.** Ten fabrication probes run against `blog/[slug]/page.tsx`:

`500 hours` ×0 · `Trustpilot` ×0 · `99.9` ×0 · `free trial` ×0 · `4.8 out of 5` ×0 · `I tested` ×0 · `I spent` ×0 · `we tested` ×0 · `hours of testing` ×0 · `rating of` ×0

They do share technical vocabulary with the parasite — `TiviMate` ×3, `Xtream` ×8, `M3U` ×8, `catch-up` ×10 — but that is the **real vocabulary of the domain**, which any honest guide must use. Convergent terminology is not a shared template.

More than clean, they actively **refute** the parasite's method:

> *"Marketing language about load balancing, anti-freeze technology, or server grids is **unfalsifiable by design** — no operator…"*

> *"The only honest assessment method is to buy the shortest available term, test hard during genuine peak hours, and use your refund window if it doesn't hold."*

The `198,000` figure appears three times, each qualified as our own plan's spec ("as a worked example"), not as an industry claim.

**So the contamination is in the marketing copy, not the editorial.** Which produces the sharpest finding in this diagnosis:

### ⚠️ Our homepage contradicts our own blog post

`src/lib/constants.ts` ships a feature titled **"Anti-Freeze Fast IPTV Technology"**, described with *"smart load balancing across UK servers"*, plus *"Our IPTV grid is monitored around the clock"*. Those are the precise three phrases — anti-freeze, load balancing, server grid — that our own N1 post names as unfalsifiable marketing language.

The N0 honesty pass renamed *built-in VPN* → *Secure Proxy add-on* (×7) but left the unfalsifiable performance claims untouched. The homepage is still running the supplier's spec sheet; the blog has moved on. Track A must close that gap.

---

## 1. Why televo.uk wins

### What it actually is

| | televo.uk | us |
|---|---|---|
| Title | `IPTV UK - Best #1 IPTV Subscription UK - Premium VPN Integrated` (63) | `IPTV Subscription UK \| 37,000 Channels in 4K UHD` (48 live) |
| H1 | `Watch IPTV UK & Worldwide TV in 4K Without Buffering` | `IPTV Subscription UK — 37,000 Channels in 4K UHD` |
| **Visible words** | **1,819** | **1,405** |
| H2 sections | 12 | 7 |
| **Images** | **27, zero missing alt** | **2** |
| Total links | **33** (23 internal, **1 external**) | 32 (29 internal, 3 external) |
| Legal-page links | **3** | 4, but each legal page receives 14 inbound |
| Schema | Organization, WebSite, WebPage, BreadcrumbList | Organization, WebSite, WebPage, BreadcrumbList, **Product + 4 Offers**, **FAQPage ×10** |
| Pricing | **2 tiers × 4 terms = 8 offers** | 1 tier × 4 terms |
| FAQ | **14 questions** | 10 |
| hreflang | en-GB, **en-CA**, x-default | en-GB only (self-referencing) |
| External citation | **Wikipedia — Internet Protocol television** | none |

### Five things this table kills

**① Content length is not the moat.** Televo wins the entire 270-keyword cluster with **1,819 words**. We have 1,405. The gap is 414 words. Any plan that says "write 3,000 words on the homepage and we'll compete" is wrong, and the N2 action plan's "homepage is 1,405 words (High)" finding overstated the case — I said it needed to "out-cover the intent" and the depth gap is far smaller than that implied. What differs is **coverage breadth**, not volume: 12 sections against our 7, 14 FAQ answers against our 10.

**② Schema is not the lever.** The #1 page for `iptv subscriptions`, `iptv subscription`, `iptv uk` and `iptv` has **no Product schema, no Offer schema and no FAQPage** — despite 8 live offers and 14 visible FAQ questions. **We already have strictly more structured data than the page beating us on every term.** Keep our schema and finish it (it earns rich results and AI extraction), but do not expect a rankings return from it. Deprioritise accordingly.

**③ The exact keyword does not need to be in the H1.** Televo's H1 — *"Watch IPTV UK & Worldwide TV in 4K Without Buffering"* — contains no form of "subscription" at all. The **title** carries `IPTV Subscription UK`; the H1 carries the benefit. This matters for Phase 2: it is direct evidence that an H1 can lead with the outcome provided the title holds the term. It does not change our ruling (plural in title and H1) but it widens the acceptable H1 space considerably.

**④ Trust is handled as the primary objection, not as a footer badge.** `money-back` ×12, `guarantee` ×10, and — the distinctive one — **`no auto` ×8**, an entire H3 given to `ZERO AUTO-BILLING`. Televo has identified that the #1 fear in this category is being silently re-charged, and answers it eight times above the fold and below. We mention the 30-day guarantee nine times but never address auto-billing, which our WhatsApp-only, one-time-payment model actually **wins on outright**. That is a free differentiator we are not using.

**⑤ The two-tier ladder does real work.** Standard/Premium × 4 terms, plus an H3 explicitly titled *"What is the difference between Standard and Premium?"*. Eight price points let a visitor self-select instead of bouncing on a single number, and the difference question converts confusion into a scroll. The new design already has two tiers — the structure is right; only the numbers and copy are wrong.

### What I cannot attribute

**NO DATA on televo's referring domains, DR, or domain age.** None of those appear in any supplied file, and I did not query Ahrefs. I therefore cannot say what share of televo's advantage is authority versus on-page. Given the head term needs ~20 referring domains and televo holds #1 across a 253-keyword cluster, it plainly has an authority base we lack — but the size of it is unquantified and I will not invent a figure.

**What I can say with confidence:** none of the on-page gaps above explain a 253-to-0 keyword difference. On-page, we are close. The distance is elsewhere.

---

## 2. Why the position-3 parasite ranks

Source: `indie_hacker_parasite_blog_post_content.txt`, 2,412 words, byline "RukhsarSeo", 16 June 2026. Host domain identified only by the filename as an indie-hacker publishing platform — **NO DATA on its DR**; position 3 is per the brief.

### Host authority — not copyable

The post sits at position 3 on a commercial SERP where every other result is a provider homepage, while itself being a listicle promoting five brands with no independent existence (OREXETV, NEXOMIR, TVOXAR, VISSOLOTV, TVZITAM). It ranks because a high-authority third-party domain lends its trust to whatever is published on it. **This is the entire mechanism, and none of it transfers to our domain.** Nothing in the writing would rank at position 3 on a DR-0 site.

The strategic read: this is the **parasite pattern** — rent authority you have not earned. It is precisely the tactic the brief rules out, and correctly so given this network's enforcement history.

### Content format — copyable

Strip the host advantage and a genuinely well-built commercial-informational page remains:

- **Differentiated superlative roles.** Five picks, five distinct crowns — best overall / best value / best for sport / best for on-demand / most flexible. No two compete. A reader with any priority finds their answer, which is why this format satisfies a comparison SERP.
- **Question-shaped H2s** mapping to real PAA: *Why So Many Brits Are Switching…* · *How I Tested…* · *Which … Is Right for You?* · *How to Set Up… on Firestick or Smart TV* · *Is IPTV Legal in the UK?* · *Final Verdict*
- **Price anchoring against the incumbent** — "£70–£90 a month" vs "£5–£15 a month". Framing the decision as a substitution rather than a purchase.
- **Specificity that reads as first-hand.** The TiviMate bitrate overlay to detect upscaled 1080p; 16 Mbps HD / 25 Mbps 4K; M3U vs Xtream Codes; ethernet over wifi; testing 8pm–11pm for peak load. **This is the transferable core.** Concrete, checkable, useful detail is what makes copy feel tested — and none of it requires a fabricated claim.
- **A decision-matrix paragraph** restating each pick in one clause.
- **An honest legality section.** `are iptv subscriptions legal` (vol 10) and `are iptv subscriptions illegal` (vol 10) are real keywords in our plural family, and televo devotes an FAQ slot to it too. Two of three competitors answer this question directly. We answer it nowhere.

### The line

Everything above is structure and craft. Everything below is fabrication and is barred by Hard Rule 5:

> *"I spent more than 500 hours testing twelve different British IPTV services"* · *"a Trustpilot rating of 4.8 out of 5"* · *"a guaranteed 99.9% server uptime"* · *"I actually subscribed to and used every service"*

**The insight worth carrying:** specificity and fabrication are not the same thing, and the parasite conflates them deliberately. *"Test during Friday and Saturday 7pm–10pm and use your refund window"* is specific, useful, and true. *"I tested for 500 hours"* is neither checkable nor necessary. **Our N1 posts already demonstrate the honest version of this technique** — which is why they are the right model for Track A, and the parasite is only a structural reference.

**Recorded once, per your instruction:** the VISSOLOTV entry claims *"close to 198,000 films and series"* — our exact canonical figure. Combined with §0, the supplier-spec lineage runs through the parasite's shells, the new design, and our own homepage copy.

---

## 3. The `/installation-guides/` anomaly — short, as instructed

`iptv-subscription.co.uk/installation-guides/` ranks #5 for `iptv uk` (5,600 vol, 637 traffic). **It is a 48-hour-old spike and I draw no architectural lesson from it.** The daily export shows positions 1–3 flat at zero every day for two years until 2026-08-20, then 1, then 3 on 08-21; positions 4–10 went 1 → 2 → 4 over the same two days; monthly page traffic went 0 (July) → 793 (August) on **one referring domain**. Whatever this is — a Google fluctuation, a fresh index event, a temporary competitor drop — it has not persisted long enough to be evidence of anything. For the record, the page is a device hub with 28 self-links (anchor "Setup Guide" ×27) and five inline "Buy Now" CTAs, i.e. an informational URL doing commercial work. That is the opposite of the separation Hard Rule 4 imposes on us, and I am not proposing we copy it.

---

## 4. Blocker list, ranked by impact on the money page

### Blocks ranking today

| # | Blocker | Evidence | Fix owner |
|---|---|---|---|
| **1** | **One non-spam referring domain, and it is a link vendor.** The head term needs ~20. | KD 18 = "~20 ref. domains to rank in top 10"; N2 `is_spam=0` filter returns 1 row | **You — H1, 3–6 months** |
| **2** | **Zero presence in the competitive set.** 0 of 270 keywords; 0 shared with all three competitors while they share 79/6/5 with each other. | content-gap + overlap matrix | consequence of #1 |
| **3** | **Production is one commit stale.** Nav without Blog/Contact, `/editorial-policy` 404, stale sitemap, and the stat bar rendering `0+` to every non-JS crawler. | `git log eff6938..HEAD` | **You — deploy** |
| **4** | **Half the sitemap unindexed** (6 of 12 live / 6 of 13 intended), including both thin posts. | Coverage export | Me (Track B) + deploy |
| **5** | **A live 404 the site links to itself.** `/iptv-subscription-uk`, `not-found.tsx:31`, in GSC since 2026-07-25. | Coverage drilldown | Me (Track B) |

**Items 1 and 2 are the same item.** Nothing in Tracks A or B moves them. This is the honest centre of the diagnosis: **we are not losing to televo on the page — we are absent from the index's consideration set, and only links change that.**

### Limits the ceiling later

| # | Blocker | Evidence |
|---|---|---|
| 6 | **2 images vs televo's 27.** For a product whose value proposition is visual, and zero chance of image-pack or visual AI citation. | live comparison |
| 7 | **Homepage runs the supplier spec sheet** — anti-freeze / load balancing / server grid — which our own blog calls unfalsifiable. | `constants.ts` vs `blog/[slug]/page.tsx` |
| 8 | **Legality is answered nowhere on the site.** Two real keywords in the plural family; televo and the parasite both cover it. | plural family table |
| 9 | **Auto-billing — our strongest differentiator — is never mentioned.** Televo hammers it 8×; we sell one-time WhatsApp payments and say nothing. | live comparison |
| 10 | **Single-tier pricing** against televo's 8 self-selection price points. | live comparison |
| 11 | **Zero external citations.** Televo cites Wikipedia's IPTV article; we cite nothing from the homepage. | link analysis |
| 12 | **Legal pages absorb as much internal equity as `/`** (14 inbound each). Televo gives legal 3 links total. | N2 link graph vs live |
| 13 | Blog titles render 88–92 chars; `Product` lacks `priceValidUntil` / `hasMerchantReturnPolicy`; `/blog` and `/contact` unmarked; FAQ promises a non-existent Guide page; `readTime` overstates by 4×. | §9 of EVIDENCE-BASE |

**Note on #13 and schema generally:** finding ② above means these are correctness and trust fixes, not ranking levers. I will do them because they are cheap and because lying about read time is a trust problem — not because they will move position.

---

## 5. The honest gap

**Where we are:** 0 clicks and 27 impressions in twelve months, average position 37–43, desktop only. 0 organic keywords worldwide. DR 0. One non-spam referring domain. Best position on the site is 7, held by a blog post on a single impression.

**What the head term costs:** ~20 genuine referring domains for a **top-10** entry — not for #1. Televo holds #1 with a 253-keyword cluster and an unquantified but plainly substantial authority base. **Top 10 is the realistic 12-month objective for `iptv subscriptions`. #1 is not, and any deliverable that implies otherwise is lying to you.**

### Three checkpoints

**Checkpoint 1 — first impressions on the target family. 30–45 days after deploy.**
Depends on: deploy shipping, the 404 clearing, indexation reaching 10–12 of 13, and the homepage rewrite landing. Success looks like impressions moving from ~5 per 28 days into the low tens, with at least one query from the plural family appearing in GSC. **Clicks will still be zero.** No link acquisition needed to hit this — it is purely an indexation and relevance milestone.

**Checkpoint 2 — first clicks. 3–5 months.**
Depends on: 8–12 genuine referring domains, plus the low-KD engine terms (`iptv subscriptions uk` KD 4, `best iptv subscription` KD 9, `best iptv subscription uk` KD 12) beginning to place in the 20s–30s. Success is the **first non-zero click month**, likely on a long-tail engine term rather than the flag. Realistically a handful of clicks, not a curve.

**Checkpoint 3 — head-term movement. 6–12 months.**
Depends on: ~20 referring domains, sustained. Success is `iptv subscriptions` entering the top 20, then contesting the top 10. Televo's #1 is not in scope on this timeline.

**The dependency that governs all three:** checkpoint 1 depends only on work already scoped in Tracks A and B. **Checkpoints 2 and 3 depend entirely on link acquisition, which is yours and which no amount of content substitutes for.** If, at the 90-day mark, the non-spam referring-domain count is still 1, the content and technical work will have been executed correctly and the traffic number will still be zero. That is not a failure of the plan; it is the plan's stated dependency going unmet.

---

## 6. Hard Rules compliance — Phase 1

| # | Rule | Status |
|---|---|---|
| 1 | One money page | No pages proposed |
| 2 | Cluster not phrase | §1 frames televo's win as cluster coverage, not phrase repetition |
| 3 | No keyword stuffing | No copy written |
| 4 | Non-commercial intent elsewhere | §3 records the competitor's contrary practice and explicitly declines to copy it |
| 5 | Never fabricate | §2 separates format from fabrication; §0 and §1 flag every unverifiable claim; `NO DATA` used for televo's authority metrics and the parasite host's DR |
| 6 | DMCA discipline | Broadcaster names appear only inside quoted competitor copy, attributed |
| 7 | No deletion without 301 | Nothing deleted |
| 8 | One set of numbers | §0 catalogues every conflicting figure in the new design; none adopted |
| 9 | Never edit `new-modern-landing-page` | **Read-only.** Files opened for analysis; zero writes. Verified: no file in that folder modified |
| 10 | Nothing goes live | No commits, no push, no deploy. Working tree only: `docs/EVIDENCE-BASE.md`, `docs/DIAGNOSIS.md` |
| 11 | Evidence or silence | ApolloTV 403 declared rather than inferred; televo authority marked NO DATA; parasite host DR marked NO DATA |
