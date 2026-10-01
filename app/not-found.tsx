import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-24 pt-36">
      <p className="num text-[1.6rem]">404</p>
      <h1 className="display-xl mt-6 max-w-[14ch] text-paper">Cette page n’existe pas.</h1>
      <p className="lede mt-6 max-w-[40ch] text-paper/65">
        Le lien est peut-être ancien. Les réalisations, elles, sont toutes là.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/realisations" className={buttonClass("gold")}>
          Voir les réalisations
        </Link>
        <Link href="/" className={buttonClass("outline")}>
          Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
