import type { Metadata } from "next";
import { Catalog } from "@/components/projects/Catalog";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Applications web, dashboards, CRM et outils métier",
  description:
    "Applications web, cartes digitales, tableaux de bord, CRM et outils métier sur mesure, conçus et développés par Harmony Solutions.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  const items = projects.filter((p) => p.types.includes("application") || p.types.includes("outil-metier"));
  return (
    <Catalog
      kicker="Applications"
      lines={["Des outils utiles,", "chaque jour."]}
      intro="Applications web, tableaux de bord, CRM et outils métier : des interfaces claires pour gagner du temps au quotidien."
      items={items}
    />
  );
}
