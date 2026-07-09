"use client";

import { motion } from "framer-motion";
import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineGift,
} from "react-icons/hi2";

const features = [
  {
    title: "Fast Withdrawals",
    description:
      "Winnings credited to your bank within minutes — no delays, no excuses.",
    icon: HiOutlineBolt,
    gradient: "from-gold-500 to-gold-600",
    accent: "rgba(245,158,11,0.08)",
    shadow: "rgba(245,158,11,0.2)",
  },
  {
    title: "Secure Payments",
    description:
      "Bank-grade 256-bit encryption protects every transaction you make.",
    icon: HiOutlineShieldCheck,
    gradient: "from-primary-500 to-primary-600",
    accent: "rgba(139,92,246,0.08)",
    shadow: "rgba(139,92,246,0.2)",
  },
  {
    title: "24×7 Support",
    description:
      "Our expert team is available around the clock to help you win more.",
    icon: HiOutlineChatBubbleLeftRight,
    gradient: "from-electric-500 to-electric-600",
    accent: "rgba(59,130,246,0.08)",
    shadow: "rgba(59,130,246,0.2)",
  },
  {
    title: "Daily Rewards",
    description:
      "Log in every day to unlock exclusive bonuses, spins, and cashback.",
    icon: HiOutlineGift,
    gradient: "from-danger-500 to-danger-600",
    accent: "rgba(244,63,94,0.08)",
    shadow: "rgba(244,63,94,0.2)",
  },
];

export default function Features() {
  return (
    <section id="support" className="relative py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(59,130,246,0.035) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="glowing-badge glowing-badge-electric mb-4">Features</span>
          <h2 className="font-mono text-3xl font-black tracking-wider text-white sm:text-4xl">
            ENGINEERED FOR WINNERS
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#94A3B8]">
            Everything you need for a premium, secure and rewarding gaming experience.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0d1e]/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Hover glow */}
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: feature.accent }}
                aria-hidden="true"
              />

              <div className="relative">
                {/* Icon with custom shadow */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  style={{ boxShadow: `0 4px 15px ${feature.shadow}` }}
                >
                  <feature.icon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-mono text-sm font-extrabold tracking-wider text-white">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#94A3B8]/90">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
