import type { Feature, Plan, TierId } from "@/data/pricing";
import { PRICING } from "@/data/pricing";
import styles from "./PlanCard.module.css";

function Tick({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.4 7.4 5.5 10.5 11.6 3.9" />
    </svg>
  );
}

type Props = {
  plan: Plan;
  features: Feature[];
  tier: TierId;
  /** Staggers the entrance so the row deals in rather than appearing at once. */
  index: number;
};

export default function PlanCard({ plan, features, tier, index }: Props) {
  return (
    <article
      className={styles.card}
      data-tier={tier}
      data-featured={plan.featured ? "" : undefined}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={styles.head}>
        {plan.featured ? <span className={styles.flag}>Most popular</span> : null}
      </div>

      <h3 className={styles.term}>{plan.term}</h3>
      <p className={styles.note}>{plan.note}</p>

      <p className={styles.price}>
        <span className={styles.currency}>{plan.currency}</span>
        <span className={styles.amount}>{plan.price}</span>
      </p>

      <div className={styles.wasRow}>
        <span className={styles.was}>{plan.was}</span>
        <span className={styles.save}>{plan.save}</span>
      </div>

      {/* How far along the discount runs, drawn with the hero's rail. */}
      <div
        className={styles.rail}
        role="img"
        aria-label={`${plan.save} against the usual ${plan.was}`}
      >
        <span className={styles.railFill} style={{ width: `${plan.savePct}%` }} />
      </div>

      <a className={styles.cta} href="#">
        {plan.cta}
      </a>

      <p className={styles.includedLabel}>{PRICING.includedLabel}</p>

      <ul className={styles.features}>
        {features.map((feature) => (
          <li
            key={feature.label}
            className={styles.feature}
            data-emphasis={feature.emphasis ? "" : undefined}
          >
            <Tick className={styles.tick} />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
