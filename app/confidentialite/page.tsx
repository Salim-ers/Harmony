import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="octobre 2026">
      <div>
        <h2>Données collectées</h2>
        <p>
          Le seul formulaire du site est le questionnaire « Démarrer un projet ». Il recueille : le type de projet,
          l’activité, les fonctionnalités souhaitées, le budget, la description du projet, le nom, l’entreprise,
          l’adresse e-mail et le téléphone.
        </p>
      </div>
      <div>
        <h2>Finalité</h2>
        <p>Ces informations servent uniquement à répondre à votre demande et à établir un devis. Elles ne sont ni vendues, ni cédées.</p>
      </div>
      <div>
        <h2>Durée de conservation</h2>
        <p>Les demandes sans suite sont supprimées au plus tard trois ans après le dernier échange.</p>
      </div>
      <div>
        <h2>Cookies</h2>
        <p>
          Ce site n’utilise ni cookie publicitaire, ni outil de mesure d’audience. L’« Aperçu interactif » d’une
          réalisation charge le site concerné uniquement lorsque vous l’ouvrez ; ce site tiers peut alors appliquer
          sa propre politique.
        </p>
      </div>
      <div>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez aussi saisir la CNIL (cnil.fr).
        </p>
      </div>
    </LegalPage>
  );
}
