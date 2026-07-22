import { sanityFetch } from "./sanity.client";

/**
 * Safe wrapper for Sanity queries that returns empty array on error
 * This allows the site to build and render even if CMS is unavailable
 */
export async function safeSanityFetch<T = any>({
  query,
  params = {},
  tags,
  defaultValue,
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
  defaultValue: T;
}): Promise<T> {
  try {
    const result = await sanityFetch<T>({
      query,
      params,
      tags,
    });
    return result;
  } catch (error) {
    console.warn("Sanity fetch failed, returning default value:", {
      error: error instanceof Error ? error.message : String(error),
      query: query.substring(0, 100) + "...",
    });
    return defaultValue;
  }
}
