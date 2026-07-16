"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
