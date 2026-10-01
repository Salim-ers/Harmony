import Link from "next/link";
import { RevealLines, Rise, CropReveal } from "@/components/motion/Reveal";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { BrowserFrame, GalleryTile, PhoneFrame, Shot } from "@/components/mockups/Frames";
import { ButtonLink, ExternalIcon } from "@/components/ui/Button";
import { DoubleRule } from "@/components/ui/DoubleRule";
import type { Project } from "@/data/projects";
import { processSteps, services, site } from "@/data/site";
import { hasImage } from "@/lib/media";

/* ------------------------------------------------------------------ */
/*  Projets sélectionnés                                               */
/* ------------------------------------------------------------------ */
export function SelectedWork({ projects, total }: { projects: Project[]; total: number }) {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="pb-24 pt-8 md:pb-36 md:pt-24">
      <div className="container-x">
        <div className="flex flex-col gap-10 border-t border-paper/10 pt-10 md:flex-row md:items-end md:justify-between">
          <RevealLines id="projets-titre" as="h2" lines={["Quelques projets."]} className="display-xl text-paper" />
          <div className="max-w-[34ch] md:pb-3">
            <p className="text-paper/65">
              Des sites et des outils en ligne, consultables, conçus pour des activités très différentes.
            </p>
            <Link href="/realisations" className="mt-4 inline-block border-b border-gold pb-1 text-paper hover:text-gold">
              Voir les {total} réalisations
            </Link>
          </div>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} number={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Produits & SaaS — fond clair pour marquer la différence            */
/* ------------------------------------------------------------------ */
export function Products({ products }: { products: Project[] }) {
  return (
    <section id="saas" aria-labelledby="saas-titre" className="bg-paper py-24 text-night md:py-36">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <DoubleRule className="mb-8" />
            <RevealLines id="saas-titre" as="h2" lines={["Produits & SaaS"]} className="display-xl" />
          </div>
          <p className="max-w-[40ch] text-night/70 md:col-span-5 md:pb-3">
            Au-delà des sites : des plateformes complètes, avec tableaux de bord, comptes utilisateurs, abonnements et
            données métier.
          </p>
        </div>

        <div className="mt-20 space-y-32 md:mt-28 md:space-y-44">
          {products.map((p, i) => (
            <ProductFeature key={p.slug} project={p} number={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductFeature({ project, number }: { project: Project; number: string }) {
  const href = `/realisations/${project.slug}`;
  const thumbs = project.gallery.filter((g) => hasImage(g.src));
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <Link href={href} data-cursor="Voir" className="group block lg:col-span-8">
        <span className="sr-only">Voir le projet {project.title}</span>
        <CropReveal>
          <div className="relative overflow-hidden rounded-md bg-night">
            <div className="relative aspect-[16/11] transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.02]">
              <BrowserFrame url={project.url} chrome="light" className="absolute left-[6%] top-[8%] w-[80%]">
                <Shot project={project} alt="" src={project.desktopImage} device="desktop" sizes="(min-width: 1024px) 50vw, 90vw" />
              </BrowserFrame>
              <PhoneFrame className="absolute bottom-[6%] right-[5%] w-[19%]">
                <Shot project={project} alt="" src={project.mobileImage} device="mobile" sizes="14vw" />
              </PhoneFrame>
            </div>
          </div>
        </CropReveal>
      </Link>

      <div className="flex flex-col lg:col-span-4">
        <span className="num text-[1.6rem] leading-none">{number}</span>
        <h3 className="display-l mt-4">
          <Link href={href} className="transition-colors hover:text-gold">
            {project.title}
          </Link>
        </h3>
        <p className="meta mt-4 text-night/80">{project.category}</p>
        <p className="meta text-night/65">{project.industry}</p>
        <p className="mt-5 max-w-[40ch] leading-relaxed text-night/75">{project.description}</p>

        <ul className="mt-8 border-t border-night/10">
          {project.features.slice(0, 5).map((f) => (
            <li key={f.title} className="flex items-baseline justify-between gap-4 border-b border-night/10 py-3 text-[0.9375rem]">
              <span>{f.title}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem]">
          <Link href={href} className="border-b border-gold pb-1 hover:text-gold">
            Voir le projet
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-night/65 hover:text-gold"
          >
            Visiter le site <ExternalIcon />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
      </div>

      {thumbs.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-12 lg:gap-6">
          {thumbs.map((g) => (
            <li key={g.src} className={g.device === "mobile" ? "hidden sm:block" : ""}>
              <GalleryTile project={project} item={g} sizes="(min-width: 1024px) 30vw, 45vw" />
              <p className="meta mt-3 text-night/60">{g.label}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-titre" className="bg-night-2 py-24 md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="services-titre" className="display-l text-paper">
            Ce que nous concevons.
          </h2>
          <p className="mt-6 max-w-[34ch] text-paper/65">
            Du site vitrine à la plateforme SaaS, chaque projet est conçu, développé et accompagné par la même équipe.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {services.map((s) => (
            <div key={s.title} className="border-t border-paper/15 pt-6">
              <h3 className="display-s text-paper">{s.title}</h3>
              <ul className="mt-5 space-y-2 text-paper/70">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */
export function Process() {
  return (
    <section aria-labelledby="process-titre" className="py-24 md:py-32">
      <div className="container-x">
        <RevealLines id="process-titre" as="h2" lines={["De l’idée", "à la mise en ligne."]} className="display-l max-w-[14ch] text-paper" />
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <li key={step.n}>
              <Rise delay={i * 0.08}>
                <div className="flex items-center gap-4">
                  <span className="num text-[2.4rem] leading-none">{step.n}</span>
                  <span aria-hidden className="h-px flex-1 bg-paper/15" />
                </div>
                <h3 className="display-s mt-6 text-paper">{step.title}</h3>
                <p className="mt-3 max-w-[28ch] text-paper/65">{step.text}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA final                                                          */
/* ------------------------------------------------------------------ */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-titre" className="relative overflow-hidden border-t border-paper/[0.08] bg-night py-28 md:py-44">
      <div className="container-x">
        <RevealLines id="cta-titre" as="h2" lines={["Une idée en tête ?"]} className="display-xxl text-paper" />
        <p className="display-l mt-6 max-w-[18ch] text-paper/55">
          Parlons de votre prochain projet.
        </p>
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <ButtonLink href="/projet" className="h-14 px-8 text-base">
            Démarrer un projet
          </ButtonLink>
          <a href={`mailto:${site.email}`} className="link-line w-fit text-[1.0625rem] text-paper/80 hover:text-paper">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
