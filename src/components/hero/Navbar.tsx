"use client";

import { useEffect, useRef, useState } from "react";
import BrandMark from "../icons/BrandMark";
import ArrowUpRight from "../icons/ArrowUpRight";
import { HERO_CONTENT as C } from "@/data/hero-content";
import styles from "./Navbar.module.css";

/**
 * Desktop keeps the centre capsule and the solid CTA. Below 760px both are
 * replaced by a single trigger that opens a full sheet — four links at tap
 * size, the CTA as the one hot button, and a close control in the corner the
 * thumb of a right-handed grip already reaches.
 *
 * The links are real anchors in both states, so the section ids stay reachable
 * without JavaScript and the markup a crawler sees is the same one either way.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // The sheet covers the page, so the page behind it must not scroll with it.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={styles.nav}>
      {/* The category label sits beside the mark, not under it. Under the mark
          it read as part of the logo; alongside it, it reads as what it is. */}
      <div className={styles.brandGroup}>
        <a className={styles.brand} href={C.brand.href} aria-label={`${C.brand.name} — home`}>
          <BrandMark className={styles.mark} />
        </a>
        <span className={styles.brandLabel}>{C.rail.left}</span>
      </div>

      <nav className={styles.pill} aria-label="Primary">
        {C.nav.links.map(({ label, href }) => (
          <a key={label} href={href} className={styles.link}>
            {label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href={C.nav.cta.href}>
        <span>{C.nav.cta.label}</span>
        <ArrowUpRight className={styles.arrow} />
      </a>

      {/* ── Mobile trigger ──────────────────────────────────────────────── */}
      <button
        type="button"
        className={styles.burger}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span className={styles.burgerBar} aria-hidden="true" />
        <span className={styles.burgerBar} aria-hidden="true" />
      </button>

      {/* ── Mobile sheet ────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={styles.sheet}
        data-open={open ? "" : undefined}
        // Hidden from assistive tech and from the tab order while closed, but
        // still in the DOM so the links stay in the served HTML.
        inert={!open}
      >
        <button
          type="button"
          ref={closeRef}
          className={styles.close}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* The brand, not HERO_CONTENT.rail.left. That rail is the hero's own
            category label; now the header renders on all 16 routes it would put
            "UK IPTV subscriptions" in the mobile menu of every blog and policy
            page — chrome competing with the money page for its own flag term. */}
        <p className={styles.sheetLabel}>{C.brand.name}</p>

        <nav className={styles.sheetNav} aria-label="Primary, mobile">
          {C.nav.links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={styles.sheetLink}
              onClick={() => setOpen(false)}
            >
              <span>{label}</span>
              <ArrowUpRight className={styles.sheetArrow} />
            </a>
          ))}
        </nav>

        <a className={styles.sheetCta} href={C.nav.cta.href} onClick={() => setOpen(false)}>
          <span>{C.nav.cta.label}</span>
          <ArrowUpRight className={styles.arrow} />
        </a>

        <p className={styles.sheetFoot}>{C.offer.assurance}</p>
      </div>

      <button
        type="button"
        className={styles.scrim}
        data-open={open ? "" : undefined}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
