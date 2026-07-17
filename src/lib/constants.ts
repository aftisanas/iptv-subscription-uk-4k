export const SITE_NAME = "IPTV Subscription UK 4K";
export const SITE_URL = "https://iptv-subscription-uk-4k.com";
export const SITE_LOGO_PATH = "/iptv-subscription.webp";
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;
export const CONTACT_EMAIL = "contact@buy-iptv-uk.com";

export const WHATSAPP_NUMBER = "447878757831";
export const WHATSAPP_DISPLAY = "+44 7878 757831";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const EXTRA_CONNECTION_PRICE = 7.25;
export const EXTRA_CONNECTIONS_MAX = 5;

export const CHECKOUT_COPY = {
  extraConnectionsLabel: "Additional Connections",
  extraConnectionsHelp:
    "Add extra simultaneous streams for other rooms or family members.",
  extraConnectionsPriceLabel: `+£${EXTRA_CONNECTION_PRICE.toFixed(2)} per extra connection`,
  buttonLabelPrefix: "Order via WhatsApp",
  buttonSubtitle:
    "You'll be redirected to WhatsApp to confirm the order and receive payment details.",
  footerNote: "Secure ordering via WhatsApp — no card details on this page.",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Why Us", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "DMCA Policy", href: "/dmca" },
  { label: "Refund Policy", href: "/refund" },
] as const;

export const STATS = [
  { value: "37,000+", label: "Live Channels" },
  { value: "198,000+", label: "Films & Series" },
  { value: "5", label: "Devices at Once" },
  { value: "24/7", label: "UK Support" },
] as const;

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
    title: "Anti-Freeze Fast IPTV Technology",
    description:
      "Our fast IPTV network uses smart load balancing across UK servers. The stream stays smooth during peak fixtures and primetime.",
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
    title: "Reliable IPTV Uptime You Can Trust",
    description:
      "Our IPTV grid is monitored around the clock. If a server wobbles, your stream reroutes in seconds so you keep watching.",
    icon: "Film" as const,
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "bronze",
    tier: "Starter Pack",
    name: "3 Months",
    subtitle: "Try it risk-free for a full season",
    price: 25.99,
    originalPrice: 39.99,
    perMonth: 12.99,
    period: "3 months",
    devices: 5,
    proxyPrice: 4.75,
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
    perMonth: 10.99,
    period: "6 months",
    devices: 5,
    proxyPrice: 9.5,
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
    perMonth: 7.79,
    period: "year",
    devices: 5,
    proxyPrice: 19.0,
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
    perMonth: 5.85,
    period: "2 years",
    devices: 5,
    proxyPrice: 38.0,
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

export const DEVICES = [
  { name: "Amazon Fire Stick", icon: "Flame" as const },
  { name: "Smart TV", icon: "Tv" as const },
  { name: "Android / iOS", icon: "Smartphone" as const },
  { name: "Windows / Mac", icon: "Monitor" as const },
  { name: "MAG / Formuler", icon: "Box" as const },
  { name: "Apple TV", icon: "Airplay" as const },
] as const;

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
      "You get comprehensive British and international channel coverage — live news, entertainment, sport, kids and documentaries in HD and 4K. The full line-up sits on the Guide page.",
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
      "Yes, our cheap IPTV subscription starts from £12.99 per month on the 3-month plan. The 12 and 24-month plans drop that rate as low as £5.85/month.",
  },
  {
    question: "What makes this IPTV service different?",
    answer:
      "Other IPTV service brands oversell and then freeze on match night. Our UK server grid and anti-freeze tech hold a clean 4K stream when it matters.",
  },
] as const;

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

export const BLOG_POSTS = [
  {
    slug: "how-to-buy-iptv-subscription-uk",
    title: "How To Buy An IPTV Subscription In The UK — A Step-By-Step Guide",
    excerpt:
      "Buying an IPTV subscription in the UK — the practical steps from decision to first stream. Payment verification, activation, and how to use your refund window properly.",
    date: "2026-07-17",
    readTime: "14 min read",
    category: "Guide",
  },
  {
    slug: "whats-included-in-iptv-subscription-uk",
    title: "What's Included In A UK IPTV Subscription? The Complete Anatomy",
    excerpt:
      "What UK IPTV subscriptions actually include — channels, VOD, catch-up, EPG, connections and add-ons. What's genuinely bundled versus what's merely marketed as bundled.",
    date: "2026-07-17",
    readTime: "14 min read",
    category: "Guide",
  },
  {
    slug: "iptv-subscription-renewal-cancellation-refund-uk",
    title: "IPTV Subscription Renewal, Cancellation And Refund Rights In The UK",
    excerpt:
      "UK consumer-rights guide for IPTV subscribers — the cooling-off period, cancellation, refund routes, chargeback, and what to do when a service doesn't deliver.",
    date: "2026-07-17",
    readTime: "13 min read",
    category: "Legal",
  },
  {
    slug: "best-iptv-uk-guide-2026",
    title: "Best IPTV UK 2026 — How To Choose A Trusted IPTV Provider",
    excerpt:
      "Finding the best IPTV service in the UK means looking beyond flashy promises. This guide breaks down the 7 criteria that matter most for British viewers — from channel quality and reliability to support and genuine value.",
    date: "2026-04-01",
    readTime: "12 min read",
    category: "Guide",
  },
  {
    slug: "how-to-setup-iptv-firestick",
    title: "How To Set Up An IPTV Subscription On Amazon Fire Stick",
    excerpt:
      "A complete, beginner-friendly guide to installing and configuring an IPTV subscription on an Amazon Fire Stick. Stream 37,000 UK channels in 4K in under 10 minutes using the step-by-step instructions below.",
    date: "2026-03-20",
    readTime: "6 min read",
    category: "Tutorial",
  },
] as const;
