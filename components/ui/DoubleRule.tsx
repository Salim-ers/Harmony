import { cn } from "@/lib/cn";

/** Double filet or, repris des lignes du monogramme H. */
export function DoubleRule({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex w-14 flex-col gap-[3px]", className)}>
      <i className="block h-px w-full bg-gold" />
      <i className="block h-px w-full bg-gold/60" />
    </span>
  );
}
