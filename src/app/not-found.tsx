import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          This page could not be found.
        </h1>
        <p className="text-base text-muted leading-relaxed mb-8">
          The link you followed may be broken or the page may have been moved. Head back to the
          home page or browse the pricing plans below.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--accent-flare)] px-6 py-3 text-sm font-semibold text-[color:var(--cta-ink)] transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Go Home
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-border-bright hover:bg-card-hover"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
