import type { Metadata } from "next";
import { Catalog } from "@/components/projects/Catalog";
import { productProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Création de SaaS et plateformes métier",
  description:
    "Plateformes SaaS conçues par Harmony Solutions : tableaux de bord, gestion métier, abonnements et données centralisées.",
  alternates: { canonical: "/saas" },
};

export default function SaasPage() {
  return (
    <Catalog
      kicker="Produits & SaaS"
      lines={["Du tableau de bord", "à l’abonnement."]}
      intro="Tableaux de bord, comptes utilisateurs, abonnements et données métier : des produits complets, de la première maquette à la mise en ligne."
      items={productProjects}
    />
  );
}
