"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameGrid from "@/components/GameGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { HiOutlineArrowRight as ArrowIcon } from "react-icons/hi2";

function CTASection() {
  return (
    <section id="bonus" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0d1e]/80 p-10 shadow-2xl backdrop-blur-xl sm:p-16"
        >
          {/* Background glows */}
          <div
            className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-primary-600/20 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-gold-500/10 blur-[100px]"
            aria-hidden="true"
          />
          {/* Top accent line */}
          <div className="gradient-line absolute inset-x-0 top-0" />

          <div className="relative z-10 mx-auto max-w-xl text-center">
            <span className="glowing-badge glowing-badge-gold mb-6 inline-flex">
              Limited Time Welcome Reward
            </span>
            <h2 className="font-mono text-3xl font-black tracking-wider text-white sm:text-5xl">
              JOIN TODAY &amp; <br />
              <span className="text-gradient-primary">CLAIM ₹500 BONUS</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#94A3B8]/90">
              Create your player profile in under 60 seconds and unlock your welcome credits immediately. Start playing your favorite games.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-10 py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_35px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                Join Free Today
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-10 py-4 text-sm font-bold text-gold-400 transition-all duration-200 hover:bg-gold-400/15 hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
              >
                Sign In
              </Link>
            </div>

            <p className="mt-6 text-[11px] font-mono tracking-widest text-[#94A3B8]/40 uppercase">
              No credit card required &nbsp;·&nbsp; Instant payout verification &nbsp;·&nbsp; 18+ Only
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060813] text-white">
      <Navbar />
      <main>
        <Hero />
        <GameGrid />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
