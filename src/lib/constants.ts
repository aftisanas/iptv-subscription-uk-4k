export const SITE_NAME = "IPTV Subscription UK 4K";
export const SITE_URL = "https://iptv-subscription-uk-4k.com";
export const SITE_LOGO_PATH = "/logo.webp";
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;
export const CONTACT_EMAIL = "contact@buy-iptv-uk.com";

export const WHATSAPP_NUMBER = "447878757831";
export const WHATSAPP_DISPLAY = "+44 7878 757831";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Identifies this site to the shared checkout hub. The hub matches orders to a
 * Shopify store by slug.
 *
 * ⚠️ The hub must have this slug registered. If it does not, the availability
 * probe returns not-available (or 404s) and every order takes the WhatsApp
 * path. That degradation is graceful and safe to ship — but it is silent, so
 * it has to be checked deliberately rather than noticed later.
 */
export const SITE_SLUG = "iptv-subscription-uk-4k";

/**
 * Shared checkout hub. Override per environment with
 * NEXT_PUBLIC_CHECKOUT_HUB_URL; the default matches the sister sites.
 */
export const CHECKOUT_HUB_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_HUB_URL ?? "https://checkout.british-iptv-4k.com";

/**
 * Fallback only. Real extra-connection pricing is per plan and per tier —
 * `Plan.extraConnectionPrice` in src/data/pricing.ts — because the add-on
 * covers the whole term, and Premium's rate is Standard's + £10. This constant
 * is the last resort when no plan is in context.
 */
export const EXTRA_CONNECTION_PRICE = 7.25;
export const EXTRA_CONNECTIONS_MAX = 5;

export const CHECKOUT_COPY = {
  extraConnectionsLabel: "Additional connections",
  extraConnectionsHelp: "One more device streaming at the same time.",
  proxyLabel: "Secure Proxy",
  proxyHelp:
    "An encrypted route for shared, student or public networks. Optional — a private home line rarely needs it.",
  proxyIncludedHelp:
    "Already included in Premium. You are not charged for it again.",
  buyNowLabel: "Complete order",
  whatsappLabel: "Complete order on WhatsApp",
  buttonSubtitleShopify:
    "You will be taken to our secure payment page to finish the order.",
  buttonSubtitleWhatsapp:
    "Opens WhatsApp with your order filled in. Payment details are sent there — never entered on this page.",
  footerNote:
    "No card details are entered on this site. One payment, for the term you chose — nothing renews.",
} as const;

/**
 * The single source of truth for the primary nav. The header is rendered from
 * the root layout on all 16 routes, so every href is root-relative — a bare
 * "#pricing" would resolve against /blog and go nowhere.
 *
 * Blog and Contact are load-bearing: they were added in 41c2061 to give both
 * URLs a sitewide inbound link, and removing either undoes that.
 */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/#pricing" },
  { label: "Devices", href: "/#devices" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "DMCA Policy", href: "/dmca" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Editorial Policy", href: "/editorial-policy" },
] as const;

/**
 * SUPERSEDED by METRICS in src/data/metrics.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/metrics.ts instead, or delete this once you are sure.
 */
export const STATS = [
  { value: "37,000+", label: "Live Channels" },
  { value: "198,000+", label: "Films & Series" },
  { value: "5", label: "Devices at Once" },
  { value: "24/7", label: "UK Support" },
] as const;

/**
 * SUPERSEDED by KEY_FEATURES in src/data/features.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/features.ts instead, or delete this once you are sure.
 */
export const FEATURES = [
  {
    title: "4K UHD IPTV UK Streaming",
    description:
      "Watch films, drama and news in crisp 4K UHD. Every channel adapts to your speed, so the picture never drops.",
    icon: "Monitor" as const,
  },
  {
    title: "37,000+ Channels From Top IPTV Providers",
    description:
      "Pull in sport, drama, news and kids from the best IPTV providers in one app. New channels land each week at no extra cost.",
    icon: "Tv" as const,
  },
  {
    title: "Adaptive Bitrate Streaming",
    description:
      "Streams adjust to the bandwidth actually available at your device, so picture quality steps down before playback stops. Around 25 Mbps gives you 4K; 10 Mbps is comfortable for HD.",
    icon: "Zap" as const,
  },
  {
    title: "Optional Secure Proxy For Added Privacy",
    description:
      "Add our Secure Proxy at checkout for an encrypted route on shared networks. Independent of the core stream — pay only if you need it.",
    icon: "Shield" as const,
  },
  {
    title: "7-Day Catch-Up On British IPTV Channels",
    description:
      "Missed last night? Scroll back seven days on British IPTV favourites. Watch at your pace on any screen.",
    icon: "Clock" as const,
  },
  {
    title: "Electronic Programme Guide (EPG)",
    description:
      "A clean EPG shows what is on now and next. Tap once to record, remind or jump to live play.",
    icon: "LayoutGrid" as const,
  },
  {
    title: "Up To 5 Screens On One IPTV Service",
    description:
      "Share one IPTV service across five devices at home. Everyone watches their own show in HD or 4K at the same time.",
    icon: "Smartphone" as const,
  },
  {
    title: "If A Stream Fails, You Have A Remedy",
    description:
      "Message support on WhatsApp with the channel and device and we will work it through with you. If the service does not do what this page says, the 30-day money-back guarantee is the backstop.",
    icon: "Film" as const,
  },
] as const;

/**
 * SUPERSEDED by TIERS in src/data/pricing.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/pricing.ts instead, or delete this once you are sure.
 */
export const PRICING_PLANS = [
  {
    id: "bronze",
    tier: "Starter Pack",
    name: "3 Months",
    subtitle: "Try it risk-free for a full season",
    price: 25.99,
    originalPrice: 39.99,
    perMonth: 8.66,
    period: "3 months",
    devices: 5,
    proxyPrice: 4.75,
    extraConnectionPrice: 7.25,
    badge: "Starter Pack",
    discount: "-35%",
    accentColor: "violet",
    features: [
      "37,000+ live channels with full UK coverage",
      "198,000+ films, series and documentaries on demand",
      "Full EPG with 7-day catch-up TV",
      "HD, Full HD and native 4K UHD streaming",
      "Extra connection options available as add-ons",
      "24/7 dedicated UK support",
      "Optional Secure Proxy add-on for privacy",
      "30-day money-back guarantee",
      "Instant activation by email",
    ],
    popular: false,
    savings: null,
  },
  {
    id: "silver",
    tier: "Fan Favourite",
    name: "6 Months",
    subtitle: "Half a year of 4K sport, films and drama",
    price: 35.99,
    originalPrice: 59.99,
    perMonth: 6.0,
    period: "6 months",
    devices: 5,
    proxyPrice: 9.5,
    extraConnectionPrice: 14.5,
    badge: "Fan Favourite",
    discount: "-45%",
    accentColor: "violet",
    features: [
      "37,000+ live channels with full UK coverage",
      "198,000+ films, series and documentaries on demand",
      "Full EPG with 7-day catch-up TV",
      "HD, Full HD and native 4K UHD streaming",
      "Extra connection options available as add-ons",
      "24/7 dedicated UK support",
      "Optional Secure Proxy add-on for privacy",
      "30-day money-back guarantee",
      "Instant activation by email",
    ],
    popular: false,
    savings: "Save 45%",
  },
  {
    id: "gold",
    tier: "Annual",
    name: "12 Months",
    subtitle: "Best value for full-year UK sport and TV",
    price: 49.99,
    originalPrice: 89.99,
    perMonth: 4.17,
    period: "year",
    devices: 5,
    proxyPrice: 19.0,
    extraConnectionPrice: 29.0,
    badge: "Most Popular — Save 40%",
    discount: "-40%",
    accentColor: "blue",
    features: [
      "37,000+ live channels with full UK coverage",
      "198,000+ films, series and documentaries on demand",
      "Full EPG with 7-day catch-up TV",
      "HD, Full HD and native 4K UHD streaming",
      "Extra connection options available as add-ons",
      "24/7 dedicated UK support",
      "Optional Secure Proxy add-on for privacy",
      "30-day money-back guarantee",
      "Instant activation by email",
    ],
    popular: true,
    savings: "Save 40%",
  },
  {
    id: "diamond",
    tier: "Best Value",
    name: "24 Months",
    subtitle: "Two years of premium IPTV, locked low",
    price: 79.99,
    originalPrice: 159.99,
    perMonth: 3.33,
    period: "2 years",
    devices: 5,
    proxyPrice: 38.0,
    extraConnectionPrice: 58.0,
    badge: "Best Value — Save 55%",
    discount: "-55%",
    accentColor: "violet",
    features: [
      "37,000+ live channels with full UK coverage",
      "198,000+ films, series and documentaries on demand",
      "Full EPG with 7-day catch-up TV",
      "HD, Full HD and native 4K UHD streaming",
      "Extra connection options available as add-ons",
      "24/7 dedicated UK support",
      "Optional Secure Proxy add-on for privacy",
      "30-day money-back guarantee",
      "Instant activation by email",
    ],
    popular: false,
    savings: "Save 55%",
  },
] as const;

/**
 * SUPERSEDED by DEVICES in src/data/devices.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/devices.ts instead, or delete this once you are sure.
 */
export const DEVICES = [
  { name: "Amazon Fire Stick", icon: "Flame" as const },
  { name: "Smart TV", icon: "Tv" as const },
  { name: "Android / iOS", icon: "Smartphone" as const },
  { name: "Windows / Mac", icon: "Monitor" as const },
  { name: "MAG / Formuler", icon: "Box" as const },
  { name: "Apple TV", icon: "Airplay" as const },
] as const;

/**
 * SUPERSEDED by FAQ in src/data/faq.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/faq.ts instead, or delete this once you are sure.
 */
export const FAQ_ITEMS = [
  {
    question: "What is an IPTV subscription?",
    answer:
      "An IPTV subscription is a service that streams live TV, films and sport over your internet line. You watch on a phone, TV box or smart TV without a satellite dish.",
  },
  {
    question: "How many devices can I use at once?",
    answer:
      "Every IPTV subscription plan covers up to five screens at the same time. Use any mix of TV, phone, tablet or PC. Extra connections can be added at checkout.",
  },
  {
    question: "What internet speed do I need for 4K IPTV?",
    answer:
      "You need 25 Mbps for smooth 4K and 10 Mbps for HD. Our fast IPTV servers also adapt the bitrate if your speed dips.",
  },
  {
    question: "What UK channels are included?",
    answer:
      "You get comprehensive British and international channel coverage — live news, entertainment, sport, kids and documentaries in HD and 4K. Ask on WhatsApp before you buy if you want a specific channel confirmed.",
  },
  {
    question: "Do I need a VPN for IPTV in the UK?",
    answer:
      "A privacy layer is a smart add-on for shared networks. Our Secure Proxy add-on is available at checkout — pay only if you need it.",
  },
  {
    question: "Can I cancel my IPTV subscription?",
    answer:
      "Yes, you can cancel inside 30 days and we refund in full. No lock-in, no fees for cancelling.",
  },
  {
    question: "How do I buy IPTV from you?",
    answer:
      "Pick a plan, confirm the order via WhatsApp and check your inbox. Your IPTV login lands in minutes and you can buy IPTV with full confidence.",
  },
  {
    question: "Is your IPTV subscription good for sports?",
    answer:
      "Our sports pack covers major domestic and international competitions across football, motorsport, combat sport and more. Many top fixtures stream in native 4K.",
  },
  {
    question: "Do you offer a cheap IPTV subscription?",
    answer:
      "Yes, our cheap IPTV subscription starts from £8.66 per month on the 3-month plan. The 12 and 24-month plans drop that rate as low as £3.33/month.",
  },
  {
    question: "What makes this IPTV service different?",
    answer:
      "You pay once, over WhatsApp, with no card stored and nothing set to auto-renew — so there is no second charge to worry about. And you have 30 days to ask for the money back if it does not suit you.",
  },
] as const;

/**
 * SUPERSEDED by MOVIES / CHANNELS in src/data/showcase.ts, which is what the page actually
 * renders. Kept because the corrected figures live here too, but nothing
 * imports it any more: editing this array changes nothing on the site.
 * Change src/data/showcase.ts instead, or delete this once you are sure.
 */
export const CHANNEL_CATEGORIES = [
  {
    name: "Premium IPTV Entertainment Channels",
    count: "500+",
    icon: "Tv" as const,
    channels:
      "Enjoy a complete range of British entertainment in HD, from popular shows and series to documentaries and lifestyle content. Regional variations and +1 timeshift options are included for full viewing flexibility.",
  },
  {
    name: "IPTV Sports Channels",
    count: "5,500+",
    icon: "Trophy" as const,
    channels:
      "Stream live sports across all major competitions and events, including football, motorsports, combat sports, and more. Every key fixture and tournament is available in high quality within one package.",
  },
  {
    name: "Best IPTV Movies & Cinema In 4K",
    count: "198,000+",
    icon: "Film" as const,
    channels:
      "Browse major cinema and film feeds from UK and global studios. 198,000 films in the VOD library, refreshed daily.",
  },
  {
    name: "IPTV UK Kids & Family Channels",
    count: "800+",
    icon: "Baby" as const,
    channels:
      "A wide selection of family-friendly content keeps children entertained at all times. Secure parental controls with PIN protection ensure safe and controlled viewing in just a few taps.",
  },
  {
    name: "Premium IPTV News & Documentary",
    count: "1,200+",
    icon: "Newspaper" as const,
    channels:
      "Stay informed with continuous coverage of global and local events, alongside a rich library of documentary content. Explore history, nature, and real-world stories anytime in high quality.",
  },
  {
    name: "Strong IPTV International & Ethnic Channels",
    count: "17,000+",
    icon: "Globe" as const,
    channels:
      "Enjoy Arabic, Asian, Turkish, Polish and African channels in full HD. Switch feeds by country from the sidebar in one tap.",
  },
] as const;

// `date` is datePublished; `updated` is dateModified and drives sitemap lastmod.
// Bump `updated` only when the post's body actually changes.
export const BLOG_POSTS = [
  {
    slug: "how-to-buy-iptv-subscription-uk",
    title: "How To Buy An IPTV Subscription Safely In The UK",
    excerpt:
      "How to check an operator, pick a term, pay through a traceable method and test inside your refund window — the process, for any UK provider.",
    date: "2026-07-17",
    updated: "2026-07-17",
    readTime: "12 min read",
    category: "Guide",
    keywords: [
      "how to buy iptv subscription uk",
      "buy iptv uk",
      "iptv subscription uk",
      "where to buy iptv safely",
    ],
  },
  {
    slug: "whats-included-in-iptv-subscription-uk",
    title: "What's Included In A UK IPTV Subscription",
    excerpt:
      "Channels, VOD, catch-up, EPG, connections and add-ons — what a UK IPTV subscription genuinely includes, and what is merely marketed as included.",
    date: "2026-07-17",
    updated: "2026-07-17",
    readTime: "12 min read",
    category: "Guide",
    keywords: [
      "what's included in an iptv subscription",
      "iptv subscription features uk",
      "iptv catch up epg",
      "iptv simultaneous connections",
    ],
  },
  {
    slug: "iptv-subscription-renewal-cancellation-refund-uk",
    title: "IPTV Renewal, Cancellation And Refund Rights In The UK",
    excerpt:
      "Your rights under UK consumer law when an IPTV subscription auto-renews, fails to deliver, or refuses a refund — including chargeback and Section 75.",
    date: "2026-07-17",
    updated: "2026-07-17",
    readTime: "11 min read",
    category: "Legal",
    keywords: [
      "iptv refund uk",
      "cancel iptv subscription",
      "iptv cooling off period",
      "iptv chargeback",
    ],
  },
  {
    slug: "how-to-setup-iptv-firestick",
    title: "How To Set Up An IPTV Subscription On A Fire TV Stick",
    excerpt:
      "A full Fire TV Stick walkthrough — installing a player app, entering M3U or Xtream Codes, loading the EPG, and fixing the faults that actually occur.",
    date: "2026-03-20",
    updated: "2026-07-31",
    readTime: "14 min read",
    category: "Tutorial",
    keywords: [
      "iptv firestick setup",
      "how to install iptv on firestick",
      "iptv smarters pro firestick",
      "firestick iptv buffering fix",
    ],
  },
] as const;
