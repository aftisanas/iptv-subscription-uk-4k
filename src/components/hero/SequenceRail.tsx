import styles from "./SequenceRail.module.css";

type Props = {
  /** Milliseconds the fill takes to cross the track; 0 freezes it at the start. */
  duration: number;
  /** Bumped on every chapter change to restart the fill animation. */
  cycle: number;
};

/**
 * Full-width hairline with the burning red-to-amber fill that tracks how much
 * of the current chapter has played.
 */
export default function SequenceRail({ duration, cycle }: Props) {
  return (
    <div className={styles.rail}>
      <div className={styles.track}>
        <span
          key={cycle}
          className={styles.fill}
          style={duration > 0 ? { animationDuration: `${duration}ms` } : undefined}
          data-static={duration === 0 ? "" : undefined}
        />
      </div>
    </div>
  );
}
