/**
 * Sample attendance records used in the product mockups.
 * This data helps demonstrate how recent session performance is surfaced to users.
 */
const records = [
  { course: "Structural Analysis", session: "Lecture 09", date: "12 Mar", rate: "94%" },
  { course: "Structural Analysis", session: "Lecture 08", date: "05 Mar", rate: "89%" },
  { course: "Materials Science", session: "Lab 04", date: "04 Mar", rate: "97%" },
  { course: "Materials Science", session: "Seminar 03", date: "27 Feb", rate: "82%" },
];

export default function RecordsMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
            Records
          </p>
          <h3 className="font-display text-base text-charcoal">Recent sessions</h3>
        </div>
        <button
          type="button"
          className="rounded-full border border-line-strong px-3 py-1.5 text-xs text-graphite transition-colors duration-200 hover:border-bronze hover:text-bronze-deep"
        >
          Export report
        </button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-[0.1em] text-graphite-soft">
            <th scope="col" className="px-6 py-3 font-medium">
              Course
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Session
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right font-medium">
              Attendance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {records.map((r) => (
            <tr key={`${r.course}-${r.session}`} className="transition-colors duration-200 hover:bg-cream">
              <td className="px-6 py-3.5 text-charcoal">{r.course}</td>
              <td className="px-4 py-3.5 text-graphite">{r.session}</td>
              <td className="px-4 py-3.5 font-mono text-xs text-graphite-soft">{r.date}</td>
              <td className="px-6 py-3.5 text-right font-mono text-charcoal">{r.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
