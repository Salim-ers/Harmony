import type { Metadata } from "next";
import { ProjectWizard } from "@/components/forms/ProjectWizard";
import { RevealLines } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Démarrer un projet",
  description:
    "Site vitrine, e-commerce, application, SaaS ou CRM : décrivez votre projet en quelques étapes, Harmony Solutions vous répond.",
  alternates: { canonical: "/projet" },
};

export default function ProjetPage() {
  return (
    <section className="container-x grid gap-16 pb-28 pt-36 md:pt-48 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <RevealLines as="h1" immediate lines={["Parlez-nous", "de votre idée."]} className="display-xl text-paper" />
        <p className="lede mt-8 max-w-[34ch] text-paper/65">
          Six questions rapides pour cadrer votre projet. Rien n’est engagé : c’est le point de départ d’un échange.
        </p>
        <div className="mt-10 space-y-1 border-t border-paper/10 pt-6 text-[0.9375rem] text-paper/65">
          <p className="text-mist">Vous préférez écrire ou appeler ?</p>
          <a href={`mailto:${site.email}`} className="link-line block w-fit text-paper/85 hover:text-paper">
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} className="link-line block w-fit text-paper/85 hover:text-paper">
            {site.phone}
          </a>
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <ProjectWizard contactEmail={site.email} />
      </div>
    </section>
  );
}
