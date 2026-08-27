"use client";

import { useRef, useState } from "react";
import Countdown from "./Countdown";
import TierToggle from "./TierToggle";
import PlanCard from "./PlanCard";
import { HAS_TIER_CHOICE, PRICING, TIERS, VISIBLE_TIERS, type TierId } from "@/data/pricing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Pricing.module.css";

/**
 * Pricing, built from the site's own parts: the hero's glass, its meta-rail
 * labels, its burning sequence rail, its pill controls, and the red-to-amber
 * flare it puts on the one word that matters.
 *
 * Both tiers render at once, stacked in a single grid cell with the inactive
 * one faded and inert — so the section holds the height of the taller tier,
 * switching never shifts the page, and the swap is a compositor-only fade.
 */
export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.1 });
  const [tier, setTier] = useState<TierId>(VISIBLE_TIERS[0]);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      data-tier={tier}
      aria-labelledby="pricing-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.countdown}>
          <Countdown />
        </div>

        <h2 id="pricing-title" className={styles.title}>
          {PRICING.title.lead} <span className={styles.flare}>{PRICING.title.accent}</span>
        </h2>

        <p className={styles.eyebrow}>{PRICING.eyebrow}</p>

        {/* The switch only exists when there is something to switch between.
            With one tier on sale it would be a control that does nothing. */}
        {HAS_TIER_CHOICE ? (
          <div className={styles.toggle}>
            <TierToggle value={tier} onChange={setTier} />
          </div>
        ) : null}

        {/* Both taglines share one cell, so the line under the switch cannot
            jump as the copy length changes between tiers. */}
        <div className={styles.taglines}>
          {VISIBLE_TIERS.map((id) => (
            <p key={id} className={styles.tagline} data-shown={tier === id ? "" : undefined}>
              {TIERS[id].tagline}
            </p>
          ))}
        </div>

        {/* A slim glass note rather than a boxed banner — the same pill the
            navbar uses, carrying one useful sentence. */}
        <p className={styles.note}>
          <span className={styles.noteDash} aria-hidden="true" />
          <span className={styles.noteLead}>{PRICING.multiConnection.lead}</span>
          <span className={styles.noteDot} aria-hidden="true" />
          <span className={styles.noteStrong}>{PRICING.multiConnection.highlight}</span>{" "}
          {PRICING.multiConnection.tail}
        </p>
      </div>

      <div className={styles.plansViewport}>
        {VISIBLE_TIERS.map((id) => (
          <div
            key={id}
            className={styles.plans}
            data-shown={tier === id ? "" : undefined}
            aria-hidden={tier === id ? undefined : true}
            inert={tier !== id}
          >
            {TIERS[id].plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                features={TIERS[id].features}
                tier={id}
                index={index}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
