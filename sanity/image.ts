import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

import { sanityClient } from "@/sanity/client";

const builder = imageUrlBuilder(sanityClient);

export function urlForSanityImage(source: SanityImageSource) {
  return builder.image(source);
}
