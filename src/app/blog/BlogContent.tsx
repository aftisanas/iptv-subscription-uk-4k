"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag, BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/constants";

const categoryColors: Record<string, string> = {
  Guide: "bg-primary/10 text-primary border border-primary/10",
  Tutorial: "bg-accent/10 text-accent border border-accent/10",
  Comparison: "bg-accent/10 text-accent border border-accent/20",
  Sports: "bg-success/10 text-success border border-success/20",
  Legal: "bg-neon/10 text-neon border border-neon/20",
};

export default function BlogContent() {
  return (
    <div>
      {/* ── Premium Hero Section ── */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-24">
        {/* Deep premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050507] via-[#120a10] to-[#0a0a12]" />

        {/* Aurora blobs */}
        <div
          className="aurora-blob w-[600px] h-[600px] bg-primary/25 -top-32 -left-32"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="aurora-blob w-[450px] h-[450px] bg-accent/20 top-1/4 right-[-8%]"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="aurora-blob w-[400px] h-[400px] bg-neon/15 bottom-[-15%] left-1/3"
          style={{ animationDelay: "8s" }}
        />
        <div
          className="aurora-blob w-[300px] h-[300px] bg-primary/12 top-[30%] left-[55%]"
          style={{ animationDelay: "6s" }}
        />

        {/* Radial overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.07),transparent_60%)]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-[20%] left-[12%] w-2 h-2 rounded-full bg-primary/50 animate-float" />
        <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 rounded-full bg-accent/40 animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[20%] left-[25%] w-1 h-1 rounded-full bg-neon/50 animate-float" style={{ animationDelay: "5s" }} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card backdrop-blur-md px-5 py-2.5 text-sm text-muted mb-8"
          >
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="font-medium">Expert Guides & Streaming Tips</span>
            <span className="flex gap-0.5 text-accent">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">IPTV UK Guides &amp;{" "}</span>
            <br />
            <span className="gradient-text-hero">Streaming Tips</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted leading-relaxed prose-body"
          >
            Expert articles on IPTV setup, streaming optimisation, device guides,
            and the latest in UK television — written to be run against any
            provider, including our own{" "}
            <Link href="/" className="text-accent hover:text-accent-hover underline-offset-2">
              IPTV subscription plans
            </Link>
            .
          </motion.p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
      </section>

      {/* Blog Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-border-bright hover:bg-card-hover hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Gradient header area */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/12 via-accent/6 to-transparent flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,160,43,0.07),transparent_70%)]" />
                    <div className="relative text-6xl font-bold text-primary/25 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Category tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || "bg-primary/10 text-primary"}`}>
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted mb-3">
                      <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-foreground mb-3 transition-colors group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
