import type { Metadata } from "next";
import { Catalog } from "@/components/projects/Catalog";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Création de sites web : vitrines, e-commerce et sites corporate",
  description:
    "Sites vitrines, e-commerce avec Click & Collect, sites corporate : des sites rapides, responsives et optimisés pour le référencement local, conçus par Harmony Solutions.",
  alternates: { canonical: "/sites-web" },
};

export default function SitesWebPage() {
  const items = projects.filter((p) => p.types.some((t) => t === "vitrine" || t === "ecommerce" || t === "corporate"));
  return (
    <Catalog
      kicker="Sites web"
      lines={["Des sites qui ressemblent", "à ceux qui les tiennent."]}
      intro="Vitrines, boutiques en ligne, commande et réservation : un site pensé pour l’activité, pas un modèle adapté."
      items={items}
    />
  );
}
