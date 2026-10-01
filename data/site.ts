export const site = {
  name: "Harmony Solutions",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.harmony-solutions.fr").replace(/\/$/, ""),
  tagline: "Solutions digitales pensées pour votre activité.",
  description:
    "Harmony Solutions conçoit des sites internet, applications, SaaS et outils digitaux sur mesure pour les commerces, indépendants et entreprises.",
  email: "contact@harmony-solutions.fr",
  phone: "06 51 08 08 33",
  phoneHref: "+33651080833",
  address: {
    street: "66 avenue Jean Jaurès",
    postalCode: "60290",
    city: "Rantigny",
    region: "Oise",
    country: "FR",
  },
  /** Renseigner l’URL de la page LinkedIn pour l’afficher dans le footer */
  linkedin: "" as string,
  keywords: [
    "Harmony Solutions",
    "création site internet Oise",
    "création site web",
    "création site e-commerce",
    "création application web",
    "création SaaS",
    "création CRM",
    "agence web Oise",
    "portfolio création site web",
    "développeur site internet",
  ],
};

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/sites-web", label: "Sites web" },
  { href: "/applications", label: "Applications" },
  { href: "/saas", label: "SaaS" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  { title: "Sites web", items: ["Sites vitrines", "E-commerce", "Réservation", "Commande"] },
  { title: "Applications", items: ["Applications web", "Dashboards", "CRM", "Outils métier"] },
  { title: "Produits", items: ["SaaS", "Plateformes", "Solutions sur mesure"] },
  { title: "Accompagnement", items: ["SEO", "Maintenance", "Évolution"] },
];

export const processSteps = [
  { n: "01", title: "Découverte", text: "Comprendre l’activité et les objectifs." },
  { n: "02", title: "Direction", text: "Définir structure, design et parcours." },
  { n: "03", title: "Création", text: "Développer une expérience rapide et responsive." },
  { n: "04", title: "Lancement", text: "Mettre en ligne, tester et accompagner." },
];
