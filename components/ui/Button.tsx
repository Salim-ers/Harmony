import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "outline" | "outline-dark" | "night";

const base =
  "inline-flex h-12 shrink-0 items-center whitespace-nowrap justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium tracking-[0.005em] transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98]";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-gold-soft",
  outline: "border border-paper/25 text-paper hover:border-gold hover:text-gold",
  "outline-dark": "border border-night/20 text-night hover:border-night hover:bg-night hover:text-paper",
  night: "bg-night text-paper hover:bg-night-2",
};

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className={cn("size-3", className)} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3.5 2.5h6v6M9.5 2.5l-7 7" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  external = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
        <ExternalIcon />
        <span className="sr-only">(nouvel onglet)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: Variant = "gold", className?: string) => cn(base, variants[variant], className);
