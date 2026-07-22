function requiredEnvironmentVariable(
  value: string | undefined,
  name: string
) {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const sanityProjectId =
  requiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "NEXT_PUBLIC_SANITY_PROJECT_ID"
  );

export const sanityDataset =
  requiredEnvironmentVariable(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    "NEXT_PUBLIC_SANITY_DATASET"
  );

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  "2026-07-13";