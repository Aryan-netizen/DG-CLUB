"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineExclamationCircle,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { auth } from "@/lib/firebase";

type AuthMode = "login" | "register";
interface AuthFormProps {
  mode: AuthMode;
}
interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return messages[code] ?? "An error occurred. Please try again.";
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: React.ReactNode;
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  icon: Icon,
  suffix,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-[#94A3B8]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]/50">
          <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white/[0.04] py-3 pl-10 ${suffix ? "pr-10" : "pr-4"} text-[14px] text-white outline-none transition-all duration-150 focus:ring-1 ${
            error
              ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20"
              : "border-white/[0.08] focus:border-[#7C3AED]/50 focus:ring-[#7C3AED]/15"
          }`}
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "#f1f5f9",
          }}
        />
        <style>{`
          #${id}::placeholder { color: rgba(148,163,184,0.35); }
        `}</style>
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[12px] text-red-400"
          >
            <HiOutlineExclamationCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const isLogin = mode === "login";

  function validateForm(): boolean {
    const e: FormErrors = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (!isLogin && password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!isLogin && password !== confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created! Welcome to DG Club.");
        router.push("/dashboard");
      }
    } catch (error) {
      const fe = error as { code?: string };
      const message = fe.code
        ? getAuthErrorMessage(fe.code)
        : "An error occurred. Please try again.";
      setErrors({ general: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const eyeButton = (show: boolean, toggle: () => void, label: string) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="text-[#94A3B8]/50 transition-colors duration-150 hover:text-[#94A3B8] focus-visible:outline-none"
    >
      {show ? (
        <HiOutlineEyeSlash className="h-4 w-4" />
      ) : (
        <HiOutlineEye className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[420px]"
    >
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-sm font-black text-white shadow-lg shadow-[#7C3AED]/35">
            DG
          </span>
          <span className="text-xl font-bold text-white">
            DG <span className="text-[#A78BFA]">Club</span>
          </span>
        </Link>
        <h1 className="mt-6 text-[26px] font-extrabold tracking-tight text-white">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-2 text-[14px] text-[#94A3B8]">
          {isLogin
            ? "Sign in to access your dashboard"
            : "Join India\u2019s #1 gaming platform — it\u2019s free"}
        </p>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0f1a]/80 shadow-2xl backdrop-blur-2xl">
        {/* Top accent line */}
        <div className="gradient-line" />

        <div className="p-7 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* General error */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400"
                >
                  <HiOutlineExclamationCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email}
              icon={HiOutlineEnvelope}
            />

            {/* Password */}
            <Field
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder={isLogin ? "Enter your password" : "At least 6 characters"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              error={errors.password}
              icon={HiOutlineLockClosed}
              suffix={eyeButton(
                showPassword,
                () => setShowPassword((p) => !p),
                showPassword ? "Hide password" : "Show password"
              )}
            />

            {/* Confirm Password */}
            {!isLogin && (
              <Field
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
                error={errors.confirmPassword}
                icon={HiOutlineLockClosed}
                suffix={eyeButton(
                  showConfirm,
                  () => setShowConfirm((p) => !p),
                  showConfirm ? "Hide password" : "Show password"
                )}
              />
            )}

            {/* Remember / Forgot */}
            {isLogin && (
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-[#7C3AED]"
                  />
                  <span className="text-[13px] text-[#94A3B8]">Remember me</span>
                </label>
                <button
                  type="button"
                  className="rounded text-[13px] font-medium text-[#A78BFA] transition-colors duration-150 hover:text-[#C4B5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:brightness-110 hover:shadow-[#7C3AED]/40 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60"
            >
              {loading ? (
                <>
                  <Spinner />
                  {isLogin ? "Logging in…" : "Creating account…"}
                </>
              ) : (
                <>
                  {isLogin ? "Login" : "Create Account"}
                  <HiOutlineArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="mx-4 text-[11px] text-[#94A3B8]/40">or</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Switch mode */}
          <p className="text-center text-[13px] text-[#94A3B8]">
            {isLogin ? "Don\u2019t have an account? " : "Already have an account? "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="font-semibold text-[#FACC15] transition-colors duration-150 hover:text-[#FDE047] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]/60 rounded"
            >
              {isLogin ? "Register free" : "Sign in"}
            </Link>
          </p>

          {/* Security note */}
          {!isLogin && (
            <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8]/40">
              <HiOutlineShieldCheck className="h-3.5 w-3.5 text-emerald-500/60" aria-hidden="true" />
              Your data is protected with 256-bit SSL encryption
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
