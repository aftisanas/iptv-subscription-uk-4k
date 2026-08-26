import styles from "./SidePanel.module.css";

/**
 * Poster-wall backdrop on the hero's right flank. Sits behind the smoke field
 * and the figure — after `.stage`, before `.field` in the atmosphere stack.
 *
 * The asset is opaque RGB (no alpha), so mask-image gradients shape it into the
 * scene: a horizontal dissolve on the left edge into the stage, and a vertical
 * fade at the bottom into the floor scrim. A local scrim pseudo-element under
 * the quote-card region keeps the glass card readable over the busy grid.
 *
 * Static layer — no animation, no filter, no will-change, no blend mode.
 */
export default function SidePanel() {
  return <div className={styles.panel} />;
}
