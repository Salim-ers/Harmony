import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Animations d’apparition sans JavaScript par instance :
 * le balisage porte un attribut data-reveal, un seul observateur
 * (RevealObserver, monté dans le layout) ajoute la classe .is-in,
 * et les transitions sont en CSS (globals.css).
 * Sans JS, ou si l’utilisateur réduit les animations, tout reste visible.
 */

const delayStyle = (d: number) => ({ ["--d" as string]: `${d}s` }) as CSSProperties;

/** Titre révélé ligne par ligne, chaque ligne remonte derrière un masque. */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  id,
}: {
  id?: string;
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Au chargement (haut de page) : mouvement seul, texte visible dès le premier rendu */
  immediate?: boolean;
}) {
  if (immediate) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="hs-rise block" style={{ animationDelay: `${delay + i * 0.07}s` }}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag id={id} className={className} data-reveal="lines">
      {lines.map((line, i) => (
        <span key={i} className={cn("-mb-[0.12em] block overflow-hidden pb-[0.12em]", lineClassName)}>
          <span className="block" style={delayStyle(delay + i * 0.07)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Visuel qui se découvre par le bas en remontant légèrement. */
export function CropReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={className} data-reveal="crop" style={delayStyle(delay)}>
      {children}
    </div>
  );
}

/** Apparition douce d’un bloc de texte. */
export function Rise({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  if (immediate) {
    return (
      <div className={cn("hs-rise", className)} style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    );
  }
  return (
    <div className={className} data-reveal="rise" style={delayStyle(delay)}>
      {children}
    </div>
  );
}
