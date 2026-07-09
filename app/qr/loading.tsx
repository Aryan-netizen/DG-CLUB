import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#060813] pb-12">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-14 rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
