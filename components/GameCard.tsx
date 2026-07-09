"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";

export interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  badge?: string;
  index?: number;
}

export default function GameCard({
  title,
  description,
  icon,
  gradient,
  badge,
  index = 0,
}: GameCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0d1e]/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Background radial gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]`}
        aria-hidden="true"
      />

      {/* Subtle top corner ambient flare */}
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Badge */}
          {badge && (
            <span className="glowing-badge glowing-badge-gold mb-4 block w-fit">
              {badge}
            </span>
          )}

          {/* Icon frame */}
          <div
            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105`}
          >
            <span className="text-[20px] text-white" aria-hidden="true">
              {icon}
            </span>
          </div>

          <h3 className="font-mono text-base font-extrabold tracking-wider text-white">
            {title.toUpperCase()}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#94A3B8]/95">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-primary-400 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
          Play Now
          <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.article>
  );
}
