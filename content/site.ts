import { routes } from "@/lib/routes";

export const siteConfig = {
  name: "NASI Minneapolis",
  shortName: "NASI",
  description:
    "Indonesian food and gathering experiences in Minneapolis through Bancakan, Rantang, and Warung.",
  tagline: "Indonesian Food for Minneapolis",
  landingIntro:
    "Food as a gateway to belonging. Shared meals, weekly drops, and gathering spaces built with care.",
  social: {
    instagram: "https://instagram.com/nasi.mpls",
    founderInstagram: "https://instagram.com/ra.dzk",
    email: "nasimpls.id@gmail.com",
    phone: "+1 (507) 649-8423",
    phoneHref: "tel:+15076498423",
    emailHref: "mailto:nasimpls.id@gmail.com"
  },
  nav: [
    { href: routes.bancakan, label: "Bancakan" },
    { href: routes.rantang, label: "Rantang" },
    { href: routes.warung, label: "Warung" },
    { href: routes.story, label: "Story" },
    { href: routes.contact, label: "Contact" }
  ]
} as const;
