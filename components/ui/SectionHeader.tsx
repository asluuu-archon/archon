type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-16 ${isCenter ? "text-center" : ""}`}>
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
        {eyebrow}
      </p>

      <h2
        className={`whitespace-pre-line text-balance text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl ${
          isCenter ? "mx-auto max-w-5xl" : "max-w-5xl"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-8 max-w-2xl text-lg leading-8 text-slate-300 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}