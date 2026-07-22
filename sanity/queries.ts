import { defineQuery } from "next-sanity";

export const organisationsQuery = defineQuery(`
  *[
    _type == "organisation"
  ]
  | order(
      coalesce(displayOrder, 100) asc,
      name asc
    ) {
      _id,
      name,
      "slug": slug.current,
      relationshipType,
      industry,
      region,
      description,
      website,
      featured,
      displayOrder,
      logo,
      "logoUrl": logo.asset->url
    }
`);

export const siteSettingsQuery = defineQuery(`
  *[
    _type == "siteSettings"
  ][0] {
    _id,
    companyName,
    tagline,
    learnersCount,
    placementsCount,
    globalLocationsCount,
    foundedYear,
    primaryEmail,
    primaryPhone
  }
`);

export const latestInsightsQuery = defineQuery(`
  *[
    _type == "insight" &&
    defined(slug.current) &&
    !coalesce(noIndex, false)
  ]
  | order(
      coalesce(featured, false) desc,
      publishedAt desc
    )[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      authorName,
      publishedAt,
      featured,
      tags,
      featuredImage,
      "imageUrl": featuredImage.asset->url,
      "imageAlt": featuredImage.alt
    }
`);

export const allInsightsQuery = defineQuery(`
  *[
    _type == "insight" &&
    defined(slug.current) &&
    !coalesce(noIndex, false)
  ]
  | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      authorName,
      publishedAt,
      featured,
      tags,
      featuredImage,
      "imageUrl": featuredImage.asset->url,
      "imageAlt": featuredImage.alt
    }
`);

export const insightBySlugQuery = defineQuery(`
  *[
    _type == "insight" &&
    slug.current == $slug &&
    !coalesce(noIndex, false)
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    authorName,
    publishedAt,
    featured,
    tags,
    body,
    seoTitle,
    seoDescription,
    featuredImage,
    "imageUrl": featuredImage.asset->url,
    "imageAlt": featuredImage.alt
  }
`);