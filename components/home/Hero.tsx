import Link from "next/link";
import { Parallax } from "@/components/motion/Parallax";
import { RevealLines, Rise } from "@/components/motion/Reveal";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/mockups/Frames";
import { buttonClass } from "@/components/ui/Button";
import type { Project } from "@/data/projects";

/**
 * Hero : titre éditorial à gauche, composition de vrais projets à droite.
 * Les aperçus se décalent légèrement au défilement (parallaxe douce).
 */
export function Hero({
  main,
  back,
  phone,
  card,
  sectors,
}: {
  main: Project;
  back: Project;
  phone: Project;
  card: Project;
  sectors: string[];
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40 lg:min-h-[100svh] lg:pt-44">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative z-10 lg:col-span-6">
          <RevealLines
            as="h1"
            immediate
            delay={0.1}
            className="display-xl text-paper lg:text-[length:min(5.3vw,6.6rem)]"
            lines={["Des solutions", "digitales pensées", "pour votre activité."]}
          />
          <Rise immediate delay={0.45} className="mt-9">
            <p className="lede max-w-[44ch] text-paper/70">
              Harmony Solutions conçoit des sites internet, applications, SaaS et outils digitaux sur mesure pour les
              commerces, indépendants et entreprises.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/realisations" className={buttonClass("gold")}>
                Découvrir nos réalisations
              </Link>
              <Link href="/projet" className={buttonClass("outline")}>
                Parler de mon projet
              </Link>
            </div>
          </Rise>
        </div>

        <div
          className="hs-lift relative aspect-[10/9] w-full sm:aspect-[16/12] lg:col-span-6 lg:aspect-[10/9]"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Fragment d’interface SaaS, en retrait */}
          <Parallax distance={50} className="absolute left-0 top-0 w-[54%]">
            <BrowserFrame url={back.url} chrome="light">
              <Shot project={back} alt="" src={back.desktopImage} device="desktop" sizes="(min-width: 1024px) 28vw, 54vw" />
            </BrowserFrame>
          </Parallax>

          {/* Projet principal */}
          <Parallax distance={110} className="absolute right-0 top-[19%] w-[82%]">
            <Link href={`/realisations/${main.slug}`} data-cursor="Voir" className="block">
              <span className="sr-only">Voir le projet {main.title}</span>
              <BrowserFrame url={main.url}>
                <Shot project={main} alt="" src={main.desktopImage} device="desktop" priority sizes="(min-width: 1024px) 46vw, 82vw" />
              </BrowserFrame>
            </Link>
          </Parallax>

          {/* Mobile */}
          <Parallax distance={190} className="absolute bottom-[2%] left-[4%] w-[23%]">
            <Link href={`/realisations/${phone.slug}`} data-cursor="Voir" className="block">
              <span className="sr-only">Voir le projet {phone.title}</span>
              <PhoneFrame>
                <Shot project={phone} alt="" src={phone.mobileImage} device="mobile" sizes="(min-width: 1024px) 12vw, 23vw" />
              </PhoneFrame>
            </Link>
          </Parallax>

          {/* Carte digitale */}
          <Parallax distance={150} className="absolute bottom-[-4%] right-[6%] hidden w-[17%] sm:block">
            <Link href={`/realisations/${card.slug}`} data-cursor="Voir" className="block">
              <span className="sr-only">Voir le projet {card.title}</span>
              <PhoneFrame>
                <Shot project={card} alt="" device="mobile" sizes="10vw" />
              </PhoneFrame>
            </Link>
          </Parallax>
        </div>
      </div>

      <Rise immediate delay={0.8} className="container-x mt-14 lg:mt-24">
        <div className="flex flex-col gap-3 border-t border-paper/10 pt-6 text-[0.875rem] md:flex-row md:items-baseline md:gap-10">
          <p className="shrink-0 text-mist">Secteurs accompagnés</p>
          <p className="text-paper/75">{sectors.join(", ")}.</p>
        </div>
      </Rise>
    </section>
  );
}
