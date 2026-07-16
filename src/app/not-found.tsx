import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4">
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Go Home
          </Link>
          <Link
            href="/iptv-subscription-uk"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-violet-300 hover:bg-violet-50"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
