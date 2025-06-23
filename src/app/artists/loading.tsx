import { Skeleton } from "@/components/ui/skeleton";

/**
 * A loading skeleton component for the Artist Listing page.
 * This component is automatically rendered by Next.js's Suspense feature
 * while the data for the `/artists` route is being fetched on the server.
 */
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Skeleton for filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Skeleton className="h-10 w-full sm:w-40" />
        <Skeleton className="h-10 w-full sm:w-40" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>
      {/* Skeleton for the artist grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 