import type { Metadata } from "next";
import { Catalog } from "@/components/projects/Catalog";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Réalisations : sites internet, e-commerce, applications et SaaS",
  description:
    "Portfolio Harmony Solutions : sites vitrines, sites e-commerce, applications web, cartes digitales et SaaS conçus pour des commerces, artisans et entreprises.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <Catalog
      withFilters
      lines={["Des projets différents.", "Une même exigence."]}
      intro="Chaque activité mérite une solution pensée pour elle."
      items={projects}
    />
  );
}
