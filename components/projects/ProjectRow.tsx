import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Project } from "@/data/projects";
import { CropReveal } from "@/components/motion/Reveal";
import { ExternalIcon } from "@/components/ui/Button";
import { ProjectBoard } from "./ProjectBoard";

/**
 * Bloc projet éditorial : 66 % visuel / 30 % informations.
 * L’alternance gauche / droite est gérée en CSS (:nth-child), ce qui reste
 * correct quand la liste est filtrée.
 */
export function ProjectRow({
  project,
  number,
  theme = "night",
  priority = false,
  headingLevel = "h3",
}: {
  project: Project;
  number: string;
  theme?: "night" | "paper";
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const href = `/realisations/${project.slug}`;
  const onNight = theme === "night";

  return (
    <article className="grid gap-7 md:flex md:items-end md:justify-between md:gap-[4%] md:even:flex-row-reverse">
      <Link
        href={href}
        data-cursor="Voir"
        className="group relative block md:w-[66%]"
      >
        <span className="sr-only">Voir le projet {project.title}</span>
        <CropReveal>
          <ProjectBoard project={project} priority={priority} />
        </CropReveal>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-5 translate-y-2 rounded-full bg-night/85 px-4 py-2 text-[0.8125rem] text-paper opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          Découvrir
        </span>
      </Link>

      <div className="md:w-[30%] md:pb-2">
        <span className="num text-[1.6rem] leading-none">{number}</span>
        <H className={cn("display-m mt-4", onNight ? "text-paper" : "text-night")}>
          <Link href={href} className="transition-colors duration-300 hover:text-gold">
            {project.title}
          </Link>
        </H>
        <p className={cn("meta mt-4", onNight ? "text-paper/80" : "text-night/80")}>{project.category}</p>
        <p className={cn("meta", onNight ? "text-mist" : "text-night/65")}>{project.industry}</p>
        <p className={cn("mt-5 max-w-[40ch] text-[0.98rem] leading-relaxed", onNight ? "text-paper/70" : "text-night/70")}>
          {project.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem]">
          <Link
            href={href}
            className={cn(
              "border-b pb-1 transition-colors duration-300",
              onNight ? "border-gold text-paper hover:text-gold" : "border-gold text-night hover:text-gold",
            )}
          >
            Voir le projet
          </Link>
          {project.showLiveLink && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-gold",
                onNight ? "text-paper/65" : "text-night/65",
              )}
            >
              Visiter le site
              <ExternalIcon />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
