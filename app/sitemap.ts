import type { MetadataRoute } from "next";

import {
  CAREERS_QUERY,
  INSIGHTS_QUERY,
  PRODUCTS_QUERY,
  PROGRAMS_QUERY,
} from "@/lib/sanity.queries";
import { safeSanityFetch } from "@/lib/sanity.safe";
import type { Career, Insight, Product, Program } from "@/lib/sanity.types";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

function validDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, products, programs, careers] = await Promise.all([
    safeSanityFetch<Insight[]>({
      query: INSIGHTS_QUERY,
      tags: ["insight"],
      defaultValue: [],
    }),
    safeSanityFetch<Product[]>({
      query: PRODUCTS_QUERY,
      tags: ["product"],
      defaultValue: [],
    }),
    safeSanityFetch<Program[]>({
      query: PROGRAMS_QUERY,
      tags: ["program"],
      defaultValue: [],
    }),
    safeSanityFetch<Career[]>({
      query: CAREERS_QUERY,
      tags: ["career"],
      defaultValue: [],
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/programs"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/consulting"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/insights"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/products"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/careers"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return [
    ...staticRoutes,
    ...programs.map((program) => ({
      url: absoluteUrl(`/programs/${program.slug.current}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...insights
      .filter((insight) => !insight.noIndex)
      .map((insight) => ({
        url: absoluteUrl(`/insights/${insight.slug.current}`),
        lastModified: validDate(insight.publishedDate),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug.current}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...careers.map((career) => ({
      url: absoluteUrl(`/careers/${career.slug.current}`),
      lastModified: validDate(career.publishedDate),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
