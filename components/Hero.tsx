"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineUsers,
  HiOutlineTrophy,
  HiOutlineBolt,
  HiOutlineGift,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const stats = [
  { label: "Active Players", value: "1M+", icon: HiOutlineUsers, color: "text-primary-400" },
  { label: "Daily Payouts", value: "₹50L+", icon: HiOutlineTrophy, color: "text-gold-400" },
  { label: "Withdrawals", value: "< 5 min", icon: HiOutlineBolt, color: "text-electric-400" },
];

const trustBadges = [
  { icon: HiOutlineShieldCheck, label: "256-bit SSL Secure" },
  { icon: HiOutlineBolt, label: "Instant Bank Credit" },
  { icon: HiOutlineGift, label: "Daily Bonus Rewards" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const cardIn = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32"
    >
      {/* Visual Background Structure */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#060813]" />

        {/* Ambient colored glowing highlights */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] -top-[10%] h-[750px] w-[750px] rounded-full bg-primary-600 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[10%] top-[20%] h-[650px] w-[650px] rounded-full bg-electric-500 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-gold-500 blur-[120px]"
        />

        {/* Ambient Grid overlay */}
        <div
          className="ambient-grid-overlay absolute inset-0 opacity-100"
          style={{
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 90%)"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Headline and Left Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Trust Pill */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="glowing-badge glowing-badge-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-400" />
                Trusted by 1M+ Players in India
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-mono text-[2.75rem] font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4rem]"
            >
              INDIA&apos;S <br />
              <span className="text-gradient-primary">#1 PREMIUM</span> <br />
              GAMING ARENA
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#94A3B8]"
            >
              Play Lottery, Aviator, Slots and live Sports on the sub-continent&apos;s
              most secure platform. Claim your starter package now.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 text-[15px] font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                Claim ₹500 Bonus
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-[15px] font-semibold text-white/95 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Feature lists */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-white/[0.06] pt-6"
            >
              {trustBadges.map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]/80">
                  <b.icon className="h-4 w-4 text-electric-400" aria-hidden="true" />
                  {b.label}
                </span>
              ))}
            </motion.div>

            {/* Fast Stats Row */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-8"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <s.icon className={`h-5 w-5 ${s.color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[16px] font-extrabold tracking-wide text-white">{s.value}</p>
                    <p className="text-[11px] font-medium text-[#94A3B8]/60">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — Bonus card */}
          <motion.div
            variants={cardIn}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 relative"
          >
            {/* Outer card aura glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/20 to-gold-400/10 blur-[30px]" />

            <div className="premium-card relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0d1e]/70 p-8 shadow-2xl backdrop-blur-xl">
              {/* Inner glowing elements */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/[0.08] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-500/[0.12] blur-3xl" />

              <div className="relative">
                {/* Gift tag badge */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-gold-400 shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                  <HiOutlineGift className="h-7 w-7 text-white" aria-hidden="true" />
                </div>

                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#94A3B8]/60">
                  Welcome Reward Package
                </p>
                <p className="mt-2.5 font-mono text-[2.75rem] font-black leading-none text-white">
                  ₹500 <span className="text-gradient-gold text-[1.75rem] font-bold">BONUS</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                  Sign up a free account in under 60 seconds. Get immediate balance credits to play Aviator and Slots instantly.
                </p>

                {/* Social Proof */}
                <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="flex -space-x-2">
                    {["A", "R", "S", "K", "M"].map((char) => (
                      <span
                        key={char}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b0d1e] bg-gradient-to-br from-primary-600 to-electric-600 text-[11px] font-mono font-black text-white"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13px] font-medium text-[#94A3B8]">
                    <span className="font-extrabold text-white">2,400+</span> players joined today
                  </p>
                </div>

                {/* Main Card CTA Button */}
                <Link
                  href="/register"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-4 text-[14px] font-bold text-white shadow-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-none"
                >
                  Unlock Welcome Pack
                  <HiOutlineArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-4 text-center text-[10px] text-[#94A3B8]/40 uppercase tracking-widest font-mono">
                  Safe & Secure • 18+ Play Responsibly
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
