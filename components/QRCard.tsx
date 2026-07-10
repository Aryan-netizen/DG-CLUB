"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClipboardDocument,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineBolt,
} from "react-icons/hi2";
import { useState } from "react";

interface QRCardProps {
  upiId: any;
  amount: number;
  name?: string;
}

export default function QRCard({
  upiId,
  amount,
  name = "DG Club",
}: QRCardProps) {
  const [copied, setCopied] = useState(false);

  const upiUrl =
    "upi://pay?pa=" +
    upiId +
    "&pn=" +
    encodeURIComponent(name) +
    "&am=" +
    String(amount) +
    "&cu=INR";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0f1a]/80 p-6 text-center backdrop-blur-xl shadow-2xl"
    >
      {/* Top gradient line */}
      <div className="gradient-line absolute inset-x-0 top-0" />

      {/* Labels */}
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]/60">
        Scan & Pay
      </p>
      <p className="mt-1.5 text-3xl font-extrabold tracking-tight text-white">
        ₹{amount.toLocaleString("en-IN")}
      </p>

      {/* QR code container */}
      <div className="mx-auto mt-6 w-fit">
        <div className="rounded-2xl bg-white p-4 shadow-xl shadow-[#7C3AED]/15 ring-4 ring-white/5">
          <QRCodeSVG
            value={upiUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#060810"
            level="H"
          />
        </div>
      </div>

      {/* UPI ID copy row */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <div className="text-left">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]/50">
            UPI ID
          </p>
          <p className="mt-0.5 text-[13px] font-medium text-[#94A3B8]">{upiId}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy UPI ID"
          className="ml-2 shrink-0 rounded-lg p-1.5 text-[#A78BFA] transition-all duration-200 hover:bg-[#7C3AED]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-400" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineClipboardDocument className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Trust badges */}
      <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#94A3B8]/50">
        <span className="flex items-center gap-1">
          <HiOutlineShieldCheck className="h-3.5 w-3.5 text-emerald-500/70" aria-hidden="true" />
          Secure
        </span>
        <span className="h-3 w-px bg-white/10" />
        <span className="flex items-center gap-1">
          <HiOutlineBolt className="h-3.5 w-3.5 text-[#FACC15]/70" aria-hidden="true" />
          Instant Credit
        </span>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-[#94A3B8]/40">
        Open any UPI app · Scan QR · Enter PIN to confirm
      </p>
    </motion.div>
  );
}
