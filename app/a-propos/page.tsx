import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, Process, Services } from "@/components/home/Sections";
import { RevealLines, Rise } from "@/components/motion/Reveal";
import { DoubleRule } from "@/components/ui/DoubleRule";

export const metadata: Metadata = {
  title: "À propos : studio digital dans l’Oise",
  description:
    "Harmony Solutions conçoit et développe des sites internet, applications web, CRM et SaaS sur mesure pour les commerces, artisans, indépendants et entreprises.",
  alternates: { canonical: "/a-propos" },
};

const principles = [
  {
    title: "Une solution pensée pour l’activité",
    text: "Une boulangerie, une auto-école et une ESN n’ont pas les mêmes besoins. Chaque projet part du métier du client, pas d’un modèle.",
  },
  {
    title: "Une seule équipe, du début à la fin",
    text: "La conception, le design, le développement et la mise en ligne sont réalisés par la même équipe. Un seul interlocuteur.",
  },
  {
    title: "Rapide, lisible, référencé",
    text: "Des sites légers, pensés d’abord pour le téléphone, et structurés pour être trouvés sur Google.",
  },
  {
    title: "Votre projet vous appartient",
    text: "Le nom de domaine et l’hébergement sont à votre nom. Vous restez propriétaire de ce qui a été créé.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="container-x grid gap-16 pb-24 pt-36 md:pb-32 md:pt-48 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RevealLines
            as="h1"
            immediate
            lines={["Un studio digital", "au service des activités", "qui font vivre un territoire."]}
            className="display-xl text-paper"
          />
        </div>
        <Rise immediate delay={0.3} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <DoubleRule className="mb-8" />
          <p className="lede text-paper/75">
            Harmony Solutions conçoit des sites internet, applications, SaaS et outils digitaux sur mesure pour les
            commerces, indépendants et entreprises.
          </p>
          <p className="mt-5 text-paper/60">
            Basé dans l’Oise, le studio accompagne aussi bien un artisan qui veut prendre ses commandes en ligne
            qu’une entreprise qui a besoin d’une plateforme métier.
          </p>
          <Link href="/realisations" className="mt-8 inline-block border-b border-gold pb-1 text-paper hover:text-gold">
            Voir les réalisations
          </Link>
        </Rise>
      </section>

      <section aria-labelledby="principes" className="bg-paper py-24 text-night md:py-32">
        <div className="container-x">
          <h2 id="principes" className="display-l max-w-[16ch]">
            Ce qui guide chaque projet.
          </h2>
          <ul className="mt-14 grid border-t border-night/10 md:grid-cols-2 md:gap-x-16">
            {principles.map((p) => (
              <li key={p.title} className="border-b border-night/10 py-8">
                <h3 className="display-s">{p.title}</h3>
                <p className="mt-3 max-w-[46ch] text-night/70">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Services />
      <Process />
      <FinalCta />
    </>
  );
}
