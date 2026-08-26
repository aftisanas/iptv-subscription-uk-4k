/**
 * "Why Choose Us" section content — three value-proposition cards.
 * Each card has an icon key (mapped to inline SVGs in the component),
 * a title, and a description.
 */
export type Advantage = {
  /** Key used to pick the right inline SVG icon. */
  icon: "delivery" | "vpn" | "billing";
  title: string;
  description: string;
};

export const WHY_CHOOSE_US = {
  /** Split so the last word can take the accent flare, as the hero does. */
  heading: { lead: "Why buy your IPTV subscription", accent: "here" },
  advantages: [
    {
      icon: "billing" as const,
      title: "You Pay Once. Nothing Renews.",
      description:
        "Checkout happens over WhatsApp and no card is stored on this site, so there is no saved payment method to charge again. When your term ends it simply ends — you decide whether to start another one. Most of what people fear about an IPTV subscription is the quiet second charge; there isn't one to fear here.",
    },
    {
      icon: "delivery" as const,
      title: "Thirty Days To Change Your Mind",
      description:
        "Every plan carries a 30-day money-back guarantee, and we would rather you used it than kept a service that doesn't suit you. Install it on the device you actually watch on, try it during the evenings you actually watch, and ask for a refund on WhatsApp if it falls short. No form, no retention script.",
    },
    {
      icon: "vpn" as const,
      title: "A Privacy Add-On, Not A Bundled Promise",
      description:
        "Plenty of providers advertise a built-in VPN as though it costs nothing. Ours is an optional Secure Proxy you add at checkout if you want an encrypted route on a shared or public network, and you skip if you don't. It is priced separately because it is a separate thing, and pretending otherwise would just be a higher base price with a nicer label.",
    },
  ] satisfies Advantage[],
} as const;
