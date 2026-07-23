// Sanity CMS Type Definitions for Archon Website

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  statistics?: {
    label: string;
    value: string;
  }[];
  globalSettings?: Record<string, any>;
}

export interface Organisation {
  _id: string;
  _type: "organisation";
  name: string;
  relationshipType: string;
  industry?: string;
  region?: string;
  description?: string;
  website?: string;
  logo?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  featured?: boolean;
  displayOrder: number;
}

export interface Insight {
  _id: string;
  _type: "insight";
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  body?: any; // Portable Text
  category: string;
  author: string;
  publishedDate: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  noIndex?: boolean;
  published: boolean;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  description: string;
  status: "In development" | "Planned" | "Live";
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  content?: any; // Portable Text
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
}

export interface Program {
  _id: string;
  _type: "program";
  title: string;
  slug: {
    current: string;
  };
  label: string;
  description: string;
  pathwayEyebrow: string;
  outcome: string;
  duration: string;
  audience: string;
  stages: {
    title: string;
    text: string;
  }[];
  displayOrder: number;
}

export interface ConsultingService {
  _id: string;
  _type: "consultingService";
  title: string;
  shortTitle: string;
  eyebrow: string;
  status: string;
  description: string;
  services: string[];
  metrics: {
    value: string;
    label: string;
  }[];
  activity: string[];
  displayOrder: number;
}

export interface HomepageJourney {
  _id: string;
  _type: "homepageJourney";
  title: string;
  eyebrow: string;
  description: string;
  status: string;
  highlight: string;
  highlightLabel: string;
  destination: string;
  steps: string[];
  displayOrder: number;
}

export interface Career {
  _id: string;
  _type: "career";
  title: string;
  slug: {
    current: string;
  };
  description: string;
  department: string;
  location: string;
  employmentType: string;
  publishedDate: string;
  content?: any; // Portable Text
  seoTitle?: string;
  seoDescription?: string;
}

export interface SuccessStory {
  _id: string;
  _type: "successStory";
  title: string;
  description: string;
  number: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  content?: any; // Portable Text
  displayOrder: number;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  bio?: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  displayOrder: number;
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  featured?: boolean;
  displayOrder: number;
}

export interface FAQ {
  _id: string;
  _type: "faq";
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}
