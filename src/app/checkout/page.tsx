import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

/**
 * Transactional, and deliberately invisible to search.
 *
 * `noindex, nofollow` matches the sister project. The page carries no JSON-LD:
 * it has no Product to describe that `/` does not already describe better, and
 * a second Product node on a thin, parameterised URL would compete with the
 * money page for the same rich result.
 *
 * The title avoids every commercial `iptv subscription` variant on purpose —
 * `/` owns that family and nothing else on this site is allowed near it.
 */
export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  // useSearchParams() suspends during prerender; the boundary keeps the route
  // static rather than forcing it dynamic.
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
