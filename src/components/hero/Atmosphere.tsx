import styles from "./Atmosphere.module.css";
import SidePanel from "./SidePanel";

/**
 * Everything behind the copy: the graded stage, the poster wall on the right
 * flank, a static cool bloom, the vignette and the grain.
 *
 * All five layers are painted once. There is no figure, no smoke field and no
 * running animation in this section any more — the grade and the colour are
 * the same, the per-frame cost is zero.
 */
export default function Atmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.stage} />
      <SidePanel />
      <div className={styles.bloom} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}
