# Archon Visual QA Notes

## Desktop Homepage Preview

**Viewport:** 1440 × 1100, local production build, Chromium headless.

The first immediate screenshot captured only the cinematic background and fixed navigation because the homepage intro animation had not completed. This is expected for a transition-heavy experience and should not be evaluated as a missing-content defect.

A delayed capture after the intro completed showed the hero rendering correctly. The visual hierarchy is strong and coherent: the Archon mark and desktop navigation are visible, the central **“Dream. Build. Impact.”** positioning is legible and prominent, proof signals for learning, consulting, products, and global presence surround the core message, and the two lead actions are visible above the fold. The dark navy/cyan visual system remains consistent and the bottom chapter navigation is present.

**Finding:** No desktop layout regression was observed in the initial hero region after the CMS and type-safety changes. Further QA should validate mobile rendering, interactive section selection, enquiry submission behavior, and the CMS Studio authoring flow.

## Technical Validation Completed

The targeted CMS source set passes ESLint. A full production build also succeeds, including all statically generated and dynamic content routes.

## Mobile Homepage Preview

**Viewport:** 390 × 844, local production build, Chromium headless.

At a 10-second virtual-time capture, the mobile experience was still displaying the intentional Archon opening/splash sequence. At a 25-second capture, the primary mobile hero had rendered with the logo, menu trigger, ecosystem pill, headline, descriptive copy, CTAs, and first proof panel visible.

**Finding requiring correction:** The longer mobile capture also shows apparent overlapping/transient duplicate headline and body-copy layers during the cinematic animation. This may be a timing artifact of the headless capture, but it must be treated as a responsive animation-quality defect until tested and corrected. The next QA action is to inspect the hero animation and mobile motion logic, then ensure only one readable text layer is present at every point in the transition.

## Mobile Transition Retest

A true elapsed-time capture was taken through Chrome DevTools Protocol after the loader refinement, rather than relying on virtual-time screenshots. At seven seconds, the mobile hero had fully rendered without any duplicate headline layer or lingering splash overlay. The brand header, menu trigger, ecosystem status badge, headline, body copy, CTA pair, AI orb, and first proof panel are all visible and remain within the viewport width.

The previous apparent overlap was therefore a transition-capture artifact rather than a persistent page defect. The refined loader now uses a shorter sequence, clears its own content before the underlying page reveal, and respects reduced-motion preferences. No mobile clipping or horizontal overflow was observed in the real elapsed-time capture.

## Live Deployment and CMS Data Validation

**Protected production URL:** https://archon-bay.vercel.app/

A no-cache extraction of the protected Vercel deployment confirmed that the public homepage resolves successfully and renders the CMS-backed learning, consulting, and impact sections. The live page showed the corrected Program cards, the SAP Consulting capability and its string-based services/activity stream, and the Impact journey progression with plain-text steps.

The initial CMS migration produced ten malformed duplicate records whose nested object fields did not match the frontend contracts. With explicit approval, those ten records were removed through a guarded transaction that required exactly ten matching records before deletion. A final query confirmed the remaining clean inventory: **4 Programs, 6 Consulting Services, and 3 Homepage Journeys**. Every sampled `stages[0].text`, `services[0]`, `activity[0]`, and `steps[0]` value matched the frontend's expected primitive or typed-object shape.

**Remaining production configuration dependency:** the enquiry endpoint is implemented and shows direct WhatsApp/phone fallbacks, but transactional delivery requires `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `LEAD_EMAIL_TO` to be configured in the Vercel project. A live successful enquiry test is intentionally deferred until those credentials are installed, because it would otherwise transmit an actual test enquiry.
