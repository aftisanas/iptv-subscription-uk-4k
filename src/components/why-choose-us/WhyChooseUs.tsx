"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WHY_CHOOSE_US as C } from "@/data/why-choose-us";
import styles from "./WhyChooseUs.module.css";

/* ── Inline SVG icons — small, purposeful, no external deps ────────────── */
function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function VpnIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function BillingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  delivery: DeliveryIcon,
  vpn: VpnIcon,
  billing: BillingIcon,
};

/**
 * "Why Choose Us" — three value-proposition cards between Pricing and Key
 * Features. Built from the same parts as the plan cards: the hero's glass, its
 * hairline, its lit top edge, and the flare on the title's last word.
 */
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.12 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {C.heading.lead} <span className={styles.flare}>{C.heading.accent}</span>
        </h2>

        <div className={styles.grid}>
          {C.advantages.map((adv, i) => {
            const Icon = ICONS[adv.icon];
            return (
              <article key={adv.icon} className={styles.card} data-index={i}>
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{adv.title}</h3>
                <p className={styles.cardBody}>{adv.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
