// GROQ Queries for Archon Website

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    contactEmail,
    contactPhone,
    socialLinks,
    statistics,
    globalSettings
  }
`;

export const ORGANISATIONS_QUERY = `
  *[_type == "organisation"] | order(displayOrder asc) {
    _id,
    name,
    relationshipType,
    industry,
    region,
    description,
    website,
    logo,
    featured,
    displayOrder
  }
`;

export const INSIGHTS_QUERY = `
  *[_type == "insight" && published == true] | order(publishedDate desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    author,
    publishedDate,
    featuredImage,
    seoTitle,
    seoDescription,
    tags,
    noIndex
  }
`;

export const INSIGHT_BY_SLUG_QUERY = `
  *[_type == "insight" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    author,
    publishedDate,
    featuredImage,
    seoTitle,
    seoDescription,
    tags,
    noIndex
  }
`;

export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(displayOrder asc) {
    _id,
    name,
    slug,
    description,
    status,
    featuredImage,
    content,
    seoTitle,
    seoDescription,
    displayOrder
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    status,
    featuredImage,
    content,
    seoTitle,
    seoDescription
  }
`;

export const PROGRAMS_QUERY = `
  *[_type == "program"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    label,
    description,
    pathwayEyebrow,
    outcome,
    duration,
    audience,
    stages,
    displayOrder
  }
`;

export const CONSULTING_SERVICES_QUERY = `
  *[_type == "consultingService"] | order(displayOrder asc) {
    _id,
    title,
    shortTitle,
    eyebrow,
    status,
    description,
    services,
    metrics,
    activity,
    displayOrder
  }
`;

export const HOMEPAGE_JOURNEYS_QUERY = `
  *[_type == "homepageJourney"] | order(displayOrder asc) {
    _id,
    title,
    eyebrow,
    description,
    status,
    highlight,
    highlightLabel,
    destination,
    steps,
    displayOrder
  }
`;

export const CAREERS_QUERY = `
  *[_type == "career"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    description,
    department,
    location,
    employmentType,
    publishedDate,
    content,
    seoTitle,
    seoDescription
  }
`;

export const SUCCESS_STORIES_QUERY = `
  *[_type == "successStory"] | order(displayOrder asc) {
    _id,
    title,
    description,
    number,
    featuredImage,
    content,
    displayOrder
  }
`;

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    role,
    bio,
    image,
    socialLinks,
    displayOrder
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id,
    name,
    role,
    company,
    quote,
    image,
    featured,
    displayOrder
  }
`;

export const FAQS_QUERY = `
  *[_type == "faq"] | order(displayOrder asc) {
    _id,
    question,
    answer,
    category,
    displayOrder
  }
`;
