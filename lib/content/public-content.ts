import { prisma } from "@/lib/db/prisma";

async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function getPublishedGallery() {
  return safeQuery(
    () =>
      prisma.galleryImage.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        include: { folder: true },
      }),
    []
  );
}

export async function getPublishedPlacements() {
  return safeQuery(
    () =>
      prisma.placement.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    []
  );
}

export async function getPublishedTestimonials() {
  return safeQuery(
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    []
  );
}
