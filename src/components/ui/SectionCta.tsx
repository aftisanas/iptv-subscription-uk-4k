import styles from "./SectionCta.module.css";

type Props = {
  /** Button text. */
  label: string;
  /** One short line under the button. Optional — omit rather than pad. */
  note?: string;
  /** In-page target. Defaults to the pricing ladder. */
  href?: string;
  /**
   * `center` for full-width sections, `start` where the CTA sits under a
   * left-aligned column and should line up with it.
   */
  align?: "center" | "start";
};

/**
 * The one mid-page call to action, used by every section that has earned a
 * click. Single component on purpose: three hand-rolled buttons would drift
 * apart in size, weight and hover within a week.
 *
 * A real anchor, not a button — it is navigation, it works without JS, and the
 * in-page target is crawlable.
 */
export default function SectionCta({
  label,
  note,
  href = "#pricing",
  align = "center",
}: Props) {
  return (
    <div className={styles.wrap} data-align={align}>
      <a className={styles.button} href={href}>
        <span className={styles.label}>{label}</span>
        <svg
          className={styles.arrow}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h9M8.5 4l4 4-4 4" />
        </svg>
      </a>
      {note ? <p className={styles.note}>{note}</p> : null}
    </div>
  );
}
