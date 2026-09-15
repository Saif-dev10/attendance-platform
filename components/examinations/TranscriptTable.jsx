/** Renders one semester's course list as a table (desktop) / stacked rows (mobile). */
export default function TranscriptTable({ record }) {
  return (
    <div className="rounded-2xl border border-line bg-white overflow-hidden">
      <div className="hidden md:grid grid-cols-[100px_1fr_100px_90px] gap-4 px-5 py-3 bg-cream border-b border-line text-[11px] font-bold uppercase tracking-wider text-graphite-soft">
        <span>Code</span>
        <span>Course</span>
        <span>Grade</span>
        <span className="text-right">Units</span>
      </div>

      <ul className="divide-y divide-line">
        {record.courses.map((course) => (
          <li
            key={course.code}
            className="px-5 py-3.5 md:grid md:grid-cols-[100px_1fr_100px_90px] md:items-center md:gap-4"
          >
            <div className="flex items-center justify-between md:block">
              <span className="text-sm font-bold text-charcoal">
                {course.code}
              </span>
              <span className="md:hidden text-sm font-bold text-bronze-deep">
                {course.grade}
              </span>
            </div>

            <p className="mt-0.5 md:mt-0 text-sm text-graphite">
              {course.title}
            </p>

            <span className="hidden md:block text-sm font-bold text-charcoal">
              {course.grade}
            </span>

            <div className="mt-1 md:mt-0 flex items-center justify-between md:block md:text-right">
              <span className="md:hidden text-xs text-graphite-soft">
                Units
              </span>
              <span className="text-sm text-graphite">{course.units}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end gap-6 px-5 py-3.5 bg-cream border-t border-line">
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            Semester GPA
          </p>
          <p className="text-sm font-bold text-charcoal">
            {record.gpa.toFixed(2)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            CGPA
          </p>
          <p className="text-sm font-bold text-bronze-deep">
            {record.cgpa.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}