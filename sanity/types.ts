import type { PortableTextBlock } from "@portabletext/react";

export type SanityImageReference = {
  _type: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  alt?: string;
};

export type Organisation = {
  _id: string;
  name: string;
  slug?: string;
  relationshipType:
    | "selected-client"
    | "project-experience"
    | "academic"
    | "technology-delivery"
    | "technology-used";
  industry?: string;
  region?: string;
  description?: string;
  website?: string;
  featured?: boolean;
  displayOrder?: number;
  logo?: SanityImageReference;
  logoUrl?: string;
};

export type SiteSettings = {
  _id: string;
  companyName?: string;
  tagline?: string;
  learnersCount?: number;
  placementsCount?: number;
  globalLocationsCount?: number;
  foundedYear?: number;
  primaryEmail?: string;
  primaryPhone?: string;
};

export type Insight = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  authorName?: string;
  publishedAt: string;
  featured?: boolean;
  featuredImage?: SanityImageReference;
  imageUrl?: string;
  imageAlt?: string;
  tags?: string[];
};

export type InsightArticle = Insight & {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};