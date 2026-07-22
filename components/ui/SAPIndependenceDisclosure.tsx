import { Info } from "lucide-react";

type SAPIndependenceDisclosureProps = {
  className?: string;
  variant?: "default" | "compact";
};

export default function SAPIndependenceDisclosure({
  className = "",
  variant = "default",
}: SAPIndependenceDisclosureProps) {
  const compact = variant === "compact";

  return (
    <aside
      aria-label="SAP independence disclosure"
      className={`rounded-[1.5rem] border border-white/10 bg-white/[0.025] text-slate-400 ${
        compact ? "px-5 py-4" : "px-6 py-5"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <Info
          aria-hidden="true"
          className={`shrink-0 text-cyan-300 ${compact ? "mt-0.5 h-4 w-4" : "mt-1 h-5 w-5"}`}
        />

        <p
          className={`leading-6 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          <span className="font-semibold text-slate-200">Independent organisation.</span>{" "}
          Archon is not affiliated with or endorsed by SAP SE and does not offer
          official SAP certification or partner accreditation. SAP and other SAP
          products and services mentioned herein are trademarks or registered
          trademarks of SAP SE in Germany and other countries.
        </p>
      </div>
    </aside>
  );
}
