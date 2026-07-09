"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`premium-skeleton ${className}`} aria-hidden="true" />;
}

export function DashboardSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060813] pb-12">
      {/* Ambient backgrounds */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary-600/08 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <div className="flex gap-2.5">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
          </div>
        </div>

        {/* Welcome card */}
        <Skeleton className="mb-7 h-[88px] w-full rounded-2xl" />

        {/* Section label */}
        <Skeleton className="mb-3.5 h-3.5 w-24 rounded" />

        {/* Wallet cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>

        {/* Section label */}
        <Skeleton className="mb-3.5 h-3.5 w-28 rounded" />

        {/* Quick actions */}
        <div className="mb-7 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[88px] rounded-2xl" />
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {/* Games */}
            <Skeleton className="h-3.5 w-28 rounded" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
            {/* Transactions */}
            <Skeleton className="mt-4 h-3.5 w-40 rounded" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[54px] rounded-xl" />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Skeleton className="h-3.5 w-20 rounded" />
            <Skeleton className="h-[220px] rounded-2xl" />
            <Skeleton className="h-[148px] rounded-2xl" />
            <Skeleton className="h-[140px] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
