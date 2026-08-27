export type KeyFeature = {
  label: string;
  /** Lifted to full ink — the handful a buyer actually scans for. */
  emphasis?: boolean;
};

export const KEY_FEATURES_CONTENT = {
  eyebrow: "What you get",
  /** Split so the last word can take the accent flare, as the hero does. */
  title: { lead: "Everything On Every", accent: "Plan" },
  imageAlt: "An IPTV subscription channel guide open on a UK smart TV",
  cta: { label: "See plans & pricing", note: "From £3.33 a month on the 24-month term. 30-day money-back guarantee." },
} as const;

export const KEY_FEATURES: KeyFeature[] = [
  { label: "37,000+ live channels with UK coverage", emphasis: true },
  { label: "198,000+ films, series and documentaries on demand", emphasis: true },
  { label: "Native 4K UHD where the broadcast supports it", emphasis: true },
  { label: "5 screens at once on a single login", emphasis: true },
  { label: "Full electronic programme guide, now and next" },
  { label: "7-day catch-up on supported channels" },
  { label: "Adaptive bitrate — quality adjusts before playback stops" },
  { label: "Top-flight football and major sporting events" },
  { label: "International and multilingual channel packs" },
  { label: "Kids and family channels with PIN-protected controls" },
  { label: "News and documentary channels in HD" },
  { label: "Works on Fire TV Stick, smart TVs, phones, tablets and computers" },
  { label: "Activation details by email, usually within minutes" },
  { label: "Optional Secure Proxy add-on for shared networks" },
  { label: "30-day money-back guarantee on every term" },
];
