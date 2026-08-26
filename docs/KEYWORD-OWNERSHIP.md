# KEYWORD OWNERSHIP — measured on the built site

Every figure below is read out of the **rendered HTML in `.next/server/app/`** after
`npm run build`. Nothing here is taken from `src/`, from `content-ready/`, or from any earlier
document in `docs/`. Where a measurement disagrees with an earlier plan, the measurement wins and the
disagreement is stated.

**Build:** Next.js 16.2.2 (Turbopack) · 16 routes · 0 errors, 0 type errors, 0 warnings.
**Nothing pushed, nothing deployed.**

---

## 1. Exclusive ownership of the flag term

**Verdict: ✅ exclusive.** `iptv subscriptions` (exact plural) appears in the title **and** the H1
**and** the first 100 words of `/` — and in **no other page's title or H1**.

| Route | Title | Plural in title | Plural in H1 |
|---|---|---|---|
| **`/`** | **IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund** | ✅ **YES** | ✅ **YES** |
| `/blog` | IPTV Subscription Guides \| IPTV Subscription UK 4K | – | – |
| `/blog/how-to-buy-iptv-subscription-uk` | How To Buy An IPTV Subscription Safely In The UK | – | – |
| `/blog/how-to-setup-iptv-firestick` | How To Set Up An IPTV Subscription On A Fire TV Stick | – | – |
| `/blog/iptv-subscription-renewal-cancellation-refund-uk` | IPTV Renewal, Cancellation And Refund Rights In The UK | – | – |
| `/blog/whats-included-in-iptv-subscription-uk` | What's Included In A UK IPTV Subscription | – | – |
| `/contact` | Contact UK IPTV Support \| IPTV Subscription UK 4K | – | – |
| `/terms` | Terms of Service \| IPTV Subscription UK 4K | – | – |
| `/privacy` | Privacy Policy \| IPTV Subscription UK 4K | – | – |
| `/dmca` | DMCA Policy \| IPTV Subscription UK 4K | – | – |
| `/refund` | Refund Policy \| IPTV Subscription UK 4K | – | – |
| `/editorial-policy` | Editorial Policy \| IPTV Subscription UK 4K | – | – |
| `/_not-found` | Page Not Found \| IPTV Subscription UK 4K | – | – |

**H1s, in full**

| Route | H1 |
|---|---|
| **`/`** | **IPTV Subscriptions For UK Homes, Without The Satellite Dish** |
| `/blog` | IPTV UK Guides & Streaming Tips |
| `/blog/how-to-buy-…` | How To Buy An IPTV Subscription Safely In The UK |
| `/blog/how-to-setup-iptv-firestick` | How To Set Up An IPTV Subscription On A Fire TV Stick |
| `/blog/…renewal-cancellation-refund-uk` | IPTV Renewal, Cancellation And Refund Rights In The UK |
| `/blog/whats-included-…` | What's Included In A UK IPTV Subscription |
| `/contact` | Contact The IPTV Subscription UK Support Team |
| `/terms` `/privacy` `/dmca` `/refund` `/editorial-policy` | Terms of Service · Privacy Policy · DMCA Policy · Refund Policy · Editorial Policy |
| `/_not-found` | This page could not be found. |

Every non-homepage title and H1 that touches the family uses the **singular** with an informational
modifier — *Guides*, *How To Buy … Safely*, *How To Set Up*, *What's Included*, *Renewal,
Cancellation And Refund Rights*. None is a commercial variant.

**One caveat, stated rather than buried.** Every page's title carries the brand suffix
`| IPTV Subscription UK 4K`, and `/contact`'s H1 contains the brand string `IPTV Subscription UK`.
These are the **brand name**, not a keyword play, and the brand happens to contain the singular. It
cannot be removed without renaming the site, and it does not put those pages in the plural's SERP.

### Word order on `/`

| Form | KD | In title | In H1 | In body |
|---|---|---|---|---|
| `IPTV Subscriptions UK` | **4** | ✅ **YES** | – | ×1 |
| `UK IPTV Subscriptions` | 33 | – | – | ×4 |

**The requirement — the KD 4 order in title and H1, never the KD 33 order — is met.** The title leads
with `IPTV Subscriptions UK`; neither title nor H1 contains the KD 33 order.

The KD 33 order does appear **4 times in body prose** (the Statement and Overview sections, plus the
footer brand line). I have left it. Reversing those to the KD 4 order would produce sentences no
English speaker writes — *"IPTV subscriptions UK have moved from a niche interest"* — and Google
stems and reorders a two-to-three-word query of this kind into one term family regardless. **Forcing
the order into prose buys nothing and costs readability.** The order matters where it is a
deliberate, scanned signal: the title. There it is correct.

### Plural density per page

| Route | occurrences of the exact plural |
|---|---|
| **`/`** | **11** |
| `/blog/whats-included-…` | 5 |
| `/editorial-policy`, the other three posts | 3 |
| everything else | 2 |

The 2 on every page are the footer brand line and the copyright line — sitewide chrome. The money
page carries **5.5× the nearest page**.

> **A defect this phase caught.** Before this measurement, every page showed **4**. Lifting `<Navbar/>`
> out of `Hero` into the layout in Phase B had also lifted the mobile menu's heading, which was
> `HERO_CONTENT.rail.left` — *"UK IPTV subscriptions"*. That is the hero's own category rail, and it
> was rendering in the mobile menu of every blog and policy page: site chrome competing with the money
> page for the money page's flag term, on twelve URLs. It now shows the brand name. This was only
> visible by measuring the built HTML, which is exactly what this phase is for.

---

## 2. No two URLs compete

**Verdict: ✅ no two pages share a primary intent.**

| # | Route | Primary intent | Owns | Evidence in the rendered page |
|---|---|---|---|---|
| 1 | `/` | **Transactional — purchase** | `iptv subscriptions`, `iptv subscriptions uk` | Only page with a price ladder (8 offers), a checkout CTA and `Product` schema |
| 2 | `/blog` | Navigational — index | `iptv subscription guides` | `CollectionPage` + `ItemList`; no price, no CTA |
| 3 | `/blog/how-to-buy-…` | Informational — **procedural** | `how to buy an iptv subscription` | 7 step headings, no price ladder |
| 4 | `/blog/whats-included-…` | Informational — **definitional** | `what's included in an iptv subscription` | Component anatomy + a 10-question checklist |
| 5 | `/blog/…renewal-…-refund-uk` | Informational — **consumer rights** | `iptv subscription refund uk` | CRA 2015 / CCR 2013 / DMCC / Section 75 |
| 6 | `/blog/how-to-setup-iptv-firestick` | Informational — **technical** | `iptv subscriptions for firestick` | 6 install steps + 7 troubleshooting sub-headings |
| 7 | `/contact` | Transactional — **support** | `contact iptv support` | `ContactPage`; channels and hours only |
| 8 | `/editorial-policy` | Trust — **provenance** | — | `WebPage`; sourcing, COI, corrections |
| 9 | `/terms` | Legal — contract | — | no schema |
| 10 | `/privacy` | Legal — data | — | no schema |
| 11 | `/dmca` | Legal — rights notice | — | no schema |
| 12 | `/refund` | Legal — refund terms | — | no schema |
| 13 | `/_not-found` | Utility | — | `noindex` |
| 14 | `/robots.txt` | Crawl directive | — | — |
| 15 | `/sitemap.xml` | Crawl directive | — | 12 URLs |
| 16 | `/blog/[slug]` | (dynamic route producing rows 3–6) | — | `generateStaticParams` |

**Four informational posts, four different informational sub-intents** — procedural, definitional,
consumer-rights, technical. The only two transactional pages are `/` (purchase) and `/contact`
(support), which are not the same intent and do not share a term.

### `doesNotTarget` — verified in the shipped text, not the source

| Post | Guard | Commercial h1/h2 in the rendered page | Verdict |
|---|---|---|---|
| `whats-included-…` | any commercial term | none | ✅ |
| `…renewal-…-refund-uk` | any commercial term | none | ✅ |
| `how-to-setup-iptv-firestick` | any commercial term | none | ✅ |
| `how-to-buy-…` | `buy iptv subscription` | `How To Buy An IPTV Subscription Safely In The UK` | ✅ — see below |

The one match is the post's own H1. It is **procedural, not transactional**: it targets *how to buy …
safely*, an informational query, and the post carries no price, no offer and no checkout. The
homepage owns the bare commercial `buy iptv subscription` through its Closing CTA H2. The two do not
occupy the same SERP.

**One violation was found in this migration and fixed.** `whats-included-…` shipped a section titled
*"How This Service Structures Its Subscription"* that applied the article's own analysis to our plans
and linked `/#pricing` from an informational URL — precisely the cannibalisation the guard exists to
prevent. It is now an operator-neutral ten-question checklist. Its mirroring FAQ item went with it.

---

## 3. The internal link graph, measured

Counted from rendered HTML. **Self-links and same-page `#` anchors are excluded** — a `/#pricing`
link on the homepage is not an inbound link to the homepage. Note the header renders twice per page
(desktop bar + mobile sheet), so sitewide chrome contributes two links per element.

| URL | linking pages | links | of which `#frag` | N2 baseline | change |
|---|---|---|---|---|---|
| **`/`** | 12 | **209** | 150 | 14 | **+195** |
| `/contact` | 12 | 41 | 0 | 4 | +37 |
| `/blog` | 12 | 40 | 0 | 6 | +34 |
| `/blog/how-to-setup-iptv-firestick` | 12 | 26 | 0 | 1–3 | new |
| `/editorial-policy` | 12 | 26 | 0 | 14 | +12 |
| `/dmca` | 12 | 25 | 0 | 14 | +11 |
| `/refund` | 12 | 24 | 0 | 14 | +10 |
| `/blog/…renewal-…-refund-uk` | 12 | 18 | 0 | 1–3 | new |
| `/blog/whats-included-…` | 12 | 16 | 0 | 1–3 | new |
| `/blog/how-to-buy-…` | 12 | 15 | 0 | 1–3 | new |
| `/terms` | 12 | 12 | 0 | 14 | −2 |
| `/privacy` | 12 | 12 | 0 | 14 | −2 |

**`/` receives 209 links against 41 for the next page — a margin of 5.1×.** Against the N2 baseline,
where the money page and each legal page were tied at 14, the ratio has gone from **1 : 1** to
**17 : 1** against `/terms` and `/privacy`.

**Honest qualification on the legal pages.** Three of them went *up*, not down: `/editorial-policy`
26, `/dmca` 25, `/refund` 24. That is deliberate and I would not undo it — the Manifesto section
links `/editorial-policy` and `/dmca` as E-E-A-T evidence for the legality block, and the footer
Support column links `/refund`. What the plan needed was for the money page to stop being *tied*
with them. It is not: 209 against 24 is 8.7 : 1.

### Anchor distribution into `/`, as rendered

| Class | n | Anchors |
|---|---|---|
| **Exact-match** | **3** | `IPTV subscriptions` ×3 — on `how-to-buy`, `firestick`, `whats-included` |
| Partial | 5 | `compare subscription terms` · `our IPTV subscription plans` · `IPTV subscription pricing` · `see what's included in a subscription` · `IPTV subscription plans` |
| Branded | 1 | `IPTV Subscription UK 4K` (`/editorial-policy`) |
| Generic | 2 | `view plans` (`/contact`) · `Go Home` (`/404`) |

**Exact-match total: 3, against a cap of 4 — ✅ PASS.**

- Never two exact-match anchors on one page — ✅ each of the three is on a different URL.
- **Never an exact-match anchor above the fold — ✅** all three sit in the closing paragraph of their
  post, after 2,500–3,100 words.
- No anchor repeated verbatim on any page — ✅ (one collision was found and fixed: the spec set both
  the `/blog` intro anchor and the sitewide footer anchor to `UK IPTV subscription plans`, which put
  the same string twice on `/blog`; the intro is now `IPTV subscription plans`).

Sitewide chrome adds the logo (empty anchor, `aria-label` carries the name), `Home` ×2 per page, and
the footer's `UK IPTV subscription plans` — branded and partial, which is the right shape for
sitewide links.

---

## 4. Engine-term coverage

| Term | Assigned section | Occurrences | Verdict |
|---|---|---|---|
| `iptv subscriptions uk` | Hero / title | **1** | ✅ present, in the title |
| `are iptv subscriptions legal` | Manifesto | **2** | ✅ present — the H2 is *"Are IPTV subscriptions legal in the UK?"* |
| `buy an iptv subscription` | Closing CTA | **2** | ✅ present — the H2 is *"Buy An IPTV Subscription In Two Minutes"* |
| `cheap iptv subscription` | Pricing | **0** | ❌ **deliberately absent** |
| `best iptv subscription(s)` | Why Choose Us | **0** | ❌ **deliberately absent** |
| `iptv subscriptions for firestick` | Devices | **0** | ❌ **absent — and it should be** |
| `iptv subscription` (family, any form) | — | 30 | — |

**Three terms are missing. The brief says to say so and leave them out where they read as forced. All
three do, and two of them for reasons stronger than style.**

- **`cheap iptv subscription` — leave out.** The entry price is £25.99 and the entire positioning is
  *no auto-billing, 30-day refund, one payment* rather than *cheapest*. A "cheap IPTV subscription"
  line in the Pricing section would be the one claim on the page contradicted by the page's own
  numbers. The honest neighbours are already there: `from £3.33/month`, `Save up to 55% on longer
  terms`, and a struck-through `was` on every card.

- **`best iptv subscription` — leave out, and this one is not a style call.** It is an unverifiable
  superlative about our own product. The site removed `4.9/5`, `99.9% uptime` and `50,000
  subscribers` for exactly this reason, publishes an editorial policy saying it does not present its
  own service as the outcome of a comparison it ran, and operates under the DMCC Act 2024. Writing
  *"the best IPTV subscription"* in Why Choose Us would contradict all three. The section instead
  earns the query with three checkable differentiators — no auto-renewal, a 30-day guarantee, and an
  unbundled proxy add-on.

- **`iptv subscriptions for firestick` — absent by design, and the brief contradicts itself here.**
  Phase F assigns this term to the homepage Devices section. But
  `content-ready/blog/how-to-setup-iptv-firestick.md` lists it as that post's **first keyword**, and
  the post's whole purpose is to own it. Two URLs cannot own one term — that is the cannibalisation
  every `doesNotTarget` guard in this repo exists to prevent. **The blog post should keep it**: the
  query is informational-technical ("how do I run this on a Fire Stick"), which a 3,138-word
  walkthrough serves and a pricing page does not. The homepage Devices section already lists *Amazon
  Fire TV Stick* and links the walkthrough, which is the correct relationship between the two.
  **Please confirm you agree; if you would rather the homepage take it, say so and I will add it.**

---

## 5. Crawl and trust integrity

| Check | Result |
|---|---|
| Every sitemap URL is a real route | ✅ 12/12 — all correspond to a pre-rendered page |
| Every indexable route is in the sitemap; no orphans | ✅ 12 indexable routes, 12 sitemap entries. `/_not-found` correctly excluded |
| One `<h1>` per page, correct nesting, no skipped levels | ✅ all 13 pages. *(`/contact` went `h1 → h3`; fixed in Phase E)* |
| Canonical on every page, self-referencing and absolute | ✅ all 12 indexable routes. No root-level canonical fallback exists |
| `lang="en-GB"` | ✅ all 13 |
| JSON-LD parses on every page | ✅ 15/15 blocks across 8 pages; 0 parse errors |
| No schema describes anything absent from its page | ✅ the four policy pages carry no JSON-LD at all; `Product` and `FAQPage` exist only on `/` |
| Zero internal links to a 404 | ✅ every internal target resolves to a built route |
| Zero internal links into a redirect chain | ✅ none of the 4 redirect sources is linked from anywhere |
| Inbound links to the dead `/iptv-subscription-uk` | ✅ **0** |

---

## Verdict

**Does the money page own `iptv subscriptions` exclusively? — Yes.**

It is the only URL on the site carrying the exact plural in its title, its H1 and its first 100
words, and it carries it 5.5× more often in body copy than any other page. Every other page that
touches the family does so in the singular with an informational modifier, and each of the four blog
posts holds a different informational sub-intent with its `doesNotTarget` guard honoured in the
shipped text. The title uses the KD 4 word order. One real leak — the hero's category rail appearing
in the mobile menu of all twelve other pages — was found by this measurement and closed.

**Does the internal link graph concentrate authority on it? — Yes, structurally.**

209 inbound links from 12 pages, 5.1× the next URL, against a baseline where the money page was tied
1 : 1 with four legal pages. Three exact-match anchors against a cap of four, none above the fold,
none doubled on a page.

**And now the part not to soften.**

Both of those answers describe *structure*, and structure is not the constraint. This site has **DR
0.0 and one non-spam referring domain**, which is itself a link vendor. Internal linking redistributes
authority a domain already has; at DR 0 there is close to nothing to redistribute, so a 17 : 1
internal ratio is 17 : 1 of approximately zero. **Nothing in this migration changes that, and nothing
in this document should be read as predicting traffic.**

What this build has genuinely fixed is the set of reasons a crawler would have had to *discount* the
page: the `0+` metrics bug is gone, indexation blockers are gone, the schema no longer describes
absent content, no page competes with another, and the copy no longer contradicts itself across
`/terms`, `/refund` and the blog. Those were necessary. They were never sufficient.

**The measurement that decides this project is referring domains, not any figure above.** If, ninety
days after deploy, non-spam referring domains is still 1, every table in this document will still
read exactly as it does now and organic traffic will still be zero — and that will be the link
dependency going unmet, not this work failing. Three items on `/terms` and `/contact` flagged in
`docs/PRE-PUSH-CHECKLIST.md` still need your ruling before any of it ships.
