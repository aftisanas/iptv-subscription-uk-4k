"use client";

import { useRef, useState } from "react";
import { FAQ, FAQ_CONTENT as C } from "@/data/faq";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Faq.module.css";

/**
 * FAQ. Native `<details>` rather than a hand-rolled accordion — it opens
 * without JavaScript, is findable by in-page search even while collapsed, and
 * already carries the right semantics for assistive tech. The one piece of
 * state is which panel is open, so opening a second closes the first.
 */
export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.08 });
  const [open, setOpen] = useState<string | null>(FAQ[0]?.id ?? null);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="faq-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.dash} aria-hidden="true" />
          {C.eyebrow}
        </p>

        <h2 id="faq-title" className={styles.title}>
          {C.title.lead}{" "}
          <span className={styles.flare}>{C.title.accent}</span>
        </h2>

        <p className={styles.lede}>{C.lede}</p>

        <div className={styles.list}>
          {FAQ.map((item, index) => (
            <details
              key={item.id}
              className={styles.item}
              open={open === item.id}
              style={{ "--i": index } as React.CSSProperties}
              onToggle={(event) => {
                const el = event.currentTarget;
                if (el.open) setOpen(item.id);
                else if (open === item.id) setOpen(null);
              }}
            >
              <summary className={styles.question}>
                <span className={styles.sign} aria-hidden="true" />
                <span className={styles.questionText}>{item.question}</span>
              </summary>
              <div className={styles.answerWrap}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <p className={styles.note}>{C.footNote}</p>
      </div>
    </section>
  );
}
