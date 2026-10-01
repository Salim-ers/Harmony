# Harmony Solutions · Portfolio

Portfolio des réalisations digitales de Harmony Solutions.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · polices auto-hébergées.

## Démarrer

```bash
npm install
cp .env.example .env.local    # puis compléter (voir « Formulaire » plus bas)
npm run dev                   # http://localhost:3000
```

Production :

```bash
npm run build && npm start
```

Le build génère d’abord `data/captures.json` (liste des captures présentes), puis 28 pages statiques.

## 1. Générer les captures des sites (à faire une fois)

Les visuels des projets sont de vraies captures des sites, générées par un script.
Tant qu’une capture n’existe pas, le site affiche une planche sobre (nom du projet sur sa couleur) : jamais de faux design, jamais d’image cassée.

```bash
npx playwright install chromium          # une seule fois
npm run capture                          # tous les projets (~5 min)
npm run capture -- --only=noa-cafe       # un seul projet
npm run capture -- --skip-gallery        # sans les pages de galerie
CHROMIUM_PATH="/chemin/vers/chrome" npm run capture   # avec un Chrome déjà installé
```

Pour chaque projet : ordinateur (1440×900), tablette (834×1112), mobile (390×844) et les pages de galerie déclarées dans `data/projects.ts`, en WebP dans `public/projects/<slug>/`.
Le script ferme les bandeaux cookies courants, désactive les animations des sites (`prefers-reduced-motion`) et fait défiler la page pour charger les images.

Vérifiez chaque image après coup. Si une capture est ratée (bandeau, écran de chargement), relancez le projet seul ou remplacez le fichier à la main en gardant le même nom.

**Carte digitale** : jamais capturée. Son visuel est une maquette codée avec une identité fictive (Alex Martin, Studio Nova), dans `components/mockups/BusinessCard.tsx`. L’URL du site réel n’apparaît nulle part dans le code.

**SaaS** : les écrans de tableau de bord derrière connexion ne sont pas accessibles au script. Pour en montrer, déposez vos propres captures (WebP, 16:10) dans `public/projects/horse-ledger/` ou `public/projects/centrium/`, ajoutez-les au tableau `gallery` du projet, puis lancez `npm run manifest`.

## 2. Ajouter un projet

1. Dans `data/projects.ts`, copier un projet existant et l’adapter (slug, textes, `tone`, `gallery`…).
2. `npm run capture -- --only=<slug>`
3. C’est tout : accueil, `/realisations`, filtres, page projet, « Projet suivant », sitemap et données Schema.org se mettent à jour.

Champs utiles :

| Champ | Rôle |
|---|---|
| `types` | Filtres : `vitrine`, `ecommerce`, `application`, `saas`, `outil-metier`, `corporate` |
| `group` | `site` (section « Quelques projets ») ou `produit` (section « Produits & SaaS ») |
| `featured` | Affiché sur l’accueil |
| `tone` | Couleur dominante du projet (fond des planches) |
| `year` | Laisser vide si inconnue : la ligne est masquée |
| `allowEmbed` | Bouton « Aperçu interactif » (iframe chargée seulement à l’ouverture) |
| `showLiveLink` | Bouton « Visiter le site » |
| `need`, `solution`, `outcomes` | Sections 02, 03 et 06 de la page projet (pas de chiffres inventés) |

## 3. Formulaire « Démarrer un projet »

`/projet` envoie les réponses à `app/api/projet/route.ts`. Configurez **une** option dans `.env.local` (et dans les variables d’environnement de l’hébergeur) :

- `RESEND_API_KEY` (+ `PROJECT_FORM_TO`, `PROJECT_FORM_FROM`) : e-mail via [Resend](https://resend.com). Le domaine expéditeur doit être vérifié chez Resend.
- `PROJECT_FORM_WEBHOOK_URL` : le JSON est transmis à Make, Zapier, n8n…

Sans configuration, le formulaire reste fonctionnel : il ouvre la messagerie du visiteur avec un e-mail pré-rempli vers `contact@harmony-solutions.fr`.
Un champ caché anti-spam est inclus.

## 4. À compléter avant la mise en ligne

- [ ] `NEXT_PUBLIC_SITE_URL` : domaine définitif (canonical, sitemap, OpenGraph).
- [ ] `app/mentions-legales/page.tsx` : forme juridique, SIRET, directeur de publication, hébergeur (passages surlignés).
- [ ] `app/confidentialite/page.tsx` : valider la durée de conservation (3 ans).
- [ ] `data/site.ts` : URL LinkedIn (le lien apparaît dans le footer et Schema.org dès qu’elle est renseignée), téléphone.
- [ ] Années des projets : déduites du © affiché sur les sites (2026), à confirmer. Noa Café : inconnue, masquée.
- [ ] Vérifier les sites eux-mêmes avant capture : H2AU affiche encore « [DÉTAILS DU PROGRAMME À RENSEIGNER] », Royale montre deux avis « Exemple à remplacer » et un canonical `votre-domaine.fr`.

## Architecture

```
app/
  page.tsx                     Accueil
  realisations/page.tsx        Toutes les réalisations + filtres (?filtre=saas)
  realisations/[slug]/page.tsx Page projet (01 → 07 + projet suivant)
  sites-web, applications, saas, a-propos, contact, projet
  mentions-legales, confidentialite, not-found
  api/projet/route.ts          Réception du questionnaire
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.png, apple-icon.png
components/
  home/        Hero, sections de l’accueil
  projects/    ProjectRow, ProjectBoard, ProjectsExplorer, PreviewModal, NextProject, Catalog
  mockups/     Cadres navigateur / tablette / mobile, Shot (capture ou planche), carte digitale
  motion/      Apparitions CSS + observateur unique, parallaxe, curseur « Voir »
  forms/       Questionnaire en 6 étapes
  layout/      Navbar, Footer
data/
  projects.ts  Catalogue des projets
  site.ts      Coordonnées, navigation, services, process
  captures.json (généré)
scripts/
  capture.ts   Captures Playwright → WebP
  manifest.ts  Liste des captures présentes
```

## Notes techniques

- **Images** : `next/image` partout, AVIF/WebP, lazy-loading (sauf visuel principal). Aucune iframe chargée automatiquement.
- **Animations** : les apparitions au défilement sont en CSS, déclenchées par un seul `IntersectionObserver` ; le contenu du haut de page reste visible dès le premier rendu. `prefers-reduced-motion` est respecté. Framer Motion est réservé aux interactions (menu, curseur, questionnaire, parallaxe), et ses fonctionnalités sont chargées en différé.
- **Polices** : Instrument Serif et Manrope, auto-hébergées via `next/font/local`, préchargées, avec métriques de repli ajustées (CLS 0).
- **Accessibilité** : lien d’évitement, focus visible, navigation clavier, `aria-current`, modale `<dialog>`, formulaires labellisés avec messages d’erreur explicites.
- **SEO** : metadata par page, canonical, OpenGraph, Twitter Card, Schema.org (`ProfessionalService`, `CreativeWork`, `BreadcrumbList`), sitemap, robots.

### Lighthouse (mesuré sur `next start`, sans captures)

| Page | Perf. mobile | Perf. ordinateur | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|---|
| Accueil | 68–79 | 86 | 100 | 100 | 100 |
| Réalisations | 67–72 | 95 | 100 | 100 | 100 |
| Page projet | 79–85 | 95 | 100 | 100 | 100 |

Le score mobile est une simulation 4G lente avec processeur ralenti. Le LCP réellement mesuré dans le navigateur (processeur ×4 plus lent) est d’environ 0,5 s. Ce qui pèse est le temps d’exécution JavaScript (TBT) ; pour viser > 90 en mobile, la piste suivante est de remplacer Framer Motion par du CSS dans le menu, les filtres et la parallaxe.
Relancez Lighthouse après la génération des captures et sur l’URL de production (CDN + Brotli).
