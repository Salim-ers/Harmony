import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="bg-paper text-night">
      <div className="container-x pb-28 pt-36 md:pt-48">
        <h1 className="display-l max-w-[18ch]">{title}</h1>
        <p className="meta mt-6 text-night/65">Dernière mise à jour : {updated}</p>
        <div className="mt-14 max-w-[68ch] space-y-10 text-[1.0rem] leading-[1.75] text-night/80 [&_h2]:font-serif [&_h2]:text-[1.6rem] [&_h2]:leading-tight [&_h2]:text-night [&_p+p]:mt-3 [&_a]:underline [&_a]:underline-offset-2 [&_mark]:bg-gold/25 [&_mark]:px-1 [&_mark]:text-night">
          {children}
        </div>
      </div>
    </section>
  );
}
