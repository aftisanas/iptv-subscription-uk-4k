import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import OrderReference from "./OrderReference";
import styles from "./Thanks.module.css";

/** Post-checkout return page. Noindex, and absent from the sitemap. */
export const metadata: Metadata = {
  title: "Order received",
  description: `Thank you for your ${SITE_NAME} order.`,
  alternates: { canonical: "/thanks" },
  robots: { index: false, follow: false },
};

type ThanksSearchParams = {
  order?: string | string[];
  cart?: string | string[];
  plan?: string | string[];
  amount?: string | string[];
  proxy?: string | string[];
  extras?: string | string[];
};

const firstParam = (value: string | string[] | undefined): string | null => {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

const parseIntParam = (value: string | null): number | null => {
  if (value === null) return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<ThanksSearchParams>;
}) {
  const resolved = await searchParams;
  const orderId = firstParam(resolved.order);
  const cartId = firstParam(resolved.cart);
  const reference = orderId ?? cartId;

  const planName = firstParam(resolved.plan);
  const amountPence = parseIntParam(firstParam(resolved.amount));
  const proxyOn = firstParam(resolved.proxy) === "1";
  const extras = parseIntParam(firstParam(resolved.extras)) ?? 0;
  const amountPounds = amountPence !== null ? amountPence / 100 : null;
  const showSummary = Boolean(planName);

  const supportMessage = reference
    ? `Hi, I need help with my order ${reference}`
    : `Hi, I need help with my ${SITE_NAME} order`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(supportMessage)}`;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.card}>
          <span className={styles.tick} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <h1 className={styles.title}>Order received</h1>

          <p className={styles.lede}>
            Your login details are on their way by email. They usually arrive within a
            minute.
          </p>

          <p className={styles.spam} role="note">
            If it has not appeared, check your spam or junk folder and mark it as
            &ldquo;not spam&rdquo; so the next one reaches you. Failing that,{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> reaches the same team.
          </p>

          {showSummary ? (
            <div className={styles.summary}>
              <p className={styles.summaryLabel}>Order summary</p>
              <ul className={styles.summaryList}>
                <li>{planName}</li>
                {proxyOn ? <li>Secure Proxy</li> : null}
                {extras > 0 ? (
                  <li>
                    {extras} extra connection{extras > 1 ? "s" : ""}
                  </li>
                ) : null}
              </ul>
              {amountPounds !== null ? (
                <p className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>£{amountPounds.toFixed(2)}</span>
                </p>
              ) : null}
            </div>
          ) : null}

          {reference ? (
            <OrderReference
              reference={reference}
              label={orderId ? "Order reference" : "Cart reference"}
            />
          ) : null}

          {/* The sister project links /tutorials here. We have no such route —
              shipping it would add an internal link to a 404. The Fire TV Stick
              walkthrough is the equivalent page on this site. */}
          <Link className={styles.next} href="/blog/how-to-setup-iptv-firestick">
            <span className={styles.nextTitle}>Set it up</span>
            <span className={styles.nextSub}>
              The Fire TV Stick walkthrough covers the whole process, and the faults that
              actually come up
            </span>
          </Link>

          <div className={styles.actions}>
            <a
              className={styles.wa}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Contact ${SITE_NAME} support on WhatsApp at ${WHATSAPP_DISPLAY}`}
            >
              Something wrong? Message us on WhatsApp
            </a>
            <Link className={styles.home} href="/">
              Back to {SITE_NAME}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
