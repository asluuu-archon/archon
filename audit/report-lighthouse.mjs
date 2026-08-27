import { readFileSync } from "node:fs";

const reportPath = process.argv[2];
if (!reportPath) {
  throw new Error("Usage: node audit/report-lighthouse.mjs <report-path>");
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
for (const category of Object.values(report.categories)) {
  console.log(`${category.title}: ${Math.round(category.score * 100)}`);
}

for (const [label, id] of [
  ["FCP", "first-contentful-paint"],
  ["LCP", "largest-contentful-paint"],
  ["TBT", "total-blocking-time"],
  ["CLS", "cumulative-layout-shift"],
]) {
  console.log(`${label}: ${report.audits[id]?.displayValue ?? "n/a"}`);
}
