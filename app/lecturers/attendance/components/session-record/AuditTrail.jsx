import { STATUS_LABELS } from "@/lib/mock/attendanceUtils";

// Read-only by design: nothing in this component can edit an entry.
export default function AuditTrail({ entries = [], loading = false }) {
  if (loading) {
    return <div aria-busy="true" className="h-24 animate-pulse rounded-md bg-cream" />;
  }

  if (entries.length === 0) {
    return <p className="text-xs text-graphite-soft">No changes have been made to this record.</p>;
  }

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-graphite-soft">Audit Trail</h3>
      <ol className="mt-2 space-y-3 border-l border-line pl-3">
        {entries.map((entry) => (
          <li key={entry.id} className="text-xs">
            <p className="text-charcoal">
              {entry.from
                ? `${STATUS_LABELS[entry.from]} → ${STATUS_LABELS[entry.to]}`
                : `Initial status: ${STATUS_LABELS[entry.to]}`}
            </p>
            <p className="text-graphite-soft">
              Changed by {entry.by} · {new Date(entry.at.replace(" ", "T")).toLocaleString()}
            </p>
            {entry.reason && <p className="text-graphite-soft">Reason: {entry.reason}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
