import { NAV_LINKS } from "@/lib/constants";

/**
 * Every string the hero renders. Re-skinning the section for a different
 * subject should be an edit to this file plus the palette in globals.css —
 * never a hunt through the components.
 *
 * The offer countdown deliberately shares `OFFER` with the pricing section, so
 * the two clocks on the page can never show different deadlines.
 */
export const HERO_CONTENT = {
  brand: {
    name: "IPTV Subscription UK 4K",
    href: "/",
  },
  nav: {
    /**
     * Re-exported from constants.ts rather than declared here. The header now
     * renders from the root layout on every route, so there cannot be a
     * homepage nav and a site nav that disagree.
     */
    links: NAV_LINKS,
    cta: { label: "Get My Subscription", href: "/#pricing" },
  },

  /** Meta rail: category on the left, the terms of the deal on the right. */
  rail: {
    left: "UK IPTV subscriptions",
    right: "Paid once — never auto-renewed",
  },

  /**
   * The h1. It leads with the exact plural the page is trying to rank for;
   * the channel count still appears in the lede and the metrics strip, where
   * it costs nothing.
   */
  headline: {
    /** Rendered as its own line. */
    lead: "IPTV Subscriptions For UK Homes,",
    /** Second line: plain text, then the words that carry the accent gradient. */
    tail: "Without The ",
    accent: "Satellite Dish",
  },
  lede:
    "IPTV subscriptions stream live TV, films and sport over your broadband line instead of a satellite dish or a cable contract. Ours carries 37,000+ live channels and 198,000+ films and series, with native 4K UHD wherever the original broadcast supports it, and five screens running at once on one login. You pay once through WhatsApp — no card is stored on this site and nothing renews on its own. Terms run from three to twenty-four months, from £3.33 a month on the 24-month plan, and every one is covered by a 30-day money-back guarantee.",

  devices: {
    src: "/hero/devices-row.webp",
    alt: "An IPTV subscription running on a smart TV, a Fire TV Stick, a tablet and a phone at the same time",
    width: 900,
    height: 135,
  },

  offer: {
    label: "Current pricing",
    headline: "Save up to 55% on longer terms",
    /** Sits under the clock; the promise that removes the risk of clicking. */
    assurance: "30-day money-back guarantee on every plan",
    endsInLabel: "Current pricing held until",
    primary: { label: "Choose A Plan", price: "from £3.33/mo", href: "#pricing" },
    secondary: {
      label: "Ask A Question On WhatsApp",
      href: "https://wa.me/447878757831",
    },
    trustLabel: "What every plan includes",
    /**
     * Text, not payment logos. Checkout runs over WhatsApp and no card is
     * taken on this site, so a row of card marks here would claim a checkout
     * that does not exist.
     */
    marks: [
      "30-day money-back guarantee",
      "No auto-renewal, ever",
      "Activation by email in minutes",
      "UK support, 24/7",
    ],
  },
} as const;

export type HeroContent = typeof HERO_CONTENT;
