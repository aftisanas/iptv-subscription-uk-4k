/**
 * Metrics displayed in the counter strip below the hero.
 * Each metric can be a counting number or a static string.
 *
 * `display` is the server-rendered value and the count-up only ever replaces
 * it after hydration — a crawler must never read "0+ Live Channels".
 */
export type Metric = {
  /** Final displayed value — the SSR value, and the whole value for static metrics. */
  display: string;
  /** If set, the number counts up from 0 to this value once revealed. */
  countTo?: number;
  /** Prefix before the number (e.g. "£"). */
  prefix?: string;
  /** Suffix after the number (e.g. "+", "/mo"). */
  suffix?: string;
  /** Number of decimal places for the count (default 0). */
  decimals?: number;
  /** Label shown below the number. */
  label: string;
};

export const METRICS: Metric[] = [
  {
    display: "37,000+",
    countTo: 37000,
    suffix: "+",
    label: "Live Channels",
  },
  {
    display: "198,000+",
    countTo: 198000,
    suffix: "+",
    label: "Films & Series",
  },
  {
    display: "4K UHD",
    label: "Native Streaming",
  },
  {
    /** £79.99 ÷ 24 = £3.33. */
    display: "£3.33/mo",
    countTo: 3.33,
    prefix: "£",
    suffix: "/mo",
    decimals: 2,
    label: "From, 24-Month Plan",
  },
];
