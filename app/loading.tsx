export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060810]">
      <div className="flex flex-col items-center gap-5">
        {/* Logo mark */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-base font-black text-white shadow-xl shadow-[#7C3AED]/30">
          DG
        </div>
        {/* Spinner */}
        <div className="relative">
          <div className="h-6 w-6 rounded-full border-2 border-[#7C3AED]/20" />
          <div className="absolute inset-0 h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#7C3AED]" />
        </div>
        <p className="text-[13px] text-[#94A3B8]/60">Loading…</p>
      </div>
    </div>
  );
}
