import Link from "next/link";
import type { Metadata } from "next";
import { HiOutlineFaceFrown as FrownIcon } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060813] px-4">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center p-8 rounded-3xl border border-white/[0.08] bg-[#0b0d1e]/85 backdrop-blur-xl shadow-2xl">
        <div className="gradient-line absolute inset-x-0 top-0" />

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/12 ring-4 ring-primary-500/20 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
          <FrownIcon className="h-8 w-8 text-primary-400" />
        </div>

        <p className="font-mono text-sm font-black uppercase tracking-widest text-primary-400">
          Error 404
        </p>
        <h1 className="mt-2 font-mono text-3xl font-black tracking-wider text-white uppercase">
          PAGE NOT FOUND
        </h1>
        <p className="mt-3 text-sm text-[#94A3B8]/90">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200 hover:brightness-110"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
