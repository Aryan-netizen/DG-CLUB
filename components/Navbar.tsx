"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Games", href: "#games" },
  { label: "Bonus", href: "#bonus" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#060813]/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 font-mono text-[14px] font-black text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-200 group-hover:scale-105">
            DG
          </span>
          <span className="font-mono text-lg font-bold tracking-wider text-white">
            DG <span className="text-primary-400 group-hover:text-primary-300 transition-colors">CLUB</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1.5 md:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-[#94A3B8] transition-all duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:from-primary-500 hover:to-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            Register Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((p) => !p)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineXMark className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="bars"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineBars3 className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#060813] md:hidden"
          >
            <ul className="flex flex-col px-4 pt-2 pb-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex rounded-xl px-4 py-3 text-sm font-medium text-[#94A3B8] transition-all hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-2.5 border-t border-white/[0.06] px-4 py-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-center text-sm font-bold text-white shadow-lg"
              >
                Register Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
