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
    tail: "can be added to any term at checkout — ask on WhatsApp before you pay and we will quote the exact figure for your term.",
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
    tagline: "The full service. Everything below is on every term.",
    features: STANDARD_FEATURES,
    plans: [
      { id: "s3",  term: "3 Months",  note: "Try a full term risk-free",        was: "£39.99",  save: "Save 35%", savePct: 35, price: "25.99", currency: "£", cta: "Choose 3 Months" },
      { id: "s6",  term: "6 Months",  note: "Half a year, one payment",         was: "£59.99",  save: "Save 45%", savePct: 45, price: "35.99", currency: "£", cta: "Choose 6 Months" },
      { id: "s12", term: "12 Months", note: "Best balance of term and price",   was: "£89.99",  save: "Save 40%", savePct: 40, price: "49.99", currency: "£", cta: "Choose 12 Months", featured: true },
      { id: "s24", term: "24 Months", note: "Lowest monthly cost — £3.33/mo",   was: "£159.99", save: "Save 55%", savePct: 55, price: "79.99", currency: "£", cta: "Choose 24 Months" },
    ],
  },
  premium: {
    id: "premium",
    label: "Premium",
    badge: "Both add-ons",
    tagline:
      "The same service, with the Secure Proxy and a sixth screen included. Priced at exactly the sum of the parts — no bundle mark-up, on every term.",
    features: PREMIUM_FEATURES,
    /**
     * Four terms, matching Standard. Every price is Standard + the Secure
     * Proxy + one extra connection, added exactly at that term's rate — the
     * add-ons scale with the term, so the ladder is arithmetic, not a guess:
     *
     *   proxy   £4.75 / £9.50 / £19.00 / £38.00
     *   extra   £7.25 / £14.50 / £29.00 / £58.00
     *
     * `was` is the Standard `was` plus the same two add-ons at list price, so
     * every struck-through figure traces back to a real number.
     */
    plans: [
      { id: "p3",  term: "3 Months",  note: "Standard £25.99 + £4.75 + £7.25",  was: "£51.99",  save: "Save 27%", savePct: 27, price: "37.99",  currency: "£", cta: "Choose 3 Months" },
      { id: "p6",  term: "6 Months",  note: "Standard £35.99 + £9.50 + £14.50", was: "£83.99",  save: "Save 29%", savePct: 29, price: "59.99",  currency: "£", cta: "Choose 6 Months" },
      { id: "p12", term: "12 Months", note: "Standard £49.99 + £19.00 + £29.00", was: "£137.99", save: "Save 29%", savePct: 29, price: "97.99",  currency: "£", cta: "Choose 12 Months", featured: true },
      { id: "p24", term: "24 Months", note: "Standard £79.99 + £38.00 + £58.00", was: "£255.99", save: "Save 31%", savePct: 31, price: "175.99", currency: "£", cta: "Choose 24 Months" },
    ],
  },
};

export const TIER_ORDER: TierId[] = ["standard", "premium"];
