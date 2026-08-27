import { archonContact } from "@/lib/contact";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.archonsolution.in";

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export const siteConfig = {
  name: archonContact.companyName,
  url: siteUrl,
  description:
    "Archon Solutions is a global technology ecosystem for SAP learning, enterprise consulting, software engineering, AI and outcome-driven career growth.",
  locale: "en_IN",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export const organizationJsonLd = {
  "@type": ["Organization", "EducationalOrganization"],
  "@id": `${siteUrl}/#organization`,
  name: archonContact.companyName,
  legalName: archonContact.companyName,
  url: siteUrl,
  description: siteConfig.description,
  foundingDate: "2013",
  email: archonContact.email,
  telephone: archonContact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "AS Avenue, Old Cheranalllur Road, Bypass Junction, Ponekkara, Edappally",
    addressLocality: "Ernakulam",
    addressRegion: "Kerala",
    postalCode: "682024",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: archonContact.phone,
      email: archonContact.email,
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
  sameAs: Object.values(archonContact.social),
  knowsAbout: [
    "SAP",
    "ERP",
    "Enterprise consulting",
    "Software engineering",
    "Artificial intelligence",
    "Cloud and DevOps",
    "Career training",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: archonContact.companyName,
  description: siteConfig.description,
  inLanguage: "en-IN",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};
