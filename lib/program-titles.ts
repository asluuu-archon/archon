const PROGRAM_TITLE_OVERRIDES: Record<string, string> = {
  "SAP Career Programs": "ERP Career Programs",
  "SAP Career Programmes": "ERP Career Programs",
  "Software Development": "AI Software Development",
};

/** Display renames when Sanity still has the older programme titles. */
export function displayProgramTitle(title: string) {
  return PROGRAM_TITLE_OVERRIDES[title] ?? title;
}
