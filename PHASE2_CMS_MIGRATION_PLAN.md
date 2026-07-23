# Archon Phase 2: CMS Migration and Content Architecture

## Objective
Migrate the static, hardcoded arrays powering the Archon homepage into structured, manageable Sanity CMS documents. This allows the Archon team to update programs, consulting services, and success stories without touching code, while preserving the premium cinematic experience.

## Missing Sanity Schemas to Build
The active Sanity studio (`studio/archon-website-cms/schemaTypes/index.ts`) is missing schemas for the core business areas. We must build and register:

1. **`program`**: To replace the `programs` array in `Data/home.ts` and `pathwayData` in `Programs.tsx`.
   - Fields: title, slug, label, description, outcome, duration, audience, and a `stages` array (title, text).
2. **`consultingService`**: To replace the `capabilities` array in `Consulting.tsx`.
   - Fields: title, shortTitle, eyebrow, status, description, `services` array (strings), `metrics` array (value, label), and `activity` array (strings).
3. **`homepageJourney`** (Optional/Refinement): To replace `successStories` and `journeys` in `SuccessStories.tsx`.
   - The existing `successStory` schema focuses on individual learners. The homepage needs a higher-level narrative block (e.g., "Learner Transformation", "Global Expansion") with progression steps.

## Implementation Steps

### 1. Build the Schemas
- Create `studio/archon-website-cms/schemaTypes/program.ts`
- Create `studio/archon-website-cms/schemaTypes/consultingService.ts`
- Create `studio/archon-website-cms/schemaTypes/journey.ts`
- Register them in `schemaTypes/index.ts`.

### 2. Define the Queries and Types
- Add GROQ queries to `lib/sanity.queries.ts` (and optionally `sanity/queries.ts` if maintaining the dual setup).
- Add TypeScript interfaces to `lib/sanity.types.ts`.

### 3. Connect the Homepage Components
- Refactor `components/scenes/Programs.tsx` to accept data via props instead of importing from `Data/home.ts`.
- Refactor `components/scenes/Consulting.tsx` to accept data via props instead of using the hardcoded `capabilities` array.
- Refactor `components/scenes/SuccessStories.tsx` similarly.
- Update `app/page.tsx` to fetch these collections server-side and pass them down to the scene components, matching the pattern already established for `TrustedEcosystem`.

## Validation
- Ensure the cinematic layout, animations, and icons map correctly to the dynamic data.
- Confirm the Sanity Studio builds and allows content entry.
