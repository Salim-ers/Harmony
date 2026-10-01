/**
 * Harmony Solutions — catalogue des réalisations.
 *
 * Ajouter un projet :
 *   1. Ajouter un objet dans `projects` (copier un projet existant).
 *   2. Lancer `npm run capture -- --only=<slug>` pour générer les captures
 *      dans /public/projects/<slug>/ (desktop, tablet, mobile, galerie).
 *   3. C'est tout : pages, filtres, sitemap et SEO se mettent à jour seuls.
 *
 * Tant qu'une capture n'existe pas, le site affiche une planche neutre
 * (nom du projet sur sa couleur dominante) — jamais un faux design.
 */

export type ProjectType =
  | "vitrine"
  | "ecommerce"
  | "application"
  | "saas"
  | "outil-metier"
  | "corporate";

export type Device = "desktop" | "tablet" | "mobile";

export interface GalleryItem {
  /** Chemin de l'image dans /public */
  src: string;
  /** Légende affichée sous l'image */
  label: string;
  device: Device;
  /** Page du site à capturer (utilisé par scripts/capture.ts) */
  path?: string;
  /** Défilement avant capture, en hauteurs d'écran (0 = haut de page) */
  scroll?: number;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Libellé lisible : « Site e-commerce », « SaaS »… */
  category: string;
  /** Types utilisés par les filtres */
  types: ProjectType[];
  industry: string;
  /** Laisser vide si inconnue : la ligne est alors masquée */
  year?: number;
  location?: string;
  description: string;
  url: string;
  thumbnail: string;
  desktopImage: string;
  tabletImage: string;
  mobileImage: string;
  gallery: GalleryItem[];
  features: Feature[];
  featured: boolean;
  status: "en-ligne" | "en-cours";
  /** « site » = vitrine, e-commerce, corporate · « produit » = SaaS & plateformes */
  group: "site" | "produit";
  /** Le besoin du client (section 02) */
  need: string;
  /** Ce qui a été conçu (section 03) */
  solution: string;
  /** Résultat produit, sans KPI inventé (section 06) */
  outcomes: string[];
  /** Couleur dominante du projet, pour les fonds et la planche de repli */
  tone: { bg: string; fg: string };
  /** Afficher le site réel dans la modale « Aperçu interactif » */
  allowEmbed: boolean;
  /** Afficher le bouton « Visiter le site » */
  showLiveLink: boolean;
  /** Visuel entièrement codé à la place d'une capture */
  mockup?: "business-card";
}

const img = (slug: string, name: string) => `/projects/${slug}/${name}.webp`;

function media(slug: string) {
  return {
    thumbnail: img(slug, "desktop"),
    desktopImage: img(slug, "desktop"),
    tabletImage: img(slug, "tablet"),
    mobileImage: img(slug, "mobile"),
  };
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "art-du-pain",
    title: "L’Art du Pain",
    category: "Site e-commerce",
    types: ["ecommerce"],
    industry: "Boulangerie / pâtisserie",
    year: 2026,
    location: "Nogent-sur-Oise",
    description:
      "Une expérience digitale pensée autour du savoir-faire artisanal, du Click & Collect et de la commande personnalisée.",
    url: "https://l-art-du-pain.vercel.app/",
    ...media("art-du-pain"),
    gallery: [
      { src: img("art-du-pain", "g-commander"), label: "Commande en ligne", device: "desktop", path: "/commander" },
      { src: img("art-du-pain", "g-sur-mesure"), label: "Configurateur de gâteau sur mesure", device: "desktop", path: "/gateaux-sur-mesure" },
      { src: img("art-du-pain", "g-creations-mobile"), label: "Les créations sur mobile", device: "mobile", path: "/nos-creations" },
    ],
    features: [
      { title: "Catalogue", text: "Sept familles de produits, des pains aux gourmandises, avec fiche détaillée et allergènes." },
      { title: "Commande en ligne", text: "Panier, compte client et suivi de commande." },
      { title: "Click & Collect", text: "Le client choisit son créneau et retire sa commande en boutique." },
      { title: "Gâteaux personnalisés", text: "Un configurateur en trois étapes : occasion, saveurs, message et photo d’inspiration." },
      { title: "Collections saisonnières", text: "Une collection de Noël en précommande, avec sa période de retrait." },
      { title: "Expérience mobile", text: "Barre de navigation basse : accueil, commander, panier, compte." },
      { title: "SEO local", text: "Contenus pensés pour Nogent-sur-Oise et les communes voisines." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Une boulangerie-pâtisserie de Nogent-sur-Oise souhaitait permettre à ses clients de commander à l’avance, sans perdre la chaleur d’une boutique de quartier ni la finesse de ses créations.",
    solution:
      "Un site e-commerce complet, à l’identité sombre et dorée : catalogue en familles, panier, compte client et Click & Collect avec choix du créneau. Un configurateur accompagne la commande de gâteaux sur mesure, et la collection de Noël se précommande à part.",
    outcomes: [
      "Une boutique en ligne qui prolonge le comptoir.",
      "Un parcours clair, du choix du produit au retrait.",
      "Une identité premium cohérente sur tous les écrans.",
    ],
    tone: { bg: "#16120E", fg: "#EFE4D2" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "02",
    slug: "h2au-lavage",
    title: "H2AU Lavage",
    category: "Site vitrine",
    types: ["vitrine"],
    industry: "Automobile",
    year: 2026,
    location: "Saint-Maximin",
    description:
      "Un site dynamique et local pensé pour présenter les programmes, équipements et services d’une station de lavage.",
    url: "https://station-rho.vercel.app/",
    ...media("h2au-lavage"),
    gallery: [
      { src: img("h2au-lavage", "g-programmes"), label: "Les programmes", device: "desktop", path: "/programmes" },
      { src: img("h2au-lavage", "g-equipements"), label: "Les équipements", device: "desktop", path: "/equipements" },
      { src: img("h2au-lavage", "g-station-mobile"), label: "La station sur mobile", device: "mobile", path: "/station" },
    ],
    features: [
      { title: "Programmes", text: "Trois formules lisibles d’un coup d’œil, avec leur prix." },
      { title: "Horaires", text: "Une station ouverte 24h/24, mise en scène sur une frise de la journée." },
      { title: "Présentation de la station", text: "Portique, rinçage, aspiration : les équipements en images." },
      { title: "Géolocalisation", text: "Carte, adresse détaillée et itinéraire en un geste." },
      { title: "Avis", text: "La note Google et une sélection d’avis, datés et sourcés." },
      { title: "Parcours simple", text: "Sur mobile, appeler ou lancer l’itinéraire reste toujours à portée de pouce." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Une station de lavage ouverte jour et nuit à Saint-Maximin avait besoin d’une présence en ligne immédiate : où elle se trouve, ce qu’elle propose et à quel prix, en quelques secondes.",
    solution:
      "Un site sombre et métallique, aux accents verts de la station : programmes et tarifs en tête, équipements, mode d’emploi, comparaison avant / après, avis Google et itinéraire. Chaque page mène à une action concrète.",
    outcomes: [
      "Une information pratique trouvée en quelques secondes.",
      "Une station locale présentée avec une vraie identité.",
      "Une navigation pensée pour le téléphone, sur place ou en route.",
    ],
    tone: { bg: "#070909", fg: "#E4EEE8" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "03",
    slug: "duo-d-artisans",
    title: "Le Duo d’Artisans",
    category: "Site vitrine",
    types: ["vitrine"],
    industry: "Boulangerie / pâtisserie",
    year: 2026,
    location: "Rantigny",
    description:
      "Une identité digitale artisanale et élégante pour valoriser deux savoir-faire complémentaires.",
    url: "https://duo-d-artisans-six.vercel.app/",
    ...media("duo-d-artisans"),
    gallery: [
      { src: img("duo-d-artisans", "g-creations"), label: "Les créations, filtrables par famille", device: "desktop", path: "/nos-creations" },
      { src: img("duo-d-artisans", "g-savoir-faire"), label: "Le savoir-faire, étape par étape", device: "desktop", path: "/savoir-faire" },
      { src: img("duo-d-artisans", "g-maison-mobile"), label: "La maison sur mobile", device: "mobile", path: "/la-maison" },
    ],
    features: [
      { title: "Identité", text: "Une direction éditoriale artisanale, ouverte sur la façade de la boutique." },
      { title: "Créations", text: "Pain, viennoiserie, pâtisserie, gâteaux et snacking, filtrables par famille." },
      { title: "Savoir-faire", text: "Les gestes du fournil racontés en cinq temps." },
      { title: "Navigation immersive", text: "Bandeaux défilants, galerie de vitrine et journée type en boutique." },
      { title: "Présentation locale", text: "Horaires, statut d’ouverture calculé en direct, itinéraire et appel." },
      { title: "Commandes", text: "Une page dédiée aux demandes de gâteaux." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Deux métiers sous un même toit, boulangerie et pâtisserie : il fallait une vitrine qui raconte les deux sans les confondre, et qui donne envie de pousser la porte.",
    solution:
      "Un site au ton éditorial : la façade en ouverture, le déroulé des gestes du fournil, les créations par famille, une journée type en boutique et des horaires toujours à jour. Le tout dans une palette claire qui rappelle la devanture.",
    outcomes: [
      "Deux savoir-faire présentés dans une même maison.",
      "Une identité artisanale cohérente, de la façade à l’écran.",
      "Des informations pratiques toujours à jour.",
    ],
    tone: { bg: "#F3EDE2", fg: "#1D2A45" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "04",
    slug: "merveilles-de-rantigny",
    title: "Aux Merveilles de Rantigny",
    category: "Site vitrine",
    types: ["vitrine"],
    industry: "Boulangerie / pâtisserie",
    year: 2026,
    location: "Rantigny",
    description:
      "Une vitrine digitale chaleureuse pensée pour valoriser les créations, l’identité et le commerce local.",
    url: "https://merveilles-de-rantingy-one.vercel.app/",
    ...media("merveilles-de-rantigny"),
    gallery: [
      { src: img("merveilles-de-rantigny", "g-vitrine"), label: "La vitrine, rayon par rayon", device: "desktop", path: "/nos-produits" },
      { src: img("merveilles-de-rantigny", "g-commandes"), label: "Demande de gâteau d’occasion", device: "desktop", path: "/commandes" },
      { src: img("merveilles-de-rantigny", "g-boutique-mobile"), label: "La boutique sur mobile", device: "mobile", path: "/la-boutique" },
    ],
    features: [
      { title: "Pièces signature", text: "Macarons géants, entremets, flans et tartes mis en scène un par un." },
      { title: "Rayons", text: "Sept familles accessibles depuis l’accueil." },
      { title: "Galerie", text: "Les photographies de la boutique, agrandissables en plein écran." },
      { title: "Gâteaux d’occasion", text: "Un parcours de demande en trois temps, jusqu’au rappel par la boutique." },
      { title: "Horaires & accès", text: "Jours d’ouverture, téléphone et itinéraire." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Une boulangerie-pâtisserie de l’avenue de Rantigny, connue pour ses pièces de vitrine, voulait les montrer telles qu’elles sont et simplifier les demandes de gâteaux.",
    solution:
      "Une vitrine digitale construite autour des photographies prises en boutique : pièces signature, rayons, galerie plein écran et parcours de demande de gâteau, dans une ambiance chaude et gourmande.",
    outcomes: [
      "Les créations présentées comme en vitrine.",
      "Une demande de gâteau simple et rassurante.",
      "Une présence locale chaleureuse et identifiable.",
    ],
    tone: { bg: "#1B1714", fg: "#F2E4D2" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "05",
    slug: "carte-digitale",
    title: "Carte digitale professionnelle",
    category: "Application web",
    types: ["application"],
    industry: "Carte de visite virtuelle",
    year: 2026,
    description:
      "Une carte de visite digitale accessible par lien ou QR code pour centraliser coordonnées, réseaux sociaux et informations professionnelles.",
    // L’URL réelle est volontairement absente : le site d’origine affiche l’identité
    // du client. Rien n’est capturé, intégré ni lié, et l’URL n’apparaît pas dans le code.
    url: "",
    thumbnail: "",
    desktopImage: "",
    tabletImage: "",
    mobileImage: "",
    gallery: [],
    features: [
      { title: "Lien & QR code", text: "Une adresse unique à partager, imprimable en QR code." },
      { title: "Ajout aux contacts", text: "Les coordonnées s’enregistrent dans le téléphone en un geste (vCard)." },
      { title: "Contact direct", text: "Appel, e-mail et liens professionnels en accès immédiat." },
      { title: "Réseaux & liens", text: "Site, plateformes et réseaux sociaux réunis au même endroit." },
      { title: "Partage", text: "Partage natif depuis le téléphone, ou copie du lien." },
      { title: "Design personnalisé", text: "Couleurs, logo et typographie de la marque." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Les cartes papier se perdent, s’épuisent et deviennent vite obsolètes. Il fallait un format qui se partage en un geste et reste toujours à jour.",
    solution:
      "Une carte de visite web, ouverte par lien ou QR code : coordonnées directes, ajout aux contacts en un tap, liens vers le site, les plateformes et les réseaux, et partage natif depuis le téléphone.",
    outcomes: [
      "Des coordonnées partagées en une seconde.",
      "Une carte toujours à jour, sans réimpression.",
      "Une image professionnelle cohérente avec la marque.",
    ],
    tone: { bg: "#0E1116", fg: "#ECE7DD" },
    allowEmbed: false,
    showLiveLink: false,
    mockup: "business-card",
  },
  {
    id: "06",
    slug: "royale-auto-ecole",
    title: "Royale Auto-école",
    category: "Site vitrine",
    types: ["vitrine"],
    industry: "Auto-école",
    year: 2026,
    location: "Breuil-le-Vert",
    description:
      "Une expérience moderne et rassurante conçue pour moderniser l’image d’une auto-école et simplifier l’accès aux formations.",
    url: "https://royale-one.vercel.app/",
    ...media("royale-auto-ecole"),
    gallery: [
      { src: img("royale-auto-ecole", "g-formations"), label: "Les formations", device: "desktop", path: "/formations" },
      { src: img("royale-auto-ecole", "g-reglementation"), label: "Réglementation et documents", device: "desktop", path: "/reglementation" },
      { src: img("royale-auto-ecole", "g-securite-mobile"), label: "Sécurité routière sur mobile", device: "mobile", path: "/securite-routiere" },
    ],
    features: [
      { title: "Formations", text: "Neuf formules, du permis B à la conduite supervisée." },
      { title: "Identité automobile", text: "Une direction noire et dorée, fidèle à la devanture." },
      { title: "Pages réglementaires", text: "Démarches, documents à fournir et sécurité routière." },
      { title: "Parcours élève", text: "Les étapes, de l’inscription au permis en poche." },
      { title: "Contact", text: "Inscription et appel accessibles depuis chaque écran." },
      { title: "Expérience mobile", text: "Barre d’actions basse et contenus lisibles au pouce." },
      { title: "SEO local", text: "Pages structurées pour Breuil-le-Vert et l’Oise." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Une auto-école de Breuil-le-Vert voulait une image à la hauteur de son accueil, et rendre ses formations, ses démarches et ses documents faciles à trouver.",
    solution:
      "Un site moderne et rassurant : formules présentées clairement, parcours du premier cours au permis, pages réglementation et documents, sécurité routière avec mini quiz, inscription accessible partout.",
    outcomes: [
      "Une image moderne, fidèle au lieu.",
      "Des formations et des démarches enfin lisibles.",
      "Un contact possible depuis n’importe quelle page.",
    ],
    tone: { bg: "#0E1422", fg: "#EEE5CF" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "07",
    slug: "noa-cafe",
    title: "Noa Café",
    category: "Site vitrine",
    types: ["vitrine"],
    industry: "Coffee shop",
    location: "Paris",
    description:
      "Une présence digitale minimaliste et chaleureuse pensée pour retranscrire l’univers d’un coffee shop parisien.",
    url: "https://noa-cafe-one.vercel.app/",
    ...media("noa-cafe"),
    gallery: [
      { src: img("noa-cafe", "g-ambiance"), label: "L’ambiance", device: "desktop", path: "/", scroll: 1 },
      { src: img("noa-cafe", "g-menu"), label: "Le menu", device: "desktop", path: "/", scroll: 2 },
      { src: img("noa-cafe", "g-mobile"), label: "Navigation mobile", device: "mobile", path: "/", scroll: 1 },
    ],
    features: [
      { title: "Direction artistique", text: "Une esthétique sobre et chaleureuse, à l’image du lieu." },
      { title: "Menu", text: "La carte, lisible et facile à mettre à jour." },
      { title: "Ambiance", text: "Le lieu raconté par l’image plus que par le texte." },
      { title: "Localisation", text: "Adresse et accès en évidence." },
      { title: "Navigation mobile", text: "Pensée d’abord pour le téléphone." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Un coffee shop parisien voulait un site qui ressemble à son comptoir : calme, chaleureux, sans détour.",
    solution:
      "Une présence digitale minimaliste : direction artistique sobre, menu lisible, ambiance du lieu et localisation, le tout pensé d’abord pour le téléphone.",
    outcomes: [
      "Un univers fidèle au lieu.",
      "Un menu consultable en quelques secondes.",
      "Une navigation mobile fluide.",
    ],
    tone: { bg: "#2A221C", fg: "#F0E6D8" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "08",
    slug: "quadcore",
    title: "QuadCore",
    category: "Site corporate",
    types: ["corporate", "vitrine"],
    industry: "ESN / technologie",
    year: 2026,
    description:
      "Un site corporate structuré pour présenter les expertises, services et solutions d’une entreprise technologique.",
    url: "https://www.quad-core.fr/",
    ...media("quadcore"),
    gallery: [
      { src: img("quadcore", "g-services"), label: "Les expertises", device: "desktop", path: "/", scroll: 2 },
      { src: img("quadcore", "g-methode"), label: "La méthode d’intervention", device: "desktop", path: "/", scroll: 4 },
      { src: img("quadcore", "g-mobile"), label: "Le site sur mobile", device: "mobile", path: "/", scroll: 1 },
    ],
    features: [
      { title: "Univers IT", text: "Une identité sombre et technique, rythmée par le mouvement." },
      { title: "Présentation des services", text: "Six domaines d’expertise, chacun détaillé par métier." },
      { title: "Solutions", text: "Une section dédiée au produit maison de l’entreprise." },
      { title: "Structure corporate", text: "Mission, approche, valeurs et méthode en cinq étapes." },
      { title: "Prise de rendez-vous", text: "Agenda intégré, chargé uniquement après consentement." },
      { title: "Bilingue", text: "Le site existe en français et en anglais." },
    ],
    featured: true,
    status: "en-ligne",
    group: "site",
    need:
      "Une ESN avait besoin d’un site corporate qui expose clairement ses expertises et sa manière d’intervenir auprès des directions IT.",
    solution:
      "Un site structuré et bilingue : expertises détaillées par métier, méthode en cinq étapes, mise en avant du produit maison, prise de rendez-vous et formulaire de contact conforme au RGPD.",
    outcomes: [
      "Une offre complexe rendue lisible.",
      "Une image corporate solide et cohérente.",
      "Un contact facilité, du rendez-vous au formulaire.",
    ],
    tone: { bg: "#0C0C0D", fg: "#EAEAEA" },
    allowEmbed: true,
    showLiveLink: true,
  },

  /* ---------------------------- Produits & SaaS ---------------------------- */
  {
    id: "S1",
    slug: "horse-ledger",
    title: "Horse Ledger",
    category: "SaaS",
    types: ["saas", "outil-metier"],
    industry: "Gestion équine",
    year: 2026,
    description: "Une plateforme de gestion dédiée aux professionnels du secteur équestre.",
    url: "https://www.horse-ledger.com/",
    ...media("horse-ledger"),
    gallery: [
      { src: img("horse-ledger", "g-demo"), label: "Tableau de bord (démo interactive)", device: "desktop", path: "/demo" },
      { src: img("horse-ledger", "g-gestion"), label: "Écran de gestion : l’écurie", device: "desktop", path: "/ecurie" },
      { src: img("horse-ledger", "g-mobile"), label: "La plateforme sur mobile", device: "mobile", path: "/" },
    ],
    features: [
      { title: "Tableau de bord", text: "Toute l’écurie réunie sur un seul écran." },
      { title: "Suivi des chevaux", text: "Une fiche vivante par cheval : santé, soins, documents." },
      { title: "Planning & soins", text: "Cours, soins et interventions au même endroit." },
      { title: "Facturation", text: "Pensions, prestations, revenus et dépenses." },
      { title: "Stocks & équipe", text: "Seuils d’alerte, salariés, intervenants et rôles." },
      { title: "Abonnements", text: "Des offres mensuelles ou annuelles selon la taille du cheptel." },
      { title: "Données métier", text: "Trois parcours : haras, écurie et écurie de course." },
    ],
    featured: true,
    status: "en-ligne",
    group: "produit",
    need:
      "Haras, écuries et écuries de course gèrent souvent leurs chevaux entre tableurs, carnets de soins et relances manuelles.",
    solution:
      "Une plateforme SaaS qui réunit chevaux, soins, planning, documents, facturation, stocks et équipe dans un même tableau de bord. Trois parcours métier, une démo interactive et des abonnements adaptés à chaque structure.",
    outcomes: [
      "Une seule source de vérité pour toute l’écurie.",
      "Une interface premium pensée pour le terrain comme pour le bureau.",
      "Un produit prêt à être commercialisé par abonnement.",
    ],
    tone: { bg: "#FDFAF6", fg: "#1F2A24" },
    allowEmbed: true,
    showLiveLink: true,
  },
  {
    id: "S2",
    slug: "centrium",
    title: "Centrium",
    category: "SaaS",
    types: ["saas", "outil-metier"],
    industry: "Gestion / ESN",
    year: 2026,
    description:
      "Une plateforme métier conçue pour centraliser la gestion des consultants, missions et processus opérationnels.",
    url: "https://www.centrium-platform.com/",
    ...media("centrium"),
    gallery: [
      { src: img("centrium", "g-plateforme"), label: "La plateforme, module par module", device: "desktop", path: "/plateforme" },
      { src: img("centrium", "g-demos"), label: "Démos en direct : CV, matching, facturation", device: "desktop", path: "/", scroll: 2 },
      { src: img("centrium", "g-mobile"), label: "Centrium sur mobile", device: "mobile", path: "/" },
    ],
    features: [
      { title: "Tableau de bord", text: "La salle de pilotage de l’ESN." },
      { title: "Gestion des consultants", text: "Une bibliothèque centralisée et enrichie." },
      { title: "Missions", text: "Rapprochement des profils et des besoins clients." },
      { title: "Automatisation", text: "Du compte rendu d’activité à la facture, en un flux." },
      { title: "Centralisation des données", text: "CV, missions et facturation au même endroit, hébergés en Europe." },
    ],
    featured: true,
    status: "en-ligne",
    group: "produit",
    need:
      "Les ESN pilotent consultants, CV, missions et facturation avec plusieurs outils qui ne communiquent pas entre eux.",
    solution:
      "Une plateforme métier qui centralise la bibliothèque de consultants, met en forme les CV, rapproche profils et missions, puis enchaîne compte rendu d’activité et facturation dans un seul flux.",
    outcomes: [
      "Un seul outil à la place de plusieurs.",
      "Des processus opérationnels automatisés.",
      "Une interface sobre, pensée pour un usage quotidien.",
    ],
    tone: { bg: "#FFFFFF", fg: "#0F172A" },
    allowEmbed: true,
    showLiveLink: true,
  },
];

/* --------------------------------- Helpers -------------------------------- */

export const siteProjects = projects.filter((p) => p.group === "site");
export const productProjects = projects.filter((p) => p.group === "produit");
export const featuredSites = siteProjects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export type FilterKey = "tous" | "vitrines" | "ecommerce" | "applications" | "saas" | "outils";

export const filters: { key: FilterKey; label: string; match: (p: Project) => boolean }[] = [
  { key: "tous", label: "Tous", match: () => true },
  { key: "vitrines", label: "Sites vitrines", match: (p) => p.types.includes("vitrine") },
  { key: "ecommerce", label: "E-commerce", match: (p) => p.types.includes("ecommerce") },
  { key: "applications", label: "Applications", match: (p) => p.types.includes("application") },
  { key: "saas", label: "SaaS", match: (p) => p.types.includes("saas") },
  { key: "outils", label: "Outils métier", match: (p) => p.types.includes("outil-metier") },
];

/** Projet affiché sous forme de « planche » claire (texte foncé) */
export function isLightTone(p: Project) {
  const hex = p.tone.bg.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
