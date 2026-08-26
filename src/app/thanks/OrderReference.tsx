"use client";

import { useState } from "react";
import styles from "./Thanks.module.css";

export default function OrderReference({
  reference,
  label,
}: {
  reference: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (older browsers, insecure context) — no-op so
      // the reference stays visible for manual selection.
    }
  };

  return (
    <div className={styles.reference}>
      <div className={styles.referenceBody}>
        <p className={styles.referenceLabel}>{label}</p>
        <p className={styles.referenceValue}>{reference}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.copy}
        aria-label={copied ? "Reference copied" : "Copy reference to clipboard"}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
