import { readFileSync } from "node:fs";

const reportPath = process.argv[2];
if (!reportPath) throw new Error("Usage: node audit/inspect-lighthouse.mjs <report-path>");

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const printAudit = (id, label) => {
  const audit = report.audits[id];
  console.log(`\n--- ${label} ---`);
  console.log(audit?.displayValue ?? "No display value");
  for (const item of audit?.details?.items?.slice(0, 20) ?? []) {
    console.log(JSON.stringify(item));
  }
};

printAudit("mainthread-work-breakdown", "Main-thread work");
printAudit("bootup-time", "JavaScript execution time");
printAudit("long-tasks", "Long tasks");
printAudit("third-party-summary", "Third-party impact");
