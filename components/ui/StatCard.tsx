type StatCardProps = {
  number: string;
  label: string;
};

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-md">
      <div className="text-5xl font-bold text-cyan-300">{number}</div>
      <div className="mt-4 text-lg font-semibold text-white">{label}</div>
    </div>
  );
}