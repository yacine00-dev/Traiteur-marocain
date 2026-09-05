/**
 * Configuration centrale du site.
 * Toutes les coordonnées, textes légaux et données SEO sont regroupés ici
 * pour être modifiés en un seul endroit avant mise en production.
 */

export const SITE = {
  name: "Les Saveurs de la Méditerranée",
  legalName: "Les Saveurs de la Méditerranée SARL",
  tagline: "Traiteur marocain & méditerranéen à Bordeaux",
  foundedYear: 2008,
  url: "https://www.saveurs-mediterranee.fr",
  description:
    "Traiteur marocain et méditerranéen haut de gamme à Bordeaux depuis 2008 : mariages, réceptions privées, séminaires d'entreprise et couscous royal en Gironde.",
};

export const CONTACT = {
  phoneDisplay: "05 56 00 00 00",
  phoneLink: "tel:+33556000000",
  whatsappLink: "https://wa.me/33556000000",
  email: "contact@saveurs-mediterranee.fr",
  address: {
    street: "12 rue du Commerce",
    postalCode: "33000",
    city: "Bordeaux",
    country: "FR",
  },
  geo: {
    latitude: 44.8378,
    longitude: -0.5792,
  },
  openingHours: [
    { days: "Lun – Ven", hours: "9h – 19h" },
    { days: "Samedi", hours: "10h – 17h" },
    { days: "Dimanche", hours: "Sur rendez-vous" },
  ],
  // Format ISO 8601 pour les données structurées Schema.org
  openingHoursSpecification: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { dayOfWeek: ["Saturday"], opens: "10:00", closes: "17:00" },
  ],
};

export const SOCIAL = {
  instagram: "https://instagram.com/saveurs.mediterranee.bdx",
  facebook: "https://facebook.com/saveursmediterraneebordeaux",
};

/** Communes desservies — utilisées dans le footer et les données structurées `areaServed`. */
export const SERVICE_ZONES = [
  "Bordeaux",
  "Mérignac",
  "Pessac",
  "Talence",
  "Gradignan",
  "Bègles",
  "Cenon",
  "Lormont",
  "Blanquefort",
  "Bruges",
  "Libourne",
  "Arcachon",
  "Langon",
  "Blaye",
  "Saint-André-de-Cubzac",
];

export const NAV_LINKS = [
  { label: "L'Atelier", href: "#savoirfaire" },
  { label: "Menus", href: "#menus" },
  { label: "Savoir-Faire", href: "#savoirfaire" },
  { label: "Devis", href: "#devis" },
  { label: "Contact", href: "#contact" },
];

export const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "CGV", href: "/cgv" },
];
