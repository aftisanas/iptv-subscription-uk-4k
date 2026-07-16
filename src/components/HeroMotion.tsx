"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroMotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}

export default function HeroMotion({
  children,
  delay = 0,
  duration = 0.7,
  y,
  x,
  scale,
  className,
}: HeroMotionProps) {
  const initial: Record<string, number> = { opacity: 0 };
  const animate: Record<string, number> = { opacity: 1 };

  if (y !== undefined) {
    initial.y = y;
    animate.y = 0;
  }
  if (x !== undefined) {
    initial.x = x;
    animate.x = 0;
  }
  if (scale !== undefined) {
    initial.scale = scale;
    animate.scale = 1;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
