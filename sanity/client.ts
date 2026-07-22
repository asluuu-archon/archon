import { createClient } from "next-sanity";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/env";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,

  /**
   * Published public content can use Sanity's CDN.
   * This gives fast responses while still allowing
   * Next.js revalidation.
   */
  useCdn: true,

  /**
   * We are initially reading published content only.
   */
  perspective: "published",
});