import type { Metadata } from "next";
import { RevealLines, Rise } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Harmony Solutions pour un site internet, une application web, un CRM ou un SaaS sur mesure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { label: "Téléphone", value: site.phone, href: `tel:${site.phoneHref}` },
    ...(site.linkedin ? [{ label: "LinkedIn", value: "Harmony Solutions", href: site.linkedin }] : []),
    {
      label: "Adresse",
      value: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
      href: undefined,
    },
  ];
  return (
    <section className="container-x pb-28 pt-36 md:pb-40 md:pt-48">
      <RevealLines as="h1" immediate lines={["Parlons-en."]} className="display-xxl text-paper" />
      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <Rise immediate delay={0.25} className="lg:col-span-5">
          <p className="lede max-w-[38ch] text-paper/70">
            Un projet précis ou une simple idée : décrivez-le en quelques étapes, ou écrivez-nous directement.
          </p>
          <ButtonLink href="/projet" className="mt-10 h-14 px-8 text-base">
            Démarrer un projet
          </ButtonLink>
        </Rise>
        <Rise immediate delay={0.35} className="lg:col-span-6 lg:col-start-7">
          <dl className="border-t border-paper/10">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 border-b border-paper/10 py-6 sm:grid-cols-3">
                <dt className="meta text-mist sm:pt-2">{r.label}</dt>
                <dd className="display-s sm:col-span-2">
                  {r.href ? (
                    <a href={r.href} className="link-line break-words text-paper hover:text-gold">
                      {r.value}
                    </a>
                  ) : (
                    <span className="text-paper/85">{r.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>
    </section>
  );
}
