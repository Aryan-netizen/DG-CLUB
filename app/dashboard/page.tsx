"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineWallet,
  HiOutlineGift,
  HiOutlineTrophy,
  HiOutlinePlusCircle,
  HiOutlineArrowDownTray,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineBell,
  HiOutlineChartBarSquare,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { GiPokerHand, GiSoccerBall } from "react-icons/gi";
import { MdOutlineFlightTakeoff, MdOutlineCasino } from "react-icons/md";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import type { Transaction } from "@/types";

// ── Data ─────────────────────────────────────────────────────────────────────

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "recharge", amount: 500, status: "success", description: "Wallet Recharge", date: "2025-01-08" },
  { id: "2", type: "win", amount: 1250, status: "success", description: "Aviator Win", date: "2025-01-08" },
  { id: "3", type: "loss", amount: -300, status: "success", description: "Lottery Entry", date: "2025-01-07" },
  { id: "4", type: "bonus", amount: 500, status: "success", description: "Welcome Bonus", date: "2025-01-06" },
  { id: "5", type: "withdraw", amount: -1000, status: "pending", description: "Bank Withdrawal", date: "2025-01-06" },
];

const POPULAR_GAMES = [
  { title: "Lottery", gradient: "from-primary-600 to-primary-800", icon: <GiPokerHand />, players: "12.4K", badge: "Hot" },
  { title: "Aviator", gradient: "from-danger-500 to-rose-700", icon: <MdOutlineFlightTakeoff />, players: "8.9K", badge: "#1" },
  { title: "Slots", gradient: "from-gold-600 to-gold-700", icon: <MdOutlineCasino />, players: "6.2K" },
  { title: "Sports", gradient: "from-success-500 to-emerald-700", icon: <GiSoccerBall />, players: "15.1K", badge: "Live" },
];

const STATS = [
  { label: "Total Wins", value: "4,850", prefix: "\u20B9", color: "bg-success-400", trend: "+12%" },
  { label: "Games Played", value: "47", color: "bg-primary-400", trend: "+5" },
  { label: "Win Rate", value: "68%", color: "bg-gold-400", trend: "+3%" },
  { label: "Best Win", value: "2,100", prefix: "\u20B9", color: "bg-danger-400" },
];

// ── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

// ── Sub-components ────────────────────────────────────────────────────────────

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060813]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-primary-500/20" />
          <div className="absolute inset-0 h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-primary-500" />
        </div>
        <p className="text-[13px] text-[#94A3B8]/60 font-mono tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label mb-3.5 font-mono">{children}</p>
  );
}

interface WalletCardProps {
  label: string;
  amount: number;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  trend?: string;
  glowColor: string;
}

function WalletCard({ label, amount, icon, gradient, delay, trend, glowColor }: WalletCardProps) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:shadow-lg"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
      whileHover={{ y: -3, boxShadow: `0 10px 30px -10px ${glowColor}, var(--shadow-card)` }}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-[0.08] blur-2xl`}
        aria-hidden="true"
      />
      <div className="relative">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          <span className="text-[18px]" aria-hidden="true">{icon}</span>
        </div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]/60">
          {label}
        </p>
        <p className="mt-1.5 font-mono text-2xl font-black tracking-tight text-white tabular-nums">
          ₹{amount.toLocaleString("en-IN")}
        </p>
        {trend && (
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <HiOutlineArrowTrendingUp className="h-3 w-3" aria-hidden="true" />
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  gradient: string;
  href: string;
  delay: number;
}

function QuickAction({ label, icon, gradient, href, delay }: QuickActionProps) {
  return (
    <motion.div {...fadeUp(delay)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-4 transition-all duration-200 hover:border-primary-500/25 hover:bg-[#0b0d1e]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
      >
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
        >
          <span className="text-[18px]" aria-hidden="true">{icon}</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#94A3B8] tracking-wider uppercase">{label}</span>
      </Link>
    </motion.div>
  );
}

function TransactionRow({ tx, index }: { tx: Transaction; index: number }) {
  const isPositive = tx.amount > 0;
  const statusIcon = {
    success: <HiOutlineCheckCircle className="h-4 w-4 text-emerald-400" />,
    pending: <HiOutlineExclamationCircle className="h-4 w-4 text-yellow-400" />,
    failed: <HiOutlineXCircle className="h-4 w-4 text-red-400" />,
  }[tx.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.45 + index * 0.05 }}
      className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3 transition-colors duration-150 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true">{statusIcon}</span>
        <div>
          <p className="text-[13px] font-medium text-white">{tx.description}</p>
          <p className="text-[11px] text-[#94A3B8]/70 font-mono">
            {new Date(tx.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <span
        className={`text-[13px] font-mono font-bold tabular-nums ${
          isPositive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isPositive ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString("en-IN")}
      </span>
    </motion.div>
  );
}

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums font-mono tracking-wider">{time}</span>;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to log out. Please try again.");
      setLoggingOut(false);
    }
  }

  if (loading || !user) return <PageSpinner />;

  const displayName =
    user.displayName || user.email?.split("@")[0] || "Player";
  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060813] pb-16">
      {/* Ambient backgrounds */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-primary-600/08 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold-500/04 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.header
          {...fadeUp(0)}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/60"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 font-mono text-xs font-black text-white shadow-lg shadow-primary-500/30">
              DG
            </span>
            <span className="font-mono text-[15px] font-bold text-white tracking-wider">
              DG <span className="text-primary-400">CLUB</span>
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-[#94A3B8] transition-all duration-200 hover:border-primary-500/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
            >
              <HiOutlineBell className="h-4 w-4" />
              <span
                className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-gold-400"
                aria-label="Unread notifications"
              />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-[13px] font-bold text-white transition-all duration-200 hover:border-danger-500/30 hover:bg-danger-500/[0.08] hover:text-danger-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500/40"
            >
              <HiOutlineArrowRightOnRectangle className="h-4 w-4" aria-hidden="true" />
              <span className="inline">
                {loggingOut ? "Logging out…" : "Logout"}
              </span>
            </button>
          </div>
        </motion.header>

        {/* ── Welcome Card ── */}
        <motion.div
          {...fadeUp(0.05)}
          className="mb-7 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-6 backdrop-blur-xl sm:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-xl font-mono font-black text-white shadow-lg shadow-primary-500/25">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary-400">
                  Welcome Back
                </p>
                <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight text-white">
                  {displayName}
                </h1>
                <p className="mt-0.5 text-[12px] text-[#94A3B8]/70 font-mono">
                  {user.email} &middot; Member since {memberSince}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-3 text-right">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]/50">
                Current Time
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-white">
                <LiveClock />
              </p>
              <p className="mt-0.5 text-[10px] text-[#94A3B8]/50 font-mono">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Wallet Cards ── */}
        <div className="mb-7">
          <SectionLabel>Your Balances</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <WalletCard
              label="Wallet Balance"
              amount={2450}
              icon={<HiOutlineWallet />}
              gradient="from-primary-500 to-primary-700"
              delay={0.1}
              trend="+₹350 today"
              glowColor="rgba(139,92,246,0.15)"
            />
            <WalletCard
              label="Bonus Balance"
              amount={500}
              icon={<HiOutlineGift />}
              gradient="from-gold-500 to-gold-600"
              delay={0.15}
              glowColor="rgba(245,158,11,0.15)"
            />
            <WalletCard
              label="Total Winnings"
              amount={1250}
              icon={<HiOutlineTrophy />}
              gradient="from-[#10B981] to-[#059669]"
              delay={0.2}
              trend="+₹1,250 this week"
              glowColor="rgba(16,185,129,0.15)"
            />
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="mb-7">
          <SectionLabel>Quick Actions</SectionLabel>
          <div className="grid grid-cols-4 gap-3">
            <QuickAction
              label="Recharge"
              icon={<HiOutlinePlusCircle />}
              gradient="from-primary-500 to-primary-700"
              href="/qr"
              delay={0.22}
            />
            <QuickAction
              label="Withdraw"
              icon={<HiOutlineArrowDownTray />}
              gradient="from-[#10B981] to-[#059669]"
              href="#"
              delay={0.25}
            />
            <QuickAction
              label="Refer"
              icon={<HiOutlineUserGroup />}
              gradient="from-gold-500 to-gold-600"
              href="#"
              delay={0.28}
            />
            <QuickAction
              label="History"
              icon={<HiOutlineClock />}
              gradient="from-danger-500 to-danger-600"
              href="#"
              delay={0.31}
            />
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">

            {/* Popular Games */}
            <div>
              <div className="mb-3.5 flex items-center justify-between">
                <SectionLabel>Popular Games</SectionLabel>
                <Link
                  href="/#games"
                  className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-primary-400 transition-colors duration-150 hover:text-primary-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500/60 rounded"
                >
                  View All{" "}
                  <HiOutlineChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {POPULAR_GAMES.map((game, i) => (
                  <motion.div
                    key={game.title}
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0d1e]/60 p-4 transition-all duration-200 hover:border-white/[0.12] hover:shadow-lg"
                  >
                    {game.badge && (
                      <span className="glowing-badge glowing-badge-gold mb-2.5 block w-fit">
                        {game.badge}
                      </span>
                    )}
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${game.gradient} text-[18px] text-white shadow-md`}
                    >
                      {game.icon}
                    </div>
                    <p className="text-[13px] font-bold text-white font-mono">{game.title.toUpperCase()}</p>
                    <p className="mt-0.5 text-[11px] text-[#94A3B8]/70">
                      {game.players} playing
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <div className="mb-3.5 flex items-center justify-between">
                <SectionLabel>Recent Transactions</SectionLabel>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-primary-400 transition-colors duration-150 hover:text-primary-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500/60 rounded"
                >
                  View All{" "}
                  <HiOutlineChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-2">
                {MOCK_TRANSACTIONS.map((tx, i) => (
                  <TransactionRow key={tx.id} tx={tx} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-6">

            {/* Statistics */}
            <div>
              <SectionLabel>Statistics</SectionLabel>
              <div className="rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl shadow-md">
                <div className="space-y-4">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.45 + i * 0.07 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`stat-dot ${stat.color}`}
                          aria-hidden="true"
                        />
                        <span className="text-[13px] text-[#94A3B8]">
                          {stat.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {stat.trend && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            {stat.trend}
                          </span>
                        )}
                        <span className="text-[13px] font-mono font-bold tabular-nums text-white">
                          {stat.prefix}
                          {stat.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] text-[#94A3B8]/70">
                      Monthly Target
                    </span>
                    <span className="text-[12px] font-bold text-gold-400 font-mono">68%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-gold-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="relative overflow-hidden rounded-2xl border border-gold-400/[0.14] bg-gradient-to-br from-primary-500/12 to-gold-400/[0.06] p-5 backdrop-blur-xl shadow-md"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-400/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="glowing-badge glowing-badge-gold mb-3 inline-flex">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-gold-400" />
                  Limited Offer
                </span>
                <p className="text-[16px] font-mono font-black tracking-wider text-white">
                  REFER &amp; EARN ₹200
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#94A3B8]/80">
                  Invite friends and earn bonus credits on every successful
                  referral.
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-lg bg-gold-400 px-4 py-2 text-[12px] font-bold text-[#060813] transition-all duration-200 hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
                >
                  Refer Now
                </button>
              </div>
            </motion.div>

            {/* Account Card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="rounded-2xl border border-white/[0.07] bg-[#0b0d1e]/60 p-5 backdrop-blur-xl shadow-md"
            >
              <div className="mb-4 flex items-center gap-2">
                <HiOutlineChartBarSquare
                  className="h-4 w-4 text-primary-400"
                  aria-hidden="true"
                />
                <p className="section-label font-mono">Account Profile</p>
              </div>
              <div className="space-y-3.5">
                {[
                  {
                    label: "Status",
                    value: (
                      <span className="glowing-badge glowing-badge-success py-0.5 px-2.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Active
                      </span>
                    ),
                  },
                  {
                    label: "Welcome Bonus",
                    value: (
                      <span className="text-[13px] font-bold text-white font-mono">₹500</span>
                    ),
                  },
                  {
                    label: "Member Since",
                    value: (
                      <span className="text-[13px] font-bold text-white font-mono">
                        {memberSince}
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#94A3B8]">{label}</span>
                    {value}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Toaster theme="dark" position="top-right" richColors closeButton />
    </main>
  );
}
