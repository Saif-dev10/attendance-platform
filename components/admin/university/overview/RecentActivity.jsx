import EmptyState from "@/components/admin/shared/EmptyState";
import { timeAgoLong } from "@/lib/admin/dates";

const DOT = { navy: "bg-[#071a33]", yellow: "bg-[#f5c400]" };

export default function RecentActivity({ items = [] }) {
  return (
    <section className="skul-card p-5" aria-labelledby="ra-title">
      <h2 id="ra-title" className="skul-heading text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#0b1a30]">Recent Activity</h2>
      {items.length === 0 ? (
        <EmptyState icon="history" title="No recent activity" />
      ) : (
        <ul className="mt-4 space-y-4">
          {items.map((a) => (
            <li key={a.id} className="flex gap-3">
              <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[a.tone] || DOT.navy}`} />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-[#0b1a30]">{a.title}</p>
                <p className="text-[12.5px] text-[#6b7587]">{a.detail}</p>
                <p className="mt-0.5 text-[11px] text-[#8a93a3]">{timeAgoLong(a.at)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}