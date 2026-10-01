"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { buttonClass, ExternalIcon } from "@/components/ui/Button";

/**
 * « Aperçu interactif » : le site réel n’est chargé dans une iframe
 * qu’à l’ouverture de la modale, jamais au chargement de la page.
 */
export function PreviewModal({
  url,
  title,
  variant = "outline",
}: {
  url: string;
  title: string;
  variant?: "outline" | "outline-dark";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      setLoaded(false);
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass(variant)}>
        Aperçu interactif
      </button>

      <dialog
        ref={ref}
        aria-label={`Aperçu interactif : ${title}`}
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false);
        }}
        className="m-auto h-[min(92vh,980px)] w-[min(96vw,1440px)] max-w-none overflow-hidden rounded-lg bg-night-2 p-0 text-paper backdrop:bg-night/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-3 border-b border-paper/10 px-4 py-3 md:px-5">
            <p className="mr-auto truncate text-[0.875rem] text-paper/70">
              <span className="text-paper">{title}</span>
              <span className="mx-2 text-paper/30">/</span>
              {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </p>
            <div className="hidden rounded-full border border-paper/15 p-1 sm:flex" role="group" aria-label="Format d’affichage">
              {(["desktop", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={device === d}
                  onClick={() => setDevice(d)}
                  className={cn(
                    "rounded-full px-3.5 py-1 text-[0.8125rem] transition-colors",
                    device === d ? "bg-paper text-night" : "text-paper/60 hover:text-paper",
                  )}
                >
                  {d === "desktop" ? "Ordinateur" : "Mobile"}
                </button>
              ))}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.875rem] text-paper/70 hover:text-gold"
            >
              Nouvel onglet <ExternalIcon />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-paper/15 px-3.5 py-1 text-[0.8125rem] hover:border-gold hover:text-gold"
            >
              Fermer
            </button>
          </div>

          <div className="relative flex flex-1 items-stretch justify-center overflow-hidden bg-night">
            {!loaded && open && (
              <p className="absolute inset-0 grid place-items-center px-6 text-center text-[0.9375rem] text-paper/50">
                Chargement du site…
              </p>
            )}
            {open && (
              <iframe
                src={url}
                title={`Site ${title}`}
                onLoad={() => setLoaded(true)}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                className={cn(
                  "relative h-full bg-white transition-[width] duration-500 ease-out-soft",
                  device === "mobile" ? "w-[390px] max-w-full" : "w-full",
                )}
              />
            )}
          </div>

          <p className="border-t border-paper/10 px-5 py-2.5 text-[0.75rem] text-paper/45">
            Certains sites refusent l’affichage intégré. Dans ce cas, ouvrez-le dans un nouvel onglet.
          </p>
        </div>
      </dialog>
    </>
  );
}
