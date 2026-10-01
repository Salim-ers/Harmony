import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import monogram from "@/public/brand/monogram.webp";

export function Monogram({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={monogram}
      alt=""
      aria-hidden
      priority={priority}
      sizes="64px"
      className={cn("h-auto w-8 select-none", className)}
    />
  );
}

export function Logo({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", tone === "light" ? "text-paper" : "text-night", className)}
    >
      <Monogram priority className={size === "lg" ? "w-12" : "w-[1.9rem]"} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif tracking-[0.06em]", size === "lg" ? "text-[2rem]" : "text-[1.32rem]")}>
          HARMONY
        </span>
        <span
          className={cn(
            "mt-[0.28em] font-serif tracking-[0.52em]",
            size === "lg" ? "text-[0.8rem]" : "text-[0.56rem]",
            tone === "light" ? "text-paper/70" : "text-night/70",
          )}
        >
          SOLUTIONS
        </span>
      </span>
      <span className="sr-only">, accueil</span>
    </Link>
  );
}
