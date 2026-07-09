"use client";

import { motion } from "framer-motion";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "electric" | "gold" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-primary-500/30",
  secondary:
    "border border-white/10 bg-white/5 text-white/90 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:text-white",
  electric:
    "bg-gradient-to-r from-electric-600 to-electric-700 hover:from-electric-500 hover:to-electric-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-electric-500/30",
  gold:
    "bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-bg-base shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] border border-gold-400/40 text-black font-extrabold",
  danger:
    "border border-danger-500/30 bg-danger-500/10 text-danger-400 hover:bg-danger-500/20 hover:border-danger-500/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs rounded-lg font-medium",
  md: "px-6 py-3 text-sm rounded-xl font-semibold",
  lg: "px-8 py-4 text-base rounded-2xl font-bold tracking-wide",
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type="button"
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </motion.button>
  );
}
