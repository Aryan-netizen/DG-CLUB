"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060813] px-4">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md text-center p-8 rounded-3xl border border-white/[0.08] bg-[#0b0d1e]/85 backdrop-blur-xl shadow-2xl"
      >
        <div className="gradient-line absolute inset-x-0 top-0" />

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-500/12 ring-4 ring-danger-500/20 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          <HiOutlineExclamationTriangle className="h-8 w-8 text-danger-400" />
        </div>

        <h1 className="font-mono text-2xl font-black tracking-wider text-white uppercase">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-[#94A3B8]/90">
          An unexpected error occurred. Try again or return to the homepage.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-[11px] text-[#94A3B8]/40 uppercase tracking-widest">
            Error Signature: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={unstable_retry}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200 hover:brightness-110"
          >
            Try Again
          </motion.button>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/90 transition-all hover:bg-white/10 hover:text-white"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
