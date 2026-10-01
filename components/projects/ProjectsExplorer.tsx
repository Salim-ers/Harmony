"use client";

import { m } from "framer-motion";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { FilterKey } from "@/data/projects";

export interface ExplorerItem {
  id: string;
  filterKeys: FilterKey[];
  node: ReactNode;
}

export function ProjectsExplorer({
  filters,
  items,
}: {
  filters: { key: FilterKey; label: string; count: number }[];
  items: ExplorerItem[];
}) {
  const [active, setActive] = useState<FilterKey>("tous");

  // Filtre partageable par URL : /realisations?filtre=saas
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("filtre") as FilterKey | null;
    if (f && filters.some((x) => x.key === f)) setActive(f);
  }, [filters]);

  const select = (key: FilterKey) => {
    setActive(key);
    const url = new URL(window.location.href);
    if (key === "tous") url.searchParams.delete("filtre");
    else url.searchParams.set("filtre", key);
    window.history.replaceState(null, "", url);
  };

  const visible = items.filter((i) => active === "tous" || i.filterKeys.includes(active));

  return (
    <div>
      <div className="border-y border-paper/10">
        <div
          role="group"
          aria-label="Filtrer les réalisations"
          className="container-x -mx-1 flex gap-x-7 gap-y-2 overflow-x-auto py-5 [scrollbar-width:none] md:flex-wrap"
        >
          {filters.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                disabled={f.count === 0}
                onClick={() => select(f.key)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap px-1 py-1.5 text-[0.9375rem] transition-colors duration-300 disabled:opacity-30",
                  on ? "text-paper" : "text-paper/55 hover:text-paper",
                )}
              >
                {f.label}
                <sup className="ml-1 text-[0.65rem] text-mist">{f.count}</sup>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-1 -bottom-px h-px origin-left bg-gold transition-transform duration-500 ease-out-soft",
                    on ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} réalisation{visible.length > 1 ? "s" : ""} affichée{visible.length > 1 ? "s" : ""}
      </p>

      <m.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="container-x space-y-28 py-20 md:space-y-40 md:py-28"
      >
        {visible.map((i) => (
          <Fragment key={i.id}>{i.node}</Fragment>
        ))}
      </m.div>
    </div>
  );
}
