import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/Sections";
import { ProjectRow } from "./ProjectRow";
import { ProjectsExplorer } from "./ProjectsExplorer";
import { filters, projects, type Project } from "@/data/projects";

const numberOf = (p: Project) => String(projects.findIndex((x) => x.slug === p.slug) + 1).padStart(2, "0");

/** Page catalogue : en-tête éditorial, filtres sobres (optionnels) et projets en alternance. */
export function Catalog({
  kicker,
  lines,
  intro,
  items,
  withFilters = false,
}: {
  kicker?: string;
  lines: ReactNode[];
  intro?: ReactNode;
  items: Project[];
  withFilters?: boolean;
}) {
  const nodes = items.map((p, i) => ({
    id: p.slug,
    filterKeys: filters.filter((f) => f.key !== "tous" && f.match(p)).map((f) => f.key),
    node: <ProjectRow project={p} number={numberOf(p)} headingLevel="h2" priority={i === 0} />,
  }));

  return (
    <>
      <PageHeader kicker={kicker} lines={lines} intro={intro} />
      {withFilters ? (
        <ProjectsExplorer
          filters={filters.map((f) => ({ key: f.key, label: f.label, count: items.filter(f.match).length }))}
          items={nodes}
        />
      ) : (
        <div className="container-x space-y-28 border-t border-paper/10 py-20 md:space-y-40 md:py-28">
          {items.map((p, i) => (
            <ProjectRow key={p.slug} project={p} number={numberOf(p)} headingLevel="h2" priority={i === 0} />
          ))}
        </div>
      )}
      <FinalCta />
    </>
  );
}
