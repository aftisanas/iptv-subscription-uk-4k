"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { METRICS, type Metric } from "@/data/metrics";
import styles from "./MetricsStrip.module.css";

/**
 * Individual metric cell. Separated so each counter can use its own
 * useCountUp hook independently — React hooks cannot be called in a loop.
 *
 * Until the strip is revealed — which includes every server render and every
 * non-JavaScript client — the cell prints `metric.display`. The count-up only
 * takes over once it is actually running, so a crawler reads "37,000+ Live
 * Channels" and never "0+ Live Channels".
 */
function MetricCell({ metric, revealed }: { metric: Metric; revealed: boolean }) {
  const counting = metric.countTo !== undefined && revealed;

  const counted = useCountUp({
    end: metric.countTo ?? 0,
    duration: 2200,
    decimals: metric.decimals ?? 0,
    enabled: counting,
  });

  const displayValue = counting
    ? `${metric.prefix ?? ""}${counted}${metric.suffix ?? ""}`
    : metric.display;

  return (
    <div className={styles.metric}>
      <span className={styles.value}>{displayValue}</span>
      <span className={styles.label}>{metric.label}</span>
    </div>
  );
}

/**
 * A horizontal strip of animated metrics that counts up on scroll.
 * Sits between the hero and the statement, bridging their backgrounds.
 */
export default function MetricsStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(stripRef, { threshold: 0.3 });

  return (
    <section
      ref={stripRef}
      className={styles.strip}
      data-revealed={revealed ? "" : undefined}
      aria-label="Key metrics"
    >
      <div className={styles.inner}>
        {METRICS.map((metric) => (
          <MetricCell key={metric.label} metric={metric} revealed={revealed} />
        ))}
      </div>
    </section>
  );
}
