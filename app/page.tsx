import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FinalCta, Process, Products, SelectedWork, Services } from "@/components/home/Sections";
import { featuredSites, getProject, productProjects, projects } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const sectors = [
  "Boulangerie",
  "Pâtisserie",
  "Coffee shop",
  "Station de lavage",
  "Auto-école",
  "ESN",
  "Filière équestre",
];

export default function HomePage() {
  const main = getProject("art-du-pain")!;
  const back = getProject("horse-ledger")!;
  const phone = getProject("royale-auto-ecole")!;
  const card = getProject("carte-digitale")!;

  return (
    <>
      <Hero main={main} back={back} phone={phone} card={card} sectors={sectors} />
      <SelectedWork projects={featuredSites} total={projects.length} />
      <Products products={productProjects} />
      <Services />
      <Process />
      <FinalCta />
    </>
  );
}
