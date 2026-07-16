"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  className?: string;
}

export default function MotionReveal({
  children,
  delay = 0,
  duration = 0.5,
  y = 30,
  scale,
  className,
}: MotionRevealProps) {
  const initial: Record<string, number> = { opacity: 0 };
  const animate: Record<string, number> = { opacity: 1 };

  if (y !== 0) {
    initial.y = y;
    animate.y = 0;
  }
  if (scale !== undefined) {
    initial.scale = scale;
    animate.scale = 1;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
