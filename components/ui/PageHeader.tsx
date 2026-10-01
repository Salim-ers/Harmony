import type { ReactNode } from "react";
import { RevealLines, Rise } from "@/components/motion/Reveal";

export function PageHeader({
  kicker,
  lines,
  intro,
  children,
}: {
  kicker?: string;
  lines: ReactNode[];
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-x pb-16 pt-36 md:pb-24 md:pt-48">
      {kicker && <p className="meta mb-8 text-mist">{kicker}</p>}
      <RevealLines as="h1" immediate lines={lines} className="display-xl max-w-[16ch] text-paper" />
      {intro && (
        <Rise immediate delay={0.3} className="lede mt-10 max-w-[46ch] text-paper/70">
          {intro}
        </Rise>
      )}
      {children}
    </header>
  );
}
