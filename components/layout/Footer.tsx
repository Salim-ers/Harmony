import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ExternalIcon } from "@/components/ui/Button";
import { site } from "@/data/site";

const columns = [
  {
    title: "Portfolio",
    links: [
      { href: "/realisations", label: "Toutes les réalisations" },
      { href: "/sites-web", label: "Sites web" },
      { href: "/applications", label: "Applications" },
      { href: "/saas", label: "SaaS" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Sites vitrines & e-commerce" },
      { href: "/#services", label: "Applications & outils métier" },
      { href: "/#services", label: "SaaS & plateformes" },
      { href: "/#services", label: "SEO & maintenance" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-paper/[0.08] bg-night text-paper">
      <div className="container-x grid gap-16 pb-10 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Logo size="lg" />
          <p className="mt-10 max-w-[18ch] font-serif text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.015em] text-paper/90">
            {site.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-[1fr_1.15fr_1.45fr_1fr] lg:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="meta text-mist">{col.title}</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-line text-paper/80 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="meta text-mist">Contact</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={`mailto:${site.email}`} className="link-line text-paper/80 hover:text-paper [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="link-line text-paper/80 hover:text-paper">
                  {site.phone}
                </a>
              </li>
              {site.linkedin && (
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line inline-flex items-center gap-1.5 text-paper/80 hover:text-paper"
                  >
                    LinkedIn <ExternalIcon />
                  </a>
                </li>
              )}
              <li className="text-paper/55">
                {site.address.city}, {site.address.region}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="meta text-mist">Légal</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <Link href="/mentions-legales" className="link-line text-paper/80 hover:text-paper">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="link-line text-paper/80 hover:text-paper">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-paper/[0.08] py-7 text-[0.8125rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Harmony Solutions. Tous droits réservés.</p>
        <p>Création de sites internet, applications et SaaS, depuis l’Oise.</p>
      </div>
    </footer>
  );
}
