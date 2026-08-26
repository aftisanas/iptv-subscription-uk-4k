export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

/**
 * Legal is deliberately not a column: the five policy links run as a single
 * compact row in the lowest tier, which frees column four for Guides and
 * raises the inbound link count on /blog.
 */
export const FOOTER = {
  brand: {
    name: "IPTV Subscription UK 4K",
    line: "IPTV subscriptions for UK homes — 37,000+ live channels, 198,000+ films and series, five screens on one login, from £3.33 a month on the 24-month term.",
  },
  cta: {
    lead: "Questions before you buy?",
    label: "Message us on WhatsApp",
    href: "https://wa.me/447878757831",
  },
  columns: [
    {
      title: "Watch",
      links: [
        { label: "Plans & pricing", href: "/#pricing" },
        { label: "What's included", href: "/#features" },
        { label: "Supported devices", href: "/#devices" },
        { label: "Questions answered", href: "/#faq" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact us", href: "/contact" },
        { label: "WhatsApp support", href: "https://wa.me/447878757831" },
        { label: "Refund policy", href: "/refund" },
        { label: "How to set up on Fire TV Stick", href: "/blog/how-to-setup-iptv-firestick" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "UK IPTV subscription plans", href: "/" },
        { label: "Editorial policy", href: "/editorial-policy" },
        { label: "DMCA policy", href: "/dmca" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Guides",
      links: [
        { label: "What's included in a subscription", href: "/blog/whats-included-in-iptv-subscription-uk" },
        { label: "How to buy safely", href: "/blog/how-to-buy-iptv-subscription-uk" },
        { label: "Renewals, cancellation & refunds", href: "/blog/iptv-subscription-renewal-cancellation-refund-uk" },
        { label: "Fire TV Stick setup", href: "/blog/how-to-setup-iptv-firestick" },
      ],
    },
  ] satisfies FooterColumn[],
  assurances: [
    { label: "30-day money-back guarantee" },
    { label: "No stored card, no auto-renewal" },
    { label: "24/7 UK support" },
  ],
  /**
   * Each mark was cut out of the supplied badge and re-rendered as a
   * monochrome silhouette — the original was drawn for white paper and needed
   * a light plaque to survive, which put a bright slab in a black footer.
   *
   * `mcafee` is gone: it is a security certification, not a payment method,
   * and showing a certification we do not hold would be a misrepresentation.
   */
  payment: {
    label: "Payment arranged over WhatsApp",
    marks: [
      { id: "visa", name: "Visa" },
      { id: "mastercard", name: "Mastercard" },
      { id: "amex", name: "American Express" },
      { id: "diners", name: "Diners Club International" },
      { id: "paypal", name: "PayPal" },
    ],
  },
  legal: {
    /** Rendered verbatim — the component adds nothing to it. */
    copyright: "© 2026 iptv-subscription-uk-4k.com — IPTV subscriptions for UK homes",
    note: "IPTV Subscription UK 4K is not affiliated with, endorsed by or connected to any television network, broadcaster or rights-holder. All trademarks are the property of their respective owners.",
    /** The five policy links, as one compact row in the lowest tier. */
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "DMCA Policy", href: "/dmca" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Editorial Policy", href: "/editorial-policy" },
    ] satisfies FooterLink[],
  },
} as const;
