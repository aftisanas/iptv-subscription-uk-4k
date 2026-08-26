"use client";

import ArrowUpRight from "../icons/ArrowUpRight";
import { HERO_CONTENT as C } from "@/data/hero-content";
import { OFFER } from "@/data/pricing";
import styles from "./OfferCard.module.css";

/**
 * The hero's offer. It replaces the quote card in the same glass shell, and
 * carries the four things a first-time visitor needs before they will scroll:
 * what the discount is, how long it lasts, what it costs, and what happens if
 * they change their mind.
 *
 * The deadline reads the same `OFFER` as the pricing section, so the two can
 * never disagree. It is printed as a date rather than a ticking duration: the
 * label says "held until", and it is a real end-of-month date, not a rolling
 * window that restarts on every visit.
 */
export default function OfferCard() {
  const o = C.offer;

  return (
    <div className={styles.card}>
      {/* The hero's burning rail, capping the card the way it marks the
          featured plan further down the page. */}
      <span className={styles.rail} aria-hidden="true" />

      <p className={styles.label}>
        <span className={styles.pulse} aria-hidden="true" />
        {o.label}
      </p>

      <p className={styles.headline}>{o.headline}</p>

      <div className={styles.clock}>
        <span className={styles.clockLabel}>{o.endsInLabel}</span>
        <time className={styles.time} dateTime={OFFER.endsAt ?? undefined}>
          {OFFER.heldUntil}
        </time>
      </div>

      <p className={styles.assurance}>{o.assurance}</p>

      <div className={styles.actions}>
        <a className={styles.primary} href={o.primary.href}>
          <span className={styles.primaryLabel}>{o.primary.label}</span>
          <span className={styles.primaryPrice}>{o.primary.price}</span>
          <ArrowUpRight className={styles.arrow} />
        </a>

        <a className={styles.secondary} href={o.secondary.href}>
          {o.secondary.label}
        </a>
      </div>
    </div>
  );
}
