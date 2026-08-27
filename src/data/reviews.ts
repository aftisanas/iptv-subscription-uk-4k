export type Review = {
  id: string;
  /** File path under /public/reviews. */
  image: string;
  /** Intrinsic pixel size. The three shots are not all the same aspect ratio,
   *  so the ratio has to travel with the file rather than be hard-coded. */
  w: number;
  h: number;
  /** Micro-label above the screenshot. */
  label: string;
  /** One line of context under the label. */
  caption: string;
};

/**
 * Trust panels, not testimonials. We have collected no published reviews, so
 * the section shows what protects the buyer instead of what other buyers said.
 *
 * No `Review` schema, no `aggregateRating`, no rating, score or count claims
 * anywhere — the UK DMCC Act 2024 makes that distinction worth keeping clean.
 */
export const REVIEWS_CONTENT = {
  eyebrow: "Before you buy",
  /**
   * Deliberately empty. The figure that stood here was a placeholder, not a
   * measurement, and it is not being replaced with another one.
   */
  renewRate: "",
  headlineTail: "What backs the purchase",
  lede:
    "We have not collected published reviews, so we are not going to show you any. What we can show you is exactly what protects you if the service does not do what this page says.",
  cta: { label: "Start watching now", note: "Login by email, usually within minutes of paying." },
  note: "Questions before you pay are welcome. WhatsApp reaches a person, not a ticket queue.",
} as const;

export const REVIEWS: Review[] = [
  {
    id: "guarantee",
    image: "/reviews/review-1.webp",
    w: 1080,
    h: 2340,
    label: "30-day money-back guarantee",
    caption: "Ask on WhatsApp inside 30 days and the payment comes back. No form, no retention call.",
  },
  {
    id: "no-billing",
    image: "/reviews/review-2.webp",
    w: 720,
    h: 1390,
    label: "No stored card, no auto-renewal",
    caption: "Payment happens once, over WhatsApp. There is no saved card on this site to charge again.",
  },
  {
    id: "support",
    image: "/reviews/review-3.webp",
    w: 1080,
    h: 2340,
    label: "A named UK mailbox and WhatsApp",
    caption: "Setup help, troubleshooting and refunds all run through the same channel, 24/7.",
  },
];
