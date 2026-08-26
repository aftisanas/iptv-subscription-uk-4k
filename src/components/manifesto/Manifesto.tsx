"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import BrandMark from "../icons/BrandMark";
import ArrowUpRight from "../icons/ArrowUpRight";
import { MANIFESTO_CONTENT as C } from "@/data/manifesto-content";
import styles from "./Manifesto.module.css";

/**
 * Legality and editorial trust. Centred copy with a warm atmospheric glow
 * that fades to near-black, matching the cinematic grade of the hero above.
 *
 * Scroll-triggered: elements reveal staggered as the section enters the
 * viewport. Respects reduced-motion and the existing design-token system.
 */
export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
    >
      {/* Warm atmospheric glow — painted once, no animation cost. */}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.content}>
        {/* Icon + label eyebrow */}
        <div className={styles.eyebrow}>
          <BrandMark className={styles.mark} />
          <span className={styles.label}>{C.eyebrow}</span>
        </div>

        {/* Large headline with chromatic gradient */}
        <h2 className={styles.headline}>
          {C.headline.lines.map((line, i) => (
            <span key={i} className={styles.line}>
              {line}
            </span>
          ))}
        </h2>

        {/* The argument, one checkable claim per line. */}
        <ul className={styles.claims}>
          {C.lines.map((line) => (
            <li key={line} className={styles.claim}>
              <span className={styles.claimDash} aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>

        {/* Body text */}
        <p className={styles.body}>{C.body}</p>

        {/* CTA buttons */}
        <div className={styles.actions}>
          <a href={C.cta.primary.href} className={styles.btnPrimary}>
            <span>{C.cta.primary.label}</span>
            <ArrowUpRight className={styles.arrow} />
          </a>
          <a href={C.cta.secondary.href} className={styles.btnSecondary}>
            <span>{C.cta.secondary.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
