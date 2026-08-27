export type Device = {
  /** File stem in /public/devices — not a content field; the asset names it. */
  id: string;
  /** Product name — the accessible label for a wordmark image. */
  name: string;
};

export const DEVICES_CONTENT = {
  eyebrow: "Works on what you own",
  /** Split so the last word can take the accent flare, as every title does. */
  title: { lead: "One Subscription, Every Screen In The", accent: "House" },
  lede:
    "Your login works across five screens at once, in any combination. There is no separate app to buy and no box to rent — if the device runs a player app, it runs your subscription.",
  cta: { label: "Get it on your screens", note: "Five screens on one login. Works on the device you already own." },
  note: "New to this? The Fire TV Stick walkthrough covers the whole process end to end, including which player app to use and what to do if a channel will not load.",
} as const;

/**
 * The wordmarks ship as white silhouettes rebuilt from inverted luminance —
 * the source artwork is ink-on-white, and seven of the twelve would have been
 * invisible on this background in their original colours.
 *
 * `IPTV Smarters Pro` is an app rather than a device. It stays because it is
 * genuinely supported and it is what buyers search for — listed as supported,
 * not optimised for.
 */
export const DEVICES: Device[] = [
  { id: "fire-tv-stick", name: "Amazon Fire TV Stick" },
  { id: "samsung-smart-tv", name: "Samsung Smart TV" },
  { id: "lg-smart-tv", name: "LG Smart TV" },
  { id: "android-tv", name: "Android TV" },
  { id: "ios", name: "iPhone & iPad" },
  { id: "magbox", name: "MagBox" },
  { id: "nvidia-shield", name: "NVIDIA Shield" },
  { id: "android", name: "Android phones & tablets" },
  { id: "iptv-smarters", name: "IPTV Smarters Pro" },
  { id: "xbox-live", name: "Xbox" },
  { id: "webplayer", name: "Web player" },
  { id: "windows", name: "Windows PC" },
];
