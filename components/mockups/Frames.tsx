import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { hasImage } from "@/lib/media";
import type { Device, GalleryItem, Project } from "@/data/projects";
import { displayUrl, isLightTone } from "@/data/projects";
import { BusinessCardScreen } from "./BusinessCard";

const ratio: Record<Device, string> = {
  desktop: "aspect-[16/10]",
  tablet: "aspect-[834/1112]",
  mobile: "aspect-[390/844]",
};

/** Capture réelle si elle existe, sinon planche neutre au nom du projet. */
export function Shot({
  project,
  src,
  device,
  sizes,
  priority = false,
  alt,
  className,
}: {
  project: Project;
  src?: string;
  device: Device;
  sizes: string;
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  if (project.mockup === "business-card") {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <BusinessCardScreen />
      </div>
    );
  }
  if (hasImage(src)) {
    return (
      <Image
        src={src}
        alt={alt ?? `${project.title}, aperçu ${device === "mobile" ? "mobile" : device === "tablet" ? "tablette" : "ordinateur"}`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return <Plate project={project} device={device} className={className} />;
}

/** Planche de repli : jamais un faux design, seulement le nom et la couleur du projet. */
export function Plate({ project, device, className }: { project: Project; device: Device; className?: string }) {
  const light = isLightTone(project);
  return (
    <div
      aria-hidden
      className={cn("@container absolute inset-0", className)}
      style={{ background: project.tone.bg, color: project.tone.fg }}
    >
      <div
        className={cn(
          "flex h-full flex-col justify-between",
          device === "desktop" ? "p-[6cqw]" : "p-[9cqw] pt-[18cqw]",
        )}
      >
        <span className={cn("text-[max(9px,2.4cqw)]", device !== "desktop" && "text-[max(9px,5cqw)]", "opacity-90")}>
          {project.industry}
        </span>
        <span
          className={cn(
            "font-serif leading-[0.95] tracking-[-0.02em]",
            device === "desktop" ? "text-[8.5cqw]" : "text-[13cqw]",
          )}
        >
          {project.title}
        </span>
        <span className={cn("truncate text-[max(9px,2.2cqw)]", device !== "desktop" && "text-[max(9px,4.6cqw)]", "opacity-90")}>
          {displayUrl(project.url)}
        </span>
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  children,
  className,
  chrome = "dark",
}: {
  url: string;
  children: ReactNode;
  className?: string;
  chrome?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)]",
        chrome === "dark" ? "bg-[#0d1117]" : "bg-[#f7f6f3]",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-[clamp(20px,2.2vw,30px)] items-center gap-3 px-3",
          chrome === "dark" ? "bg-[#151a22] text-paper/80" : "bg-[#ecebe6] text-ink/75",
        )}
      >
        <span aria-hidden className="flex gap-[5px]">
          <i className="block size-[7px] rounded-full bg-current opacity-40" />
          <i className="block size-[7px] rounded-full bg-current opacity-40" />
          <i className="block size-[7px] rounded-full bg-current opacity-40" />
        </span>
        <span className="mx-auto max-w-[70%] truncate text-[clamp(9px,0.72vw,11px)] tracking-wide">{displayUrl(url)}</span>
        <span aria-hidden className="w-[31px]" />
      </div>
      <div className={cn("relative overflow-hidden", ratio.desktop)}>{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[clamp(18px,2.6vw,38px)] bg-[#0b0d10] p-[clamp(4px,0.45vw,7px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded-[clamp(14px,2.2vw,32px)]", ratio.mobile)}>
        {children}
        <span
          aria-hidden
          className="absolute left-1/2 top-[1.6%] z-10 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0d10]"
        />
      </div>
    </div>
  );
}

export function TabletFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[clamp(16px,2vw,30px)] bg-[#0b0d10] p-[clamp(6px,0.7vw,11px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded-[clamp(10px,1.3vw,20px)]", ratio.tablet)}>{children}</div>
    </div>
  );
}

/** Vignette de galerie : capture plein cadre, ou téléphone centré pour le mobile. */
export function GalleryTile({
  project,
  item,
  sizes,
  className,
}: {
  project: Project;
  item: GalleryItem;
  sizes: string;
  className?: string;
}) {
  const alt = `${project.title} : ${item.label}`;
  if (item.device === "mobile") {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-md", className)} style={{ background: project.tone.bg }}>
        <PhoneFrame className="absolute left-1/2 top-[8%] w-[30%] -translate-x-1/2">
          <Shot project={project} src={item.src} device="mobile" alt={alt} sizes="16vw" />
        </PhoneFrame>
      </div>
    );
  }
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-md ring-1 ring-black/10", className)}>
      <Shot project={project} src={item.src} device={item.device} alt={alt} sizes={sizes} />
    </div>
  );
}
