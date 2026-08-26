export type TierId = "standard" | "premium";

export type Feature = {
  label: string;
  /** Pulled out in the tier's accent — the reasons someone upgrades. */
  emphasis?: boolean;
};

export type Plan = {
  id: string;
  /** "3 Months" */
  term: string;
  /** Term length in months. Explicit rather than parsed out of `term`, so the
   *  checkout's per-month arithmetic cannot drift from the label. */
  months: number;
  /** Secure Proxy over the full term. Identical on both tiers. On Premium it is
   *  already inside `price` — the checkout must never charge it again. */
  proxyPrice: number;
  /** One extra connection over the full term. Premium is Standard + £10 flat. */
  extraConnectionPrice: number;
  /** One-line rationale under the term. */
  note: string;
  /** Pre-discount price, struck through. */
  was: string;
  /** Discount badge, e.g. "Save 35%". */
  save: string;
  /** The same number, for the saving rail's width. */
  savePct: number;
  /** Current price, without the currency symbol. */
  price: string;
  currency: string;
  cta: string;
  /** Exactly one plan per tier carries the highlight treatment. */
  featured?: boolean;
};

export type Tier = {
  id: TierId;
  label: string;
  /**
   * Simultaneous screens the tier already includes, before any add-on.
   * Standard 5, Premium 6. The checkout counts extra connections ON TOP of
   * this, which is why the two tiers label the same counter differently.
   */
  baseScreens: number;
  /** True where the Secure Proxy is already inside `price` and must not be charged again. */
  proxyIncluded: boolean;
  /** Small badge inside the toggle. */
  badge?: string;
  /** Line under the toggle. */
  tagline: string;
  plans: Plan[];
  features: Feature[];
};

/**
 * Countdown target: the genuine end of the current month, in UTC. Evaluated
 * once when this module is loaded — at build time for the static homepage — so
 * the server and the client agree, and every visitor sees the same real date
 * rather than a rolling window that "ends" again on every visit.
 */
const now = new Date();
const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

export const OFFER = {
  headline: "Save up to 55% on longer terms",
  /** ISO date string, or null to use the rolling fallback. */
  endsAt: endOfMonth.toISOString() as string | null,
  /**
   * The same deadline written as a date. `endsInLabel` reads "held until", so
   * what follows it has to be a date rather than a duration.
   */
  heldUntil: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(endOfMonth.getTime() - 1)),
  /** Hours in the rolling fallback window. */
  fallbackHours: 24,
};

export const PRICING = {
  eyebrow: "Transparent GBP pricing",
  /** Split so the last word can take the accent flare, as the hero does. */
  title: { lead: "Choose Your", accent: "Term" },
  multiConnection: {
    lead: "Need more than five screens?",
    highlight: "Extra connections",
    tail: "can be added to any term at checkout, and the price for your term is shown before you pay. Premium already includes a sixth screen, so extra connections there are counted on top of it.",
  },
  includedLabel: "Included on every plan",
} as const;

const STANDARD_FEATURES: Feature[] = [
  { label: "37,000+ live channels with UK coverage", emphasis: true },
  { label: "198,000+ films, series and documentaries on demand", emphasis: true },
  { label: "Native 4K UHD where the broadcast supports it" },
  { label: "Full EPG with 7-day catch-up" },
  { label: "5 screens at once on one login" },
  { label: "24/7 UK support by WhatsApp" },
  { label: "Activation by email in minutes" },
  { label: "30-day money-back guarantee", emphasis: true },
  { label: "One-time payment — no stored card, no auto-renewal" },
];

const PREMIUM_FEATURES: Feature[] = [
  { label: "Everything in Standard" },
  { label: "Secure Proxy included — an encrypted route for shared or public networks", emphasis: true },
  { label: "A sixth simultaneous screen", emphasis: true },
  { label: "Same 30-day money-back guarantee" },
];

export const TIERS: Record<TierId, Tier> = {
  standard: {
    id: "standard",
    label: "Standard",
    baseScreens: 5,
    proxyIncluded: false,
    tagline: "The full service. Everything below is on every term.",
    features: STANDARD_FEATURES,
    /**
     * Badges are (was - price) / was, rounded:
     *    39.99 -> 25.99 = 35.01%     59.99 -> 35.99 = 40.01%
     *    89.99 -> 49.99 = 44.45%    159.99 -> 79.99 = 50.00%
     * Three of these did not match their own prices (45 / 40 / 55 claimed).
     * Prices are unchanged; the badges now follow the arithmetic.
     */
    plans: [
      { id: "s3",  term: "3 Months",  months: 3,  proxyPrice: 4.75,  extraConnectionPrice: 7.25,  note: "Try a full term risk-free",      was: "£39.99",  save: "Save 35%", savePct: 35, price: "25.99", currency: "£", cta: "Choose 3 Months" },
      { id: "s6",  term: "6 Months",  months: 6,  proxyPrice: 9.50,  extraConnectionPrice: 14.50, note: "Half a year, one payment",       was: "£59.99",  save: "Save 40%", savePct: 40, price: "35.99", currency: "£", cta: "Choose 6 Months" },
      { id: "s12", term: "12 Months", months: 12, proxyPrice: 19.00, extraConnectionPrice: 29.00, note: "Best balance of term and price", was: "£89.99",  save: "Save 44%", savePct: 44, price: "49.99", currency: "£", cta: "Choose 12 Months", featured: true },
      { id: "s24", term: "24 Months", months: 24, proxyPrice: 38.00, extraConnectionPrice: 58.00, note: "Lowest monthly cost — £3.33/mo", was: "£159.99", save: "Save 50%", savePct: 50, price: "79.99", currency: "£", cta: "Choose 24 Months" },
    ],
  },
  premium: {
    id: "premium",
    label: "Premium",
    baseScreens: 6,
    proxyIncluded: true,
    badge: "Both add-ons",
    tagline:
      "The same service, with the Secure Proxy and a sixth screen included. Every term costs less bundled than buying those two add-ons on top of Standard — £3.99 less on three months, rising to £60.99 less on twenty-four.",
    features: PREMIUM_FEATURES,
    /**
     * Four terms, matching Standard. Premium is now priced BELOW the sum of
     * its parts — a genuine bundle saving, not a pass-through. Every figure
     * traces back:
     *
     *   sum of parts = Standard + proxy + one extra connection
     *      3mo   25.99 +  4.75 +  7.25 =  37.99   sold at  34.00  → saves   3.99
     *      6mo   35.99 +  9.50 + 14.50 =  59.99   sold at  49.00  → saves  10.99
     *     12mo   49.99 + 19.00 + 29.00 =  97.99   sold at  63.00  → saves  34.99
     *     24mo   79.99 + 38.00 + 58.00 = 175.99   sold at 115.00  → saves  60.99
     *
     *   `was` = Standard `was` + the same two add-ons at list price
     *      3mo   39.99 +  4.75 +  7.25 =  51.99  →  34.00 is 34.60% off → 35%
     *      6mo   59.99 +  9.50 + 14.50 =  83.99  →  49.00 is 41.66% off → 42%
     *     12mo   89.99 + 19.00 + 29.00 = 137.99  →  63.00 is 54.34% off → 54%
     *     24mo  159.99 + 38.00 + 58.00 = 255.99  → 115.00 is 55.08% off → 55%
     *
     * `extraConnectionPrice` is Standard's + £10 flat on every term. That is
     * the marginal price of a SEVENTH screen onward — the sixth is already in
     * the bundle. The two are different things and no copy may equate them.
     */
    plans: [
      { id: "p3",  term: "3 Months",  months: 3,  proxyPrice: 4.75,  extraConnectionPrice: 17.25, note: "Separately £37.99 — you save £3.99",   was: "£51.99",  save: "Save 35%", savePct: 35, price: "34.00",  currency: "£", cta: "Choose 3 Months" },
      { id: "p6",  term: "6 Months",  months: 6,  proxyPrice: 9.50,  extraConnectionPrice: 24.50, note: "Separately £59.99 — you save £10.99",  was: "£83.99",  save: "Save 42%", savePct: 42, price: "49.00",  currency: "£", cta: "Choose 6 Months" },
      { id: "p12", term: "12 Months", months: 12, proxyPrice: 19.00, extraConnectionPrice: 39.00, note: "Separately £97.99 — you save £34.99",  was: "£137.99", save: "Save 54%", savePct: 54, price: "63.00",  currency: "£", cta: "Choose 12 Months", featured: true },
      { id: "p24", term: "24 Months", months: 24, proxyPrice: 38.00, extraConnectionPrice: 68.00, note: "Separately £175.99 — you save £60.99", was: "£255.99", save: "Save 55%", savePct: 55, price: "115.00", currency: "£", cta: "Choose 24 Months" },
    ],
  },
};

export const TIER_ORDER: TierId[] = ["standard", "premium"];

/** A plan together with the tier it belongs to — the tier carries the rules. */
export type PlanWithTier = { plan: Plan; tier: Tier };

/**
 * Resolve `?plan=` to a plan. Ids are unique across both tiers (s3…s24 /
 * p3…p24), so one lookup covers the whole ladder.
 */
export function findPlanById(id: string | null | undefined): PlanWithTier | null {
  if (!id) return null;
  for (const tierId of TIER_ORDER) {
    const tier = TIERS[tierId];
    const plan = tier.plans.find((p) => p.id === id);
    if (plan) return { plan, tier };
  }
  return null;
}

/**
 * The order name sent to the checkout hub and shown to the customer.
 * Identical to the Product offer names in the homepage JSON-LD, so a hub
 * order, a rich result and the page all say the same thing.
 */
export function planOrderName({ plan, tier }: PlanWithTier): string {
  return `${plan.term} — ${tier.label}`;
}

/**
 * A per-month figure ONLY when the term divides the price exactly. Our add-ons
 * are sold per term; showing "£2.42/mo" for a £7.25 three-month add-on invents
 * a price nobody is charged and that does not multiply back. Returns null when
 * it does not divide, and the caller shows nothing.
 */
export function exactPerMonth(totalPounds: number, months: number): string | null {
  const pence = Math.round(totalPounds * 100);
  if (months <= 0 || pence % months !== 0) return null;
  return (pence / months / 100).toFixed(2);
}
