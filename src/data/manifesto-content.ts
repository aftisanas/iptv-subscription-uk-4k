/**
 * Legality & editorial trust. The two plural-family keywords this block owns
 * ("are iptv subscriptions legal / illegal") deserve real estate, and a single
 * FAQ line is not an E-E-A-T block.
 *
 * Same pattern as hero-content.ts: every string lives here.
 */
export const MANIFESTO_CONTENT = {
  /** Icon label shown above the headline. */
  eyebrow: "The question everyone asks",
  headline: {
    /** Each line rendered as its own block for line-break control. */
    lines: ["Are IPTV subscriptions", "legal in the UK?"],
  },
  /** The argument, one claim per line. */
  lines: [
    "The technology is lawful. IPTV is television delivered over an internet connection — no different in principle from any streaming app on your TV.",
    "What determines legality is whether the operator holds the rights to what it transmits. That is a question about the provider, not about IPTV.",
    "The signs of a provider worth trusting are ordinary and checkable: a real refund policy, transparent terms, a published complaints route, and support that answers before you have paid.",
    "Anyone promising you every premium broadcaster for a few pounds a month is telling you something about their licensing position, whether they mean to or not.",
  ],
  body: "We do not claim to supply any named broadcaster's channels, and you will not find one named anywhere on this site. We publish a DMCA policy and act on valid notices. We publish who writes this material and how it is reviewed. If any of that is missing from a provider you are considering, that absence is itself the answer to your question — and it is worth more than a channel count.",
  cta: {
    primary: { label: "How we write and review this site", href: "/editorial-policy" },
    secondary: { label: "Our DMCA policy", href: "/dmca" },
  },
} as const;

export type ManifestoContent = typeof MANIFESTO_CONTENT;
