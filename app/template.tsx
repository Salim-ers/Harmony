import type { ReactNode } from "react";

// Le template est remonté à chaque navigation : l’animation CSS rejoue
// à chaque changement de page, sans JavaScript et sans masquer le contenu.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="hs-page">{children}</div>;
}
