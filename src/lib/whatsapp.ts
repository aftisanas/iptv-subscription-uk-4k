import { EXTRA_CONNECTION_PRICE, WHATSAPP_NUMBER } from "./constants";

/**
 * Order arithmetic and the WhatsApp fallback message.
 *
 * Ported from the sister project. One thing is genuinely different here and it
 * is the whole reason this file is not a straight copy:
 *
 *   Premium already includes the Secure Proxy in its price.
 *
 * So `proxyEnabled` alone cannot decide whether to add `proxyPrice`. On
 * Standard the proxy is a real add-on and is charged. On Premium it is an
 * entitlement the customer has already paid for inside `planPrice`, so it must
 * be reported in the order but must NOT be added again. `proxyIncluded`
 * carries that distinction, and every total in the app runs through
 * `calculateOrderTotal` so there is exactly one place the rule can be wrong.
 *
 * Defaulting `proxyIncluded` to false means Standard behaves identically to the
 * reference project with no caller changes.
 */

export interface WhatsAppOrderDetails {
  planName: string;
  planPrice: number;
  /** Proxy present on the order — bought (Standard) or bundled (Premium). */
  proxyEnabled: boolean;
  /** Proxy list price for the term. Charged only when it is not already bundled. */
  proxyPrice: number;
  /** True on Premium: the proxy sits inside planPrice and is never re-charged. */
  proxyIncluded?: boolean;
  /** Connections on top of the tier's included screens. */
  extraConnections: number;
  /** Per-plan unit price for one extra connection over the full term. */
  extraConnectionPrice?: number;
  brandName?: string;
}

/** The single source of truth for what an order costs. */
export function calculateOrderTotal(
  order: Omit<WhatsAppOrderDetails, "brandName" | "planName">
): number {
  const unit = order.extraConnectionPrice ?? EXTRA_CONNECTION_PRICE;
  const chargeProxy = order.proxyEnabled && !order.proxyIncluded;
  const total =
    order.planPrice +
    (chargeProxy ? order.proxyPrice : 0) +
    order.extraConnections * unit;
  // Money in pence, back to pounds — avoids 34 + 4.75 landing on 38.749999.
  return Math.round(total * 100) / 100;
}

export interface WhatsappFallbackMessage {
  planName: string;
  proxyOn: boolean;
  /** Premium: say "included" rather than listing it as a purchased add-on. */
  proxyIncluded?: boolean;
  extraConnections: number;
  total: number;
  currency: string;
}

export function buildWhatsappMessage({
  planName,
  proxyOn,
  proxyIncluded = false,
  extraConnections,
  total,
  currency,
}: WhatsappFallbackMessage): string {
  const parts = [`Hi, I'd like to complete my ${planName} order.`];

  const addons: string[] = [];
  if (proxyOn) {
    addons.push(proxyIncluded ? "Secure Proxy (included)" : "Secure Proxy");
  }
  if (extraConnections > 0) {
    addons.push(
      `${extraConnections} extra connection${extraConnections > 1 ? "s" : ""}`
    );
  }

  if (addons.length > 0) {
    parts.push(`Add-ons: ${addons.join(", ")}.`);
  }

  parts.push(`Total: ${currency}${total.toFixed(2)}.`);
  parts.push(
    "The checkout page wasn't available — can you help me complete the order here?"
  );

  return parts.join(" ");
}

/**
 * Full itemised order as a wa.me deep link. Used when the hub never came back
 * at all, so the message has to stand on its own without a hub-side record.
 */
export function buildWhatsAppCheckoutUrl(order: WhatsAppOrderDetails): string {
  const brand = order.brandName ?? "the service";
  const unit = order.extraConnectionPrice ?? EXTRA_CONNECTION_PRICE;
  const extraConnectionsPrice = order.extraConnections * unit;
  const total = calculateOrderTotal({
    planPrice: order.planPrice,
    proxyEnabled: order.proxyEnabled,
    proxyPrice: order.proxyPrice,
    proxyIncluded: order.proxyIncluded,
    extraConnections: order.extraConnections,
    extraConnectionPrice: unit,
  });

  const lines = [
    `Hi 👋 I'd like to order ${brand}.`,
    "",
    `Plan: ${order.planName} (£${order.planPrice.toFixed(2)})`,
  ];

  if (order.proxyEnabled) {
    lines.push(
      order.proxyIncluded
        ? "Secure Proxy: included in this plan (£0.00)"
        : `Secure Proxy: Yes (+£${order.proxyPrice.toFixed(2)})`
    );
  }

  if (order.extraConnections > 0) {
    lines.push(
      `Extra connections: ${order.extraConnections} × £${unit.toFixed(2)} (+£${extraConnectionsPrice.toFixed(2)})`
    );
  }

  lines.push(
    "",
    `Total: £${total.toFixed(2)}`,
    "",
    "Please send me the payment details. Thanks!"
  );

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
