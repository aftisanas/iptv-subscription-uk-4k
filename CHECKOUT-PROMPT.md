# CHECKOUT PAGE + PRICING UPDATE

Add a checkout flow to this repo, copying the **logic** from an existing project exactly, but
rendered in **our** design. Also apply a set of Premium pricing changes.

**Reference project (READ-ONLY — never edit anything in it):**
`C:\Users\Oussama\Desktop\fast_fast\fast-iptv-tv`

**Layout reference image:** `docs/checkout-layout-reference.png`
Read it before building. The checkout's **structure and section order must match it** — with our
colours, typography, logo and imagery. Section 2.5 below lists the five places where the image
conflicts with decisions already made; those resolutions win over the image.

**Housekeeping:** that file sits in `public/`, so it is publicly served and crawlable. Move it to
`docs/` when you are done and confirm nothing references the old path.

**DO NOT `git push`. DO NOT deploy.** Local commits only.

---

## PART 1 — PRICING CHANGES

### 1.1 New Premium prices

| Term | Old | **New** |
|---|---|---|
| 3 Months | £37.99 | **£34.00** |
| 6 Months | £59.99 | **£49.00** |
| 12 Months | £97.99 | **£63.00** |
| 24 Months | £175.99 | **£115.00** |

### 1.2 🔴 This breaks a claim currently on the page — fix the copy in the same change

Premium is currently priced as exactly Standard + Secure Proxy + one extra connection, and the copy
says so. `TIERS.premium.tagline` reads *"Priced at exactly the sum of the parts — no bundle
mark-up"*, and every plan `note` reads *"Standard £25.99 + £4.75 + £7.25"*. **With the new prices
those statements become false** — the same class of self-contradiction already purged from `/terms`,
`/privacy` and `/contact`.

**Reframe as a genuine bundle saving.** The new prices sit below the sum of the parts:

| Term | Sum of parts | New price | Saving | `was` | New discount |
|---|---|---|---|---|---|
| 3 mo | £37.99 | £34.00 | £3.99 | £51.99 | **Save 35%** |
| 6 mo | £59.99 | £49.00 | £10.99 | £83.99 | **Save 42%** |
| 12 mo | £97.99 | £63.00 | £34.99 | £137.99 | **Save 54%** |
| 24 mo | £175.99 | £115.00 | £60.99 | £255.99 | **Save 55%** |

Rewrite `tagline` and each `note` to state the saving against buying the add-ons separately.
Recompute `save` and `savePct` from the real arithmetic and show your working. Every number must
survive a customer with a calculator.

### 1.3 Premium extra-connection pricing

Premium's per-connection price is **Standard's price + £10**, per term:

| Term | Standard | **Premium** |
|---|---|---|
| 3 Months | £7.25 | **£17.25** |
| 6 Months | £14.50 | **£24.50** |
| 12 Months | £29.00 | **£39.00** |
| 24 Months | £58.00 | **£68.00** |

**Proxy prices are unchanged on both tiers:** £4.75 / £9.50 / £19.00 / £38.00.

If you read "+£10" differently from the table above, stop and ask before writing.

### 1.4 Propagate

Update every surface these figures appear on — pricing data, homepage copy, JSON-LD `Product`
offers (8 total), any comparison or FAQ text. **One set of numbers everywhere.** Standard prices
(£25.99 / £35.99 / £49.99 / £79.99) and "from £3.33/month" do not change.

---

## PART 2 — THE CHECKOUT FLOW

### 2.1 Copy the logic exactly

From the reference project, port the mechanism unchanged:

- `src/lib/checkout.ts` — `callCheckoutHub()`, the `CheckoutResponse` union, the hub request shape
  (`siteSlug`, `planName`, `email`, `name`, `phone`, `addons: { proxyProtection, extraConnections }`)
- `src/lib/whatsapp.ts` — `calculateOrderTotal()`, `buildWhatsappMessage()`,
  `buildWhatsAppCheckoutUrl()`. **Merge with this repo's existing `src/lib/whatsapp.ts`** rather than
  overwriting it; reconcile any duplicate exports and say what you changed
- `src/app/checkout/page.tsx` + `CheckoutContent.tsx` — the availability probe, the Shopify path,
  the WhatsApp fallback, the plan lookup, the redirect when `?plan=` is missing or invalid
- `src/app/thanks/` — the post-checkout return page and `OrderReference`

**Behaviour that must be identical:**

1. Clicking a plan CTA runs `router.push('/checkout?plan=' + plan.id)` — the plan carries in the URL
2. On mount, probe `${CHECKOUT_HUB_URL}/api/availability?siteSlug=…&planName=…`
3. **Available → "Buy Now"** posts to `${CHECKOUT_HUB_URL}/api/checkout` and redirects to the
   returned Shopify `checkoutUrl`
4. **Unavailable, or the probe fails for any reason → the WhatsApp button**, using
   `buildWhatsappMessage()` with the full order in the text. Keep the reference project's
   defensive fallback: if the hub is unreachable, fall back to **our own** `wa.me` number rather
   than pushing people to email
5. Keep the email validation including the blocked-TLD list, and the loose phone regex

### 2.2 Configuration for THIS site

- `SITE_SLUG` — set to this site's slug and tell me what you chose. **Flag clearly that the
  checkout hub must have this slug registered**, or the availability probe will always fail and every
  order will take the WhatsApp path. That fallback is graceful, so it is safe to ship either way, but
  I need to know.
- `CHECKOUT_HUB_URL` — `process.env.NEXT_PUBLIC_CHECKOUT_HUB_URL` with the same default as the
  reference project. Document the env var in the pre-push notes so it can be set on the panel.

### 2.3 🔴 Resolve the Premium add-on conflict

Premium **already includes** the Secure Proxy and a sixth screen. Naively reusing the reference
checkout would sell both again.

On a **Premium** plan:
- The proxy control renders as **pre-enabled and locked, labelled "Included"** — it must not add a
  second charge
- The extra-connections counter adds screens **on top of the sixth**, and the copy must say so
- The WhatsApp message and the hub payload must reflect this — proxy already included, connections
  counted from six

On a **Standard** plan the behaviour is exactly as in the reference project.

Make the totals arithmetic obvious in the code and add a comment explaining why the two tiers differ.

### 2.4 The extra-connections card

Port the add-on card from the reference project: the ± counter, `EXTRA_CONNECTIONS_MAX = 5`, the
per-plan unit price, and the live line-item total. Same logic and same per-term prices — the
Standard set unchanged, the Premium set from §1.3.

### 2.5 Design — structure from the image, styling from our homepage

**Layout to build, matching `docs/checkout-layout-reference.png`:**

Two columns on desktop, stacking to one on mobile with the order summary first.

**Left column (narrow):**
1. **Order summary card** — the plan as a line item with its price, a divider, then `TOTAL` with the
   figure in our accent colour. The total updates live as add-ons change.
2. **Promo code card** — short helper line, text input with an inline **Apply** button. Wire it to
   the reference project's existing `promoCode` / `promoNotice` state; do not invent new behaviour.

**Right column (wide) — one card, "Billing Details", in this order:**
1. **Extra connections row** — control left, title + one-line description, price right
2. **Secure Proxy row** — same shape, carrying a **"RECOMMENDED"** badge as in the image
3. **First name / Last name** side by side, both required
4. **Phone**, required, with the small help affordance shown in the image
5. **Email**, required
6. **Full-width primary action button**
7. **Three-icon trust row** — instant delivery · 30-day money-back · secure payment
8. **"Secure Payment Guaranteed"** banner strip
9. **Payment logo strip**

**Five conflicts between the image and decisions already made. The resolution wins, not the image:**

| # | Image shows | Build instead |
|---|---|---|
| 1 | Extra connection as a **toggle** | The reference project's **± counter**, max 5 — in the image's row layout |
| 2 | Prices **per month** | **Per term**, matching how our add-ons are actually sold. A per-month equivalent may appear as secondary text only if it divides exactly. Never show a per-month figure that does not |
| 3 | A **country dropdown** | **Omit it.** The checkout hub payload has no country field; do not collect data we never send |
| 4 | A **PayPal** button | Our logic: **"Buy Now"** when the hub is available, the **WhatsApp button** when it is not |
| 5 | **McAfee SECURE** and **Discover** logos | Neither. Use only marks we hold assets for and genuinely accept: `visa`, `mastercard`, `amex`, `diners`, `paypal`. **McAfee is excluded** — it asserts a certification we do not hold |

**Premium labelling — the marginal-price trap.** On Premium the sixth screen is bundled, so
`extraConnectionPrice` is the price of a **seventh screen onward**. At 12 months that is £39 for a
seventh while the bundled sixth works out near £13. Both figures are legitimate — a bundle price and
a marginal price are different things — but the UI must never let them read as the same number.
Label the counter so it is unambiguous which screen is being added.

**Styling:** reuse our existing CSS-module patterns, palette tokens, typography, buttons, cards and
spacing so the checkout reads as the same site — never the reference project's styling, and never the
image's colours. Our logo. Responsive to 360 px with no horizontal scroll.

---

## PART 3 — SEO. DO NOT SKIP THIS.

The site has just been cleaned for indexation. A transactional page can undo that.

- `/checkout` and `/thanks`: **`robots: { index: false, follow: false }`**, exactly as the reference
  project does
- **Neither appears in `sitemap.ts`**
- Neither is linked from the nav, the footer, or any blog post — reachable only from a plan CTA
- The homepage's internal-link graph must not shift: `/` must still lead by the same margin. **Re-run
  the Phase F link-graph measurement afterwards and confirm it did not move**
- No JSON-LD on either page that describes something absent from it
- `/checkout` must not compete for any keyword — no `iptv subscriptions` in its title or H1
- Every 404 stays fixed; no new internal link to a redirect or a dead URL

---

## PART 4 — VERIFY, THEN STOP

- `npm run build` clean, zero type errors
- Every plan CTA on both tiers reaches `/checkout?plan=…` with the right id
- `/checkout` with a missing or invalid `?plan=` redirects to `/#pricing`
- Both paths tested: hub available → Shopify; hub unavailable **and** hub unreachable → WhatsApp with
  a correct pre-filled message
- Totals correct for every combination of tier × term × proxy × 0–5 extra connections. **Show a
  worked example for one Standard and one Premium plan**
- Premium proxy cannot be double-charged
- `robots` meta present on `/checkout` and `/thanks`; neither in the sitemap
- Phase F link-graph margin unchanged
- 360 px: no horizontal scroll

**Commit locally** as `feat: checkout flow and Premium pricing update`. **Do not push.**

Report: every file added or changed, the `SITE_SLUG` you chose, whether the hub needs registering,
the env var to set on the panel, and anything you could not complete and why.

---

## RULES

1. **Never push, never deploy.**
2. **Never edit the reference project** — read-only.
3. **Stop and ask** if the layout image path is empty, if the "+£10" reading is ambiguous, or if any
   decision would break something.
4. **No claim that the arithmetic does not support.** If a price and a sentence disagree, the
   sentence is wrong.
5. If anything here contradicts what you find in the code, say so and show me — I want the right
   answer, not agreement.
