/** `true` renders a tick, `false` a dash, a string renders as-is. */
export type CellValue = string | boolean;

export type ComparisonRow = {
  feature: string;
  standard: CellValue;
  premium: CellValue;
  /** Rows where the two genuinely differ. */
  differs?: boolean;
};

/**
 * Repurposed: our subscription against a typical satellite or cable package,
 * not Standard against Premium. Those two tiers differ in exactly three
 * things, so a 15-row tier table would have been twelve rows of "same".
 *
 * `columns.standard` is us; `columns.premium` is traditional TV.
 */
export const COMPARISON = {
  eyebrow: "The honest comparison",
  /** Split so the last word can take the accent flare, as every title does. */
  title: { lead: "IPTV Subscription vs", accent: "Traditional TV" },
  columns: {
    feature: "What you're comparing",
    standard: "Our IPTV subscription",
    premium: "A typical satellite or cable package",
  },
  premiumBadge: "Usually",
  footnote:
    "Traditional package figures are typical UK advertised prices for a comparable entertainment-and-sport tier, taken from publicly listed rates. They vary by provider, region and promotion — check your own bill for an exact comparison.",
} as const;

/**
 * Rows 12 and 13 are marked `differs: false` deliberately. A comparison table
 * where every row favours us reads as marketing; two honest draws make the
 * other thirteen credible.
 */
export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Typical monthly cost", standard: "From £3.33", premium: "£70–£90 with sport", differs: true },
  { feature: "Contract length", standard: "A term you pick, 3–24 months", premium: "Usually 18–24 months, rolling", differs: true },
  { feature: "How you pay", standard: "Once, up front, by WhatsApp", premium: "Monthly direct debit", differs: true },
  { feature: "Auto-renewal", standard: "None — the term simply ends", premium: "Automatic unless cancelled", differs: true },
  { feature: "Card stored", standard: "No card held on this site", premium: "Card or bank details on file", differs: true },
  { feature: "Equipment", standard: "A device you already own", premium: "Box, dish or cable install", differs: true },
  { feature: "Installation", standard: "You enter a login", premium: "Engineer visit, often chargeable", differs: true },
  { feature: "Live channels", standard: "37,000+", premium: "Typically 100–300", differs: true },
  { feature: "On-demand titles", standard: "198,000+", premium: "Varies by tier", differs: true },
  { feature: "Simultaneous screens", standard: "5 on one login", premium: "Usually 1–2, extra boxes cost more", differs: true },
  { feature: "Picture quality", standard: "Up to native 4K UHD", premium: "HD standard, 4K on higher tiers", differs: true },
  { feature: "Programme guide", standard: "Full EPG, now and next", premium: "Full EPG", differs: false },
  { feature: "Catch-up", standard: "7 days on supported channels", premium: "7–30 days", differs: false },
  { feature: "Money-back window", standard: "30 days", premium: "14-day cooling-off, then charges", differs: true },
  { feature: "Cancelling early", standard: "Nothing to cancel", premium: "Early-termination fee", differs: true },
];
