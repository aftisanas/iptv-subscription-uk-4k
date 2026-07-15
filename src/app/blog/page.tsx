import type { Metadata } from "next";
import { SITE_LOGO_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import BlogContent from "./BlogContent";

const title = "IPTV Subscription UK Blog — Best IPTV UK Guides, Setup Tips & Reviews";
const description =
  "Expert guides on IPTV subscription setup, streaming optimisation, device compatibility and the latest in IPTV UK. Learn how to choose the best IPTV providers and unlock the full IPTV Subscription UK 4K experience.";
const url = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    images: [{ url: SITE_LOGO_URL, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_LOGO_URL],
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
