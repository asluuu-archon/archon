/**
 * Feature flags for optional site surfaces.
 * Archon AI stays off until a trained backend is ready.
 */
export const isArchonAiEnabled =
  process.env.NEXT_PUBLIC_ARCHON_AI_ENABLED === "true";
