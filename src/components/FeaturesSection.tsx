import {
  Tv, Monitor, Clock, Film, Smartphone, LayoutGrid, Zap, Shield,
} from "lucide-react";
import SectionLink from "./SectionLink";
import MotionReveal from "./MotionReveal";
import { FEATURES } from "@/lib/constants";

const iconMap = {
  Tv, Monitor, Clock, Film, Smartphone, LayoutGrid, Zap, Shield,
} as const;

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-12 lg:py-14">
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <MotionReveal y={20} className="text-center lg:mb-12 mb-10">
          <span className="inline-block rounded-full bg-violet-50 border border-violet-200 px-4 py-1.5 text-sm font-medium text-violet-700 mb-4">
            Built For UK Homes · Everything Included
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Features Of Our IPTV Subscription{" "}
            <span className="gradient-text">For UK Homes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Every plan ships with the tools you need to watch more and wait less. Here is what you get on day one with every{" "}
            <SectionLink href="/#pricing" className="text-violet-600 hover:text-violet-700 underline-offset-2 hover:underline">
              IPTV subscription
            </SectionLink>.
          </p>
        </MotionReveal>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <MotionReveal key={feature.title} delay={i * 0.05}>
                <div className="group relative rounded-2xl border border-violet-100/60 bg-white p-6 transition-all duration-500 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/40 premium-card h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50/50 to-cyan-50/20 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-cyan-50 transition-all group-hover:from-violet-200/80 group-hover:to-cyan-100/50 group-hover:shadow-md group-hover:shadow-violet-200/30">
                      <Icon className="h-6 w-6 text-violet-600 transition-colors group-hover:text-purple-600" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
