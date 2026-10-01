import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectBoard } from "./ProjectBoard";

/** Grande transition éditoriale vers le projet suivant. */
export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Projet suivant" className="overflow-hidden bg-night-2">
      <Link
        href={`/realisations/${project.slug}`}
        data-cursor="Voir"
        className="group block pt-24 md:pt-32"
      >
        <div className="container-x">
          <p className="meta text-mist">Projet suivant →</p>
          <p className="display-xxl mt-6 text-paper transition-colors duration-500 group-hover:text-gold">
            {project.title}
            <span
              aria-hidden
              className="ml-[0.2em] inline-block transition-transform duration-700 ease-out-soft group-hover:translate-x-[0.15em]"
            >
              →
            </span>
          </p>
          <p className="meta mt-6 text-paper/60">
            {project.category}, {project.industry.toLowerCase()}
          </p>
        </div>
        <div className="container-x mt-14 md:mt-20">
          <div className="h-[34vh] overflow-hidden md:h-[42vh]">
            <div className="translate-y-[8%] transition-transform duration-[1200ms] ease-out-soft group-hover:translate-y-0">
              <ProjectBoard project={project} zoomOnHover={false} />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
