"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { nav, site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !open
            ? "border-b border-paper/[0.07] bg-night/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Logo className="relative z-[60]" />

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.875rem] transition-colors duration-300",
                        active ? "text-paper" : "text-paper/60 hover:text-paper",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px bg-gold transition-[width] duration-500 ease-out-soft",
                          active ? "w-full" : "w-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <span className="hidden sm:block">
              <Link href="/projet" className={buttonClass("gold", "h-10 px-5 text-[0.875rem]")}>
                Parler de mon projet
              </Link>
            </span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="flex h-10 items-center gap-3 rounded-full px-2 text-[0.875rem] text-paper xl:hidden"
            >
              <span>{open ? "Fermer" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-out-soft",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-out-soft",
                    open ? "top-1.5 -rotate-45" : "top-2.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-night xl:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.65, ease }}
          >
            <nav aria-label="Navigation mobile" className="container-x flex flex-1 flex-col justify-center pt-20">
              <ul className="space-y-1">
                {nav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="overflow-hidden">
                      <m.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.045 }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-baseline gap-4 py-1 font-serif text-[clamp(2.4rem,9vw,4.2rem)] leading-[1.05] tracking-[-0.02em] transition-colors",
                            active ? "text-gold" : "text-paper hover:text-gold",
                          )}
                        >
                          {item.label}
                        </Link>
                      </m.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <m.div
              className="container-x flex flex-col gap-5 border-t border-paper/10 py-7 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex flex-col gap-1 text-[0.9375rem] text-paper/70">
                <a href={`mailto:${site.email}`} className="link-line w-fit">
                  {site.email}
                </a>
                <a href={`tel:${site.phoneHref}`} className="link-line w-fit">
                  {site.phone}
                </a>
              </div>
              <Link href="/projet" className={buttonClass("gold", "w-full sm:w-auto")}>
                Parler de mon projet
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
