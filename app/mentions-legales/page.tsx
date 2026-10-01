import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

// Les champs surlignés sont à compléter avec les informations officielles de l’entreprise.
export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="octobre 2026">
      <div>
        <h2>Éditeur du site</h2>
        <p>
          {site.name}, <mark>forme juridique à compléter</mark>, immatriculée sous le numéro SIRET{" "}
          <mark>à compléter</mark>.
        </p>
        <p>
          Adresse : {site.address.street}, {site.address.postalCode} {site.address.city}.<br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>. Téléphone : {site.phone}.
        </p>
        <p>
          Directeur de la publication : <mark>nom à compléter</mark>.
        </p>
      </div>
      <div>
        <h2>Hébergement</h2>
        <p>
          <mark>Hébergeur à compléter</mark> (par exemple : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
          États-Unis).
        </p>
      </div>
      <div>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les contenus de ce site (textes, identité visuelle, logo, mise en page) sont la propriété de {site.name}.
          Les captures des réalisations présentées restent la propriété de leurs clients respectifs.
        </p>
      </div>
      <div>
        <h2>Liens externes</h2>
        <p>
          Les liens « Visiter le site » mènent vers des sites tiers. {site.name} n’est pas responsable de leur
          contenu après leur mise en ligne.
        </p>
      </div>
    </LegalPage>
  );
}
