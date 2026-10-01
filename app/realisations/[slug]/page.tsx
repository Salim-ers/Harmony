import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { CropReveal, RevealLines, Rise } from "@/components/motion/Reveal";
import { BrowserFrame, GalleryTile, PhoneFrame, Shot, TabletFrame } from "@/components/mockups/Frames";
import { NextProject } from "@/components/projects/NextProject";
import { PreviewModal } from "@/components/projects/PreviewModal";
import { ProjectBoard } from "@/components/projects/ProjectBoard";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { hasImage } from "@/lib/media";
import { displayUrl, getNextProject, getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} : ${p.category.toLowerCase()}, ${p.industry.toLowerCase()}`;
  const image = hasImage(p.desktopImage) ? [{ url: p.desktopImage, width: 2400, height: 1500, alt: p.title }] : undefined;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/realisations/${p.slug}` },
    openGraph: { title, description: p.description, url: `/realisations/${p.slug}`, type: "article", ...(image ? { images: image } : {}) },
  };
}

/* ------------------------------------------------------------------ */

function Section({
  n,
  label,
  theme = "night",
  children,
  className,
}: {
  n: string;
  label: string;
  theme?: "night" | "night-2" | "paper";
  children: ReactNode;
  className?: string;
}) {
  const paper = theme === "paper";
  return (
    <section
      className={cn(
        "py-20 md:py-32",
        theme === "night" && "bg-night text-paper",
        theme === "night-2" && "bg-night-2 text-paper",
        paper && "bg-paper text-night",
        className,
      )}
    >
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-3 lg:sticky lg:top-28">
            <span className="num text-[1.25rem] leading-none">{n}</span>
            <h2 className={cn("meta", paper ? "text-night/70" : "text-mist")}>{label}</h2>
          </div>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function Experience({ project }: { project: Project }) {
  if (project.mockup === "business-card") {
    return <ProjectBoard project={project} zoomOnHover={false} />;
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
        <figure className="col-span-12 md:col-span-7">
          <BrowserFrame url={project.url}>
            <Shot project={project} src={project.desktopImage} device="desktop" sizes="(min-width: 1024px) 45vw, 92vw" />
          </BrowserFrame>
          <figcaption className="meta mt-3 text-mist">Ordinateur</figcaption>
        </figure>
        <figure className="col-span-7 md:col-span-3">
          <TabletFrame>
            <Shot project={project} src={project.tabletImage} device="tablet" sizes="(min-width: 1024px) 18vw, 55vw" />
          </TabletFrame>
          <figcaption className="meta mt-3 text-mist">Tablette</figcaption>
        </figure>
        <figure className="col-span-5 md:col-span-2">
          <PhoneFrame>
            <Shot project={project} src={project.mobileImage} device="mobile" sizes="(min-width: 1024px) 12vw, 38vw" />
          </PhoneFrame>
          <figcaption className="meta mt-3 text-mist">Mobile</figcaption>
        </figure>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);
  const gallery = project.gallery.filter((g) => hasImage(g.src));
  const number = String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, "0");

  const meta: { label: string; value: ReactNode }[] = [
    { label: "Secteur", value: project.industry },
    { label: "Type de projet", value: project.category },
    ...(project.year ? [{ label: "Année", value: String(project.year) }] : []),
    ...(project.location ? [{ label: "Lieu", value: project.location }] : []),
    {
      label: "Lien",
      value: project.showLiveLink ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-line hover:text-gold">
          {displayUrl(project.url)}
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      ) : (
        "Version de démonstration anonymisée"
      ),
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      genre: project.category,
      about: project.industry,
      ...(project.year ? { dateCreated: String(project.year) } : {}),
      ...(project.showLiveLink ? { url: project.url } : {}),
      ...(hasImage(project.desktopImage) ? { image: `${site.url}${project.desktopImage}` } : {}),
      creator: { "@id": `${site.url}/#organisation` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Réalisations", item: `${site.url}/realisations` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/realisations/${project.slug}` },
      ],
    },
  ];

  return (
    <article>
      <JsonLd data={jsonLd} />

      {/* 01 — Introduction */}
      <header className="pt-32 md:pt-44">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <nav aria-label="Fil d’Ariane" className="meta text-mist">
              <Link href="/realisations" className="link-line hover:text-paper">
                Réalisations
              </Link>
              <span className="mx-2 text-paper/25">/</span>
              <span className="text-paper/70">{number}</span>
            </nav>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="num text-[1.25rem] leading-none">01</span>
              <span className="meta text-mist">Introduction</span>
            </div>
          </div>
          <div className="lg:col-span-9">
            <RevealLines as="h1" immediate lines={[project.title]} className="display-xxl text-paper" />
            <Rise immediate delay={0.25}>
              <p className="lede mt-8 max-w-[48ch] text-paper/70">{project.description}</p>
              <dl className="mt-12 grid border-t border-paper/10 sm:grid-cols-2 xl:auto-cols-fr xl:grid-flow-col">
                {meta.map((m) => (
                  <div key={m.label} className="border-b border-paper/10 py-4 sm:pr-6">
                    <dt className="meta text-mist">{m.label}</dt>
                    <dd className="mt-1.5 text-[0.98rem] text-paper">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Rise>
          </div>
        </div>
        <div className="container-x mt-16 md:mt-24">
          <CropReveal>
            <ProjectBoard project={project} priority zoomOnHover={false} />
          </CropReveal>
        </div>
      </header>

      {/* 02 — Le besoin */}
      <Section n="02" label="Le besoin" className="mt-20 md:mt-32" theme="paper">
        <p className="display-m max-w-[26ch]">{project.need}</p>
      </Section>

      {/* 03 — La solution */}
      <Section n="03" label="La solution" theme="paper" className="pt-0 md:pt-0">
        <p className="lede max-w-[58ch] text-night/75">{project.solution}</p>
      </Section>

      {/* 04 — Expérience */}
      <Section n="04" label="Expérience" theme="night-2">
        <Experience project={project} />
        {gallery.length > 0 && (
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <li key={g.src}>
                <GalleryTile project={project} item={g} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw" />
                <p className="meta mt-3 text-mist">{g.label}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* 05 — Fonctionnalités */}
      <Section n="05" label="Fonctionnalités" theme="paper">
        <ul className="grid border-t border-night/10 md:grid-cols-2 md:gap-x-12">
          {project.features.map((f) => (
            <li key={f.title} className="border-b border-night/10 py-6">
              <h3 className="display-s">{f.title}</h3>
              <p className="mt-2 max-w-[44ch] text-night/70">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 06 — Résultat */}
      <Section n="06" label="Résultat">
        <ul className="space-y-0">
          {project.outcomes.map((o, i) => (
            <li key={o} className="border-b border-paper/10 py-6 first:pt-0">
              <Rise delay={i * 0.08}>
                <p className="display-m max-w-[24ch] text-paper/90">{o}</p>
              </Rise>
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 — Lien */}
      <Section n="07" label="Lien" className="pt-0 md:pt-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {project.showLiveLink && (
            <ButtonLink href={project.url} external>
              Visiter le site
            </ButtonLink>
          )}
          {project.allowEmbed && <PreviewModal url={project.url} title={project.title} />}
          <ButtonLink href="/projet" variant={project.showLiveLink ? "outline" : "gold"}>
            Démarrer un projet similaire
          </ButtonLink>
        </div>
        {project.mockup === "business-card" && (
          <p className="mt-6 max-w-[52ch] text-[0.9375rem] text-paper/55">
            Pour respecter la confidentialité du client, la carte présentée ici est une version de démonstration avec une
            identité fictive.
          </p>
        )}
      </Section>

      <NextProject project={next} />
    </article>
  );
}
