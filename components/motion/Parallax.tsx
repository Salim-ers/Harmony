"use client";

import { m, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/** Calque qui remonte légèrement au défilement (parallaxe douce, premier écran). */
export function Parallax({ distance, className, children }: { distance: number; className?: string; children: ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -distance], { clamp: true });
  return (
    <m.div style={{ y }} className={className}>
      {children}
    </m.div>
  );
}
