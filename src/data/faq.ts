export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_CONTENT = {
  eyebrow: "Frequently asked",
  /** Split so the last word can take the accent flare, as every title does. */
  title: { lead: "IPTV Subscription", accent: "Questions" },
  lede: "The questions people actually send us before they buy, answered without the sales gloss.",
  footNote: "Something not covered? Ask on WhatsApp before you pay — we would rather answer first.",
} as const;

export const FAQ: FaqItem[] = [
  {
    id: "what-is",
    question: "What is an IPTV subscription?",
    answer:
      "It is access to live television, films and sport delivered over your broadband connection instead of a satellite dish or cable line. You install a player app on a device you already own, enter the login we email you, and the channels load. You are buying a fixed term you choose up front, not a rolling account.",
  },
  {
    id: "legal",
    question: "Are IPTV subscriptions legal in the UK?",
    answer:
      "The technology is entirely lawful — it is just television over the internet. Whether a particular service is lawful depends on the rights the operator holds for what it transmits, which is a question about the provider rather than about IPTV. Look for a published refund policy, transparent terms, a DMCA route and support that answers before you pay.",
  },
  {
    id: "payment",
    question: "How do I pay, and will I be charged again?",
    answer:
      "You confirm your plan on WhatsApp and pay once. No card details are entered on this website and nothing is stored, so there is no saved payment method that could be charged a second time. When your term ends, it ends — starting another one is your decision.",
  },
  {
    id: "screens",
    question: "How many screens can I watch at once?",
    answer:
      "Five, on one login, in any combination of TV, phone, tablet and computer. A sixth simultaneous connection can be added at checkout if your household needs it.",
  },
  {
    id: "speed",
    question: "What internet speed do I need?",
    answer:
      "Around 25 Mbps at the device for 4K, and about 10 Mbps for HD. Streams use an adaptive bitrate, so if your bandwidth dips the picture softens rather than stopping. A wired connection is more reliable than wi-fi on a busy evening.",
  },
  {
    id: "devices",
    question: "Which devices does it work on?",
    answer:
      "Fire TV Stick, smart TVs from most manufacturers, Android TV boxes, iPhone and iPad, Android phones and tablets, Windows, Mac, MAG boxes, NVIDIA Shield and a browser-based web player. If it runs a player app, it runs the subscription.",
  },
  {
    id: "activation",
    question: "How quickly does it activate?",
    answer:
      "Login details are emailed once payment is confirmed — usually within minutes. You will receive either an M3U playlist link or Xtream Codes credentials, depending on the player app you plan to use.",
  },
  {
    id: "refund",
    question: "Can I cancel and get my money back?",
    answer:
      "Yes, within 30 days of purchase, on any plan. Ask on WhatsApp and the payment is returned. There is no cancellation to process because there is no recurring billing to stop.",
  },
  {
    id: "failure",
    question: "What if a channel or stream does not work?",
    answer:
      "Message WhatsApp with the channel name and the device — most issues are a player-app setting or a network problem and are resolved in the conversation. If the service genuinely does not deliver what this page describes, the 30-day window is the remedy and we would rather you used it than stayed unhappy.",
  },
  {
    id: "vpn",
    question: "Do I need a VPN?",
    answer:
      "Not on a private home connection. On a shared, student or public network an encrypted route is worth having, which is why the Secure Proxy is offered as a paid add-on rather than bundled in and described as free. Add it if it applies to you; skip it if it does not.",
  },
  {
    id: "tiers",
    question: "What is the difference between Standard and Premium?",
    answer:
      "The television is identical — same channels, same films, same 4K, same guarantee. Premium adds the Secure Proxy and a sixth simultaneous screen, and bundles them for less than the two cost added to Standard separately: £3.99 less on the 3-month term, rising to £60.99 less on the 24-month. If you need neither, Standard is the whole service and nothing is missing from it.",
  },
  {
    id: "catchup",
    question: "What are the EPG and catch-up?",
    answer:
      "The EPG is the on-screen programme guide showing what is on now and next across the channel list. Catch-up lets you scroll back up to seven days on supported channels and watch something you missed. Both are included on every term.",
  },
];
