# Homepage Performance Remediation Notes

## Baseline Audit

A local production Lighthouse audit of the homepage reported the following baseline before remediation:

| Category or metric | Baseline result |
|---|---:|
| Performance | 12 / 100 |
| Accessibility | 96 / 100 |
| Best Practices | 96 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 1.4 s |
| Largest Contentful Paint | 6.3 s |
| Total Blocking Time | 60,470 ms |
| Cumulative Layout Shift | 1.451 |

The extremely poor performance score was attributable to a stack of always-mounted, continuous homepage effects: a blocking 2.2-second loader, multiple full-screen Framer Motion background layers, 65 animated particles, moving data streams, a global custom cursor, a dense animated hero, and a fully mounted AI/chat-and-tour toolset even before visitor interaction.

## Remediation Applied

The homepage now renders its brand narrative, navigation, semantic content and conversion paths without these initial-load costs. The expensive full-screen atmosphere is a static CSS composition. The hero has been rebuilt as a static, premium visual hierarchy without particle fields, continuous animation loops or animated counters. Optional AI, tour, command, cursor and scroll-interface features are dynamically loaded only after a visitor actively engages with the page.

A new Lighthouse measurement is required after the updated production build is started.
