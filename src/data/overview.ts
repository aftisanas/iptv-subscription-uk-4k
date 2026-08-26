/**
 * Long-form overview. This is the page's densest block of copy, so it is
 * structured rather than stored as prose: cards, rows and steps, each of which
 * the component renders in the site's own vocabulary.
 */
export const BRAND = "IPTV Subscription UK 4K";

export type Pillar = {
  id: string;
  title: string;
  body: string[];
};

export type PlanRow = {
  term: string;
  price: string;
};

export type Step = {
  title: string;
  body: string;
};

export const OVERVIEW = {
  eyebrow: "The full picture",
  title: { lead: "UK IPTV Subscriptions, Explained", accent: "Properly" },
  intro:
    "Most pages selling a UK IPTV subscription tell you the channel count and stop. This section covers what the number actually means, what the service does when your connection dips, what you are agreeing to when you pay, and how long it takes to get watching. If something here reads as vague, that is usually a sign the claim cannot be checked — so we have tried not to make any.",

  pillarsLabel: "Five things worth knowing before you pay",
  pillars: [
    {
      id: "coverage",
      title: "What 37,000 channels actually means",
      body: [
        "The figure counts every live channel on the service, across every region we carry — UK, Europe, North America, the Middle East, Asia and Africa. Nobody watches 37,000 channels. What the number tells you is that the UK line-up is not a thin selection padded out with duplicates, and that multilingual households are unlikely to run out of options.",
        "The categories that matter to most UK buyers are entertainment, sport, films, news, kids and international. Sport includes top-flight football and the major domestic and international competitions. We do not list broadcaster names on this page, and you should be cautious of any IPTV subscription that does.",
      ],
    },
    {
      id: "stability",
      title: "What happens when your connection dips",
      body: [
        "Streams are delivered at an adaptive bitrate. When your available bandwidth falls, the picture quality steps down before playback stops — you get a softer image rather than a frozen one. That is a real, ordinary technique, not a proprietary feature, and it is the honest answer to \u201Cwill it buffer\u201D.",
        "For 4K you want around 25 Mbps to the device; HD is comfortable at 10. A wired connection beats wi-fi on a busy evening more reliably than any setting either of us can change. If a stream does fail repeatedly, that is what the 30-day window is for.",
      ],
    },
    {
      id: "privacy",
      title: "The Secure Proxy is optional, and priced like it",
      body: [
        "An encrypted route is genuinely useful on shared, student or public networks, and unnecessary on a private home line. So it is an add-on you choose at checkout rather than something bundled into the headline price and described as free. If you add it, it costs £4.75 on the 3-month term and scales with longer terms; if you skip it, you pay less.",
      ],
    },
    {
      id: "devices",
      title: "Five screens, one login, no extra boxes",
      body: [
        "The subscription runs on hardware you already own — a Fire TV Stick, a smart TV, a phone, a tablet or a computer. Five can watch different things at the same time on one login. A sixth connection can be added at checkout if your household needs it. There is nothing to rent and nothing to install in the wall.",
      ],
    },
    {
      id: "support",
      title: "Who answers, and how fast",
      body: [
        "Support runs through WhatsApp and a shared UK mailbox, 24/7. The same channel handles setup questions, a channel that will not load, and refund requests — you are not routed somewhere else for the awkward one. We do not publish a response-time figure because we cannot prove one to you.",
      ],
    },
  ] satisfies Pillar[],

  plans: {
    label: "The four terms",
    lede: "Every term carries the identical service. The only thing that changes is how long it runs and what that works out at per month.",
    rows: [
      { term: "3 Months", price: "£25.99 — £8.66/month" },
      { term: "6 Months", price: "£35.99 — £6.00/month" },
      { term: "12 Months", price: "£49.99 — £4.17/month" },
      { term: "24 Months", price: "£79.99 — £3.33/month" },
    ] satisfies PlanRow[],
    includesLabel: "On every term, without exception",
    includes: [
      "37,000+ live channels and 198,000+ on-demand titles",
      "Native 4K UHD where the broadcast supports it",
      "5 simultaneous screens on one login",
      "Full EPG with 7-day catch-up",
      "30-day money-back guarantee and 24/7 UK support",
    ],
  },

  steps: {
    label: "How to install an IPTV subscription, start to finish",
    items: [
      {
        title: "Pick your term",
        body: "Choose 3, 6, 12 or 24 months on this page. The service is identical across all four — you are only choosing how long it runs and whether you want the Secure Proxy or a sixth screen.",
      },
      {
        title: "Confirm on WhatsApp",
        body: "The button opens a WhatsApp message with your chosen plan already filled in. You confirm, we send payment details, and no card details are entered on this website at any point.",
      },
      {
        title: "Install a player app",
        body: "Your login arrives by email, usually within minutes, as either an M3U link or Xtream Codes credentials. Install a player app on the device you watch on, enter what we sent, and the channel list loads.",
      },
      {
        title: "Test it properly",
        body: "Watch during the evenings you would normally watch — Friday and Saturday between 7pm and 10pm is the honest test. Check the specific channels you bought this for. The 30-day window exists so you can do exactly that before committing.",
      },
    ] satisfies Step[],
  },

  closing: {
    title: "Television without the contract",
    body: "The reason UK IPTV subscriptions keep growing is not that the picture is better than satellite — it is that the terms are. You pay once, for a period you chose, on hardware you already own, and when it ends nothing happens automatically. For a lot of households that is the whole argument.",
    kicker: "Still deciding?",
    kickerBody: "Read what's actually included in a UK IPTV subscription before you buy anything — from us or anyone else. It is the guide we would want to read first.",
  },
} as const;
