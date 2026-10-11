export default function LoadingState({ rows = 4 }) {
  return (
    <div className="space-y-3 px-6 py-5" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#eceff4]" />
          <div className="h-3.5 flex-1 animate-pulse rounded bg-[#eceff4]" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-[#eceff4]" />
        </div>
      ))}
    </div>
  );
}