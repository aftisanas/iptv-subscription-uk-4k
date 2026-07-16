import { Shield, Wifi, Lock, ServerCog } from "lucide-react";
import Link from "next/link";
import MotionReveal from "./MotionReveal";

const trustItems = [
  {
    icon: Shield,
    title: "30-Day Money-Back Guarantee",
    description:
      "Try the full service for 30 days. Ask for a refund by live chat and we send it the same day.",
  },
  {
    icon: Wifi,
    title: "Reliable UK-Optimised Streaming",
    description:
      "Our ops team monitors every server around the clock. Outages reroute in seconds so you keep watching.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Payment Security",
    description:
      "TLS 1.3 on checkout keeps your card safe. An optional Secure Proxy add-on is available for private viewing on shared networks.",
  },
  {
    icon: ServerCog,
    title: "Instant Activation, No Wait",
    description:
      "Your login fires the moment your order is confirmed. Open the message, copy the code and press play.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-11 lg:py-16">
      <div className="absolute inset-0 section-gradient-2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionReveal y={20} className="text-center mb-16">
          <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-4">
            Four-Part IPTV Promise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our IPTV Promise{" "}
            <span className="gradient-text">To UK Viewers</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted">
            We back every plan with a four-part promise. If any part fails, your{" "}
            <Link href="/refund" className="text-violet-600 hover:text-violet-700 underline-offset-2 hover:underline">
              money comes back
            </Link>.
          </p>
        </MotionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <MotionReveal key={item.title} delay={i * 0.1} y={20}>
              <div className="group text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 transition-all group-hover:border-emerald-200 group-hover:bg-emerald-100 group-hover:shadow-lg group-hover:shadow-emerald-100/50">
                  <item.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
