export type Locale = "en" | "fr";
export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

// Static UI copy only — vehicle data, testimonial quotes, and anything
// else pulled from Supabase is user-generated content and isn't covered
// by this dictionary.
const dictionary = {
  en: {
    nav: {
      inventory: "Inventory",
      sourceACar: "Source a Car",
      sellYourCar: "Sell Your Car",
      about: "About",
      contact: "Contact",
      admin: "Admin",
      findMyCar: "Find My Car",
    },
    footer: {
      tagline: "Driven by Value.",
      navigate: "Navigate",
      home: "Home",
      services: "Services",
      buyFromUs: "Buy From Us",
      weFindIt: "We Find It",
      sellToUs: "Sell To Us",
      contact: "Contact",
      nationwideDelivery: "Nationwide Delivery, USA",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      rightsReserved: "All rights reserved.",
    },
    hero: {
      eyebrow: "Online-Only Dealership",
      titleLine1: "Driven by",
      titleHighlight: "Value",
      description:
        "We buy, sell, and source performance and luxury vehicles nationwide — with verified history, honest inspections, and delivery to your door.",
      viewInventory: "View Inventory",
      sourceACar: "Source a Car",
    },
    stats: {
      carsSold: "Cars Sold",
      satisfaction: "Satisfaction",
      avgTurnaround: "Avg. Turnaround",
      avgTurnaroundValue: "14 Day",
      volume: "Volume",
    },
    services: {
      eyebrow: "Services",
      title: "How We Work",
      buyTitle: "Buy From Us",
      buyDescription: "Browse verified, inspected inventory ready to ship nationwide.",
      findTitle: "We Find It",
      findDescription: "Tell us what you want and we'll source it from our network.",
      sellTitle: "Sell To Us",
      sellDescription: "Outright purchase or consignment — get paid on your terms.",
      learnMore: "Learn More",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What Clients Say",
    },
    cta: {
      title: "Can't Find What You're Looking For?",
      description: "Tell us the exact car you want and we'll go find it.",
      button: "Source a Car",
    },
    pageHeaders: {
      inventory: { label: "Inventory", title: "Current Stock", subtitle: "Every car we list is inspected and history-verified before it goes live." },
      about: { label: "About", title: "Our Story" },
      contact: { label: "Contact", title: "Get In Touch" },
      sourceACar: { label: "Source a Car", title: "We'll Find It", subtitle: "Tell us what you want, and we'll go source it from our network." },
      sellYourCar: { label: "Sell Your Car", title: "Outright Purchase or Consignment", subtitle: "Two ways to sell. Tell us your car's details and we'll recommend the right one." },
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has moved.",
      button: "Back to Home",
    },
  },
  fr: {
    nav: {
      inventory: "Inventaire",
      sourceACar: "Trouver une Voiture",
      sellYourCar: "Vendre votre Voiture",
      about: "À propos",
      contact: "Contact",
      admin: "Admin",
      findMyCar: "Trouver ma Voiture",
    },
    footer: {
      tagline: "Guidé par la Valeur.",
      navigate: "Navigation",
      home: "Accueil",
      services: "Services",
      buyFromUs: "Acheter chez Nous",
      weFindIt: "Nous la Trouvons",
      sellToUs: "Vendez-nous",
      contact: "Contact",
      nationwideDelivery: "Livraison partout aux États-Unis",
      privacyPolicy: "Politique de Confidentialité",
      termsOfService: "Conditions d'Utilisation",
      rightsReserved: "Tous droits réservés.",
    },
    hero: {
      eyebrow: "Concessionnaire en Ligne Uniquement",
      titleLine1: "Guidé par la",
      titleHighlight: "Valeur",
      description:
        "Nous achetons, vendons et trouvons des véhicules de performance et de luxe partout au pays — avec historique vérifié, inspections honnêtes et livraison à votre porte.",
      viewInventory: "Voir l'Inventaire",
      sourceACar: "Trouver une Voiture",
    },
    stats: {
      carsSold: "Voitures Vendues",
      satisfaction: "Satisfaction",
      avgTurnaround: "Délai Moyen",
      avgTurnaroundValue: "14 Jours",
      volume: "Volume",
    },
    services: {
      eyebrow: "Services",
      title: "Comment Ça Marche",
      buyTitle: "Acheter chez Nous",
      buyDescription: "Parcourez un inventaire vérifié et inspecté, prêt à expédier partout au pays.",
      findTitle: "Nous la Trouvons",
      findDescription: "Dites-nous ce que vous voulez et nous la trouverons dans notre réseau.",
      sellTitle: "Vendez-nous",
      sellDescription: "Achat ferme ou consignation — soyez payé selon vos conditions.",
      learnMore: "En savoir plus",
    },
    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que Disent nos Clients",
    },
    cta: {
      title: "Vous ne Trouvez pas ce que Vous Cherchez?",
      description: "Dites-nous exactement quelle voiture vous voulez et nous la trouverons.",
      button: "Trouver une Voiture",
    },
    pageHeaders: {
      inventory: { label: "Inventaire", title: "Stock Actuel", subtitle: "Chaque voiture listée est inspectée et son historique est vérifié avant publication." },
      about: { label: "À propos", title: "Notre Histoire" },
      contact: { label: "Contact", title: "Contactez-nous" },
      sourceACar: { label: "Trouver une Voiture", title: "Nous la Trouverons", subtitle: "Dites-nous ce que vous voulez, et nous la trouverons dans notre réseau." },
      sellYourCar: { label: "Vendre votre Voiture", title: "Achat Ferme ou Consignation", subtitle: "Deux façons de vendre. Donnez-nous les détails de votre voiture et nous vous recommanderons la bonne option." },
    },
    notFound: {
      title: "Page Introuvable",
      description: "La page que vous recherchez n'existe pas ou a été déplacée.",
      button: "Retour à l'Accueil",
    },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionary)["en"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale] ?? dictionary[defaultLocale];
}
