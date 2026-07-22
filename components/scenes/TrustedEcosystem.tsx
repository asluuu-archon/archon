import TrustedEcosystemClient from "@/components/scenes/TrustedEcosystemClient";
import { sanityClient } from "@/sanity/client";
import {
  organisationsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import type {
  Organisation,
  SiteSettings,
} from "@/sanity/types";

export default async function TrustedEcosystem() {
  let organisations: Organisation[] = [];
  let settings: SiteSettings | null = null;

  try {
    [organisations, settings] = await Promise.all([
      sanityClient.fetch<Organisation[]>(
        organisationsQuery,
        {},
        {
          next: {
            revalidate: 60,
            tags: ["organisations"],
          },
        }
      ),

      sanityClient.fetch<SiteSettings | null>(
        siteSettingsQuery,
        {},
        {
          next: {
            revalidate: 60,
            tags: ["site-settings"],
          },
        }
      ),
    ]);
  } catch (error) {
    console.error(
      "Unable to load Trusted Ecosystem CMS content:",
      error
    );
  }

  return (
    <TrustedEcosystemClient
      organisations={organisations}
      settings={settings}
    />
  );
}