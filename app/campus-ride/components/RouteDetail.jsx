import { MapPin } from "lucide-react";

const STATUS_LABELS = {
  active: "Active",
  delayed: "Delayed",
};

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-cream p-3">
      <p className="text-[10px] font-bold text-graphite-soft uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold text-charcoal mt-0.5">{value}</p>
    </div>
  );
}

export default function RouteDetail({ route }) {
  return (
    <div className="bg-white rounded-xl border border-line p-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Stat label="Status" value={STATUS_LABELS[route.status] || "Inactive"} />
        <Stat label="Next Shuttle" value={`${route.nextShuttleEtaMinutes} min`} />
        <Stat label="Frequency" value={`Every ${route.frequencyMinutes} min`} />
        <Stat label="Fare" value={`₦${route.fare}`} />
      </div>

      <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase mb-4">Stops</p>
      <ol className="relative border-l-2 border-line pl-6 space-y-6">
        {route.stops
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((stop, index) => (
            <li key={stop.id} className="relative">
              <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-cream text-[10px] font-bold">
                {index + 1}
              </span>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-bronze-deep shrink-0" />
                <p className="text-sm font-semibold text-charcoal">{stop.name}</p>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}