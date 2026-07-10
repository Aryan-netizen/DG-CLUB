"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineInformationCircle,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineBolt,
} from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import QRCard from "@/components/QRCard";
import type { Transaction } from "@/types";

const UPI_ID:string|undefined= process.env.UPIS_ID;
const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const RECHARGE_HISTORY: Transaction[] = [
  { id: "r1", type: "recharge", amount: 1000, status: "success", description: "Wallet Recharge", date: "2025-01-08" },
  { id: "r2", type: "recharge", amount: 500, status: "success", description: "Wallet Recharge", date: "2025-01-06" },
  { id: "r3", type: "recharge", amount: 2000, status: "pending", description: "Wallet Recharge", date: "2025-01-04" },
  { id: "r4", type: "recharge", amount: 200, status: "success", description: "Wallet Recharge", date: "2025-01-02" },
];

const INSTRUCTIONS = [
  "Open GPay, PhonePe, Paytm, or any UPI app.",
  "Tap Scan QR and point your camera at the code.",
  "Verify the amount and merchant name shows DG Club.",
  "Enter your UPI PIN to confirm the payment.",
  "Your wallet will be credited within 2–5 minutes.",
];

// ── Page Spinner ──────────────────────────────────────────────────────────────

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060813]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-primary-500/20" />
          <div className="absolute inset-0 h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-primary-500" />
        </div>
        <p className="text-[13px] text-[#94A3B8]/60 font-mono tracking-widest uppercase">Loading…</p>
      </div>
    </div>
  );
}

// ── Success Dialog ────────────────────────────────────────────────────────────

function SuccessDialog({ amount, onClose }: { amount: number; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b0d1e] p-8 text-center shadow-2xl"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#94A3B8] transition-all duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            <HiOutlineXMark className="h-4 w-4" />
          </button>

          {/* Success glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent" aria-hidden="true" />
          <div className="gradient-line absolute inset-x-0 top-0" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
            className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 ring-4 ring-emerald-500/20"
          >
            <HiOutlineCheckCircle className="h-9 w-9 text-emerald-400" />
          </motion.div>

          <h2 id="success-title" className="text-xl font-extrabold tracking-tight text-white font-mono uppercase">
            Payment Submitted
          </h2>
          <p className="mt-1.5 font-mono text-3xl font-black text-emerald-400 tabular-nums">
            ₹{amount.toLocaleString("en-IN")}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#94A3B8]">
            Your recharge request has been received. Wallet will be credited
            within 2–5 minutes.
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-[#94A3B8]/50">
            <span className="flex items-center gap-1.5">
              <HiOutlineShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Secure
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <HiOutlineBolt className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              Instant Credit
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            Back to Recharge
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── History Row ───────────────────────────────────────────────────────────────

function HistoryRow({ tx, index }: { tx: Transaction; index: number }) {
  const cfg = {
    success: { text: "text-emerald-400", bg: "bg-emerald-500/[0.08] border-emerald-500/20" },
    pending: { text: "text-yellow-400", bg: "bg-yellow-500/[0.08] border-yellow-500/20" },
    failed: { text: "text-red-400", bg: "bg-red-500/[0.08] border-red-500/20" },
  }[tx.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3 transition-colors duration-150 hover:bg-white/[0.05]"
    >
      <div>
        <p className="text-[13px] font-mono font-bold tabular-nums text-white">
          ₹{tx.amount.toLocaleString("en-IN")}
        </p>
        <p className="mt-0.5 text-[11px] text-[#94A3B8]/70 font-mono">
          {new Date(tx.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <span
        className={`badge border ${cfg.text} ${cfg.bg} capitalize font-mono font-bold text-[10px]`}
      >
        {tx.status}
      </span>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function QRPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [amount, setAmount] = useState(500);
  const [customInput, setCustomInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <PageSpinner />;

  function selectPreset(value: number) {
    setAmount(value);
    setCustomInput("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "");
    setCustomInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) setAmount(num);
  }

  function handleConfirm() {
    if (amount < 10) {
      toast.error("Minimum recharge amount is ₹10");
      return;
    }
    setShowSuccess(true);
    toast.success("Recharge request submitted!");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060813] pb-16">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary-600/08 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold-500/04 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Back to dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-[#94A3B8] transition-all duration-200 hover:border-primary-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-[20px] font-mono font-black tracking-wider text-white uppercase">
                Recharge Wallet
              </h1>
              <p className="text-[12px] text-[#94A3B8]/70">
                Add funds securely via UPI transfer
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 font-mono text-xs font-black text-white shadow-lg">
              DG
            </span>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left — Amount + QR */}
          <div className="space-y-5">

            {/* Amount Selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl"
            >
              <p className="section-label mb-4 font-mono">Select Amount</p>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_AMOUNTS.map((preset) => {
                  const active = amount === preset && customInput === "";
                  return (
                    <motion.button
                      key={preset}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectPreset(preset)}
                      className={`rounded-xl border py-2.5 font-mono text-[13px] font-extrabold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                        active
                          ? "border-primary-500/50 bg-primary-500/12 text-white shadow-md"
                          : "border-white/[0.07] bg-white/[0.025] text-[#94A3B8] hover:border-primary-500/25 hover:text-white"
                      }`}
                    >
                      ₹{preset.toLocaleString("en-IN")}
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom amount input */}
              <div className="mt-4">
                <label
                  htmlFor="custom-amount"
                  className="mb-1.5 block text-[12px] font-medium text-[#94A3B8]/70"
                >
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#94A3B8]/50">
                    ₹
                  </span>
                  <input
                    id="custom-amount"
                    type="text"
                    inputMode="numeric"
                    value={customInput}
                    onChange={handleCustomChange}
                    placeholder="Enter amount"
                    className="premium-input pl-8 pr-4"
                  />
                </div>
              </div>
            </motion.div>

            {/* QR Card component container */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <QRCard upiId={UPI_ID} amount={amount} />
            </motion.div>

            {/* CTA Confirm button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleConfirm}
                className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-4 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                I&apos;ve Completed the Payment
              </motion.button>
              <p className="mt-2.5 text-center text-[11px] text-[#94A3B8]/40 uppercase tracking-widest font-mono">
                Only tap after your UPI payment is confirmed
              </p>
            </motion.div>
          </div>

          {/* Right — Instructions + History */}
          <div className="space-y-5">

            {/* Step-by-step payment guide */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-2">
                <HiOutlineInformationCircle
                  className="h-4 w-4 text-primary-400"
                  aria-hidden="true"
                />
                <p className="section-label font-mono">How to Pay</p>
              </div>
              <ol className="space-y-3.5">
                {INSTRUCTIONS.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: 0.2 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/10 font-mono text-[10px] font-bold text-primary-400"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] leading-relaxed text-[#94A3B8]">
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ol>

              {/* Limit statistics grid */}
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-gold-400/[0.14] bg-gold-400/[0.04] px-4 py-3">
                {[
                  { label: "Min", value: "₹10" },
                  { label: "Max", value: "₹50,000" },
                  { label: "Credit", value: "< 5 min" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400/60">
                      {item.label}
                    </p>
                    <p className="text-[13px] font-mono font-black text-gold-400">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recharge history card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-2">
                <HiOutlineClock
                  className="h-4 w-4 text-primary-400"
                  aria-hidden="true"
                />
                <p className="section-label font-mono">Recharge History</p>
              </div>
              <div className="space-y-2">
                {RECHARGE_HISTORY.map((tx, i) => (
                  <HistoryRow key={tx.id} tx={tx} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessDialog
          amount={amount}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <Toaster theme="dark" position="top-right" richColors closeButton />
    </main>
  );
}
