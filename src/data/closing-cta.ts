/** One run of the closing paragraph; `accent` picks it out in the warm ink. */
export type CtaBodyPart = { text: string; accent?: boolean };

/**
 * Closing call to action. Every figure here is repeated from elsewhere on the
 * page on purpose — this is the last thing a visitor reads before deciding, so
 * it must not introduce a number the rest of the page does not support.
 */
export const CLOSING_CTA = {
  badge: "30-day money-back guarantee",
  /** Split so the tail can take the accent flare, as every title does. */
  title: { lead: "Buy An IPTV Subscription In", accent: "Two Minutes" },
  /**
   * Rendered as parts so the load-bearing phrases can carry the accent inline
   * without a dangerous HTML string.
   */
  body: [
    { text: "Pick the term that suits you — " },
    { text: "three, six, twelve or twenty-four months.", accent: true },
    { text: " Confirm it on WhatsApp; " },
    { text: "no card details are entered on this site.", accent: true },
    { text: " Your login arrives by email, usually within minutes." },
    { text: " Install a player app on the device you already watch on, " },
    { text: "enter what we sent, and the channel list loads." },
    { text: " If it is not what this page described, " },
    { text: "ask for your money back within 30 days.", accent: true },
  ] as CtaBodyPart[],
  primary: { label: "Buy An IPTV Subscription — From £3.33/month", href: "#pricing" },
  secondary: { label: "Ask A Question First", href: "https://wa.me/447878757831" },
  note: "One payment, for the term you chose. Nothing renews on its own.",
} as const;
