import type { Metadata } from "next";
import { SITE_LOGO_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import ContactContent from "./ContactContent";

const title = "Contact IPTV Subscription UK 4K — 24/7 UK IPTV Support";
const description =
  "Get in touch with the IPTV Subscription UK 4K support team. 24/7 IPTV subscription support via WhatsApp, email and live chat. A named UK team that answers in minutes — setup, troubleshooting and account help all in one place.";
const url = `${SITE_URL}/contact`;

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

export default function ContactPage() {
  return <ContactContent />;
}
