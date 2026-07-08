export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 text-sm text-slate-400 md:flex-row">
        <div>
          <div className="text-lg font-bold tracking-widest text-white">
            ARCHON
          </div>
          <p className="mt-2">Dream without limits. Build with purpose.</p>
        </div>

        <div className="flex flex-wrap gap-5">
          <span>Learning</span>
          <span>Consulting</span>
          <span>Products</span>
          <span>Success Stories</span>
          <span>Company</span>
        </div>
      </div>
    </footer>
  );
}