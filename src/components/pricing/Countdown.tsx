"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { OFFER } from "@/data/pricing";
import styles from "./Countdown.module.css";

export default function Countdown() {
  const left = useCountdown(OFFER.endsAt, OFFER.fallbackHours);

  return (
    <div className={styles.bar}>
      <svg className={styles.clock} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="9" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 6.2V9l2 1.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6.2 1.8h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      <span className={styles.text}>
        <span className={styles.strong}>{OFFER.headline}</span> — ends in
      </span>

      <span className={styles.time} role="timer" aria-live="off">
        {left && left.days !== "0" ? (
          <span className={styles.days}>{left.days}d</span>
        ) : null}
        <span className={styles.unit}>{left?.hours ?? "--"}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.unit}>{left?.minutes ?? "--"}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.unit}>{left?.seconds ?? "--"}</span>
      </span>
    </div>
  );
}
