import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import { HiOutlineShieldCheck as ShieldIcon } from "react-icons/hi2";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Games", href: "#games" },
  { label: "Bonus", href: "#bonus" },
  { label: "Support", href: "#support" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Responsible Gaming", href: "#" },
];

const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "X (Twitter)" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTelegram, href: "#", label: "Telegram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#060813]">
      {/* Top separator line */}
      <div className="gradient-line absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 font-mono text-xs font-black text-white shadow-lg shadow-primary-500/30">
                DG
              </span>
              <span className="font-mono text-sm font-bold tracking-wider text-white">
                DG <span className="text-primary-400">CLUB</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-[#94A3B8]/80">
              India&apos;s premier gaming platform. Play smarter, win bigger,
              and enjoy the ultimate gaming experience.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8]/70 transition-all duration-200 hover:border-primary-500/30 hover:bg-primary-500/10 hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
              Quick Links
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#94A3B8] transition-colors duration-150 hover:text-white focus-visible:outline-none rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
              Legal Info
            </p>
            <ul className="space-y-2.5" role="list">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[#94A3B8] transition-colors duration-150 hover:text-white focus-visible:outline-none rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Safety / Responsible gaming */}
          <div>
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
              Safe Play
            </p>
            <p className="text-[13px] leading-relaxed text-[#94A3B8]/80">
              Play responsibly. Set deposit limits and take breaks. Gaming
              should be entertainment.
            </p>
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-gold-500/20 bg-gold-500/[0.04] px-4 py-3">
              <ShieldIcon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-bold text-gold-400">18+ Only Play</p>
                <p className="text-[10px] text-[#94A3B8]/60 uppercase tracking-widest font-mono">Verified Safe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[13px] text-[#94A3B8]/50">
            © {new Date().getFullYear()} DG Club. All rights reserved.
          </p>
          <p className="text-[11px] text-[#94A3B8]/40">
            DG Club is a simulated demonstration gaming platform. Play responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
