"use client";

import { useRef } from "react";
import { OVERVIEW as C } from "@/data/overview";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Overview.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * The long-form block. Prose this dense reads as a wall if it is set as prose,
 * so it is broken into the vocabulary the rest of the page already uses:
 * numbered glass cards for the pillars, hairline rows for the plans, and the
 * hero's rail for the steps. The copy itself is untouched.
 */
export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.05 });

  return (
    <section
      ref={sectionRef}
      id="overview"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="overview-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Head ─────────────────────────────────────────────────────── */}
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden="true" />
            {C.eyebrow}
          </p>

          <h2 id="overview-title" className={styles.title}>
            {C.title.lead} <span className={styles.flare}>{C.title.accent}</span>
          </h2>

          <p className={styles.intro}>{C.intro}</p>
        </header>

        {/* ── Pillars ──────────────────────────────────────────────────── */}
        <h3 className={styles.blockLabel}>{C.pillarsLabel}</h3>

        <ul className={styles.pillars}>
          {C.pillars.map((pillar, i) => (
            <li
              key={pillar.id}
              className={styles.pillar}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.index} aria-hidden="true">
                {pad(i)}
              </span>
              <h4 className={styles.pillarTitle}>{pillar.title}</h4>
              {pillar.body.map((para) => (
                <p key={para} className={styles.pillarBody}>
                  {para}
                </p>
              ))}
            </li>
          ))}
        </ul>

        {/* ── Plans + steps, side by side on wide screens ──────────────── */}
        <div className={styles.split}>
          <div className={styles.panel}>
            <h3 className={styles.panelLabel}>{C.plans.label}</h3>
            <p className={styles.panelLede}>{C.plans.lede}</p>

            <ul className={styles.planRows}>
              {C.plans.rows.map((row) => (
                <li key={row.term} className={styles.planRow}>
                  <span className={styles.planTerm}>{row.term}</span>
                  <span className={styles.planDots} aria-hidden="true" />
                  <span className={styles.planPrice}>{row.price}</span>
                </li>
              ))}
            </ul>

            <p className={styles.includesLabel}>{C.plans.includesLabel}</p>
            <ul className={styles.chips}>
              {C.plans.includes.map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.panel}>
            <h3 className={styles.panelLabel}>{C.steps.label}</h3>

            {/* The hero's rail, upright: a hairline threading numbered nodes. */}
            <ol className={styles.steps}>
              {C.steps.items.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.node} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <div className={styles.closing}>
          <h3 className={styles.closingTitle}>{C.closing.title}</h3>
          <p className={styles.closingBody}>{C.closing.body}</p>

          <p className={styles.kicker}>
            <span className={styles.kickerDash} aria-hidden="true" />
            {C.closing.kicker}
          </p>
          <p className={styles.closingBody}>{C.closing.kickerBody}</p>
        </div>
      </div>
    </section>
  );
}
