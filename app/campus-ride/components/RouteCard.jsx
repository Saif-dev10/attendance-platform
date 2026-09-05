import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RouteCard({ route }) {
  return (
    <Link
      href={`/campus-ride/routes/${route.id}`}
      className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 hover:border-bronze-deep/40 hover:bg-paper transition-colors"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-charcoal truncate">{route.name}</p>
        <p className="text-xs text-graphite-soft">
          Next shuttle in {route.nextShuttleEtaMinutes} min • {route.stops.length} stops
        </p>
      </div>
      <ChevronRight size={16} className="text-graphite-soft shrink-0" />
    </Link>
  );
}