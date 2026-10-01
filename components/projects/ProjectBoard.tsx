import { cn } from "@/lib/cn";
import type { Project } from "@/data/projects";
import { isLightTone } from "@/data/projects";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/mockups/Frames";
import { QrGlyph } from "@/components/mockups/BusinessCard";

/**
 * Planche de présentation d’un projet : le site posé sur sa couleur dominante,
 * comme une planche d’agence. Desktop + mobile au-dessus de 768 px,
 * mobile seul en dessous pour rester lisible.
 */
export function ProjectBoard({
  project,
  priority = false,
  className,
  zoomOnHover = true,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  zoomOnHover?: boolean;
}) {
  const light = isLightTone(project);
  const zoom = zoomOnHover
    ? "transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.025] motion-reduce:transform-none"
    : "";

  if (project.mockup === "business-card") {
    return (
      <div
        className={cn("relative overflow-hidden rounded-md aspect-[4/5] md:aspect-[16/11]", className)}
        style={{ background: project.tone.bg }}
      >
        <div className={cn("absolute inset-0", zoom)}>
          <PhoneFrame className="absolute left-1/2 top-[9%] w-[58%] -translate-x-1/2 md:left-[30%] md:top-[8%] md:w-[24%]">
            <Shot project={project} device="mobile" sizes="(min-width: 768px) 24vw, 58vw" />
          </PhoneFrame>
          <div className="absolute bottom-[12%] right-[10%] hidden w-[26%] flex-col gap-4 rounded-md bg-[#ECE7DD] p-[2.2%] text-[#0E1116] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] md:flex">
            <QrGlyph className="w-full" />
            <span className="text-[clamp(10px,0.85vw,13px)] leading-snug">Scannez pour ouvrir la carte</span>
          </div>
          <span className="absolute left-[60%] top-[14%] hidden max-w-[30%] font-serif text-[clamp(1.4rem,2.6vw,2.8rem)] leading-[1] tracking-[-0.02em] text-[#ECE7DD]/90 md:block">
            Un lien. Un QR code. Toutes vos coordonnées.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-md", className)} style={{ background: project.tone.bg }}>
      {/* ≥ md : desktop + mobile */}
      <div className="relative hidden aspect-[16/11] md:block">
        <div className={cn("absolute inset-0", zoom)}>
          <BrowserFrame url={project.url} chrome={light ? "light" : "dark"} className="absolute left-[6.5%] top-[8.5%] w-[79%]">
            <Shot project={project} alt="" src={project.desktopImage} device="desktop" priority={priority} sizes="(min-width: 1480px) 820px, 55vw" />
          </BrowserFrame>
          <PhoneFrame className="absolute bottom-[6%] right-[5.5%] w-[19%]">
            <Shot project={project} alt="" src={project.mobileImage} device="mobile" sizes="(min-width: 1480px) 200px, 14vw" />
          </PhoneFrame>
        </div>
      </div>
      {/* < md : mobile seul, cadré comme une affiche */}
      <div className="relative aspect-[4/5] md:hidden">
        <div className="absolute inset-0">
          <PhoneFrame className="absolute left-1/2 top-[9%] w-[60%] -translate-x-1/2">
            <Shot project={project} alt="" src={project.mobileImage} device="mobile" priority={priority} sizes="60vw" />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
