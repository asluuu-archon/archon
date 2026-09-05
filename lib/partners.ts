export const partnerLogos = [
  { name: "SWIFT", src: "/partners/swift.svg" },
  { name: "Volvo", src: "/partners/volvo.svg" },
  { name: "BNP Paribas", src: "/partners/bnp-paribas.svg" },
  { name: "ING", src: "/partners/ing.svg" },
  { name: "Proximus", src: "/partners/proximus.svg" },
  { name: "TCS", src: "/partners/tcs.svg" },
  { name: "Mantle", src: "/partners/mantle.svg" },
  { name: "Abasoft", src: "/partners/abasoft.svg" },
] as const;

const partnerNameKeys = new Set(
  partnerLogos.map((partner) => partner.name.toLowerCase().replace(/[^a-z0-9]/g, ""))
);

/** Drop CMS orgs that duplicate the static partner logo strip (e.g. SWIFT). */
export function withoutDuplicatePartners<T extends { name: string }>(items: T[]) {
  return items.filter((item) => {
    const key = item.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    for (const partnerKey of partnerNameKeys) {
      if (key === partnerKey || key.includes(partnerKey) || partnerKey.includes(key)) {
        return false;
      }
    }
    return true;
  });
}
