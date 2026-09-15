import { Clock, MapPin, Armchair, CalendarDays } from "lucide-react";

/** A single exam's allocation — what, when, where, which seat. */
export default function AllocationCard({ exam }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div>
        <p className="text-sm font-bold text-charcoal">{exam.code}</p>
        <p className="text-sm text-graphite">{exam.title}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-graphite">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} className="text-graphite-soft" />
          {exam.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-graphite-soft" />
          {exam.time}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-line bg-cream p-3.5">
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            <MapPin size={12} />
            Examination Hall
          </p>
          <p className="mt-1 text-sm font-semibold text-charcoal">{exam.hall}</p>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            <Armchair size={12} />
            Assigned Seat
          </p>
          <p className="mt-1 text-sm font-bold text-bronze-deep">{exam.seat}</p>
        </div>
      </div>
    </div>
  );
}