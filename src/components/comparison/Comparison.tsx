"use client";

import { useRef } from "react";
import { COMPARISON as C, COMPARISON_ROWS, type CellValue } from "@/data/comparison";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Comparison.module.css";

function Tick({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.4 7.4 5.5 10.5 11.6 3.9" />
    </svg>
  );
}

/** A tick, a dash, or plain text — with a readable label for assistive tech. */
function Cell({ value, tier }: { value: CellValue; tier: "standard" | "premium" }) {
  if (value === true) {
    return (
      <>
        <Tick className={styles.tick} />
        <span className="visually-hidden">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span className={styles.dash} aria-hidden="true" />
        <span className="visually-hidden">Not included</span>
      </>
    );
  }
  return <span className={tier === "premium" ? styles.valueHot : styles.value}>{value}</span>;
}

/**
 * Our subscription against a typical satellite or cable package. A real table,
 * because this is tabular data and a grid of divs would read as noise to a
 * screen reader — but dressed in the
 * site's own parts: hairline rows, meta-rail column heads, and the burning
 * rail marking the right-hand column the way it marks the featured plan.
 */
export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="comparison-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDash} aria-hidden="true" />
          {C.eyebrow}
        </p>

        <h2 id="comparison-title" className={styles.title}>
          {C.title.lead} <span className={styles.flare}>{C.title.accent}</span>
        </h2>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">
              {`${C.columns.standard} compared with ${C.columns.premium.toLowerCase()}`}
            </caption>
            <thead>
              <tr>
                <th scope="col" className={styles.headFeature}>
                  {C.columns.feature}
                </th>
                <th scope="col" className={styles.headTier}>
                  {C.columns.standard}
                </th>
                <th scope="col" className={`${styles.headTier} ${styles.premium}`}>
                  <span className={styles.premiumLabel}>
                    {C.columns.premium}
                    <span className={styles.badge}>{C.premiumBadge}</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.feature}
                  className={styles.row}
                  data-differs={row.differs ? "" : undefined}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <th scope="row" className={styles.feature}>
                    {row.feature}
                  </th>
                  <td className={styles.cell}>
                    <Cell value={row.standard} tier="standard" />
                  </td>
                  <td className={`${styles.cell} ${styles.premium}`}>
                    <Cell value={row.premium} tier="premium" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.footnote}>{C.footnote}</p>
      </div>
    </section>
  );
}
