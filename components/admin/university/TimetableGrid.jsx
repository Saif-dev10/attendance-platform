import { DAYS, TIME_BANDS } from "@/lib/services/admin/universityService";
import EmptyState from "@/components/admin/shared/EmptyState";

/** Weekly grid: rows are time bands, columns are days. Scrolls horizontally on small screens. */
export default function TimetableGrid({ slots }) {
  if (slots.length === 0) return <EmptyState icon="clock" title="No timetable entries" message="This department has no scheduled lectures." />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="bg-[#f8f9fb]">
            <th scope="col" className="skul-eyebrow w-[130px] px-4 py-3">Time</th>
            {DAYS.map((d) => <th key={d} scope="col" className="skul-eyebrow px-4 py-3">{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {TIME_BANDS.map((band, b) => (
            <tr key={band} className="border-t border-[#eef0f4] align-top">
              <th scope="row" className="px-4 py-3 text-[12px] font-semibold text-[#6b7587]">{band}</th>
              {DAYS.map((_, d) => {
                const cell = slots.filter((s) => s.day === d && s.band === b);
                return (
                  <td key={d} className="px-3 py-2.5">
                    {cell.map((s) => (
                      <div key={s.id} className="rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-2">
                        <p className="text-[12.5px] font-bold text-[#1e3a8a]">{s.course.code}</p>
                        <p className="text-[11.5px] text-[#1d4ed8]">{s.course.title}</p>
                        <p className="mt-0.5 text-[11px] text-[#6b7587]">{s.venue}</p>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}