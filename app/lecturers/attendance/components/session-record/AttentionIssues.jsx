import { AlertTriangle, Copy, MapPinOff, ScanLine, UserCog } from "lucide-react";
import { countByType, EXCEPTION_LABELS } from "@/lib/mock/attendanceUtils";

const ICONS = {
  failed_scan: ScanLine,
  duplicate_scan: Copy,
  outside_geofence: MapPinOff,
  manual_change: UserCog,
};

// Groups exceptions by type for the four summary tiles. Selecting one filters the
// list below it; "activeType" comes from the parent so a tab can clear it on switch.
export default function AttentionIssues({ exceptions = [], activeType, onSelectType }) {
  const counts = countByType(exceptions);
  const types = Object.keys(EXCEPTION_LABELS);

  return (
    <section aria-labelledby="needs-attention-heading" className="rounded-md border border-line bg-paper p-4">
      <h2 id="needs-attention-heading" className="flex items-center gap-2 text-sm font-semibold text-charcoal">
        <AlertTriangle aria-hidden="true" className="h-4 w-4 text-clay" />
        Needs Attention
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {types.map((type) => {
          const Icon = ICONS[type];
          const active = activeType === type;
          const count = counts[type] ?? 0;

          return (
            <button
              key={type}
              type="button"
              disabled={count === 0}
              aria-pressed={active}
              onClick={() => onSelectType(active ? null : type)}
              className={`rounded-md border p-3 text-left disabled:cursor-not-allowed disabled:opacity-40 ${
                active ? "border-bronze-deep bg-bronze-deep/5" : "border-line bg-paper hover:bg-cream"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 text-graphite-soft" />
              <p className="mt-2 text-lg font-semibold text-charcoal">{count}</p>
              <p className="text-xs text-graphite-soft">{EXCEPTION_LABELS[type]}</p>
              {count > 0 && (
                <span className="mt-1 inline-block text-xs font-medium text-bronze-deep">
                  {active ? "Hide" : "View"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeType && (
        <ul className="mt-3 divide-y divide-line border-t border-line">
          {exceptions
            .filter((item) => item.type === activeType)
            .map((item) => (
              <li key={item.id} className="py-2 text-sm">
                <p className="font-medium text-charcoal">
                  {item.studentName} <span className="font-normal text-graphite-soft">· {item.matricNumber}</span>
                </p>
                <p className="text-xs text-graphite-soft">{item.detail}</p>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
