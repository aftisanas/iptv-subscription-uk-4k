"use client";

import { TIERS, TIER_ORDER, type TierId } from "@/data/pricing";
import styles from "./TierToggle.module.css";

type Props = {
  value: TierId;
  onChange: (tier: TierId) => void;
};

/**
 * Standard on the left, Premium on the right — the upgrade always sits where
 * the eye finishes. Keyboard behaves like a real radio group: arrows move and
 * select, which is what a two-state switch should do.
 */
export default function TierToggle({ value, onChange }: Props) {
  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const count = TIER_ORDER.length;
    const next = TIER_ORDER[(TIER_ORDER.indexOf(value) + step + count) % count];
    onChange(next);
  };

  return (
    <div
      className={styles.switch}
      data-active={value}
      role="radiogroup"
      aria-label="Choose your quality level"
      onKeyDown={onKeyDown}
    >
      {/* One lit surface slides between the two, rather than each lighting up
          on its own — the movement is what sells it as a switch. */}
      <span className={styles.glide} aria-hidden="true" />

      {TIER_ORDER.map((id) => {
        const tier = TIERS[id];
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className={styles.option}
            data-tier={id}
            onClick={() => onChange(id)}
          >
            <span className={styles.label}>{tier.label}</span>
            {tier.badge ? <span className={styles.badge}>{tier.badge}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
